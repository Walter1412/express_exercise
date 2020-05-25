//
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer()
var { cloneDeep, isNull } = require('lodash')

// Model
var userModel = require('../models/user')

router.get('/', function(req, res, next) {
  UserData.find().then(function(doc) {
    res.send(doc)
  })
})

router.post('/', upload.array(), function(req, res, next) {
  const { body, query } = req
  const item = cloneDeep(body)
  const userData = new userModel(item)

  userModel.findOne({ email: item.email }, 'name').exec(function(err, user) {
    console.log('user :>> ', user)
  })

  // userData.save()

  res.send('OK')
})

router.delete('/', upload.array(), function(req, res, next) {
  const { body, query } = req
  console.log('body :>> ', body)
  console.log('query :>> ', query)

  res.send('OK')
})

module.exports = router
