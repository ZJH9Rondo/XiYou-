const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
    vercode: null,
    session: null,
    verimg: null,
    name: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getVerImg();
  },

  login () {
    let that = this;
    let userData = that.data;
    if(userData.username && userData.password && userData.vercode){
      wx.showModal({
        title: '登录失败',
        content: '请填写信息',
      })
    }
    wx.request({
      url: 'https://fz1b9jc6.qcloud.la/weapp/prove',
      data: {
        stuWxID: app.globalData.userInfo.openId,
        username: userData.username,
        password: userData.password,
        verCode: userData.vercode,
        session: userData.session
      },
      method: 'GET',
      success (res) {
        console.log(res);
        if(res.data.data.result.message == "login success"){
          that.setData({
            name: res.data.data.result.name
          });
          wx.showToast({
            title: userData.name + '同学你好',
            icon: 'success',
            duration: 5000
          });
          setTimeout(() => {
              wx.navigateTo({
                  url: '../index/index',
              })
          },1000)
        } else {
          wx.showModal({
            title: '登录失败',
            content: '请检查所填写的信息',
          })
          that.getVerImg();
        }
      }
    });
   
  },

  // ---------- 获取学号 ---------- //
  usernameInput (e) {
    this.setData({
      username: e.detail.value
    });
  },

  // ---------- 获取密码 ---------- //
  passwordInput (e) {
    this.setData({
      password: e.detail.value
    });
  },

  // ---------- 获取验证码 ---------- //
  vercodeInput (e) {
    this.setData({
      vercode: e.detail.value
    });
  },

  // ---------- 获取验证码 ---------- //
  getVerImg () {
    let that = this;
    wx.request({
      url: 'https://fz1b9jc6.qcloud.la/weapp/vercode',
      method: 'GET',
      success: res => {
          console.log(res);
        that.setData({
          verimg: res.data.data.result.verCode,
          session: res.data.data.result.session
        });
      }
    })
  }
})
