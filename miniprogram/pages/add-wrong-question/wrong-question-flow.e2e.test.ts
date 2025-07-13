/**
 * 错题录入功能端到端测试
 * 测试完整的用户流程：录入 → 列表 → 验证
 */

import { Subject, WrongQuestion, CreateWrongQuestionFormInput } from '../../types/wrongQuestion'
import {
  wrongQuestionsState,
  addWrongQuestion,
  initWrongQuestionStore,
  getWrongQuestionCount
} from '../../store/wrongQuestionStore'
import { globalStore } from '../../store/index'

describe('错题录入完整用户流程', () => {
  
  beforeEach(() => {
    // 清理状态
    globalStore.set(wrongQuestionsState, [])
    
    // 模拟微信存储API
    jest.spyOn(wx, 'getStorageSync').mockReturnValue([])
    jest.spyOn(wx, 'setStorageSync').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('新用户首次使用流程', () => {
    test('用户能完整走通：录入 → 保存 → 查看列表的流程', async () => {
      // Given: 新用户打开小程序
      initWrongQuestionStore()
      expect(getWrongQuestionCount()).toBe(0)

      // When: 用户填写并提交错题表单
      const wrongQuestionInput = {
        content: '解方程：2x + 3 = 7，我算成了 x = 1，正确答案是 x = 2',
        subject: Subject.MATH
      }

      const savedQuestion = await addWrongQuestion(wrongQuestionInput)

      // Then: 错题成功保存
      expect(savedQuestion).toBeDefined()
      expect(savedQuestion.content).toBe(wrongQuestionInput.content)
      expect(savedQuestion.subject).toBe(Subject.MATH)

      // And: 错题出现在列表中
      expect(getWrongQuestionCount()).toBe(1)
      const questions = globalStore.get(wrongQuestionsState) as WrongQuestion[]
      expect(questions[0]).toEqual(savedQuestion)

      // And: 数据持久化到本地
      expect(wx.setStorageSync).toHaveBeenCalledWith(
        'wrongQuestions',
        expect.arrayContaining([
          expect.objectContaining({
            content: wrongQuestionInput.content,
            subject: Subject.MATH
          })
        ])
      )
    })

    test('用户看到空状态提示并能添加第一道错题', () => {
      // Given: 新用户首次打开错题本
      initWrongQuestionStore()
      
      // Then: 用户看到空状态
      expect(getWrongQuestionCount()).toBe(0)
      
      // When: 用户点击"添加第一道错题"按钮
      // (在实际页面中会触发导航到添加页面)
      // 这里模拟用户完成添加流程
      return addWrongQuestion({
        content: '这是我的第一道错题，关于基础数学计算',
        subject: Subject.MATH
      }).then(() => {
        // Then: 错题成功添加
        expect(getWrongQuestionCount()).toBe(1)
      })
    })
  })

  describe('用户录入错题验证场景', () => {
    test('用户输入内容少于10字符时看到错误提示', async () => {
      const shortInput = {
        content: '太短了',
        subject: Subject.MATH
      }

      try {
        await addWrongQuestion(shortInput)
        fail('应该抛出验证错误')
      } catch (error) {
        // Then: 验证失败，不保存数据
        expect(getWrongQuestionCount()).toBe(0)
        expect((error as Error).message).toBe('表单验证失败')
      }
    })

    test('用户未选择学科时看到错误提示', async () => {
      const noSubjectInput = {
        content: '这是一道没有选择学科的错题内容',
        subject: '' as const
      } satisfies CreateWrongQuestionFormInput

      try {
        await addWrongQuestion(noSubjectInput)
        fail('应该抛出验证错误')
      } catch (error) {
        // Then: 验证失败，不保存数据
        expect(getWrongQuestionCount()).toBe(0)
        expect((error as Error).message).toBe('表单验证失败')
      }
    })

  })

  describe('日常使用流程', () => {
    test('老用户添加新错题到已有列表', async () => {
      // Given: 用户已有2道错题
      await addWrongQuestion({
        content: '第一道历史错题，关于中国古代历史',
        subject: Subject.HISTORY
      })
      
      await addWrongQuestion({
        content: '第二道物理错题，关于力学计算',
        subject: Subject.PHYSICS
      })

      expect(getWrongQuestionCount()).toBe(2)

      // When: 用户添加第三道错题
      const newQuestion = await addWrongQuestion({
        content: '第三道英语错题，关于语法选择',
        subject: Subject.ENGLISH
      })

      // Then: 新错题添加到列表开头
      expect(getWrongQuestionCount()).toBe(3)
      const questions = globalStore.get(wrongQuestionsState) as WrongQuestion[]
      expect(questions[0]).toEqual(newQuestion)
      expect(questions[0].subject).toBe(Subject.ENGLISH)
    })

    test('用户能看到错题按时间倒序排列', async () => {
      const baseTime = Date.now()
      
      // 模拟时间流逝，添加三道错题
      jest.spyOn(Date, 'now')
        .mockReturnValueOnce(baseTime)
        .mockReturnValueOnce(baseTime + 1000)
        .mockReturnValueOnce(baseTime + 2000)

      const question1 = await addWrongQuestion({
        content: '最早的错题内容足够长',
        subject: Subject.MATH
      })

      const question2 = await addWrongQuestion({
        content: '中间的错题内容足够长',
        subject: Subject.PHYSICS
      })

      const question3 = await addWrongQuestion({
        content: '最新的错题内容足够长',
        subject: Subject.ENGLISH
      })

      // Then: 错题按时间倒序排列（最新的在前）
      const questions = globalStore.get(wrongQuestionsState) as WrongQuestion[]
      expect(questions[0]).toEqual(question3) // 最新
      expect(questions[1]).toEqual(question2) // 中间
      expect(questions[2]).toEqual(question1) // 最早

      jest.restoreAllMocks()
    })
  })

  describe('数据持久化验证', () => {
    test('应用重启后能恢复错题数据', async () => {
      // Given: 用户添加了错题
      const originalQuestion = await addWrongQuestion({
        content: '测试持久化的错题内容',
        subject: Subject.CHINESE
      })

      // When: 模拟应用重启，从存储中恢复数据
      const storedData = [originalQuestion]
      jest.spyOn(wx, 'getStorageSync').mockReturnValue(storedData)
      
      globalStore.set(wrongQuestionsState, []) // 清空内存状态
      initWrongQuestionStore() // 重新初始化

      // Then: 错题数据成功恢复
      expect(getWrongQuestionCount()).toBe(1)
      const questions = globalStore.get(wrongQuestionsState) as WrongQuestion[]
      expect(questions[0]).toEqual(originalQuestion)
    })

    test('存储损坏时能优雅降级', () => {
      // Given: 存储数据损坏
      jest.spyOn(wx, 'getStorageSync').mockReturnValue(null)
      
      // When: 初始化错题存储
      globalStore.set(wrongQuestionsState, [])
      initWrongQuestionStore()

      // Then: 应用正常运行，显示空状态
      expect(getWrongQuestionCount()).toBe(0)
      expect(globalStore.get(wrongQuestionsState)).toEqual([])
    })
  })
})