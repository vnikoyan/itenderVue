<template>
  <modal
    class="order-details-modal"
    name="order-details-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="25%"
    height="55%"
  >
    <div id="modal-header" class="action-modal">
      <div class="w-100 d-flex">
        <p>Պատվերի մանրամասներ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('order-details-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <label for="name">Մատակարարման վերջնաժամկետ</label>
              <input
                v-model="$v.order.dispatch_date.$model"
                name="dispatch_date"
                type="date"
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
    name: 'order-details-modal',
    components: {  },
    data() {
      return {
        handleOrder: '',
        order: {
          dispatch_date: '',
        },
      }
    },
    validations() {
      const rules = {
        order: {
          dispatch_date: {required},
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
        this.handleOrder = params.handleOrder;
      },
      save() {
        if(!this.$v.order.$invalid) {
          this.handleOrder(this.order.dispatch_date)
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Լրացրեք բոլոր դաշտերը պահպանելու համար!'
          })
        }
        
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