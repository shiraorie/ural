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
                        <a href="#">Главная</a>
                        <a href="#">О нас</a>
                        <a href="#">Контакты</a>
                    </div>
                    <div class="footer__column">
                        <h3>Соц сети</h3>
                        <a href="#">Вконтакте</a>
                        <a href="#">Telegram</a>
                    </div>
                    <div class="footer__column">
                        <h3>О сайте</h3>
                        <a href="#">Cookie</a>
                        <a href="#">Политика конфиденциальности</a>
                        <a href="#">Условия использования</a>
                    </div>
                    <div class="footer__column">
                        <h3>Контакты</h3>
                        <a href="tel:+79999999999"> +7 (999) 999-99-99</a>
                        <a href="mailto:info@example.com">info@example.com</a>
                    </div>
                </div>
                <div class="footer__social">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
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
</style>
