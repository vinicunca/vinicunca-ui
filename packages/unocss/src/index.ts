import type { UserConfig } from '@unocss/core';
import type { Theme } from './theme';
import type { WebFontsOptions } from '@vinicunca/preset-web-fonts';

import presetIcons from '@unocss/preset-icons';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';
import { presetWebFonts } from '@vinicunca/preset-web-fonts';

import { presetVinicunca } from './presets';

export function extendUnocssOptions({ config = {}, webFontsConfig }: { config?: UserConfig; webFontsConfig?: WebFontsOptions } = {}): UserConfig<Theme> {
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
    presetVinicunca(),
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

