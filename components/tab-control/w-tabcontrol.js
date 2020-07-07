// components/tab-control/w-tabcontrol.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(event) {
      let index = event.currentTarget.dataset.number
      this.setData({
        currentIndex: index
      })
      this.triggerEvent("itemclick",{index: index},{})
    }
  }
})
