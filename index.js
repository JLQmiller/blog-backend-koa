const Koa = require('koa');
const app = new Koa();
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('x-response-time');
	console.log(`${ctx.method} ${ctx.url} ${rt}`);
});
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('x-response-time', `${ms} ms`);
});
app.use(async ctx => {
	console.log('hello world');
	ctx.cookies.set('name', 'tobi', { signed: true});
	ctx.body = 'hello world';
});
app.listen(3000);
app.listen(8111);
