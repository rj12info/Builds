const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const internalIp = require('internal-ip');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const app = express();
const compiler = webpack(config);


MongoClient.connect('mongodb://root:root@ds135039.mlab.com:35039/heroku_j3f97vfg', (err, database) => {
  if (err) return console.log(err)
  console.log("DB Fetched size = "+database.collection('loggedBuilds').count());
});

const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  silent: false,
  stats: { color: true }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './src/www/index.html'));
});

const port = 3000;

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(' --------------------------------------');
  console.log(' --------------------------------------');
});
