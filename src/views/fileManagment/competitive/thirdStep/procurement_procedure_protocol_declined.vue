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
            <div><span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>___.____.{{new Date().getFullYear()}}թ</div>
            <br>
            <div style="text-align: center;font-weight: 600;">ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ</div>
            <div style="text-align: center; font-weight: 600;">{{ currentOrganized.translations.code.hy }} ԾԱԾԿԱԳՐՈՎ ԳՆՄԱՆ ԸՆԹԱՑԱԿԱՐԳԻ</div>
            <br>
            <div>
                <b class="b-number">1. Պատվիրատուի անվանումը և գտնվելու վայրը</b>
                <div style="text-align: justify;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }},
                    <span v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">{{ me.organisation[0].translations.city.hy }},</span>
                    <span v-else>{{ me.organisation[0].translations.region.hy }}, {{ me.organisation[0].translations.city.hy }},</span>
                    {{ me.organisation[0].translations.address.hy }}:
                </div>
            </div>
            <div>
                <b class="b-number">2. Գնման անհրաժեշտությունը, գնման ընթացակարգի ընտրության հիմնավորումը</b>
                <div>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Պատվիրատուի կողմից {{ currentOrganized.translations.code.hy }} ծածկագրով գնանշման հարցման ընթացակարգի գնման առարկան է՝ 
                    «{{ me.organisation[0].translations.name.hy }}»
                    <span v-if="me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' ||
                    me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' ||
                    me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ՍՊԸ' ||
                    me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' ||  me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{ me.organisation[0].translations.company_type.hy }}-ի</span>
                    <span v-else>{{ me.organisation[0].translations.company_type.hy }}ի</span>
                    կարիքների համար «<span>{{currentOrganized.translations.name.hy}}</span>»-ի ձեռք բերումը:
                    <br>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման գործընթացը կազմակերպվել է համաձայն գնանշման հարցման ընթացակարգի`
                    «Գնումների մասին» ՀՀ օրենքի 22-րդ հոդվածի 1-ի մասի 3-րդ կետի:
                    <br>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Վերը նշված ապրանքների տեխնիկական բնութագրերը ներկայացված են գնումների մասին
                    ՀՀ օրենսդրությամբ սահմանված կարգով հրապարակված հրավերի  պայմանագրի նախագծի Տեխնիկական բնութագրում` հավելված 1-ում /կցվում են/: 
                </div>
            </div>
            <div>
                <b class="b-number">3. Հրավերը և դրանում կատարված փոփոխությունները</b>
                <div>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Հրավերը կցվում է: Հրավերում փոփոխություն  տեղի չի ունեցել:
                </div>
            </div>
            <div>
                <b class="b-number">4. Գնման վերաբերյալ ստացված հարցումները և ներկայացված պարզաբանումները</b>
                <div>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման վերաբերյալ հարցումներ չեն եղել և պարզաբանումներ չեն տրամադրվել:
                </div>
            </div>
            <div>
                <b class="b-number">5. Հայտեր ներկայացրած մասնակիցների տվյալները` անվանումը, գտնվելու վայրը, կապի միջոցները:</b>
                Հրավերով սահմանված ժամկետում ոչ մի հայտ չի ներկայացվել, ուստի գնահատող հանձնաժողովը որոշել է գնման ընթացակարգը հայտարարել չկայացած:
            </div>
            <br>
            <div>
                <p align="center" v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}-ի</p>
                <p align="center" v-else>«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}ի</p>
                <p class="ml-5">{{ me.organisation[0].translations.director_position.hy }}՝ <span>{{ me.organisation[0].translations.director_name.hy }}</span></p>
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
            newProps: false,
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
                            .filter((lot) => {
                                const hasIsSatisfactory = lot.participants.reduce(
                                    (acc, currentParticipant) => {
                                        return (
                                            acc +
                                            currentParticipant.is_satisfactory
                                        )
                                    },
                                    0
                                )

                                const hasParticipants =
                                    lot.participants.length > 0

                                const summVatValue = lot.participants.filter(
                                    (part) => {
                                        if (!part.new_value) {
                                            return (
                                                part.value + part.vat >
                                                lot.procurement_plan.details[0].unit_amount * lot.count
                                            )
                                        } else {
                                            return (
                                                part.new_value +
                                                    (part.vat
                                                        ? part.new_value *
                                                            0.2
                                                        : 0) >
                                                lot.procurement_plan.details[0].unit_amount * lot.count
                                            )
                                        }
                                    }
                                )

                                // console.log('Has parts: ' + hasParticipants)
                                // console.log(
                                //     'Summ vat + value length: ' +
                                //         summVatValue.length +
                                //         ' All parts length: ' +
                                //         lot.participants.length
                                // )
                                // console.log(
                                //     'Has satisfactory: ' + hasIsSatisfactory
                                // )
                                return (
                                    (hasIsSatisfactory === 0 &&
                                        hasParticipants) ||
                                    !hasParticipants ||
                                    summVatValue.length ===
                                        lot.participants.length
                                )
                            })
                            .filter((lot) => !!lot)
                            this.handleLoaded(); 
                    })
                this.totalMembers = this.currentOrganized.evaluator_member.length+(this.currentOrganized.translations.evaluator_president.hy!==''?1:0);
                await this.$client.get(`participant-group/getByOrganize/${this.$route.params.id}`).then(response => {
                    const participantsData = response.data;
                    const incorrectParticipants = [];
                    participantsData.forEach((participantItem) => {
                    if(participantItem.lots.length===0){
                        incorrectParticipants.push(participantItem)
                    } else if(participantItem.lots.filter(item=>!item.is_satisfactory).length>0) {
                        incorrectParticipants.push(participantItem)
                    }
                    })
                    this.incorrectParticipants = incorrectParticipants
                    this.participants = participantsData
                })
                await this.$client.get(`organize-row/getByOrganizeParticipmants/${this.$route.params.id}`).then(response => {
                    const rows = response.data;
                    rows.forEach((row) => {
                    const rowParticipants = row.participants
                    row.winners=[];
                    this.$client.get(`participant-row/getWinnerByOrganizeRowId/${row.id}`).then(response => {
                        const results = response.data;
                        const comparisonResultObj = {participants: results, winners: results.filter(item=>item.winner===true)}
                        row.winners = comparisonResultObj.winners
                    })
                    const sortedRowParticipants = rowParticipants.sort(function (a, b) {
                        if (a.value > b.value) {
                        return 1;
                        }
                        if (a.value < b.value) {
                        return -1;
                        }
                        return 0;
                    });
                    row.participants = sortedRowParticipants
                    row.satisfactory_participants = sortedRowParticipants.filter(item=>item.is_satisfactory)
                    })
                    this.organizedRows = rows
                })
                const participantsSequence = [];
                var maxCountParticipants = 1;
                await this.organizedRows.forEach(organizedRow => {
                    if(organizedRow.satisfactory_participants.length>maxCountParticipants){
                    maxCountParticipants = organizedRow.satisfactory_participants.length;
                    }
                });
                const sequenceCount = maxCountParticipants;
                for (let i = 0; i < sequenceCount; i++) {
                    const participants = [];
                    this.organizedRows.map((row) => {
                    if(row.satisfactory_participants[i]){
                        participants.push(row.satisfactory_participants[i])
                    }
                    })
                    participantsSequence.push({
                    order: i+1,
                    participants: participants,
                    })
                }
                await participantsSequence.forEach((participantSequence) => {
                    const currentParticipants = participantSequence.participants
                    currentParticipants.forEach(participant => {
                    participant.organizedRows = []
                    currentParticipants.filter((value) => value.info.id === participant.info.id).map((value) => {
                        participant.organizedRows.push(value.organize_row_id)
                    })
                    });
                })
                await participantsSequence.forEach((participantSequence) => {
                    const currentParticipants = participantSequence.participants
                    currentParticipants.forEach(participant => {
                    const sameParticipant = currentParticipants.filter((value) => value.info.id === participant.info.id)
                    if(sameParticipant.length>1){
                        const sameLastParticipant = sameParticipant[sameParticipant.length-1]
                        const indexOfSameLastParticipant = currentParticipants.indexOf(sameLastParticipant)
                        currentParticipants.splice(indexOfSameLastParticipant, 1);
                    }
                    });
                    participantSequence.participants = currentParticipants
                })
                this.participantsSequence = participantsSequence;
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
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.html2Pdf.$el.innerHTML
        },
        download() {
            this.$refs.html2Pdf.generatePdf()
            this.newProps = false
        },
    },
}
</script>
<style>
.table-1 {
    page-break-inside: avoid;
}
.tab{
   margin-left: 25px;
}
</style>
<style scoped>
    *{
        font-family: GHEA grapalat  !important;
    }
</style>
