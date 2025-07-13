/**
 * 工具函数单元测试
 * 测试纯函数逻辑，快速验证基础功能
 */

import { formatTime, formatNumber } from '../utils/util'

describe('工具函数单元测试', () => {
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

  describe('formatTime', () => {
    test('应该正确格式化标准时间', () => {
      const date = new Date(2023, 11, 25, 14, 30, 45)
      expect(formatTime(date)).toBe('2023/12/25 14:30:45')
    })

    test('应该为单位数字补零', () => {
      const date = new Date(2023, 0, 5, 9, 8, 7)
      expect(formatTime(date)).toBe('2023/01/05 09:08:07')
    })

    test('应该正确处理边界时间', () => {
      const midnight = new Date(2023, 5, 15, 0, 0, 0)
      expect(formatTime(midnight)).toBe('2023/06/15 00:00:00')
      
      const yearEnd = new Date(2023, 11, 31, 23, 59, 59)
      expect(formatTime(yearEnd)).toBe('2023/12/31 23:59:59')
    })

    test('应该正确处理闰年', () => {
      const leapYear = new Date(2024, 1, 29, 12, 0, 0)
      expect(formatTime(leapYear)).toBe('2024/02/29 12:00:00')
    })
  })
})