const db = require('../config/db')

module.exports = db.model('users', require('./schemas/user'))
