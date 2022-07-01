import type { Rule } from '@unocss/core';
import type { Theme } from '../theme';

import { handler } from '../utils';

function rowCol(s: string) {
  return s.replace('col', 'column');
}

function rowColTheme(s: string) {
  return s[0] === 'r' ? 'Row' : 'Column';
}

function autoDirection(c: string, theme: Theme, prop: string) {
  const v = theme[`gridAuto${rowColTheme(c)}`]?.[prop];
  if (v != null) {
    return v;
  }

  switch (prop) {
    case 'min': return 'min-content';
    case 'max': return 'max-content';
    case 'fr': return 'minmax(0,1fr)';
  }

  return handler.bracket.cssvar.auto.rem(prop);
}

export const grids: Rule<Theme>[] = [
  // displays
  ['grid', { display: 'grid' }],
  ['inline-grid', { display: 'inline-grid' }],

  // global
  [
    /^(?:grid-)?(row|col)-(.+)$/,
    ([_, c, v], { theme }) => ({
      [`grid-${rowCol(c)}`]: theme[`grid${rowColTheme(c)}`]?.[v] ?? handler.bracket.cssvar.auto(v),
    }),
  ],

  // span
  [
    /^(?:grid-)?(row|col)-span-(.+)$/,
    ([_, c, s]) => {
      if (s === 'full') {
        return { [`grid-${rowCol(c)}`]: '1/-1' };
      }
      const v = handler.bracket.number(s);
      if (v != null) {
        return { [`grid-${rowCol(c)}`]: `span ${v}/span ${v}` };
      }
    },
    { autocomplete: ['grid-(row|col)-span-<num>', '(row|col)-span-<num>'] },
  ],

  // starts & ends
  [
    /^(?:grid-)?(row|col)-start-(.+)$/,
    ([_, c, v]) => ({ [`grid-${rowCol(c)}-start`]: handler.bracket.cssvar(v) ?? v }),
  ],
  [
    /^(?:grid-)?(row|col)-end-(.+)$/,
    ([_, c, v]) => ({ [`grid-${rowCol(c)}-end`]: handler.bracket.cssvar(v) ?? v }),
  ],

  // auto flows
  [
    /^(?:grid-)?auto-(rows|cols)-(.+)$/,
    ([_, c, v], { theme }) => ({ [`grid-auto-${rowCol(c)}`]: autoDirection(c, theme, v) }),
  ],

  // grid-auto-flow, auto-flow: uno
  // grid-flow: wind
  [
    /^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/,
    ([_, v]) => ({ 'grid-auto-flow': handler.bracket.cssvar(v) }),
  ],
  [
    /^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/,
    ([_, v]) => ({ 'grid-auto-flow': rowCol(v).replace('-', ' ') }),
  ],

  // templates
  [
    /^grid-(rows|cols)-(.+)$/,
    ([_, c, v], { theme }) => ({
      [`grid-template-${rowCol(c)}`]: theme[`gridTemplate${rowColTheme(c)}`]?.[v] ?? handler.bracket.cssvar(v),
    }),
  ],
  [
    /^grid-(rows|cols)-minmax-([\w.-]+)$/,
    ([_, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(auto-fill,minmax(${d},1fr))` }),
  ],
  [
    /^grid-(rows|cols)-(\d+)$/,
    ([_, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(${d},minmax(0,1fr))` }),
  ],

  // template none
  ['grid-rows-none', { 'grid-template-rows': 'none' }],
  ['grid-cols-none', { 'grid-template-columns': 'none' }],
];
