import { ISongSelectContract } from "./Interfaces/ISongSelectContract";
import { PlayMode, Track } from "./Model/PlayerModel";

/**  */
class SongSelecter implements ISongSelectContract {
    /** 选择前一首歌曲 */
    Priv(mode: PlayMode, tracks: Track[], now: number | Track, history?: number[]): number {
        if (!tracks) {
            return null;
        }
        let privid = typeof now == "number" ? now : tracks.indexOf(now);
        switch (mode) {
            case PlayMode.normal:
            case PlayMode.repeat:
            case PlayMode.repeatone:
                if (history) privid = history[history.length - 2];
                else privid = (privid - 1 + tracks.length) % tracks.length;
                break;
            case PlayMode.random:
                if (history) privid = history[history.length - 2];
                else privid = Math.floor(Math.random() * tracks.length);
                break;

            default:
                break;
        }
        return privid;
    }

    /** 选择后一首歌曲 */
    Next(mode: PlayMode, tracks: Track[], now: number | Track, history?: number[]): number {
        if (!tracks) {
            return null;
        }
        let privid = typeof now == "number" ? now : tracks.indexOf(now);
        switch (mode) {
            case PlayMode.normal :
            case PlayMode.repeat :
            case PlayMode.repeatone:
                privid = (privid + 1) % tracks.length;
                break;
            case PlayMode.random:
                privid = Math.floor(Math.random() * tracks.length);
                break;
            // case PlayMode.repeat:
            //     if (history) privid = history[history.length - 2];
            //     else privid = (privid - 1 + tracks.length) % tracks.length;
            //     break;
            // case PlayMode.repeatone:
            //     if (history) privid = history[history.length - 2];
            //     else privid = (privid - 1 + tracks.length) % tracks.length;
            //     break;
            default:
                break;
        }
        return privid;
    }
}

export { SongSelecter };
