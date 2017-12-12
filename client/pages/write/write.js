const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseIMGStatus: false,
    holeContent: null,
    holeImagesPath: [],
    isAnonymous: false,
    loading: false,
    releaseFAIL: false,
    releaseFailText: '',
    sendButton_Text: '发布'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
   * 用户发布树洞文本
   */
  getHoleContent: function (e){
    this.setData({
      holeContent: e.detail.value
    })    
  },

  /**
   * 用户选择发布树洞图片
   */
  chooseIMG: function (){
    let that = this

    /**
     * 调取微信图片选择接口
     * 读取图片信息和 URL
     * 选择 压缩参数
     * 保存文件信息
     */
    wx.chooseImage({
      count: 2,
      sizeType: ['commpressed'],
      success: res => {
        console.log(res)
        that.setData({
          holeImagesPath: res.tempFilePaths,
          chooseIMGStatus: true
        })
        console.log(that.data.holeImagesPath)    
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  /**
   * 用户启用匿名操作
   */
  useAnonymous: function (){
    let tempStatus = !this.data.isAnonymous

    // 更改匿名状态
    this.setData({
      isAnonymous: tempStatus
    })
  },

  /**
   * 用户发布树洞
   */
  sendHole: function (){
      /**
       * 发布树洞前，先获取用户上传图片信息（如果需要上传图片）
       * 1.先携带需要的上传的图片信息调取上传接口，上传成功后获取到图片服务端读取路径信息
       * 2.组合树洞文本数据、图片服务端获取URL、匿名状态，调取发布接口，发布树洞
       * 
       * 如果无需上传图片，则直接进入第二步操作，用户发布树洞
       */
      // 上传图片文件，获取返回服务端访问地址
      let imgURL = [] // imgUrl 保存图片上传COS后，服务端返回的图片 url
      let that = this
      
      // 改变按钮样式
      that.setData({
        loading: true,
        sendButton_Text: '正在发布...'
      })

      /**
       * 用户正式发布树洞
       * @param {树洞内容} holeContent 
       * @param {树洞图片链接} holeImagesPath 
       * @param {匿名状态参数} isAnonymous 
       * @param {留言列表} comments 
       */
      function releaseHole(holeContent,holeImagesPath,isAnonymous){
        app.globalData.qcloud.request({
          url: app.globalData.config.service.newHoleUrl,
          method: 'POST',
          data: {
            open_id: wx.getStorageSync('open_id'),
            content: holeContent,
            images: holeImagesPath,
            isAnonymous: isAnonymous,
            comments: []
          },
          success: res => {
            that.setData({
              loading: false,
              sendButton_Text: '发布'
            })
          },
          fail: res => {
            console.log('发布失败',res)
            that.setData({
              releaseFAIL: true,
              releaseFailText: '树洞发布失败！请重试',
              loading: false,
              sendButton_Text: '发布'
            })
          }
        })
      }


      if(that.data.holeContent){
        if(that.data.holeImagesPath.length >= 1){
          that.setData({
            sendButton_Text: '上传图片中...'
          })
          
          /**
           * 满足多张图片
           */
          for(let i = 0;i < that.data.holeImagesPath.length; i++){
            wx.uploadFile({
              url: app.globalData.config.service.uploadUrl,
              filePath: that.data.holeImagesPath[i],
              name: 'file',
              success: res => {
                /**
                 * 图片上传成功的回调函数
                 * 将图片在线访问的 CDN URL 存储后上传至数据库保存
                 */
                let data = JSON.parse(res.data)
                let CDN_url = 'http://wx2017-1252802748.file.myqcloud.com/' + data.data.name
                imgURL.push(CDN_url)
                
                if(i == that.data.holeImagesPath.length - 1){
                  releaseHole(that.data.holeContent,imgURL,that.data.isAnonymous)
                }
              },
              fail: res => {
                console.log('图片上传失败',res)
                that.setData({
                  releaseFAIL: true,
                  releaseFailText: '图片上传失败！请重试',
                  loading: false,
                  sendButton_Text: '发布'
                })
              }
            })
          }
        }else{
          releaseHole(that.data.holeContent,imgURL,that.data.isAnonymous)
        }
      }else{
        that.setData({
          releaseFAIL: true,
          loading: false,
          releaseFailText: '你什么都不说是看不起我树洞？',
          sendButton_Text: '发布'
        })
        return;
      }
  },

  /**
   * 用户关闭发布提示
   */
  hideReleaseTips: function (){
    this.setData({
      releaseFAIL: false 
    })
  }
})