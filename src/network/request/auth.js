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
    return http.post('/login', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  findPwd(payload) {
    return http.post('/findPwd', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  resetPwd(payload) {
    return http.post('/resetPwd', payload)
      .then(res => res.data)
      .catch(err => err)
  },

}

export default AuthProvider
