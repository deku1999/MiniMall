export function request(options) {
  return new Promise((resolve,reject) => {
    wx.request({
      url: 'http://152.136.185.210:8000/api/n3'+ options.url,
      success: resolve,
      method: options.method || "get",
      data: options.params || {}
    })
  })
}