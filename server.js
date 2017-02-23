const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const internalIp = require('internal-ip');
const express = require('express');
const webpack = require('webpack');
var bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const compiler = webpack(config);
const mongoUtil = require('./dbfacade')
var db;
var loggedBuilds;
mongoUtil.connectToServer( function( err ) {
  // start the rest of your app here
  db = mongoUtil.getDb();
} );



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

app.get('/fetchAll', (req, res) => {
  db.collection('loggedBuilds').find().toArray(function(err, documents) {
    res.send(documents)
  });

});

app.post('/createrc', (req, res) => {
  loggedBuilds = db.collection('loggedBuilds').insertOne((req.body), function(err, doc) {
    res.send(doc);
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
