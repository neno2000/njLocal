var express = require('express');
var router = express.Router();

router.get('/',
    function (req, res, next) {
        req.lUtility.getRequest(req, req.originalUrl, "GET", res);
    });
router.post('/',
    function (req, res, next) {
        req.lUtility.getRequest(req, req.originalUrl, "POST", res);
    });


module.exports = router;
