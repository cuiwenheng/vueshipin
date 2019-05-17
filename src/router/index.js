import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShiPin from '@/components/ShiPin'
import Vedio from '@/components/Vedio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/shipin',
      name: 'ShiPin',
      props:{parentPullUpState:2},
      component: ShiPin
    },
    {
      path: '/vedio',
      name: 'Vedio',
      component: Vedio
    }
  ]
})
