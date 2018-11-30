var express = require('express');
var request = require('request');
var router = express.Router();

/* GET oppna fel. */
router.get('/',
    function (req, res, next) {
        //1.0 H�mta tj�ntserver from conf
        let password, username;
        if (!req.headers.authorization) {
            username = req.envVar.server.debugUser;
            password = req.envVar.server.debugPassword;
            const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
            req.headers.authorization = auth;
        }
        // req.envVar
        //if (req.headers.authorization) {

        //} 
        //as portal
        // take info from Request.
        // anv�nd ernesto, dvs l�ss auth property if not there use debug user from conf
        console.log(username);
        //console.log(req.headers);
        // test
        res.send('hamtaOppnaFel');
    });

module.exports = router;