<template>
  <div class="payment-page">
    <div class="container">
      <h1 class="page-title">Оплата бронирования</h1>
      
      <div v-if="isPaymentSuccessful" class="payment-success">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Оплата прошла успешно!</h2>
        <p class="success-message">
          Спасибо за ваш заказ. Информация о бронировании была отправлена на ваш email.
        </p>
        <div class="booking-details">
          <p><strong>Номер заказа:</strong> #{{ Math.floor(Math.random() * 1000000).toString().padStart(6, '0') }}</p>
          <p><strong>Тур:</strong> {{ selectedTour?.title || 'Неизвестный тур' }}</p>
          <p><strong>Дата:</strong> {{ formatDate(orderDetails.date) }}</p>
          <p><strong>Количество человек:</strong> {{ orderDetails.participants }}</p>
          <p><strong>Сумма:</strong> {{ formatPrice(totalPrice) }}</p>
        </div>
        <div class="success-actions">
          <a href="/" class="home-button">Вернуться на главную</a>
        </div>
      </div>
      
      <div v-else class="payment-content">
        <div class="order-summary">
          <h2>Информация о заказе</h2>
          <div v-if="selectedTour" class="order-details">
            <div class="tour-image">
              <img :src="selectedTour.image || 'https://proza.ru/pics/2022/11/03/1598.jpg'" :alt="selectedTour.title">
            </div>
            <div class="tour-info">
              <h3>{{ selectedTour.title }}</h3>
              <div class="tour-meta">
                <div class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{{ formatDate(orderDetails.date) }}</span>
                </div>
                <div class="meta-item" v-if="selectedTour.location">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{{ selectedTour.location }}</span>
                </div>
              </div>
              <div class="tour-price-details">
                <div class="price-row">
                  <span>Базовая стоимость</span>
                  <span>{{ formatPrice(selectedTour.price) }}</span>
                </div>
                <div class="price-row">
                  <span>Количество человек</span>
                  <span>{{ orderDetails.participants }}</span>
                </div>
                <div v-if="orderDetails.discount > 0" class="price-row discount">
                  <span>Скидка</span>
                  <span>-{{ formatPrice(orderDetails.discount) }}</span>
                </div>
                <div class="price-row total">
                  <span>Итого к оплате:</span>
                  <span>{{ formatPrice(totalPrice) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-tour-info">
            <div class="warning-icon">⚠️</div>
            <h3>Информация о туре не найдена</h3>
            <p>Не удалось загрузить данные о выбранном туре. Пожалуйста, вернитесь на страницу выбора туров и попробуйте снова.</p>
            <router-link to="/tours" class="back-button">Вернуться к выбору туров</router-link>
          </div>
        </div>
        
        <div class="payment-form">
          <div v-if="!paymentComplete" class="card-payment">
            <h2>Способ оплаты</h2>
            
            <div class="payment-methods">
              <div class="payment-method active">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </div>
                <div class="method-name">Банковская карта</div>
              </div>
            </div>
            
            <div class="card-details">
              <div class="form-group">
                <label for="card-number">Номер карты</label>
                <input 
                  type="text" 
                  id="card-number" 
                  placeholder="XXXX XXXX XXXX XXXX" 
                  v-model="paymentDetails.cardNumber"
                  @input="formatCardNumber"
                  :class="{ 'invalid': errors.cardNumber }"
                >
                <span v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</span>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="expiry">Срок действия</label>
                  <input 
                    type="text" 
                    id="expiry" 
                    placeholder="ММ/ГГ" 
                    v-model="paymentDetails.expiryDate"
                    @input="formatExpiryDate"
                    :class="{ 'invalid': errors.expiryDate }"
                  >
                  <span v-if="errors.expiryDate" class="error-message">{{ errors.expiryDate }}</span>
                </div>
                
                <div class="form-group">
                  <label for="cvv">CVV/CVC</label>
                  <input 
                    type="password" 
                    id="cvv" 
                    placeholder="XXX" 
                    v-model="paymentDetails.cvv"
                    @input="validateCVV"
                    maxlength="3"
                    :class="{ 'invalid': errors.cvv }"
                  >
                  <span v-if="errors.cvv" class="error-message">{{ errors.cvv }}</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="name">Имя владельца карты</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Имя Фамилия" 
                  v-model="paymentDetails.cardholderName"
                  :class="{ 'invalid': errors.cardholderName }"
                >
                <span v-if="errors.cardholderName" class="error-message">{{ errors.cardholderName }}</span>
              </div>
              
              <div class="form-group checkbox">
                <input type="checkbox" id="save-card" v-model="paymentDetails.saveCard">
                <label for="save-card">Сохранить карту для будущих платежей</label>
              </div>
              
              <button 
                class="pay-button" 
                @click="processPayment" 
                :disabled="isProcessing">
                <span v-if="isProcessing">
                  <span class="loader"></span>
                  Обработка...
                </span>
                <span v-else>
                  Оплатить {{ formatPrice(totalPrice) }}
                </span>
              </button>
              
              <div class="secure-info">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Безопасная оплата по шифрованному соединению</span>
              </div>
            </div>
          </div>
          
          <div v-else class="payment-success">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2>Оплата прошла успешно!</h2>
            <p class="success-message">Спасибо за ваш заказ. Информация о бронировании отправлена на ваш email.</p>
            <div class="booking-details">
              <p><strong>Номер бронирования:</strong> {{ bookingNumber }}</p>
              <p><strong>Дата оплаты:</strong> {{ formatDate(new Date()) }}</p>
              <p><strong>Сумма:</strong> {{ formatPrice(totalPrice) }}</p>
            </div>
            <div class="success-actions">
              <router-link to="/" class="home-button">Вернуться на главную</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCardsStore } from '@/store'

const store = useCardsStore()
const route = useRoute()
const router = useRouter()

// Данные заказа
const orderDetails = ref({
  tourId: Number(route.query.tourId) || null,
  tourTitle: route.query.tourTitle || '',
  tourPrice: Number(route.query.tourPrice) || 0,
  date: route.query.date ? new Date(route.query.date) : new Date(),
  participants: Number(route.query.participants) || 1,
  discount: Number(route.query.discount) || 0
})

// Вывод диагностической информации
console.log('Данные полученные из URL:', {
  tourId: route.query.tourId,
  tourTitle: route.query.tourTitle,
  tourPrice: route.query.tourPrice,
  date: route.query.date,
  participants: route.query.participants
})

// Детали платежа
const paymentDetails = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: '',
  saveCard: false
})

