<template>
    <div class="card">
        <img :src="image" :alt="title" class="card__image">
        <div class="card__content">
            <div class="card__header">
                <h3 class="card__title">{{ title }}</h3>
                <div class="card__rating">{{ rating }} ★</div>
            </div>
            <div class="card__location">
                <span>{{ location }}</span>
            </div>
            <div class="card__price">
                <span>${{ price }}/{{ priceUnit }}</span>
            </div>
            <button class="card__button">Забронировать</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceUnit: {
        type: String,
        default: 'Person'
    }
})
</script>

<style scoped lang="sass">
.card
    background: #fff
    border-radius: 12px
    overflow: hidden
    box-shadow: 0 2px 8px rgba(0,0,0,0.1)
    width: 300px

    &__image
        width: 100%
        height: 200px
        object-fit: cover

    &__content
        padding: 16px

    &__header
        display: flex
        justify-content: space-between
        align-items: center
        margin-bottom: 8px

    &__title
        font-size: 18px
        font-weight: 600
        margin: 0

    &__rating
        color: #ffd700
        font-weight: 600

    &__location
        color: #666
        font-size: 14px
        margin-bottom: 8px

    &__price
        font-size: 16px
        font-weight: 600
        margin-bottom: 16px

    &__button
        width: 100%
        padding: 12px
        background: #1e88e5
        color: white
        border: none
        border-radius: 6px
        font-size: 16px
        cursor: pointer
        transition: background 0.3s

        &:hover
            background: #1976d2
</style>
