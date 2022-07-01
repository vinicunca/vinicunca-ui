import type { CSSEntries, Rule, RuleContext } from '@unocss/core';
import type { Theme } from '../theme';

import { borderStyles } from '../rules';
import { DIRECTION_MAP, colorResolver, handler } from '../utils';

export const divides: Rule[] = [
  // divides
  [
    /^divide-?([xy])$/,
    handlerDivide,
    { autocomplete: ['divide-(x|y|block|inline)', 'divide-(x|y|block|inline)-reverse', 'divide-(x|y|block|inline)-$lineWidth'] },
  ],
  [/^divide-?([xy])-?(-?.+)$/, handlerDivide],
  [/^divide-?([xy])-reverse$/, ([_, d]) => ({ [`--vin-divide-${d}-reverse`]: 1 })],
  [/^divide-(block|inline)$/, handlerDivide],
  [/^divide-(block|inline)-(-?.+)$/, handlerDivide],
  [/^divide-(block|inline)-reverse$/, ([_, d]) => ({ [`--vin-divide-${d}-reverse`]: 1 })],

  // color & opacity
  [/^divide-(.+)$/, colorResolver('border-color', 'divide'), { autocomplete: 'divide-$colors' }],
  [
    /^divide-op(?:acity)?-?(.+)$/,

    ([_, opacity]) => ({ '--vin-divide-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: ['divide-(op|opacity)', 'divide-(op|opacity)-<percent>'] },
  ],

  // styles
  ...borderStyles.map((style) => [`divide-${style}`, { 'border-style': style }] as Rule),
];

function handlerDivide([_, d, s]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  const v = theme.lineWidth?.[s || 'DEFAULT'] ?? handler.bracket.cssvar.px(s || '1');
  if (v != null) {
    const results = DIRECTION_MAP[d].map((item): [string, string] => {
      const key = `border${item}-width`;
      const value = item.endsWith('right') || item.endsWith('bottom')
        ? `calc(${v} * var(--vin-divide-${d}-reverse))`
        : `calc(${v} * calc(1 - var(--vin-divide-${d}-reverse)))`;
      return [key, value];
    });

    if (results) {
      return [
        [`--vin-divide-${d}-reverse`, 0],
        ...results,
      ];
    }
  }
}
