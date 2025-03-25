<template>
    <div class="section-where">
        <div class="contact-info">
            <h2 class="contact-title">Наши контакты</h2>
            
            <div class="contact-item">
                <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                </div>
                <div class="contact-content">
                    <h3>Телефон</h3>
                    <p><a href="tel:+79999999999">+7 (999) 999-99-99</a></p>
                </div>
            </div>
            
            <div class="contact-item">
                <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>
                <div class="contact-content">
                    <h3>Email</h3>
                    <p><a href="mailto:info@uraltravel.ru">info@uraltravel.ru</a></p>
                </div>
            </div>
            
            <div class="contact-item">
                <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                </div>
                <div class="contact-content">
                    <h3>Адрес</h3>
                    <p>г. Екатеринбург, ул. Уральская, 1</p>
                </div>
            </div>
            
            <div class="contact-item">
                <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </div>
                <div class="contact-content">
                    <h3>Режим работы</h3>
                    <p>Пн-Пт: 9:00 - 18:00<br>Сб: 10:00 - 16:00<br>Вс: выходной</p>
                </div>
            </div>
            
        </div>
        
        <div class="map-container">
            <Map class="map" />
        </div>
    </div>
</template>

<script setup>

import Map from '@/ui/map.vue'
</script>

<style scoped lang="sass">
.section-where
    display: flex
    gap: 30px
    background: #f8f9fa
    border-radius: 16px
    overflow: hidden
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05)
    
    @media (max-width: 992px)
        flex-direction: column

.contact-info
    flex: 1
    padding: 40px
    background: white
    border-radius: 20px
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05)
    
    @media (max-width: 992px)
        padding: 30px
    
    @media (max-width: 576px)
        padding: 25px
        border-radius: 20px 20px 0 0

.map-container
    flex: 1.5
    min-height: 500px
    position: relative
    overflow: hidden
    border-radius: 0 20px 20px 0
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05)
    
    @media (max-width: 1200px)
        min-height: 450px
    
    @media (max-width: 992px)
        min-height: 400px
        border-radius: 0 0 20px 20px
    
    @media (max-width: 768px)
        min-height: 350px
    
    @media (max-width: 576px)
        min-height: 300px

.map
    width: 100%
    height: 100%
    border: none
    transition: all 0.3s ease
    
    &:hover
        filter: contrast(110%)

.contact-title
    font-size: 28px
    font-weight: 700
    margin-bottom: 30px
    color: #2c3e50
    position: relative
    padding-bottom: 15px
    
    &::after
        content: ''
        position: absolute
        bottom: 0
        left: 0
        width: 50px
        height: 3px
        background: var(--color-primary)
        border-radius: 2px
    
    @media (max-width: 992px)
        font-size: 24px
        margin-bottom: 25px
    
    @media (max-width: 576px)
        font-size: 22px
        margin-bottom: 20px

.contact-item
    display: flex
    align-items: flex-start
    margin-bottom: 25px
    padding-bottom: 25px
    border-bottom: 1px solid #f0f0f0
    transition: all 0.3s ease
    
    &:last-child
        border-bottom: none
        margin-bottom: 0
        padding-bottom: 0
    
    &:hover
        transform: translateX(10px)
        
        .contact-icon
            background: var(--color-primary)
            color: white
    
    @media (max-width: 576px)
        margin-bottom: 20px
        padding-bottom: 20px

.contact-icon
    flex: 0 0 45px
    width: 45px
    height: 45px
    background: #f8f9fa
    color: var(--color-primary)
    border-radius: 12px
    display: flex
    align-items: center
    justify-content: center
    margin-right: 20px
    transition: all 0.3s ease
    
    @media (max-width: 576px)
        flex: 0 0 40px
        width: 40px
        height: 40px
        margin-right: 15px
    
    svg
        width: 22px
        height: 22px
        
        @media (max-width: 576px)
            width: 20px
            height: 20px

.contact-content
    flex: 1
    
    h3
        font-size: 18px
        font-weight: 600
        margin: 0 0 8px
        color: #2c3e50
        
        @media (max-width: 576px)
            font-size: 16px
            margin-bottom: 6px
    
    p
        margin: 0
        color: #5d6d7e
        line-height: 1.6
        font-size: 15px
        
        @media (max-width: 576px)
            font-size: 14px
        
        a
            color: var(--color-primary)
            text-decoration: none
            transition: all 0.3s ease
            font-weight: 500
            
            &:hover
                filter: brightness(0.9)
                transform: translateY(-1px)

.call-form
    margin-top: 30px
    padding-top: 30px
    border-top: 1px solid #f0f0f0
    
    @media (max-width: 576px)
        margin-top: 25px
        padding-top: 25px
</style>

