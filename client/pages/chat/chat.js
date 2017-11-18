const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfChatMessage: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        const selfChatTunnelId = app.globalData.chatId
        const chatData = [
            {
                tunnelId: '1231231231231231',
                message: [
                , {
                        fromType: 'send',  // 区别 发送方 和 接收方
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

        for(let i = 0;i < chatData.length; i++){
            if(chatData[i].tunnelId == selfChatTunnelId){
                this.setData({
                    selfChatMessage: chatData[i].message
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
    
  }
})