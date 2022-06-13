import type { ModuleFormat } from 'rollup';

import path from 'path';

import { PKG_NAME } from '@vinicunca/build-constants';
import { vinOutput } from '@vinicunca/build-utils';

export const modules = ['esm', 'cjs'] as const;
export type Module = typeof modules[number];

export interface BuildInfo {
  module: 'ESNext' | 'CommonJS';
  format: ModuleFormat;
  ext: 'mjs' | 'cjs' | 'js';
  output: {
    /** e.g: `es` */
    name: string;
    /** e.g: `dist/vinicunca/es` */
    path: string;
  };

  bundle: {
    /** e.g: `vinicunca/es` */
    path: string;
  };
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(vinOutput, 'es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(vinOutput, 'lib'),
    },
    bundle: {
      path: `${PKG_NAME}/lib`,
    },
  },
};

export const buildConfigEntries = Object.entries(
  buildConfig,
) as BuildConfigEntries;

export type BuildConfig = typeof buildConfig;
export type BuildConfigEntries = [Module, BuildInfo][];

export const target = 'es2018';
