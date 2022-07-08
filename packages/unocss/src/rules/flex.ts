import type { Rule } from 'unocss';
import type { Theme } from '../theme';

import { handler } from '../utils';

export const flex: Rule<Theme>[] = [
  // display
  ['flex', { display: 'flex' }],
  ['inline-flex', { display: 'inline-flex' }],
  ['flex-inline', { display: 'inline-flex' }],

  // flex
  [
    /^flex-(.*)$/,
    ([_, d]) => ({ flex: handler.bracket(d) != null ? handler.bracket(d)!.split(' ').map((e) => handler.cssvar.fraction(e) ?? e).join(' ') : handler.cssvar.fraction(d) }),
  ],
  ['flex-1', { flex: '1 1 0%' }],
  ['flex-auto', { flex: '1 1 auto' }],
  ['flex-initial', { flex: '0 1 auto' }],
  ['flex-none', { flex: 'none' }],

  // shrink/grow/basis
  [/^(?:flex-)?shrink$/, () => ({ 'flex-shrink': 1 })],
  [/^(?:flex-)?shrink-0$/, () => ({ 'flex-shrink': 0 })],
  [/^(?:flex-)?grow$/, () => ({ 'flex-grow': 1 })],
  [/^(?:flex-)?grow-0$/, () => ({ 'flex-grow': 0 })],
  [/^(?:flex-)?basis-(.+)$/, ([_, d], { theme }) => ({ 'flex-basis': theme.spacing?.[d] ?? handler.bracket.cssvar.auto.fraction.rem(d) })],

  // directions
  ['flex-row', { 'flex-direction': 'row' }],
  ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
  ['flex-col', { 'flex-direction': 'column' }],
  ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],

  // wraps
  ['flex-wrap', { 'flex-wrap': 'wrap' }],
  ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
  ['flex-nowrap', { 'flex-wrap': 'nowrap' }],
];
