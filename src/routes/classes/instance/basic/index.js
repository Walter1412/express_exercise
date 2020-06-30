class Basic {
  constructor(model) {
    this.BasicModel = model
  }
  getItem(filter, projection = null) {
    return new Promise((resolve, reject) => {
      this.BasicModel.findOne(filter, projection).exec((error, doc) => {
        if (error) {
          reject(error)
        }
        resolve(doc)
      })
    })
  }
  getList(fileter = null, projection = null) {
    return new Promise((resolve, reject) => {
      this.BasicModel.find(filter, projection).exec((error, doc) => {
        if (error) {
          reject(error)
        }
        if (doc) {
          resolve(doc)
        }
      })
    })
  }
  createItem(newData) {
    return new Promise((resolve, reject) => {
      this.BasicModel.create(newData, (error, doc) => {
        if (error) reject(error)
        resolve(doc)
      })
    })
  }
  updateItem(filter = {}, updateData = {}) {
    return new Promise((resolve, reject) => {
      this.BasicModel.findOneAndUpdate(
        filter,
        updateData,
        { new: true, upsert: true },
        (error, doc) => {
          if (error) reject(error)
          resolve(doc)
        }
      )
    })
  }
}
module.exports = Basic
