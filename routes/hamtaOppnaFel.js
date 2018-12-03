var express = require('express');
var request = require('request');
var router = express.Router();

/* GET oppna fel. */
router.get('/',
    function (req, res, next) {
        //async function payload() {
        //    await req.lUtility.getRequest(req, "/foretag/fil/hamtaOppnaFelJSON.json", "GET", res);

        //}
        let resultbody = {};
        let result = function(response) {
            resultbody = response;
        }
        req.lUtility.getRequest(req, "/foretag/fil/hamtaOppnaFelJSON.json", "GET", res);
       // res.send(resultbody);
        //payload();
        ////1.0 Hämta tjäntserver from conf
        //let password, username, auth, serviceurl = req.tServer.server.portHost + ":" + req.tServer.server.portPort + "/foretag/fil/hamtaOppnaFelJSON.json";
        //if (!req.headers.authorization) {
        //    username = req.tServer.server.debugUser;
        //    password = req.tServer.server.debugPassword;
        //    auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        //    // req.headers.authorization = auth;
        //} else {
        //    auth = req.headers.authorization;
        //}
        //const options = {
        //    url: serviceurl,
        //    method: "GET",
        //    cache: false,
        //    contentType: "application/json; charset=utf-8",
        //    headers: {
        //        authorization: auth
        //    }
        //}
        //request(options, function (error, response, body) {
        //    if (!error) {
        //        res.send(response.body);
        //        console.log(req.lUtility.getRequest());
        //    }
        //});
    });

module.exports = router;