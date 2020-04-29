(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./RectPlayer/RectPlayer.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./RectPlayer/Model/PlayerModel.ts":
/*!*****************************************!*\
  !*** ./RectPlayer/Model/PlayerModel.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

/***/ "./RectPlayer/RectPlayer.ts":
/*!**********************************!*\
  !*** ./RectPlayer/RectPlayer.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @Y_Theta http://blog.y-theta.cn
 *
 * An audio player based on
 * Skplayer         https://github.com/wangpengfei15975/skPlayer
 * netmusic-node    https://github.com/sqaiyan/netmusic-node
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./RectPlayer/Utils.ts");
var Tasks_1 = __webpack_require__(/*! ./dependence/Tasks */ "./RectPlayer/dependence/Tasks.ts");
var RectplayerTemplateResolver_1 = __webpack_require__(/*! ./RectplayerTemplateResolver */ "./RectPlayer/RectplayerTemplateResolver.ts");
var RectPlayer = /** @class */ (function () {
    /**
     * 获取播放列表
     */
    // private getPlayList(id: string | number) {
    //     if (this._srcResolver) this._srcResolver.Init(id);
    //     var s: Action<string, string, string> = null;
    // }
    /**
     * 异步加载依赖文件
     */
    // private loadDependenceAsync() {
    //     let dependencefile: Array<string> = [
    //         Utils.Path() + "/less.min.js",
    //         Utils.Path("resource") + "/javascript/lib/anime.min.js",
    //     ];
    //     dependencefile.forEach((element) => {
    //         this._scriptcache.set(element, null);
    //         Utils.Ajax({
    //             async: true,
    //             url: element,
    //             prepare: () => {},
    //             success: (data: string) => {
    //                 this._scriptcache.set(element, data);
    //             },
    //             failed: (status: number) => {
    //                 Utils.Log("faild : " + element + "  code " + status);
    //             },
    //         });
    //     });
    //     this.waitAsync();
    // }
    /**
     * 异步等待文件加载完成
     */
    // private waitAsync() {
    //     let fecthed = true;
    //     this._scriptcache.forEach((v) => {
    //         if (v == null || v == "") fecthed = false;
    //     });
    //     if (!fecthed) setTimeout(this.waitAsync.bind(this), 200);
    //     else {
    //         this._loaded = true;
    //     }
    // }
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
    /**
     * 解析模板并将其加载到当前页面中
     */
    // public TryResolve() {
    //     /**
    //      * 确认依赖加载完成
    //      */
    //     this.resolve();
    // }
    /**
     *
     */
    // private resolve() {
    //     if (!this._loaded) {
    //         setTimeout(this.resolve.bind(this), 200);
    //     } else {
    //         // 请求样式页
    //         Utils.Ajax({
    //             async: true,
    //             url: Utils.Path() + "/template/style.less",
    //             prepare: () => {
    //                 Utils.Log("GetTemplate Less !");
    //             },
    //             success: (data: string) => {
    //                 less.render(data, (e, o) => {
    //                     let style = document.createElement("style");
    //                     style.type = "text/css";
    //                     style.innerHTML = o.css;
    //                     document.getElementsByTagName("head").item(0).appendChild(style);
    //                 });
    //             },
    //             failed: () => {
    //                 Utils.Log("Faild !");
    //             },
    //         });
    //         //请求模板
    //         Utils.Ajax({
    //             async: true,
    //             url: Utils.Path() + "/template/Template.xml",
    //             prepare: () => {
    //                 Utils.Log("GetTemplate !");
    //             },
    //             success: (data: string) => {
    //                 this._async ? this.loadlistAsync(data) : this.loadlist(data);
    //             },
    //             failed: () => {
    //                 Utils.Log("Faild !");
    //             },
    //         });
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
        //#endregion
        //#region Properties
        this._playlist = null;
        this._playcontrol = null;
        Utils_1.Utils._enablelog = true;
        this._core;
        this._resolver = new RectplayerTemplateResolver_1.DefaultTemplateResolver();
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
    RectPlayer.prototype.Init = function () {
        var _this = this;
        //加载依赖文件
        var dependencefile = [
            Utils_1.Utils.Path() + "/less.min.js",
            Utils_1.Utils.Path("resource") + "/javascript/lib/anime.min.js",
        ];
        var loadtasks = [];
        dependencefile.forEach(function (element) {
            loadtasks.push(Tasks_1.Tasks.Ajax({
                url: element,
                prepare: function () { return Utils_1.Utils.Log("loading ... " + element); },
                success: function (arg) { return Utils_1.Utils.Log(arg.stepresult + " loaded"); },
                failed: function (arg) { return Utils_1.Utils.Log(arg.stepresult + " failed"); },
            }));
        });
        Tasks_1.Tasks.WaitAll(loadtasks, function (all, allres) {
            //加载模板和样式
            var temptask = [];
            temptask.push(Tasks_1.Tasks.Ajax({
                url: Utils_1.Utils.Path() + "/template/style.less",
                prepare: function () { return Utils_1.Utils.Log("GetTemplate Less :" + Utils_1.Utils.Path() + "/template/style.less"); },
            }));
            temptask.push(Tasks_1.Tasks.Ajax({
                url: Utils_1.Utils.Path() + "/template/Template.xml",
                prepare: function () { return Utils_1.Utils.Log("GetTemplate Html :" + Utils_1.Utils.Path() + "/template/Template.xml"); },
            }));
            Tasks_1.Tasks.WaitAll(temptask, function (all, allres) {
                if (allres[0]) {
                    less.render(allres[0], function (e, o) {
                        var style = document.createElement("style");
                        style.type = "text/css";
                        style.innerHTML = o.css;
                        document.getElementsByTagName("head").item(0).appendChild(style);
                    });
                }
                if (allres[1]) {
                    _this._resolver.ResloveTemplate(allres[1], function (c, dom) {
                        _this._playcontrol = c;
                        document.body.appendChild(dom);
                    });
                }
            }, null, Tasks_1.TaskOrder.Sequence);
        });
    };
    return RectPlayer;
}());
exports.RectPlayer = RectPlayer;


