// pages/home/home.js
import {getHomeMultidata,getHomeGoods} from '../../network/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommend: [],
    currentType: 'pop',
    goodsList: {
      'pop' : {
        page: 0,
        list: []
      },
      'new' : {
        page: 0,
        list: []
      },
      'sell' : {
        page: 0,
        list: []
      },
    },
    isShow: false
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
  onPageScroll(event) {
    let scrolltop = event.scrollTop
    let sign = scrolltop>1500
    if(sign!=this.data.isShow) {
      this.setData({
        isShow: sign
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getHomeMultidata().then(res => {
      let banner = res.data.data.banner.list
      let recommend = res.data.data.recommend.list
      this.setData({
        bannerList: banner,
        recommend
      })
    })
    this._getHomeGoods('pop')
    this._getHomeGoods('new')
    this._getHomeGoods('sell')
  },
  // 请求商品列表数据
  _getHomeGoods(type) {
    let page = this.data.goodsList[type].page + 1
    getHomeGoods(type,page).then(res => {
      let listdata = res.data.data.list
      let goodname = "goodsList." + type + ".list"
      let pageKey = "goodsList." + type + ".page"
      let list1 = this.data.goodsList[type].list
      list1.push(...listdata)
      this.setData({
        [goodname]: list1,
        [pageKey] : page
      })
    })
  },
  homeScroll(event) {
    console.log(event)
  },
  itemClick(event) {
    console.log(event)
    let index = event.detail.index
    switch(index) {
      case 0: 
        this.setData({
          currentType: 'pop'
        })
        break
      case 1: 
        this.setData({
          currentType: 'new'
        })
        break
      case 2: 
        this.setData({
          currentType: 'sell'
        })
    }
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
    this._getHomeGoods(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})