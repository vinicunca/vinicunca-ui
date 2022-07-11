import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  test: {
    isolate: false,
    setupFiles: ['./vitest.setup.ts'],
  },
});
