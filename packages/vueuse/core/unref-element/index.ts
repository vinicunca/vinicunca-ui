import type { ComponentPublicInstance } from 'vue';
import type { MaybeRef } from '@vinicunca/vueuse/shared';

import { unref } from 'vue';

export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;
export type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null;

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends ComponentPublicInstance ? Exclude<MaybeElement, ComponentPublicInstance> : T | undefined;

/**
 * Get the dom element of a ref of element or Vue component instance
 *
 * @param refEl
 */
export function unrefElement<T extends MaybeElement>(refEl: MaybeElementRef<T>): UnRefElementReturn<T> {
  const plain = unref(refEl);
  return (plain as ComponentPublicInstance)?.$el ?? plain;
}
