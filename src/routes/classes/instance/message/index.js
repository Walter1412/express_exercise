class Message {
  constructor() {}
  data() {}
  log(sfunction) {
    try {
      sfunction()
    } catch (error) {
      console.log('error :>> ', chalk.bgRedBright(error))
    }
  }
}
module.exports = Message
