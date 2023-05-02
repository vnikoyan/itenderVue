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
        ref="html2Pdf"
    >
        <section slot="pdf-content" contenteditable="true">
            <p style="text-align: left;margin-bottom: 10px;line-height:24px">
                ___.____.2021թ /պայմանագրի կնքման ամսաթվից 3 աշխ. Օր/
            </p>
            <h3 style="text-align: center; padding: 20px 0 0; font-weight: 600">
                ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ
            </h3>
            <h4 style="text-align: center; font-weight: 600; padding: 10px 0 0">
               {{ currentOrganized.code }} ԾԱԾԿԱԳՐՈՎ ԳՆՄԱՆ ԸՆԹԱՑԱԿԱՐԳԻ
            </h4>
            <br>
            <div>
                <b class="b-number">1. Պատվիրատուի անվանումը և գտնվելու վայրը</b>
                <p style="text-align: left;margin-bottom: 10px;line-height:24px">
                    «{{ me.organisation[0].translations.name.hy }}»
                    {{ me.organisation[0].translations.company_type.hy }},
                    {{ me.organisation[0].translations.region.hy }},
                    {{ me.organisation[0].translations.city.hy }},
                    {{ me.organisation[0].translations.address.hy }}:
                </p>
            </div>
            <br>
            <div>
                <b class="b-number">2. Գնման անհրաժեշտությունը, գնման ընթացակարգի ընտրության հիմնավորումը</b>
                <p style="text-align: left;margin-bottom: 10px;line-height:24px">
                    Պատվիրատուի կողմից {{ currentOrganized.code }} ծածկագրով գնանշման հարցման ընթացակարգի գնման առարկան է՝ 
                    «{{ me.organisation[0].translations.name.hy }}»-ի կարիքների համար {{currentOrganized.name}} ձեռք բերումը:
                    <br>
                    <br>
                    Գնման գործընթացը կազմակերպվել է համաձայն գնանշման հարցման ընթացակարգի`
                    «Գնումների մասին» ՀՀ օրենքի 22-րդ հոդվածի 1-ի մասի 3-րդ կետի:
                    <br>
                    <br>
                    Վերը նշված ապրանքների տեխնիկական բնութագրերը ներկայացված են գնումների մասին
                    ՀՀ օրենսդրությամբ սահմանված կարգով հրապարակված հրավերի  պայմանագրի նախագծի Տեխնիկական բնութագրում` հավելված 1-ում /կցվում են/:
                </p>
            </div>
            <br>
            <div>
                <b class="b-number">3. Հրավերը և դրանում կատարված փոփոխությունները</b>
                <p style="text-align: left;margin-bottom: 10px;line-height:24px">
                    Հրավերը կցվում է: Հրավերում փոփոխություն  տեղի չի ունեցել:
                </p>
            </div>
            <br>
            <div>
                <b class="b-number">4. Գնման վերաբերյալ ստացված հարցումները և ներկայացված պարզաբանումները</b>
                <p style="text-align: left;margin-bottom: 10px;line-height:24px">
                    Գնման վերաբերյալ հարցումներ չեն եղել և պարզաբանումներ չեն տրամադրվել:
                </p>
            </div>
            <br>
            <div>
                <b class="b-number">5. Հայտեր ներկայացրած մասնակիցների տվյալները` անվանումը, գտնվելու վայրը, կապի միջոցները:</b>
                <br>
                <br>
                Հրավերով սահմանված ժամկետում ոչ մի հայտ չի ներկայացվել, ուստի գնահատող հանձնաժողովը որոշել է գնման ընթացակարգը հայտարարել չկայացած:
            </div>
            <br>
            <div style="display: flex; flex-flow: column nowrap">
                <p align="center">«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}-ի</p>
                <p class="ml-5">Պատվիրատուի ղեկավար`<span class="ml-1">_______________ {{ me.organisation[0].translations.director_name.hy }}</span></p>
                <p align="center">Կ.Տ</p>
            </div>
        </section>
    </vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
    name: 'procurement_procedure_protocol_declined',
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
        },
    },
}
</script>
<style>
.tab{
   margin-left: 25px;
}
</style>
