var express = require('express');
var router = express.Router();

/* GET oppna fel. */
router.get('/',
    function (req, res, next) {
        console.log("OriginalURl "+ req.originalUrl);
        req.lUtility.getRequest(req, req.originalUrl, "GET", res);
    });

module.exports = router;
