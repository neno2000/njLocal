var express = require('express');
var config = require('config');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Application routing ind is not used!!
var indexRouter = require('./routes/index');
var adminkortRouter = require('./routes/adminkort');
var personkortRouter = require('./routes/personkort');
var hamtaOppnaFelRouter = require('./routes/hamtaOppnaFel');
var metadataRouter = require('./routes/metadataRouter');

//utility file where customs class and function are located
var lUtility = require('./model/util');
var laUtility = require('./model/abapUtil');

//instatiate express...
var app = express();
//Read configuration files and pass to the the request object
app.use(cookieParser()); // needed to call services from ABAP

var conf = function(req, res, next) {
  if (config.util.getEnv('NODE_ENV') == 'bcr') {
    req.tServer = config.get("conf").bcr;}
  else if (config.util.getEnv('NODE_ENV') == 'dcr') {
    req.tServer = config.get("conf").dcr;
  }
  else if (config.util.getEnv('NODE_ENV') == 'scr') {
    req.tServer = config.get("conf").scr;
  }
  // check if ABAP or Portal endpoint and assign function

   console.log(config.get("conf").resourcesLookup[req.url].host);
    if (config.get("conf").resourcesLookup[req.url].host == "abapHost"){
      req.lUtility = laUtility;
    }else if (config.get("conf").resourcesLookup[req.url].host == "portHost"){
      req.lUtility = lUtility;
    }

    req.tServices = config.get("conf").resourcesLookup;


    next();
}
//serve static resources, react code will be here
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//remove public as client folder is mount and the guid
//is based in react and react-route
//app.use(express.static(path.join(__dirname, 'public')));
app.use(conf);
app.use('/', indexRouter);
//Services ====>
app.use('/metadata/services', metadataRouter);
app.use('/foretag/adminkort', adminkortRouter);
app.use('/foretag/adminkort/personkort', personkortRouter);
app.use('/foretag/fil/hamtaOppnaFelJSON.json', hamtaOppnaFelRouter);

module.exports = app;
