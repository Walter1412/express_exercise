var express = require('express')
var router = express.Router()
import Login from './classes/login'
// Model
var UserModel = require('../models/user')

const login = new Login(UserModel)

/* POST */
router.post('/', async (req, res, next) => {
  const { body } = req
  const { user, password } = body
  const filter = {
    email: user,
    password
  }
  try {
    const existUser = await login.getItem(filter)
    console.log('existUser', existUser)
    res.send({})
  } catch (error) {}
})

module.exports = router
