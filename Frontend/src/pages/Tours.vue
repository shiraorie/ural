<template>
  <div class="tours-page">
    <!-- Баннер -->
    <div class="banner">
      <div class="banner-overlay"></div>
      <div class="container">
        <h1 class="page-title">Туры по Уралу</h1>
        <p class="page-subtitle">Откройте для себя удивительные места и незабываемые приключения</p>
      </div>
    </div>
    
    <div class="container">
      <!-- Фильтры -->
      <div class="filters-wrapper">
        <div class="filters">
          <div class="filter-group">
            <h3>Тематика</h3>
            <div class="filter-options">
              <button 
                class="filter-button" 
                :class="{ active: selectedTheme === 'all' }" 
                @click="selectTheme('all')"
              >
                Все
              </button>
              <button 
                v-for="theme in store.themedTours" 
                :key="theme.id"
                class="filter-button"
                :class="{ active: selectedTheme === theme.id }"
                @click="selectTheme(theme.id)"
              >
                {{ theme.title }}
              </button>
            </div>
          </div>
          
          <div class="filter-group">
            <h3>Сортировка</h3>
            <div class="select-wrapper">
              <select v-model="sortOption" class="sort-select">
                <option value="price-asc">По цене (сначала дешевле)</option>
                <option value="price-desc">По цене (сначала дороже)</option>
                <option value="rating-desc">По рейтингу (сначала высокий)</option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
          </div>
        </div>
        
        <div class="active-filters" v-if="selectedTheme !== 'all'">
          <div class="filter-tag">
            {{ getThemeTitle(selectedTheme) }}
            <button class="remove-filter" @click="selectTheme('all')">×</button>
          </div>
        </div>
      </div>
      
      <!-- Результаты -->
      <div class="results-info" v-if="!isLoading">
        <p>Найдено туров: <span>{{ filteredCards.length }}</span></p>
      </div>
      
      <!-- Список туров -->
      <div class="tours-container">
        <div v-if="isLoading" class="loading">
          <div class="spinner"></div>
          <p>Загрузка туров...</p>
        </div>
        <div v-else-if="filteredCards.length === 0" class="no-results">
          <img src="https://cdn.iconscout.com/icon/free/png-256/free-search-1767866-1502116.png" alt="Поиск" class="no-results-icon">
          <h3>Туры не найдены</h3>
          <p>Попробуйте изменить параметры фильтрации</p>
          <button class="reset-filters" @click="selectTheme('all')">Сбросить фильтры</button>
        </div>
        <div v-else class="tours-grid">
          <transition-group name="card-fade">
            <card 
              v-for="card in filteredCards" 
              :key="card.id" 
              :handleClick="() => handleCardClick(card)" 
              :title="card.title" 
              :description="card.description" 
              :image="card.image" 
              :rating="card.rating" 
              :price="card.price" 
              :location="card.location" 
            />
          </transition-group>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно с подробной информацией о туре -->
    <popTour 
      v-if="isPopTourOpen" 
      :tour="store.selectedTour" 
      @close="closePopTour" 
    />

    <!-- Секция "Не нашли подходящий тур?" -->
    <div class="contact-section" v-if="!isLoading && filteredCards.length > 0">
      <div class="container">
        <div class="contact-content">
          <h2>Не нашли подходящий тур?</h2>
          <p>Свяжитесь с нами, и мы подберем оптимальный вариант специально для вас</p>
          <button class="contact-button">Связаться с нами</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCardsStore } from '@/store'
import card from '@/ui/card.vue'
import popTour from '@/ui/popTour.vue'

// Инициализация хранилища и маршрутизатора
const store = useCardsStore()
const route = useRoute()
const router = useRouter()

// Состояние фильтрации и сортировки
const selectedTheme = ref('all')
const sortOption = ref('rating-desc')
const isPopTourOpen = ref(false)

// Получаем значение темы из URL параметров при загрузке страницы
onMounted(() => {
  // Проверка наличия данных в хранилище
  if (store.cards.length === 0) {
    // Если данных нет - загружаем
    store.getCards()
  } else {
    // Если данные уже есть, просто обновляем флаг загрузки
    isLoading.value = false
  }
  
  // Устанавливаем фильтр из URL, если он есть
  if (route.query.theme) {
    selectedTheme.value = route.query.theme
  }
})

// Следим за изменением фильтра в URL
watch(() => route.query.theme, (newTheme) => {
  if (newTheme) {
    selectedTheme.value = newTheme
  } else {
    selectedTheme.value = 'all'
  }
})

