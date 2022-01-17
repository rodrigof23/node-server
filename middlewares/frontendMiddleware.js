/* eslint-disable global-require */

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  const addProdMiddlewares = require('./addProdMiddlewares');
  addProdMiddlewares(app, options);

  return app;
};
