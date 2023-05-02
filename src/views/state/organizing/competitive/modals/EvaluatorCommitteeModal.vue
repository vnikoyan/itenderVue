<template>
  <modal 
    class="evaluator-committee-modal"
    name="evaluator-committee-modal"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="80%"
  >
    <div id="modal-header">
        <div class="w-75 d-flex">
            <p>Գնահատող Հանձնաժողով</p>
        </div>
        <button type="button"
                class="close position-absolute"
                style="right: 1.25rem; top: 25%"
                @click="$modal.hide('evaluator-committee-modal')"
                aria-label="Close"
        >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
            </svg>
        </button>
    </div>
    <div id="modal-body">
      <div class="p-2">
        <template v-if="isFormView">
          <p class="h5">Նախագահ</p>
          <div class="form-row m-0 p-0">
            <div class="form-group col-md-6">
              <label for="evaluator-president-hy">Անուն Ազգանուն Հայերեն</label>
              <input v-model="$v.evaluatorCommittee.evaluator_president.name.hy.$model"
                     type="text"
                     id="evaluator-president-hy"
                     class="form-control">
            </div>
            <div class="form-group col-md-6">
              <label for="evaluator-president-ru">Անուն Ազգանուն Ռուսերեն</label>
              <input v-model="$v.evaluatorCommittee.evaluator_president.name.ru.$model"
                     type="text"
                     id="evaluator-president-ru"
                     class="form-control">
            </div>
            <div class="form-group col">
                <label for="evaluator-president-position-hy">Պաշտոն Հայերեն</label>
                <input v-model="$v.evaluatorCommittee.evaluator_president.position.hy.$model"
                       type="text"
                      id="evaluator-president-position-hy"
                       class="form-control">
              </div>
              <div class="form-group col">
                <label for="evaluator-president-position-ru">Պաշտոն Ռուսերեն</label>
                <input v-model="$v.evaluatorCommittee.evaluator_president.position.ru.$model"
                       type="text"
                       id="evaluator-president-position-ru"
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
                 :key="index" class="form-row m-0 p-0">
              <div class="form-group col">
                <label :for="'member-hy-' + index">Անուն Ազգանուն Հայերեն</label>
                <input v-model="member.name.hy.$model"
                       type="text"
                       :id="'member-hy-' + index"
                       class="form-control">
              </div>
              <div class="form-group col">
                <label :for="'member-ru-' + index">Անուն Ազգանուն Ռուսերեն</label>
                <input v-model="member.name.ru.$model"
                       type="text"
                       :id="'member-ru-' + index"
                       class="form-control">
              </div>
              <div class="form-group col">
                <label :for="'member-hy-' + index">Պաշտոն Հայերեն</label>
                <input v-model="member.position.hy.$model"
                       type="text"
                       :id="'member-hy-' + index"
                       class="form-control">
              </div>
              <div class="form-group col">
                <label :for="'member-ru-' + index">Պաշտոն Ռուսերեն</label>
                <input v-model="member.position.ru.$model"
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
            <div class="form-row m-0 p-0">
              <div class="form-group col-md-6">
                <label for="evaluator-secretary-name-hy">Անուն Ազգանուն Հայերեն</label>
                <input v-model="$v.evaluatorCommittee.evaluator_secretary_name.hy.$model"
                       type="text"
                       id="evaluator-secretary-name-hy"
                       class="form-control">
              </div>
              <div class="form-group col-md-6">
                <label for="evaluator-secretary-name-ru">Անուն Ազգանուն Ռուսերեն</label>
                <input v-model="$v.evaluatorCommittee.evaluator_secretary_name.ru.$model"
                       type="text"
                       id="evaluator-secretary-name-ru"
                       class="form-control">
              </div>
              <div class="form-group col-md-6">
                <label for="evaluator-secretary-name-hy">Պաշտոն Հայերեն</label>
                <input v-model="$v.evaluatorCommittee.evaluator_secretary_position.hy.$model"
                       type="text"
                       id="evaluator-secretary-name-hy"
                       class="form-control">
              </div>
              <div class="form-group col-md-6">
                <label for="evaluator-secretary-name-ru">Պաշտոն Ռուսերեն</label>
                <input v-model="$v.evaluatorCommittee.evaluator_secretary_position.ru.$model"
                       type="text"
                       id="evaluator-secretary-name-ru"
                       class="form-control">
              </div>
            </div>
            <div class="form-row m-0 p-0">
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
                          placeholder="099-99-99-99"
                          mask="###-##-##-##" />
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
          <committee-commandment :handleLoadStart="handleLoadStart" :handleLoadEnd="handleLoadEnd" ref="committeeCommandment"/>
        </template>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('evaluator-committee-modal')" type="button" class="btn btn-light mr-3">
        <span>Չեղարկել</span>
      </button>
      <button v-if="isFormView" @click="save" type="button" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
        <span>Պահպանել և դիտել հրամանը</span>
      </button>
      <button v-else @click="download" type="button" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
        <span>Հաստատել և ներբեռնել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'
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
        return this.$store.getters['organize/currentOrganized']
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
      consoleLog(e){
        console.log(e)
      },
      handleLoadStart(){
        this.isLoading = true;
      },
      handleLoadEnd(){
        this.isLoading = false;
      },
      getModalInitialState() {
        return {
          isLoading: false,
          isFormView: true,
          evaluatorCommittee: {
            evaluator_president: {
              name: {
                hy: '',
                ru: ''
              },
              position: {
                hy: '',
                ru: ''
              },
            },
            evaluator_secretary_name: {
              hy: '',
              ru: ''
            },
            evaluator_secretary_position: {
              hy: '',
              ru: ''
            },
            evaluator_secretary_email: '',
            evaluator_secretary_phone: '',
            evaluator_member: [{
              name: {
                hy: '',
                ru: ''
              },
              position: {
                hy: '',
                ru: ''
              },
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
          [...this.evaluatorCommittee.evaluator_member, { 
            name: {
              hy: '',
              ru: ''
            },
            position: {
              hy: '',
              ru: ''
            },
           }]
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
        this.resetComponent();
        this.evaluatorCommittee = Object.assign(this.evaluatorCommittee, {
          evaluator_president: this.currentOrganized.translations.evaluator_president.name[this.locale] ?
            // eslint-disable-next-line no-undef
            _.cloneDeep(this.currentOrganized.translations.evaluator_president) :
            {
              name: {
                hy: '',
                ru: ''
              },
              position: {
                hy: '',
                ru: ''
              },
            },
          evaluator_secretary_position: this.currentOrganized.translations.evaluator_secretary_position[this.locale] ?
            // eslint-disable-next-line no-undef
            _.cloneDeep(this.currentOrganized.translations.evaluator_secretary_position) :
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
        if(!this.$v.evaluatorCommittee.evaluator_member.$invalid){
          if(!this.$v.evaluatorCommittee.$invalid) {
            this.isLoading = true;
            this.$client.put(`organize/${this.currentOrganized.id}`, this.evaluatorCommittee).then(response => {
              if(response.status) {
                this.isLoading = false;
                this.$store.commit('organize/setCurrentOrganized', response.data.data)
                this.isFormView = false
              }
            }).catch(() =>{
              this.isLoading = false;
              this.$notify({
                group: 'foo',
                type: 'error',
                text: 'Դուք չեք մուտքագրել տվյալները'
              })
            })
          } else {
            this.$notify({
              group: 'foo',
              type: 'error',
              text: 'Դուք չեք մուտքագրել տվյալները'
            })
          }
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Անդամների քանակը պետք է լինի 3-9 միջակայքում'
          })
        }
      },
      download() {
        this.isLoading = true;
        this.$refs.committeeCommandment.generatePdf()
        this.isLoading = false;
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
          name: {
            hy: {required},
            ru: {required}
          },
          position: {
            hy: {required},
            ru: {required}
          },
        },
        evaluator_secretary_name:{
          hy: {required},
          ru: {required}
        },
        evaluator_secretary_position:{
          hy: {required},
          ru: {required}
        },
        evaluator_secretary_email: {email, required},
        evaluator_secretary_phone: {required},
        evaluator_member: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(9),
          $each: {
            name: {
              hy: {required},
              ru: {required}
            },
            position: {
              hy: {required},
              ru: {required}
            },
          }
        }
      }
    }
  }
</script>

<style scoped>
  @media (max-width: 768px) {
    .evaluator-committee-modal /deep/ .vm--modal {
      height: 90% !important;
      margin: auto 20px;
      width: auto !important;
      top: 0 !important;
      bottom: 0 !important;
      right: 0 !important;
      left: 0 !important;
      position: absolute;
    }
    .evaluator-committee-modal /deep/ .vm--modal #modal-body{
      padding: 16px 8px 8px;
    }
  }
</style>
