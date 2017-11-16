const { mysql } = require('../qcloud')

module.exports = async ctx => {
    const tunnel_idArray = await mysql('connectUser').select('tunnel_id') 

    ctx.state.data  = {
        tunnel_idArray: tunnel_idArray
    } 
}