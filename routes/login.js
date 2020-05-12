var express = require('express');
var router = express.Router();
var path = require('path')


router.post('/', function(req, res, next) {
  console.log('res :>> ', req);
  res.end()
});


module.exports = router;
