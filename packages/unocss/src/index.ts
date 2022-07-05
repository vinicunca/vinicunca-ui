import type { UserConfig } from '@unocss/core';
import type { Theme } from './theme';
import type { WebFontsOptions } from '@vinicunca/preset-web-fonts';
import type { PresetVinicuncaOptions } from './presets';

import presetIcons from '@unocss/preset-icons';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';
import { presetWebFonts } from '@vinicunca/preset-web-fonts';

import { presetVinicunca } from './presets';

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

  const presets = [
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

