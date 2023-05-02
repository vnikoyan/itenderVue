<template>
    <div id="commandment-file" ref="contract"
        class="w-100" style="line-height: 2">
        <section slot="pdf-content" contenteditable="true" style="font-size: 14px;">
            <div style="text-align: center;font-weight: 600;">ОБЪЯВЛЕНИЕ</div>
            <div style="text-align: center; font-weight: 600;">о заключенном договоре</div>
            <div style="text-align: justify;margin-top: 20px">
                <span style="text-align: justify;margin-bottom: 0">«{{ me.organisation[0].translations.name.ru }}» {{ me.organisation[0].translations.company_type.ru }} <span > ниже представляет информацию о договоре № </span> {{ currentOrganized.code_ru }}<span >,</span></span>
                <span style="text-align: justify;margin-bottom: 0"><span > 20____года</span> ___________________________<span >в результате процедуры закупки под кодом </span><span > {{ currentOrganized.code_ru }}</span>,</span>
                <!-- <p style="text-align: justify;margin-bottom: 10px; font-size: 8px; margin-left: 100px;" class="ft-6">дата заключения договора</p> -->
                <span style="text-align: justify;margin-bottom: 0"> организованной с целью приобретения <span >        
                {{
                    currentOrganized.name_ru
                        ? currentOrganized.name_ru
                        : currentOrganized.name_ru
                }}</span> для своих нужд:</span>
            </div>
            <br/>
            <div class="lots" style="margin-top: 10px">
                <table cellspacing="8" cellpadding="8" style="color: black; text-align: center;width: 100%; table-layout: fixed; border: 1px solid black; border-collapse: collapse; margin: 0 auto;" data-mce-style="table-layout: fixed; width: 100%; border: 1px solid black; border-collapse: collapse; margin: 0 auto;" class="mce-item-table ft-7">
                <tbody>
                    <tr style="border: 1px solid black; border-collapse: collapse;" data-mce-style="border: 1px solid black; border-collapse: collapse;">
                        <th colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">Предмет закупки</th>
                    </tr>
                    <tr style="border: 1px solid black; border-collapse: collapse;" data-mce-style="border: 1px solid black; border-collapse: collapse;">
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">номер лота</th>
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">наименование</th>
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">единица измерения</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">количество</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">сметная цена</th>
                        <th rowspan="2" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">краткое описание (техническая характеристика)</th>
                        <th rowspan="2" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">краткое описание (техническая характеристика), предусмотренное по договору</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">по имеющимся финансовым средствам</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">общее</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">по имеющимся финансовым средствам</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">общая</th>
                    </tr>
                    <tr v-for="(lot) in currentOrganized.organize_rows" :key="lot.name">
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.view_id }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.cpv.name_ru }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.cpv.unit_ru }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.count}}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.count }}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.details[0].unit_amount * lot.count}}</th>
                        <th style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.details[0].unit_amount * lot.count }}</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">{{ lot.procurement_plan.specifications.description.ru }}</th>
                        <th colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">
                            <span v-if="lot.won_lot_id === null">Несостоявшийся</span>
                            <span v-else>{{ lot.procurement_plan.specifications.description.ru }}</span>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                   <tr>
                        <td colspan="5" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Примененная процедура закупки и обоснование ее выбора</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-if="checkType === 1">Закупка у одного лица, пункт 4 часть 1 статья 23 «Закон о закупках» РА</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 2">Закупка у одного лица, пункт 1 часть 1 статья 23 «Закон о закупках» РА</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 3">Закупка у одного лица, обусловленная безотлагательностью, пункт 2 часть 1 статья 23 «Закон о закупках» РА</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 6">Запрос котировок, статья 22 «Закон о закупках» РА</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 4">Открытый конкурс, статья 20 «Закон о закупках» РА</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" v-else-if="checkType === 5">Открытый конкурс, обусловленная безотлагательностью, статья 20 «Закон о закупках» РА</td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Дата направления или опубликования приглашения</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                     <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td rowspan="2" colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Дата изменений, внесенных в приглашение</td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">1</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">...</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td rowspan="3" colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Дата разъяснений относительно приглашения</td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Получения запроса</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Разъяснения</td>
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
                        <td rowspan="3" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">П/Н</td>
                        <td rowspan="3" colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Наименования участников</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Цена, представленная по заявке каждого участника, включая цену, представленную в результате организации одновременных переговоров</td>
                    </tr> 
                    <tr>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"> Драмов РА</td>
                    </tr>
                    <tr>
                        <td colspan="2" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Цена без НДС</td>
                        <td colspan="2" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">НДС</td>
                        <td colspan="2" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Всего</td>
                    </tr>
                    <tr style="border-collapse: collapse;" data-mce-style="border: 1px solid white; border-collapse: collapse;"></tr>
                    <template v-for="(organizedRow, organizedIndex) in organizedRowsList">
                        <tr :key="organizedRow.toString() + organizedIndex + Math.random()">
                            <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Лот {{ organizedRow.view_id }}</td>
                            <td colspan="9" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ organizedRow.procurementPlan.cpv_outside ? organizedRow.procurementPlan.cpv_outside.name_ru : organizedRow.procurementPlan.cpv.name_ru }} - {{ organizedRow.cpv_code }}{{ organizedRow.cpv_drop && '/' }}{{ organizedRow.cpv_drop }}</td>
                        </tr>
                        <template v-for="(participant, participantIndex) in organizedRow.participantsList">
                            <tr :key="participant.toString() + participantIndex + Math.random()">
                                <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participantIndex+1 }}</td>
                                <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ participant.name.ru }}</td>

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
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Данные об отклоненных заявках</td>
                    </tr>
                    <tr>
                        <td rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Номер лота</td>
                        <td rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Наименование участника</td>
                        <td colspan="9" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Результаты оценки (удовлетворительно или неудовлетворительно)</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Наличие требуемых по приглашению документов</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Соответствие представленных по заявке документов требованиям установленным приглашением</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Соответствие технических характеристик предлагаемого предмета закупки требованиям, установленным приглашением</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 10px; text-align: center;">Ценовое предложение</td>
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
                        <td colspan="3" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Иные сведения</td>
                        <td colspan="8" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Примечание: Иные основания для отклонения заявок.</td>
                    </tr>
                    <tr>
                        <td colspan="8" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="5" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Дата определения отобранного участника</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="5" rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Период ожидания</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Начало периода ожидания</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Окончание периода ожидания</td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Дата извещения отобранного участника о предложении относительно заключения договора</td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="5" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Дата поступления у заказчика договора, подписанного  отобранным участником</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                    <tr style="background: #e4e4e4;" data-mce-style="background: #e4e4e4;">
                        <td colspan="5" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;">Дата подписания договора заказчиком</td>
                        <td colspan="6" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: left;"></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td rowspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Номер лота</td>
                        <td rowspan="3" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Отобранный участник</td>
                        <td colspan="8" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Договор</td>
                    </tr>
                    <tr>
                        <td rowspan="2" colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Номер договора</td>
                        <td rowspan="2" colspan="2" style="background: #e4e4e4; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #e4e4e4; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Дата заключения</td>
                        <td rowspan="2" style="background: #e4e4e4; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #e4e4e4; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Крайний срок исполнения</td>
                        <td rowspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Размер предоплаты</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Цена <br> Драмов РА</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">По имеющимся финансовым средствам</td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Общая</td>
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
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.name_ru }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ currentOrganized.code_ru }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            <template v-if="!currentOrganized.winner_by_lots">
                                <span>
                                    {{ currentOrganized.winner_user_price }}
                                </span>
                            </template>
                            <template v-else>
                                <span v-if="Number.isInteger(getWonLotsPrice(winner.won_lots, winner.id))">
                                    {{ getWonLotsPrice(winner.won_lots, winner.id) }}
                                </span>
                                <span v-else>
                                    {{ getWonLotsPrice(winner.won_lots, winner.id).toFixed(2) }}
                                </span>
                            </template>
                        </td>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                            <template v-if="!currentOrganized.winner_by_lots">
                                <span>
                                    {{currentOrganized.winner_user_price}}
                                </span>
                            </template>
                            <template v-else>
                                <span v-if="Number.isInteger(getWonLotsPrice(winner.won_lots, winner.id))">
                                    {{ getWonLotsPrice(winner.won_lots, winner.id) }}
                                </span>
                                <span v-else>
                                    {{ getWonLotsPrice(winner.won_lots, winner.id).toFixed(2) }}
                                </span>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Наименование и адрес отобранного участника (отобранных участников)</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Номер лота</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Отобранный участник</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Адрес, тел.</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Эл. почта</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Банковский счет</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">УНН / Номер и серия паспорта</td>
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
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.name_ru }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Адрес: {{ winner.address_ru }}, <br> номер счета: {{ winner.phone}}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.email }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.bank_account }}</td>
                        <td colspan="2" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ winner.tin }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Иные сведения</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">
                                Примечание: В случае, если какой-либо из лотов не состоялся, заказчик обязан заполнить сведения об этом.
                                <template v-if="lots.length">
                                    <br/>
                                    <span :key="row.id" v-for="(row, rowIndex) in lots">{{row.view_id}}<span v-if="rowIndex !== organizedRowsList.filter(item => item.winner_participant_id === 0 && item.winner_user_id === 0).length - 1">,</span></span><template v-if="organizedRowsList.filter(item => item.winner_participant_id === 0 && item.winner_user_id === 0).length === 1"><span v-if="lot.view_id !== 2 && lot.view_id !== 3">-ый</span><span v-else-if="lot.view_id === 2">-ой</span><span v-else-if="lot.view_id === 3">-ий</span> лот был объявлен несостоявшым</template><template v-else> лоты были объявлены несостоявшимися</template>
                                </template>
                                <!-- <div style="margin-top: 10px">
                                    <p v-for="(lot, lotIndex) in lots" :key="lotIndex">
                                        <span v-if="lot.view_id !== 2 && lot.view_id !== 3">{{lot.view_id}}-ый</span>
                                        <span v-else-if="lot.view_id === 2">{{lot.view_id}}-ой</span>
                                        <span v-else-if="lot.view_id === 3">{{lot.view_id}}-ий</span>
                                        лот был объявлен несостоявшым</p>
                                </div> -->
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px;">
                            <p style="text-align: justify; margin-bottom: 5px; font-family: GHEA grapalat ;">Как участники, подавшие заявку по данному лоту настоящей процедуры, так и общественные организации, получившие государственную регистрацию в Республике Армения, и лица, осуществляющие информационную деятельность, могут представить организатору процедуры письменное требование о совместном участии с ответственным подразделением  в процессе принятия результата данного лота заключенного договора, в течение __________________  календарных дней после опубликования настоящего объявления.</p>
                            <p style="text-align: left; margin-bottom: 5px; font-family: GHEA grapalat ;">К письменному требованию прилагается:</p>
                            <p style="text-align: left; margin-bottom: 5px; font-family: GHEA grapalat ;">1) оригинал доверенности, выданный физическому лицу. При этом </p>
                            <p style="text-align: left; margin-bottom: 5px; font-family: GHEA grapalat ;">а. количество уполномоченных физических лиц не может превысить двух,</p>
                            <p style="text-align: left; margin-bottom: 5px; font-family: GHEA grapalat ;">б. уполномоченное физическое лицо должно лично выполнять действия, на которые уполномочено;</p>
                            <p style="text-align: justify; margin-bottom: 5px; font-family: GHEA grapalat ;">2) оригиналы подписанных объявлений  лиц представивших требование об участии в процессе, а также  уполномоченных  физических лиц об отсутствии конфликта интересов, предусмотренных частью 2 статьи 5.1 Закона РА «О закупках»;</p>
                            <p style="text-align: justify; margin-bottom: 5px; font-family: GHEA grapalat ;">3) адреса электронной почты и телефонные номера, посредством которых заказчик может связаться с лицом, представившим требование  и уполномоченным им физическим лицом;</p>
                            <p style="text-align: justify; margin-bottom: 5px; font-family: GHEA grapalat ;">4) копия свидетельства о государственной регистрации- в случае общественных организаций и лиц, осуществляющих информационную деятельность, получивших государственную регистрацию в Республике Армения; Официальный адрес электронной почты руководителя ответственного подразделения заказчика_______________________________.</p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Сведения о публикациях, осуществленных согласно Закону Республики Армения "О закупках" с целью привлечения участников </td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">В случае выявления противозаконных действий в рамках процесса закупки — их краткое описание, а также краткое описание предпринятых в связи с этим действий</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Жалобы, поданные относительно процесса закупки, и принятые по ним решения</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Другие необходимые сведения</td>
                        <td colspan="7" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="background: #5bb4f3; border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;"><br></td>
                    </tr>
                    <tr>
                        <td colspan="11" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Для получения дополнительной информации, связанной с настоящим объявлением, можно обратиться к координатору закупок</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Имя, Фамилия</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Телефон</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">Адрес эл. почты</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ getSubordinateUser().name || me.name_ru }}</td>
                        <td colspan="3" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ getSubordinateUser().phone || me.phone }}</td>
                        <td colspan="4" style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;" data-mce-style="border: 1px solid black; border-collapse: collapse; font-size: 11px; text-align: center;">{{ getSubordinateUser().email || me.email }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <p  style="text-align: justify">
                Заказчик: «{{ me.organisation[0].translations.name.ru }}» {{ me.organisation[0].translations.company_type.ru }}
            </p>
            <div  style="font-style: italic; margin-top: 80px">
                <ol >
                    <li >__________________________________</li>
                    <li style="text-align: justify;">- Срок, установленный настоящим регулированием, не может быть меньше 3 календарных дней.</li>
                </ol>
            </div>
        </section>
    </div>
</template>


<script>
export default {
    name: 'announce_signed_contract_ru',
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
