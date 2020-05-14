/**
 * 播放列表信息
 * */
class PlayList {
    public avatarUrl: string;
    public nickname: string;
    public signature: string;
    public tracks: Array<Track>;
}

/**
 * 歌曲信息
 * */
class Track {
    public id: number;
    public name: string;
    public src: string;
    public ar: Array<Author>;
    public al: Avatar;
    public valid: boolean;
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
    public EnableLog? : boolean;
    public PlayMode? : PlayMode;
    public Async? : boolean;
    public PlaylistId: number | string;
    public Dependence? :string[] ;
    public Template? : string;
    public Style? : string;
}

/**
 * 播放器控件
 */
class RectPlayerControl {
    public list: HTMLElement;
    public source: HTMLAudioElement;
    public name: HTMLElement;
    public author: HTMLElement;
    public cover_avatar: HTMLElement;
    public cover_resolve: HTMLElement;
    public cover_static: HTMLElement;
    public ctl_play: HTMLElement;
    public ctl_mute: HTMLElement;
    public ctl_fore: HTMLElement;
    public ctl_prve: HTMLElement;
    public ctl_mode: HTMLElement;
    public ctl_listadd: HTMLElement;
    public ctl_listremove: HTMLElement;
    public ctl_listtoogle: HTMLElement;
    public ctl_paneltoogle: HTMLElement;
    public ctl_about: HTMLElement;
    public time_now: HTMLElement;
    public time_des: HTMLElement;
    public volume: HTMLElement;
    public volume_path: HTMLElement;
    public volume_track: HTMLElement;
    public track_full: HTMLElement;
    public track_loding: HTMLElement;
    public track_now: HTMLElement;
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
    normal = "normal",
    repeat = "repeat",
    repeatone = "repeatone",
    random = "random",
}

export { PlayList, Track, Author, Avatar, RectPlayerOption, Point, PlayMode, RectPlayerControl };
