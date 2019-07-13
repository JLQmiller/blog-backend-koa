const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = {
  username: String,
  password: String,
  createTime: Date,
}
// 生成用户信息模板
const userSchema = new Schema(userSchema);
  
// User model将设置在users集合中
const User = mongoose.model('User', userSchema);

module.exports = User;

// Done