<template>
    <modal
        class="new-editor-modal"
        name="new-editor-modal"
        @before-open="handleBeforeOpen"
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
                <p>{{ editorTitle }}</p>
            </div>
            <button type="button"
                    class="close position-absolute"
                    style="right: 1.25rem; top: 25%"
                    @click="()=>{$modal.hide('new-editor-modal');isLoaded=false}"
                    aria-label="Close"
            >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
                </svg>
            </button>
        </div>
        <div id="modal-body">
            <template v-if="!is_get_details">
                <div class="row">
                    <div class="form-group col-9">
                        <h5>Փաստաթղթի մարամասները</h5>
                    </div>
                     <div class="form-group col-7">
                        <label for="respond_period">հանձնման-ընդունման արձանագրություն ներկայացնելու ժամկետը</label>
                    </div>
                    <div class="form-group col-5">
                        <input v-model="details.respond_period" type="text" v-mask="'#######'" class="form-control" id="respond_period">
                    </div>
                    <div class="form-group col-7">
                        <label for="warranty_period">Երաշխիքային ժամկետ</label>
                    </div>
                     <div class="form-group col-5">
                        <input v-model="details.warranty_period" type="text" v-mask="'#######'" class="form-control" id="warranty_period">
                    </div>
                    <div class="form-group col-7">
                        <label for="allowed_days">Մատակարարումը ուշացնելու թույլատրելի օրերի քանակը</label>
                    </div>
                    <div class="form-group col-5">
                        <input v-model="details.allowed_days" type="text" v-mask="'#######'" class="form-control" id="allowed_days">
                    </div>
                    <div class="form-group col-3">
                        <button @click="confirmDetails" type="submit" class="btn btn-primary">Հաստատել</button>
                    </div>
                </div>
            </template>
            <div v-show="is_get_details" class="h-100">
                <component
                    @closeAfterSave="()=>{$modal.hide('new-editor-modal');isLoaded=false}"
                    ref="file"
                    :participantGroup="participantGroup"
                    :handleLoaded="handleLoaded"
                    :is-editable="isEditable"
                    :is="currentFile"
                    v-show="false"
                    :lng="lng"
                />
                <div id="commandment-file" ref="contract" class="w-100" style="line-height: 2">
                    <vue-html2pdf
                        :show-layout="true"
                        :float-layout="false"
                        :enable-download="false"
                        v-show="false"
                        id="document"
                        @beforeDownload="beforeDownload($event)"
                        :paginate-elements-by-height="900"
                        :filename="editorTitle"
                        :pdf-quality="2"
                        pdf-content-width="auto"
                        :html-to-pdf-options="{
                            margin: [5, 5, 0, 5],
                            filename: editorTitle,
                            jsPDF: { format: 'a4', orientation: 'portrait' },
                            html2canvas: {
                                scrollX: 0,
                                scrollY: 0
                            }
                        }"
                        ref="html2Pdf"
                    >
                        <section slot="pdf-content" contenteditable="true" id="file" v-html="content"/>
                    </vue-html2pdf>
                </div>
                <template v-if="action === 'save'">
                    <editor
                        v-if="isLoaded"
                        ref="file_editor"
                        v-model="editorContent"
                        api-key="0itmwbkqro4fsojoh3hiqjwccys6v95aj8x5k2vcgczl9vam"
                        :init="init"
                    />
                </template>
                <template v-else>
                    <editor
                        ref="file_editor"
                        v-model="content"
                        api-key="0itmwbkqro4fsojoh3hiqjwccys6v95aj8x5k2vcgczl9vam"
                        :init="init"
                    />
                    </template>
            </div>
        </div>
        <div id="modal-footer">
            <template v-if="action === 'save' && is_get_details">
                <button
                    @click="$modal.hide('new-editor-modal')"
                    class="btn btn-light mr-3"
                >
                    Չեղարկել
                </button>
                <button
                    @click="save"
                    type="button"
                    class="btn btn-primary"
                >
                    Պահպանել
                </button>
            </template>
            <template v-if="action === 'download'">
                <button aria-expanded="false" :disabled="isLoading || isLoaded === false" @click="downloadPDF" type="button" class="btn btn-primary">
                    <svg class="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.23096 9.01613V0.5H8.67326V9.01613L11.3656 6.30645L12.4233 7.37097L8.96173 10.7581L7.90403 11.8226L6.9425 10.7581L3.48096 7.37097L4.53865 6.30645L7.23096 9.01613ZM13.9615 13.9516V11.9193H15.5V13.758C15.5 14.7258 14.7308 15.5 13.7692 15.5H2.23077C1.26923 15.5 0.5 14.7258 0.5 13.758V11.9193H2.03846V13.9516H13.9615Z" fill="#F0F7FF"/>
                    </svg>
                    <span>Բեռնել</span>
                    <span v-if="isLoading" class="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                <!-- <button @click="downloadDOC" type="button" class="btn btn-primary">
                    <span class="mr-2">Բեռնել DOC</span>
                    <font-awesome-icon :icon="['fas', 'download']"/>
                </button> -->
            </template>
        </div>
    </modal>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import Editor from '@tinymce/tinymce-vue'
