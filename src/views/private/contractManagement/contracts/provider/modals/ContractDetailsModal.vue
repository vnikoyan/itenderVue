<template>
  <modal 
    class="contract-details-modal modal-without-footer"
    name="contract-details-modal"
    @closed="$emit('updateComparisonData')"
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
        <p style="font-weight: 400;">Պայմանագրի մանրամասներ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('contract-details-modal')" aria-label="Close">
        <svg  width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <td class="text-left">{{contract.code && contract.code}}</td>
              </tr>
              <tr>
                <th style="border-bottom-left-radius: 10px;">Պատվիրատու</th>
                <td class="text-left">{{contract.client && contract.client.name}}</td>
              </tr>
          </tbody>
        </table>
      </template>
      <template v-else>
        <table class="table details-table table-border-radius">
          <thead>
              <tr>
                <th class="text-center">Պայմանագրի ծածկագիր</th>
                <th class="text-center">Պատվիրատու</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td>{{contract.code && contract.code}}</td>
                <td>{{contract.client && contract.client.name}}</td>
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
        <div slot="unit" slot-scope="{row}">
          {{row.unit}}
        </div>
        <div slot="purchase_schedule" slot-scope="{row}">
          {{row.delivery_date}}
        </div>
        <div slot="unit_price" slot-scope="{row}">
          {{row.price_unit}}դր.
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
      </v-client-table>
    </div>
  </modal>
</template>

<script>
import isMobile from '@/mixins/isMobileView'

export default {
  name: 'ContractDetailsModal',
  mixins: [isMobile],
  data () {
    return {
      isSetEqual: false,
      isSuccess: true,
      lotsWithError: [],
      columns: ['index_number', 'cpv_name', 'specification', 'unit', 'purchase_schedule', 'unit_price', 'total_price', 'count', 'leftover'],
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
          cpv_name: 'Անվանում',
          specification: 'Բնութագիր',
          unit: 'Չափման միավոը',
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
    beforeOpen({params}) {
      this.resetComponent = params.resetComponent
      this.contract = params
    },
  }
}
</script>
<style scoped>

</style>
<style scoped>
  .searchItem:hover {
    background-color: #006BE6;
    color: #fff;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

