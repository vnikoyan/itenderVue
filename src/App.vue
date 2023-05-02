<template>
  <div id="app">
    <NotificationAlert/>
      <component :is="this.$route.meta.layout || 'div'">
        <transition name="component-fade" mode="out-in">
          <router-view/>
        </transition>
      </component>
  </div>
</template>
<script>
  import NotificationAlert from '@/components/notifications'
  export default {
    components: {NotificationAlert},
  }
  </script>
<style scoped>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
<style>
  @font-face{ 
    font-family: GHEA grapalat;
    src: url('/fonts/gheagrpalatreg-webfont.woff') format('woff'),
  }
  .table-responsive table{
    overflow-x: scroll !important;
  }
  .tox-tinymce{
    border: 0 !important;
  }
  .tox .tox-statusbar{
    display: none !important;
  }
  .header-carousel .VueCarousel-navigation-next{
    font-size: 32px !important;
    transform: none !important;
    color: white !important;
    width: 50px !important;
    height: 50px !important;
    right: 20px !important;
    top: 50% !important;
    padding: 0 !important;
    background: linear-gradient( 
    180deg, #006BE6 0%, #43B4B2 100%) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding-bottom: 6px !important;
  }
  .header-carousel .VueCarousel-navigation-prev{
      font-size: 32px !important;
      transform: none !important;
      color: white !important;
      width: 50px !important;
      height: 50px !important;
      left: 20px !important;
      top: 50% !important;
      padding: 0 !important;
      background: linear-gradient( 
      180deg, #006BE6 0%, #43B4B2 100%) !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding-bottom: 6px !important;
  }
  .header-carousel .VueCarousel-pagination{
    margin-top: -90px;
    z-index: 100;
  }
  .header-carousel .VueCarousel-dot--active{
    background-color: #006BE6 !important;
  }
  .header-carousel .VueCarousel-dot{
    width: 15px !important;
    height: 15px !important;
  }
  .footer-carousel .VueCarousel-inner{
    height: 250px !important;
  }
  .footer-carousel .VueCarousel-inner .VueCarousel-slide .filter:hover{
    filter: grayscale(0);
    transition: .3s;
    cursor: pointer;
  }
  .footer-carousel .VueCarousel-navigation-next{
    font-size: 32px !important;
    transform: none !important;
    color: white !important;
    width: 50px !important;
    height: 50px !important;
    right: -45px !important;
    top: 40% !important;
    padding: 0 !important;
    background: linear-gradient( 
    180deg, #006BE6 0%, #43B4B2 100%) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding-bottom: 6px !important;
  }
  .footer-carousel .VueCarousel-navigation-prev{
      font-size: 32px !important;
      transform: none !important;
      color: white !important;
      width: 50px !important;
      height: 50px !important;
      left: -45px !important;
      top: 40% !important;
      padding: 0 !important;
      background: linear-gradient( 
      180deg, #006BE6 0%, #43B4B2 100%) !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding-bottom: 6px !important;
  }
  .footer-carousel .VueCarousel-navigation-next:hover{
    color: #006BE6 !important;
    border: 3px solid #43B4B2 !important;
    background: none !important;
    font-size: 29px !important;
    font-weight: 500 !important;
  }
  .footer-carousel .VueCarousel-navigation-prev:hover{
    color: #006BE6 !important;
    border: 3px solid #43B4B2 !important;
    background: none !important;
    font-size: 29px !important;
    font-weight: 500 !important;
  }
  .footer-carousel .VueCarousel-slide{
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    height: 100% !important;
  }
  .footer-carousel .VueCarousel-slide img {
    width: auto !important;
    /* max-width: 238px; */
    /* max-height: 80px; */
    max-height: 100%;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background: #FFF;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 6px; 
    background-color: #006BE6;
    outline: 1px solid #006BE6;
  }


  @media only screen and (max-width: 1100px) {
    .header-carousel .VueCarousel-dot{
      width: 10px !important;
      height: 10px !important;
    }
  }
  @media only screen and (max-width: 700px) {
    .header-carousel .VueCarousel-navigation-next{
      display: none !important;
    }
    .header-carousel .VueCarousel-navigation-prev{
      display: none !important;
    }
  }
  @media only screen and (max-width: 650px) {
    .footer-carousel .VueCarousel-inner{
      height: 150px !important;
    }
    .footer-carousel .VueCarousel-navigation-prev{
      color: #000000cc !important;
      background: none !important;
      font-size: 40px !important;
      top: 30% !important;
      font-weight: 900 !important;
      left: -25px !important;
      padding-bottom: 0 !important;
    }
    .footer-carousel .VueCarousel-navigation-next{
      color: #000000cc !important;
      background: none !important;
      font-size: 40px !important;
      top: 30% !important;
      font-weight: 900 !important;
      right: -25px !important;
      padding-bottom: 0 !important;
    }
    .footer-carousel .VueCarousel-navigation-next:hover{
      color: #000000cc !important;
      background: none !important;
      font-size: 40px !important;
      top: 30% !important;
      font-weight: 900 !important;
      right: -25px !important;
      padding-bottom: 0 !important;
      border: 0 !important;
    }
    .footer-carousel .VueCarousel-navigation-prev:hover{
      color: #000000cc !important;
      background: none !important;
      font-size: 40px !important;
      top: 30% !important;
      font-weight: 900 !important;
      left: -25px !important;
      padding-bottom: 0 !important;
      border: 0 !important;
    }
  }
  @media only screen and (max-width: 600px) {
    .header-carousel .VueCarousel-dot{
      width: 8px !important;
      height: 8px !important;
    }
  }
  @media only screen and (max-width: 430px) {
    .footer-carousel .VueCarousel-navigation-prev{
      font-size: 35px !important;
      top: 22% !important;
      font-weight: 900 !important;
    }
    .footer-carousel .VueCarousel-navigation-next{
      font-size: 35px !important;
      top: 22% !important;
      font-weight: 900 !important;
    }
    .header-carousel .VueCarousel-pagination{
      margin-top: -75px !important;
    }
  }
</style>
