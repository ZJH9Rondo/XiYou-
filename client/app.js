//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        const that = this;

       // 利用 qcloud进行登录
       // 小程序登录请求
       //  BUG: 如果测试期间，发现打印 qcloud.login下的 res 为 undefined ，请直接清楚缓存后重新测试，这里是官方 SDK 的问题，无需担心。
       qcloud.setLoginUrl(config.service.loginUrl);
       
      // 校验登录态
       qcloud.request({
           login: true,
           url: config.service.requestUrl,
           success: response => {
                that.globalData.userInfo = response.data.data
                that.globalData.config = config
                that.globalData.qcloud = qcloud
                console.log(that.globalData.userInfo)
           },
            fail: response => {
                console.log(response)
            }
       })
    },
    globalData: {
        userInfo: null,
        config: null,
        qcloud: null,
        chatId: null,
        tunnel: null
    }
})