<template>
  
        <footer>
            <div class="container">
            <div class="footer__content">
                <div class="footer__logo">
                    <img src="../assets/logo.svg" alt="logo" />
                </div>
                <div class="footer__links">
                    <div class="footer__column">
                        <h3>Solutions</h3>
                        <a href="#">Services</a>
                        <a href="#">Speakers</a>
                        <a href="#">Careers</a>
                    </div>
                    <div class="footer__column">
                        <h3>Resources</h3>
                        <a href="#">Blog</a>
                        <a href="#">Press releases</a>
                    </div>
                    <div class="footer__column">
                        <h3>Company</h3>
                        <a href="#">About Us</a>
                        <a href="#">Open roles</a>
                        <a href="#">Media inquiries</a>
                        <a href="#">Log in</a>
                    </div>
                    <div class="footer__column">
                        <h3>Contact Us</h3>
                        <a href="#">Support</a>
                        <a href="#">Sales</a>
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
