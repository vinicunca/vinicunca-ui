import type { Rule } from '@unocss/core';
import type { Theme } from '../theme';

import { colorResolver, handler } from '../utils';

export const svgUtilities: Rule<Theme>[] = [
  // fills
  [/^fill-(.+)$/, colorResolver('fill', 'fill'), { autocomplete: 'fill-$colors' }],
  [
    /^fill-op(?:acity)?-?(.+)$/,
    ([_, opacity]) => ({ '--vin-fill-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: 'fill-(op|opacity)-<percent>' },
  ],
  ['fill-none', { fill: 'none' }],

  // stroke size
  [
    /^stroke-(?:width-|size-)?(.+)$/,
    ([_, s], { theme }) => ({ 'stroke-width': theme.lineWidth?.[s] ?? handler.bracket.cssvar.fraction.px.number(s) }),
    { autocomplete: ['stroke-width-$lineWidth', 'stroke-size-$lineWidth'] },
  ],

  // stroke dash
  [
    /^stroke-dash-(.+)$/,
    ([_, s]) => ({ 'stroke-dasharray': handler.bracket.cssvar.number(s) }),
    { autocomplete: 'stroke-dash-<num>' },
  ],
  [
    /^stroke-offset-(.+)$/,
    ([_, s], { theme }) => ({ 'stroke-dashoffset': theme.lineWidth?.[s] ?? handler.bracket.cssvar.px.numberWithUnit(s) }),
    { autocomplete: 'stroke-offset-$lineWidth' },
  ],

  // stroke colors
  [
    /^stroke-(.+)$/, colorResolver('stroke', 'stroke'), { autocomplete: 'stroke-$colors' },
  ],
  [
    /^stroke-op(?:acity)?-?(.+)$/,
    ([_, opacity]) => ({ '--vin-stroke-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: 'stroke-(op|opacity)-<percent>' },
  ],

  // line cap
  ['stroke-cap-square', { 'stroke-linecap': 'square' }],
  ['stroke-cap-round', { 'stroke-linecap': 'round' }],
  ['stroke-cap-auto', { 'stroke-linecap': 'butt' }],

  // line join
  ['stroke-join-arcs', { 'stroke-linejoin': 'arcs' }],
  ['stroke-join-bevel', { 'stroke-linejoin': 'bevel' }],
  ['stroke-join-clip', { 'stroke-linejoin': 'miter-clip' }],
  ['stroke-join-round', { 'stroke-linejoin': 'round' }],
  ['stroke-join-auto', { 'stroke-linejoin': 'miter' }],

  // none
  ['stroke-none', { stroke: 'none' }],
];
