var request = require('request');

var util = {
    getRequest: function (req, servicename, method, res) {
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

        //console.log(req.headers.cookie);

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
            }
        }
        console.log(options);
        const scb = function (error, response, body) {
            if (!error) {
                // console.log(response.body);
                let payload;
                try {
                    payload = JSON.parse(response.body);
                } catch (e) {
                    payload = response.body;
                    console.log(e);
                }
                console.log(response.headers["set-cookie"]);
                res.send(payload);
            }
            else {
                console.log(response.body);
                res.send(error);
            }
        }
        if (method === "POST") {
            const ccb = function (cook) {
                console.log(cook.toString());
                request.cookie(cook.toString());
                request(options, scb);
            }
            this.getCookie(baseurl + ":" + port + "/foretag/fil/hamtaOppnaFelJSON.json", auth, ccb);
        } else {
            request(options, scb);
        }
    },
    getCookie: function (url, auth, ccb) {
        console.log("getCookie-method");
        let cookie = "";
        const options = {
            url: url,
            method: "GET",
            cache: false,
            contentType: "application/json; charset=utf-8",
            headers: {
                authorization: auth
            }
        }
        const scb = function (error, response) {
            if (!error) {
                cookie = response.headers["set-cookie"];
                console.log("cookie set: " + cookie);
                ccb(cookie);
            }
            else {
                console.log(error);
            }
            return cookie;
        }
        request(options, scb);
    }
}

module.exports = util;
