var express = require('express');
var users = require('../controllers/user.controller')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',users.create);//post时 调用创建

router.all('/:name', function (req, res, next) {
  res.write('welcome:' + req.params.name );
  res.end();
});



module.exports = router;
