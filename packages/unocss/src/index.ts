import type { UserConfig } from 'unocss';

import { presetAttributify, presetIcons, presetMini, transformerDirectives, transformerVariantGroup } from 'unocss';

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
      presetMini({
        variablePrefix: 'v-',
      }),
      presetAttributify(),
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
