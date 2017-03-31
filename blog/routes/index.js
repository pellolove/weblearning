var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.all('/abc', function (req, res, next) {
  res.write('hello world! i am luopei1');
  res.end();
});
router.all('/user/:name', function (req, res, next) {
  res.write('welcome:' + req.params.name );
  res.end();
});


module.exports = router;
