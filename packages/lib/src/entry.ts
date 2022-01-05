import * as components from './components';
// import * as directives from './directives';
import { createVinicunca as _createVinicunca } from './main';
import type { VinicuncaOptions } from './main';

const directives = {};

export const createVinicunca = (options: VinicuncaOptions = {}) => {
  return _createVinicunca({ components, directives, ...options });
};

export { components, directives };

// export * from './composables';
