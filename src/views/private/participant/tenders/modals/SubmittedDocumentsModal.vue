<template>
  <modal 
    class="submitted-documents-modal"
    name="submitted-documents-modal"
    @closed="$emit('updateComparisonData')"
    @before-close="beforeClose"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="35%"
    height="75%"
  >
    <div id="modal-header">
        <div class="w-75">
            <p>Հաղթելուց հետո ներկայացվող փաստաթղթեր</p>
        </div>
        <button 
          type="button"
          class="close position-absolute"
          style="right: 1.25rem; top: 25%"
          @click="$modal.hide('submitted-documents-modal')"
          aria-label="Close"
        >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
        </button>
    </div>
    <div id="modal-body">
      <h4 class="title-heading">Պատվիրատուի</h4>
      <div class="row m-0 p-0">
        <div class="col-md-6 p-0 flex-column left-block">
            <float-label>
              <input placeholder="ՀՎՀՀ" type="number" id="hvhh" class="submitted-documents-block-input" v-model="$v.fields.hvhh.$model">
            </float-label>
            <float-label class="long-placeholder">
              <input placeholder="Սպասարկող Ֆինանսական կազմակերպություն (բանկ)`" type="text" id="bank" class="submitted-documents-block-input" v-model.trim="$v.fields.bank.$model">
            </float-label>
            <float-label>
              <input placeholder="Հաշվի համարը (հշ.N)" type="number" id="cashNumbers" class="submitted-documents-block-input m-0" v-model.number="$v.fields.cashNumbers.$model" >
              <!-- <input placeholder="Հաշվի համարը (հշ.N)" @keypress="isNumber" type="text" id="cashNumbers" class="submitted-documents-block-input m-0" v-model="$v.fields.cashNumbers.$model" > -->
            </float-label>
        </div>
        <div class="col-md-6 p-0 flex-column right-block">
            <float-label class="very-long-placeholder">
              <input placeholder="Գնման ընդհանուր գինը /եթե գնման գինը պակաս է պայմանագրի գնից, ապա պայմանագրի ընդհանուր գինը/" type="number" id="sum" class="submitted-documents-block-input" v-model.number="$v.fields.sum.$model" >
            </float-label>
            <float-label>
              <input placeholder="Ներկայացման ամսաթիվ"  type="text" id="date" class="submitted-documents-block-input" v-mask="'##/##/####'" v-model.trim="$v.fields.date.$model">
            </float-label>
            <float-label class="long-placeholder">
              <input placeholder="Ընկերության տնօրենի անձնագրային տվյալներ" type="text" id="document1" class="submitted-documents-block-input m-0" v-model.trim="$v.fields.document.$model">
            </float-label>
        </div>
      </div>
      <div class="d_flex flex-column padding-t-20" :class="{'d-none' : showDocuments}">
        <p class="text-center font-weight-bold">Հաղթելուց հետո ներկայացվող փաստաթղթեր</p>
        <div class="row m-0 p-0 justify-content-center">
          <div class="col-auto p-0 text-center padding-r-8 padding-b-8">
            <button
                @click="$modal.show('new-editor-modal', {
                          action: 'download',
                          fileName: 'application_announcement_writing',
                          tender: {...tender, fields},
                          editorTitle: `Գրություն`,
                })"
                type="button"
                class="btn btn-light"
              >
                  <svg class="mr-2" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.6875 16.3929C0.6875 17.2857 1.40179 18 2.29464 18H14.7054C15.5982 18 16.3125 17.2857 16.3125 16.3929V2.10714C16.3125 1.21429 15.5982 0.5 14.7054 0.5H2.29464C1.40179 0.5 0.6875 1.21429 0.6875 2.10714V16.3929ZM14.8839 16.5714H2.11607V1.92857H14.8839V16.5714ZM4.52681 4.33943H12.5625V5.768H4.52681V4.33943ZM12.5625 12.732H4.52681V14.1606H12.5625V12.732ZM4.52681 8.53572H12.5625V9.96429H4.52681V8.53572Z" fill="#006BE6"/>
                  </svg>
                  <span>Գրություն</span>
            </button>
          </div>
          <div class="col-auto p-0 text-center padding-b-8">
            <button
                @click="$modal.show('new-editor-modal', {
                          action: 'download',
                          fileName: 'application_announcement_contract_security',
                          tender: {...tender, fields},
                          editorTitle: `Պայմանագրի ապահովում`,
                })"
                type="button"
                class="btn btn-light"
              >
                <svg class="mr-2" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.6875 16.3929C0.6875 17.2857 1.40179 18 2.29464 18H14.7054C15.5982 18 16.3125 17.2857 16.3125 16.3929V2.10714C16.3125 1.21429 15.5982 0.5 14.7054 0.5H2.29464C1.40179 0.5 0.6875 1.21429 0.6875 2.10714V16.3929ZM14.8839 16.5714H2.11607V1.92857H14.8839V16.5714ZM4.52681 4.33943H12.5625V5.768H4.52681V4.33943ZM12.5625 12.732H4.52681V14.1606H12.5625V12.732ZM4.52681 8.53572H12.5625V9.96429H4.52681V8.53572Z" fill="#006BE6"/>
                </svg>
                <span>Պայմանագրի ապահովում</span>
            </button>
          </div>
          <div class="col-12 p-0 text-center padding-b-8">
            <button
                @click="$modal.show('new-editor-modal', {
                          action: 'download',
                          fileName: 'application_announcement_qualification_assurance',
                          tender: {...tender, fields},
                          editorTitle: `Որակավորման ապահովում`,
                })"
                type="button"
                class="btn btn-light"
              >
                <svg class="mr-2" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.6875 16.3929C0.6875 17.2857 1.40179 18 2.29464 18H14.7054C15.5982 18 16.3125 17.2857 16.3125 16.3929V2.10714C16.3125 1.21429 15.5982 0.5 14.7054 0.5H2.29464C1.40179 0.5 0.6875 1.21429 0.6875 2.10714V16.3929ZM14.8839 16.5714H2.11607V1.92857H14.8839V16.5714ZM4.52681 4.33943H12.5625V5.768H4.52681V4.33943ZM12.5625 12.732H4.52681V14.1606H12.5625V12.732ZM4.52681 8.53572H12.5625V9.96429H4.52681V8.53572Z" fill="#006BE6"/>
                </svg>
                <span>Որակավորման ապահովում</span>
            </button>
          </div>
          
        </div>
        <div class="col-12 p-0 text-center">
          <div v-tooltip="userPackage !== 'Գոլդ' && 'Տվյալ հնարավորությունից օգտվելու համար անհրաժեշտ է ունենալ գոլդ փաթեթ'">
            <button
                @click="sendToContractManagement"
                :disabled="userPackage !== 'Գոլդ'"
                type="button"
                class="btn btn-light"
              >
                <span>Կազմել ընդունման-հանձնման արձանագրությունները</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-footer" class="text-center">
      <button
          @click="submit"
          type="button"
          class="btn btn-primary br-8"
          style="width: fit-content"
      >
        <span>Հաստատել</span>
      </button>
    </div>

    </modal>    
