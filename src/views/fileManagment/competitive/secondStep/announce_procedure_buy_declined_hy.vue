<template>
    <div ref="content">
        <div style="text-align: center;font-weight: 600;">ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</div>
        <div style="text-align: center; font-weight: 600;">գնման ընթացակարգը չկայացած հայտարարելու մասին</div>
        <div style="text-align: center; font-weight: 600;">Ընթացակարգի ծածկագիրը {{ currentOrganized.translations.code.hy }}</div>
        <br>
        <div style="text-align: justify;">
            «{{ me.organisation[0].translations.name.hy }}» 
            <span  style=" text-align: justify;" v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{ me.organisation[0].translations.company_type.hy }}-ն</span>
            <span  style=" text-align: justify;" v-else>{{ me.organisation[0].translations.company_type.hy }}ն</span>
            ստորև ներկայացնում է իր կարիքների համար
            {{currentOrganized.translations.name.hy}}
            ձեռքբերման նպատակով կազմակերպված
            {{ currentOrganized.translations.code.hy }} ծածկագրով գնման ընթացակարգը 
            չկայացած հայտարարելու մասին տեղեկատվությունը`
        </div>
        <br>
        <div  class="lots">
            <table style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                <tr>
                    <th  style="font-weight: bold; 
                                border: 1px solid black;
                                border-collapse: collapse;">
                        <span  style="font-weight: bold; ">Չափաբաժնի համար</span>
                    </th>
                    <th  style="font-weight: bold;  
                                border: 1px solid black;
                                border-collapse: collapse;">Գնման առարկայի համառոտ նկարագրություն</th>
                    <th  style="font-weight: bold;  
                                border: 1px solid black;
                                border-collapse: collapse;">Գնման ընթացակարգի մասնակիցների անվանումները`այդպիսիք լինելու դեպքում</th>
                    <th  style="font-weight: bold;  
                                border: 1px solid black;
                                border-collapse: collapse;">Գնման ընթացակարգը չկայացած է հայտարարվել համաձայն`”Գնումների մասին” ՀՀ օրենքի 37-րդ հոդվածի 1-ին մասի/ընդգծել համապատասխան տողը/</th>
                    <th  style="font-weight: bold;  
                                border: 1px solid black;
                                border-collapse: collapse;">Գնման ընթացակարգը չկայացած հայտարարելու հիմնավորման վերաբերյալ համառոտ տեղեկատվություն</th>
                </tr>
                <tr v-for="(lot) in lots" :key="lot.name">
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;">{{ lot.view_id }}</td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;">
                        <span>{{ lot.procurementPlan.cpv_outside ? lot.procurementPlan.cpv_outside.name : lot.procurementPlan.cpv.name }}</span>
                    </td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;">
                        <div
                            v-for="(participant, p_index) in lot.participantsList"
                            :key="participant.id">
                            {{participant.name.hy ? participant.name.hy : participant.name.hy}}{{p_index === lot.participantsList.length - 1 ? '' : ','}}
                        </div>
                    </td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;">
                        <div>
                            <p  style="margin: 0; ">1-ին կետի</p>
                            <p  style="margin: 0; ">2-րդ կետի</p>
                            <p  style="margin: 0; ">3-րդ կետի</p>
                            <p  style="margin: 0; ">4-րդ կետի</p>
                        </div>
                    </td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;"></td>
                </tr>
            </table>
        </div>
        <div v-if="canceledLotsWithOneParticipant.length" style="text-align: justify;">
            «Գնումների մասին» ՀՀ օրենքի 10-րդ հոդվածի 4-րդ մասի 2-րդ կետի համաձայն` թիվ 
            <span :key="lot.id" v-for="(lot, lotIndex) in canceledLotsWithOneParticipant">
                {{lot.view_id}}{{lotIndex !== canceledLotsWithOneParticipant.length - 1 ? ',' : ''}}
            </span>
            <span v-if="canceledLotsWithOneParticipant.length === 1">
                չափաբաժնի
            </span>
            <span v-else>
                չափաբաժինների
            </span>
            համար անգործության ժամկետ է սահմանվում սույն հայտարարությունը հրապարակվելու 
            օրվան հաջորդող օրվանից մինչև <b>10</b>-րդ օրացուցային օրը ներառյալ ընկած ժամանակահատվածը։
        </div>
        <br/>
        <div style="text-align: justify;">
            Սույն հայտարարության հետ կապված լրացուցիչ տեղեկություններ
            ստանալու համար կարող եք դիմել
            {{ currentOrganized.translations.code.hy }}.
            ծածկագրով գնումների համակարգող`	
            {{ me.name }}ին։
        </div>
        <div style="margin-left: 50px;">
            Հեռախոս` {{ currentOrganized.evaluator_secretary_phone }}:
        </div>
        <div style="margin-left: 50px;">
            Էլեկոտրանային փոստ՝
            {{ currentOrganized.evaluator_secretary_email }}:
        </div>
        <div style="margin-left: 50px;">
            Պատվիրատու` «{{ me.organisation[0].translations.name.hy }}» {{me.organisation[0].translations.company_type.hy}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'announce_procedure_buy_declined',
    components: {},
    props: ['handleLoaded'],
    data() {
        return {
            lots: [],
            participants: [],
            canceledLotsWithOneParticipant: [],
        }
    },
    computed: {
        currentOrganized() {
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
                this.lots = [];
                this.canceledLotsWithOneParticipant = [];
                this.lots = this.organizedRows.filter(row => row.winners.length !== 1)
                this.organizedRows.forEach((item) => {
                    if(item.participants.length === 1 && item.winners.length === 0){
                        this.canceledLotsWithOneParticipant.push(item);
                    }
                })
                this.handleLoaded()
            },
        },
    },
    methods: {
        async handleBeforeDownload() {
            await this.handleLoaded()
            return this.$refs.content.innerHTML
        },
        download() {
            this.$refs.content.generatePdf()
        },
    },
}
</script>
<style scoped>
    *{
        font-family: GHEA grapalat  !important;
    }
</style>