const request = require('request');

module.exports = async ctx => {
  request('http://www.tjoe18.cn:4100/verCode', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.stringify(body);
      ctx.state.data = body;
    }
  })
}
