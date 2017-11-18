const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const tunnel_idArray = await mysql('connectUser').select('tunnel_id') 
    const chatSendUser = ctx.query.tunnelId
    let index = Math.ceil(Math.random() * tunnel_idArray.length)

    while (tunnel_idArray[index].tunnel_id == chatSendUser ){
        index = Math.ceil(Math.random() * tunnel_idArray.length)
    }
    ctx.state.data  = {
        chatReceiveUser: tunnel_idArray[index].tunnel_id,
    } 
}