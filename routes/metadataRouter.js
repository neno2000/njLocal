var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
// get the logon user from the request
  var services = [];
  var service = {};
  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
//  console.log(req.tServices);
req.tServices
  if (isEmpty(req.query)){
    res.send(req.tServices)
  }
  else{
    res.send(req.tServices[req.query.service]);
  }
});

module.exports = router;
