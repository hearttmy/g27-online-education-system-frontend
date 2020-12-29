import http from "@/network/request";

const CourseProvider  = {
  getCourseInfo: (payload) => {
    return http.get('/course/CoursebyID', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  addChapter: (payload) => {
    return http.post('/course/addchapter', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  deleteChapter: (payload) => {
    return http.post('/course/addchapter', payload)
      .then(res => res.data)
      .catch(err => err)
  },
  deleteFile: (payload) => {
    return http.post('/course/addchapter', payload)
      .then(res => res.data)
      .catch(err => err)
  },
}

export default CourseProvider
