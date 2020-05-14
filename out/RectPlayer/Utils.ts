import { Point } from "./Model/PlayerModel";

/**
 *
 * @Y_Theta http://blog.y-theta.cn
 *
 * Utils
 *
 */
class Utils {
    private static _rootpath: string = null;
    private static _respath: string = "http://res.y-theta.cn";
    public static _enablelog: boolean = true;

    /**
     * 判断有无中文字符
     * @param temp 
     */
    private static hasChinese(temp: string) {
        //var re = /.*[\\u4E00-\\u9FFF]+.*$/;
        return escape(temp).indexOf("%u") >= 0;
    }

    /**
     * 将文本转化为dom对象，方便使用筛选器进行查询
     * @param arg 要转换为dom对象的文本
     */
    static Dom(arg: string) {
        let objE = document.createElement("div");
        objE.innerHTML = arg.replace(/(>)\s+?(<)/gm, "$1$2").trim();
        return objE;
    }

    /**
     * 输出函数
     */
    static Log(obj: any) {
        Utils._enablelog ? console.log(obj) : null;
    }

    /* 质朴长存法  by lifesinger */
    static PadLeft(num: number | string, n: number) {
        let padnum = num.toString();
        let len = num.toString().length;
        let charp = typeof num == "string" ? (Utils.hasChinese(num) ? "\u3000" : " ") : "0";
        while (len < n) {
            padnum = charp + padnum;
            len++;
        }
        return padnum;
    }

    /**
     * 获取目录路径
     */
    static Path(type: string = "root") {
        switch (type) {
            case "resource":
                return Utils._respath;
            case "root":
                return (
                    Utils._rootpath ||
                    ((Utils._rootpath = document.URL.replace(/([\s\S]*)(\/[^\/]*?\.html)/i, "$1")), Utils._rootpath)
                );
            case "":
                break;
        }
    }

    /**
     * 将时间转化为 00:00格式
     * @param time
     */
    static TimeFormat(time: number) {
        let tempMin = ~~(time / 60);
        let tempSec = ~~(time % 60);
        let curMin = tempMin < 10 ? "0" + tempMin : tempMin;
        let curSec = tempSec < 10 ? "0" + tempSec : tempSec;
        return curMin + ":" + curSec;
    }

    /**
     * 将小数转换为百分比
     * @param percent
     */
    static PercentFormat(percent: number) {
        return (percent * 100).toFixed(2) + "%";
    }

    /**
     * 将百分比转化为svg的环形
     */
    static Percent(percent: number, center: Point, radius: number): string {
        let A = percent * Math.PI * 2;
        let x = radius * Math.sin(A);
        let y = radius * Math.cos(A);
        x = center.x + x;
        y = center.y - y;
        let t = center.y - radius;

        if (percent < 0.5) return "M " + center.x + "," + t + " A " + radius + " " + radius + " 0 0 1 " + x + " " + y;
        else if (percent == 1)
            return "M " + center.x + "," + t + " A " + radius + " " + radius + "  0 1 1 " + (x - 0.01) + " " + y;
        else return "M " + center.x + "," + t + " A " + radius + " " + radius + "  0 1 1 " + x + " " + y;
    }

    /**
     * 获取两直线夹角
     * 直线由（p1 ,p） (p2 ,p) 确定
     */
    static AngleLL(p1: Point, p2: Point, p: Point) {
        let x1 = p1.x - p.x;
        let y1 = p1.y - p.y;
        let x2 = p2.x - p.x;
        let y2 = p2.y - p.y;

        const dot = x1 * x2 + y1 * y2;
        const det = x1 * y2 - y1 * x2;
        const angle = (Math.atan2(det, dot) / Math.PI) * 180;
        return (angle + 360) % 360;
    }

    /**
     *
     * @param element 需要设置的元素
     * @param normal 元素的默认状态
     * @param active 元素的变化状态
     */
    static SwitchElementStatus(element: HTMLElement, normal: string, active: string) {
        if (element) {
            let classl = element.classList;
            // prepare && prepare(normal);
            if (normal == null) {
                classl.contains(active) ? classl.remove(active) : null;
                return;
            } else {
                classl.contains(normal)
                    ? null
                    : classl.contains(active)
                    ? (classl.remove(active), classl.add(normal))
                    : classl.add(normal);
            }
        }
    }
}

export { Utils };
