var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const webpack = require('webpack');
var https = require('https');
var fs = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfigFactory = require('../webpack.config');

var port = process.env.PORT || 7203;
var sslport = process.env.SSLPORT || 8444;

//var routes = require('./server/routes/index');
var readers = require('./routes/readers');
var books = require('./routes/books');
var errors = require('./routes/errors');

var app = express();

app.use(favicon(path.join(__dirname, '../favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../app')));

const webpackConfig = webpackConfigFactory({ mode: 'development' });
const compiler = webpack(webpackConfig);

app.webpackDevMiddleware = webpackDevMiddleware(compiler, {
  quiet: false,
  publicPath: webpackConfig.output.publicPath,
  noInfo: false,
  historyApiFallback: true,
  hot: true,
  stats: {
    // Config for minimal console.log mess.
    assets: true,
    colors: true,
    version: true,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  }
});
app.webpackHotMiddleware = webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
});

app.use(app.webpackDevMiddleware);
app.use(app.webpackHotMiddleware);

// app.use('/', routes);
app.use('/api/readers', readers);
app.use('/api/books', books);
app.use('/api/errors', errors);

// Since webpackDevMiddleware uses memory-fs internally to store build artifacts, we use it instead
const memfs = webpackDevMiddleware.fileSystem;
app.get('*', (req, res) => {
  memfs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../app/index.html'));
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var debug = require('debug')('server');

app.set('port', process.env.PORT || port);

var sslOptions = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
  passphrase: 'summer'
};

//serve ssl
https.createServer(sslOptions, app).listen(sslport);

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log(' HTTPS port ' + sslport);
  console.log(
    'env = ' + app.get('env') + '\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd()
  );
});

module.exports = app;
