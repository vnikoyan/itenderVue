<template>
  <modal 
    class="add-cpv-modal"
    name="add-cpv-modal"
    @before-close="resetComponent"
    @before-open="setProps"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
    z-index="2011"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
        <p>Ավելացնել գնման առարկա</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('add-cpv-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <div id="overflow-div" v-show="tableView" class="tableFixHead">
        <div @mouseover="horizontalScrollTo('left')"
             class="scroll-button left d-flex justify-content-center align-items-center">
          <span class="text-white h3">
            <i class="fas fa-angle-left" />
          </span>
        </div>
        <div @mouseover="horizontalScrollTo('right')"
             class="scroll-button right d-flex justify-content-center align-items-center">
          <span class="text-white h3">
            <i class="fas fa-angle-right" />
          </span>
        </div>
        <table id="cpv-specs-table" v-if="cpvSpecs.length" class="table table-hover">
          <thead>
          <tr>
            <th v-for="heading in tableHeadings"
                :key="heading"
                style="width: 7.1%">{{ heading }}
            </th>
          </tr>
          </thead>
          <tbody :key="cpv.id" v-for="(cpv, cpvIndex) in $v.cpvSpecs.$each.$iter" class="border-secondary">
          <tr :key="detailsIndex" v-for="(details, detailsIndex) in cpv.plan_details.$each.$iter">
            <td>
              <!--                <button  class="btn btn-secondary px-3">-->
              <!--                  -->
              <!--                </button>-->
              <div class="d-flex justify-content-between" aria-expanded="false" v-if="detailsIndex == 0">
                <font-awesome-icon v-tooltip="'Ավելացնել նույնից'" title="Ավելացնել"
                                   @click="addSame(cpv.$model, details.$model)"
                                   icon="copy"
                                   style="cursor: pointer"
                                   class="text-secondary h4 mr-3" />
                <font-awesome-icon v-tooltip="'Ջնջել'"
                                   @click="removeProcurement(cpvIndex)"
                                   icon="trash-alt"
                                   style="cursor: pointer"
                                   class="text-danger h4" />
              </div>
              <font-awesome-icon v-else
                                 v-tooltip="'Հեռացնել ենթատողը'"
                                 @click="removeDetailObj(cpv.$model, detailsIndex)"
                                 icon="times"
                                 style="cursor: pointer"
                                 class="text-info h4" />
            </td>
            <td>
              <span v-if="detailsIndex == 0">{{ cpv.code.$model }}</span>
              <span v-else>___</span>
            </td>
            <td>
              <span v-if="detailsIndex == 0">{{ cpv.name.$model }}</span>
              <span v-else>___</span>
            </td>
            <td>
              <select v-model="cpv.unit.$model"
                      v-if="detailsIndex == 0"
                      name="unit"
                      id="unit"
                      style="width: 110px"
                      :class="{'border-danger': cpv.unit.$dirty && !cpv.unit.required}"
                      class="form-control custom-select_opt">
                <option :value="''">Ընտրել</option>
                <option v-for="unit in units"
                        :key="unit.id"
                        :value="unit.id">{{ unit.title }}
                </option>
              </select>
              <span v-else>___</span>
            </td>
            <td>
              <button v-if="detailsIndex == 0" @click="$modal.show('specification-modal', {
                        specificationsId: cpv.specifications_id.$model,
                        cpvId: cpv.cpv_id.$model,
                        unit: cpv.unit,
                        setEstimatedPrice: setEstimatedPrice,
                        cpvIndex: cpvIndex
                      })"
                      type="button"
                      :class="{
                        'btn-success': cpv.specifications_id.$model,
                        'btn-info': !cpv.specifications_id.$model,
                        'btn-danger': cpv.specifications_id.$dirty && !cpv.specifications_id.required
                      }"
                      class="btn btn-square btn-outline-dashed waves-effect waves-light modal03">
                <i class="fa fa-check"></i>
              </button>
              <span v-else>___</span>
            </td>
            <td>
              <input
                v-model="details.count.$model"
                type="number"
                min="1"
                :class="{'border-danger': details.count.$dirty && !details.count.required}"
                class="form-control"
                style="width: 110px">
            </td>
            <td>
              <input
                v-model="details.unit_amount.$model"
                type="number"
                min="1"
                :class="{'border-danger': details.unit_amount.$dirty && !details.unit_amount.required}"
                class="form-control"
                style="width: 120px">
            </td>
            <td>
              <input
                v-model="details.out_count.$model"
                type="number"
                min="0"
                :class="{'border-danger': details.out_count.$dirty && !details.out_count.required}"
                class="form-control" style="width: 110px"
              >
            </td>
            <td>
              <span>{{ details.count.$model - details.out_count.$model}}</span>
            </td>
            <td>
              <span>{{ (details.count.$model - details.out_count.$model) * details.unit_amount.$model }}</span>
            </td>
            <td>
              <input
                v-model="details.classifier.$model"
                type="text"
                :class="{'border-danger': details.classifier.$dirty && !details.classifier.required}"
                class="form-control" style="width: 250px"
              >
              <!-- <select v-model="details.classifier_id.$model"
                      :class="{'border-danger': details.classifier_id.$dirty && !details.classifier_id.required}"
                      class="form-control custom-select_opt"
                      name="classifier"
                      id="classifier">
                <option :value="null" disabled>Ընտրել</option>
                <option v-for="item in classifiers"
                        :key="item.id"
                        :value="item.id">{{ item.title }} - {{ item.code }}
                </option>
              </select> -->
            </td>
            <td>
              <input
                v-model="details.financial_classifier.$model"
                type="text"
                :class="{'border-danger': details.financial_classifier.$dirty && !details.financial_classifier.required}"
                class="form-control" style="width: 250px"
              >
              <!-- <select v-model="details.financial_classifier_id.$model"
                      :class="{'border-danger': details.financial_classifier_id.$dirty && !details.financial_classifier_id.required}"
                      class="form-control custom-select_opt">
                <option :value="null" disabled>Ընտրել</option>
                <option v-for="fClassifier in financialClassifiers"
                        :key="fClassifier.id"
                        :value="fClassifier.id">{{ fClassifier.code === '0' ? '' : fClassifier.code + ' - ' }}{{
                  fClassifier.title }}
                </option>
              </select> -->
            </td>
            <td>
              <input v-model="details.date.$model"
                     type="date"
                     :class="{'border-danger': details.date.$dirty && !details.date.required}"
                     class="form-control">
            </td>
            <td>
              <select v-model="cpv.user_id.$model"
                      v-if="detailsIndex == 0"
                      name="department"
                      style="width: 160px"
                      id="department"
                      :class="{'border-danger': cpv.user_id.$dirty && !cpv.user_id.required}"
                      class="form-control custom-select_opt">
                <option :value="null" disabled>Ընտրել ենթակա մարմին</option>
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
                v-if="detailsIndex == 0"
                v-model="cpv.is_condition.$model"
                :true-value="1"
                :false-value="0"
                type="checkbox"
                class="form-control">
              <span v-else>___</span>
              <div v-if="cpv.is_condition.$model" style="width: 200px;">
                <div class="form-check">
                  <input v-model="cpv.condition_type.$model" value="first_point" class="form-check-input" type="radio" name="conditionType" id="conditionType1">
                  <label class="form-check-label" for="conditionType1">
                    1-ին կետի հիման վրա
                  </label>
                </div>
                <div class="form-check">
                  <input v-model="cpv.condition_type.$model" value="second_point" class="form-check-input" type="radio" name="conditionType" id="conditionType2" checked>
                  <label class="form-check-label" for="conditionType2">
                    2-ին կետի հիման վրա
                  </label>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <cpv-selector v-show="!tableView"  id="cpv-selector" class="m-0 p-0" :selectedCpvs.sync="selectedCpvs" />
    </div>
    <div id="modal-footer">
      <button @click="handleClick" type="button" class="btn btn-primary"> {{ tableView ? 'Ավելացնել' :
        'Շարունակել'}}
      </button>
    </div>
    <specification-modal @close="setSpecificationId" />
  </modal>
