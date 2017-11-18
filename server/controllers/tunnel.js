const { tunnel } = require('../qcloud')
const { mysql } = require('../qcloud')
const debug = require('debug')('koa-weapp-demo')

/**
 * 调用 tunnel.broadcast() 进行广播
 * @param  {String} type    消息类型
 * @param  {String} content 消息内容
 */
const $broadcast = (type, content) => {
    // tunnel.broadcast(connectedTunnelIds, type, content)
    //     .then(result => {
    //         const invalidTunnelIds = result.data && result.data.invalidTunnelIds || []

    //         if (invalidTunnelIds.length) {
    //             console.log('检测到无效的信道 IDs =>', invalidTunnelIds)

    //             // 从 userMap 和 connectedTunnelIds 中将无效的信道记录移除
    //             invalidTunnelIds.forEach(tunnelId => {

    //                 const index = connectedTunnelIds.indexOf(tunnelId)
    //                 if (~index) {
    //                     connectedTunnelIds.splice(index, 1)
    //                 }
    //             })
    //         }
    //     })
}

/**
 * 调用TunnelService.emit(tunnelId: string, messageType: string, messageContent: any) 发送消息到指定信道
 * @param tunnelId messageType messageContent 均为必填参数
 */


/**
 * 调用 TunnelService.closeTunnel() 关闭信道
 * @param  {String} tunnelId 信道ID 用于关闭指定信道
 */
const $close = (tunnelId) => {

    tunnel.closeTunnel(tunnelId)
}

/**
 * 实现 onConnect 方法
 * 在客户端成功连接 WebSocket 信道服务之后会调用该方法，
 * 此时通知所有其它在线的用户当前总人数以及刚加入的用户是谁
 */
function onConnect (tunnelId) {
    console.log(`[onConnect] =>`, { tunnelId })

    // if (tunnelId in userMap) {
    //     connectedTunnelIds.push(tunnelId)

    //     $broadcast('people', {
    //         'total': connectedTunnelIds.length,
    //         'enter': userMap[tunnelId]
    //     })
    // } else {
    //     console.log(`Unknown tunnelId(${tunnelId}) was connectd, close it`)
    //     $close(tunnelId)
    // }
    ctx.state.data = tunnelId
}

/**
 * 实现 onMessage 方法
 * 客户端推送消息到 WebSocket 信道服务器上后，会调用该方法，此时可以处理信道的消息。
 * 在本示例，我们处理 `speak` 类型的消息，该消息表示有用户发言。
 * 我们把这个发言的信息广播到所有在线的 WebSocket 信道上
 */
function onMessage (tunnelId, type, content) {
    console.log(`[onMessage] =>`, { tunnelId, type, content })

    switch (type) {
        case 'speak':
            // if (tunnelId in userMap) {
            //     $broadcast('speak', {
            //         'who': userMap[tunnelId],
            //         'word': content.word
            //     })
            // } else {
            //     $close(tunnelId)
            // }
            break

        default:
            break
    }
}

/**
 * 实现 onClose 方法
 * 客户端关闭 WebSocket 信道或者被信道服务器判断为已断开后，
 * 会调用该方法，此时可以进行清理及通知操作
 */
function onClose (tunnelId) {
    console.log(`[onClose] =>`, { tunnelId })

    if (!(tunnelId in userMap)) {
        console.log(`[onClose][Invalid TunnelId]=>`, tunnelId)

        $close(tunnelId)
        return
    }

    // const index = connectedTunnelIds.indexOf(tunnelId)
    // if (~index) {
    //     connectedTunnelIds.splice(index, 1)
    // }

    // 聊天室没有人了（即无信道ID）不再需要广播消息
    // 查询数据库 connectUser 表确认当前连接信道 信息
}

module.exports = {
    // 小程序请求 websocket 地址
    get: async ctx => {
        const data = await tunnel.getTunnelUrl(ctx.req)
        const tunnelId = data.tunnel.tunnelId
        const userInfo = JSON.stringify(data.userinfo)

        /**
         * 维护当前链接的信道列表，tunnelId 存入数据库
        */
        await mysql('connectUser').insert({ tunnel_id: tunnelId, user_info: userInfo})

        const tunnelInfo = data.tunnel

        ctx.state.data = tunnelInfo
    },

    // 信道将信息传输过来的时候
    post: async ctx => {
        const packet = await tunnel.onTunnelMessage(ctx.request.body)

        debug('Tunnel recive a package: %o', packet)

        switch (packet.type) {
            case 'connect':
                onConnect(packet.tunnelId)
                break
            case 'message':
                onMessage(packet.tunnelId, packet.content.messageType, packet.content.messageContent)
                break
            case 'close':
                await mysql('connectUser').where({ tunnel_id: packet.tunnelId }).delete()
                onClose(packet.tunnelId)
                break
        }
    }

}
