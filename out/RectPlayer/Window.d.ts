/**
 * 
 */
interface Window {

    attachEvent: Function;

    opera: Function;
}

interface Document {

    ready(f: Function): void;

    addEventListener(type: string, listener: Function, options?: boolean | AddEventListenerOptions): void;
}