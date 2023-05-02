<template>
    <div id="commandment-file" ref="contract"
        class="w-100" style="line-height: 2">
        <section slot="pdf-content" contenteditable="true" style="font-size: 14px;">
            <div  style="text-align: center;font-weight: 600;">ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</div>
            <div  style="text-align: center; font-weight: 600;">կնքված պայմանագրի մասին</div>
            <div style="text-align: justify;margin-top: 20px">
                <span style="text-align: justify"><span> «{{ me.organisation[0].translations.name.hy }}» </span> 
                <span v-if="me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' ||
                    me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' ||
                    me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ՍՊԸ' ||
                    me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' ||  me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{me.organisation[0].translations.company_type.hy}}-ն</span> 
                <span v-else>{{me.organisation[0].translations.company_type.hy}}ն</span>
                <span> ,որը գտնվում է</span> {{me.organisation[0].translations.address.hy}} <span>հասցեում, ստորև ներկայացնում է իր կարիքների համար</span></span>
                <span style="text-align: justify;"><span > {{ currentOrganized.name }} </span><span>ձեռքբերման նպատակով կազմակերպված </span><span> {{ currentOrganized.code }} </span></span>
                <span style="text-align: justify;">ծածկագրով գնման ընթացակարգի արդյունքում կնքված պայմանագրի մասին տեղեկատվությունը`</span>
            </div>
            <br/>
            <div class="lots">
                <table cellspacing="8" cellpadding="8" style="color: black;text-align: center;width: 100%; table-layout: fixed; border: 1px solid black; border-collapse: collapse; margin: 0 auto;  " data-mce-style="table-layout: fixed; width: 100%; border: 1px solid black; border-collapse: collapse; margin: 0 auto;" class="mce-item-table ft-7">
                <tbody>
                    <tr style="border: 1px solid black; border-collapse: collapse;" data-mce-style="border: 1px solid black; border-collapse: collapse;">
                        <th colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">Գնման առարկայի</th>
                    </tr>
                    <tr style="border: 1px solid black; border-collapse: collapse;" data-mce-style="border: 1px solid black; border-collapse: collapse;">
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">չափաբաժնի համարը</th>
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">անվանումը</th>
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">չափման միավորը</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">քանակը</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">նախահաշվային գինը /ՀՀ դրամ/</th>
                        <th rowspan="2" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">համառոտ նկարագրությունը (տեխնիկական բնութագիր)</th>
                        <th rowspan="2" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">պայմանագրով նախատեսված համառոտ նկարագրությունը (տեխնիկական բնութագիր)</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">առկա ֆինանսական միջոցներով</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">ընդհանուր</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">առկա ֆինանսական միջոցներով</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">ընդհանուր</th>
                    </tr>
                    <tr v-for="(lot) in currentOrganized.organize_rows" :key="lot.name">
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.view_id }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.cpv.name }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.cpv.unit }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.count }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.count }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.details[0].unit_amount * lot.count }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.details[0].unit_amount * lot.count }}</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.specifications.description.hy }}</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">
                            <span v-if="lot.won_lot_id === null">Չկայացած</span>
                            <span v-else>{{ lot.procurement_plan.specifications.description.hy }}</span>
                        </th>
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
                    <template v-for="(organizedRow, organizedIndex) in organizedRowsList">
                        <tr :key="organizedRow.toString() + organizedIndex + Math.random()">
                            <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Չափաբաժին {{ organizedRow.view_id }}՝</td>
                            <td colspan="9" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ organizedRow.cpv_name }} - {{ organizedRow.cpv_code }}/{{ organizedRow.cpv_drop }}</td>
                        </tr>
                        <template v-for="(participant, participantIndex) in organizedRow.participantsList">
                            <tr :key="participant.toString() + participantIndex + Math.random()">
                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participantIndex+1 }}</td>
                                <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participant.name.hy }}</td>

                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participant.current_price }}</td>
                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participant.current_vat }}</td>
                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participant.current_price_vat }}</td>
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
                        <td colspan="8" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
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
                        <td rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Կանխավճարի չափը</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Գինը <br> ՀՀ դրամ</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Առկա ֆինանսական միջոցներով</td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Ընդհանուր</td>
                    </tr>
                    <tr v-for="(winner) in currentOrganized.winners" :key="winner.id">
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
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
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.name }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ currentOrganized.code }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            <template v-if="!currentOrganized.winner_by_lots">
                                <span v-if="Number.isInteger(currentOrganized.winner_user_price)">
                                    {{currentOrganized.winner_user_price}}
                                </span>
                                <span v-else>
                                    {{currentOrganized.winner_user_price}}
                                </span>
                            </template>
                            <template v-else>
                                <span v-if="Number.isInteger(getWonLotsPrice(winner.won_lots, winner.id))">
                                    {{ getWonLotsPrice(winner.won_lots, winner.id) }}
                                </span>
                                <span v-else>
                                    {{ getWonLotsPrice(winner.won_lots, winner.id)}}
                                </span>
                            </template>
                        </td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            <template v-if="!currentOrganized.winner_by_lots">
                                <span v-if="Number.isInteger(currentOrganized.winner_user_price)">
                                    {{currentOrganized.winner_user_price}}
                                </span>
                                <span v-else>
                                    {{currentOrganized.winner_user_price}}
                                </span>
                            </template>
                            <template v-else>
                                <span v-if="Number.isInteger(getWonLotsPrice(winner.won_lots, winner.id))">
                                    {{ getWonLotsPrice(winner.won_lots, winner.id) }}
                                </span>
                                <span v-else>
                                    {{ getWonLotsPrice(winner.won_lots, winner.id)}}
                                </span>
                            </template>
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
                    <tr v-for="(winner) in currentOrganized.winners" :key="winner.id">
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
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
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.name }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">հասցե՝ {{ winner.address }}, <br> հեռախոսահամար՝ {{ winner.phone}}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.email }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.bank_account }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.tin }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Այլ տեղեկություններ</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            Ծանոթություն` Որևէ չափաբաժնի չկայացման դեպքում պատվիրատուն պարտավոր է լրացնել տեղեկություններ չկայացման վերաբերյալ։
                            <template v-if="lots.length">
                                <br/>
                                <span :key="row.id" v-for="(row, rowIndex) in lots">{{row.view_id}}<span v-if="rowIndex !== organizedRowsList.filter(item => item.winner_participant_id === 0 && item.winner_user_id === 0).length - 1">,</span></span><template v-if="organizedRowsList.filter(item => item.winner_participant_id === 0 && item.winner_user_id === 0).length === 1">-րդ չափաբաժինը հայտարարվել է չկայացած</template><template v-else> չափաբաժինները հայտարարվել են չկայացած</template>
                            </template>
                            <!-- <div>
                                <p v-for="(lot, lotIndex) in lots" :key="lotIndex"><span>{{lot.view_id}}</span>-րդ չափաբաժինը հայտարարվել է չկայացած</p>
                            </div> -->
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">
                            <p style="text-align: justify; margin-bottom: 5px; ">Ինչպես սույն ընթացակարգի տվյալ չափաբաժնի մասով հայտ ներկայացրած մասնակիցները, այնպես էլ Հայաստանի Հանրապետությունում պետական գրանցում ստացած հասարակական կազմակերպությունները և լրատվական գործունեություն իրականացնող անձինք, կարող են ընթացակարգը կազմակերպած պատվիրատուին ներկայացնել կնքված  պայմանագրի տվյալ չափաբաժնի արդյունքի ընդունման գործընթացին պատասխանատու ստորաբաժանման հետ համատեղ մասնակցելու գրավոր պահանջ՝ սույն հայտարարությունը հրապարակվելուց հետո _____________ օրացուցային օրվա ընթացքում:</p>
                            <p style="text-align: left; margin-bottom: 5px; ">Գրավոր պահանջին  կից ներկայացվում է՝</p>
                            <p style="text-align: left; margin-bottom: 5px; ">1) ֆիզիկական անձին տրամադրված լիազորագրի բնօրինակը: Ընդ որում լիազորված՝ </p>
                            <p style="text-align: left; margin-bottom: 5px; ">ա. ֆիզիկական անձանց քանակը չի կարող գերազանցել երկուսը.</p>
                            <p style="text-align: left; margin-bottom: 5px; ">բ. ֆիզիկական անձը անձամբ պետք է կատարի այն գործողությունները, որոնց համար լիազորված է.</p>
                            <p style="text-align: justify; margin-bottom: 5px; ">2) ինչպես գործընթացին մասնակցելու պահանջ ներկայացրած, այնպես էլ  լիազորված ֆիզիկական անձանց կողմից ստորագրված բնօրինակ հայտարարություններ՝ «Գնումների մասին» ՀՀ օրենքի 5.1 հոդվածի 2-րդ մասով նախատեսված շահերի բախման բացակայության մասին.</p>
                            <p style="text-align: justify; margin-bottom: 5px; ">3) այն էլեկտրոնային փոստի հասցեները և հեռախոսահամարները, որոնց միջոցով պատվիրատուն կարող է կապ հաստատել պահանջը ներկայացրած անձի և վերջինիս կողմից լիազորված ֆիզիկական անձի հետ.</p>
                            <p style="text-align: justify; margin-bottom: 5px; ">4) Հայաստանի Հանրապետությունում պետական գրանցում ստացած հասարակական կազմակերպությունների և լրատվական գործունեություն իրականացնող անձանց դեպքում՝ նաև պետական գրանցման վկայականի պատճենը: Պատվիրատուի պատասխանատու ստորաբաժանման ղեկավարի էլեկտրոնային փոստի պաշտոնական հասցեն է` ____________________________:</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Մասնակիցների ներգրավման նպատակով «Գնումների մասին» ՀՀ օրենքի համաձայն իրականացված հրապարակումների մասին տեղեկությունները</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Գնումների մասին ՀՀ օրենսդրությամբ սահմանված կարգով ընթացակարգի հրավերը ուղարկվել է հնարավոր մասնակցին /ներին/</td>
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
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Գնման գործընթացի վերաբերյալ ներկայացված բողոքները և դրանց վերաբերյալ կայացված որոշումները</td>
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
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ getSubordinateUser().name || me.name }}</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ getSubordinateUser().phone || me.phone }}</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ getSubordinateUser().email || me.email }}</td>
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
            participants: [],
            incorrectParticipants: [],
            participantsSequence: [],
            organizedRows: [],
            totalMembers: 0,
            signYear: '', 
            signMonth: '', 
            signDay: '', 
            lots: [],
            newProps: false,
            checkType: 0,
        }
    },
    mounted() {
        this.$store.dispatch('settings/getUnits')
        this.$store.dispatch('settings/getFinancialClassifiers')
        this.$store.dispatch('settings/getClassifiers')
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organizeOnePerson/currentOrganized']
        },
        organizedRowsList() {
            return this.$store.getters['organizeOnePerson/organizedRows']
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
                this.lots = [];
                this.currentOrganized.organize_rows.forEach(row => {
                    this.checkType = row.procurement_plan.details[0].type
                    if(row.winner_user_id === 0){
                        this.lots.push(row)
                    }
                });
                if(!this.currentOrganized.winner_by_lots){
                    this.currentOrganized.organize_rows.forEach((row) => {
                        const newRow = {...row}
                        newRow.winner_user = this.currentOrganized.winners[0]
                        this.organizedRows.push(newRow)
                    })
                }
                this.incorrectParticipants = this.currentOrganized.participants.filter((participant) => !participant.responded)
                await this.$client.get(`contract/getByOrganize/${this.$route.params.id}`).then(({data}) => {
                    if(data.length){
                        const signDate = new Date(data[0].sign_date)
                        this.signYear = signDate.getFullYear()
                        const month = signDate.getMonth()
                        this.signMonth = this.getMonthArmenian(month)
                        this.signDay = signDate.getDate()
                    }
                    this.handleLoaded()
                })
            },
        },
    },
    methods: {
        getWonLotsPrice(wonLots, id){
            var price = 0;    
            wonLots.forEach((lot) => {
                const offer = this.currentOrganized.lots.find(item => item.organize_row_id === lot.id && (item.participant_id === id || item.row_group_id === id))
                price+=offer.cost;
            })
            return price
        },
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
            // (participant.new_value || participant.value)*0.2
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
            // (participant.new_value || participant.value) + participant.vat ? (participant.new_value || participant.value)*0.2 : 0
        },
        getMonthArmenian(month){
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
                    break;
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