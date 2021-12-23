import path from 'path';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteSSR from 'vite-ssr/plugin.js';
import dts from 'vite-plugin-dts';
import { loadEnv, defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (file) => path.resolve(__dirname, file);

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    root: resolve('dev'),
    server: {
      port: process.env.PORT,
      strictPort: !!process.env.PORT,
    },
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
  };
});
