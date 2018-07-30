import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'

Vue.use(Router);

export default new Router({
  // mode: history,    //'#'号，毛点  相关
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/register',
      component: ()=> import('../views/register')
    }
  ]
})
