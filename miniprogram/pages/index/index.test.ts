/**
 * index 页面集成测试
 * 测试页面逻辑和状态管理的集成
 */

import {
  setUserInfo,
  clearUserInfo,
  updateUserAvatar,
  getUserInfo,
  checkHasUserInfo,
  UserInfo
} from '../../store/userStore'

// 模拟微信 API
const mockWx = {
  getUserProfile: jest.fn(),
  chooseMedia: jest.fn(),
  navigateTo: jest.fn()
}

// 替换全局 wx 对象
;(global as any).wx = mockWx

describe('index 页面逻辑测试', () => {
  beforeEach(() => {
    // 重置状态和 mock
    clearUserInfo()
    jest.clearAllMocks()
  })

  test('初始状态应该正确', () => {
    expect(checkHasUserInfo()).toBe(false)
    expect(getUserInfo()).toBeNull()
  })

  test('获取用户信息成功后应该更新状态', () => {
    const mockUserInfo: UserInfo = {
      nickName: '测试用户',
      avatarUrl: 'https://example.com/avatar.jpg'
    }

    // 模拟 getUserProfile 成功
    mockWx.getUserProfile.mockImplementation((options: any) => {
      options.success({
        userInfo: mockUserInfo
      })
    })

    // 模拟调用页面的 getUserProfile 方法
    const getUserProfileOptions = {
      desc: '展示用户信息',
      success: (res: any) => {
        setUserInfo(res.userInfo)
      },
      fail: (err: any) => {
        console.error('获取用户信息失败:', err)
      }
    }

    mockWx.getUserProfile(getUserProfileOptions)

    expect(getUserInfo()).toEqual(mockUserInfo)
    expect(checkHasUserInfo()).toBe(true)
  })

  test('获取用户信息失败应该正确处理', () => {
    const mockError = new Error('用户拒绝授权')

    // 模拟 getUserProfile 失败
    mockWx.getUserProfile.mockImplementation((options: any) => {
      options.fail(mockError)
    })

    // 模拟调用页面的 getUserProfile 方法
    const getUserProfileOptions = {
      desc: '展示用户信息',
      success: (res: any) => {
        setUserInfo(res.userInfo)
      },
      fail: (err: any) => {
        console.error('获取用户信息失败:', err)
      }
    }

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    mockWx.getUserProfile(getUserProfileOptions)

    expect(consoleSpy).toHaveBeenCalledWith('获取用户信息失败:', mockError)
    expect(getUserInfo()).toBeNull()
    expect(checkHasUserInfo()).toBe(false)

    consoleSpy.mockRestore()
  })

  test('选择头像成功后应该更新用户头像', () => {
    // 先设置用户信息
    const initialUserInfo: UserInfo = {
      nickName: '测试用户',
      avatarUrl: 'https://example.com/old-avatar.jpg'
    }
    setUserInfo(initialUserInfo)

    const newAvatarUrl = 'https://example.com/new-avatar.jpg'

    // 模拟 chooseMedia 成功
    mockWx.chooseMedia.mockImplementation((options: any) => {
      options.success({
        tempFiles: [{ tempFilePath: newAvatarUrl }]
      })
    })

    // 模拟调用页面的 onChooseAvatar 方法
    const onChooseAvatarOptions = {
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res: any) => {
        if (res.tempFiles && res.tempFiles.length > 0) {
          updateUserAvatar(res.tempFiles[0].tempFilePath)
        }
      },
      fail: (err: any) => {
        console.error('选择头像失败:', err)
      }
    }

    mockWx.chooseMedia(onChooseAvatarOptions)

    expect(getUserInfo()?.avatarUrl).toBe(newAvatarUrl)
    expect(getUserInfo()?.nickName).toBe('测试用户')
  })

  test('页面跳转应该正确调用导航 API', () => {
    // 模拟页面跳转
    const bindViewTap = () => {
      wx.navigateTo({
        url: '../logs/logs',
        fail: (err) => {
          console.error('导航失败:', err)
        }
      })
    }

    mockWx.navigateTo.mockImplementation((options: any) => {
      // 模拟导航成功
      expect(options.url).toBe('../logs/logs')
    })

    bindViewTap()

    expect(mockWx.navigateTo).toHaveBeenCalledWith({
      url: '../logs/logs',
      fail: expect.any(Function)
    })
  })

  test('页面跳转失败应该正确处理错误', () => {
    const mockError = new Error('页面不存在')

    mockWx.navigateTo.mockImplementation((options: any) => {
      options.fail(mockError)
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    // 模拟页面跳转失败
    const bindViewTap = () => {
      wx.navigateTo({
        url: '../logs/logs',
        fail: (err) => {
          console.error('导航失败:', err)
        }
      })
    }

    bindViewTap()

    expect(consoleSpy).toHaveBeenCalledWith('导航失败:', mockError)

    consoleSpy.mockRestore()
  })

  test('应该能正确处理多次状态变更', () => {
    // 第一次设置用户信息
    const firstUserInfo: UserInfo = {
      nickName: '用户1',
      avatarUrl: 'https://example.com/avatar1.jpg'
    }
    setUserInfo(firstUserInfo)

    expect(getUserInfo()).toEqual(firstUserInfo)
    expect(checkHasUserInfo()).toBe(true)

    // 更新头像
    const newAvatarUrl = 'https://example.com/avatar2.jpg'
    updateUserAvatar(newAvatarUrl)

    expect(getUserInfo()?.avatarUrl).toBe(newAvatarUrl)
    expect(getUserInfo()?.nickName).toBe('用户1')

    // 清除用户信息
    clearUserInfo()

    expect(getUserInfo()).toBeNull()
    expect(checkHasUserInfo()).toBe(false)
  })
})