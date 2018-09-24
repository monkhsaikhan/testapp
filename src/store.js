import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    ADD_TOKEN: (state, token) => {
      state.token = token
    }
  },
  getters: {
    getToken: state => {
      return state.token
    }
  },
  actions: {

  }
})
