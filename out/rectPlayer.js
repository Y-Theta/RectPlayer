(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./RectPlayer/dependence/extends.js":
/*!******************************************!*\
  !*** ./RectPlayer/dependence/extends.js ***!
  \******************************************/
/*! namespace exports */
/*! export __extends [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => /* binding */ __extends
/* harmony export */ });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/***/ }),

/***/ "./RectPlayer/Model/PlayerModel.ts":
/*!*****************************************!*\
  !*** ./RectPlayer/Model/PlayerModel.ts ***!
  \*****************************************/
/*! flagged exports */
/*! export Author [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Avatar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PlayList [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PlayMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Point [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RectPlayerControl [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RectPlayerOption [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Track [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RectPlayerControl = exports.PlayMode = exports.Point = exports.RectPlayerOption = exports.Avatar = exports.Author = exports.Track = exports.PlayList = void 0;
/**
 * 播放列表信息
 * */
var PlayList = /** @class */ (function () {
    function PlayList() {
    }
    return PlayList;
}());
exports.PlayList = PlayList;
/**
 * 歌曲信息
 * */
var Track = /** @class */ (function () {
    function Track() {
    }
    return Track;
}());
exports.Track = Track;
/**
 * 歌手信息
 * */
var Author = /** @class */ (function () {
    function Author() {
    }
    return Author;
}());
exports.Author = Author;
/**
 * 封面信息
 * */
var Avatar = /** @class */ (function () {
    function Avatar() {
    }
    return Avatar;
}());
exports.Avatar = Avatar;
/**
 *
 * */
var RectPlayerOption = /** @class */ (function () {
    function RectPlayerOption() {
    }
    return RectPlayerOption;
}());
exports.RectPlayerOption = RectPlayerOption;
/**
 * 播放器控件
 */
var RectPlayerControl = /** @class */ (function () {
    function RectPlayerControl() {
    }
    return RectPlayerControl;
}());
exports.RectPlayerControl = RectPlayerControl;
/**
 *
 */
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());
exports.Point = Point;
/**
 *
 */
var PlayMode;
(function (PlayMode) {
    PlayMode["normal"] = "normal";
    PlayMode["repeat"] = "repeat";
    PlayMode["repeatone"] = "repeatone";
    PlayMode["random"] = "random";
})(PlayMode || (PlayMode = {}));
exports.PlayMode = PlayMode;


/***/ }),

/***/ "./RectPlayer/NeteaseCore.ts":
/*!***********************************!*\
  !*** ./RectPlayer/NeteaseCore.ts ***!
  \***********************************/
/*! flagged exports */
/*! export NeteaseCore [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 *
 * @Y_Theta http://blog.y-theta.cn
 *
 * PlayerCoreContract
 *
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NeteaseCore = void 0;
var Utils_1 = __webpack_require__(/*! ./Utils */ "./RectPlayer/Utils.ts");
var PlayerModel_1 = __webpack_require__(/*! ./Model/PlayerModel */ "./RectPlayer/Model/PlayerModel.ts");
var Tasks_1 = __webpack_require__(/*! ./dependence/Tasks */ "./RectPlayer/dependence/Tasks.ts");
/** 网易云音乐资源 */
var NeteaseCore = /** @class */ (function () {
    function NeteaseCore() {
        //#endregion
        this._playlist = null;
        this._loaded = false;
        this._timeout = 200; //单首歌url获取超时 平均
        this._timeouttimer = 0;
    }
    /** 初始化播放列表 */
    NeteaseCore.prototype.Init = function (url, callback) {
        var _this = this;
        var id = 0;
        if (typeof url == "string") {
            if (!/[^0-9]/.exec(url)) {
                id = Number.parseInt(url);
            }
            else {
                return;
            }
        }
        else {
            id = url;
        }
        Tasks_1.Tasks.Ajax({
            url: NeteaseCore._playlistapi + "id=" + id,
            prepare: function () {
                Utils_1.Utils.Log("playlist : " + id);
            },
            success: function (args) {
                _this._playlist = new PlayerModel_1.PlayList();
                var orilist = null;
                try {
                    var pl_1 = _this._playlist;
                    orilist = JSON.parse(args.stepresult);
                    if (orilist && orilist.code && orilist.code === 200) {
                        var oripl = orilist.playlist;
                        pl_1.avatarUrl = oripl.coverImgUrl;
                        pl_1.nickname = oripl.name;
                        pl_1.signature = oripl.id;
                        pl_1.tracks = new Array();
                        oripl.tracks.forEach(function (t) {
                            pl_1.tracks.push({
                                id: t.id,
                                name: t.name,
                                src: null,
                                al: {
                                    id: t.al.id,
                                    name: t.al.name,
                                    url: t.al.picUrl,
                                },
                                ar: _this.getauthor(t.ar),
                                valid: true
                            });
                        });
                    }
                }
                catch (_a) { }
                callback(_this._playlist);
            },
        }).Execute();
    };
    /** 更新播放列表 */
    NeteaseCore.prototype.Update = function (callback, ids) {
        var _this = this;
        var updatelist = null;
        if (ids != undefined) {
            updatelist = [];
            typeof ids == "number" ? updatelist.push(ids) : updatelist.concat(ids);
        }
        var updatetask = [];
        if (updatelist) {
            updatelist.forEach(function (v) {
                var track = _this._playlist.tracks[v];
                updatetask.push(_this.ajaxsongsrc(track));
            });
        }
        else {
            this._playlist.tracks.forEach(function (v) {
                updatetask.push(_this.ajaxsongsrc(v));
            });
        }
        Tasks_1.Tasks.WaitAll(updatetask, function () { return callback(_this._playlist); }, null, Tasks_1.TaskOrder.Default);
    };
    NeteaseCore.prototype.Add = function (url, callback, pos) { };
    NeteaseCore.prototype.Remove = function (ids, callback) { };
    /** 更新单曲的音频源的任务 */
    NeteaseCore.prototype.ajaxsongsrc = function (track) {
        return Tasks_1.Tasks.Ajax({
            url: NeteaseCore._tracksrcapi + "id=" + track.id + "&br=320000",
            prepare: function () {
                Utils_1.Utils.Log("Song - s -" + track.id);
            },
            success: function (args) {
                Utils_1.Utils.Log("Song - e -" + track.id);
                var url = null;
                try {
                    url = JSON.parse(args.stepresult).data[0].url;
                }
                catch (_a) { }
                track.valid = !!url;
                track.src = url;
            },
        });
    };
    // private getneteasePlayListbyID(id: number) {
    //     let orilist: any = null;
    //     Utils.Ajax({
    //         async: true,
    //         url: "http://api.y-theta.cn/Netease/playlist/detail?id=" + id,
    //         success: (data: string) => {
    //             try {
    //                 orilist = JSON.parse(data);
    //             } catch {}
    //             if (orilist && orilist.code && orilist.code === 200) {
    //                 let oripl = orilist.playlist;
    //                 let pl = new PlayList();
    //                 pl.avatarUrl = oripl.coverImgUrl;
    //                 pl.nickname = oripl.name;
    //                 pl.signature = oripl.id;
    //                 pl.tracks = new Array<Track>();
    //                 this.Playlist = pl;
    //                 oripl.tracks.forEach((t: any) => {
    //                     pl.tracks.push({
    //                         id: t.id,
    //                         name: t.name,
    //                         src: null,
    //                         al: {
    //                             id: t.al.id,
    //                             name: t.al.name,
    //                             url: t.al.picUrl,
    //                         },
    //                         ar: this.getauthor(t.ar),
    //                     });
    //                 });
    //                 pl.tracks.forEach((t) => {
    //                     Utils.Ajax({
    //                         async: true,
    //                         url: "http://api.y-theta.cn/Netease/music/url?id=" + t.id + "&br=128000",
    //                         success: (data: string) => {
    //                             Utils.Log("Song : " + Utils.PadLeft(t.name, 16) + "[ Fetched ]");
    //                             t.src = JSON.parse(data).data[0].url;
    //                         },
    //                         failed: (status: number) => {
    //                             Utils.Log(status);
    //                         },
    //                         prepare: () => {
    //                             Utils.Log("Song : " + Utils.PadLeft(t.name, 16) + "[ Fetching ]");
    //                         },
    //                     });
    //                 });
    //                 this._timeouttimer = this._timeout * pl.tracks.length;
    //                 setTimeout(this.waitAsync.bind(this), 100);
    //             } else {
    //                 Utils.Log("Playlist Load Failed! Please try later or check if the id is right ");
    //             }
    //         },
    //         failed: (status: number) => {
    //             Utils.Log("Playlist Load Failed!" + status);
    //         },
    //         prepare: () => {
    //             this.Loaded = false;
    //             this.Timeout = false;
    //             Utils.Log("Getting Playlist");
    //         },
    //     });
    // }
    NeteaseCore.prototype.getauthor = function (ars) {
        var arr = new Array();
        ars.forEach(function (ar) {
            arr.push({
                id: ar.id,
                name: ar.name,
            });
        });
        return arr;
    };
    //#region
    NeteaseCore._apiurl = "http://api.y-theta.cn/Netease";
    NeteaseCore._playlistapi = NeteaseCore._apiurl + "/playlist/detail?";
    NeteaseCore._tracksrcapi = NeteaseCore._apiurl + "/music/url?";
    return NeteaseCore;
}());
exports.NeteaseCore = NeteaseCore;


