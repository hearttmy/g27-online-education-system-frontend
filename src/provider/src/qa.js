import http from '../../http'
import config from '../../config/index'
const baseUrl = config.apiBaseUrl

export const QaProvider = {
  uploadQaQuestion: (payload) => {
    return http.post('uploadQaQuestion', payload)
      .then(res => res)
      .catch(err => err)
  },

  delQaQuestion: (payload) => {
    return http.post('delQaQuestion', payload)
      .then(res => res)
      .catch(err => err)
  },

  modifyQaQuestion: (payload) => {
    return http.post('modifyQaQuestion', payload)
      .then(res => res)
      .catch(err => err)
  },

  deleteQuestionReply: (payload) => {
    return http.post('deleteQuestionReply', payload)
      .then(res => res)
      .catch(err => err)
  },

  uploadQaImage: (payload) => {
    return http.post('uploadQaImage', payload)
      .then(res => res)
      .catch(err => err)
  },

  getQaQuestion: (payload) => {
    return http.post('getQaQuestion', payload)
      .then(res => res)
      .catch(err => err)
  },

  updateQuestionReplys: (payload) => {
    return http.post('updateQuestionReplys', payload)
      .then(res => res)
      .catch(err => err)
  },
  getSize: () => {
    return http.get('getSize')
      .then(res => res)
      .catch(err => err)
  },
  getQaQuestions: () => {
    return http.post('getQaQuestions')
      .then(res => res)
      .catch(err => err)
  },
}