import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    token: '',
  },
  mutations: {
    login(state, res) {
      state.user = res.user
      state.token = res.token
    },
    logout(state) {
      state.user = {}
    },
  },
  actions: {

  },
  getters: {

  },
  modules: {

  },
})

export default store
