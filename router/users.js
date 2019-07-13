const Router = require('koa-router');
const router = new Router({prefix: '/users'});
const Login = require("../controller/userController");

// /users/login
router.post('/login',async (ctx, next) => {
  console.log(ctx.request.body);
  await next();
}, Login);

module.exports = router;