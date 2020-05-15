var express = require('express')
var router = express.Router()
var multer = require('multer')
var path = require('path')
var upload = multer()

var memberList = [
  {
    name: 'Walter',
    password: '12345'
  }
]

router.post('/', upload.array(), function(req, res, next) {
  const { body, query } = req
  console.log('body :>> ', body)
  console.log('query :>> ', query)
  res.send('OK')
})

module.exports = router
