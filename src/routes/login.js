var express = require('express')
var router = express.Router()
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
    console.log('jwt :>> ', jwt)
    const token = await jwt.sign({ existUser }, 'waltertest')
    console.log('token :>> ', token)
    res.send({})
  } catch (error) {
    console.log('error :>> ', chalk.bgRedBright(error))
    res.send('error')
  }
})

module.exports = router
