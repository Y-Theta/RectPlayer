/**
 *
 * 模板解析类,用于定义如何解析其Html模板
 *
 * */
import { PlayList, Point, Track, PlayMode, RectPlayerControl } from "./Model/PlayerModel";
import { Utils } from "./Utils";
import { IResolverContract } from "./Interfaces/IResolverContract";
import { Action, ActionD } from "./Model/EventArgs";

/**
 * 默认的播放器样式解析器
 * 根据模板中定义的关键字解析模板
 * */
class DefaultTemplateResolver implements IResolverContract {
    public constructor() {}

    private _playerelement: HTMLElement = null;
    private _listtemplate: string = null;
    private _control: RectPlayerControl = null;
    private _playlist: Array<Track> = null;

    private _liststatus: boolean = false;
    private _panelstatus: boolean = false;
    private _mute: boolean = false;
    private _playing: boolean = true;
    private _songid: number = -1;
    private _lastsongid: number = -1;
    private _playerctl = new Map<string, HTMLElement>();
    private _volume: number = 0;
    private _volumebak: number = 0;
    private _volumemax = 6000;
    private _playmode: PlayMode = PlayMode.normal;
    private _playmodeloop: PlayMode[] = [PlayMode.normal, PlayMode.repeat, PlayMode.repeatone, PlayMode.random];

    private _maxtrackwidth = 0;
    private _pretrackwidth: number = 0;
    private _acttrackwidth: number = 0;

    //#region Interface Function

    /**
     * 解析播放器模板
     * @param oritemplate  模板html
     * @param callback     回调
     */
    public ResloveTemplate(oritemplate: string, callback: ActionD<RectPlayerControl, HTMLElement>) {
        //Utils.Log(XML.xml2js(oritemplate));
        Utils.Log(JSON.stringify(oritemplate));
        this._playerelement = document.createElement("div");
        this._playerelement.id = "rectPlayer";
        let result = /<player>([\s\S]*?)<\/player>[\s\S]*?<listitem>([\s\S]*?)<\/listitem>/im.exec(oritemplate);
        let playerdom = Utils.Dom(result[1]);
        this._listtemplate = result[2];

        //#region GetElementref
        this._control = this.loadControl(playerdom);
        //#endregion

        //#region 开关控制
        // this.$g("ctl-play").onclick = this.playpause.bind(this);
        // this.pause();
        // this.$g("openpanel").onclick = this.openctlpanel.bind(this);
        // this.$g("openlist").onclick = this.openlist.bind(this);

        // this.$g("volume-track").onclick = this.volumetrackclick.bind(this);
        // this.$g("ctl-mute").onclick = this.volumeclick.bind(this);
        // this.$g("volume").addEventListener("DOMMouseScroll", this.volumescroll.bind(this), { passive: true });
        // this.$g("volume").onmousewheel = this.volumescroll.bind(this);

        // this.$g("mode").addEventListener("click", this.setmode.bind(this));
        // this.switchmode(this._playmode);

        // this.$g("list-detail").onclick = this.listClick.bind(this);
        // this.$g("list-detail").ondblclick = this.listDbClick.bind(this);
        // this.setVolume(this._volumemax / 2);

        // this.$g("track-full").onclick = this.trackclick.bind(this);

        // this.$g("source").ontimeupdate = this.autoUpdateTrack.bind(this);
        // this.$g("source").onprogress = this.autoUpdateTrack.bind(this);
        // this.$g("source").ondurationchange = this.updateTimeline.bind(this);
        // this.$g("source").onemptied = this.audiosrcerr.bind(this);

        //#endregion

        for (const key in this._control) {
            if (this._control.hasOwnProperty(key)) {
                (this._control[key] as HTMLElement).removeAttribute("id");
            }
        }

        this._playerelement.append(playerdom);
        callback(this._control, this._playerelement);
    }

    public RenderTemplate(data: PlayList, callback: ActionD<RectPlayerControl, HTMLElement>) {
        // this._playlist = data;
        
        // this._songid = 0;
        // this._lastsongid = 0;
        // this.updateUI(this._songid);
    }

    RenderPlaylist(list: Track[]): void {
        this._playlist = list;
        if (this._playlist) {
            this._control.list.innerHTML = null;
            this._playlist.forEach((v, i) => {
                if (v.src != null) {
                    let listitem = Utils.Dom(this._listtemplate);
                    let liid = listitem.querySelector("#id");
                    liid.innerHTML = "" + (i + 1);
                    liid.removeAttribute("id");
                    let liname = listitem.querySelector("#info");
                    liname.innerHTML = "" + v.name + (v.ar[0] && "-" + v.ar[0].name);
                    liname.removeAttribute("id");
                    this._control.list.appendChild(listitem.childNodes[0]);
                }
            });
        }
    }

    //#endregion