// Состояния для обработки платежа
const isProcessing = ref(false)
const paymentComplete = ref(false)
const bookingNumber = ref('')
const errors = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: ''
})

// Получение выбранного тура
const selectedTour = computed(() => {
  console.log('Поиск тура с ID:', orderDetails.value.tourId, 'в массиве карточек:', store.cards.length)
  
  // Если у нас есть данные тура из URL, создадим временный объект
  if (orderDetails.value.tourTitle && orderDetails.value.tourPrice && !orderDetails.value.tourId) {
    console.log('Создаю временный объект тура из данных URL')
    return {
      id: 0,
      title: orderDetails.value.tourTitle,
      price: orderDetails.value.tourPrice,
      image: 'https://proza.ru/pics/2022/11/03/1598.jpg',
      location: 'Урал',
    }
  }
  
  // Если ID тура указан, ищем его в хранилище
  if (orderDetails.value.tourId) {
    const foundTour = store.cards.find(card => card.id === Number(orderDetails.value.tourId))
    console.log('Найден тур из хранилища:', foundTour ? 'Да' : 'Нет')
    return foundTour || null
  }
  
  // Если ID не указан, берем первый тур из списка
  if (store.cards.length > 0) {
    console.log('Использую первый тур из списка для демонстрации')
    return store.cards[0]
  }
  
  return null
})

