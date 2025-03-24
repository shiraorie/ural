<template>
    <div class="overlay" @click.self="$emit('close')">
        <div class="tour-card">
            <button class="close-btn" @click="$emit('close')">&times;</button>
            <div class="tour-card__gallery">
                <button class="gallery-btn gallery-btn--prev" @click="prevImage" v-show="currentImageIndex > 0">
                    ←
                </button>
                <img :src="images[currentImageIndex]" :alt="title" class="tour-card__image">
                <button class="gallery-btn gallery-btn--next" @click="nextImage" v-show="currentImageIndex < images.length - 1">
                    →
                </button>
                <div class="tour-card__indicators">
                    <span v-for="(_, index) in images" 
                          :key="index"
                          :class="['indicator', { 'indicator--active': currentImageIndex === index }]"
                          @click="currentImageIndex = index">
                    </span>
                </div>
            </div>

            <div class="tour-card__content">
                <div class="tour-card__header">
                    <h2 class="tour-card__title">{{ title }}</h2>
                    <div class="tour-card__rating">{{ rating }} ★</div>
                </div>

                <p class="tour-card__description">{{ description }}</p>

                <div class="tour-card__includes">
                    <h3>В тур включено:</h3>
                    <ul>
                        <li v-for="(item, index) in includes" :key="index">
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <div class="tour-card__booking">
                    <div class="tour-card__price">
                        <span class="price-amount">₽ {{ price }}</span>
                        <span class="price-unit">/человек</span>
                    </div>
                    
                    <div class="tour-card__persons">
                        <label>Количество человек:</label>
                        <div class="persons-control">
                            <button @click="decrementPersons" :disabled="persons <= 1">-</button>
                            <span>{{ persons }}</span>
                            <button @click="incrementPersons">+</button>
                        </div>
                    </div>

                    <div class="tour-card__total">
                        <span>Итого: ₽ {{ totalPrice }}</span>
                    </div>

                    <button class="tour-card__button" @click="handlePayment">
                        Оплатить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCardsStore } from '@/store'

const router = useRouter()
const store = useCardsStore()
const emit = defineEmits(['close'])

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    includes: {
        type: Array,
        required: true
    },
    id: {
        type: Number,
        default: null
    }
})

const currentImageIndex = ref(0)
const persons = ref(1)

const totalPrice = computed(() => {
    return props.price * persons.value
})

const nextImage = () => {
    if (currentImageIndex.value < props.images.length - 1) {
        currentImageIndex.value++
    }
}

const prevImage = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--
    }
}

const incrementPersons = () => {
    persons.value++
}

const decrementPersons = () => {
    if (persons.value > 1) {
        persons.value--
    }
}

const handlePayment = () => {
    console.log('Вызвана функция оплаты, данные тура:', props.title, 'ID:', props.id || (store.selectedTour ? store.selectedTour.id : 'не определен'))
    
    // Создаем объект с данными для страницы оплаты
    const paymentData = {
        tourId: props.id || (store.selectedTour ? store.selectedTour.id : 1),
        tourTitle: props.title,
        tourPrice: props.price,
        participants: persons.value,
        date: new Date().toISOString().split('T')[0]
    }
    
    console.log('Данные для передачи на страницу оплаты:', paymentData)
    
    // Закрываем модальное окно перед переходом
    emit('close')
    
    // Переходим на страницу оплаты с параметрами
    router.push({
        path: '/payment',
        query: paymentData
    })
}
</script>

<style scoped lang="sass">
.overlay
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0, 0, 0, 0.75)
    display: flex
    align-items: center
    justify-content: center
    z-index: 1000
    backdrop-filter: blur(5px)
    animation: fadeIn 0.3s ease forwards

@keyframes fadeIn
    from
        opacity: 0
    to
        opacity: 1

.close-btn
    position: absolute
    top: 16px
    right: 16px
    background: rgba(255, 255, 255, 0.8)
    border: none
    color: #333
    font-size: 32px
    cursor: pointer
    z-index: 10
    width: 40px
    height: 40px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    transition: all 0.3s ease
    box-shadow: 0 2px 10px rgba(0,0,0,0.1)
    
    &:hover
        background: white
        transform: rotate(90deg)
        box-shadow: 0 5px 15px rgba(0,0,0,0.2)

.tour-card
    position: relative
    background: #fff
    border-radius: 20px
    overflow: hidden
    box-shadow: 0 8px 42px rgba(0,0,0,0.2)
    width: 90%
    max-width: 1000px
    max-height: 90vh
    margin: 20px
    display: flex
    flex-direction: column
    transform: translateY(0)
    animation: popIn 0.5s ease-out forwards

@keyframes popIn
    0%
        opacity: 0
        transform: translateY(30px) scale(0.95)
    100%
        opacity: 1
        transform: translateY(0) scale(1)

.tour-card__gallery
    position: relative
    height: 50vh
    
    @media (max-width: 768px)
        height: 35vh

