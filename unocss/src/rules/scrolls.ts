import type { Rule } from '@unocss/core';

import { directionSize } from '../utils';

export const scrollSnapTypeBase = {
  '--vin-scroll-snap-strictness': 'proximity',
};

export const scrolls: Rule[] = [
  // snap type
  [
    /^snap-(x|y)$/,
    ([_, d]) => ({
      'scroll-snap-type': `${d} var(--vin-scroll-snap-strictness)`,
    }),
    { autocomplete: 'snap-(x|y|both)' },
  ],
  [
    /^snap-both$/,
    () => ({
      'scroll-snap-type': 'both var(--vin-scroll-snap-strictness)',
    }),
  ],
  ['snap-mandatory', { '--vin-scroll-snap-strictness': 'mandatory' }],
  ['snap-proximity', { '--vin-scroll-snap-strictness': 'proximity' }],
  ['snap-none', { 'scroll-snap-type': 'none' }],

  // snap align
  ['snap-start', { 'scroll-snap-align': 'start' }],
  ['snap-end', { 'scroll-snap-align': 'end' }],
  ['snap-center', { 'scroll-snap-align': 'center' }],
  ['snap-align-none', { 'scroll-snap-align': 'none' }],

  // snap stop
  ['snap-normal', { 'scroll-snap-stop': 'normal' }],
  ['snap-always', { 'scroll-snap-stop': 'always' }],

  // scroll margin
  [
    /^scroll-ma?()-?(-?.+)$/,
    directionSize('scroll-margin'),
    {
      autocomplete: [
        'scroll-(m|p|ma|pa|block|inline)',
        'scroll-(m|p|ma|pa|block|inline)-$spacing',
        'scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)',
        'scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)-$spacing',
      ],
    },
  ],
  [/^scroll-m-?([xy])-?(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-?([rltb])-?(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-(block|inline)-(-?.+)$/, directionSize('scroll-margin')],
  [/^scroll-m-?([bi][se])-?(-?.+)$/, directionSize('scroll-margin')],

  // scroll padding
  [/^scroll-pa?()-?(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-?([xy])-?(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-?([rltb])-?(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-(block|inline)-(-?.+)$/, directionSize('scroll-padding')],
  [/^scroll-p-?([bi][se])-?(-?.+)$/, directionSize('scroll-padding')],
];
