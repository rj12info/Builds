const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const internalIp = require('internal-ip');
const express = require('express');
const webpack = require('webpack');
var bodyParser = require('body-parser')
const path = require('path');
var _ = require('underscore');
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

app.get('/huntbuilds/home', (req, res) => {
  res.sendFile(path.join(__dirname, './src/www/index.html'));
});

app.get('/huntbuilds/fetchAll', (req, res) => {
  db.collection('loggedBuilds').find().sort({'timeStamp':-1}).toArray(function(err, documents) {
    res.send(documents)
  });
});


app.post('/huntbuilds/createrc', (req, res) => {
  loggedBuilds = db.collection('loggedBuilds').insertOne((req.body), function(err, doc) {
    res.send(doc);
  });
});

app.post('/huntbuilds/update', (req, res) => {
  db.collection('loggedBuilds').update({"title":req.body.title}, req.body, function(err,doc){
    res.send(doc);
  });
});

app.post('/huntbuilds/addtopfive', (req, res) => {
  db.collection('loggedBuilds').update({"title":req.body.clicked.title}, {$set:{"clickCount":req.body.clicked.clickCount}}, function(err,doc){
    console.log("err "+err+" res"+doc);
    res.send(doc);
  });
});

app.get('/huntbuilds/gettopfive', (req, res) => {
  db.collection('loggedBuilds').find().sort({'clickCount':-1}).limit(5).toArray(function(err, documents) {
    res.send(documents)
  });
});

app.post('/huntbuilds/delete', (req, res) => {
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
