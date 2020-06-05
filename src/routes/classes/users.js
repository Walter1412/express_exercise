import UserModel from '../../models/user'
class Users {
  constructor() {
    console.log('UserModel :>> ', UserModel)
  }
  getItem(email) {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ email }).exec((error, user) => {
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
}
module.exports = Users
