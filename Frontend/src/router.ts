import { createRouter, createWebHistory } from 'vue-router'
import main from './pages/main.vue' 
import reservation from './pages/Reservation.vue'
import notFound from './pages/notFound.vue'
import aboutUs from './pages/AboutUs.vue'
import tourPurchase from './pages/TourPurchase.vue'
import payment from './pages/Payment.vue'
import news from './pages/News.vue'
import cookiePolicy from './pages/policies/CookiePolicy.vue'
import privacyPolicy from './pages/policies/PrivacyPolicy.vue'
import termsOfUse from './pages/policies/TermsOfUse.vue'

// Формируем базовый путь с учётом режима разработки/продакшн
const base = import.meta.env.MODE === 'production' ? '/ural/' : '/'

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    { path: '/', component: main, meta: { title: 'Память Урала' } },
    { path: '/reservation', component: reservation, meta: { title: 'Бронирование' } },
    { path: '/about', component: aboutUs, meta: { title: 'О нас' } },
    { path: '/tour-purchase', component: tourPurchase, meta: { title: 'Покупка тура' } },
    { path: '/payment', component: payment, meta: { title: 'Оплата' } },
    { path: '/news', component: news, meta: { title: 'Новости и события' } },
    { path: '/policies/cookie', component: cookiePolicy, meta: { title: 'Политика использования файлов cookie' } },
    { path: '/policies/privacy', component: privacyPolicy, meta: { title: 'Политика конфиденциальности' } },
    { path: '/policies/terms', component: termsOfUse, meta: { title: 'Пользовательское соглашение' } },
    { path: '/:pathMatch(.*)*', component: notFound, meta: { title: '404' } },
  ],
})

export default router // Экспортируем маршрутизатор
