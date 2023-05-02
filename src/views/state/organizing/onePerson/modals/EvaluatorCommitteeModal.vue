<template>
  <modal name="evaluator-committee-modal"
         @before-open="beforeOpen"
         style="z-index: 1001;">
    <div id="modal-header" class="w-100 px-4 py-2 position-relative"
         style="background-color:#006BE6">
      <div class="w-100 d-flex">
        <h4 v-if="isFormView" class="text-white">Գնահատող Հանձնաժողով</h4>
        <h4 v-else class="text-white">
          <span style="cursor: pointer;" class="mr-3" @click="isFormView = true">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span>Գնահատող Հանձնաժողովի հրաման</span>
        </h4>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('evaluator-committee-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body">
      <template v-if="isFormView">
        <p class="h5">Նախագահ</p>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="evaluator-president-hy">Անուն Ազգանուն Հայերեն</label>
            <input v-model="$v.evaluatorCommittee.evaluator_president.hy.$model"
                   type="text"
                   id="evaluator-president-hy"
                   class="form-control">
          </div>
          <div class="form-group col-md-6">
            <label for="evaluator-president-ru">Անուն Ազգանուն Ռուսերեն</label>
            <input v-model="$v.evaluatorCommittee.evaluator_president.ru.$model"
                   type="text"
                   id="evaluator-president-ru"
                   class="form-control">
          </div>
        </div>

        <div class="w-100">
          <div class="w-100 d-flex my-2 align-items-center">
            <p class="my-0 mr-3 h5">Անդամներ</p>
            <font-awesome-icon @click="addMemberInputRow"
                               icon="plus"
                               class="text-primary"
                               title="Ավելացնել անդամ"
                               style="cursor: pointer;"/>
          </div>
          <div v-for="(member, index) in $v.evaluatorCommittee.evaluator_member.$each.$iter"
               :key="index" class="form-row">
            <div class="form-group col">
              <label :for="'member-hy-' + index">Անուն Ազգանուն Հայերեն</label>
              <input v-model="member.hy.$model"
                     type="text"
                     :id="'member-hy-' + index"
                     class="form-control">
            </div>
            <div class="form-group col">
              <label :for="'member-ru-' + index">Անուն Ազգանուն Ռուսերեն</label>
              <input v-model="member.ru.$model"
                     type="text"
                     :id="'member-ru-' + index"
                     class="form-control">
            </div>
            <div v-if="evaluatorCommittee.evaluator_member.length > 1"
                 class="form-group col-auto d-flex justify-content-center align-items-center">
              <font-awesome-icon icon="times"
                                 @click="removeMemberInputRow(index)" style="cursor: pointer;" />
            </div>
          </div>
        </div>

        <div class="w-100">
          <p class="h5">Քարտուղար</p>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="evaluator-secretary-name-hy">Անուն Ազգանուն Հայերեն</label>
              <input v-model="$v.evaluatorCommittee.evaluator_secretary_name.hy.$model"
                     v-input-lng="'arm'"
                     type="text"
                     id="evaluator-secretary-name-hy"
                     class="form-control">
            </div>
            <div class="form-group col-md-6">
              <label for="evaluator-secretary-name-ru">Անուն Ազգանուն Ռուսերեն</label>
              <input v-model="$v.evaluatorCommittee.evaluator_secretary_name.ru.$model"
                     v-input-lng="'ru'"
                     type="text"
                     id="evaluator-secretary-name-ru"
                     class="form-control">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="secretary-email">Էլ. Հասցե</label>
              <input v-model="$v.evaluatorCommittee.evaluator_secretary_email.$model"
                     placeholder="info@mail.com"
                     :class="{'border-danger': wrongEmail}"
                     type="email"
                     id="secretary-email"
                     class="form-control">
              <span v-if="wrongEmail" class="small text-danger">Սխալ էլ. հասցե</span>
            </div>
            <div class="form-group col-md-6">
              <label for="secretary-phone">Հեռախոս</label>
              <the-mask v-model="$v.evaluatorCommittee.evaluator_secretary_phone.$model"
                        id="secretary-phone"
                        class="form-control"
                        placeholder="+(374)99-99-99-99"
                        mask="+(374) ##-##-##-##" />
            </div>
          </div>
        </div>
<!--        <div class="file-box-content mb-2 mt-4">-->
<!--          <div class="file-box pdf-hraman">-->
<!--            <a href="#" class="download-icon-link">-->
<!--              <i class="dripicons-download file-download-icon"></i>-->
<!--            </a>-->
<!--            <div class="text-center pdf-hraman">-->
<!--              <i class="far fa-file-pdf text-danger"></i>-->
<!--              <h6 class="text-truncate">Հրաման.pdf</h6>-->
<!--              <small class="text-muted">15 March 2019 / 8MB</small>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </template>
      <template v-else>
        <committee-commandment ref="committeeCommandment"/>
      </template>

    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('evaluator-committee-modal')" type="button" class="btn btn-light mr-3">
        <span>Չեղարկել</span>
      </button>
      <button v-if="isFormView" @click="save" type="button" class="btn btn-primary">
        <span>Պահպանել և դիտել հրամանը</span>
      </button>
      <button v-else @click="download" type="button" class="btn btn-primary">
        <span>Ներբեռնել հրամանը</span>
      </button>
    </div>
    <!-- <specification-modal @close="setSpecificationId"/> -->
  </modal>
</template>

<script>
  import { email, required } from 'vuelidate/lib/validators'
  import committeeCommandment from '@/views/fileManagment/competitive/firstStep/evaluation_committee_commandment'
  // import html2pdf from 'html2pdf.js'

  export default {
    name: 'EvaluatorCommitteeModal',
    components: { committeeCommandment },
    computed: {
      currentPlan() {
        return this.$store.getters['procurement/currentPlan']
      },
      currentOrganized() {
        return this.$store.getters['organizeOnePerson/currentOrganized']
      },
      locale() {
        return this.$store.getters['user/locale']
      },
      wrongEmail() {
        return this.$v.evaluatorCommittee.evaluator_secretary_email.required && !this.$v.evaluatorCommittee.evaluator_secretary_email.email
      }
    },
    data() {
      return this.getModalInitialState()
    },
    methods: {
      getModalInitialState() {
        return {
          isFormView: true,
          evaluatorCommittee: {
            evaluator_president: {
              hy: '',
              ru: ''
            },
            evaluator_secretary_name: {
              hy: '',
              ru: ''
            },
            evaluator_secretary_email: '',
            evaluator_secretary_phone: '',
            evaluator_member: [{
              hy: '',
              ru: ''
            }]
          },
        }
      },
      resetComponent() {
        Object.assign(this.$data, this.getModalInitialState())
      },
      addMemberInputRow() {
        this.$set(
          this.evaluatorCommittee, 
          'evaluator_member', 
          [...this.evaluatorCommittee.evaluator_member, { hy: '', ru: '' }]
        )
      },
      removeMemberInputRow(index) {
        this.evaluatorCommittee.evaluator_member.splice(index, 1)
        this.$set(
          this.evaluatorCommittee,
          'evaluator_member',
          this.evaluatorCommittee.evaluator_member
        )
      },
      beforeOpen() {
        this.resetComponent()
        this.evaluatorCommittee = Object.assign(this.evaluatorCommittee, {
          evaluator_president: this.currentOrganized.translations.evaluator_president[this.locale] ?
            // eslint-disable-next-line no-undef
            _.cloneDeep(this.currentOrganized.translations.evaluator_president) :
            {hy: '', ru: ''},
          evaluator_secretary_name: this.currentOrganized.translations.evaluator_secretary_name[this.locale] ?
            // eslint-disable-next-line no-undef
            _.cloneDeep(this.currentOrganized.translations.evaluator_secretary_name) :
            {hy: '', ru: ''},
          // eslint-disable-next-line no-undef
          evaluator_secretary_email: _.cloneDeep(this.currentOrganized.evaluator_secretary_email),
          // eslint-disable-next-line no-undef
          evaluator_secretary_phone: _.cloneDeep(this.currentOrganized.evaluator_secretary_phone),
          // eslint-disable-next-line no-undef
          evaluator_member: _.cloneDeep(this.currentOrganized.evaluator_member)
        })
      },
      save() {
        console.log('updated')
        this.$client.put(`organize/${this.currentOrganized.id}`, this.evaluatorCommittee).then(response => {
          console.log(response, 'updated')
          if(response.status) {
            this.$store.commit('organize/setCurrentOrganized', response.data.data)
            this.isFormView = false
          }
        }).catch(error =>{
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Դուք չեք մուտքագրել տվյալները'
          })
          console.log(error, 'updated')
        })
      },
      download() {
        console.log(this.$refs.committeeCommandment, 'this.$refs.committeeCommandment.$el.innerHTML')
        this.$refs.committeeCommandment.generatePdf()
        // html2pdf().set({
        //   margin: 12,
        //   filename: 'Հանձնաժողովի_հրաման.pdf',
        //   html2canvas: {
        //     scrollX: 0,
        //     scrollY: 0
        //   }
        // }).from(this.$refs.committeeCommandment.$el.innerHTML).save()

        // this.$modal.hide('evaluator-committee-modal')
      }
    },
    validations: {
      evaluatorCommittee: {
        evaluator_president: {
          hy: {required},
          ru: {required}
        },
        evaluator_secretary_name: {
          hy: {required},
          ru: {required}
        },
        evaluator_secretary_email: {email, required},
        evaluator_secretary_phone: {required},
        evaluator_member: {
          $each: {
            hy: {required},
            ru: {required}
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
