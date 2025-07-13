/**
 * 添加错题页面
 */

import { 
  Subject, 
  QuestionType, 
  SUBJECT_NAMES, 
  QUESTION_TYPE_NAMES,
  CreateWrongQuestionInput 
} from '../../types/wrongQuestion'
import {
  loadingState,
  validationErrorState,
  addWrongQuestion,
  clearValidationErrors
} from '../../store/wrongQuestionStore'
import type { WrongQuestionValidationError } from '../../types/wrongQuestion'
import { globalStore } from '../../store/index'

interface FormData {
  content: string
  subject: Subject | ''
  questionType: QuestionType | ''
}

interface SelectOption {
  value: string
  name: string
}

Page({
  data: {
    formData: {
      content: '',
      subject: '',
      questionType: ''
    } as FormData,
    selectedSubjectIndex: -1,
    selectedQuestionTypeIndex: -1,
    subjectOptions: [] as SelectOption[],
    questionTypeOptions: [] as SelectOption[],
    isLoading: false,
    validationErrors: {} as WrongQuestionValidationError
  },

  onLoad() {
    this.initializeOptions()
    this.bindStateToData()
  },

  onUnload() {
    // 清理状态
    clearValidationErrors()
  },

  /**
   * 初始化选择器选项
   */
  initializeOptions() {
    // 学科选项
    const subjectOptions = Object.values(Subject).map(subject => ({
      value: subject,
      name: SUBJECT_NAMES[subject]
    }))

    // 题目类型选项
    const questionTypeOptions = Object.values(QuestionType).map(type => ({
      value: type,
      name: QUESTION_TYPE_NAMES[type]
    }))

    this.setData({
      subjectOptions,
      questionTypeOptions
    })
  },

  /**
   * 绑定状态到页面数据
   */
  bindStateToData() {
    // 加载状态
    globalStore.watch(loadingState, (loading: boolean) => {
      this.setData({ isLoading: loading })
    })

    // 验证错误状态
    globalStore.watch(validationErrorState, (errors: any) => {
      this.setData({ validationErrors: errors })
    })
  },

  /**
   * 错题内容输入处理
   */
  onContentInput(event: WechatMiniprogram.Input) {
    const content = event.detail.value
    this.setData({
      'formData.content': content
    })
    // 实时清除内容验证错误
    if (content.trim().length >= 10) {
      const errors = { ...this.data.validationErrors }
      if (errors.content) {
        delete errors.content
        this.setData({ validationErrors: errors })
      }
    }
  },

  /**
   * 学科选择处理
   */
  onSubjectChange(event: WechatMiniprogram.PickerChange) {
    const index = parseInt(event.detail.value as string)
    const subject = this.data.subjectOptions[index]?.value as Subject

    this.setData({
      selectedSubjectIndex: index,
      'formData.subject': subject
    })

    // 清除学科验证错误
    const errors = { ...this.data.validationErrors }
    if (errors.subject) {
      delete errors.subject
      this.setData({ validationErrors: errors })
    }
  },

  /**
   * 题目类型选择处理
   */
  onQuestionTypeChange(event: WechatMiniprogram.PickerChange) {
    const index = parseInt(event.detail.value as string)
    const questionType = this.data.questionTypeOptions[index]?.value as QuestionType

    this.setData({
      selectedQuestionTypeIndex: index,
      'formData.questionType': questionType
    })

    // 清除题目类型验证错误
    const errors = { ...this.data.validationErrors }
    if (errors.questionType) {
      delete errors.questionType
      this.setData({ validationErrors: errors })
    }
  },

  /**
   * 表单提交处理
   */
  async onSubmit() {
    const { formData } = this.data

    // 构建提交数据
    const submitData: CreateWrongQuestionInput = {
      content: formData.content,
      subject: formData.subject as Subject,
      questionType: formData.questionType as QuestionType
    }

    try {
      // 添加错题
      await addWrongQuestion(submitData)

      // 显示成功提示
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1500
      })

      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1500)

    } catch (error) {
      console.error('保存错题失败:', error)
      
      // 如果不是验证错误，显示通用错误提示
      if (Object.keys(this.data.validationErrors).length === 0) {
        wx.showToast({
          title: '保存失败，请重试',
          icon: 'error',
          duration: 2000
        })
      }
    }
  }
})