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
      }
    }
  },
  actions: {
    updateCourseInfo(context, courseID) {
      CourseProvider.getCourseInfo({
        params: {
          'courseID': courseID
        }
      }).then(res => {
        context.commit('updateCourse', res)
      })
    },
  },
  getters: {

  },
  modules: {

  },
})

export default store
