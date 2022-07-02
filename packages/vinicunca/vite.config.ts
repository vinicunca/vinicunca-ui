import path from 'path';

import { defineConfig } from 'vite';
import Unocss from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { extendUnocssOptions } from '@vinicunca/unocss';

const resolve = (file: string) => path.resolve(__dirname, file);

export default defineConfig({
  root: resolve('dev'),

  server: {
    port: 3001,
  },

  resolve: {
    alias: [
      { find: /^~\/(.*)/, replacement: resolve('./src/$1') },
      { find: /^vinicunca$/, replacement: resolve('./src/index.ts') },
    ],
  },

  plugins: [
    vue(),
    vueJsx(),
    DefineOptions(),
    Unocss({
      ...extendUnocssOptions({}),
    }),
  ],

  optimizeDeps: {
    include: ['vue', '@vue/shared'],
  },
});
