var express = require('express');
var request = require('request');

var util = {
    getRequest: function (req, servicename, method, res) {
        const url = servicename;
        if (servicename.indexOf("?") > 0) {
            servicename = servicename.split("?")[0];
        }
        const authUrl = req.tServer.server.portHost + ":" +
          req.tServer.server.portPort + req.tServer.server.portAuth;
        const host = req.tServices[servicename].host;
        const portType = req.tServices[servicename].port;

        const baseurl = req.tServer.server[host];
        const port = req.tServer.server[portType];

        let password, username, auth, serviceurl = baseurl + ":" + port + url;



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
            data: req.body,
            contentType: "application/json; charset=utf-8",
            headers: {
                authorization: auth
            },
            qs: req.query,
            body: req.body,
            json: true
        }

        //use to get the single sign on login.
        const options_auth = {
          url: authUrl,
          method: "POST",
          cache: false,
          contentType: "application/json; charset=utf-8",
          headers: {
            authorization: auth
          },
          qs: req.query
        }

        var scb_auth = function(error, response, body) {
          if (!error) {
            options.headers.cookie = response.headers['set-cookie']
            request(options, scb);
          } else {
            res.send(error);
          }
        }
        const scb = function(error, response, body) {
          if (!error) {
            // make the call
            res.send(response.body);
          } else {
            res.send(error);
          }
        }
        // check if the method is POST or GET as csrf  must be handled
        if (options.method === "GET") { // no cookie is needed as csrf is not triggered on Spring

          request(options, scb);

        } else {
          request(options_auth, scb_auth);  // session must be establish to authenticate the
        }
      }
    }


module.exports = util;
