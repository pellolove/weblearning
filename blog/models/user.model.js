var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
//定义结构
var UserSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String

});
//根据 UserSchema 结构创建 User 模型
Mongoose.model('User',UserSchema);