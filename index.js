const path = require('path');

const envConf = {
  path: path.join(__dirname, './', '/.env'),
  example: path.join(__dirname, './', '/.env-example')
};
require('dotenv-safe').config(envConf);

const express = require('express');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util/port');
const setup = require('./middlewares/frontendMiddleware');

const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

const options = {
  target: process.env.BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {'^/api' : ''}
}
app.use('/api', createProxyMiddleware(options));

setup(app, {
  outputPath: path.resolve(process.cwd(), process.env.BUILD_PATH),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = 'localhost';

app.listen(port, host, (err) => (err ? logger.error(err.message) : logger.appStarted(port, prettyHost)));
