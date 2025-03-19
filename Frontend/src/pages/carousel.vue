<template>
  <div class="carousel">
    <div class="carousel-inner" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(slide, index) in carouselSlides" :key="index" class="carousel-slide">
        <img :src="slide.image" :alt="slide.title">
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
        </div>
      </div>
    </div>
    
    <button class="carousel-button prev" @click="prevSlide">&#10094;</button>
    <button class="carousel-button next" @click="nextSlide">&#10095;</button>
    
    <div class="carousel-dots">
      <span 
        v-for="(slide, index) in carouselSlides" 
        :key="index"
        :class="['dot', { active: currentSlide === index }]"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  carouselSlides: {
    type: Array,
    required: true,
    default: () => [
      {
        title: 'Слайд 1',
        description: 'Описание слайда 1',
        image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13'
      },
      {
        title: 'Слайд 2', 
        description: 'Описание слайда 2',
        image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13'
      },
      {
        title: 'Слайд 3',
        description: 'Описание слайда 3', 
        image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13'
      }
    ]
  }
})

const currentSlide = ref(0)
const timer = ref(null)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.carouselSlides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? props.carouselSlides.length - 1 
    : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  timer.value = setInterval(nextSlide, 5000)
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  
  &-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  &-slide {
    min-width: 100%;
    position: relative;
    
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
    
    .slide-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      
      h2 {
        margin: 0 0 10px;
        font-size: 24px;
      }
      
      p {
        margin: 0;
        font-size: 16px;
      }
    }
  }
  
  &-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 16px;
    cursor: pointer;
    font-size: 18px;
    
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    
    &.prev {
      left: 10px;
    }
    
    &.next {
      right: 10px;
    }
  }
  
  &-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      
      &.active {
        background: white;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
