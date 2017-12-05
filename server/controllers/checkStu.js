const { mysql } = require('../qcloud')

module.exports = async (ctx,next) => {
    const stuCheck = await mysql('userStu').select('stuNumber').where({open_id: ctx.query.userWxID}) 

    if(stuCheck.length == 1){
        ctx.state.data = {
            status: true,
            msg: '账号已认证'
        }
    }else{
        ctx.state.data = {
            status: false,
            msg: '账号未进行学生认证'
        }
    }
}