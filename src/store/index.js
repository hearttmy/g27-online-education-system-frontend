import Vue from 'vue'
import Vuex from 'vuex'
import config from "@/common/config";
import CourseProvider from "@/network/request/course";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    user: {},
    course: {},
    deleteMode: false,
    isCourseTch: false,
    isCourseTA: false,
    isCourseGet: false,
    token: '',
    avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
  mutations: {
    login(state, res) {
      state.isLogin = true
      state.user = res.user
      state.token = res.token
      state.avatarUrl = config.serverImgUrl +  state.user.avatar
      this.commit('setSessionStorage')
    },
    logout(state) {
      sessionStorage.clear()
      state.isLogin = false
      state.user = {}
      state.token = ''
      state.avatarUrl = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    },
    changeAvatar(state, res) {
      state.avatarUrl = config.serverImgUrl + res.avatar
      state.user.avatar = res.avatar
      this.commit('setSessionStorage')
    },
    updateUser(state, res) {
      state.user = res
      this.commit('setSessionStorage')
    },
    updateCourse(state, res) {
      state.course = res
      state.isCourseGet = true
    },
    updateCourseTch(state, res) {
      state.isCourseTch = res
    },
    updateCourseTA(state, res) {
      state.isCourseTA = res
    },
    changeDeleteMode(state) {
      state.deleteMode = !state.deleteMode
    },

    setSessionStorage(state) {
      sessionStorage.setItem('state', JSON.stringify(state))
    },
    getSessionStorage(state) {
      if (sessionStorage.getItem('state') != null) {
        const tmp = JSON.parse(sessionStorage.getItem('state'))
        state.isLogin = tmp.isLogin
        state.user = tmp.user
        state.token = tmp.token
        state.avatarUrl = tmp.avatarUrl
        state.isCourseGet = false
        state.isCourseTch = tmp.isCourseTch
        state.isCourseTA = tmp.isCourseTA
      }
    }
  },
  actions: {
    async updateCourseInfo(context, courseID) {
      await CourseProvider.getCourseInfo({
        params: {'courseID': courseID}
      }).then(res => {
        context.commit('updateCourse', res)
      })

    },
    async updateCourseTchInfo(context, courseID) {
      context.commit('updateCourseTch', false)
      context.commit('updateCourseTA', false)


      if (context.state.isLogin && context.state.user.userType === 1) {
        await CourseProvider.isTeacher({
          headers: {'Authorization': context.state.token},
          params: {'courseID': courseID},
        }).then(res => {
          context.commit('updateCourseTch', res.state)
        })
      }

      if (context.state.isLogin) {
        await CourseProvider.isTA({
          courseID: courseID,
        }, {
          headers: {'Authorization': context.state.token},
        }).then(res => {
          if (res.state) {
            context.commit('updateCourseTch', true)
            context.commit('updateCourseTA', true)
          }
        })
      }
      if (context.state.user.userType === 2) {
        context.commit('updateCourseTch', true)
        context.commit('updateCourseTA', false)
        return
      }

      context.commit('setSessionStorage')
    }
  },
  getters: {

  },
  modules: {

  },
})

export default store
