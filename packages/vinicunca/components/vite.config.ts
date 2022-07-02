// import path from 'path';

import { defineConfig } from 'vite';
import Unocss from 'unocss/vite';
// import { pkgRoot, vinRoot } from '@vinicunca/build-utils';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';
// import Components from 'unplugin-vue-components/vite';
// import { VinicuncaResolver } from '@vinicunca/unplugin-vue-components';
import { extendUnocssOptions } from '@vinicunca/unocss';

export default defineConfig({
  server: {
    port: 3001,
  },

  // resolve: {
  //   alias: [
  //     {
  //       find: /^vinicunca(\/(es|lib))?$/,
  //       replacement: path.resolve(vinRoot, 'index.ts'),
  //     },
  //     {
  //       find: /^vinicunca\/(es|lib)\/(.*)$/,
  //       replacement: `${pkgRoot}/$2`,
  //     },
  //   ],
  // },

  plugins: [
    vue(),
    vueJsx(),
    DefineOptions(),
    // Components({
    //   include: path.resolve(__dirname, '**'),
    //   resolvers: VinicuncaResolver(),
    //   dts: false,
    // }),
    Unocss({
      ...extendUnocssOptions(),
    }),
  ],

  optimizeDeps: {
    include: ['vue', '@vue/shared'],
  },
});
