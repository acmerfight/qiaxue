/**
 * 错题相关数据类型定义
 */

/** 学科枚举 */
export enum Subject {
  MATH = 'math'
}

/** 题目类型枚举 */
export enum QuestionType {
  CHOICE = 'choice',           // 选择题
  FILL_BLANK = 'fill_blank',   // 填空题
  CALCULATION = 'calculation', // 计算题
  ESSAY = 'essay',             // 论述题
  EQUATION = 'equation',       // 方程式
  TRANSLATION = 'translation', // 翻译题
  READING = 'reading',         // 阅读理解
  OTHER = 'other'              // 其他
}

/** 学科中文名称映射 */
export const SUBJECT_NAMES: Record<Subject, string> = {
  [Subject.MATH]: '数学'
}

/** 题目类型中文名称映射 */
export const QUESTION_TYPE_NAMES: Record<QuestionType, string> = {
  [QuestionType.CHOICE]: '选择题',
  [QuestionType.FILL_BLANK]: '填空题',
  [QuestionType.CALCULATION]: '计算题',
  [QuestionType.ESSAY]: '论述题',
  [QuestionType.EQUATION]: '方程式',
  [QuestionType.TRANSLATION]: '翻译题',
  [QuestionType.READING]: '阅读理解',
  [QuestionType.OTHER]: '其他'
}

/** 错题数据接口 */
export interface WrongQuestion {
  /** 唯一标识符 */
  id: string
  /** 错题内容描述 */
  content: string
  /** 学科 */
  subject: Subject
  /** 创建时间（时间戳） */
  createdAt: number
  /** 更新时间（时间戳） */
  updatedAt: number
}

/** 创建错题的输入接口 */
export interface CreateWrongQuestionInput {
  /** 错题内容描述 */
  content: string
  /** 学科 */
  subject: Subject
}

/** 创建错题的表单输入接口（允许空值，用于验证） */
export interface CreateWrongQuestionFormInput {
  /** 错题内容描述 */
  content: string
  /** 学科（可能为空字符串） */
  subject: Subject | ''
}

/** 错题表单验证错误 */
export interface WrongQuestionValidationError {
  content?: string
  subject?: string
}