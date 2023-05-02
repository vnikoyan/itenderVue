<template>
  <modal 
    class="statistics-modal modal-without-footer"
    name="statistics-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="90%"
    height="90%"
  >
    <div id="modal-header" class="action-modal">
      <div class="w-75 d-flex">
          <p>Վիճակագրություն</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('statistics-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <v-client-table class="statistics-table" :columns="columns" v-model="data" :options="options">
        <template slot="prependHead">
          <tr class="additional-row">
            <th colspan="3"></th>
            <th colspan="3">
              Նախահաշվարկային գին
            </th>
            <th colspan="3">
              Մասնակիցների գներ
            </th>
            <th colspan="5"></th>
          </tr>
        </template>
        <div slot="count" class="table-data-block" slot-scope="{row}">
          {{row.count}}
        </div>
        <div slot="established_count" class="table-data-block" slot-scope="{row}">
          {{row.establishedCount}}
        </div>
        <div slot="unestablished_count" class="table-data-block" slot-scope="{row}">
          {{row.unestablishedCount}}
        </div>
        <div slot="min_estimated_price" class="table-data-block" slot-scope="{row}">
          {{row.minEstimatedPrice ? `${row.minEstimatedPrice}դր․` : '-'}}
        </div>
        <div slot="avg_estimated_price" class="table-data-block" slot-scope="{row}">
          {{row.avgEstimatedPrice ? `${row.avgEstimatedPrice}դր․` : '-'}}
        </div>
        <div slot="max_estimated_price" class="table-data-block" slot-scope="{row}">
          {{row.maxEstimatedPrice ? `${row.maxEstimatedPrice}դր․` : '-'}}
        </div>
        <div slot="min_presented_price" class="table-data-block" slot-scope="{row}">
          {{row.minPresentedPrice ? `${row.minPresentedPrice}դր․ (${row.minPresentedPriceParticipant})` : '-'}}
        </div>
        <div slot="avg_presented_price" class="table-data-block" slot-scope="{row}">
          {{row.avgPresentedPrice ? `${row.avgPresentedPrice}դր․` : '-'}}
        </div>
        <div slot="max_presented_price" class="table-data-block" slot-scope="{row}">
          {{row.maxPresentedPrice ? `${row.maxPresentedPrice}դր․` : '-'}}
        </div>
        <div slot="popular_price" class="table-data-block" slot-scope="{row}">
          {{row.popularPrice ? `${row.popularPrice}դր․` : '-'}}
        </div>
        <div slot="avg_participants_count" class="table-data-block" slot-scope="{row}">
          {{row.avgParticipantsCount ? `${row.avgParticipantsCount}դր․` : '-'}}
        </div>
        <div slot="plan_price_summary" class="table-data-block" slot-scope="{row}">
          {{row.planPriceSummary ? `${row.planPriceSummary}դր․` : '-'}}
        </div>
        <div slot="estimated_price_summary" class="table-data-block" slot-scope="{row}">
          {{row.estimatedPriceSummary ? `${row.estimatedPriceSummary}դր․` : '-'}}
        </div>
      </v-client-table>
    </div>
  </modal>
</template>

<script>
import isMobile from '@/mixins/isMobileView'
import purchaseTypesForItenderLongNames from '@/mixins/purchaseTypes'

export default {
  name: 'StatisticsModal',
  mixins: [isMobile, purchaseTypesForItenderLongNames],
  data () {
    return {
      columns: [
        'count',
        'established_count',
        'unestablished_count',
        'min_estimated_price',
        'avg_estimated_price',
        'max_estimated_price',
        'min_presented_price',
        'avg_presented_price',
        'max_presented_price',
        'popular_price',
        'avg_participants_count',
        'plan_price_summary',
        'estimated_price_summary',
      ],
      data: [],
      options: {
        sortable: [],
        perPage: 1000,
        perPageValues: [],
        columnsDropdown: false,
        filterByColumn: false,
        skin: 'table table-striped table-border-radius',
        dateFormat: "YYYY-mm-dd",
        headings: {
          count: 'Կազմակերպված /վերլուծված/ տենդերների քանակը',
          established_count: 'Կայացած գնման ընթացակարգերի քանակը',
          unestablished_count: 'Չկայացած գնման ընթացակարգերի քանակը՝ ըստ հիմքերի',
          min_estimated_price: 'Նվազագույն',
          avg_estimated_price: 'Միջին',
          max_estimated_price: 'Առավելագույն',
          min_presented_price: 'Նվազագույն',
          avg_presented_price: 'Միջին',
          max_presented_price: 'Առավելագույն',
          popular_price: 'Ամենաշատ ներկայացված գները',
          avg_participants_count: 'Մասնակցության միջին քանակը /մրցակցությունը/',
          plan_price_summary: 'Շուկայի պոտենցիալը՝ համաձայն հրապարակված տարեկան գնումների պլանների',
          estimated_price_summary: 'Կայացած գնման գործընթացների ծավալը'
        },
        filterable: []
      },
    }
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    async beforeOpen({params}){
      this.data = [];
      const {data, potential} = params
      console.log('potential', potential)
      let minEstimatedPrice = 0;
      let maxEstimatedPrice = 0;
      let avgEstimatedPrice = 0;
      let minPresentedPrice = 0;
      let minPresentedPriceParticipant = 0;
      let maxPresentedPrice = 0;
      let avgPresentedPrice = 0;
      let popularPrice = 0;
      let avgParticipantsCount = 0;
      let planPriceSummary = 0;
      let estimatedPriceSummary = 0;

      const count = data.length;
      const establishedCount = data.filter(item => item.established).length;
      const unestablishedCount = data.filter(item => !item.established).length;
      const notMatchConditionsCount = data.filter(item => !item.established && item.failed_substantiation === 'not_match_conditions').length;
      const notRequirementPurchaseCount = data.filter(item => !item.established && item.failed_substantiation === 'not_requirement_purchase').length;
      const noSubmittedApplicationCount = data.filter(item => !item.established && item.failed_substantiation === 'no_submitted_application').length;
      const noContractSignedCount = data.filter(item => !item.established && item.failed_substantiation === 'no_contract_signed').length;
      if(establishedCount){
          minEstimatedPrice = Math.min(...data.filter(item => item.established).map(item => item.estimated_price_unit));
          maxEstimatedPrice = Math.max(...data.filter(item => item.established).map(item => item.estimated_price_unit));
          avgEstimatedPrice = Math.round(data.filter(item => item.established).map(item => item.estimated_price_unit).reduce((a, b) => a + b, 0) / establishedCount, 2);
          const participants = data.filter(item => item.established).map(item => item.participants).reduce((a, b) => a ? [...a, ...b] : [...b], 0)
          if(participants.length){
              minPresentedPrice = Math.min(...participants.map(item => item.total_unit));
              minPresentedPriceParticipant = participants.find((item) => item.total_unit === minPresentedPrice).name;
              maxPresentedPrice = Math.max(...participants.map(item => item.total_unit));
              avgPresentedPrice = Math.round(participants.map(item => item.total_unit).reduce((a, b) => a + b, 0) / participants.length, 2);
              popularPrice = participants.map(item => item.total_unit).reduce((a,b,i,arr) => (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), 0);
          }
          avgParticipantsCount = data.filter(item => item.established).map(item => item.participants.length).reduce((a, b) => a + b, 0) / data.filter(item => item.established).length;
          planPriceSummary = potential;
          estimatedPriceSummary = data.filter(item => item.established).map(item => item.estimated_price).reduce((a, b) => a + b, 0);
      }
      const rowData = {
        count,
        establishedCount,
        unestablishedCount,
        notMatchConditionsCount,
        notRequirementPurchaseCount,
        noSubmittedApplicationCount,
        noContractSignedCount,
        minEstimatedPrice,
        maxEstimatedPrice,
        avgEstimatedPrice,
        minPresentedPrice,
        minPresentedPriceParticipant,
        maxPresentedPrice,
        avgPresentedPrice, 
        popularPrice,
        avgParticipantsCount,
        planPriceSummary,
        estimatedPriceSummary,
      }
      this.data.push(rowData);
    }
  }
}
</script>
<style >
.statistics-table .little-scroll::-webkit-scrollbar {
  width: 3px !important;
  height: 3px !important;
}
</style>
<style scoped>
  .additional-row th{
    text-align: center !important;
    color: #595E6B;
    border-left: 2px solid #DADDE6;
    border-right: 2px solid #DADDE6;
  }

  .additional-row{
    background: #EDEFF2;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
  }
  @media (max-width: 768px) {
    .statistics-modal /deep/ .vm--modal {
      width: auto !important;
      height: 95vh !important;
      top: 0 !important;
      bottom: 0 !important;
      right: 0 !important;
      left: 0 !important;
      margin: 30px 8px;
      position: absolute;
    }
  }
</style>

