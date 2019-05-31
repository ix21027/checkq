import Vue from 'vue'
import VueAxios from 'vue-axios'

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/'
import { securedAxiosInstance, plainAxiosInstance } from './backend/index'

Vue.config.productionTip = false
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})
new Vue({
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App)
}).$mount('#app')
