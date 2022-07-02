import type { Rule } from '@unocss/core';
import type { Theme } from '../theme';

import { handler } from '../utils';

export const borderSpacingBase = {
  '--vin-border-spacing-x': 0,
  '--vin-border-spacing-y': 0,
};
const borderSpacingProperty = 'var(--vin-border-spacing-x) var(--vin-border-spacing-y)';

export const tables: Rule<Theme>[] = [
  // displays
  ['inline-table', { display: 'inline-table' }],
  ['table', { display: 'table' }],
  ['table-caption', { display: 'table-caption' }],
  ['table-cell', { display: 'table-cell' }],
  ['table-column', { display: 'table-column' }],
  ['table-column-group', { display: 'table-column-group' }],
  ['table-footer-group', { display: 'table-footer-group' }],
  ['table-header-group', { display: 'table-header-group' }],
  ['table-row', { display: 'table-row' }],
  ['table-row-group', { display: 'table-row-group' }],

  // layouts
  ['border-collapse', { 'border-collapse': 'collapse' }],
  ['border-separate', { 'border-collapse': 'separate' }],

  [
    /^border-spacing-(.+)$/,
    ([_, s], { theme }) => {
      const v = theme.spacing?.[s] ?? handler.bracket.cssvar.global.auto.fraction.rem(s);
      if (v != null) {
        return {
          '--vin-border-spacing-x': v,
          '--vin-border-spacing-y': v,
          'border-spacing': borderSpacingProperty,
        };
      }
    },
    { autocomplete: ['border-spacing', 'border-spacing-$spacing'] },
  ],

  [/^border-spacing-([xy])-(.+)$/,
    ([_, d, s], { theme }) => {
      const v = theme.spacing?.[s] ?? handler.bracket.cssvar.global.auto.fraction.rem(s);
      if (v != null) {
        return {
          [`--vin-border-spacing-${d}`]: v,
          'border-spacing': borderSpacingProperty,
        };
      }
    },
    { autocomplete: ['border-spacing-(x|y)', 'border-spacing-(x|y)-$spacing'] }],

  ['caption-top', { 'caption-side': 'top' }],
  ['caption-bottom', { 'caption-side': 'bottom' }],
  ['table-auto', { 'table-layout': 'auto' }],
  ['table-fixed', { 'table-layout': 'fixed' }],
  ['table-empty-cells-visible', { 'empty-cells': 'show' }],
  ['table-empty-cells-hidden', { 'empty-cells': 'hide' }],
];
