import http from "@/network/request";

const CourseListProvider = {
  getCourseByType: (payload) => {
    return http.get('/course/CoursebyType', payload)
      .then(res => res.data)
      .catch(err => err)
  },
}

export default CourseListProvider
