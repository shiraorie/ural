<template>
  <div class="container">
    <!-- Секция с каруселью -->
    <section class="hero-section">
      <carousel :carouselSlides="store.carouselSlides" />
    </section>

    <!-- Секция с преимуществами компании -->
    <section class="advantages-section">
      <h2 class="section-title">Почему выбирают "Память Урала"</h2>
      <div class="advantages-grid">
        <div class="advantage-card" v-for="(advantage, index) in store.companyAdvantages" :key="index">
          <div class="advantage-icon">{{ advantage.icon }}</div>
          <h3>{{ advantage.title }}</h3>
          <p>{{ advantage.description }}</p>
        </div>
      </div>
    </section>

    <!-- Секция с популярными турами -->
    <section class="tours-section">
      <h2 class="section-title">Популярные туры</h2>
      <div v-if="isLoading" class="loading-spinner">
        Загрузка туров...
      </div>
      <div v-else-if="!storeCards || storeCards.length === 0" class="no-tours">
        Туры не найдены
      </div>
      <div v-else class="tours-grid">
        <Card
          v-for="card in storeCards"
          :key="card.id"
          :image="card.image"
          :title="card.title"
          :rating="card.rating"
          :location="card.location"
          :price="card.price"
          :handleClick="() => handleCardClick(card)"
        />
      </div>
      <div class="button-container" v-if="storeCards && storeCards.length > 0">
        <router-link to="/tours" class="view-all-button">Посмотреть все туры</router-link>
      </div>
    </section>

    <!-- Тематические подборки туров -->
    <section class="themed-tours-section">
      <h2 class="section-title">Тематические подборки</h2>
      <div class="themed-tours">
        <div 
          class="themed-tour" 
          v-for="tour in store.themedTours" 
          :key="tour.id" 
          @click="showThemeTours(tour.id)"
        >
          <img :src="tour.image" :alt="tour.title">
          <div class="themed-tour-content">
            <h3>{{ tour.title }}</h3>
            <p>{{ tour.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Информационный блок -->
    <section class="info-section">
      <div class="info-container">
        <div class="info-image">
          <img :src="store.companyInfo.image" alt="Урал">
        </div>
        <div class="info-content">
          <h2>{{ store.companyInfo.title }}</h2>
          <p v-for="(paragraph, index) in store.companyInfo.paragraphs" :key="index">
            {{ paragraph }}
          </p>
          <button class="info-button" @click="scrollToTours">Выбрать тур</button>
        </div>
      </div>
    </section>

    <!-- Секция с новостями -->
    <section class="news-preview-section">
      <h2 class="section-title">{{ store.newsPreview.title }}</h2>
      <div class="news-preview">
        <p>{{ store.newsPreview.description }}</p>
        <router-link to="/news" class="news-button">Перейти к новостям</router-link>
      </div>
    </section>

    <!-- Секция с отзывами -->
    <section class="testimonials-section">
      <h2 class="section-title">Отзывы наших клиентов</h2>
      <div class="testimonials-slider">
        <div class="testimonial" v-for="(testimonial, index) in store.testimonials" :key="index">
          <div class="testimonial-content">
            <div class="testimonial-text">{{ testimonial.text }}</div>
            <div class="testimonial-author">
              <div class="testimonial-name">{{ testimonial.name }}</div>
              <div class="testimonial-tour">{{ testimonial.tour }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Секция с информацией "Где находимся" -->
    <section class="where-section">
      <h2 class="section-title">Как нас найти</h2>
      <sectionWher />
    </section>

    <!-- Секция с формой для email-подписки -->
    <section class="email-section">
      <email />
    </section>

    <!-- Модальное окно с детальной информацией о туре -->
    <popTour 
      v-if="isPopTourOpen" 
      @close="closePopTour" 
      :images="store.selectedTour.images" 
      :title="store.selectedTour.title" 
      :description="store.selectedTour.description" 
      :price="store.selectedTour.price" 
      :rating="store.selectedTour.rating" 
      :includes="store.selectedTour.includes" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCardsStore } from '@/store'
import { useRouter } from 'vue-router'

// Импорт компонентов
import sectionWher from '@/ui/sectionWher.vue'
import email from '@/ui/email.vue'
import Card from '@/ui/card.vue'
import carousel from '@/pages/carousel.vue'
import popTour from '@/ui/popTour.vue'

// Инициализация хранилища
const store = useCardsStore()
const router = useRouter()

// Состояние модального окна
const isPopTourOpen = ref(false)

// Вычисляемое свойство для карточек из хранилища
const storeCards = computed(() => {
  console.log('Получение карточек:', store.cards)
  return store.cards
})

// Вычисляемое свойство для состояния загрузки
const isLoading = computed(() => {
  console.log('Состояние загрузки:', store.isLoading)
  return store.isLoading
})

// Обработчики событий
const handleCardClick = (card) => {
  store.setSelectedTour(card)
  isPopTourOpen.value = true
}

const closePopTour = () => {
  isPopTourOpen.value = false
}

// Прокрутка к секции туров
const scrollToTours = () => {
  document.querySelector('.tours-section').scrollIntoView({ behavior: 'smooth' })
}

// Показать тематические туры
const showThemeTours = (theme) => {
  console.log('Переход к тематическим турам:', theme)
  // Для хэш-навигации используем правильный формат URL
  router.push({ path: '/tours', query: { theme: theme } })
}

// Получение данных при монтировании компонента
onMounted(async () => {
  console.log('main.vue - onMounted начало')
  if (!store.cards || store.cards.length === 0) {
    await store.getCards()
  }
  console.log('main.vue - onMounted завершено:', {
    cards: store.cards,
    isLoading: store.isLoading
  })
})
</script>

<style scoped lang="sass">
// Общие стили
.container
  max-width: 1200px
  margin: 0 auto
  padding: 0 15px

// Стили для секций
section
  margin-bottom: 80px
  opacity: 0
  transform: translateY(20px)
  animation: fadeInUp 0.8s forwards
  animation-delay: 0.1s
  
  &:nth-child(2)
    animation-delay: 0.2s
  &:nth-child(3)
    animation-delay: 0.3s
  &:nth-child(4)
    animation-delay: 0.4s
  &:nth-child(5)
    animation-delay: 0.5s
  &:nth-child(6)
    animation-delay: 0.6s
  &:nth-child(7)
    animation-delay: 0.7s
  &:nth-child(8)
    animation-delay: 0.8s

@keyframes fadeInUp
  from
    opacity: 0
    transform: translateY(20px)
  to
    opacity: 1
    transform: translateY(0)

.section-title
  margin-bottom: 40px
  font-size: 32px
  font-weight: 700
  text-align: center
  color: #2c3e50
  position: relative
  
  &:after
    content: ""
    display: block
    width: 60px
    height: 3px
    background-color: #3498db
    margin: 15px auto 0
  
  @media (max-width: 768px)
    font-size: 28px
    margin-bottom: 30px

// Преимущества компании
.advantages-section
  margin-top: 40px
  padding: 60px 0

.advantages-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
  gap: 30px
  padding: 0 15px
  
  @media (max-width: 992px)
    grid-template-columns: repeat(2, 1fr)
    gap: 20px
  
  @media (max-width: 768px)
    grid-template-columns: 1fr
    gap: 15px

.advantage-card
  background: white
  border-radius: 16px
  padding: 30px 25px
  text-align: center
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05)
  transition: all 0.3s ease
  
  @media (max-width: 768px)
    padding: 25px 20px
  
  &:hover
    transform: translateY(-10px)
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1)
  
  .advantage-icon
    font-size: 48px
    margin-bottom: 20px
    
    @media (max-width: 768px)
      font-size: 40px

