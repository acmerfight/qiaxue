// app.ts
import { createStore, state } from 'ccstate'

// 全局状态管理
const store = createStore()
const mottoState = state('Hello CCState')

App<IAppOption>({
  globalData: {
    store,
    mottoState,
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail: err => {
        console.error('登录失败:', err)
      }
    })
  },
})