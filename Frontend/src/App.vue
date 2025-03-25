

<template>
  <div>
    <Header />
    <router-view />
    <Footer />
    <allowAlerts />
  </div>
</template>

<script setup >
import { RouterView } from 'vue-router'
import router from './router'
import { ref } from 'vue'
import Header from './ui/header.vue'
import Footer from './ui/footer.vue'
import allowAlerts from '@/ui/alllowAlerts.vue'

const DefaultTitle = 'Память Урала'

router.afterEach((to) => {
  document.title = to.meta.title || DefaultTitle
})


const message = ref('Привет, мир!')

// Вы можете добавить другие реактивные переменные и функции здесь
</script>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