// Вычисление итоговой стоимости
const totalPrice = computed(() => {
  if (!selectedTour.value) return 0
  return (selectedTour.value.price * orderDetails.value.participants) - orderDetails.value.discount
})

// Форматирование данных
const formatPrice = (price) => {
  return `${price.toLocaleString('ru-RU')} ₽`
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

// Форматирование номера карты
const formatCardNumber = () => {
  let value = paymentDetails.value.cardNumber.replace(/\D/g, '')
  let formattedValue = ''
  
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += ' '
    }
    formattedValue += value[i]
  }
  
  paymentDetails.value.cardNumber = formattedValue.slice(0, 19)
  validateCardNumber()
}

// Форматирование даты истечения срока
const formatExpiryDate = () => {
  let value = paymentDetails.value.expiryDate.replace(/\D/g, '')
  
  if (value.length > 2) {
    paymentDetails.value.expiryDate = value.slice(0, 2) + '/' + value.slice(2, 4)
  } else {
    paymentDetails.value.expiryDate = value
  }
  
  validateExpiryDate()
}

// Валидация CVV
const validateCVV = () => {
  let value = paymentDetails.value.cvv.replace(/\D/g, '')
  paymentDetails.value.cvv = value
  
  if (!value) {
    errors.value.cvv = 'Введите CVV код'
  } else if (value.length < 3) {
    errors.value.cvv = 'CVV код должен содержать 3 цифры'
  } else {
    errors.value.cvv = ''
  }
}

// Валидация номера карты
const validateCardNumber = () => {
  const cardNumber = paymentDetails.value.cardNumber.replace(/\s/g, '')
  
  if (!cardNumber) {
    errors.value.cardNumber = 'Введите номер карты'
  } else if (cardNumber.length < 16) {
    errors.value.cardNumber = 'Номер карты должен содержать 16 цифр'
  } else {
    errors.value.cardNumber = ''
  }
}

// Валидация срока действия
const validateExpiryDate = () => {
  const expiry = paymentDetails.value.expiryDate
  
  if (!expiry) {
    errors.value.expiryDate = 'Введите срок действия'
    return
  }
  
  const parts = expiry.split('/')
  if (parts.length !== 2) {
    errors.value.expiryDate = 'Неверный формат'
    return
  }
  
  const month = parseInt(parts[0])
  const year = parseInt('20' + parts[1])
  
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  
  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    errors.value.expiryDate = 'Неверный месяц'
  } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
    errors.value.expiryDate = 'Карта просрочена'
  } else {
    errors.value.expiryDate = ''
  }
}

// Валидация имени владельца
const validateCardholderName = () => {
  if (!paymentDetails.value.cardholderName) {
    errors.value.cardholderName = 'Введите имя владельца карты'
  } else if (paymentDetails.value.cardholderName.length < 3) {
    errors.value.cardholderName = 'Имя слишком короткое'
  } else {
    errors.value.cardholderName = ''
  }
}

// Проверка всех полей перед отправкой
const validateAllFields = () => {
  validateCardNumber()
  validateExpiryDate()
  validateCVV()
  validateCardholderName()
  
  return !errors.value.cardNumber && 
         !errors.value.expiryDate && 
         !errors.value.cvv && 
         !errors.value.cardholderName
}

// Обработка платежа
const processPayment = () => {
  // Проверка валидности формы
  validateAllFields()
  
  if (!validateAllFields()) {
    return
  }
  
  // Имитация процесса оплаты
  isProcessing.value = true
  
  setTimeout(() => {
    isProcessing.value = false
    paymentComplete.value = true
    
    // Сохраняем информацию о заказе в localStorage для примера
    const orderInfo = {
      tourId: orderDetails.value.tourId,
      tourTitle: selectedTour.value?.title || 'Неизвестный тур',
      totalPrice: totalPrice.value,
      date: orderDetails.value.date,
      participants: orderDetails.value.participants,
      orderId: Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    }
    
    try {
      localStorage.setItem('lastOrder', JSON.stringify(orderInfo))
    } catch (e) {
      console.error('Не удалось сохранить данные о заказе:', e)
    }
  }, 2000)
}

