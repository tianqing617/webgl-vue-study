import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/webgl',
      name: 'webgl',
      component: () => import('../views/demo/WebglView.vue')
    },
    {
      path: '/rough',
      name: 'rough',
      component: () => import('../views/demo/RoughView.vue')
    },
    {
      path: '/arc',
      name: 'arc',
      component: () => import('../views/demo/ArcView.vue')
    },
    {
      path: '/triangle',
      name: 'triangle',
      component: () => import('../views/demo/TriangleView.vue')
    },
    {
      path: '/grids',
      name: 'grids',
      component: () => import('../views/demo/GridsView.vue')
    }
  ]
})

export default router
