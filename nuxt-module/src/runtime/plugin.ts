import { INJECTION_ID } from '@vinicunca/tokens';
import Vinicunca from 'vinicunca';

import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((plugin) => {
  plugin.vueApp.use(Vinicunca);

  plugin.vueApp.provide(INJECTION_ID, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  });
});
