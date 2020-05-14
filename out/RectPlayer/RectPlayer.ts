/**
 * @Y_Theta http://blog.y-theta.cn
 *
 * An audio player based on
 * Skplayer         https://github.com/wangpengfei15975/skPlayer
 * netmusic-node    https://github.com/sqaiyan/netmusic-node
 *
 */

import { Utils } from "./Utils";
import { SourceCore, NeteaseCore, LocalCore } from "./SourceCore";
import { RectPlayerOption, PlayList, PlayMode } from "./Model/PlayerModel";
import { IControlContract } from "./Interfaces/IControlContract";
import { IResolverContract } from "./Interfaces/IResolverContract";
import { ISourceContract } from "./Interfaces/ISourceContract";
import { Tasks, IAsyncTask, TaskArgs, TaskOrder } from "./dependence/Tasks";
import { DefaultTemplateResolver } from "./RectplayerTemplateResolver";

export class RectPlayer implements IControlContract {
    //#region IOC
    private _resolver: IResolverContract = null;
    private _core: ISourceContract = null;
    //#endregion

    //#region Properties
    private _playlist: PlayList = null;

    //#endregion

    //#region IControlContract

    Play(id: number): void {}
    Pause(): void {}
    Resume(): void {}
    Next(): void {}
    Prve(): void {}
    Playlist(action: boolean): void {}
    SwitchMode(mode: PlayMode): void {
        
    }
    About(): void {}
    //#endregion

    public Init() {
        //加载依赖文件
        let dependencefile: Array<string> = [
            Utils.Path() + "/less.min.js",
            Utils.Path("resource") + "/javascript/lib/anime.min.js",
        ];
        let loadtasks: IAsyncTask[] = [];
        dependencefile.forEach((element) => {
            loadtasks.push(
                Tasks.Ajax({
                    url: element,
                    prepare: () => Utils.Log("loading ... " + element),
                    success: (arg: TaskArgs) => Utils.Log(arg.stepresult + " loaded"),
                    failed: (arg: TaskArgs) => Utils.Log(arg.stepresult + " failed"),
                })
            );
        });
        Tasks.WaitAll(loadtasks, (all, allres) => {
            //加载模板和样式
            let temptask: IAsyncTask[] = [];
            temptask.push(
                Tasks.Ajax({
                    url: Utils.Path() + "/template/style.less",
                    prepare: () => {
                        Utils.Log("GetTemplate Less !");
                    },
                })
            );
            temptask.push(
                Tasks.Ajax({
                    url: Utils.Path() + "/template/Template.xml",
                    prepare: () => {
                        Utils.Log("GetTemplate Html !");
                    },
                })
            );
            Tasks.WaitAll(temptask, (all, allres) => {
                if(allres[1]){

                }
            },null,TaskOrder.Sequence);
        });
    }

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
    constructor(option: RectPlayerOption) {
        Utils._enablelog = true;
        this._core ;
        this._resolver = new DefaultTemplateResolver();
        Utils.Log("\\ RectPlayer  1.0.0 \n\\ @Y_Theta \n\\ http:\\\\blog.y-theta.com \n\\ Starting ....");
    }

    //#endregion
}
