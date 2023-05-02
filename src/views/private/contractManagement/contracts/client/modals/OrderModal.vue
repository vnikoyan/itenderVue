<template>
  <modal 
    class="order-modal"
    name="order-modal"
    @closed="$emit('updateComparisonData')"
    @before-close="beforeClose"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
  >
    <div id="modal-header" style="background-color:#006BE6">
      <div class="w-75 d-flex text-white">
        <p style="font-weight: 400;">Գրանցել պատվեր</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('order-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ffffff"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <template v-if="isMobile">
        <table style="table-layout: fixed;" class="table details-table-mobile table-border-radius">
          <tbody>
              <tr>
                <th style="border-top-left-radius: 10px;">Պայմանագրի ծածկագիր</th>
                <td class="text-left">{{contract.code}}</td>
              </tr>
              <tr>
                <th>Մատակարար</th>
                <td class="text-left">{{contract.participant && contract.participant.name}}</td>
              </tr>
              <tr>
                <th>Հեռախոս</th>
                <td class="text-left">{{contract.participant && contract.participant.phone}}</td>
              </tr>
              <tr>
                <th style="border-bottom-left-radius: 10px;">Էլ. փոստ</th>
                <td class="text-left">{{contract.participant && contract.participant.email}}</td>
              </tr>
          </tbody>
        </table>
      </template>
      <template v-else>
        <table class="table details-table table-border-radius">
          <thead>
              <tr>
                <th class="text-center">Պայմանագրի ծածկագիր</th>
                <th class="text-center">Մատակարար</th>
                <th class="text-center">Հեռախոս</th>
                <th class="text-center">Էլ. փոստ</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td>{{contract.code}}</td>
                <td>{{contract.participant && contract.participant.name}}</td>
                <td>{{contract.participant && contract.participant.phone}}</td>
                <td>{{contract.participant && contract.participant.email}}</td>
              </tr>
          </tbody>
        </table>
      </template>

      <v-client-table ref="vtable" :columns="columns" v-model="contract.lots" :options="options">
        <div slot="index_number" class="d-flex justify-content-start align-items-center h-100" slot-scope="{index}">
          <span style="width: 20px">{{ index }}</span>
        </div>
        <div slot="id" slot-scope="{row}">
          {{ row.view_id }}
        </div>
        <div slot="cpv_name" slot-scope="{row}">
          {{row.name}}
        </div>
        <div slot="specification" slot-scope="{row}">
          {{row.specification}}
        </div>
        <div slot="purchase_schedule">
          Պատվերը ստանալուց՝ <span>{{ contract.organize && contract.organize.purchase_schedule || 5  }}</span> աշխատանքային օրվա ընթացքում
        </div>
        <div slot="unit_price" slot-scope="{row}">
          {{row.price_unit !== 0 ? row.price_unit : row.price / (row.available + row.ordered + row.supplied)}}դր.
        </div>
        <div slot="total_price" slot-scope="{row}">
          {{row.price}}դր.
        </div>
        <div slot="count" slot-scope="{row}">
          {{row.available + row.ordered + row.supplied}}
        </div>
        <div slot="leftover" slot-scope="{row}">
          {{row.available}}
        </div>
        <div slot="order_input" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
          <div v-if="row.available" class="row m-0 p-0">
            <div class="col-12 p-0" v-tooltip="row.has_failed_order && 'Տվյալ չափաբաժնով կա չկայացած պատվեր'">
              <input
                :disabled="row.has_failed_order"
                v-model.number="row.order_count"
                v-positive-only.none-zero
                @input="calculateByAvailable(row)"
                v-positive-only.none_zero.integer
                type="text"
                min="1"
                class="form-control"
              >
              <div :key="index">
                <span v-if="row.error" class="text-danger mb-0" style="font-size: 0.6rem">
                    գերազանցում է հասանելի մնացորդի քանակը
                </span>
              </div>
            </div>
          </div>
          <div v-else>
            Սպառված է
          </div>
        </div>
        <div slot="order_price" slot-scope="{row}">
          <div :key="index">
            {{row.order_price}}
          </div>
        </div>
      </v-client-table>
      
    </div>
    <div id="modal-footer">
      <button @click="handleOpenOrderDetails" :disabled="Boolean(lotsWithError.length)" type="button" class="btn btn-primary" data-toggle="modal" data-animation="bounce">
        <span>Պատվիրել</span>
      </button>
    </div>
  </modal>
</template>

<script>
import isMobile from '@/mixins/isMobileView'

export default {
  name: 'OrderModal',
  mixins: [isMobile],
  data () {
    return {
      isSetEqual: false,
      isSuccess: true,
      lotsWithError: [],
      columns: ['index_number', 'cpv_name', 'specification', 'unit', 'purchase_schedule', 'unit_price', 'total_price', 'count', 'leftover', 'order_input', 'order_price'],
      contract: {},
      lots: [],
      index: 0,
      focusedLotFields: {},
      lotsWithVatLength: 0,
      sugesstion: {},
      options: {
        sortable: [],
        perPage: 1000,
        perPageValues: [],
        columnsDropdown: false,
        filterByColumn: false,
        skin: 'table table-striped table-border-radius',
        dateFormat: "YYYY-mm-dd",
        headings: {
          id: 'Չ/Հ',
          index_number: 'Հ/Հ',
          cpv_name: 'CPV - անվանում',
          specification: 'Բնութագիր',
          unit: 'Չափման միավորը',
          purchase_schedule: 'Մատակարարման ժամկետ',
          unit_price: 'Միավորի գին',
          total_price: 'Ընդհանուր գին',
          count: 'Ընդհանուր քանակ',
          leftover: 'Մնացորդ',
          order_input: 'Պատվիրել',
          order_price: 'Պատվերի գումար',
        },
        filterable: false
      },
    }
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    consoleLog(data){
      console.log(data)
    },
    handleOpenOrderDetails(){
      if(this.$refs.vtable.filteredData.filter(row => row.order_count).length){
        this.$modal.show('order-details-modal', {handleOrder: this.order} )
      } else {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Ընտրեք գոնե մեկ չափաբաժին պատվերը գրանցելու համար',
          text: 'Կրկին փորձեք!'
        })
      }
    },
    async order(dispatchDate){
      const lots = []
      this.$refs.vtable.filteredData.filter(row => row.order_count).forEach((row) => {
        const lotObj = {
          contract_lot_id: row.id,
          ordered: row.order_count
        }
        lots.push(lotObj)
      })
      const requestData = {
        contract_id: this.contract.id,
        status: 'sended',
        dispatch_date: dispatchDate,
        lots: lots
      }
      await this.$client.post('contract-orders', requestData).then(({data}) => {
        if(data) {
          this.$modal.hide('order-details-modal')
          this.$modal.hide('order-modal')
        }
      }).catch(e => {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Ինչ որ բան այն չէ',
          text: 'Կրկին փորձեք!'
        })
      })
    },
    isAllRowsCorrect(){
      return true;
    },
    calculateByAvailable(row){
      const { available } = row;
      const orderCount = row.order_count;
      const priceUnit = row.price_unit;
      this.index = this.index + 1;
      this.lotsWithError = [];
      if(orderCount > available){
        this.lotsWithError.push(row);
        row.error = true;
        row.order_price = '';
      } else {
        const optionIndex = this.lotsWithError.findIndex(item => item.id === row.id)
        if(optionIndex >= 0){
          this.lotsWithError.splice(optionIndex, 1)
        }
        row.error = false;
        row.order_price = orderCount * priceUnit;
        this.lots.push(row)
      }
    },
    beforeClose(){
      this.resetComponent()
    },
    beforeOpen({params}) {
      this.resetComponent = params.resetComponent
      this.contract = params.contract
      if(this.contract.organize){
        if(this.contract.organize.type === 'competitive'){
          this.columns = ['index_number', 'cpv_name', 'specification', 'unit', 'unit_price', 'total_price', 'count', 'leftover', 'order_input', 'order_price'];
        } else {
          this.columns = ['index_number', 'cpv_name', 'specification', 'unit', 'purchase_schedule', 'unit_price', 'total_price', 'count', 'leftover', 'order_input', 'order_price'];
        }
      }
    },
    handleLotInputsFocus(event, details) {
      // eslint-disable-next-line eqeqeq
      if(event.target.value == 0) {
        event.target.select()
      }
      this.focusedLotFields = details
    },
  }
}
</script>
<style scoped>
  .order-modal /deep/ .vm--modal #modal-body{
    padding: 20px;
  }
</style>