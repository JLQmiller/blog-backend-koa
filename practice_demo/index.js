const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
  if (ctx.url === '/') {
    ctx.body = '这是主页';
  } else if (ctx.url === '/users') {
    ctx.body = 'content page';
  } else {
    ctx.status = 404;
  }
});

app.listen(3000);