import { createRouter, createWebHashHistory } from 'vue-router'
import main from './pages/main.vue' 
import reservation from './pages/Reservation.vue'
import notFound from './pages/notFound.vue'
import aboutUs from './pages/AboutUs.vue'
import tourPurchase from './pages/TourPurchase.vue'
import payment from './pages/Payment.vue'
import news from './pages/News.vue'
// @ts-ignore
import tours from './pages/Tours.vue'
import cookiePolicy from './pages/policies/CookiePolicy.vue'
import privacyPolicy from './pages/policies/PrivacyPolicy.vue'
import termsOfUse from './pages/policies/TermsOfUse.vue'

const isProduction = process.env.NODE_ENV === 'production'

// Настройка базового пути для GitHub Pages
const base = '/'

const router = createRouter({
  history: createWebHashHistory(base),
  routes: [
    { path: '/', component: main, meta: { title: 'Память Урала' } },
    { path: '/reservation', component: reservation, meta: { title: 'Бронирование' } },
    { path: '/about', component: aboutUs, meta: { title: 'О нас' } },
    { path: '/tour-purchase', component: tourPurchase, meta: { title: 'Покупка тура' } },
    { path: '/payment', component: payment, meta: { title: 'Оплата' } },
    { path: '/news', component: news, meta: { title: 'Новости и события' } },
    { path: '/tours', component: tours, meta: { title: 'Туры' } },
    { path: '/policies/cookie', component: cookiePolicy, meta: { title: 'Политика использования файлов cookie' } },
    { path: '/policies/privacy', component: privacyPolicy, meta: { title: 'Политика конфиденциальности' } },
    { path: '/policies/terms', component: termsOfUse, meta: { title: 'Условия использования' } },
    { path: '/:pathMatch(.*)*', component: notFound, meta: { title: 'Страница не найдена' } },
  ],
})

export default router // Экспортируем маршрутизатор
