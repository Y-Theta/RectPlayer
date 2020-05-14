import { Track, PlayMode } from "../Model/PlayerModel";

/**
 * 定义音乐选择接口
 */
interface ISongSelectContract {
    /** 定义如何获取前一曲音乐 */
    Priv(mode: PlayMode, tracks: Track[], now: Track | number, history?: number[]): Track | number;
    /** 定义如何获取后一曲音乐 */
    Next(mode: PlayMode, tracks: Track[], now: Track | number, history?: number[]): Track | number;
}

export { ISongSelectContract };
