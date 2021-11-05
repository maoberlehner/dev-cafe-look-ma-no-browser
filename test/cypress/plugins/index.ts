import { startDevServer } from '@cypress/vite-dev-server';
import path from 'path';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

const plugin: Cypress.PluginConfig = (on, config) => {
  // eslint-disable-next-line global-require
  require(`cypress-watch-and-reload/plugins`)(config);

  let bundler = createBundler({
    define: {
      global: `window`,
    },
  });
  on(`file:preprocessor`, bundler);

  on(`dev-server:start`, options => startDevServer({
    options,
    viteConfig: {
      configFile: path.resolve(__dirname, `..`, `..`, `vite.config.ts`),
    },
  }));

  return config;
};

export default plugin;
