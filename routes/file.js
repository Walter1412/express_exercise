var express = require('express');
var router = express.Router();
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
});

router.post('/', function(req, res, next) {
  console.dir(req.body)
});


module.exports = router;
