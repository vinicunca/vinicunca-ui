import path from 'path';
import { startDevServer } from '@cypress/vite-dev-server';
// import 'uno.css';

const plugin: Cypress.PluginConfig = (on, config) => {
  on('dev-server:start', async (options) => {
    return startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, '..', '..', 'vite.config.ts'),
      },
    });
  });

  return config;
};

export default plugin;
