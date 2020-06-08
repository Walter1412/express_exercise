import UserModel from '../../models/user'

class Users {
  constructor() {
    this.UserModel = UserModel
    this.userData = null
  }
  getItem(filter, projection = null) {
    return new Promise((resolve, reject) => {
      this.UserModel.findOne(filter, projection).exec((error, user) => {
        if (error) {
          reject(error)
        }
        if (user) {
          resolve(user)
        }
        resolve('無此信箱')
      })
    })
  }
  getList(fileter = null, projection = null) {
    return new Promise((resolve, reject) => {
      this.UserModel.find(filter, projection).exec((error, users) => {
        if (error) {
          reject(error)
        }
        if (users) {
          resolve(users)
        }
      })
    })
  }
  createUser(newUser) {
    return new Promise((resolve, reject) => {
      this.UserModel.create(newUser, (error, user) => {
        if (error) reject(error)
        if (user) resolve(user)
      })
    })
  }
  updateUser(updateUser) {
    return new Promise((resolve, reject) => {
      this.UserModel.findOne({ email }, function(err, user) {
        user.isDelete = true
        user.save()
        res.send('OK')
      })
    })
  }
}
module.exports = Users