/***/ }),

/***/ "./RectPlayer/RectPlayer.ts":
/*!**********************************!*\
  !*** ./RectPlayer/RectPlayer.ts ***!
  \**********************************/
/*! flagged exports */
/*! export RectPlayer [provided] [maybe used in main (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used in main (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in main (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @Y_Theta http://blog.y-theta.cn
 *
 * An audio player based on
 * Skplayer         https://github.com/wangpengfei15975/skPlayer
 * netmusic-node    https://github.com/sqaiyan/netmusic-node
 *
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RectPlayer = void 0;
var Utils_1 = __webpack_require__(/*! ./Utils */ "./RectPlayer/Utils.ts");
var PlayerModel_1 = __webpack_require__(/*! ./Model/PlayerModel */ "./RectPlayer/Model/PlayerModel.ts");
var Tasks_1 = __webpack_require__(/*! ./dependence/Tasks */ "./RectPlayer/dependence/Tasks.ts");
var RectplayerTemplateResolver_1 = __webpack_require__(/*! ./RectplayerTemplateResolver */ "./RectPlayer/RectplayerTemplateResolver.ts");
var NeteaseCore_1 = __webpack_require__(/*! ./NeteaseCore */ "./RectPlayer/NeteaseCore.ts");
var SongSelecter_1 = __webpack_require__(/*! ./SongSelecter */ "./RectPlayer/SongSelecter.ts");
var RectPlayer = /** @class */ (function () {
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
    function RectPlayer(option) {
        //#region IOC
        this._resolver = null;
        this._core = null;
        this._selecter = null;
        //#endregion
        //#region Properties
        this._listflag = false;
        this._panelflag = false;
        this._mute = false;
        this._playing = null;
        this._priv = false;
        this._enableresolve = false;
        this._volume = 0;
        this._volumebak = 0;
        this._volumeref = 6000;
        this._analyserfreq = 200;
        this._srcid = null;
        this._playstack = null;
        this._playlist = null;
        this._playmode = PlayerModel_1.PlayMode.normal;
        this._playmodeloop = [PlayerModel_1.PlayMode.normal, PlayerModel_1.PlayMode.repeat, PlayerModel_1.PlayMode.repeatone, PlayerModel_1.PlayMode.random];
        this._playerdom = null;
        this._playcontrol = null;
        /** AudioResolve */
        this._audiocontext = null;
        this._source = null;
        this._gain = null;
        this._analyser = null;
        this._analyzeInterval = null;
        this._resolvedarrbuffer = null;
        this._dependencecollection = null;
        this._templatesrc = null;
        this._stylesrc = null;
        Utils_1.Utils._enablelog = true;
        this._resolver = new RectplayerTemplateResolver_1.DefaultTemplateResolver();
        this._core = new NeteaseCore_1.NeteaseCore();
        this._selecter = new SongSelecter_1.SongSelecter();
        this._dependencecollection = option.Dependence || [Utils_1.Utils.Path("resource") + "/javascript/lib/less.min.js"];
        this._templatesrc = option.Template || Utils_1.Utils.Path() + "/template/Template.xml";
        this._stylesrc = option.Style || Utils_1.Utils.Path() + "/template/style.less";
        this._srcid = option.PlaylistId;
        this._playstack = [];
        Utils_1.Utils.Log("\\ RectPlayer  1.0.0 \n\\ @Y_Theta \n\\ http:\\\\blog.y-theta.com \n\\ Starting ....");
    }
    //#endregion
    //#region IControlContract
    RectPlayer.prototype.Play = function (id) { };
    RectPlayer.prototype.Pause = function () { };
    RectPlayer.prototype.Resume = function () { };
    RectPlayer.prototype.Next = function () { };
    RectPlayer.prototype.Prve = function () { };
    RectPlayer.prototype.Playlist = function (action) { };
    RectPlayer.prototype.SwitchMode = function (mode) { };
    RectPlayer.prototype.About = function () { };
    //#endregion
    /** 初始化播放器 */
    RectPlayer.prototype.Init = function () {
        //加载依赖文件
        var loadtasks = [];
        this._dependencecollection &&
            this._dependencecollection.forEach(function (element) {
                loadtasks.push(Tasks_1.Tasks.Ajax({
                    url: element,
                    prepare: function () { return Utils_1.Utils.Log("loading ... " + element); },
                    success: function (arg) { return Utils_1.Utils.Log(arg.stepresult + " loaded"); },
                    failed: function (arg) { return Utils_1.Utils.Log(arg.stepresult + " failed"); },
                }));
            });
        Tasks_1.Tasks.WaitAll(loadtasks, this.loadtemplate.bind(this));
    };
    /** 加载模板 */
    RectPlayer.prototype.loadtemplate = function () {
        var lesstask = Tasks_1.Tasks.Ajax({
            url: this._stylesrc,
            prepare: function () { return Utils_1.Utils.Log("GetTemplate Less :" + Utils_1.Utils.Path() + "/template/style.less"); },
        });
        var xmltask = Tasks_1.Tasks.Ajax({
            url: this._templatesrc,
            prepare: function () { return Utils_1.Utils.Log("GetTemplate Html :" + Utils_1.Utils.Path() + "/template/Template.xml"); },
        });
        Tasks_1.Tasks.WaitAll([lesstask, xmltask], this.rendertemplate.bind(this), null, Tasks_1.TaskOrder.Sequence);
    };
    /** 渲染模板 绑定控制器 */
    RectPlayer.prototype.rendertemplate = function (num, res, timeout) {
        var _this = this;
        // Utils.Log((!!timeout ? "timeout" : "succeed") + "  -  " + res.length);
        if (res[0]) {
            less.render(res[0], function (e, o) {
                var style = document.createElement("style");
                style.type = "text/css";
                style.innerHTML = o.css;
                document.getElementsByTagName("head").item(0).appendChild(style);
            });
        }
        if (res[1]) {
            this._resolver.ResloveTemplate(res[1], function (ctl, dom) {
                _this._playcontrol = ctl;
                _this._playerdom = dom;
                _this.bindingctl();
                document.body.appendChild(_this._playerdom);
                /** 获取播放列表信息 */
                _this._core.Init(_this._srcid, function (pl) {
                    _this._playlist = pl;
                    Utils_1.Utils.Log(pl);
                    _this._resolver.RenderTemplate(_this._playlist, function () {
                        /** 获取歌曲url */
                        _this._core.Update(_this.onlistupdate.bind(_this));
                    });
                });
            });
        }
    };
    /** 播放列表刷新后行为 */
    RectPlayer.prototype.onlistupdate = function (list) {
        Utils_1.Utils.Log("Update - list");
        Utils_1.Utils.Log(this._playlist);
        /** 加载歌曲列表 */
        this._resolver.RenderPlaylist(this._playlist.tracks);
        var firstvalid = this._playlist.tracks.findIndex(function (value) {
            return value.valid;
        });
        this.preparesong(firstvalid);
    };
    RectPlayer.prototype.renderlist = function () { };
    /** 绑定控制节点 */
    RectPlayer.prototype.bindingctl = function () {
        var ctl = this._playcontrol;
        ctl.ctl_listtoogle.onclick = this.listmousetoggle.bind(this);
        ctl.ctl_paneltoogle.onclick = this.panelmousetoggle.bind(this);
        ctl.ctl_play.onclick = this.playmousetoggle.bind(this);
        ctl.ctl_fore.onclick = this.next.bind(this);
        ctl.ctl_prve.onclick = this.prve.bind(this);
        ctl.ctl_mode.onclick = this.switchplaymode.bind(this);
        this.switchmode(this._playmode);
        ctl.source.onplay = this.resolvesrctrack.bind(this);
        ctl.source.onpause = this.onsourcepause.bind(this);
        ctl.source.onended = this.onsourceended.bind(this);
        ctl.source.onerror = this.onsourceerror.bind(this);
        ctl.source.onemptied = this.onsourceerror.bind(this);
        ctl.source.ontimeupdate = this.autoupdatetrack.bind(this);
        ctl.source.onprogress = this.autoupdatetrack.bind(this);
        ctl.source.ondurationchange = this.autoupdatetimeline.bind(this);
        this.pause();
        ctl.volume_track.onclick = this.volumetrackclick.bind(this);
        ctl.ctl_mute.onclick = this.volumeclick.bind(this);
        ctl.volume.onmousewheel = this.volumescroll.bind(this);
        ctl.volume.addEventListener("DOMMouseScroll", this.volumescroll.bind(this), { passive: true });
        ctl.track_full.onclick = this.ontrackclick.bind(this);
    };
    //#region 播放列表/控制面板
    RectPlayer.prototype.listmousetoggle = function (e) {
        this._listflag = !this._listflag;
        this.togglelist(this._listflag);
    };
    /** 转换播放列表状态 */
    RectPlayer.prototype.togglelist = function (flag) {
        if (flag) {
            this.switchElementStatus(this._playerdom, "list-on", "list-off");
        }
        else {
            this.switchElementStatus(this._playerdom, "list-off", "list-on");
        }
    };
    RectPlayer.prototype.panelmousetoggle = function (e) {
        this._panelflag = !this._panelflag;
        this.togglepanel(this._panelflag);
    };
    /** 转换控制栏状态 */
    RectPlayer.prototype.togglepanel = function (flag) {
        var _this = this;
        if (flag) {
            this.switchElementStatus(this._playerdom, "panel-on", "panel-off");
        }
        else {
            if (this._playerdom.classList.contains("list-on")) {
                this._panelflag = false;
                this.switchElementStatus(this._playerdom, "list-off", "list-on");
                setTimeout(function () {
                    _this.switchElementStatus(_this._playerdom, "panel-off", "panel-on");
                }, 240);
            }
            else {
                this.switchElementStatus(this._playerdom, "panel-off", "panel-on");
            }
        }
    };
    //#endregion
    //#region 音量调整
    /** 静音 */
    RectPlayer.prototype.volumeclick = function (e) {
        this.setMute(!this._mute);
    };
    /** 音量单击调整 */
    RectPlayer.prototype.volumetrackclick = function (e) {
        var clip = this._playcontrol.volume.getBoundingClientRect();
        //   console.log(e, clip);
        var cw = clip.width / 2;
        var ch = clip.height / 2;
        var x1 = e.clientX - clip.x, y1 = e.clientY - clip.y;
        var angle = Utils_1.Utils.AngleLL({ x: cw, y: 0 }, { x: x1, y: y1 }, { x: cw, y: ch });
        this._mute = false;
        this._volume = (angle / 360) * this._volumeref;
        this.setVolume(this._volume);
    };
    /** 音量滚动调整 */
    RectPlayer.prototype.volumescroll = function (e) {
        e = e || window.event;
        var data;
        if (e.wheelDelta) {
            //IE/Opera/Chrome
            data = e.wheelDelta;
        }
        else if (e.detail) {
            //Firefox
            data = e.detail;
        }
        this._mute && this.setMute(false);
        this._volume += data;
        this.setVolume(this._volume);
    };
    /** 设置静音 */
    RectPlayer.prototype.setMute = function (flag) {
        this._mute = flag;
        Utils_1.Utils.Log("Mute :" + flag);
        if (flag) {
            this._volumebak = this._volume;
            this._volume = 0;
        }
        else {
            this._volume = this._volumebak;
        }
        this.setVolume(this._volume);
    };
    /** 设置音量 */
    RectPlayer.prototype.setVolume = function (v) {
        this._volume = v < this._volumeref ? (v < 0 ? 0 : v) : this._volumeref;
        var newpath = Utils_1.Utils.Percent(this._volume / this._volumeref, { x: 32, y: 32 }, 24);
        this._playcontrol.volume_path.setAttribute("d", newpath);
        var volume = this._playcontrol.volume;
        if (this._volume == 0) {
            volume.classList.add("mute");
        }
        else {
            volume.classList.contains("mute") ? volume.classList.remove("mute") : null;
        }
        this._gain && (this._gain.gain.value = this._volume / this._volumeref);
    };
    //#endregion
    //#region 播放暂停控制
    RectPlayer.prototype.playmousetoggle = function (e) {
        this._playing ? this.pause() : this.resume();
    };
    RectPlayer.prototype.resume = function () {
        if (this._playing)
            return;
        this._playing = true;
        this.switchElementStatus(this._playerdom, "play", "pause");
        this._playcontrol.source.play();
    };
    RectPlayer.prototype.pause = function () {
        if (this._playing != undefined && !this._playing)
            return;
        this._playing = false;
        this.switchElementStatus(this._playerdom, "pause", "play");
        this._playcontrol.source.pause();
    };
    RectPlayer.prototype.play = function (id) {
        if (id < 0 ||
            !this._playlist ||
            id >= this._playlist.tracks.length ||
            id === this._playstack[this._playstack.length - 1])
            return;
        this.preparesong(id);
        this.pause();
        this.resume();
    };
    RectPlayer.prototype.prve = function () {
        if (this._playstack.length <= 0)
            return;
        //TODO:: select prve
        this._priv = true;
        var prve = this._selecter["Priv"](this._playmode, this._playlist.tracks, this._playstack[this._playstack.length - 1], this._playstack);
        if (typeof prve == "number")
            this.play(prve);
    };
    RectPlayer.prototype.next = function () {
        if (this._playstack.length <= 0)
            return;
        //TODO:: select next
        var next = this._selecter["Next"](this._playmode, this._playlist.tracks, this._playstack[this._playstack.length - 1], this._playstack);
        if (typeof next == "number")
            this.play(next);
    };
    RectPlayer.prototype.preparesong = function (id) {
        this._playstack.push(id);
        this._resolver.UpdateUI(this._playlist.tracks[id], this._playstack);
    };
    RectPlayer.prototype.onsourceended = function () {
        this.pause();
        this.next();
    };
    /** 进度条控制 */
    RectPlayer.prototype.ontrackclick = function (e) {
        var clip = this._playcontrol.track_full.getBoundingClientRect();
        var x1 = e.clientX - clip.x;
        var audio = this._playcontrol.source;
        audio && (audio.currentTime = (x1 / clip.width) * audio.duration);
    };
    /** 自动更新歌曲播放进度 */
    RectPlayer.prototype.autoupdatetrack = function () {
        var audio = this._playcontrol.source;
        if (audio.src) {
            var bw = audio.buffered.length ? audio.buffered.end(audio.buffered.length - 1) / audio.duration : 0;
            this._playcontrol.track_loding.style.width = Utils_1.Utils.PercentFormat(bw);
            var aw = audio.currentTime / audio.duration;
            this._playcontrol.track_now.style.width = "" + (this._playcontrol.track_full.clientWidth - 8) * aw + "px";
            this._playcontrol.time_now.innerHTML = Utils_1.Utils.TimeFormat(audio.currentTime);
        }
    };
    /** 自动更新歌曲时长 */
    RectPlayer.prototype.autoupdatetimeline = function () {
        this._playcontrol.time_des.innerHTML = Utils_1.Utils.TimeFormat(this._playcontrol.source.duration);
        this._playcontrol.track_loding.style.width = "0";
        this._playcontrol.track_now.style.width = "0";
    };
    //#endregion
    //#region 设置播放模式
    RectPlayer.prototype.switchplaymode = function () {
        var nowindex = this._playmodeloop.indexOf(this._playmode);
        nowindex = (nowindex + 1) % this._playmodeloop.length;
        this.switchmode(this._playmodeloop[nowindex]);
    };
    RectPlayer.prototype.switchmode = function (mode) {
        Utils_1.Utils.Log([this._playmode, mode]);
        this.switchElementStatus(this._playcontrol.ctl_mode, mode, this._playmode);
        this._playmode = mode;
    };
    //#endregion
    //#region 音频可视化
    RectPlayer.prototype.resolvesrctrack = function () {
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
            this.setVolume(this._gain.gain.value * 6000);
        }
        if (this._enableresolve) {
            this._analyzeInterval = setInterval(this.renderresolve.bind(this), this._analyserfreq);
        }
    };
    RectPlayer.prototype.onsourceerror = function (e) {
        Utils_1.Utils.Log("Src err : " + e);
        this._playcontrol.time_des.innerHTML = "00:00";
        this._playcontrol.track_loding.style.width = "0";
        this._playcontrol.track_now.style.width = "0";
        if (this._analyzeInterval) {
            clearInterval(this._analyzeInterval);
            this._analyzeInterval = null;
        }
    };
    RectPlayer.prototype.onsourcepause = function () {
        if (this._analyzeInterval) {
            clearInterval(this._analyzeInterval);
            this._analyzeInterval = null;
        }
    };
    RectPlayer.prototype.renderresolve = function () {
        //TODO:: paint resolve graph
        this._analyser.getByteFrequencyData(this._resolvedarrbuffer);
        Utils_1.Utils.Log(this._resolvedarrbuffer);
    };
    RectPlayer.prototype.getaudiocontext = function () {
        window.AudioContext =
            window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        try {
            return new AudioContext();
        }
        catch (e) {
            console.log(e);
        }
    };
    //#endregion
    RectPlayer.prototype.switchElementStatus = function (ctl, state1, state2) {
        Utils_1.Utils.SwitchElementStatus(ctl, state1, state2);
    };
    return RectPlayer;
}());
exports.RectPlayer = RectPlayer;


