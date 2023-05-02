<template>
    <div id="commandment-file" ref="contract" 
        style="line-height: 2; width: 100%;">
        <section slot="pdf-content" contenteditable="true">
            <div class="col-md-12" style="font-size: 14px;">
                <div  style="font-weight: 700;text-align: right;">«{{ me.organisation[0].translations.name.hy }}»
                    <span  style="font-weight: 700;" v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{me.organisation[0].translations.company_type.hy}}-ի</span> 
                    <span  style="font-weight: 700;" v-else>{{me.organisation[0].translations.company_type.hy}}ի</span>
                </div>
                <div  style="text-align: right; font-weight: 700;">գնումների համակարգող՝ {{ me.name }}ին</div>
                <h6  style=" text-align: center; font-weight: 700; margin-top: 20px; font-size: 14px;">ԳՆՄԱՆ ՀԱՅՏ</h6>
                <div  style=" text-align: justify; font-weight: 700;">Ձեզ է ներկայացվում «{{ me.organisation[0].translations.name.hy }}» 
                    <span  style="font-weight: 700;" v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{ me.organisation[0].translations.company_type.hy }}-ի</span>
                    <span  style="font-weight: 700;" v-else>{{ me.organisation[0].translations.company_type.hy }}ի</span>
                    կարիքների համար ապրանքների
                    ձեռքբերման գնման հայտը: Ապրանքների ձեռքբերման մանրամասները ներկայացած են ստորև:
                </div>
                <div  style="font-weight: 700;">Առաջարկվող գնման ձևը՝ Մեկ անձից գնման ընթացակարգ</div>
                <div  style="text-align: justify; font-weight: 700;">Հիմնավորում՝ Գնումների մասին ՀՀ օրենքի 23-րդ հոդվածի 1-ին մասի 4-րդ կետ (գնման գինը չի գերազանցում գնումների բազային միավորը)</div>
                <br>
                <table class="info-block ft-table" 
                    style="width: 100%;
                         
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid black;
                        border-collapse: collapse;
                        text-align: center;" cellspacing="8" cellpadding="8">
                    <tr>
                        <th  colspan="10" style="border: 1px solid black;
                                                 border-collapse: collapse;">Ապրանքի</th>
                    </tr>
                    <tr>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">Չ/հ</th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">CPV կոդ</th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">անվանումը</th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">տեխնիկական բնութագիրը </th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">չափման միավորը</th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">միավոր գինը/ՀՀ դրամ</th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">ընդհանուր գինը/ՀՀ դրամ</th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">ընդհանուր քանակը</th>
                        <th  colspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">մատակարարման</th>
                    </tr>
                    <tr>	
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">հասցեն</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Ժամկետը</th>
                    </tr>
                    <tr v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="rowIndex">
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.view_id }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.cpv.code }}{{ row.procurement_plan.cpv_drop && '/' }}{{ row.procurement_plan.cpv_drop }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.cpv.name }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.specifications.description.hy }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.unit }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.details[0].unit_amount }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.details[0].unit_amount * row.count }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.count }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ currentOrganized.shipping_address }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">Ընթացիկ տարում՝ պատվերը ստանալուց՝ {{ currentOrganized.purchase_schedule }} շխատանքային օրվա ընթացքում</td>
                    </tr>
                </table>
                <div  style="text-align: justify; font-weight: 700; margin-top: 20px;">
                    <div>Հնարավոր մասնակցի տվյալները`</div>  
                    <span v-if="currentOrganized.send_to_all_participants !== 'implement-immediately'">iTender համակարգում գրանցված մասնակիցներ ( </span> 
                    <span  v-for="(participant, participantIndex) in currentOrganized.participants" :key="participant.id" >
                        {{ participant.name }}
                        ՀՎՀՀ {{participant.tin}}
                        <span v-if="participantIndex !== currentOrganized.participants.length-1" >,</span>
                    </span>
                    <span  v-if="currentOrganized.send_to_all_participants !== 'implement-immediately'" style="">)</span>
                </div>
                <pagebreak/>
                <br class="page-break"/>
                <h6  style="text-align:center; font-weight: 700; margin-top: 20px;">ՎՃԱՐՄԱՆ ԺԱՄԱՆԱԿԱՑՈՒՅՑ*</h6>
                <div  style="text-align: right; margin-right: 20px; font-size: 12px;">ՀՀ դրամ</div>
                <table class="ft-table" style="    
                                                width: 100%;
                                                table-layout: fixed;
                                                border-collapse: collapse;
                                                page-break-inside: avoid;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;" cellspacing="8" cellpadding="8">
                    <tr>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">Չ/հ</th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">CPV կոդ</th>
                        <th  rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">անվանումը</th>
                        <th  colspan="13" style="border: 1px solid black;
                                                border-collapse: collapse;">դիմաց վճարումները նախատեսվում է իրականացնել {{new Date().getFullYear()}}թ -ին` ըստ ամիսների, այդ թվում*</th>
                    </tr>
                    <tr>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">հունվար</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">փետրվար</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">մարտ</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">ապրիլ</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">մայիս</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">հունիս</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">հուլիս</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">օգոստոս</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">սեպտեմբեր</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">հոկտեմբեր</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">նոյեմբեր</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">դեկտեմբեր</th>
                        <th  style="border: 1px solid black;
                                    border-collapse: collapse;">Ընդամենը</th>
                    </tr>
                    <tr v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="rowIndex">
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.view_id }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.cpv.code }}{{ row.procurement_plan.cpv_drop && '/' }}{{ row.procurement_plan.cpv_drop }}</td>
                        <td  style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.cpv.name }}</td>
                        <template v-if="row.organize_row_percent">
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_1) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_2) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_3) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_4) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_5) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_6) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_7) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_8) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_9) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_10) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_11) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_12) || '-' }}</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.procurement_plan.details[0].unit_amount * row.count }}</td>
                        </template>
                        <template v-else>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">-</td>
                            <td  style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.procurement_plan.details[0].unit_amount * row.count }}</td>
                        </template>
                    </tr>
                </table>
                <br>
                <div class="info-block" style="maargin-top: 0;">
                    <div  style=" text-align: left; font-weight: 700;"><div class="ket"></div>Վճարման ենթակա գումարները ներկայացված են աճողական կարգով:</div>
                    <div  style=" text-align: left; font-weight: 700;">Պատասխանատու ստորաբաժանման</div>
                    <div>
                        <h6  style="text-align: left; font-size: 14px;">ղեկավար՝  
                            <span v-if="getHeadUser().name">{{getHeadUser().name}}</span>
                            <span v-else>__________________</span>  
                        </h6>
                        <h6  style=" text-align: left; font-size: 14px;">անդամ՝ 
                            <span v-if="getSubordinateUser().name">{{getSubordinateUser().name}}</span>
                            <span v-else>__________________</span>  
                        </h6>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'purchase_request',
    props: ['handleLoaded'],
    data() {
        return {
            participants: [],
            incorrectParticipants: [],
            participantsSequence: [],
            organizedRows: [],
            totalMembers: 0,
            signYear: '', 
            signMonth: '', 
            signDay: '', 
            newProps: false,
        }
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organizeOnePerson/currentOrganized']
        },
        userGroup() {
            return this.$store.getters['user/userGroup']
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
        calculateMonthPrice(price, percent){
            return price*percent/100
        },
        getHeadUser() {
            const row = this.currentOrganized.organize_rows[0].procurement_plan
            var userId = 0;
            if(row.user_id_5){
                userId = row.user_id_5
            } else if(row.user_id_4){
                userId = row.user_id_4
            } else if(row.user_id_3){
                userId = row.user_id_3
            } else if(row.user_id_2){
                userId = row.user_id_2
            } else if(row.user_id_1){
                userId = row.user_id_1
            }
            const found = this.userGroup.find(user => user.id === userId)
            if(found) {
                return found
            }
            return 'կցված չէ'
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
