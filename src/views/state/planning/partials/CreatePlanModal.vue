<template>
  <modal 
    class="create-plan-modal"
    name="create-plan-modal"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="60%"
    style="z-index: 86097;"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
        <p>Ստեղծել Գնումների պլան</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('create-plan-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="form-group mb-4">
        <float-label :dispatch="false" class="w-100">
          <input v-model="$v.procurement.name.$model"
                 type="text"
                 class="form-control"
                 :class="{'border-danger': $v.procurement.name.$dirty && !$v.procurement.name.required}"
                 id="procurementName"
                 placeholder="Պլանի անվանումը"/>
        </float-label>
        <span class="small text-danger" v-if="$v.procurement.name.$dirty && !$v.procurement.name.required">Ենթակա է պարտադիր լրացման</span>
      </div>

      <div class="form-group mb-3">
        <label for="year">Տարի</label>
        <year-picker :year.sync="procurement.year"
            class="form-control" 
            :class="{'border-danger': $v.procurement.year.$dirty && !$v.procurement.year.required}"/>
        <span class="small text-danger" 
            v-if="$v.procurement.year.$dirty && !$v.procurement.year.required">
            Ենթակա է պարտադիր լրացման
        </span>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('create-plan-modal')"
              type="button"
              class="btn btn-secondary mr-3"><span>Չեղարկել</span></button>
      <button @click="storeProcurement" type="button" class="btn btn-primary"><span>Ստեղծել</span></button>
    </div>
  </modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import YearPicker from '@/components/helpers/YearPicker'
export default {
  name: 'CreatePlanModal',
  components: { YearPicker },
  data() {
    return {
      procurement: {
        name: '',
        year: null,
      },
      selectedCpvs: null,
    }
  },
  methods: {
    storeProcurement() {
      if(!this.$v.$invalid) {
        this.$store.dispatch('procurement/store', this.procurement).then(response => {
          if(response.status === 200) {
            
          }
          this.$modal.hide('create-plan-modal')
        })
      } else this.$v.$touch()
    }
  },
  validations: {
    procurement: {
      name: {required},
      year: {required}
    }
  }
}
</script>

<style>
.create-plan-modal .vm--overlay{
  /* z-index: 120000000000 !important; */
}
</style>
