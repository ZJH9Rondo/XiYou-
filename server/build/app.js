'use strict';

var Koa = require('koa');
var app = new Koa();
var debug = require('debug')('koa-weapp-demo');
var response = require('./middlewares/response');
var bodyParser = require('koa-bodyparser');
var config = require('./config');

// 使用响应处理中间件
app.use(response);

// 解析请求体
app.use(bodyParser());

// 引入路由分发
var router = require('./routes');
app.use(router.routes());

// 启动程序，监听端口
app.listen(config.port, function () {
  return debug('listening on port ' + config.port);
});
//# sourceMappingURL=app.js.map