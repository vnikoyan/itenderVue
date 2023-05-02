<template>
    <div class="dropdown" v-if="currentPageDocs" :class="showMobileView && 'd-inline-block'">
      <button class="btn btn-light m-0 nav-user docs-btn"
        data-toggle="dropdown" href="#"
        role="button"
        aria-haspopup="false"
        aria-expanded="false"
        :class="!showMobileView ? '' : 'br-8'"
        :disabled="disabled"
      >
        <svg :class="!showMobileView && 'mr-2'" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.82031 19.1429C4.82031 20.0357 5.5346 20.75 6.42746 20.75H18.8382C19.731 20.75 20.4453 20.0357 20.4453 19.1429V4.85714C20.4453 3.96429 19.731 3.25 18.8382 3.25H6.42746C5.5346 3.25 4.82031 3.96429 4.82031 4.85714V19.1429ZM19.0167 19.3214H6.24888V4.67857H19.0167V19.3214ZM8.65962 7.08943H16.6953V8.518H8.65962V7.08943ZM16.6953 15.482H8.65962V16.9106H16.6953V15.482ZM8.65962 11.2857H16.6953V12.7143H8.65962V11.2857Z" fill="#006BE6"/>
        </svg>
        <span v-if="!showMobileView">Փաստաթղթեր</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right card">
        <a v-for="document in currentPageDocs"
          :key="document.title"
          @click.prevent="document.call"
          class="dropdown-item"
          :class="document.disabled && document.disabled() ? 'disabled' : document.main_doc && 'font-weight-bold'"
          href="">
          <svg class="mr-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.96143 9.01613V0.5H8.40373V9.01613L11.096 6.30645L12.1537 7.37097L8.69219 10.7581L7.6345 11.8226L6.67296 10.7581L3.21143 7.37097L4.26912 6.30645L6.96143 9.01613ZM13.692 13.9516V11.9193H15.2305V13.758C15.2305 14.7258 14.4612 15.5 13.4997 15.5H1.96124C0.999699 15.5 0.230469 14.7258 0.230469 13.758V11.9193H1.76893V13.9516H13.692Z" fill="#006BE6"/>
          </svg>
          <span v-if="+currentOrganized.cpv_type !== 1">{{ document.title }}</span>
          <span v-else>{{ document.title.replace(' (շուտով)','') }}</span>
        </a>
      </div>
  </div>
</template>

