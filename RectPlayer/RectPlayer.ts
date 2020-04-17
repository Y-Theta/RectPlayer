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
import { SourceCore, NeteaseCore, LocalCore } from "./PlayerCore";
import { RectPlayerOption } from "./PlayerModel";
import { IControlContract } from "./IControlContract";

export class RectPlayer {
    private _scriptcache: Map<string, string | null>;
    private _loaded: boolean = false;
    private _mode: string;
    private _srcResolver: SourceCore = null;
    private _templateResolver: IRectplayerTemplateResolver = null;
    private _playerControl :IControlContract = null;

    constructor(option: RectPlayerOption | null) {
        Utils._enablelog = option.EnableLog || false;
        this._scriptcache = new Map();
        this._templateResolver = option.Reslover || new DefaultTemplateResolver();
        this.loadDependenceAsync();
        Utils.Log("\\ RectPlayer  1.0.0 \n\\ @Y_Theta \n\\ http:\\\\blog.y-theta.com \n\\ Starting ....");
    }

    /**
     * 
     */
    private getPlayList(id: string | number) {
        return this._srcResolver.GetPlaylist(id);
    }

    /**
     * 异步加载依赖文件
     */
    private loadDependenceAsync() {
        let dependencefile: Array<string> = [
            Utils.Path() + "/less.min.js",
            Utils.Path() + "/xml-js.min.js",
            Utils.Path("resource") + "/javascript/lib/anime.min.js",

        ];
        dependencefile.forEach(element => {
            this._scriptcache.set(element, null);
            Utils.Ajax({
                async: true,
                url: element,
                prepare: () => { },
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
        this._scriptcache.forEach((v) => {
            if (v == null || v == "")
                fecthed = false;
        });

        if (!fecthed)
            setTimeout(this.waitAsync.bind(this), 200);
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
            Utils.Ajax({
                async: true,
                url: Utils.Path() + "/template/Template.xml",
                prepare: () => {
                    Utils.Log("GetTemplate !");
                },
                success: (data: string) => {
                    let temp = this._templateResolver.ResloveTemplate(data, null);
                    document.body.appendChild(temp.View);
                    this._playerControl = temp.Control;
                },
                failed: () => {
                    Utils.Log("Faild !");
                },

            });
        }
    }
}
