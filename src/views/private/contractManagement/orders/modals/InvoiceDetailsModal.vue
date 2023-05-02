<template>
  <modal 
    class="invoice-details-modal"
    name="invoice-details-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="beforeOpen"
    @before-close="beforeClose"
    transition="fade"
    :adaptive="true"
    :reset="true"
    width="25%"
    height="60%"
  >
    <div id="modal-header" style="background-color:#006BE6">
      <div class="w-75 d-flex text-white">
        <p style="font-weight: 400;">Դուրս գրել հաշիվ ապրանքագիր</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('invoice-details-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ffffff"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="row m-0 p-0">
        <div class="form-group col-12 p-0 m-0">
          <float-label>
            <input 
              v-model="$v.orderData.invoice_number.$model"
              placeholder="Ֆակտուրայի համար"
              :mask="'#################'"
              name="code"
              type="text"
              class="form-control m-0"
            >
          </float-label>
        </div>
        <div class="form-group col-12 p-0 m-0">
          <float-label>
            <input 
              v-model="$v.orderData.discharge_date.$model"
              v-mask="'##.##.####'"
              placeholder="Դուրս գրման ամսաթիվ"
              type="text"
              class="form-control m-0"
            >
          </float-label>
        </div>
        <div class="form-group col-12 p-0 m-0">
          <float-label>
            <input
              v-model="$v.orderData.completion_actual_date.$model"
              v-mask="'##.##.####'"
              placeholder="Փաստացի մատակարարման ամսաթիվ"
              type="text"
              class="form-control m-0"
            >
          </float-label>
        </div>
      </div>
    </div>
    <div id="modal-footer" class="text-center">
      <button @click="save" type="button" class="btn btn-primary" data-toggle="modal" data-animation="bounce">
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'InvoiceDetailsModal',
  components: {  },
  data () {
    return {
      orderData: {
        invoice_number: '',
        discharge_date: '',
        completion_actual_date: '',
      },
    }
  },
  computed: {},
  validations() {
    return {
      orderData: {
        invoice_number: {required},
        discharge_date: {required},
        completion_actual_date: {required},
      },
    }
  },
  methods: {
    consoleLog(data){
      console.log(data)
    },
    async save(){
      if(!this.$v.orderData.$invalid) {
        console.log(this.order.contract)
        if(this.order.contract.from_application){
          this.orderData.status = 'completed'
        }
        await this.$client.put(`contract-orders/${this.order.id}`, this.orderData).then(({data}) => {
          if(data) {
            this.resetComponent()
            this.$modal.hide('invoice-details-modal')
            if(this.order.contract.from_application){
              this.$router.push('/participant/contract-management/orders/finished')
            }
          }
        }).catch(e => {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Ինչ որ բան այն չէ',
            text: 'Կրկին փորձեք!'
          })
        })
      } else {
        this.$notify({
          group: 'foo',
          type: 'error',
          text: 'Լրացրեք բոլոր դաշտերը պահպանելու համար!'
        })
      }
    },
    formatDate(date) {
        var d = new Date(date);
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();
        console.log(d)

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    },
    beforeOpen({params}) {
      this.resetComponent = params.resetComponent
      this.order = params.order
      // this.orderData = params.order

      // console.log(params)
      
      // console.log('moment', moment(this.order.discharge_date).format("YYYY-MM-DD"))
      // console.log(this.order.discharge_date)
      // console.log(this.formatDate(this.order.discharge_date))
      // this.orderData.invoice_number = this.order.invoice_number ? this.order.invoice_number : "";
      // this.orderData.discharge_date = this.order.discharge_date ? this.order.discharge_date : "";
      // this.orderData.delivery_date = this.order.delivery_date ? this.order.delivery_date : "";
      // this.orderData.payment_date = this.order.payment_date ? this.order.payment_date : "";
      // this.orderData.completion_contract_date = this.order.completion_contract_date ? this.order.completion_contract_date : "";
      // this.orderData.completion_actual_date = this.order.completion_actual_date ? this.order.completion_actual_date : "";
    },
    beforeClose(){
      this.orderData = {
        invoice_number: '',
        discharge_date: '',
        completion_actual_date: '',
      }
    }
  }
}
</script>
<style scoped>
#modal-body{
  padding: 28px 30px;
}
.form-group{
  padding-bottom: 28px !important;
}
.form-control{
  height: 48px;
}
</style>

