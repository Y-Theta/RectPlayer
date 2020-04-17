/**
 *
 * 模板解析类,用于定义如何解析其Html模板
 *
 * */

import { PlayList, Point } from "./PlayerModel";
import * as XML from "xml-js";
import { PlayerItem } from "./PlayerItem";
import { IControlContract } from "./IControlContract";

interface IRectplayerTemplateResolver {
  ResloveTemplate(template: string, data: PlayList): PlayerItem;
}

/**
 * 默认的播放器样式解析器
 * 根据模板中定义的关键字解析模板
 * */
class DefaultTemplateResolver implements IRectplayerTemplateResolver {
  public constructor() {}

  /**
   * 解析播放器模板
   * @param oritemplate  模板html
   * @param data         播放列表数据
   */
  public ResloveTemplate(oritemplate: string, data: PlayList) {
    //Utils.Log(XML.xml2js(oritemplate));
    let player = document.createElement("div");
    let listitem: Array<HTMLElement> = new Array<HTMLElement>();
    let result = /<player>([\s\S]*?)<\/player>[\s\S]*?<listitem>([\s\S]*?)<\/listitem>/im.exec(oritemplate);
    let playerdom = this.parseDom(result[1]);
    let listdom = this.parseDom(result[2]);

    let audiosrc = playerdom.querySelector("#src");
    audiosrc.classList.add("rect-audio");
    if (data != null) data.tracks.forEach((v, i, ins) => {});
    player.append(playerdom);

    let playeritem = new PlayerItem();
    playeritem.View = player;
    
    return playeritem;
  }

  /**
   * 将文本转化为dom对象，方便使用筛选器进行查询
   * @param arg 要转换为dom对象的文本
   */
  private parseDom(arg: string) {
    let objE = document.createElement("div");
    objE.innerHTML = arg.replace(/(>)\s+?(<)/gm, "$1$2").trim();
    return objE;
  }

  /**
   * 将百分比转化为svg的环形
   */
  private parsePercent(percent: number, center: Point, radius: number): string {
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
  private getcrosslineAngle(p1: Point, p2: Point, p: Point) {
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
   * @param element
   * @param tip
   */
  private setElementTip(element: HTMLElement, tip: string) {
    element && (element.title = tip);
  }

  /**
   *
   * @param element 需要设置的元素
   * @param normal 元素的默认状态
   * @param active 元素的变化状态
   */
  private switchElementStatus(element: HTMLElement, normal: string, active: string): string {
    if (element) {
      let classl = element.classList;
      let newstatus = normal;
      classl.contains(normal)
        ? (classl.remove(normal), classl.add(active), (newstatus = active))
        : classl.contains(active)
        ? (classl.remove(active), classl.add(normal))
        : classl.add(normal);
      return newstatus;
    }
    return null;
  }
}

export { IRectplayerTemplateResolver, DefaultTemplateResolver };
