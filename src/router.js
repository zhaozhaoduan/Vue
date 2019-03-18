import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes: [
      {
      path: '*',
      name: 'home',
      component: () => import( './components/Home')
    },
    {
      path: '/cardPage',
      name: 'card',
      component: () => import( './components/Card')
    },
    {
      path: '/card/1/freeze',
      name: 'card_freeze',
      component: () => import( './components/card/Freeze')
    }
  ]
})
