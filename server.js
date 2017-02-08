const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const internalIp = require('internal-ip');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const app = express();
const compiler = webpack(config);
const mongoUtil = require('./dbfacade')
var db = mongoUtil.getDb();

const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  silent: false,
  stats: { color: true }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, './src/www/index.html'));
});

app.get('/test', (req, res) => {
    loggedBuilds = db.collection('loggedBuilds').findOne({}, function(err, doc) {
     res.send(doc)
   });

});

app.post('/create', (req, res) => {
  loggedBuilds = db.collection('loggedBuilds').findOne({}, function(err, doc) {
    res.send(doc)
  });

});

app.post('/update', (req, res) => {
  loggedBuilds = db.collection('loggedBuilds').findOne({}, function(err, doc) {
    res.send(doc)
  });

});

app.post('/delete', (req, res) => {
  loggedBuilds = db.collection('loggedBuilds').findOne({}, function(err, doc) {
    res.send(doc)
  });

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
