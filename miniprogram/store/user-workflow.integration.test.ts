/**
 * 用户完整操作流程集成测试
 * 测试真实状态变更，无mock，测试用户完整使用场景
 */

import {
  setUserInfo,
  clearUserInfo,
  updateUserAvatar,
  getUserInfo,
  checkHasUserInfo,
  UserInfo
} from './userStore'

describe('用户完整操作流程集成测试', () => {
  beforeEach(() => {
    // 重置状态到初始状态
    clearUserInfo()
  })

  describe('新用户首次使用流程', () => {
    test('用户首次打开应用 -> 选择头像 -> 输入昵称 -> 完成注册', () => {
      // 1. 用户首次打开应用，应该没有用户信息
      expect(checkHasUserInfo()).toBe(false)
      expect(getUserInfo()).toBeNull()

      // 2. 用户选择头像（模拟页面onChooseAvatar逻辑）
      const avatarUrl = 'https://example.com/user-avatar.jpg'
      const nickName = '测试用户'
      
      // 此时还没有完整用户信息，因为只有头像没有昵称
      expect(checkHasUserInfo()).toBe(false)

      // 3. 用户输入昵称并选择头像后，完成注册
      setUserInfo({
        nickName,
        avatarUrl
      })

      // 4. 验证用户注册成功
      expect(checkHasUserInfo()).toBe(true)
      expect(getUserInfo()?.nickName).toBe(nickName)
      expect(getUserInfo()?.avatarUrl).toBe(avatarUrl)
    })

    test('用户通过微信授权获取信息流程', () => {
      // 1. 初始状态
      expect(checkHasUserInfo()).toBe(false)

      // 2. 模拟微信授权成功返回的用户信息
      const wechatUserInfo: UserInfo = {
        nickName: '微信用户',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/test.jpg',
        gender: 1,
        city: '深圳',
        province: '广东',
        country: '中国'
      }

      // 3. 模拟getUserProfile成功回调
      setUserInfo(wechatUserInfo)

      // 4. 验证用户信息正确保存
      expect(checkHasUserInfo()).toBe(true)
      expect(getUserInfo()).toEqual(wechatUserInfo)
      expect(getUserInfo()?.city).toBe('深圳')
      expect(getUserInfo()?.gender).toBe(1)
    })
  })

  describe('老用户返回使用流程', () => {
    const existingUser: UserInfo = {
      nickName: '老用户',
      avatarUrl: 'https://example.com/old-avatar.jpg',
      city: '北京'
    }

    beforeEach(() => {
      // 模拟已有用户信息
      setUserInfo(existingUser)
    })

    test('用户返回应用 -> 加载已有信息 -> 更新头像', () => {
      // 1. 用户返回应用，应该有已保存的用户信息
      expect(checkHasUserInfo()).toBe(true)
      expect(getUserInfo()).toEqual(existingUser)

      // 2. 用户更新头像
      const newAvatarUrl = 'https://example.com/new-avatar.jpg'
      updateUserAvatar(newAvatarUrl)

      // 3. 验证头像更新成功，其他信息保持不变
      expect(getUserInfo()?.avatarUrl).toBe(newAvatarUrl)
      expect(getUserInfo()?.nickName).toBe(existingUser.nickName)
      expect(getUserInfo()?.city).toBe(existingUser.city)
      expect(checkHasUserInfo()).toBe(true)
    })

    test('用户更新完整个人信息流程', () => {
      // 1. 验证初始状态
      expect(getUserInfo()).toEqual(existingUser)

      // 2. 用户更新个人信息
      const updatedUserInfo: UserInfo = {
        ...existingUser,
        nickName: '更新后的昵称',
        avatarUrl: 'https://example.com/updated-avatar.jpg',
        city: '上海'
      }
      
      setUserInfo(updatedUserInfo)

      // 3. 验证信息更新成功
      expect(getUserInfo()).toEqual(updatedUserInfo)
      expect(getUserInfo()?.nickName).toBe('更新后的昵称')
      expect(getUserInfo()?.city).toBe('上海')
      expect(checkHasUserInfo()).toBe(true)
    })
  })

  describe('用户登出和重新登录流程', () => {
    test('用户登出 -> 清除信息 -> 重新登录', () => {
      // 1. 设置初始用户信息
      const userInfo: UserInfo = {
        nickName: '测试用户',
        avatarUrl: 'https://example.com/avatar.jpg'
      }
      setUserInfo(userInfo)
      expect(checkHasUserInfo()).toBe(true)

      // 2. 用户登出，清除所有信息
      clearUserInfo()
      expect(checkHasUserInfo()).toBe(false)
      expect(getUserInfo()).toBeNull()

      // 3. 用户重新登录
      const newUserInfo: UserInfo = {
        nickName: '重新登录用户',
        avatarUrl: 'https://example.com/new-login-avatar.jpg'
      }
      setUserInfo(newUserInfo)

      // 4. 验证重新登录成功
      expect(checkHasUserInfo()).toBe(true)
      expect(getUserInfo()).toEqual(newUserInfo)
    })
  })

  describe('异常情况处理流程', () => {
    test('在没有用户信息时尝试更新头像', () => {
      // 1. 确保没有用户信息
      expect(checkHasUserInfo()).toBe(false)
      expect(getUserInfo()).toBeNull()

      // 2. 尝试更新头像（这应该不会报错，但也不会有效果）
      expect(() => {
        updateUserAvatar('https://example.com/avatar.jpg')
      }).not.toThrow()

      // 3. 验证状态没有变化
      expect(checkHasUserInfo()).toBe(false)
      expect(getUserInfo()).toBeNull()
    })

    test('多次连续状态变更应该保持一致性', () => {
      // 1. 快速连续执行多个状态变更
      const userInfo1: UserInfo = {
        nickName: '用户1',
        avatarUrl: 'https://example.com/avatar1.jpg'
      }
      
      setUserInfo(userInfo1)
      updateUserAvatar('https://example.com/avatar2.jpg')
      
      const userInfo2: UserInfo = {
        ...userInfo1,
        nickName: '用户2',
        avatarUrl: 'https://example.com/avatar3.jpg'
      }
      setUserInfo(userInfo2)

      // 2. 验证最终状态正确
      expect(getUserInfo()).toEqual(userInfo2)
      expect(getUserInfo()?.nickName).toBe('用户2')
      expect(getUserInfo()?.avatarUrl).toBe('https://example.com/avatar3.jpg')
      expect(checkHasUserInfo()).toBe(true)
    })
  })

  describe('状态持久性测试', () => {
    test('状态在多个操作周期中保持持久', () => {
      // 周期1：设置用户信息
      const initialUserInfo: UserInfo = {
        nickName: '持久用户',
        avatarUrl: 'https://example.com/persistent-avatar.jpg'
      }
      setUserInfo(initialUserInfo)
      
      let savedUserInfo = getUserInfo()
      expect(savedUserInfo).toEqual(initialUserInfo)

      // 周期2：更新头像
      updateUserAvatar('https://example.com/updated-persistent-avatar.jpg')
      savedUserInfo = getUserInfo()
      expect(savedUserInfo?.avatarUrl).toBe('https://example.com/updated-persistent-avatar.jpg')
      expect(savedUserInfo?.nickName).toBe('持久用户')

      // 周期3：完整更新
      const finalUserInfo: UserInfo = {
        nickName: '最终用户',
        avatarUrl: 'https://example.com/final-avatar.jpg',
        city: '最终城市'
      }
      setUserInfo(finalUserInfo)
      
      savedUserInfo = getUserInfo()
      expect(savedUserInfo).toEqual(finalUserInfo)
      expect(checkHasUserInfo()).toBe(true)
    })
  })
})