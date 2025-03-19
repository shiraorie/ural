import { createRouter, createWebHistory } from 'vue-router'
import main from './pages/main.vue' 
import reservation from './pages/Reservation.vue'
import notFound from './pages/notFound.vue'
import aboutUs from './pages/AboutUs.vue'
import tourPurchase from './pages/TourPurchase.vue'
import payment from './pages/Payment.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: main, meta: { title: 'Память Урала' } },
    { path: '/reservation', component: reservation, meta: { title: 'Бронирование' } },
    { path: '/about', component: aboutUs, meta: { title: 'О нас' } },
    { path: '/tour-purchase', component: tourPurchase, meta: { title: 'Покупка тура' } },
    { path: '/payment', component: payment, meta: { title: 'Оплата' } },
    { path: '/:pathMatch(.*)*', component: notFound, meta: { title: '404' } },
  ],
})

export default router // Экспортируем маршрутизатор
