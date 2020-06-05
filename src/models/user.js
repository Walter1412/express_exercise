const db = require('../config/db')

module.exports = db.model('User', require('./schemas/user'))
