/**
 *
 * @Y_Theta http://blog.y-theta.cn
 *
 * Utils
 *
*/
class Utils {

    private static _rootpath: string = null;
    private static _respath: string = "http://res.y-theta.cn";
    public static _enablelog: boolean = true;

    private static extenddocready() {
        let ie = !!(window.attachEvent && !window.opera);
        let webkit = /webkit\/(\d+)/i.test(navigator.userAgent) && ~~RegExp.$1 < 525;
        let fn: any = [];
        let run = function () {
            for (var i = 0; i < fn.length; i++) fn[i]();
        };
        document.ready = function (f) {
            if (!ie && !webkit && document.addEventListener) {
                return document.addEventListener("DOMContentLoaded", f, false);
            }
            if (fn.push(f) > 1) return;
            if (ie)
                (function () {
                    try {
                        document.documentElement.scroll({ left: 0 });
                        run();
                    } catch (err) {
                        setTimeout(arguments.callee, 0);
                    }
                })();
            else if (webkit)
                var t = setInterval(function () {
                    if (/^(loaded|complete)$/.test(document.readyState)) clearInterval(t), run();
                }, 0);
        };
    }


    /**
     * 输出函数
     */
    static Log(obj: any) {
        Utils._enablelog ? console.log(obj) : null;
    }

    /**
     * 获取目录路径
     */
    static Path(type: string = "root") {
        switch (type) {
            case "resource":
                return Utils._respath;
            case "root":
                return Utils._rootpath || (Utils._rootpath = document.URL.replace(/([\s\S]*)(\/[^\/]*?\.html)/i, '$1'), Utils._rootpath);
            case "": break;
        }
    }

    /**
     * 
     * @param time 
     */
    static TimeFormat(time: number) {
        let tempMin = time / 60;
        let tempSec = time % 60;
        let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
        let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;
        return curMin + ':' + curSec;
    }

    /**
     * 
     * @param percent
     */
    static PercentFormat(percent: number) {
        return (percent * 100).toFixed(2) + '%';
    }

    /**
     * 
     * @param option
     */
    static Ajax(option: AjaxOption | any) {
        option.prepare && option.prepare();
        let jslist = /\/([\S].+?js)\??/ig.exec(option.url);
        if (jslist && (jslist.length > 0)) {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.onload = (e) => {
                option.success && option.success(jslist[1]);
            }
            script.src = option.url;
            try {
                document.body.appendChild(script);
            } catch (err) {
                document.ready == null ? Utils.extenddocready() : null;
                document.ready(()=>{
                    document.body.appendChild(script);
                })
            }
        }
        else {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    // TODO:: 访问服务器文件与本地文件分别配置
                    if (Utils.Path().indexOf('file:///') == 0) {
                        option.success && option.success(xhr.responseText);
                    }
                    else {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            option.success && option.success(xhr.responseText);
                        } else {
                            option.failed && option.failed(xhr.status);
                        }
                    }

                }
            };
            xhr.open('GET', option.url, option.async);
            xhr.send(null);
        }
    }
}

/** 请求参数 */
class AjaxOption {

    /** 请求的URL */
    public url: string | null;
    /** 在发送数据前调用的方法 */
    public prepare: Function | null;
    /** 发送成功的回调 */
    public success: Function | null;
    /** 发送失败的回调 */
    public failed: Function | null;
    /** 异步 */
    public async: boolean | null;

    constructor(url: string, prepare: Function, success: Function, failed: Function) {
        this.url = url;
        this.prepare = prepare;
        this.success = success;
        this.failed = failed;
    }
}

export { Utils, AjaxOption }