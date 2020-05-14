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
import { ISourceContract } from "./Interfaces/ISourceContract";
import { ActionD, Action } from "./Model/EventArgs";
import { url } from "inspector";

/** 网易云音乐资源 */
class NeteaseCore implements ISourceContract {
    //#region
    private static _apiurl: string = "http://api.y-theta.cn/Netease";
    private static _playlistapi: string = NeteaseCore._apiurl + "/playlist/detail?";
    private static _tracksrcapi: string = NeteaseCore._apiurl + "/music/url?";
    //#endregion

    private _playlist: PlayList = null;

    private _loaded: boolean = false;
    private _timeout = 200; //单首歌url获取超时 平均
    private _timeouttimer = 0;

    /** 初始化播放列表 */
    public Init(url: string | number, callback: Action<PlayList>): void {
        let id = 0;
        if (typeof url == "string") {
            if (!/[^0-9]/.exec(url)) {
                id = Number.parseInt(url);
            } else {
                return;
            }
        } else {
            id = url;
        }

        Tasks.Ajax({
            url: NeteaseCore._playlistapi + "id=" + id,
            prepare: () => {
                Utils.Log("playlist : " + id);
            },
            success: (args: TaskArgs) => {
                this._playlist = new PlayList();
                let orilist = null;
                try {
                    let pl = this._playlist;
                    orilist = JSON.parse(args.stepresult);
                    if (orilist && orilist.code && orilist.code === 200) {
                        let oripl = orilist.playlist;
                        pl.avatarUrl = oripl.coverImgUrl;
                        pl.nickname = oripl.name;
                        pl.signature = oripl.id;
                        pl.tracks = new Array<Track>();
                        oripl.tracks.forEach((t: any) => {
                            pl.tracks.push({
                                id: t.id,
                                name: t.name,
                                src: null,
                                al: {
                                    id: t.al.id,
                                    name: t.al.name,
                                    url: t.al.picUrl,
                                },
                                ar: this.getauthor(t.ar),
                                valid: true
                            });
                        });
                    }
                } catch {}

                callback(this._playlist);
            },
        }).Execute();
    }

    /** 更新播放列表 */
    public Update(callback: Action<PlayList>, ids?: number | number[]): void {
        let updatelist: Array<number> = null;
        if (ids != undefined) {
            updatelist = [];
            typeof ids == "number" ? updatelist.push(ids) : updatelist.concat(ids);
        }
        let updatetask: IAsyncTask[] = [];
        if (updatelist) {
            updatelist.forEach((v) => {
                let track = this._playlist.tracks[v];
                updatetask.push(this.ajaxsongsrc(track));
            });
        } else {
            this._playlist.tracks.forEach((v) => {
                updatetask.push(this.ajaxsongsrc(v));
            });
        }
        Tasks.WaitAll(updatetask, () => callback(this._playlist), null, TaskOrder.Default);
    }

    public Add(url: Track[] | number[], callback: Action<PlayList>, pos?: number): void {}

    public Remove(ids: Track[] | number[], callback: Action<PlayList>): void {}

    /** 更新单曲的音频源的任务 */
    private ajaxsongsrc(track: Track) {
        return Tasks.Ajax({
            url: NeteaseCore._tracksrcapi + "id=" + track.id + "&br=320000",
            prepare: () => {
                Utils.Log("Song - s -" + track.id);
            },
            success: (args: TaskArgs) => {
                Utils.Log("Song - e -" + track.id);
                let url = null;
                try {
                    url = JSON.parse(args.stepresult).data[0].url;
                } catch {}
                track.valid = !!url;
                track.src = url;
            },
        });
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

    constructor() {}
}

export { NeteaseCore };
