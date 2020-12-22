import http from "@/network/request";

const AuthProvider = {
  register: (payload) => {
    return http.post('/register', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  login: (payload) => {
    return http.post('/login', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  reset: (payload) => {
    return http.post('/reset', payload)
      .then(res => res.data)
      .catch(err => err)
  }
}

export default AuthProvider
