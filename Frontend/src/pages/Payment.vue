<template>
  <div class="payment-page">
    <div class="payment-container">
      <div v-if="!store.paymentInfo.isPaymentComplete" class="payment-form">
        <h1 class="payment-title">Оплата тура</h1>
        
        <div class="order-details">
          <h2>Информация о заказе</h2>
          <div class="order-item">
            <span class="order-label">Тур:</span>
            <span class="order-value">{{ store.paymentInfo.tourTitle }}</span>
          </div>
          <div class="order-item">
            <span class="order-label">Цена за человека:</span>
            <span class="order-value">₽ {{ store.paymentInfo.tourPrice }}</span>
          </div>
          <div class="order-item">
            <span class="order-label">Количество человек:</span>
            <span class="order-value">{{ store.paymentInfo.persons }}</span>
          </div>
          <div class="order-item total">
            <span class="order-label">Итого к оплате:</span>
            <span class="order-value">₽ {{ store.paymentInfo.totalPrice }}</span>
          </div>
        </div>

        <form @submit.prevent="submitPayment" class="form">
          <div class="form-group">
            <label for="name">ФИО</label>
            <input type="text" id="name" v-model="paymentForm.name" placeholder="Введите ваше полное имя" required />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="paymentForm.email" placeholder="example@mail.com" required />
          </div>
          
          <div class="form-group">
            <label for="phone">Телефон</label>
            <input type="tel" id="phone" v-model="paymentForm.phone" placeholder="+7 (999) 123-45-67" required />
          </div>

          <div class="payment-method">
            <h3>Способ оплаты</h3>
            <div class="payment-options">
              <label class="payment-option">
                <input type="radio" name="payment-method" value="card" v-model="paymentForm.method" checked>
                <span class="radio-custom"></span>
                <span>Банковской картой</span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment-method" value="cash" v-model="paymentForm.method">
                <span class="radio-custom"></span>
                <span>Наличными при получении</span>
              </label>
            </div>
          </div>

          <div v-if="paymentForm.method === 'card'" class="card-details">
            <div class="form-group">
              <label for="card-number">Номер карты</label>
              <input type="text" id="card-number" v-model="paymentForm.cardNumber" placeholder="0000 0000 0000 0000" maxlength="19" required />
            </div>
            
            <div class="form-row">
              <div class="form-group half">
                <label for="expiry">Срок действия</label>
                <input type="text" id="expiry" v-model="paymentForm.expiry" placeholder="ММ/ГГ" maxlength="5" required />
              </div>
              
              <div class="form-group half">
                <label for="cvv">CVV</label>
                <input type="password" id="cvv" v-model="paymentForm.cvv" placeholder="***" maxlength="3" required />
              </div>
            </div>
          </div>

          <div class="form-group checkbox">
            <input type="checkbox" id="agreement" v-model="paymentForm.agreement" required />
            <label for="agreement">Я согласен с <a href="#" class="link">условиями оплаты</a> и <a href="#" class="link">политикой конфиденциальности</a></label>
          </div>

          <button type="submit" class="pay-button" :disabled="!paymentForm.agreement">Оплатить</button>
        </form>
      </div>

      <div v-else class="payment-success">
        <div class="success-icon">✓</div>
        <h1>Оплата успешно выполнена!</h1>
        
        <div class="purchase-details">
          <h2>Информация о покупке</h2>
          <div class="purchase-item">
            <span class="purchase-label">Тур:</span>
            <span class="purchase-value">{{ store.paymentInfo.tourTitle }}</span>
          </div>
          <div class="purchase-item">
            <span class="purchase-label">Количество человек:</span>
            <span class="purchase-value">{{ store.paymentInfo.persons }}</span>
          </div>
          <div class="purchase-item">
            <span class="purchase-label">Стоимость:</span>
            <span class="purchase-value">₽ {{ store.paymentInfo.totalPrice }}</span>
          </div>
          <div class="purchase-item">
            <span class="purchase-label">Покупатель:</span>
            <span class="purchase-value">{{ paymentForm.name }}</span>
          </div>
          <div class="purchase-item">
            <span class="purchase-label">Контактный email:</span>
            <span class="purchase-value">{{ paymentForm.email }}</span>
          </div>
          <div class="purchase-item">
            <span class="purchase-label">Контактный телефон:</span>
            <span class="purchase-value">{{ paymentForm.phone }}</span>
          </div>
          <div class="purchase-item">
            <span class="purchase-label">Номер заказа:</span>
            <span class="purchase-value">#{{ orderNumber }}</span>
          </div>
        </div>

        <p class="success-message">
          Все детали заказа отправлены на ваш email. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
        </p>

        <div class="action-buttons">
          <button class="back-button" @click="goToHome">На главную</button>
          <button class="print-button" @click="printReceipt">Распечатать чек</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCardsStore } from '@/store';

const router = useRouter();
const store = useCardsStore();

// Генерируем номер заказа
const orderNumber = Math.floor(100000 + Math.random() * 900000);

// Данные формы оплаты
const paymentForm = ref({
  name: '',
  email: '',
  phone: '',
  method: 'card',
  cardNumber: '',
  expiry: '',
  cvv: '',
  agreement: false
});

