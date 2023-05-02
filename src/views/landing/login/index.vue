<template>
  <div class="auth-main-block">
    <div class="d-flex align-items-center justify-content-center">
      <div class="login-block">
        <signup-modal v-if="showSignupModal" />
        <div
          v-if="!showSignupModal && !showResetPasswordModal"
          class="itenter-pop"
          :class="{'shake': isErrorShake}"
        >
          <div class="auth-header text-center">
            <h4 class="mb-0">Մուտք</h4>
            <p class="mb-0">Լրացրեք համակարգ մուտք գործելու տվյալները</p>
          </div>
          <div class="modal-body">
            <form class="position-relative">
              <span 
                v-if="authErrors" 
                class="mb-3 d-block w-100 text-center text-danger" 
              >
                  {{getErrorMessage(authErrors)}}
              </span>
              <span 
                v-if="authMessage" 
                class="mb-3 d-block w-100 text-center text-primary" 
              >
                  {{authMessage}}
              </span>
              <div>
                <div class="input-group">
                  <float-label :dispatch="false" class="w-100">
                    <input
                      v-model="$v.fields.username.$model"
                      @input="errorMsgFromApi = ''"
                      @keyup.enter="login"
                      type="text"
                      class="auth-input"
                      :class="{'border-danger': usernameRequired}"
                      id="username"
                      placeholder="Մուտքանուն"
                    />
                  </float-label>
                  <span class="small text-danger warning-text" v-if="usernameRequired">{{ $t('login.valid') }}</span>
                </div>
              </div>

              <div>
                <div class="input-group position-relative">
                  <float-label :dispatch="false" class="w-100">
                    <input v-model="$v.fields.password.$model"
                           @input="errorMsgFromApi = ''"
                           @keyup.enter="login"
                           :type="show ? 'text' : 'password'"
                           class="auth-input"
                           :class="{'border-danger': passwordRequired}"
                           id="userpassword"
                           :placeholder="$t('login.login_placeholder_2')"

                    />
                    <svg width="24" height="24" class="show-password" @click="showPassword">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C3.23377 7.93333 7.25974 5 12 5C16.7403 5 20.7013 7.93333 22 12C20.7013 16.0667 16.7403 19 12 19C7.25974 19 3.23377 16 2 12ZM4.07792 12C5.31169 15 8.49351 17 12 17C15.5065 17 18.6234 14.9333 19.9221 12C18.6883 9 15.5065 7 12 7C8.42857 7 5.31169 9 4.07792 12ZM9 12C9 10.3636 10.3636 9 12 9C13.6364 9 15 10.2955 15 12C15 13.7045 13.6364 15 12 15C10.2955 15 9 13.6364 9 12Z" :fill="show ? '#006BE6' : '#ABAEB8'"/>
                    </svg>
                  </float-label>
                  <span class="small text-danger warning-text" v-if="passwordRequired">{{ $t('login.valid_2') }}</span>
                </div>
              </div>
              <div class="login-footer-spacing">
                <div>
                  <a
                    @click.prevent="modalFunc"
                    id="forgot-btn"
                    class="forgot-password"
                  >
                    {{ $t('login.forgot') }}</a
                  >
                </div>
              </div>
              <div class="login-btn-spacing">
                <button @click.prevent="login"
                  id="login-btn"
                  class="button_H48 position-relative w-100 d-flex align-items-center justify-content-center">
                    {{ $t('login.btn-login') }}
                  <span v-if="isLoginPending" 
                        class="spinner-border spinner-border-sm ml-2" 
                        role="status"
                        aria-hidden="true"></span>
                </button>
              </div>
            </form>
          </div>
          <div class="text-center">
            <span class="login-footer-content">
              <span style="margin-right: 4px">{{ $t('login.account')}} </span>
              <span v-b-modal.modal-register class="color"> {{$t('login.signup-btn')}}</span>
            </span>  
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 custom-modal" v-if="showModal">
      <div>
        <div class="d-flex justify-content-end close_btn-block">
          <button class="close_btn" @click="closeModal">
            <img src="/assets/landing/images/close_btn.svg" alt="close">
          </button>
        </div>
        <div class="d-flex justify-content-center">
          <img src="/assets/landing/images/recoverPassword.svg" alt="close">
        </div>
        <div class="auth-header text-center w-100 spacing">
          <h4 class="mb-0">{{ $t('recovery.title') }}</h4>
        </div>
        <div>
          <div>
            <form>
              <div class="spacing-bottom">
                <div class="input-group">
                  <float-label class="w-100">
                    <input
                      @keyup.enter="login"
                      v-model="fields.username"
                      id="username"
                      type="text"
                      class="auth-input mb-0"
                      placeholder="Մուտքանուն"
                    />
                  </float-label>
                </div>
                <div class="text-right">
                  <span 
                    v-if="errorMsgFromApi" 
                    class="my-1 d-block w-100 text-danger small text-center">
                      {{errorMsgFromApi}}
                  </span>
                  <span 
                    v-if="msgFromApi" 
                    class="my-1 d-block w-100 text-primary small text-center">
                      {{msgFromApi}}
                  </span>
                </div>
              </div>
                <div class="button-block">
                  <button @click="sendResetLink" class="button_H48 w-100" type="button">
                      {{ $t('recovery.recovery_btn') }}
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>

