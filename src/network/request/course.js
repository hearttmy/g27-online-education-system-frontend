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
  delHW(payload) {
    return http.post('/course/delHW', payload)
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
  isSubmit: (config) => {
    return http.get('/course/isSubmit', config)
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
  getReply(payload) {
    return http.post('/course/getReply', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  addReply(payload, config) {
    return http.post('/course/addReply', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
  delPost(payload) {
    return http.post('/course/delPost', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  correctHW(payload) {
    return http.post('/course/setGrade', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  getGrade(payload, config) {
    return http.post('/course/getGrade', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
  getAllGrade(payload) {
    return http.post('/course/getallGrade', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  setExamGrade(payload) {
    return http.post('/course/SetExamGrade', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  makeGroup(payload) {
    return http.post('/course/makeGroup', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  getGroup(payload) {
    return http.post('/course/getGroup', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  getStuNoGroup(payload) {
    return http.post('/course/stuNoGroup', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  delGroup(payload) {
    return http.post('/course/delGroup', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  addTA(payload) {
    return http.post('/course/addTA', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  isTA(payload, config) {
    return http.post('/course/isTa', payload, config)
      .then(res => res.data)
      .catch(err => err)
  },
}

export default CourseProvider
