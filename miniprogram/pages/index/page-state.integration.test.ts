/**
 * 用户行为测试 (80%) - 完整的端到端用户使用场景
 * 测试用户真实使用小程序的完整流程和体验
 */

import {
  setUserInfo,
  clearUserInfo,
  getUserInfo,
  checkHasUserInfo,
  UserInfo
} from '../../store/userStore'

// 模拟小程序环境和用户操作
function createMiniProgramEnvironment() {
  return {
    // 模拟小程序启动
    launchMiniProgram() {
      return {
        isFirstTime: !checkHasUserInfo(),
        userInfo: getUserInfo(),
        needsLogin: !checkHasUserInfo()
      }
    },

    // 模拟用户看到的界面状态
    getUserDisplayState() {
      const user = getUserInfo()
      return {
        showLoginPrompt: !checkHasUserInfo(),
        displayName: user?.nickName || '点击登录',
        displayAvatar: user?.avatarUrl || '/images/default-avatar.png',
        canUseFeatures: checkHasUserInfo()
      }
    },

    // 模拟用户执行登录流程
    performUserLogin(userInfo: UserInfo) {
      setUserInfo(userInfo)
      return this.getUserDisplayState()
    },

    // 模拟用户更新个人信息
    updateUserProfile(updates: Partial<UserInfo>) {
      const current = getUserInfo()
      if (current) {
        setUserInfo({ ...current, ...updates })
      }
      return this.getUserDisplayState()
    },

    // 模拟用户退出登录
    performLogout() {
      clearUserInfo()
      return this.getUserDisplayState()
    },

    // 模拟网络异常后恢复
    simulateNetworkRecovery() {
      return {
        userStillLoggedIn: checkHasUserInfo(),
        dataIntact: !!getUserInfo()
      }
    }
  }
}

