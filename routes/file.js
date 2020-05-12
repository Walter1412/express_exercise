var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var path = require('path')

/* GET users listing. */
router.get('/read_single', function(req, res, next) {
  console.log('path :>> ', path.join(__filename,'../public/assets/images/keroro.jpeg'));
  res.sendFile(path.join(__dirname,'../public/assets/images/keroro.jpeg'))
=======
var path = require('path');
var fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.dir(req.query)
  // res.redirect('/')
  fs.readFile(path.join(__dirname, './db/product.json'),'utf-8',function (err,data){
    if(err){
      console.log(err);
    }else{
      console.log('data', data)
    }
  })
>>>>>>> 402afb1afa9f8f241b817a859d31d473efdc1b10
});

router.post('/write_single', function(req, res, next) {
  console.dir(req.body)
});


module.exports = router;
