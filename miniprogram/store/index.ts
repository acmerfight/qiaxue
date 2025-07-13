/**
 * 全局唯一状态管理Store
 * 整个应用只使用这一个store实例
 */

import { createStore, state } from 'ccstate'

// 创建全局唯一Store实例
export const globalStore = createStore()

// App层状态
export const mottoState = state('Hello CCState')

// 所有状态操作都通过这个store进行
export { state } from 'ccstate'