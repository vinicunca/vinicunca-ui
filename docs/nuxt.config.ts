import path from 'path';

import { projRoot } from '@vinicunca/build-utils';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],

  vite: {
    resolve: {
      alias: [
        {
          find: /^vinicunca(\/(es|lib))?$/,
          replacement: path.resolve(projRoot, 'packages/vinicunca/index.ts'),
        },
        {
          find: /^vinicunca\/(es|lib)\/(.*)$/,
          replacement: `${path.resolve(projRoot, 'packages')}/$2`,
        },
      ],
    },

    plugins: [
      DefineOptions(),
    ],
  },

  unocss: {
    uno: true,
    // icons: true,

    include: [/.*\/vinicunca(.es)?\.js(.*)?$/, './**/*.vue', './**/*.md'],
  },
});
