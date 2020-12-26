import http from "@/network/request";

const HomeProvider  = {
  getAllCourse() {
    return http.get('/course/AllInfo')
      .then(res => res)
      .catch(err => err)
  },
}

export default HomeProvider
