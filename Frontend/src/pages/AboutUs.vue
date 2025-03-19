<template>
  <div class="container">
    <div class="about-us">
      <h1>О нас</h1>
      <p>Мы предлагаем лучшие туры по Свердловской области и Уралу. Наша команда профессионалов готова помочь вам организовать незабываемое путешествие.</p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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

.about-us 
  padding: 20px
  font-family: Arial, sans-serif

</style>


