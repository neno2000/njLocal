var express = require('express');
var request = require('request');
var router = express.Router();

var util = {
    getRequest: function (req, servicename, method, res, reqObj) {
        const url = servicename;
        if (servicename.indexOf("?") > 0) {
            servicename = servicename.split("?")[0];
        } 
        
        const host = req.tServices[servicename].host;
        const portType = req.tServices[servicename].port;

        const baseurl = req.tServer.server[host];
        const port = req.tServer.server[portType];
        console.log(port);

        let password, username, auth, serviceurl = baseurl + ":" + port + url;

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
            data : reqObj,
            contentType: "application/json; charset=utf-8",
            headers: {
                authorization: auth
            }
        }
        const scb = function (error, response, body) {
            if (!error) {
                console.log(response.body);
                let payload;
                try {
                    payload = JSON.parse(response.body);
                } catch (e) {
                    payload = response.body;
                    console.log(e);
                } 
                res.send(payload);
            }
             else {
                console.log(response.body);
                res.send(error);
            }
        }
        request(options, scb);
    }
}

module.exports = util;
