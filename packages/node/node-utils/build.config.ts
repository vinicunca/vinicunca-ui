import { defineConfig } from '@vinicunca/build/config';

export default defineConfig({
  platform: 'node',
  tsup: {
    format: ['esm'],
  },
});
