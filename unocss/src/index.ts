import type { UserConfig } from 'unocss';

import { presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss';

import { presetVinicunca } from './presets';

export function extendUnocssOptions(user: UserConfig = {}): UserConfig {
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
      ...(user.presets || []),
    ],

    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],

    include,
  };
}

