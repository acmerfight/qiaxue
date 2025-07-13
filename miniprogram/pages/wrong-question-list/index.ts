/**
 * 错题列表页面
 */

import { formatTime } from '../../utils/util'
import { 
  WrongQuestion,
  SUBJECT_NAMES, 
  QUESTION_TYPE_NAMES 
} from '../../types/wrongQuestion'
import {
  wrongQuestionsState,
  loadingState,
  initWrongQuestionStore
} from '../../store/wrongQuestionStore'
import { globalStore } from '../../store/index'

interface WrongQuestionDisplay extends WrongQuestion {
  subjectName: string
  questionTypeName: string
  timeDisplay: string
}

Page({
  data: {
    wrongQuestions: [] as WrongQuestionDisplay[],
    isLoading: true
  },

  onLoad() {
    this.initializeData()
    this.bindStateToData()
  },

  onShow() {
    // 页面显示时重新加载数据（从添加页面返回时）
    this.loadWrongQuestions()
  },

  /**
   * 初始化数据
   */
  initializeData() {
    // 初始化错题存储
    initWrongQuestionStore()
    this.loadWrongQuestions()
  },

  /**
   * 绑定状态到页面数据
   */
  bindStateToData() {
    // 监听错题列表状态变化
    globalStore.watch((get: any) => {
      const questions = get(wrongQuestionsState)
      this.formatAndSetQuestions(questions)
    })

    // 监听加载状态
    globalStore.watch((get: any) => {
      const loading = get(loadingState)
      this.setData({ isLoading: loading })
    })
  },

  /**
   * 加载错题数据
   */
  loadWrongQuestions() {
    const questions = globalStore.get(wrongQuestionsState)
    this.formatAndSetQuestions(questions)
    this.setData({ isLoading: false })
  },

  /**
   * 格式化并设置错题数据
   */
  formatAndSetQuestions(questions: WrongQuestion[]) {
    const formattedQuestions: WrongQuestionDisplay[] = questions.map(question => ({
      ...question,
      subjectName: SUBJECT_NAMES[question.subject],
      questionTypeName: QUESTION_TYPE_NAMES[question.questionType],
      timeDisplay: this.formatQuestionTime(question.createdAt)
    }))

    this.setData({
      wrongQuestions: formattedQuestions
    })
  },

  /**
   * 格式化时间显示
   */
  formatQuestionTime(timestamp: number): string {
    const now = Date.now()
    const diff = now - timestamp
    
    // 1分钟内
    if (diff < 60 * 1000) {
      return '刚刚'
    }
    
    // 1小时内
    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000))
      return `${minutes}分钟前`
    }
    
    // 24小时内
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000))
      return `${hours}小时前`
    }
    
    // 超过24小时，显示具体日期
    return formatTime(new Date(timestamp))
  },

  /**
   * 点击添加错题按钮
   */
  onAddQuestion() {
    wx.navigateTo({
      url: '/pages/add-wrong-question/index'
    })
  },

  /**
   * 点击错题项
   */
  onQuestionTap(event: WechatMiniprogram.TouchEvent) {
    const { id } = event.currentTarget.dataset
    if (id) {
      wx.navigateTo({
        url: `/pages/wrong-question-detail/index?id=${id}`
      })
    }
  }
})