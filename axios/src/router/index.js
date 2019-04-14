import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes: [
      {
        path: '/',
        name: 'hello',
        component: () => import( '../components/HelloWorld')
      },
      {
      path: '/home',
      name: 'home',
      component: () => import( '../components/Home')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import( '../components/Form')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( '../components/Login')
    }
  ]
})
