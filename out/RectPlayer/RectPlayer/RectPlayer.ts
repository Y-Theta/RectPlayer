/**
 * @Y_Theta http://blog.y-theta.cn
 *
 * An audio player based on
 * Skplayer         https://github.com/wangpengfei15975/skPlayer
 * netmusic-node    https://github.com/sqaiyan/netmusic-node
 *
 */

import { Utils } from "./Utils";
import { RectPlayerOption, PlayList, PlayMode, RectPlayerControl } from "./Model/PlayerModel";
import { IControlContract } from "./Interfaces/IControlContract";
import { IResolverContract } from "./Interfaces/IResolverContract";
import { ISourceContract } from "./Interfaces/ISourceContract";
import { Tasks, IAsyncTask, TaskArgs, TaskOrder } from "./dependence/Tasks";
import { DefaultTemplateResolver } from "./RectplayerTemplateResolver";
import { NeteaseCore } from "./NeteaseCore";

export class RectPlayer implements IControlContract {
    //#region IOC
    private _resolver: IResolverContract = null;
    private _core: ISourceContract = null;
    //#endregion

    //#region Properties
    private _listflag: boolean = false;
    private _panelflag: boolean = false;
    private _mute: boolean = false;
    private _playing: boolean = null;
    private _enableresolve: boolean = false;

    private _volume: number = 0;
    private _volumebak: number = 0;
    private _volumeref: number = 6000;

    private _srcid: number | string = null;
    private _playstack: number[] = null;

    private _playlist: PlayList = null;
    private _playerdom: HTMLElement = null;
    private _playcontrol: RectPlayerControl = null;

    /** AudioResolve */
    private _audiocontext: AudioContext = null;
    private _source: MediaElementAudioSourceNode = null;
    private _gain: GainNode = null;
    private _analyser: AnalyserNode = null;
    private _analyzeInterval: NodeJS.Timer = null;
    private _resolvedarrbuffer: Uint8Array = null;

    //#endregion

    //#region IControlContract

    Play(id: number): void {}
    Pause(): void {}
    Resume(): void {}
    Next(): void {}
    Prve(): void {}
    Playlist(action: boolean): void {}
    SwitchMode(mode: PlayMode): void {}
    About(): void {}
    //#endregion

    /** 初始化播放器 */
    public Init() {
        //加载依赖文件
        let loadtasks: IAsyncTask[] = [];
        [Utils.Path() + "/less.min.js", Utils.Path("resource") + "/javascript/lib/anime.min.js"].forEach((element) => {
            loadtasks.push(
                Tasks.Ajax({
                    url: element,
                    prepare: () => Utils.Log("loading ... " + element),
                    success: (arg: TaskArgs) => Utils.Log(arg.stepresult + " loaded"),
                    failed: (arg: TaskArgs) => Utils.Log(arg.stepresult + " failed"),
                })
            );
        });
        Tasks.WaitAll(loadtasks, this.loadtemplate.bind(this));
    }

    /** 加载模板 */
    private loadtemplate() {
        let lesstask = Tasks.Ajax({
            url: Utils.Path() + "/template/style.less",
            prepare: () => Utils.Log("GetTemplate Less :" + Utils.Path() + "/template/style.less"),
        });
        let xmltask = Tasks.Ajax({
            url: Utils.Path() + "/template/Template.xml",
            prepare: () => Utils.Log("GetTemplate Html :" + Utils.Path() + "/template/Template.xml"),
        });
        Tasks.WaitAll([lesstask, xmltask], this.rendertemplate.bind(this), null, TaskOrder.Sequence);
    }

    /** 渲染模板 绑定控制器 */
    private rendertemplate(num: number, res: any[], timeout: boolean) {
        // Utils.Log((!!timeout ? "timeout" : "succeed") + "  -  " + res.length);
        if (res[0]) {
            less.render(res[0], (e, o) => {
                let style = document.createElement("style");
                style.type = "text/css";
                style.innerHTML = o.css;
                document.getElementsByTagName("head").item(0).appendChild(style);
            });
        }
        if (res[1]) {
            this._resolver.ResloveTemplate(res[1], (ctl: RectPlayerControl, dom: HTMLElement) => {
                this._playcontrol = ctl;
                this._playerdom = dom;
                document.body.appendChild(this._playerdom);
                /** 获取播放列表信息 */
                this._core.Init(this._srcid, (pl: PlayList) => {
                    this._playlist = pl;
                    Utils.Log(pl);
                    this._resolver.RenderTemplate(this._playlist, () => {
                        this.bindingctl();
                        /** 获取歌曲url */
                        this._core.Update(this.onlistupdate.bind(this));
                    });
                });
            });
        }
    }