// Стили для карточек
.tours-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  gap: 30px
  padding: 15px
  
  @media (max-width: 992px)
    grid-template-columns: repeat(2, 1fr)
    gap: 20px
  
  @media (max-width: 768px)
    grid-template-columns: 1fr
    gap: 15px

// Тематические подборки
.themed-tours-section
  background-color: #f8f9fa
  padding: 60px 0
  border-radius: 16px
  margin: 80px 0

.themed-tours
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 30px
  padding: 0 15px
  
  @media (max-width: 992px)
    grid-template-columns: repeat(2, 1fr)
    gap: 20px
  
  @media (max-width: 576px)
    grid-template-columns: 1fr
    gap: 15px

.themed-tour
  position: relative
  border-radius: 16px
  overflow: hidden
  height: 250px
  cursor: pointer
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1)
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)
  
  &:hover
    transform: translateY(-10px)
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2)
    
    .themed-tour-content
      transform: translateY(0)
      background: rgba(0, 0, 0, 0.7)
    
    img
      transform: scale(1.1)

  @media (max-width: 768px)
    height: 200px

.themed-tour-content
  position: absolute
  bottom: 0
  left: 0
  right: 0
  background: rgba(0, 0, 0, 0.5)
  color: #fff
  padding: 30px
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)
  transform: translateY(calc(100% - 90px))
  
  h3
    margin: 0 0 15px
    font-size: 24px
    font-weight: 600
    position: relative
    padding-bottom: 10px
    
    &::after
      content: ''
      position: absolute
      width: 40px
      height: 3px
      background-color: var(--color-primary)
      bottom: 0
      left: 0
      transition: width 0.3s ease
  
  &:hover h3::after
    width: 70px
    
  p
    margin: 0
    font-size: 16px
    line-height: 1.6
    opacity: 0
    transform: translateY(20px)
    transition: all 0.3s ease 0.1s
  
  &:hover p
    opacity: 1
    transform: translateY(0)