.tour-card__image
    width: 100%
    height: 100%
    object-fit: cover
    transition: transform 0.8s ease

.gallery-btn
    position: absolute
    top: 50%
    transform: translateY(-50%)
    background: rgba(255, 255, 255, 0.8)
    border: none
    width: 50px
    height: 50px
    border-radius: 50%
    font-size: 24px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    z-index: 2
    transition: all 0.3s ease
    box-shadow: 0 2px 10px rgba(0,0,0,0.1)
    
    &:hover
        background: white
        box-shadow: 0 5px 15px rgba(0,0,0,0.2)
    
    &--prev
        left: 20px
    
    &--next
        right: 20px

.tour-card__content
    padding: 32px
    overflow-y: auto
    flex: 1
    
    @media (max-width: 768px)
        padding: 20px

.tour-card__header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 24px
    position: relative
    
    &::after
        content: ''
        position: absolute
        bottom: -12px
        left: 0
        width: 80px
        height: 3px
        background-color: var(--color-primary)
        border-radius: 2px

.tour-card__title
    font-size: 32px
    font-weight: 700
    color: #2c3e50
    margin: 0
    
    @media (max-width: 768px)
        font-size: 26px

.tour-card__rating
    font-size: 24px
    color: #ffd700
    font-weight: 600
    padding: 5px 12px
    background: rgba(255, 215, 0, 0.1)
    border-radius: 30px
    display: flex
    align-items: center

.tour-card__description
    margin-bottom: 28px
    line-height: 1.8
    color: #34495e
    font-size: 17px

.tour-card__includes
    margin-bottom: 32px
    padding: 25px
    background: #f8f9fa
    border-radius: 16px
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05)
    
    h3
        margin-top: 0
        margin-bottom: 20px
        color: #2c3e50
        font-size: 22px
        position: relative
        display: inline-block
        
        &::after
            content: ''
            position: absolute
            bottom: -8px
            left: 0
            width: 40px
            height: 3px
            background-color: var(--color-primary)
            border-radius: 2px
        
    ul
        list-style: none
        padding-left: 0
        margin: 0
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))
        gap: 15px
        
        li
            padding-left: 30px
            position: relative
            color: #34495e
            font-size: 16px
            
            &::before
                content: '✓'
                position: absolute
                left: 0
                color: #2ecc71
                font-weight: bold
                font-size: 18px

.tour-card__booking
    background: #f8f9fa
    padding: 25px
    border-radius: 16px
    box-shadow: 0 5px 20px rgba(0,0,0,0.05)

.tour-card__price
    display: flex
    align-items: baseline
    margin-bottom: 20px
    color: #2c3e50
    
    .price-amount
        font-size: 28px
        font-weight: 700
        position: relative
        
        &::after
            content: ''
            position: absolute
            width: 100%
            height: 6px
            background-color: rgba(var(--color-primary-rgb), 0.2)
            bottom: 5px
            left: 0
            z-index: -1
            border-radius: 2px
    
    .price-unit
        margin-left: 5px
        font-size: 16px
        color: #7f8c8d

.tour-card__persons
    margin-bottom: 20px
    
    label
        display: block
        margin-bottom: 10px
        color: #2c3e50
        font-weight: 600
    
    .persons-control
        display: flex
        align-items: center
        background: white
        border-radius: 8px
        overflow: hidden
        box-shadow: 0 2px 8px rgba(0,0,0,0.05)
        
        button
            background: white
            border: none
            width: 42px
            height: 42px
            font-size: 18px
            cursor: pointer
            transition: all 0.3s
            
            &:hover:not(:disabled)
                background-color: #f5f5f5
            
            &:disabled
                color: #ccc
                cursor: not-allowed
        
        span
            flex: 1
            text-align: center
            font-size: 18px
            font-weight: 600
            padding: 0 15px

.tour-card__total
    margin-bottom: 20px
    font-size: 20px
    font-weight: 700
    color: #2c3e50
    text-align: right

.tour-card__button
    width: 100%
    padding: 16px
    background: linear-gradient(to right, #3498db, #2980b9)
    color: white
    border: none
    border-radius: 10px
    font-size: 18px
    font-weight: 600
    cursor: pointer
    transition: all 0.3s
    position: relative
    overflow: hidden
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3)
    
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
        transform: translateY(-5px)
        box-shadow: 0 15px 30px rgba(52, 152, 219, 0.4)
        
        &::before
            left: 100%

.tour-card__indicators
    position: absolute
    bottom: 20px
    left: 50%
    transform: translateX(-50%)
    display: flex
    gap: 8px
    z-index: 1

.indicator
    width: 12px
    height: 12px
    border-radius: 50%
    background-color: rgba(255, 255, 255, 0.5)
    cursor: pointer
    transition: all 0.3s
    border: 2px solid transparent
    
    &--active
        background-color: var(--color-primary)
        transform: scale(1.2)
        border-color: white
    
    &:hover
        transform: scale(1.2)
        background-color: white
</style>
