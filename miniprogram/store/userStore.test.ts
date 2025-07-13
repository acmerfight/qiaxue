/**
 * 集成测试 (15%) - 验证状态管理与用户体验的关键集成点
 * 测试状态变化对用户的影响，而非技术API
 */

import {
  setUserInfo,
  clearUserInfo,
  updateUserAvatar,
  getUserInfo,
  checkHasUserInfo,
  UserInfo
} from './userStore'

describe('用户状态对体验的影响', () => {
  beforeEach(() => {
    clearUserInfo()
  })

  test('用户登录成功后能看到个人信息', () => {
    const userInfo: UserInfo = {
      nickName: '张三',
      avatarUrl: 'https://example.com/avatar.jpg'
    }

    setUserInfo(userInfo)

    expect(checkHasUserInfo()).toBe(true)
    expect(getUserInfo()?.nickName).toBe('张三')
  })

  test('用户换头像后立即在界面生效', () => {
    setUserInfo({
      nickName: '李四',
      avatarUrl: 'https://example.com/old.jpg'
    })

    updateUserAvatar('https://example.com/new.jpg')

    expect(getUserInfo()?.avatarUrl).toBe('https://example.com/new.jpg')
    expect(getUserInfo()?.nickName).toBe('李四')
  })

  test('用户退出登录后回到游客状态', () => {
    setUserInfo({
      nickName: '王五',
      avatarUrl: 'https://example.com/avatar.jpg'
    })
    
    clearUserInfo()

    expect(checkHasUserInfo()).toBe(false)
    expect(getUserInfo()).toBeNull()
  })
})