/***/ }),

/***/ "./RectPlayer/RectplayerTemplateResolver.ts":
/*!**************************************************!*\
  !*** ./RectPlayer/RectplayerTemplateResolver.ts ***!
  \**************************************************/
/*! flagged exports */
/*! export DefaultTemplateResolver [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultTemplateResolver = void 0;
/**
 *
 * 模板解析类,用于定义如何解析其Html模板
 *
 * */
var PlayerModel_1 = __webpack_require__(/*! ./Model/PlayerModel */ "./RectPlayer/Model/PlayerModel.ts");
var Utils_1 = __webpack_require__(/*! ./Utils */ "./RectPlayer/Utils.ts");
/**
 * 默认的播放器样式解析器
 * 根据模板中定义的关键字解析模板
 * */
var DefaultTemplateResolver = /** @class */ (function () {
    function DefaultTemplateResolver() {
        this._playerelement = null;
        this._listtemplate = null;
        this._control = null;
        this._playlist = null;
        this._playmode = PlayerModel_1.PlayMode.normal;
        this._playmodeloop = [PlayerModel_1.PlayMode.normal, PlayerModel_1.PlayMode.repeat, PlayerModel_1.PlayMode.repeatone, PlayerModel_1.PlayMode.random];
        this._maxtrackwidth = 0;
        this._pretrackwidth = 0;
        this._acttrackwidth = 0;
    }
    //#region Interface Function
    /**
     * 解析播放器模板
     * @param oritemplate  模板html
     * @param callback     回调
     */
    DefaultTemplateResolver.prototype.ResloveTemplate = function (oritemplate, callback) {
        //Utils.Log(XML.xml2js(oritemplate));
        this._playerelement = document.createElement("div");
        this._playerelement.id = "rectPlayer";
        var result = /<player>([\s\S]*?)<\/player>[\s\S]*?<listitem>([\s\S]*?)<\/listitem>/im.exec(oritemplate);
        var playerdom = Utils_1.Utils.Dom(result[1]);
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
        for (var key in this._control) {
            if (this._control.hasOwnProperty(key)) {
                this._control[key].removeAttribute("id");
            }
        }
        this._playerelement.append(playerdom);
        callback(this._control, this._playerelement);
    };
    DefaultTemplateResolver.prototype.RenderTemplate = function (data, callback) {
        this._playlist = data.tracks;
        // this._songid = 0;
        // this._lastsongid = 0;
        // this.updateUI(this._songid);
        callback(null);
    };
    DefaultTemplateResolver.prototype.RenderPlaylist = function (list) {
        var _this = this;
        this._playlist = list;
        if (this._playlist) {
            this._control.list.innerHTML = null;
            this._playlist.forEach(function (v, i) {
                var listitem = Utils_1.Utils.Dom(_this._listtemplate);
                var liid = listitem.querySelector("#id");
                liid.innerHTML = "" + (i + 1);
                liid.removeAttribute("id");
                var liname = listitem.querySelector("#info");
                liname.innerHTML = "" + v.name + (v.ar[0] && "-" + v.ar[0].name);
                liname.removeAttribute("id");
                if (!v.valid) {
                    var li = listitem.querySelector("li");
                    li.classList.add("unavailable");
                }
                _this._control.list.appendChild(listitem.childNodes[0]);
            });
        }
    };
    //#endregion
    /**
     * 装填控件
     * @param dom
     */
    DefaultTemplateResolver.prototype.loadControl = function (dom) {
        var player = new PlayerModel_1.RectPlayerControl();
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
    };
    /**
     * 使用API得到的音乐SRC为临时地址，需要定时刷新
     */
    DefaultTemplateResolver.prototype.RefreshSrc = function () { };
    /**
     *
     */
    DefaultTemplateResolver.prototype.UpdateUI = function (track, stack) {
        this._control.cover_avatar.style.backgroundImage = "url(" + track.al.url + "?param=256y256" + ")";
        this._control.source.setAttribute("src", track.src);
        this._control.name.innerHTML = track.name;
        this._control.author.innerHTML = track.ar[0].name;
        var children = this._control.list.childNodes;
        stack.length >= 2 && children.item(stack[stack.length - 2]).classList.remove("playing");
        children.item(stack[stack.length - 1]).classList.remove("selected");
        children.item(stack[stack.length - 1]).classList.add("playing");
    };
    return DefaultTemplateResolver;
}());
exports.DefaultTemplateResolver = DefaultTemplateResolver;


