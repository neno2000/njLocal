var express = require('express');
var config = require('config');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

var adminkortRouter = require('./routes/adminkort');
var personkortRouter = require('./routes/personkort');
var hamtaOppnaFelRouter = require('./routes/hamtaOppnaFel');
var hamtaAdministratorer = require('./routes/hamtaAdministratorer');
var hamtaGuiden = require('./routes/hamtaguiden');
var hamtakalenderitp1 = require('./routes/hamtakalenderitp1JSON');
var hamtakalenderitp2 = require('./routes/hamtakalenderitp2JSON');
var hamtapuffar = require('./routes/hamtapuffarJSON');
var metadataRouter = require('./routes/metadataRouter');
var lUtility = require('./model/util');

var app = express();
//Read configuration files and pass to the the request object

var conf = function(req, res, next) {
  if (config.util.getEnv('NODE_ENV') === 'bcr') {
    req.tServer = config.get("conf").bcr;

  } else if (config.util.getEnv('NODE_ENV') == 'dcr') { 
    req.tServer = config.get("conf").dcr;
    }
    req.tServices = config.get("conf").resourcesLookup;
    req.lUtility = lUtility;
    next();
}
//serve static resources, react code will be here
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
//remove public as client folder is mount and the guid
//is based in react and react-route
//app.use(express.static(path.join(__dirname, 'public')));
app.use(conf);
app.use(cors());
app.use('/', indexRouter);
//Services ====>
app.use('/metadata/services', metadataRouter);
app.use('/foretag/adminkort', adminkortRouter);
app.use('/foretag/adminkort/personkort', personkortRouter);
app.use('/foretag/fil/hamtaOppnaFelJSON.json', hamtaOppnaFelRouter);
app.use('/foretag/adminkort/hamtaAdministratorerJSON.json', hamtaAdministratorer);
app.use('/foretag/hamtaguidenJSON.json', hamtaGuiden);
app.use('/foretag/hamtakalenderitp1JSON.json', hamtakalenderitp1);
app.use('/foretag/hamtakalenderitp2JSON.json', hamtakalenderitp2);
app.use('/foretag/hamtapuffarJSON.json', hamtapuffar);

module.exports = app;
