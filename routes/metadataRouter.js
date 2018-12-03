var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
// get the logon user from the request
  var services = [];
  var service = {};
//  console.log(req.tServices);
  for (i in req.tServices)
  {
      services[i] =
      {
        key: req.tServices[i].serviceNr,
        name: req.tServices[i].service,
        target: req.tServices[i].host,
      };
  }
  res.send(services);
});

/* GET users listing. */
router.get('/:serviceNr', function(req, res, next) {
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
module.exports = router;
