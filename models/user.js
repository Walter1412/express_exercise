const ongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)