/***/ }),

/***/ "./RectPlayer/SongSelecter.ts":
/*!************************************!*\
  !*** ./RectPlayer/SongSelecter.ts ***!
  \************************************/
/*! flagged exports */
/*! export SongSelecter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SongSelecter = void 0;
var PlayerModel_1 = __webpack_require__(/*! ./Model/PlayerModel */ "./RectPlayer/Model/PlayerModel.ts");
/**  */
var SongSelecter = /** @class */ (function () {
    function SongSelecter() {
    }
    /** 选择前一首歌曲 */
    SongSelecter.prototype.Priv = function (mode, tracks, now, history) {
        if (!tracks) {
            return null;
        }
        var privid = typeof now == "number" ? now : tracks.indexOf(now);
        switch (mode) {
            case PlayerModel_1.PlayMode.normal:
            case PlayerModel_1.PlayMode.repeat:
            case PlayerModel_1.PlayMode.repeatone:
                if (history)
                    privid = history[history.length - 2];
                else
                    privid = (privid - 1 + tracks.length) % tracks.length;
                break;
            case PlayerModel_1.PlayMode.random:
                if (history)
                    privid = history[history.length - 2];
                else
                    privid = Math.floor(Math.random() * tracks.length);
                break;
            default:
                break;
        }
        return privid;
    };
    /** 选择后一首歌曲 */
    SongSelecter.prototype.Next = function (mode, tracks, now, history) {
        if (!tracks) {
            return null;
        }
        var privid = typeof now == "number" ? now : tracks.indexOf(now);
        switch (mode) {
            case PlayerModel_1.PlayMode.normal:
            case PlayerModel_1.PlayMode.repeat:
            case PlayerModel_1.PlayMode.repeatone:
                privid = (privid + 1) % tracks.length;
                break;
            case PlayerModel_1.PlayMode.random:
                privid = Math.floor(Math.random() * tracks.length);
                break;
            // case PlayMode.repeat:
            //     if (history) privid = history[history.length - 2];
            //     else privid = (privid - 1 + tracks.length) % tracks.length;
            //     break;
            // case PlayMode.repeatone:
            //     if (history) privid = history[history.length - 2];
            //     else privid = (privid - 1 + tracks.length) % tracks.length;
            //     break;
            default:
                break;
        }
        return privid;
    };
    return SongSelecter;
}());
exports.SongSelecter = SongSelecter;


