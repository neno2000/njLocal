var express = require('express');
var router = express.Router();
var lUtility require('../model/util');

/* GET users listing. */
router.get('/', function(req, res, next) {
console.log(req.conf);

// Check target by looking at the configuration
// 1.0 if target == ABAP get a session from the portal by authenticating
// 1.1 if user is provided use the user else user the debugger users
// 1.2 establish a session to the portal server to get a cookie
// 1.3 using the cookie call the target url
// 1.4 return the information back to the caller

// 2.0 if target === Portal
// 2.1 if user is provided use the user else user the debugger users
// 2.2 call the target and return to caller

  res.send('adminkortRouter har ska server hämta adminkortet');

});

module.exports = router;
