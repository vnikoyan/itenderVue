<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th v-for="heading in headings"
              :key="heading"
              scope="col">{{ heading }}</th>
        </tr>
      </thead>
      <tbody :class="tableName" style="max-height: 40vh!important; overflow: scroll">
        <tr v-for="(row, index) in tableData2.data" 
          class="position-relative"
          :key="row.id" :class="[row.status === 3 && 'row-deleted']">
          <!-- <td>{{row.order_index}}</td> -->
          <td>{{row.cpv_code}}/{{row.cpv_drop}}</td>
          <td>{{row.cpv_name}}</td>
          <td>{{row.unit}}</td>
          <td>{{row.unit_amount}}</td>
          <td>{{row.count - row.out_count}}/{{row.count}}</td>
          <td>
            <span v-tooltip.top="{content: `Որից ${row.out_count || 0}-${row.out_count ? 'ը' : 'ն'} համակարգից դուրս`}" 
              style="cursor: pointer">
              {{row.out_count + (row.organized_count || 0)}}
            </span>
          </td>
          <td>{{row.count * row.unit_amount}}</td>
          <td>{{purchaseTypes[row.type]}}</td>
          <!--        <td>{{row.cpv.classifier}}</td>-->
          <td>{{userChildren.find(user => user.id === row.user).name}}</td>
          <td>{{row.date}}</td>
          <td>
            <div class="btn-group mb-4 mb-md-0">
              <button v-if="row.status === 3 && (currentPlan.status === 0 || (currentPlan.status === 1 && isRoot))" 
                      @click="restoreRow(row, index)"
                      class="btn btn-outline-light">
                <font-awesome-icon icon="history" class="text-success"/>
              </button>
              <button v-else-if="row.status !== 3" 
                      @click="$emit('openProcurementEditModal', {row: row, updateTable: () => updateDataChunk(getChunkPage(index))})"
                      type="button"
                      title="խմբագրել"
                      class="btn btn-outline-light">
                <font-awesome-icon icon="edit"/>
              </button>
              <button v-else @click="$emit('openHistoryModal', row)"
                      title="խմբագրման պատմություն"
                      class="dropdown-item  border-0 btn btn-outline-light">
                <font-awesome-icon icon="clock"/>
              </button>
              <button type="button" class="btn btn-outline-light dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="sr-only">Toggle Dropdown</span> <i class="mdi mdi-chevron-down"></i>
              </button>
              <div class="dropdown-menu" style="min-width: unset !important; opacity: unset !important">
                <button v-if="row.status !== 3" @click="$emit('openHistoryModal', row)"
                        title="խմբագրման պատմություն"
                        class="dropdown-item  border-0 btn btn-outline-light">
                  <font-awesome-icon icon="clock"/>
                </button>
                <button v-if="isRoot" @click="addSame(row)"
                        title="ավելացնել նույնից"
                        class="dropdown-item border-0 btn btn-outline-light">
                  <font-awesome-icon icon="plus"/>
                </button>
                <div v-if="row.status !== 3" class="dropdown-divider"></div>
                <button v-if="row.status !== 3" @click="deleteRow(row, index)"
                        title="հեռացնել"
                        class="dropdown-item border-0 text-danger btn btn-outline-light">
                  <font-awesome-icon icon="trash-alt"/>
                </button>
              </div>
            </div>
          </td>
        </tr>
        <infinite-loading slot="append"
                          @infinite="infiniteHandler"
                          :force-use-infinite-wrapper="'.' + tableName">
          <div slot="no-results"></div>
          <div slot="no-more">Վերջ :)</div>
        </infinite-loading>
      </tbody>
    </table>
  </div>
</template>