// Проверяем, что есть данные для оплаты
onMounted(() => {
  if (store.paymentInfo.tourTitle === '') {
    router.push('/');
  }
});

// Обработка отправки формы оплаты
const submitPayment = () => {
  // Имитация процесса оплаты
  setTimeout(() => {
    store.completePayment();
  }, 1000);
};

// Переход на главную страницу
const goToHome = () => {
  store.resetPaymentInfo();
  router.push('/');
};

// Имитация печати чека
const printReceipt = () => {
  window.print();
};
</script>
  
<style scoped lang="sass">
.payment-page
  min-height: 100vh
  background-color: #f8f9fa
  padding: 40px 0

.payment-container
  max-width: 800px
  margin: 0 auto
  background-color: #fff
  border-radius: 16px
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1)
  overflow: hidden

.payment-form, .payment-success
  padding: 40px

.payment-title
  margin-bottom: 30px
  font-size: 32px
  color: #2c3e50
  text-align: center

.order-details, .purchase-details
  background-color: #f8f9fa
  border-radius: 12px
  padding: 24px
  margin-bottom: 32px

  h2
    margin-bottom: 20px
    font-size: 22px
    color: #2c3e50

.order-item, .purchase-item
  display: flex
  justify-content: space-between
  margin-bottom: 12px
  font-size: 16px
  
  &.total
    margin-top: 16px
    padding-top: 16px
    border-top: 1px solid #e9ecef
    font-weight: 700
    font-size: 18px

.order-label, .purchase-label
  color: #6c757d
  
.order-value, .purchase-value
  color: #2c3e50
  font-weight: 500

.form
  margin-top: 30px

.form-group
  margin-bottom: 24px
  
  label
    display: block
    margin-bottom: 8px
    font-size: 16px
    color: #2c3e50
    
  input[type="text"], input[type="email"], input[type="tel"], input[type="password"]
    width: 100%
    padding: 14px 16px
    border: 1px solid #ced4da
    border-radius: 10px
    font-size: 16px
    transition: border-color 0.3s
    
    &:focus
      border-color: #3498db
      outline: none
      
    &::placeholder
      color: #adb5bd

.form-row
  display: flex
  gap: 16px
  
  .half
    flex: 1

.payment-method
  margin-bottom: 24px
  
  h3
    margin-bottom: 16px
    font-size: 18px
    color: #2c3e50

.payment-options
  display: flex
  flex-direction: column
  gap: 16px

.payment-option
  display: flex
  align-items: center
  cursor: pointer
  
  input[type="radio"]
    position: absolute
    opacity: 0
    
  .radio-custom
    width: 20px
    height: 20px
    border-radius: 50%
    border: 2px solid #ced4da
    margin-right: 12px
    position: relative
    transition: border-color 0.3s
    
    &:after
      content: ""
      position: absolute
      width: 10px
      height: 10px
      border-radius: 50%
      background-color: #3498db
      top: 50%
      left: 50%
      transform: translate(-50%, -50%) scale(0)
      transition: transform 0.2s
      
  input[type="radio"]:checked + .radio-custom
    border-color: #3498db
    
    &:after
      transform: translate(-50%, -50%) scale(1)
      
  span
    font-size: 16px
    color: #2c3e50

.checkbox
  display: flex
  align-items: center
  
  input[type="checkbox"]
    margin-right: 10px
    
  label
    margin-bottom: 0
    font-size: 14px

.link
  color: #3498db
  text-decoration: none
  
  &:hover
    text-decoration: underline

.pay-button
  width: 100%
  padding: 16px
  background-color: #2ecc71
  color: white
  border: none
  border-radius: 10px
  font-size: 18px
  font-weight: 600
  cursor: pointer
  transition: all 0.3s
  
  &:hover
    background-color: #27ae60
    
  &:disabled
    background-color: #bdc3c7
    cursor: not-allowed

.payment-success
  text-align: center

.success-icon
  width: 80px
  height: 80px
  background-color: #2ecc71
  color: white
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center
  font-size: 40px
  margin: 0 auto 24px
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2)

.success-message
  margin: 30px 0
  line-height: 1.6
  color: #34495e
  font-size: 16px

.action-buttons
  display: flex
  gap: 16px
  justify-content: center
  margin-top: 32px
  
  button
    padding: 14px 24px
    border-radius: 10px
    font-weight: 600
    cursor: pointer
    transition: all 0.3s

.back-button
  background-color: #f8f9fa
  color: #2c3e50
  border: 1px solid #ced4da
  
  &:hover
    background-color: #e9ecef

.print-button
  background-color: #3498db
  color: white
  border: none
  
  &:hover
    background-color: #2980b9

// Стили для печати
@media print
  .payment-container
    box-shadow: none
    
  .action-buttons
    display: none

// Адаптивность
@media (max-width: 768px)
  .payment-page
    padding: 20px 0
    
  .payment-form, .payment-success
    padding: 24px
    
  .payment-title
    font-size: 26px
    
  .form-row
    flex-direction: column
    gap: 24px
</style>