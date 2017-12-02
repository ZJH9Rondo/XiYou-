const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const tunnel_idArray = await mysql('connectUser').select('tunnel_id') 
    const chatSendUser = ctx.query.tunnelId
    
    if(tunnel_idArray.length > 1){
        let index = Math.ceil(Math.random() * (tunnel_idArray.length-1))
        
        while (tunnel_idArray[index].tunnel_id == chatSendUser){
            index = Math.ceil(Math.random() * tunnel_idArray.length)
        }
        ctx.state.data  = {
            chatUser: tunnel_idArray[index].tunnel_id,
        } 
    }else{
        ctx.state.data = {
            chatUser: 'null'
        }
    }
}