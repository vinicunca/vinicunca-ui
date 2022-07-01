import type { Rule } from '@unocss/core';

import { colorResolver, handler } from '../utils';

export const placeholders: Rule[] = [
  // The prefix `$ ` is intentional. This rule is not to be matched directly from user-generated token.
  // See variants/placeholder.
  [
    /^\$ placeholder-(.+)$/, colorResolver('color', 'placeholder'), { autocomplete: 'placeholder-$colors' },
  ],
  [
    /^\$ placeholder-op(?:acity)?-?(.+)$/,
    ([_, opacity]) => ({ '--vin-placeholder-opacity': handler.bracket.percent(opacity) }),
    { autocomplete: ['placeholder-(op|opacity)', 'placeholder-(op|opacity)-<percent>'] },
  ],
];
