import type { UserConfig } from '@unocss/core';
import type { Theme } from './theme';

import presetIcons from '@unocss/preset-icons';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';

import { presetVinicunca } from './presets';

export function extendUnocssOptions(user: UserConfig = {}): UserConfig<Theme> {
  const include = [
    /\.vue$/, /vinicunca\/es\/components/,
  ];

  if (user.include) {
    if (Array.isArray(user.include)) {
      include.push(...user.include);
    } else {
      include.push((user.include as any));
    }
  }

  return {
    ...user,

    presets: [
      presetVinicunca(),
      presetIcons({
        prefix: '',
        scale: 1.2,
      }),
      // ...(user.presets || []),
    ],

    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],

    include,
  };
}

