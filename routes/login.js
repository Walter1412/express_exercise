//
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer()
var mongoose = require('mongoose')

// Model
var userModel = require('../models/users')

var Schema = mongoose.Schema
var url = 'mongodb+srv://walter:12345@cluster0-ibsha.mongodb.net/MyTest'

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

var testSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: String,
    author: String
  },
  { collection: 'test' }
)
// console.log('testSchema :>> ', testSchema);
// console.log('userModel :>> ', userModel);
var item = {
  title:'test',
  content:'trest',
  author:'test'
}

var UserData = mongoose.model('UserData', testSchema)

const data = new UserData(item)
data.save()

router.get('/', function(req, res, next) {
  UserData.find().then(function(doc) {
    res.send(doc)
  })
})

router.post('/', upload.array(), function(req, res, next) {
  const { body, query } = req
  const { title, content, author } = req

  res.send('OK')
})

module.exports = router
