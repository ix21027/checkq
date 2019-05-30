import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/Test.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('./views/Result.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('./views/Privacy.vue')
    },
    {
      path: '*',
      component: () => import('./views/NotFound.vue')
    }
  ]
})
