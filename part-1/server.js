var express = require('express');
var path = require('path');
var logger = require('morgan');w
var bodyParser = require('body-parser');

var index = require('./routes/index');

var server = express();
// view engine setup


server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

server.use('/', index);

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;