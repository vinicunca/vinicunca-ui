import type { Rule } from 'unocss';

import { VAR_EMPTY } from '../rules';
import { makeGlobalStaticRules } from '../utils';

export const touchActionBase = {
  '--vin-pan-x': VAR_EMPTY,
  '--vin-pan-y': VAR_EMPTY,
  '--vin-pinch-zoom': VAR_EMPTY,
};
const touchActionProperty = 'var(--vin-pan-x) var(--vin-pan-y) var(--vin-pinch-zoom)';

export const touchActions: Rule[] = [
  [
    /^touch-pan-(x|left|right)$/,
    ([_, d]) => ({
      '--vin-pan-x': `pan-${d}`,
      'touch-action': touchActionProperty,
    }),
    { autocomplete: ['touch-pan', 'touch-pan-(x|left|right|y|up|down)'] },
  ],
  [
    /^touch-pan-(y|up|down)$/,
    ([_, d]) => ({
      '--vin-pan-y': `pan-${d}`,
      'touch-action': touchActionProperty,
    }),
  ],
  ['touch-pinch-zoom', {
    '--vin-pinch-zoom': 'pinch-zoom',
    'touch-action': touchActionProperty,
  }],

  ['touch-auto', { 'touch-action': 'auto' }],
  ['touch-manipulation', { 'touch-action': 'manipulation' }],
  ['touch-none', { 'touch-action': 'none' }],
  ...makeGlobalStaticRules('touch', 'touch-action'),
];
