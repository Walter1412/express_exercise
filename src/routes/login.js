var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var Login = require('./classes/login')
var Authorization = require('./classes/instance/authorization')
var { isNil } = require('lodash')
var Message = require('./classes/instance/message')
// Model
var UserModel = require('../models/user')

// Classes
const login = new Login(UserModel)
const authorization = new Authorization()

router.use((req, res, next) => {
  console.log('Time:', chalk.bgRed(`Login-${Date.now()}`))
  next()
})

/**
 * @typedef Login
 * @property {string} email.required - phone or email - eg: test@123.com
 * @property {string} password.required - user's password = eg: 12345
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /login
 * @group Login - Operations about login
 * @param {Login.model} login.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', async (req, res, next) => {
  const { body, baseUrl } = req
  const { user, password } = body
  const filter = {
    email: user,
    password
  }
  try {
    const existUser = await login.getItem(filter, '-_id email')
    if (isNil(existUser)) {
      throw new Error('0001')
    } else {
      const token = await jwt.sign({ ...existUser }, authorization.getKey())
      res.send(Message.success()({ token: `Bearer ${token}` }))
    }
  } catch (error) {
    res.send(Message.fail(error, baseUrl)())
  }
})

module.exports = router