// Получить название темы по ID
const getThemeTitle = (themeId) => {
  const theme = store.themedTours.find(t => t.id === themeId)
  return theme ? theme.title : 'Все туры'
}

// Функция выбора темы
const selectTheme = (theme) => {
  selectedTheme.value = theme
  // Обновляем URL при изменении фильтра
  if (theme === 'all') {
    router.push({ path: '/tours' })
  } else {
    router.push({ path: '/tours', query: { theme } })
  }
}

// Функция для открытия подробной информации о туре
const handleCardClick = (card) => {
  store.setSelectedTour(card)
  isPopTourOpen.value = true
}

// Закрытие модального окна
const closePopTour = () => {
  isPopTourOpen.value = false
}

// Вычисляемые свойства
const isLoading = computed(() => store.isLoading)

// Фильтрация и сортировка карточек
const filteredCards = computed(() => {
  let result = [...store.cards]
  
  // Применяем фильтр по теме
  if (selectedTheme.value !== 'all') {
    // В реальном проекте здесь будет фильтрация по соответствующей теме
    // Сейчас для демонстрации просто используем первые несколько карточек для каждой темы
    switch(selectedTheme.value) {
      case 'nature':
        result = result.filter(card => 
          card.description.toLowerCase().includes('природа') || 
          card.description.toLowerCase().includes('озеро') ||
          card.description.toLowerCase().includes('нац')
        )
        break
      case 'history':
        result = result.filter(card => 
          card.description.toLowerCase().includes('истор') || 
          card.description.toLowerCase().includes('цивилизац') ||
          card.title.toLowerCase().includes('аркаим')
        )
        break
      case 'adventure':
        result = result.filter(card => 
          card.description.toLowerCase().includes('актив') || 
          card.description.toLowerCase().includes('сплав') ||
          card.description.toLowerCase().includes('лыж')
        )
        break
    }
  }
  
  // Применяем сортировку
  switch(sortOption.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating-desc':
      result.sort((a, b) => b.rating - a.rating)
      break
  }
  
  return result
})
</script>

<style scoped lang="sass">
.tours-page
  min-height: 100vh
  background-color: #fafafa

.container
  max-width: 1200px
  margin: 0 auto
  padding: 0 15px
  position: relative

// Баннер
.banner
  background-image: url('https://proza.ru/pics/2022/11/03/1598.jpg')
  background-size: cover
  background-position: center
  height: 300px
  position: relative
  display: flex
  align-items: center
  justify-content: center
  margin-bottom: 50px
  
  .banner-overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))
    z-index: 1
  
  .container
    position: relative
    z-index: 2
    text-align: center

.page-title
  font-size: 48px
  font-weight: 800
  margin-bottom: 20px
  color: white
  text-shadow: 0 2px 10px rgba(0,0,0,0.3)
  animation: fadeIn 1s ease-out

.page-subtitle
  font-size: 20px
  color: rgba(255,255,255,0.9)
  max-width: 600px
  margin: 0 auto
  line-height: 1.5
  animation: fadeIn 1.2s ease-out

// Фильтры
.filters-wrapper
  margin-bottom: 30px
  padding-bottom: 20px
  animation: slideDown 0.5s ease-out

.filters
  display: flex
  justify-content: space-between
  align-items: flex-start
  margin-bottom: 20px
  flex-wrap: wrap
  gap: 20px
  padding: 25px
  background-color: white
  border-radius: 16px
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07)
  transition: all 0.3s

.filter-group
  flex: 1
  min-width: 250px
  
  h3
    margin-bottom: 15px
    font-size: 18px
    font-weight: 600
    color: #2c3e50
    position: relative
    display: inline-block
    
    &:after
      content: ''
      position: absolute
      bottom: -5px
      left: 0
      width: 40px
      height: 3px
      background-color: var(--color-primary)

.filter-options
  display: flex
  flex-wrap: wrap
  gap: 10px

.filter-button
  padding: 10px 18px
  background-color: white
  border: 2px solid #e0e0e0
  border-radius: 8px
  cursor: pointer
  transition: all 0.2s
  font-size: 15px
  font-weight: 500
  
  &:hover
    background-color: #f5f5f5
    transform: translateY(-2px)
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05)
  
  &.active
    background-color: var(--color-primary)
    color: black
    border-color: var(--color-primary)
    box-shadow: 0 5px 15px rgba(var(--color-primary-rgb), 0.3)
    
    &:hover
      transform: translateY(-2px)
      box-shadow: 0 5px 20px rgba(var(--color-primary-rgb), 0.4)

