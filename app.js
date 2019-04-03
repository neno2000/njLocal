var express = require('express');
var config = require('config');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var Proxy = require('http-proxy-middleware');
//var multer = require('multer');
//var upload = multer({ dest: "./uploads" });
//var bodyParser = require('body-parser');

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
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.raw());

var conf = function (req, res, next) {
    console.log("======NODE CONF ENTRY======");
    //console.log(req.readableBuffer.length);
    //console.log(req.body);
    //console.log(req);
    req.tServer = config.get("conf").endpoint;   // get the endpoints

    // check if ABAP or Portal endpoint and assign function
    var serv = {};
    if (req._parsedUrl.pathname.search("jsonrfcadapter") > -1) {
        //remove the last portion of the toString
        var tmpService = req._parsedUrl.pathname.substring(0, req._parsedUrl.pathname.lastIndexOf("/"));
        //check again if the service contain the jsonrfcstring
        if (tmpService.search("jsonrfcadapter") > -1) {
            serv.fm = req._parsedUrl.pathname.substring(req._parsedUrl.pathname.lastIndexOf("/") + 1);
            serv.service = tmpService;
        }
        else {
            serv.service = req._parsedUrl.pathname;
            serv.fm = "";
        }
    }
    else {
        serv.service = req._parsedUrl.pathname;
        serv.fm = "";
    }

    try {
        if (config.get("conf").resourcesLookup[serv.service].host === "abapHost") {
            req.lUtility = laUtility;
            console.log("in abap?");

        } else if (config.get("conf").resourcesLookup[serv.service].host === "portHost") {
            req.lUtility = lUtility;
            console.log("====In java======");
            console.log(req.headers['content-type']);
        } else {
            // metadata service call
            console.log("in else?");
        }
        req.tServices = config.get("conf").resourcesLookup;
        // console.log(req.tServices);

    } catch (e) {
        req.tServices = config.get("conf").resourcesLookup;
        console.log("in exception?");

    } finally {

    }
    next();
}

//serve static resources, react code will be here
app.use(express.static(path.join(__dirname, 'client/build')));
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

//=====FILEUPLOAD PROXY SETUP=======
const poptions = {
    target: "http://sapdep.collectum-out.local:52600", // target host
    changeOrigin: false, // needed for virtual hosted sites
    // ws: true,// proxy websockets
    onProxyReq: function (proxyReq, req, res) {
        console.log("===in PROXY REQ ======");
        req.tServer = config.get("conf").endpoint;
        let password, username, auth;
        if (!req.headers.authorization) {
            username = req.tServer.server.debugUser;
            password = req.tServer.server.debugPassword;
            console.log("=== user passw ===" + username + " " + password);
           
            auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        } else {
            auth = req.headers.authorization;
        }
        if (auth) {
            console.log("====== AUTH =======" + auth);
            req.headers.authorization = auth;
            proxyReq.setHeader('authorization', auth);
            console.log("====== AUTH header=======");
            console.log(req.headers.authorization);
        }
        console.log("REQ =============");
        //console.log(proxyReq);
    },
    onProxyRes: function (proxyRes, req, res) {
        console.log("RESULT =============");
        console.log(res);
        return res.body; 
    },
    logLevel: "debug"
    // auth: auth,
}
var fileProxy = Proxy(poptions);
app.use('/foretag/fil/valideraEPFilJSON.json', fileProxy);
app.use('/foretag/fil/skickaEPFilJSON.json', fileProxy);
app.use('/foretag/fil/valideraFilJSON.json', fileProxy);
app.use('/foretag/fil/skickaFilJSON.json', fileProxy);
app.use(conf);
app.use(cors());

app.use('/', indexRouter);   // index router. should start the React UI on 5000

//Metadata Services, read the config file
app.use('/metadata/services', metadataRouter);

var services = config.get("conf").resourcesLookup;
for (var key in services) {
    if (services.hasOwnProperty(key)) {
        if (key.search("jsonrfcadapter") > -1)   //json adapter
        {
            var tService = key + "*";
            app.use(tService, abapRouter);
        }
        else if (services[key].host === "abapHost") //abap routing
        {
            app.use(key, abapRouter);
        }
        else if (services[key].host === "portHost") //java routing
        {
            app.use(key, javaRouter);
        }
        else {
            console.log("Routing not found");  //To be implemented!!!
        }
    }
}


module.exports = app;
