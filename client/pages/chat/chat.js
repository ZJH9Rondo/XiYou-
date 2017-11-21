const app = getApp()
let tempMessage = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageContent:'',
    lastMessageId: 0,
    chatMessage: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        const chatData = app.globalData.chatData

        for(let i = 0;i < chatData.length; i++){
            if(chatData[i].tunnelId == app.globalData.chatId){
                this.setData({
                    chatMessage: chatData[i].message
                })
            }
        }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      /**
       * 监听服务端消息推送
      */
      app.globalData.tunnel.on('speak', speak => {
        console.log(speak)
       this.data.chatMessage.push({
           type: 'receive',
           content: speak.word
       }),

       // 调用临时数组空间，保证可以使用 push 操作
       tempMessage = this.data.chatMessage
       this.setData({
           chatMessage: tempMessage, 
           lastMessageId: tempMessage.length
       })
       app.globalData.chatItemMessage = this.data.chatMessage
     })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
        this.setData({
            chatMessage: this.data.chatMessage,
            selfChatTunnelId: this.data.chatMessage.length
        })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
       
  },

 /**
  * 获取用户输入内容
 */
getMessageText: function (event){
    this.setData({
        messageContent: event.detail.value
    })
},
  /**
   * 用户发送消息给指定用户
  */
  sendMessage: function (event){
     /**
      * 监听信道客户端消息发送
     */
      console.log(app.globalData.chatId)
      app.globalData.tunnel.emit('speak', { word: {text: this.data.messageContent,to: app.globalData.chatId}, who: wx.getStorageSync('self_tunnelId')})
      this.data.chatMessage.push({
          type: 'send',
          content: this.data.messageContent
      }),
     tempMessage = this.data.chatMessage
     this.setData({
         chatMessage: tempMessage,
         lastMessageId: tempMessage.length
     })
     app.globalData.chatItemMessage = this.data.chatMessage
      console.log(this.data.chatMessage)
    }
})