<template>
    <vue-html2pdf
        :show-layout="true"
        :float-layout="false"
        :enable-download="false"
        pdf-content-width="auto"
        @beforeDownload="beforeDownload($event)"
        :pdf-format="'a4'"
        :paginate-elements-by-height="1400"
        :manual-pagination="true"
        :html-to-pdf-options="{
            padding: [12, 12, 20, 12],
            filename: 'Обьявление о решении заключения договора.pdf',
            html2canvas: {
                scrollX: 0,
                scrollY: 0,
            },
        }"
        ref="html2Pdf">
        <section slot="pdf-content" contenteditable="true" style="font-size: 14px;">
            <div style="text-align: center;font-weight: 600;">ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</div>
            <div style="text-align: center;font-weight: 600;">պայմանագիր կնքելու որոշման մասին</div>
            <div style="text-align: center;font-weight: 600;">Ընթացակարգի ծածկագիրը {{ currentOrganized.translations.code.hy }}</div>
            <br>
            <div style="text-align: justify;">
                «{{ me.organisation[0].translations.name.hy }}»
                <span
                    style="text-align: justify;"
                    v-if="
                        me.organisation[0].translations.company_type.hy ===
                            'Հ/Կ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ՓԲԸ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'Ա/Կ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ԲԲԸ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'Ա/Ձ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ՍՊԸ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ՀՈԱԿ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ՊՈԱԿ'
                    "
                    >{{me.organisation[0].translations.company_type.hy}}-ն</span>
                <span v-else style="text-align: justify;">{{me.organisation[0].translations.company_type.hy}}ն</span>
                ստորև ներկայացնում է
                {{ currentOrganized.translations.code.hy }} ծածկագրով գնման
                ընթացակարգի արդյունքում պայմանագիր կնքելու որոշման մասին
                տեղեկատվությունը`
            </div>
            <div style="text-align: justify;">
                Գնահատող հանձնաժողովի 20__ թվականի ______ __-ի թիվ ___ որոշմամբ
                հաստատվել են ընթացակարգի բոլոր մասնակիցների կողմից ներկայացված
                հայտերի` հրավերի պահանջներին համապատասխանության գնահատման
                արդյունքները։ Համաձյան որի`
            </div>
            <div class="lots" v-for="(lot, index) in lots" :key="index">
                <br>
                <br>
                <div>Չափաբաժին {{ lot.view_id }}</div>
                <br>
                <div>Գնման առարկա է հանդիսանում` {{ lot.cpv_name }}</div>
                <br>
                <table class="ft-table"
                    style=" width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                    <tr>
                        <th style="border: 1px solid black;
                                    border-collapse: collapse;">
                            <span>Հ/Հ</span>
                        </th>
                        <th style="border: 1px solid black;
                                    border-collapse: collapse;">Մասնակցի անվանումը</th>
                        <th style="border: 1px solid black;
                                    border-collapse: collapse;">
                                Հրավերի պահանջներին համապատասխանող հայտեր<br /><span
                                style="font-weight: 400;"
                                >/համապատասխանելու դեպքում նշել "X"/</span>
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Հրավերի պահանջներին չհամապատասխանող հայտեր<span
                                style="font-weight: 400">/չհամապատասխանելու դեպքում նշել "X"/</span>
                        </th>
                        <th style="border: 1px solid black;
                                border-collapse: collapse;">
                            Անհամապատասխանության համառոտ նկարագրույթուն
                        </th>
                    </tr>
                    <tr v-for="(participant, index) in lot.participants" :key="participant.id">
                        <td style="border: 1px solid black;;
                                   text-align: center;">
                            {{ index + 1 }}
                        </td>
                        <td style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">
                            {{participant.info ? participant.info.name.hy : ''}}
                        </td>
                        <td style="border: 1px solid black;
                                border-collapse: collapse;
                                text-align: center;">
                            {{ isSatisfactory(lot.participants, index) ? 'x' : '' }}
                        </td>
                        <td style="border: 1px solid black;
                                border-collapse: collapse;
                                text-align: center;">
                            {{ isSatisfactory(lot.participants, index) ? '' : 'x' }}
                        </td>
                        <td style="border: 1px solid black;
                                border-collapse: collapse;
                                text-align: center;"></td>
                    </tr>
                </table>
                <br>
                <table class="ft-table"
                    style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                    <tr>
                        <th style="border: 1px solid black;
                                border-collapse: collapse;">
                            Մասնակիցների զբաղեցրած տեղերը
                        </th>
                        <th style="border: 1px solid black;
                                    border-collapse: collapse;">
                            Մասնակցի անվանումը
                        </th>
                        <th style="border: 1px solid black;
                                border-collapse: collapse;">
                            Ընտրված մասնակից<span>
                                /ընտրված մասնակցի համար նշել "X"/
                            </span>
                        </th>
                        <th style="border: 1px solid black;
                                border-collapse: collapse;">
                            Մասնակցի առաջարկած գին / առանց ԱԱՀ, հազ. դրամ /
                        </th>
                    </tr>
                    <template v-if="Boolean(lot.winner)">
                        <template v-for="(participant, index) in lot.participants.filter((item) => item.is_satisfactory)">
                            <tr v-if="isSatisfactory(lot.participants, index)"
                                :key="'' + participant.id + participant.row_group_id">
                                <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ index + 1 }}</td>
                                <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">
                                    {{participant.info ? participant.info.name.hy : ''}}
                                </td>
                                <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                    {{ index === 0 ? 'x' : '' }}
                                </td>
                                <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                    {{ Math.round((currentValue(participant) / 1000) * 100) / 100 }}
                                </td>
                            </tr>
                        </template>
                    </template>
                </table>
                <br>
                <div style="text-align: justify;">
                    Ընտրված մասնակցին որոշելու համար կիրառված չափանիշ՝ հայտեր
                    ներկայացրած և բավարար գնահատված մասնակիցներից նվազագույն
                    գնային առաջարկ ներկայացրած մասնակից:
                </div>
            </div>
            <div class="mt-2 mb-2" v-if="lots.find(lot => lot.participants.length === 1)">
                «Գնումների մասին» ՀՀ օրենքի 10-րդ հոդվածի համաձայն ` 
                <span v-for="(lot, index) in lots.filter(lot => lot.participants.length === 1)" :key="index"> 
                    {{ lot.view_id }} {{index !== lots.filter(lot => lot.participants.length === 1).length - 1 ? ',' : ''}}
                </span>
                /չափաբաժինների համարները/ անգործության ժամկետ չի սահմանվում։
            </div>
            <div>
                <div style="text-align: justify;">
                    «Գնումների մասին» ՀՀ օրենքի 10-րդ հոդվածի համաձայն `
                    անգործության ժամկետ է սահմանվում սույն հայտարարությունը
                    հրապարակվելու օրվան հաջորդող օրվանից մինչ և 10-րդ օրացուցային
                    օրը ներառյալ ընկած ժամանակահատվածը։
                </div>
                <div style="text-align: justify;">
                    Սույն հայտարարության հետ կապված լրացուցիչ տեղեկություններ
                    ստանալու համար կարող եք դիմել «{{currentOrganized.translations.code.hy}}» ծածկագրով գնահատող հանձնաժողովի քարտուղար
                    {{currentOrganized.translations.evaluator_secretary_name.ru ? currentOrganized.translations.evaluator_secretary_name.hy : currentOrganized.translations.evaluator_secretary_name.hy}}ին:
                </div>
                <br>
                <div> Հեռախոս՝ {{ currentOrganized.evaluator_secretary_phone }}</div>
                <div>Էլեկտրոնային փոստ՝ {{ currentOrganized.evaluator_secretary_email }}</div>
                <div>Պատվիրատու` «{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}</div>
            </div>
        </section>
    </vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
    name: 'announce_conc_hy',
    components: { VueHtml2pdf },
    props: ['handleLoaded'],
    data() {
        return {
            lots: [],
            participants: [],
            arr: [],
            count: 0,
        }
    },
    computed: {
        currentOrganized() {
            console.log('currentOrganized', this.$store.getters['organize/currentOrganized'])
            return this.$store.getters['organize/currentOrganized']
        },
        organizedRows() {
            return this.$store.getters['organize/organizedRows']
        },
        me() {
            return this.$store.getters['user/me']
        },
    },
    watch: {
        currentOrganized: {
            immediate: true,
            async handler() {
                this.lots = this.organizedRows
                this.handleLoaded()
            },
        },
    },
    methods: {
        isSatisfactory(participants, index){
            const lot = participants[index];
            const currentLot = this.organizedRows.find(row => row.id === lot.organize_row_id)
            const priceOffer = currentLot.participantsList.find(participant => participant.participant_group_id === lot.row_group_id)
            if(!currentLot.winner){
                return false;
            }
            if(priceOffer && !priceOffer.enough){
                return false;
            }
            if(!participants[index].is_satisfactory){
                return false;
            } else if((participants[index + 1] && participants[index].value === participants[index + 1].value && participants[index].new_value === 0 && participants[index + 1].new_value === 0
                || (participants[index - 1] && participants[index].value === participants[index - 1].value && participants[index].new_value === 0 && participants[index - 1].new_value === 0) 
            )){
                return false;
            } else{
                return true;
            }
        },
        currentValue(participant){
            const currentLot = this.organizedRows.find(row => row.id === participant.organize_row_id)
            const priceOffer = currentLot.participantsList.find(participantItem => participantItem.participant_group_id === participant.row_group_id)

            return priceOffer.current_price
        },
        async beforeDownload({ html2pdf, options, pdfContent }) {
            await html2pdf()
                .set(options)
                .from(pdfContent)
                .toPdf()
                .get('pdf')
                .then((pdf) => {
                    const totalPages = pdf.internal.getNumberOfPages()
                    for (let i = 1; i <= totalPages; i++) {
                        pdf.setPage(i)
                        pdf.setFontSize(11)
                        pdf.setFont('ghea')
                        pdf.setTextColor('#0000ff')
                        pdf.text(
                            'iTender©\nwww.iTender.am',
                            pdf.internal.pageSize.getWidth() * 0.06,
                            pdf.internal.pageSize.getHeight() * 0.95
                        )
                    }
                })
                .save()
        },
        async handleBeforeDownload() {
            await this.handleLoaded()
            return this.$refs.html2Pdf.$el.innerHTML
        },
        download() {
            this.$refs.html2Pdf.generatePdf()
        },
        consoleLog(msg) {
            console.log(msg)
        },
    },
}
</script>
