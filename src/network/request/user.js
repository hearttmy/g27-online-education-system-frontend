import http from "@/network/request";

const UserProvider = {
  addCourse: (payload, headerConfig) => {
    return http.post('/course/addcourse', payload, headerConfig)
      .then(res => res.data)
      .catch(err => err)
  },
  changeInfo: (payload, headerConfig) => {
    return http.post('/changeInfo', payload, headerConfig)
      .then(res => res.data)
      .catch(err => err)
  },
  changePwd: (payload, headerConfig) => {
    return http.post('/changePwd', payload, headerConfig)
      .then(res => res.data)
      .catch(err => err)
  },
  getMyCourse: (payload, config) => {
    return http.post('/course/myCourse', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
}

export default UserProvider
