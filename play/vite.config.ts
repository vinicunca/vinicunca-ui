import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import glob from 'fast-glob';
import {
  getPackageDependencies,
  pkgRoot,
  projRoot,
  vinPackage,
  vinRoot,
} from '@vinicunca/build-utils';
import esbuild from 'rollup-plugin-esbuild';
import vue from '@vitejs/plugin-vue';
import Inspect from 'vite-plugin-inspect';
import mkcert from 'vite-plugin-mkcert';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/vite';
import Components from 'unplugin-vue-components/vite';

const esbuildPlugin = () => ({
  ...esbuild({
    target: 'chrome64',
    include: /\.vue$/,
    loaders: {
      '.vue': 'js',
    },
  }),
  enforce: 'post',
});

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let { dependencies } = getPackageDependencies(vinPackage);
  dependencies = dependencies.filter((dep) => !dep.startsWith('@types/')); // exclude dts deps
  const optimizeDeps = (
    await glob(['dayjs/(locale|plugin)/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
    })
  ).map((dep) => dep.replace(/\.js$/, ''));

  return {
    resolve: {
      alias: [
        {
          find: /^vinicunca(\/(es|lib))?$/,
          replacement: path.resolve(vinRoot, 'index.ts'),
        },
        {
          find: /^vinicunca\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`,
        },
      ],
    },
    server: {
      host: true,
      https: !!env.HTTPS,
    },
    plugins: [
      vue(),
      esbuildPlugin(),
      vueJsx(),
      DefineOptions(),
      Components({
        include: path.resolve(__dirname, '**'),
        // resolvers: ElementPlusResolver({ importStyle: 'sass' }),
        dts: false,
      }),
      mkcert(),
      Inspect(),
    ],

    optimizeDeps: {
      include: ['vue', '@vue/shared', ...dependencies, ...optimizeDeps],
    },
    esbuild: {
      target: 'chrome64',
    },
  };
});
