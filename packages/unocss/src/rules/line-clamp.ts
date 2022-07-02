import type { Rule } from '@unocss/core';

import { GLOBAL_KEYWORDS } from '../utils';

export const lineClamps: Rule[] = [
  [
    /^line-clamp-(\d+)$/,
    ([_, v]) => ({
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': v,
      'line-clamp': v,
    }),
    { autocomplete: ['line-clamp', 'line-clamp-<num>'] },
  ],

  ...['none', ...GLOBAL_KEYWORDS].map((keyword) => [`line-clamp-${keyword}`, {
    '-webkit-line-clamp': keyword,
    'line-clamp': keyword,
  }] as Rule),
];
