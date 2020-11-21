<template>
  <modal name="add-cpv-modal"
         @before-close="resetComponent"
         @before-open="setProps"
         style="z-index: 1001;">
    <div id="modal-header" class="w-100 px-4 py-2 position-relative"
         style="background-color:#506ee4">
      <div class="w-100 d-flex">
        <font-awesome-icon
          v-if="tableView"
          @click="tableView = false"
          class="h3 mr-4 text-white"
          style="cursor: pointer"
          title="հետ"
          icon="angle-left" />
        <h4 class="text-white">Ավելացնել գնման առարկա</h4>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('add-cpv-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body" class="px-4 py-5" style="overflow-x: auto; height: 90%">
      <div v-show="tableView" class="tableFixHead">
        <table class="table table-hover">
          <thead>
            <tr>
              <th v-for="heading in tableHeadings"
                  :key="heading"
                  style="width: 7.1%">{{ heading }}</th>
            </tr>
          </thead>
          <tbody :key="cpv.id" v-for="(cpv, cpvIndex) in cpvSpecs" class="border-secondary">
            <tr :key="detailsIndex" v-for="(details, detailsIndex) in cpv.plan_details">
              <td>
<!--                <button  class="btn btn-sm btn-secondary px-3">-->
<!--                  -->
<!--                </button>-->
                <div class="d-flex justify-content-between" v-if="detailsIndex === 0">
                  <font-awesome-icon v-tooltip="'Ավելացնել նույնից'" title="Ավելացնել"
                      @click="addSame(cpv, details)"
                      icon="copy"
                      style="cursor: pointer"
                      class="text-secondary h4 mr-3"/>
                  <font-awesome-icon v-tooltip="'Ջնջել'"
                      @click="removeProcurement(cpvIndex)"
                      icon="trash-alt"
                      style="cursor: pointer"
                      class="text-danger h4"/>
                </div>
                <font-awesome-icon v-else
                    v-tooltip="'Հեռացնել ենթատողը'"
                    @click="removeDetailObj(cpv, detailsIndex)"
                    icon="times"
                    style="cursor: pointer"
                    class="text-info h4"/>
              </td>
              <td>
                <span v-if="detailsIndex === 0">{{ cpv.code }}</span>
                <span v-else>___</span>
              </td>
              <td>
                <span v-if="detailsIndex === 0">{{ cpv.name }}</span>
                <span v-else>___</span>
              </td>
              <td>
                <select v-model="cpv.unit"
                        v-if="detailsIndex === 0"
                        name="unit"
                        id="unit"
                        style="width: 110px"
                        class="form-control custom-select_opt">
                  <option :value="''">Ընտրել</option>
                  <option v-for="unit in units"
                          :key="unit.id"
                          :value="unit.title">{{ unit.title }}</option>
                </select>
                <span v-else>___</span>
              </td>
              <td>
                <button v-if="detailsIndex === 0" @click="$modal.show('specification-modal', {
                        specificationsId: cpv.specifications_id,
                        cpvId: cpv.cpv_id
                      })"
                        type="button"
                        :class="{'btn-success': cpv.specifications_id, 'btn-info': !cpv.specifications_id}"
                        class="btn btn-square btn-outline-dashed waves-effect waves-light modal03">
                  <i class="fa fa-check"></i>
                </button>
                <span v-else>___</span>
              </td>
              <td>
                <input type="number" min="1" v-model="details.count" class="form-control" style="width: 110px">
              </td>
              <td>
                <input type="number" min="1" v-model="details.unit_amount" class="form-control" style="width: 120px">
              </td>
              <td>
                <input type="number" min="0" v-model="details.out_count" class="form-control" style="width: 110px">
              </td>
              <td>
                <span>{{ details.count - details.out_count}}</span>
              </td>
              <td>
                <span>{{ (details.count - details.out_count) * details.unit_amount }}</span>
              </td>
              <td class="px-0">
                <select v-model="details.type" name="type" id="type" class="form-control">
                  <option :key="key" v-for="(type, key) in purchaseTypes" :value="key">{{ type }}</option>
                </select>
              </td>
              <td>
                <select v-model="details.classifier_id" class="form-control" name="classifier" id="classifier">
                  <option :value="null" disabled>Ընտրել</option>
                  <option v-for="item in classifiers"
                          :key="item.id"
                          :value="item.id">{{ item.title }} - {{ item.code }}</option>
                </select>
              </td>
              <td>
                <select v-model="details.financial_classifier_id" class="form-control custom-select_opt">
                  <option :value="null" disabled>Ընտրել</option>
                  <option v-for="fClassifier in financialClassifiers"
                          :key="fClassifier.id"
                          :value="fClassifier.id">{{ fClassifier.code === '0' ? '' : fClassifier.code + ' - ' }}{{ fClassifier.title }}</option>
                </select>
              </td>
              <td>
                <input v-model="details.date" type="date" class="form-control">
              </td>
              <td>
                <select v-model="cpv.user_id"
                        v-if="detailsIndex === 0"
                        name="department"
                        style="width: 160px"
                        id="department"
                        class="form-control custom-select_opt">
                  <option :value="null" disabled>Ընտրել Բաժին</option>
                  <option v-for="department in childUsers"
                          :key="department.id" :value="department.id">
                    {{ department.email }}
                  </option>
                </select>
                <span v-else>___</span>
              </td>
