<template>
  <modal
    class="report-modal"
    name="report-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="beforeOpen"
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
        <p>Հաշվետվություն</p>
      </div>
      <button type="button"
            class="close position-absolute"
            style="right: 1.25rem; top: 25%"
            @click="$modal.hide('report-modal')"
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
          <section slot="pdf-content" contenteditable="true">
                <p style="text-align: center;"><b>ՀԱՇՎԵՏՎՈՒԹՅՈՒՆ</b></p>
                <p style="text-align: center;">iTender համակարգում տեղադրված մրցույթի մասին</p>
                <br/>
                <table 
                    style="width: 100%;
                    table-layout: fixed;
                    border-collapse: collapse;
                    page-break-inside: avoid;
                    border: 1px solid  black;
                    text-align: center;"
                >
                    <tr>
                        <td
                            style="border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >
                            Կազմակերպիչի անվանումը
                        </td>
                        <td
                            style="border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >
                            {{customerName}}
                        </td>
                    </tr>
                    <tr>
                        <td
                            style="border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >
                            Մրցույթի անվանումը
                        </td>
                        <td
                            style="border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >
                            {{tender.title || '-'}}
                        </td>
                    </tr>
                    <tr>
                        <td
                         style="border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >Մրցույթի ծածկագիրը</td>
                        <td
                         style="border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >{{tender.password || '-'}}</td>
                    </tr>
                    <tr>
                        <td
                         style="border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >Հրապարակման ամսաթիվը</td>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >{{tender.opening_date}}</td>
                    </tr>
                    <tr>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >Վերջնաժամկետի ամսաթիվը</td>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >{{tender.finish_date}}</td>
                    </tr>
                    <tr>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >Մարզը</td>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >{{tender.region}}</td>
                    </tr>
                    <tr>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >Տեսակը</td>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >{{tender.type === "PAPER" ? 'Թղթային' : 'Էլեկտրոնային'}}</td>
                    </tr>
                    <tr>
                        <td
                         style=" border: 1px solid  black;
                                                        border-collapse: collapse;"
                        >Նախահաշվային գինը</td>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >{{tender.price || '-'}}</td>
                    </tr>
                    <tr>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >Երաշխիքով</td>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >{{tender.guaranteed ? 'Այո' : 'Ոչ'}}</td>
                    </tr>
                    <tr>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >Ծանուցում ստացած հնարավոր մասնակիցների քանակը</td>
                        <td
                         style=" border: 1px solid  black; border-collapse: collapse;padding:10px"
                        >{{tender.participants_count}}</td>
                    </tr>
                </table>

          </section>
      </vue-html2pdf>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('report-modal')" class="btn btn-light mr-3">
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
  name: 'ReportModal',
      components: {
        VueHtml2pdf,
    },
  data () {
    return {
      organize: {},
      tender: '',
      isLoading: false,
      customerName: '',
    }
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    download() {
      this.sendToPDFGeneration(this, this.$refs.html2Pdf.$el.innerHTML, 'Պայմանագիր', () => {this.isLoading = false})
    },
    consoleLog(data){
      console.log(data)
    },
    beforeOpen({params}) {
        console.log(params)
        console.log(this.me)
        this.tender = params
        const organisation = this.me.organisation[0];
        console.log(organisation)
        if(organisation.id_card_number){
            this.customerName = organisation.translations.name.hy
        } else {
            this.customerName = `«${organisation.translations.name.hy}» ${organisation.translations.company_type.hy}`
        }
        console.log(this.customerName) 
    },
  }
}
</script>

<style scoped>

</style>

