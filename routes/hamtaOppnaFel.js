var express = require('express');
var router = express.Router();

/* GET oppna fel. */
router.get('/',
    function (req, res, next) {
        req.lUtility.getRequest(req, "/foretag/fil/hamtaOppnaFelJSON.json", "GET", res);
    });

module.exports = router;