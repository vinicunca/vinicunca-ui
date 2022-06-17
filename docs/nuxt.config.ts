// TODO: uncomment when implementing components
// import path from 'path';

// import { projRoot } from '@vinicunca/build-utils';
// import DefineOptions from 'unplugin-vue-define-options/vite';
import { defineNuxtConfig } from 'nuxt';
import VinicuncaModule from '@vinicunca/nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    VinicuncaModule,
  ],

  // TODO: uncomment when implementing components
  // vite: {
  //   resolve: {
  //     alias: [
  //       {
  //         find: /^vinicunca(\/(es|lib))?$/,
  //         replacement: path.resolve(projRoot, 'packages/vinicunca/index.ts'),
  //       },
  //       {
  //         find: /^vinicunca\/(es|lib)\/(.*)$/,
  //         replacement: `${path.resolve(projRoot, 'packages')}/$2`,
  //       },
  //     ],
  //   },

  //   plugins: [
  //     DefineOptions(),
  //   ],
  // },
});
