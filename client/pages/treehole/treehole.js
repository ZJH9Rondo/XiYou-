const app = getApp()

/**快递服务**/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    holes: [],
    index: 0,
    holesData: [
      {
        avatar: '../assets/images/1.png',
        user: '西安邮电大学',
        content: '我不知道为什么发这个，可能就是烦了吧，水一水经验,我不知道为什么发这个，可能就是烦了吧，水一水经验，可能就是烦了吧，水一水经验,可能就是烦了吧，水一水经验',
        create: '2017年12月6日',
        comment: 12
      },
      {
        avatar: '../assets/images/1.png',
        user: '西安邮电大学',
        content: '我不知道为什么发这个，可能就是烦了吧，水一水经验,我不知道为什么发这个，可能就是烦了吧，水一水经验，可能就是烦了吧，水一水经验,可能就是烦了吧，水一水经验',
        create: '2017年12月6日',
        comment: 12
      },
      {
        avatar: '../assets/images/1.png',
        user: '西安邮电大学',
        content: '我不知道为什么发这个，可能就是烦了吧，水一水经验,我不知道为什么发这个，可能就是烦了吧，水一水经验，可能就是烦了吧，水一水经验,可能就是烦了吧，水一水经验',
        create: '2017年12月6日',
        comment: 12
      },
      {
        avatar: '../assets/images/1.png',
        user: '西安邮电大学',
        content: '我不知道为什么发这个，可能就是烦了吧，水一水经验,我不知道为什么发这个，可能就是烦了吧，水一水经验，可能就是烦了吧，水一水经验,可能就是烦了吧，水一水经验',
        create: '2017年12月6日',
        comment: 12
      },
      {
        avatar: '../assets/images/1.png',
        user: '西安邮电大学',
        content: '我不知道为什么发这个，可能就是烦了吧，水一水经验,我不知道为什么发这个，可能就是烦了吧，水一水经验，可能就是烦了吧，水一水经验,可能就是烦了吧，水一水经验',
        create: '2017年12月6日',
        comment: 12
      },
      {
        avatar: '../assets/images/1.png',
        user: '西安邮电大学',
        content: '我不知道为什么发这个，可能就是烦了吧，水一水经验,我不知道为什么发这个，可能就是烦了吧，水一水经验，可能就是烦了吧，水一水经验,可能就是烦了吧，水一水经验',
        create: '2017年12月6日',
        comment: 12
      },
      {
        avatar: '../assets/images/1.png',
        user: '西安邮电大学',
        content: '我不知道为什么发这个，可能就是烦了吧，水一水经验,我不知道为什么发这个，可能就是烦了吧，水一水经验，可能就是烦了吧，水一水经验,可能就是烦了吧，水一水经验',
        create: '2017年12月6日',
        comment: 12
      },
      {
        avatar: '../assets/images/1.png',
        user: '西安邮电大学',
        content: '我不知道为什么发这个，可能就是烦了吧，水一水经验,我不知道为什么发这个，可能就是烦了吧，水一水经验，可能就是烦了吧，水一水经验,可能就是烦了吧，水一水经验',
        create: '2017年12月6日',
        comment: 12
      }
    ],
    loadText: '点击加载更多>>>'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '树洞'
    })
    /**
     * 初次加载（限制）
     */
    let tempArr = []
    let tempholes = this.data.holesData

    if(this.data.holesData.length > 6){
      for(let i=0; i<6; i++){
        tempArr.push(tempholes[i])
      }
    }else{
      for(let i=0; i<tempholes.length; i++){
        tempArr.push(tempholes[i])
      }
    }
    this.setData({
      holes: tempArr,
      index: tempArr.length
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
    wx.setNavigationBarTitle({
      title: 'XiYou小陌'
    })
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
   * 加载更多
   */
  loadmore: function (){
    let end = this.data.index + 6
    let tempArr = this.data.holes
    let tempholes = this.data.holesData
    let that = this

    if(tempArr.length === tempholes.length){
      setTimeout(function() {
        that.setData({
          loadText: '没有更多数据啦！'
        })
      }, 1000);
      return
    }

    this.setData({
      loadText: '正在拼命加载...'
    })
    if(tempholes.length > end){
      for(let i = this.data.index; i < end;i++){
        tempArr.push(tempholes[i])
      }
    }else{
      for(let i = this.data.index; i<tempholes.length;i++){
        tempArr.push(tempholes[i])
      }
    }

    setTimeout(function() {
      that.setData({
        holes: tempArr,
        index: tempArr.length,
        loadText: 'ok！加载好啦~'
      })
    }, 500);

    /**
     * 维持UI效果
     */
    setTimeout(function() {
      that.setData({
        loadText: '点击加载更多>>>'
      })
    }, 1000);
  },

  /**
   * 前往树洞创建编辑页面
   */
  createHole: function (){
    wx.navigateTo({
      url: '../write/write'
    })
  }
})