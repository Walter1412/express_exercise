var mongoose = require('mongoose')
var chalk = require('chalk')
var url = 'mongodb+srv://walter:12345@cluster0-ibsha.mongodb.net/MyTest'

global.chalk = chalk

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(chalk.bgGreenBright('MongoDB Connected')))
  .catch(err => console.log(chalk.bgRedBright(err)))

module.exports = mongoose
