import { IControlContract } from "./IControlContract"

/**
 * 播放器单元
 */
class PlayerItem {

    /**
     * 控制器
     */
    public Control: IControlContract;

    /**
     * 界面
     */
    public View: HTMLElement;
}

export { PlayerItem }