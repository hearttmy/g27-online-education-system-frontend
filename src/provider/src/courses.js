import http from '../../http'
import config from '../../config/index'
const baseUrl = config.apiBaseUrl

export const CoursesProvider = {
  // 添加课程
  addNewCourse: (payload) => {
    return http.post('addNewCourse', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除课程
  delCourse: (payload) => {
    return http.post('delCourse', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取全部课程
  getCourses: () => {
    return http.get('getCourses')
      .then(res => res)
      .catch(err => err)
  },

  // 获取课程详情
  getCourseDetail: (payload) => {
    return http.post('getCourseDetail', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 给课程添加章节
  addChapter: (payload) => {
    return http.post('addChapterToCourse', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 教师发布课程公告
  addBulletin: (payload) => {
    return http.post('addBulletin', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取课程公告
  getBulletins: (query) => {
    return http.get('getBulletins' + query)
      .then(res => res)
      .catch(err => err)
  },

  // 添加/更新课程章节单元
  updatePart: (payload) => {
    return http.post('updatePart', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取课程章节单元信息
  getPartDetail: (payload) => {
    return http.post('getPartDetail', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取课程章节单元信息（不需要权限，用于直接查看内容）
  getPartDetailNoAuth: (payload) => {
    return http.post('getPartDetailNoAuth', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除课程章节单元
  delPart: (payload) => {
    return http.post('delPart', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 给课程添加插图
  uploadCourseImg: (payload) => {
    return http.post('uploadCourseImg', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 给课程添加视频，接收视频文件分片
  uploadCourseVideoChunks: (payload) => {
    return http.post('uploadCourseVideoChunks', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 给课程添加视频，合并视频文件分片
  mergeCourseVideoChunks: (payload) => {
    return http.post('mergeCourseVideoChunks', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 删除课程视频
  delCourseVideo: (payload) => {
    return http.post('delCourseVideo', payload)
      .then(res => res)
      .catch(err => err)
  },

  // 获取课程学生的信息
  getCourseStusAndExams: (payload) => {
    return http.post('getCourseStusAndExams', payload)
      .then(res => res)
      .catch(err => err)
  },


  getFourHottestCourses: () => {
    return http.get('getFourHottestCourses')
      .then(res => res)
      .catch(err => err)
  },
  delChapter: (payload) => {
    return http.post('delChapter', payload)
      .then(res => res)
      .catch(err => err)
  }
}