import type { TaskFunction } from 'gulp';
import type { Module } from './src';

import path from 'path';
import { copyFile, mkdir } from 'fs/promises';

import { copy } from 'fs-extra';
import { parallel, series } from 'gulp';
import {
  buildOutput,
  projRoot,
  vinOutput,
  vinPackage,
} from '@vinicunca/build-utils';

import { buildConfig, run, runTask, withTaskName } from './src';

export function copyFiles() {
  return Promise.all([
    copyFile(vinPackage, path.join(vinOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(vinOutput, 'README.md'),
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(vinOutput, 'global.d.ts'),
    ),
  ]);
}

export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages');
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true }),
    );

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done);
};

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(vinOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
  ),

  parallel(copyTypesDefinitions, copyFiles),
) as any; // TODO: resolve any type

export * from './src';
