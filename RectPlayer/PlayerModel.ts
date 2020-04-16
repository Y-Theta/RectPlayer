import { IRectplayerTemplateResolver } from "./RectplayerTemplateResolver";

/**
 * 播放列表信息
 * */
class PlayList {
    public avatarUrl: string;
    public nickname: string;
    public signature: string;
    public backgroundUrl: string;
    public tracks: Array<Track>;
}

/**
 * 歌曲信息
 * */
class Track {
    public id: number;
    public name: string;
    public ar: Array<Author>;
    public al: Avatar;

}

/**
 * 歌手信息
 * */
class Author {
    public name: string;
    public id: number;
}

/**
 * 封面信息
 * */
class Avatar {
    public id: number;
    public name: string;
    public url: string;
}

/**
 * 
 * */
class RectPlayerOption {
    public Reslover: IRectplayerTemplateResolver;
    public EnableLog: boolean;
    public PlayMode: PlayMode;
}

/**
 * 
 */
class Point {
    public x: number;
    public y: number;
}

/**
 * 
 */
enum PlayMode {
    Random,
    LoopOne,
    LoopList
}

export { PlayList, Track, Author, Avatar, RectPlayerOption, Point, PlayMode }