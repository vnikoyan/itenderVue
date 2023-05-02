<template>
    <div id="commandment-file" ref="contract"
        class="w-100" style="line-height: 2">
        <section slot="pdf-content" contenteditable="true" style="font-size: 14px;">
            <div  style="text-align: center;font-weight: 600;">ՀԱՇՎԵՏՎՈՒԹՅՈՒՆ</div>
            <div style="text-align: justify;margin-top: 20px">
                <span style="text-align: justify" v-if="me.organisation.id_card_number === null || me.organisation.id_card_number === undefined || me.organisation.id_card_number === ''">
                    <span> «{{ me.organisation[0].translations.name.hy }}» </span> 
                    <span v-if="me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' ||
                        me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' ||
                        me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ՍՊԸ' ||
                        me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' ||  me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{me.organisation[0].translations.company_type.hy}}-ի</span> 
                    <span v-else>{{me.organisation[0].translations.company_type.hy}}</span>
                </span>
                <span v-else>
                    {{ me.organisation[0].translations.name.hy }}
                </span>
                կարիքների համար {{currentOrganized.name}} ձեռքբերման նպատակով կազմակերպված {{ currentOrganized.code }}
            </div>
            <div>մրցույթի արդյունքները`</div>
            <br/>
            <div class="lots">
                <table style="text-align: center;width: 100%; table-layout: fixed; border: 1px solid  black; border-collapse: collapse; margin: 0 auto;  " data-mce-style="table-layout: fixed; width: 100%; border: 1px solid  black; border-collapse: collapse; margin: 0 auto;" class="mce-item-table ft-7">
                <tbody>
                    <tr style="border: 1px solid  black; border-collapse: collapse;" data-mce-style="border: 1px solid  black; border-collapse: collapse;">
                        <th colspan="11" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">Գնման առարկայի</th>
                    </tr>
                    <tr style="border: 1px solid  black; border-collapse: collapse;" data-mce-style="border: 1px solid  black; border-collapse: collapse;">
                        <th style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">չափաբաժնի համարը</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">անվանումը</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">չափման միավորը</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">քանակը</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">նախահաշվային գինը /ՀՀ դրամ/</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">տեխնիկական բնութագիրը</th>
                    </tr>
                    <tr v-for="(lot) in currentOrganized.organize_rows" :key="lot.name">
                        <th style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">{{ lot.view_id }}</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">{{ lot.procurement_plan.cpv.name }}</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">{{ lot.procurement_plan.cpv.unit }}</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">{{ lot.count }}</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">{{ lot.procurement_plan.details[0].unit_amount * lot.count }}</th>
                        <th colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; padding: 8px 18px;">{{ lot.procurement_plan.specifications.description.hy }}</th>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;" data-mce-style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;"><br></td>
                    </tr>
                   <tr>
                        <td colspan="5" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;">Մրցույթի ձևը</td>
                        <td colspan="6" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;">{{purchaseTypesForItenderLongNames[Number(organizedRowsList[0].type)]}}</td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;" data-mce-style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;"><br></td>
                    </tr>
                   <tr>
                        <td colspan="5" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;">Մրցույթը կազմակերպելու ամսաթիվը</td>
                        <td colspan="6" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;">{{currentOrganized.send_date}}</td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;" data-mce-style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;"><br></td>
                    </tr>           
                    <tr>
                        <td rowspan="3" colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Հ/Հ</td>
                        <td rowspan="3" colspan="3" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Մասնակիցների անվանումները</td>
                        <td colspan="6" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Յուրաքանչյուր մասնակցի հայտով ներկայացված գինը</td>
                    </tr> 
                    <tr>
                        <td colspan="6" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">ՀՀ դրամ</td>
                    </tr>
                    <tr>
                        <td colspan="2" rowspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Գինն առանց ԱԱՀ</td>
                        <td colspan="2" rowspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">ԱԱՀ</td>
                        <td colspan="2" rowspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Ընդհանուր</td>
                    </tr>
                    <tr style="border-collapse: collapse;" data-mce-style="border: 1px solid white; border-collapse: collapse;"></tr>
                    <template v-for="(organizedRow, organizedIndex) in organizedRowsList">
                        <tr :key="organizedRow.toString() + organizedIndex + Math.random()">
                            <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Չափաբաժին {{ organizedRow.view_id }}՝</td>
                            <td colspan="9" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ organizedRow.cpv_name }} - {{ organizedRow.cpv_code }}/{{ organizedRow.cpv_drop }}</td>
                        </tr>
                        <template v-for="(participant, participantIndex) in organizedRow.participants">
                            <tr :key="participant.toString() + participantIndex + Math.random()">
                                <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ participantIndex+1 }}</td>
                                <td colspan="3" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ participant.user_info.name.hy }}</td>

                                <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ participant.value }}</td>
                                <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ participant.vat }}</td>
                                <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ participant.cost }}</td>
                            </tr>
                        </template>
                    </template>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;" data-mce-style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Տվյալներ մերժված առաջարկների մասին</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">Չափաբաժնի համարը</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">Մասնակցի անվանումը</td>
                        <td colspan="7" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">Նկարագրություն</td>
                    </tr>
                    <template v-if="currentOrganized.winner_by_lots">
                        <tr :key="participant.id" v-for="(participant) in incorrectParticipants">
                            <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">
                                <span :key="`${participant.id}-${lot.id}`" v-for="(lot, lotIndex) in participant.lots">
                                    {{lot.row.view_id}}<span v-if="lotIndex !== participant.lots.length - 1">,</span>
                                </span>
                            </td>
                            <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">{{participant.name}}</td>
                            <td colspan="7" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">{{participant.lots[0].rejection_reason}}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr :key="participant.id" v-for="(participant) in incorrectParticipants">
                            <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">
                                <span :key="`${participant.id}-${lot.id}`" v-for="(lot, lotIndex) in participant.lots">
                                    {{lot.row.view_id}}<span v-if="lotIndex !== participant.lots.length - 1">,</span>
                                </span>
                            </td>
                            <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">{{participant.name}}</td>
                            <td colspan="7" style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 10px; text-align: center; padding: 5px 5px;">{{participant.lots[0].rejection_reason}}</td>
                        </tr>
                    </template>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;" data-mce-style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;"><br></td>
                    </tr>  
                    <tr>
                        <td colspan="5" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;">Հաղթողի որոշման ամսաթիվը</td>
                        <td colspan="6" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;">{{currentOrganized.opening_date_time}}</td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;" data-mce-style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;"><br></td>
                    </tr>
                    <tr v-if="currentOrganized.contract_html_hy !== ''">
                        <td rowspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Չափաբաժնի համարը</td>
                        <td rowspan="2" colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Հաղթող մասնակիցը</td>
                        <td colspan="8" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Պայմանագրի</td>
                    </tr>
                    <tr v-if="currentOrganized.contract_html_hy !== ''">
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Պայմանագրի համարը</td>
                        <td colspan="2" style=" border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style=" border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Կնքման ամսաթիվը</td>
                        <td style=" border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style=" border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Կատարման վերջնաժամկետը</td>
                        <td style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Կանխավճարի չափը</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Հաղթած գումարի չափը /ՀՀ դրամ/</td>
                    </tr>
                    <tr v-if="currentOrganized.contract_html_hy === ''">
                        <td colspan="3" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Չափաբաժնի համարը</td>
                        <td colspan="4" style=" border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style=" border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Հաղթող մասնակիցը</td>
                        <td colspan="4" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Հաղթած գումարի չափը /ՀՀ դրամ/</td>
                    </tr>
                    <tr v-for="(winner, index) in currentOrganized.winners" :key="index">
                        <td :colspan="currentOrganized.contract_html_hy === '' ? 3 : 1" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">
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
                        <td :colspan="currentOrganized.contract_html_hy === '' ? 4 : 2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ winner.name }}</td>
                        <td v-if="currentOrganized.contract_html_hy !== ''" colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ currentOrganized.code + '-' + Number(index + 1) }}</td>
                        <td v-if="currentOrganized.contract_html_hy !== ''" colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;"></td>
                        <td v-if="currentOrganized.contract_html_hy !== ''" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{currentOrganized.implementation_deadline}}</td>
                        <td v-if="currentOrganized.contract_html_hy !== ''" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;"></td>
                        <td :colspan="currentOrganized.contract_html_hy === '' ? 4 : 2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">
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
                        <td colspan="11" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Հաղթող մասնակցի (մասնակիցների) անվանումը և հասցեն</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Չափաբաժնի համարը</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Հաղթող մասնակիցը</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Հասցե, հեռ.</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Էլ.-փոստ</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">Բանկային հաշիվը</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">ՀՎՀՀ / Անձնագրի համարը և սերիան</td>
                    </tr>
                    <tr v-for="(winner) in currentOrganized.winners" :key="winner.id">
                        <td style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">
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
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ winner.name }}</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">հասցե՝ {{ winner.address }}, <br> հեռախոսահամար՝ {{ winner.phone}}</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ winner.email }}</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ winner.bank_account }}</td>
                        <td colspan="2" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 5px 5px;">{{ winner.tin }}</td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;" data-mce-style="background: #5bb4f3; border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: center; padding: 10px;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;">Չկայացած չափաբաժինները</td>
                        <td colspan="7" style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;" data-mce-style="border: 1px solid  black; border-collapse: collapse; font-size: 11px; text-align: left; padding: 5px 5px;"> 
                            <span v-for="(lot, index) in organizedRowsList" :key="index">
                                <span v-if="lot.winners.length === 0">{{lot.view_id}} <span v-if="index !== organizedRowsList.length - 1">,</span> </span>
                            </span> 
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script>
import purchaseTypesForItenderLongNames from '@/mixins/purchaseTypes'
export default {
    name: 'report',
    components: {},
    mixins: [purchaseTypesForItenderLongNames],
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
            return this.$store.getters['organizeItender/currentOrganized']
        },
        organizedRowsList() {
            return this.$store.getters['organizeItender/organizedRows']
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
                this.incorrectParticipants = this.currentOrganized.participants.filter((participant) => participant.lots.find((lot) => !lot.is_satisfactory));
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