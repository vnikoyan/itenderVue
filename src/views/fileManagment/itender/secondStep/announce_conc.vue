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
            margin: [12, 12, 20, 12],
            filename: 'Обьявление о решении заключения договора.pdf',
            html2canvas: {
                scrollX: 0,
                scrollY: 0,
            },
        }"
        ref="html2Pdf">
        <section slot="pdf-content" contenteditable="true" style="font-size: 14px;">
            <div  style="text-align: center;font-weight: 600;">ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</div>
            <div  style="text-align: center; font-weight: 600;">պայմանագիր կնքելու որոշման մասին</div>
            <div  style="text-align: center; font-weight: 600;">Ընթացակարգի ծածկագիրը {{ currentOrganized.code }}</div>
            <div style="text-align: justify; margin-top: 20px;">
                «{{ me.organisation[0].translations.name.hy }}» 
                <span v-if="me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ'">{{me.organisation[0].translations.company_type.hy}}-ը</span>
                <span v-else-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ'">{{me.organisation[0].translations.company_type.hy}}-ն</span>
                <span v-else>{{me.organisation[0].translations.company_type.hy}}ը</span> 
                ստորև ներկայացնում է {{ currentOrganized.code }} ծածկագրով գնման ընթացակարգի արդյունքում պայմանագիր կնքելու որոշման մասին տեղեկատվությունը`
            </div>
            <div style="text-align: justify;">
                Պատասխանատու ստորաբաժանման ղեկավարի կայացած նիստի թիվ 1 արձանագրության 3.4 կետով արձանագրված որոշմամբ հաստատվել են ընթացակարգի 
                բոլոր մասնակիցների կողմից ներկայացված հայտերի` հրավերի պահանջներին համապատասխանության գնահատման արդյունքները։ Համաձայն որի`
            </div>
            <br>
            <div class="lots" v-for="(lot, index) in lots" :key="index">
                <p>Չափաբաժին {{ lot.view_id }}</p>
                <p>Գնման առարկա է հանդիսանում` {{ lot.cpv_name }}</p>
                <br>
                <table                        
                    style="width: 100%;
                     
                    table-layout: fixed;
                    border-collapse: collapse;
                    page-break-inside: avoid;
                    border: 1px solid black;
                    border-collapse: collapse;
                    text-align: center;" cellspacing="8" cellpadding="8">
                    <tr>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">
                            <span>Հ/Հ</span>
                        </th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Մասնակցի անվանումը</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">
                                Հրավերի պահանջներին համապատասխանող հայտեր<br /><span 
                                style="font-weight: 400; ">/համապատասխանելու դեպքում նշել "X"/</span>
                        </th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">
                            Հրավերի պահանջներին չհամապատասխանող հայտեր<span style="font-weight: 400; ">/չհամապատասխանելու դեպքում նշել "X"/</span>
                        </th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Անհամապատասխանության համառոտ նկարագրույթուն</th>
                    </tr>
                    <tr
                        v-for="(participant, index) in lot.participants"
                        :key="participant.id"
                    >
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ index + 1 }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">
                            {{participant.user_info ? '«' + participant.user_info.name.hy + '»'  : participant.info.name.hy}} {{participant.user_info ? participant.user_info.organisation.company_type.hy : ''}}
                        </td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">
                            {{ participant.is_satisfactory === 1 ? 'x' : '' }}
                        </td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">
                            {{ participant.is_satisfactory === 0 ? 'x' : '' }}
                        </td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;"></td>
                    </tr>
                </table>
                <br>
                <table style="width: 100%;
                         
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid black;
                        border-collapse: collapse;
                        text-align: center;" cellspacing="8" cellpadding="8">
                    <tr>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Մասնակիցների զբաղեցրած տեղերը</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Մասնակցի անվանումը</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">
                                Ընտրված մասնակից<span  style="font-weight: 400; ">
                                /ընտրված մասնակցի համար նշել "X"/
                            </span>
                        </th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">
                            Մասնակցի առաջարկած գին / առանց ԱԱՀ, հազ. դրամ
                            /
                        </th>
                    </tr>
                    <tr
                        v-for="(participant, index) in lot.participants.filter(item=>item.is_satisfactory)"
                        :key="'' + participant.id + participant.row_group_id"
                    >
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ index + 1 }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">
                            {{participant.user_info ? '«' + participant.user_info.name.hy + '»'  : participant.info.name.hy}} {{participant.user_info ? participant.user_info.organisation.company_type.hy : ''}}
                        </td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ participant.minValue ? 'x' : '' }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;" v-if="participant.value / 1000 === 0">{{ participant.value / 1000}}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;" v-else-if="Number.isInteger(participant.value / 1000)">
                            {{ participant.value / 1000 + '.0' }}
                        </td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;" v-else>{{ participant.value / 1000}}</td>
                    </tr>
                </table>
                <br>
                <div style=" text-align: justify">
                    Ընտրված մասնակցին որոշելու համար կիրառված չափանիշ՝ <br>
                    Ընտրված մասնակիցը ճանաչվել է բավարար գնահատված հայտեր ներկայացրած մասնակիցների թվից՝ 
                    նվազագույն գնային առաջարկ ներկայացրած մասնակցին նախապատվություն տալու սկզբունքով:
                </div>
            </div>
            <br>
            <div>
                <div>Անգործության ժամկետը կիրառելի չէ։</div>
                <div style="text-align: justify;">
                    Սույն հայտարարության հետ կապված լրացուցիչ տեղեկություններ ստանալու համար կարող եք դիմել
                    «{{ currentOrganized.code }}»
                    ծածկագրով ընթացակարգի գնումների համակարգող՝
                    {{ me.name}}ին։
                </div>
                <div>Հեռախոս` {{ me.organisation[0].phone }}</div>
                <div>
                    Էլեկտրոնային փոստ`
                    {{ getSubordinateUser().email || me.email }}
                </div>
                <div>
                    Պատվիրատու` «{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }} 
                </div>
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
        }
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organizeItender/currentOrganized']
        },
        me() {
            return this.$store.getters['user/me']
        },
        userChildren() {
            return this.$store.getters['user/userChildren']
        },
    },
    watch: {
    currentOrganized: {
        immediate: true,
        async handler() {
            this.lots = this.currentOrganized.organize_rows.map((elem) => {
                if (elem.participants.length) {
                    let participantsSordtedByValue = elem.participants.sort(
                        (a, b) => a.value - b.value
                    )
                    const minParticipantValue =
                        participantsSordtedByValue[0].value
                    participantsSordtedByValue = participantsSordtedByValue.map(
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
                        view_id : elem.view_id,
                        cpv_name: elem.is_from_outside ? elem.procurement_plan.cpv_outside.name : elem.procurement_plan.cpv.name,
                        participants: participantsSordtedByValue,
                    }
                    
                }
            }).filter(lot => !!lot)
            await this.handleLoaded();
        },
        
        }
    },
    methods: {
        consoleLog(a){
            console.log(a)
        },
        getSubordinateUser() {
            const row = this.currentOrganized.organize_rows[0].procurement_plan
            var userId = 0;
            if(row.user_id_1){
                userId = row.user_id_1
            } else if(row.user_id_2){
                userId = row.user_id_2
            } else if(row.user_id_3){
                userId = row.user_id_3
            } else if(row.user_id_4){
                userId = row.user_id_4
            } else if(row.user_id_5){
                userId = row.user_id_5
            }
            const found = this.userChildren.find(user => user.id === userId)
            if(found) {
                return found
            }
            return 'կցված չէ'
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
                        pdf.setFontSize(10)
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
        download() {
            this.$refs.html2Pdf.generatePdf()
            this.newProps = false
        },
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.html2Pdf.$el.innerHTML
        },
    },
}
</script>
<style scoped>
    *{
        font-family: GHEA grapalat !important;
    }
</style>