/***/ }),

/***/ "./RectPlayer/RectplayerTemplateResolver.ts":
/*!**************************************************!*\
  !*** ./RectPlayer/RectplayerTemplateResolver.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        this._liststatus = false;
        this._panelstatus = false;
        this._mute = false;
        this._playing = true;
        this._songid = -1;
        this._lastsongid = -1;
        this._playerctl = new Map();
        this._volume = 0;
        this._volumebak = 0;
        this._volumemax = 6000;
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
        Utils_1.Utils.Log(JSON.stringify(oritemplate));
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
        // this._playlist = data;
        // this._songid = 0;
        // this._lastsongid = 0;
        // this.updateUI(this._songid);
    };
    DefaultTemplateResolver.prototype.RenderPlaylist = function (list) {
        var _this = this;
        this._playlist = list;
        if (this._playlist) {
            this._control.list.innerHTML = null;
            this._playlist.forEach(function (v, i) {
                if (v.src != null) {
                    var listitem = Utils_1.Utils.Dom(_this._listtemplate);
                    var liid = listitem.querySelector("#id");
                    liid.innerHTML = "" + (i + 1);
                    liid.removeAttribute("id");
                    var liname = listitem.querySelector("#info");
                    liname.innerHTML = "" + v.name + (v.ar[0] && "-" + v.ar[0].name);
                    liname.removeAttribute("id");
                    _this._control.list.appendChild(listitem.childNodes[0]);
                }
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
    DefaultTemplateResolver.prototype.updateUI = function (id) {
        if (id < this._playlist.length && this._playlist[id]) {
            this._control.cover_avatar.style.backgroundImage = "url(" + this._playlist[id].al.url + ")";
            this._control.source.setAttribute("src", this._playlist[id].src);
            this._control.name.innerHTML = this._playlist[id].name;
            this._control.author.innerHTML = this._playlist[id].ar[0].name;
            var children = this._control.list.childNodes;
            children.item(this._lastsongid).classList.remove("playing");
            children.item(id).classList.remove("selected");
            children.item(id).classList.add("playing");
        }
    };
    return DefaultTemplateResolver;
}());
exports.DefaultTemplateResolver = DefaultTemplateResolver;


/***/ }),

/***/ "./RectPlayer/Utils.ts":
/*!*****************************!*\
  !*** ./RectPlayer/Utils.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        Utils._enablelog ? console.log(obj) : null;
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__extends) {
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ../Utils */ "./RectPlayer/Utils.ts");
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
    ;
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
                    if (Utils_1.Utils.Path().indexOf("file:///") == 0) {
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
    Tasks.WaitAll = function (asynctasks, callback, step, order) {
        if (asynctasks) {
            var taskcount_1 = asynctasks.length;
            var resultcollection_1 = new Array();
            order = order || TaskOrder.Default;
            if (order == TaskOrder.Sequence) {
                var i = 0;
                for (; i < taskcount_1; i++) {
                    if (i + 1 < taskcount_1) {
                        asynctasks[i].Callback = (function (index) {
                            return function (arg) {
                                resultcollection_1.push(arg.stepresult);
                                if (arg.abort) {
                                    callback && callback(index - 1, resultcollection_1);
                                    return;
                                }
                                step && step(index - 1, taskcount_1, arg.stepresult, resultcollection_1, arg.err);
                                asynctasks[index].Arg.stepresult = arg.stepresult;
                                asynctasks[index].Execute();
                            };
                        })(i + 1);
                    }
                    else {
                        asynctasks[i].Callback = function (arg) {
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
                            taskcount_1--;
                            resultcollection_1.push(arg.stepresult);
                            step && step(index, taskcount_1, arg.stepresult, resultcollection_1, arg.err);
                            taskcount_1 == 0 && callback && callback(taskcount_1, resultcollection_1);
                        };
                    })(index);
                    at.Execute();
                });
            }
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./RectPlayer/dependence/extends.js */ "./RectPlayer/dependence/extends.js")["__extends"]))

/***/ }),

/***/ "./RectPlayer/dependence/extends.js":
/*!******************************************!*\
  !*** ./RectPlayer/dependence/extends.js ***!
  \******************************************/
/*! exports provided: __extends */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
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



/***/ })

/******/ });
});
//# sourceMappingURL=rectPlayer.js.map