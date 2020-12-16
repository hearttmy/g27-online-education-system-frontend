import http from '../../http'
import config from '../../config/index'
const baseUrl = config.apiBaseUrl

export const ArticleProvider = {
  // 获取文章
  getArticle: (payload) => {
    return http.post('getArticle', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 上传文章
  postArticle: (payload) => {
    return http.post('postArticle', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 上传文章图片
  postArticleImage: (payload) => {
    return http.post('postArticleImage', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除文章
  delArticle: (payload) => {
    return http.post('delArticle', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取 新闻 或者 技术前沿的文章
  getArticles: (payload) => {
    return http.post('getArticles', payload)
      .then(res => res)
      .catch(err => err)
  },

  getQaQuestion: (payload) => {
    return http.post('getQaQuestion', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取全部文章
  getAllArticles: (payload) => {
    return http.post('getAllArticles', payload)
      .then(res => res)
      .catch(err => err)
  },
  // 递增浏览次数
  incViewsCount: (payload) => {
    return http.post('incViewsCount', payload)
      .then(res => res)
      .catch(err => err)
  },
  // 递增浏览次数
  doLikes: (payload) => {
    return http.post('doLikes', payload)
      .then(res => res)
      .catch(err => err)
  },
  // 递增浏览次数
  cancelLikes: (payload) => {
    return http.post('cancelLikes', payload)
      .then(res => res)
      .catch(err => err)
  },
  updateArticle: (payload) => {
    return http.post('updateArticle', payload)
      .then(res => res)
      .catch(err => err)
  }
}