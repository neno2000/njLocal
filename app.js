var express = require('express');
var config = require('config');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var adminkortRouter = require('./routes/adminkort');
var personkortRouter = require('./routes/personkort');
var hamtaOppnaFelRouter = require('./routes/hamtaOppnaFel');
var app = express();
//Read configuration files and pass to the the request object
var conf = function (req, res, next) {
  req.conf = config.get("conf");
    next();
}
//serve static resources
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(conf);
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/foretag/adminkort', adminkortRouter);
app.use('/foretag/adminkort/personkort', personkortRouter);
app.use('/foretag/fil/hamtaOppnaFelJSON.json', hamtaOppnaFelRouter);

module.exports = app;
