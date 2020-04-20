/**
 * 
 * @Y_Theta http://blog.y-theta.cn
 * 
 * PlayerCoreContract
 * 
 */

import { Utils } from "./Utils";


interface SourceCore {

    GetPlaylist(url: number | string): Array<any>;
    GetSrc(url: number): Array<any>;

}

/** 网易云音乐资源 */
class NeteaseCore implements SourceCore {

    constructor() {

    }

    public GetPlaylist(url: number | string): Array<any> {
        return null;
    }

    public GetSrc(url: number): Array<any> {
        return null;
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
class LocalCore implements SourceCore {


    public GetPlaylist(url: number | string): Array<any> {
        return null;
    }

    public GetSrc(url: number): Array<any> {
        return null;
    }


}


export { SourceCore, NeteaseCore, LocalCore }