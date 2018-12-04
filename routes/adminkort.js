var express = require('express');
var request = require('request');
var router = express.Router();

/* GET oppna fel. */
router.get('/',
    function (req, res, next) {

        let resultbody = {};
        let result = function(response) {
            resultbody = response;
        }
        console.log(req);
        // keep this part as it is
        // if GET retrieve a portal cookie object
        // if POST retrieve an abap session object
        req.lUtility.getRequest(req, req.originalUrl, "GET", res);

    });

module.exports = router;
