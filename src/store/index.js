import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './state'

import categories from './modules/categories'
import tests from './modules/tests'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    categories,
    tests,
    user
  }
})
