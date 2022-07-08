import type { Preset, UserConfig } from 'unocss';
import type { Theme } from './theme';
import type { PresetVinicuncaOptions, WebFontsOptions } from './presets';

import { presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss';

import { presetVinicunca, presetWebFonts } from './presets';

export function extendUnocssOptions(
  { config = {}, vinicunaConfig = {}, webFontsConfig }:
  { config?: UserConfig; vinicunaConfig?: PresetVinicuncaOptions; webFontsConfig?: WebFontsOptions } = {},
): UserConfig<Theme> {
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
    presetVinicunca(vinicunaConfig),
    presetIcons({
      scale: 1.2,
    }),
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

