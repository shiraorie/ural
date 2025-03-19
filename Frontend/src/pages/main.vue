<template>
  <div class="container">
    <!-- Секция с каруселью -->
    <section class="hero-section">
      <carousel :carouselSlides="carouselSlides" />
    </section>

    <!-- Секция с преимуществами компании -->
    <section class="advantages-section">
      <h2 class="section-title">Почему выбирают "Память Урала"</h2>
      <div class="advantages-grid">
        <div class="advantage-card">
          <div class="advantage-icon">🏆</div>
          <h3>Опыт и профессионализм</h3>
          <p>Более 10 лет мы организуем уникальные туры по Уралу. Наши гиды - опытные профессионалы, влюбленные в свой край.</p>
        </div>
        <div class="advantage-card">
          <div class="advantage-icon">🌲</div>
          <h3>Уникальные маршруты</h3>
          <p>Мы предлагаем эксклюзивные маршруты, которые позволят вам увидеть настоящий Урал с его первозданной природой.</p>
        </div>
        <div class="advantage-card">
          <div class="advantage-icon">🏕️</div>
          <h3>Комфорт и безопасность</h3>
          <p>Мы заботимся о вашем комфорте и безопасности во время путешествия, предоставляя качественное снаряжение и транспорт.</p>
        </div>
        <div class="advantage-card">
          <div class="advantage-icon">💰</div>
          <h3>Доступные цены</h3>
          <p>Мы предлагаем туры различной ценовой категории, чтобы каждый мог найти подходящий вариант.</p>
        </div>
      </div>
    </section>

    <!-- Секция с популярными турами -->
    <section class="tours-section">
      <h2 class="section-title">Популярные туры</h2>
      <div class="card-wrapper">
        <card 
          v-for="card in storeCards" 
          :key="card.id" 
          :handleClick="() => handleCardClick(card)" 
          :title="card.title" 
          :description="card.description" 
          :image="card.image" 
          :rating="card.rating" 
          :price="card.price" 
          :location="card.location" 
        />
      </div>
    </section>

    <!-- Тематические подборки туров -->
    <section class="themed-tours-section">
      <h2 class="section-title">Тематические подборки</h2>
      <div class="themed-tours">
        <div class="themed-tour" @click="showThemeTours('nature')">
          <img src="https://avatars.mds.yandex.net/get-altay/4374841/2a0000017706403316ba81896cf7ca802576/orig" alt="Природа Урала">
          <div class="themed-tour-content">
            <h3>Природа Урала</h3>
            <p>Озера, горы, заповедники</p>
          </div>
        </div>
        <div class="themed-tour" @click="showThemeTours('history')">
          <img src="https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13" alt="Исторические места">
          <div class="themed-tour-content">
            <h3>Исторические места</h3>
            <p>Памятники, музеи, архитектура</p>
          </div>
        </div>
        <div class="themed-tour" @click="showThemeTours('adventure')">
          <img src="https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13" alt="Активный отдых">
          <div class="themed-tour-content">
            <h3>Активный отдых</h3>
            <p>Походы, сплавы, восхождения</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Информационный блок -->
    <section class="info-section">
      <div class="info-container">
        <div class="info-image">
          <img src="https://avatars.mds.yandex.net/get-altay/4374841/2a0000017706403316ba81896cf7ca802576/orig" alt="Урал">
        </div>
        <div class="info-content">
          <h2>Путешествуйте по Уралу с нами</h2>
          <p>Урал – загадочный край, полный легенд и преданий, с богатой историей и удивительной природой. Здесь величественные горы соседствуют с бескрайними лесами, а кристально чистые озера отражают красоту синего неба.</p>
          <p>С компанией "Память Урала" вы откроете для себя все многообразие этого уникального региона. Наши туры охватывают самые интересные места: от Национального парка Таганай с его причудливыми скалами до таинственного озера Тургояк, от исторических городов до затерянных в лесах деревень.</p>
          <p>Присоединяйтесь к нашим путешествиям, и мы покажем вам настоящий Урал!</p>
          <button class="info-button" @click="scrollToTours">Выбрать тур</button>
        </div>
      </div>
    </section>

    <!-- Секция с новостями -->
    <section class="news-preview-section">
      <h2 class="section-title">Последние новости и события</h2>
      <div class="news-preview">
        <p>Узнайте о новых маршрутах, специальных предложениях и интересных фактах об Урале в нашем разделе новостей.</p>
        <router-link to="/news" class="news-button">Перейти к новостям</router-link>
      </div>
    </section>

    <!-- Секция с отзывами -->
    <section class="testimonials-section">
      <h2 class="section-title">Отзывы наших клиентов</h2>
      <div class="testimonials-slider">
        <div class="testimonial" v-for="(testimonial, index) in testimonials" :key="index">
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

