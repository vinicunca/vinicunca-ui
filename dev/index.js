import ViteSSR from 'vite-ssr/vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import vinicunca from './vinicunca';
import { routes } from './router';

export default ViteSSR(App, { routes }, ({ app }) => {
  const head = createHead();

  app.use(head);
  app.use(vinicunca);

  return { head };
});
