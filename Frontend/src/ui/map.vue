<template>
    <div class="map">
        <a href="https://yandex.ru/maps/-/CDaWjX8y" target="_blank" class="map__link">
            <img src="https://static-maps.yandex.ru/1.x/?ll=37.530865,55.702868&z=15&l=map&pt=37.530865,55.702868,pm2rdm" alt="Карта с местоположением МГУ" class="map__image">
            <div class="map__overlay">
                <div class="map__text">МГУ им. М.В. Ломоносова</div>
                <div class="map__subtext">Нажмите чтобы открыть карту</div>
            </div>
        </a>
    </div>
</template>

<script setup>
// Не требуется JavaScript для статической карты
</script>

<style scoped lang="sass">
.map
    width: 100%
    height: 500px
    border-radius: 12px
    overflow: hidden
    position: relative

    &__link
        display: block
        width: 100%
        height: 100%
        text-decoration: none

    &__image
        width: 100%
        height: 100%
        object-fit: cover

    &__overlay
        position: absolute
        bottom: 0
        left: 0
        right: 0
        background: rgba(0, 0, 0, 0.7)
        padding: 15px
        color: white

    &__text
        font-size: 18px
        font-weight: 500
        margin-bottom: 5px

    &__subtext
        font-size: 14px
        opacity: 0.8
</style>
