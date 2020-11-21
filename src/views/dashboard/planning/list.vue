<template>
  <div>
    <add-cpv-modal @resetTableView="resetTableView"/>
    <history-modal />
    <procurement-edit-modal />
    <div v-if="arePlansLoading" class="w-100 py-3 d-flex justify-content-center">
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
      </div>
    <div v-else-if="currentPlan" class="container-fluid px-0">
      <nav class="pt-3 mb-4 shadow">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a v-for="plan in procurementPlans"
              @click="$store.dispatch('procurement/setCurrentPlan', plan)" 
              :key="plan.id" 
              :class="{'active': plan.id === currentPlan.id}"
              class="nav-item nav-link"
              style="cursor: pointer;" 
              id="nav-home-tab">{{plan.year}}</a>
        </div>
      </nav>
      <div class="w-100 d-flex justify-content-between px-3 mb-4">
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="mr-2">Ըստ {{ tableViewModeName }}</span>
            <font-awesome-icon icon="angle-down"/>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a v-if="!(tableViewMode === 1)" 
                @click.prevent="loadTableView(1, 'Գնման Առարկայի')" 
                style="cursor: pointer;"
                class="dropdown-item">Գնման Առարկայի</a>
            <a v-if="!(tableViewMode === 2)" 
                @click.prevent="loadTableView(2, 'Բյուջետային Ծրագրի')" 
                style="cursor: pointer;"
                class="dropdown-item">Բյուջետային Ծրագրի</a>
            <a v-if="!(tableViewMode === 3)" 
                @click.prevent="loadTableView(3, 'Տնտեսականա Դասակարգչի')" 
                style="cursor: pointer;"
                class="dropdown-item">Տնտեսականա Դասակարգչի</a>
          </div>
        </div>
        <button v-if="isRoot" @click="$modal.show('add-cpv-modal', {procurement: currentPlan, budgetType})"
                class="btn btn-sm btn-primary">Ավելացնել Գնման Առարկա
        </button>
      </div>

      <div v-if="isLoadTableViewPending" class="w-100 py-3 d-flex justify-content-center">
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
      </div>

      <div v-if="tableViewMode === 1" class="w-100 px-3 text-primary">
        <div v-for="itemLevel1 in (tableViews[currentPlan.year] && tableViews[currentPlan.year]['1'] || [])"
          class="w-100"
          :key="itemLevel1.cpv_type">
          <div @click="getTableViewSubLevel(itemLevel1, 'level2', [itemLevel1.cpv_type])"
            style="cursor: pointer;" 
            class="d-flex justify-content-between border rounded w-100 py-2 px-3 mb-2 shadow">
            <div>
              <div v-if="itemLevel1.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
              <font-awesome-icon v-else :icon="itemLevel1.isOpen ? 'minus' : 'plus'"/>
              <span class="ml-3">{{  cpvTypes[itemLevel1.cpv_type]  }}</span>
            </div>
            <div>
              <span>{{ itemLevel1.total }}</span>
            </div>
          </div>
          <div v-if="itemLevel1.isOpen && itemLevel1.childNodes" class="w-100 px-2">
            <div v-for="itemLevel2 in itemLevel1.childNodes"
              :key="itemLevel2.cpv_group"
              class="w-100 border rounded mb-2 shadow">
              <div @click="getTableViewSubLevel(itemLevel2, 'levelLast', [itemLevel1.cpv_type, itemLevel2.cpv_group])"
                   style="cursor: pointer;"
                   class="d-flex justify-content-between w-100 py-2 px-3">
                <div>
                  <div v-if="itemLevel2.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
                  <font-awesome-icon v-else :icon="itemLevel2.isOpen ? 'minus' : 'plus'"/>
                  <span class="ml-3">խումբ {{ itemLevel2.cpv_group }}</span>
                </div>
                <div>
                  <span class="mr-3">
                    {{ itemLevel2.childNodes && itemLevel2.childNodes.pagination.total + ' գնման առարկա' }}
                  </span>
                  <span>{{ itemLevel2.total }} դր․</span>
                </div>
              </div>
              <div class="border-top px-2 py-3" v-if="itemLevel2.isOpen && itemLevel2.childNodes">
