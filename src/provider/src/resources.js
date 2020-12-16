import http from '../../http'
import config from '../../config/index'
const baseUrl = config.apiBaseUrl

export const ResourcesProvider = {
  // 教师上传资源
  uploadResources: (payload) => {
    return http.post('uploadResources', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 教师删除单个资源
  delResources: (payload) => {
    return http.post('delResources', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取资源
  getResources: (payload) => {
    return http.post('getResources', payload)
      .then(res => res)
      .catch(err => err)
  },
}