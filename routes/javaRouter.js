var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/',
    function (req, res, next) {
        //console.log("javaRouter OriginalURl " + req.originalUrl);
        //console.log(req.lUtility);
        req.lUtility.getRequest(req, req.originalUrl, "GET", res);
    });
router.post('/',
    function (req, res, next) {
        console.log("This is a POST");
        console.log(req.body);
      //  req.lUtility.getRequest(req, req.originalUrl, req.serviceMethod, res);
      console.log("a post");
      console.log(req);
      req.lUtility.getRequest(req, req.originalUrl, "POST", res);
    });

module.exports = router;
