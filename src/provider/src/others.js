import http from '../../http'
import config from '../../config/index'
const baseUrl = config.apiBaseUrl

export const OthersProvider = {
  search: (payload) => {
    return http.post('search', payload)
      .then(res => res.data)
      .catch(err => err)
  },
}