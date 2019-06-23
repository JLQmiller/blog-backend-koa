const Koa = require('koa');
const koaBody = require('koa-body');
const config = require('./config/config.js');
const logger = require('koa-logger');
const json = require('koa-json');
const error = require('koa-json-error');
const routing = require('./router/index');
const mongoose = require('mongoose');
const paramter = require('koa-parameter');
const bodyParser = require('koa-bodyparser');

function formatError(err) {
	return {
		status: err.status,
		message: err.message,
		success: false,
	};
};
const app = new Koa();

mongoose.connect('mongodb://localhost:27017/mock', {useNewUrlParser: true}, (err) => {
	if (err) {
		console.log(`error:  ${err}`);
		return;
	}
	console.log('数据库连接成功');
})
mongoose.connection.on('error', console.error);

// instantiate Koa
app.use(logger());
app.use(json());

// app.use(koaBody({ // 为了解析post数据，koa并未对参数进行封装
// 	// patchNode: true,
// 	// multipart: true,
// 	formidable: {
// 		// uploadDir: path.join(__dirname, '/public'),
// 		keepExtensions: true,
// 	},
// 	onError: (err) => console.log(`error: ${err}`),
// }));
app.use(bodyParser());
// const router = new route();
// router.post('/kk', ctx => console.log(ctx.request.body));
// app.use(router.routes()).use(router.allowedMethods());

app.use(error({
	format: formatError,
}));

routing(app);


// listen post--8888
app.listen(config.port, () => {
	console.log('start koa-server !');
});
