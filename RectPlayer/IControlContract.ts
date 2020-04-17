import { PlayMode } from "./PlayerModel";

/**
 * 定义播放器的控制功能
 */
interface IControlContract {

    /**
     * 播放歌曲 
     * @param id 歌曲id
     */
    Play(id: number): void;

    /**
     * 暂停播放
     */
    Pause(): void;

    /**
     * 继续播放
     */
    Resume(): void;

    /**
     * 下一首
     */
    Next(): void;

    /**
     * 上一首
     */
    Prve(): void;

    /**
     * 播放列表
     * @param action 
     */
    Playlist(action: boolean): void;

    /**
     * 添加歌曲
     * @param song 
     */
    Add(song: string | number): void;

    /**
     * 移除歌曲
     * @param song 
     */
    Remove(song: string | number): void;

    /**
     * 切换播放器状态
     */
    SwitchMode(mode: PlayMode): void;

    /**
     * 关于
     */
    About(): void;
}


export { IControlContract }