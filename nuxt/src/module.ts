import type { VinicuncaNuxtOptions } from './types';

// TODO: uncomment when implementing components
// import { dirname, resolve } from 'path';
// import { fileURLToPath } from 'url';

import { addPluginTemplate, defineNuxtModule, extendViteConfig, extendWebpackConfig } from '@nuxt/kit';
import { extendUnocssOptions } from '@vinicunca/unocss';
import WebpackPlugin from '@unocss/webpack';
import VitePlugin from '@unocss/vite';

// TODO: uncomment when implementing components
// const dir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtModule<VinicuncaNuxtOptions>({
  meta: {
    name: '@vinicunca/nuxt',
    configKey: 'vinicunca',
  },
  defaults: {
    unocss: {
      autoImport: true,
    },
  },
  setup(options) {
    if (options.unocss.autoImport) {
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

    options.unocss = extendUnocssOptions(options.unocss);

    extendViteConfig((config) => {
      config.plugins = config.plugins || [];
      config.plugins.unshift(...VitePlugin({}, options.unocss));
    });

    extendWebpackConfig((config) => {
      config.plugins = config.plugins || [];
      config.plugins.unshift(WebpackPlugin({}, options.unocss));
    });

    // TODO: uncomment when implementing components
    // addPlugin(resolve(dir, 'runtime', 'plugin'));
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
