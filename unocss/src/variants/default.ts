import type { Variant } from '@unocss/core';
import type { Theme } from '../theme';
// import type { PresetVinicuncaOptions } from '../presets';

import { variantBreakpoints } from './breakpoints';

export const variants = (): Variant<Theme>[] => [
  variantBreakpoints,
];
