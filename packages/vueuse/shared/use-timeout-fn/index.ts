import type { MaybeRef } from '../utils';

import { ref, unref } from 'vue';
import { isBrowser } from '@vinicunca/js-utilities';

import { tryOnScopeDispose } from '../try-on-scope-dispose';

export interface TimeoutFnOptions {
  /**
   * Start the timer immediate after calling this function
   *
   * @default true
   */
  immediate?: boolean;
}

interface Params {
  cb: (...args: unknown[]) => any;
  interval: MaybeRef<number>;
  options?: TimeoutFnOptions;
}

/**
 * Wrapper for `setTimeout` with controls.
 */
export function useTimeoutFn({ cb, interval, options = {} }: Params) {
  const { immediate = true } = options;

  const isPending = ref(false);

  let timer: number | null = null;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function stop() {
    isPending.value = false;
    clear();
  }

  function start(...args: unknown[]) {
    clear();
    isPending.value = true;

    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;

      cb(...args);
    }, unref(interval)) as unknown as number;
  }

  if (immediate) {
    isPending.value = true;
    if (isBrowser) {
      start();
    }
  }

  tryOnScopeDispose(stop);

  return {
    isPending,
    start,
    stop,
  };
}
