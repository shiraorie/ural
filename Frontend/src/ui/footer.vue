<template>
  
        <footer>
            <div class="container">
            <div class="footer__content">
                <div class="footer__logo">
                   
                    <LogoB />
                </div>
                <div class="footer__links">
                    <div class="footer__column">
                        <h3>Навигация</h3>
                        <router-link to="/">Главная</router-link>
                        <router-link to="/about">О нас</router-link>
                        <router-link to="/news">Новости</router-link>
                    </div>
                    <div class="footer__column">
                        <h3>Соц сети</h3>
                        <a href="https://vk.com" target="_blank" rel="noopener noreferrer">Вконтакте</a>
                        <a href="https://t.me" target="_blank" rel="noopener noreferrer">Telegram</a>
                    </div>
                    <div class="footer__column">
                        <h3>О сайте</h3>
                        <router-link to="/policies/cookie">Cookie</router-link>
                        <router-link to="/policies/privacy">Политика конфиденциальности</router-link>
                        <router-link to="/policies/terms">Пользовательское соглашение</router-link>
                    </div>
                    <div class="footer__column">
                        <h3>Контакты</h3>
                        <a href="tel:+79999999999">+7 (999) 999-99-99</a>
                        <a href="mailto:info@uraltravel.ru">info@uraltravel.ru</a>
                    </div>
                </div>
                <div class="footer__copyright">
                    <p>&copy; {{ new Date().getFullYear() }} "Память Урала". Все права защищены.</p>
                </div>
            </div>  
        </div>
        </footer>
    
</template>

<script setup>
import LogoB from '../assets/icon/logoB.vue';


</script>

<style scoped lang="sass">
footer
    padding: 40px 0 
    background: var(--color-main)
    width: 100%
    margin-top: 8px

.footer__content
    display: flex
    flex-direction: column
    gap: 40px

.footer__links
    display: flex
    justify-content: space-between
    gap: 20px
    
    @media (max-width: 768px)
        flex-wrap: wrap
        
        .footer__column
            flex: 0 0 calc(50% - 20px)
            
    @media (max-width: 576px)
        .footer__column
            flex: 0 0 100%

.footer__column
    display: flex
    flex-direction: column
    gap: 15px
    h3
        color: #000
        font-size: 16px
        font-weight: 600
        margin-bottom: 5px
    a
        color: #666
        text-decoration: none
        font-size: 14px
        &:hover
            color: #333

.footer__social
    display: flex
    gap: 20px
    justify-content: center
    a
        color: #666
        font-size: 20px
        &:hover
            color: #333
            
.footer__copyright
    text-align: center
    color: #666
    font-size: 14px
    border-top: 1px solid rgba(0, 0, 0, 0.1)
    padding-top: 20px
</style>
