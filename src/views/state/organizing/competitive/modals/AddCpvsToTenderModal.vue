<template>
  <modal 
    class="add-cpvs-to-tender-modal"
    name="add-cpvs-to-tender-modal"
    @before-close="resetComponent"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="80%"
    height="90%"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
        <p>Ընտրել Չափաբաժիններ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('add-cpvs-to-tender-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="row m-0 p-0 h-100">
        <div class="col-12 p-0 pb-2" style="height: fit-content;">
          <div class="w-100 rounded p-3">
            <div class="row">
              <div class="col-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" aria-expanded="false" >
                      <font-awesome-icon icon="search" />
                    </span>
                  </div>
                  <input @input="search" 
                      :value="searchQuery"
                      placeholder="Փնտրիր ըստ անվան կամ կոդի" 
                      name="searchQuery" 
                      type="text" 
                      class="form-control m-0">
                </div>
              </div>
              <div class="col-3">
                <div
                  v-tooltip="selectedType
                  ?
                    'մեկ ընթացակարգում չի կարող լինել տարբեր գնման ձևերով չափաբաժին'
                  :
                    ''
                  "
                  class="input-group"
                >
                  <div class="input-group-prepend">
                    <span class="input-group-text">Գնման ձև</span>
                  </div>
                  <select @change="filterCpvs" 
                      :disabled="selectedType"
                      v-tooltip="selectedType ? 'մեկ ընթացակարգում չի կարող լինել տարբեր գնման ձևերով չափաբաժին' :''"
                      :value="selectedType?selectedType:purchaseType" 
                      name="purchaseType" 
                      class="form-control" 
                      id="purchase-type">
                      <option v-for="(type, key) in purchaseTypesForCompetetive" 
                      :key="key" 
                      :value="key">{{ type }}</option>
                  </select>
                </div>
              </div>
              <div class="col-auto">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Գնման պլան</span>
                  </div>
                  <select 
                      @change="changePlan" 
                      :value="selectedPlan" 
                      name="selectedPlan" 
                      class="form-control" 
                      id="purchase-type">
                      <option v-for="(plan, key) in procurementPlans" 
                      :key="key" 
                      :value="plan.id">{{ plan.name }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 p-0 pt-2" style="height: calc(100% - 76px)">
          <div class="row m-0 p-0 h-100">
            <div class="col-5 p-0 h-100">
              <div class="w-100 rounded little-scroll p-3 h-100 overflow-auto">
                <h4>Գնման առարկաներ (պլան {{currentPlan ? currentPlan.year : ''}})</h4>
                <div v-for="cpv in cpvsFromPlan" 
                    :key="cpv.id" 
                    class="p-0 my-1">
                  <input v-model="selectedCpvs"
                          @change="(event)=>handleSelect(event, cpv)"
                          :value="cpv"
                          :disabled="getRealBalance(cpv) < 1
                          || selectedLots.find(item=>item.cpv_code===cpv.cpv_code)
                          || selectedIsCondition !== false && selectedIsCondition !== cpv.is_condition"
                          type="checkbox"
                          class=""
                          :id="cpv.id">
                  <label 
                  v-tooltip="
                    getRealBalance(cpv) < 1 ? 'մնացորդ 0'
                  :
                    selectedLots.find(item=>item.cpv_code === cpv.cpv_code) ? 'արդեն ընտրված է'
                  :
                    selectedIsCondition !== false && selectedIsCondition != cpv.is_condition ? 'մեկ ընթացակարգում չի կարող լինել պայմանով և առանց պայմանի չափաբաժին'
                  :
                  ''
                  "
                        class="form-check-label ml-2 mb-2" :for="cpv.id">
                    {{ cpv.cpv_code }}{{ cpv.cpv_drop !== null ? '/' : ''}}{{ cpv.cpv_drop }} - {{ cpv.cpv_name }}
                  </label>
                </div>
                <infinite-loading @infinite="infiniteHandler">
                  <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
                  <div slot="no-results"></div>
                  <div slot="no-more"></div>
                </infinite-loading>
              </div>
            </div>
            <div class="col-7 px-3 h-100 little-scroll h-100 overflow-auto">
              <div v-for="cpv in selectedCpvs"
                  :key="cpv.id"
                  class="row border rounded py-2 mx-0 mb-2">
                <div class="col">
                  <span>{{ cpv.cpv_code }}{{ cpv.cpv_drop && '/' }}{{ cpv.cpv_drop }} - {{ cpv.cpv_name }}</span>
                </div>
                <div class="col">
                  <span class="mr-3">Մնացորդ</span>
                  <span>{{ getCurrentBalance(cpv) }}</span>
                </div>
                <div class="col">
                  <span>կազմակերպվող քանակ</span>
                  <input v-model.number="cpv.organizing_count"
                        @input="setOverallValidationError(cpv)"
                        class="form-control"
                        min="1"
                        :max="cpv.count - cpv.out_count - cpv.organize_count"
                        type="number">
                  <span class="small text-danger"
                        v-if="cpv.organizing_count > getRealBalance(cpv)">չի կարող մեծ լինել մնացորդից</span>
                  <span class="small text-danger" v-if="cpv.organizing_count <= 0">պետք է լինի մեծ 0-ից</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('add-cpvs-to-tender-modal')" class="btn btn-light mr-3">
        <span>Չեղարկել</span>
      </button>
      <button @click="addOrganizeRows" type="button" class="btn btn-primary">
        <span>Ավելացնել</span>
      </button>
    </div>
    <!-- <specification-modal @close="setSpecificationId"/> -->
  </modal>
</template>

<script>
  // import CpvSearch from '../../../../components/dashboard/cpv/CpvSearch'
  import purchaseTypesForCompetetive from '@/mixins/purchaseTypes'
  import InfiniteLoading from 'vue-infinite-loading'
  import { required, between } from 'vuelidate/lib/validators'

  // import SpecificationModal from './SpecificationModal'


  export default {
    name: 'AddCpvsToTenderModal',
    mixins: [purchaseTypesForCompetetive],
    props: ['insertLotFromOutside'],
    components: { InfiniteLoading },
    computed: {
      procurementPlans() {
        return this.$store.getters['procurement/procurementPlans']
      },
      currentPlan() {
        return this.$store.getters['procurement/currentPlan']
      },
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      }
    },
    data() {
      return this.getModalInitialState()
    },
    mounted(){
      
    },
    methods: {
      consoleLog(e){
        console.log(e)
      },
      changePlan(event){
        this.selectedPlan = +event.target.value
        this.$store.dispatch('procurement/getPlans', this.selectedPlan).then((value) => {
          this.filterCpvs(event)
        })
      },
      handleSelect(event, cpv) {
        if(event.target.checked){
          this.selectedIsCondition = cpv.is_condition;
        } else if(this.selectedCpvs.length===0){
          this.selectedIsCondition = false;
        }
      },
      getModalInitialState() {
        return {
          selectedLots: [],
          selectedType: false,
          selectedIsCondition: false,
          isOnePerson: false,
          pagination: {},
          searchQuery: '',
          cpvType: 1,
          purchaseType: 3,
          searchTimeout: null,
          selectedPlan: 0,
          selectedCpvs: [],
          cpvsFromPlan: [],
          overallValidationError: false,
        }
      },
      setOverallValidationError(cpv) {
        const realBalance = this.getRealBalance(cpv)
        this.overallValidationError = !cpv.organizing_count || realBalance < 1 || cpv.organizing_count > realBalance
      },
      search(event) {
        if(this.searchTimeout) clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(() => {
          this.filterCpvs(event)
        }, 700)
      },
      beforeOpen(event) {
        this.cpvType = this.$route.query.cpvType
        if(event.params.length){
          this.selectedLots = event.params
          this.selectedType = event.params[0].type
          this.selectedIsCondition = event.params[0].is_condition
        }
        this.selectedPlan = this.currentPlan.id
      },
      filterCpvs({target: {name, value}}) {
        this[name] = value
        this.pagination = {}
        this.selectedCpvs = []
        this.cpvsFromPlan = []
        this.getCpvsRequest().then(({data: {data}}) => {
          this.cpvsFromPlan = data.map(cpv => Object.assign(cpv, {organizing_count: 1}))
        })        
      },
      getCpvsRequest() {
        return this.$client.get(`procurement-plan/getByQuery/${this.currentPlan.id}`, {
          params: {
            cpv_type: this.cpvType,
            type: this.selectedType?this.selectedType:this.purchaseType,
            query: this.searchQuery,
          }
        })
      },
      infiniteHandler($state) {
        this.getCpvsRequest().then(({data: {data, pagination}}) => {
          if(data.length) {
            this.pagination = pagination;
            this.cpvsFromPlan.push(...data.map(cpv => Object.assign(cpv, {organizing_count: 1})));
            $state.complete();
          }else{
            $state.complete();
          }
        });
      },
      addOrganizeRows() {
        if(this.selectedCpvs.length && !this.overallValidationError) {
          this.$client.post('organize-row-array', {
            organize_row: this.selectedCpvs.map(cpv => ({
              plan_details_id: cpv.id,
              count: cpv.organizing_count,
              procurement_plan_id: cpv.plan_row_id,
              organize_id: this.currentOrganized.id,
            }))
          }).then(({ data }) => {
            if(data.status) {
              this.$store.dispatch('organize/getRows', {organizeId: this.currentOrganized.id})
              this.$store.dispatch('organizeOnePerson/getRows', {organizeId: this.$route.params.id})
              this.$modal.hide('add-cpvs-to-tender-modal')
            }
          })
        }
      },
      getRealBalance(cpv) {
        return cpv.count - cpv.out_count - cpv.organize_count
      },
      getCurrentBalance(cpv) {
        return cpv.count - cpv.out_count - cpv.organizing_count - cpv.organize_count
      },
      resetComponent() {
        Object.assign(this.$data, this.getModalInitialState())
      },
    },
    validations() {
      return {
        selectedCpvs: {
          $each: {
            id: {},
            cpv_code: {},
            cpv_drop: {},
            cpv_name: {},
            count: {},
            out_count: {},
            organize_count: {},
            organizing_count: {
              required,
              between: between(20, 30)
            },
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
