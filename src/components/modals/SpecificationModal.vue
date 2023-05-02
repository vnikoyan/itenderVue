<template>
<modal 
  class="specification-modal"
  name="specification-modal"
  @before-open="handleBeforeOpen" 
  @before-close="handleBeforeClose" 
  transition="fade"
  :adaptive="true"
  :scrollable="true"
  :reset="true"
  width="70%"
  height="80%"
  style="z-index: 4066;"
>
  <div id="modal-header">
    <div class="w-75 d-flex">
      <p>Տեխնիկական բնութագիր</p>
    </div>
    <button type="button"
            class="close position-absolute"
            style="right: 1.25rem; top: 25%"
            @click="$modal.hide('specification-modal')" aria-label="Close">
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
      </svg>
    </button>
  </div>
  <div id="modal-body">
    <div class="row h-100 mx-0">
      <div class="col-12 px-4 py-3">
        <div v-if="!_.isEmpty(selectedSpecification)" class="w-100">
          <p>Բնութագիր</p>
          <p>{{ selectedSpecification.description }}</p>
        </div>
        <div v-else class="w-100 h-100 d-flex justify-content-center align-items-center">
          <h4 class="text-center text-info">
            lorem
          </h4>
        </div>
      </div>
    </div>
  </div>
</modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'SpecificationModal',
  data() {
    return {
      selectedSpecification: {},
      specifications: [],
      cpvId: null,
      isCreateScreen: false,
      newSpec: {
        description: {
          hy: '',
          ru: '',
          en: 'ajsdlkjflakj',
        },
      }
    }
  },
  computed: {
    descriptionHyRequired () {
      return this.$v.newSpec.description.hy.$dirty && !this.$v.newSpec.description.hy.required
    },
    descriptionRuRequired () {
      return this.$v.newSpec.description.ru.$dirty && !this.$v.newSpec.description.ru.required
    }
  },
  methods: {
    getSpecifications() {
      return this.$store.dispatch('cpv/getSpecification', this.cpvId).then(response => {
        this.specifications = response.data.data.specifications
      })
    },
    save() {
      // eslint-disable-next-line no-undef
      if(!_.isEmpty(this.selectedSpecification)) {
        this.$emit('close', {
          cpvId: this.cpvId,
          specificationId: this.selectedSpecification.id
        })
        this.$modal.hide('specification-modal')
      }
    },
    handleBeforeOpen({ params }) {
      this.cpvId = params.cpvId
      this.getSpecifications().then(() => {
        this.selectedSpecification = this.specifications.find(spec => {
          return spec.id === params.specificationsId
        })
      }) 
    },
    handleBeforeClose() {
      this.selectedSpecification = {}
      this.isCreateScreen = false
    }
  },
  validations: {
    newSpec: {
        description: {
          hy: { required },
          ru: { required },
        },
      }
  }
}
</script>

<style scoped>
.specification-modal{
  z-index: 2001;
}
</style>
