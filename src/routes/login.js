var express = require('express')
var router = express.Router()
import jwt from 'jsonwebtoken'
import Login from './classes/login'
import Authorization from './classes/instance/authorization'
// Model
var UserModel = require('../models/user')

// Classes
const login = new Login(UserModel)
const authorization = new Authorization()

/* POST Json format */

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

module.exports = router
