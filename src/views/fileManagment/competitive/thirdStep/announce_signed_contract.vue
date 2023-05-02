<template>
    <div id="commandment-file" ref="contract" style="width: 100%;">
        <section slot="pdf-content" contenteditable="true">
            <div>
                <div style="text-align: right;font-weight: 700;">Հավելված N 1</div>
                <div style="text-align: right;font-weight: 700;">ՀՀ ֆինանսների նախարարի 2021 թվականի</div>
                <div style="text-align: right;font-weight: 700;">հունիսի 29-ի N 323-Ա հրամանի</div>
                <div style="text-decoration: underline;text-align: right;">Օրինակելի ձև</div>
            </div>
            <br>
            <div style="text-align: center;font-weight: 600;">ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</div>
            <div style="text-align: center;font-weight: 600;">կնքված պայմանագրի մասին</div>
            <div style="margin-top: 40px">
                <p style="margin-bottom: 0; text-align: justify;" >
                    <span style="text-align: justify;" >{{'«' + me.organisation[0].translations.name.hy + '»'}}</span>
                    <span  style="text-align: justify;"
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
                                'ՊՈԱԿ'"> {{ me.organisation[0].translations.company_type.hy}}-ն </span>
                    <span  style="text-align: justify;" v-else> {{me.organisation[0].translations.company_type.hy}}ն </span>
                    <span  style="text-align: justify;">, որը գտնվում է </span>
                    {{ me.organisation[0].translations.address.hy }}
                    <span  style="text-align: justify;">հասցեում, ստորև ներկայացնում է իր կարիքների համար</span>
                    <span  style="text-align: justify;"> {{currentOrganized.translations.name.hy}} </span>
                    <span  style="text-align: justify;">ձեռքբերման նպատակով կազմակերպված </span> 
                    <span  style="text-align: justify; ">{{currentOrganized.translations.code.hy}}</span>
                    <span  style="margin-bottom: 0; text-align: justify; "> ծածկագրով գնման ընթացակարգի արդյունքում կնքված պայմանագրի մասին տեղեկատվությունը`</span>
                </p>
            </div>
            <br/>
            <div class="lots" style="margin-top: 10px;">
                <table cellpadding="10" cellspacing="10" style="text-align: center; width: 100%; table-layout: fixed; border: 1px solid black; border-collapse: collapse; margin: 0 auto;" data-mce-style="table-layout: fixed; width: 100%; border: 1px solid black; border-collapse: collapse; margin: 0 auto;" class="mce-item-table ft-7">
                <tbody>
                    <tr style="border: 1px solid black; border-collapse: collapse;" data-mce-style="border: 1px solid black; border-collapse: collapse;">
                        <th colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">Գնման առարկայի</th>
                    </tr>
                    <tr style="border: 1px solid black; border-collapse: collapse;" data-mce-style="border: 1px solid black; border-collapse: collapse;">
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">չափաբաժնի համարը</th>
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">անվանումը</th>
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">չափման միավորը</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">քանակը</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">նախահաշվային գինը /ՀՀ դրամ/</th>
                        <th rowspan="2" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">համառոտ նկարագրությունը (տեխնիկական բնութագիր)</th>
                        <th rowspan="2" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">պայմանագրով նախատեսված համառոտ նկարագրությունը (տեխնիկական բնութագիր)</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">առկա ֆինանսական միջոցներով</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">ընդհանուր</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">առկա ֆինանսական միջոցներով</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">ընդհանուր</th>
                    </tr>
                    <tr v-for="lot in organizedRowsAll" :key="lot.name">
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">{{ lot.view_id }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">{{lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name}}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">{{lot.procurement_plan.cpv_outside ? lot.procurement_plan.cpv_outside.unit : lot.procurement_plan.cpv.unit}}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">{{ !lot.procurement_plan.is_condition ? lot.count : '' }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">{{ lot.count }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">{{ !lot.procurement_plan.is_condition ? lot.procurement_plan.details[0].unit_amount * lot.count : '' }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" v-if="Number.isInteger(lot.procurement_plan.details[0].unit_amount * lot.count)">{{ lot.procurement_plan.details[0].unit_amount * lot.count }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" v-else>{{ parseFloat(lot.procurement_plan.details[0].unit_amount * lot.count).toFixed(2) }}</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">{{ lot.procurement_plan.specifications.description.hy }}</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px;">{{lot.winner_lot_specification? JSON.parse(lot.winner_lot_specification).hy: ''}}</th>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                   <tr>
                        <td colspan="5" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Կիրառված գնման ընթացակարգը և դրա ընտրության հիմնավորումը`</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-if="checkType === 1">Մեկ անձից գնում, «Գնումների մասին» ՀՀ օրենքի 23-րդ հոդվածի 1-ին մասի 4-րդ կետ</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 2">Մեկ անձից գնում, «Գնումների մասին» ՀՀ օրենքի 23-րդ հոդվածի 1-ին մասի 1-ին կետ</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 3">Հրատապության հիմքով պայմանավորված մեկ անձից գնում, «Գնումների մասին» ՀՀ օրենքի 23-րդ հոդվածի 1-ին մասի 2-րդ կետ</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 6">Գնանշման հարցում, «Գնումների մասին» ՀՀ օրենքի 22-րդ հոդված</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 4">Բաց մրցույթ, «Գնումների մասին» ՀՀ օրենքի 20-րդ հոդված</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 5">Հրատապ բաց մրցույթ, «Գնումների մասին» ՀՀ օրենքի 20-րդ հոդված</td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Հրավեր ուղարկելու կամ հրապարակելու ամսաթիվը</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                     <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td rowspan="2" colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Հրավերում կատարված փոփոխությունների ամսաթիվը</td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">1</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">...</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td rowspan="3" colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Հրավերի վերաբերյալ պարզաբանումների ամսաթիվը</td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Հարցարդման ստացման</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Պարզաբանման</td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">1</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">...</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"><br></td>
                    </tr>
                    <tr>
                        <td rowspan="3" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Հ/Հ</td>
                        <td rowspan="3" colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Մասնակիցների անվանումները</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Յուրաքանչյուր մասնակցի հայտով, ներառյալ միաժամանակյա բանակցությունների կազմակերպման արդյունքում ներկայացված գինը /ՀՀ դրամ</td>
                    </tr> 
                    <tr>
                        <td colspan="2" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Գինն առանց ԱԱՀ</td>
                        <td colspan="2" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">ԱԱՀ</td>
                        <td colspan="2" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Ընդհանուր</td>
                    </tr>
                    <tr style="border-collapse: collapse;" data-mce-style="border: 1px solid white; border-collapse: collapse;"></tr>
                    <template v-for="(organizedRow, organizedIndex) in organizedRows">
                        <tr :key="organizedRow.toString() + organizedIndex + Math.random()">
                            <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Չափաբաժին {{ organizedRow.view_id }}՝</td>
                            <td colspan="9" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{organizedRow.procurement_plan.cpv_outside ? organizedRow.procurement_plan.cpv_outside.name : organizedRow.procurement_plan.cpv.name}} - {{organizedRow.procurement_plan.cpv_outside ? organizedRow.procurement_plan.cpv_outside.code : organizedRow.procurement_plan.cpv.code }}</td>
                        </tr>
                        <template v-for="(participant, participantIndex) in organizedRow.participants">
                            <tr :key="participant.toString() + participantIndex + Math.random()">
                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participantIndex+1 }}</td>
                                <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participant.user_info ? '«' + participant.user_info.name.hy + '»' + ' ' + participant.user_info.organisation.company_type.hy :  participant.info.name.hy }} </td>

                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" v-if="Number.isInteger(getPrice(participant))">{{ getPrice(participant) }}</td>
                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" v-else>{{ getPrice(participant).toFixed(2) }}</td>

                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" v-if="Number.isInteger(getVatPrice(participant))">{{ getVatPrice(participant) }}</td>
                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" v-else>{{ getVatPrice(participant).toFixed(2) }}</td>

                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" v-if="Number.isInteger(getTotalPrice(participant))">{{ getTotalPrice(participant) }}</td>
                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" v-else>{{ getTotalPrice(participant).toFixed(2) }}</td>
                            </tr>
                        </template>
                    </template>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Տվյալներ մերժված հայտերի մասին</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Չափաբաժնի համարը</td>
                        <td rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Մասնակցի անվանումը</td>
                        <td colspan="9" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Գնահատման արդյունքները (բավարար կամ անբավարար)</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Հրավերով պահանջվող փաստաթղթերի առկայությունը</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Հայտով ներկայացված փաստաթղթերի համապատասխանությունը հրավերով սահմանված պահանջներին</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Առաջարկած գնման առարկայի տեխնիկական բնութագրերի համապատասխանությունը հրավերով սահմանված պահանջներին</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Գնային առաջարկ</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="3" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Այլ տեղեկություններ</td>
                        <td colspan="8" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Ծանոթություն` Հայտերի մերժման այլ հիմքեր։</td>
                    </tr>
                    <tr>
                        <td colspan="8" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">
                            <template v-if="notEnoughParticipants.length">
                                Ստորև ներկայացված մասնակիցները մերժվել են, քանի որ ներկայացված գնային առաջարկները գերազանցել են նախահաշվային գները։
                                <br/>
                                <span :key="participantIndex + Math.random()" v-for="(participant, participantIndex) in notEnoughParticipants">
                                    {{participant.name.hy}} 
                                    <span :key="offerIndex + Math.random()" v-for="(offer, offerIndex) in participant.offers">
                                        {{offer}}<span v-if="offerIndex !== participant.offers.length-1">,</span>
                                    </span><span v-if="participantIndex !== notEnoughParticipants.length-1">,</span>
                                </span>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="5" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Ընտրված մասնակցի որոշման ամսաթիվը</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="5" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Անգործության ժամկետ</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Անգործության ժամկետի սկիզբ</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Անգործության ժամկետի ավարտ</td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Ընտրված մասնակցին պայմանագիր կնքելու առաջարկի ծանուցման ամսաթիվը՝</td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="5" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Ընտրված մասնակցի կողմից ստորագրված պայմանագիրը պատվիրատուի մոտ մուտքագրվելու ամսաթիվը</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="5" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Պատվիրատուի կողմից պայմանագրի ստորագրման ամսաթիվը</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td rowspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Չափաբաժնի համարը</td>
                        <td rowspan="3" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Ընտրված մասնակիցը</td>
                        <td colspan="8" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Պայմանագրի</td>
                    </tr>
                    <tr>
                        <td rowspan="2" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Պայմանագրի համարը</td>
                        <td rowspan="2" colspan="2" style="background: #e4e4e4; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #e4e4e4; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Կնքման ամսաթիվը</td>
                        <td rowspan="2" style="background: #e4e4e4; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #e4e4e4; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Կատարման վերջնաժամկետը</td>
                        <td rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center; background-color: rgb(228, 228, 228);" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Կանխավճարի չափը</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Գինը <br> ՀՀ դրամ</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Առկա ֆինանսական միջոցներով</td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Ընդհանուր</td>
                    </tr>
                    <tr v-for="(participantGroup, participantIndex) in participantGroups" :key="participantIndex + Math.random()">
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            <!-- {{participantGroup.won_lots.map((lot) => lot.view_id).toString()}} -->
                            <span :key="participantIndex + lotIndex" v-for="(lot, lotIndex) in participantGroup.won_lots"> 
                                {{lot.view_id}}<span v-if="lotIndex !== participantGroup.won_lots-1">,</span><br v-if="(lotIndex % 3 === 0) && lotIndex !== 0"/>
                            </span>
                        </td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{'«' + participantGroup.participant[0].name.hy + '»'}}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{contracts.find((item) => item.provider_id === participantGroup.id) ? contracts.find((item) => item.provider_id === participantGroup.id).code : currentOrganized.translations.code.hy + '/' + parseInt(participantIndex + 1)}}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" :style="!contracts.find((item) => item.provider_id === participantGroup.id) ? 'background-color: #aeaaaa;' : ''">{{contracts.find((item) => item.provider_id === participantGroup.id) ? contracts.find((item) => item.provider_id === participantGroup.id).sign_date : ''}}</td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center; background-color: #aeaaaa;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center; background-color: #aeaaaa;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            {{Number.isInteger(getContractPrice(participantGroup)) ? getContractPrice(participantGroup) : getContractPrice(participantGroup).toFixed(3).replace(/.$/, '') }}
                        </td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            {{Number.isInteger(getContractPrice(participantGroup)) ? getContractPrice(participantGroup) : getContractPrice(participantGroup).toFixed(3).replace(/.$/, '')}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Ընտրված մասնակցի (մասնակիցների) անվանումը և հասցեն</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Չափաբաժնի համարը</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Ընտրված մասնակիցը</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Հասցե, հեռ.</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Էլ.-փոստ</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Բանկային հաշիվը</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">ՀՎՀՀ / Անձնագրի համարը և սերիան</td>
                    </tr>
                    <tr v-for="(participantGroup, participantIndex) in participantGroups" :key="participantIndex + Math.random()">
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            <!-- {{participantGroup.won_lots.map((lot) => lot.view_id).toString()}} -->
                            <span :key="participantIndex + lotIndex" v-for="(lot, lotIndex) in participantGroup.won_lots"> 
                                {{lot.view_id}}<span v-if="lotIndex !== participantGroup.won_lots-1">,</span><br v-if="(lotIndex % 3 === 0) && lotIndex !== 0"/>
                            </span>
                        </td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ '«' + participantGroup.participant[0].name.hy + '»' }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">հասցե՝ {{participantGroup.participant[0].address.hy}}, <br />հեռախոսահամար՝ {{ participantGroup.participant[0].phone }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participantGroup.participant[0].email }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participantGroup.account_number }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participantGroup.participant[0].tin}}</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Այլ տեղեկություններ</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            Ծանոթություն` Որևէ չափաբաժնի չկայացման դեպքում պատվիրատուն պարտավոր է լրացնել տեղեկություններ չկայացման վերաբերյալ։
                            <template v-if="organizedRowsAll.filter(item => item.winner_participant_id === 0 && item.winner_user_id === 0).length">
                                <br/>
                                <span :key="row.id" v-for="(row, rowIndex) in organizedRowsAll.filter(item => item.winner_participant_id === 0 && item.winner_user_id === 0)">{{row.view_id}}<span v-if="rowIndex !== organizedRowsAll.filter(item => item.winner_participant_id === 0 && item.winner_user_id === 0).length - 1">,</span></span><template v-if="organizedRowsAll.filter(item => item.winner_participant_id === 0 && item.winner_user_id === 0).length === 1">-րդ չափաբաժինը հայտարարվել է չկայացած</template><template v-else> չափաբաժինները հայտարարվել են չկայացած</template>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">
                            <p style="text-align: justify; margin-bottom: 5px;">Ինչպես սույն ընթացակարգի տվյալ չափաբաժնի մասով հայտ ներկայացրած մասնակիցները, այնպես էլ Հայաստանի Հանրապետությունում պետական գրանցում ստացած հասարակական կազմակերպությունները և լրատվական գործունեություն իրականացնող անձինք, կարող են ընթացակարգը կազմակերպած պատվիրատուին ներկայացնել կնքված  պայմանագրի տվյալ չափաբաժնի արդյունքի ընդունման գործընթացին պատասխանատու ստորաբաժանման հետ համատեղ մասնակցելու գրավոր պահանջ՝ սույն հայտարարությունը հրապարակվելուց հետո _____________ օրացուցային օրվա ընթացքում:</p>
                            <p style="text-align: left; margin-bottom: 5px;">Գրավոր պահանջին  կից ներկայացվում է՝</p>
                            <p style="text-align: left; margin-bottom: 5px;">1) ֆիզիկական անձին տրամադրված լիազորագրի բնօրինակը: Ընդ որում լիազորված՝ </p>
                            <p style="text-align: left; margin-bottom: 5px;">ա. ֆիզիկական անձանց քանակը չի կարող գերազանցել երկուսը.</p>
                            <p style="text-align: left; margin-bottom: 5px;">բ. ֆիզիկական անձը անձամբ պետք է կատարի այն գործողությունները, որոնց համար լիազորված է.</p>
                            <p style="text-align: justify; margin-bottom: 5px;">2) ինչպես գործընթացին մասնակցելու պահանջ ներկայացրած, այնպես էլ  լիազորված ֆիզիկական անձանց կողմից ստորագրված բնօրինակ հայտարարություններ՝ «Գնումների մասին» ՀՀ օրենքի 5.1 հոդվածի 2-րդ մասով նախատեսված շահերի բախման բացակայության մասին.</p>
                            <p style="text-align: justify; margin-bottom: 5px;">3) այն էլեկտրոնային փոստի հասցեները և հեռախոսահամարները, որոնց միջոցով պատվիրատուն կարող է կապ հաստատել պահանջը ներկայացրած անձի և վերջինիս կողմից լիազորված ֆիզիկական անձի հետ.</p>
                            <p style="text-align: justify; margin-bottom: 5px;">4) Հայաստանի Հանրապետությունում պետական գրանցում ստացած հասարակական կազմակերպությունների և լրատվական գործունեություն իրականացնող անձանց դեպքում՝ նաև պետական գրանցման վկայականի պատճենը: Պատվիրատուի պատասխանատու ստորաբաժանման ղեկավարի էլեկտրոնային փոստի պաշտոնական հասցեն է` ____________________________:</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Մասնակիցների ներգրավման նպատակով «Գնումների մասին» ՀՀ օրենքի համաձայն իրականացված հրապարակումների մասին տեղեկությունները</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Գնումների մասին ՀՀ օրենսդրությամբ սահմանված կարգով ընթացակարգի հրավերը հրապարակվել է տեղեկագրում</td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Գնման գործընթացի շրջանակներում հակաօրինական գործողություններ հայտնաբերվելու դեպքում դրանց և այդ կապակցությամբ ձեռնարկված գործողությունների համառոտ նկարագիրը</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Գնման ընթացակարգի վերաբերյալ ներկայացված բողոքները և դրանց վերաբերյալ կայացված որոշումները</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Այլ անհրաժեշտ տեղեկություններ</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Սույն հայտարարության հետ կապված լրացուցիչ տեղեկություններ ստանալու համար կարող եք դիմել գնումների համակարգող</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Անուն, Ազգանուն</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Հեռախոս</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Էլ. փոստի հասցեն</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{currentOrganized.translations.evaluator_secretary_name.hy ? currentOrganized.translations.evaluator_secretary_name.hy : currentOrganized.translations.evaluator_secretary_name.hy}}</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ currentOrganized.evaluator_secretary_phone }}</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ currentOrganized.evaluator_secretary_email }}</td>
                    </tr>
                </tbody>
                </table>   
            </div>            
        </section>
    </div>  
</template>
<script>
    export default {
        name: 'announce_signed_contract',
        components: {},
        props: ['handleLoaded'],
        data() {
            return {
                contracts: [],
                participants: [],
                incorrectParticipants: [],
                notEnoughParticipants: [],
                participantsSequence: [],
                organizedRows: [],
                organizedRowsAll: [],
                totalMembers: 0,
                signYear: '',
                signMonth: '',
                signDay: '',
                participantGroups: [],
                checkType: 0,
            }
        },
        async mounted() {
            this.$store.dispatch('settings/getUnits')
            this.$store.dispatch('settings/getFinancialClassifiers')
            this.$store.dispatch('settings/getClassifiers')
            await this.$client
                .get(
                    `participant-group/getByOrganize/getWonLots/${this.$route.params.id}`
                )
                .then((response) => {
                    const results = response.data
                    if (results) {
                        results.forEach((participant) => {
                            if (participant.won_lots.length > 0) {
                                this.participantGroups.push(participant)
                            }
                        })
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        computed: {
            currentOrganized() {
                return this.$store.getters['organize/currentOrganized']
            },
            organizedRowsFromStore() {
                return this.$store.getters['organize/organizedRows']
            },
            financialClassifiers() {
                return this.$store.getters['settings/financialClassifiers']
            },
            classifiers() {
                return this.$store.getters['settings/classifiers']
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
                    console.log(this.currentOrganize)
                    this.totalMembers =
                        this.currentOrganized.evaluator_member.length +
                        (this.currentOrganized.translations.evaluator_president
                            .hy !== ''
                            ? 1
                            : 0)
                    await this.$client
                        .get(
                            `organize-row/getByOrganizeParticipmants/${this.$route.params.id}`
                        )
                        .then((response) => {
                            const rows = response.data
                            rows.forEach((row) => {
                                this.organizedRowsAll.push(row)
                                this.checkType = row.procurement_plan.details[0].type
                                if (row.winner) {
                                    this.organizedRows.push(row)
                                }
                            })
                        })
                    await this.$client
                        .get(
                            `participant-group/getByOrganize/${this.$route.params.id}`
                        )
                        .then((response) => {
                            const participantsData = response.data
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
                            })
                            this.participants = participantsData
                        })
                    await this.$client
                        .get(`contract/getByOrganize/${this.$route.params.id}`)
                        .then(({ data }) => {
                            if (data.length) {
                                const signDate = new Date(data[0].sign_date)
                                this.signYear = signDate.getFullYear()
                                const month = signDate.getMonth()
                                this.signMonth = this.getMonthArmenian(month)
                                this.signDay = signDate.getDate()
                                this.contracts = data
                            }
                            this.handleLoaded()
                        })
                },
            },
        },
        methods: {
            getWonLotsPrice(wonLots, id) {
                var price = 0
                wonLots.forEach((lot) => {
                    const offer = this.currentOrganized.lots.find(
                        (item) =>
                            item.organize_row_id === lot.id &&
                            (item.participant_id === id || item.row_group_id === id)
                    )
                    price += offer.cost
                })
                return price
            },
            getPrice(participant) {
                if (participant.new_value) {
                    return participant.new_value
                } else {
                    return participant.value
                }
            },
            getVatPrice(participant) {
                if (participant.vat) {
                    if (participant.new_value) {
                        return participant.new_value * 0.2
                    } else {
                        return participant.value * 0.2
                    }
                } else {
                    return 0
                }
                // (participant.new_value || participant.value)*0.2
            },
            getTotalPrice(participant) {
                if (participant.vat) {
                    if (participant.new_value) {
                        return participant.new_value + participant.new_value * 0.2
                    } else {
                        return participant.value + participant.value * 0.2
                    }
                } else {
                    if (participant.new_value) {
                        return participant.new_value
                    } else {
                        return participant.value
                    }
                }
                // (participant.new_value || participant.value) + participant.vat ? (participant.new_value || participant.value)*0.2 : 0
            },
            getMonthArmenian(month) {
                switch (month) {
                    case 0:
                        return 'հունվար'
                    case 1:
                        return 'փետրվար'
                    case 2:
                        return 'մարտ'
                    case 3:
                        return 'ապրիլ'
                    case 4:
                        return 'մայիս'
                    case 5:
                        return 'հունիս'
                    case 6:
                        return 'հուլիս'
                    case 7:
                        return 'օգոստոս'
                    case 8:
                        return 'սեպտեմբեր'
                    case 9:
                        return 'հոկտեմբեր'
                    case 10:
                        return 'նոյեմբեր'
                    case 11:
                        return 'դեկտեմբեր'
                    default:
                        break
                }
            },
            getSubordinateUser(row) {
                var userId = 0
                if (row.user_id_1) {
                    userId = row.user_id_1
                } else if (row.user_id_2) {
                    userId = row.user_id_2
                } else if (row.user_id_3) {
                    userId = row.user_id_3
                } else if (row.user_id_4) {
                    userId = row.user_id_4
                } else if (row.user_id_5) {
                    userId = row.user_id_5
                }
                const found = this.userChildren.find((user) => user.id === userId)
                if (found) {
                    return found.name
                }
                return 'կցված չէ'
            },
            consoleLog(msg) {
                console.log(msg)
            },
            getContractPrice(participantGroup) {
                var sumPrice = 0
                participantGroup.won_lots.forEach((lot) => {
                    const offer = participantGroup.lots.find(item => item.organize_row_id === lot.id)
                    if (participantGroup.lots) {
                        const newPrice = offer.new_value
                        const price = offer.value
                        const vat = offer.vat
                        if (vat) {
                            if (newPrice) {
                                sumPrice = sumPrice + (newPrice + newPrice * 0.2)
                            } else {
                                sumPrice = sumPrice + (price + price * 0.2)
                            }
                        } else {
                            if (newPrice) {
                                sumPrice = sumPrice + newPrice
                            } else {
                                sumPrice = sumPrice + price
                            }
                        }
                    }
                })
                return sumPrice
            },
            async handleBeforeDownload() {
                this.newProps = true
                await this.handleLoaded()
                return this.$refs.contract.innerHTML
            },
            download() {
                this.$refs.contract.generatePdf()
            },
        },
    }
</script>
<style scoped>
    *{
        font-family: GHEA grapalat !important;
    }
</style>