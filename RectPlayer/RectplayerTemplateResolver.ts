/**
 *
 * 模板解析类,用于定义如何解析其Html模板
 *
 * */
import { PlayList, Point, Track, PlayMode } from "./PlayerModel";
import { PlayerItem } from "./PlayerItem";
import { IControlContract } from "./IControlContract";
import { Utils } from "./Utils";

interface IRectplayerTemplateResolver {
    ResloveTemplate(template: string): PlayerItem;
    RenderTemplate(data: PlayList): void;
}

interface StringEvent {
    (data: string): void;
}

/**
 * 默认的播放器样式解析器
 * 根据模板中定义的关键字解析模板
 * */
class DefaultTemplateResolver implements IRectplayerTemplateResolver, IControlContract {
    public constructor() {}

    private _playerelement: HTMLElement = null;
    private _listtemplate: string = null;

    private _liststatus: boolean = false;
    private _panelstatus: boolean = false;
    private _mute: boolean = false;
    private _playing: boolean = true;
    private _songid: number = -1;
    private _playerctl = new Map<string, HTMLElement>();
    private _volume: number = 0;
    private _volumebak: number = 0;
    private _volumemax = 6000;
    private _playmode: PlayMode = PlayMode.normal;
    private _playmodeloop: PlayMode[] = [PlayMode.normal, PlayMode.repeat, PlayMode.repeatone, PlayMode.random];
    private _playlist: PlayList = null;

    //#region Interface Function
    Play(id: number): void {}
    Pause(): void {}
    Resume(): void {}
    Next(): void {}
    Prve(): void {}
    Playlist(action: boolean): void {}
    Add(song: string | number): void {}
    Remove(song: string | number): void {}
    SwitchMode(mode: PlayMode): void {
        this.switchmode(mode);
    }
    About(): void {}
    //#endregion

    /**
     * 解析播放器模板
     * @param oritemplate  模板html
     * @param data         播放列表数据
     */
    public ResloveTemplate(oritemplate: string) {
        //Utils.Log(XML.xml2js(oritemplate));

        this._playerelement = document.createElement("div");
        this._playerelement.id = "rectPlayer";
        let result = /<player>([\s\S]*?)<\/player>[\s\S]*?<listitem>([\s\S]*?)<\/listitem>/im.exec(oritemplate);
        let playerdom = this.parseDom(result[1]);
        this._listtemplate = result[2];
        //#region GetElementref
        this.loadcontrol(playerdom);
        //#endregion

        //#region 开关控制
        this.$g("ctl-play").onclick = this.playpause.bind(this);
        this.pause();
        this.$g("openpanel").onclick = this.openctlpanel.bind(this);
        this.$g("openlist").onclick = this.openlist.bind(this);

        this.$g("volume-track").onclick = this.volumetrackclick.bind(this);
        this.$g("ctl-mute").onclick = this.volumeclick.bind(this);
        this.$g("volume").addEventListener("DOMMouseScroll", this.volumescroll.bind(this), { passive: true });
        this.$g("volume").onmousewheel = this.volumescroll.bind(this);

        this.$g("mode").addEventListener("click", this.setmode.bind(this));
        this.switchmode(this._playmode);

        this.$g("list-detail").onclick = this.listClick.bind(this);
        this.$g("list-detail").ondblclick = this.listDbClick.bind(this);
        this.setVolume(this._volumemax / 2);
        //#endregion

        this._playerelement.append(playerdom);

        let playeritem = new PlayerItem();
        playeritem.View = this._playerelement;
        playeritem.Control = this;

        this._playerctl.forEach(v => {
            v.removeAttribute("id");
        });

        return playeritem;
    }

    public RenderTemplate(data: PlayList) {
        this._playlist = data;
        if (this._playlist) {
            this.$g("list-detail").innerHTML = null;
            this._playlist.tracks.forEach((v, i, ins) => {
                let listitem = this.parseDom(this._listtemplate);
                let liid = listitem.querySelector("#id");
                liid.innerHTML = "" + (i + 1);
                liid.removeAttribute("id");
                let liname = listitem.querySelector("#info");
                liname.innerHTML = "" + v.name + (v.ar[0] && "-" + v.ar[0].name);
                liname.removeAttribute("id");
                this.$g("list-detail").appendChild(listitem.childNodes[0]);
            });
        }
        Utils.Log(this._playlist.tracks[0].al.url);
        this._songid = 0;
        this.updateUI(this._songid);
    }