// Информационный блок
.info-section
  margin: 80px 0

.info-container
  display: flex
  background: #f8f9fa
  border-radius: 16px
  overflow: hidden
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08)
  
  @media (max-width: 992px)
    flex-direction: column
  
  .info-image
    @media (max-width: 992px)
      min-height: 300px
    
    @media (max-width: 768px)
      min-height: 250px
  
  img
    width: 100%
    height: 100%
    object-fit: cover
    transition: transform 0.8s
    
    &:hover
      transform: scale(1.05)

.info-content
  flex: 1
  padding: 50px
  
  @media (max-width: 768px)
    padding: 30px 20px
  
  h2
    margin-top: 0
    margin-bottom: 25px
    color: #2c3e50
    font-size: 28px
    position: relative
    
    &:after
      content: ""
      display: block
      width: 50px
      height: 3px
      background-color: #3498db
      margin-top: 15px
    
  p
    color: #5d6d7e
    line-height: 1.8
    margin-bottom: 20px
    font-size: 16px

.info-button
  background: linear-gradient(45deg, #e74c3c, #ff7675)
  color: white
  border: none
  padding: 16px 36px
  border-radius: 50px
  font-size: 16px
  font-weight: 600
  cursor: pointer
  transition: all 0.4s
  position: relative
  overflow: hidden
  box-shadow: 0 10px 20px rgba(231, 76, 60, 0.2)
  
  &::before
    content: ''
    position: absolute
    top: 0
    left: -100%
    width: 100%
    height: 100%
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
    transition: left 0.7s ease
  
  &:hover
    background: linear-gradient(45deg, #e74c3c, #e84c3c)
    transform: translateY(-5px) scale(1.03)
    box-shadow: 0 15px 30px rgba(231, 76, 60, 0.3)
    
    &::before
      left: 100%

// Секция с новостями
.news-preview-section
  background: linear-gradient(135deg, #3498db, #2980b9)
  border-radius: 16px
  padding: 60px 40px
  margin-bottom: 80px
  text-align: center
  color: white
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1)
  
  @media (max-width: 768px)
    padding: 40px 20px

  h2
    color: white
    margin-bottom: 25px
    
    &:after
      background-color: rgba(255, 255, 255, 0.5)

.news-preview
  max-width: 700px
  margin: 0 auto
  
  p
    color: rgba(255, 255, 255, 0.9)
    font-size: 18px
    line-height: 1.7
    margin-bottom: 30px
    
    @media (max-width: 768px)
      font-size: 16px

.news-button
  display: inline-block
  background-color: white
  color: #2980b9
  padding: 16px 36px
  border-radius: 50px
  font-weight: 600
  font-size: 16px
  text-decoration: none
  transition: all 0.4s
  position: relative
  overflow: hidden
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)
  z-index: 1
  
  &::before
    content: ''
    position: absolute
    top: 0
    left: -100%
    width: 100%
    height: 100%
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)
    transition: left 0.7s ease
  
  &:hover
    background-color: rgba(255, 255, 255, 0.9)
    transform: translateY(-5px) scale(1.03)
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15)
    
    &::before
      left: 100%

