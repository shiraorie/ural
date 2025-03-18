import { createRouter, createWebHistory } from 'vue-router'
import main from './pages/main.vue' 
import reservation from './pages/Reservation.vue'
import notFound from './pages/notFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: main },
    { path: '/reservation', component: reservation },
    { path: '/:pathMatch(.*)*', component: notFound },
  ],
})

export default router // Экспортируем маршрутизатор
