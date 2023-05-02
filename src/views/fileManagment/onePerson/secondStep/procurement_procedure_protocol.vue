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
            <div style="text-align: left;margin-bottom: 10px;line-height:24px;">___.____.2021թ</div>
            <div style="text-align: center;font-weight: 600;">ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ</div>
            <div  style="text-align: center; font-weight: 600;">{{ currentOrganized.code }} ԾԱԾԿԱԳՐՈՎ ԳՆՄԱՆ ԸՆԹԱՑԱԿԱՐԳԻ</div>
            <br>
            <div style="text-align: justify;">
                <b class="b-number">1. Պատվիրատուի անվանումը և գտնվելու վայրը</b>
                <div style="text-align: justify;margin-bottom: 10px;line-height:24px;">
                    <span style="text-align: justify;">«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }},</span>
                    <span style="text-align: justify;" v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">{{ me.organisation[0].translations.city.hy }},</span>
                    <span style="text-align: justify;" v-else>{{ me.organisation[0].translations.region.hy }}, {{ me.organisation[0].translations.city.hy }},</span>
                    {{ me.organisation[0].translations.address.hy }}:
                </div>
            </div>
            <div>
                <b class="b-number">2. Գնման անհրաժեշտությունը, գնման ընթացակարգի ընտրության հիմնավորումը</b>
                <div  style="text-align: justify; margin-bottom: 10px;line-height:24px;">
                    Պատվիրատուի կողմից {{ currentOrganized.code }} ծածկագրով գնանշման հարցման ընթացակարգի գնման առարկան է՝ 
                    «{{ me.organisation[0].translations.name.hy }}»
                    <span style="text-align: justify" v-if="me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' ||
                    me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' ||
                    me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ՍՊԸ' ||
                    me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' ||  me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{ me.organisation[0].translations.company_type.hy }}-ի</span>
                    <span  style="text-align: justify" v-else>{{ me.organisation[0].translations.company_type.hy }}ի</span>
                    կարիքների համար «<span style="text-align: justify">{{currentOrganized.name}}</span>»-ի ձեռք բերումը:
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման գործընթացը կազմակերպվել է համաձայն մեկ անձից գնման գործընթացով, համաձայն Գնումների մասին օրենքի 23-րդ հոդվածի։
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Վերը նշված ապրանքների տեխնիկական բնութագրերը ներկայացված են գնումների մասին
                    ՀՀ օրենսդրությամբ սահմանված կարգով հրապարակված հրավերի  պայմանագրի նախագծի Տեխնիկական բնութագրում` հավելված 1-ում /կցվում են/: 
                </div>
            </div>
            <div>
                <b  class="b-number">3. Հրավերը և դրանում կատարված փոփոխությունները</b>
                <div  style="text-align: justify;margin-bottom: 10px;line-height:24px;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Հրավերը կցվում է: Հրավերում փոփոխություն  տեղի չի ունեցել:
                </div>
            </div>
            <div>
                <b  class="b-number">4. Գնման վերաբերյալ ստացված հարցումները և ներկայացված պարզաբանումները</b>
                <div  style="text-align: left;margin-bottom: 10px;line-height:24px;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման վերաբերյալ հարցումներ չեն եղել և պարզաբանումներ չեն տրամադրվել:
                </div>
            </div>
            <div>
                <b  class="b-number" style="text-align: justify;">5. Հայտեր ներկայացրած մասնակիցների տվյալները` անվանումը, գտնվելու վայրը, կապի միջոցները:</b>
                    <div><span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Հրավերի հիման վրա  հայտեր են ներկայացրել՝</div>
                    <br>
                    <table  style="width: 100%;
                         
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid black;
                        border-collapse: collapse;
                        text-align: center;" cellspacing="8" cellpadding="8">
                        <thead>
                            <tr>
                                <th  style="border: 1px solid black;
                                            border-collapse: collapse;"></th>
                                <th  style="border: 1px solid black;
                                            border-collapse: collapse;">Մասնակցի անվանումը</th>
                                <th  style="border: 1px solid black;
                                            border-collapse: collapse;">Մասնակցի հասցեն և հեռախոսահամարը</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(participantItem, participantIndex) in currentOrganized.participants">
                                <tr class='full-row' :key="participantIndex.toString() + participantIndex + Math.random()">
                                    <td  style="border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;">{{ participantIndex+1 }}</td>
                                    <td  style="border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;">{{ participantItem.name }}</td>
                                    <td  style="border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;">{{ participantItem.address }}</td>
                                </tr>
                            </template>
                            <tr
                                v-for="(participant, index) in participants"
                                :key="participant.id"
                            >
                                <td  style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ index + 1 }}</td>
                                <td  style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participant.name.hy }}</td>
                                <td  style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participant.address + ',' }} {{ participant.participant[0].phone }}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            <br>
            <div>
                <b class="b-number">6. Հայտերով ներկայացված գները</b>
                <div  style="text-align: left;margin-bottom: 10px;line-height:24px;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Մասնակիցների կողմից առաջարկած պայմանագրի կատարման գները հետևյալն են
                </div>
                <br>
                <table style="width: 100%;
                         
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid black;
                        border-collapse: collapse;
                        text-align: center;" cellspacing="8" cellpadding="8">
                    <thead>
                    <tr class='full-row'>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;" rowspan="2">Հ/Հ</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;" rowspan="2">Մասնակցի անվանում</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;" colspan="3">Մասնակցի գնային առաջարկ</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;" rowspan="2">Նախահաշվային գին</th>
                    </tr>
                    <tr>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Արժեք</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">ԱԱՀ</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Ընդամենը</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(organizedRow, organizedIndex) in currentOrganized.organize_rows">
                        <tr class='full-row' :key="organizedRow.toString() + organizedIndex + Math.random()">
                        <td  colspan="6" 
                            style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">Չափաբաժին {{ organizedRow.view_id }}՝ {{ organizedRow.procurement_plan.cpv.code }} - {{ organizedRow.procurement_plan.cpv.name }}</td>
                        </tr>
                        <template v-for="(participant, participantIndex) in organizedRow.participants">
                        <tr class='full-row' :key="participant.toString() + participantIndex + Math.random()">
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ participantIndex+1 }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ participant.user_info ? participant.user_info.name.hy :  participant.info.name.hy }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ participant.value }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ participant.vat }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ participant.value+participant.vat }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ organizedRow.procurement_plan.details[0].unit_amount*organizedRow.count }}</td>
                        </tr>
                        </template>
                    </template>
                    </tbody>
                </table>
            </div>
            <br>
            <div>
                <b class="b-number">7. Հայտերի գնահատման կարգը և դրանց գնահատման արդյունքները</b>
                <div style="text-align: justify;margin-bottom: 10px;line-height:24px;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Առաջին տեղ զբաղեցնող մասնակցին որոշելու համար կիրառված չափանիշ հայտ ներկայացրած և
                    բավարար գնահատված մասնակիցներից՝ նվազագույն գնային առաջարկ ներկայացրած մասնակից:
                    <br>
                    Առաջարկված հայտի հիման վրա հանձնաժողովը որոշեց.
                </div>
                <br>
                <div class="info-block">
                    <table
                        style="width: 100%;
                         
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid black;
                        border-collapse: collapse;
                        text-align: center;" cellspacing="8" cellpadding="8">
                    <tr class='full-row' >
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Հ/Հ</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Մասնակիցը</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Չափաբաժինը</th>
                    </tr>
                    <template v-if="participantsSequence.length">
                        {{ handleLoaded() }}
                    </template>
                    <tr v-for="(winner, winnerIndex) in currentOrganized.winners" :key="winner.id">
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ winnerIndex + 1 }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ winner.name }} </td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">
                            <template v-if="!currentOrganized.winner_by_lots">
                                <span v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="row.id">
                                    {{row.view_id}}<span v-if="rowIndex !== currentOrganized.organize_rows.length-1">,</span>
                                </span>
                            </template>
                            <template v-else>
                                <span  v-for="(row, rowIndex) in winner.won_lots" :key="row.id">
                                    {{row.view_id}}<span v-if="rowIndex !== winner.won_lots.length-1">,</span>
                                </span>
                            </template>
                        </td>
                    </tr>
                    </table>
                </div>
            </div>
            <br>
            <div>
                <b  class="b-number">8. Հայտերի մերժման դեպքում դրանց հիմնավորումը</b>
                <div  style="text-align: left;margin-bottom: 10px;line-height:24px;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Մերժված հայտեր չկան
                </div>
            </div>
            <div>
                <b  class="b-number">9. Պայմանագիրը կամ պայմանագիր չկնքվելու դեքում, դրա հիմնավորումը</b>
                <div  style="text-align: left;margin-bottom: 10px;line-height:24px;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Ընտրված մասնակցի հետ կնքվել է պայմանագիր: 
                    <br>
                </div>
                <div v-if="lots.length!==0">
                    <div   v-for="(lot) in lots" :key="lot.id">
                        <span v-if="lot.view_id === 1">{{lot.view_id}}-ին </span>
                        <span v-else>{{lot.view_id}}-րդ </span>
                        <span>
                            չափաբաժինը հայտարարվել է չկայացած:
                        </span>
                    </div>
                </div>
            </div>
            <br>
            <div>
                <b  class="b-number" style="text-align: justify;">10. Հակաօրինական գործողությունների հայտնաբերելու դեպքում դրանց և այդ կապակցությամբ ձեռնարկված գործողությունների համառոտ նկարագրի մասին</b>
                <div  style="text-align: left;margin-bottom: 10px;line-height:24px;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Մասնակիցների կողմից հակաօրինական գործողություններ չեն հայտնաբերվել:
                </div>
            </div>
            <div>
                <b  class="b-number">11. Ներկայացված բողոքների և դրանց վերաբերյալ կայացված որոշումների մասին</b>
                <div  style="text-align: left;margin-bottom: 10px;line-height:24px;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Բողոքներ չեն ներկայացվել:
                </div>
            </div>
            <div>
                <b  class="b-number">12. Այլ անհրաժեշտ տեղեկություններ</b>
                <div  style="text-align: left;margin-bottom: 10px;line-height:24px; font-family: GHEA grapalat ;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Չկան
                </div>
            </div>
            <br>
            <div style="text-align: justify;">
                <div align="center" v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}-ի</div>
                <div align="center" v-else>«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}ի</div>
                <div class="ml-5">{{ me.organisation[0].translations.director_position.hy }}՝ <span class="ml-5">{{ me.organisation[0].translations.director_name.hy }}</span></div>
                <div align="center">Կ.Տ</div>
            </div>
        </section>
    </vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
    name: 'procurement_procedure_protocol',
    components: { VueHtml2pdf },
    props: ['handleLoaded'],
    data() {
        return {
            participants: [],
            incorrectParticipants: [],
            participantsSequence: [],
            organizedRows: [],
            lots: [],
            totalMembers: 0, 
            newProps: false,
        }
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organizeOnePerson/currentOrganized']
        },
        me() {
            return this.$store.getters['user/me']
        },
    },
    watch: {
        currentOrganized: {
            immediate: true,
            async handler() {
                this.lots = [];
                this.currentOrganized.organize_rows.forEach(row => {
                    if(row.winner_user_id === 0){
                        this.lots.push(row)
                    }
                });
                this.handleLoaded()
            },
        },
    },
    methods: {
        consoleLog(data){
            console.log(data)
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
