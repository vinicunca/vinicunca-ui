import path from 'path';

import {
  vinRoot,
} from '@vinicunca/build-utils';
import { defineConfig } from 'vite';
import Unocss from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { extendUnocssOptions } from '@vinicunca/unocss';

const resolve = (file: string) => path.resolve(__dirname, file);

export default defineConfig({
  server: {
    port: 3001,
  },

  resolve: {
    alias: [
      {
        find: /^vinicunca$/,
        replacement: path.resolve(vinRoot, 'index.ts'),
      },
    ],
  },

  plugins: [
    vue(),
    vueJsx(),
    DefineOptions(),
    Unocss({
      ...extendUnocssOptions({
        vinicunaConfig: {
          brands: {
            primary: '#1976d2',
            secondary: '#9c27b0',
            success: '#2e7d32',
            info: '#0288d1',
            warning: '#ed6c02',
            danger: '#d32f2f',
          },
        },
      }),
    }),
  ],

  optimizeDeps: {
    include: ['vue', '@vue/shared'],
  },
});
