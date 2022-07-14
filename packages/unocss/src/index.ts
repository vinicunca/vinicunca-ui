import type { Preset, UserConfig } from 'unocss';
import type { Theme } from './theme';
import type { PresetVinicuncaOptions, WebFontsOptions } from './presets';

import { presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss';

import { presetVinicunca, presetWebFonts } from './presets';

export { PresetVinicuncaOptions, WebFontsOptions };

export type VinicuncaUnoConfig = UserConfig<Theme>;

export function extendUnocssOptions(
  { config = {}, presetConfig = {}, webFontsConfig }:
  { config?: VinicuncaUnoConfig; presetConfig?: PresetVinicuncaOptions; webFontsConfig?: WebFontsOptions } = {},
): VinicuncaUnoConfig {
  const include = [
    /\.vue$/,
    /vinicunca\/es\/components/,
    /\.ts$/,
    /\.tsx$/,
  ];

  if (config.include) {
    if (Array.isArray(config.include)) {
      include.push(...config.include);
    } else {
      include.push((config.include as any));
    }
  }

  const presets: Preset[] = [
    presetVinicunca(presetConfig),
    presetIcons(),
  ];

  if (webFontsConfig) {
    presets.push(presetWebFonts(webFontsConfig));
  }

  return {
    ...config,

    presets,

    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],

    include,
  };
}

