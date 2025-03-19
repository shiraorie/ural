<template>
    <div class="newsletter">
        <h2 class="newsletter__title">Подпишитесь на нашу рассылку</h2>
        <p class="newsletter__text">Не пропустите важные обновления! Подпишитесь сейчас</p>
        
        <transition name="fade">
            <div v-if="showSuccess" class="newsletter__success">
                <div class="success-icon">✓</div>
                <p>Вы успешно подписались на нашу рассылку!</p>
                <button class="close-button" @click="resetForm">Закрыть</button>
            </div>
        </transition>
        
        <div v-if="!showSuccess" class="newsletter__form">
            <input 
                type="email" 
                class="newsletter__input" 
                :class="{ 'error': emailError }" 
                :placeholder="placeholder" 
                v-model="email"
                @input="validateEmail"
            >
            <button 
                class="newsletter__button" 
                @click="subscribe"
                :disabled="!isValidEmail || email === ''"
            >
                {{ buttonText }}
            </button>
        </div>
        <p v-if="emailError" class="newsletter__error">Пожалуйста, введите корректный email адрес</p>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue'

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
const emailError = ref(false)
const showSuccess = ref(false)

const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    emailError.value = email.value !== '' && !emailRegex.test(email.value)
}

const isValidEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.value)
})

const subscribe = () => {
    if (!isValidEmail.value) {
        emailError.value = true
        return
    }
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
        console.log('Email для подписки:', email.value)
        showSuccess.value = true
    }, 500)
}

const resetForm = () => {
    email.value = ''
    emailError.value = false
    showSuccess.value = false
}
</script>

<style scoped lang="sass">
.newsletter
    background: #f5f5f5
    padding: 2.5rem
    border-radius: 8px
    text-align: center
    position: relative

    &__title
        font-size: 24px
        margin-bottom: 1rem
        color: #2c3e50

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
            
        &.error
            border-color: #e74c3c

    &__button
        padding: 0.75rem 1.5rem
        background: #2196F3
        color: white
        border: none
        border-radius: 4px
        cursor: pointer
        font-size: 16px
        transition: background 0.3s

        &:hover
            background: #1976D2
            
        &:disabled
            background: #b0bec5
            cursor: not-allowed
            
    &__error
        color: #e74c3c
        font-size: 14px
        margin-top: 8px
        text-align: left
        max-width: 500px
        margin-left: auto
        margin-right: auto
        
    &__success
        background: #e8f5e9
        border-radius: 8px
        padding: 24px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        max-width: 500px
        margin: 0 auto
        
        p
            margin: 16px 0
            color: #2e7d32
            font-size: 18px
            
        .success-icon
            width: 50px
            height: 50px
            background: #4caf50
            color: white
            border-radius: 50%
            display: flex
            align-items: center
            justify-content: center
            font-size: 28px
            
        .close-button
            padding: 8px 16px
            background: #4caf50
            color: white
            border: none
            border-radius: 4px
            cursor: pointer
            font-size: 14px
            transition: background 0.3s
            
            &:hover
                background: #388e3c

// Анимация появления/исчезновения уведомления
.fade-enter-active, .fade-leave-active
    transition: opacity 0.5s

.fade-enter-from, .fade-leave-to
    opacity: 0

// Медиа-запросы
@media (max-width: 576px)
    .newsletter
        padding: 1.5rem
        
        &__form
            flex-direction: column
            
        &__button
            width: 100%
</style>
