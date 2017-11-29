Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    vercode: '',
    session: '',
    verimg: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getVerImg();
  },

  login () {
    let that = this;
    console.log(that.data);
    wx.request({
      // url: "http://www.tjoe18.cn:4100/login",
      url: 'https://fz1b9jc6.qcloud.la/weapp/login',
      data: {
        username: that.data.username,
        password: that.data.password,
        verCode: that.data.vercode,
        session: that.data.session
      },
      method: 'GET',
      success (res) {
        console.log(res);
        // if(res.data.result.message == "login success"){
        //   that.setData({
        //     name: res.data.result.name
        //   });
        //   wx.showToast({
        //     title: that.data.name + '同学你好',
        //     icon: 'success',
        //     duration: 5000
        //   });
        // } else {
        //   wx.showModal({
        //     title: '登录失败',
        //     content: '请检查所填写的信息',
        //   })
        //   that.getVerImg();
        // }
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
        // that.setData({
        //   verimg: res.data.result.verCode,
        //   session: res.data.result.session
        // });
      }
    })
  }
})
