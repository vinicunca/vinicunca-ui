import ViteSSR from 'vite-ssr/vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import vinicunca from './vinicunca';
import { routes } from './router';

import 'uno.css';
import '../src/designs/styles/index.css';

export default ViteSSR(App, { routes }, ({ app }) => {
  const head = createHead();

  app.use(head);
  app.use(vinicunca);

  return { head };
});
