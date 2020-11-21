<template>
<modal @before-open="handleBeforeOpen" 
      @before-close="handleBeforeClose" 
      name="specification-modal" 
      style="z-index: 1002;">
  <div id="modal-header" class="w-100 px-4 py-2 position-relative"
  style="background-color:#506ee4">
    <div class="w-100 d-flex">
      <h4 class="text-white">Տեխնիկական բնութագիր</h4>
    </div>
    <button type="button"
      class="close position-absolute"
      style="right: 1.25rem; top: 30%"
      @click="$modal.hide('specification-modal')" aria-label="Close">
      <span aria-hidden="true" class="text-white">&times;</span>
    </button>
  </div>
  <div id="modal-body" style="overflow-x: auto; height: 80%">
    <div class="row h-100 mx-0">
      <div class="col-4 p-3 border-right shadow">
        <div class="w-100 border-bottom pb-3 d-flex justify-content-around">
          <h5>Բնութագրեր</h5>
          <button @click="isCreateScreen = true; selectedSpecification = {}" 
                  class="btn btn-sm btn-outline-primary px-3" title="Ստեղծել">
            <font-awesome-icon icon="plus" />
          </button>
        </div>
        <form class="pt-3">
          <div v-for="spec in specifications" 
              :key="spec.id" 
              class="form-check">
            <input v-model="selectedSpecification"
                  @change="isCreateScreen = false" 
                  :value="spec"
                  :id="spec.id" 
                  class="form-check-input" 
                  type="radio"> 
            <label class="form-check-label" :for="spec.id">
              {{ _.truncate(spec.description,  { length: 24, separator: ' ' }) }}
            </label>
          </div>
        </form>
      </div>

      <div class="col-8 px-4 py-3">
        <form v-if="isCreateScreen || !specifications.length">
          <div class="form-group">
            <label for="spec-arm">Բնութագիր հայերեն</label>
            <textarea v-model="$v.newSpec.description.hy.$model"
                      class="form-control" 
                      :class="{'border-danger': this.descriptionHyRequired}"
                      id="spec-arm" 
                      rows="4"></textarea>
          </div>
          <div class="form-group">
            <label for="spec-ru">Բնութագիր ռուսերեն</label>
            <textarea v-model="$v.newSpec.description.ru.$model" 
                      class="form-control" 
                      :class="{'border-danger': this.descriptionRuRequired}" 
                      id="spec-ru" 
                      rows="4"></textarea>
          </div>
          <button type="button" @click="createSpecifiction" class="btn btn-sm btn-primary">Ստեղծել</button>
        </form>
        <div v-else-if="!_.isEmpty(selectedSpecification)" class="w-100">
          <p>Բնութագիր</p>
          <p>{{ selectedSpecification.description }}</p>
        </div>
        <div v-else class="w-100 h-100 d-flex justify-content-center align-items-center">
          <h4 class="text-center text-info">
            Ընտրիր Բնութագիր
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div id="modal-footer" class="bg-white border-top w-100 py-3 px-4 position-absolute text-right" style="bottom: 0">
    <button @click="save" 
            type="button" 
            class="btn btn-primary">Պահպանել</button>
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
    createSpecifiction() {
      console.log('createSpecifiction')
      if(!this.$v.newSpec.$invalid) {
        this.$store.dispatch('cpv/createSpecification', {
          cpvId: this.cpvId,
          spec: this.newSpec
        }).then(response => {
          if(response.data.status) {
            this.getSpecifications().then(() => {
              // eslint-disable-next-line no-undef
              this.selectedSpecification = _.last(this.specifications)
              this.isCreateScreen = false
            })
          }
        })
      } else {
        this.$v.newSpec.$touch()
      }
    },
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
/deep/ .vm--modal {
    top: 15% !important;
    left: unset !important;
    width: 60% !important;
    height: 70% !important;
    margin: auto;
    -webkit-border-radius: .3rem !important;
    -moz-border-radius: .3rem !important;
    border-radius: .3rem !important;
}
</style>
