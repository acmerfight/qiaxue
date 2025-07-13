/// <reference path="./types/index.d.ts" />

declare global {
  interface IAppOption {
    globalData: {
      userInfo?: WechatMiniprogram.UserInfo,
      store?: import('../miniprogram/store/simpleStore').Store,
      mottoState?: string,
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  }
  
  // 为状态管理库提供 AbortSignal 类型支持
  interface AbortSignal {
    readonly aborted: boolean
    addEventListener(type: 'abort', listener: () => void): void
    removeEventListener(type: 'abort', listener: () => void): void
  }
}

export {}