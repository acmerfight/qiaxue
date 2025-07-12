/// <reference path="./types/index.d.ts" />

import { Store, State } from 'ccstate'

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    store: Store,
    mottoState: State<string>,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}