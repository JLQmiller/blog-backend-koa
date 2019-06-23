const mongoose = require('mongoose');

// 连接数据库mock
// TODO: 修改数据库名字为线上环境数据库名字
// mongoose.connect('mongodb://localhost:27017/mock', {useNewUrlParser: true});
// const db = mongoose.connection;
// db.on('error', (err) => {console.log(err)});
// db.once('open', () => {console.log('success connect to mongodb')});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  createTime: Date,
});
// User model将设置在users集合中
const User = mongoose.model('User', userSchema);
module.exports = User;