describe('用户完整使用场景', () => {
  let miniProgram: ReturnType<typeof createMiniProgramEnvironment>

  beforeEach(() => {
    clearUserInfo()
    miniProgram = createMiniProgramEnvironment()
  })

  describe('新用户首次使用小程序', () => {
    test('新用户打开小程序看到登录引导', () => {
      const launchState = miniProgram.launchMiniProgram()
      const displayState = miniProgram.getUserDisplayState()

      expect(launchState.isFirstTime).toBe(true)
      expect(launchState.needsLogin).toBe(true)
      expect(displayState.showLoginPrompt).toBe(true)
      expect(displayState.displayName).toBe('点击登录')
      expect(displayState.canUseFeatures).toBe(false)
    })

    test('新用户完成微信授权登录成功进入应用', () => {
      const newUser: UserInfo = {
        nickName: '新用户小明',
        avatarUrl: 'https://wx.qlogo.cn/mmopen/abc123.jpg'
      }

      const displayState = miniProgram.performUserLogin(newUser)

      expect(displayState.showLoginPrompt).toBe(false)
      expect(displayState.displayName).toBe('新用户小明')
      expect(displayState.displayAvatar).toBe('https://wx.qlogo.cn/mmopen/abc123.jpg')
      expect(displayState.canUseFeatures).toBe(true)
    })

    test('新用户登录后关闭小程序再次打开仍保持登录状态', () => {
      const user: UserInfo = {
        nickName: '持久用户',
        avatarUrl: 'https://example.com/avatar.jpg'
      }
      
      miniProgram.performUserLogin(user)
      
      // 模拟重新打开小程序
      const newSession = createMiniProgramEnvironment()
      const launchState = newSession.launchMiniProgram()
      const displayState = newSession.getUserDisplayState()

      expect(launchState.isFirstTime).toBe(false)
      expect(launchState.needsLogin).toBe(false)
      expect(displayState.canUseFeatures).toBe(true)
      expect(displayState.displayName).toBe('持久用户')
    })
  })

  describe('老用户日常使用场景', () => {
    beforeEach(() => {
      // 模拟已有用户登录状态
      const existingUser: UserInfo = {
        nickName: '老用户张三',
        avatarUrl: 'https://example.com/zhang-avatar.jpg',
        city: '深圳',
        province: '广东'
      }
      setUserInfo(existingUser)
    })

    test('老用户打开小程序直接看到个人信息正常使用', () => {
      const launchState = miniProgram.launchMiniProgram()
      const displayState = miniProgram.getUserDisplayState()

      expect(launchState.isFirstTime).toBe(false)
      expect(launchState.needsLogin).toBe(false)
      expect(displayState.showLoginPrompt).toBe(false)
      expect(displayState.displayName).toBe('老用户张三')
      expect(displayState.canUseFeatures).toBe(true)
    })

    test('老用户更新头像立即在界面生效', () => {
      const newAvatar = 'https://example.com/new-zhang-avatar.jpg'
      
      const displayState = miniProgram.updateUserProfile({ avatarUrl: newAvatar })

      expect(displayState.displayAvatar).toBe(newAvatar)
      expect(displayState.displayName).toBe('老用户张三') // 昵称不变
      expect(displayState.canUseFeatures).toBe(true)
    })

    test('老用户修改昵称后全局生效', () => {
      const displayState = miniProgram.updateUserProfile({ nickName: '张三丰' })

      expect(displayState.displayName).toBe('张三丰')
      expect(displayState.displayAvatar).toBe('https://example.com/zhang-avatar.jpg') // 头像不变
      expect(displayState.canUseFeatures).toBe(true)
    })

    test('老用户主动退出登录回到游客状态', () => {
      const displayState = miniProgram.performLogout()

      expect(displayState.showLoginPrompt).toBe(true)
      expect(displayState.displayName).toBe('点击登录')
      expect(displayState.canUseFeatures).toBe(false)
    })
  })

  describe('异常情况用户体验', () => {
    test('网络异常后恢复，用户登录状态保持完整', () => {
      const user: UserInfo = {
        nickName: '网络测试用户',
        avatarUrl: 'https://example.com/network-test.jpg'
      }
      
      miniProgram.performUserLogin(user)
      
      // 模拟网络异常后恢复
      const recoveryState = miniProgram.simulateNetworkRecovery()
      const displayState = miniProgram.getUserDisplayState()

      expect(recoveryState.userStillLoggedIn).toBe(true)
      expect(recoveryState.dataIntact).toBe(true)
      expect(displayState.displayName).toBe('网络测试用户')
      expect(displayState.canUseFeatures).toBe(true)
    })

    test('数据异常清空后用户看到正确的重新登录提示', () => {
      // 先设置用户登录
      miniProgram.performUserLogin({
        nickName: '异常测试',
        avatarUrl: 'https://example.com/test.jpg'
      })

      // 模拟数据异常清空
      clearUserInfo()
      
      const displayState = miniProgram.getUserDisplayState()

      expect(displayState.showLoginPrompt).toBe(true)
      expect(displayState.displayName).toBe('点击登录')
      expect(displayState.canUseFeatures).toBe(false)
    })
  })

  describe('真实用户使用流程组合', () => {
    test('完整用户生命周期：首次安装 -> 使用 -> 卸载重装 -> 重新登录', () => {
      // 1. 首次安装使用
      let launchState = miniProgram.launchMiniProgram()
      expect(launchState.isFirstTime).toBe(true)

      // 2. 完成登录开始使用
      const user: UserInfo = {
        nickName: '生命周期用户',
        avatarUrl: 'https://example.com/lifecycle.jpg'
      }
      miniProgram.performUserLogin(user)
      
      // 3. 模拟卸载重装（清空本地数据）
      clearUserInfo()
      
      // 4. 重新打开，需要重新登录
      const newInstall = createMiniProgramEnvironment()
      launchState = newInstall.launchMiniProgram()
      expect(launchState.isFirstTime).toBe(true)
      expect(launchState.needsLogin).toBe(true)
      
      // 5. 重新登录成功
      const displayState = newInstall.performUserLogin(user)
      expect(displayState.canUseFeatures).toBe(true)
      expect(displayState.displayName).toBe('生命周期用户')
    })

    test('多次个人信息修改的用户体验连续性', () => {
      // 初始登录
      miniProgram.performUserLogin({
        nickName: '多变用户',
        avatarUrl: 'https://example.com/original.jpg'
      })

      // 连续修改头像
      let state = miniProgram.updateUserProfile({ avatarUrl: 'https://example.com/change1.jpg' })
      expect(state.displayAvatar).toBe('https://example.com/change1.jpg')
      
      state = miniProgram.updateUserProfile({ avatarUrl: 'https://example.com/change2.jpg' })
      expect(state.displayAvatar).toBe('https://example.com/change2.jpg')

      // 修改昵称
      state = miniProgram.updateUserProfile({ nickName: '超级多变用户' })
      expect(state.displayName).toBe('超级多变用户')
      expect(state.displayAvatar).toBe('https://example.com/change2.jpg') // 头像保持

      // 同时修改头像和昵称
      state = miniProgram.updateUserProfile({
        nickName: '最终用户',
        avatarUrl: 'https://example.com/final.jpg'
      })
      expect(state.displayName).toBe('最终用户')
      expect(state.displayAvatar).toBe('https://example.com/final.jpg')
      expect(state.canUseFeatures).toBe(true)
    })
  })
})