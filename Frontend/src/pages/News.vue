<template>
  <div class="news-page">
    <div class="news-header">
      <h1 class="news-title">Новости и события</h1>
      <p class="news-subtitle">Узнайте о последних новостях, событиях и специальных предложениях</p>
    </div>

    <div class="news-filters">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Поиск новостей..." 
          v-model="searchQuery"
          @input="filterNews"
        >
        <button class="search-button">
          <span class="search-icon">🔍</span>
        </button>
      </div>
      
      <div class="category-filters">
        <button 
          class="category-button" 
          :class="{ active: activeCategory === 'all' }"
          @click="filterByCategory('all')"
        >
          Все новости
        </button>
        <button 
          v-for="category in store.newsCategories" 
          :key="category.id"
          class="category-button" 
          :class="{ active: activeCategory === category.id }"
          @click="filterByCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div class="news-grid">
      <div 
        v-for="newsItem in filteredNews" 
        :key="newsItem.id"
        class="news-card" 
        @click="showNewsDetails(newsItem)"
      >
        <div class="news-image">
          <img :src="newsItem.image" :alt="newsItem.title">
          <span class="news-date">{{ formatDate(newsItem.date) }}</span>
          <span class="news-category">{{ getCategoryName(newsItem.category) }}</span>
        </div>
        <div class="news-content">
          <h3 class="news-card-title">{{ newsItem.title }}</h3>
          <p class="news-card-excerpt">{{ newsItem.excerpt }}</p>
          <span class="read-more">Читать далее</span>
        </div>
      </div>
    </div>

    <!-- Сообщение, если новостей не найдено -->
    <div v-if="filteredNews.length === 0" class="no-results">
      <p>По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.</p>
    </div>

    <!-- Модальное окно с подробной информацией о новости -->
    <div class="news-modal" v-if="selectedNews" @click.self="closeNewsDetails">
      <div class="news-modal-content">
        <button class="close-button" @click="closeNewsDetails">×</button>
        <div class="news-modal-image">
          <img :src="selectedNews.image" :alt="selectedNews.title">
          <div class="news-modal-meta">
            <span class="news-modal-date">{{ formatDate(selectedNews.date) }}</span>
            <span class="news-modal-category">{{ getCategoryName(selectedNews.category) }}</span>
          </div>
        </div>
        <h2 class="news-modal-title">{{ selectedNews.title }}</h2>
        <div class="news-modal-body" v-html="selectedNews.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCardsStore } from '@/store'

// Инициализация хранилища
const store = useCardsStore()

// Состояние
const searchQuery = ref('')
const activeCategory = ref('all')
const selectedNews = ref(null)

// Вычисляемые свойства
const filteredNews = computed(() => {
  return store.getFilteredNews(activeCategory.value, searchQuery.value)
})

// Методы
const filterByCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const filterNews = () => {
  // Фильтрация происходит автоматически через вычисляемое свойство
}

const showNewsDetails = (newsItem) => {
  // Прямое использование объекта новости вместо поиска по ID
  selectedNews.value = newsItem
  document.body.style.overflow = 'hidden' // Блокировка прокрутки страницы
}

const closeNewsDetails = () => {
  selectedNews.value = null
  document.body.style.overflow = '' // Восстановление прокрутки
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

const getCategoryName = (categoryId) => {
  const category = store.newsCategories.find(cat => cat.id === categoryId)
  return category ? category.name : 'Общее'
}

// Жизненный цикл
onMounted(() => {
  // Загрузка данных с сервера при необходимости
  if (typeof store.loadNews === 'function') {
    store.loadNews()
  }
})
</script>

<style scoped lang="sass">
.news-page
  max-width: 1200px
  margin: 0 auto
  padding: 20px

.news-header
  text-align: center
  margin-bottom: 40px

.news-title
  font-size: 32px
  color: #2c3e50
  margin-bottom: 10px

.news-subtitle
  font-size: 16px
  color: #7f8c8d
  max-width: 600px
  margin: 0 auto

.news-filters
  margin-bottom: 30px

.search-box
  display: flex
  margin-bottom: 20px
  
  input
    flex-grow: 1
    padding: 12px 20px
    border: 1px solid #ddd
    border-radius: 30px 0 0 30px
    font-size: 16px
    outline: none
    
    &:focus
      border-color: #3498db
  
  .search-button
    background: #3498db
    color: white
    border: none
    border-radius: 0 30px 30px 0
    padding: 0 20px
    cursor: pointer
    transition: background 0.3s
    
    &:hover
      background: #2980b9

.category-filters
  display: flex
  flex-wrap: wrap
  gap: 10px
  margin-top: 20px

.category-button
  padding: 8px 16px
  background: #f8f9fa
  border: 1px solid #e9ecef
  border-radius: 20px
  font-size: 14px
  cursor: pointer
  transition: all 0.3s
  
  &:hover
    background: #e9ecef
  
  &.active
    background: #3498db
    color: white
    border-color: #3498db

.news-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))
  gap: 30px
  
  @media (max-width: 767px)
    grid-template-columns: 1fr

