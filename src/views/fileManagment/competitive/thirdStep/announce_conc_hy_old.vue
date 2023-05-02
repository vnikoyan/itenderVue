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
        ref="html2Pdf"
    >
        <section slot="pdf-content" contenteditable="true">
            <h3
                style="
                    text-align: center;
                    padding: 20px 0 0;
                    font-weight: 600;
                    font-family: GHEA grapalat ;
                "
                
            >
                ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ
            </h3>
            <h4
                style="
                    text-align: center;
                    font-weight: 600;
                    padding: 10px 0 0;
                    font-family: GHEA grapalat ;
                "
                
            >
                պայմանագիր կնքելու որոշման մասին
            </h4>
            <h4
                style="
                    text-align: center;
                    font-weight: 600;
                    padding: 10px 0 0;
                    font-family: GHEA grapalat ;
                "
                
            >
                Ընթացակարգի ծածկագիրը
                {{ currentOrganized.translations.code.hy }}
            </h4>
            <p
                style="padding: 10px 0 0; text-align: justify;"
            >
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
                    >{{
                        me.organisation[0].translations.company_type.hy
                    }}-ն</span
                >
                <span
                    v-else
                    style="font-family: GHEA grapalat; text-align: justify;"
                    >{{
                        me.organisation[0].translations.company_type.hy
                    }}ն</span
                >
                ստորև ներկայացնում է
                {{ currentOrganized.translations.code.hy }} ծածկագրով գնման
                ընթացակարգի արդյունքում պայմանագիր կնքելու որոշման մասին
                տեղեկատվությունը`
            </p>
            <p
                style="text-align: justify;"
            >
                Գնահատող հանձնաժողովի 20__ թվականի ______ __-ի թիվ ___ որոշմամբ
                հաստատվել են ընթացակարգի բոլոր մասնակիցների կողմից ներկայացված
                հայտերի` հրավերի պահանջներին համապատասխանության գնահատման
                արդյունքները։ Համաձյան որի`
            </p>
            <div
                class="lots"
                v-for="(lot, index) in lots"
                :key="index"
                
            >
                <p
                    style="padding: 15px 0 0; font-family: GHEA grapalat "
                    
                >
                    Չափաբաժին {{ lot.view_id }}
                </p>
                <p
                    style="font-family: GHEA grapalat "
                    
                >
                    Գնման առարկա է հանդիսանում` {{ lot.cpv_name }}
                </p>
                <table
                    class="table-1 pdf-item ft-table"
                    style="
                        margin-top: 3rem;
                        width: 100%;
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid  black;
                        margin: 20px auto;
                        padding-bottom: 50px;
                        font-family: GHEA grapalat ;
                        text-align: center;
                    "
                >
                    <tr>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            <span

                                style="
                                    margin-left: -10px;
                                    white-space: nowrap;
                                    font-family: GHEA grapalat ;
                                "
                                >Հ/Հ</span
                            >
                        </th>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            Մասնակցի անվանումը
                        </th>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            Հրավերի պահանջներին համապատասխանող հայտեր<br /><span
                                style="font-weight: 400; font-family: GHEA grapalat "
                                >/համապատասխանելու դեպքում նշել "X"/</span
                            >
                        </th>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            Հրավերի պահանջներին չհամապատասխանող հայտեր<span
                                style="font-weight: 400"

                                >/չհամապատասխանելու դեպքում նշել "X"/</span
                            >
                        </th>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            Անհամապատասխանության համառոտ նկարագրույթուն
                        </th>
                    </tr>
                    <tr
                        style="font-family: GHEA grapalat "
                        v-for="(participant, index) in lot.participants"
                        :key="participant.id"
                    >
                        <td
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{ index + 1 }}
                        </td>
                        <td
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{
                                participant.info
                                    ? '«' + participant.info.name.hy + '»'
                                    : ''
                            }}
                        </td>
                        <td
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{ isSatisfactory(lot.participants, index) ? 'x' : '' }}
                        </td>
                        <td
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{ isSatisfactory(lot.participants, index) ? '' : 'x' }}
                        </td>
                        <td
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        ></td>
                    </tr>
                </table>
                <p><br></p>
                <table
                    class="table-1 pdf-item ft-table"
                    style="
                        width: 100%;
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid  black;
                        margin: 20px auto;
                        padding-bottom: 50px;
                        font-family: GHEA grapalat ;
                        text-align: center;
                    "
                >
                    <tr>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            Մասնակիցների զբաղեցրած տեղերը
                        </th>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            Մասնակցի անվանումը
                        </th>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            Ընտրված մասնակից<span
                                style="font-weight: 400; font-family: GHEA grapalat "
    
                            >
                                /ընտրված մասնակցի համար նշել "X"/
                            </span>
                        </th>
                        <th
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                
                                padding: 8px 18px;
                            "
   
                        >
                            Մասնակցի առաջարկած գին / առանց ԱԱՀ, հազ. դրամ /
                        </th>
                    </tr>
                    <tr
                        style="font-family: GHEA grapalat "
                        v-for="(
                            participant, index
                        ) in lot.participants.filter(
                            (item) => item.is_satisfactory
                        )"
                        :key="
                            '' + participant.id + participant.row_group_id
                        "
                    >
                        <td
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{ index + 1 }}
                        </td>
                        <td
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{
                                participant.info
                                    ? '«' + participant.info.name.hy + '»'
                                    : ''
                            }}
                        </td>
                        <td
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{isSatisfactory(lot.participants, index) && participant.minValue ? 'x' : '' }}
                        </td>
                        <td
                            v-if="
                                Number.isInteger(participant.value / 1000)
                            "
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{ participant.value / 1000 + '.0' }}
                        </td>
                        <td
                            v-else
                            style="
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;
                                padding: 7px 7px;
                                
                            "
   
                        >
                            {{ participant.value / 1000 }}
                        </td>
                    </tr>
                </table>
                <p><br></p>
                <p
                    style="text-align: justify;"
                >
                    Ընտրված մասնակցին որոշելու համար կիրառված չափանիշ՝ հայտեր
                    ներկայացրած և բավարար գնահատված մասնակիցներից նվազագույն
                    գնային առաջարկ ներկայացրած մասնակից:
                </p>
            </div>
            <div style="display: flex; flex-flow: column nowrap">
                <p
                    style="text-align: justify;"
                >
                    «Գնումների մասին» ՀՀ օրենքի 10-րդ հոդվածի համաձայն `
                    անգործության ժամկետ է սահմանվում սույն հայտարարությունը
                    հրապարակվելու օրվան հաջորդող օրվանից մինչ և 5-րդ օրացուցային
                    օրը ներառյալ ընկած ժամանակահատվածը։
                </p>
                <p
                    style="text-align: justify;"
                >
                    Սույն հայտարարության հետ կապված լրացուցիչ տեղեկություններ
                    ստանալու համար կարող եք դիմել «{{
                        currentOrganized.translations.code.hy
                    }}» ծածկագրով գնահատող հանձնաժողովի քարտուղար
                    {{
                        currentOrganized.translations.evaluator_secretary_name
                            .ru
                            ? currentOrganized.translations
                                  .evaluator_secretary_name.hy
                            : currentOrganized.translations
                                  .evaluator_secretary_name.hy
                    }}ին:
                </p>

                <p
                    style="font-family: GHEA grapalat "
                    
                >
                    Հեռախոս՝ {{ currentOrganized.evaluator_secretary_phone }}
                </p>
                <p
                    style="font-family: GHEA grapalat "
                    
                >
                    Էլեկտրոնային փոստ՝
                    {{ currentOrganized.evaluator_secretary_email }}
                </p>
                <p
                    style="font-family: GHEA grapalat "
                    
                >
                    Պատվիրատու` «{{ me.organisation[0].translations.name.hy }}»
                    {{ me.organisation[0].translations.company_type.hy }}
                </p>
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
            newProps: false,
            arr: [],
            count: 0,
        }
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organize/currentOrganized']
        },
        me() {
            return this.$store.getters['user/me']
        },
    },
    watch: {
        currentOrganized: {
            immediate: true,
            async handler() {
                await this.$client
                    .get(
                        `/organize-row/getByOrganizeParticipmants/${this.$route.params.id}`
                    )
                    .then((response) => {
                        this.lots = response.data
                            .map((elem) => {
                                if (elem.participants.length) {
                                    let participantsSordtedByValue =
                                        elem.participants.sort(
                                            (a, b) => a.value - b.value
                                        )
                                    const minParticipantValue =
                                        participantsSordtedByValue[0].value
                                    participantsSordtedByValue =
                                        participantsSordtedByValue.map(
                                            (participant) => {
                                                return {
                                                    ...participant,
                                                    minValue:
                                                        participant.value ===
                                                        minParticipantValue,
                                                }
                                            }
                                        )
                                    return {
                                        view_id: elem.view_id,
                                        cpv_name: elem.is_from_outside
                                            ? elem.procurement_plan.cpv_outside
                                                  .name
                                            : elem.procurement_plan.cpv.name,
                                        participants:
                                            participantsSordtedByValue,
                                    }
                                }
                            })
                            .filter((lot) => !!lot)
                    })
                this.handleLoaded()
            },
        },
    },
    methods: {
        isSatisfactory(participants, index){
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
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.html2Pdf.$el.innerHTML
        },
        download() {
            this.$refs.html2Pdf.generatePdf()
            this.newProps = false
        },
        consoleLog(msg) {
            console.log(msg)
        },
    },
}
</script>
