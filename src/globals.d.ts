import type { RouteLocationRaw } from 'vue-router';

declare global {
  interface Element {
    _ripple?: {
      enabled?: boolean;
      centered?: boolean;
      class?: string;
      circle?: boolean;
      touched?: boolean;
      isTouch?: boolean;
      showTimer?: number;
      showTimerCommit?: (() => void) | null;
    };

    getElementsByClassName(classNames: string): NodeListOf<HTMLElement>;
  }
}

declare module 'vue-router' {
  export interface RouterLinkOptions {
    to: RouteLocationRaw;
    replace?: boolean;
  }
}
