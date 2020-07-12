var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var Login = require('./classes/login')
var Authorization = require('./classes/instance/authorization')
// Model
var UserModel = require('../models/user')

// Classes
const login = new Login(UserModel)
const authorization = new Authorization()

/**
 * This function comment is parsed by doctrine
 * @route POST /login
 * @group Login - Operations about login
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', async (req, res, next) => {
  const { body } = req
  const { user, password } = body
  const filter = {
    email: user,
    password
  }
  try {
    const existUser = await login.getItem(filter, '-_id email')
    const token = await jwt.sign({ ...existUser }, authorization.getKey())
    res.send({ token: `Bearer ${token}` })
  } catch (error) {
    res.send(error)
  }
})

/**
 * This function comment is parsed by doctrine
 * @route GET /login
 * @group Login - Operations about login
 * @param {string} email.query.required - username or email - eg: user@domain
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

module.exports = router
