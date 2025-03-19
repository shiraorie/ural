<template>
  <div class="payment-page">
    <div class="container">
      <h1 class="page-title">Оплата бронирования</h1>
      
      <div class="payment-content">
        <div class="order-summary">
          <h2>Информация о заказе</h2>
          <div v-if="selectedTour" class="order-details">
            <div class="tour-image">
              <img :src="selectedTour.image" :alt="selectedTour.title">
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
                <div class="meta-item">
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
              
              <button class="pay-button" @click="processPayment" :disabled="isProcessing">
                <span v-if="!isProcessing">Оплатить {{ formatPrice(totalPrice) }}</span>
                <span v-else class="loader"></span>
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
  tourId: route.query.tourId || null,
  date: route.query.date ? new Date(route.query.date) : new Date(),
  participants: Number(route.query.participants) || 1,
  discount: Number(route.query.discount) || 0
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
  if (!orderDetails.value.tourId && store.cards.length > 0) {
    // Если ID тура не указан, берем первый тур из списка (для демонстрации)
    return store.cards[0]
  }
  return store.cards.find(card => card.id === orderDetails.value.tourId) || null
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
  if (!validateAllFields()) {
    return
  }
  
  isProcessing.value = true
  
  // Имитация API запроса на обработку платежа
  setTimeout(() => {
    isProcessing.value = false
    paymentComplete.value = true
    
    // Генерация случайного номера бронирования
    bookingNumber.value = 'BK' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    
    // Можно добавить сохранение данных о заказе в store или отправку на сервер
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
  padding: 40px 0
  background-color: #f8f9fa

.container
  max-width: 1200px
  margin: 0 auto
  padding: 0 20px
  
.page-title
  text-align: center
  margin-bottom: 30px
  font-size: 32px
  color: #2c3e50
  
  @media (max-width: 768px)
    font-size: 28px

.payment-content
  display: flex
  gap: 30px
  align-items: flex-start
  
  @media (max-width: 992px)
    flex-direction: column

.order-summary, .payment-form
  background: white
  border-radius: 12px
  box-shadow: 0 5px 15px rgba(0,0,0,0.05)
  padding: 24px
  
.order-summary
  flex: 1

.payment-form
  flex: 1.5

h2
  margin-top: 0
  margin-bottom: 20px
  color: #2c3e50
  font-size: 22px

.order-details
  display: flex
  gap: 20px
  
  @media (max-width: 768px)
    flex-direction: column

.tour-image
  flex: 0 0 160px
  height: 160px
  border-radius: 8px
  overflow: hidden
  
  img
    width: 100%
    height: 100%
    object-fit: cover

.tour-info
  flex: 1

.tour-meta
  display: flex
  gap: 20px
  margin: 10px 0
  
  .meta-item
    display: flex
    align-items: center
    gap: 6px
    color: #7f8c8d
    font-size: 14px
    
    svg
      color: #3498db

.tour-price-details
  margin-top: 20px
  border-top: 1px solid #ecf0f1
  padding-top: 20px

.price-row
  display: flex
  justify-content: space-between
  margin-bottom: 10px
  font-size: 14px
  color: #5d6d7e
  
  &.discount
    color: #e74c3c
  
  &.total
    font-weight: 600
    font-size: 18px
    margin-top: 10px
    padding-top: 10px
    border-top: 1px solid #ecf0f1
    color: #2c3e50

.payment-methods
  display: flex
  gap: 10px
  margin-bottom: 20px

.payment-method
  padding: 12px 16px
  border: 1px solid #ddd
  border-radius: 8px
  display: flex
  align-items: center
  gap: 10px
  cursor: pointer
  transition: all 0.3s
  
  &.active
    border-color: #3498db
    background: rgba(52, 152, 219, 0.05)
  
  .method-icon
    color: #3498db
  
  .method-name
    font-weight: 500

.card-details
  .form-group
    margin-bottom: 16px
    
    label
      display: block
      margin-bottom: 8px
      font-size: 14px
      color: #5d6d7e
    
    input[type="text"], input[type="password"]
      width: 100%
      padding: 12px
      border: 1px solid #ddd
      border-radius: 8px
      font-size: 16px
      
      &:focus
        outline: none
        border-color: #3498db
      
      &.invalid
        border-color: #e74c3c
        background: rgba(231, 76, 60, 0.05)
    
    &.checkbox
      display: flex
      align-items: center
      gap: 8px
      
      label
        margin-bottom: 0
      
      input
        cursor: pointer

.form-row
  display: flex
  gap: 16px
  
  .form-group
    flex: 1

.error-message
  color: #e74c3c
  font-size: 12px
  margin-top: 4px
  display: block

.pay-button
  width: 100%
  padding: 14px
  background: #2ecc71
  color: white
  border: none
  border-radius: 8px
  font-size: 16px
  font-weight: 600
  cursor: pointer
  margin-top: 20px
  transition: background 0.3s
  display: flex
  justify-content: center
  align-items: center
  
  &:hover
    background: #27ae60
  
  &:disabled
    background: #95a5a6
    cursor: not-allowed

.secure-info
  display: flex
  align-items: center
  gap: 8px
  margin-top: 16px
  color: #7f8c8d
  font-size: 13px
  justify-content: center

// Лоадер для кнопки
.loader
  width: 20px
  height: 20px
  border: 2px solid rgba(255,255,255,0.3)
  border-radius: 50%
  border-top-color: white
  animation: spin 1s ease-in-out infinite

@keyframes spin
  to
    transform: rotate(360deg)

// Успешная оплата
.payment-success
  text-align: center
  padding: 20px

.success-icon
  color: #2ecc71
  margin-bottom: 20px
  
  svg
    animation: scaleUp 0.5s ease-out

@keyframes scaleUp
  0%
    transform: scale(0)
  70%
    transform: scale(1.1)
  100%
    transform: scale(1)

.success-message
  margin-bottom: 30px
  color: #5d6d7e
  font-size: 18px

.booking-details
  text-align: left
  background: #f8f9fa
  padding: 20px
  border-radius: 8px
  margin-bottom: 30px
  
  p
    margin: 8px 0
    color: #2c3e50

.success-actions
  .home-button
    display: inline-block
    padding: 12px 24px
    background: #3498db
    color: white
    text-decoration: none
    border-radius: 30px
    font-weight: 600
    transition: background 0.3s
    
    &:hover
      background: #2980b9
</style>