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
        // keep this part as it is
        // GET retrieve a portal cookie object
        req.lUtility.getRequest(req, req.originalUrl, "GET", res);
    });

module.exports = router;