</template>
<script>
  import {required} from 'vuelidate/lib/validators'
  export default{
    data(){
      return{
        getSubmittedDocuments : {},
        allParams: {},
        fields: {
          hvhh: '',
          bank: '',
          cashNumbers: '',
          sum: '',
          date: '',
          document: '',
        },
        showDocuments: true,
        tender: {},
        realBeneficiaries: [
          {
            name_surname: '',
            armenian_card_number: '',
            international_card_number: '',
          }
        ],
        items: {},
      }
    },
    validations() {
      return {
        fields: {
          hvhh: { required },
          bank: { required },
          cashNumbers: { required },
          sum: { required},
          date: { required },
          document: { required }
        },
      }
    },
    mounted(){

    },
    methods: {
      submit() {
        console.log(this.$v.fields)
        if (this.$v.fields.$invalid) {
          this.showDocuments = true
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Լրացրեք բոլոր դաշտերը!'
          })
        }else {
          this.showDocuments = false
        }
      },
      isNumber (evt){
        const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_'];
        const keyPressed = evt.key;
        console.log('aa')
        if (!keysAllowed.includes(keyPressed)) {
          evt.preventDefault()
        }
      },
      sendToContractManagement(){
        if(this.userPackage !== 'Գոլդ'){
          this.$notify({
            group: 'foo',
            type: 'info',
            text: 'Այս հնարավորությունից օգտվելու համար անհրաժեշտ է ունենալ Գոլդ փաթեթ'
          })
        } else {
          this.getSubmittedDocumentData(this.fields)
          const contractRequest = {
            code: this.tender.tender.password,
            type: this.tender.tender.cpv_type,
            from_application: true,
            is_sign: true,
            provider_user_id: this.me.id,
            client: {
              name: this.tender.tender.organizator,
              tin: this.fields.hvhh,
              bank: this.fields.bank,
              account_number: this.fields.cashNumbers,
            },
          };
          this.$client.post(`contract/fromApplication`, contractRequest).then((response) => {
            if(response){
              this.$router.push('/participant/contract-management/contracts')
            }
          }).catch(e => {
            console.log(e)
          })
        }
      },
      beforeClose(){
        console.log('beforeClose fields', this.fields)
        this.getSubmittedDocumentData(this.fields)
      },
      async beforeOpen({params}){
        console.log(params)
        this.getSubmittedDocumentData = params.tender.getSubmittedDocumentData
        this.tender = params.tender
        if(params.tender.submittedDocumentData){
          this.fields = params.tender.submittedDocumentData
          console.log('BEFORE', this.fields)
          console.log('BEFORE', this.fields.cashNumbers)
        }
      },
    },
    computed: {
      userPackage() {
        return this.$store.getters.userPackage
      },
      me() {
        return this.$store.getters['user/me']
      },
    },
  }
</script>

<style scoped>
  .left-block{
    padding-right: 7.5px !important;
  }
  .right-block{
    padding-left: 7.5px !important;
  }
  .submitted-documents-modal #modal-body{
    padding: 20px 30px;
  }
  .title-heading{
    margin-bottom: 46px;
  }
  .submitted-documents-block-input{
    background: #FFFFFF;
    border: 1px solid #DADDE6;
    border-radius: 12px;
    height: 48px;
    margin-bottom: 46px;
    font-size: 14px;
    padding: 14px 16px;
    width: 100%;
  }
  .d_flex{
    display: flex;
  }
  @media (max-width: 768px) {
    .left-block{
      padding-right: 0 !important;
      margin-bottom: 46px;
    }
    .right-block{
      padding-left: 0 !important;
    }
  }
</style>