    /** 播放列表刷新后行为 */
    private onlistupdate(list: PlayList) {
        Utils.Log("Update - list");
        Utils.Log(this._playlist);
        /** 加载歌曲列表 */
        this._resolver.RenderPlaylist(this._playlist.tracks);
        let firstvalid = this._playlist.tracks.findIndex((value) => {
            return value.valid;
        });
        this.preparesong(firstvalid);
    }

    private renderlist() {}

    /** 绑定控制节点 */
    private bindingctl() {
        let ctl = this._playcontrol;
        ctl.ctl_listtoogle.onclick = this.listmousetoggle.bind(this);
        ctl.ctl_paneltoogle.onclick = this.panelmousetoggle.bind(this);
        ctl.ctl_play.onclick = this.playmousetoggle.bind(this);
        ctl.source.onplay = this.resolvesrctrack.bind(this);
        ctl.source.onpause = this.onsourcepause.bind(this);
        this.pause();

        ctl.volume_track.onclick = this.volumetrackclick.bind(this);
        ctl.ctl_mute.onclick = this.volumeclick.bind(this);
        ctl.volume.onmousewheel = this.volumescroll.bind(this);
        ctl.volume.addEventListener("DOMMouseScroll", this.volumescroll.bind(this), { passive: true });
    }

    //#region 播放列表/控制面板

    private listmousetoggle(e: MouseEvent) {
        this._listflag = !this._listflag;
        this.togglelist(this._listflag);
    }

    /** 转换播放列表状态 */
    private togglelist(flag: boolean) {
        if (flag) {
            this.switchElementStatus(this._playerdom, "list-on", "list-off");
        } else {
            this.switchElementStatus(this._playerdom, "list-off", "list-on");
        }
    }

    private panelmousetoggle(e: MouseEvent) {
        this._panelflag = !this._panelflag;
        this.togglepanel(this._panelflag);
    }

    /** 转换控制栏状态 */
    private togglepanel(flag: boolean) {
        if (flag) {
            this.switchElementStatus(this._playerdom, "panel-on", "panel-off");
        } else {
            if (this._playerdom.classList.contains("list-on")) {
                this._panelflag = false;
                this.switchElementStatus(this._playerdom, "list-off", "list-on");
                setTimeout(() => {
                    this.switchElementStatus(this._playerdom, "panel-off", "panel-on");
                }, 240);
            } else {
                this.switchElementStatus(this._playerdom, "panel-off", "panel-on");
            }
        }
    }
    //#endregion

    //#region 音量调整

    /** 静音 */
    private volumeclick(e: MouseEvent) {
        this.setMute(!this._mute);
    }

    /** 音量单击调整 */
    private volumetrackclick(e: MouseEvent) {
        let clip = this._playcontrol.volume.getBoundingClientRect();

        //   console.log(e, clip);
        let cw = clip.width / 2;
        let ch = clip.height / 2;
        let x1 = e.clientX - clip.x,
            y1 = e.clientY - clip.y;

        let angle = Utils.AngleLL({ x: cw, y: 0 }, { x: x1, y: y1 }, { x: cw, y: ch });
        this._mute = false;
        this._volume = (angle / 360) * this._volumeref;
        this.setVolume(this._volume);
    }

    /** 音量滚动调整 */
    private volumescroll(e: Event) {
        e = e || window.event;
        let data;
        if (e.wheelDelta) {
            //IE/Opera/Chrome
            data = e.wheelDelta;
        } else if (e.detail) {
            //Firefox
            data = e.detail;
        }

        this._mute && this.setMute(false);
        this._volume += data;
        this.setVolume(this._volume);
    }

    /** 设置静音 */
    private setMute(flag: boolean) {
        this._mute = flag;
        Utils.Log("Mute :" + flag);
        if (flag) {
            this._volumebak = this._volume;
            this._volume = 0;
        } else {
            this._volume = this._volumebak;
        }
        this.setVolume(this._volume);
    }

    /** 设置音量 */
    private setVolume(v: number) {
        this._volume = v < this._volumeref ? (v < 0 ? 0 : v) : this._volumeref;
        let newpath = Utils.Percent(this._volume / this._volumeref, { x: 32, y: 32 }, 24);
        this._playcontrol.volume_path.setAttribute("d", newpath);

        var volume = this._playcontrol.volume;
        if (this._volume == 0) {
            volume.classList.add("mute");
        } else {
            volume.classList.contains("mute") ? volume.classList.remove("mute") : null;
        }
        this._gain && (this._gain.gain.value = this._volume / this._volumeref);
    }

