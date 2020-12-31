import http from "@/network/request";

const CourseInfoProvider = {
  IsSelect: (config) => {
    return http.get('/course/isSelect', config)
      .then(res => res.data)
      .catch(err => err)
  },
  JoinCourse: (config) => {
    return http.get('/course/addStudent', config)
      .then(res => res.data)
      .catch(err => err)
  }
}

export default CourseInfoProvider
