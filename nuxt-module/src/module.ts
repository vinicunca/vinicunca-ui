import type { VinicuncaNuxtOptions } from './types';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { addPlugin, addPluginTemplate, defineNuxtModule, extendViteConfig, extendWebpackConfig } from '@nuxt/kit';
import { extendUnocssOptions } from '@vinicunca/unocss';
import WebpackPlugin from '@unocss/webpack';
import VitePlugin from '@unocss/vite';

const dir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtModule<VinicuncaNuxtOptions>({
  meta: {
    name: '@vinicunca/nuxt',
    configKey: 'vinicunca',
  },
  defaults: {
    unocss: {
      autoImport: true,
    },
    presetConfig: {},
  },
  setup(options) {
    if (options.unocss?.autoImport) {
      addPluginTemplate({
        filename: 'unocss.mjs',
        getContents: () => {
          const lines = [
            'import \'uno.css\'',
            'export default () => {};',
          ];

          return lines.join('\n');
        },
      });
    }

    options.unocss = extendUnocssOptions({
      config: options.unocss,
      presetConfig: options.presetConfig,
      webFontsConfig: options.presetWebFonts,
    });

    extendViteConfig((config) => {
      config.plugins = config.plugins || [];
      config.plugins.unshift(...VitePlugin({}, options.unocss));
    });

    extendWebpackConfig((config) => {
      config.plugins = config.plugins || [];
      config.plugins.unshift(WebpackPlugin({}, options.unocss));
    });

    addPlugin(resolve(dir, 'runtime', 'plugin'));
  },
});

declare module '@nuxt/schema' {
  interface NuxtConfig {
    vinicunca?: VinicuncaNuxtOptions;
  }
  interface NuxtOptions {
    vinicunca?: VinicuncaNuxtOptions;
  }
}
