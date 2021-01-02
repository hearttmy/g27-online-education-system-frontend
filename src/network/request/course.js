import http from "@/network/request";

const CourseProvider  = {
  getCourseInfo: (config) => {
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
}

export default CourseProvider
