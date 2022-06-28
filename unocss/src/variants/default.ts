import type { Variant } from '@unocss/core';
import type { Theme } from '../theme';
import type { PresetVinicuncaOptions } from '../presets';

import { variantBreakpoints } from './breakpoints';
import { variantColorsMediaOrClass } from './dark';

export const variants = (options: PresetVinicuncaOptions): Variant<Theme>[] => [
  // variantVariables,
  // variantCssLayer,

  // variantSelector,
  // variantInternalLayer,
  // variantNegative,
  // variantImportant,
  // variantPrint,
  // variantCustomMedia,
  variantBreakpoints,
  // ...variantCombinators,

  // variantPseudoClassesAndElements,
  // variantPseudoClassFunctions,
  // ...variantTaggedPseudoClasses(options),

  // partClasses,
  ...variantColorsMediaOrClass(options),
  // ...variantLanguageDirections,
  // variantScope,
];
