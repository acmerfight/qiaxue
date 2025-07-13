/**
 * 用户状态管理
 * 管理用户相关的所有状态
 */

import { state, createStore } from 'ccstate'

// 创建全局 store 实例
const globalStore = createStore()

export interface UserInfo {
  nickName: string
  avatarUrl: string
  gender?: number
  city?: string
  province?: string
  country?: string
}

// 用户信息状态
export const userInfoState = state<UserInfo | null>(null)

// 是否已获取用户信息
export const hasUserInfoState = state(false)

// 用户授权状态
export const userAuthState = state(false)

/**
 * 设置用户信息
 */
export function setUserInfo(userInfo: UserInfo): void {
  globalStore.set(userInfoState, userInfo)
  globalStore.set(hasUserInfoState, true)
  globalStore.set(userAuthState, true)
}

/**
 * 清除用户信息
 */
export function clearUserInfo(): void {
  globalStore.set(userInfoState, null)
  globalStore.set(hasUserInfoState, false)
  globalStore.set(userAuthState, false)
}

/**
 * 更新用户头像
 */
export function updateUserAvatar(avatarUrl: string): void {
  const currentUserInfo = globalStore.get(userInfoState)
  if (currentUserInfo) {
    globalStore.set(userInfoState, {
      ...currentUserInfo,
      avatarUrl
    })
  }
}

/**
 * 获取用户信息
 */
export function getUserInfo(): UserInfo | null {
  return globalStore.get(userInfoState)
}

/**
 * 检查是否有用户信息
 */
export function checkHasUserInfo(): boolean {
  return globalStore.get(hasUserInfoState)
}