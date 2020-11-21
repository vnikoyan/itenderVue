<template>
<div id="forgot-content" class="modal-content">
  <div class="auth-logo-box">
    <a href="index.html" class="logo logo-admin">
      <img src="assets/landing/images/favicon_1.ico" alt="Itender" height="55" class="auth-logo"/>
    </a>
  </div>
    <div class="text-center">
        <h4 class="modal-title">{{ $t('recovery.title') }}</h4>
        <p> {{ $t('recovery.subtitle') }}</p>
    </div>
    <div class="modal-body">
        <form>
            <div class="form-group">
                <label for="useremail">{{ $t('recovery.label_1') }} </label>
                <span class="auth-form-icon"><i class="fa fa-envelope-o"></i></span>
                <input type="text" id="useremail"  :placeholder="$t('recovery.placeholder_1')" class="form-control-forgot">
            </div>
            <button class="btn btn-gradient-primary btn-round btn-block waves-effect waves-light" type="button">
                {{ $t('recovery.recovery_btn') }}<i class="fa fa-sign-in" aria-hidden="true"></i></button>

            <div class="loginbox02">
                <button class="btn btn-gradient-primary" type="button"> {{ $t('recovery.btn-login') }}</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
  name: 'ResetPasswordModal'
}
</script>
<style lang="scss" scoped>
@import '/../src/assets/styles/main.scss';
</style>
