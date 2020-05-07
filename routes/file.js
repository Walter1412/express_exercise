var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.dir(req.query)
  res.redirect('/')
});

router.post('/', function(req, res, next) {
  console.dir(req.body)
});


module.exports = router;
