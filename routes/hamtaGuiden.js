var express = require('express');
var router = express.Router();

router.get('/',
    function (req, res, next) {
        req.lUtility.getRequest(req, "/foretag/hamtaguidenJSON.json", "GET", res);
    });

module.exports = router;