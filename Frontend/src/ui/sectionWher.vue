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
    padding: 30px
    background: #fff

.map-container
    flex: 1.5
    min-height: 500px
    
    @media (max-width: 992px)
        min-height: 400px

.map
    width: 100%
    height: 100%
    border-radius: 0
    
    @media (max-width: 992px)
        border-radius: 0 0 16px 16px

.contact-title
    font-size: 24px
    font-weight: 600
    margin-bottom: 24px
    color: #2c3e50

.contact-item
    display: flex
    align-items: flex-start
    margin-bottom: 20px
    padding-bottom: 20px
    border-bottom: 1px solid #f0f0f0
    
    &:last-child
        border-bottom: none

.contact-icon
    flex: 0 0 40px
    width: 40px
    height: 40px
    background: #e9f5fe
    color: #3498db
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    margin-right: 16px
    
    svg
        width: 20px
        height: 20px

.contact-content
    flex: 1
    
    h3
        font-size: 18px
        font-weight: 600
        margin: 0 0 8px
        color: #2c3e50
    
    p
        margin: 0
        color: #5d6d7e
        line-height: 1.5
        
        a
            color: #3498db
            text-decoration: none
            transition: color 0.3s
            
            &:hover
                color: #2980b9

.call-form
    margin-top: 20px
</style>