<!--                <plan-header v-if="false" />-->
                <plan-table
                  :tableData2="itemLevel2.childNodes"
                  :getNextDataChunk="getNextDataChunkFunction(itemLevel2, [itemLevel1.cpv_type, itemLevel2.cpv_group])"
                  :updateDataChunk="getUpdateDataChunkFunction(itemLevel2, [itemLevel1.cpv_type, itemLevel2.cpv_group])"
                  @openProcurementEditModal="({row, updateTable}) => {$modal.show('edit-modal', {row, updateTable})}"
                  @openHistoryModal="(row) => {$modal.show('history-modal', {row})}"
                  :key="'planTable' + itemLevel1.cpv_type + itemLevel2.cpv_group"
                  :tableName="'planTable' + itemLevel1.cpv_type + itemLevel2.cpv_group"
                  :currentPlan="currentPlan" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tableViewMode === 2" class="w-100 px-3 text-primary">
        <div v-for="itemLevel1 in (tableViews[currentPlan.year] && tableViews[currentPlan.year]['2'] || [])"
          class="w-100"
          :key="itemLevel1.id">
          <div @click="getTableViewSubLevel(itemLevel1, 'level2', [itemLevel1.id])"
            style="cursor: pointer;" 
            class="d-flex justify-content-between border rounded w-100 py-2 px-3 mb-2 shadow">
            <div>
              <div v-if="itemLevel1.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
              <font-awesome-icon v-else :icon="itemLevel1.isOpen ? 'minus' : 'plus'"/>
              <span class="ml-3">{{ itemLevel1.title }}</span>
            </div>
            <div>
              <span>{{ itemLevel1.total }} դր․</span>
            </div>
          </div>
          <div v-if="itemLevel1.isOpen && itemLevel1.childNodes" class="w-100 px-2">
            <div v-for="itemLevel2 in itemLevel1.childNodes"
              :key="itemLevel2.type"
              class="w-100 border rounded mb-2 shadow">
              <div @click="getTableViewSubLevel(itemLevel2, 'levelLast', [itemLevel1.id, itemLevel2.cpv_type])"
                   style="cursor: pointer;"
                   class="d-flex justify-content-between w-100 py-2 px-3">
                <div>
                  <div v-if="itemLevel2.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
                  <font-awesome-icon v-else :icon="itemLevel2.isOpen ? 'minus' : 'plus'"/>
                  <span class="ml-3">{{ cpvTypes[itemLevel2.cpv_type] }}</span>
                </div>
                <div>
                  <span class="mr-3">
                    {{ itemLevel2.childNodes && itemLevel2.childNodes.pagination.total + ' գնման առարկա' }}
                  </span>
                  <span>{{ itemLevel2.total }} դր․</span>
                </div>
              </div>
              <div class="border-top px-2 py-3" v-if="itemLevel2.isOpen && itemLevel2.childNodes">
