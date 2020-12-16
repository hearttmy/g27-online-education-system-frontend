import http from '../../http'
import config from '../../config/index'
const baseUrl = config.apiBaseUrl

export const ExercisesProvider = {
  // 创建作业
  addExercisePaper: (payload) => {
    return http.post('addExercisePaper', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 更新作业
  updateExercisePaper: (payload) => {
    return http.post('updateExercisePaper', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取某一课程的某一作业
  getExercisePaper: (payload) => {
    return http.post('getExercisePaper', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取某一课程的所有作业
  getExercisePapers: (payload) => {
    return http.post('getExercisePapers', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除作业
  delExercisePaper: (payload) => {
    return http.post('delExercisePaper', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 上传题目的配图
  uploadQuestionImg: (payload) => {
    return http.post('uploadExerciseQuestionImg', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除上传的题目配图
  delQuestionImg: (payload) => {
    return http.post('delExerciseQuestionImg', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除上传的题目所有配图
  updatePart: (payload) => {
    return http.post('delExerciseQuestionImgs', payload)
      .then(res => res)
      .catch(err => err)
  },
}