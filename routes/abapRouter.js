var express = require('express');
var request = require('request');
var router = express.Router();

/* GET oppna fel. */
router.get('/',
  function(req, res, next) {
    console.log("in get");
    req.lUtility.getRequest(req, req.baseUrl, "GET", res);

  });

router.post('/',
  function(req, res, next) {

    req.lUtility.getRequest(req, req.baseUrl, "POST", res);

  });
router.put('/',
  function(req, res, next) {

    req.lUtility.getRequest(req, req.baseUrl, "PUT", res);

  });

module.exports = router;
