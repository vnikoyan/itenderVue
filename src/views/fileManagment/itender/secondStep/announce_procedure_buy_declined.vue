<template>
    <section slot="pdf-content" contenteditable="thye" ref="content" style="font-size: 14px;"> 
        <div style="text-align: center; font-weight: 600;">ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</div>
        <div style="text-align: center; font-weight: 600;">գնման ընթացակարգը չկայացած հայտարարելու մասին</div>
        <div  style="text-align: center; font-weight: 600;">Ընթացակարգի ծածկագիրը {{ currentOrganized.code }}</div>
        <br>
        <div  style="text-align: justify;">
            «{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}
            <span v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{ me.organisation[0].translations.company_type.hy }}-ն</span>
            <span v-else>{{ me.organisation[0].translations.company_type.hy }}ն</span>
             ստորև ներկայացնում է իր կարիքների համար
            {{ currentOrganized.name }}
            ձեռքբերման նպատակով կազմակերպված
            {{ currentOrganized.code }} ծածկագրով գնման ընթացակարգը 
            չկայացած հայտարարելու մասին տեղեկատվությունը`
        </div>
        <br>
        <div class="lots">
            <table style="width: 100%;
                     
                    table-layout: fixed;
                    border-collapse: collapse;
                    page-break-inside: avoid;
                    border: 1px solid black;
                    border-collapse: collapse;
                    text-align: center;">
                <tr>
                    <th style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">
                        <span style="font-weight: bold;">Չափաբաժնի համար</span>
                    </th>
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">Գնման առարկայի համառոտ նկարագրություն</th>
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">Գնման ընթացակարգի մասնակիցների անվանումները`այդպիսիք լինելու դեպքում</th>
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">Գնման ընթացակարգը չկայացած է հայտարարվել համաձայն` ”Գնումների մասին” ՀՀ օրենքի 37-րդ հոդվածի 1-ին մասի/ընդգծել համապատասխան տողը/</th>
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">Գնման ընթացակարգը չկայացած հայտարարելու հիմնավորման վերաբերյալ համառոտ տեղեկատվություն</th>
                </tr>
                <tr v-for="(lot, lotIndex) in lots" :key="lotIndex">
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;
                                text-align: center;">{{ lot.view_id }}</td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;
                                text-align: center;">
                        <span>{{ lot.procurement_plan.cpv.name }}</span>
                    </td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;
                                text-align: center;">
                        <div v-for="(participant, p_index) in lot.participants"
                            :key="participant.id">
                            {{
                                participant.user_info ? participant.user_info.name.hy :  participant.info.name.hy
                                    ? participant.user_info ? participant.user_info.name.hy :  participant.info.name.hy
                                    : participant.user_info ? participant.user_info.name.hy :  participant.info.name.hy
                            }}{{
                                p_index === lot.participants.length - 1
                                    ? ''
                                    : ','
                            }}
                        </div>
                    </td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;
                                text-align: center;">
                        <div>
                            <p>1-ին կետի</p>
                            <p>2-րդ կետի</p>
                            <p>3-րդ կետի</p>
                            <p>4-րդ կետի</p>
                        </div>
                    </td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;
                                text-align: center;"><span></span></td>
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
        <br>
        <div>
            <div  style="text-align: justify;">
                Սույն հայտարարության հետ կապված լրացուցիչ տեղեկություններ
                ստանալու համար կարող եք դիմել
                {{ currentOrganized.code }}.
                ծածկագրով գնումների համակարգող`	
                {{ me.name }}ին:
            </div>
            <div>
                Հեռախոս` {{ me.organisation[0].phone }}
            </div>
            <div>
                Էլեկոտրանային փոստ`
                {{ me.email }}
            </div>
            <div>
                Պատվիրատու` «{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}
            </div>
        </div>
    </section>
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
            newProps: false,
            canceledLotsWithOneParticipant: [],
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
                this.lots = [];
                this.canceledLotsWithOneParticipant = [];
                this.currentOrganized.organize_rows.forEach(row => {
                    if(row.winner_user_id === 0){
                        this.lots.push(row)
                    }
                });
                this.currentOrganized.organize_rows.forEach((item) => {
                    if(item.participants.length === 1 && item.winner_user_id === 0){
                        this.canceledLotsWithOneParticipant.push(item);
                    }
                })
                this.handleLoaded()
            },
        },
    },
    methods: {
        consoleLog(e){
            console.log(e)
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
        download() {
            this.$refs.content.generatePdf()
            this.newProps = false
        },
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.content.innerHTML
        },
    },
}
</script>
<style scoped>
    *{
        font-family: GHEA grapalat !important;
    }
</style>
