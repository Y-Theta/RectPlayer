import { Utils } from "../Utils";

/**
 * 异步任务的处理方法委托
 */
type TasksHandle = (arg: TaskArgs) => void;
/**
 * 异步任务过程回调委托
 */
type TaskStepCallback = (id: number, all: number, stepresult: any, allresult: any[], err: string) => void;
/**
 * 异步任务结果回调委托
 */
type TasksCallback = (all: number, allresult: any[]) => void;
/**
 * 设置请求头部
 */
type HeaderHandle = (xhr: XMLHttpRequest) => void;

/**
 * 异步任务接口
 */
interface IAsyncTask {
    /**
     * 此任务的标识名称
     */
    FrendlyName: string;
    /**
     *
     */
    Callback: TasksHandle;
    /**
     * 任务参数
     */
    Arg: TaskArgs;
    /**
     * 开始异步任务
     */
    Execute(): void;
    /**
     * 在上一任务完成后执行
     * @param task 上一任务
     */
    Wait(task: IAsyncTask): void;
}

/**
 * 任务列表中的任务执行顺序
 */
enum TaskOrder {
    /**
     * 以放入列表的属性执行任务，下一任务须在上一任务返回值获得后执行
     */
    Sequence = 1,
    /**
     * 以放入列表的属性执行任务，下一任务无需等待上一任务完成
     */
    Default = 2,
}

/**
 * 任务参数
 */
class TaskArgs {
    /**
     * 传给任务的原始参数 Settimeout 的 args
     */
    public args: any[];
    /**
     * 标识任务链此后的任务是否终止
     * 仅对以 Sequence 方式执行的Task有效
     */
    public abort: boolean;
    /**
     * 标识前面发生的错误
     */
    public err: string;
    /**
     * 标识此任务的返回参数
     */
    public stepresult: any;

    constructor(args: any[]) {
        this.args = args;
        this.abort = false;
        this.err = "";
        this.stepresult = null;
    }
}

class AsyncTaskArgs {
    public callback: TasksHandle;
    public arg: TaskArgs;
}

/** Ajax 请求参数 */
class AjaxOption {
    /** 请求的URL */
    public url: string;
    /** 在发送数据前调用的方法 */
    public prepare?: Function;
    /** 设置请求头部 */
    public onsetheader?: HeaderHandle;
    /** 发送成功的回调 */
    public success?: TasksHandle;
    /** 发送失败的回调 */
    public failed?: TasksHandle;
    /** 异步 */
    public async?: boolean;
    /** 连接超时 */
    public timeout?: number;
    /** 请求方式 */
    public method?: string;
    /** POST 数据 */
    public data?: BodyInit;
    /** 返回值格式 */
    public responseType?: XMLHttpRequestResponseType;
    /** 是否携带cookie */
    public withCredentials?: boolean;
}

class BaseAsyncTask implements IAsyncTask {
    public FrendlyName: string;
    public Callback: TasksHandle;
    public Arg: TaskArgs;
    public Execute(){};
    public Wait(task: IAsyncTask) {
        let oricall = task.Callback;
        task.Callback = ((that: IAsyncTask) => {
            return (arg: TaskArgs) => {
                oricall(arg);
                that.Execute();
            };
        })(this);
    }
}

/**
 * 简单异步任务
 * 包装 setTimeout ()
 */
class AsyncTask extends BaseAsyncTask {
    public FrendlyName: string;
    public Callback: TasksHandle;
    public Arg: TaskArgs;
    private _handle: TasksHandle;
    private _delay: number;

    constructor(handle: TasksHandle, delay: number, args: any[]) {
        super();
        this._handle = handle;
        this._delay = delay;
        this.Arg = new TaskArgs(args);
    }

    public Execute(): void {
        let arg: AsyncTaskArgs = new AsyncTaskArgs();
        arg.arg = this.Arg;
        arg.callback = this.Callback;
        let callback = ((arg: AsyncTaskArgs) => {
            arg.arg.stepresult = this._handle && this._handle(arg.arg);
            arg.callback && arg.callback(arg.arg);
        }).bind(this);
        setTimeout(callback, this._delay, arg);
    }
}

/**
 * 异步 Ajax 任务
 * 包装 XMLHttpRequest
 */
class AjaxTask extends BaseAsyncTask {
    public FrendlyName: string;
    public Callback: TasksHandle;
    public Arg: TaskArgs;
    private _xhr: XMLHttpRequest = null;
    private static _root: string = null;

    /**
     * 创建 document.ready 方法
     */
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

    private static root() {
        return (
            AjaxTask._root ||
            (typeof document == "undefined"
                ? ""
                : (document && (AjaxTask._root = document.URL.replace(/([\s\S]*)(\/[^\/]*?\.html)/i, "$1")),
                  AjaxTask._root))
        );
    }