/***/ }),

/***/ "./RectPlayer/Utils.ts":
/*!*****************************!*\
  !*** ./RectPlayer/Utils.ts ***!
  \*****************************/
/*! flagged exports */
/*! export Utils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Utils = void 0;
/**
 *
 * @Y_Theta http://blog.y-theta.cn
 *
 * Utils
 *
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * 判断有无中文字符
     * @param temp
     */
    Utils.hasChinese = function (temp) {
        //var re = /.*[\\u4E00-\\u9FFF]+.*$/;
        return escape(temp).indexOf("%u") >= 0;
    };
    /**
     * 将文本转化为dom对象，方便使用筛选器进行查询
     * @param arg 要转换为dom对象的文本
     */
    Utils.Dom = function (arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg.replace(/(>)\s+?(<)/gm, "$1$2").trim();
        return objE;
    };
    /**
     * 输出函数
     */
    Utils.Log = function (obj) {
        Utils._enablelog ? obj && console.log(obj) : null;
    };
    /* 质朴长存法  by lifesinger */
    Utils.PadLeft = function (num, n) {
        var padnum = num.toString();
        var len = num.toString().length;
        var charp = typeof num == "string" ? (Utils.hasChinese(num) ? "\u3000" : " ") : "0";
        while (len < n) {
            padnum = charp + padnum;
            len++;
        }
        return padnum;
    };
    /**
     * 获取目录路径
     */
    Utils.Path = function (type) {
        if (type === void 0) { type = "root"; }
        switch (type) {
            case "resource":
                return Utils._respath;
            case "root":
                return (Utils._rootpath ||
                    ((Utils._rootpath = document.URL.replace(/([\s\S]*)(\/[^\/]*?\.html)/i, "$1")), Utils._rootpath));
            case "":
                break;
        }
    };
    /**
     * 将时间转化为 00:00格式
     * @param time
     */
    Utils.TimeFormat = function (time) {
        var tempMin = ~~(time / 60);
        var tempSec = ~~(time % 60);
        var curMin = tempMin < 10 ? "0" + tempMin : tempMin;
        var curSec = tempSec < 10 ? "0" + tempSec : tempSec;
        return curMin + ":" + curSec;
    };
    /**
     * 将小数转换为百分比
     * @param percent
     */
    Utils.PercentFormat = function (percent) {
        return (percent * 100).toFixed(2) + "%";
    };
    /**
     * 将百分比转化为svg的环形
     */
    Utils.Percent = function (percent, center, radius) {
        var A = percent * Math.PI * 2;
        var x = radius * Math.sin(A);
        var y = radius * Math.cos(A);
        x = center.x + x;
        y = center.y - y;
        var t = center.y - radius;
        if (percent < 0.5)
            return "M " + center.x + "," + t + " A " + radius + " " + radius + " 0 0 1 " + x + " " + y;
        else if (percent == 1)
            return "M " + center.x + "," + t + " A " + radius + " " + radius + "  0 1 1 " + (x - 0.01) + " " + y;
        else
            return "M " + center.x + "," + t + " A " + radius + " " + radius + "  0 1 1 " + x + " " + y;
    };
    /**
     * 获取两直线夹角
     * 直线由（p1 ,p） (p2 ,p) 确定
     */
    Utils.AngleLL = function (p1, p2, p) {
        var x1 = p1.x - p.x;
        var y1 = p1.y - p.y;
        var x2 = p2.x - p.x;
        var y2 = p2.y - p.y;
        var dot = x1 * x2 + y1 * y2;
        var det = x1 * y2 - y1 * x2;
        var angle = (Math.atan2(det, dot) / Math.PI) * 180;
        return (angle + 360) % 360;
    };
    /**
     *
     * @param element 需要设置的元素
     * @param normal 元素的默认状态
     * @param active 元素的变化状态
     */
    Utils.SwitchElementStatus = function (element, normal, active) {
        if (element) {
            var classl = element.classList;
            // prepare && prepare(normal);
            if (normal == null) {
                classl.contains(active) ? classl.remove(active) : null;
                return;
            }
            else {
                classl.contains(normal)
                    ? null
                    : classl.contains(active)
                        ? (classl.remove(active), classl.add(normal))
                        : classl.add(normal);
            }
        }
    };
    Utils._rootpath = null;
    Utils._respath = "http://res.y-theta.cn";
    Utils._enablelog = true;
    return Utils;
}());
exports.Utils = Utils;


