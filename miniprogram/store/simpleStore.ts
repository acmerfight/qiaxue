/**
 * 简单的状态管理方案 - 替代ccstate
 * 专为微信小程序环境优化
 */

interface State<T> {
  value: T
  listeners: Array<(value: T) => void>
}

interface Store {
  states: Map<string, State<any>>
  get<T>(key: string): T
  set<T>(key: string, value: T): void
  watch<T>(key: string, listener: (value: T) => void): () => void
}

/**
 * 创建简单状态管理器
 */
export function createSimpleStore(): Store {
  const states = new Map<string, State<any>>()

  return {
    states,

    get<T>(key: string): T {
      const state = states.get(key)
      return state ? state.value : ([] as any)
    },

    set<T>(key: string, value: T): void {
      let state = states.get(key)
      if (!state) {
        state = { value, listeners: [] }
        states.set(key, state)
      } else {
        state.value = value
      }
      
      // 通知所有监听器
      state.listeners.forEach(listener => {
        try {
          listener(value)
        } catch (error) {
          console.error('状态监听器执行错误:', error)
        }
      })
    },

    watch<T>(key: string, listener: (value: T) => void): () => void {
      let state = states.get(key)
      if (!state) {
        state = { value: undefined, listeners: [] }
        states.set(key, state)
      }
      
      state.listeners.push(listener)
      
      // 返回取消监听的函数
      return () => {
        const currentState = states.get(key)
        if (currentState) {
          const index = currentState.listeners.indexOf(listener)
          if (index > -1) {
            currentState.listeners.splice(index, 1)
          }
        }
      }
    }
  }
}

// 全局状态键
export const STATE_KEYS = {
  MOTTO: 'motto',
  USER_INFO: 'userInfo',
  WRONG_QUESTIONS: 'wrongQuestions',
  LOADING: 'loading',
  VALIDATION_ERRORS: 'validationErrors'
} as const

// 全局唯一store实例
export const globalStore = createSimpleStore()

// 初始化默认状态
globalStore.set(STATE_KEYS.MOTTO, 'Hello World')
globalStore.set(STATE_KEYS.USER_INFO, null)
globalStore.set(STATE_KEYS.WRONG_QUESTIONS, [])
globalStore.set(STATE_KEYS.LOADING, false)
globalStore.set(STATE_KEYS.VALIDATION_ERRORS, {})