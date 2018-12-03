var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
// console.log(req.conf);
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
router.get('/:key', function(req, res, next) {
// console.log(req.conf);
// get the logon user from the request
  var services = [];
  var service = {};
//  console.log(req.tServices);
  for (i in req.tServices)
  {
      services[i] =
      {
        key: i,
        name: req.tServices[i].service,
        target: req.tServices[i].host,
      };

  }

  res.send(req.tServices.serviceNr);
});

module.exports = router;
