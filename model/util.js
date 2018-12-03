var express = require('express');
var request = require('request');
var router = express.Router();

/* GET request. */
//router.get('/', function (req, res, next) {
//    console.log(req.lUtili);
//    // get the logon user from the request
//    res.send(req.tServices);

//});

var util = {
    getRequest: function (req, service, method, res) {
        const host = req.tServices[service].host;
        const portType = req.tServices[service].port;

        const baseurl = req.tServer.server[host];
        const port = req.tServer.server[portType];
        console.log(port);

        let password, username, auth, serviceurl = baseurl + ":" + port + service;

        console.log(serviceurl);

        if (!req.headers.authorization) {
            username = req.tServer.server.debugUser;
            password = req.tServer.server.debugPassword;
            auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        } else {
            auth = req.headers.authorization;
        }
        const options = {
            url: serviceurl,
            method: method,
            cache: false,
            contentType: "application/json; charset=utf-8",
            headers: {
                authorization: auth
            }
        }
        const scb = function (error, response, body) {
            if (!error) {
                console.log(response.body);
                res.send(response.body);
            } else {
                res.send(error);
            }
        }
        request(options, scb);
    }
}

module.exports = util;
