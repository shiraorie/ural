<template>
    <div class="tour-purchase">
      <h1>Покупка тура</h1>
      <p>Выберите тур и заполните форму для его покупки.</p>
      <div class="tour-list">
        <div class="tour-item" v-for="tour in tours" :key="tour.id">
          <h2>{{ tour.name }}</h2>
          <p>{{ tour.description }}</p>
          <button @click="selectTour(tour)">Купить</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const tours = ref([
    { id: 1, name: 'Тур по Уралу', description: 'Увлекательный тур по живописным местам Урала.' },
    { id: 2, name: 'Исторический тур', description: 'Погружение в историю Свердловской области.' },
  ]);

  const selectTour = (tour) => {
    // Логика для выбора тура
    console.log('Выбран тур:', tour);
  };
  </script>
  
  <style scoped>
  .tour-purchase {
    padding: 20px;
  }
  .tour-item {
    margin-bottom: 20px;
  }
  </style>