/***/ }),

/***/ "./RectPlayer/dependence/Tasks.ts":
/*!****************************************!*\
  !*** ./RectPlayer/dependence/Tasks.ts ***!
  \****************************************/
/*! flagged exports */
/*! export AjaxOption [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TaskArgs [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TaskOrder [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Tasks [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var __extends = __webpack_require__(/*! ./RectPlayer/dependence/extends.js */ "./RectPlayer/dependence/extends.js")["__extends"];

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskArgs = exports.TaskOrder = exports.AjaxOption = exports.Tasks = void 0;
/**
 * 任务列表中的任务执行顺序
 */
var TaskOrder;
(function (TaskOrder) {
    /**
     * 以放入列表的属性执行任务，下一任务须在上一任务返回值获得后执行
     */
    TaskOrder[TaskOrder["Sequence"] = 1] = "Sequence";
    /**
     * 以放入列表的属性执行任务，下一任务无需等待上一任务完成
     */
    TaskOrder[TaskOrder["Default"] = 2] = "Default";
})(TaskOrder || (TaskOrder = {}));
exports.TaskOrder = TaskOrder;
/**
 * 任务参数
 */
var TaskArgs = /** @class */ (function () {
    function TaskArgs(args) {
        this.args = args;
        this.abort = false;
        this.err = "";
        this.stepresult = null;
    }
    return TaskArgs;
}());
exports.TaskArgs = TaskArgs;
var AsyncTaskArgs = /** @class */ (function () {
    function AsyncTaskArgs() {
    }
    return AsyncTaskArgs;
}());
/** Ajax 请求参数 */
var AjaxOption = /** @class */ (function () {
    function AjaxOption() {
    }
    return AjaxOption;
}());
exports.AjaxOption = AjaxOption;
var BaseAsyncTask = /** @class */ (function () {
    function BaseAsyncTask() {
    }
    BaseAsyncTask.prototype.Execute = function () { };
    BaseAsyncTask.prototype.Wait = function (task) {
        var oricall = task.Callback;
        task.Callback = (function (that) {
            return function (arg) {
                oricall(arg);
                that.Execute();
            };
        })(this);
    };
    return BaseAsyncTask;
}());
/**
 * 简单异步任务
 * 包装 setTimeout ()
 */
