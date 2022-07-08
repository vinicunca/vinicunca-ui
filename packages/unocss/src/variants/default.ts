import type { Variant } from 'unocss';
import type { Theme } from '../theme';
import type { PresetVinicuncaOptions } from '../presets';

import { variantBreakpoints } from './breakpoints';
import { variantColorsMediaOrClass } from './dark';
import { placeholderModifier } from './placeholder';
import { variantCssLayer, variantInternalLayer, variantScope, variantSelector, variantSpaceAndDivide, variantVariables } from './misc';
import { variantCombinators } from './combinators';
import { variantNegative } from './negative';
import { variantImportant } from './important';
import { variantContrasts, variantCustomMedia, variantMotions, variantOrientations, variantPrint } from './media';
import { partClasses, variantPseudoClassFunctions, variantPseudoClassesAndElements, variantTaggedPseudoClasses } from './pseudo';
import { variantLanguageDirections } from './directions';

export function variants(options: PresetVinicuncaOptions): Variant<Theme>[] {
  return [
    placeholderModifier,
    variantSpaceAndDivide,
    variantVariables,
    variantCssLayer,
    variantSelector,
    variantInternalLayer,
    variantNegative,
    variantImportant,
    variantPrint,
    variantCustomMedia,
    variantBreakpoints,
    ...variantCombinators,

    variantPseudoClassesAndElements,
    variantPseudoClassFunctions,
    ...variantTaggedPseudoClasses(options),

    partClasses,
    ...variantColorsMediaOrClass(options),
    ...variantLanguageDirections,
    variantScope,
    ...variantContrasts,
    ...variantOrientations,
    ...variantMotions,
    ...variantCombinators,
  ];
}
