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

/***/ "./RectPlayer/PlayerItem.ts":
/*!**********************************!*\
  !*** ./RectPlayer/PlayerItem.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 播放器单元
 */
var PlayerItem = /** @class */ (function () {
    function PlayerItem() {
    }
    return PlayerItem;
}());
exports.PlayerItem = PlayerItem;


/***/ }),

/***/ "./RectPlayer/PlayerModel.ts":
/*!***********************************!*\
  !*** ./RectPlayer/PlayerModel.ts ***!
  \***********************************/
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
 * Skplayer       https://github.com/wangpengfei15975/skPlayer
 * netmusic-node  https://github.com/sqaiyan/netmusic-node
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./RectPlayer/Utils.ts");
var RectplayerTemplateResolver_1 = __webpack_require__(/*! ./RectplayerTemplateResolver */ "./RectPlayer/RectplayerTemplateResolver.ts");
var SourceCore_1 = __webpack_require__(/*! ./SourceCore */ "./RectPlayer/SourceCore.ts");
var RectPlayer = /** @class */ (function () {
    function RectPlayer(option) {
        this._loaded = false;
        this._srcResolver = null;
        this._templateResolver = null;
        this._playerControl = null;
        this._listuid = null;
        this._playlist = null;
        this._async = true;
        Utils_1.Utils._enablelog = option.EnableLog || false;
        this._scriptcache = new Map();
        this._templateResolver = option.Reslover || new RectplayerTemplateResolver_1.DefaultTemplateResolver();
        this._async = option.Async == null ? true : option.Async;
        this._listuid = option.PlaylistId;
        this._srcResolver = new SourceCore_1.NeteaseCore();
        this.loadDependenceAsync();
        Utils_1.Utils.Log("\\ RectPlayer  1.0.0 \n\\ @Y_Theta \n\\ http:\\\\blog.y-theta.com \n\\ Starting ....");
    }
    /**
     * 获取播放列表
     */
    RectPlayer.prototype.getPlayList = function (id) {
        if (this._srcResolver)
            this._srcResolver.GetPlaylist(id);
    };
    /**
     * 异步加载依赖文件
     */
    RectPlayer.prototype.loadDependenceAsync = function () {
        var _this = this;
        var dependencefile = [
            Utils_1.Utils.Path() + "/less.min.js",
            Utils_1.Utils.Path("resource") + "/javascript/lib/anime.min.js"
        ];
        dependencefile.forEach(function (element) {
            _this._scriptcache.set(element, null);
            Utils_1.Utils.Ajax({
                async: true,
                url: element,
                prepare: function () { },
                success: function (data) {
                    _this._scriptcache.set(element, data);
                },
                failed: function (status) {
                    Utils_1.Utils.Log("faild : " + element + "  code " + status);
                }
            });
        });
        this.waitAsync();
    };
    /**
     * 异步等待文件加载完成
     */
    RectPlayer.prototype.waitAsync = function () {
        var fecthed = true;
        this._scriptcache.forEach(function (v) {
            if (v == null || v == "")
                fecthed = false;
        });
        if (!fecthed)
            setTimeout(this.waitAsync.bind(this), 200);
        else {
            this._loaded = true;
        }
    };
    /**
     * 更改播放器的播放模式
     * @param mode
     * 播放模式 以下几种之一
     * Netease | LocalFile
     */
    RectPlayer.prototype.SwitchMode = function (mode) {
        this._mode = mode;
        this._srcResolver = null;
        if (this._mode === "Netease") {
            this._srcResolver = new SourceCore_1.NeteaseCore();
        }
        else if (this._mode === "LocalFile") {
            this._srcResolver = new SourceCore_1.LocalCore();
        }
    };
    /**
     * 解析模板并将其加载到当前页面中
     */
    RectPlayer.prototype.TryResolve = function () {
        /**
         * 确认依赖加载完成
         */
        this.resolve();
    };
    /**
     *
     */
    RectPlayer.prototype.resolve = function () {
        var _this = this;
        if (!this._loaded) {
            setTimeout(this.resolve.bind(this), 200);
        }
        else {
            // 请求样式页
            Utils_1.Utils.Ajax({
                async: true,
                url: Utils_1.Utils.Path() + "/template/style.less",
                prepare: function () {
                    Utils_1.Utils.Log("GetTemplate Less !");
                },
                success: function (data) {
                    less.render(data, function (e, o) {
                        var style = document.createElement("style");
                        style.type = "text/css";
                        style.innerHTML = o.css;
                        document
                            .getElementsByTagName("head")
                            .item(0)
                            .appendChild(style);
                    });
                },
                failed: function () {
                    Utils_1.Utils.Log("Faild !");
                }
            });
            //请求模板
            Utils_1.Utils.Ajax({
                async: true,
                url: Utils_1.Utils.Path() + "/template/Template.xml",
                prepare: function () {
                    Utils_1.Utils.Log("GetTemplate !");
                },
                success: function (data) {
                    _this._async ? _this.loadlistAsync(data) : _this.loadlist(data);
                },
                failed: function () {
                    Utils_1.Utils.Log("Faild !");
                }
            });
        }
    };
    RectPlayer.prototype.loadlist = function (data) {
        var temp = this._templateResolver.ResloveTemplate(data);
        document.body.appendChild(temp.View);
        this._playerControl = temp.Control;
    };
    RectPlayer.prototype.loadlistAsync = function (data) {
        var temp = this._templateResolver.ResloveTemplate(data);
        document.body.appendChild(temp.View);
        this._playerControl = temp.Control;
        this.getPlayList(this._listuid);
        setTimeout(this.rendertemplate.bind(this), 100);
    };
    RectPlayer.prototype.rendertemplate = function () {
        this._srcResolver.Loaded ?
            (this._playlist = this._srcResolver.Playlist, this._templateResolver.RenderTemplate(this._playlist)) :
            (this._srcResolver.Timeout ? Utils_1.Utils.Log("No Song Fetched ! TimeOut") : setTimeout(this.rendertemplate.bind(this), 100));
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

/**
 *
 * 模板解析类,用于定义如何解析其Html模板
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerModel_1 = __webpack_require__(/*! ./PlayerModel */ "./RectPlayer/PlayerModel.ts");
var PlayerItem_1 = __webpack_require__(/*! ./PlayerItem */ "./RectPlayer/PlayerItem.ts");
var Utils_1 = __webpack_require__(/*! ./Utils */ "./RectPlayer/Utils.ts");
/**
 * 默认的播放器样式解析器
 * 根据模板中定义的关键字解析模板
 * */
var DefaultTemplateResolver = /** @class */ (function () {
    function DefaultTemplateResolver() {
        this._playerelement = null;
        this._listtemplate = null;
        this._liststatus = false;
        this._panelstatus = false;
        this._mute = false;
        this._playing = true;
        this._songid = -1;
        this._playerctl = new Map();
        this._volume = 0;
        this._volumebak = 0;
        this._volumemax = 6000;
        this._playmode = PlayerModel_1.PlayMode.normal;
        this._playmodeloop = [PlayerModel_1.PlayMode.normal, PlayerModel_1.PlayMode.repeat, PlayerModel_1.PlayMode.repeatone, PlayerModel_1.PlayMode.random];
        this._playlist = null;
    }
    //#region Interface Function
    DefaultTemplateResolver.prototype.Play = function (id) { };
    DefaultTemplateResolver.prototype.Pause = function () { };
    DefaultTemplateResolver.prototype.Resume = function () { };
    DefaultTemplateResolver.prototype.Next = function () { };
    DefaultTemplateResolver.prototype.Prve = function () { };
    DefaultTemplateResolver.prototype.Playlist = function (action) { };
    DefaultTemplateResolver.prototype.Add = function (song) { };
    DefaultTemplateResolver.prototype.Remove = function (song) { };
    DefaultTemplateResolver.prototype.SwitchMode = function (mode) {
        this.switchmode(mode);
    };
    DefaultTemplateResolver.prototype.About = function () { };
    //#endregion
    /**
     * 解析播放器模板
     * @param oritemplate  模板html
     * @param data         播放列表数据
     */
    DefaultTemplateResolver.prototype.ResloveTemplate = function (oritemplate) {
        //Utils.Log(XML.xml2js(oritemplate));
        this._playerelement = document.createElement("div");
        this._playerelement.id = "rectPlayer";
        var result = /<player>([\s\S]*?)<\/player>[\s\S]*?<listitem>([\s\S]*?)<\/listitem>/im.exec(oritemplate);
        var playerdom = this.parseDom(result[1]);
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
        var playeritem = new PlayerItem_1.PlayerItem();
        playeritem.View = this._playerelement;
        playeritem.Control = this;
        this._playerctl.forEach(function (v) {
            v.removeAttribute("id");
        });
        return playeritem;
    };
    DefaultTemplateResolver.prototype.RenderTemplate = function (data) {
        var _this = this;
        this._playlist = data;
        if (this._playlist) {
            this.$g("list-detail").innerHTML = null;
            this._playlist.tracks.forEach(function (v, i, ins) {
                var listitem = _this.parseDom(_this._listtemplate);
                var liid = listitem.querySelector("#id");
                liid.innerHTML = "" + (i + 1);
                liid.removeAttribute("id");
                var liname = listitem.querySelector("#info");
                liname.innerHTML = "" + v.name + (v.ar[0] && "-" + v.ar[0].name);
                liname.removeAttribute("id");
                _this.$g("list-detail").appendChild(listitem.childNodes[0]);
            });
        }
        Utils_1.Utils.Log(this._playlist.tracks[0].al.url);
        this._songid = 0;
        this.updateUI(this._songid);
    };
    /**
     *
     */
    DefaultTemplateResolver.prototype.updateUI = function (id) {
        if (id < this._playlist.tracks.length && this._playlist.tracks[id]) {
            this.$g("cover-avatar").style.backgroundImage = "url(" + this._playlist.tracks[id].al.url + ")";
            this.$g("source").setAttribute("src", this._playlist.tracks[id].src);
            this.$g("name").innerHTML = this._playlist.tracks[id].name;
            this.$g("author").innerHTML = this._playlist.tracks[id].ar[0].name;
        }
    };
    //#region 播放列表/控制面板
    DefaultTemplateResolver.prototype.openlist = function (e) {
        this._liststatus = !this._liststatus;
        if (this._liststatus) {
            this.switchElementStatus(this._playerelement, "list-on", "list-off");
        }
        else {
            this.switchElementStatus(this._playerelement, "list-off", "list-on");
        }
    };
    DefaultTemplateResolver.prototype.openctlpanel = function (e) {
        var _this = this;
        this._panelstatus = !this._panelstatus;
        if (this._panelstatus) {
            this.switchElementStatus(this._playerelement, "panel-on", "panel-off");
        }
        else {
            if (this._playerelement.classList.contains("list-on")) {
                this._liststatus = false;
                this.switchElementStatus(this._playerelement, "list-off", "list-on");
                setTimeout(function (that) {
                    that.switchElementStatus(_this._playerelement, "panel-off", "panel-on");
                }, 240, this);
            }
            else {
                this.switchElementStatus(this._playerelement, "panel-off", "panel-on");
            }
        }
    };
    //#endregion
    //#region 音量调整
    /**
     * 静音
     */
    DefaultTemplateResolver.prototype.volumeclick = function (e) {
        this.setMute(!this._mute);
        this.setVolume(this._volume);
    };
    /**
     * 音量单击调整
     */
    DefaultTemplateResolver.prototype.volumetrackclick = function (e) {
        var clip = this.$g("volume").getBoundingClientRect();
        //   console.log(e, clip);
        var cw = clip.width / 2;
        var ch = clip.height / 2;
        var x1 = e.clientX - clip.x, y1 = e.clientY - clip.y;
        var angle = this.getcrosslineAngle({ x: cw, y: 0 }, { x: x1, y: y1 }, { x: cw, y: ch });
        this._mute = false;
        this._volume = (angle / 360) * this._volumemax;
        this.setVolume(this._volume);
    };
    /**
     * 音量滚动调整
     */
    DefaultTemplateResolver.prototype.volumescroll = function (e) {
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
    /**
     * 设置音量
     */
    DefaultTemplateResolver.prototype.setVolume = function (v) {
        this._volume = v < this._volumemax ? (v < 0 ? 0 : v) : this._volumemax;
        var newpath = this.parsePercent(this._volume / this._volumemax, { x: 32, y: 32 }, 24);
        this.$g("volume-path").setAttribute("d", newpath);
        var volume = this.$g("volume");
        if (this._volume == 0) {
            volume.classList.add("mute");
        }
        else {
            volume.classList.contains("mute") ? volume.classList.remove("mute") : null;
        }
        this.$g("source").volume = this._volume / this._volumemax;
    };
    /**
     * 设置静音
     */
    DefaultTemplateResolver.prototype.setMute = function (flag) {
        this._mute = flag;
        Utils_1.Utils.Log("Mute :" + flag);
        if (flag) {
            this._volumebak = this._volume;
            this._volume = 0;
        }
        else {
            this._volume = this._volumebak;
        }
    };
    //#endregion
    //#region 设置播放模式
    DefaultTemplateResolver.prototype.setmode = function () {
        var nowindex = this._playmodeloop.indexOf(this._playmode);
        nowindex = (nowindex + 1) % this._playmodeloop.length;
        this.switchmode(this._playmodeloop[nowindex]);
    };
    DefaultTemplateResolver.prototype.switchmode = function (mode) {
        Utils_1.Utils.Log([this._playmode, mode]);
        this.switchElementStatus(this.$g("mode"), mode, this._playmode);
        this._playmode = mode;
    };
    //#endregion
    //#region 播放暂停控制
    DefaultTemplateResolver.prototype.playpause = function (e) {
        this._playing ? this.pause() : this.resume();
    };
    DefaultTemplateResolver.prototype.resume = function () {
        if (this._playing)
            return;
        this._playing = true;
        this.switchElementStatus(this._playerelement, "play", "pause");
        this.$g("source").play();
    };
    DefaultTemplateResolver.prototype.pause = function () {
        if (!this._playing)
            return;
        this._playing = false;
        this.switchElementStatus(this._playerelement, "pause", "play");
        this.$g("source").pause();
    };
    DefaultTemplateResolver.prototype.play = function (id) {
        if (id < 0 || id == this._songid)
            return;
        this._songid = id;
        this.updateUI(this._songid);
        this._playing = true;
        this.switchElementStatus(this._playerelement, "play", "pause");
        this.$g("source").play();
    };
    DefaultTemplateResolver.prototype.prve = function () {
        if (this._songid < 0)
            return;
        this._songid = this._songid > 0 ? this._songid - 1 : 0;
        this.play(this._songid);
    };
    DefaultTemplateResolver.prototype.next = function () {
        if (this._songid < 0)
            return;
        this._songid =
            this._songid < this._playlist.tracks.length - 1 ? this._songid + 1 : this._playlist.tracks.length - 1;
        this.play(this._songid);
    };
    //#endregion
    DefaultTemplateResolver.prototype.listClick = function (e) {
        var ev = e || window.event;
        var tar = ev.target;
        // Utils.Log(tar.tagName);
        if (tar && tar.tagName.toUpperCase() === "LI") {
            Utils_1.Utils.Log(tar.childNodes[1].innerText);
        }
    };
    DefaultTemplateResolver.prototype.listDbClick = function (e) {
        var ev = e || window.event;
        var tar = ev.target;
        // Utils.Log(tar.tagName);
        if (tar && tar.tagName.toUpperCase() === "LI") {
            var songid = ~~tar.childNodes[1].innerText;
            Utils_1.Utils.Log(songid);
            this.play(songid - 1);
        }
    };
    DefaultTemplateResolver.prototype.listSelect = function (id) { };
    /**
     * 装填控件字典
     * @param rootdom
     */
    DefaultTemplateResolver.prototype.loadcontrol = function (rootdom) {
        var _this = this;
        this._playerctl = this._playerctl || new Map();
        var controldic = [
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
        controldic.forEach(function (item) {
            _this._playerctl.set(item, rootdom.querySelector("#" + item));
        });
    };
    //#region UtilFunction
    /**
     * 获取控件字典中对应项
     */
    DefaultTemplateResolver.prototype.$g = function (ctl) {
        return this._playerctl.get(ctl);
    };
    /**
     * 将文本转化为dom对象，方便使用筛选器进行查询
     * @param arg 要转换为dom对象的文本
     */
    DefaultTemplateResolver.prototype.parseDom = function (arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg.replace(/(>)\s+?(<)/gm, "$1$2").trim();
        return objE;
    };
    /**
     * 将百分比转化为svg的环形
     */
    DefaultTemplateResolver.prototype.parsePercent = function (percent, center, radius) {
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
    DefaultTemplateResolver.prototype.getcrosslineAngle = function (p1, p2, p) {
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
     * @param element
     * @param tip
     */
    DefaultTemplateResolver.prototype.setElementTip = function (element, tip) {
        element && (element.title = tip);
    };
    /**
     *
     * @param element 需要设置的元素
     * @param normal 元素的默认状态
     * @param active 元素的变化状态
     */
    DefaultTemplateResolver.prototype.switchElementStatus = function (element, normal, active) {
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
    return DefaultTemplateResolver;
}());
exports.DefaultTemplateResolver = DefaultTemplateResolver;


/***/ }),

/***/ "./RectPlayer/SourceCore.ts":
/*!**********************************!*\
  !*** ./RectPlayer/SourceCore.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 * @Y_Theta http://blog.y-theta.cn
 *
 * PlayerCoreContract
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./RectPlayer/Utils.ts");
var PlayerModel_1 = __webpack_require__(/*! ./PlayerModel */ "./RectPlayer/PlayerModel.ts");
/** 网易云音乐资源 */
var NeteaseCore = /** @class */ (function () {
    function NeteaseCore() {
        this.Loaded = false;
        this.Playlist = null;
        this.Timeout = false;
        this._loaded = false;
        this._timeout = 500; //单首歌抓取超时 平均
        this._timeouttimer = 0;
    }
    NeteaseCore.prototype.GetPlaylist = function (url) {
        if (url)
            this.getneteasePlayListbyID(url);
    };
    NeteaseCore.prototype.getneteasePlayListbyID = function (id) {
        var _this = this;
        var orilist = null;
        Utils_1.Utils.Ajax({
            async: true,
            url: "http://api.y-theta.cn/Netease/playlist/detail?id=" + id,
            success: function (data) {
                try {
                    orilist = JSON.parse(data);
                }
                catch (_a) { }
                if (orilist && orilist.code && orilist.code === 200) {
                    var oripl = orilist.playlist;
                    var pl_1 = new PlayerModel_1.PlayList();
                    pl_1.avatarUrl = oripl.coverImgUrl;
                    pl_1.nickname = oripl.name;
                    pl_1.signature = oripl.id;
                    pl_1.tracks = new Array();
                    _this.Playlist = pl_1;
                    oripl.tracks.forEach(function (t) {
                        pl_1.tracks.push({
                            id: t.id,
                            name: t.name,
                            src: null,
                            al: {
                                id: t.al.id,
                                name: t.al.name,
                                url: t.al.picUrl
                            },
                            ar: _this.getauthor(t.ar)
                        });
                    });
                    pl_1.tracks.forEach(function (t) {
                        Utils_1.Utils.Ajax({
                            async: true,
                            url: "http://api.y-theta.cn/Netease/music/url?id=" + t.id + "&br=128000",
                            success: function (data) {
                                Utils_1.Utils.Log("Song : " + Utils_1.Utils.PadLeft(t.name, 16) + "[ Fetched ]");
                                t.src = JSON.parse(data).data[0].url;
                            },
                            failed: function (status) {
                                Utils_1.Utils.Log(status);
                            },
                            prepare: function () {
                                Utils_1.Utils.Log("Song : " + Utils_1.Utils.PadLeft(t.name, 16) + "[ Fetching ]");
                            }
                        });
                    });
                    _this._timeouttimer = _this._timeout * pl_1.tracks.length;
                    setTimeout(_this.waitAsync.bind(_this), 100);
                }
                else {
                    Utils_1.Utils.Log("Playlist Load Failed! Please try later or check if the id is right ");
                }
            },
            failed: function (status) {
                Utils_1.Utils.Log("Playlist Load Failed!" + status);
            },
            prepare: function () {
                _this.Loaded = false;
                _this.Timeout = false;
                Utils_1.Utils.Log("Getting Playlist");
            }
        });
    };
    NeteaseCore.prototype.getauthor = function (ars) {
        var arr = new Array();
        ars.forEach(function (ar) {
            arr.push({
                id: ar.id,
                name: ar.name
            });
        });
        return arr;
    };
    NeteaseCore.prototype.waitAsync = function () {
        var _this = this;
        this._loaded = true;
        this.Playlist.tracks.forEach(function (v) {
            if (v.src == null)
                _this._loaded = false;
        });
        this._timeouttimer -= 100;
        Utils_1.Utils.Log("Fetch Song Timer : " + this._timeouttimer);
        if (this._timeouttimer < 0) {
            this.Timeout = true;
            return;
        }
        this._loaded ? (this.Loaded = true) : setTimeout(this.waitAsync.bind(this), 100);
    };
    return NeteaseCore;
}());
exports.NeteaseCore = NeteaseCore;
/** 本地文件资源 */
var LocalCore = /** @class */ (function () {
    function LocalCore() {
        this.Timeout = false;
    }
    LocalCore.prototype.GetPlaylist = function (url) {
        return null;
    };
    return LocalCore;
}());
exports.LocalCore = LocalCore;


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
    Utils.extenddocready = function () {
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
    Utils.hasChinese = function (temp) {
        //var re = /.*[\\u4E00-\\u9FFF]+.*$/;
        return escape(temp).indexOf("%u") >= 0;
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
        var charp = typeof num == "string" ? (Utils.hasChinese(num) ? '\u3000' : " ") : "0";
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
     *
     * @param time
     */
    Utils.TimeFormat = function (time) {
        var tempMin = time / 60;
        var tempSec = time % 60;
        var curMin = tempMin < 10 ? "0" + tempMin : tempMin;
        var curSec = tempSec < 10 ? "0" + tempSec : tempSec;
        return curMin + ":" + curSec;
    };
    /**
     *
     * @param percent
     */
    Utils.PercentFormat = function (percent) {
        return (percent * 100).toFixed(2) + "%";
    };
    /**
     *
     * @param option
     */
    Utils.Ajax = function (option) {
        option.prepare && option.prepare();
        var jslist = /\/([\S].+?js)\??/gi.exec(option.url);
        if (jslist && jslist.length > 0) {
            var script_1 = document.createElement("script");
            script_1.type = "text/javascript";
            script_1.onload = function (e) {
                option.success && option.success(jslist[1]);
            };
            script_1.src = option.url;
            try {
                document.body.appendChild(script_1);
            }
            catch (err) {
                document.ready == null ? Utils.extenddocready() : null;
                document.ready(function () {
                    document.body.appendChild(script_1);
                });
            }
        }
        else {
            var xhr_1 = new XMLHttpRequest();
            xhr_1.timeout = option.timeout || 5000;
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4) {
                    // TODO:: 访问服务器文件与本地文件分别配置
                    if (Utils.Path().indexOf("file:///") == 0) {
                        option.success && option.success(xhr_1.responseText);
                    }
                    else {
                        if (xhr_1.status >= 200 && xhr_1.status < 300) {
                            option.success && option.success(xhr_1.responseText);
                        }
                        else {
                            option.failed && option.failed(xhr_1.status);
                        }
                    }
                }
            };
            xhr_1.open("GET", option.url, option.async);
            xhr_1.send(null);
        }
    };
    Utils._rootpath = null;
    Utils._respath = "http://res.y-theta.cn";
    Utils._enablelog = true;
    return Utils;
}());
exports.Utils = Utils;
/** 请求参数 */
var AjaxOption = /** @class */ (function () {
    function AjaxOption(url, prepare, success, failed) {
        this.url = url;
        this.prepare = prepare;
        this.success = success;
        this.failed = failed;
    }
    return AjaxOption;
}());
exports.AjaxOption = AjaxOption;


/***/ })

/******/ });
});
//# sourceMappingURL=rectPlayer.js.map