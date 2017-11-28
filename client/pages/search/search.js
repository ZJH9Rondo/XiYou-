const app = getApp()
let tunnel = null;

// pages/boardcast/boardcast.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    connectText: '正在连接...',
    connectStatus: false,
    searchStatus: false,
    chatStatus: true,
    chatData: [],
    lastChatId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      /**
     * 连接到Socket
     */
      tunnel = new app.globalData.qcloud.Tunnel(app.globalData.config.service.tunnelUrl)

      console.log(tunnel)
      /**
       * 建立socket连接
      */
      tunnel.open();

      /**
       *  绑定tunnel为全局变量
       */  
      app.globalData.tunnel = tunnel

      tunnel.on('connect', () => {
          // 监听连接状态
          console.log(tunnel)

          /**
           * 截取返回的socketUrl中的 tunnelId
          */
          function getSelfTunnelId(url, name) {
              var reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
              var arr = url.match(reg);

              if (arr) {
                  return arr[2];
              }
              return null;
          }

          /**
           * 将 tunnelId 存入本地
          */
          wx.setStorageSync('self_tunnelId', getSelfTunnelId(tunnel.socketUrl, 'tunnelId'))
          this.setData({
              connectText: '连接成功',
              connectStatus: false
          })
      })

       /**
       * 监听服务端消息推送
      */
      app.globalData.tunnel.on('speak', speak => {
        let flag = true
        let tempLastChatId = app.globalData.chatData.length    
        console.log('chat on speak') 
        for(let i = 0;i < app.globalData.chatData.length;i++){
            if(speak.from == app.globalData.chatData[i].tunnelId){
                app.globalData.chatData[i].unread_piv++
                tempLastChatId++
                this.setData({
                    lastChatId: tempLastChatId
                })
                flag = false
            }
        }
        
        if(flag){
            app.globalData.chatData.push({
                tunnelId: speak.from,
                unread_piv: 0,
                message: [
                    {
                        type: 'receive',
                        content: speak.word
                    }
                ]
            })
            this.setData({
                lastChatId: app.globalData.chatData.length
            })
        }
     })
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
    for(let i = 0;i < app.globalData.chatData.length; i++){
        if(app.globalData.chatData[i].tunnelId == app.globalData.chatId){
            app.globalData.chatData[i].message = app.globalData.chatItemMessage
        }
    }
    this.setData({
        chatData: app.globalData.chatData,
        lastChatId: this.data.chatData.length
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
      /**
       * 页面卸载，关闭信道，删除本地用户对应的 tunnelId
      */
      tunnel.close()
      console.log(tunnel)
      wx.removeStorageSync('self_tunnelId')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
        chatData: app.globalData.chatData,
        lastChatId: this.data.chatData.length
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
 * 打开单独聊天页
*/
startChat: function (event){
    // event 对象包含本次事件触发的完整信息
    app.globalData.chatId = (event.target.dataset.id) ? event.target.dataset.id : event.currentTarget.dataset.id
    console.log(app.globalData.chatId )
    wx.navigateTo({
        url: '../chat/chat',
    })
},

/**
 * 搜索在线用户
*/
searchUser: function (){
    const that  = this
    app.globalData.qcloud.request({
        url: app.globalData.config.service.searchUrl,
        data: {
            tunnelId: wx.getStorageSync('self_tunnelId')
        },
        success: res => {
            /**
             * 页面更改，显示搜索结果
            */
            // this.setData({
            //     searchStatus: true
            // })
            let tmpChatData = app.globalData.chatData
            if(tmpChatData){
                tmpChatData.push({
                    tunnelId: res.data.data.chatReceiveUser,
                    message: []
                })
            }else{
                tmpChatData = []
                tmpChatData.push({
                    tunnelId: res.data.data.chatReceiveUser,
                    message: []
                })
            }
            app.globalData.chatData = tmpChatData
            app.globalData.chatId = res.data.data.chatReceiveUser
            wx.navigateTo({
                url: '../chat/chat',
            })
        },
        fail: err => {
            console.log(err)
        }
    })
},
})