import download from '@/mixins/download'
import init from '@/mixins/variables'
import $ from 'jquery'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'NewEditorModal',
    mixins: [download, init],
    components: {
        VueHtml2pdf,
        editor: Editor,
        act: () => import('./orders/act'),
        conclusion: () => import('./orders/conclusion'),
        transfer_protocol: () => import('./orders/transfer_protocol'),
    },
    data() {
        return {
            isLoading: false,
            details: {
                contract_pages_count: 5,
                allowed_days: '',
                warranty_period: '',
                respond_period: '',
            },
            is_get_details: false,
            content: '',
            editorContent: '',
            action: '',
            currentFile: '',
            lng: '',
            editorTitle: '',
            isLoaded: false,
            participantGroup: '',
            isEditable: false,
        }
    },
    validations: {
        details: {
            contract_pages_count: { required },
            allowed_days: { required },
            warranty_period: { required },
            respond_period: { required },
        }
    },
    methods: {
        confirmDetails() {
            if(!this.$v.details.$invalid){
                $('.respond-period').html(this.details.respond_period)
                $('.warranty-period').html(this.details.warranty_period)
                $('.allowed-days').html(this.details.allowed_days)
                $('.contract-pages-count').html(this.details.contract_pages_count)
                this.editorContent = $('#file').html();
                this.is_get_details = true
            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    text: 'Խնդրում ենք լրացնել մանրամասները փաստաթուղթը ստանալու համար'
                })
            }
        },
        handleLoaded() {
            if(!this.isLoaded){
                setTimeout(() => {
                    this.isLoaded = true;
                    this.content = this.$refs.file.$el.innerHTML
                }, 1000);
            }
        },
        handleBeforeOpen({
            params: {
                action = 'save',
                fileName,
                isEditable,
                lng = 'hy',
                editorTitle,
                participantGroup
            },
        }) {
            this.action = action
            this.currentFile = fileName
            this.participantGroup = participantGroup
            this.isEditable = Boolean(isEditable)
            this.lng = lng
            this.editorTitle = editorTitle
            if(this.action === 'download'){
                this.is_get_details = true;
            }
        },
        save() {
            this.$refs.html2Pdf.generatePdf()
            this.$store.dispatch('organizeOnePerson/update', {id: this.$route.params.id, data: { contract_html_hy: this.editorContent !== '' ? this.editorContent : this.content }}).then((response) => {
            }).catch(e => {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Ինչ որ բան այն չէ',
                    text: 'Կրկին փորձեք!'
                })
            })
        },
        downloadPDF() {
            this.isLoading = true;
            this.sendToPDFGeneration(this, this.content, this.editorTitle, () => {this.isLoading = false})
        },
        downloadDOC() {
            this.download_mixin('document', this.editorTitle)
        },
        consoleLog(element){
            console.log(element)
        },
        async beforeDownload({ html2pdf, options, pdfContent }) {
            await html2pdf()
                .set(options)
                .from(pdfContent)
                .toPdf()
                .get('pdf')
                .then((pdf) => {
                    const totalPages = pdf.internal.getNumberOfPages()
                    $('.contract-pages-count').html(totalPages)
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
    },
}
</script>
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
.editor-input {
    text-align:center;
    border: none;
    border-bottom: 2px solid rgb(80, 110, 228);
    width: 50px;
    height: 20px;
    outline: none;
    margin: 0;
    -webkit-appearance: none;
    -moz-appearance: textfield;
}
</style>
<style scoped>
    .info-block p:first-child{
        display: inline !important;
    }
    table { page-break-inside:auto }
    table{
        border: 1px solid  black !important;
        border-collapse: collapse !important;
        padding-bottom: 50px !important;
        text-align: center !important;
    }
    table tr th{
        border: 1px solid  black;
        border-collapse: collapse !important;
        font-size: 12px !important;
    }
    table tr td{
        border: 1px solid  black;
        border-collapse: collapse !important;
        text-align: center !important;
        font-size: 10px !important;
    }
    .full-row { page-break-inside:avoid; page-break-after:auto }
    .info-block{
      page-break-inside:avoid;
      page-break-after:auto;
      padding-top: 20px;
      box-sizing: border-box;
    }
    .info-block > tr {
      margin-top: 50px;
    }
  @media (max-width: 768px) {
    .new-editor-modal /deep/ .vm--modal {
      height: 90% !important;
      margin: auto 20px;
      width: auto !important;
      top: 0 !important;
      bottom: 0 !important;
      right: 0 !important;
      left: 0 !important;
      position: absolute;
    }
    .new-editor-modal /deep/ .vm--modal #modal-body{
      padding: 16px 8px 8px;
    }
  }
</style>
