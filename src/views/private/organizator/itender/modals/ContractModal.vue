<template>
    <modal
        class="contract-modal"
        name="contract-modal"
        @before-open="handleBeforeOpen"
        @before-close="isLoaded=false"
        @opened="handleOpened"
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
                <p>{{ contractTitle }}</p>
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
            <div v-show="false" id="file" v-html="content"></div>
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
                    <section slot="pdf-content"  id="contract-document" contenteditable="true" class="px-2" v-html="editorContent"></section>
                </vue-html2pdf>
            </div>
            <editor
                v-if="isLoaded"
                ref="file_editor"
                v-model="editorContent"
                api-key="0itmwbkqro4fsojoh3hiqjwccys6v95aj8x5k2vcgczl9vam"
                :init="init"
            >
            </editor>
            <span v-else
                class="m-auto spinner-border spinner-border-lg position-absolute" 
                style="right: 0; top: 0; bottom: 0; left: 0;"
                role="status"
                aria-hidden="true"></span>
        </div>
        <div id="modal-footer">
            <button aria-expanded="false" :disabled="isLoading" @click="downloadPDF" type="button" class="btn btn-primary">
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
import Editor from '@tinymce/tinymce-vue'
import download from '@/mixins/download'
import purchaseTypesLongNamesCased from '@/mixins/purchaseTypes'
import init from '@/mixins/variables'
import $ from 'jquery'

