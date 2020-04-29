/**
 *
 * @Y_Theta http://blog.y-theta.cn
 *
 * PlayerCoreContract
 *
 */

import { Utils } from "./Utils";
import { PlayList, Track, Author } from "./Model/PlayerModel";
import { TaskArgs, TaskOrder, Tasks, IAsyncTask } from "./dependence/Tasks";

interface SourceCore {
    Playlist: PlayList;
    Loaded: boolean;
    Timeout: boolean;
    Init(url: number | string): void;
    Update(ids?: number | number[]): void;
    Add(url: number | string): string;
    Remove(url: number | string): string;
}

/** 网易云音乐资源 */
class NeteaseCore implements SourceCore {
    constructor() {}

    public Loaded: boolean = false;
    public Playlist: PlayList = null;
    public Timeout: boolean = false;

    private _loaded: boolean = false;
    private _timeout = 200; //单首歌url获取超时 平均
    private _timeouttimer = 0;

    public Init(url: string | number): void {
        throw new Error("Method not implemented.");
    }
    public Update(ids?: number | number[]): void {
        throw new Error("Method not implemented.");
    }
    public Add(url: string | number): string {
        throw new Error("Method not implemented.");
    }
    public Remove(url: string | number): string {
        throw new Error("Method not implemented.");
    }

    public GetPlaylist(url: number | string) {
       // if (url) this.getneteasePlayListbyID(url as number);
    }

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

    private getauthor(ars: any): Array<Author> {
        let arr = new Array<Author>();
        ars.forEach((ar: any) => {
            arr.push({
                id: ar.id,
                name: ar.name,
            });
        });
        return arr;
    }

    private waitAsync() {
        this._loaded = true;
        this.Playlist.tracks.forEach((v) => {
            if (v.src == null) this._loaded = false;
        });
        this._timeouttimer -= 100;
        Utils.Log("Fetch Song Timer : " + this._timeouttimer);
        if (this._timeouttimer < 0) {
            this.Playlist.tracks = this.Playlist.tracks.filter((v) => v.src != null);
            this.Timeout = true;
            return;
        }
        this._loaded ? (this.Loaded = true) : setTimeout(this.waitAsync.bind(this), 100);
    }
}

/** 本地文件资源 */
class LocalCore implements SourceCore {
    public Playlist: PlayList;
    public Loaded: boolean;
    public Timeout: boolean = false;

    public Init(url: string | number): void {
        throw new Error("Method not implemented.");
    }
    public Update(ids?: number | number[]): void {
        throw new Error("Method not implemented.");
    }
    public Add(url: string | number): string {
        throw new Error("Method not implemented.");
    }
    public Remove(url: string | number): string {
        throw new Error("Method not implemented.");
    }
}

export { SourceCore, NeteaseCore, LocalCore };
