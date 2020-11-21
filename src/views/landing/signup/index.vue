<template>
  <div class="container-fluid login-body">
    <div class="row py-5">
      <div class="bg-white  p-4 col-lg-6 col-sm-10 state-body">
        <div class="auth-logo-box">
          <a href="index.html" class="logo logo-admin">
            <img src="assets/landing/images/favicon_1.ico" alt="Itender" height="55" class="auth-logo"/>
          </a>
        </div>
        <form>
          <div class="form-row">
            <div class="col-md-6 mb-3 px-md-3">
              <float-label class="text-secondary" :dispatch="false">
                <input
                  id="email"
                  v-model="$v.fields.email.$model"
                  type="email"
                  :placeholder="$t('home.subscribe-area.placeholder')"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('email', 'required') || isInvalidField('email', 'email')}"
                  name="r_mail"
                />
              </float-label>
              <div v-if="isInvalidField('email', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
              <div v-if="isInvalidField('email', 'email')" class="small text-danger">{{ $t('state_customer.valid_2') }}</div>
            </div>
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="phone"
                  v-model="$v.fields.phone.$model"
                  type="text"
                  :placeholder="$t('state_customer.pl_tel')"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('phone', 'required') || isInvalidField('phone', 'numeric')}"
                  name="r_phone"
                />
              </float-label>
              <div v-if="isInvalidField('phone', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
              <div v-if="isInvalidField('phone', 'numeric')" class="small text-danger">{{ $t('state_customer.valid_3') }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="password"
                  v-model="$v.fields.password.$model"
                  type="password"
                  :placeholder="$t('state_customer.pl_password')"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('password', 'required') || isInvalidField('password', 'minLength')}"
                  name="password"
                />
              </float-label>
              <div v-if="isInvalidField('password', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
              <div v-if="isInvalidField('password', 'minLength')" class="small text-danger"> {{ $t('state_customer.valid_4') }}</div>
            </div>
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="repeat-password"
                  v-model="$v.fields.password_confirmation.$model"
                  type="password"
                  :placeholder="$t('state_customer.repeat_pl_password')"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('password_confirmation', 'required') || isInvalidField('password_confirmation', 'sameAsPassword')}"
                  name="repeat-password"
                />
              </float-label>
              <div v-if="isInvalidField('password_confirmation', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
              <div v-if="isInvalidField('password_confirmation', 'sameAsPassword')" class="small text-danger">{{ $t('state_customer.valid_5') }}</div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  v-model="$v.fields.name.hy.$model"
                  :placeholder="$t('state_customer.pl_name')"
                  type="text"
                  name="company_name"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('name.hy', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('name.hy', 'required')"
                class="small text-danger">{{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-6 mb-3 px-md-3">
              <select
                id="company-type"
                v-model="$v.fields.company_type.hy.$model"
                name="company_type"
                class="auth-input form-control my-2"
                :class="{'border-danger': isInvalidField('company_type.hy', 'required')}"
              >
                <option value="" disabled>Ընտրել տեսակը</option>
                <option value="ՊՈԱԿ">ՊՈԱԿ</option>
                <option value="ՍՊԸ">ՍՊԸ</option>
                <option value="ՓԲԸ">ՓԲԸ</option>
                <option value="ՀՈԱԿ">ՀՈԱԿ</option>
                <option value="Հիմնադրամ">Հիմնադրամ</option>
                <option value="Համայնք">Համայնք</option>
                <option value="քաղաքապետարան">քաղաքապետարան</option>
              </select>
              <div v-if="isInvalidField('company_type.hy', 'required')"
                class="small text-danger">
               {{ $t('state_customer.valid_1') }}
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="name-ru"
                  v-model="$v.fields.name.ru.$model"
                  :placeholder="$t('state_customer.pl_name_rus')"
                  type="text"
                  name="company_name_ru"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('name.ru', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('name.ru', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-6 mb-3 px-md-3">
              <select
                id="company-type-ru"
                v-model="$v.fields.company_type.ru.$model"
                name="company_type_ru"
                class="auth-input form-control my-2"
                :class="{'border-danger': isInvalidField('company_type.ru', 'required')}"
              >
                <option value="" disabled>Выбрать</option>
                <option value="ГНКО">ГНКО</option>
                <option value="ООО">ООО</option>
                <option value="ЗАО">ЗАО</option>
                <option value="ОНКО">ОНКО</option>
                <option value="фонд">фонд</option>
                <option value="община">община</option>
                <option value="муниципалитет">муниципалитет</option>
              </select>
              <div v-if="isInvalidField('company_type.ru', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-3 mb-3 px-md-3">
              <!-- <label class="floating-label">Գործունեության հասցե *</label> -->
              <float-label :dispatch="false">
                <input
                  v-model="$v.fields.region.hy.$model"
                  :placeholder="$t('state_customer.pl_state')"
                  type="text"
                  name="company_region"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('region.hy', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('region.hy', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-4 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  v-model="$v.fields.city.hy.$model"
                  :placeholder="$t('state_customer.pl_city')"
                  type="text"
                  name="company_city"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('city.hy', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('city.hy', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-5 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  v-model="$v.fields.address.hy.$model"
                  :placeholder="$t('state_customer.pl_address')"
                  type="text"
                  name="company_address"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('address.hy', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('address.hy', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-3 mb-3 px-md-3">
              <!-- <label class="floating-label">Գործունեության հասցե ռուսերեն*</label> -->
              <float-label :dispatch="false">
                <input
                  v-model="$v.fields.region.ru.$model"
                  :placeholder="$t('state_customer.pl_state_rus')"
                  type="text"
                  name="company_region_ru"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('region.ru', 'required')}"
                  value=""
                />
              </float-label>
              <div v-if="isInvalidField('region.ru', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-4 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  v-model="$v.fields.city.ru.$model"
                  :placeholder="$t('state_customer.pl_city_rus')"
                  type="text"
                  name="company_city_ru"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('city.ru', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('city.ru', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-5 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  v-model="$v.fields.address.ru.$model"
                  :placeholder="$t('state_customer.pl_address_rus')"
                  type="text"
                  name="company_address_ru"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('address.ru', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('address.ru', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="bank-name"
                  v-model="$v.fields.bank_name.hy.$model"
                  :placeholder="$t('state_customer.pl_bank')"
                  type="text"
                  name="bank_name"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('bank_name.hy', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('bank_name.hy', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  v-model="$v.fields.bank_name.ru.$model"
                  :placeholder="$t('state_customer.pl_bank_rus')"
                  type="text"
                  name="bank_name_ru"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('bank_name.ru', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('bank_name.ru', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="bank-account"
                  v-model="$v.fields.bank_account.$model"
                  :placeholder="$t('state_customer.pl_account_number')"
                  type="text"
                  name="bank_account"
                  maxlength="16"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('bank_account', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('bank_account', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="tin"
                  v-model="$v.fields.tin.$model"
                  :placeholder="$t('state_customer.pl_hvhh')"
                  type="text"
                  name="hvhh"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('tin', 'required')}"
                  maxlength="8"
                />
              </float-label>
              <div v-if="isInvalidField('tin', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="director-name-hy"
                  v-model="$v.fields.director_name.hy.$model"
                  :placeholder="$t('state_customer.pl_name_surname')"
                  type="text"
                  name="director_name"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('director_name.hy', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('director_name.hy', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
            <div class="col-md-6 mb-3 px-md-3">
              <float-label :dispatch="false">
                <input
                  id="director-name-ru"
                  v-model="$v.fields.director_name.ru.$model"
                  :placeholder="$t('state_customer.pl_name_surname_rus')"
                  type="text"
                  name="director_name_ru"
                  class="auth-input form-control"
                  :class="{'border-danger': isInvalidField('director_name.ru', 'required')}"
                />
              </float-label>
              <div v-if="isInvalidField('director_name.ru', 'required')"
                class="small text-danger">
                {{ $t('state_customer.valid_1') }}
              </div>
            </div>
          </div>

          <label class="myCheckbox" style="margin-top: 12px">
            <input
              v-model="$v.agreeToTerms.$model"
              type="checkbox"
              name="r_remember"
              class="r_checkbox"
            />
            <span></span>
            <p class="i_agree i_agree_tender small">
              {{ $t('state_customer.studied') }}
              <a href="regulation.html" target="_blank">{{ $t('state_customer.regulation') }}</a> {{ $t('state_customer.regulation_text') }}
            </p>
          </label>
          <div class="reg_form">
            <label class="robot small">
              <span>    {{ $t('state_customer.code') }}</span>
              <a class="reload_captcha" onclick="reload_captcha()"
                ><img
                  src="https://www.itender.am/images/reload.png"
                  alt="reload captcha"
              /></a>
              <span class="captcha_query"> 3 + 4 = </span>
              <input
                type="text"
                name="captcha_code"
                class="captcha_code txtboxToFilter"
              />
            </label>
          </div>
          <div class="form-group row justify-content-center mt-5">
            <div class="col-sm-4">
              <button @click.prevent="signup" name="signup-btn" class="btn signup-btn_02" id="signup-btn "> {{ $t('state_customer.btn_register') }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength, sameAs, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'StateSignup',
  data () {
    return {
      fields: {
        type: 'STATE',
        name: {
          hy: '',
          ru: '',
          en: 'name'
        },
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        tin: '',
        bank_account: '',
        region: {
          hy: '',
          ru: '',
          en: 'region'
        },
        city: {
          hy: '',
          ru: '',
          en: 'city'
        },
        address: {
          hy: '',
          ru: '',
          en: 'address'
        },
        bank_name: {
          hy: '',
          ru: '',
          en: 'bank_name'
        },
        director_name: {
          hy: '',
          ru: '',
          en: 'director_name'
        },
        company_type: {
          hy: '',
          ru: '',
          en: 'company_type'
        }
      },
      agreeToTerms: false,
      errorMsgFromApi: ''
    }
  },
  methods: {
    signup () {
      if(!this.$v.fields.$invalid && this.agreeToTerms) {
        this.$store.dispatch('auth', {
          url: 'signup',
          fields: this.fields,
          rememberMe: false,
        })
          .then(response => {
            if (response.error) {
              this.errorMsgFromApi = response.error.message
            } else {
              this.$router.push({ path: 'dashboard' })
            }
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
    },
    areAllFeildsValid () {

    }
  },
  validations: {
    fields: {
      type: {},
      name: {
        hy: { required },
        ru: { required },
        en: { required }
      },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password_confirmation: { required, sameAsPassword: sameAs('password') },
      phone: { required, numeric },
      tin: { required, numeric },
      bank_account: { required, numeric },
      region: {
        hy: { required },
        ru: { required },
        en: { required }
      },
      city: {
        hy: { required },
        ru: { required },
        en: { required }
      },
      address: {
        hy: { required },
        ru: { required },
        en: { required }
      },
      bank_name: {
        hy: { required },
        ru: { required },
        en: { required }
      },
      director_name: {
        hy: { required },
        ru: { required },
        en: { required }
      },
      company_type: {
        hy: { required },
        ru: { required },
        en: { required }
      }
    },
    agreeToTerms: { required }
  }
}
</script>

<style scoped>
.auth-input {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 0;
}
.auth-input:focus {
  box-shadow: 0 1px 0 #ddd!important;
}
</style>
<style lang="scss" scoped>
@import '/../src/assets/styles/main.scss';
</style>
