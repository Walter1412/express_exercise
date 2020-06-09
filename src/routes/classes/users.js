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
        resolve(user)
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
      this.UserModel.create(newUser, (error, doc) => {
        if (error) reject(error)
        resolve(doc)
      })
    })
  }
  updateUser(filter = {}, update = {}) {
    return new Promise((resolve, reject) => {
      this.UserModel.findOneAndUpdate(
        filter,
        update,
        { new: true, upsert: true },
        (error, doc) => {
          if (error) reject(error)
          resolve(doc)
        }
      )
    })
  }
}
module.exports = Users
