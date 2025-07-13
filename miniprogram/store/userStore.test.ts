/**
 * 用户状态管理测试
 * 测试用户相关状态的管理逻辑
 */

import {
  setUserInfo,
  clearUserInfo,
  updateUserAvatar,
  getUserInfo,
  checkHasUserInfo,
  UserInfo
} from './userStore'

describe('用户状态管理', () => {
  beforeEach(() => {
    // 每个测试前重置状态
    clearUserInfo()
  })

  test('初始状态应该正确', () => {
    expect(getUserInfo()).toBeNull()
    expect(checkHasUserInfo()).toBe(false)
  })

  test('setUserInfo 应该正确设置用户信息', () => {
    const userInfo: UserInfo = {
      nickName: '测试用户',
      avatarUrl: 'https://example.com/avatar.jpg',
      gender: 1,
      city: '深圳',
      province: '广东',
      country: '中国'
    }

    setUserInfo(userInfo)

    expect(getUserInfo()).toEqual(userInfo)
    expect(checkHasUserInfo()).toBe(true)
  })

  test('clearUserInfo 应该清除所有用户信息', () => {
    const userInfo: UserInfo = {
      nickName: '测试用户',
      avatarUrl: 'https://example.com/avatar.jpg'
    }

    setUserInfo(userInfo)
    expect(checkHasUserInfo()).toBe(true)

    clearUserInfo()

    expect(getUserInfo()).toBeNull()
    expect(checkHasUserInfo()).toBe(false)
  })

  test('updateUserAvatar 应该更新用户头像', () => {
    const userInfo: UserInfo = {
      nickName: '测试用户',
      avatarUrl: 'https://example.com/old-avatar.jpg'
    }

    setUserInfo(userInfo)

    const newAvatarUrl = 'https://example.com/new-avatar.jpg'
    updateUserAvatar(newAvatarUrl)

    expect(getUserInfo()?.avatarUrl).toBe(newAvatarUrl)
    expect(getUserInfo()?.nickName).toBe('测试用户') // 其他信息保持不变
  })

  test('updateUserAvatar 在无用户信息时不应该报错', () => {
    expect(getUserInfo()).toBeNull()

    expect(() => {
      updateUserAvatar('https://example.com/avatar.jpg')
    }).not.toThrow()

    expect(getUserInfo()).toBeNull()
  })


  test('应该处理只有必填字段的用户信息', () => {
    const minimalUserInfo: UserInfo = {
      nickName: '最小用户',
      avatarUrl: 'https://example.com/min-avatar.jpg'
    }

    setUserInfo(minimalUserInfo)

    expect(getUserInfo()).toEqual(minimalUserInfo)
    expect(getUserInfo()?.gender).toBeUndefined()
    expect(getUserInfo()?.city).toBeUndefined()
  })
})