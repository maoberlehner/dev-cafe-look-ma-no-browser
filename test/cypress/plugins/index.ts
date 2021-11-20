const plugin: Cypress.PluginConfig = (on, config) => {
  // eslint-disable-next-line global-require
  require(`cypress-watch-and-reload/plugins`)(config);

  return config;
};

export default plugin;