<!--                <plan-header v-if="false" />-->
                <plan-table
                  :tableData2="itemLevel2.childNodes"
                  :getNextDataChunk="getNextDataChunkFunction(itemLevel2, [itemLevel1.id, itemLevel2.cpv_type])"
                  :updateDataChunk="getUpdateDataChunkFunction(itemLevel2, [itemLevel1.id, itemLevel2.cpv_type])"
                  @openProcurementEditModal="({row, updateTable}) => {$modal.show('edit-modal', {row, updateTable})}"
                  @openHistoryModal="(row) => {$modal.show('history-modal', {row})}"
                  :key="'planTable' + itemLevel1.id + itemLevel2.cpv_type"
                  :tableName="'planTable' + itemLevel1.id + itemLevel2.cpv_type"
                  :currentPlan="currentPlan" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tableViewMode === 3" class="w-100 px-3 text-primary">
        <div v-for="itemLevel1 in (tableViews[currentPlan.year] && tableViews[currentPlan.year]['3'] || [])"
          class="w-100"
          :key="itemLevel1.id">
          <div @click="getTableViewSubLevel(itemLevel1, 'level2', [itemLevel1.id])"
            style="cursor: pointer;" 
            class="d-flex justify-content-between border rounded w-100 py-2 px-3 mb-2 shadow">
            <div>
              <div v-if="itemLevel1.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
              <font-awesome-icon v-else :icon="itemLevel1.isOpen ? 'minus' : 'plus'"/>
              <span class="ml-3">{{ itemLevel1.title }}</span>
            </div>
            <div>
              <span>{{ itemLevel1.total }} դր․</span>
            </div>
          </div>
          <div v-if="itemLevel1.isOpen && itemLevel1.childNodes" class="w-100 px-2">
            <div v-for="itemLevel2 in itemLevel1.childNodes"
                 :key="itemLevel2.id">
              <div @click="getTableViewSubLevel(itemLevel2, 'level3', [itemLevel1.id, itemLevel2.id])"
                   style="cursor: pointer;"
                   class="d-flex justify-content-between border rounded w-100 py-2 px-3 mb-2 shadow">
                <div>
                  <div v-if="itemLevel2.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
                  <font-awesome-icon v-else :icon="itemLevel2.isOpen ? 'minus' : 'plus'"/>
                  <span class="ml-3">{{ itemLevel2.title }}</span>
                </div>
                <div>
                  <span>{{ itemLevel2.total }} դր․</span>
                </div>
              </div>
              <div v-if="itemLevel2.isOpen && itemLevel2.childNodes" class="w-100 px-2">
                <div v-for="itemLevel3 in itemLevel2.childNodes"
                     :key="itemLevel3.type"
                     class="w-100 border rounded mb-2 shadow">
                  <div @click="getTableViewSubLevel(itemLevel3, 'levelLast', [itemLevel1.id, itemLevel2.id, itemLevel3.cpv_type])"
                       style="cursor: pointer;"
                       class="d-flex justify-content-between w-100 py-2 px-3">
                    <div>
                      <div v-if="itemLevel3.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
                      <font-awesome-icon v-else :icon="itemLevel3.isOpen ? 'minus' : 'plus'"/>
                      <span class="ml-3">{{ cpvTypes[itemLevel3.cpv_type] }}</span>
                    </div>
                    <div>
                      <span class="mr-3">
                        {{ itemLevel3.childNodes && itemLevel3.childNodes.pagination.total + ' գնման առարկա' }}
                      </span>
                      <span>{{ itemLevel3.total }} դր․</span>
                    </div>
                  </div>
                  <div class="border-top px-2 py-3" v-if="itemLevel3.isOpen && itemLevel3.childNodes">
                    <plan-header v-if="false" />
                    <plan-table
                      :tableData2="itemLevel3.childNodes"
                      :getNextDataChunk="getNextDataChunkFunction(itemLevel3, [itemLevel1.id, itemLevel2.id, itemLevel3.cpv_type])"
                      :updateDataChunk="getUpdateDataChunkFunction(itemLevel3, [itemLevel1.id, itemLevel2.id, itemLevel3.cpv_type])"
                      @openProcurementEditModal="({ row, updateTable }) => {$modal.show('edit-modal', { row, updateTable })}"
                      @openHistoryModal="(row) => {$modal.show('history-modal', {row})}"
                      :key="'planTable' + itemLevel1.id + itemLevel2.id + itemLevel3.cpv_type"
                      :tableName="'planTable' + itemLevel1.id + itemLevel2.id + itemLevel3.cpv_type"
                      :currentPlan="currentPlan" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container-fluid px-0">
      <div class="row px-4 pb-4 pt-5">
        <div v-if="!procurementPlans.length" class="w-100 d-flex justify-content-center align-items-center" style="height: 50vh">
          <div class="text-center">
            <h3 class="text-primary mb-5">Դուք դեռ չունեք պլան</h3>
            <button v-if="isRoot"
                    @click="$modal.show('create-plan-modal')"
                    class="btn btn-lg btn-gradient-primary waves-effect waves-light">
                    Ստեղծել
            </button>
          </div>
          <create-plan-modal />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import CreatePlanModal from './partials/CreatePlanModal'
  import ProcurementEditModal from './partials/ProcurementEditModal'
  import AddCpvModal from './partials/AddCpvModal'
  import HistoryModal from './partials/HistoryModal'
  import PlanHeader from './partials/PlanHeader'
  import CreatePlanModal from './partials/CreatePlanModal'
  // import PlanTable from '@/components/dashboard/table/PlanTable'
  import PlanTable from '@/components/dashboard/table/PlanTable2'
  // import { Event } from 'vue-tables-2'


  export default {
    name: 'List',
    components: { AddCpvModal, ProcurementEditModal, HistoryModal, PlanHeader, CreatePlanModal, PlanTable },
    data() {
      return {
        arePlansLoading: true,
        tableViews: {},
        tableViewMode: 1,
        tableViewModeName: 'Գնման Առարկայի',
        purchaseTypes: { 1: 'ՄԱ', 2: 'ՄԱ*', 3: 'ՀՄԱ', 4: 'ԲՄ', 5: 'ՀԲՄ', 6: 'ԳՀ', 7: 'ԷԱՃ' },
        budgetType: 0,
        isLoadTableViewPending: false,
        cpvTypes: {
          1: 'Ապրանք',
          2: 'Ծառայություն',
          3: 'Աշխատանք'
        }
      }
    },
    computed: {
      currentPlan() {
        return this.$store.getters['procurement/currentPlan']
      },
      procurementPlans() {
        return this.$store.getters['procurement/procurementPlans']
      },
      division() {
        return this.$store.getters['user/division']
      },
      isRoot() {
        return this.$store.getters['user/isRoot']
      },
      userChildren() {
        return this.$store.getters['user/userChildren']
      },
      units() {
        return this.$store.getters['settings/units']
      }
    },
    watch: {
      currentPlan: function(newPlan) {
        if(newPlan) {
          // this.showPlanTable = true
          this.arePlansLoading = false
          if(!this.tableViews[newPlan.year]) {
            this.$set(this.tableViews, newPlan.year, {})
          }
          this.loadTableView(this.tableViewMode, this.tableViewModeName)
        }
      }
    },
    updated() {
      if(this.$refs.planningTable) {
        this.$refs.planningTable.refresh()
      }
    },
    mounted() {
      this.$store.dispatch('procurement/getPlans')
      this.$store.dispatch('settings/getUnits')
      this.$store.dispatch('settings/getFinancialClassifiers')
      this.$store.dispatch('settings/getClassifiers')
    },
    methods: {
      loadTableView(viewMode, viewModeName) {
        this.tableViewMode = viewMode
        this.tableViewModeName = viewModeName
        if(this.tableViews[this.currentPlan.year][viewMode]) {
          return
        }
        if(this.tableViewMode === 1) {
          this.$set(this.tableViews[this.currentPlan.year], this.tableViewMode, [
            {cpv_type: 1, total: ''},
            {cpv_type: 2, total: ''},
            {cpv_type: 3, total: ''}
          ])
        } else {
          this.isLoadTableViewPending = true
          const api = this.getViewModeApi('level1')
          this.$client.get(api).then(response => {
            this.isLoadTableViewPending = false
            this.$set(this.tableViews[this.currentPlan.year], this.tableViewMode, response.data)
          })
        }
      },
      getTableViewSubLevel(node, level, urlProps = []) {
        if(!node.childNodes) {
          this.$set(node, 'isPending', true)
          const api = this.getViewModeApi(level, urlProps)
          this.$client.get(api).then(response => {
            this.$set(node, 'childNodes', response.data)
            this.$set(node, 'isOpen', true)
            this.$set(node, 'isPending', false)
          })
        } else {
          this.$set(node, 'isOpen', !node.isOpen)
        }

      },
      getNextDataChunkFunction(node, urlProps) {
        return (page) => {
          return this.$client.get(this.getViewModeApi('levelLast', urlProps), {
            params: {page}
          }).then(response => {
            // eslint-disable-next-line no-undef
            const childNodes = _.cloneDeep(node.childNodes)
            childNodes.data.push(...response.data.data)
            childNodes.pagination = response.data.pagination
            this.$set(node, 'childNodes', childNodes)
            return response.data.data
          })
        }
      },
      getUpdateDataChunkFunction(node, urlProps) {
        return (page) => {
          return this.$client.get(this.getViewModeApi('levelLast', urlProps), {
            params: {page}
          }).then(response => {
            // eslint-disable-next-line no-undef
            const childNodes = _.cloneDeep(node.childNodes)
            childNodes.data.splice((page-1) * 10, response.data.data.length, ...response.data.data)
            this.$set(node, 'childNodes', childNodes)
            return response.data.data
          })
        }
      },
      getViewModeApi(level, urlProps = []) {
        let urlObj = {}
        switch(this.tableViewMode) {
          case 1:
            urlObj = {
              level1: '',
              level2: `/procurement-plan/getByCpvGroup/${this.currentPlan.id}/`,
              levelLast: `/procurement-plan/getListByCpvGroup/${this.currentPlan.id}/`
            }
            break
          case 2:
            urlObj = {
              level1: `/procurement-plan/getByFinancialClassifierId/${this.currentPlan.id}`,
              level2: `/procurement-plan/getByFinancialClassifierCuntCpvType/${this.currentPlan.id}/`,
              levelLast: `/procurement-plan/getByFinancialClassifiers/${this.currentPlan.id}/`
            }
            break
          case 3:
            urlObj = {
              level1: `/procurement-plan/getByClassifierId/${this.currentPlan.id}`,
              level2: `/procurement-plan/getByClassifiersForFinancial/${this.currentPlan.id}/`,
              level3: `/procurement-plan/getByClassifiersForFinancialCpvType/${this.currentPlan.id}/`,
              levelLast: `/procurement-plan/getProcurementByClassifierIdFinancialId/${this.currentPlan.id}/`
            }
            break
        }
        let url = urlObj[level]
        if(urlProps.length) {
          url += urlProps.join('/')
        }
        return url
      },
      resetTableView() {
        this.$set(this.tableViews, this.currentPlan.year, {})
        this.loadTableView(this.tableViewMode, this.tableViewModeName)
      }
    },
  }
</script>

<style>
  .table-responsive {
    overflow-x: scroll !important;
    margin-bottom: 1rem;
  }
  .VueTables__columns-dropdown .dropdown-toggle {
    margin: 0 1rem;
    background: #506ee4;
    box-shadow: 0 7px 14px 0 rgba(80,110,228,0.5);
    border-color: #506ee4;
  }
  .VueTables__columns-dropdown .dropdown-toggle:hover {
    color: #fff;
    background-color: #2f53df;
    border-color: #2449dd;
  }
  .VueTables__columns-dropdown .dropdown-toggle:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
  }
  .deleted-row {
    opacity: 0.7;
    font-style: italic;
    /*background: rgba(253, 31, 30, 0.06);*/
  }
  .deleted-row:hover {
    font-style: italic;
    background: rgba(231, 133, 113, 0.44);
  }
</style>
