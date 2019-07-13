const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (user_id) => {
  const token = jwt.sign({
    uid: user_id,
  }, 
  config.jwt.secret, 
  {
    expiresIn: '2h'
  });
  return token;
}