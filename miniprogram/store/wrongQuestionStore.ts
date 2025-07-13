/**
 * 错题状态管理Store
 */

import { globalStore, state } from './index'
import { 
  WrongQuestion, 
  CreateWrongQuestionInput, 
  WrongQuestionValidationError 
} from '../types/wrongQuestion'

// 本地存储key
const STORAGE_KEY = 'wrongQuestions'

/** 错题列表状态 */
export const wrongQuestionsState = state<WrongQuestion[]>([])

/** 正在加载状态 */
export const loadingState = state<boolean>(false)

/** 表单验证错误状态 */
export const validationErrorState = state<WrongQuestionValidationError>({})

/**
 * 生成唯一ID
 */
function generateId(): string {
  return `wq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 从本地存储加载错题数据
 */
export function loadWrongQuestionsFromStorage(): void {
  try {
    const stored = wx.getStorageSync(STORAGE_KEY)
    if (stored && Array.isArray(stored)) {
      globalStore.set(wrongQuestionsState, stored)
    }
  } catch (error) {
    console.error('加载错题数据失败:', error)
    globalStore.set(wrongQuestionsState, [])
  }
}

/**
 * 保存错题数据到本地存储
 */
function saveWrongQuestionsToStorage(wrongQuestions: WrongQuestion[]): void {
  try {
    wx.setStorageSync(STORAGE_KEY, wrongQuestions)
  } catch (error) {
    console.error('保存错题数据失败:', error)
  }
}

/**
 * 验证错题录入表单
 */
export function validateWrongQuestionForm(input: CreateWrongQuestionInput): WrongQuestionValidationError {
  const errors: WrongQuestionValidationError = {}

  // 验证内容
  if (!input.content || input.content.trim().length === 0) {
    errors.content = '请输入错题内容'
  } else if (input.content.trim().length < 10) {
    errors.content = '错题内容至少需要10个字符'
  }

  // 验证学科
  if (!input.subject || input.subject.trim() === '') {
    errors.subject = '请选择学科'
  }

  // 验证题目类型
  if (!input.questionType || input.questionType.trim() === '') {
    errors.questionType = '请选择题目类型'
  }

  return errors
}

/**
 * 检查表单是否有效
 */
export function isFormValid(errors: WrongQuestionValidationError): boolean {
  return Object.keys(errors).length === 0
}

/**
 * 添加新错题
 */
export function addWrongQuestion(input: CreateWrongQuestionInput): Promise<WrongQuestion> {
  return new Promise((resolve, reject) => {
    // 验证输入
    const validationErrors = validateWrongQuestionForm(input)
    if (!isFormValid(validationErrors)) {
      globalStore.set(validationErrorState, validationErrors)
      reject(new Error('表单验证失败'))
      return
    }

    // 清除验证错误
    globalStore.set(validationErrorState, {})
    
    // 设置加载状态
    globalStore.set(loadingState, true)

    try {
      // 创建新错题
      const now = Date.now()
      const newWrongQuestion: WrongQuestion = {
        id: generateId(),
        content: input.content.trim(),
        subject: input.subject,
        questionType: input.questionType,
        createdAt: now,
        updatedAt: now
      }

      // 更新状态（新错题添加到列表开头）
      const currentList = globalStore.get(wrongQuestionsState)
      const updatedList = [newWrongQuestion, ...currentList]
      globalStore.set(wrongQuestionsState, updatedList)

      // 保存到本地存储
      saveWrongQuestionsToStorage(updatedList)

      globalStore.set(loadingState, false)
      resolve(newWrongQuestion)
    } catch (error) {
      globalStore.set(loadingState, false)
      reject(error)
    }
  })
}

/**
 * 根据ID获取错题
 */
export function getWrongQuestionById(id: string): WrongQuestion | undefined {
  const questions = globalStore.get(wrongQuestionsState)
  return questions.find(q => q.id === id)
}

/**
 * 获取错题总数
 */
export function getWrongQuestionCount(): number {
  return globalStore.get(wrongQuestionsState).length
}

/**
 * 清除验证错误
 */
export function clearValidationErrors(): void {
  globalStore.set(validationErrorState, {})
}

/**
 * 初始化错题存储（应用启动时调用）
 */
export function initWrongQuestionStore(): void {
  loadWrongQuestionsFromStorage()
}