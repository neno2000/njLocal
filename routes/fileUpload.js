var proxy = require('http-proxy-middleware');
var app = require("app");
var route = {
    fileRouter: function () {
        const phost = req.tServices["/foretag/fil/valideraEPFilJSON.json"].host;
        const pbaseurl = req.tServer.server[phost];
        console.log("====proxy options======");
        console.log(pbaseurl);
        const poptions = {
            target: pbaseurl, // target host
            changeOrigin: true, // needed for virtual hosted sites
            ws: true // proxy websockets
        }
        const exampleProxy = proxy(poptions);
        app.use("/foretag/fil/valideraEPFilJSON.json", exampleProxy);
        console.log(pbaseurl);
    }
}
module.exports = route;