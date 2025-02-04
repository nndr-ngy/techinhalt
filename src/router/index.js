import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import News_Einzeln from '@/components/News_Einzeln.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/news/:slug',
      name: 'newsEinzeln',
      component: News_Einzeln
    },
  ],
})

export default router
