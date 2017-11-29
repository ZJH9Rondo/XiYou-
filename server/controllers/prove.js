// ---------- 西邮教务系统认证 ---------- //
const request = require('request');

module.exports = async ctx => {
  let username = ctx.query.username;
  let password = ctx.query.password;
  let verCode = ctx.query.verCode;
  let session = ctx.query.session;
  let result = '';
  
  if(!username || !password || !verCode || !session){
    ctx.state.data = 'no data';
  }else{
    let url = 'http://www.tjoe18.cn:4100/login?' + "username=" + username + "&password=" + password + "&session=" + session + "&verCode=" + verCode;
    function prove() {
      return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
          body = JSON.parse(body);
          resolve(body);
        });
      })
    }
    result = await prove();
  }

  ctx.state.data = result;
}