    /**
     *
     */
    private updateUI(id: number) {
        if (id < this._playlist.tracks.length && this._playlist.tracks[id]) {
            this.$g("cover-avatar").style.backgroundImage = "url(" + this._playlist.tracks[id].al.url + ")";
            this.$g("source").setAttribute("src", this._playlist.tracks[id].src);
            this.$g("name").innerHTML = this._playlist.tracks[id].name;
            this.$g("author").innerHTML = this._playlist.tracks[id].ar[0].name;
        }
    }

    //#region 播放列表/控制面板
    private openlist(e: MouseEvent) {
        this._liststatus = !this._liststatus;
        if (this._liststatus) {
            this.switchElementStatus(this._playerelement, "list-on", "list-off");
        } else {
            this.switchElementStatus(this._playerelement, "list-off", "list-on");
        }
    }

    private openctlpanel(e: MouseEvent) {
        this._panelstatus = !this._panelstatus;
        if (this._panelstatus) {
            this.switchElementStatus(this._playerelement, "panel-on", "panel-off");
        } else {
            if (this._playerelement.classList.contains("list-on")) {
                this._liststatus = false;
                this.switchElementStatus(this._playerelement, "list-off", "list-on");
                setTimeout(
                    that => {
                        that.switchElementStatus(this._playerelement, "panel-off", "panel-on");
                    },
                    240,
                    this
                );
            } else {
                this.switchElementStatus(this._playerelement, "panel-off", "panel-on");
            }
        }
    }
    //#endregion

    //#region 音量调整
    /**
     * 静音
     */
    private volumeclick(e: MouseEvent) {
        this.setMute(!this._mute);
        this.setVolume(this._volume);
    }

    /**
     * 音量单击调整
     */
    private volumetrackclick(e: MouseEvent) {
        let clip = this.$g("volume").getBoundingClientRect();

        //   console.log(e, clip);
        let cw = clip.width / 2;
        let ch = clip.height / 2;
        let x1 = e.clientX - clip.x,
            y1 = e.clientY - clip.y;

        let angle = this.getcrosslineAngle({ x: cw, y: 0 }, { x: x1, y: y1 }, { x: cw, y: ch });
        this._mute = false;
        this._volume = (angle / 360) * this._volumemax;
        this.setVolume(this._volume);
    }

    /**
     * 音量滚动调整
     */
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

    /**
     * 设置音量
     */
    private setVolume(v: number) {
        this._volume = v < this._volumemax ? (v < 0 ? 0 : v) : this._volumemax;
        let newpath = this.parsePercent(this._volume / this._volumemax, { x: 32, y: 32 }, 24);
        this.$g("volume-path").setAttribute("d", newpath);

        var volume = this.$g("volume");
        if (this._volume == 0) {
            volume.classList.add("mute");
        } else {
            volume.classList.contains("mute") ? volume.classList.remove("mute") : null;
        }
        this.$g("source").volume = this._volume / this._volumemax;
    }

    /**
     * 设置静音
     */
    private setMute(flag: boolean) {
        this._mute = flag;
        Utils.Log("Mute :" + flag);
        if (flag) {
            this._volumebak = this._volume;
            this._volume = 0;
        } else {
            this._volume = this._volumebak;
        }
    }
    //#endregion

    //#region 设置播放模式
    private setmode() {
        let nowindex = this._playmodeloop.indexOf(this._playmode);
        nowindex = (nowindex + 1) % this._playmodeloop.length;
        this.switchmode(this._playmodeloop[nowindex]);
    }

    private switchmode(mode: PlayMode) {
        Utils.Log([this._playmode, mode]);
        this.switchElementStatus(this.$g("mode"), mode, this._playmode);
        this._playmode = mode;
    }
    //#endregion

    //#region 播放暂停控制
    private playpause(e: Event) {
        this._playing ? this.pause() : this.resume();
    }

    private resume() {
        if (this._playing) return;
        this._playing = true;
        this.switchElementStatus(this._playerelement, "play", "pause");
        this.$g("source").play();
    }

    private pause() {
        if (!this._playing) return;
        this._playing = false;
        this.switchElementStatus(this._playerelement, "pause", "play");
        this.$g("source").pause();
    }

    private play(id: number) {
        if (id < 0 || id == this._songid) return;
        this._songid = id;
        this.updateUI(this._songid);

        this._playing = true;
        this.switchElementStatus(this._playerelement, "play", "pause");
        this.$g("source").play();
    }

    private prve() {
        if (this._songid < 0) return;
        this._songid = this._songid > 0 ? this._songid - 1 : 0;
        this.play(this._songid);
    }

