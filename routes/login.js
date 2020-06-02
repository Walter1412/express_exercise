//
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer()
var { cloneDeep, isNull } = require('lodash')

// Model
var UserModel = require('../models/user')

router.get('/', function(req, res, next) {
  UserData.find().then(function(doc) {
    res.send(doc)
  })
})

router.post('/', upload.array(), function(req, res, next) {
  const { body, query } = req
  const item = cloneDeep(body)
  const newUserData = new UserModel(item)

  try {
    UserModel.findOne({ email: item.email }, 'name').exec(function(
      error,
      user
    ) {
      if (error) {
        throw err
      }
      if (user) {
        res.send('信箱已註冊過')
      } else {
        newUserData.save()
        res.send('新增成功')
      }
    })
  } catch (error) {
    console.log(chalk.bgRedBright(error))
  }
})

router.put('/', upload.array(), function(req, res, next) {
  res.send('respond with a put')
})

router.delete('/', function(req, res, next) {
  const { body, query } = req
  console.log('body :>> ', body)
  console.log('query :>> ', query)

  // UserModel.findOneAndRemove({})

  res.send('OK')
})

module.exports = router
