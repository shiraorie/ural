<template>
  <div class="container">
    <!-- Секция с каруселью -->
    <section class="hero-section">
      <carousel :carouselSlides="carouselSlides" />
    </section>

    <!-- Секция с карточками туров -->
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

    <!-- Секция с информацией "Где находимся" -->
    <section class="where-section">
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
  margin-bottom: 60px

.section-title
  margin-bottom: 30px
  font-size: 28px
  font-weight: 600
  text-align: center

// Стили для карточек
.card-wrapper 
  display: flex
  flex-wrap: wrap
  gap: 20px
  justify-content: center

// Медиа-запросы для адаптивности
@media (max-width: 768px)
  .card-wrapper
    flex-direction: column
    align-items: center
</style>
