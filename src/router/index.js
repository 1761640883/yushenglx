import Vue from 'vue'
import VueRouter from 'vue-router'
import movie from './movie'
import cinema from './cinema'
import mine from './mine'
import admin from './admin'

Vue.use(VueRouter)

const routes = [
  movie,
  cinema,
  mine,
  admin,
  {
    path: '*',
    redirect: 'movie',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'yusheng',
  routes
})

export default router
