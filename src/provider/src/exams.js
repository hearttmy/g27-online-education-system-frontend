import http from '../../http'
import config from '../../config/index'
const baseUrl = config.apiBaseUrl

export const ExamsProvider = {
  // 创建考试
  addExamPaper: (payload) => {
    return http.post('addExamPaper', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 设置考试
  updateExamPaper: (payload) => {
    return http.post('updateExamPaper', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取某一课程的某一考试
  getExamPaper: (payload) => {
    return http.post('getExamPaper', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取某一课程的所有考试
  getExamPapers: (payload) => {
    return http.post('getExamPapers', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除考试
  delExamPaper: (payload) => {
    return http.post('delExamPaper', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 上传题目的配图
  uploadQuestionImg: (payload) => {
    return http.post('uploadExamQuestionImg', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除上传的题目配图
  delQuestionImg: (payload) => {
    return http.post('delExamQuestionImg', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除上传的题目所有配图
  updatePart: (payload) => {
    return http.post('delExamQuestionImgs', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 考试评分
  handIn: (payload) => {
    return http.post('handIn', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 检查是否可以进入考试
  checkStuCanEnterExam: (payload) => {
    return http.post('checkStuCanEnterExam', payload)
      .then(res => res)
      .catch(err => err)
  },
}
