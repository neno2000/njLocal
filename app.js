var express = require('express');
var config = require('config');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

//Application routing ind is not used!!
var indexRouter = require('./routes/index');
var abapRouter = require('./routes/abapRouter');
var javaRouter = require('./routes/javaRouter');
var metadataRouter = require('./routes/metadataRouter');
var winston = require('./config/winston');

//utility file where customs class and function are located
var lUtility = require('./model/util');
var laUtility = require('./model/abapUtil');

//instatiate express...
var app = express();
//Read configuration files and pass to the the request object
app.use(cookieParser()); // needed to call services from ABAP


  var conf = function(req, res, next) {
  req.tServer = config.get("conf").endpoint;   // get the endpoints
  // check if ABAP or Portal endpoint and assign function
  console.log("jojo");
  console.log(req._parsedUrl.pathname);
  var serv = {};
  if ( req._parsedUrl.pathname.search("jsonrfcadapter") > -1){
    //remove the last portion of the toString
    var tmpService = req._parsedUrl.pathname.substring(0,req._parsedUrl.pathname.lastIndexOf("/"));
    //check again if the service contain the jsonrfcstring
    if  ( tmpService.search("jsonrfcadapter") > -1) {
      serv.fm = req._parsedUrl.pathname.substring(req._parsedUrl.pathname.lastIndexOf("/")+1);
      serv.service = tmpService;
    }
    else{
      serv.service = req._parsedUrl.pathname;
      serv.fm = "";
    }
  }
  else {
    serv.service = req._parsedUrl.pathname;
    serv.fm = "";
  }

  try {
    console.log(req._parsedUrl.pathname);
    if (config.get("conf").resourcesLookup[serv.service].host === "abapHost") {
      req.lUtility = laUtility;
      console.log("in abap?");

    } else if (config.get("conf").resourcesLookup[serv.service].host === "portHost") {
      req.lUtility = lUtility;
      console.log("in java?");

    } else {
      // metadata service call
      console.log("in else?");
    }
    req.tServices = config.get("conf").resourcesLookup;

  } catch (e) {
    req.tServices = config.get("conf").resourcesLookup;
    console.log("in exception?");

  } finally {

  }
  next();

}
//serve static resources, react code will be here
app.use(express.static(path.join(__dirname, 'client/build')));
//app.use(logger('dev'));
//app.use(morgan('combined'));
app.use(morgan('combined', {
  stream: winston.stream
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//remove public as client folder is mount and the guid
//is based in react and react-route
//app.use(express.static(path.join(__dirname, 'public')));
app.use(conf);
app.use(cors());

app.use('/', indexRouter);   // index router. should start the React UI on 5000

//Metadata Services, read the config file
app.use('/metadata/services', metadataRouter);

console.log(config.get("conf").resourcesLookup);
var services = config.get("conf").resourcesLookup;
for (var key in services) {
    if (services.hasOwnProperty(key)) {
        if (key.search("jsonrfcadapter") > -1)   //json adapter
          {
            console.log("adapter");
            console.log(services[key]);
            var tService = key + "*";
            app.use(tService, abapRouter);
          }
        else if (services[key].host === "abapHost") //abap routing
          {
            console.log("abap");
            console.log(services[key]);
            app.use(key, abapRouter);
         }
        else if (services[key].host === "portHost") //java routing
          {
            console.log("java");
            console.log(services[key]);
            app.use(key, javaRouter);
          }
        else
          {
          console.log("Routing not found");  //feedback to be implemented
          }
        }

    }


module.exports = app;
