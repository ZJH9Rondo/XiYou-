const { mysql } = require('../qcloud')

module.exports = async (ctx,next) => {
    /**
     * 接收客户端发布请求
     * 解析对应参数
     */

    /**
     * 用户信息只解析存储
     * 头像 && 昵称
     */
    const user = {
        avatarUrl: ctx.state.$wxInfo.userinfo.avatarUrl,
        nicknName: ctx.state.$wxInfo.userinfo.nicknName
    };
    const req = ctx.request.body;
    const open_id = req.open_id;
    const holeContent = req.content; 
    const imagesPath = JSON.stringify(req.images); 
    const isAnonymous = req.isAnonymous;
    const comments = JSON.stringify(req.comments);
    const userinfo = JSON.stringify(user);
    /**
     * 解析用户发布数据后
     * 数据写入数据库
     */
    await mysql('holes').insert({open_id: open_id,content: holeContent,images: imagesPath,comments: comments,createtime: null,userinfo: userinfo,anonymous: isAnonymous});
    ctx.state.data = {
        msg: '写入数据库成功'
    }
}