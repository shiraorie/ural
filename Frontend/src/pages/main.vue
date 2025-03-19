<template>
  
  <div class="container">
    <div class="main">
      <div class="main__title">
        <carousel :carouselSlides="carouselSlides" />
      </div>

      <div class="card-wrapper">
       <card v-for="card in cards" :key="card.id" :handleClick="handleClick" :title="card.title" :description="card.description" :image="card.image" :rating="card.rating" :price="card.price" :location="card.location" />
      </div>
      <sectionWher />
      <email />
  

    </div>
    <popTour v-if="isPopTourOpen" @close="closePopTour" :images="images" :title="title" :description="description" :price="price" :rating="rating" :includes="includes" />
  </div>
</template>

<script setup >
import { ref, onMounted } from 'vue'
import sectionWher from '@/ui/sectionWher.vue'
import email from '@/ui/email.vue'
import card from '@/ui/card.vue'
import carousel from '@/pages/carousel.vue'
import popTour from '@/ui/popTour.vue'

const isPopTourOpen = ref(false)

const handleClick = () => {
  isPopTourOpen.value = true
}

const closePopTour = () => {
  isPopTourOpen.value = false
}

const carouselSlides = ref([
  {
    title: 'Слайд 1',
    description: 'Описание слайда 1',
    image: 'https://avatars.mds.yandex.net/get-altay/4374841/2a0000017706403316ba81896cf7ca802576/orig'
  },
  {
    title: 'Слайд 2',
    description: 'Описание слайда 2',
    image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13'
  },
  
])


const cards = ref([
  {
    id: 1,
    title: 'Карточка 1',
    description: 'Описание карточки 1',
    image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13',
    price: 100,
    rating: 4.5,
    location: 'Локация 1'
  },
  {
    id: 2,
    title: 'Карточка 2',
    description: 'Описание карточки 2',
    image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13',
    price: 200,
    rating: 4.5,
    location: 'Локация 2'
  },
  {
    id: 3,
    title: 'Карточка 3',
    description: 'Описание карточки 3',
    image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13',
    price: 300,
    rating: 4.5,
    location: 'Локация 3'
  }
])

const images = ref(['image1.jpg', 'image2.jpg'])
const title = ref('Название тура')
const description = ref('Описание тура')
const price = ref(100)
const rating = ref(4.5)
const includes = ref(['Услуга 1', 'Услуга 2'])

onMounted(() => {
  console.log(cards.value)
  
})




</script>

<style scoped lang="sass">
.card-wrapper 
  display: flex
  gap: 20px

</style>
