var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');

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

app.use('/api/readers', readers);
app.use('/api/books', books);
app.use('/api/errors', errors);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

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
