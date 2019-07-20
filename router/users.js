const Router = require('koa-router');
const router = new Router({prefix: '/users'});
const user = require("../controller/userController");

// /users/login
router.post('/login',async (ctx, next) => {
  console.log(ctx.request.body);
  await next();
}, user.login);

module.exports = router;