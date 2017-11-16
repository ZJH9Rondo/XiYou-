const app = getApp()
let tunnel = null;

// pages/boardcast/boardcast.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    connectText: '正在连接...',
    connectStatus: true,
    chatStatus: true,
    sendUserFront: null
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
      
      // 设置使用者头像
      this.setData({
          sendUserFront: app.globalData.userInfo.avatarUrl
      })
      
      /**
       * 建立socket连接
      */
      tunnel.open();

      tunnel.on('connect', () => {
          // 监听连接状态
          console.log(tunnel)
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
 * 搜索在线用户
*/
serchUser: function (){
    app.globalData.qcloud.request({
        url: app.globalData.config.service.serchUrl,
        success: res => {
            console.log(res)
        }
    })
},

  /**
   *  关闭soket连接
   */
  closeConnect: function (){
      tunnel.close()

      console.log(tunnel)
  }
})