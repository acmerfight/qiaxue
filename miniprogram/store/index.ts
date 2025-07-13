/**
 * 全局唯一状态管理Store
 * 整个应用只使用这一个store实例
 */

export { globalStore, STATE_KEYS } from './simpleStore'

// 便于应用使用的状态键
export const MOTTO_STATE = 'motto'