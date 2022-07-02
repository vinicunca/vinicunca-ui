import type { CSSEntries, Rule, RuleContext } from '@unocss/core';
import type { Theme } from '../theme';

import { DIRECTION_MAP, directionSize, handler } from '../utils';

export const paddings: Rule[] = [
  [/^pa?()-?(-?.+)$/, directionSize('padding'), { autocomplete: ['(m|p)<num>', '(m|p)-<num>'] }],
  [/^p-?xy()()$/, directionSize('padding'), { autocomplete: '(m|p)-(xy)' }],
  [/^p-?([xy])(?:-?(-?.+))?$/, directionSize('padding')],
  [/^p-?([rltbse])(?:-?(-?.+))?$/, directionSize('padding'), { autocomplete: '(m|p)<directions>-<num>' }],
  [/^p-(block|inline)(?:-(-?.+))?$/, directionSize('padding'), { autocomplete: '(m|p)-(block|inline)-<num>' }],
  [/^p-?([bi][se])(?:-?(-?.+))?$/, directionSize('padding'), { autocomplete: '(m|p)-(bs|be|is|ie)-<num>' }],
];

export const margins: Rule[] = [
  [/^ma?()-?(-?.+)$/, directionSize('margin')],
  [/^m-?xy()()$/, directionSize('margin')],
  [/^m-?([xy])(?:-?(-?.+))?$/, directionSize('margin')],
  [/^m-?([rltbse])(?:-?(-?.+))?$/, directionSize('margin')],
  [/^m-(block|inline)(?:-(-?.+))?$/, directionSize('margin')],
  [/^m-?([bi][se])(?:-?(-?.+))?$/, directionSize('margin')],
];

export const spaces: Rule[] = [
  [/^space-?([xy])-?(-?.+)$/, handlerSpace, { autocomplete: ['space-(x|y|block|inline)', 'space-(x|y|block|inline)-reverse', 'space-(x|y|block|inline)-$spacing'] }],
  [/^space-?([xy])-reverse$/, ([_, d]) => ({ [`--vin-space-${d}-reverse`]: 1 })],
  [/^space-(block|inline)-(-?.+)$/, handlerSpace],
  [/^space-(block|inline)-reverse$/, ([_, d]) => ({ [`--vin-space-${d}-reverse`]: 1 })],
];

function handlerSpace([_, d, s]: string[], { theme }: RuleContext<Theme>): CSSEntries | undefined {
  const v = theme.spacing?.[s || 'DEFAULT'] ?? handler.bracket.cssvar.auto.fraction.rem(s || '1');
  if (v != null) {
    const results = DIRECTION_MAP[d].map((item): [string, string] => {
      const key = `margin${item}`;
      const value = item.endsWith('right') || item.endsWith('bottom')
        ? `calc(${v} * var(--vin-space-${d}-reverse))`
        : `calc(${v} * calc(1 - var(--vin-space-${d}-reverse)))`;
      return [key, value];
    });

    if (results) {
      return [
        [`--vin-space-${d}-reverse`, 0],
        ...results,
      ];
    }
  }
}
