import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/HomePage.vue'),
      name: 'home'
    },
    {
      path: '/logout',
      redirect: '/'
    }
  ]
})

export default router
