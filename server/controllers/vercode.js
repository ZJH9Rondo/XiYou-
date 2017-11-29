const request = require('request');

module.exports = async ctx => {
    let result = 0;
    function getVercode(){
       return new Promise(function (resolve,reject){
           request('http://www.tjoe18.cn:4100/verCode', function (error, response, body) {
               if (response.statusCode == 200) {

               }
               body = JSON.parse(body);
               resolve(body);
           });
       })
    }
    result = await getVercode();

    ctx.state.data = result;
}
