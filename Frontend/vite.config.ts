import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // Использовать относительные пути для сборки на GitHub Pages
  resolve: {
    alias: {
      '@': '/src', // Алиас для импортов
    },
  },
})
