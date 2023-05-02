<template>
  <div class="login-body">
    <div class="col-12 center-login">
      <div class="modal-dialog">
        <signup-modal v-if="showSignupModal" />
        <reset-password-modal v-if="showResetPasswordModal" />
        <div
          v-if="!showSignupModal && !showResetPasswordModal"
          id="login-content"
          class="modal-content itenter-pop"
          :class="{'shake': isErrorShake}"
        >
          <div class="auth-logo-box">
            <a href="index.html" class="logo logo-admin">
              <img src="assets/landing/images/favicon_1.ico" alt="iTender" height="55" class="auth-logo"/>
            </a>
          </div>
          <div class="login-modal text-center">
            <h4 class="modal-title"><i class="fa fa-unlock-alt"></i>{{ $t('login.title') }}</h4>
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
                v-else-if="authMessage" 
                class="mb-3 d-block w-100 text-center text-primary" 
              >
                  {{authMessage}}
              </span>
              <!-- <span v-if="errorMsgFromApi" 
                    class="d-block w-100 text-center text-danger position-absolute" 
                    style="top: -1.5rem;"> {{ $t('login.auth_error') }}</span> -->
              <div class="form-group">
<!--                <label for="username"> {{ $t('login.label_1') }}</label>-->
                <div class="input-group">
                  <span class="auth-form-icon"
                    ><i class="fa fa-user" aria-hidden="true"></i
                  ></span>
                  <float-label :dispatch="false" class="w-100">
                    <input
                      v-model="$v.fields.email.$model"
                      @input="errorMsgFromApi = ''"
                      @keyup.enter="login"
                      type="text"
                      class="form-control"
                      :class="{'border-danger': emailRequired}"
                      id="username"
                      :placeholder="$t('login.login_placeholder_1')"
                    />
                  </float-label>
                </div>
                <span class="small text-danger" v-if="emailRequired">{{ $t('login.valid') }}</span>
                <!-- <span class="small text-danger" v-if="wrongEmail">սխալ Էլ. հասցե</span> -->
              </div>

              <div class="form-group">
<!--                <label for="userpassword"> {{ $t('login.label_2') }}</label>-->
                <div class="input-group">
                  <span class="auth-form-icon">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  <float-label :dispatch="false" class="w-100">
                    <input v-model="$v.fields.password.$model"
                           @input="errorMsgFromApi = ''"
                           @keyup.enter="login"
                           type="password"
                           class="form-control"
                           :class="{'border-danger': passwordRequired}"
                           id="userpassword"
                           :placeholder="$t('login.login_placeholder_2')"

                    />
                  </float-label>
                </div>
                <span class="small text-danger" v-if="passwordRequired">{{ $t('login.valid_2') }}</span>
                <!-- <span class="small text-danger" v-if="shortPassword">նվազագույնը 6 նիշ</span> -->
              </div>
              <div class="loginbox">
                <div class="footer-box">
                  <a
                    @click.prevent="showResetPasswordModal = true"
                    id="forgot-btn"
                    class="text-muted font-13"
                  >
                    <i class="fa fa-lock"></i> {{ $t('login.forgot') }}</a
                  >
                </div>
              </div>
              <a @click.prevent="login"
                id="login-btn"
                class="btn btn-primary btn-round btn-block waves-effect waves-light position-relative">
                  {{ $t('login.btn-login') }}
                <i class="fa fa-sign-in" aria-hidden="true"></i>
                <span v-if="isLoginPending" 
                      class="mr-3 spinner-border spinner-border-sm position-absolute" 
                      style="right: 0; top: 10px;"
                      role="status"
                      aria-hidden="true"></span>
              </a>
            </form>
          </div>
          <div @click="showSignupModal = true" class="footer-box">
            <span>  {{ $t('login.account') }}
              <a id="signup-btn" href="#"> {{ $t('login.signup-btn') }}</a></span>
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
import SignupModal from '../login/partials/SignupModal'
import { email, required } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  components: { SignupModal },
  data () {
    return {
      showSignupModal: true,
      showResetPasswordModal: false,
      fields: {
        email: '',
        password: ''
      },
      rememberMe: true,
      errorMsgFromApi: '',
      isLoginPending: false,
      isErrorShake: false,
    }
  },
  computed: {
    emailRequired () {
      return this.$v.fields.email.$dirty && !this.$v.fields.email.required
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
  },
  methods: {
    getErrorMessage(error){
      switch (error) {
        case 'Login Failed':
          return 'Սխալ մուտքանուն կամ գաղտնաբառ';
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
              console.log(this.errorMsgFromApi)
            } else {
              if(response.type === "STATE"){
                this.$router.push({ path: '/organizing' })
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
      email: { email, required },
      password: { required }
    }
  }
}
</script>

<style scoped>
  .shake {
    animation: shake 0.7s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
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
</style>
