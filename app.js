//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   method: 'GET',
        //   data: {
        //     'appid': 'wx472ffecb0e19b39d',
        //     'secret': '988dedac872abaecdde80babf66d996d',
        //     'js_code': res.code
        //   },
        //   header: {
        //     'content-type': 'application/json' 
        //   },
        //   success: function (res) {
        //     console.log(res.data);
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback = res => {
                    this.globalData.userInfo = res.userInfo
                }
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})