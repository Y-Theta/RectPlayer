/**
 * 
 * @Y_Theta http://blog.y-theta.cn
 * 
 * PlayerCoreContract
 * 
 */

import { Utils } from "./Utils";


class PlayerCore {

    public GetPlaylist: getPlayList;
    public GetSrc: getSrcurl;

    constructor() {
    }
}

interface getPlayList {
    (url: number | string): Array<any>;
}

interface getSrcurl {
    (url: number): Array<any>;
}

/** 网易云音乐资源 */
class NeteaseCore extends PlayerCore {

    constructor() {
        super();
        this.GetPlaylist = id => {
            if (typeof (id) === "number")
                return this.getneteasePlayListbyID(id);
            return [];
        }
    }

    private getneteasePlayListbyID(id: number): Array<any> {
        Utils.Ajax({
            url: "",
            success: (data: string) => {

            },
            failed: (status: number) => {
            },
            prepare: () => {
            }
        });

        return [];
    }
}

/** 本地文件资源 */
class LocalCore extends PlayerCore {


}


export { PlayerCore, NeteaseCore, LocalCore }