<template>
  <div class="policy-page">
    <div class="policy-container">
      <h1 class="policy-title">Политика использования файлов cookie</h1>
      
      <div class="policy-section">
        <h2>Что такое файлы cookie?</h2>
        <p>Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, планшете или мобильном телефоне) при посещении нашего сайта. Они позволяют сайту запоминать ваши действия и предпочтения (такие как логин, язык, размер шрифта и другие настройки отображения) в течение определенного периода времени, чтобы вам не приходилось повторно вводить их при повторном посещении сайта или переходе с одной страницы на другую.</p>
      </div>
      
      <div class="policy-section">
        <h2>Как мы используем файлы cookie?</h2>
        <p>Мы используем файлы cookie для следующих целей:</p>
        <ul>
          <li><strong>Необходимые файлы cookie</strong>: требуются для работы нашего сайта. Они позволяют вам пользоваться основными функциями, такими как безопасный вход в аккаунт.</li>
          <li><strong>Аналитические файлы cookie</strong>: помогают нам понять, как посетители взаимодействуют с нашим сайтом, собирая и анализируя информацию анонимно.</li>
          <li><strong>Функциональные файлы cookie</strong>: позволяют сайту запоминать выбранные вами настройки (например, язык или регион) и предоставлять расширенные, персонализированные функции.</li>
          <li><strong>Целевые файлы cookie</strong>: собирают информацию о ваших привычках просмотра для доставки рекламы, соответствующей вашим интересам.</li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>Управление файлами cookie</h2>
        <p>Вы можете управлять файлами cookie через настройки вашего браузера. Вы можете удалить все ранее сохраненные файлы cookie и настроить большинство браузеров таким образом, чтобы предотвратить их сохранение. Однако в этом случае вам, возможно, придется вручную настраивать некоторые параметры при каждом посещении сайта, а некоторые функции и сервисы могут не работать.</p>
        <p>В зависимости от используемого вами браузера, вы можете настроить параметры использования файлов cookie следующим образом:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/ru/kb/kuki-informaciya-kotoruyu-veb-sajty-hranyat-na-vas" target="_blank">Mozilla Firefox</a></li>
          <li><a href="https://support.microsoft.com/ru-ru/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank">Internet Explorer</a></li>
          <li><a href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac" target="_blank">Safari</a></li>
        </ul>
      </div>
      
      <div class="policy-section">
        <h2>Сторонние файлы cookie</h2>
        <p>Мы также можем использовать сторонние файлы cookie для анализа использования нашего сайта, такие как Google Analytics. Эти файлы cookie собирают информацию о вашем использовании нашего сайта и помогают нам улучшать его функциональность.</p>
      </div>
      
      <div class="policy-section">
        <h2>Изменения в политике использования файлов cookie</h2>
        <p>Мы можем обновлять нашу политику использования файлов cookie периодически. Мы рекомендуем регулярно проверять эту страницу, чтобы быть в курсе любых изменений. Изменения в данной политике вступают в силу с момента их публикации на этой странице.</p>
      </div>
      
      <div class="policy-section">
        <h2>Связь с нами</h2>
        <p>Если у вас есть вопросы о нашей политике использования файлов cookie, пожалуйста, свяжитесь с нами:</p>
        <p>Email: <a href="mailto:info@uraltravel.ru">info@uraltravel.ru</a></p>
        <p>Телефон: <a href="tel:+79999999999">+7 (999) 999-99-99</a></p>
      </div>
      
      <div class="policy-footer">
        <p>Последнее обновление: {{ new Date().toLocaleDateString() }}</p>
        <router-link to="/" class="back-link">Вернуться на главную</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Компонент не требует дополнительной логики
</script>

<style scoped lang="sass">
.policy-page
  padding: 40px 0
  background-color: #f8f9fa

.policy-container
  max-width: 800px
  margin: 0 auto
  background-color: #fff
  border-radius: 16px
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1)
  padding: 40px
  
  @media (max-width: 768px)
    padding: 20px

.policy-title
  text-align: center
  margin-bottom: 30px
  color: #2c3e50
  font-size: 32px
  
  @media (max-width: 768px)
    font-size: 24px

.policy-section
  margin-bottom: 30px
  
  h2
    color: #3498db
    margin-bottom: 15px
    font-size: 22px
    
    @media (max-width: 768px)
      font-size: 20px
  
  p
    color: #5d6d7e
    line-height: 1.7
    margin-bottom: 15px
  
  ul
    padding-left: 20px
    margin-bottom: 15px
    
    li
      margin-bottom: 10px
      color: #5d6d7e
      line-height: 1.5
  
  a
    color: #3498db
    text-decoration: none
    
    &:hover
      text-decoration: underline

.policy-footer
  margin-top: 40px
  padding-top: 20px
  border-top: 1px solid #e9ecef
  display: flex
  flex-direction: column
  align-items: center
  
  p
    color: #7f8c8d
    margin-bottom: 15px
  
  .back-link
    background-color: #3498db
    color: white
    padding: 10px 20px
    border-radius: 30px
    text-decoration: none
    transition: background-color 0.3s
    
    &:hover
      background-color: #2980b9
</style> 