<template>
    <div class="newsletter">
        <h2 class="newsletter__title">Подпишитесь на нашу рассылку</h2>
        <p class="newsletter__text">Не пропустите важные обновления! Подпишитесь сейчас</p>
        <div class="newsletter__form">
            <input type="email" class="newsletter__input" :placeholder="placeholder" v-model="email">
            <button class="newsletter__button" @click="subscribe">{{ buttonText }}</button>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'

defineProps({
    placeholder: {
        type: String,
        default: 'Введите ваш email адрес'
    },
    buttonText: {
        type: String,
        default: 'Подписаться'
    }
})

const email = ref('')

const subscribe = () => {
    // Здесь будет логика подписки
    console.log('Email для подписки:', email.value)
}
</script>

<style scoped lang="sass">
.newsletter
    background: #f5f5f5
    padding: 2rem
    border-radius: 8px
    text-align: center

    &__title
        font-size: 24px
        margin-bottom: 1rem

    &__text
        color: #666
        margin-bottom: 1.5rem

    &__form
        display: flex
        gap: 1rem
        max-width: 500px
        margin: 0 auto

    &__input
        flex: 1
        padding: 0.75rem
        border: 1px solid #ddd
        border-radius: 4px
        font-size: 16px

        &:focus
            outline: none
            border-color: #2196F3

    &__button
        padding: 0.75rem 1.5rem
        background: #2196F3
        color: white
        border: none
        border-radius: 4px
        cursor: pointer
        font-size: 16px

        &:hover
            background: #1976D2
</style>
