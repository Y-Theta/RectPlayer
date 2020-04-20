/**
 *
 * @Y_Theta http://blog.y-theta.cn
 *
 * PlayerCoreContract
 *
 */

import { Utils } from "./Utils";
import { PlayList, Track, Author } from "./PlayerModel";

interface SourceCore {
    Playlist:PlayList;
    Loaded: boolean;
    GetPlaylist(url: number | string): void;
}

/** 网易云音乐资源 */
class NeteaseCore implements SourceCore {
    constructor() {}

    public Loaded: boolean = false;
    private _loaded: boolean = false;
    public Playlist: PlayList = null;

    public GetPlaylist(url: number | string) {
        if(url)
        this.getneteasePlayListbyID(url as number);
    }

    private getneteasePlayListbyID(id: number) {
        let orilist = null;

        Utils.Ajax({
            async: true,
            url: "http://api.y-theta.cn/Netease/playlist/detail?id=" + id,
            success: (data: string) => {
                orilist = JSON.parse(data);
                if (orilist.code == 200) {
                    let oripl = orilist.playlist;
                    let pl = new PlayList();
                    pl.avatarUrl = oripl.coverImgUrl;
                    pl.nickname = oripl.name;
                    pl.signature = oripl.id;
                    pl.tracks = new Array<Track>();
                    this.Playlist = pl;
                    oripl.tracks.forEach((t: any) => {
                        pl.tracks.push({
                            id: t.id,
                            name: t.name,
                            src: null,
                            al: {
                                id: t.al.id,
                                name: t.al.name,
                                url: t.al.picUrl
                            },
                            ar: this.getauthor(t.ar)
                        });
                    });
                    pl.tracks.forEach(t => {
                        Utils.Ajax({
                            async: true,
                            url: "http://api.y-theta.cn/Netease/music/url?id=" + t.id + "&br=128000",
                            success: (data: string) => {
                                t.src = JSON.parse(data).data[0].url;
                            },
                            failed: (status: number) => {
                                Utils.Log(status);
                            },
                            prepare: () => {
                                Utils.Log("Getting Song" + t.id);
                            }
                        });
                    });
                    setTimeout(this.waitAsync.bind(this), 100);
                }
            },
            failed: (status: number) => {
                Utils.Log(status);
            },
            prepare: () => {
                this.Loaded = false;
                Utils.Log("Getting Playlist");
            }
        });
    }

    private getauthor(ars: any): Array<Author> {
        let arr = new Array<Author>();
        ars.forEach((ar: any) => {
            arr.push({
                id: ar.id,
                name: ar.name
            });
        });
        return arr;
    }

    private waitAsync() {
        this._loaded = true;
        this.Playlist.tracks.forEach(v => {
            if (v.src == null) this._loaded = false;
        });
        this._loaded ? (this.Loaded = true) : setTimeout(this.waitAsync.bind(this), 100);
    }
}

/** 本地文件资源 */
class LocalCore implements SourceCore {
    public Playlist:PlayList;
    public Loaded: boolean;

    public GetPlaylist(url: number | string): void {
        return null;
    }
}

export { SourceCore, NeteaseCore, LocalCore };
