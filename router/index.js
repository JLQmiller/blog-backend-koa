const fs = require('fs');
const Router = require('koa-router');
module.exports = app => {
  console.log(__dirname);
  const apiRouter = new Router();
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    console.log(file);
    const route = require(`./${file}`);
    // '/api/....'如/api/user/login
    apiRouter.use('/api', route.routes(), route.allowedMethods());
  });
  app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
}