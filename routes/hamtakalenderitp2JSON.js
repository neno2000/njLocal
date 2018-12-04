var express = require('express');
var router = express.Router();

router.get('/',
    function (req, res, next) {
       // console.log(req.url);
        req.lUtility.getRequest(req, req.originalUrl, "GET", res);
    });

module.exports = router;