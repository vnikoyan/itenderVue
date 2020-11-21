<template>
  <div id="signup-content" class="modal-content">
      <div class="text-center">
          <button aria-label="Close" data-dismiss="modal" class="close" type="button"><span
                  aria-hidden="true">×</span></button>
          <h4 class="modal-title"> {{ $t('registration.title') }}</h4>
      </div>
      <div class="modal-body">
          <div class="briefcase-bloc">
              <i class="fa fa-briefcase" aria-hidden="true"></i>
              <router-link :to="{path: 'signup'}"> {{ $t('registration.customer_1') }}</router-link>
          </div>
          <div class="briefcase-bloc">
              <i class="fa fa-building" aria-hidden="true"></i>
              <router-link :to="{path: 'state-signup'}"> {{ $t('registration.customer_2') }}</router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SignupModal'
}
</script>
<style lang="scss" scoped>
@import '/../src/assets/styles/main.scss';
</style>
