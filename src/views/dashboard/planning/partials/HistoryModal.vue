<template>
  <modal @before-open="beforeOpen"
         @before-close="beforeClose"
         name="history-modal"
         style="z-index: 1001;">
    <div id="modal-header" class="w-100 px-4 py-2 position-relative"
         style="background-color:#506ee4">
      <div class="w-100 d-flex">
        <h4 class="text-white">Խմբագրման Ժամանակացույց ({{row.cpv ? `${row.cpv.code}/${row.cpv_drop} - ${row.cpv.name}` : ''}})</h4>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('history-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body" class="px-4 py-5" style="overflow-x: auto; height: 90%">
      <v-client-table name="history-table" :columns="columns" :data="tableData" :options="options">
        <template v-slot:type="{row}">
          <div v-if="_.isObject(row.type)">
            <p class="mb-0 text-success">{{ purchaseTypes[row.type.new] }}</p>
<!--            <p class="mb-0 text-center">-->
<!--              <font-awesome-icon icon="arrow-up"/>-->
<!--            </p>-->
<!--            <p class="mb-0 text-danger">{{ purchaseTypes[row.type.old] }}</p>-->
          </div>
          <span class="text-info" v-else>{{ purchaseTypes[row.type] }}</span>
        </template>

        <template v-slot:classifier_id="{row}">
            <span>{{ classifiers.find(classifier => classifier.id === row.classifier_id).code }}</span>
        </template>

        <template v-slot:financial_classifier_id="{row}">
            <span>{{ financialClassifiers.find(fClassifier => fClassifier.id === row.financial_classifier_id).code }}</span>
        </template>

        <template v-slot:total_price={row}>
          <span>{{ (_.isObject(row.count) ? row.count.new : row.count) * (_.isObject(row.unit_amount) ? row.unit_amount.new : row.unit_amount)}}</span>
        </template>

        <!-- <template v-slot:division="{row}">
            <span>{{ userChildren.find(child => child.id === row.user).email }}</span>
        </template> -->

        <template v-for="column in columnsAlt" v-slot:[column]="{row}">
        <span :key="column">
          <div  v-if="_.isObject(_.split(column, '.').reduce((value, key) => value[key], row))">
            <p class="mb-0 text-success">{{ _.split(column, '.').reduce((value, key) => value[key], row).new }}</p>
<!--            <p class="mb-0 text-center">-->
<!--              <font-awesome-icon icon="arrow-up"/>-->
<!--            </p>-->
<!--            <p class="mb-0 text-danger">{{ _.split(column, '.').reduce((value, key) => value[key], row).old }}</p>-->
          </div>
          <span v-else class="text-info">{{ _.split(column, '.').reduce((value, key) => value[key], row) }}</span>
        </span>
        </template>
      </v-client-table>
    </div>
  </modal>
</template>

<script>
  import purchaseTypes from '@/mixins/purchaseTypes'
  export default {
    name: 'HistoryModal',
    mixins: [purchaseTypes],
    computed: {
      columnsAlt() {
        return this.columns.filter(col => {
          return col !== 'type' 
            && col !== 'performed_at' 
            && col !== 'classifier_id'
            && col !== 'financial_classifier_id'
            && col !== 'total_price'
        })
      },
      userChildren() {
        return this.$store.getters['user/userChildren']
      },
      financialClassifiers() {
        return this.$store.getters['settings/financialClassifiers']
      },
      classifiers() {
        return this.$store.getters['settings/classifiers']
      },
    },
    data() {
      return {
        columns: [
          'unit',
          'unit_amount',
          'count',
          'out_count',
          'total_price',
          'type',
          'classifier_id',
          'financial_classifier_id',
          // 'division',
          'date',
          'performed_at'
        ],
        options: {
          headings: {
            unit: 'Չափման միավոր',
            unit_amount: 'Միավորի գին',
            count: 'Քանակ',
            out_count: 'Համակարգից դուրս կազմակերպած քանակ',
            total_price: 'Ընդհանուր',
            type: 'Գնման Ձև',
            classifier_id: 'Տնտեսական դասակարգիչ',
            financial_classifier_id: 'Բյուջետային ծրագիր',
            // division: this.$store.getters['user/division'].childName,
            date: 'Գնման ժամկետ',
            performed_at: 'Փոփոխվել է'
          },
          sortable: [],
          texts: {
            count:
              'Ցուցադրված է {from}֊ից {to}֊ը ընդհանուր {count} տողից|{count} տող|',
            first: 'Առաջին',
            last: 'Վերջին',
            filter: '',
            filterPlaceholder: 'Փնտրել',
            limit: '',
            page: 'Page:',
            noResults: 'Համընկնում չի գտնվել',
            noRequest: 'խնդրում ենք ընտրել առնվազն մեկ ֆիլտեր տվյալները ներբեռնելու համար',
            filterBy: 'փնտրել ըստ {column}',
            loading: 'Բեռնվում է...',
            defaultOption: 'ընտրել {column}',
            columns: 'Ընտրել դաշտերը',
          },
          skin: 'table table-hover'
        },
        row: {},
        tableData: []
      }
    },
    methods: {
      async beforeOpen({ params }) {
        let row = params.row
        this.row = params.row
        const procurementHistoryResponse = await this.$store.dispatch('procurement/procurementHistory', row.plan_row_id)
        const detailsHistoryResponse = await this.$store.dispatch('procurement/detailsHistory', row.id)
        // eslint-disable-next-line no-undef
        const combinedHistory = _.concat(procurementHistoryResponse.data.data, detailsHistoryResponse.data.data)

        const chronologyObj = {}
        const tableData = [] 
        combinedHistory.map(historyItem => {
          if(historyItem.meta) {
            const sourceObj = {performed_at: historyItem.performed_at }
            // eslint-disable-next-line no-undef
            row = Object.assign(_.cloneDeep(row), chronologyObj)
            historyItem.meta.forEach(meta => {
              chronologyObj[meta.key] = meta.old
              sourceObj[meta.key] = meta
            })
            // eslint-disable-next-line no-undef
            tableData.push(Object.assign(_.cloneDeep(row), sourceObj))
          }
        })
        // eslint-disable-next-line no-undef
        tableData.push(Object.assign(_.cloneDeep(row), chronologyObj, {performed_at: 'նախնական'}))
        this.tableData = tableData
        // this.$store.dispatch('procurement/history', row.id).then(response => {
          
        // })
      },
      beforeClose() {
        this.tableData = []
        this.row = {}
      }
    }
  }
</script>