var AsyncTask = /** @class */ (function (_super) {
    __extends(AsyncTask, _super);
    function AsyncTask(handle, delay, args) {
        var _this = _super.call(this) || this;
        _this._handle = handle;
        _this._delay = delay;
        _this.Arg = new TaskArgs(args);
        return _this;
    }
    AsyncTask.prototype.Execute = function () {
        var _this = this;
        var arg = new AsyncTaskArgs();
        arg.arg = this.Arg;
        arg.callback = this.Callback;
        var callback = (function (arg) {
            arg.arg.stepresult = _this._handle && _this._handle(arg.arg);
            arg.callback && arg.callback(arg.arg);
        }).bind(this);
        setTimeout(callback, this._delay, arg);
    };
    return AsyncTask;
}(BaseAsyncTask));
/**
 * 异步 Ajax 任务
 * 包装 XMLHttpRequest
 */
var AjaxTask = /** @class */ (function (_super) {
    __extends(AjaxTask, _super);
    function AjaxTask(option) {
        var _this = _super.call(this) || this;
        _this._xhr = null;
        _this.Arg = new TaskArgs([option]);
        return _this;
    }
    /**
     * 创建 document.ready 方法
     */
    AjaxTask.extenddocready = function () {
        var ie = !!(window.attachEvent && !window.opera);
        var webkit = /webkit\/(\d+)/i.test(navigator.userAgent) && ~~RegExp.$1 < 525;
        var fn = [];
        var run = function () {
            for (var i = 0; i < fn.length; i++)
                fn[i]();
        };
        document.ready = function (f) {
            if (!ie && !webkit && document.addEventListener) {
                return document.addEventListener("DOMContentLoaded", f, false);
            }
            if (fn.push(f) > 1)
                return;
            if (ie)
                (function () {
                    try {
                        document.documentElement.scroll({ left: 0 });
                        run();
                    }
                    catch (err) {
                        setTimeout(arguments.callee, 0);
                    }
                })();
            else if (webkit)
                var t = setInterval(function () {
                    if (/^(loaded|complete)$/.test(document.readyState))
                        clearInterval(t), run();
                }, 0);
        };
    };
    AjaxTask.root = function () {
        return (AjaxTask._root ||
            (typeof document == "undefined"
                ? ""
                : (document && (AjaxTask._root = document.URL.replace(/([\s\S]*)(\/[^\/]*?\.html)/i, "$1")),
                    AjaxTask._root)));
    };
    AjaxTask.prototype.Execute = function () {
        var _this = this;
        var option = this.Arg.args[0];
        option.prepare && option.prepare();
        var jslist = /.+\/([^\/].+?js)\??/gi.exec(option.url);
        if (jslist && jslist.length > 0) {
            var script_1 = document.createElement("script");
            script_1.type = "text/javascript";
            script_1.onload = function (e) {
                _this.success(jslist[1]);
            };
            script_1.onerror = function (e) {
                _this.failed(jslist[1]);
            };
            script_1.src = option.url;
            try {
                document.body.appendChild(script_1);
            }
            catch (err) {
                document.ready == null ? AjaxTask.extenddocready() : null;
                document.ready(function () {
                    document.body.appendChild(script_1);
                });
            }
        }
        else {
            this._xhr = new XMLHttpRequest();
            this._xhr.timeout = option.timeout || 300000;
            this._xhr.responseType = option.responseType || "text";
            this._xhr.withCredentials = !!option.withCredentials;
            this._xhr.onreadystatechange = function () {
                if (_this._xhr.readyState === 4) {
                    // TODO:: 访问服务器文件与本地文件分别配置
                    if (AjaxTask.root().indexOf("file:///") == 0) {
                        if (_this._xhr.responseType === "text")
                            _this.success(_this._xhr.responseText);
                        else
                            _this.success(_this._xhr.response);
                    }
                    else {
                        if (_this._xhr.status >= 200 && _this._xhr.status < 300) {
                            if (_this._xhr.responseType === "text")
                                _this.success(_this._xhr.responseText);
                            else
                                _this.success(_this._xhr.response);
                        }
                        else {
                            _this.failed(_this._xhr.status);
                        }
                    }
                    _this.complete(_this._xhr);
                }
            };
            this._xhr.open(option.method || "GET", option.url, option.async == false ? false : true);
            option.onsetheader && option.onsetheader(this._xhr);
            this._xhr.send(option.data || null);
        }
    };
    AjaxTask.prototype.success = function (arg) {
        var option = this.Arg.args[0];
        this.Arg.stepresult = arg;
        option.success && option.success(this.Arg);
        this.Callback && this.Callback(this.Arg);
    };
    AjaxTask.prototype.failed = function (arg) {
        var option = this.Arg.args[0];
        this.Arg.stepresult = arg;
        option.failed && option.failed(this.Arg);
        this.Callback && this.Callback(this.Arg);
    };
    AjaxTask.prototype.complete = function (xhr) {
        if (xhr)
            xhr = null;
    };
    AjaxTask._root = null;
    return AjaxTask;
}(BaseAsyncTask));
/**
 * 自定义任务类
 */
