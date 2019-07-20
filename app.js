const Koa = require('koa');
const config = require('./config/config.js');
const logger = require('koa-logger');
const json = require('koa-json');
const error = require('koa-json-error');
const routing = require('./router/index');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

function formatError(err) {
	return {
		status: err.status,
		message: err.message,
		success: false,
	};
};
// 实例化koa
const app = new Koa();

//连接数据库'mongodb://localhost:27017/mock'
mongoose.connect(config.mongodb.url, {useNewUrlParser: true}, (err) => {
	if (err) {
		console.log(`error:  ${err}`);
		return;
	}
	console.log('数据库连接成功');
})
mongoose.connection.on('error', console.error);

app.use(logger());
app.use(json());
app.use(bodyParser());

app.use(async (ctx, next) => {
	console.log(`请求信息： \n 方式： ${ctx.request.method}  \n 地址： ${ctx.request.url}`);
	await next();
});

app.use(error({
	format: formatError,
}));

// 路由
routing(app);


// listen post--8888
app.listen(config.app.port, () => {
	console.log('start koa-server !');
});