    /**
     * 装填控件
     * @param dom
     */
    private loadControl(dom: HTMLElement) {
        let player: RectPlayerControl = new RectPlayerControl();
        player.name = dom.querySelector("#name");
        player.author = dom.querySelector("#author");
        player.source = dom.querySelector("#source");
        player.list = dom.querySelector("#list-detail");
        player.cover_avatar = dom.querySelector("#cover-avatar");
        player.cover_resolve = dom.querySelector("#cover-resolve");
        player.cover_static = dom.querySelector("#cover-static");
        player.ctl_play = dom.querySelector("#ctl-play");
        player.ctl_mute = dom.querySelector("#ctl-mute");
        player.ctl_fore = dom.querySelector("#ctl-fore");
        player.ctl_prve = dom.querySelector("#ctl-prve");
        player.ctl_mode = dom.querySelector("#ctl-mode");
        player.ctl_listadd = dom.querySelector("#ctl-listadd");
        player.ctl_listremove = dom.querySelector("#ctl-listremove");
        player.ctl_listtoogle = dom.querySelector("#openlist");
        player.ctl_paneltoogle = dom.querySelector("#openpanel");
        player.ctl_about = dom.querySelector("#ctl-about");
        player.time_now = dom.querySelector("#time-now");
        player.time_des = dom.querySelector("#time-total");
        player.volume = dom.querySelector("#volume");
        player.volume_path = dom.querySelector("#volume-path");
        player.volume_track = dom.querySelector("#volume-track");
        player.track_full = dom.querySelector("#track-full");
        player.track_loding = dom.querySelector("#track-loding");
        player.track_now = dom.querySelector("#track-pos");
        return player;
    }

    /**
     * 使用API得到的音乐SRC为临时地址，需要定时刷新
     */
    public RefreshSrc() {}

    /**
     *
     */
    private updateUI(id: number) {
        if (id < this._playlist.length && this._playlist[id]) {
            this._control.cover_avatar.style.backgroundImage = "url(" + this._playlist[id].al.url + ")";
            this._control.source.setAttribute("src", this._playlist[id].src);
            this._control.name.innerHTML = this._playlist[id].name;
            this._control.author.innerHTML = this._playlist[id].ar[0].name;
            let children = this._control.list.childNodes;
            (children.item(this._lastsongid) as HTMLElement).classList.remove("playing");
            (children.item(id) as HTMLElement).classList.remove("selected");
            (children.item(id) as HTMLElement).classList.add("playing");
        }
    }

    // //#region 播放列表/控制面板
    // private openlist(e: MouseEvent) {
    //     this._liststatus = !this._liststatus;
    //     if (this._liststatus) {
    //         this.switchElementStatus(this._playerelement, "list-on", "list-off");
    //     } else {
    //         this.switchElementStatus(this._playerelement, "list-off", "list-on");
    //     }
    // }

    // private openctlpanel(e: MouseEvent) {
    //     this._panelstatus = !this._panelstatus;
    //     if (this._panelstatus) {
    //         this.switchElementStatus(this._playerelement, "panel-on", "panel-off");
    //     } else {
    //         if (this._playerelement.classList.contains("list-on")) {
    //             this._liststatus = false;
    //             this.switchElementStatus(this._playerelement, "list-off", "list-on");
    //             setTimeout(
    //                 (that) => {
    //                     that.switchElementStatus(this._playerelement, "panel-off", "panel-on");
    //                 },
    //                 240,
    //                 this
    //             );
    //         } else {
    //             this.switchElementStatus(this._playerelement, "panel-off", "panel-on");
    //         }
    //     }
    // }
    // //#endregion

    // //#region 音量调整
    // /**
    //  * 静音
    //  */
    // private volumeclick(e: MouseEvent) {
    //     this.setMute(!this._mute);
    //     this.setVolume(this._volume);
    // }

    // /**
    //  * 音量单击调整
    //  */
    // private volumetrackclick(e: MouseEvent) {
    //     let clip = this.$g("volume").getBoundingClientRect();

    //     //   console.log(e, clip);
    //     let cw = clip.width / 2;
    //     let ch = clip.height / 2;
    //     let x1 = e.clientX - clip.x,
    //         y1 = e.clientY - clip.y;

    //     let angle = this.getcrosslineAngle({ x: cw, y: 0 }, { x: x1, y: y1 }, { x: cw, y: ch });
    //     this._mute = false;
    //     this._volume = (angle / 360) * this._volumemax;
    //     this.setVolume(this._volume);
    // }

    // /**
    //  * 音量滚动调整
    //  */
    // private volumescroll(e: Event) {
    //     e = e || window.event;
    //     let data;
    //     if (e.wheelDelta) {
    //         //IE/Opera/Chrome
    //         data = e.wheelDelta;
    //     } else if (e.detail) {
    //         //Firefox
    //         data = e.detail;
    //     }

    //     this._mute && this.setMute(false);
    //     this._volume += data;
    //     this.setVolume(this._volume);
    // }

