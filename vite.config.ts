import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteSSR from 'vite-ssr/plugin.js';
import dts from 'vite-plugin-dts';
import { loadEnv, defineConfig } from 'vite';
import Unocss from 'unocss/vite';
import { presetUno, presetIcons } from 'unocss';

const resolve = (file) => path.resolve(__dirname, file);

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    root: resolve('dev'),

    server: {
      port: process.env.PORT,
      strictPort: !!process.env.PORT,
    } as any,

    resolve: {
      alias: [{ find: /^~\/(.*)/, replacement: resolve('./src/$1') }],
    },

    plugins: [
      vue(),
      vueJsx({ optimize: true, enableObjectSlots: true }),
      viteSSR(),
      dts({
        outputDir: 'dist/types',
        staticImport: true,
        insertTypesEntry: true,
        logDiagnostics: true,
      }),

      Unocss({
        presets: [presetUno(), presetIcons()],
      }),
    ],

    build: {
      lib: {
        name: 'Vinicunca',
        entry: path.resolve(__dirname, 'src/index.ts'),
      },

      rollupOptions: {
        external: ['vue'],

        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },

    test: {
      global: true,
      environment: 'happy-dom',
    },
  };
});
