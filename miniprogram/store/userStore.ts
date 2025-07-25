/**
 * 用户状态管理
 * 管理用户相关的所有状态
 */

import { globalStore, STATE_KEYS } from './index'

// 状态键 - 使用 STATE_KEYS 中定义的常量
const USER_INFO_KEY = STATE_KEYS.USER_INFO
const HAS_USER_INFO_KEY = STATE_KEYS.HAS_USER_INFO
const USER_AUTH_KEY = STATE_KEYS.USER_AUTH

// 初始化用户相关状态
globalStore.set(HAS_USER_INFO_KEY, false)
globalStore.set(USER_AUTH_KEY, false)

/**
 * 设置用户信息
 */
export function setUserInfo(userInfo: WechatMiniprogram.UserInfo): void {
  globalStore.set(USER_INFO_KEY, userInfo)
  globalStore.set(HAS_USER_INFO_KEY, true)
  globalStore.set(USER_AUTH_KEY, true)
}

/**
 * 清除用户信息
 */
export function clearUserInfo(): void {
  globalStore.set(USER_INFO_KEY, null)
  globalStore.set(HAS_USER_INFO_KEY, false)
  globalStore.set(USER_AUTH_KEY, false)
}

/**
 * 更新用户头像
 */
export function updateUserAvatar(avatarUrl: string): void {
  const currentUserInfo = globalStore.get(USER_INFO_KEY)
  if (currentUserInfo) {
    globalStore.set(USER_INFO_KEY, {
      ...currentUserInfo,
      avatarUrl
    })
  }
}

/**
 * 获取用户信息
 */
export function getUserInfo(): WechatMiniprogram.UserInfo | null {
  return globalStore.get(USER_INFO_KEY)
}

/**
 * 检查是否有用户信息
 */
export function checkHasUserInfo(): boolean {
  return globalStore.get(HAS_USER_INFO_KEY)
}