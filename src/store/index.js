import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './state'

import counter from './modules/counter'
import categories from './modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    counter,
    categories
  }
})
