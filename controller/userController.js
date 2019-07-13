const User = require('../models/user.db');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const sha1 = require('sha1');
const createToken = require('../token/createToken');

// const initUser

const findUser = (username) => {
  console.log('findUser');
  return new Promise((resolve, reject) => {
    User.findOne({username}, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};

const Login = async (ctx) => {
  console.log(ctx.request.body);
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  // let password = sha1(ctx.request.body.password);
  // console.log(username, password);
  let user = await findUser(username).catch(err => console.log(err));
  console.log(user);
  if (!user) {
    console.log('检查用户不存在');
    ctx.status = 200;
    ctx.body = {
      info: false,
    }
  } else if (user.password === password) {
    console.log('密码正确');
    // 生成token
    const token = createToken(user._id);
    console.log(`createToken: ${token}`);
    ctx.status = 200;
    ctx.body = {
      success: true,
      uid: user._id,
      username: user.username,
      // 返回了token令牌，之后将在前端后台管理中在Authorization中携带
      token: token,
    };
  } else {
    console.log('密码错误');
    ctx.status = 200;
    ctx.body = {
      success: false,
    };
  }
};

module.exports = {
  Login,
}