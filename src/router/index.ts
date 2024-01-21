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
      path: '/base',
      name: 'base',
      component: () => import('../views/temp/baseCanvas.vue')
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
    },
    {
      path: '/mandelbrot',
      name: 'mandelbrot',
      component: () => import('../views/demo/MandelbrotView.vue')
    }
  ]
})

export default router
