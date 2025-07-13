/**
 * 页面与状态管理集成测试
 * 测试页面逻辑与状态管理的真实集成，模拟页面方法调用
 */

import {
  setUserInfo,
  clearUserInfo,
  updateUserAvatar,
  getUserInfo,
  checkHasUserInfo,
  UserInfo
} from '../store/userStore'

// 模拟页面行为的辅助函数
function simulatePageUserFlow() {
  return {
    // 模拟页面同步状态的方法
    syncStateToPage() {
      const userInfo = getUserInfo()
      const hasUserInfo = checkHasUserInfo()
      
      return {
        userInfo: userInfo || {
          avatarUrl: 'default-avatar.jpg',
          nickName: '',
        },
        hasUserInfo
      }
    },

    // 模拟用户选择头像
    onChooseAvatar(avatarUrl: string, currentNickName?: string) {
      const currentUserInfo = getUserInfo()
      
      if (currentUserInfo) {
        updateUserAvatar(avatarUrl)
      } else if (currentNickName && avatarUrl !== 'default-avatar.jpg') {
        setUserInfo({
          nickName: currentNickName,
          avatarUrl
        })
      }
      
      return this.syncStateToPage()
    },

    // 模拟用户输入昵称
    onInputChange(nickName: string) {
      const currentUserInfo = getUserInfo()
      
      if (currentUserInfo) {
        setUserInfo({
          ...currentUserInfo,
          nickName
        })
      }
      
      return this.syncStateToPage()
    },

    // 模拟微信授权
    getUserProfile(userInfo: UserInfo) {
      setUserInfo(userInfo)
      return this.syncStateToPage()
    }
  }
}