// Импорт компонентов
import sectionWher from '@/ui/sectionWher.vue'
import email from '@/ui/email.vue'
import card from '@/ui/card.vue'
import carousel from '@/pages/carousel.vue'
import popTour from '@/ui/popTour.vue'

// Инициализация хранилища
const store = useCardsStore()

// Состояние модального окна
const isPopTourOpen = ref(false)

// Вычисляемое свойство для карточек из хранилища
const storeCards = computed(() => store.cards)

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
  console.log(`Показать туры по теме: ${theme}`)
  // В будущем здесь может быть фильтрация или переход на страницу тематических туров
}

// Данные для карусели
const carouselSlides = ref([
  {
    title: 'Исследуй Урал',
    description: 'Незабываемые путешествия по уникальным местам',
    image: 'https://avatars.mds.yandex.net/get-altay/4374841/2a0000017706403316ba81896cf7ca802576/orig'
  },
  {
    title: 'Природа Урала',
    description: 'Первозданная красота уральских гор и озёр',
    image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13'
  },
])

// Отзывы клиентов
const testimonials = ref([
  {
    text: 'Прекрасный тур! Увидели столько красивых мест, о которых даже не подозревали. Гид был очень внимательным и знающим. Всем рекомендую!',
    name: 'Анна Петрова',
    tour: 'Тур "Уральские горы"'
  },
  {
    text: 'Отличная организация, комфортные условия и захватывающие виды. Поездка на озеро Тургояк стала одним из лучших впечатлений этого лета.',
    name: 'Сергей Иванов',
    tour: 'Тур "Озеро Тургояк"'
  },
  {
    text: 'Великолепный маршрут! Наконец-то увидел настоящий Урал. Обязательно поеду ещё раз, но уже на более длительный срок.',
    name: 'Дмитрий Соколов',
    tour: 'Тур "Таганай"'
  }
])

// Получение данных при монтировании компонента
onMounted(async () => {
  await store.getCards()
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: 30px
  
  @media (max-width: 768px)
    grid-template-columns: 1fr
    max-width: 500px
    margin: 0 auto

.advantage-card
  background: white
  border-radius: 12px
  padding: 30px
  text-align: center
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05)
  transition: transform 0.3s, box-shadow 0.3s
  
  &:hover
    transform: translateY(-10px)
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1)
  
  .advantage-icon
    font-size: 48px
    margin-bottom: 20px
  
  h3
    color: #2c3e50
    margin-bottom: 15px
    font-size: 20px
  
  p
    color: #7f8c8d
    line-height: 1.6
    font-size: 15px

// Стили для карточек
.card-wrapper 
  display: flex
  flex-wrap: wrap
  gap: 30px
  justify-content: center

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
  
  @media (max-width: 992px)
    grid-template-columns: repeat(2, 1fr)
  
  @media (max-width: 768px)
    grid-template-columns: 1fr

.themed-tour
  position: relative
  border-radius: 12px
  overflow: hidden
  height: 280px
  cursor: pointer
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)
  
  &:hover
    .themed-tour-content
      transform: translateY(0)
      background: rgba(0, 0, 0, 0.7)
  
  img
    width: 100%
    height: 100%
    object-fit: cover
    transition: transform 0.6s
    
    &:hover
      transform: scale(1.1)

.themed-tour-content
  position: absolute
  bottom: 0
  left: 0
  right: 0
  background: rgba(0, 0, 0, 0.5)
  color: #fff
  padding: 25px
  transition: all 0.4s
  transform: translateY(calc(100% - 80px))
  
  h3
    margin: 0 0 12px
    font-size: 22px
    font-weight: 600
    
  p
    margin: 0
    font-size: 15px
    line-height: 1.6
    opacity: 0.9

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
  flex: 1
  min-height: 450px
  position: relative
  overflow: hidden
  
  &:before
    content: ""
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0))
    z-index: 1
  
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
    padding: 30px
  
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
  background: #e74c3c
  color: white
  border: none
  padding: 14px 28px
  border-radius: 50px
  font-size: 16px
  font-weight: 600
  cursor: pointer
  transition: all 0.3s
  
  &:hover
    background: #c0392b
    transform: translateY(-3px)
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)

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
  padding: 14px 32px
  border-radius: 50px
  font-weight: 600
  font-size: 16px
  text-decoration: none
  transition: all 0.3s
  
  &:hover
    background-color: rgba(255, 255, 255, 0.9)
    transform: translateY(-3px)
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)

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
  .card-wrapper
    gap: 20px

@media (max-width: 768px)
  .card-wrapper
    flex-direction: column
    align-items: center
    
  section
    margin-bottom: 60px
</style>
