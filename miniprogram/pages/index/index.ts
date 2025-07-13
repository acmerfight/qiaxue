// index.ts
import { 
  setUserInfo, 
  updateUserAvatar, 
  getUserInfo, 
  checkHasUserInfo
} from '../../store/userStore'

// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },

  methods: {
    // 同步状态到页面
    syncStateToPage(): void {
      const userInfo = getUserInfo()
      const hasUserInfo = checkHasUserInfo()
      
      this.setData({
        userInfo: userInfo || {
          avatarUrl: defaultAvatarUrl,
          nickName: '',
        },
        hasUserInfo
      })
    },
    
    onLoad(): void {
      // 页面初始化时同步状态
      this.syncStateToPage()
      
      // 获取motto状态
      const globalData = app.globalData
      if (globalData.store) {
        const motto = globalData.store.get('motto')
        this.setData({ motto })
      }
    },

    // 事件处理函数
    bindViewTap(): void {
      // 使用全局状态管理
      const globalData = app.globalData
      if (globalData.store) {
        globalData.store.set('motto', '简单状态管理成功！')
        const newMotto = globalData.store.get('motto')
        this.setData({ motto: newMotto })
      }
      
      wx.navigateTo({
        url: '../logs/logs',
      })
    },

    onChooseAvatar(e: WechatMiniprogram.CustomEvent<{avatarUrl: string}>) {
      const { avatarUrl } = e.detail
      const currentUserInfo = getUserInfo()
      
      if (currentUserInfo) {
        // 更新现有用户头像
        updateUserAvatar(avatarUrl)
      } else {
        // 创建新用户信息
        const { nickName } = this.data.userInfo
        if (nickName && avatarUrl !== defaultAvatarUrl) {
          setUserInfo({
            nickName,
            avatarUrl,
            city: '',
            country: '',
            gender: 0,
            language: 'zh_CN',
            province: ''
          })
        }
      }
      
      // 同步状态到页面
      this.syncStateToPage()
    },

    onInputChange(e: WechatMiniprogram.Input) {
      const nickName = e.detail.value
      const currentUserInfo = getUserInfo()
      
      if (currentUserInfo) {
        // 更新现有用户昵称
        setUserInfo({
          ...currentUserInfo,
          nickName
        })
      } else {
        // 临时更新页面显示，等待头像选择完成后统一保存
        this.setData({
          "userInfo.nickName": nickName
        })
      }
      
      // 同步状态到页面
      this.syncStateToPage()
    },

    getUserProfile(): void {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          // 使用状态管理保存用户信息
          const userInfo: WechatMiniprogram.UserInfo = {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            gender: res.userInfo.gender,
            city: res.userInfo.city,
            province: res.userInfo.province,
            country: res.userInfo.country,
            language: res.userInfo.language || 'zh_CN'
          }
          setUserInfo(userInfo)
          
          // 同步状态到页面
          this.syncStateToPage()
        },
        fail: (err) => {
          console.error('获取用户信息失败:', err)
        }
      })
    },

    /**
     * 跳转到错题本页面
     */
    goToWrongQuestions(): void {
      wx.navigateTo({
        url: '/pages/wrong-question-list/index'
      })
    },
  },
})
