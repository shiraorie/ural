<template>
    <div class="payment">
      <h1>Оплата</h1>
      <form @submit.prevent="submitPayment">
        <input type="text" v-model="name" placeholder="Имя" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="tel" v-model="phone" placeholder="Телефон" required />
        <button type="submit">Оплатить</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const name = ref('');
  const email = ref('');
  const phone = ref('');

  const submitPayment = () => {
    // Логика для обработки платежа
    console.log('Оплата выполнена:', { name: name.value, email: email.value, phone: phone.value });
  };
  </script>
  
  <style scoped>
  .payment {
    padding: 20px;
  }
  </style>