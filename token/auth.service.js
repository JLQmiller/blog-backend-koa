const jwt = require('jsonwebtoken');
const config = require('../config/config');


// 检查http头Authorization内是否有token字符，仅对涉及到后台操作的api适用
const authService = async (ctx, next) => {
  const authorization = ctx.get('Authorization');
  console.log(`auth: ${authorization}`);
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http header \'Authorization\'');
  }
  const token = authorization.split(' ')[1];
  console.log(`token: ${token}`);
  let tokenContent;
  try {
    tokenContent = await jwt.verify(token, config.jwt.secret);
    // console.log(`tokenContent: ${tokenContent}`);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ctx.throw(401, 'token expired, plz save native data');
    }
    ctx.throw(401, 'invalid token');
  }
  console.log('鉴权流程完毕');
  await next();
}
module.exports = authService;