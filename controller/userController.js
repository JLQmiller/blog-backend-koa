const User = require('../models/db');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
const sha1 = require('sha1');
const createToken = require('../token/createToken');

/**
 *  定义了公用基础方法： 
 * findUser
 * @param {} username   
 * 
 */

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

const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};

const Login = async (ctx) => {
  console.log('kkkk')
  console.log(ctx.request.body);
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  // let password = sha1(ctx.request.body.password);
  // console.log(username, password);
  let doc = await findUser(username);
  console.log(doc);
  if (!doc) {
    console.log('检查用户不存在');
    ctx.status = 200;
    ctx.body = {
      info: false,
    }
  } else if (doc.password === password) {
    console.log('密码正确');
    let token = createToken(username);
    console.log(`createToken: ${token}`);
    doc.token = token;
    await new Promise((resolve, reject) => {
      doc.save((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      })
    });
    ctx.status = 200;
    ctx.body = {
      success: true,
      username,
      token,
      createTime: doc.createTime,
    };
    ctx.cookies.set(
      token,
      {
        // TODO
        domain: 'localhost',
        maxAge: 10 * 60 * 1000,
        httpOnly: false,
        overwrite: false,
      },
    );
  } else {
    console.log('密码错误');
    ctx.status = 200;
    ctx.body = {
      success: false,
    };
  }
};

const Register = async (ctx) => {
  let user = new User({
    // username: ctx.request.body.name,
    // password: sha1(ctx.request.body.password),
    // token: createToken(this.username),
    username: 'jlq',
    password: 'xy2016jlq2017',
    token: createToken(this.username),
    createTime: '',
  });
  console.log(user);
  user.createTime = moment(objectIdToTimestamp(user._id))
  let doc = await findUser(user.username);
  if (doc) {
    console.log('被注册用户已存在');
    ctx.status = 200;
    ctx.body = {
      success: false,
      info: 'username has already been registered',
    };
  } else {
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err);
        } 
        resolve();
      });
    });
    console.log('注册成功');
    ctx.status = 200;
    ctx.body = {
      success: true,
      info: 'register success',
    };
  };
}

module.exports = {
  Login,
  Register,
}