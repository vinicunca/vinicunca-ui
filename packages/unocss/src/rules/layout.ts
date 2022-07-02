import type { Rule } from '@unocss/core';

import { GLOBAL_KEYWORDS } from '../utils';

const overflowValues = [
  'auto',
  'hidden',
  'clip',
  'visible',
  'scroll',
  ...GLOBAL_KEYWORDS,
];

export const overflows: Rule[] = [
  [
    /^(?:overflow|of)-(.+)$/,
    ([_, v]) => overflowValues.includes(v) ? { overflow: v } : undefined,
    { autocomplete: [`(overflow|of)-(${overflowValues.join('|')})`, `(overflow|of)-(x|y)-(${overflowValues.join('|')})`] },
  ],
  [
    /^(?:overflow|of)-([xy])-(.+)$/,
    ([_, d, v]) => overflowValues.includes(v) ? { [`overflow-${d}`]: v } : undefined,
  ],
];
