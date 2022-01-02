import { createDefaults, DefaultsSymbol } from './composables/defaults.composable';

// Types
import type { DefaultsOptions } from './composables/defaults.composable';
import type { App } from 'vue';

export interface VinicuncaOptions {
  defaults?: DefaultsOptions;
  components?: Dictionary<any>;
  directives?: Dictionary<any>;
}

export function createVinicunca(options: VinicuncaOptions = {}) {
  const install = (app: App) => {
    const { components = {}, directives = {} } = options;

    for (const key of Object.keys(directives)) {
      const directive = directives[key];

      app.directive(key, directive);
    }

    for (const key of Object.keys(components)) {
      const component = components[key];

      app.component(key, component);
    }

    app.provide(DefaultsSymbol, createDefaults(options.defaults));
  };

  return { install };
}
