<template>
  <modal
    class="contract-sign-modal top-level-modal"
    name="contract-sign-modal"
    @closed="$emit('updateComparisonData')"
    @before-close="handleBeforeClose"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="30%"
    height="50%"
  >
    <div id="modal-header">
      <div class="w-100 d-flex">
        <p>Պայմանագրի կնքման մանրամասներ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('contract-sign-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body">
      <div class="d-flex">
        <div class="col-md-12 p-0">
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <label for="name">Կնքման ամսաթիվ</label>
              <input
                v-model="$v.contract.sign_date.$model"
                name="sign_date"
                type="date"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <label for="address">Պայմանագրի ծածկագիր</label>
              <input 
                v-model="$v.contract.code.$model"
                name="code"
                type="text"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <label for="address">Պայմանագրի անվանումը</label>
              <input 
                v-model="$v.contract.name.$model"
                name="code"
                type="text"
                class="form-control"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="save" class="btn btn-primary">
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    name: 'ContractSignModal',
    components: {  },
    data() {
      return {
        participantGroup: {},
        contract: {
          lots: [],
          name: '',
          code: '',
          sign_date: '',
          is_sign: true,
          organize_id: 0,
          provider_id: 0,
          client_id: 0,
        },
      }
    },
    validations() {
      const rules = {
        contract: {
          sign_date: {required},
          code: {required},
          name: {required},
        },
      }
      return rules
    },
    computed: {
      me() {
        return this.$store.getters['user/me']
      },
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
    },
    methods: {
      handleBeforeOpen({params}) {
        this.confirmContract = params.confirmContract
        this.participantGroup = params.participantGroup

        this.contract.organize_id = this.$route.params.id
        this.contract.client_id = this.me.id
        this.contract.provider_id = params.participantGroup.id
        this.contract.provider_user_id = params.participantGroup.user_id
        // this.contract.code = `${this.currentOrganized.translations.code.hy}-${params.participantIndex+1}`
        this.contract.code = this.currentOrganized.translations.code.hy
        this.contract.price = this.getContractPrice(params.participantGroup)
        this.contract.lots = []
        this.participantGroup.won_lots.forEach(lot => {
          const offer = this.participantGroup.lots.find(item => item.organize_row_id === lot.id)
          const obj = {
            id: lot.id,
            count: lot.count,
            price: (offer.vat ? offer.new_value * 1.2 : offer.new_value ) || offer.cost,
            price_unit: ((offer.vat ? offer.new_value * 1.2 : offer.new_value ) || offer.cost) / lot.count,
          }
          this.contract.lots.push(obj)
        });
      },
      save() {
        if(!this.$v.contract.$invalid) {
          this.$client.post(`contract`, this.contract).then((response) => {
            this.$notify({
              group: 'foo',
              type: 'success',
              text: 'Հաջողությամբ պահպանված է'
            })
            this.confirmContract(this.participantGroup)
            this.$modal.hide('contract-sign-modal')
          }).catch(e => {
            console.log(e)
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
            this.isSaving = false
          })
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Լրացրեք բոլոր դաշտերը պահպանելու համար!'
          })
        }
      },
      handleBeforeClose(){
        this.participantGroup = {};
        this.contract = {
          lots: [],
          name: '',
          code: '',
          sign_date: '',
          is_sign: true,
          organize_id: 0,
          provider_id: 0,
          client_id: 0,
        };
      },
      getContractPrice(participantGroup){
          var sumPrice = 0;
          participantGroup.won_lots.forEach((lot) => {
            const offer = participantGroup.lots.find(item => item.organize_row_id === lot.id)
            const newPrice = offer.new_value
            const price = offer.value
            const vat = offer.vat
              if(vat){
                if(newPrice){
                  sumPrice = sumPrice + (newPrice+newPrice*0.2)
                } else {
                  sumPrice = sumPrice + (price+price*0.2)
                }
              } else {
                if(newPrice){
                  sumPrice = sumPrice + (newPrice)
                } else {
                  sumPrice = sumPrice + (price)
                }
              }
          })
          return sumPrice
        }
    },
  }
</script>

<style scoped>

</style>