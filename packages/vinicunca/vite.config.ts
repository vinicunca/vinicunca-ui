import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { loadEnv, defineConfig } from 'vite';

const resolve = (file: string) => path.resolve(__dirname, file);

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    server: {
      port: 3000,
    },

    resolve: {
      alias: [{ find: /^~\/(.*)/, replacement: resolve('./src/$1') }],
    },

    plugins: [
      vue(),
      vueJsx({ optimize: true, enableObjectSlots: true }),
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

    test: {
      global: true,
      environment: 'happy-dom',
    },
  };
});
