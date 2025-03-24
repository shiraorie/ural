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
  build: {
    // Создаем исходные карты для отладки
    sourcemap: true,
    // Улучшаем совместимость с различными браузерами
    target: 'es2015',
    // Разделяем чанки для улучшения производительности загрузки
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
}) 