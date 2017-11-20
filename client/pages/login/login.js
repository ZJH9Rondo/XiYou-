Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    vercode: '',
    session: '',
    verimg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVerImg();
  },

  // ---------- 获取学号 ---------- //
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },

  // ---------- 获取密码 ---------- //
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  // ---------- 获取验证码 ---------- //
  vercodeInput: function (e) {
    this.setData({
      vercode: e.detail.value
    });
  },

  // ---------- 获取验证码 ---------- //
  getVerImg: function () {
    let that = this;
    wx.request({
      url: "www.tjoe18.cn:4100/vercode",
      method: 'GET',
      header: {
        "Content-Type": "applciation/json"
      },
      success: function (res) {
        console.log(res);
      }
    })
  }
})