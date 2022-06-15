import type { UserConfig } from 'unocss';

import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

export function extendUnocssOptions(user: UserConfig = {}): UserConfig {
  return {
    ...user,

    presets: [
      presetUno(),
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
  };
}
