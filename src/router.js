import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'
import Add from './views/Add.vue'
import Edit from './views/Edit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/:id',
      name: 'list',
      component: List
    }
    ,
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    }
    ,
    {
      path: '/delete/:id'
    }
  ]
})
