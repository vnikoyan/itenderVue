<template>
  <modal 
  class="modal-without-footer"
  @before-open="beforeOpen"
         @before-close="beforeClose"
         name="history-modal"
         style="z-index: 1001;">
    <div id="modal-header">
      <div class="w-100 d-flex">
        <p>Խմբագրման Ժամանակացույց ({{ `${procurement.cpv_code}${procurement.cpv_drop && '/'}${procurement.cpv_drop} - ${procurement.cpv_name}` }})</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('history-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body">
      <v-client-table name="history-table" :columns="columns" :data="tableData" :options="options">
        <template v-slot:type="{row}">
          <div v-if="_.isObject(row.type)">
            <p class="mb-0 text-success">{{ purchaseTypes[row.type.new] }}</p>
          </div>
          <span class="text-info" v-else>{{ purchaseTypes[row.type] }}</span>
        </template>

        <template v-slot:classifier_id="{row}">
          <span class="text-success" :class="[_.isObject(row.classifier_id) && 'text-success' || 'text-info']">
            {{ getClassifier(row).code }}
          </span>
        </template>

        <template v-slot:financial_classifier_id="{row}">
          <span class="text-success" :class="[_.isObject(row.financial_classifier_id) && 'text-success' || 'text-info']">
            <span v-for="value in _.pick(getFinancialClassifier(row), ['code', 'title'])" 
                :key="value">{{ value !== '0' ? value + ' ' : '' }}</span>
          </span>
        </template>

        <template v-slot:total_price="{row}">
          <span>{{ (_.isObject(row.count) ? row.count.new : row.count) * (_.isObject(row.unit_amount) ? row.unit_amount.new : row.unit_amount)}}</span>
        </template>

        <template v-slot:division="{row}">
          <span class="text-success" 
              :class="[_.isObject(row[`user_id_${division.id - 1}`]) && 'text-success' || 'text-info']">
            {{ getDivision(row) }}
          </span>
        </template>

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
      console() {
        return console
      },
      columnsAlt() {
        return this.columns.filter(col => {
          return col !== 'type' 
            && col !== 'performed_at' 
            && col !== 'classifier_id'
            && col !== 'financial_classifier_id'
            && col !== 'total_price'
            && col !== 'division'
        })
      },
      userChildren() {
        return this.$store.getters['user/userChildren']
      },
      division() {
        return this.$store.getters['user/division']
      },
      financialClassifiers() {
        return this.$store.getters['settings/financialClassifiers']
      },
      classifiers() {
        return this.$store.getters['settings/classifiers']
      }
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
          'division',
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
            division: this.$store.getters['user/division'].childName,
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
        procurement: {},
        tableData: []
      }
    },
    methods: {
      async beforeOpen({ params }) {
        this.procurement = params.row
        // eslint-disable-next-line no-undef
        let tmpRow = _.cloneDeep(params.row)

        const procurementHistoryResponse = await this.$store.dispatch('procurement/procurementHistory', this.procurement.plan_row_id)
        const detailsHistoryResponse = await this.$store.dispatch('procurement/detailsHistory', this.procurement.id)
        // eslint-disable-next-line no-undef
        const combinedHistory = _.concat(procurementHistoryResponse.data.data, detailsHistoryResponse.data.data)

        const chronologyObj = {}
        const tableData = [] 
        combinedHistory.map(historyItem => {
          if(historyItem.meta) {
            const sourceObj = {performed_at: historyItem.performed_at }
            // eslint-disable-next-line no-undef
            tmpRow = Object.assign(_.cloneDeep(tmpRow), chronologyObj)
            historyItem.meta.forEach(meta => {
              chronologyObj[meta.key] = meta.old
              sourceObj[meta.key] = meta
            })
            // eslint-disable-next-line no-undef
            tableData.push(Object.assign(_.cloneDeep(tmpRow), sourceObj))
          }
        })
        // eslint-disable-next-line no-undef
        tableData.push(Object.assign(_.cloneDeep(tmpRow), chronologyObj, {performed_at: 'նախնական'}))
        this.tableData = tableData.sort((item, next) => {
          return new Date(next.performed_at) - new Date(item.performed_at);
        })
        // this.$store.dispatch('procurement/history', row.id).then(response => {
          
        // })
      },
      beforeClose() {
        this.tableData = []
        this.procurement = {}
      },
      getClassifier(row) {
        // eslint-disable-next-line no-undef
        const classifierId = _.isObject(row.classifier_id) ? row.classifier_id.new : row.classifier_id
        return this.classifiers.find(classifier => {
          return classifier.id === classifierId
        })
      },
      getFinancialClassifier(row) {
        // eslint-disable-next-line no-undef
        const fClassifierId = _.isObject(row.financial_classifier_id) ? row.financial_classifier_id.new : row.financial_classifier_id
        return this.financialClassifiers.find(fClassifier => {
          return fClassifier.id === fClassifierId
        })
      },
      getDivision(row) {
        const key = `user_id_${this.division.id - 1}`
        // eslint-disable-next-line no-undef
        const divisionId = _.isObject(row[key]) ? row[key].new : row.user
        return this.userChildren.find(child => child.id === divisionId).name
      }
    }
  }
</script>
