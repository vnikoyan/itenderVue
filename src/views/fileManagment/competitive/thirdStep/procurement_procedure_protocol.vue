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
            <div><span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>____._____.{{new Date().getFullYear()}}թ</div>
            <br>
            <div style="text-align: center;font-weight: 600;">ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ</div>
            <div style="text-align: center;font-weight: 600;">{{ currentOrganized.translations.code.hy }} ԾԱԾԿԱԳՐՈՎ ԳՆՄԱՆ ԸՆԹԱՑԱԿԱՐԳԻ</div>
            <br/>
            <div>
                <b class="b-number">1. Պատվիրատուի անվանումը և գտնվելու վայրը</b>
                <div style="text-align: justify;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>«{{
                        me.organisation[0].translations.name.hy}}» {{ me.organisation[0].translations.company_type.hy }},
                    <span style="text-align: justify;" v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">{{ me.organisation[0].translations.city.hy }},</span>
                    <span style="text-align: justify;" v-else>{{ me.organisation[0].translations.region.hy }},
                        {{ me.organisation[0].translations.city.hy }},</span>{{ me.organisation[0].translations.address.hy }}:
                </div>
            </div>
            <div>
                <b class="b-number">2. Գնման անհրաժեշտությունը, գնման ընթացակարգի ընտրության հիմնավորումը</b>
                <div style="text-align: justify;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Պատվիրատուի կողմից
                    {{ currentOrganized.translations.code.hy }} ծածկագրով
                    գնանշման հարցման ընթացակարգի գնման առարկան է՝ «{{me.organisation[0].translations.name.hy}}»
                    <span
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
                                'ՊՈԱԿ'">{{me.organisation[0].translations.company_type.hy}}-ի</span>
                    <span v-else>{{me.organisation[0].translations.company_type.hy}}ի</span>կարիքների համար «<span>{{ currentOrganized.translations.name.hy }}</span>»-ի ձեռք բերումը:
                    <br/>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման գործընթացը կազմակերպվել է համաձայն
                    գնանշման հարցման ընթացակարգի` «Գնումների մասին» ՀՀ օրենքի
                    22-րդ հոդվածի 1-ի մասի 3-րդ կետի:
                    <br/>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Վերը նշված ապրանքների տեխնիկական
                    բնութագրերը ներկայացված են գնումների մասին ՀՀ օրենսդրությամբ
                    սահմանված կարգով հրապարակված հրավերի պայմանագրի նախագծի
                    Տեխնիկական բնութագրում` հավելված 1-ում /կցվում են/:
                </div>
            </div>
            <div>
                <b class="b-number">3. Հրավերը և դրանում կատարված փոփոխությունները</b>
                <div><span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Հրավերը կցվում է: Հրավերում փոփոխություն տեղի չի ունեցել:</div>
            </div>
            <div>
                <b class="b-number">4. Գնման վերաբերյալ ստացված հարցումները և ներկայացված
                    պարզաբանումները</b>
                <div>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման վերաբերյալ հարցումներ չեն եղել և
                    պարզաբանումներ չեն տրամադրվել:</div>
            </div>
            <div>
                <b class="b-number">5. Հայտեր ներկայացրած մասնակիցների տվյալները` անվանումը,
                    գտնվելու վայրը, կապի միջոցները:</b>
                <div class="lots">
                    <div>
                        <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Հրավերի հիման վրա հայտեր են
                        ներկայացրել՝
                    </div>
                    <br>
                    <table style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                        <thead>
                            <tr>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;"></th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Մասնակցի անվանումը
                                </th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    Մասնակցի հասցեն և հեռախոսահամարը
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="(participant, index) in participants" :key="index + Math.random()">
                            <tr>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">
                                    {{ index + 1 }}
                                </td>
                                <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">
                                    {{ participant.participant[0].name.hy }}
                                </td>
                                <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center">
                                    {{participant.participant[0].address.hy +','}}
                                    {{ participant.participant[0].phone }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <div>
                <b class="b-number">6. Հայտերով ներկայացված գները</b>
                <div>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Մասնակիցների կողմից առաջարկած պայմանագրի կատարման գները հետևյալն են
                </div>
                <br>
                <table style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                    <thead>
                        <tr class="full-row">
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;" rowspan="2">
                                Հ/Հ
                            </th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;" rowspan="2">
                                Մասնակցի անվանում
                            </th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;"
                                colspan="3">
                                Մասնակցի գնային առաջարկ
                            </th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse; "
                                rowspan="2">
                                Նախահաշվային գին
                            </th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">
                                Արժեք
                            </th>
                            <th style="border: 1px solid black; border-collapse: collapse;">
                                ԱԱՀ
                            </th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">
                                Ընդամենը
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template
                            v-for="(organizedRow, organizedIndex) in organizedRows">
                            <tr class="full-row" :key="organizedRow.toString() +organizedIndex + Math.random()">
                                <td colspan="6" style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                    Չափաբաժին {{ organizedRow.view_id }}՝
                                    {{organizedRow.procurement_plan.cpv_outside ? organizedRow.procurement_plan.cpv_outside.code : organizedRow.procurement_plan.cpv.code}}
                                    -
                                    {{organizedRow.procurement_plan.cpv_outside ? organizedRow.procurement_plan.cpv_outside.name : organizedRow.procurement_plan.cpv.name}}
                                </td>
                            </tr>
                            <template v-for="(participant, participantIndex) in organizedRow.participants">
                                <tr class="full-row" :key="participant.toString() + participantIndex + Math.random() ">
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">
                                        {{ participantIndex + 1 }}
                                    </td>
                                    <td style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">
                                        {{ participant.info.name.hy }}
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;
                                               text-align: center;">
                                        {{ participant.value }}
                                    </td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">
                                        {{ participant.vat }}
                                    </td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{participant.value + participant.vat}}</td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">
                                        {{organizedRow.procurement_plan.details[0].unit_amount * organizedRow.count}}
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
            <br>
            <div>
                <b class="b-number">7. Հայտերի գնահատման կարգը և դրանց գնահատման արդյունքները</b>
                <div style="text-align: justify;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Առաջին տեղ զբաղեցնող մասնակցին որոշելու
                    համար կիրառված չափանիշ հայտ ներկայացրած և բավարար գնահատված
                    մասնակիցներից՝ նվազագույն գնային առաջարկ ներկայացրած
                    մասնակից:
                    <br />
                    Առաջարկված հայտի հիման վրա հանձնաժողովը որոշեց.
                </div>
                <br>
                <table style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                    <tr class="full-row">
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Հ/Հ
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Մասնակիցը
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Չափաբաժինը
                        </th>
                    </tr>
                    <template v-if="participantsSequence.length">
                        {{ handleLoaded() }}
                    </template>
                    <template v-for="(participantSequence, participantSequenceIndex) in participantsSequence">
                        <tr class="full-row" :key="participantSequenceIndex.toString() + participantSequenceIndex + Math.random()">
                            <td colspan="3"
                                style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                {{participantSequence.order === 1 ? 'Ընտրված`' : participantSequence.order + ' ' + 'տեղ զբաղեցրած մասնակից`'}}
                            </td>
                        </tr>
                        <template v-for="( participant, participantIndex ) in participantSequence.participants">
                            <tr class="full-row" :key="participant.toString() + participantIndex + Math.random()">
                                <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">
                                    {{ participantIndex + 1 }}
                                </td>
                                <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">
                                    {{ participant.name.hy }}
                                </td>
                                <td style="border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">
                                    <span v-for="(organizedRow, organizedRowIndex) in participant.organizedRows" :key="organizedRow.toString() + organizedRowIndex +Math.random()">
                                        {{ organizedRow}}
                                        <span v-if="organizedRowIndex !== participant.organizedRows.length -1">,</span>
                                    </span>
                                </td>
                            </tr>
                        </template>
                    </template>
                </table>
            </div>
            <br>
            <div>
                <b class="b-number">8. Հայտերի մերժման դեպքում դրանց հիմնավորումը</b>
                <br/>
                <template v-if="notEnoughParticipants.length">
                    Մերժվել են հետևյալ մասնակիցները նշված չափաբաժինների մասով, քանի որ ներկայացված գնային առաջարկները գերազանցում են նախատեսված ֆինանսական միջոցների չափը։
                    <br/>
                    <span :key="participantIndex" v-for="(participant, participantIndex) in notEnoughParticipants">
                        {{participant.name.hy}} 
                        <span :key="offerIndex" v-for="(offer, offerIndex) in participant.offers">
                            {{offer}}<span v-if="offerIndex !== participant.offers.length-1">,</span>
                        </span><span v-if="participantIndex !== notEnoughParticipants.length-1">,</span>
                    </span>
                </template>
                <template v-else>
                    <div>
                        <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Մերժված հայտեր չկան
                    </div>
                </template>
            </div>
            <div>
                <b class="b-number">9. Պայմանագիրը կամ պայմանագիր չկնքվելու դեպքում, դրա
                    հիմնավորումը</b>
                <div style="text-align: justify;">
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնումների մասին ՀՀ օրենսդրությամբ
                    սահմանված կարգով ընտրված մասնակցի /ների/ հետ կնքվել է /են/
                    պամանագիր /եր/։
                    <br />
                </div>
                <div v-if="lots.length"> 
                    <template v-for="(lot, index) in lots">
                        <span :key="lot.view_id">
                            <span v-if="lot.view_id === 1">{{ lot.view_id }}-ին</span>
                            <span v-else>{{ lot.view_id }}-րդ</span>
                            <span v-if="index !== lots.length - 1">, </span>
                        </span>
                    </template>
                    <span v-if="lots.length === 1"> չափաբաժինը հայտարարվել է չկայացած:</span>
                    <span v-else> չափաբաժինները հայտարարվել են չկայացած:</span>
                </div>
            </div>
            <div style="text-align: justify">
                <b class="b-number"
                    style="text-align: justify;"
                    >10. Հակաօրինական գործողությունների հայտնաբերելու դեպքում
                    դրանց և այդ կապակցությամբ ձեռնարկված գործողությունների
                    համառոտ նկարագրի մասին</b>
                <div><span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Մասնակիցների կողմից հակաօրինական գործողություններ չեն հայտնաբերվել:</div>
            </div>
            <div>
                <b class="b-number">11. Ներկայացված բողոքների և դրանց վերաբերյալ կայացված որոշումների մասին</b>
                <div>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Բողոքներ չեն ներկայացվել:
                </div>
            </div>
            <div>
                <b class="b-number">12. Այլ անհրաժեշտ տեղեկություններ</b>
                <div>
                    <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Չկան
                </div>
            </div>
            <br/>
            <div>
                <div style="text-align: justify; "
                    align="center"
                    v-if="
                        me.organisation[0].translations.company_type.hy ===
                            'ՍՊԸ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'Ա/Ձ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ԲԲԸ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'Ա/Կ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ՓԲԸ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'Հ/Կ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ՀՈԱԿ' ||
                        me.organisation[0].translations.company_type.hy ===
                            'ՊՈԱԿ'
                    "
                >
                    «{{ me.organisation[0].translations.name.hy }}»
                    {{ me.organisation[0].translations.company_type.hy }}-ի
                </div>
                <div align="center" v-else>
                    «{{ me.organisation[0].translations.name.hy }}»
                    {{ me.organisation[0].translations.company_type.hy }}ի
                </div>
                <div>
                    {{ me.organisation[0].translations.director_position.hy }}՝
                    <span>{{me.organisation[0].translations.director_name.hy}}</span>
                </div>
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
            notEnoughParticipants: [],
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
        organizedRowsFromStore() {
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
                await this.$client
                    .get(
                        `/organize-row/getByOrganizeParticipmants/${this.$route.params.id}`
                    )
                    .then((response) => {
                        this.lots = response.data
                            .filter((lot) => {
                                const hasIsSatisfactory =
                                    lot.participants.reduce(
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
                                                lot.procurement_plan.details[0]
                                                    .unit_amount *
                                                    lot.count
                                            )
                                        } else {
                                            return (
                                                part.new_value +
                                                    (part.vat
                                                        ? part.new_value * 0.2
                                                        : 0) >
                                                lot.procurement_plan.details[0]
                                                    .unit_amount *
                                                    lot.count
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
                        this.handleLoaded()
                    })
                this.totalMembers =
                    this.currentOrganized.evaluator_member.length +
                    (this.currentOrganized.translations.evaluator_president
                        .hy !== ''
                        ? 1
                        : 0)
                await this.$client
                    .get(
                        `participant-group/getByOrganize/${this.$route.params.id}`
                    )
                    .then((response) => {
                        const participantsData = response.data
                        const incorrectParticipants = []
                        participantsData.forEach((participantItem) => {
                            const hasNotEnoughOffers = [];
                            let participantName = {};
                            participantItem.lots.forEach((lot) => {
                                const currentLot = this.organizedRowsFromStore.find(row => row.id === lot.organize_row_id)
                                const priceOffer = currentLot.participantsList.find(participant => participant.participant_group_id === participantItem.id)
                                if(priceOffer && !priceOffer.enough){
                                    participantName = priceOffer.name
                                    hasNotEnoughOffers.push(currentLot.view_id)
                                }
                            })
                            if(hasNotEnoughOffers.length){
                                this.notEnoughParticipants.push({
                                    name: participantName, 
                                    offers :hasNotEnoughOffers
                                })
                            }
                            if (participantItem.lots.length === 0) {
                                incorrectParticipants.push(participantItem)
                            } else if (
                                participantItem.lots.filter(
                                    (item) => !item.is_satisfactory
                                ).length > 0
                            ) {
                                incorrectParticipants.push(participantItem)
                            }
                        })
                        this.incorrectParticipants = incorrectParticipants
                        this.participants = participantsData
                    })
                await this.$client
                    .get(
                        `organize-row/getByOrganizeParticipmants/${this.$route.params.id}`
                    )
                    .then((response) => {
                        const rows = response.data
                        rows.forEach((row) => {
                            const rowParticipants = row.participants
                            row.winners = []
                            this.$client
                                .get(
                                    `participant-row/getWinnerByOrganizeRowId/${row.id}`
                                )
                                .then((response) => {
                                    const results = response.data
                                    const comparisonResultObj = {
                                        participants: results,
                                        winners: results.filter(
                                            (item) => item.winner
                                        ),
                                    }
                                    row.winners = comparisonResultObj.winners
                                })
                            const sortedRowParticipants = rowParticipants.sort(
                                function (a, b) {
                                    if (a.value > b.value) {
                                        return 1
                                    }
                                    if (a.value < b.value) {
                                        return -1
                                    }
                                    return 0
                                }
                            )
                            row.participants = sortedRowParticipants
                            row.satisfactory_participants =
                                sortedRowParticipants.filter(
                                    (item) => item.is_satisfactory
                                )
                        })
                        this.organizedRows = rows
                    })
                const participantsSequence = []
                var maxCountParticipants = 1
                await this.organizedRows.forEach((organizedRow) => {
                    if (
                        organizedRow.satisfactory_participants.length >
                        maxCountParticipants
                    ) {
                        maxCountParticipants =
                            organizedRow.satisfactory_participants.length
                    }
                })
                const sequenceCount = maxCountParticipants

                for (let i = 0; i < sequenceCount; i++) {
                    const participants = [];
                    this.organizedRowsFromStore.map((row) => {
                        if (row.participantsList[i] && row.winners.length) {
                            participants.push(row.participantsList[i])
                        }
                    })
                    participantsSequence.push({
                        order: i + 1,
                        participants: participants,
                    })
                }
                await participantsSequence.forEach((participantSequence) => {
                    const currentParticipants = participantSequence.participants
                    currentParticipants.forEach((participant) => {
                        participant.organizedRows = []
                        currentParticipants
                           .filter(      
                                (value) => value.id === participant.id
                            )
                            .forEach((value) => {
                                const row = this.organizedRows.find((item) =>item.id === value.organize_row_id)
                                if(row && row.winners.length === 1){
                                    participant.organizedRows.push(row.view_id);
                                }
                            })
                    })
                })
                await participantsSequence.forEach((participantSequence) => {
                    const currentParticipants = participantSequence.participants
                    const obj = {};
                    for (let i = 0, len = currentParticipants.length; i < len; i++) {
                        obj[currentParticipants[i].id] = currentParticipants[i];
                    }
                    const newCurrentParticipants = [];
                    for (const key in obj) { 
                        newCurrentParticipants.push(obj[key]);
                    }
                    participantSequence.participants = newCurrentParticipants
                })
                this.participantsSequence = participantsSequence
                this.handleLoaded()
            },
        },
    },
    methods: {
        consoleLog(data) {
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
    .tab {
        margin-left: 25px;
    }
</style>
<style scoped>
* {
    font-family: GHEA grapalat  !important;
}
</style>
