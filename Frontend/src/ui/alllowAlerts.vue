<template>
    <transition name="slide-up">
      <div v-if="isVisible" class="notification-prompt">
        <div class="notification-content">
          <div class="notification-icon">
            <span class="bell-icon">🔔</span>
          </div>
          <div class="notification-text">
            <h3>Будьте в курсе новых туров!</h3>
            <p>Получайте уведомления о новых маршрутах и специальных предложениях</p>
          </div>
          <div class="notification-actions">
            <button class="allow-button" @click="requestPermission">
              Разрешить
            </button>
            <button class="deny-button" @click="hidePrompt">
              Не сейчас
            </button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const isVisible = ref(false)
  
  const hidePrompt = () => {
    isVisible.value = false
    // Сохраняем в localStorage, чтобы не показывать снова
    localStorage.setItem('notificationPromptShown', 'true')
  }
  
  const requestPermission = async () => {
    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          // Разрешение получено
          new Notification('Уведомления включены!', {
            body: 'Спасибо! Теперь вы будете получать уведомления о новых турах.',
            icon: '/favicon.ico'
          })
        }
      }
      hidePrompt()
    } catch (error) {
      console.error('Ошибка при запросе разрешения:', error)
    }
  }
  
  onMounted(() => {
    // Проверяем, показывали ли мы уже запрос
    const hasShown = localStorage.getItem('notificationPromptShown')
    
    // Показываем запрос только если:
    // 1. Мы еще не показывали его
    // 2. Браузер поддерживает уведомления
    // 3. Пользователь еще не дал разрешение
    if (!hasShown && 'Notification' in window && Notification.permission === 'default') {
      // Показываем с небольшой задержкой после загрузки страницы
      setTimeout(() => {
        isVisible.value = true
      }, 2000)
    }
  })
  </script>
  
  <style scoped lang="sass">
  .notification-prompt
    position: fixed
    bottom: 20px
    right: 20px
    z-index: 1000
    max-width: 400px
    width: 90%
    background: white
    border-radius: 16px
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15)
    overflow: hidden
  
  .notification-content
    padding: 20px
    display: flex
    flex-direction: column
    gap: 15px
  
  .notification-icon
    display: flex
    justify-content: center
    margin-bottom: 5px
    
    .bell-icon
      font-size: 32px
      animation: ring 1s ease infinite
      transform-origin: 50% 0
  
  .notification-text
    text-align: center
    
    h3
      margin: 0 0 8px
      color: #2c3e50
      font-size: 18px
      font-weight: 600
    
    p
      margin: 0
      color: #666
      font-size: 14px
      line-height: 1.5
  
  .notification-actions
    display: flex
    gap: 10px
    margin-top: 5px
  
    button
      flex: 1
      padding: 12px
      border: none
      border-radius: 8px
      font-size: 14px
      font-weight: 600
      cursor: pointer
      transition: all 0.3s ease
  
  .allow-button
    background: linear-gradient(45deg, #e6d595, #f0e5b5)
    color: #000
    
    &:hover
      transform: translateY(-2px)
      box-shadow: 0 5px 15px rgba(230, 213, 149, 0.3)
  
  .deny-button
    background: #f5f5f5
    color: #666
    
    &:hover
      background: #ebebeb
      color: #333
  
  // Анимации
  @keyframes ring
    0%
      transform: rotate(0)
    20%, 50%
      transform: rotate(-8deg)
    40%, 60%
      transform: rotate(8deg)
    100%
      transform: rotate(0)
  
  .slide-up-enter-active,
  .slide-up-leave-active
    transition: all 0.3s ease
  
  .slide-up-enter-from,
  .slide-up-leave-to
    transform: translateY(100%)
    opacity: 0
  
  // Медиа-запросы
  @media (max-width: 480px)
    .notification-prompt
      bottom: 0
      right: 0
      width: 100%
      max-width: 100%
      border-radius: 16px 16px 0 0
    
    .notification-content
      padding: 15px
    
    .notification-text
      h3
        font-size: 16px
      
      p
        font-size: 13px
    
    .notification-actions
      button
        padding: 10px
        font-size: 13px
  </style>