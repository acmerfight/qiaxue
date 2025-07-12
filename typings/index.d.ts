/// <reference path="./types/index.d.ts" />

import { Store, State } from 'ccstate'

declare global {
  interface IAppOption {
    globalData: {
      userInfo?: WechatMiniprogram.UserInfo,
      store: Store,
      mottoState: State<string>,
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  }
  
  // 为 ccstate 库提供 AbortSignal 类型支持
  interface AbortSignal {
    readonly aborted: boolean
    addEventListener(type: 'abort', listener: () => void): void
    removeEventListener(type: 'abort', listener: () => void): void
  }
}

export {}