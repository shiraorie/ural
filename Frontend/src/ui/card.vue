<template>
    <div class="card" @click="handleClick">
     
        <img 
            :src="processImageUrl(image)" 
            :alt="title" 
            class="card__image" 
            @error="handleImageError"
        >
        <div class="card__content">
            <div class="card__header">
                <h3 class="card__title">{{ title }}</h3>
                <div class="card__rating" v-if="rating > 0">
                    <span class="star">★</span>
                    {{ rating.toFixed(1) }}
                </div>
            </div>
            <div class="card__location" v-if="location">
                <span class="location-icon">📍</span>
                {{ location }}
            </div>
            <div class="card__price" v-if="price > 0">
                <span>{{ formatPrice(price) }} {{ priceUnit }}</span>
            </div>
            <button class="card__button" @click.stop="handleClick">
                Забронировать
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
    handleClick: {
        type: Function as PropType<(e: MouseEvent) => void>,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: 'https://via.placeholder.com/300x200'
    },
    title: {
        type: String,
        required: true,
        default: 'Название тура'
    },
    rating: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    priceUnit: {
        type: String,
        default: '₽'
    }
})

// Форматирование цены
const formatPrice = (value: number): string => {
    try {
        return new Intl.NumberFormat('ru-RU').format(value)
    } catch (error) {
        console.error('Ошибка форматирования цены:', error)
        return value.toString()
    }
}

// Обработка путей к изображениям
const processImageUrl = (url: string): string => {
    if (!url) return 'https://via.placeholder.com/300x200?text=Нет+изображения'
    
    // Если это абсолютный URL, возвращаем как есть
    if (url.startsWith('http') || url.startsWith('https')) {
        return url
    }
    
    // Если это относительный путь, добавляем базовый URL
    const baseUrl = import.meta.env.BASE_URL || '/'
    return `${baseUrl}${url.startsWith('/') ? url.slice(1) : url}`
}

// Обработка ошибки загрузки изображения
const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    console.log('Ошибка загрузки изображения:', {
        originalSrc: target.src,
        props: {
            image: props.image,
            title: props.title
        }
    })
    target.src = 'https://via.placeholder.com/300x200?text=Изображение+не+найдено'
}

onMounted(() => {
    console.log('Card mounted with props:', {
        title: props.title,
        price: props.price,
        rating: props.rating,
        location: props.location,
        image: processImageUrl(props.image)
    })
})
</script>

<style scoped lang="sass">
.card
    background: #fff
    border-radius: 16px
    overflow: hidden
    box-shadow: 0 10px 30px rgba(0,0,0,0.1)
    width: 100%
    max-width: 320px
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)
    position: relative
    transform: translateY(0)
    margin: 0 auto
    
    &:hover
        transform: translateY(-15px) 
        box-shadow: 0 20px 40px rgba(0,0,0,0.15)
        
        .card__image
            transform: scale(1.05)
            
        .card__button
            background: linear-gradient(45deg, #1e88e5, #4dabf5)
            box-shadow: 0 10px 20px rgba(30, 136, 229, 0.3)

    &__image
        width: 100%
        height: 220px
        object-fit: cover
        transition: transform 0.6s ease
        position: relative
        
        &::after
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background: linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.1))
            pointer-events: none

    &__content
        padding: 20px

    &__header
        display: flex
        justify-content: space-between
        align-items: center
        margin-bottom: 12px

    &__title
        font-size: 20px
        font-weight: 700
        margin: 0
        color: #2c3e50
        position: relative
        display: inline-block
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        max-width: 200px
        padding-bottom: 2px
        
        &::after
            content: ''
            position: absolute
            bottom: 0
            left: 0
            width: 0
            height: 2px
            background-color: var(--color-primary)
            transition: width 0.3s ease
            
        &:hover::after
            width: 100%

    &__rating
        color: #ffd700
        font-weight: 700
        background: rgba(255, 215, 0, 0.1)
        padding: 5px 10px
        border-radius: 30px
        font-size: 14px
        display: flex
        align-items: center
        gap: 4px

    &__location
        color: #666
        font-size: 14px
        margin-bottom: 12px
        display: flex
        align-items: center
        gap: 5px

        .location-icon
            font-size: 16px

    &__price
        font-size: 18px
        font-weight: 700
        margin-bottom: 20px
        color: #2c3e50
        
        span
            position: relative
            
            &::before
                content: ''
                position: absolute
                width: 100%
                height: 30%
                background-color: rgba(var(--color-primary-rgb), 0.2)
                bottom: 0
                left: 0
                z-index: -1
                border-radius: 2px

    &__button
        width: 100%
        padding: 14px
        background: #1e88e5
        color: white
        border: none
        border-radius: 10px
        font-size: 16px
        font-weight: 600
        cursor: pointer
        transition: all 0.3s
        position: relative
        overflow: hidden
        
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
            transform: translateY(-3px)
            background: #1976d2
</style>
