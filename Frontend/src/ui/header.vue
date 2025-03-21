<template>
    <div class="container">
        <header>
           <div class="left"> <div class="header__logo">
                <router-link to="/">
                    <logoB />
                </router-link>
            </div></div>
            <div class="right">
                <div class="header__menu">
                    <router-link to="/">Главная</router-link>
                    <router-link to="/tours">Туры</router-link>
                    <router-link to="/news">Новости</router-link>
                    <router-link to="/about">О нас</router-link>
                </div>
            </div>
        </header>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import logoB from '@/assets/icon/logoB.vue'
</script>

<style scoped lang="sass">

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
        font-size:24px
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

</style>

