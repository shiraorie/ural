<template>
    <div class="container">
        <div class="section-where">

            <call />
        <Map class="map" />
        </div>
    </div>
</template>

<script setup>
import call from '@/ui/call.vue'
import Map from '@/ui/map.vue'
</script>

<style scoped lang="sass">
.section-where
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    gap: 20px
</style>

