import type { Rule } from 'unocss';

import { colorResolver, handler } from '../utils';

/**
 * @example opacity-100
 */
export const opacity: Rule[] = [
  [
    /^opacity-(.+)$/,
    ([_, d]) => ({ opacity: handler.bracket.percent.cssvar(d) }),
  ],
];

/**
 * @example text-red-300
 */
export const textColors: Rule[] = [
  [
    /^(?:text)-(.+)$/,
    colorResolver('color', 'text'),
    { autocomplete: 'text-$colors' },
  ],
  [
    /^(?:text)-opacity-(.+)$/,
    ([_, opacity]) => ({ '--vin-text-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: 'text-opacity-<percent>' },
  ],
];

export const bgColors: Rule[] = [
  [
    /^bg-(.+)$/,
    colorResolver('background-color', 'bg'),
    { autocomplete: 'bg-$colors' },
  ],
  [
    /^bg-opacity-(.+)$/,
    ([_, opacity]) => ({ '--vin-bg-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: 'bg-opacity-<percent>' },
  ],
];
