/**
 * 状态管理测试
 * 测试 ccstate 的使用和状态变更
 */

import { createStore, state } from 'ccstate'

describe('状态管理', () => {
  let store: ReturnType<typeof createStore>
  
  beforeEach(() => {
    store = createStore()
  })

  test('应该能创建基本的状态', () => {
    const mottoState = state('Hello World')
    
    expect(store.get(mottoState)).toBe('Hello World')
    expect(typeof store.get(mottoState)).toBe('string')
  })

  test('应该能更新状态值', () => {
    const mottoState = state('Hello World')
    
    store.set(mottoState, 'Updated Message')
    
    expect(store.get(mottoState)).toBe('Updated Message')
  })

  test('应该能创建数字类型状态', () => {
    const countState = state(0)
    
    expect(store.get(countState)).toBe(0)
    expect(typeof store.get(countState)).toBe('number')
    
    store.set(countState, 10)
    expect(store.get(countState)).toBe(10)
  })

  test('应该能创建对象类型状态', () => {
    interface UserInfo {
      nickName: string
      avatarUrl: string
    }
    
    const userState = state<UserInfo | null>(null)
    
    expect(store.get(userState)).toBeNull()
    
    const userData: UserInfo = {
      nickName: '测试用户',
      avatarUrl: 'https://example.com/avatar.jpg'
    }
    
    store.set(userState, userData)
    expect(store.get(userState)).toEqual(userData)
    expect(store.get(userState)?.nickName).toBe('测试用户')
  })

  test('应该能创建布尔类型状态', () => {
    const hasUserInfoState = state(false)
    
    expect(store.get(hasUserInfoState)).toBe(false)
    
    store.set(hasUserInfoState, true)
    expect(store.get(hasUserInfoState)).toBe(true)
  })

  test('应该能创建数组类型状态', () => {
    const logsState = state<string[]>([])
    
    expect(store.get(logsState)).toEqual([])
    expect(Array.isArray(store.get(logsState))).toBe(true)
    
    store.set(logsState, ['log1', 'log2', 'log3'])
    expect(store.get(logsState)).toHaveLength(3)
    expect(store.get(logsState)[0]).toBe('log1')
  })
})

describe('全局状态管理', () => {
  test('应该能创建和访问全局状态', () => {
    const globalStore = createStore()
    const globalMotto = state('Hello CCState')
    
    expect(globalStore).toBeDefined()
    expect(globalStore.get(globalMotto)).toBe('Hello CCState')
  })

  test('状态变更应该是响应式的', () => {
    const globalStore = createStore()
    const reactiveState = state('initial')
    let changedValue = ''
    
    // 模拟状态监听
    const originalValue = globalStore.get(reactiveState)
    globalStore.set(reactiveState, 'changed')
    changedValue = globalStore.get(reactiveState)
    
    expect(originalValue).toBe('initial')
    expect(changedValue).toBe('changed')
    expect(globalStore.get(reactiveState)).toBe('changed')
  })
})