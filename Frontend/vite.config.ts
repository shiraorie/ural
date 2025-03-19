import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Указываем базовый путь для сборки - имя репозитория для GitHub Pages
  base: '/ural/',
})