<script>
import isMobile from '@/mixins/isMobileView'
export default {
    name: 'DocumentsButton',
    mixins: [isMobile],
    props: ['disabled', 'mobileView'],
    mounted() {
      if(this.mobileView === 'true' && this.isMobile){
        this.showMobileView = true;
      }
    },
    computed: {
      currentPageDocs() {
        const action = this.$route.path.split('/')[1]
        if(action === 'organizator'){
          const organizeType = this.$route.path.split('/')[2]
          const page = this.$route.path.split('/')[3]
          if(organizeType === 'itender'){
            return this.documents[organizeType][page]
          }
        }
        if(action === 'organizing'){
          const page = this.$route.path.split('/')[3]
          const organizeType = this.$route.path.split('/')[2]
          if(organizeType === 'oneperson' && page === 'contract-preparation'){
            if(this.isOrganizeHeld){
              return this.documents[organizeType][page+'-held']
            } else {
              return this.documents[organizeType][page+'-declined']
            }
          }
          return this.documents[organizeType][page]
        } else {
          return false;
        }
      },
      currentOrganized() {
        const organizeType = this.$route.path.split('/')[2]
        if(organizeType === 'competitive'){
          return this.$store.getters['organize/currentOrganized']
        } else if(organizeType === 'itender'){
          return this.$store.getters['organizeItender/currentOrganized']
        } else {
          return this.$store.getters['organizeOnePerson/currentOrganized']
        }
      },
    },
    data(){
      return {
        showMobileView: false,
        documents: {
          competitive: {
            'prepare-invitation': [
              {
                title: 'Գնահատող հանձնաժողովի հրաման',
                call: () => {this.$modal.show('evaluator-committee-modal')}
              },
              {
                title: 'Արձանագրություն N 1',
                call: () => {
                  if(!this.currentOrganized.translations.evaluator_president.name){
                    this.$fire({
                      title: "Զգուշացում",
                      text: "Խնդրում ենք լրացնել գնահատող հանձնաժողովի հրամանը, փաստաթուղթը ստանալու համար",
                      type: "error",
                      confirmButtonText: 'Լավ'
                    })
                  } else {
                    this.$modal.show('new-editor-modal', {
                      action: 'save',
                      fileName: 'protocol_number_one',
                      editorTitle: 'Արձանագրություն N 1'
                    })
                  }
                }
              },
              {
                title: 'Պայմանագիր (հայերեն)',
                call: () => {
                  if(!this.currentOrganized.confirm){
                    this.$fire({
                      title: "Զգուշացում",
                      text: "Խնդրում ենք հաստատել ընթացակարգը, փաստաթուղթը ստանալու համար",
                      type: "error",
                      confirmButtonText: 'Լավ'
                    })
                  } else {
                    if(this.currentOrganized.evaluator_secretary_email === ""){
                      this.$fire({
                        title: "Զգուշացում",
                        text: "Պահպանեք գնահատող հանձնաժողովի հրամանը հրավերը ստանալու համար",
                        type: "error",
                        confirmButtonText: 'Լավ'
                      })
                    } else {
                      if(+this.currentOrganized.cpv_type === 3){
                       if(+this.currentOrganized.is_construction){
                          this.$modal.show('new-editor-modal', {
                            action: 'save',
                            fileName: 'contract_draft_work_construction',
                            editorTitle: 'Պայմանագրի նախագիծ'
                          })
                        } else {
                          this.$modal.show('new-editor-modal', {
                            action: 'save',
                            fileName: 'contract_draft_work',
                            editorTitle: 'Պայմանագրի նախագիծ'
                          })
                        }
                      } else if(+this.currentOrganized.cpv_type === 1){
                        this.$modal.show('new-editor-modal', {
                          action: 'save',
                          fileName: 'contract_draft_product',
                          editorTitle: 'Պայմանագրի նախագիծ'
                        })
                      } else {
                        this.$modal.show('new-editor-modal', {
                          action: 'save',
                          fileName: 'contract_draft_service',
                          editorTitle: 'Պայմանագրի նախագիծ'
                        })
                      }
                    }
                  }
                }
              },
              {
                title: `Պայմանագիր (ռուսերեն)`,
                call: () => {
                  if(!this.currentOrganized.confirm){
                    this.$fire({
                      title: "Զգուշացում",
                      text: "Խնդրում ենք հաստատել ընթացակարգը, փաստաթուղթը ստանալու համար",
                      type: "error",
                      confirmButtonText: 'Լավ'
                    })
                  } else {
                    if(+this.currentOrganized.cpv_type === 3){
                      if(+this.currentOrganized.is_construction){
                        this.$modal.show('new-editor-modal', {
                          action: 'save',
                          fileName: 'contract_draft_work_construction_ru',
                          editorTitle: 'Պայմանագրի'
                        })
                      }else {
                        this.$modal.show('new-editor-modal', {
                          action: 'save',
                          fileName: 'contract_draft_work_ru',
                          editorTitle: 'Договор'
                        })
                      }
                    } else if(+this.currentOrganized.cpv_type === 1){
                      this.$modal.show('new-editor-modal', {
                        action: 'save',
                        fileName: 'contract_draft_product_ru',
                        editorTitle: 'Договор'
                      })
                    } else {
                      this.$modal.show('new-editor-modal', {
                        action: 'save',
                        fileName: 'contract_draft_service_ru',
                        editorTitle: 'Պայմանագիր'
                      })
                    }
                  }
                }
              },
              {
                title: 'Գնման հայտ (մրցկացային)',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'purchase_request',
                    editorTitle: 'Գնման հայտ (մրցկացային)'
                  })
                }
              },
              {
                title: 'Գրանցամատյան',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'scrapbook',
                    editorTitle: 'Գրանցամատյան'
                  })
                }
              },
              // {
              //   title: 'Պայմանագիր (ռուսերեն)',
              //   call: () => {
              //     this.$modal.show('editor-modal', {
              //       fileName: 'contract',
              //       lng: 'ru',
              //       editorTitle: 'Պայմանագիր'
              //     })
              //   }
              // },
              {
                title: 'Հրավեր (հայերեն)',
                main_doc: true,
                call: () => {
                  if(this.currentOrganized.evaluator_secretary_email === ""){
                    this.$fire({
                      title: "Զգուշացում",
                      text: "Պահպանեք գնահատող հանձնաժողովի հրամանը հրավերը ստանալու համար",
                      type: "error",
                      confirmButtonText: 'Լավ'
                    })
                  } else if(this.currentOrganized.contract_html_hy === ""){
                    this.$fire({
                      title: "Զգուշացում",
                      text: "Պահպանեք պայմանագիրը (հայերեն) հրավերը ստանալու համար",
                      type: "error",
                      confirmButtonText: 'Լավ'
                    })
                  } else{
                    this.$modal.show('editor-modal', {
                      fileName: 'invitation',
                      action: 'download',
                      editorTitle: 'Հրավեր'
                    })
                  }
                }
              },
              {
                title: 'Հրավեր (ռուսերեն)',
                main_doc: true,
                call: () => {
                  if(this.currentOrganized.contract_html_ru === ""){
                    this.$fire({
                      title: "Զգուշացում",
                      text: "Պահպանեք պայմանագիրը (ռուսերեն) հրավերը ստանալու համար",
                      type: "error",
                      confirmButtonText: 'Լավ'
                    })
                  }else{
                    this.$modal.show('editor-modal', {
                      fileName: 'invitation',
                      lng: 'ru',
                      action: 'download',
                      editorTitle: 'Հրավեր'
                    })
                  }
                }
              }
            ],
            'application-evaluation': [
              {
                title: 'Ծանուցում բանակցությունների վերաբերյալ',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'save',
                    fileName: 'notice_of_negotiations',
                    editorTitle: 'Ծանուցում բանակցությունների վերաբերյալ'
                  })
                }
              },
              {
                title: 'Հայտարարություն շահերի բախման մասին',
                disabled: this.checkMandatoryNegotiations,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'statement_of_conflict_of_interest',
                    editorTitle: 'Հայտարարություն շահերի բախման մասին'
                  })
                }
              },
              {
                title: `Գնահատման թերթիկ - դատարկ`,
                disabled: this.checkMandatoryNegotiations,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'evaluation_sheet_empty',
                    editorTitle: `Գնահատման թերթիկ - դատարկ`
                  })
                }
              },
              {
                title: `Գնահատման թերթիկ`,
                disabled: this.checkMandatoryNegotiations,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'evaluation_sheet',
                    editorTitle: `Գնահատման թերթիկ`
                  })
                }
              },
              {
                title: 'Հարցում ՊԵԿ (պատճառաբանված որոշման դեպքում)',
                disabled: this.checkMandatoryNegotiations,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'save',
                    fileName: 'state_revenue_committee_survey',
                    editorTitle: 'Հարցում ՊԵԿ (պատճառաբանված որոշման դեպքում)'
                  })
                }
              },
              {
                title: 'Հայտարարություն չկայացած չափաբաժինների մասին',
                disabled: this.checkMandatoryNegotiations,
                call: () => {
                  if(this.isHasCanceledLotsCompetitive()){
                    this.$modal.show('new-editor-modal', {
                      action: 'download',
                      fileName: 'announce_procedure_buy_declined_hy',
                      editorTitle: 'Հայտարարություն չկայացած չափաբաժինների մասին'
                    })
                  } else {
                    this.$fire({
                      text: "Ընթացակարգում չկան չկայացած չափաբաժիններ",
                      type: "info",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
              {
                title: 'Հայտարարություն չկայացած չափաբաժինների մասին (ռուսերեն)',
                disabled: this.checkMandatoryNegotiations,
                call: () => {
                   if(this.isHasCanceledLotsCompetitive()){
                    this.$modal.show('new-editor-modal', {
                      action: 'download',
                      fileName: 'announce_procedure_buy_declined',
                      editorTitle: 'Հայտարարություն չկայացած չափաբաժինների մասին (ռուսերեն)'
                    })
                  } else {
                    this.$fire({
                      text: "Ընթացակարգում չկան չկայացած չափաբաժիններ",
                      type: "info",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
              {
                title: 'Բացման և գնահատման նիստի արձանագրություն',
                disabled: this.checkMandatoryNegotiations,
                main_doc: true,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'evaluation_session',
                    editorTitle: 'Բացման և գնահատման նիստի արձանագրություն'
                  })
                }
              },
              {
                title: 'Բացման և գնահատման նիստի արձանագրություն (ռուսերեն)',
                disabled: this.checkMandatoryNegotiations,
                main_doc: true,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'evaluation_session_ru',
                    editorTitle: 'Բացման և գնահատման նիստի արձանագրություն (ռուսերեն)'
                  })
                }
              },
              {
                title: 'Բացման և գնահատման նիստի արձանագրություն (հայերեն և ռուսերեն)',
                // disabled: this.comingSoon,
                main_doc: true,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'evaluation_session_mix',
                    editorTitle: 'Բացման և գնահատման նիստի արձանագրություն (հայերեն և ռուսերեն)'
                  })
                }
              },
              
            ],
            'contract-preparation': [
              {
                title: 'Պայմանագիր կնքելու որոշում',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_conc_hy',
                    editorTitle: 'Պայմանագիր կնքելու որոշում'
                  })
                }
              },
              {
                title: 'Պայմանագիր կնքելու որոշում (ռուսերեն)',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_conc',
                    editorTitle: 'Պայմանագիր կնքելու որոշում (ռուսերեն)'
                  })
                }
              },
              {
                title: 'Գնման ընթացակարգի արձանագրություն',
                call: () => {
                  if(this.isGreaterThanMln()){
                    this.$modal.show('new-editor-modal', {
                      action: 'download',
                      fileName: 'procurement_procedure_protocol',
                      editorTitle: 'Գնման ընթացակարգի արձանագրություն'
                    })
                  } else {
                    this.$fire({
                      text: "Տվյալ փաստաթուղթը հասանելի է միայն 1մլն. ից բարձր նախահաշվային գնով ընթացակարգերի համար",
                      type: "info",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
              {
                title: 'Գնման ընթացակարգի արձանագրություն չկայացած',
                call: () => {
                  if(this.isGreaterThanMln()){
                    this.$modal.show('new-editor-modal', {
                      action: 'download',
                      fileName: 'procurement_procedure_protocol_declined',
                      editorTitle: 'Գնման ընթացակարգի արձանագրություն չկայացած'
                    })
                  } else {
                    this.$fire({
                      text: "Տվյալ փաստաթուղթը հասանելի է միայն 1մլն. ից բարձր նախահաշվային գնով ընթացակարգերի համար",
                      type: "info",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
              {
                title: 'Կնքված պայմանագրի մասին հայտարարություն',
                main_doc: true,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_signed_contract',
                    editorTitle: 'Կնքված պայմանագրի մասին հայտարարություն'
                  })
                }
              },
              {
                title: 'Կնքված պայմանագրի մասին հայտարարություն (ռուսերեն)',
                main_doc: true,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_signed_contract_ru',
                    editorTitle: 'Կնքված պայմանագրի մասին հայտարարություն (ռուսերեն)'
                  })
                }
              },
            ],
          },
          oneperson: {
            'prepare-invitation': [
              {
                title: 'Պայմանագրի նախագիծ',
                call: () => {
                  if(this.currentOrganized.confirm){
                    if (+this.currentOrganized.cpv_type === 3){
                      if(+this.currentOrganized.is_construction){
                        this.$modal.show('new-editor-modal', {
                          action: 'save',
                          fileName: 'contract_draft_work_construction',
                          editorTitle: 'Պայմանագրի նախագիծ'
                        })
                      } else {
                        this.$modal.show('new-editor-modal', {
                          action: 'save',
                          fileName: 'contract_draft_work',
                          editorTitle: 'Պայմանագրի նախագիծ'
                        })
                      }
                    } else if(+this.currentOrganized.cpv_type === 1){
                      this.$modal.show('new-editor-modal', {
                        action: 'save',
                        fileName: 'contract_draft_product',
                        editorTitle: 'Պայմանագրի նախագիծ'
                      })
                    } else {
                      this.$modal.show('new-editor-modal', {
                        action: 'save',
                        fileName: 'contract_draft_service',
                        editorTitle: 'Պայմանագրի նախագիծ'
                      })
                    }
                   
                  } else {
                    this.$fire({
                      title: "Զգուշացում",
                      text: "Խնդրում ենք հաստատել ընթացակարգը, փաստաթուղթը ստանալու համար",
                      type: "error",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
            ],
            'contract-preparation-declined': [
              {
                title: 'Գնման հայտ',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'purchase_request',
                    editorTitle: 'Գնման հայտ'
                  })
                }
              },
              {
                title: 'Հայտերի գնահատման նիստի արձանագրություն',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'bid_evaluation_session',
                    editorTitle: 'Հայտերի գնահատման նիստի արձանագրություն'
                  })
                }
              },
              {
                title: 'Հայտարարություն գնման ընթացակարգը չկայացած հայտարարելու մասին',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_procedure_buy_declined',
                    editorTitle: 'Հայտարարություն գնման ընթացակարգը չկայացած հայտարարելու մասին'
                  })
                }
              },
              {
                title: 'Գնման ընթացակարգի արձանագրություն չկայացած',
                call: () => {
                  if(this.isGreaterThanMln()){
                    this.$modal.show('new-editor-modal', {
                      action: 'download',
                      fileName: 'procurement_procedure_protocol_declined',
                      editorTitle: 'Գնման ընթացակարգի արձանագրություն չկայացած'
                    })
                  } else {
                    this.$fire({
                      text: "Տվյալ փաստաթուղթը հասանելի է միայն 1մլն. ից բարձր նախահաշվային գնով ընթացակարգերի համար",
                      type: "info",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
            ],
            'contract-preparation-held': [
              {
                title: 'Հրավեր (ծանուցում)',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'save',
                    fileName: 'invitation_notification',
                    editorTitle: 'Հրավեր (ծանուցում)'
                  })
                }
              },
              {
                title: 'Գնման հայտ',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'purchase_request',
                    editorTitle: 'Գնման հայտ'
                  })
                }
              },
              {
                title: 'Հայտերի գնահատման նիստի արձանագրություն',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'bid_evaluation_session',
                    editorTitle: 'Հայտերի գնահատման նիստի արձանագրություն'
                  })
                }
              },
              {
                title: 'Պայմանագիր կնքելու որոշման մասին հայտարարություն',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_conc',
                    editorTitle: 'Պայմանագիր կնքելու որոշման մասին հայտարարություն'
                  })
                }
              },
              {
                title: 'Պայմանագիր կնքելու որոշման մասին հայտարարություն (ռուսերեն)',
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_conc_ru',
                    editorTitle: 'Պայմանագիր կնքելու որոշման մասին հայտարարություն (ռուսերեն)'
                  })
                }
              },
              {
                title: 'Հայտարարություն չկայացած չափաբաժինների մասին',
                call: () => {
                  if(this.isHasCanceledLots()){
                    this.$modal.show('new-editor-modal', {
                      action: 'download',
                      fileName: 'announce_procedure_buy_declined',
                      editorTitle: 'Հայտարարություն չկայացած չափաբաժինների մասին'
                    })
                  } else {
                    this.$fire({
                      text: "Ընթացակարգում չկան չկայացած չափաբաժիններ",
                      type: "info",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
              {
                title: 'Հայտարարություն չկայացած չափաբաժինների մասին (ռուսերեն)',
                call: () => {
                  if(this.isHasCanceledLots()){
                    this.$modal.show('new-editor-modal', {
                      action: 'download',
                      fileName: 'announce_procedure_buy_declined_ru',
                      editorTitle: 'Հայտարարություն չկայացած չափաբաժինների մասին (ռուսերեն)'
                    })
                  } else {
                    this.$fire({
                      text: "Ընթացակարգում չկան չկայացած չափաբաժիններ",
                      type: "info",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
              {
                title: 'Գնման ընթացակարգի արձանագրություն',
                call: () => {
                  if(this.isGreaterThanMln()){
                    this.$modal.show('new-editor-modal', {
                      action: 'download',
                      fileName: 'procurement_procedure_protocol',
                      editorTitle: 'Գնման ընթացակարգի արձանագրություն'
                    })
                  } else {
                    this.$fire({
                      text: "Տվյալ փաստաթուղթը հասանելի է միայն 1մլն. ից բարձր նախահաշվային գնով ընթացակարգերի համար",
                      type: "info",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
              {
                title: 'Կնքված պայմանագրի մասին հայտարարություն',
                main_doc: true,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_signed_contract',
                    editorTitle: 'Կնքված պայմանագրի մասին հայտարարություն'
                  })
                }
              },
              {
                title: 'Կնքված պայմանագրի մասին հայտարարություն (ռուսերեն)',
                main_doc: true,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'announce_signed_contract_ru',
                    editorTitle: 'Կնքված պայմանագրի մասին հայտարարություն (ռուսերեն)'
                  })
                }
              },
            ],
          },
          itender: {
            'prepare-invitation': [
              {
                title: 'Պայմանագրի նախագիծ',
                call: () => {
                  if(this.currentOrganized.confirm){
                    if (+this.currentOrganized.cpv_type === 3){
                      if(+this.currentOrganized.is_construction){
                        this.$modal.show('new-editor-modal', {
                          action: 'save',
                          fileName: 'contract_draft_work_construction',
                          editorTitle: 'Պայմանագրի նախագիծ'
                        })
                      } else {
                        this.$modal.show('new-editor-modal', {
                          action: 'save',
                          fileName: 'contract_draft_work',
                          editorTitle: 'Պայմանագրի նախագիծ'
                        })
                      }
                    } else if(+this.currentOrganized.cpv_type === 1){
                      this.$modal.show('new-editor-modal', {
                        action: 'save',
                        fileName: 'contract_draft_product',
                        editorTitle: 'Պայմանագրի նախագիծ'
                      })
                    } else {
                      this.$modal.show('new-editor-modal', {
                        action: 'save',
                        fileName: 'contract_draft_service',
                        editorTitle: 'Պայմանագրի նախագիծ'
                      })
                    }
                  } else {
                    this.$fire({
                      title: "Զգուշացում",
                      text: "Խնդրում ենք հաստատել ընթացակարգը, փաստաթուղթը ստանալու համար",
                      type: "error",
                      confirmButtonText: 'Լավ'
                    })
                  }
                }
              },
            ],
            'contract-preparation': [
              // {
              //   title: 'Գնման հայտ',
              //   call: () => {
              //     this.$modal.show('new-editor-modal', {
              //       action: 'download',
              //       fileName: 'purchase_request',
              //       editorTitle: 'Գնման հայտ'
              //     })
              //   }
              // },
              // {
              //   title: 'Հայտերի գնահատման նիստի արձանագրություն',
              //   call: () => {
              //     this.$modal.show('new-editor-modal', {
              //       action: 'download',
              //       fileName: 'bid_evaluation_session',
              //       editorTitle: 'Հայտերի գնահատման նիստի արձանագրություն'
              //     })
              //   }
              // },
              // {
              //   title: 'Պայմանագիր կնքելու որոշման մասին հայտարարություն',
              //   call: () => {
              //     this.$modal.show('new-editor-modal', {
              //       action: 'download',
              //       fileName: 'announce_conc',
              //       editorTitle: 'Պայմանագիր կնքելու որոշման մասին հայտարարություն'
              //     })
              //   }
              // },
              // {
              //   title: 'Պայմանագիր կնքելու որոշման մասին հայտարարություն (ռուսերեն)',
              //   call: () => {
              //     this.$modal.show('new-editor-modal', {
              //       action: 'download',
              //       fileName: 'announce_conc_ru',
              //       editorTitle: 'Պայմանագիր կնքելու որոշման մասին հայտարարություն (ռուսերեն)'
              //     })
              //   }
              // },
              // {
              //   title: 'Հայտարարություն չկայացած չափաբաժինների մասին',
              //   call: () => {
              //     if(this.isHasCanceledLots()){
              //       this.$modal.show('new-editor-modal', {
              //         action: 'download',
              //         fileName: 'announce_procedure_buy_declined',
              //         editorTitle: 'Հայտարարություն չկայացած չափաբաժինների մասին'
              //       })
              //     } else {
              //       this.$fire({
              //         text: "Ընթացակարգում չկան չկայացած չափաբաժիններ",
              //         type: "info",
              //         confirmButtonText: 'Լավ'
              //       })
              //     }
              //   }
              // },
              // {
              //   title: 'Հայտարարություն չկայացած չափաբաժինների մասին (ռուսերեն)',
              //   call: () => {
              //     if(this.isHasCanceledLots()){
              //       this.$modal.show('new-editor-modal', {
              //         action: 'download',
              //         fileName: 'announce_procedure_buy_declined_ru',
              //         editorTitle: 'Հայտարարություն չկայացած չափաբաժինների մասին (ռուսերեն)'
              //       })
              //     } else {
              //       this.$fire({
              //         text: "Ընթացակարգում չկան չկայացած չափաբաժիններ",
              //         type: "info",
              //         confirmButtonText: 'Լավ'
              //       })
              //     }
              //   }
              // },
              // {
              //   title: 'Գնման ընթացակարգի արձանագրություն',
              //   call: () => {
              //     if(this.isGreaterThanMln()){
              //       this.$modal.show('new-editor-modal', {
              //         action: 'download',
              //         fileName: 'procurement_procedure_protocol',
              //         editorTitle: 'Գնման ընթացակարգի արձանագրություն'
              //       })
              //     } else {
              //       this.$fire({
              //         text: "Տվյալ փաստաթուղթը հասանելի է միայն 1մլն. ից բարձր նախահաշվային գնով ընթացակարգերի համար",
              //         type: "info",
              //         confirmButtonText: 'Լավ'
              //       })
              //     }
              //   }
              // },
              {
                title: 'Հաշվետվություն',
                main_doc: true,
                call: () => {
                  this.$modal.show('new-editor-modal', {
                    action: 'download',
                    fileName: 'report',
                    editorTitle: 'Հաշվետվություն'
                  })
                }
              },
              // {
              //   title: 'Կնքված պայմանագրի մասին հայտարարություն (ռուսերեն)',
              //   main_doc: true,
              //   call: () => {
              //     this.$modal.show('new-editor-modal', {
              //       action: 'download',
              //       fileName: 'announce_signed_contract_ru',
              //       editorTitle: 'Կնքված պայմանագրի մասին հայտարարություն (ռուսերեն)'
              //     })
              //   }
              // },
            ],
          }
        },
      }
    },
};
</script>

<style scoped>
.btn{
  /* padding: 6px 8px; */
  height: 100%;
}
.dropdown-menu{
  padding: 8px 0;;
}
.dropdown-menu span {
  font-weight: 550;
}
.dropdown-item{
  /* height: 30px; */
  padding: 8px 20px;
}
</style>