import type { CSSProperties } from 'vue';
import type { ScrollbarThumbProps } from './scrollbar-thumb';

export const GAP = 4; // top 2 + bottom 2 of bar instance

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
} as const;

export function renderThumbStyle({
  move, size, bar,
}: Pick<ScrollbarThumbProps, 'move' | 'size'> & {
  bar: typeof BAR_MAP[keyof typeof BAR_MAP];
}): CSSProperties {
  return {
    [bar.size]: size,
    transform: `translate${bar.axis}(${move}%)`,
  };
}

