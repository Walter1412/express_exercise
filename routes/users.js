var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next) {
  next()
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({12:123});
});

router.post('/', function(req, res, next) {
  res.send('respond with a post');
});

router.put('/', function(req, res, next) {
  res.send('respond with a put');
});

router.delete('/', function(req, res, next) {
  res.send('respond with a delete');
});

module.exports = router;
