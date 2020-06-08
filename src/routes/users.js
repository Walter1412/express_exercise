//
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer()
var { cloneDeep, isNull } = require('lodash')
import Users from './classes/users'

// Model
var UserModel = require('../models/user')

const users = new Users()

router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// get user item
router.get('/item', async (req, res, next) => {
  const { query } = req
  const { email } = query
  try {
    const usersItem = await users.getItem({ email }, '-_id firstName lastName')
    res.send(usersItem)
  } catch (error) {
    console.log('error :>> ', chalk.bgRedBright(error))
  }
})
// get user list
router.get('/list', async (req, res, next) => {
  try {
    const userList = await users.getList()
    res.send(userList)
  } catch (error) {
    console.log('error :>> ', chalk.bgRedBright(error))
  }
})

// 新增user資料透過formdata format
router.post('/', upload.array(), async (req, res, next) => {
  const { body, query } = req
  const item = cloneDeep(body)
  const { email } = item

  try {
    const repeatUser = await users.getItem({ email }, '_id')
    if (repeatUser) {
      res.send('信箱已註冊過')
    } else {
      const createUser = await users.createUser(item)
      console.log('createUser', createUser)
      res.send('新增成功')
    }
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
