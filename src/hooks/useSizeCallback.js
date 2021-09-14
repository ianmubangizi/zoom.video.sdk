import { useLayoutEffect } from "react";
import { isShallowEqual } from "../utils/util";

// interface ResizeObserverEntry {
//   target: Element;
// }
// type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;

export class ResizeObserver {
  entries = []
  constructor(callback) {
    callback(this.entries);
  }
  observe(target) {
    this.entries.push({target})
  }
  unobserve(target) {
    this.entries = this.entries.filter(entry => !isShallowEqual(entry, {target})) 
  }
  disconnect() {
    this.entries = []
  }
}

export function useSizeCallback(target, callback) {
  useLayoutEffect(() => {
    if (!target) {
      return () => {
        //
      };
    }
    
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        callback({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(target);
    
    return () => {
      resizeObserver.unobserve(target);
      resizeObserver.disconnect();
    };
  }, [target, callback]);
}
