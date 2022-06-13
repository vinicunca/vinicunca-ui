import type { Module } from '../build-info';

import { PKG_PREFIX } from '@vinicunca/build-constants';

import { buildConfig } from '../build-info';

/** used for type generator */
export function pathRewriter(module: Module) {
  const config = buildConfig[module];

  return (id: string) => {
    id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path}/`);
    return id;
  };
}