<script>
import SignupModal from './partials/SignupModal'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  components: { SignupModal},
  data () {
    return {
      showSignupModal: false,
      showResetPasswordModal: false,
      fields: {
        username: '',
        password: ''
      },
      rememberMe: true,
      errorMsgFromApi: '',
      isLoginPending: false,
      isErrorShake: false,
      show: false,
      msgFromApi: '',
      showModal: false,
    }
  },
  computed: {
    usernameRequired () {
      return this.$v.fields.username.$dirty && !this.$v.fields.username.required
    },
    passwordRequired () {
      return this.$v.fields.password.$dirty && !this.$v.fields.password.required
    },
    authErrors() {
      return this.$store.getters.authErrors
    },
    authMessage() {
      return this.$store.getters.authMessage
    },
    me() {
      return this.$store.getters['user/me']
    },
  },
  unmounted(){
    this.$store.dispatch('removeAuthErrors')
  },
  methods: {
    modalFunc(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('body').style.overflow = 'hidden';
      this.showModal = true; 
    },
    closeModal(){
      document.querySelector('body').style.overflow = 'auto';
      this.showModal = false; 
    },
    sendResetLink(){
      this.$client.post('forgot/password/link', this.fields).then(({data}) => {
        if(!data.error && data.message === 'mail was sent'){
          this.msgFromApi = 'Գաղտնաբառի վերականգնման հղումը ուղարկվել է նշված էլ. հասցեին'
          this.errorMsgFromApi = null;
        } else {
          this.errorMsgFromApi = 'Տվյալ մուտքանունով օգտատեր չի գտնվել'
          this.msgFromApi = null;
        }
      })
    },
    showPassword(){
      this.show = !this.show
    },
    getErrorMessage(error){
      switch (error) {
        case 'Login Failed':
          return 'Սխալ մուտքանուն կամ գաղտնաբառ';
        case 'Account is blocked':
          return 'Հաշիվը արգելափակված է';
        case 'Email is not confirmed':
          return 'Էլ. հասցեն հաստատված չէ';
        default:
          break;
      }
    },
    login () {
      this.$v.fields.$touch()
      if (!this.emailRequired && !this.passwordRequired) {
        this.isLoginPending = true
        this.$store.dispatch('auth', {
          url: 'login',
          fields: this.fields,
          rememberMe: this.rememberMe
        })
          .then(response => {
            this.isLoginPending = false
            if (response.message) {
              this.isErrorShake = true
              setTimeout(() => {
                this.isErrorShake = false
              }, 700)
              this.errorMsgFromApi = response.message
            } else {
              if(response.type === "STATE"){
                if(this.me.package !== 'Անվճար'){
                  this.$router.push({ path: '/organizing' })
                }else{
                  this.$router.push({ path: '/' })
                }
              } else {
                this.$router.push({ path: '/' })
              }
            }
          })
      }
    }
  },
  validations: {
    fields: {
      username: { required },
      password: { required }
    }
  }
}
</script>

<style scoped>
  .color{
    color: #006BE6;
  }
  .auth-header h4{
    white-space: pre;
  }
  .custom-modal{
    background: rgba(14, 15, 18, 0.4);
    backdrop-filter: blur(8px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .custom-modal > div{
    background: #FFFFFF;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.03);
    border-radius: 24px;
    width: 378px;
    padding: 24px 24px 36px;
  }
  .shake {
    animation: shake 0.7s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
  }
  .close_btn{
    outline: none;
    border: none;
    background-color: transparent;
  }
  .close_btn-block{
    margin-bottom: 5px;
  }
  .spacing{
    margin-top: 17px;
    margin-bottom: 36px;
  }
  .spacing-bottom{
    margin-bottom: 44px;
  }
  .button-block{
    padding: 0 12px;
  }
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
}
@media only screen and (max-width: 430px) {
  .custom-modal > div{
    width: 100%;
    margin: 0 20px;
  }
  .auth-header h4{
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
  }
  .custom-modal > div{
    padding: 20px 20px 30px;
  }
  .spacing-bottom{
    margin-bottom: 40px;
  }
}
</style>
<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
</style>