    private next() {
        if (this._songid < 0) return;
        this._songid =
            this._songid < this._playlist.tracks.length - 1 ? this._songid + 1 : this._playlist.tracks.length - 1;
        this.play(this._songid);
    }
    //#endregion

    private listClick(e: MouseEvent) {
        let ev = e || window.event;
        let tar = ev.target as HTMLElement;
        // Utils.Log(tar.tagName);
        if (tar && tar.tagName.toUpperCase() === "LI") {
            Utils.Log((tar.childNodes[1] as HTMLElement).innerText);
        }
    }

    private listDbClick(e: MouseEvent) {
        let ev = e || window.event;
        let tar = ev.target as HTMLElement;
        // Utils.Log(tar.tagName);
        if (tar && tar.tagName.toUpperCase() === "LI") {
            let songid = ~~(tar.childNodes[1] as HTMLElement).innerText;
            Utils.Log(songid);
            this.play(songid - 1);
        }
    }

    private listSelect(id: number) {}

    /**
     * 装填控件字典
     * @param rootdom
     */
    private loadcontrol(rootdom: HTMLElement) {
        this._playerctl = this._playerctl || new Map<string, HTMLElement>();
        let controldic: string[] = [
            "list-detail",
            "source",
            "cover-avatar",
            "cover-resolve",
            "cover-static",
            "ctl-play",
            "name",
            "author",
            "track-loding",
            "track-pos",
            "track-thumb",
            "time-now",
            "volume",
            "ctl-mute",
            "volume-path",
            "volume-track",
            "mode",
            "ctl-fore",
            "ctl-prve",
            "openlist",
            "openpanel",
            "ctl-listadd",
            "ctl-listremove",
            "ctl-about"
        ];
        controldic.forEach(item => {
            this._playerctl.set(item, rootdom.querySelector("#" + item));
        });
    }

    //#region UtilFunction

    /**
     * 获取控件字典中对应项
     */
    private $g(ctl: string): HTMLElement {
        return this._playerctl.get(ctl);
    }

    /**
     * 将文本转化为dom对象，方便使用筛选器进行查询
     * @param arg 要转换为dom对象的文本
     */
    private parseDom(arg: string) {
        let objE = document.createElement("div");
        objE.innerHTML = arg.replace(/(>)\s+?(<)/gm, "$1$2").trim();
        return objE;
    }

    /**
     * 将百分比转化为svg的环形
     */
    private parsePercent(percent: number, center: Point, radius: number): string {
        let A = percent * Math.PI * 2;
        let x = radius * Math.sin(A);
        let y = radius * Math.cos(A);
        x = center.x + x;
        y = center.y - y;
        let t = center.y - radius;

        if (percent < 0.5) return "M " + center.x + "," + t + " A " + radius + " " + radius + " 0 0 1 " + x + " " + y;
        else if (percent == 1)
            return "M " + center.x + "," + t + " A " + radius + " " + radius + "  0 1 1 " + (x - 0.01) + " " + y;
        else return "M " + center.x + "," + t + " A " + radius + " " + radius + "  0 1 1 " + x + " " + y;
    }

    /**
     * 获取两直线夹角
     * 直线由（p1 ,p） (p2 ,p) 确定
     */
    private getcrosslineAngle(p1: Point, p2: Point, p: Point) {
        let x1 = p1.x - p.x;
        let y1 = p1.y - p.y;
        let x2 = p2.x - p.x;
        let y2 = p2.y - p.y;

        const dot = x1 * x2 + y1 * y2;
        const det = x1 * y2 - y1 * x2;
        const angle = (Math.atan2(det, dot) / Math.PI) * 180;
        return (angle + 360) % 360;
    }

    /**
     *
     * @param element
     * @param tip
     */
    private setElementTip(element: HTMLElement, tip: string) {
        element && (element.title = tip);
    }

    /**
     *
     * @param element 需要设置的元素
     * @param normal 元素的默认状态
     * @param active 元素的变化状态
     */
    private switchElementStatus(element: HTMLElement, normal: string, active: string) {
        if (element) {
            let classl = element.classList;
            // prepare && prepare(normal);
            if (normal == null) {
                classl.contains(active) ? classl.remove(active) : null;
                return;
            } else {
                classl.contains(normal)
                    ? null
                    : classl.contains(active)
                    ? (classl.remove(active), classl.add(normal))
                    : classl.add(normal);
            }
        }
    }

    //#endregion
}

export { IRectplayerTemplateResolver, DefaultTemplateResolver };
