<template>
    <div class="card" :class="open ? 'opened' : ''">
      <div class="card-header">
        <button @click="() => open = !open" class="d-flex w-100 justify-content-between align-items-center" type="button" data-toggle="collapse" data-target="#personalSettingsCollapse" aria-expanded="false" aria-controls="personalSettingsCollapse">
          <h4 class="mb-0" data-target="#personalSettingsCollapse" aria-expanded="false" aria-controls="personalSettingsCollapse">Անձնական տվյալներ</h4>
          <svg width="14" height="8" viewBox="0 0 14 8">
            <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
          </svg>
        </button>
      </div>
      <div id="personalSettingsCollapse" class="collapse multi-collapse">
        <div class="card-body d-flex flex-column padding-20">
            <div>
              <form class="form-parsley" :key="type">
                <div class="form-row">
                  <div class="col-md-6 mb-4 px-md-2">
                    <float-label :dispatch="false" class="w-100" >
                      <input
                        :placeholder="$t('home.subscribe-area.placeholder')"
                        id="email"
                        v-model="$v.fields.email.$model"
                        type="email"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('email', 'required') || isInvalidField('email', 'email')}"
                        name="r_mail"
                      />
                    </float-label>  
                    <div v-if="isInvalidField('email', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                    <div v-if="isInvalidField('email', 'email')" class="small text-danger">{{ $t('state_customer.valid_2') }}</div>
                  </div>
                  <div class="col-md-6 mb-4 px-md-2">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        :placeholder="$t('private_customer.user_name_surname')"
                        v-model="$v.fields.name.hy.$model"
                        type="text"
                        name="company_name"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('name.hy', 'required')}"
                      />
                    </float-label>  
                    <div v-if="isInvalidField('name.hy', 'required')"
                      class="small text-danger">{{ $t('state_customer.valid_1') }}
                    </div>
                  </div>

                  <div class="col-md-6 mb-4 px-md-2">
                    <float-label :dispatch="false" class="w-100">
                      <input
                        :placeholder="$t('private_customer.user_name_surname_ru')"
                        v-model="$v.fields.name.ru.$model"
                        type="text"
                        name="company_name_ru"
                        class="auth-input mb-0"
                        :class="{'border-danger': isInvalidField('name.ru', 'required')}"
                      />
                    </float-label>  
                    <div v-if="isInvalidField('name.ru', 'required')"
                      class="small text-danger">{{ $t('state_customer.valid_1') }}
                    </div>
                  </div>
                </div>

                <!-- User Name -->
                <div>
                  <div class="form-row">
                    <div class="col-md-6 mb-4 px-md-2">
                      <float-label :dispatch="false" class="w-100">
                        <the-mask
                          :placeholder="$t('state_customer.pl_tel')"
                          id="phone"
                          v-model="$v.fields.phone.$model"
                          :validCharactersOnly="true"
                          class="auth-input mb-0"
                          mask="###-##-##-##" 
                          name="r_phone"
                        />
                      </float-label>
                    </div>
                    <div class="col-md-6 mb-4 px-md-2">
                      <label>Տիպ՝ </label>
                      <h6>{{ getDivisionType(+me.divisions) }}</h6>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="d-flex justify-content-end">
              <button @click="save" type="button" class="button_H36" data-toggle="modal" data-animation="bounce">
                <span>Պահպանել</span>
              </button>
            </div>  
        </div>
      </div>
    </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'personalSettings',
  data () {
    return {
      open: false,
      isInvalidPhone: false,
      type: 'legalEntity',
      agreeToTerms: false,
      captcha: false,
      errorMsgFromApi: '',
      fields: {
        name: {
          hy: 'a',
          ru: 'a',
        },
        email: 'a',
        phone: 'a',
      },
      userType: this.$route.params.type,
      isPrivate: this.$route.params.type === 'private'
    }
  },
  validations: {
    fields: {
      email: { required, email },
      name: { hy: { required }, 
              ru: { required } 
      },
      phone: {},
    },
  },
  computed: {
    isCoordinator(){
       return +this.me.divisions === 2
    },
    me() {
      return this.$store.getters['user/me']
    },
  },
  created(){
    this.fields.email = this.me.email;
    this.fields.phone = this.me.phone;
    this.fields.name.hy = this.me.name;
    this.fields.name.ru = this.me.name_ru;
  },
  watch: {
    me(newValue, oldValue) {
      this.fields.name.hy = newValue.name;
      this.fields.email = newValue.email;
      this.fields.phone = newValue.phone;
      this.fields.name.ru = newValue.name_ru;
    },
  },
  methods: {
    consoleLog(e){
      console.log(e)
    },
    getDivisionType(division){
      switch (division) {
        case 1:
          return 'Պատասխանատու ստորաբաժանում';
        case 2:
          return 'Համակարգող';
        case 3:
          return 'Բաժին';
        case 4:
          return 'Վարչություն';
        default:
          break;
      }
    },
    save() {
      this.$v.fields.$touch()
      if(!this.$v.fields.$invalid) {
        $client.put(`user`, this.fields).then(({data}) => {
          if(data.data){
            this.$notify({
              group: 'foo',
              type: 'success',
              text: 'Հաջողությամբ պահպանված է'
            })
          }
        }).catch(e => {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Էլ. հացեն զբաղված է',
            text: 'Կրկին փորձեք!'
          })
        })
      } else {
        this.$v.fields.$touch()
      }
    },
    isInvalidField (pathToField, validator) {
      const keyArr = pathToField.split('.')
      const field = keyArr.reduce((acc, key) => {
        return acc[key]
      }, this.$v.fields)
      return validator === 'required' ?
        field.$dirty && !field.required :
        field.required && !field[validator]
    }
  },
}
</script>
<style scoped>
.card{
  margin-bottom: 12px;
}
</style>