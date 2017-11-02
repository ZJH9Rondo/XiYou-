//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        indicatordots:  true ,
        imageURL: [
           '../assets/images/1.png',
            '../assets/images/2.jpg',
            '../assets/images/3.jpg',
            '../assets/images/4.jpg'           
        ],
        newsList: [
            {
                newsImgURL: '../assets/images/2.jpg',
                newsUser: 'Rondo',
                newsDescription: '三星W2013，移动联通电信都支持的版本，国行全套原装的金色，没修没拆过，配件盒子全套都在，还                  有四个月保修，发票也在,联系我时，请说明是在哈尔滨赶集网二手手机/手机配件看到的手机转让信息，谢谢。',
                findCount: '10',
                messageCount: '5'
            }, {
                newsImgURL: '../assets/images/1.png',
                newsUser: 'Rondo',
                newsDescription: '三星W2013，移动联通电信都支持的版本，国行全套原装的金色，没修没拆过，配件盒子全套都在，还                  有四个月保修，发票也在,联系我时，请说明是在哈尔滨赶集网二手手机/手机配件看到的手机转让信息，谢谢。',
                findCount: '10',
                messageCount: '5'
            }, {
                newsImgURL: '../assets/images/1.png',
                newsUser: 'Rondo',
                newsDescription: '三星W2013，移动联通电信都支持的版本，国行全套原装的金色，没修没拆过，配件盒子全套都在，还                  有四个月保修，发票也在,联系我时，请说明是在哈尔滨赶集网二手手机/手机配件看到的手机转让信息，谢谢。',
                findCount: '10',
                messageCount: '5'
            }
        ],
        integralData: {
            champion: {
                userFront: '../assets/images/1.png',
                userName: 'Rondo'
            },
            runnerUp: {
                userFront: '../assets/images/2.jpg',
                userName: 'IOS'
            },
            thirdRunner: {
                userFront: '../assets/images/3.jpg',
                userName: 'Android'
            }
        },
        autoplay: true,
        circular: true,
        interval: 3000,
        current: 0
    },
    onLoad: function (){
        if(app.globalData.userInfo){
            this.setData({
                userInfo: app.globalData.userInfo
            })
        }else{
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo
                })
            }
        }
    }
})
