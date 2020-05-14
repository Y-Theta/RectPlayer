/**
 *
 */
interface Window {
    webkitAudioContext: any;
    mozAudioContext: any;
    msAudioContext: any;

    attachEvent: Function;
    opera: Function;
}

interface Document {
    ready(f: Function): void;
    addEventListener(type: string, listener: Function, options?: boolean | AddEventListenerOptions): void;
}

interface HTMLElement {
    onmousewheel: ((this: HTMLElement, ev: Event) => any) | null;
    play():void;
    pause():void;
    volume:number;
    buffered:any;
    duration:any;
    currentTime:any;
}

interface Event {
    wheelDelta: any;
    detail: any;
}
