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
            <component
                @closeAfterSave="()=>{$modal.hide('new-editor-modal');isLoaded=false}"
                ref="file"
                :tender="tender"
                :handleLoaded="handleLoaded"
                :is-editable="isEditable"
                :is="currentFile"
                v-show="false"
                :lng="lng"
            />
            <div v-if="isLoaded" class="h-100">
                <vue-html2pdf
                    :show-layout="true"
                    :float-layout="false"
                    :enable-download="false"
                    v-show="true"
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
            <span v-else
                class="m-auto text-primary spinner-border spinner-border-lg position-absolute" 
                style="right: 0; top: 0; bottom: 0; left: 0;"
                role="status"
                aria-hidden="true"
            />
            <div v-if="false" class="h-100">
                <editor
                    v-if="isLoaded"
                    ref="file_editor"
                    v-model="content"
                    api-key="0itmwbkqro4fsojoh3hiqjwccys6v95aj8x5k2vcgczl9vam"
                    :init="init"
                />
                <span v-else
                    class="m-auto spinner-border spinner-border-lg position-absolute" 
                    style="right: 0; top: 0; bottom: 0; left: 0;"
                    role="status"
                    aria-hidden="true"
                />
            </div>
        </div>
        <div id="modal-footer">
            <button v-if="action === 'save_download'" @click="save" type="button" class="btn btn-primary mr-3">
                <span>Պահպանել</span>
            </button>
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
        </div>
    </modal>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import Editor from '@tinymce/tinymce-vue'
import download from '@/mixins/download'
import init from '@/mixins/variables'
import $ from 'jquery'
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver'

export default {
    name: 'NewEditorModal',
    mixins: [download, init],
    components: {
        VueHtml2pdf,
        editor: Editor,
        application_announcement_contract_security: () => import('./electronic/application_announcement_contract_security'),
        application_announcement_qualification_assurance: () => import('./electronic/application_announcement_qualification_assurance'),
        application_announcement_product_appendix1: () => import('./electronic/application_announcement_product_appendix1'),
        application_announcement_product_appendix1_1: () => import('./electronic/application_announcement_product_appendix1_1'),
        application_announcement_product_appendix1_2: () => import('./electronic/application_announcement_product_appendix1_2'),
        application_announcement_product_appendix1_3: () => import('./electronic/application_announcement_product_appendix1_3'),
        application_announcement_product_appendix2: () => import('./electronic/application_announcement_product_appendix2'),
        application_announcement_service_appendix1: () => import('./electronic/application_announcement_service_appendix1'),
        application_announcement_service_appendix1_1: () => import('./electronic/application_announcement_service_appendix1_1'),
        application_announcement_service_appendix1_3: () => import('./electronic/application_announcement_service_appendix1_3'),
        application_announcement_service_appendix2: () => import('./electronic/application_announcement_service_appendix2'),
        application_announcement_work_appendix1: () => import('./electronic/application_announcement_work_appendix1'),
        application_announcement_work_appendix1_1: () => import('./electronic/application_announcement_work_appendix1_1'),
        application_announcement_work_appendix1_2: () => import('./electronic/application_announcement_work_appendix1_2'),
        application_announcement_work_appendix1_3: () => import('./electronic/application_announcement_work_appendix1_3'),
        application_announcement_work_appendix2: () => import('./electronic/application_announcement_work_appendix2'),
        application_announcement_writing: () => import('./electronic/application_announcement_writing'),
        real_beneficiary_declaration_form: () => import('./electronic/real_beneficiary_declaration_form'),
        procedure_for_filling_out_the_declaration: () => import('./electronic/procedure_for_filling_out_the_declaration'),
    },
    data() {
        return {
            details: {
                contract_pages_count: 5,
                allowed_days: '',
                warranty_period: '',
                respond_period: '',
            },
            isLoading: false,
            content: '',
            editorContent: '',
            action: '',
            currentFile: '',
            lng: '',
            editorTitle: '',
            isLoaded: false,
            tender: '',
            isEditable: false,
            tenderStateId: null
        }
    },
    methods: {
        async handleLoaded() {
            if(!this.isLoaded){
                setTimeout(() => {
                    this.isLoaded = true;
                    this.content = this.$refs.file.$el ? this.$refs.file.$el.innerHTML :  this.$refs.file.innerHTML
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
                tender
            },
        }) {
            this.action = action
            this.currentFile = fileName
            this.tender = tender
            this.tenderStateId = tender.tender.id
            this.isEditable = Boolean(isEditable)
            this.lng = lng
            this.editorTitle = editorTitle
            if(this.action === 'download'){
                this.is_get_details = true;
            }
        },
        save() {
            if(this.editorTitle === 'Իրական շահառուների վերաբերյալ հայտարարագրի ձև'){
                $('#document input[type=radio]').each(function () {
                    if($(this).is(":checked")){
                        $(this).attr('checked', true)
                    }
                });
                this.$refs.file.save($('#document #real-beneficiary-declaration-form').html())
            } else {
                this.$refs.file.save(document.getElementById('document').innerHTML)
            }
        },
        downloadPDF() {
            if(this.editorTitle === 'Հավելված 1' || this.editorTitle === 'Հավելված 2' || this.editorTitle === 'Հավելված 1.1'){
                this.$fire({
                    title: "Հարգելի գործընկեր",
                    text: "Խնդրում ենք ևս մեկ անգամ ստուգել լրացված տվյալների /մասնակցի տվյալներ, ծածկագիր, թվաբանական/ ճշտությունը հետո հաստատել և մասնակցել, քանի որ, համաձայն գնումների մասին ՀՀ օրենսդրության պահանջների, եթե գնային առաջարկում առկա է անհամապատասխանություն, ապա այդ հայտը ենթակա է մերժման։",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: 'Հաստատել',
                    cancelButtonText: 'Ստուգել'
                }).then(async(result) => {
                    if (result.value) {
                        this.isLoading = true;
                        $('.text-danger').removeClass("text-danger")
                        this.sendToPDFGeneration(this, $('#document').html(), this.editorTitle, () => {this.isLoading = false}, true);
                    }
                })
            } else {
                this.isLoading = true;
                $('.text-danger').removeClass("text-danger")
                this.sendToPDFGeneration(this, $('#document').html(), this.editorTitle, () => {this.isLoading = false}, true);
            }
            // this.$refs.html2Pdf.generatePdf();
            // this.$modal.hide('new-editor-modal');
            // this.isLoaded = false;
        },
        async downloadDOC() {
            const newContent = await this.$refs.file.handleBeforeDownload();
            asBlob(newContent).then(data => {
                saveAs(data, `${this.editorTitle}.docx`)
            })    
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
                    pdf.setFontSize(11)
                    pdf.setTextColor('#0000ff')
                    pdf.setFont('ghea')
                    pdf.text(
                        'iTender©\nwww.iTender.am',
                        pdf.internal.pageSize.getWidth() * 0.06,
                        pdf.internal.pageSize.getHeight() * 0.95
                    )
                })
                .save()
        },
    }
}
</script>
<style scoped>
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
#modal-body{
    height: calc(100% - 56px - 92px);
}
#modal-footer{
    text-align: right;
    padding-top: 24px;
    padding-bottom: 30px;
}
</style>