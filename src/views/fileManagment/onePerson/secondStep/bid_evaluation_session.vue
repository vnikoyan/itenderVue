<template>
    <div id="commandment-file" ref="contract"
        style="line-height: 2; width: 100%">
        <section slot="pdf-content" contenteditable="true">
            <div class="col-md-12" style="font-size: 14px;">
                <h6 style="text-align: center; font-weight: 700;">ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ N1</h6>
                <h6 style="text-align: center; font-weight: 700; margin-bottom: 20px; font-size: 14px;">« {{ currentOrganized.code }} » ծածկագրով մեկ անձից գնման ընթացակարգի շրջանակներում մասնակիցների կողմից ներկայացված մասնակցությանհայտերի գնահատման նիստի</h6>
                <table style="width: 100%; border: 0 !important;">
                    <tbody>
                        <tr>
                            <td style="border: 0 !important; font-size: 14px; width: 50%;text-align: left;"><p style="text-align: left;font-size: 14px;" class="ft-11">{{ me.organisation[0].translations.city.hy }}</p></td>
                            <td style="border: 0 !important; font-size: 14px; width: 50%;text-align: right;"><p style="text-align: right;font-size: 14px;" class="ft-11">{{ moment(new Date()).format('DD.MM.YYYY') }}թ.</p></td>
                        </tr>
                    </tbody>
                </table>
                <div class="col-md-12">	
                    <div style="text-align: center; font-weight: 700; margin-top: 30px;">1.Ընթացակարգի օրակարգը հաստատելու մասին</div>
                    <div style="text-align: justify;">1.1 Պատասխանատու ստորաբաժանման ղեկավարը որոշեց հաստատել նիստի հետևյալ օրակարգը</div>
                    <div style="text-align: justify; margin-left: 2.5rem;font-weight: 400;">ա) Նիստի օրակարգը հաստատելու մասին.</div>
                    <div style="text-align: justify; margin-left: 2.5rem;font-weight: 400;">բ) Հայտերի գնահատման մասին</div>
                    <br>
                    <div style="text-align: center; font-weight: 700;">2.Հայտերի բացման մասին</div>
                    <div style="text-align: justify; font-weight: 700;">Սահմանված ժամկետում, սահմանված կարգով հայտ է ներկայացրել հետևյալ կազմակերպությունը /ները/.</div>
                    <br>
                    <table style="width: 100%;
                         
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid black;
                        border-collapse: collapse;
                        text-align: center;" cellspacing="8" cellpadding="8">
                        <tr>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">Հ/Հ</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">Մասնակիցների անվանումները</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">ՀՎՀՀ</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">Հասցե</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;" >Հեռախոս</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">Էլ. փոստի հասցե</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">Հայտի ներկայացման օրը</th>
                        </tr>
                        <template v-for="(participantItem, participantIndex) in currentOrganized.participants">
                            <tr class='full-row' :key="participantIndex.toString() + participantIndex + Math.random()">
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participantIndex+1 }}</td>
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participantItem.name }}</td>
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participantItem.tin }}</td>
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participantItem.address }}</td>
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participantItem.phone }}</td>
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participantItem.email }}</td>
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse; ">{{ participantItem.date_of_submission }}</td>
                            </tr>
                        </template>
                    </table>
                    <br>
                    <div style="text-align: center; font-weight: 700;">3.Հայտերի գնահատման մասին</div>
                    <div style="text-align: justify;">3.1. « {{ currentOrganized.code }} » ծածկագրով ընթացակարգի ծանուցում է ուղարկվել համապատասխան մասնակիցներին</div>
                    <div style="text-align: justify;">3.2 Հայտեր ներկայացրած մասնակիցների տվյալները և առաջարկված գները:</div>
                    <br>
                    <table style="width: 100%;
                         
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid black;
                        border-collapse: collapse;
                        text-align: center;" cellspacing="8" cellpadding="8">
                        <tr>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;" rowspan="3">Հ/Հ</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;" rowspan="3">Մասնակիցների անվանումները</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;" colspan="6">Յուրաքանչյուր մասնակցի հայտով ներկայացված գինը</th>
                        </tr>
                        <tr>

                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;" colspan="6">ՀՀ դրամ</th>
                        </tr>
                        <tr>

                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;" colspan="2">Գինն առանց ԱԱՀ</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;" colspan="2">ԱԱՀ</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;" colspan="2">Ընդհանուր</th>
                        </tr>
                        <template v-for="(organizedRow, organizedIndex) in currentOrganized.organize_rows">
                            <tr class='full-row' :key="organizedRow.toString() + organizedIndex + Math.random()">
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">Չ/Փ {{ organizedRow.view_id }}</td>
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;" colspan="7">
                                    <template v-if="organizedRow.participants.length === 0">Չկայացած, գնային առաջարկ չի ներկայացվել</template>
                                </td>
                            </tr>
                            <template v-for="(participant, participantIndex) in organizedRow.participants">
                            <tr class='full-row' :key="participant.toString() + participantIndex + Math.random()">
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participantIndex+1 }}</td>
                                <td style=" border: 1px solid black;
                                            border-collapse: collapse;
                                            text-align: center;">{{ participant.user_info && participant.user_info.organisation.company_type.hy ? '«' + participant.user_info.name.hy + '»' + ' ' + participant.user_info.organisation.company_type.hy : participant.info.name.hy}}</td>
                                <td colspan="2" style=" border: 1px solid black;
                                                        border-collapse: collapse;
                                                        text-align: center;" v-if="Number.isInteger(getPrice(participant))">{{ getPrice(participant) }}</td>
                                <td colspan="2" style=" border: 1px solid black;
                                                        border-collapse: collapse;
                                                        text-align: center;" v-else>{{ getPrice(participant).toFixed(2) }}</td>
                                <td colspan="2" style=" border: 1px solid black;
                                                        border-collapse: collapse;
                                                        text-align: center;" v-if="Number.isInteger(getVatPrice(participant))">{{ getVatPrice(participant) }}</td>
                                <td colspan="2" style=" border: 1px solid black;
                                                        border-collapse: collapse;
                                                        text-align: center;" v-else>{{ getVatPrice(participant).toFixed(2)}}</td>
                                <td colspan="2" style=" border: 1px solid black;
                                                        border-collapse: collapse;
                                                        text-align: center;" v-if="Number.isInteger(getTotalPrice(participant))">{{ getTotalPrice(participant) }}</td>
                                <td colspan="2" style=" border: 1px solid black;
                                                        border-collapse: collapse;
                                                        text-align: center;" v-else>{{ getTotalPrice(participant).toFixed(2)}}</td>
                            </tr>
                            </template>
                        </template>
                    </table>
                    <br>
                    <div style="text-align: justify; font-weight: 700;">3.3. Ներկայացված հայտերի գնահատման արդյունքները</div>
                    <div style="text-align: justify; margin-left: 2.5rem;">ա) բոլոր մասնակիցների կողմից ներկայացված հայտերը բավարարում է հրավերով սահմանված պահանջներին:</div>
                    <div style="text-align: justify; margin-left: 2.5rem;">բ) մերժված հայտեր ՝ առկա չեն</div>
                    <div style="text-align: justify; font-weight: 700;">3.4. Գնահատման արդյունքում կայացված որոշումը</div>
                    <div style="text-align: justify; font-weight: 700;">Պատասխանատու ստորաբաժանման ղեկավարը որոշեց ընտրված մասնակից (ներ) ճանաչել.</div>
                    <br>
                    <table style="width: 100%;
                         
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid black;
                        border-collapse: collapse;
                        text-align: center;" cellspacing="8" cellpadding="8">
                        <tr>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">Հ/Հ</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">Մասնակիցների անվանումները</th>
                            <th style=" border: 1px solid black;
                                        border-collapse: collapse;">Չափաբաժինը</th>
                        </tr>
                        <tr v-for="(winner, winnerIndex) in currentOrganized.winners" :key="winner.id">
                            <td style=" border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"
                        >{{ winnerIndex + 1 }}</td>
                            <td style=" border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ winner.name }} </td>
                            <td style=" border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                <template v-if="!currentOrganized.winner_by_lots">
                                    <span v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="row.id">
                                        {{row.view_id}}<span v-if="rowIndex !== currentOrganized.organize_rows.length-1">,</span>
                                    </span>
                                </template>
                                <template v-else>
                                    <span v-for="(row, rowIndex) in winner.won_lots" :key="row.id">
                                        {{row.view_id}}<span v-if="rowIndex !== winner.won_lots.length-1">,</span>
                                    </span>
                                </template>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <div style="text-align: justify; font-weight: 700;">Պատասխանատու ստորաբաժանման ղեկավարը որոշեց պայմանագիր կնքել ընտված մասնակցի(ների) հետ:</div>
                    <div style="text-align: justify; font-weight: 700;">Նիստին ներկա էին.</div>
                    <div style="text-align: justify; font-weight: 700;">Պատասխանատու ստորաբաժանման ղեկավար՝ {{ me.organisation[0].translations.director_name.hy }}</div>
                    <div style="text-align: justify; font-weight: 700;">Գնումների համակարգող` {{ me.name }} </div> 
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'bid_evaluation_session',
    components: {},
    props: ['handleLoaded'],
    data() {
        return {
            participants: [],
            participantsSequence: [],
            organizedRows: [],
            totalMembers: 0,
            newProps: false,
        }
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organizeOnePerson/currentOrganized']
        },
        userChildren() {
            return this.$store.getters['user/userChildren']
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
        getPrice(participant){
            if(participant.new_value){
                return participant.new_value
            } else {
                return participant.value
            }
        },
        getVatPrice(participant){
            if(participant.vat){
                if(participant.new_value){
                    return participant.new_value * 0.2;
                } else {
                    return participant.value * 0.2;
                }
            } else {
                return 0;
            }
        },
        getTotalPrice(participant){
            if(participant.vat){
                if(participant.new_value){
                    return participant.new_value + participant.new_value * 0.2;
                } else {
                    return participant.value +  participant.value * 0.2;
                }
            } else {
                if(participant.new_value){
                    return participant.new_value;
                } else {
                    return participant.value;
                }
            }
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
        consoleLog(msg) {
            console.log(msg)
        },
        download() {
            this.$refs.contract.generatePdf()
            this.newProps = false
        },
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.contract.innerHTML
        },
    },
}
</script>
<style scoped>
    *{
        font-family: GHEA grapalat !important;
    }
</style>
