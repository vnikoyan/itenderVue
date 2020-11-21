<template>
<modal @before-open="setProcurement" name="edit-modal" style="z-index: 1001;">
  <div id="modal-header" class="w-100 px-4 py-2 position-relative"
  style="background-color:#506ee4">
    <div class="w-100 d-flex">
      <h4 class="text-white">{{ procurement.cpv_name }} - {{ procurement.cpv_code }}</h4>
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
        <label for="unit">միավոր</label>
        <select v-model="procurement.unit" name="unit" id="unit" class="form-control">
          <option :key="unit.id" v-for="unit in units" :value="unit.title">{{ unit.title }}</option>
        </select>
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
        <label for="count">քանակ</label>
        <input v-model="$v.details.count.$model" 
              type="text" 
              v-positive-only.none_zero.integer
              class="form-control"
              :class="{'border-danger': countRequired}" 
              id="count">
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
        <select v-model="details.type" name="type" id="type" class="form-control">
          <option v-for="(type, key) in purchaseTypes" 
                  :key="key" 
                  :value="key">{{ type }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cpv-type">Գնման առարկայի տեսակ</label>
        <select v-model="procurement.cpv_type" 
                name="cpv-type" 
                id="cpv-type" 
                class="form-control">
          <option value="1">Ապրանք</option>
          <option value="2">Ծառայություն</option>
          <option value="3">Աշխատանք</option>
        </select>
      </div>
      <div class="form-group">
        <label for="f-classifier">Բյուջետային ծրագիր</label>
        <select v-model="details.financial_classifier_id" id="f-classifier" class="form-control">
          <option :value="null" disabled>Ընտրել</option>
          <option v-for="fClassifier in financialClassifiers" 
              :key="fClassifier.id" 
              :value="fClassifier.id">{{ fClassifier.code === '0' ? '' : fClassifier.code + '-' }}{{ fClassifier.title }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="classifier">Տնտեսկան Դասակարգիչ</label>
        <select v-model="details.classifier_id" id="classifier" class="form-control">
          <option :value="null" disabled>Ընտրել</option>
          <option v-for="classifier in classifiers" 
              :key="classifier.id" 
              :value="classifier.id">{{ classifier.code }} - {{ classifier.title }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="division">{{ division.childName }}</label>
        <select v-model="procurement.user" name="userId" id="user-id" class="form-control">
          <option :value="null || undefined">Ընտրել</option>
          <option :key="child.id" v-for="child in userChildren" :value="child.id">{{ child.email }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date">Գնման ժամկետ</label>
        <date-pick v-model="details.date"
            :displayFormat="'DD/MM/YYYY'"
            :inputAttributes="{readonly: true}"
            :isDateDisabled="(date) => date < new Date()"
            class="date-picker"></date-pick>
      </div>
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
    </form>
  </div>
  <div id="modal-footer" class="bg-white w-100 py-3 px-4 position-absolute text-right" style="bottom: 0">
      <button @click="$modal.hide('edit-modal')" type="button" class="btn btn-secondary mr-3">Չեղարկել</button>
      <button @click="update" 
              type="button" 
              class="btn btn-primary">Պահպանել</button>
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
    setProcurement({ params: { row, updateTable } }) {
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
        "classifier_id",
        "financial_classifier_id"
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
        'user',
        'is_condition'
      ])

      this.updateTable = updateTable

      // eslint-disable-next-line no-undef
      this.unchagedProcurement = _.cloneDeep(this.procurement)
      // eslint-disable-next-line no-undef
      this.unchagedDetails = _.cloneDeep(this.details)
    },
    update() {
      if(this.$v.details.$invalid) {
        return
      }
      const changedProcurement = this.getChanges('unchagedProcurement', 'procurement')
      const changedDetails = this.getChanges('unchagedDetails', 'details')
      // eslint-disable-next-line no-undef
      if(!_.isEmpty(changedProcurement)) {
        this.$store.dispatch('procurement/update', {
          rowId: this.procurement.plan_row_id,
          data: Object.assign(changedProcurement, {user_id: this.procurement.user})
        }).then(response => {
          if(response.data.status) {
            this.updateTable()
            this.$modal.hide('edit-modal')
          }
        })
      }
      // eslint-disable-next-line no-undef
      if(!_.isEmpty(changedDetails)) {
        this.$store.dispatch('procurement/updateDetails', {
          detailsId: this.details.id,
          data: changedDetails
        }).then(response => {
          if(response.data.status) {
            this.updateTable()
            this.$modal.hide('edit-modal')
          }
        })
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
      out_count: { required }
    }
  }
}
</script>

<style scoped>
/deep/ .vm--modal {
    top: 2rem !important;
    left: unset !important;
    width: 35% !important;
    height: 90% !important;
    margin: auto;
    -webkit-border-radius: .3rem !important;
    -moz-border-radius: .3rem !important;
    border-radius: .3rem !important;
}
.date-picker {
  display: block;
  width: 100%;
  border: 1px solid #e8ebf3;
  border-radius: .25rem;
  border-bottom: 1px solid #e8ebf3;
}
/deep/ .vdpWithInput > input {
  width: 100%;
  height: calc(1.8em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: .845rem;
  font-weight: 400;
  line-height: 1.8;
  color: #303e67;
  border: none;
}

</style>
