import http from "@/network/request";

const HomeProvider  = {
  getCourse() {
    return http.post('getCourse', payload)
      .then(res => res)
      .catch(err => err)
  },
}

export default HomeProvider
