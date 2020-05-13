var express = require('express')
var router = express.Router()
var path = require('path')

/* GET users listing. */
router.get('/read_single', function(req, res, next) {
  console.log(
    'path :>> ',
    path.join(__filename, '../public/assets/images/keroro.jpeg')
  )
  res.sendFile(path.join(__dirname, '../public/assets/images/keroro.jpeg'))
})

router.post('/write_single', function(req, res, next) {
  console.dir(req.body)
})

module.exports = router
