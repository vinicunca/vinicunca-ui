import VButton from './components/button/VButton.vue';

import type { Plugin } from 'vue';

const components = {
  VButton,
};

export const Vinicunca: Plugin = {
  install(app) {
    Object.entries(components).forEach(([key, value]: [string, any]) => {
      app.component(key, value);
    });
  },
};

export { VButton };
