var express = require('express');
var request = require('request');

var util = {
  getRequest: function(req, service, method, res) {

    // get the session cookie
    // check if the call is targeting the rfcJsonAdapter
//########################Json Adapter Patch###########################
    var serv = {};
    if ( service.search("jsonrfcadapter") > -1){
      //remove the last portion of the toString
      var tmpService = service.substring(0,service.lastIndexOf("/"));
      //check again if the service contain the jsonrfcstring
      if  ( tmpService.search("jsonrfcadapter") > -1) {
        serv.fm = service.substring(service.lastIndexOf("/")+1);
        serv.service = tmpService;
      }
      else{
        serv.service = service;
        serv.fm = "";
      }
    }
    else if ( service.search("openui5") > -1){

      //remove the last portion of the toString
      //remove the last portion of the toString
      console.log("Iam here");
      const path = service.replace('/openui5', "");
      serv.service = '/openui5';
      serv.fm = path;
      console.log(serv);
    }
    else {
      serv.service = service;
      serv.fm = "";
    }
//########################Json Adapter Patch###########################
    const host = req.tServices[serv.service].host;
    const portType = req.tServices[serv.service].port;
    const authUrl = req.tServer.server.portHost + ":" +
      req.tServer.server.portPort + req.tServer.server.portAuth;
    const baseurl = req.tServer.server[host];
    const port = req.tServer.server[portType];

    let password, username, auth, serviceurl = baseurl + ":" + port + serv.service + "/" + serv.fm ;
    // start by retrieveing the cookie....

    if (!req.headers.authorization) {
      username = req.tServer.server.debugUser;
      password = req.tServer.server.debugPassword;
      auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    } else {
      auth = req.headers.authorization;
    }
    // will be used to make the request, passing all information from njLocal
    var options = {
      url: serviceurl,
      method: method,
      cache: false,
      contentType: "application/json; charset=utf-8",
      headers: {
        authorization: auth
      },
      qs: req.query,
      body: req.body,
      json: true
    }
    console.log(options);

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
    // check if the target system is CRM sandbox, then SSO is not activated.
    // in that case use authentication options from the request
    console.log(req.tServer.server.portHost);
    if (req.tServer.server.portHost === 'none') { // will work even for other systems

      console.log("calling sandbox");
      // than SCR as long as conf is correct
      request(options, scb);

    } else {
      console.log("Calling non sandbox system");
      request(options_auth, scb_auth);
    }
  }
}

module.exports = util;
