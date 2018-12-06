var express = require('express');
var router = express.Router();

router.get('/',
    function (req, res, next) {
        //console.log("javaRouter OriginalURl " + req.originalUrl);
        //console.log(req.lUtility);
        req.lUtility.getRequest(req, req.originalUrl, req.serviceMethod, res);
    });
router.post('/',
    function (req, res, next) {
        console.log("This is a POST");
        console.log(req.body);
        req.lUtility.getRequest(req, req.originalUrl, req.serviceMethod, res);
       
    });

module.exports = router; 