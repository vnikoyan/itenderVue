<template>
    <div class="card" :class="open ? 'opened' : ''">
        <div class="card-header">
          <button class="d-flex w-100 justify-content-between align-items-center" @click="() => open = !open" type="button" data-toggle="collapse" data-target="#changePasswordCollapse" aria-expanded="false" aria-controls="changePasswordCollapse">
            <h4 data-target="#changePasswordCollapse" aria-expanded="false" aria-controls="changePasswordCollapse" class="mb-0">Փոխել գաղտնաբառ</h4>
            <svg width="14" height="8" viewBox="0 0 14 8">
              <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
            </svg>
          </button>
        </div>
        <div id="changePasswordCollapse" class="collapse multi-collapse">
          <div class="card-body">
              <div>
                  <form class="form-parsley" action="#" novalidate="">
                      <div class="form-group row">
                          <div class="input-user col-xl-12 col-lg-12">
                              <input
                                  placeholder="Հին գաղտնաբառ"
                                  id="old_password"
                                  v-model="$v.fields.old_password.$model"
                                  type="password"
                                  class="auth-input mb-0"
                                  :class="{'border-danger': isInvalidField('old_password', 'required') || isInvalidField('old_password', 'minLength')}"
                                  name="old_password"
                              />
                          </div>
                          <div class="col-xl-12 col-lg-12">
                            <div v-if="isInvalidField('old_password', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                            <div v-if="isInvalidField('old_password', 'minLength')" class="small text-danger"> {{ $t('state_customer.valid_4') }}</div>
                          </div>
                      </div>
                      <div class="form-group row">
                          <div class="input-user col-xl-12 col-lg-12">
                              <input
                                  placeholder="Նոր գաղտնաբառ"
                                  id="password"
                                  autocomplete="true"
                                  v-model="$v.fields.password.$model"
                                  type="password"
                                  class="auth-input mb-0"
                                  :class="{'border-danger': isInvalidField('password', 'required') || isInvalidField('password', 'minLength')}"
                                  name="password"
                              />
                          </div>
                          <div class="col-xl-12 col-lg-12">
                            <div v-if="isInvalidField('password', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                            <div v-if="isInvalidField('password', 'minLength')" class="small text-danger"> {{ $t('state_customer.valid_4') }}</div>
                          </div>
                      </div>
                      <div class="form-group row">
                          <div class="input-user col-xl-12 col-lg-12">
                              <input
                                  placeholder="Կրկնել գաղտնաբառը"
                                  id="repeat-password"
                                  autocomplete="true"
                                  v-model="$v.fields.password_confirmation.$model"
                                  type="password"
                                  class="auth-input mb-0"
                                  :class="{'border-danger': isInvalidField('password_confirmation', 'required') || isInvalidField('password_confirmation', 'sameAsPassword')}"
                                  name="repeat-password"
                              />
                          </div>
                          <div class="col-xl-12 col-lg-12">
                            <div v-if="isInvalidField('password_confirmation', 'required')" class="small text-danger">{{ $t('state_customer.valid_1') }}</div>
                            <div v-if="isInvalidField('password_confirmation', 'sameAsPassword')" class="small text-danger">{{ $t('state_customer.valid_5') }}</div>
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
import { minLength, sameAs, required } from 'vuelidate/lib/validators'

export default {
  name: 'personalSettings',
  data () {
    return {
      open: false,
      fields: {
        old_password: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  validations: {
    fields: {
        old_password: { required, minLength: minLength(6) },
        password: { required, minLength: minLength(6) },
        password_confirmation: { required, sameAsPassword: sameAs('password') },
    },
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    consoleLog(e){
      console.log(e)
    },
    save() {
      if(!this.$v.fields.$invalid) {
        $client.put(`user-password`, this.fields).then(({data}) => {
          console.log(data)
          if(data === 'success'){
            this.$notify({
              group: 'foo',
              type: 'success',
              text: 'Հաջողությամբ պահպանված է'
            })
          } else if(data === 'wrong old password') {
            this.$notify({
              group: 'foo',
              type: 'error',
              text: 'Հին գաղտանբառը սխալ է',
              title: 'Կրկին փորձեք!'
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