    //#endregion

    //#region 播放暂停控制
    private playmousetoggle(e: Event) {
        this._playing ? this.pause() : this.resume();
    }

    private resume() {
        if (this._playing) return;
        this._playing = true;
        this.switchElementStatus(this._playerdom, "play", "pause");
        this._playcontrol.source.play();
    }

    private pause() {
        if (this._playing != undefined && !this._playing) return;
        this._playing = false;
        this.switchElementStatus(this._playerdom, "pause", "play");
        this._playcontrol.source.pause();
    }

    private play(id: number) {
        if (
            id < 0 ||
            !!this._playlist ||
            id >= this._playlist.tracks.length ||
            id == this._playstack[this._playstack.length - 1]
        )
            return;

        this.preparesong(id);
        this.resume();
    }

    private prve() {
        if (this._playstack.length <= 0) return;
        //TODO:: select prve
    }

    private next() {
        if (this._playstack.length <= 0) return;
        //TODO:: select next
    }

    private preparesong(id: number) {
        this._playstack.push(id);
        this._resolver.UpdateUI(this._playlist.tracks[id], this._playstack);
    }
    //#endregion

    //#region 音频可视化
    private resolvesrctrack() {
        if (!this._audiocontext) {
            this._audiocontext = this.getaudiocontext();
            this._source = this._audiocontext.createMediaElementSource(this._playcontrol.source);
            this._gain = this._audiocontext.createGain();
            this._analyser = this._audiocontext.createAnalyser();
            this._analyser.fftSize = 128;
            this._analyser.smoothingTimeConstant = 0.8;
            this._source.connect(this._gain);
            this._gain.connect(this._analyser);
            this._analyser.connect(this._audiocontext.destination);
            this._resolvedarrbuffer = new Uint8Array(this._analyser.frequencyBinCount);
        }
        if (this._enableresolve) {
            this._analyzeInterval = setInterval(this.renderresolve.bind(this), 100);
        }
    }

    private onsourcepause() {
        if (this._analyzeInterval) {
            clearInterval(this._analyzeInterval);
            this._analyzeInterval = null;
        }
    }

    private renderresolve() {
        this._analyser.getByteFrequencyData(this._resolvedarrbuffer);
        Utils.Log(this._resolvedarrbuffer);
    }

    private getaudiocontext() {
        window.AudioContext =
            window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        try {
            return new AudioContext();
        } catch (e) {
            console.log(e);
        }
    }
    //#endregion

    private switchElementStatus(ctl: HTMLElement, state1: string, state2: string): void {
        Utils.SwitchElementStatus(ctl, state1, state2);
    }

    /**
     * 更改播放器的播放模式
     * @param mode
     * 播放模式 以下几种之一
     * Netease | LocalFile
     */
    // public SwitchMode(mode: string) {
    //     this._mode = mode;
    //     this._srcResolver = null;
    //     if (this._mode === "Netease") {
    //         this._srcResolver = new NeteaseCore();
    //     } else if (this._mode === "LocalFile") {
    //         this._srcResolver = new LocalCore();
    //     }
    // }

    // private loadlist(data: string) {
    //     let temp = this._templateResolver.ResloveTemplate(data);
    //     document.body.appendChild(temp.View);
    //     this._playerControl = temp.Control;
    // }

    // private loadlistAsync(data: string) {
    //     let temp = this._templateResolver.ResloveTemplate(data);
    //     document.body.appendChild(temp.View);
    //     this._playerControl = temp.Control;
    //     this.getPlayList(this._listuid);
    //     setTimeout(this.rendertemplate.bind(this), 100);
    // }

    // private rendertemplate() {
    //     if (!this._srcResolver.Loaded) {
    //         if (this._srcResolver.Timeout) {
    //             Utils.Log("Some songs lost due to bad network or Netease! TimeOut");
    //         } else {
    //             setTimeout(this.rendertemplate.bind(this), 100);
    //             return;
    //         }
    //     }
    //     this._playlist = this._srcResolver.Playlist;
    //     this._templateResolver.RenderTemplate(this._playlist);
    // }

    //#region Constructor
    constructor(option: RectPlayerOption) {
        Utils._enablelog = true;
        this._resolver = new DefaultTemplateResolver();
        this._core = new NeteaseCore();
        this._srcid = option.PlaylistId;
        this._playstack = [];
        Utils.Log("\\ RectPlayer  1.0.0 \n\\ @Y_Theta \n\\ http:\\\\blog.y-theta.com \n\\ Starting ....");
    }

    //#endregion
}
