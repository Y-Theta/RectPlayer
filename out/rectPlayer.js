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

/***/ "./RectPlayer/PlayerCore.ts":
/*!**********************************!*\
  !*** ./RectPlayer/PlayerCore.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__extends) {
/**
 *
 * @Y_Theta http://blog.y-theta.cn
 *
 * PlayerCoreContract
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./RectPlayer/Utils.ts");
var PlayerCore = /** @class */ (function () {
    function PlayerCore() {
    }
    return PlayerCore;
}());
exports.PlayerCore = PlayerCore;
/** 网易云音乐资源 */
var NeteaseCore = /** @class */ (function (_super) {
    __extends(NeteaseCore, _super);
    function NeteaseCore() {
        var _this = _super.call(this) || this;
        _this.GetPlaylist = function (id) {
            if (typeof (id) === "number")
                return _this.getneteasePlayListbyID(id);
            return [];
        };
        return _this;
    }
    NeteaseCore.prototype.getneteasePlayListbyID = function (id) {
        Utils_1.Utils.Ajax({
            url: "",
            success: function (data) {
            },
            failed: function (status) {
            },
            prepare: function () {
            }
        });
        return [];
    };
    return NeteaseCore;
}(PlayerCore));
exports.NeteaseCore = NeteaseCore;
/** 本地文件资源 */
var LocalCore = /** @class */ (function (_super) {
    __extends(LocalCore, _super);
    function LocalCore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LocalCore;
}(PlayerCore));
exports.LocalCore = LocalCore;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./RectPlayer/extends.js */ "./RectPlayer/extends.js")["__extends"]))

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
var PlayerCore_1 = __webpack_require__(/*! ./PlayerCore */ "./RectPlayer/PlayerCore.ts");
var RectPlayer = /** @class */ (function () {
    function RectPlayer(option) {
        this._loaded = false;
        this._core = null;
        this._templateResolver = null;
        Utils_1.Utils._enablelog = option.EnableLog || false;
        this._scriptcache = new Map();
        this._templateResolver = option.Reslover || new RectplayerTemplateResolver_1.DefaultTemplateResolver();
        this.loadDependenceAsync();
        Utils_1.Utils.Log("\\ RectPlayer  1.0.0 \n\\ @Y_Theta \n\\ http:\\\\blog.y-theta.com \n\\ Starting ....");
    }
    /**
     *
     */
    RectPlayer.prototype.getPlayList = function (id) {
        return this._core.GetPlaylist(id);
    };
    /**
     * 异步加载依赖文件
     */
    RectPlayer.prototype.loadDependenceAsync = function () {
        var _this = this;
        var dependencefile = [
            Utils_1.Utils.Path() + "/less.min.js",
            Utils_1.Utils.Path() + "/xml-js.min.js",
            Utils_1.Utils.Path("resource") + "/javascript/lib/anime.min.js",
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
        this._core = null;
        if (this._mode === "Netease") {
            this._core = new PlayerCore_1.NeteaseCore();
        }
        else if (this._mode === "LocalFile") {
            this._core = new PlayerCore_1.LocalCore();
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
    RectPlayer.prototype.resolve = function () {
        var _this = this;
        if (!this._loaded) {
            setTimeout(this.resolve.bind(this), 200);
        }
        else {
            Utils_1.Utils.Ajax({
                async: true,
                url: Utils_1.Utils.Path() + "/template/Template.xml",
                prepare: function () {
                    Utils_1.Utils.Log("GetTemplate !");
                },
                success: function (data) {
                    var temp = _this._templateResolver.ResloveTemplate(data, null);
                    document.body.appendChild(temp);
                },
                failed: function () {
                    Utils_1.Utils.Log("Faild !");
                },
            });
        }
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
/**
 * 默认的播放器样式解析器
 * 根据模板中定义的关键字解析模板
 * */
var DefaultTemplateResolver = /** @class */ (function () {
    function DefaultTemplateResolver() {
    }
    /**
     * 解析播放器模板
     * @param oritemplate  模板html
     * @param data         播放列表数据
     */
    DefaultTemplateResolver.prototype.ResloveTemplate = function (oritemplate, data) {
        //Utils.Log(XML.xml2js(oritemplate));
        var player = document.createElement("div");
        var listitem = new Array();
        var result = /<player>([\s\S]*?)<\/player>[\s\S]*?<listitem>([\s\S]*?)<\/listitem>/im.exec(oritemplate);
        var playerdom = this.parseDom(result[1]);
        var listdom = this.parseDom(result[2]);
        var audiosrc = playerdom.querySelector("#src");
        audiosrc.classList.add("rect-audio");
        if (data != null)
            data.tracks.forEach(function (v, i, ins) {
            });
        player.append(playerdom);
        return player;
    };
    /**
     * 将文本转化为dom对象，方便使用筛选器进行查询
     * @param arg 要转换为dom对象的文本
     */
    DefaultTemplateResolver.prototype.parseDom = function (arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg.replace(/(>)\s+?(<)/mg, "$1$2").trim();
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
        if (percent < 0.50)
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
    /**
     * 输出函数
     */
    Utils.Log = function (obj) {
        Utils._enablelog ? console.log(obj) : null;
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
                return Utils._rootpath || (Utils._rootpath = document.URL.replace(/([\s\S]*)(\/[^\/]*?\.html)/i, '$1'), Utils._rootpath);
            case "": break;
        }
    };
    /**
     *
     * @param time
     */
    Utils.TimeFormat = function (time) {
        var tempMin = time / 60;
        var tempSec = time % 60;
        var curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
        var curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
        return curMin + ':' + curSec;
    };
    /**
     *
     * @param percent
     */
    Utils.PercentFormat = function (percent) {
        return (percent * 100).toFixed(2) + '%';
    };
    /**
     *
     * @param option
     */
    Utils.Ajax = function (option) {
        option.prepare && option.prepare();
        var jslist = /\/([\S].+?js)\??/ig.exec(option.url);
        if (jslist && (jslist.length > 0)) {
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
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4) {
                    // TODO:: 访问服务器文件与本地文件分别配置
                    if (Utils.Path().indexOf('file:///') == 0) {
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
            xhr_1.open('GET', option.url, option.async);
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


/***/ }),

/***/ "./RectPlayer/extends.js":
/*!*******************************!*\
  !*** ./RectPlayer/extends.js ***!
  \*******************************/
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