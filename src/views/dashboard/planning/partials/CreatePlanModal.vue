<template>
  <modal name="create-plan-modal" style="z-index: 1001;">
    <div id="modal-header" class="w-100 px-4 py-2 position-relative"
    style="background-color:#506ee4">
      <div class="w-100 d-flex">
        <h4 class="text-white">Ստեղծել Գնումների պլան</h4>
      </div>
      <button type="button"
        class="close position-absolute"
        style="right: 1.25rem; top: 30%"
        @click="$modal.hide('create-plan-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body" class="px-4 pt-4 pb-5" style="overflow-x: auto; height: 75%">
      <div class="form-group mb-4">
        <label for="procurementName">Անվանումը</label>
        <input v-model="$v.procurement.name.$model"
                type="text"
                class="form-control"
                :class="{'border-danger': $v.procurement.name.$dirty && !$v.procurement.name.required}"
                id="procurementName"
                placeholder="Պլանի անվանումը"/>
        <span class="small text-danger" v-if="$v.procurement.name.$dirty && !$v.procurement.name.required">Ենթակա է պարտադիր լրացման</span>
      </div>

      <div class="form-group mb-3">
        <label for="procurementYear">Տարի</label>
        <input v-model="$v.procurement.year.$model"
                type="number"
                class="form-control"
                :class="{'border-danger': $v.procurement.year.$dirty && !$v.procurement.year.required}"
                id="procurementYear"
                placeholder="Տարի"/>
        <span class="small text-danger" v-if="$v.procurement.year.$dirty && !$v.procurement.year.required">Ենթակա է պարտադիր լրացման</span>
      </div>
    </div>
    <div id="modal-footer" class="bg-white w-100 py-3 px-4 position-absolute text-right" style="bottom: 0">
      <button @click="$modal.hide('create-plan-modal')"
              type="button"
              class="btn btn-sm btn-secondary mr-3">Չեղարկել</button>
      <button @click="storeProcurement" type="button" class="btn btn-sm btn-primary">Ստեղծել</button>
    </div>
  </modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'CreatePlanModal',
  data() {
    return {
      procurement: {
        name: '',
        year: new Date().getFullYear()
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

<style scoped>
/deep/ .vm--modal {
  top: 3rem !important;
  left: unset !important;
  width: 35% !important;
  height: 30rem !important;
  margin: auto;
  -webkit-border-radius: .3rem !important;
  -moz-border-radius: .3rem !important;
  border-radius: .3rem !important;
}
</style>
