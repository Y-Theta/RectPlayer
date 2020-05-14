import { PlayList, Track } from "../Model/PlayerModel";
import { ActionD, Action } from "../Model/EventArgs";

/**
 * 定义音乐源接口
 */
interface ISourceContract {
    /**
     * 根据指定的ID或者路径解析获得歌曲源
     * @param url
     * @param callback 回调 
     */
    Init(url: number | string, callback: Function): void;
    /**
     * 更新播放列表，由于一些在线音乐接口的音乐获取是有有效时间的，因此需要定时更新音乐url
     * @param callback
     * @param ids
     */
    Update(callback: Function, ids?: number | number[]): void;
    /**
     * 将指定的音乐文件添加到播放列表中
     * @param url
     * @param callback
     * @param pos 添加到音乐列表的哪个位置，将当前音乐插入此位置，并将原先此位置音乐后移
     */
    Add(url: number[] | Track[], callback: Function, pos?: number): void;
    /**
     * 将指定的音乐文件添加到播放列表中
     * @param ids 音乐在列表中的 id 或 列表元素实例
     * @param callback
     */
    Remove(ids: number[] | Track[], callback: Function): void;
}

export { ISourceContract };
