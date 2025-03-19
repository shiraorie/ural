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

const router = useRouter()

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
    router.push('/payment')
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

.close-btn
    position: absolute
    top: 16px
    right: 16px
    background: none
    border: none
    color: #fff
    font-size: 32px
    cursor: pointer
    z-index: 2
    text-shadow: 0 0 4px rgba(0,0,0,0.5)

.tour-card
    position: relative
    background: #fff
    border-radius: 20px
    overflow: hidden
    box-shadow: 0 8px 32px rgba(0,0,0,0.15)
    width: 90%
    max-width: 1000px
    max-height: 90vh
    margin: 20px
    display: flex
    flex-direction: column

    @media (max-width: 768px)
        width: 95%
        margin: 10px
        border-radius: 16px

    &__gallery
        position: relative
        height: 50vh
        
        @media (max-width: 768px)
            height: 35vh

    &__image
        width: 100%
        height: 100%
        object-fit: cover

    &__indicators
        position: absolute
        bottom: 20px
        left: 50%
        transform: translateX(-50%)
        display: flex
        gap: 8px
        z-index: 1

    &__content
        padding: 32px
        overflow-y: auto
        flex: 1
        
        @media (max-width: 768px)
            padding: 20px

    &__header
        display: flex
        justify-content: space-between
        align-items: center
        margin-bottom: 24px

    &__title
        font-size: 28px
        font-weight: 700
        color: #2c3e50
        
        @media (max-width: 768px)
            font-size: 24px

    &__rating
        font-size: 24px
        color: #f1c40f
        font-weight: 600

    &__description
        margin-bottom: 28px
        line-height: 1.8
        color: #34495e
        font-size: 16px

    &__includes
        margin-bottom: 32px
        
        h3
            margin-bottom: 16px
            color: #2c3e50
            font-size: 20px
            
        ul
            list-style: none
            padding-left: 0
            
            li
                margin-bottom: 12px
                padding-left: 28px
                position: relative
                color: #34495e
                
                &:before
                    content: "✓"
                    position: absolute
                    left: 0
                    color: #2ecc71
                    font-weight: bold

    &__booking
        padding: 24px
        background: #f8f9fa
        border-radius: 16px
        margin-top: auto

    &__price
        margin-bottom: 20px
        
        .price-amount
            font-size: 32px
            font-weight: 700
            color: #2c3e50
            
        .price-unit
            color: #7f8c8d
            margin-left: 4px

    &__persons
        margin-bottom: 20px
        
        label
            display: block
            margin-bottom: 12px
            color: #34495e
            font-weight: 500
            
        .persons-control
            display: flex
            align-items: center
            gap: 20px
            
            button
                width: 40px
                height: 40px
                border-radius: 50%
                border: none
                background: #3498db
                color: white
                font-size: 20px
                cursor: pointer
                transition: all 0.3s
                
                &:hover
                    background: #2980b9
                
                &:disabled
                    background: #bdc3c7
                    cursor: not-allowed

            span
                font-size: 20px
                font-weight: 600
                color: #2c3e50

    &__total
        font-size: 24px
        font-weight: 700
        margin-bottom: 20px
        color: #2c3e50

    &__button
        width: 100%
        padding: 18px
        background: #2ecc71
        color: white
        border: none
        border-radius: 12px
        font-size: 18px
        font-weight: 600
        cursor: pointer
        transition: all 0.3s
        
        &:hover
            background: #27ae60
            transform: translateY(-2px)
            box-shadow: 0 4px 12px rgba(46,204,113,0.2)

.gallery-btn
    position: absolute
    top: 50%
    transform: translateY(-50%)
    background: rgba(255,255,255,0.9)
    border: none
    width: 48px
    height: 48px
    border-radius: 50%
    cursor: pointer
    font-size: 24px
    display: flex
    align-items: center
    justify-content: center
    transition: all 0.3s
    z-index: 1
    
    &:hover
        background: white
        transform: translateY(-50%) scale(1.1)
    
    &--prev
        left: 20px
    
    &--next
        right: 20px

.indicator
    width: 10px
    height: 10px
    border-radius: 50%
    background: rgba(255,255,255,0.6)
    cursor: pointer
    transition: all 0.3s
    
    &:hover
        background: rgba(255,255,255,0.8)
    
    &--active
        background: white
        transform: scale(1.2)
</style>
