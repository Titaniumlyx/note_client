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
      component: () => import('../views/register')
    },
    {
      path: '/writeNote',
      component: () => import('../views/writeNote')
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('../views/content')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/search')
    },
    {
      path: '/modiInfor',
      name: 'modiInfor',
      component: () => import('../views/modiInfor')
    }
  ]
})
