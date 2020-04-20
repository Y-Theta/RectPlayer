/**
 * @Y_Theta http://blog.y-theta.cn
 *
 * An audio player based on
 * Skplayer       https://github.com/wangpengfei15975/skPlayer
 * netmusic-node  https://github.com/sqaiyan/netmusic-node
 *
 */

import { Utils } from "./Utils";
import { IRectplayerTemplateResolver, DefaultTemplateResolver } from "./RectplayerTemplateResolver";
import { SourceCore, NeteaseCore, LocalCore } from "./SourceCore";
import { RectPlayerOption, PlayList } from "./PlayerModel";
import { IControlContract } from "./IControlContract";

export class RectPlayer {
    private _scriptcache: Map<string, string | null>;
    private _loaded: boolean = false;
    private _mode: string;
    private _srcResolver: SourceCore = null;
    private _templateResolver: IRectplayerTemplateResolver = null;
    private _playerControl: IControlContract = null;
    private _listuid: string | number = null;
    private _playlist:PlayList = null;
    private _async: boolean = true;

    constructor(option: RectPlayerOption | null) {
        Utils._enablelog = option.EnableLog || false;
        this._scriptcache = new Map();
        this._templateResolver = option.Reslover || new DefaultTemplateResolver();
        this._async = option.Async == null ? true : option.Async;
        this._listuid = option.PlaylistId;
        this._srcResolver = new NeteaseCore();
        this.loadDependenceAsync();
        Utils.Log("\\ RectPlayer  1.0.0 \n\\ @Y_Theta \n\\ http:\\\\blog.y-theta.com \n\\ Starting ....");
    }

    /**
     * 获取播放列表
     */
    private getPlayList(id: string | number) {
        if(this._srcResolver)
        this._srcResolver.GetPlaylist(id);
    }

    /**
     * 异步加载依赖文件
     */
    private loadDependenceAsync() {
        let dependencefile: Array<string> = [
            Utils.Path() + "/less.min.js",
            Utils.Path("resource") + "/javascript/lib/anime.min.js"
        ];
        dependencefile.forEach(element => {
            this._scriptcache.set(element, null);
            Utils.Ajax({
                async: true,
                url: element,
                prepare: () => {},
                success: (data: string) => {
                    this._scriptcache.set(element, data);
                },
                failed: (status: number) => {
                    Utils.Log("faild : " + element + "  code " + status);
                }
            });
        });
        this.waitAsync();
    }

    /**
     * 异步等待文件加载完成
     */
    private waitAsync() {
        let fecthed = true;
        this._scriptcache.forEach(v => {
            if (v == null || v == "") fecthed = false;
        });

        if (!fecthed) setTimeout(this.waitAsync.bind(this), 200);
        else {
            this._loaded = true;
        }
    }

    /**
     * 更改播放器的播放模式
     * @param mode
     * 播放模式 以下几种之一
     * Netease | LocalFile
     */
    public SwitchMode(mode: string) {
        this._mode = mode;
        this._srcResolver = null;
        if (this._mode === "Netease") {
            this._srcResolver = new NeteaseCore();
        } else if (this._mode === "LocalFile") {
            this._srcResolver = new LocalCore();
        }
    }

    /**
     * 解析模板并将其加载到当前页面中
     */
    public TryResolve() {
        /**
         * 确认依赖加载完成
         */
        this.resolve();
    }

    /**
     *
     */
    private resolve() {
        if (!this._loaded) {
            setTimeout(this.resolve.bind(this), 200);
        } else {
            // 请求样式页
            Utils.Ajax({
                async: true,
                url: Utils.Path() + "/template/style.less",
                prepare: () => {
                    Utils.Log("GetTemplate Less !");
                },
                success: (data: string) => {
                    less.render(data, (e, o) => {
                        let style = document.createElement("style");
                        style.type = "text/css";
                        style.innerHTML = o.css;
                        document
                            .getElementsByTagName("head")
                            .item(0)
                            .appendChild(style);
                    });
                },
                failed: () => {
                    Utils.Log("Faild !");
                }
            });

            //请求模板
            Utils.Ajax({
                async: true,
                url: Utils.Path() + "/template/Template.xml",
                prepare: () => {
                    Utils.Log("GetTemplate !");
                },
                success: (data: string) => {
                    this._async ? this.loadlistAsync(data) : this.loadlist(data);
                },
                failed: () => {
                    Utils.Log("Faild !");
                }
            });
        }
    }

    private loadlist(data: string) {
        let temp = this._templateResolver.ResloveTemplate(data);
        document.body.appendChild(temp.View);
        this._playerControl = temp.Control;
    }

    private loadlistAsync(data: string) {
        let temp = this._templateResolver.ResloveTemplate(data);
        document.body.appendChild(temp.View);
        this._playerControl = temp.Control;
        this.getPlayList(this._listuid);
        setTimeout(this.rendertemplate.bind(this),100);
    }

    private rendertemplate(){
        this._srcResolver.Loaded ? 
        (this._playlist = this._srcResolver.Playlist,  this._templateResolver.RenderTemplate(this._playlist)):
        setTimeout(this.rendertemplate.bind(this),100);
    }
}