.select-wrapper
  position: relative
  
  .select-arrow
    position: absolute
    right: 12px
    top: 50%
    transform: translateY(-50%)
    pointer-events: none
    color: #777
    font-size: 10px

.sort-select
  width: 100%
  padding: 12px 15px
  border: 2px solid #e0e0e0
  border-radius: 8px
  font-size: 15px
  background-color: white
  cursor: pointer
  appearance: none
  transition: all 0.2s
  
  &:hover
    border-color: #ccc
  
  &:focus
    outline: none
    border-color: var(--color-primary)
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2)

// Активные фильтры
.active-filters
  display: flex
  flex-wrap: wrap
  gap: 10px
  margin-bottom: 20px

.filter-tag
  display: inline-flex
  align-items: center
  padding: 8px 12px
  background-color: rgba(var(--color-primary-rgb), 0.1)
  border-radius: 50px
  color: var(--color-primary)
  font-size: 14px
  font-weight: 500
  
  .remove-filter
    background: none
    border: none
    color: var(--color-primary)
    margin-left: 8px
    cursor: pointer
    font-size: 18px
    line-height: 1
    transition: transform 0.2s
    
    &:hover
      transform: scale(1.2)

// Информация о результатах
.results-info
  margin-bottom: 20px
  font-size: 16px
  color: #777
  
  span
    font-weight: 600
    color: #333

// Стили для списка туров
.tours-container
  min-height: 300px
  margin-bottom: 60px

.tours-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  gap: 30px

// Стили для загрузки и отсутствия результатов
.loading, .no-results
  text-align: center
  padding: 80px 0
  color: #7f8c8d
  font-size: 18px
  display: flex
  flex-direction: column
  align-items: center

.spinner
  width: 50px
  height: 50px
  border: 5px solid rgba(var(--color-primary-rgb), 0.2)
  border-top-color: var(--color-primary)
  border-radius: 50%
  animation: spin 1s linear infinite
  margin-bottom: 20px

@keyframes spin
  to
    transform: rotate(360deg)

.no-results
  h3
    margin: 15px 0 10px
    color: #333
    font-size: 24px
  
  p
    margin-bottom: 20px
    color: #777

.no-results-icon
  width: 80px
  height: 80px
  opacity: 0.7
  margin-bottom: 10px

.reset-filters
  background-color: var(--color-primary)
  color: white
  border: none
  padding: 12px 24px
  border-radius: 8px
  font-size: 16px
  cursor: pointer
  transition: all 0.3s
  
  &:hover
    background-color: #1e88e5
    transform: translateY(-3px)
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)

// Секция с контактами
.contact-section
  background-color: var(--color-primary)
  padding: 60px 0
  margin-top: 60px
  
  .contact-content
    text-align: center
    color: white
    max-width: 700px
    margin: 0 auto
    
    h2
      font-size: 32px
      margin-bottom: 15px
    
    p
      font-size: 18px
      margin-bottom: 30px
      opacity: 0.9
    
    .contact-button
      background-color: white
      color: var(--color-primary)
      border: none
      padding: 14px 32px
      border-radius: 50px
      font-size: 16px
      font-weight: 600
      cursor: pointer
      transition: all 0.3s
      
      &:hover
        transform: translateY(-3px)
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2)

// Анимации
@keyframes fadeIn
  from
    opacity: 0
  to
    opacity: 1

@keyframes slideDown
  from
    opacity: 0
    transform: translateY(-20px)
  to
    opacity: 1
    transform: translateY(0)

.card-fade-enter-active,
.card-fade-leave-active
  transition: all 0.5s ease

.card-fade-enter-from,
.card-fade-leave-to
  opacity: 0
  transform: translateY(30px)

// Медиа-запросы
@media (max-width: 992px)
  .page-title
    font-size: 40px
  
  .filters
    padding: 20px

@media (max-width: 768px)
  .banner
    height: 250px
  
  .page-title
    font-size: 32px
  
  .page-subtitle
    font-size: 16px
  
  .filters
    flex-direction: column
    gap: 25px
  
  .contact-section
    .contact-content
      h2
        font-size: 28px
      
      p
        font-size: 16px

@media (max-width: 480px)
  .banner
    height: 220px
  
  .page-title
    font-size: 28px
    margin-bottom: 10px
  
  .filter-button
    padding: 8px 14px
    font-size: 14px
  
  .tours-grid
    grid-template-columns: 1fr
</style> 