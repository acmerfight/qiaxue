/**
 * 简单的状态管理方案
 * 专为微信小程序环境优化
 */

interface State<T> {
  value: T
  listeners: Array<(value: T) => void>
}

interface Store {
  states: Map<string, State<unknown>>
  get<T>(key: string): T
  set<T>(key: string, value: T): void
  watch<T>(key: string, listener: (value: T) => void): () => void
}

/**
 * 创建简单状态管理器
 */
export function createSimpleStore(): Store {
  const states = new Map<string, State<unknown>>()

  return {
    states,

    get<T>(key: string): T {
      const state = states.get(key)
      if (!state) {
        // 根据键值返回合理的默认值，避免使用 unknown
        switch (key) {
          case 'wrongQuestions':
            return [] as unknown as T
          case 'loading':
          case 'hasUserInfo':
          case 'userAuth':
            return false as unknown as T
          case 'validationErrors':
            return {} as unknown as T
          case 'userInfo':
            return null as unknown as T
          default:
            return '' as unknown as T
        }
      }
      return state.value as T
    },

    set<T>(key: string, value: T): void {
      let state = states.get(key) as State<T> | undefined
      if (!state) {
        state = { value, listeners: [] }
        states.set(key, state as State<unknown>)
      } else {
        (state as State<T>).value = value
      }
      
      // 通知所有监听器
      ;(state as State<T>).listeners.forEach(listener => {
        try {
          listener(value)
        } catch (error) {
          console.error('状态监听器执行错误:', error)
        }
      })
    },

    watch<T>(key: string, listener: (value: T) => void): () => void {
      let state = states.get(key) as State<T> | undefined
      if (!state) {
        // 创建新状态时使用合理的初始值
        const initialValue = this.get<T>(key)
        state = { value: initialValue, listeners: [] }
        states.set(key, state as State<unknown>)
      }
      
      ;(state as State<T>).listeners.push(listener)
      
      // 返回取消监听的函数
      return () => {
        const currentState = states.get(key) as State<T> | undefined
        if (currentState) {
          const index = (currentState as State<T>).listeners.indexOf(listener)
          if (index > -1) {
            ;(currentState as State<T>).listeners.splice(index, 1)
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