export default {
    name: 'ContractModal',
    mixins: [download, init, purchaseTypesLongNamesCased],
    components: {
        VueHtml2pdf,
        editor: Editor,
    },
    computed: {
        locale() {
            return this.$store.getters["user/locale"];
        },
        currentOrganized() {
            return this.$store.getters['organizeItender/currentOrganized']
        },
        organizedRows() {
            return this.currentOrganized.organize_rows
        },
        me() {
            return this.$store.getters["user/me"];
        },
        rootUser() {
            return this.$store.getters["user/rootUser"];
        },
    },
    data() {
        return {
            isLoading: false,
            vatResult: [],
            editorContent: '',
            content: '',
            action: '',
            winner: {},
            lots: [],
            currentFile: '',
            lng: '',
            editorTitle: '',
            isLoaded: false,
            participantGroup: '',
            getOrgnizeTypeByPlan: '',
            isEditable: false,
            convertedResult: '',
            contractTitle: ''
        }
    },
    async mounted() { 
        await this.$store.dispatch('organizeItender/getCurrent', this.$route.params.id)
        const locale = 'hy'
        this.purchaseType = await this.organizedRows[0].type
        this.getOrgnizeTypeByPlan = await this.purchaseTypesLongNamesCased[locale][this.purchaseType || 2]
    },
    methods: {
        handleBeforeOpen({params}) {
            this.index = params.index
            this.winner = params.winner
            this.content = this.currentOrganized.contract_html_hy
            this.lots = [];
            console.log(this.winner)
            this.contractTitle = `Պայմանագիր ${ this.winner.name || ''}-ի հետ`
            if(this.currentOrganized.winner_by_lots){
                this.winner.won_lots.forEach((lot) => {
                    const row = this.currentOrganized.organize_rows.find(row => row.id === lot.id)
                    this.lots.push(row)
                })
            } else {
                this.lots = this.currentOrganized.organize_rows
            }
        },
        getContractPrice(winner){
            var sumPrice = 0;
            if(this.currentOrganized.winner_by_lots){
                winner.won_lots.forEach((lot) => {
                    const offer = this.currentOrganized.lots.find(item => item.organize_row_id === lot.id && (item.participant_id === winner.id || item.row_group_id === winner.id))
                    const newPrice = offer.new_value
                    const price = offer.value
                    const vat = offer.vat
                    if(vat){
                        if(newPrice){
                            sumPrice = sumPrice + (newPrice+newPrice*0.2)
                        } else {
                            sumPrice = sumPrice + (price+price*0.2)
                        }
                    } else {
                        if(newPrice){
                            sumPrice = sumPrice + (newPrice)
                        } else {
                            sumPrice = sumPrice + (price)
                        }
                    }
                })
            } else {
                sumPrice = this.currentOrganized.winner_user_price
            }
            return sumPrice
        },
        fixIncorrectWords(word) {
			return word.replace('միլիօն', 'միլիոն').replace('ստորակել', 'ամբողջ')
		},
		async numberToWord(number) {
			const { data } = await this.$client.post('numberToWord', {number})
			return data;
		},
        async handleOpened(){
            const winner = this.winner
            $('.winner-name').html(winner.name)
            $('.winner-address').html(`${winner.address}`)
            $('.winner-bank').html(` ${winner.bank}`)
            $('.winner-bank_account').html(winner.bank_account)
            $('.winner-tin').html(winner.tin)
            $('.winner-director').html(` ${winner.director}`)

            if(this.currentOrganized.winners.length > 1){
                $('#info-block-1').html('N' + `${this.currentOrganized.code}-${this.index}`)
                $('.contract-code').html(`${this.currentOrganized.code}-${this.index}`)
            } else {
                $('#info-block-1').html("N " + ' ' +  this.currentOrganized.code)
                $('.contract-code').html(`${this.currentOrganized.code}`)
            }
            
            if(Number.isInteger(this.getContractPrice(this.winner))){
                $('.contract-price').html(`${this.getContractPrice(this.winner)}`)
            }else{
                $('.contract-price').html(`${this.getContractPrice(this.winner)}`)
            }
            
            $('.getOrgnizeTypeByPlan').html(`${this.getOrgnizeTypeByPlan}`)

            this.convertedResult = await this.numberToWord(this.getContractPrice(this.winner))
            $('.contract-price-word').html(`${this.convertedResult}`)

            const lotWithVat = this.currentOrganized.lots.find(item => item.vat !== 0 && (item.participant_id === this.winner.id || item.row_group_id === this.winner.id))
            if(lotWithVat){ 
                $('.contract-det').html(', ներառյալ ԱԱՀ-ն:')
            }else{
                $('.contract-det').html(':')
            }
            
            // $('.contract-vat').html(`${this.getContractPrice(this.winner)} դր.`)
            // $('.contract-vat-word').html(`${this.getContractPrice(this.winner)} դր.`)
            
            $('.purchase-schedule').html('')
            
            const tdStyles = 'style="padding: 5px; font-size: 8px; border: 1px solid  black; border-collapse: collapse; text-align: center;"'

            this.lots.forEach((lot) => {
                const offer = this.currentOrganized.lots.find(item => item.organize_row_id === lot.id && (item.participant_id === this.winner.id || item.row_group_id === this.winner.id))
                const lotPrice = offer.new_value ? offer.vat ? offer.new_value +  offer.new_value*0.2 : offer.new_value : offer.cost;
                const lotUnitPrice = lotPrice / lot.count;
                
                if(Number(this.currentOrganized.cpv_type) === 3){
                    $('.purchase-schedule').append(`
                        <tr>
                            <td ${tdStyles}>${lot.view_id}</td>
                            <td ${tdStyles}>${lot.procurement_plan.specifications.description.hy}</td>
                            <td ${tdStyles}>${lot.procurement_plan.unit}</td>
                            <td ${tdStyles}>${lotUnitPrice }</td>
                            <td ${tdStyles}>${lotPrice }</td>
                            <td ${tdStyles}>${lot.count}</td>
                            <td ${tdStyles}>${this.me.organisation[0].translations.region.hy === this.me.organisation[0].translations.city.hy ? ' ' + this.me.organisation[0].translations.city.hy + ' ' + this.me.organisation[0].translations.address.hy : this.me.organisation[0].translations.region.hy + ' ' + ' ' + this.me.organisation[0].translations.city.hy + ' ' + this.me.organisation[0].translations.address.hy}</td>
                            <td ${tdStyles}>Ընթացիկ տարում ՝պատվերը ստանալուց՝ ${ this.currentOrganized.purchase_schedule } աշխատանքային օրվա ընթացքում</td>
                        </tr>
                    `)
                }else if(Number(this.currentOrganized.cpv_type) === 2){
                    $('.purchase-schedule').append(`
                        <tr>
                            <td ${tdStyles}>${lot.view_id}</td>
                            <td ${tdStyles}>${lot.procurement_plan.specifications.description.hy}</td>
                            <td ${tdStyles}>${lot.procurement_plan.unit}</td>
                            <td ${tdStyles}>${lotPrice }</td>
                            <td ${tdStyles}>${lot.count}</td>
                            <td ${tdStyles}>${this.me.organisation[0].translations.region.hy === this.me.organisation[0].translations.city.hy ? ' ' + this.me.organisation[0].translations.city.hy + ' ' + this.me.organisation[0].translations.address.hy : this.me.organisation[0].translations.region.hy + ' ' + ' ' + this.me.organisation[0].translations.city.hy + ' ' + this.me.organisation[0].translations.address.hy}</td>
                            <td ${tdStyles}>Ընթացիկ տարում ՝պատվերը ստանալուց՝ ${ this.currentOrganized.purchase_schedule } աշխատանքային օրվա ընթացքում</td>
                        </tr>
                    `)
                }else{
                    $('.purchase-schedule').append(`
                        <tr>
                            <td ${tdStyles}>
                            ${lot.view_id}
                            </td>
                            <td ${tdStyles}>
                            ${lot.procurement_plan.cpv.name}
                            </td>
                            <td ${tdStyles}>
                                ${lot.procurement_plan.specifications.description.hy}
                            </td>
                            <td ${tdStyles}>
                            ${lot.procurement_plan.unit}
                            </td>
                            <td ${tdStyles}>
                            ${(lotPrice) / lot.count}
                            </td>
                            <td ${tdStyles}>
                            ${lotPrice}
                            </td>
                            <td ${tdStyles}>
                            ${lot.count }
                            </td>
                            <td ${tdStyles}>
                            ${this.currentOrganized.shipping_address}
                            </td>
                            <td ${tdStyles}></td>
                            <td ${tdStyles}>Ընթացիկ տարում ՝պատվերը ստանալուց՝ ${ this.currentOrganized.purchase_schedule } աշխատանքային օրվա ընթացքում</td>
                        </tr>
                    `)
                }    

                this.editorContent = $('#file').html();
                this.isLoaded = true;
            })
        },
        save() {
            this.$store.dispatch('organizeItender/update', {id: this.$route.params.id, data: { contract_html_hy: this.content }}).then((response) => {
                if(response) {
                    this.$modal.hide('contract-modal')
                }
            }).catch(e => {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Ինչ որ բան այն չէ',
                    text: 'Կրկին փորձեք!'
                })
            })
        },
        calculateMonthPrice(price, percent){
            return price*percent/100
        },
        downloadPDF() {
            this.isLoading = true;
            this.$refs.html2Pdf.generatePdf()
        },
        consoleLog(element){
            console.log(element)
        },
        async beforeDownload({ html2pdf, options, pdfContent }) {
            $('.html2pdf__page-break').first().remove()
            await html2pdf()
                .set(options)
                .from(pdfContent)
                .toPdf()
                .get('pdf')
                .then((pdf) => {
                    const totalPages = pdf.internal.getNumberOfPages()
                    $('.pages-count').html(`${totalPages}`)

                })
            await this.$client.post(`participant-group/saveContractDocument`, {
                id: this.winner.id,
                signed_contract_hy: $('#contract-document').html()
            }).then(async(response) => {
                await this.sendToPDFGeneration(this, $('#contract-document').html(), this.contractTitle, () => {this.isLoading = false})
            }).catch(e => {
                this.$notify({
                  group: 'foo',
                  type: 'error',
                  title: 'Ինչ որ բան այն չէ',
                  text: 'Կրկին փորձեք!'
                })
            })
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
.big-table td{
    font-size: 8px !important;
    padding: 5px !important;
}
.big-table th{
    font-size: 10px !important;
    padding: 5px !important;
}
.info-block{
    page-break-inside:avoid  !important;
    page-break-after:auto  !important;
    padding-top: 20px  !important;
    box-sizing: border-box  !important;
}
.full-row { page-break-inside:avoid; page-break-after:auto }
</style>
<style scoped>

</style>