import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    specPattern: '../**/*.spec.cy.{ts,tsx}',
    supportFile: './cypress/support/index.ts',
  },
});
