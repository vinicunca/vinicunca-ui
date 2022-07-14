import type { Postprocessor, Preset, PresetOptions } from 'unocss';
import type { Theme, ThemeAnimation } from '../../theme';

import { preflights } from '../../preflights';
import { rules } from '../../rules';
import { theme } from '../../theme';
import { variants } from '../../variants';

export type { ThemeAnimation, Theme };

export interface PresetVinicuncaOptions extends PresetOptions {
  /**
   * @default 'class'
   */
  dark?: 'class' | 'media';
  /**
   * @default false
   */
  attributifyPseudo?: Boolean;
  /**
   * @default 'vin-'
   */
  variablePrefix?: string;
}

export function presetVinicunca(options: PresetVinicuncaOptions = {}): Preset<Theme> {
  options.dark = options.dark ?? 'class';
  options.attributifyPseudo = options.attributifyPseudo ?? false;

  return {
    name: '@vinicunca/unocss-preset',
    theme,
    rules,
    variants: variants(options),
    options,
    postprocess: options.variablePrefix && options.variablePrefix !== 'un-'
      ? VarPrefixPostprocessor(options.variablePrefix)
      : undefined,
    preflights: preflights(options),
    safelist: [
      // Used by useLockScreen
      'overflow-hidden',
    ],
  };
}

function VarPrefixPostprocessor(prefix: string): Postprocessor {
  return (obj) => {
    obj.entries.forEach((i) => {
      i[0] = i[0].replace(/^--vin-/, `--${prefix}`);
      if (typeof i[1] === 'string') {
        i[1] = i[1].replace(/var\(--vin-/g, `var(--${prefix}`);
      }
    });
  };
}
