<template>
    <div id="map" class="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // Загружаем API Яндекс Карт
    const script = document.createElement('script')
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU'
    document.head.appendChild(script)

    script.onload = () => {
        // Инициализируем карту после загрузки API
        ymaps.ready(() => {
            const map = new ymaps.Map('map', {
                center: [55.702868, 37.530865], // Координаты МГУ
                zoom: 15
            })

            // Добавляем метку на карту
            const placemark = new ymaps.Placemark([55.702868, 37.530865], {
                balloonContent: 'МГУ им. М.В. Ломоносова'
            })

            map.geoObjects.add(placemark)
        })
    }
})
</script>

<style scoped lang="sass">
.map
    width: 100%
    height: 500px
    border-radius: 12px
    overflow: hidden
</style>
