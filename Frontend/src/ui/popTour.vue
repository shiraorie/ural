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
    // Определяем ID тура из доступных источников с проверкой на валидность
    let tourId = null;
    if (props.id && typeof props.id === 'number') {
        tourId = props.id;
    } else if (store.selectedTour && store.selectedTour.id) {
        tourId = store.selectedTour.id;
    } else {
        // Если ID не найден, используем хоть какую-то информацию для демонстрации
        tourId = 1;
    }
    
    console.log('Вызвана функция оплаты:', {
        tourId,
        title: props.title,
        price: props.price,
        participants: persons.value
    });
    
    // Создаем объект с данными для страницы оплаты
    const paymentData = {
        tourId,
        tourTitle: props.title,
        tourPrice: props.price,
        participants: persons.value,
        date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Данные для передачи на страницу оплаты:', paymentData);
    
    // Закрываем модальное окно перед переходом
    emit('close');
    
    // Переходим на страницу оплаты с параметрами
    router.push({
        path: '/payment',
        query: paymentData
    });
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

.tour-card
    background: white
    border-radius: 16px
    overflow: hidden
    width: 90%
    max-width: 1000px
    height: 90vh
    max-height: 800px
    display: flex
    flex-direction: column
    position: relative
    animation: slideUp 0.4s ease-out forwards
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)
    
    @media (min-width: 768px)
        flex-direction: row
        height: auto
        max-height: 90vh

@keyframes slideUp
    from
        opacity: 0
        transform: translateY(30px)
    to
        opacity: 1
        transform: translateY(0)

.close-btn
    position: absolute
    right: 15px
    top: 15px
    background: rgba(255, 255, 255, 0.9)
    border: none
    width: 40px
    height: 40px
    font-size: 24px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    z-index: 10
    transition: all 0.3s ease
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
    color: #2c3e50
    
    &:hover
        background: white
        transform: rotate(90deg)
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15)

.tour-card__gallery
    flex: 1
    min-height: 300px
    position: relative
    overflow: hidden
    
    @media (min-width: 768px)
        flex: 1
        max-width: 50%
    
    .tour-card__image
        width: 100%
        height: 100%
        object-fit: cover
        transition: transform 0.5s ease
    
    &:hover .tour-card__image
        transform: scale(1.05)

.gallery-btn
    position: absolute
    top: 50%
    transform: translateY(-50%)
    background: rgba(255, 255, 255, 0.8)
    border: none
    width: 40px
    height: 40px
    border-radius: 50%
    font-size: 20px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    transition: all 0.3s
    z-index: 5
    
    &:hover
        background: white
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)
        transform: translateY(-50%) scale(1.1)
    
    &--prev
        left: 20px
    
    &--next
        right: 20px

.tour-card__content
    flex: 1
    padding: 30px
    overflow-y: auto
    display: flex
    flex-direction: column
    
    @media (min-width: 768px)
        max-width: 50%
        
.tour-card__header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 20px
    
    .tour-card__title
        font-size: 24px
        font-weight: 700
        color: #2c3e50
        margin: 0
        position: relative
        
        &::after
            content: ''
            position: absolute
            bottom: -8px
            left: 0
            width: 60px
            height: 3px
            background: var(--color-primary)
            border-radius: 3px
    
    .tour-card__rating
        background: rgba(var(--color-primary-rgb), 0.1)
        color: var(--color-primary)
        padding: 5px 10px
        border-radius: 30px
        font-weight: 600
        font-size: 16px

.tour-card__description
    color: #34495e
    line-height: 1.6
    margin-bottom: 25px
    font-size: 16px

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
            background: #f8f9fa
            border: none
            width: 42px
            height: 42px
            font-size: 18px
            font-weight: 600
            cursor: pointer
            transition: all 0.2s
            
            &:hover:not(:disabled)
                background: #e9ecef
            
            &:disabled
                color: #adb5bd
                cursor: not-allowed
        
        span
            padding: 0 15px
            font-size: 18px
            font-weight: 600
            color: #2c3e50

.tour-card__total
    margin-bottom: 20px
    font-size: 20px
    font-weight: 700
    color: #2c3e50
    text-align: right

.tour-card__button
    width: 100%
    padding: 16px
    background: linear-gradient(135deg, #e6d595, #f0e5b5)
    color: white
    border: none
    border-radius: 10px
    font-size: 18px
    font-weight: 600
    cursor: pointer
    transition: all 0.3s
    position: relative
    overflow: hidden
    margin-top: 20px
    box-shadow: 0 5px 15px rgba(230, 213, 149, 0.2)
    
    &:hover
        transform: translateY(-3px)
        box-shadow: 0 10px 25px rgba(230, 213, 149, 0.3)
    
    &:active
        transform: translateY(0)
        box-shadow: 0 5px 15px rgba(230, 213, 149, 0.2)
    
    &::before
        content: ''
        position: absolute
        width: 100px
        height: 100%
        background: rgba(255, 255, 255, 0.3)
        top: 0
        left: -150px
        transform: skewX(-20deg)
        transition: all 0.7s ease
    
    &:hover::before
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
