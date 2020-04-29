import { PlayList, Track } from "../Model/PlayerModel";

/**
 * 播放器模板解析器的接口
 */
interface IResolverContract {
    /**
     * 解析模板
     * @param template
     * @param callback
     */
    ResloveTemplate(template: string, callback: Function): void;
    /**
     * 将播放列表基本信息装填到模板中
     * @param data
     * @param callback
     */
    RenderTemplate(data: PlayList, callback: Function): void;
    /**
     * 装填播放列表所有数据
     * @param list
     */
    RenderPlaylist(list: Array<Track>, callback: Function): void;
}

export { IResolverContract };