// Получение данных при монтировании компонента
onMounted(async () => {
  if (store.cards.length === 0) {
    await store.getCards()
  }
  
  // Если нет ID тура в query params и у нас есть туры, установим первый тур (для демонстрации)
  if (!orderDetails.value.tourId && store.cards.length > 0) {
    orderDetails.value.tourId = store.cards[0].id
  }
})
</script>

<style scoped lang="sass">
.payment-page
  padding: 50px 0
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ef 100%)
  min-height: 100vh

.container
  max-width: 1200px
  margin: 0 auto
  padding: 0 20px
  
.page-title
  text-align: center
  margin-bottom: 30px
  font-size: 32px
  color: #2c3e50
  font-weight: 700
  position: relative
  display: inline-block
  left: 50%
  transform: translateX(-50%)
  
  &::after
    content: ''
    position: absolute
    bottom: -10px
    left: 0
    width: 100px
    height: 4px
    background: var(--color-primary)
    border-radius: 4px
    left: 50%
    transform: translateX(-50%)

.payment-content
  display: grid
  grid-template-columns: 1fr 1.5fr
  gap: 30px
  
  @media (max-width: 992px)
    grid-template-columns: 1fr
    
.order-summary
  background: white
  border-radius: 16px
  overflow: hidden
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08)
  transition: transform 0.3s, box-shadow 0.3s
  
  h2
    padding: 20px 25px
    margin: 0
    background: #f8f9fa
    border-bottom: 1px solid #e9ecef
    font-size: 22px
    color: #2c3e50
    
  .order-details
    display: flex
    flex-direction: column
    
    .tour-image
      height: 200px
      overflow: hidden
      
      img
        width: 100%
        height: 100%
        object-fit: cover
        transition: transform 0.5s
        
        &:hover
          transform: scale(1.05)
  
  .tour-info
    padding: 25px
    
    h3
      margin: 0 0 20px
      font-size: 20px
      color: #2c3e50
      
  .tour-meta
    display: flex
    flex-wrap: wrap
    gap: 15px
    margin-bottom: 25px
    
    .meta-item
      display: flex
      align-items: center
      font-size: 14px
      color: #7f8c8d
      
      svg
        margin-right: 8px
        color: var(--color-primary)
  
  .tour-price-details
    background: #f8f9fa
    padding: 20px
    border-radius: 10px
    
    .price-row
      display: flex
      justify-content: space-between
      padding: 10px 0
      font-size: 15px
      color: #2c3e50
      
      &:not(:last-child)
        border-bottom: 1px dashed #e9ecef
      
      &.discount
        color: #e74c3c
      
      &.total
        font-weight: 700
        font-size: 18px
        margin-top: 10px
        padding-top: 15px
        border-top: 2px solid #e9ecef
        
.payment-form
  background: white
  border-radius: 16px
  overflow: hidden
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08)
  
  h2
    padding: 20px 25px
    margin: 0
    background: #f8f9fa
    border-bottom: 1px solid #e9ecef
    font-size: 22px
    color: #2c3e50
  
  .card-payment
    padding: 25px

.payment-methods
  display: flex
  margin-bottom: 30px
  border-bottom: 1px solid #e9ecef
  padding-bottom: 20px
  
  .payment-method
    display: flex
    align-items: center
    padding: 15px 20px
    border-radius: 10px
    background: #f8f9fa
    cursor: pointer
    transition: all 0.3s
    
    &.active
      background: rgba(var(--color-primary-rgb), 0.1)
      border: 2px solid var(--color-primary)
      
    .method-icon
      margin-right: 10px
      
      svg
        color: var(--color-primary)
      
    .method-name
      font-weight: 600
      color: #2c3e50

