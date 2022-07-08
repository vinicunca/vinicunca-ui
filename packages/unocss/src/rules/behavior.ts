import type { Rule } from 'unocss';
import type { Theme } from '../theme';

import { GLOBAL_KEYWORDS, colorResolver, handler } from '../utils';

export const outline: Rule<Theme>[] = [
  // size
  [
    /^outline-(?:width-|size-)?(.+)$/,
    ([_, d], { theme }) => ({ 'outline-width': theme.lineWidth?.[d] ?? handler.bracket.cssvar.global.px(d) }),
    { autocomplete: 'outline-(width|size)-<num>' },
  ],

  // color
  [
    /^outline-(?:color-)?(.+)$/,
    colorResolver('outline-color', 'outline-color'),
    { autocomplete: 'outline-$colors' },
  ],

  // offset
  [
    /^outline-offset-(.+)$/,
    ([_, d], { theme }) => ({ 'outline-offset': theme.lineWidth?.[d] ?? handler.bracket.cssvar.global.px(d) }),
    { autocomplete: 'outline-(offset)-<num>' },
  ],

  // style
  ['outline', { 'outline-style': 'solid' }],
  ...['auto', 'dashed', 'dotted', 'double', 'hidden', 'solid', 'groove', 'ridge', 'inset', 'outset', ...GLOBAL_KEYWORDS].map((v) => [`outline-${v}`, { 'outline-style': v }] as Rule<Theme>),
  ['outline-none', { 'outline': '2px solid transparent', 'outline-offset': '2px' }],
];

export const appearance: Rule[] = [
  ['appearance-none', {
    'appearance': 'none',
    '-webkit-appearance': 'none',
  }],
];

function willChangeProperty(prop: string): string | undefined {
  return handler.properties.auto.global(prop) ?? {
    contents: 'contents',
    scroll: 'scroll-position',
  }[prop];
}

export const willChange: Rule[] = [
  [/^will-change-(.+)/, ([_, p]) => ({ 'will-change': willChangeProperty(p) })],
];
