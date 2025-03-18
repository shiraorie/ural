import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router' // Импортируем маршрутизатор
import './style.css'
import App from './App.vue'
import './assets/css/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router) // Используем маршрутизатор
app.mount('#app')
