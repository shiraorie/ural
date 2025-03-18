<template>
    <div class="contact">
        <h1 class="contact__title">Get in <span>Touch</span></h1>
        
        <p class="contact__text">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
        </p>

        <form class="contact__form">
            <input type="text" class="contact__input" placeholder="Name *" required>
            <input type="email" class="contact__input" placeholder="Email" required>
            <input type="tel" class="contact__input" placeholder="Phone number *" required>
            
            <div class="contact__select">
                <select>
                    <option disabled selected>How did you find us?</option>
                    <option>Google</option>
                    <option>Social Media</option>
                    <option>Friend</option>
                    <option>Other</option>
                </select>
            </div>

            <button type="submit" class="contact__button">SEND</button>
        </form>

        <div class="contact__info">
            <div class="contact__item">
                <div class="contact__icon">
                    <i class="fas fa-phone"></i>
                </div>
                <div class="contact__details">
                    <h3>PHONE</h3>
                    <a href="tel:03 5432 1234">03 5432 1234</a>
                </div>
            </div>

            <div class="contact__item">
                <div class="contact__icon">
                    <i class="fas fa-fax"></i>
                </div>
                <div class="contact__details">
                    <h3>FAX</h3>
                    <span>03 5432 1234</span>
                </div>
            </div>

            <div class="contact__item">
                <div class="contact__icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="contact__details">
                    <h3>EMAIL</h3>
                    <a href="mailto:info@marcc.com.au">info@marcc.com.au</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped lang="sass">

.contact
    max-width: 600px
    margin: 0 auto
    padding: 40px 20px

    &__title
        font-size: 42px
        font-weight: 500
        margin-bottom: 20px
        span
            color: #2196F3

    &__text
        color: #666
        margin-bottom: 40px
        line-height: 1.6

    &__form
        display: flex
        flex-direction: column
        gap: 20px
        margin-bottom: 40px

    &__input
        width: 100%
        padding: 15px
        border: 1px solid #E0E0E0
        border-radius: 8px
        font-size: 16px
        &:focus
            outline: none
            border-color: #2196F3

    &__select
        position: relative
        select
            width: 100%
            padding: 15px
            border: 1px solid #E0E0E0
            border-radius: 8px
            font-size: 16px
            appearance: none
            background: #fff
            cursor: pointer
            &:focus
                outline: none
                border-color: #2196F3

    &__button
        background: #2196F3
        color: white
        padding: 15px
        border: none
        border-radius: 8px
        font-size: 16px
        font-weight: 500
        cursor: pointer
        transition: background 0.3s


</style>
