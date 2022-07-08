import type { Variant } from 'unocss';
import type { PresetVinicuncaOptions } from '../presets';

import { variantMatcher, variantParentMatcher } from '../utils';

export function variantColorsMediaOrClass(options: PresetVinicuncaOptions = {}): Variant[] {
  if (options?.dark === 'class') {
    return [
      variantMatcher('dark', (input) => ({ prefix: `.dark $$ ${input.prefix}` })),
      variantMatcher('light', (input) => ({ prefix: `.light $$ ${input.prefix}` })),
    ];
  }

  return [
    variantParentMatcher('dark', '@media (prefers-color-scheme: dark)'),
    variantParentMatcher('light', '@media (prefers-color-scheme: light)'),
  ];
}
