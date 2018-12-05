var express = require('express');
var request = require('request');

var util = {
    getRequest: function (req, service, method, res) {
        // get the session cookie

        console.log("I am here Now in ABAP");
        const host = req.tServices[service].host;
        const portType = req.tServices[service].port;
        const authUrl = host +  req.tServer.server.portPort + req.tServer.server.portAuth;
        const baseurl = req.tServer.server[host];
        const port = req.tServer.server[portType];
        console.log(authUrl);

        let password, username, auth, serviceurl = baseurl + ":" + port + service;
       // start by retrieveing the cookie....
      
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
               // console.log(response.body);
                res.send(response.body);
            } else {
                console.log(error);
                res.send(error);
            }
        }
        request(options, scb);
    }
}

module.exports = util;
