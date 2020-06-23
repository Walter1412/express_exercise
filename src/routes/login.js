var express = require('express')
var router = express.Router()
import jwt from 'jsonwebtoken'
import Login from './classes/login'
// Model
var UserModel = require('../models/user')

const login = new Login(UserModel)

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
    const token = await jwt.sign({ existUser }, 'Test')
    console.log('token :>> ', token)
    res.send({ token:`Bearer ${token}` })
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