describe('页面与状态管理集成测试', () => {
  let pageFlow: ReturnType<typeof simulatePageUserFlow>

  beforeEach(() => {
    clearUserInfo()
    pageFlow = simulatePageUserFlow()
  })

  describe('页面初始化状态同步', () => {
    test('页面onLoad时应该正确同步初始状态', () => {
      // 模拟页面onLoad调用syncStateToPage
      const pageData = pageFlow.syncStateToPage()
      
      expect(pageData.hasUserInfo).toBe(false)
      expect(pageData.userInfo.nickName).toBe('')
      expect(pageData.userInfo.avatarUrl).toBe('default-avatar.jpg')
    })

    test('页面onLoad时如果有已保存用户信息应该正确同步', () => {
      // 预设用户信息
      const existingUser: UserInfo = {
        nickName: '已存在用户',
        avatarUrl: 'https://example.com/existing-avatar.jpg'
      }
      setUserInfo(existingUser)

      // 模拟页面onLoad
      const pageData = pageFlow.syncStateToPage()
      
      expect(pageData.hasUserInfo).toBe(true)
      expect(pageData.userInfo).toEqual(existingUser)
    })
  })

  describe('用户头像选择流程', () => {
    test('新用户选择头像后输入昵称完成注册', () => {
      // 1. 用户选择头像（此时还没有昵称）
      let pageData = pageFlow.onChooseAvatar('https://example.com/new-avatar.jpg')
      expect(pageData.hasUserInfo).toBe(false) // 因为还没有昵称

      // 2. 用户输入昵称
      pageData = pageFlow.onInputChange('新用户昵称')
      expect(pageData.hasUserInfo).toBe(false) // 还是false，因为头像和昵称是分开设置的

      // 3. 用户再次选择头像，触发完整注册
      pageData = pageFlow.onChooseAvatar('https://example.com/final-avatar.jpg', '新用户昵称')
      expect(pageData.hasUserInfo).toBe(true)
      expect(pageData.userInfo.nickName).toBe('新用户昵称')
      expect(pageData.userInfo.avatarUrl).toBe('https://example.com/final-avatar.jpg')
    })

    test('已有用户更新头像', () => {
      // 1. 预设用户信息
      const existingUser: UserInfo = {
        nickName: '已有用户',
        avatarUrl: 'https://example.com/old-avatar.jpg'
      }
      setUserInfo(existingUser)

      // 2. 用户更新头像
      const pageData = pageFlow.onChooseAvatar('https://example.com/new-avatar.jpg')
      
      expect(pageData.hasUserInfo).toBe(true)
      expect(pageData.userInfo.nickName).toBe('已有用户')
      expect(pageData.userInfo.avatarUrl).toBe('https://example.com/new-avatar.jpg')
    })
  })

  describe('用户昵称输入流程', () => {
    test('已有用户修改昵称', () => {
      // 1. 预设用户信息
      const existingUser: UserInfo = {
        nickName: '旧昵称',
        avatarUrl: 'https://example.com/avatar.jpg'
      }
      setUserInfo(existingUser)

      // 2. 用户修改昵称
      const pageData = pageFlow.onInputChange('新昵称')
      
      expect(pageData.hasUserInfo).toBe(true)
      expect(pageData.userInfo.nickName).toBe('新昵称')
      expect(pageData.userInfo.avatarUrl).toBe('https://example.com/avatar.jpg')
    })

    test('新用户只输入昵称不触发注册', () => {
      // 新用户只输入昵称，不应该触发完整注册
      const pageData = pageFlow.onInputChange('只有昵称')
      
      expect(pageData.hasUserInfo).toBe(false)
      expect(getUserInfo()).toBeNull() // 状态管理中没有信息
    })
  })

  describe('微信授权流程', () => {
    test('用户通过微信授权获取完整信息', () => {
      const wechatUserInfo: UserInfo = {
        nickName: '微信用户',
        avatarUrl: 'https://wx.qlogo.cn/test.jpg',
        gender: 2,
        city: '广州',
        province: '广东',
        country: '中国'
      }

      // 模拟getUserProfile成功
      const pageData = pageFlow.getUserProfile(wechatUserInfo)
      
      expect(pageData.hasUserInfo).toBe(true)
      expect(pageData.userInfo).toEqual(wechatUserInfo)
    })
  })

  describe('复杂用户操作序列', () => {
    test('用户完整使用流程：选择头像 -> 输入昵称 -> 修改头像 -> 修改昵称', () => {
      // 1. 初始状态
      let pageData = pageFlow.syncStateToPage()
      expect(pageData.hasUserInfo).toBe(false)

      // 2. 选择头像和输入昵称完成注册
      pageFlow.onChooseAvatar('https://example.com/avatar1.jpg', '初始用户')
      pageData = pageFlow.syncStateToPage()
      expect(pageData.hasUserInfo).toBe(true)
      expect(pageData.userInfo.nickName).toBe('初始用户')
      expect(pageData.userInfo.avatarUrl).toBe('https://example.com/avatar1.jpg')

      // 3. 修改头像
      pageData = pageFlow.onChooseAvatar('https://example.com/avatar2.jpg')
      expect(pageData.userInfo.nickName).toBe('初始用户') // 昵称不变
      expect(pageData.userInfo.avatarUrl).toBe('https://example.com/avatar2.jpg')

      // 4. 修改昵称
      pageData = pageFlow.onInputChange('修改后用户')
      expect(pageData.userInfo.nickName).toBe('修改后用户')
      expect(pageData.userInfo.avatarUrl).toBe('https://example.com/avatar2.jpg') // 头像不变

      // 5. 验证最终状态
      expect(pageData.hasUserInfo).toBe(true)
      expect(getUserInfo()?.nickName).toBe('修改后用户')
      expect(getUserInfo()?.avatarUrl).toBe('https://example.com/avatar2.jpg')
    })

    test('用户操作错误序列不应该破坏状态一致性', () => {
      // 1. 设置初始用户
      const initialUser: UserInfo = {
        nickName: '稳定用户',
        avatarUrl: 'https://example.com/stable-avatar.jpg'
      }
      setUserInfo(initialUser)

      // 2. 执行一些可能的错误操作
      pageFlow.onChooseAvatar('') // 空头像
      pageFlow.onInputChange('') // 空昵称
      
      // 3. 验证状态保持一致性
      const currentUser = getUserInfo()
      expect(currentUser?.nickName).toBe('') // 昵称被清空
      expect(currentUser?.avatarUrl).toBe('') // 头像被清空
      expect(checkHasUserInfo()).toBe(true) // 但用户信息状态仍存在
    })
  })
})