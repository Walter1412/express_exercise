//
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer()
var { cloneDeep, isNull } = require('lodash')

// Model
var UserModel = require('../models/user')

router.get('/', function(req, res, next) {
  const { query } = req
  const { email } = query
  UserModel.findOne({ email }).exec(function(err, user) {
    if (user) {
      res.send(user)
    } else {
      res.send('無此信箱')
    }
  })
})

router.get('/all', function(req, res, next) {
  UserModel.find({ email }).exec(function(err, user) {
    console.log('user :>> ', user)
    res.send(user)
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

router.put('/', function(req, res, next) {
  const { query } = req
  const { email } = query

  UserModel.findOne({ email }, function(err, user) {
    user.isDelete = true
    user.save()
    res.send('OK')
  })
})

router.delete('/', function(req, res, next) {
  const { query } = req
  const { email } = query

  UserModel.findOneAndDelete({ email }, function(err, user) {
    console.log('user :>> ', user)
    res.send('OK')
  })
})

module.exports = router