<script>
  import purchaseTypes from '@/mixins/purchaseTypes'
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    name: 'PlanTable2',
    mixins: [purchaseTypes],
    components: { InfiniteLoading },
    props: {
      tableDataApi: String,
      tableName: String,
      tableData2: Object,
      currentPlan: Object,
      getNextDataChunk: Function,
      updateDataChunk: Function
    },
    data() {
      const fakeTableData = []
      for(let i = 1; i < 15; i++) {
        fakeTableData.push({
          order_index: i,
          cpv_drop: '1',
          unit: 'կգ',
          unit_amount: Math.floor(Math.random() * 1000),
          count: Math.floor(Math.random() * 1000),
          type: "ՄԱ",
          user_id: 1,
          date: '12/12/2021',
          cpv: {
            name: 'ավազ',
            code: '14210001',
            classifier: 'classifier'
          }
        })
      }
      return {
        headings: [
          // 'ՀՀ',
          'CPV կոդ(պայմանով/ առանց պայման)',
          'Անվանումը',
          'Չափման միավոր',
          'Միավորի գին',
          'Մնացորդ/Քանակ',
          'Կազմակերպված քանակ',
          // 'Համակարգից դուրս կազմակերպված քանակ',
          'Ընդհանուր',
          'Գնման Ձև',
          // 'ֆինանսական Դասակարգիչ',
          this.$store.getters['user/division'].childName,
          'Գնման ժամկետ',
          'Գործողություն'
        ],
        tableData: fakeTableData,
      }
    },
    computed: {
      units() {
        return this.$store.getters['settings/units']
      },
      userChildren() {
        return this.$store.getters['user/userChildren']
      },
      isRoot() {
        return this.$store.getters['user/isRoot']
      },
      division() {
        return this.$store.getters['user/division']
      },
    },
    mounted() {
    },
    methods: {
      infiniteHandler($state) {
        if(this.tableData2.pagination.continue) {
          this.getNextDataChunk(this.tableData2.pagination.page + 1).then(data => {
            data.length ? $state.loaded() : $state.complete()
          })
        } else {
          $state.complete()
        }
      },
      // updateRow(row, field) {
      //   const updateParams = {
      //     rowId: row.id,
      //     data: Object.assign({[field]: row[field]}, {user_id: row.user_id})
      //   }
      //   this.$store.dispatch('procurement/update', updateParams).then(response => {
      //     if(response.data.status) {
      //       this.updateTable()
      //     }
      //   })
      // },
      updateRow(index) {
        this.updateDataChunk(this.getChunkPage(index))
      },
      approveDate(rowId, index) {
        this.$store.dispatch('procurement/approveRow', rowId)
          .then(({data: {status}}) => { if(status) this.updateTable() })
      },
      restoreRow(row, index) {
        this.$store.dispatch('procurement/restoreRow', row.plan_row_id).then(response => {
          this.updateDataChunk(this.getChunkPage(index))
        })
      },
      addSame(row) {
        const data = {
          cpv_id: row.cpv_id,
          cpv_drop: row.cpv_drop + 1,
          cpv_type: row.cpv.type,
          unit: row.unit,
          specifications_id: row.specifications_id,
          count: row.count,
          unit_amount: row.unit_amount,
          type: row.type,
          classifier_id: 1,
          user_id: row.user_id,
          date: row.date,
          is_condition: row.is_condition,
        }
        // const tmp = {
        //   "procurement_id": 12,
        //   "procurement": [
        //     {
        //       "cpv_id": 16,
        //       "cpv_drop": 1,
        //       "cpv_type": 1,
        //       "specifications_id": "1",
        //       "user_id": "1",
        //       "is_condition": "1",
        //       "unit": "1",
        //       "plan_details": [
        //         {
        //           "count": "1",
        //           "date": "2020-12-12",
        //           "unit_amount": "1",
        //           "type": "1",
        //           "classifier_id": "1",
        //           "financial_classifier_id": "1",
        //           "budget_type": "0"
        //         }
        //       ]
        //     }
        //   ]
        // }

        this.$store.dispatch('procurement/storeProcurements', {
          procurementId: this.currentPlan.id,
          cpvArr:[data]
        }).then(response => {
          if(response.data.status) {
            // this.updateTable()
          }
        })
      },
      deleteRow(row, index) {
        this.$store.dispatch('procurement/deleteRow', row.plan_row_id).then(response => {
          if(response.data.status) { 
            this.updateDataChunk(this.getChunkPage(index))
          }
            // this.updateTable()
        })
      },
      updateTable() {
        this.$refs[this.tableName].getData()
      },
      getChunkPage(index) {
        if(index === 0) return 1
        return Math.ceil(index/10)
      }
    }
  }
</script>

<style scoped>
  tbody {
    display: block;
    max-height: 40vh;
    overflow: auto;
  }
  thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  thead {
    width: calc(100% - 1em)
  }
  .row-deleted {
    font-style: italic;
    background: rgba(253, 228, 222, 0.44);
  }
</style>
