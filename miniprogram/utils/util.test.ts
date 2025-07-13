/**
 * 工具函数测试 (5%) - 仅测试用户直接感知的核心功能
 * 只保留对用户体验有直接影响的测试
 */

import { formatTime } from './util'

describe('用户感知的时间显示', () => {
  test('用户能看到正确的时间格式显示', () => {
    const userActionTime = new Date(2023, 11, 25, 14, 30, 45)
    const displayTime = formatTime(userActionTime)
    expect(displayTime).toBe('2023/12/25 14:30:45')
  })

  test('用户在任何时间点都能看到正确格式', () => {
    const earlyMorning = new Date(2023, 0, 5, 9, 8, 7)
    const displayTime = formatTime(earlyMorning)
    expect(displayTime).toBe('2023/01/05 09:08:07')
  })
})