var express = require('express');
var router = express.Router();

router.get('/',
    function (req, res, next) {
        //console.log("javaRouter OriginalURl " + req.originalUrl);
        //console.log(req.lUtility);
        req.lUtility.getRequest(req, req.originalUrl, "GET", res);
    });

module.exports = router;