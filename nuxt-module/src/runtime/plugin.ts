import Vinicunca from 'vinicunca';

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((plugin) => {
  plugin.vueApp.use(Vinicunca);
});