// Секция с отзывами
.testimonials-section
  padding: 60px 0
  background-color: #f8f9fa
  border-radius: 16px

.testimonials-slider
  display: flex
  flex-wrap: wrap
  gap: 30px
  justify-content: center

.testimonial
  flex: 0 0 calc(33.333% - 20px)
  max-width: calc(33.333% - 20px)
  background: white
  border-radius: 12px
  padding: 30px
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05)
  transition: transform 0.3s, box-shadow 0.3s
  
  &:hover
    transform: translateY(-10px)
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1)
  
  @media (max-width: 992px)
    flex: 0 0 calc(50% - 15px)
    max-width: calc(50% - 15px)
    
  @media (max-width: 576px)
    flex: 0 0 100%
    max-width: 100%

.testimonial-text
  font-style: italic
  color: #5d6d7e
  margin-bottom: 25px
  line-height: 1.8
  position: relative
  
  &:before
    content: '"'
    font-size: 70px
    color: #e9ecef
    position: absolute
    top: -30px
    left: -15px
    z-index: -1
    
    @media (max-width: 768px)
      font-size: 50px
      top: -20px

.testimonial-author
  display: flex
  flex-direction: column

.testimonial-name
  font-weight: 700
  color: #2c3e50
  font-size: 16px
  margin-bottom: 5px

.testimonial-tour
  font-size: 14px
  color: #7f8c8d

// Медиа-запросы для адаптивности
@media (max-width: 992px)
  .section-title
    font-size: 28px
    margin-bottom: 30px
  
  section
    margin-bottom: 60px

@media (max-width: 768px)
  .section-title
    font-size: 24px
    margin-bottom: 25px
  
  section
    margin-bottom: 50px
  
  .container
    padding: 0 10px

@media (max-width: 576px)
  .section-title
    font-size: 22px
    margin-bottom: 20px
  
  .advantage-card
    h3
      font-size: 20px
    
    p
      font-size: 14px

// Стили для загрузки
.loading-spinner
  text-align: center
  padding: 2rem
  font-size: 1.2rem
  color: #666

.no-tours
  text-align: center
  padding: 2rem
  font-size: 1.2rem
  color: #666
  background: #f5f5f5
  border-radius: 8px
  margin: 1rem 0

// Кнопка "Посмотреть все туры"
.button-container
  text-align: center
  margin-top: 30px

.view-all-button
  display: inline-block
  background: linear-gradient(45deg, #e6d595, #f0e5b5)
  color: #000
  border: none
  padding: 14px 34px
  border-radius: 50px
  font-size: 16px
  font-weight: 600
  text-decoration: none
  transition: all 0.3s ease
  box-shadow: 0 5px 15px rgba(230, 213, 149, 0.2)
  
  &:hover
    transform: translateY(-5px)
    box-shadow: 0 10px 25px rgba(230, 213, 149, 0.3)
  
  @media (max-width: 768px)
    padding: 12px 28px
    font-size: 15px
</style>
