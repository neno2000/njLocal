var express = require('express');
var request = require('request');
var router = express.Router();

/* GET oppna fel. */
router.get('/',
    function (req, res, next) {
        //1.0 H�mta tj�ntserver from conf
       
        //as portal
        // take info from Request.
        // anv�nd ernesto, dvs l�ss auth property if not there use debug user from conf
        console.log(req.conf);
        console.log(req.headers);
        // test
        res.send(res.body);
        console.log(req.body);
    });

module.exports = router;