    // /**
    //  * 设置音量
    //  */
    // private setVolume(v: number) {
    //     this._volume = v < this._volumemax ? (v < 0 ? 0 : v) : this._volumemax;
    //     let newpath = this.parsePercent(this._volume / this._volumemax, { x: 32, y: 32 }, 24);
    //     this.$g("volume-path").setAttribute("d", newpath);

    //     var volume = this.$g("volume");
    //     if (this._volume == 0) {
    //         volume.classList.add("mute");
    //     } else {
    //         volume.classList.contains("mute") ? volume.classList.remove("mute") : null;
    //     }
    //     this.$g("source").volume = this._volume / this._volumemax;
    // }

    // /**
    //  * 设置静音
    //  */
    // private setMute(flag: boolean) {
    //     this._mute = flag;
    //     Utils.Log("Mute :" + flag);
    //     if (flag) {
    //         this._volumebak = this._volume;
    //         this._volume = 0;
    //     } else {
    //         this._volume = this._volumebak;
    //     }
    // }
    // //#endregion

    // //#region 设置播放模式
    // private setmode() {
    //     let nowindex = this._playmodeloop.indexOf(this._playmode);
    //     nowindex = (nowindex + 1) % this._playmodeloop.length;
    //     this.switchmode(this._playmodeloop[nowindex]);
    // }

    // private switchmode(mode: PlayMode) {
    //     Utils.Log([this._playmode, mode]);
    //     this.switchElementStatus(this.$g("mode"), mode, this._playmode);
    //     this._playmode = mode;
    // }
    // //#endregion

    // //#region 播放暂停控制
    // private playpause(e: Event) {
    //     this._playing ? this.pause() : this.resume();
    // }

    // private resume() {
    //     if (this._playing) return;
    //     this._playing = true;
    //     this.switchElementStatus(this._playerelement, "play", "pause");
    //     this.$g("source").play();
    // }

    // private pause() {
    //     if (!this._playing) return;
    //     this._playing = false;
    //     this.switchElementStatus(this._playerelement, "pause", "play");
    //     this.$g("source").pause();
    // }

    // private play(id: number) {
    //     if (id < 0 || id == this._songid) return;
    //     this._lastsongid = this._songid;
    //     this._songid = id;
    //     this.updateUI(this._songid);

    //     this._playing = true;
    //     this.switchElementStatus(this._playerelement, "play", "pause");
    //     this.$g("source").play();
    // }

    // private prve() {
    //     if (this._songid < 0) return;
    //     this._songid = this._songid > 0 ? this._songid - 1 : 0;
    //     this.play(this._songid);
    // }

    // private next() {
    //     if (this._songid < 0) return;
    //     this._songid =
    //         this._songid < this._playlist.tracks.length - 1 ? this._songid + 1 : this._playlist.tracks.length - 1;
    //     this.play(this._songid);
    // }
    // //#endregion

    // //#region 进度条控制
    // private trackclick(e: MouseEvent) {
    //     let clip = this.$g("track-full").getBoundingClientRect();
    //     let x1 = e.clientX - clip.x;
    //     let audio = this.$g("source");
    //     audio.currentTime = (x1 / clip.width) * audio.duration;
    // }

    // private updateTimeline() {
    //     this.$g("time-total").innerHTML = Utils.TimeFormat(this.$g("source").duration);
    // }

    // private autoUpdateTrack() {
    //     // if(this._playing){
    //     //     setTimeout(this.autoUpdateTrack.bind(this), 500);
    //     // }
    //     let audio = this.$g("source");
    //     let bw = audio.buffered.length ? audio.buffered.end(audio.buffered.length - 1) / audio.duration : 0;
    //     this.settrack("track-loding", bw);
    //     var aw = audio.currentTime / audio.duration;
    //     this.settrack("track-pos", aw / bw);

    //     this.$g("time-now").innerHTML = Utils.TimeFormat(this.$g("source").currentTime);
    // }

    // private settrack(name: string, percent: number) {
    //     this.$g(name).style.width = Utils.PercentFormat(percent);
    // }
    // //#endregion

    // //#region 列表选择
    // private listClick(e: MouseEvent) {
    //     let ev = e || window.event;
    //     let tar = ev.target as HTMLElement;
    //     // Utils.Log(tar.tagName);
    //     if (tar && tar.tagName.toUpperCase() === "LI") {
    //         //Utils.Log((tar.childNodes[1] as HTMLElement).innerText);
    //         tar.classList.contains("selected") ? tar.classList.remove("selected") : tar.classList.add("selected");
    //     }
    // }

    // private listDbClick(e: MouseEvent) {
    //     let ev = e || window.event;
    //     let tar = ev.target as HTMLElement;
    //     // Utils.Log(tar.tagName);
    //     if (tar && tar.tagName.toUpperCase() === "LI") {
    //         let songid = ~~(tar.childNodes[1] as HTMLElement).innerText;
    //         Utils.Log(songid);
    //         this.play(songid - 1);
    //     }
    // }

    // private audiosrcerr() {}

    // private listSelect(id: number) {}
    //#endregion
}

export { DefaultTemplateResolver };
