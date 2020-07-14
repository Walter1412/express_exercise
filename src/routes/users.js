// Plugins
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer()
var { cloneDeep, omit } = require('lodash')
var Users = require('./classes/users')
var Message = require('./classes/instance/message')

// Models
var UserModel = require('../models/user')

// Classes
const users = new Users(UserModel)

router.use((req, res, next) => {
  console.log('Time:', chalk.bgRed(`Users-${Date.now()}`))
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
/**
 * 新增user資料透過formdata format
 * @route POST /users/signup
 * @group Login - Operations about user123
 * @param {User.model} signup.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', async (req, res, next) => {
  const { body, baseUrl } = req
  const item = cloneDeep(body)
  const { email, phone } = item

  try {
    const repeatEmail = await users.getItem({ email }, '_id')
    const repeatPhone = await users.getItem({ phone }, '_id')
    if (repeatEmail || repeatPhone) {
      throw new Error('0002')
    } else {
      const createUser = await users.createItem(item)
      res.send(Message.success()())
    }
  } catch (error) {
    res.send(Message.fail(error, baseUrl)())
  }
})
// 修改user資料
router.put('/', upload.array(), async (req, res, next) => {
  const { body } = req
  const form = cloneDeep(body)
  const { email } = form
  const filter = {
    email
  }
  const update = omit(form, ['email'])
  try {
    const updateUser = await users.updateItem(filter, update)
    if (updateUser) {
      res.send('更新成功')
    }
  } catch (error) {
    console.log(chalk.bgRedBright(error))
  }
})
// 刪除user資料
router.delete('/', function (req, res, next) {
  const { query } = req
  const { email } = query
  UserModel.findOneAndDelete({ email }, function (err, user) {
    res.send('OK')
  })
})

module.exports = router
