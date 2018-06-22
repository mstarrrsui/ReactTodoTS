/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
//var bodyParser = require('body-parser');
var compress = require('compression');
//var cors = require('cors');
//var errorHandler = require('./routes/utils/errorHandler')();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7203;

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
//app.use(bodyParser.json());
app.use(compress());
app.use(logger('combined'));
//app.use(cors());
//app.use(errorHandler.init);

//routes = require('./routes/index')(app);

console.log('Cranking up express....');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

console.log('** MEMBER MANAGER - DIST VERSION **');
app.use(express.static('./dist/'));
app.use('/*', express.static('./dist/index.html'));

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});