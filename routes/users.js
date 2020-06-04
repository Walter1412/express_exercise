//
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer()
var { cloneDeep, isNull } = require('lodash')
import Users from './classes/users'
console.log('Users :>> ', Users);

// Model
var UserModel = require('../models/user')

// get user item
router.get('/item', async (req, res, next) => {
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
// get user list
router.get('/list', function(req, res, next) {
  UserModel.find(null, '-_id name email').exec(function(err, users) {
    try {
      if (err) {
        throw err
      }
      if (users) {
        res.send(users)
      } else {
        res.send([])
      }
    } catch (error) {
      console.log(chalk.bgRedBright(error))
    }
  })
})

// 新增user資料透過formdata format
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
        throw error
      }
      if (user) {
        res.send('信箱已註冊過')
      } else {
        newUserData.save(err => {
          console.log('err :>> ', chalk.bgRedBright(err))
          if (err) throw err
          res.send('新增成功')
        })
      }
    })
  } catch (error) {
    console.log(chalk.bgRedBright(error))
  }
})

// 修改user資料
router.put('/', function(req, res, next) {
  const { query } = req
  const { email } = query
  UserModel.findOne({ email }, function(err, user) {
    user.isDelete = true
    user.save()
    res.send('OK')
  })
})

// 刪除user資料
router.delete('/', function(req, res, next) {
  const { query } = req
  const { email } = query
  UserModel.findOneAndDelete({ email }, function(err, user) {
    res.send('OK')
  })
})

module.exports = router
