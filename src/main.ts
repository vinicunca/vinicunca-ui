// Types
import type { App } from 'vue';

export interface VinicuncaOptions {
  components?: Dictionary<any>;
  directives?: Dictionary<any>;
}

export function createVinicunca(options: VinicuncaOptions = {}) {
  const install = (app: App) => {
    const { components = {}, directives = {} } = options;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in directives) {
      const directive = directives[key];

      app.directive(key, directive);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key in components) {
      const component = components[key];

      app.component(key, component);
    }
  };

  return { install };
}
