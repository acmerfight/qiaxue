/**
 * 简单的状态管理方案
 * 专为微信小程序环境优化
 */

// 定义应用所有状态的具体类型
interface AppStates {
  motto: string
  userInfo: WechatMiniprogram.UserInfo | null
  wrongQuestions: import('../types/wrongQuestion').WrongQuestion[]
  loading: boolean
  hasUserInfo: boolean
  userAuth: boolean
  validationErrors: import('../types/wrongQuestion').WrongQuestionValidationError
}

type StateKey = keyof AppStates
type StateValue<K extends StateKey> = AppStates[K]

interface State<T> {
  value: T
  listeners: Array<(value: T) => void>
}

export interface Store {
  states: Map<string, State<any>>
  get<K extends StateKey>(key: K): StateValue<K>
  set<K extends StateKey>(key: K, value: StateValue<K>): void
  watch<K extends StateKey>(key: K, listener: (value: StateValue<K>) => void): () => void
}

/**
 * 创建简单状态管理器
 */
export function createSimpleStore(): Store {
  const states = new Map<string, State<any>>()

  // 默认值配置
  const defaultValues: AppStates = {
    motto: 'Hello World',
    userInfo: null,
    wrongQuestions: [],
    loading: false,
    hasUserInfo: false,
    userAuth: false,
    validationErrors: {}
  }

  return {
    states,

    get<K extends StateKey>(key: K): StateValue<K> {
      const state = states.get(key as string)
      if (!state) {
        return defaultValues[key]
      }
      return state.value as StateValue<K>
    },

    set<K extends StateKey>(key: K, value: StateValue<K>): void {
      let state = states.get(key as string)
      if (!state) {
        state = { value, listeners: [] }
        states.set(key as string, state)
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

    watch<K extends StateKey>(key: K, listener: (value: StateValue<K>) => void): () => void {
      let state = states.get(key as string)
      if (!state) {
        const initialValue = this.get(key)
        state = { value: initialValue, listeners: [] }
        states.set(key as string, state)
      }
      
      state.listeners.push(listener as any)
      
      // 返回取消监听的函数
      return () => {
        const currentState = states.get(key as string)
        if (currentState) {
          const index = currentState.listeners.indexOf(listener as any)
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
  MOTTO: 'motto' as const,
  USER_INFO: 'userInfo' as const,
  WRONG_QUESTIONS: 'wrongQuestions' as const,
  LOADING: 'loading' as const,
  HAS_USER_INFO: 'hasUserInfo' as const,
  USER_AUTH: 'userAuth' as const,
  VALIDATION_ERRORS: 'validationErrors' as const
} as const

// 全局唯一store实例
export const globalStore = createSimpleStore()

// 初始化默认状态
globalStore.set(STATE_KEYS.MOTTO, 'Hello World')
globalStore.set(STATE_KEYS.USER_INFO, null)
globalStore.set(STATE_KEYS.WRONG_QUESTIONS, [])
globalStore.set(STATE_KEYS.LOADING, false)
globalStore.set(STATE_KEYS.HAS_USER_INFO, false)
globalStore.set(STATE_KEYS.USER_AUTH, false)
globalStore.set(STATE_KEYS.VALIDATION_ERRORS, {})