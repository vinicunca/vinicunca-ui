import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [
    vue(),
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

export default config;
