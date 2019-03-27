import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
Vue.use(Vuex)

const publicStore = {
  state,
  mutations,
  actions,
  getters
}

const store = new Vuex.Store({
  modules: {
    publicStore,
    // app,
    // user,
    // tagsView,
  },
})

export default store
