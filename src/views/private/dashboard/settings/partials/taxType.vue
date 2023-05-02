<template>
    <div class="card" :class="open ? 'opened' : ''">
        <div class="card-header">
          <button @click="() => open = !open" class="d-flex w-100 justify-content-between align-items-center" type="button" data-toggle="collapse" data-target="#taxTypeCollapse" aria-expanded="false" aria-controls="taxTypeCollapse">
            <h4 data-target="#taxTypeCollapse" aria-expanded="false" aria-controls="taxTypeCollapse" class="mb-0">Նշել հարկատեսակը</h4>
            <svg width="14" height="8" viewBox="0 0 14 8">
              <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
            </svg>
          </button>
        </div>
        <div id="taxTypeCollapse" class="collapse multi-collapse">
          <div class="card-body d-flex flex-column padding-20">
              <p class="taxType-header">
                  Հետագա խնդիրներից խուսափելու համար, խնդրում ենք ճիշտ նշել հարկատեսակը։
              </p>
              <div>
                  <form class="form-parsley" action="#">
                      <div class="d-flex mb-3">
                          <input v-model="vat_payer_type" type="radio" id="inlineRadio1" value="payer" name="radioInline" class="mr-2 mt-1 taxType-inputs">
                          <label class="mb-0 taxType-labels" for="inlineRadio1">ԱԱՀ վճարող <span>*</span></label>
                      </div>
                      <div class="d-flex mb-3">
                          <input v-model="vat_payer_type" type="radio" id="inlineRadio2" value="not_payer" name="radioInline" class="mr-2 mt-1 taxType-inputs">
                          <label class="mb-0 taxType-labels" for="inlineRadio2">ԱԱՀ չվճարող <span>*</span></label>
                      </div>
                      <div class="d-flex">
                          <input v-model="vat_payer_type" type="radio" id="inlineRadio3" value="payer_with_but" name="radioInline" class="mr-2 mt-1 taxType-inputs">
                          <label class="mb-0 taxType-labels" for="inlineRadio3">ԱԱՀ-ով աշխատող, սակայն հաղթողը որոշվում է հատուցման գումարով <span>*</span></label>
                      </div>
                  </form>
              </div>
              <div class="d-flex justify-content-end mt-3">
                <button @click="save" type="button" class="button_H36" data-toggle="modal" data-animation="bounce">
                  <span>Պահպանել</span>
                </button>
              </div>
          </div>
        </div>
    </div>
</template>


<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'taxType',
  data () {
    return {
      open: false,
      vat_payer_type: '',
    }
  },
  validations: {
    fields: {
      vat_payer_type: { required },
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
    this.vat_payer_type = this.me.vat_payer_type;
  },
  watch: {
    me(newValue, oldValue) {
      this.vat_payer_type = newValue.vat_payer_type;
    },
  },
  methods: {
    consoleLog(e){
      console.log(e)
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