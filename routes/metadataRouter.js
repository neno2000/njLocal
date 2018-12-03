var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
// get the logon user from the request
  var services = [];
  var service = {};
//  console.log(req.tServices);
req.tServices
  res.send(req.tServices);
});

/* GET users listing. */
/*
router.get('/:serviceName', function(req, res, next) {
// get the logon user from the request
  for (i in req.tServices)
  {

     if ( req.tServices[i].serviceNr === req.params.serviceNr )
     {
       console.log(req.tServices[i]);
       res.send(req.tServices[i]);
       return;
     }
  }
});
*/
module.exports = router;
