<template>
<modal 
  class="edit-modal"
  name="edit-modal"
  @before-open="setProcurement" 
  transition="fade"
  :adaptive="true"
  :scrollable="true"
  :reset="true"
  width="40%"
  height="80%"
>
  <div id="modal-header">
    <div class="w-75 d-flex">
      <p>{{ procurement.cpv_name }} - {{ procurement.cpv_code }}</p>
    </div>
    <button type="button"
            class="close position-absolute"
            style="right: 1.25rem; top: 25%"
            @click="$modal.hide('edit-modal')" aria-label="Close">
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
      </svg>
    </button>
  </div>
  <div id="modal-body">
    <form>
      <div class="form-group m-0">
        <float-label>
          <select v-model="procurement.unit" class="tender-input form-control" id="exampleFormControlSelect1">
            <option disabled selected value="0">միավոր</option>
            <option :key="unit.id" v-for="unit in units" :value="unit.id">{{ unit.title }}</option>
          </select>
        </float-label>
      </div>
      <div class="form-group m-0">
        <float-label>
          <input 
            v-model.number="$v.details.unit_amount.$model"
            :class="{'border-danger': unitAmountRequired}" 
            placeholder="միավորի գին"
            v-positive-only
            type="text" 
            class="tender-input"
            id="classifier"
          >
        </float-label>
      </div>
      <div class="form-group m-0">
        <float-label>
          <input 
            v-model="$v.details.count.$model"
            :class="{'border-danger': countRequired}" 
            placeholder="միավորի գին"
            v-positive-only.none_zero.integer
            type="text" 
            class="tender-input"
            id="classifier"
          >
        </float-label>
      </div>
      <div class="form-group m-0">
        <float-label>
          <input 
            v-model="$v.details.out_count.$model" 
            :class="{'border-danger': outCountRequired}" 
            placeholder="Համակարգից դուրս կազմակերպված քանակ"
            v-positive-only.none_zero.integer
            type="text" 
            class="tender-input"
            id="classifier"
          >
        </float-label>
      </div>
      <div class="form-group m-0">
        <float-label>
          <select @change="onChange($event)" v-model="details.type" class="tender-input form-control" id="exampleFormControlSelect1">
            <option disabled selected value="0">Գնման ձև</option>
            <option v-for="(type, key) in purchaseTypes" :key="key" :value="key">{{ type }}</option>
          </select>
        </float-label>
      </div>
      <div class="form-group m-0">
        <float-label>
          <select v-model="procurement.cpv_type"  class="tender-input form-control" id="exampleFormControlSelect1">
            <option disabled selected value="0">Գնման առարկայի տեսակ</option>
            <option value="1">Ապրանք</option>
            <option value="2">Ծառայություն</option>
            <option value="3">Աշխատանք</option>
          </select>
        </float-label>
      </div>
      <div class="form-group m-0">
        <float-label>
          <input 
            v-model="$v.details.financial_classifier.$model" 
            :class="{'border-danger': financiaClassifierRequired}" 
            placeholder="Բյուջետային ծրագիր"
            type="text"
            class="tender-input"
            id="classifier"
          >
        </float-label>
      </div>
      <div class="form-group m-0">
        <float-label>
          <input 
            v-model="$v.details.classifier.$model" 
            :class="{'border-danger': classifierRequired}" 
            placeholder="Տնտեսկան Դասակարգիչ"
            type="text"
            class="tender-input"
            id="classifier"
          >
        </float-label>
      </div>
      <div v-if="+division.id !== 1" class="form-group m-0">
        <float-label>
          <select v-model="procurement.user_id" class="tender-input form-control" id="exampleFormControlSelect1">
            <option disabled selected value="0">{{ division.childName }}</option>
            <option :key="child.id" v-for="child in userChildren" :value="child.id">{{ child.name }}</option>
          </select>
        </float-label>
      </div>
      <div class="form-group m-0">
        <div class="vfl-has-label">
          <label class="vfl-label" :class="details.date && 'vfl-label-on-input vfl-label'">Գնման ժամկետ</label>
          <date-pick
            v-model="details.date"
            :displayFormat="'DD/MM/YYYY'"
            :inputAttributes="{readonly: true, placeholder: 'Գնման ժամկետ'}"
            :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
            :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
            :isDateDisabled="(date) => date < new Date()"
            class="tender-date-picker date-picker"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input v-model="procurement.is_condition" 
                :value="1"
                id="is-condition" 
                class="form-check-input" 
                type="radio"> 
          <label class="form-check-label" for="is-condition">Պայմանով</label>
        </div>
        <div class="form-check">
          <input v-model="procurement.is_condition"
                :value="0"
                id="is-not-condition" 
                class="form-check-input" 
                type="radio">
          <label class="form-check-label" for="is-not-condition">Առանց պայման</label>
        </div>
        <div v-if="procurement.is_condition" style="width: 200px;">
          <div class="form-check">
            <input v-model="procurement.condition_type" value="first_point" class="form-check-input" type="radio" name="conditionType" id="conditionType1">
            <label class="form-check-label" for="conditionType1">
              1-ին կետի հիման վրա
            </label>
          </div>
          <div class="form-check">
            <input v-model="procurement.condition_type" value="second_point" class="form-check-input" type="radio" name="conditionType" id="conditionType2" checked>
            <label class="form-check-label" for="conditionType2">
              2-ին կետի հիման վրա
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div id="modal-footer">
      <button @click="$modal.hide('edit-modal')" type="button" class="btn btn-secondary mr-3"><span>Չեղարկել</span></button>
      <button @click="update" 
              type="button" 
              class="btn btn-primary"><span>Պահպանել</span></button>
    </div>
</modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import PurchaseTypes from '@/mixins/purchaseTypes'
// import Datepicker from 'vuejs-datepicker';
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  name: 'ProcurementEditModal',
  components: { DatePick },
  mixins: [PurchaseTypes],
  computed: {
    units() {
      return this.$store.getters['settings/units']
    },
    unitAmountRequired () {
      return this.$v.details.unit_amount.$dirty && !this.$v.details.unit_amount.required
    },
    countRequired () {
      return this.$v.details.count.$dirty && !this.$v.details.count.required
    },
    outCountRequired () {
      return this.$v.details.out_count.$dirty && !this.$v.details.out_count.required
    },
    financiaClassifierRequired () {
      return this.$v.details.financial_classifier.$invalid
    },
    classifierRequired () {
      return this.$v.details.classifier.$invalid
    },
    division() {
      return this.$store.getters['user/division']
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
      modalTitle: '',
      procurement: {},
      details: {},
      unchagedProcurement: {},
      unchagedDetails: {},
      isRowUpdated: false,
    }
  },
  methods: {
    onChange(event) {
      if(+event.target.value === 4){
        this.purchaseTypes = {
          2: "ՄԱ*",
          3: "ՀՄԱ",
          4: "ԲՄ",
          5: "ՀԲՄ",
          7: "ԷԱՃ",
        }
      }else if(+event.target.value === 6){
        this.purchaseTypes = {
          2: "ՄԱ*",
          3: "ՀՄԱ",
          4: "ԲՄ",
          5: "ՀԲՄ",
          6: "ԳՀ",
          7: "ԷԱՃ",
        }  
      }else{
        this.purchaseTypes = {
          1: "ՄԱ",
          2: "ՄԱ*",
          3: "ՀՄԱ",
          4: "ԲՄ",
          5: "ՀԲՄ",
          6: "ԳՀ",
          7: "ԷԱՃ",
        }  
      }
    },
    setProcurement({ params: { row, updateTable } }) {
      console.log(row)
      // eslint-disable-next-line no-undef
      // const procurement = _.cloneDeep(row)
      // eslint-disable-next-line no-undef

      // eslint-disable-next-line no-undef
      this.details = _.pick(row, [
        "order_index",
        "id",
        "count",
        "out_count",
        "unit_amount",
        "type",
        "date",
        "classifier",
        "financial_classifier",
        // "classifier_id",
        // "financial_classifier_id"
      ])

      // eslint-disable-next-line no-undef
      this.procurement = _.pick(row, [
        'plan_row_id',
        'status',
        'cpv_id',
        'cpv_name',
        'cpv_code',
        'cpv_drop',
        'cpv_type',
        'specifications_id',
        'unit',
        'is_condition',
        'condition_type'
      ])
      const unit = this.units.find(value => value.title === this.procurement.unit)
      this.$set(this.procurement, 'user_id', row.user)
      this.$set(this.procurement, 'unit', unit.id)

      this.updateTable = updateTable

      // eslint-disable-next-line no-undef
      this.unchagedProcurement = _.cloneDeep(this.procurement)
      // eslint-disable-next-line no-undef
      this.unchagedDetails = _.cloneDeep(this.details)
      if(+this.details.type === 4){
        this.purchaseTypes = {
          2: "ՄԱ*",
          3: "ՀՄԱ",
          4: "ԲՄ",
          5: "ՀԲՄ",
          7: "ԷԱՃ",
        }
      }else if(+this.details.type === 6){
        this.purchaseTypes = {
          2: "ՄԱ*",
          3: "ՀՄԱ",
          4: "ԲՄ",
          5: "ՀԲՄ",
          6: "ԳՀ",
          7: "ԷԱՃ",
        }  
      }else{
        this.purchaseTypes = {
          1: "ՄԱ",
          2: "ՄԱ*",
          3: "ՀՄԱ",
          4: "ԲՄ",
          5: "ՀԲՄ",
          6: "ԳՀ",
          7: "ԷԱՃ",
        }  
      }
      console.log(this.procurement)
    },
    async update() {
      if(this.$v.details.$invalid) {
        return
      }
      const changedProcurement = this.getChanges('unchagedProcurement', 'procurement')
      const changedDetails = this.getChanges('unchagedDetails', 'details')
      let updateResponse
      // eslint-disable-next-line no-undef
      if(!_.isEmpty(changedProcurement)) {
        updateResponse = await this.$store.dispatch('procurement/update', {
          rowId: this.procurement.plan_row_id,
          data:  Object.assign({}, changedProcurement, {user_id: this.procurement.user_id})
        })
      }
      // eslint-disable-next-line no-undef
      if(!_.isEmpty(changedDetails)) {
        updateResponse = await this.$store.dispatch('procurement/updateDetails', {
          detailsId: this.details.id,
          data: changedDetails
        })
      }

      if(updateResponse) {
        console.log(updateResponse, 'updateResponse')
        if(updateResponse.data.status) {
          this.updateTable()
          this.$modal.hide('edit-modal')
        }
      } else {
        this.$modal.hide('edit-modal')
      }
      // this.$store.dispatch('procurement/update', updateParams).then(response => {
      //   this.$emit('updateTable')
      //   this.$modal.hide('edit-modal')
      // })
    },
    getChanges(unchaged, changed) {
      // const changesObj = {user_id: this.procurement.user_id}
      const changesObj = {}
      Object.keys(this[unchaged]).forEach(key => {
        if(this[unchaged][key] !== this[changed][key]) {
          changesObj[key] = this[changed][key]
        }
      })
      return changesObj
    },
  },
  validations: {
    details: {
      unit_amount: { required },
      count: { required },
      out_count: { required },
      financial_classifier: { required },
      classifier: { required }
    }
  }
}
</script>

<style scoped>
.date-picker {
  display: block;
  width: 100%;
  border: 1px solid #e8ebf3;
  border-radius: .25rem;
  border-bottom: 1px solid #e8ebf3;
}
</style>
