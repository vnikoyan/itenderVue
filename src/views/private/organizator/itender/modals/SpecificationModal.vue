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
  width="60%"
  height="60%"
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
      <div class="col-4 p-3 border-right">
        <div class="w-100 border-bottom pb-3 d-flex justify-content-around">
          <h5>Բնութագրեր</h5>
          <button @click="isCreateScreen = true; selectedSpecification = {}" 
                  class="btn btn-outline-primary px-3" title="Ստեղծել">
            <font-awesome-icon icon="plus" class="mr-1"/> 
            <span>Ստեղծել</span>
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
              {{ _.truncate(spec.description.hy,  { length: 24, separator: ' ' }) }}
            </label>
          </div>
        </form>
      </div>

      <div class="col-8 px-4 py-3">
        <form v-if="isCreateScreen || !specifications.length">
          <div class="form-group">
            <label for="spec-arm">Բնութագիր հայերեն</label>
            <textarea v-model="$v.newSpec.description.hy.$model"
                      class="form-control br-8" 
                      :class="{'border-danger': this.descriptionHyRequired}"
                      id="spec-arm" 
                      ></textarea>
          </div>
          <div class="form-group">
            <label for="spec-ru">Բնութագիր ռուսերեն</label>
            <textarea v-model="$v.newSpec.description.ru.$model" 
                      class="form-control br-8" 
                      :class="{'border-danger': this.descriptionRuRequired}" 
                      id="spec-ru" 
                      ></textarea>
          </div>
          <button type="button" @click="createSpecifiction" class="btn btn-primary">
            <span>Ստեղծել</span>
          </button>
        </form>
        <div v-else-if="!_.isEmpty(selectedSpecification)" class="w-100">
          <p>Բնութագիր հայերեն</p>
          <p>{{ selectedSpecification.description.hy }}</p>
          <hr>
          <p>Բնութագիր ռուսերեն</p>
          <p>{{ selectedSpecification.description.ru }}</p>
        </div>
        <div v-else class="w-100 h-100 d-flex justify-content-center align-items-center">
          <h4 class="text-center text-info">
            Ընտրիր Բնութագիր
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div id="modal-footer">
    <button v-if="selectedSpecification" @click="edit" 
            type="button" 
            class="btn btn-primary mr-3">
            <span>Խմբագրել</span>
            <i class="ml-2 fas fa-edit"></i>
    </button>
    <button @click="save" 
            type="button" 
            class="btn btn-primary">
            <span>Պահպանել</span>
            <i class="ml-2 fas fa-save"></i>
    </button>
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
    },
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    createSpecifiction() {
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
              this.newSpec.description.hy = ""
              this.newSpec.description.ru = ""
              this.$v.newSpec.$reset();
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
      console.log('AAA')
      if(!_.isEmpty(this.selectedSpecification)) {
        console.log(this.selectedSpecification)
        this.$emit('close', {
          cpvId: this.cpvId,
          specificationId: this.selectedSpecification.id
        })
        this.$modal.hide('specification-modal')
      }
    },
    edit() {
      // eslint-disable-next-line no-undef
      if(!_.isEmpty(this.selectedSpecification)) {
        this.isCreateScreen = true; 
        this.newSpec.description.hy = this.selectedSpecification.description.hy
        this.newSpec.description.ru = this.selectedSpecification.description.ru
        this.selectedSpecification = {};
      }
    },
    handleBeforeOpen({ params }) {
      console.log(params)
      this.cpvId = params.cpvId
      this.getSpecifications().then(() => {
        this.selectedSpecification = this.specifications.find(spec => {
          return spec.id === params.specificationsId
        })
      }) 
    },
    handleBeforeClose() {
      this.selectedSpecification = {}
      this.newSpec.description.hy = ""
      this.newSpec.description.ru = ""
      this.$v.newSpec.$reset();
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
