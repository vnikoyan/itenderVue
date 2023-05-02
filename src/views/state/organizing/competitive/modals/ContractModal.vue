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
                <p>{{ editorTitle }}</p>
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
            <div id="commandment-file" ref="contract" class="w-100" style="line-height: 2">
                <vue-html2pdf
                    :show-layout="true"
                    :float-layout="false"
                    :enable-download="false"
                    v-show="true"
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
                    <div slot="pdf-content" id="contract-document" class="px-2" v-html="content"></div>
                </vue-html2pdf>
            </div>
            <editor
                v-if="false"
                ref="file_editor"
                v-model="content"
                v-show="false"
                api-key="0itmwbkqro4fsojoh3hiqjwccys6v95aj8x5k2vcgczl9vam"
                @onExportPdf="captionOnInit"
                :init="init"
            >
            </editor>
        </div>
        <div id="modal-footer">
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
import Editor from '@tinymce/tinymce-vue'
import init from '@/mixins/variables'
import purchaseTypesLongNamesCased from '@/mixins/purchaseTypes'
import $ from 'jquery'

export default {
    name: 'ContractModal',
    components: {
        VueHtml2pdf,
        editor: Editor,
    },
    mixins: [init,purchaseTypesLongNamesCased],
    computed: {
        locale() {
            return this.$store.getters["user/locale"];
        },
        currentOrganized() {
            return this.$store.getters['organize/currentOrganized']
        },
        organizedRows() {
            return this.$store.getters['organize/organizedRows']
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
            content: '',
            action: '',
            index: '',
            winnersLength: 0,
            currentFile: '',
            participantGroup: {},
            lng: '',
            editorTitle: '',
            isLoaded: true,
            isEditable: false,
            convertedResult: '',
            getOrgnizeTypeByPlan: '',
            getOrgnizeTypeByPlanRu: '',
        }
    },
    mounted() { 
        this.$store.dispatch('organize/getCurrent', this.$route.params.id)
        const locale = 'hy'
        if(this.organizedRows.length){
            this.purchaseType = this.organizedRows[0].type
        }
        this.getOrgnizeTypeByPlan = this.purchaseTypesLongNamesCased[locale][this.purchaseType]

        const localeru = 'ru'
        this.getOrgnizeTypeByPlanRu = this.purchaseTypesLongNamesCased[localeru][this.purchaseType]
    },
    methods: {
        captionOnInit(evt, editor) {
            const header = '<header> ABCD </header>'
            const footer = '<div>ASHSHGSJSJGJSGSJGSJGJGSJ</div>'
            let content = editor.getContent()
            content = header + content + footer
            editor.setContent(content)
        },
        handleLoaded() {
            if(!this.isLoaded){
                setTimeout(() => {
                    this.isLoaded = true;
                    this.content = this.$refs.file.$el.innerHTML
                }, 1000);
            }
        },
        handleBeforeOpen({params}) {
            this.index = params.index
            this.winnersLength = params.winnersLength
            this.participantGroup = params.participantGroup
            this.content = this.currentOrganized.contract_html_hy
            this.isLoaded = true;
        },
        save() {
            this.$refs.file.save()
        },
        getContractPrice(participantGroup){
            var sumPrice = 0;
            participantGroup.won_lots.forEach((lot) => {
                const offer = participantGroup.lots.find(item => item.organize_row_id === lot.id)
                if(participantGroup.lots){
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
                }
            })
            return sumPrice
        },
        calculateMonthPrice(price, percent){
            return price*percent/100
        },
        async handleOpened (){
            const organisationInfo = this.me.organisation[0]
            const winner = this.participantGroup
            const winnerName = winner.participant[0].name.hy || winner.participant_user.organisation.name.hy
            const winnerDirectorName = winner.director || winner.participant_user.organisation.director_name.hy
            const winnerAddress = winner.participant[0].address.hy || `${winner.region.hy}, ${winner.city.hy} ${winner.address.hy}`
            const winnerBankName = winner.bank || winner.participant_user.organisation.bank_name.hy
            const winnerBankNumber = winner.account_number || winner.participant_user.organisation.bank_account
            const winnerPhoneNumber = winner.participant[0].phone || winner.participant_user.organisation.phone
            const winnerEmail = winner.participant[0].email || winner.participant_user.email
            let winnerTin = '';
            if(winner.participant[0].is_physical_person){
                winnerTin = winner.participant[0].id_card_number || winner.participant_user.organisation.id_card_number
            } else {
                winnerTin = winner.participant[0].tin || winner.participant_user.organisation.tin
            }
            this.editorTitle = `Պայմանագիր ${winnerName}-ի հետ`
            
            if(this.winnersLength > 1){
                $('#info-block-1').html('N' + `${this.currentOrganized.translations.code.hy}-${this.index}`)
                $('.contract-code').html(`${this.currentOrganized.translations.code.hy}-${this.index}`)
            } else {
                $('#info-block-1').html("N " + this.currentOrganized.translations.code.hy)
                $('.contract-code').html(`${this.currentOrganized.translations.code.hy}`)
            }

            $('#info-block-2').html(organisationInfo.translations.address.hy)
            $('#info-block-6').html(
                `«${organisationInfo.translations.name.hy}»-ը, ի դեմս տնօրեն ${organisationInfo.translations.director_name.hy}-ի, որը գործում է «${organisationInfo.translations.name.hy}»-ի կանոնադրության հիման վրա, այսուհետ «Գնորդ», մի կողմից, &nbsp;և ${winnerName}-ը, ի դեմս տնօրեն ${winnerDirectorName}-ի, որը գործում է&nbsp;`
            )
            $('#info-block-7').html(winnerName)

            if(Number.isInteger(this.getContractPrice(this.participantGroup))){
                $('.contract-price').html(`${this.getContractPrice(this.participantGroup)}`)
            }else{
                $('.contract-price').html(`${this.getContractPrice(this.participantGroup).toFixed(2)}`)
            }
            

            this.getOrgnizeTypeByPlan && $('.getOrgnizeTypeByPlan').html(`${this.getOrgnizeTypeByPlan}`)
            this.getOrgnizeTypeByPlanRu && $('.getOrgnizeTypeByPlanRu').html(`${this.getOrgnizeTypeByPlanRu}`)
            $('.getContractType').html('գնման')
            
            this.convertedResult = await this.numberToWord(this.getContractPrice(this.participantGroup).toFixed(2))
            
            $('.contract-price-word').html(`${this.convertedResult}`)
            const lot = this.participantGroup.lots.find(item => item.vat !== 0)
            if(lot){ 
                $('.contract-det').html(', ներառյալ ԱԱՀ-ն:')
            }else{
                $('.contract-det').html(':')
            }

            if(lot){ 
                $('.contract-det-ru').html(', включая НДС')
            }else{
                $('.contract-det-ru').html('.')
            }
            
            $('.buyer-info-block-1').html(`${organisationInfo.translations.name.hy}, ՀՎՀՀ ${organisationInfo.tin}`)
            $('.buyer-info-block-2').html(`հասցե՝ ${organisationInfo.translations.region.hy}, ${organisationInfo.translations.city.hy}, ${organisationInfo.translations.address.hy}`)
            $('.buyer-info-block-3').html(`հաշվեհամար՝ ${organisationInfo.bank_account}`)
            $('.buyer-info-block-4').html(`հեռ.՝ ${organisationInfo.phone}`)
            $('.buyer-info-block-5').html(`էլ. փոստ՝ ${this.rootUser.email}`)
            $('.buyer-info-block-6').html(organisationInfo.translations.name.hy)


            // WINNER NAME
            $('.winner-name').html(`${winnerName}`)
            $('.seller-info-block-1').html(`${winnerName}, ՀՎՀՀ ${winner.participant[0].tin}`)
            // WINNER TYPE
            if(winner.participant_user){
                $('.winner-type').html(`${winner.participant_user.organisation.company_type.hy}`)
            }
            // WINNER ADDRESS 
            $('.winner-address').html(`${winnerAddress}`)
            $('.seller-info-block-2').html(`հասցե՝ ${winnerAddress}`)
            // WINNER DIRECTOR NAME
            $('.winner-director').html(` ${winnerDirectorName}`)
            $('.seller-info-block-6').html(`Տնօրեն՝ ${winnerDirectorName}`)
            // WINNER BANK NAME
            $('.winner-bank').html(` ${winnerBankName}`)
            // WINNER BANK NUMBER
            $('.winner-bank_account').html(` ${winnerBankNumber}`)
            $('.seller-info-block-3').html(`հաշվեհամար՝ ${winnerBankNumber}`)
            // WINNER TIN
            $('.winner-tin').html(winnerTin)
            // WINNER PHONE
            $('.seller-info-block-4').html(`հեռ.՝ ${winnerPhoneNumber}`)
            // WINNER EMAIL
            $('.seller-info-block-5').html(`էլ. փոստ՝ ${winnerEmail}`)

            $('.payment-schedule').html('')
            $('.purchase-schedule').html('')

            winner.won_lots.forEach((lot, index) => {
                const offer = winner.lots.find(item => item.organize_row_id === lot.id)
                const lotData = this.organizedRows.find(item => item.id === lot.id)
                const offerData = lotData.participantsList.find(item => item.participant_group_id === lot.winner_participant_id)
                const trStyles = "border-left:solid #000000 0.9960975000000001pt;border-right:solid #000000 0.9960975000000001pt;border-bottom:solid #000000 0.9960975000000001pt;border-top:solid #000000 0.9960975000000001pt;vertical-align:middle;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;"
                const spanStyles = "font-size:6pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"
                const tdStyles = 'style="padding: 5px; font-size: 8px; border: 1px solid  black; border-collapse: collapse; text-align: center;"'
                const lotPrice = offer.new_value ? offer.vat ? offer.new_value +  offer.new_value*0.2 : offer.new_value : offer.cost;
                const monthsPercents = lot.organize_row_percent || lot.organizeRowPercent;
                $('.purchase-schedule').append(`
                    <tr>
                        <td ${tdStyles}>
                           ${lot.view_id}
                        </td>
                        <td ${tdStyles}>
                           ${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.code : lot.procurement_plan.cpv.code}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop && '/' : ''}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop : ''}
                        </td>
                        <td ${tdStyles}>
                           ${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name}
                        </td>
                        <td ${tdStyles}>
                            ${lot.winner_lot_trademark}, ${lot.winner_lot_brand}, ${lot.winner_lot_manufacturer}
                        </td>
                        <td ${tdStyles}>
                           ${lot.winner_lot_specification ? JSON.parse(lot.winner_lot_specification).hy : ''}
                        </td>
                        <td ${tdStyles}>
                           ${lot.procurement_plan.unit}
                        </td>
                        <td ${tdStyles}>
                            ${Math.round(offerData.current_price_vat / lot.count * 100) / 100}
                        </td>
                        <td ${tdStyles}>
                            ${offerData.current_price_vat}
                        </td>
                        <td ${tdStyles}>
                           ${lot.count}
                        </td>
                        <td ${tdStyles}>
                            ${organisationInfo.translations.region.hy === organisationInfo.translations.city.hy ? organisationInfo.translations.city.hy + ' ' + organisationInfo.translations.address.hy : organisationInfo.translations.region.hy + ' ' + organisationInfo.translations.city.hy + ' ' + organisationInfo.translations.address.hy}
                        </td>
                        <td ${tdStyles}>${lot.count }</td>
                        <td ${tdStyles}>Ընթացիկ տարում ՝պատվերը ստանալուց՝ 4 աշխատանքային օրվա ընթացքում</td>
                    </tr>
                `)
                $('.payment-schedule').append(`
                    <tr>
                        <td ${tdStyles}>
                            ${lot.view_id}
                        </td>
                        <td ${tdStyles}>
                            ${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.code : lot.procurement_plan.cpv.code}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop && '/' : ''}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop : ''}
                        </td>
                        <td ${tdStyles}>
                            ${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_1 || 0) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_2) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_3) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_4) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_5) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_6) || 0}
                            
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_7) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_8) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_9) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_10) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_11) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_12) || 0}
                        </td>
                        <td ${tdStyles}>
                            ${lotPrice}
                        </td>
                    </tr>
                `)
                $('#products-table-body').append(`
                    <tr>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.view_id}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.code : lot.procurement_plan.cpv.code}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop && '/' : ''}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop : ''}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.winner_lot_trademark}, ${lot.winner_lot_brand}, ${lot.winner_lot_manufacturer}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.winner_lot_specification.hy}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.procurement_plan.unit}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${ lotPrice / lot.count }</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${ lotPrice }</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.procurement_plan.details[0].count}</span>
                        </td>
                        <td style="${trStyles}">&nbsp;</td>
                        <td style="${trStyles}">&nbsp;</td>
                        <td style="${trStyles}">&nbsp;</td>
                    </tr>
                `)
                $('#works-table-body').append(`
                    <tr>
                        <td>
                            <span>${lot.view_id}</span>
                        </td>
                        <td>
                            <span>${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.code : lot.procurement_plan.cpv.code}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop && '/' : ''}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop : ''}</span>
                        </td>
                        <td>
                            <span>${lot.winner_lot_specification.hy}</span>
                        </td>
                        <td>
                            <span>${lot.procurement_plan.unit}</span>
                        </td>
                        <td>
                            <span>${lotPrice / lot.count}</span>
                        </td>
                        <td>
                            <span>${lotPrice}</span>
                        </td>
                        <td>
                            <span>${lot.count}</span>
                        </td>
                        <td>
                            <span>${lot.shipping_address ? lot.shipping_address : organisationInfo.translations.address.hy}</span>
                        </td>
                        <td>
                            <span>${lot.supply_date || 5}</span>
                        </td>
                    </tr>
                `)
                $('#percents-table-body').append(`
                    <tr>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.view_id}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.code : lot.procurement_plan.cpv.code}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop && '/' : ''}${lot.procurement_plan.cpv_drop ? lot.procurement_plan.cpv_drop : ''}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name}</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_1) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_2) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_3) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_4) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_5) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_6) || 0}դր.</span>
                            
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_7) || 0}դր.</span>
                            
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_8) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_9) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_10) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_11) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${this.calculateMonthPrice(lotPrice, monthsPercents && monthsPercents.month_12) || 0}դր.</span>
                        </td>
                        <td style="${trStyles}">
                            <span style="${spanStyles}">${lotPrice}դր.</span>
                        </td>
                    </tr>
                `)
            })
        },
        download() {
            this.isLoading = true;
            this.$refs.html2Pdf.generatePdf()
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
                id: this.participantGroup.id,
                signed_contract_hy: $('#contract-document').html()
            }).then(async(response) => {
                await this.sendToPDFGeneration(this, $('#contract-document').html(), this.editorTitle, () => {this.isLoading = false})
            }).catch(e => {
                this.$notify({
                  group: 'foo',
                  type: 'error',
                  title: 'Ինչ որ բան այն չէ',
                  text: 'Կրկին փորձեք!'
                })
            })
        },
        async numberToWord(number) {
			const { data } = await this.$client.post('numberToWord', {number})
			return data;
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
    .info-block p:first-child{
        display: inline !important;
    }
    table { page-break-inside:auto }
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
</style>
