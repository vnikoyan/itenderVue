<template>
  <modal 
    class="contract-modal"
    name="contract-modal"
    @before-open="beforeOpen"
    @before-close="isLoaded=false"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="80%"
    style="z-index: 2011;"
  >
    <div id="modal-header">
        <div class="w-75 d-flex">
            <p>Պայմանագիր</p>
        </div>
        <button type="button"
                class="close position-absolute"
                style="right: 1.25rem; top: 25%"
                @click="()=>{$modal.hide('contract-modal');isLoaded=false}"
                aria-label="Close"
        >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
            </svg>
        </button>
    </div>
    <div id="modal-body">
      <vue-html2pdf
          :show-layout="true"
          :float-layout="false"
          :enable-download="false"
          v-show="true"
          @beforeDownload="beforeDownload($event)"
          :paginate-elements-by-height="900"
          filename="Պայմանագրի նախագիծ"
          :pdf-quality="2"
          pdf-content-width="auto"
          :html-to-pdf-options="{
              margin: [5, 5, 0, 5],
              filename: 'Պայմանագրի նախագիծ',
              jsPDF: { format: 'a4', orientation: 'portrait' },
              html2canvas: {
                  scrollX: 0,
                  scrollY: 0
              }
          }"
          ref="html2Pdf"
      >
          <section slot="pdf-content" contenteditable="true" v-html="content"></section>
      </vue-html2pdf>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('contract-modal')" class="btn btn-light mr-3">
        <span>Փակել</span>
      </button>
      <button aria-expanded="false" :disabled="isLoading" @click="download" type="button" class="btn btn-primary">
        <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.23096 9.01613V0.5H8.67326V9.01613L11.3656 6.30645L12.4233 7.37097L8.96173 10.7581L7.90403 11.8226L6.9425 10.7581L3.48096 7.37097L4.53865 6.30645L7.23096 9.01613ZM13.9615 13.9516V11.9193H15.5V13.758C15.5 14.7258 14.7308 15.5 13.7692 15.5H2.23077C1.26923 15.5 0.5 14.7258 0.5 13.758V11.9193H2.03846V13.9516H13.9615Z" fill="#F0F7FF"/>
        </svg>
        <span>Բեռնել</span>
        <span v-if="isLoading" class="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>
    </div>
  </modal>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: 'ContractModal',
      components: {
        VueHtml2pdf,
    },
  data () {
    return {
      organize: {},
      content: '',
      isLoading: false,
    }
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    download() {
      this.sendToPDFGeneration(this, this.content, 'Պայմանագիր', () => {this.isLoading = false})
    },
    consoleLog(data){
      console.log(data)
    },
    beforeOpen({params}) {
      this.organize = params.organize
      const me = this.organize.winners.find(winner => winner.user_id === this.me.id)
      this.content = me.signed_contract_hy
    },
    handleLotInputsFocus(event, details) {
      // eslint-disable-next-line eqeqeq
      if(event.target.value == 0) {
        event.target.select()
      }
      this.focusedLotFields = details
    },
  }
}
</script>

<style scoped>
  .searchItem:hover {
    background-color: #006BE6;
    color: #fff;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
<style>
.table-1 {
    page-break-inside: avoid;
}
.table-1 {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    page-break-inside: avoid;
}
.table-1{
    border: 1px solid  black;
    border-collapse: collapse;
    margin: 20px auto;
    padding-bottom: 50px;
    text-align: center;
}
.table-1 tr th{
    border: 1px solid  black;
    border-collapse: collapse;
    font-size: 12px;
    padding: 8px 18px;
}
.table-1 tr td{
    border: 1px solid  black;
    border-collapse: collapse;
    text-align: center;
    padding: 7px 7px;
    font-size: 14px;
}
.big-table td{
    font-size: 8px !important;
    padding: 5px !important;
}
.big-table th{
    font-size: 10px !important;
    padding: 5px !important;
}
</style>