var Tasks = /** @class */ (function () {
    function Tasks() {
    }
    /**
     * 等待所有任务完成
     * @param asynctasks 任务列表 任务需为 IAsyncTask 衍生类型
     * @param callback   任务结束回调
     * @param step       单个任务执行结果回调
     * @param order      任务执行顺序
     */
    Tasks.WaitAll = function (asynctasks, callback, step, order, timeout) {
        if (asynctasks) {
            var taskcount_1 = asynctasks.length;
            var resultcollection_1 = new Array();
            var ordera = order || TaskOrder.Default;
            var timeouted_1 = [];
            timeouted_1.push(false);
            if (timeout && timeout > 0) {
                setTimeout(function (t) {
                    t[0] = true;
                }, timeout, timeouted_1);
            }
            if (ordera == TaskOrder.Sequence) {
                var i = 0;
                for (; i < taskcount_1; i++) {
                    if (i + 1 < taskcount_1) {
                        asynctasks[i].Callback = (function (index) {
                            return function (arg) {
                                // Utils.Log(arg.stepresult);
                                if (timeouted_1[0]) {
                                    callback && callback(index - 1, resultcollection_1, true);
                                    return;
                                }
                                resultcollection_1.push(arg.stepresult);
                                step && step(index - 1, taskcount_1, arg.stepresult, resultcollection_1, arg.err);
                                asynctasks[index].Arg.stepresult = arg.stepresult;
                                asynctasks[index].Arg.abort = timeouted_1[0];
                                asynctasks[index].Execute();
                            };
                        })(i + 1);
                    }
                    else {
                        asynctasks[i].Callback = function (arg) {
                            // Utils.Log(arg.stepresult);
                            if (arg.abort || timeouted_1[0]) {
                                callback && callback(taskcount_1 - 1, resultcollection_1, timeouted_1[0]);
                                return;
                            }
                            resultcollection_1.push(arg.stepresult);
                            step && step(taskcount_1 - 1, taskcount_1, arg.stepresult, resultcollection_1, arg.err);
                            callback && callback(taskcount_1, resultcollection_1);
                            //callback(arg);
                        };
                    }
                }
                asynctasks[0].Execute();
            }
            else {
                asynctasks.forEach(function (at, index) {
                    at.Callback = (function (index) {
                        return function (arg) {
                            if (!timeouted_1[0]) {
                                taskcount_1--;
                                resultcollection_1.push(arg.stepresult);
                                step && step(index, taskcount_1, arg.stepresult, resultcollection_1, arg.err);
                                taskcount_1 == 0 && callback && callback(taskcount_1, resultcollection_1);
                            }
                            else {
                                if (taskcount_1 != 0) {
                                    callback && callback(taskcount_1, resultcollection_1, true);
                                    taskcount_1 = 0;
                                }
                            }
                        };
                    })(index);
                    at.Execute();
                });
            }
        }
        else {
            callback(0, null);
        }
    };
    /**
     * 新建一个异步任务
     * @param handle
     * @param delay
     * @param args
     */
    Tasks.New = function (handle, delay, args) {
        return new AsyncTask(handle, delay, args);
    };
    /**
     * 新建一个 Ajax 任务
     * @param option
     */
    Tasks.Ajax = function (option) {
        return new AjaxTask(option);
    };
    return Tasks;
}());
exports.Tasks = Tasks;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./RectPlayer/RectPlayer.ts");
/******/ })()
;
});
//# sourceMappingURL=rectPlayer.js.map