    constructor(option: AjaxOption) {
        super();
        this.Arg = new TaskArgs([option]);
    }

    public Execute(): void {
        let option: AjaxOption = this.Arg.args[0];
        option.prepare && option.prepare();
        let jslist = /.+\/([^\/].+?js)\??/gi.exec(option.url);
        if (jslist && jslist.length > 0) {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.onload = (e) => {
                this.success(jslist[1]);
            };
            script.src = option.url;
            try {
                document.body.appendChild(script);
            } catch (err) {
                document.ready == null ? AjaxTask.extenddocready() : null;
                document.ready(() => {
                    document.body.appendChild(script);
                });
            }
        } else {
            this._xhr = new XMLHttpRequest();
            this._xhr.timeout = option.timeout || 300000;
            this._xhr.responseType = option.responseType || "text";
            this._xhr.withCredentials = !!option.withCredentials;
            this._xhr.onreadystatechange = () => {
                if (this._xhr.readyState === 4) {
                    // TODO:: 访问服务器文件与本地文件分别配置
                    if (Utils.Path().indexOf("file:///") == 0) {
                        if (this._xhr.responseType === "text") this.success(this._xhr.responseText);
                        else this.success(this._xhr.response);
                    } else {
                        if (this._xhr.status >= 200 && this._xhr.status < 300) {
                            if (this._xhr.responseType === "text") this.success(this._xhr.responseText);
                            else this.success(this._xhr.response);
                        } else {
                            this.failed(this._xhr.status);
                        }
                    }
                    this.complete(this._xhr);
                }
            };
            this._xhr.open(option.method || "GET", option.url, option.async == false ? false : true );
            option.onsetheader && option.onsetheader(this._xhr);
            this._xhr.send(option.data || null);
        }
    }

    private success(arg: any) {
        let option: AjaxOption = this.Arg.args[0];
        this.Arg.stepresult = arg;
        option.success && option.success(this.Arg);
        this.Callback && this.Callback(this.Arg);
    }

    private failed(arg: any) {
        let option: AjaxOption = this.Arg.args[0];
        this.Arg.stepresult = arg;
        option.failed && option.failed(this.Arg);
        this.Callback && this.Callback(this.Arg);
    }

    private complete(xhr: XMLHttpRequest | null) {
        if (xhr) xhr = null;
    }
}

/**
 * 自定义任务类
 */
class Tasks {
    /**
     * 等待所有任务完成
     * @param asynctasks 任务列表 任务需为 IAsyncTask 衍生类型
     * @param callback   任务结束回调
     * @param step       单个任务执行结果回调
     * @param order      任务执行顺序
     */
    static WaitAll(
        asynctasks: IAsyncTask[],
        callback: TasksCallback,
        step?: TaskStepCallback,
        order?: TaskOrder
    ) {
        if (asynctasks) {
            let taskcount = asynctasks.length;
            let resultcollection: any[] = new Array<any>();
            order = order || TaskOrder.Default;
            if (order == TaskOrder.Sequence) {
                let i = 0;
                for (; i < taskcount; i++) {
                    if (i + 1 < taskcount) {
                        asynctasks[i].Callback = ((index) => {
                            return (arg: TaskArgs) => {
                                resultcollection.push(arg.stepresult);
                                if (arg.abort) {
                                    callback && callback(index - 1, resultcollection);
                                    return;
                                }
                                step && step(index - 1, taskcount, arg.stepresult, resultcollection, arg.err);
                                asynctasks[index].Arg.stepresult = arg.stepresult;
                                asynctasks[index].Execute();
                            };
                        })(i + 1);
                    } else {
                        asynctasks[i].Callback = (arg: TaskArgs) => {
                            resultcollection.push(arg.stepresult);
                            step && step(taskcount - 1, taskcount, arg.stepresult, resultcollection, arg.err);
                            callback && callback(taskcount, resultcollection);
                            //callback(arg);
                        };
                    }
                }
                asynctasks[0].Execute();
            } else {
                asynctasks.forEach((at, index) => {
                    at.Callback = ((index) => {
                        return (arg: TaskArgs) => {
                            taskcount--;
                            resultcollection.push(arg.stepresult);
                            step && step(index, taskcount, arg.stepresult, resultcollection, arg.err);
                            taskcount == 0 && callback && callback(taskcount, resultcollection);
                        };
                    })(index);
                    at.Execute();
                });
            }
        }
    }

    /**
     * 新建一个异步任务
     * @param handle
     * @param delay
     * @param args
     */
    static New(handle: TasksHandle, delay: number, args: any[]) {
        return new AsyncTask(handle, delay, args);
    }

    /**
     * 新建一个 Ajax 任务
     * @param option
     */
    static Ajax(option: AjaxOption) {
        return new AjaxTask(option);
    }
}

export { Tasks, AjaxOption, TaskOrder, TaskArgs, IAsyncTask };
