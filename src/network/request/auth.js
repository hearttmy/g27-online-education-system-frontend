import http from "@/network/request";

const AuthProvider = {
  register: (payload) => {
    if (payload.userType === 1) {
      return http.post('/register1', payload)
        .then(res => res.data)
        .catch(err => err)
    }
    else {
      return http.post('/register', payload)
        .then(res => res.data)
        .catch(err => err)
    }
  },
  login: (payload) => {
    if (payload.userType === 1) {
      return http.post('/login1', payload)
        .then(res => res.data)
        .catch(err => err)
    }
    else {
      return http.post('/login', payload)
        .then(res => res.data)
        .catch(err => err)
    }
  },
  reset: (payload) => {
    return http.post('/reset', payload)
      .then(res => res.data)
      .catch(err => err)
  }
}

export default AuthProvider
