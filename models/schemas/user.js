const db = require('../../config/db')
const Schema = db.Schema

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  { collection: 'users' }
)

module.exports = UserSchema
