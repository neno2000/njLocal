var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
// console.log(req.conf);
// get the logon user from the request
  res.send(req.tServices);

});

module.exports = router;
