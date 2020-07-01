class Authorization {
  constructor() {
    this.key = 'key'
    this.privateKey = 'privateKey'
    this.publicKey = 'publicKey'
  }
  getPrivateKey() {
    return this.privateKey
  }
  getPubilcKey() {
    return this.publicKey
  }
  getKey() {
    return this.key
  }
}

module.exports = Authorization
