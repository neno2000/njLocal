var express = require('express');
var request = require('request');

var util = {
  getRequest: function(req, service, method, res) {
    // get the session cookie

    console.log("I am here Now in ABAP");
    console.log(service);
    const host = req.tServices[service].host;
    const portType = req.tServices[service].port;

    const authUrl = req.tServer.server.portHost + ":" +
      req.tServer.server.portPort + req.tServer.server.portAuth;

    const baseurl = req.tServer.server[host];
    const port = req.tServer.server[portType];

    let password, username, auth, serviceurl = baseurl + ":" + port + service;
    // start by retrieveing the cookie....

    if (!req.headers.authorization) {
      username = req.tServer.server.debugUser;
      password = req.tServer.server.debugPassword;
      auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    } else {
      auth = req.headers.authorization;
    }
    var options = {
      url: serviceurl,
      method: method,
      cache: false,
      contentType: "application/json; charset=utf-8",
      headers: {
        authorization: auth
      },
      qs: req.query

    }


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
        if (options.method !== "GET") {
          // get the session id to overcome ABAP CSRF restriction
          console.log("A POST request CSRF token will be requested");  //PUT must be handled
          options.method = "GET";
          //get the CSRF session id
          options.headers['x-csrf-Token'] = "Fetch";
          console.log("Calling: " + options.url + " to get a CSRF token");
          request(options, function(error, response, body) {
            if (!error) {
            //  options.method = method;   // change to the original method
              options.headers['x-csrf-Token'] = response.headers['x-csrf-token'];
              options.method = method;
              console.log("csrf-token: " + response.headers['x-csrf-token']);
              // make the last call to the abap server now with POST method
              // first place the CSRF token in the request make the call
              console.log("Calling: " + options.url + " with requested " + options.method );
              request(options, scb);
            } else {
              res.send(error);
            }
          })

        } else if (options.method === "GET") {
          request(options, scb);
        }
      } else {
        res.send(error);
      }
    }
    const scb = function(error, response, body) {
      if (!error) {
        // make the call
        res.send(response.body);
      } else {
        res.send("I am here fan!");
        res.send(error);
      }
    }

    request(options_auth, scb_auth);
  }
}

module.exports = util;
