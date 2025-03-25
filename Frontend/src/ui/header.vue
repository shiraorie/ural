<template>


 <div class="container">
        <header>
            <div class="left">
                <div class="header__logo">
                    <router-link to="/">
                        <logoB />
                    </router-link>
                </div>
            </div>
            <div class="right">
                <div class="header__menu" :class="{ 'active': isMenuOpen }">
                    <router-link to="/" @click="closeMenu">Главная</router-link>
                    <router-link to="/tours" @click="closeMenu">Туры</router-link>
                    <router-link to="/news" @click="closeMenu">Новости</router-link>
                    <router-link to="/about" @click="closeMenu">О нас</router-link>
                </div>
                <div class="burger-menu" @click="toggleMenu">
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
<path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
<path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
<path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
</svg>
                </div>
            </div>
        </header>
        <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>
    </div>
 <div v-if="isMenuOpen" class="close-content" @click="closeMenu"> 
 </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import logoB from '@/assets/icon/logoB.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isCloseContentOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
    isMenuOpen.value = false
    document.body.style.overflow = ''
}

// Закрытие меню при клике вне его области
const handleClickOutside = (event) => {
    const menu = document.querySelector('.header__menu')
    const burger = document.querySelector('.burger-menu')
    if (isMenuOpen.value && menu && !menu.contains(event.target) && !burger.contains(event.target)) {
        closeMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="sass">

.close-content
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1
    background-color: rgba(0, 0, 0, 0.5)


header
    background-color: var(--color-primary)
    color: var(--color-secondary)
    padding: 10px
    display: flex
    justify-content: space-between
    align-items: center
    height: 70px
    width: 100%
    align-items: center
    justify-content: space-between

.header__logo
    font-size: 24px
    font-weight: 700
    a
        color: var(--color-secondary)
        text-decoration: none
        font-size: 24px
        font-weight: 700
        transition: color 0.3s ease
        &:hover
            color: var(--color-tertiary)

.header__menu
    display: flex
    gap: 20px
    a
        color: var(--color-secondary)
        text-decoration: none
        font-size: 16px
        font-weight: 500
        transition: color 0.3s ease
        &:hover
            color: var(--color-tertiary)

.burger-menu
    display: none
    flex-direction: column
    gap: 6px
    cursor: pointer
    z-index: 1000
    span
        display: block
        width: 25px
        height: 3px
        background-color: var(--color-secondary)
        transition: all 0.3s ease
    svg
        width: 25px
        height: 25px
        background-color: var(--color-secondary)
        transition: all 0.3s ease

.overlay
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    z-index: 998

@media (max-width: 768px)
    .burger-menu
        display: flex

    .header__menu
        position: fixed
        top: 0
        right: -100%
        width: 80%
        height: 100vh
        background-color: white
        flex-direction: column
        padding: 80px 20px
        transition: right 0.3s ease
        z-index: 999
        
        a
            color: var(--color-primary)
            font-size: 20px
            padding: 15px 0
            border-bottom: 1px solid rgba(0, 0, 0, 0.1)
            
            &:hover
                color: var(--color-tertiary)

    .header__menu.active
        right: 0
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1)

    .burger-menu.active
        span
            &:first-child
                transform: rotate(45deg) translate(8px, 8px)
            &:nth-child(2)
                opacity: 0
            &:last-child
                transform: rotate(-45deg) translate(7px, -7px)
</style>
