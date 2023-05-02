<template>
     <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="mt-0 header-title"></h4>
        <form>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label for="example-email-input" class="col-sm-2 col-form-label text-right">{{$t('name')}}</label>
                                    <div class="col-sm-10"><input class="form-control" type="text" required v-model="userInner.name"  id="example-email-input"></div>
                            </div>
                            <div class="form-group row">
                                <label for="example-email-input" class="col-sm-2 col-form-label text-right">{{$t('email')}}</label>
                                    <div class="col-sm-10"><input class="form-control" type="email" required v-model="userInner.email"  id="example-email-input"></div>
                            </div>
                            <div class="form-group row">
                                <label for="example-password-input" class="col-sm-2 col-form-label  text-right">{{$t('password')}}</label>
                                <div class="col-sm-10">
                                    <input class="form-control" type="password" v-model="password"  id="example-password-input">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6" v-if="userInner.organisation">
                            <div class="form-group row">
                                <label for="example-email-input" class="col-sm-3 col-form-label text-right">{{$t('organisation_name')}}</label>
                                    <div class="col-sm-9" style="padding: 0.375rem .75rem;">{{userInner.organisation[0].translations.name[$i18n.locale]}}</div>
                            </div>
                            <div class="form-group row">
                                <label for="example-email-input" class="col-sm-3 col-form-label text-right">{{$t('address')}}</label>
                                    <div class="col-sm-9" style="padding: 0.375rem .75rem;">{{userInner.organisation[0].translations.address[$i18n.locale]}}</div>
                            </div>
                            
                            <div class="form-group row">
                                <label for="example-email-input" class="col-sm-3 col-form-label text-right">{{$t('director_name')}}</label>
                                    <div class="col-sm-9" style="    padding: 0.375rem .75rem;">{{userInner.organisation[0].translations.director_name[$i18n.locale]}}</div>
                            </div>

                        </div>
                        <div  class="col-lg-12">
                            <button type="submit"  @click.prevent="submit"  class="btn btn-primary">{{$t('submit')}}</button>
                        </div>
                    </div>
        </form>

                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    mounted() {
        this.$store.dispatch('user/me')
    },
    computed: {
        user() {
            return this.$store.getters['user/me']
        }
    },
    watch: {
      user(newValue) {
        // eslint-disable-next-line no-undef
        this.userInner = _.cloneDeep(newValue);
      }
    },
    data() {
      return {
          password:"",  
          errorMsgFromApi: '',
          userInner: {}
      }
    },
    methods:{
        submit(){
            this.$store.dispatch('user/userEdit', {
                fields: {"password":this.password,"name": this.userInner.name,"email": this.userInner.email},
            }).then(response => {
                if (response.error) {
                    this.errorMsgFromApi = response.error.message
                } else {
                    this.$router.push({ path:     'dashboard' })
                }
            })
        }
    },
    name: 'UserComponent',
    components: {},
  }


//    updateMe({ commit }, updatedMe) {
//     // eslint-disable-next-line no-undef
//     return $client.put('user',  updatedMe).then(response => {
//       commit('setMe, updatedMe)
//     })
//   },

</script>