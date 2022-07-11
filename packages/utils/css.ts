import type { CSSProperties } from 'vue';

import { isBrowser, toCamelCase } from '@vinicunca/js-utilities';

interface ParamsClasses {
  el: Element;
  cls: string;
}

export function classNameToArray(cls = '') {
  return cls.split(' ').filter((item) => !!item.trim());
}

export const hasClass = ({ el, cls }: ParamsClasses): boolean => {
  if (!el || !cls) {
    return false;
  }

  if (cls.includes(' ')) {
    throw new Error('className should not contain space.');
  }

  return el.classList.contains(cls);
};

export function addClass({ el, cls }: ParamsClasses) {
  if (!el || !cls.trim()) {
    return;
  }
  el.classList.add(...classNameToArray(cls));
}

export function removeClass({ el, cls }: ParamsClasses) {
  if (!el || !cls.trim()) {
    return;
  }

  el.classList.remove(...classNameToArray(cls));
}

export function getStyle(
  { el, styleName }: { el: HTMLElement; styleName: keyof CSSProperties },
): string {
  if (!isBrowser || !el || !styleName) {
    return '';
  }

  let key = toCamelCase(styleName);
  if (key === 'float') {
    key = 'cssFloat';
  }

  try {
    const style = (el.style as any)[key];
    if (style) {
      return style;
    }
    const computed: any = document.defaultView?.getComputedStyle(el, '');

    return computed ? computed[key] : '';
  } catch {
    return (el.style as any)[key];
  }
}
