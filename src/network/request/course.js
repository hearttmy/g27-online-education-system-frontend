import http from "@/network/request";

const CourseProvider  = {
  getCourseInfo(config) {
    return http.get('/course/CoursebyID', config)
      .then(res => res.data)
      .catch(err => err)
  },
  addChapter: (payload, config) => {
    return http.post('/course/addchapter', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
  deleteChapter: (payload, config) => {
    return http.post('/course/delchapter', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
  deleteFile: (payload, config) => {
    return http.post('/course/delFile', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
  addHW: (payload, config) => {
    return http.post('/course/addHW', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
  getHW: (config) => {
    return http.get('/course/getHW', config)
      .then(res => res.data)
      .catch(err => err)
  },
  isTeacher: (config) => {
    return http.get('/course/isTeacher', config)
      .then(res => res.data)
      .catch(err => err)
  },
  mySubmit: (config) => {
    return http.get('/course/MySubmit', config)
      .then(res => res.data)
      .catch(err => err)
  },
  getSubmit: (config) => {
    return http.get('/course/getSubmit', config)
      .then(res => res.data)
      .catch(err => err)
  },
  deleteSubmitFile: (payload, config) => {
    return http.post('/course/delSubmitHW', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
  addBulletins: (payload) => {
    return http.post('/course/addBulletins', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  getBulletins: (payload) => {
    return http.post('/course/getBulletins', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  delBulletins: (payload) => {
    return http.post('/course/delBulletins', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  editInfo: (payload) => {
    return http.post('/course/changeInfo', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  addPost: (payload, config) => {
    return http.post('/course/addPost', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
  getPost(payload) {
    return http.post('/course/getPost', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  getMyPost: (payload, config) => {
    return http.post('/course/getMyPost', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
}

export default CourseProvider
