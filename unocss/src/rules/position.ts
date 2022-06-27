import type { Rule } from '@unocss/core';

import { GLOBAL_KEYWORDS } from '../utils';

export const positions: Rule[] = [
  [
    /^(?:position-)?(relative|absolute|fixed|sticky)$/,
    ([_, v]) => ({ position: v }),
  ],
  [
    /^(?:position-)([-\w]+)$/,
    ([_, v]) => GLOBAL_KEYWORDS.includes(v) ? { position: v } : undefined,
  ],
  [
    /^(?:position-)?(static)$/,
    ([_, v]) => ({ position: v }),
  ],
];
