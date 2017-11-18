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
    chatData: [
        {
            tunnelId: '1231231231231231',
            message: [
                ,{
                    fromType:  'send',  // 区别 发送方 和 接收方
                    content: '你好啊',
                }, {
                    fromType: 'receive',  // 区别 发送方 和 接收方
                    content: '你好',
                }, {
                    fromType: 'receive',  // 区别 发送方 和 接收方
                    content: '有什么事吗？你谁啊',
                }, {
                    fromType: 'send',  // 区别 发送方 和 接收方
                    content: '我是一个陌生人啊',
                }, {
                    fromType: 'send',  // 区别 发送方 和 接收方
                    content: '你好啊',
                }
            ]
        }, {
            tunnelId: '45465464564564',
            message: [
                , {
                    fromType: 'receive',  // 区别 发送方 和 接收方
                    content: '你好啊',
                }, {
                    fromType: 'send',  // 区别 发送方 和 接收方
                    content: '你好',
                }, {
                    fromType: 'send',  // 区别 发送方 和 接收方
                    content: '有什么事吗？你谁啊',
                }, {
                    fromType: 'receive',  // 区别 发送方 和 接收方
                    content: '我是一个陌生人啊',
                }, {
                    fromType: 'receive',  // 区别 发送方 和 接收方
                    content: '好你mmp',
                }
            ]
        }
    ]
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
    //   tunnel.open();

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
    app.globalData.chatId = (event.target.id) ? event.target.id : event.currentTarget.id
    wx.navigateTo({
        url: '../chat/chat',
    })
},

/**
 * 搜索在线用户
*/
serchUser: function (){
    app.globalData.qcloud.request({
        url: app.globalData.config.service.serchUrl,
        data: {
            tunnelId: wx.getStorageSync('self_tunnelId')
        },
        success: res => {
            /**
             * 页面更改，显示搜索结果
            */
            this.setData({
                searchStatus: true
            })
            wx.setStorageSync('chatUserTunnelId', res.data.data.chatReceiveUser) // 存储数据到本地缓存
            console.log(res.data.data.chatReceiveUser)
        }
    })
},
})