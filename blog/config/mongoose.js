var config = require('./config');
var mongoose = require('mongoose');

module.exports  = function(){

    var db = mongoose.connect(config.db);

//注册User模型
require('../models/user.model');

    return db;
}