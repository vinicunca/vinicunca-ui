import type { Rule } from 'unocss';

import { colorResolver, handler } from '../utils';
import { RE_NUMBER_WITH_UNIT } from '../utils/handlers/regex';

/**
 * @example opacity-100
 */
export const opacity: Rule[] = [
  [/^op(?:acity)?-?(.+)$/, ([_, d]) => ({ opacity: handler.bracket.percent.cssvar(d) })],
];

/**
 * @example text-red-300
 */
export const textColors: Rule[] = [
  // auto detection and fallback to font-size if the content looks like a size
  [
    /^text-(.+)$/,
    colorResolver('color', 'text', (css) => !css.color?.toString().match(RE_NUMBER_WITH_UNIT)),
    { autocomplete: '(text)-$colors' },
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
