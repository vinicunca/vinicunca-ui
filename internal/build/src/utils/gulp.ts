import type { TaskFunction } from 'gulp';

import { buildRoot } from '@vinicunca/build-utils';

import { run } from './process';

export function withTaskName<T extends TaskFunction>(
  name: string,
  fn: T,
) {
  return Object.assign(fn, { displayName: name });
}

export function runTask(name: string): any {
  return withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot),
  );
}
