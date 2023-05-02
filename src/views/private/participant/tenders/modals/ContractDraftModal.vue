<template>
  <modal 
    class="contract-draft-modal"
    name="contract-draft-modal"
    @closed="$emit('updateComparisonData')"
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
          <p>Պայմանագրի նախագիծ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('contract-draft-modal')"
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
      <button @click="$modal.hide('contract-draft-modal')" class="btn btn-light mr-3">
        <span>Փակել</span>
      </button>
      <button @click="download" type="button" class="btn btn-primary" aria-expanded="false" >
        <span class="mr-2">Բեռնել</span>
        <font-awesome-icon :icon="['fas', 'download']"/>
      </button>
    </div>
  </modal>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: 'ContractDraftModal',
      components: {
        VueHtml2pdf,
    },
  data () {
    return {
      organize: {},
      content: '',
    }
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    download() {
      this.sendToPDFGeneration(this, this.content, 'Պայմանագրի նախագիծ', () => {this.isLoading = false})
    },
    async beforeDownload({ html2pdf, options, pdfContent }) {
      await html2pdf()
        .set(options)
        .from(pdfContent)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            const totalPages = pdf.internal.getNumberOfPages()
            pdf.setPage(totalPages.length-1)
            pdf.setFontSize(10)
            pdf.setTextColor('#0000ff')
            pdf.text(
                'iTender©\nwww.iTender.am',
                pdf.internal.pageSize.getWidth() * 0.06,
                pdf.internal.pageSize.getHeight() * 0.95
            )
        })
        .save()
    },
    consoleLog(data){
      console.log(data)
    },
    beforeOpen({params}) {
      this.content = params.organize.contract
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
  @media (max-width: 768px) {
    .contract-draft-modal /deep/ .vm--modal {
      height: 90% !important;
      margin: auto 20px;
      width: auto !important;
      top: 0 !important;
      bottom: 0 !important;
      right: 0 !important;
      left: 0 !important;
      position: absolute;
    }

  }
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

