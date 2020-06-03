var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  // return json
  // res.json({12:'12dsfasf3'});
  console.dir(res.headersSent) // false
  res.send('OK')
  console.dir(res.headersSent) // true
})

router.post('/', function(req, res, next) {
  res.send('respond with a post')
})

router.put('/', function(req, res, next) {
  res.send('respond with a put')
})

router.delete('/', function(req, res, next) {
  res.send('respond with a delete')
})

module.exports = router