.card-details
  .form-group
    margin-bottom: 25px
    
    label
      display: block
      margin-bottom: 8px
      font-size: 14px
      color: #7f8c8d
      font-weight: 500
    
    input[type="text"], 
    input[type="password"]
      width: 100%
      padding: 14px
      border: 2px solid #e9ecef
      border-radius: 10px
      font-size: 16px
      transition: all 0.3s
      
      &:focus
        outline: none
        border-color: var(--color-primary)
        box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1)
      
      &.invalid
        border-color: #e74c3c
        
    .error-message
      color: #e74c3c
      font-size: 12px
      margin-top: 5px
  
  .form-row
    display: flex
    gap: 20px
    
    @media (max-width: 576px)
      flex-direction: column
      gap: 15px
    
    .form-group
      flex: 1
  
  .checkbox
    display: flex
    align-items: center
    
    input[type="checkbox"]
      margin-right: 10px
      width: 18px
      height: 18px
      
    label
      margin: 0
      font-size: 14px
      color: #2c3e50
  
  .pay-button
    width: 100%
    padding: 18px
    background: linear-gradient(to right, #3498db, #2980b9)
    color: white
    border: none
    border-radius: 10px
    font-size: 18px
    font-weight: 600
    cursor: pointer
    transition: all 0.3s
    margin-top: 10px
    position: relative
    overflow: hidden
    
    &::before
      content: ''
      position: absolute
      top: 0
      left: -100%
      width: 100%
      height: 100%
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
      transition: left 0.7s ease
    
    &:hover
      transform: translateY(-3px)
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)
      
      &::before
        left: 100%
    
    &:disabled
      background: #bdc3c7
      cursor: not-allowed
    
    .loader
      display: inline-block
      width: 20px
      height: 20px
      border: 3px solid rgba(255,255,255,0.3)
      border-radius: 50%
      border-top-color: white
      animation: spin 1s linear infinite
  
  .secure-info
    display: flex
    align-items: center
    justify-content: center
    margin-top: 20px
    font-size: 13px
    color: #7f8c8d
    
    svg
      margin-right: 8px
      color: #27ae60
      
.payment-success
  text-align: center
  padding: 40px 25px
  
  .success-icon
    display: flex
    justify-content: center
    margin-bottom: 25px
    
    svg
      color: #2ecc71
      
  h2
    font-size: 28px
    margin-bottom: 15px
    color: #2c3e50
    background: none
    border: none
    padding: 0
    
  .success-message
    font-size: 16px
    color: #7f8c8d
    margin-bottom: 30px
    
  .booking-details
    background: #f8f9fa
    padding: 20px
    border-radius: 10px
    text-align: left
    margin-bottom: 30px
    
    p
      margin: 10px 0
      font-size: 15px
      
      strong
        color: #2c3e50
        
  .success-actions
    .home-button
      display: inline-block
      padding: 16px 36px
      background: linear-gradient(to right, #3498db, #2980b9)
      color: white
      text-decoration: none
      border-radius: 30px
      font-weight: 600
      transition: all 0.3s
      position: relative
      overflow: hidden
      
      &::before
        content: ''
        position: absolute
        top: 0
        left: -100%
        width: 100%
        height: 100%
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
        transition: left 0.7s ease
      
      &:hover
        transform: translateY(-3px)
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)
        
        &::before
          left: 100%
          
.no-tour-info
  text-align: center
  padding: 40px 20px
  
  .warning-icon
    font-size: 60px
    color: #e74c3c
    margin-bottom: 25px
    
  h3
    font-size: 24px
    color: #2c3e50
    margin-bottom: 15px
    
  p
    color: #7f8c8d
    font-size: 16px
    margin-bottom: 25px
    max-width: 600px
    margin-left: auto
    margin-right: auto
    
  .back-button
    display: inline-block
    padding: 14px 30px
    background: linear-gradient(to right, #3498db, #2980b9)
    color: white
    text-decoration: none
    border-radius: 30px
    font-weight: 600
    transition: all 0.3s
    
    &:hover
      transform: translateY(-3px)
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)
      
@keyframes spin
  to
    transform: rotate(360deg)
</style>