import http from "@/network/request";

const CourseProvider  = {
  getCourseInfo: (payload) => {
    return http.get('/course/CoursebyID', payload)
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
}

export default CourseProvider
