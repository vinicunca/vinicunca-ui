import { isBrowser } from '@vinicunca/js-utilities';
import { CLASS_SCROLLBAR_WRAP } from '@vinicunca/tokens';

let scrollBarWidth: number;
export function getScrollBarWidth(): number {
  if (!isBrowser) {
    return 0;
  }

  if (scrollBarWidth !== undefined) {
    return scrollBarWidth;
  }

  const outer = document.createElement('div');
  outer.className = CLASS_SCROLLBAR_WRAP;
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
}
