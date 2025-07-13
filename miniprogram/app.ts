// app.ts
import { globalStore, MOTTO_STATE } from './store/index'

App<IAppOption>({
  globalData: {
    store: globalStore as any,
    mottoState: MOTTO_STATE as any,
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功，code:', res.code)
      },
      fail: (err) => {
        console.error('登录失败:', err)
      }
    })
  },
})