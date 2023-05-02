<template>
<modal @before-open="beforeOpen" name="add-same-modal" style="z-index: 1001;">
  <div id="modal-header" class="w-100 px-4 py-2 position-relative"
  style="background-color:#006BE6">
    <div class="w-100 d-flex">
      <p>Ավելացնել նույնից ({{ modalTitle }})</p>
    </div>
    <button type="button"
      class="close position-absolute"
      style="right: 1.25rem; top: 30%"
      @click="$modal.hide('edit-modal')" aria-label="Close">
      <span aria-hidden="true" class="text-white">&times;</span>
    </button>
  </div>
  <div id="modal-body" class="px-4 pt-4 pb-5" style="overflow-x: auto; height: 75%">
    <form>
      <div class="form-group">
        <label for="count">քանակ</label>
        <input v-model="$v.details.count.$model" 
              type="text" 
              v-positive-only.none_zero.integer
              class="form-control"
              :class="{'border-danger': countRequired}" 
              id="count">
      </div>
      <div class="form-group">
        <label for="unit-amount">միավորի գին</label>
        <input v-model.number="$v.details.unit_amount.$model" 
              v-positive-only
              type="text" 
              class="form-control"
              :class="{'border-danger': unitAmountRequired}" 
              id="unit-amount">
      </div>
      <div class="form-group">
        <label for="count">Համակարգից դուրս կազմակերպված քանակ</label>
        <input v-model="$v.details.out_count.$model" 
              type="text" 
              v-positive-only.none_zero.integer
              class="form-control"
              :class="{'border-danger': outCountRequired}" 
              id="count">
      </div>
      <div class="form-group">
        <label for="type">Գնման ձև</label>
        <select @change="onChange($event)" v-model="details.type" name="type" id="type" class="form-control">
          <option v-for="(type, key) in purchaseTypes" 
                  :key="key" 
                  :value="key">{{ type }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="f-classifier">Բյուջետային ծրագիր</label>
        <input 
          v-model="$v.details.financial_classifier.$model" 
          type="text" 
          class="form-control"
          :class="{'border-danger': financiaClassifierRequired}" 
          id="f-classifier"
        >
      </div>
      <div class="form-group">
        <label for="classifier">Տնտեսկան Դասակարգիչ</label>
        <input 
          v-model="$v.details.classifier.$model" 
          type="text" 
          class="form-control"
          :class="{'border-danger': classifierRequired}" 
          id="classifier"
        >
      </div>
      <div class="form-group">
        <label for="date">Գնման ժամկետ</label>
        <date-pick v-model="details.date"
            :displayFormat="'DD/MM/YYYY'"
            :inputAttributes="{readonly: true}"
            :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
            :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
            :isDateDisabled="(date) => date < new Date()"
            class="date-picker"></date-pick>
      </div>
    </form>
  </div>
  <div id="modal-footer" class="bg-white w-100 py-3 px-4 position-absolute text-right" style="bottom: 0">
      <button @click="$modal.hide('add-same-modal')" type="button" class="btn btn-secondary mr-3">Չեղարկել</button>
      <button @click="addSame" 
              type="button" 
              class="btn btn-primary">Ավելացնել</button>
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
  name: 'AddSameModal',
  components: { DatePick },
  mixins: [PurchaseTypes],
  computed: {
    units() {
      return this.$store.getters['settings/units']
    },
    financialClassifiers() {
      return this.$store.getters['settings/financialClassifiers']
    },
    classifiers() {
      return this.$store.getters['settings/classifiers']
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
      return this.$v.details.financial_classifier.$dirty && !this.$v.details.financial_classifier.required
    },
    classifierRequired () {
      return this.$v.details.classifier.$dirty && !this.$v.details.classifier.required
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
    beforeOpen({ params: { row, updateTable } }) {

      this.details = {
        count: row.count,
        unit_amount: row.unit_amount,
        out_count: row.out_count,
        type: row.type,
        classifier: row.classifier,
        financial_classifier: row.financial_classifier,
        // classifier_id: row.classifier_id,
        // financial_classifier_id: row.financial_classifier_id,
        date: row.date
      }

      if(+row.type === 4){
        this.purchaseTypes = {
          2: "ՄԱ*",
          3: "ՀՄԱ",
          4: "ԲՄ",
          5: "ՀԲՄ",
          7: "ԷԱՃ",
        }
      }else if(+row.type === 6){
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

      this.modalTitle = `${row.cpv_code}${row.cpv_drop && '/'}${row.cpv_drop} - ${row.cpv_name}`
      this.procurementId = row.plan_row_id
      this.updateTable = updateTable

    },
    addSame() {
      if(this.$v.details.$invalid) {
        return
      } 
      this.$client.post(`procurement-plan/storeDetails/${this.procurementId}`, this.details).then(response => {
        if(response.data.status) {
          this.updateTable()
          this.$modal.hide('add-same-modal')
        }
      })
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
      count: { required },
      unit_amount: { required },
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
