import type { ConfigurableWindow } from '../_defaults';
import type { MaybeElementRef } from '../unref-element';

import { watch } from 'vue';
import { tryOnScopeDispose } from '@vinicunca/vueuse/shared';

import { unrefElement } from '../unref-element';
import { defaultWindow } from '../_defaults';

export interface ResizeObserverSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

export interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize?: ReadonlyArray<ResizeObserverSize>;
  readonly contentBoxSize?: ReadonlyArray<ResizeObserverSize>;
  readonly devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>;
}

export type ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void;

export interface ResizeObserverOptions extends ConfigurableWindow {
  /**
   * Sets which box model the observer will observe changes to. Possible values
   * are `content-box` (the default), and `border-box`.
   *
   * @default 'content-box'
   */
  box?: 'content-box' | 'border-box';
}

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  disconnect(): void;
  observe(target: Element, options?: ResizeObserverOptions): void;
  unobserve(target: Element): void;
}

interface Params {
  target: MaybeElementRef;
  callback: ResizeObserverCallback;
  options?: ResizeObserverOptions;
}

/**
 * Reports changes to the dimensions of an Element's content or the border-box
 *
 * @see https://vueuse.org/useResizeObserver
 * @param target
 * @param callback
 * @param options
 */
export function useResizeObserver({ target, callback, options = {} }: Params) {
  const { window = defaultWindow, ...observerOptions } = options;
  let observer: ResizeObserver | undefined;
  const isSupported = window && 'ResizeObserver' in window;

  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  }

  const stopWatch = watch(
    () => unrefElement(target),
    (_target) => {
      cleanup();

      if (isSupported && window && _target) {
        observer = new ResizeObserver(callback);
        observer!.observe(_target, observerOptions);
      }
    },
    { immediate: true, flush: 'post' },
  );

  function stop() {
    cleanup();
    stopWatch();
  }

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop,
  };
}

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>;

