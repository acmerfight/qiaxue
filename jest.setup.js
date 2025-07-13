// Jest 测试环境设置

// 模拟微信小程序环境
global.wx = {
  // 网络请求
  request: jest.fn(),
  
  // 用户信息
  getUserProfile: jest.fn(),
  getUserInfo: jest.fn(),
  
  // 导航
  navigateTo: jest.fn(),
  navigateBack: jest.fn(),
  redirectTo: jest.fn(),
  switchTab: jest.fn(),
  
  // 存储
  getStorageSync: jest.fn(),
  setStorageSync: jest.fn(),
  getStorage: jest.fn(),
  setStorage: jest.fn(),
  removeStorageSync: jest.fn(),
  clearStorageSync: jest.fn(),
  
  // 媒体
  chooseMedia: jest.fn(),
  chooseImage: jest.fn(),
  
  // 登录
  login: jest.fn(),
  
  // 显示
  showToast: jest.fn(),
  showModal: jest.fn(),
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  
  // 其他常用 API
  getSystemInfo: jest.fn(),
  getSystemInfoSync: jest.fn(),
}

// 模拟小程序页面和组件
global.Page = jest.fn()
global.Component = jest.fn()
global.App = jest.fn()
global.getApp = jest.fn(() => ({
  globalData: {}
}))

// 模拟 console 方法，避免测试时输出过多日志
const originalConsole = { ...console }
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: originalConsole.error // 保留 error，用于调试
}

// 每个测试后重置所有 mock
afterEach(() => {
  jest.clearAllMocks()
})