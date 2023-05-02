<template>
    <div class="card" :class="open ? 'opened' : ''">
      <div class="card-header">
        <div class="flex-column d-flex">
          <div>
            <button class="d-flex w-100 justify-content-between align-items-center" @click="() => open = !open" type="button" data-toggle="collapse" data-target="#packageTypeCollapse" aria-expanded="false" aria-controls="packageTypeCollapse">
              <h4 data-target="#packageTypeCollapse" aria-expanded="false" aria-controls="packageTypeCollapse" class="settings-package-header">Ընթացիկ փաթեթ</h4>
              <svg width="14" height="8" viewBox="0 0 14 8">
                <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
              </svg>
            </button>
          </div>
          <div v-if="!me.probation && me.package === 'Անվճար' && userType === 'USER'" >
            <button 
              @click="activateFreePeriod" 
              class="color-white btn btn-primary btn-round button-probation"
              style="box-shadow: none;"
            >
              Ակտիվացնել 10 օր ԱՆՎՃԱՐ փորձաշրջան
            </button>
          </div>
        </div>
      </div>
      <div id="packageTypeCollapse" class="collapse multi-collapse">
        <div class="card-body">
            <div class="flex-column d-flex">
                <label for="example-text-input" class="settings-package-header">Ընթացիկ փաթեթ</label>
                <div class="settings-package-content">
                    <span v-if="$t(`packages.${packageData.name}`) === 'packages.undefined'">չկա</span>
                    <span v-else class="pl-0 form-control border-0" id="example-text-input">{{packageData.name}} փաթեթ</span>
                </div>
            </div>
            <div class="flex-column d-flex">
                <label for="example-text-input" class="settings-package-header">Գործողության ժամկետ </label>
                <div class="settings-package-content">
                    <span id="example-text-input">{{ packageData.start_date }} - {{ packageData.end_date }}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  name: 'packageType',
  data () {
    return {
      packageData: {},
      open: false,
      vat_payer_type: '',
    }
  },
  computed: {
    isCoordinator(){
       return +this.me.divisions === 2
    },
    me() {
      return this.$store.getters['user/me']
    },
    userType(){
      return this.$store.getters.userType
    } 
  },
  created(){ },
  mounted(){
    this.$client.get('user/package').then(({data: {data}}) => {
      if(data){
        this.packageData = data;
      }
    })
  },
  watch: {
    me(newValue, oldValue) {
      if(!newValue.probation && newValue.package === 'Անվճար' && this.userType === 'USER'){
        this.open = true;
      }
    },
  },
  methods: {
    consoleLog(e){
      console.log(e)
    },
    activateFreePeriod(){
        this.$confirm(
            "Ակտիվացնել Գոլդ փաթեթ 10 օրով", 
            "Ակտիվացնել", 
            "", 
            {
                title: 'Do you want to save the changes?',
                confirmButtonText: 'Ակտիվացնել', 
                cancelButtonText: 'Չեղարկել'
            }
        ).then((result) => {
            if(result){
                this.$client.post('gold/package/probation/activate').then((value) => {
                    this.$client.get('user/package').then(({data: {data}}) => {
                        this.packageData = data;
                    })
                    this.$store.dispatch('user/me')
                    this.$fire({
                        text: "Դուք հաջողությամբ ակտիվացրեցիք Գոլդ փաթեթը 10 օրով",
                        confirmButtonText: 'Լավ'
                    })
                })
            }
        }) 
    },
    save() {
      $client.put(`user`, {vat_payer_type: this.vat_payer_type}).then(({data}) => {
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
    },
  },
}
</script>
<style scoped>
.card{
  margin-bottom: 12px;
}
</style>