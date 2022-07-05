import type { Rule } from '@unocss/core';
import type { Theme } from '../theme';

import { VAR_EMPTY } from './static';
import { colorResolver, colorableShadows, handler } from '../utils';

export const boxShadowsBase = {
  '--vin-ring-offset-shadow': '0 0 rgba(0,0,0,0)',
  '--vin-ring-shadow': '0 0 rgba(0,0,0,0)',
  '--vin-shadow-inset': VAR_EMPTY,
  '--vin-shadow': '0 0 rgba(0,0,0,0)',
};

export const boxShadows: Rule<Theme>[] = [
  [
    /^shadow(?:-(.+))?$/,
    ([_, d], { theme }) => {
      const v = theme.boxShadow?.[d || 'DEFAULT'];
      if (v) {
        return {
          '--vin-shadow': colorableShadows(v, '--vin-shadow-color').join(','),
          'box-shadow': 'var(--vin-ring-offset-shadow), var(--vin-ring-shadow), var(--vin-shadow)',
        };
      }
    },
    { autocomplete: 'shadow-$boxShadow' },
  ],

  // color
  [/^shadow-(.+)$/, colorResolver('--vin-shadow-color', 'shadow'), { autocomplete: 'shadow-$colors' }],
  [
    /^shadow-op(?:acity)?-?(.+)$/,
    ([_, opacity]) => ({ '--vin-shadow-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: 'shadow-(op|opacity)-<percent>' },
  ],

  // inset
  ['shadow-inset', { '--vin-shadow-inset': 'inset' }],
];

export const ringBase = {
  '--vin-ring-inset': VAR_EMPTY,
  '--vin-ring-offset-width': '0px',
  '--vin-ring-offset-color': '#fff',
  '--vin-ring-width': '0px',
  '--vin-ring-color': 'rgba(147,197,253,0.5)',
  '--vin-shadow': '0 0 rgba(0,0,0,0)',
};

export const rings: Rule<Theme>[] = [
  // size
  [
    /^ring(?:-(.+))?$/,
    ([_, d], { theme }) => {
      const value = theme.ringWidth?.[d || 'DEFAULT'] ?? handler.px(d || '1');
      if (value) {
        return {
          '--vin-ring-width': value,
          '--vin-ring-offset-shadow': 'var(--vin-ring-inset) 0 0 0 var(--vin-ring-offset-width) var(--vin-ring-offset-color)',
          '--vin-ring-shadow': 'var(--vin-ring-inset) 0 0 0 calc(var(--vin-ring-width) + var(--vin-ring-offset-width)) var(--vin-ring-color)',
          'box-shadow': 'var(--vin-ring-offset-shadow), var(--vin-ring-shadow), var(--vin-shadow)',
        };
      }
    },
    { autocomplete: 'ring-$ringWidth' },
  ],
  [
    /^ring-(?:width-|size-)(.+)$/,
    ([_, d], { theme }) => ({ '--vin-ring-width': theme.lineWidth?.[d] ?? handler.bracket.cssvar.px(d) }),
    { autocomplete: 'ring-(width|size)-$lineWidth' },
  ],

  // offset size
  ['ring-offset', { '--vin-ring-offset-width': '1px' }],
  [
    /^ring-offset-(?:width-|size-)?(.+)$/,
    ([_, d], { theme }) => ({ '--vin-ring-offset-width': theme.lineWidth?.[d] ?? handler.bracket.cssvar.px(d) }),
    { autocomplete: 'ring-offset-(width|size)-$lineWidth' },
  ],

  // colors
  [
    /^ring-(.+)$/,
    colorResolver('--vin-ring-color', 'ring'),
    { autocomplete: 'ring-$colors' },
  ],
  [
    /^ring-op(?:acity)?-?(.+)$/,
    ([_, opacity]) => ({ '--vin-ring-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: 'ring-(op|opacity)-<percent>' },
  ],

  // offset color
  [
    /^ring-offset-(.+)$/,
    colorResolver('--vin-ring-offset-color', 'ring-offset'),
    { autocomplete: 'ring-offset-$colors' },
  ],
  [
    /^ring-offset-op(?:acity)?-?(.+)$/,
    ([_, opacity]) => ({ '--vin-ring-offset-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: 'ring-offset-(op|opacity)-<percent>' },
  ],

  // style
  ['ring-inset', { '--vin-ring-inset': 'inset' }],
];
