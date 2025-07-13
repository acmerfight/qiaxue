/**
 * 集成测试 (15%) - 验证状态管理与用户体验的关键集成点
 * 测试状态变化对用户的影响，而非技术API
 */

import {
  setUserInfo,
  clearUserInfo,
  updateUserAvatar,
  getUserInfo,
  checkHasUserInfo
} from './userStore'

// 创建测试用用户信息的辅助函数
function createTestUserInfo(overrides: Partial<WechatMiniprogram.UserInfo> = {}): WechatMiniprogram.UserInfo {
  return {
    nickName: '测试用户',
    avatarUrl: 'https://test.com/avatar.jpg',
    city: '',
    country: '',
    gender: 0,
    language: 'zh_CN',
    province: '',
    ...overrides
  }
}

describe('用户状态对体验的影响', () => {
  beforeEach(() => {
    clearUserInfo()
  })

  test('用户登录成功后能看到个人信息', () => {
    const userInfo = createTestUserInfo({
      nickName: '张三',
      avatarUrl: 'https://example.com/avatar.jpg'
    })

    setUserInfo(userInfo)

    expect(checkHasUserInfo()).toBe(true)
    expect(getUserInfo()?.nickName).toBe('张三')
  })

  test('用户换头像后立即在界面生效', () => {
    setUserInfo(createTestUserInfo({
      nickName: '李四',
      avatarUrl: 'https://example.com/old.jpg'
    }))

    updateUserAvatar('https://example.com/new.jpg')

    expect(getUserInfo()?.avatarUrl).toBe('https://example.com/new.jpg')
    expect(getUserInfo()?.nickName).toBe('李四')
  })

  test('用户退出登录后回到游客状态', () => {
    setUserInfo(createTestUserInfo({
      nickName: '王五',
      avatarUrl: 'https://example.com/avatar.jpg'
    }))
    
    clearUserInfo()

    expect(checkHasUserInfo()).toBe(false)
    expect(getUserInfo()).toBeNull()
  })
})