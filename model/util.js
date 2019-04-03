var request = require('request');
var rCookie = require("request-cookies");
var Proxy = require('http-proxy');


var fs = require('fs');

var util = {
    getRequest: function (req, servicename, method, res) {
        let fileupload = false;
        //==============
        console.log("in get request: " + servicename + " " + method);
        //==============
        const url = servicename;
        if (servicename.indexOf("?") > 0) {
            servicename = servicename.split("?")[0];
        }
        let cType = "";
        cType = req.tServices[servicename].params.inbound.length
            ? req.tServices[servicename].params.inbound[0].hasOwnProperty("file")
                ? req.tServices[servicename].params.inbound[0].file
                : req.headers['content-type']
            : req.headers['content-type'];
        fileupload = cType === "multipart/form-data";
        if (method === "POST") {
            console.log("#################Request type: #################");
            console.log(req.headers["content-type"]);
            if (req.files) {
                console.log("========files: " + req.files.length + "============");
            }
        }
        const authUrl = req.tServer.server.portHost +
            ":" +
            req.tServer.server.portPort +
            req.tServer.server.portAuth;
        const host = req.tServices[servicename].host;
        const portType = req.tServices[servicename].port;
        const baseurl = req.tServer.server[host];
        const port = req.tServer.server[portType];

        let password, username, auth;
        let serviceurl = baseurl + ":" + port + url;
        console.log(serviceurl + " port: " + port + " url: " + url);
        if (!req.headers.authorization) {
            username = req.tServer.server.debugUser;
            password = req.tServer.server.debugPassword;
            auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
        } else {
            auth = req.headers.authorization;
        }

        let options = {
            url: serviceurl,
            method: method,
            cache: false,
            data: req.body,
            contentType: req.headers["content-type"],
            headers: {
                authorization: auth
            },
            jar: true,
            json: !fileupload ? true : false
        }
        if (!fileupload) {
            options.data = req.body;
            options.body = req.body;
            options.contentType = req.headers['content-type'];
        }
        //use to get the single sign on login.
        const options_auth = {
            url: fileupload ? serviceurl : authUrl,
            method: "POST",
            cache: false,
            contentType: fileupload ? req.headers["content-type"] : "application/json; charset=utf-8",
            headers: {
                authorization: auth
            },
            qs: req.query,
            json: !fileupload ? true : false
        }

        const scb = function (error, response, body) {
            if (!error) {
                // make the call
                //   Object.assign(response.body, { "sessionCookie": response.headers['set-cookie'] });    
                res.send(response.body);
                console.log("=====### In scb Response: ###=====");
                console.log(response);
            } else {
                res.send(error);
            }
        }

        var scb_auth = function (error, response, body) {
            if (!error) {
                console.log("########### in scb_auth #################");
                console.log(response);
                const j = request.jar();
                response.headers['set-cookie'].forEach(function (c) {
                    const cookie = request.cookie(c);
                    j.setCookie(cookie, "http://collectum-out.local");
                    // console.log(c);
                });
                options.jar = j;
                request(options, scb);
                //}
            } else {
                res.send(error);
            }
        }
        // check if the method is POST or GET as csrf  must be handled
        if (options.method === "GET") { // no cookie is needed as csrf is not triggered on Spring
            request(options, scb);

        } else {//====POST====
            console.log("in auth_post");
            request(options_auth, scb_auth); // session must be establish to authenticate the
        }
    }
}
module.exports = util;