.news-card
  background: white
  border-radius: 10px
  overflow: hidden
  box-shadow: 0 5px 15px rgba(0,0,0,0.05)
  transition: transform 0.3s, box-shadow 0.3s
  cursor: pointer
  
  &:hover
    transform: translateY(-10px)
    box-shadow: 0 15px 30px rgba(0,0,0,0.1)
    
    .news-card-title
      color: #3498db
    
    .read-more
      color: #2980b9
      padding-left: 5px

.news-image
  position: relative
  height: 200px
  
  img
    width: 100%
    height: 100%
    object-fit: cover
  
  .news-date
    position: absolute
    bottom: 10px
    left: 10px
    background: rgba(0,0,0,0.7)
    color: white
    padding: 5px 10px
    border-radius: 3px
    font-size: 12px
  
  .news-category
    position: absolute
    top: 10px
    right: 10px
    background: #3498db
    color: white
    padding: 5px 10px
    border-radius: 3px
    font-size: 12px

.news-content
  padding: 20px

.news-card-title
  margin-top: 0
  margin-bottom: 10px
  font-size: 18px
  color: #2c3e50
  transition: color 0.3s

.news-card-excerpt
  color: #7f8c8d
  font-size: 14px
  line-height: 1.5
  margin-bottom: 15px

.read-more
  color: #3498db
  font-size: 14px
  font-weight: 600
  transition: all 0.3s

// Сообщение об отсутствии результатов
.no-results
  text-align: center
  padding: 40px 0
  color: #7f8c8d
  font-size: 16px

// Модальное окно новости
.news-modal
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0,0,0,0.5)
  display: flex
  align-items: center
  justify-content: center
  z-index: 1000
  padding: 20px
  overflow-y: auto

.news-modal-content
  background: white
  width: 100%
  max-width: 800px
  max-height: 90vh
  overflow-y: auto
  border-radius: 10px
  position: relative
  box-shadow: 0 15px 30px rgba(0,0,0,0.2)

.close-button
  position: absolute
  top: 15px
  right: 15px
  background: rgba(0,0,0,0.3)
  color: white
  border: none
  width: 30px
  height: 30px
  border-radius: 50%
  font-size: 20px
  line-height: 1
  cursor: pointer
  transition: background 0.3s
  z-index: 10
  
  &:hover
    background: rgba(0,0,0,0.5)

.news-modal-image
  position: relative
  height: 300px
  
  img
    width: 100%
    height: 100%
    object-fit: cover

.news-modal-meta
  position: absolute
  bottom: 0
  left: 0
  right: 0
  background: linear-gradient(transparent, rgba(0,0,0,0.7))
  padding: 20px
  display: flex
  justify-content: space-between
  color: white

.news-modal-title
  padding: 20px 20px 10px
  margin: 0
  font-size: 24px
  color: #2c3e50

.news-modal-body
  padding: 0 20px 20px
  line-height: 1.8
  color: #5d6d7e
  
  p
    margin-bottom: 15px
  
  img
    max-width: 100%
    height: auto
    margin: 20px 0
    border-radius: 5px
  
  h3
    margin: 25px 0 15px
    color: #2c3e50
    font-size: 20px
  
  ul, ol
    margin-bottom: 15px
    padding-left: 20px
    
    li
      margin-bottom: 8px

// Анимация для модального окна
@keyframes fadeIn
  from
    opacity: 0
  to
    opacity: 1

.news-modal
  animation: fadeIn 0.3s ease-out

// Адаптивность
@media (max-width: 576px)
  .news-modal-content
    border-radius: 0
    height: 100vh
    max-height: none
  
  .news-modal
    padding: 0
  
  .category-filters
    overflow-x: auto
    flex-wrap: nowrap
    padding-bottom: 10px
    
    &::-webkit-scrollbar
      height: 5px
    
    &::-webkit-scrollbar-thumb
      background: #ddd
      border-radius: 10px
</style> 