</template>

<script>
  import CpvSelector from '@/components/dashboard/cpv/CpvSelector'
  import SpecificationModal from './SpecificationModal'
  import { required } from 'vuelidate/lib/validators'
  import $ from 'jquery'

  export default {
    name: 'AddCpvModal',
    mixins: [],
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
      },
    },
    data() {
      return this.getComponentInitialData()
    },
    methods: {
      setEstimatedPrice(cpvIndex, price){
        this.cpvSpecs[cpvIndex].plan_details[0].unit_amount = price;
      },
      horizontalScrollTo(direction) {
        const overflowDiv = $('#overflow-div')
        overflowDiv.animate({
          scrollLeft: direction === 'left' ? 0 : $('#cpv-specs-table').width() - overflowDiv.scrollLeft(),
        })
      },
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
            'Ֆինանսական դասակարգիչ',
            'Բյուջետային ծրագիր',
            'Գնման լռելայն ժամկետ',
            'Բաժիններ',
            // 'CPV Տիպ',
            'Պայմանով / Առանց պայման',
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
            this.selectedCpvs.map(cpv => {cpv.unit = ''});
            this.$store.dispatch('cpv/getSpecifications', this.selectedCpvs.map(cpv => cpv.id)).then(specs => {
              this.cpvSpecs = specs
            })
            this.tableView = true
          }
        } else {
          // eslint-disable-next-line no-undef
          if (!this.cpvSpecs.length) {
            return
          }
          if (this.$v.cpvSpecs.$invalid) {
            this.$v.cpvSpecs.$touch()
            this.$notify({
              group: 'foo',
              type: 'error',
              text: 'Լրացրեք բոլոր դաշտերը!'
            })
          } else {
            this.$store.dispatch('procurement/storeProcurements', {
              // eslint-disable-next-line no-undef
              procurementArr: _.cloneDeep(this.cpvSpecs),
              procurementId: this.procurement.id,
            }).then(response => {
              if (response.status === 200) {
                this.$emit('resetTableView')
                this.$modal.hide('add-cpv-modal')
              }
            })
          }
        }
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
          if (cpv.cpv_id === params.cpvId) {
            cpv.specifications_id = params.specificationId
          }
        })
      },
      consoleLog(msg) {
        console.log(typeof msg, 'sdlkjflsk')
      },
    },
    validations: {
      cpvSpecs: {
        $each: {
          cpv_id: {},
          code: {},
          name: {},
          cpv_drop: {},
          cpv_type: {},
          user_id: { required },
          is_condition: {},
          condition_type: {},
          unit: { required },
          specifications: {},
          specifications_id: { required },
          plan_details: {
            $each: {
              count: { required },
              date: { required },
              unit_amount: { required },
              out_count: { required },
              type: {  },
              classifier_cpv: {},
              financial_classifier: { required },
              classifier: { required },
              // financial_classifier_id: { required },
              // classifier_id: { required },
            },
          },
        },
      },
    },
  }
</script>
<style scoped>

</style>

<style scoped>
  .scroll-button {
    z-index: 9999;
    width: 30px;
    position: absolute;
    height: 50%;
    top: 30%;
    transform: translate(0, -15%);
  }

  .scroll-button.right {
    right: 0;
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
    background-image: linear-gradient(to left, #cdd1fb, #fff);
  }

  .scroll-button.left {
    left: 0;
    border-bottom-right-radius: 100px;
    border-top-right-radius: 100px;
    background-image: linear-gradient(to right, #cdd1fb, #fff)
  }

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

  tbody::before {
    content: '';
    display: block;
    height: 15px;

  }
</style>
