/**
 * 添加错题页面
 */

import { 
  Subject
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
  subject: Subject
}


Page({
  data: {
    formData: {
      content: '',
      subject: Subject.MATH
    } as FormData,
    isLoading: false,
    validationErrors: {} as WrongQuestionValidationError
  },

  onLoad(): void {
    this.bindStateToData()
  },

  onUnload(): void {
    // 清理状态
    clearValidationErrors()
  },


  /**
   * 绑定状态到页面数据
   */
  bindStateToData(): void {
    // 加载状态
    globalStore.watch(loadingState, (loading: boolean) => {
      this.setData({ isLoading: loading })
    })

    // 验证错误状态
    globalStore.watch(validationErrorState, (errors: WrongQuestionValidationError) => {
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
   * 表单提交处理
   */
  async onSubmit() {
    const { formData } = this.data

    // 直接提交表单数据，让状态管理层处理验证和转换
    const submitData = formData

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