<!--                <td>-->
<!--                  <select v-model="cpv.cpv_type"-->
<!--                          name="cpv-type"-->
<!--                          style="width: 150px"-->
<!--                          id="cpv-type"-->
<!--                          class="custom-select">-->
<!--                    <option value="1">Ապրանք</option>-->
<!--                    <option value="2">Ծառայություն</option>-->
<!--                    <option value="3">Աշխատանք</option>-->
<!--                  </select>-->
<!--                </td>-->
              <td>
                <input
                  v-if="detailsIndex === 0"
                  @change="changeCondition(cpv)"
                  :checked="cpv.is_condition"
                  :true-value="1"
                  :false-value="0"
                  type="checkbox"
                  class="form-control">
                <span v-else>___</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-show="!tableView" class="row">
        <!-- <div class="col-md-6">
          <div class="w-100 h-100 d-flex flex-column justify-content-between pb-3">
            <label for="cpv-search">Փնտրել cpv կոդ</label>
            <cpv-search id="cpv-search" :searchedCpvs.sync="searchedCpvs" />
          </div>
        </div> -->
        <div class="col-12">
          <label for="cpv-selector">Ընտրել cpv կոդ</label>
          <cpv-selector id="cpv-selector" :selectedCpvs.sync="selectedCpvs" />
        </div>
      </div>
    </div>
    <div id="modal-footer" class="bg-white position-absolute w-100 p-3 text-right" style="bottom: 0">
      <button @click="handleClick" type="button" class="btn btn-sm btn-primary mr-3"> {{ tableView ? 'Ավելացնել' :
        'Շարունակել'}}
      </button>
    </div>
    <specification-modal @close="setSpecificationId"/>
  </modal>
</template>

<script>
  import CpvSelector from '../../../../components/dashboard/cpv/CpvSelector'
  // import CpvSearch from '../../../../components/dashboard/cpv/CpvSearch'
  import purchaseTypes from '../../../../mixins/purchaseTypes'
  import SpecificationModal from './SpecificationModal'


  export default {
    name: 'AddCpvModal',
    mixins: [purchaseTypes],
    components: { CpvSelector, SpecificationModal },
    computed: {
      // combinedCpvs() {
      //   // eslint-disable-next-line no-undef
      //   return _.unionWith(this.selectedCpvs, this.searchedCpvs, _.isEqual)
      // },
      units() {
        return this.$store.getters['settings/units']
      },
      financialClassifiers() {
        return this.$store.getters['settings/financialClassifiers']
      },
      classifiers() {
        return this.$store.getters['settings/classifiers']
      },
      childUsers() {
        return this.$store.getters['user/userChildren']
      }
    },
    data() {
      return this.getComponentInitialData()
    },
    methods: {
      getComponentInitialData() {
        return {
          tableHeadings: [
            '',
            'Կոդ',
            'Անվանումը',
            'Չափման միավոր',
            'Տեխնիկական բնութագրեր',
            'Քանակ',
            'Միավորի գին',
            'Համակարգից դուրս կազմակերպված քանակ',
            'Մնացորդ',
            'Ընդհանուր գումար',
            'Գնման ձև',
            'Ֆինանսական դասակարգիչ',
            'Բյուջետային ծրագիր',
            'Գնման լռելայն ժամկետ',
            'Բաժիններ',
            // 'CPV Տիպ',
            'Պայմանով / Առանց պայման'
          ],
          selectedCpvs: [],
          // searchedCpvs: [],
          cpvSpecs: [],
          tableView: false,
        }
      },
      resetComponent() {
        Object.assign(this.$data, this.getComponentInitialData())
      },
      setProps({ params: { procurement, budgetType } }) {
        this.procurement = procurement
        this.budgetType = budgetType
      },
      handleClick() {
        if (!this.tableView) {
          if (this.selectedCpvs.length) {
            this.$store.dispatch('cpv/getSpecifications', this.selectedCpvs.map(cpv => cpv.id)).then(specs => {
              this.cpvSpecs = specs
            })
            this.tableView = true
          }
        } else {
          // eslint-disable-next-line no-undef
          if(!this.cpvSpecs.length) {
            return
          }
          this.$store.dispatch('procurement/storeProcurements', {
            // eslint-disable-next-line no-undef
            procurementArr: _.cloneDeep(this.cpvSpecs),
            procurementId: this.procurement.id
          }).then(response => {
            if(response.status === 200) {
              this.$emit('resetTableView')
              this.$modal.hide('add-cpv-modal')
            }
          })
        }
      },
      changeCondition(cpv) {
        this.$set(cpv, 'is_condition', cpv.is_condition === 0 ? 1 : 0)
      },
      addSame(cpv, detailsObj) {
        const details = cpv.plan_details
        // eslint-disable-next-line no-undef
        details.push(_.cloneDeep(detailsObj))
        this.$set(cpv, 'plan_details', details)
        // eslint-disable-next-line no-undef
        // const cpvToAdd = _.cloneDeep(this.cpvSpecs[index])
        // this.cpvSpecs.splice(index, 0, cpvToAdd)
      },
      removeDetailObj(cpv, detailsIndex) {
        const detailArr = cpv.plan_details
        detailArr.splice(detailsIndex, 1)
        this.$set(cpv, 'plan_details', detailArr)
      },
      removeProcurement(cpvIndex) {
        this.$delete(this.cpvSpecs, cpvIndex)
      },
      setSpecificationId(params) {
        this.cpvSpecs.forEach(cpv => {
          if(cpv.cpv_id === params.cpvId) {
            cpv.specifications_id = params.specificationId
          }
        })
      }
    },
  }
</script>

<style scoped>
  .tableFixHead {
    overflow: auto;
    height: calc(100% - 1rem);
  }

  .tableFixHead thead th {
    position: sticky;
    top: 0;
    z-index: 99
  }

  /* Just common table stuff. Really. */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 8px 16px;
  }

  th {
    background: #fff;
  }
  select.form-control.custom-select_opt {
    width: 140px;
  }
  select.form-control.form-control-opt {
    width: 200px;
  }
  tbody::before
  {
    content: '';
    display: block;
    height: 15px;

  }
</style>
