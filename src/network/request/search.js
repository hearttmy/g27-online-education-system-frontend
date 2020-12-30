import http from "@/network/request";

const SearchProvider = {
  search: (payload) => {
    return http.get('/course/search', payload)
      .then(res => res.data)
      .catch(err => err)
  },
}

export default SearchProvider
