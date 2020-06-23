class Auth {
  constructor() {
    this.privateKey = 'hi'
    this.publicKey = 'hello'
  }
  getPrivateKey() {
    return this.privateKey
  }
  getPubilcKey() {
    return this.publicKey
  }
}

module.exports = Auth
