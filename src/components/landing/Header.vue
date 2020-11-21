<template>
  <header id="header">
    <div class="header-bottom ">
      <div class="container">
        <div class="row row d-flex justify-content-between">
          <div class="col-6 d-flex align-items-center contact-col">
            <div class="phone"> <i class="fa fa-phone"></i>
              <a href="tel:+37410244974">+374 10 24 49 74</a>
            </div>
            <div class="mail"> <i class="fa fa-envelope"></i>
              <a href="mailto:info@itender.am"> info@itender.am </a>
            </div>
          </div>

          <div class="col-6 ml-auto d-flex justify-content-end" >
            <ul class="list-unstyled topbar-nav">
              <li class="hidden-sm">
                <a class="nav-link dropdown-toggle waves-effect waves-light m-0 languages-icon" data-toggle="dropdown" role="button"
                   aria-haspopup="false" aria-expanded="false">
                  {{lng}} <img :src="'/assets/landing/images/flags/'+lng+'.jpg'"  class="ml-2" height="16" width="21" alt=""/> <i class="mdi mdi-chevron-down"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right languages-dropdown-menu">
                  <button class="dropdown-item" @click="chngelng('hy')" ><span> ARM </span><img src="/assets/landing/images/flags/hy.jpg" alt="" class="ml-2 float-right" height="14"/></button>
                  <button class="dropdown-item" @click="chngelng('ru')" ><span> RUS </span><img src="/assets/landing/images/flags/ru.jpg" alt="" class="ml-2 float-right" height="14"/></button>
                  <button class="dropdown-item" @click="chngelng('us')" ><span> ENG </span><img src="/assets/landing/images/flags/us.jpg" alt="" class="ml-2 float-right" height="14"/></button>
                </div>
              </li>
            </ul>
            <router-link to="/login">
              <button type="button" class="btn login">{{ $t('header.login_register') }}</button>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    lng () {
      return this.$store.getters["user/locale"];
    }
  },
  methods:{
    chngelng(lng){
      this.$store.dispatch("user/setLocale",lng);
      this.$i18n.locale = this.lng;
    }
  }
}
</script>
