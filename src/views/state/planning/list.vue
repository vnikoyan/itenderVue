<template>
  <div class="card">
    <add-cpv-modal @resetTableView="resetTableView"/>
    <history-modal />
    <add-same-modal />
    <procurement-edit-modal />
    <create-plan-modal />
    <div v-if="arePlansLoading" class="w-100 py-3 d-flex justify-content-center">
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
        <div class="spinner-grow spinner-grow text-primary" role="status"></div>
      </div>
    <div v-else-if="currentPlan" class="container-fluid px-0">
      <nav class="mb-4">
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a v-for="plan in procurementPlans"
            @click="$store.dispatch('procurement/setCurrentPlan', plan)" 
            :key="plan.id" 
            :class="{'active': plan.id === currentPlan.id}"
            class="nav-item nav-link"
            style="cursor: pointer;" 
            id="nav-home-tab"
          >
            {{plan.year}}թ.
            <i v-tooltip="'Ջնջել'" @click.prevent.stop="() => deletePlan(plan.id)" class="ml-2 text-danger remove far fa-trash-alt"></i>
          </a>
          <a
            @click="$modal.show('create-plan-modal')" 
            class="nav-item nav-link"
            style="cursor: pointer;" 
            id="nav-home-tab"
          >
            <span class="text-primary">
              Ստեղծել պլան
              <i class="fa fa-plus ml-2"></i>
            </span>
          </a>
        </div>
      </nav>
    <div class="card-body plan-block">
      <div class="w-100 d-flex justify-content-between mb-4">
        <div>
          <button 
            v-if="isRoot"
            class="btn btn-primary mr-3"
            @click="$modal.show('add-cpv-modal', {procurement: currentPlan, budgetType})"
          >
            <font-awesome-icon icon="plus" class="mr-2"/>
            Ավելացնել Գնման Առարկա
          </button>
          <div class="btn-group dropright">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-file-download mr-2"></i>
              Բեռնել գնումների պլանը
            </button>
            <div class="dropdown-menu p-0">
              <a class="dropdown-item h5 m-0 py-2" :href="`${backendUrl}procurement/export/${currentPlan.id}?type=XLSX`">
                <i class="mr-2 fa fa-file-excel"></i>
                Բեռնել XLSX
              </a>
              <a class="dropdown-item h5 m-0 py-2" :href="`${backendUrl}procurement/export/${currentPlan.id}?type=PDF`">
                <i class="mr-2 fa fa-file-pdf" aria-hidden="true"></i>
                Բեռնել PDF
              </a>
            </div>
          </div>
          <!-- <label class="btn btn-primary mb-0 ml-3" :class="uploadFileLoading && 'disabled'">
            <font-awesome-icon icon="file-upload" class="mr-2"/>
            <span>Կցել Գնումների պլանի ֆայլը</span>
            <input @change="handleUploadFile" type="file" accept=".xls,.xlsx" hidden>
            <span v-if="uploadFileLoading" class="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </label>
          <span class="h6 ml-2 text-primary">{{uploadedFileName}}</span> -->
        </div>
      </div>
        <div class="w-100 d-flex justify-content-between mb-4">
          <div class="btn-group">
            <button class="btn btn-primary" type="button">
              <span>Դիտել ըստ</span>
            </button>
            <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
              <span class="mr-2">{{ tableViewModeName }}</span>
            </button>
            <div class="dropdown-menu card">
              <a v-if="!(tableViewMode === 1)"
                @click.prevent="loadTableView(1, 'գնման առարկայի')"
                style="cursor: pointer;"
                class="dropdown-item">գնման առարկայի</a>
              <a v-if="!(tableViewMode === 2)"
                @click.prevent="loadTableView(2, 'բյուջետային ծրագրի')"
                style="cursor: pointer;"
                class="dropdown-item">բյուջետային ծրագրի</a>
              <a v-if="!(tableViewMode === 3)"
                @click.prevent="loadTableView(3, 'տնտեսականա դասակարգչի')"
                style="cursor: pointer;"
                class="dropdown-item">տնտեսականա դասակարգչի</a>
            </div>
          </div>
          <!-- <button v-if="isRoot" @click="$modal.show('add-cpv-modal', {procurement: currentPlan, budgetType})"
                  class="btn btn-primary">Ավելացնել Գնման Առարկա
          </button> -->
        </div>
        <table class="table plan-table-header">
          <thead style=" padding: 0 1px;">
            <tr style=" padding: 0 1px;">
              <th style="width: 8%" scope="col">CPV կոդ</th>
              <th style="width: 12%" scope="col">Անվանումը</th>
              <th style="width: 5%" scope="col">Չափման միավոր</th>
              <th style="width: 10%" scope="col">Միավորի գին</th>
              <th style="width: 10%" scope="col">Մնացորդ/Քանակ</th>
              <th style="width: 10%" scope="col">Կազմակերպված <br/> քանակ</th>
              <th style="width: 10%" scope="col">Ընդհանուր</th>
              <th style="width: 10%" scope="col">Գնման Ձև</th>
              <th style="width: 10%" scope="col">{{this.$store.getters['user/division'].childName}}</th>
              <th style="width: 10%" scope="col">Գնման ժամկետ</th>
              <th style="width: 5%" scope="col">Գործողություն</th>
            </tr>
          </thead>
        </table>

        <div v-if="isLoadTableViewPending" class="w-100 py-3 d-flex justify-content-center">
          <div class="spinner-grow spinner-grow text-primary" role="status"></div>
          <div class="spinner-grow spinner-grow text-primary" role="status"></div>
          <div class="spinner-grow spinner-grow text-primary" role="status"></div>
        </div>

        <div v-if="tableViewMode === 1" class="w-100 text-primary">
          <div v-for="itemLevel1 in (tableViews[currentPlan.year] && tableViews[currentPlan.year]['1'] || [])"
            class="w-100"
            :key="itemLevel1.cpv_type">
            <div @click="getTableViewSubLevel(itemLevel1, 'level2', [itemLevel1.cpv_type])"
              style="cursor: pointer;" 
              class="d-flex justify-content-between border rounded w-100 py-2 px-3 mb-2">
              <div>
                <div v-if="itemLevel1.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
                <font-awesome-icon v-else :icon="itemLevel1.isOpen ? 'minus' : 'plus'"/>
                <span class="ml-3 font-weight-bold">{{  cpvTypes[itemLevel1.cpv_type]  }} </span>
              </div>
              <div>
                <span>{{ itemLevel1.total }}</span>
              </div>
            </div>
            <div v-if="itemLevel1.isOpen && itemLevel1.childNodes" class="w-100">
              <div v-for="itemLevel2 in itemLevel1.childNodes"
                :key="itemLevel2.cpv_group"
                class="w-100 border rounded mb-2">
                <div class="d-flex justify-content-between w-100 py-2 px-3">
                  <div>
                    <div v-if="itemLevel2.isPending" class="spinner-border spinner-border-sm text-primary mr-3" role="status"></div>
                    <span>խումբ {{ itemLevel2.cpv_group }} - {{ itemLevel2.name }}</span>
                  </div>
                  <div>
                    <span>
                      {{ itemLevel2.childNodes && itemLevel2.childNodes.pagination.total + ' գնման առարկա' }}
                    </span>
                  </div>
                </div>
                <div class="border-top" v-if="itemLevel2.isOpen && itemLevel2.childNodes">
  <!--                <plan-header v-if="false" />-->
                  <plan-table
                    :tableData2="itemLevel2.childNodes"
                    :getNextDataChunk="getNextDataChunkFunction(itemLevel2, [itemLevel1.cpv_type, itemLevel2.cpv_group])"
                    :updateDataChunk="getUpdateDataChunkFunction(itemLevel2, [itemLevel1.cpv_type, itemLevel2.cpv_group])"
                    @openAddSameModal="({row, updateTable}) => {$modal.show('add-same-modal', {row, updateTable})}"
                    @openProcurementEditModal="({row, updateTable}) => {$modal.show('edit-modal', {row, updateTable})}"
                    @openHistoryModal="(row) => {$modal.show('history-modal', {row})}"
                    :key="'planTable' + itemLevel1.cpv_type + itemLevel2.cpv_group"
                    :tableName="'planTable' + itemLevel1.cpv_type + itemLevel2.cpv_group"
                    :total="itemLevel2.total"
                    :currentPlan="currentPlan" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tableViewMode === 2" class="w-100 text-primary">
          <div v-for="itemLevel1 in (tableViews[currentPlan.year] && tableViews[currentPlan.year]['2'] || [])"
            class="w-100"
            :key="itemLevel1.id">
            <div @click="getTableViewSubLevel(itemLevel1, 'level2', [itemLevel1.id])"
              style="cursor: pointer;" 
              class="d-flex justify-content-between border rounded w-100 py-2 px-3 mb-2 ">
              <div>
                <div v-if="itemLevel1.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
                <font-awesome-icon v-else :icon="itemLevel1.isOpen ? 'minus' : 'plus'"/>
                <span class="ml-3">{{ itemLevel1.title }}</span>
              </div>
              <div>
                <span>{{ itemLevel1.total }} դր.</span>
              </div>
            </div>
            <div v-if="itemLevel1.isOpen && itemLevel1.childNodes" class="w-100 px-2">
              <div v-for="itemLevel2 in itemLevel1.childNodes"
                :key="itemLevel2.type"
                class="w-100 border rounded mb-2 ">
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
                    <span>{{ itemLevel2.total }} դր.</span>
                  </div>
                </div>
                <div class="border-top px-2 py-3" v-if="itemLevel2.isOpen && itemLevel2.childNodes">
  <!--                <plan-header v-if="false" />-->
                  <plan-table
                    :tableData2="itemLevel2.childNodes"
                    :getNextDataChunk="getNextDataChunkFunction(itemLevel2, [itemLevel1.id, itemLevel2.cpv_type])"
                    :updateDataChunk="getUpdateDataChunkFunction(itemLevel2, [itemLevel1.id, itemLevel2.cpv_type])"
                    @openAddSameModal="(row) => {$modal.show('add-same-modal', {row})}"
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

        <div v-if="tableViewMode === 3" class="w-100 text-primary">
          <div v-for="itemLevel1 in (tableViews[currentPlan.year] && tableViews[currentPlan.year]['3'] || [])"
            class="w-100"
            :key="itemLevel1.id">
            <div @click="getTableViewSubLevel(itemLevel1, 'level2', [itemLevel1.id])"
              style="cursor: pointer;" 
              class="d-flex justify-content-between border rounded w-100 py-2 px-3 mb-2 ">
              <div>
                <div v-if="itemLevel1.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
                <font-awesome-icon v-else :icon="itemLevel1.isOpen ? 'minus' : 'plus'"/>
                <span class="ml-3">{{ itemLevel1.title }}</span>
              </div>
              <div>
                <span>{{ itemLevel1.total }} դր.</span>
              </div>
            </div>
            <div v-if="itemLevel1.isOpen && itemLevel1.childNodes" class="w-100 px-2">
              <div v-for="itemLevel2 in itemLevel1.childNodes"
                  :key="itemLevel2.id">
                <div @click="getTableViewSubLevel(itemLevel2, 'level3', [itemLevel1.id, itemLevel2.id])"
                    style="cursor: pointer;"
                    class="d-flex justify-content-between border rounded w-100 py-2 px-3 mb-2 ">
                  <div>
                    <div v-if="itemLevel2.isPending" class="spinner-border spinner-border-sm text-primary" role="status"></div>
                    <font-awesome-icon v-else :icon="itemLevel2.isOpen ? 'minus' : 'plus'"/>
                    <span class="ml-3">{{ itemLevel2.title }}</span>
                  </div>
                  <div>
                    <span>{{ itemLevel2.total }} դր.</span>
                  </div>
                </div>
                <div v-if="itemLevel2.isOpen && itemLevel2.childNodes" class="w-100 px-2">
                  <div v-for="itemLevel3 in itemLevel2.childNodes"
                      :key="itemLevel3.type"
                      class="w-100 border rounded mb-2 ">
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
                        <span>{{ itemLevel3.total }} դր.</span>
                      </div>
                    </div>
                    <div class="border-top px-2 py-3" v-if="itemLevel3.isOpen && itemLevel3.childNodes">
                      <plan-header v-if="false" />
                      <plan-table
                        :tableData2="itemLevel3.childNodes"
                        :getNextDataChunk="getNextDataChunkFunction(itemLevel3, [itemLevel1.id, itemLevel2.id, itemLevel3.cpv_type])"
                        :updateDataChunk="getUpdateDataChunkFunction(itemLevel3, [itemLevel1.id, itemLevel2.id, itemLevel3.cpv_type])"
                        @openAddSameModal="(row) => {$modal.show('add-same-modal', {row})}"
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
    </div>
    <div v-else class="container-fluid px-0">
      <div class="row px-4 pb-4 pt-5">
        <div class="w-100 d-flex justify-content-center align-items-center" style="height: 50vh">
          <div class="text-center">
            <h3 class="text-primary mb-5">Դուք դեռ չունեք պլան</h3>
            <button v-if="isRoot"
                    @click="$modal.show('create-plan-modal')"
                    class="btn btn-lg btn-primary">
                    Ստեղծել
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import CreatePlanModal from './partials/CreatePlanModal'
  import CreatePlanModal from './partials/CreatePlanModal';
  import ProcurementEditModal from './partials/ProcurementEditModal'
  import AddCpvModal from './partials/AddCpvModal'
  import HistoryModal from './partials/HistoryModal'
  import AddSameModal from './partials/AddSameModal'
  import PlanHeader from './partials/PlanHeader'
  // import PlanTable from '@/components/dashboard/table/PlanTable'
  import PlanTable from '@/components/dashboard/table/PlanTable2'
  // import { Event } from 'vue-tables-2'


  export default {
    name: 'List',
    components: { AddCpvModal, ProcurementEditModal, HistoryModal, AddSameModal, PlanHeader,  PlanTable, CreatePlanModal },
    data() {
      return {
        backendUrl: process.env.VUE_APP_URL,
        tableKey: 0,
        arePlansLoading: false,
        tableViews: {},
        uploadedFileName: '',
        uploadFileLoading: false,
        tableViewMode: 1,
        tableViewModeName: 'գնման առարկայի',
        purchaseTypes: { 1: 'ՄԱ', 2: 'ՄԱ*', 3: 'ՀՄԱ', 4: 'ԲՄ', 5: 'ՀԲՄ', 6: 'ԳՀ', 7: 'ԷԱՃ' },
        budgetType: 0,
        isLoadTableViewPending: false,
        cpvTypes: {
          1: 'Ապրանք',
          2: 'Ծառայություն',
          3: 'Աշխատանք'
        },
        headings: [
          // 'ՀՀ',
          'CPV կոդ',
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
      consoleLog(item){
        // console.log(item)
      },
      downloadPlan(){
        console.log(this.currentPlan)
        // this.$store.dispatch('procurement/download', this.currentPlan.id)
      },
      deletePlan(planId){
        this.$confirm(
          "Ջնջելուց հետո դուք այլևս չեք կարողանա վերականգնել գնումների պլանը", 
          "", 
          "warning", 
          {
            confirmButtonText: 'Շարունակել', 
            cancelButtonText: 'Փակել'
          }
        ).then(text => {
          this.$store.dispatch('procurement/delete', planId)
        })
      },
      handleUploadFile(event){
        this.tableKey = this.tableKey + 1;
        const file = event.target.files[0]
        if(file.size < 100000000){
          this.uploadFileLoading = true;
          const uploadedFile = file;
          const formData = new FormData();
          formData.append('file', uploadedFile);
          this.$client.post(`procurement/uploadFile/${this.currentPlan.id}`, formData).then(({data}) => {
            this.additionalFile = data.additional_file
            if(data){
              this.uploadFileLoading = false;
              this.resetTableView()
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ ավելացված է'
              })
            }
          }).catch((value) => {
            this.uploadFileLoading = false;
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          })
          this.uploadedFileName = file.name;
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Ընտրված ֆայլի առավելագույն ծավալը պետք է լինի 10ՄԲ'
          })
        }
      },
      loadTableView(viewMode, viewModeName) {
        this.tableViewMode = viewMode
        this.tableViewModeName = viewModeName
        if(this.tableViews[this.currentPlan.year][viewMode]) {
          return
        }
        if(this.tableViewMode === 1) {
          const groups = [
            {cpv_type: 1, total: '', isOpen: true},
            {cpv_type: 2, total: '', isOpen: true},
            {cpv_type: 3, total: '', isOpen: true}
          ]
          groups.forEach(async (group) => {
            await this.getTableViewSubLevel(group, 'level2', [group.cpv_type])
            setTimeout(() => {
              // console.log(group)
              // console.log(JSON.stringify(group))
              // console.log(Object.values(group))
              // console.log(group.childNodes)
            }, 500);
            if(group.childNodes && group.childNodes.length){
              // groups.forEach((group) => {
              //   this.getTableViewSubLevel(group, 'level2', [group.cpv_type])
              //   if(group.childNodes){
                  
              //   }
              //   console.log(group)
              //   // getTableViewSubLevel(itemLevel2, 'levelLast', [itemLevel1.cpv_type, itemLevel2.cpv_group])
              // })
            }
            // getTableViewSubLevel(itemLevel2, 'levelLast', [itemLevel1.cpv_type, itemLevel2.cpv_group])
          })
          this.$set(this.tableViews[this.currentPlan.year], this.tableViewMode, groups)
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
            const childs = response.data
            if(childs.length){
              childs.forEach((child) => {
                if(this.tableViewMode === 1){
                  this.getTableViewSubLevel(child, 'levelLast', [...urlProps, child.cpv_group])
                }
              })
            }
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
            console.log('response', response)
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
  .plan-block{
    position: relative;
  }
  .plan-table-body td{
    /* text-align: left; */
  }
  .plan-table-header th{
    word-break: keep-all;
  }
  .plan-table-header{
    width: 100%;
    position: sticky;
    top: 70px;
    background-color: white;
    z-index: 9;
    padding: 0 1px;
  }
  .table-responsive {
    overflow-x: scroll !important;
    margin-bottom: 1rem;
  }
  .VueTables__columns-dropdown .dropdown-toggle {
    margin: 0 1rem;
    background: #006BE6;
    box-: 0 7px 14px 0 rgba(80,110,228,0.5);
    border-color: #006BE6;
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
  @media only screen and (max-width: 1530px) {
    .plan-table-header{
      table-layout: fixed !important;
    }
  }
</style>
