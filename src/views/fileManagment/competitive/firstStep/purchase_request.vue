<template>
    <div id="commandment-file" ref="contract" style="line-height: 2; width: 100%">
        <div>
          <div style="text-align: right;">
            <div>«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}-ի </div>
            <div> գնումների համակարգող՝
                {{ me.name }}-ին
            </div>
        </div>
        <div style="margin-left:50px; margin-top:25px"> Հարգելի պարոն
          {{ me.name }}
        </div>
        <div style="margin-top:25px; text-align: justify"> 
            <span style="margin-left:50px;">«{{ me.organisation[0].translations.name.hy }}»</span> {{ me.organisation[0].translations.company_type.hy }}
            -ի 2023թ կարիքների համար առաջացել է <span style="color:rgb(237, 15, 15);">ձեռքով լրացման դաշտ</span>
            ձեռքբերման անհրաժեշտություն: <br/>
            <span style="margin-left:50px;">Ելնելով</span> վերոգրյալից և հիմք ընդունելով ՀՀ կառավարության 04.05.2017թ. N 526-Ն որոշմամբ հաստատված 
            «Գնումների գործընթացի կազմակերպման» կարգի (այսուհետև` Կարգ) 5-րդ բաժնի 24-րդ կետը կից 
            Ձեզ է ներկայացվում վերոնշյալ գնման առարկայի ձեռքբերման համապատասխան գնման հայտը:
        </div>
        <div style="margin-top: 50px;">Պատասխանատու ստորաբաժանման ղեկավար` </div>
         <div style="text-align: center;" >
            <span  style="color:rgb(237, 15, 15);">Անուն ազգանունը</span> 
             _________________________
        </div>
        <div style="text-align: right; margin-top:50px">
            ___.___.20___ թ.
        </div>
        <div class="html2pdf__page-break"/>
        <pagebreak/> 
        <br class="page-break"/>
        <div>
            <div style="text-align: right; margin-top:50px; font-weight: 700;">
                Հաստատված է<br/>
                ___.___.20___ թ.
            </div>
            <div style="margin-top:30px; font-weight: 700; text-align: center;">ԳՆՄԱՆ ՀԱՅՏ N___</div>
            <div style=" margin-top:50px; "><span style="font-weight: 700;">Պատվիրատու՝</span>
              «{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}
            </div>
            <div style="font-weight: 700;">Գնման ձևը և դրա հիմնավորումը՝ </div>
            <div><span style="font-weight: 700;">Առաջարկվող գնման ձևը՝</span>
               {{getOrgnizeTypeByPlan}}
            </div>
            <div style="font-weight: 700; margin-top: 40px;">
                Հիմնավորումը՝ 
                <span v-if="checkType === 1">Մեկ անձից գնում, «Գնումների մասին» ՀՀ օրենքի 23-րդ հոդվածի 1-ին մասի 4-րդ կետ</span>
                <span v-else-if="checkType === 2">Մեկ անձից գնում, «Գնումների մասին» ՀՀ օրենքի 23-րդ հոդվածի 1-ին մասի 1-ին կետ</span>
                <span v-else-if="checkType === 3">Հրատապության հիմքով պայմանավորված մեկ անձից գնում, «Գնումների մասին» ՀՀ օրենքի 23-րդ հոդվածի 1-ին մասի 2-րդ կետ</span>
                <span v-else-if="checkType === 6">Գնանշման հարցում, «Գնումների մասին» ՀՀ օրենքի 22-րդ հոդված</span>
                <span v-else-if="checkType === 4">Բաց մրցույթ, «Գնումների մասին» ՀՀ օրենքի 20-րդ հոդված</span>
                <span v-else-if="checkType === 5">Հրատապ բաց մրցույթ, «Գնումների մասին» ՀՀ օրենքի 20-րդ հոդված</span>
            </div>
            <div style="margin-top:50px; font-weight: 700; text-align: center; margin-bottom: 50px">
              Տեխնիկական բնութագիր-գնման ժամանակացույց</div>
              <table style="font-size: 10px;
                width: 100%;
                table-layout: fixed;
                border-collapse: collapse;
                page-break-inside: avoid;
                border: 1px solid black;
                text-align: center;" cellspacing="5" cellpadding="5" class="ft-5"
              >
                <tbody>
                    <tr>
                        <td colspan="12" style="border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;">Ապրանքի</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">Չ/Հ</td>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">CPV կոդ</td>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">անվանումը</td>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;"><span style="color: rgb(17, 85, 204);">ապրանքային նշանը, ֆիրմային անվանումը, մոդելը և արտադրողի անվանումը **</span></td>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">տեխնիկական բնութագիրը</td>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">չափման միավորը</td>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">միավոր գինը/ՀՀ դրամ</td>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">ընդհանուր գինը/ՀՀ դրամ</td>
                        <td rowspan="2" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">ընդհանուր քանակը</td>
                        <td colspan="3" style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;">մատակարարման</td>
                    </tr>
                    <tr>	
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">հասցեն</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">ենթակա քանակը</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">Ժամկետը</td>
                    </tr>
                </tbody>
                <tbody class="purchase-schedule">
                    <tr v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="rowIndex">
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">{{ rowIndex + 1 }}</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">{{ row.procurement_plan.cpv.code }}{{ row.procurement_plan.cpv_drop && '/' }}{{ row.procurement_plan.cpv_drop }}</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">{{ row.procurement_plan.cpv.name }}</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">&nbsp;&nbsp;&nbsp;</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">{{ row.procurement_plan.specifications.description.hy }}</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">{{ row.procurement_plan.unit }}</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">
                        </td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">
                        </td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">{{ row.count }}</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;"
                            v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">
                        Ք.
                            {{ me.organisation[0].translations.city.hy }}
                            {{ me.organisation[0].translations.address.hy }}
                        </td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;"
                            v-else>
                            {{ me.organisation[0].translations.region.hy }}

                            ք.

                            {{ me.organisation[0].translations.city.hy }}
                            {{ me.organisation[0].translations.address.hy }}
                        </td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">{{row.supply || ''}}</td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">{{row.supply_date || ''}}</td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-top:50px; font-weight: 700; text-align: center;margin-bottom: 50px">
              Վճարման ժամանակացույցը</div>
              <table 
                style="font-size: 10px;
                width: 100%;
                table-layout: fixed;
                border-collapse: collapse;
                page-break-inside: avoid;
                border: 1px solid black;
                text-align: center;" cellspacing="5" cellpadding="5" class="ft-5"
              > 
                <tbody>
                  <tr>
                    <th rowspan="2" style="border: 1px solid black;
                                            border-collapse: collapse;">Չ/Հ</th>
                    <th rowspan="2" style="border: 1px solid black;
                                            border-collapse: collapse;">CPV կոդ</th>
                    <th rowspan="2" style="border: 1px solid black;
                                            border-collapse: collapse;">անվանումը</th>
                    <th colspan="13" style="border: 1px solid black;
                                            border-collapse: collapse;">դիմաց վճարումները նախատեսվում է իրականացնել <span style="color: rgb(17, 85, 204);"><span>{{new Date().getFullYear()}}</span>թ</span>-ին` ըստ ամիսների, այդ թվում**</th>
                  </tr>
                  <tr>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">հունվար</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">փետրվար</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">մարտ</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">ապրիլ</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">մայիս</span></td>
                      <td style="border: 1px solid black;
                                writing-mode: vertical-lr;
                                border-collapse: collapse;"><span style="color: rgb(17, 85, 204);">հունիս</span></td>
                      <td style="border: 1px solid black;
                                writing-mode: vertical-lr;
                                border-collapse: collapse;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">հուլիս</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">օգոստոս</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">սեպտեմբեր</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">հոկտեմբեր</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">նոյեմբեր</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">դեկտեմբեր</span></td>
                      <td style="border: 1px solid black;
                                border-collapse: collapse;
                                writing-mode: vertical-lr;
                                text-align: center;"><span style="color: rgb(17, 85, 204);">Ընդամենը</span></td>
                  </tr>
                </tbody>
                <tbody class="payment-schedule">
                    <tr v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="rowIndex">
                        <td style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ rowIndex + 1 }}</td>
                        <td style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.cpv_outside ? row.procurement_plan.cpv_outside.code : row.procurement_plan.cpv.code }}{{ row.procurement_plan.cpv_drop && '/' }}{{ row.procurement_plan.cpv_drop }}</td>
                        <td style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">{{ row.procurement_plan.cpv_outside ? row.procurement_plan.cpv_outside.name : row.procurement_plan.cpv.name }}</td>
                        <template v-if="row.organize_row_percent">
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_1 !== null ? row.organize_row_percent.month_1 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse; 
                                        text-align: center;">{{ row.organize_row_percent.month_2 !== null ? row.organize_row_percent.month_2 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_3 !== null ? row.organize_row_percent.month_3 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_4 !== null ? row.organize_row_percent.month_4 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_5 !== null ? row.organize_row_percent.month_5 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_6 !== null ? row.organize_row_percent.month_6 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_7 !== null ? row.organize_row_percent.month_7 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_8 !== null ? row.organize_row_percent.month_8 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_9 !== null ? row.organize_row_percent.month_9 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_10 !== null ? row.organize_row_percent.month_10 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_11 !== null ? row.organize_row_percent.month_11 + '%'  : '-' }}</td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ row.organize_row_percent.month_12 !== null ? row.organize_row_percent.month_12 + '%'  : '-' }}</td>
                            <td v-if="row.organize_row_percent.month_1 === null && row.organize_row_percent.month_2 === null && row.organize_row_percent.month_3 === null && row.organize_row_percent.month_4 === null && row.organize_row_percent.month_5 === null && row.organize_row_percent.month_6 === null && row.organize_row_percent.month_7 === null && row.organize_row_percent.month_8 === null && row.organize_row_percent.month_9 === null && row.organize_row_percent.month_10 === null && row.organize_row_percent.month_11 === null && row.organize_row_percent.month_12 === null" 
                            style="border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">-</td>
                            <td v-else style="border: 1px solid black;
                                              border-collapse: collapse;
                                              text-align: center;"> 100% </td> 
                        </template>
                        <template v-else>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                        </template>   
                    </tr>
                </tbody>
              </table>
            <div style="margin-top:50px; font-weight: 700; display:inline-block;">Պատասխանատու ստորաբաժանման ղեկավար` </div>
            <div style="text-align: right;">________________ <span style="color:rgb(237, 15, 15);">Անուն ազգանունը</span></div>
            <div style="margin-top:50px; font-weight: 700; display:inline-block;">Պատասխանատու ստորաբաժանման անդամներ՝ </div>
            <div style="text-align: right;">________________ <span style="color:rgb(237, 15, 15);">Անուն ազգանունը</span></div>
            <div style="margin-top:50px; text-align: right;">________________ <span style="color:rgb(237, 15, 15);">Անուն ազգանունը</span></div>

        </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import purchaseTypesLongNamesCased from '@/mixins/purchaseTypes'
import $ from 'jquery';

export default {
    name: 'contract_draft_product',
    mixins: [purchaseTypesLongNamesCased],
    props: ['handleLoaded','handleLoading', 'handleLoadingStart', 'handleLoadingEnd'],
    data() {
        return {
            inputs: {
                // work_type: null,
                // option1: '',
                copyCount: null,
                daysCount: null,
                violationDays: null,
                violationDays_1: null,
                calendar_days: null,
                workersCount: null,
            },
            checkType: '',
            participants: [],
            getOrgnizeTypeByPlan: '',
            participantsSequence: [],
            totalMembers: 0,
        }
    },
    validations() {
        const rules = {
            inputs: {
                violationDays: { required },
                violationDays_1: { required },
                workersCount: { required },
                daysCount: { required }
            }
        }
        if(+this.currentOrganized.organize_type === 0){
            Object.assign(rules.inputs, {
                copyCount: { required },
            })
        }
        if(this.organizedRows[0].is_main_tool === 1){
            Object.assign(rules.inputs, {
                calendar_days: { required },
            })
        }

        return rules;
    },
    mounted() { 
        this.$store.dispatch('organize/getCurrent', this.$route.params.id)
        const locale = 'hy'
        this.purchaseType = this.organizedRows[0].type
        this.getOrgnizeTypeByPlan = this.purchaseTypesLongNamesCased[locale][this.purchaseType || 2]
        this.checkType = this.organizedRows[0].procurementPlan.details[0].type
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organize/currentOrganized']
        },
        organizedRows() {
            return this.$store.getters['organize/organizedRows']
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
                this.$store.dispatch('organize/getRows', {organizeId: this.$route.params.id})
                this.handleLoaded()
            },
        },
    },
    methods: {
        save() {
            this.$v.inputs.$touch();
            const _this = this
            let hasInvalid = false;
            $('#commandment-file .editor-input').each(function() {
                const inputName = $(this).attr('inputname');
                const input = _this.$v.inputs[inputName];
                if (input.$error) {
                    hasInvalid = true;
                    if(_this.$refs[inputName]._isVue) {
                        _this.$refs[inputName].$el.focus()
                    } else {
                        _this.$refs[inputName].focus();
                    }
                    return false;
                }
            });
            if(!hasInvalid){
                this.handleLoadingStart()
                this.handleLoading(true)
                $('.editor-input').each(function() {
                    const txt = $(this).val()
                    $(this).after(txt)
                    $(this).remove()
                });

                $('.editor-option').each(function(index) {
                    const inputNumber = index+1
                    const optionValue = $(`.option-${inputNumber}:checked`).val()
                    const notSelectedOptionValue = +optionValue === 1 ? 2 : 1
                    $(`.option-${inputNumber}-variant-${notSelectedOptionValue}`).remove()
                    $(`.option-${inputNumber}`).remove()
                });
                 this.$client.put(`organize/${this.currentOrganized.id}`, {contract_html_hy: $('#commandment-file').html()}).then(({ status, data }) => {
                    // eslint-disable-next-line eqeqeq
                    if(status == 200) {
                    this.$store.commit('organize/setCurrentOrganized', data.data)
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            text: 'Հաջողությամբ թարմացված է'
                        })
                        this.handleLoading(false)
                        this.$modal.hide('new-editor-modal')
                    }
                    this.isSaving = false
                    this.handleLoadingEnd()
                }).catch(e => {
                    this.handleLoadingEnd()
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: 'Ինչ որ բան այն չէ',
                        text: 'Կրկին փորձեք!'
                    })
                    this.isSaving = false
                })
            }
        },
        consoleLog(msg) {
            console.log(msg)
        },
        calculateMonthPrice(price, percent){
            return price*percent/100
        },
    },
}
</script>
<style>
.option-box *{
    color: grey;
}
.option-box-selected *{
    color: red;
}
</style>
<style scoped>
    *{
        font-family: GHEA grapalat  !important;
    }
</style>