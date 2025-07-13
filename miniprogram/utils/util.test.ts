/**
 * util.ts 单元测试
 * 测试时间格式化功能
 */

import { formatTime, formatNumber } from './util'

describe('formatTime', () => {
  test('应该正确格式化标准时间', () => {
    const date = new Date(2023, 11, 25, 14, 30, 45) // 2023年12月25日 14:30:45
    const result = formatTime(date)
    expect(result).toBe('2023/12/25 14:30:45')
  })

  test('应该为单位数字补零', () => {
    const date = new Date(2023, 0, 5, 9, 8, 7) // 2023年1月5日 09:08:07
    const result = formatTime(date)
    expect(result).toBe('2023/01/05 09:08:07')
  })

})

describe('formatNumber', () => {
  test('应该为单位数字补零', () => {
    expect(formatNumber(5)).toBe('05')
    expect(formatNumber(0)).toBe('00')
    expect(formatNumber(9)).toBe('09')
  })

  test('应该保持两位数不变', () => {
    expect(formatNumber(10)).toBe('10')
    expect(formatNumber(25)).toBe('25')
    expect(formatNumber(99)).toBe('99')
  })

  test('应该处理大于两位数的数字', () => {
    expect(formatNumber(100)).toBe('100')
    expect(formatNumber(999)).toBe('999')
  })

})