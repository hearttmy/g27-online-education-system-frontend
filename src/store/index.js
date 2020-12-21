import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    login(state, userData) {
      state.user = userData
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
