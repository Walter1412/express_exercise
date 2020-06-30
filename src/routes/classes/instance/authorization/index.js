class Authorization {
  constructor() {
    this.privateKey = 'privateKey'
    this.publicKey = 'publicKey'
  }
  getPrivateKey() {
    return this.privateKey
  }
  getPubilcKey() {
    return this.publicKey
  }
}

module.exports = Authorization
