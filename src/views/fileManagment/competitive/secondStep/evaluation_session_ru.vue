<template>
    <div
        id="commandment-file"
        ref="contract"
        class="w-100"
        style="line-height: 2; font-size: 15px;">
        <div v-if="Boolean(Object.keys(currentOrganized).length)">
            <div style="text-align: center;">ПРОТОКОЛ N___</div>
            <div style="text-align: center">Заседание оценочной комиссии по вскрытию и оценке заявок по процедуре закупок под кодом
                <br/>
                «{{ currentOrganized.translations.code.ru }}»
            </div>
            <br>
            <table style="border: 0 !important; width: 100%;">
                <tr>
                    <td class="text-left ft-11" style="text-align: left;border: 0 !important;font-size: 11pt;">
                        г. <span v-if="me.organisation[0].translations.region.ru === me.organisation[0].translations.city.ru">{{me.organisation[0].translations.city.ru}}</span> <span v-else>{{me.organisation[0].translations.city.ru}} {{me.organisation[0].translations.region.ru}}</span> {{ me.organisation[0].translations.address.ru }} 
                    </td>
                    <td class="text-right ft-11" style="text-align: right;border: 0 !important;font-size: 11pt;">
                       «___»«___» 2021г.
                    </td>
                </tr>
                <tr>
                    <td style="border: 0 !important;"></td>
                    <td class="text-right ft-11" style="text-align: right;border: 0 !important;font-size: 11pt;">
                        ____ часов
                    </td>
                </tr>
            </table>
            <br>
            <table style="border: 0 !important; width: 100%;">
                <tr>
                  <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Участвовали:</td>
                  <td style="border: 0 !important;"></td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Председатель комиссии:</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                    {{currentOrganized.translations.evaluator_president.name.ru}}` {{currentOrganized.translations.evaluator_president.position.ru}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Секретарь комиссии:</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                    {{currentOrganized.translations.evaluator_secretary_name.ru}}` {{currentOrganized.translations.evaluator_secretary_position.ru}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Члены комиссии:
                    <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
                  </td>
                  <td style="border: 0 !important; text-align: left !important;">
                    <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.ru }}` {{ member.position.ru }}</div>
                  </td>
                </tr>
            </table> 
            <br>
            <br>
            <div style="text-align: center;">1. О вскрытии заявок</div>
            <div style="text-align: center;">({{ currentOrganized.translations.evaluator_president.name.ru }})</div>
            <br>
            <div class="info-block">
                <div style="text-align: justify; line-height: 24px;font-size: 15px;">
                    <b class="b-number">1.1.</b>
                    В сроки, установленные Приглашением к торгам, заявка на участие была представлена со стороны следующего Участника:
                </div>
                <br>
                <div class="info-block">
                    <table  style="word-break: break-word; 
                                   width: 100%;
                                   table-layout: fixed;
                                   border-collapse: collapse;
                                   page-break-inside: avoid;
                                   border: 1px solid black;
                                   text-align: center;" cellspacing="8" cellpadding="8">
                        <thead>
                            <tr class="full-row">
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">N п/п</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Наименование либо фамилия, имя, отчество</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">ИНН или НКСС</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Адрес</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Номер телефона</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Номер электронной почты</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Дата подачи заявки</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(participantItem, participantIndex) in participants">
                                <tr class="full-row" :key="participantIndex.toString() + participantIndex + Math.random()">
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{participantItem.participant[0].name.ru}}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participantItem.participant[0].tin }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{participantItem.participant[0].address.ru}}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{participantItem.participant[0].phone}}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{participantItem.participant[0].email}}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{participantItem.participant[0].date_of_submission}}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <div class="info-block">
                <div style="text-align: justify; line-height: 24px;font-size: 15px;">
                    <b class="b-number">1.2.</b>
                    Участником было представлено следующее ценовое предложение:
                </div>
                <br>
                <table style="word-break: break-word; 
                              width: 100%;
                              table-layout: fixed;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="8" cellpadding="8">
                    <thead>
                        <tr class="full-row">
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">N п/п</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">Наименование Участник</th>
                            <th colspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">Ценовое предложение Участника</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">Сметная стоимость предмета закупки</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Стоимость</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">НДС</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Итого</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(organizedRow, organizedIndex) in organizedRowsFromStore">
                            <tr class="full-row" :key="organizedRow.toString() + organizedIndex + Math.random()">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;" colspan="6">
                                    Лот {{ organizedRow.view_id }}՝
                                    {{organizedRow.is_from_outside ? organizedRow.procurementPlan.cpv_outside.code : organizedRow.procurementPlan.cpv.code}}
                                    -
                                    {{organizedRow.is_from_outside ? organizedRow.procurementPlan.cpv_outside.name_ru : organizedRow.procurementPlan.cpv.name_ru}}
                                </td>
                            </tr>
                            <template v-if="organizedRow.participantsList.length">
                                <template v-for="(participant, participantIndex) in organizedRow.participantsList">
                                    <tr class="full-row"
                                        :key="participant.toString() + participantIndex + Math.random()">
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ participant.name.ru }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ participant.current_price }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ participant.current_vat }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{participant.current_price_vat}}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{participant.estimated_price}}</td>
                                    </tr>
                                </template>
                            </template>
                            <template v-else>
                                <tr :key="organizedRow.toString() + organizedIndex + Math.random()" class="full-row">
                                    <td colspan="6" style="border: 1px solid black; border-collapse: collapse;">
                                        Не подано ни одной заявки
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
            <br>
            <div>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number">1.3.</b> До истечения срока,
                    установленного для внесения изменений в Приглашение, секретарю Оценочной комиссии по электронной почте обоснования установленных Приглашением характеристик предмета закупки - с точки зрения предусмотренного законом обеспечения конкуренции и исключения предвзятости - представлены не были.
                </div>
                <div class="color" style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number">1.3.</b> До истечения срока, установленного для внесения изменений в Приглашение,
                    секретарю Оценочной комиссии по электронной почте
                    <b>в прилагаемой сводной ведомости</b>
                    были представлены обоснования установленных Приглашением характеристик предмета закупки - с точки зрения предусмотренного законом обеспечения конкуренции и исключения предвзятости.
                </div>
            </div>
            <div>
                <div style="font-size: 15px;">
                    <b class="b-number">1.4.</b> Вопросов и пояснений по части
                    Заявки не было
                </div>
                <div class="color" style="font-size: 15px;">
                    <b class="b-number">1.4.</b> По части Заявки были следующие
                    вопросы и пояснения:
                </div>
            </div>
            <br>
            <div class="info-block">
                <div style="text-align: center;">2. Об оценке Заявок</div>
                <div style="text-align: center;">
                    ({{ currentOrganized.translations.evaluator_president.name.ru }})
                </div>
                <br>
                <div>
                    <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                        <b class="b-number">2.1.</b> Заказчиком и (или) Оценочной комиссией решений о проверке посредством комитета по государственным доходам РА подлинности заверений, представленных Участником(ами)на предмет соответствия Участника (ов) пункту 2 части 1 статьи Закона, не принималось.
                    </div>
                    <div class="color"
                        style="text-align: justify;line-height: 24px;font-size: 15px;">
                        <b class="b-number">2.1.</b>
                        <b class="b-number color"> Решение (Номер 1) -</b>
                        Учитывая,
                        и основываясь на пункте 67 Порядка (Процедуры),
                        Оценочная комиссия решила приостановить заседание по
                        вскрытию и оценке заявок______________с целью проверки
                        посредством Комитета государственных доходов РА
                        подлинности заверений, представленных ООО "_________" о
                        соответствии п. 2 ч. 1 ст. 6 Закона,
                    </div>
                </div>
            </div>
            <div style="font-weight: 700;font-style: italic;">
                Решение принято: “За” - {{ totalMembers }}, “Против” - 0
            </div>
            <div>
                <div style="text-align: justify;line-height: 24px; font-size: 15px;">
                    <b class="b-number">2.2.</b>
                    <b class="b-number color">Решение (Номер 2)</b>
                    Учитывая то обстоятельство, что в связи с объемом работы
                    невозможно завершить оценку заявок в течение текущего
                    рабочего дня, с целью оценки заявок Оценочная комиссия
                    решила приостановить заседание по вскрытию и оценке заявок.
                </div>
                <div class="color" style="text-align: justify;line-height: 24px; font-size: 15px;">
                    <b class="b-number">2.2.</b>
                    <b class="b-number color">
                        Решение (Номер 2):
                    </b>
                    Учитывая то обстоятельство, что рабочий день закончен, с
                    целью оценки заявок Оценочная комиссия решила приостановить
                    заседание по вскрытию и оценке заявок.
                </div>
            </div>
            <div style="font-weight: 700;font-style: italic;">
                Решение принято: “За” - {{ totalMembers }}, “Против” - 0
            </div>
            <div v-if="currentOrganized.is_correction"> {{consoleLog(currentOrganized.is_correction)}}
                <div>
                    <div style="line-height: 24px; font-size: 15px;">
                        <b class="b-number">2.3. </b>
                        В процессе оценки Заявок были выявлены следующие
                        несоответствия:
                    </div>
                    <br>
                    <div>
                        <table style="word-break: break-word; 
                                      width: 100%;
                                      table-layout: fixed;
                                      border-collapse: collapse;
                                      page-break-inside: avoid;
                                      border: 1px solid black;
                                      text-align: center;" cellspacing="8" cellpadding="8">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid black;
                                            border-collapse: collapse;">N п/п</th>
                                    <th style="border: 1px solid black;
                                            border-collapse: collapse;">Наименование Участника</th>
                                    <th style="border: 1px solid black;
                                            border-collapse: collapse;">Подробное описание несоответствия</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="incorrectParticipants.length">
                                    <template v-for="(participantItem, participantIndex) in incorrectParticipants">
                                        <tr :key="participantIndex.toString() + participantIndex + Math.random()">
                                            <td style="border: 1px solid black;
                                                    border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                            <td style="border: 1px solid black;
                                                    border-collapse: collapse;">{{ participantItem.participant[0].name.ru }}</td>
                                            <td style="border: 1px solid black;
                                                    border-collapse: collapse;"
                                                v-if="participantItem.lots.filter((item) =>!item.is_satisfactory).length > 0">
                                                <span :key="participantIndex.toString() + lotIndex + Math.random()"
                                                    v-for="(lot, lotIndex) in participantItem.lots.filter((item) => !item.is_satisfactory)">{{organizedRowsFromStore.find(item => item.id === lot.organize_row_id).view_id}}<span v-if="lotIndex !== participantItem.lots.filter((item) =>!item.is_satisfactory).length-1">,</span>
                                                </span>
                                                - Несоответствие ценового предложения
                                            </td>
                                            <td style="border: 1px solid black;
                                                    border-collapse: collapse;"
                                            v-else>
                                                Ценовое предложение не было подано
                                            </td>
                                        </tr>
                                    </template>
                                </template>
                                <template v-else>
                                    <tr class="full-row">
                                        <td colspan="3" style="border: 1px solid black;
                                                            border-collapse: collapse;">Нету</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
                <div>
                    <div style="text-align: justify;line-height: 24px; font-size: 15px;">
                        <b class="b-number">2.4.</b>
                        <b class="b-number color"> Решение (Номер 3) -</b>
                        С целью предоставления Участнику возможности исправить
                        выявленные несоответствия, Оценочная комиссия решила
                        отложить заседание по вскрытию и оценке заявок на 1 (один)
                        рабочий день и уведомить об этом Участника в течение того же
                        рабочего дня.
                    </div>
                </div>
                <div style="text-align: justify; line-height: 24px; font-size: 15px;">Комиссия приняла решение отклонить представленные лоты за несоответствие ценовому предложению</div>
                <div style="font-weight: 700;font-style: italic;">
                    Решение принято: “За” - {{ totalMembers }}, “Против” - 0
                </div>
                <div>
                    <div style="text-align: justify;line-height: 24px; font-size: 15px;">
                        <b class="b-number">2.5. </b>
                        <b class="b-number color">
                            Решение (Номер 4) -
                        </b>
                        Оценочная комиссия приняла решение продолжить заседание по
                        вскрытию и оценке Заявок _____.____.______г. в _______часов
                        по адресу: _________
                    </div>
                </div>
                <div style="font-weight: 700;font-style: italic;font-size: 15px;">
                    Решение принято: “За” - {{ totalMembers }}, “Против” - 0
                </div>
                <div>
                    <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                        <b class="b-number">2.6. </b>
                        Заседание по вскрытию о оценке Заявок продолжилось
                        _____.____.______г. в ________часов по адресу: ____________
                        , с участием следующих лиц:
                    </div>
                    <br>
                <table style="border: 0 !important; width: 100%;">
                    <tr>
                    <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Участвовали:</td>
                    <td style="border: 0 !important;"></td>
                    </tr>
                    <tr>
                    <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Председатель комиссии:</td>
                    <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_president.name.ru}}` {{currentOrganized.translations.evaluator_president.position.ru}}
                    </td>
                    </tr>
                    <tr>
                    <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Секретарь комиссии:</td>
                    <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_secretary_name.ru}}` {{currentOrganized.translations.evaluator_secretary_position.ru}}
                    </td>
                    </tr>
                    <tr>
                    <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Члены комиссии:
                        <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
                    </td>
                    <td style="border: 0 !important; text-align: left !important;">
                        <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.ru }}` {{ member.position.ru }}</div>
                    </td>
                    </tr>
                </table> 
                </div>
                <br>
                <div>
                    <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                        <b class="b-number">2.7.</b>
                        В установленные сроки соответствующие исправления и
                        коррекции были либо не были представлены следующими
                        Участниками:
                    </div>
                    <br>
                    <div>
                        <table style="word-break: break-word; 
                                      width: 100%;
                                      table-layout: fixed;
                                      border-collapse: collapse;
                                      page-break-inside: avoid;
                                      border: 1px solid black;
                                      text-align: center;" cellspacing="8" cellpadding="8">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid black;
                                            border-collapse: collapse;">N п/п</th>
                                    <th style="border: 1px solid black;
                                            border-collapse: collapse;">Наименование Участника</th>
                                    <th style="border: 1px solid black;
                                            border-collapse: collapse;">Исправление</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="incorrectParticipants.length">
                                    <template v-for="(participantItem, participantIndex) in incorrectParticipants">
                                        <tr :key="participantIndex.toString() + participantIndex + Math.random()">
                                            <td style="border: 1px solid black;
                                                    border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                            <td style="border: 1px solid black;
                                                    border-collapse: collapse;">{{participantItem.participant[0].name.ru}}</td>
                                            <td style="border: 1px solid black;
                                                    border-collapse: collapse;"></td>
                                        </tr>
                                    </template>
                                </template>
                                <template v-else>
                                    <tr class="full-row">
                                        <td colspan="3" style="border: 1px solid black;
                                                            border-collapse: collapse;">Нету</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <br>
            <div style="line-height: 24px;font-size: 15px;">
                <b class="b-number">2.8.</b>
                Представленные Участниками документы были предоставлены
                членам Оценочной комиссии.
            </div>
            <div>
                <div style="line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.9.</b>
                    Подведенные итоги оценки Заявки/Заявок, представленных
                    Участником/ами, представлены ниже:
                </div>
                <br>
                <table style="word-break: break-word; 
                              width: 100%;
                              table-layout: fixed;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="8" cellpadding="8">
                    <tbody class="info-block">
                        <tr>
                            <th rowspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">N п/п</th>
                            <th rowspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">Наименование Участника</th>
                            <th rowspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">Лот</th>
                            <th colspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">Критерии оценки заявок участников<br />Оценка</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Соответствие составления и подачи конвертов, содержащих заявки, установленному порядку
                            </th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Наличие необходимых (предусмотренных) документов в каждом вскрытом конверте соответствует их реквизитам, определенным требованиями в приглашении</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">ОБЩАЯ ОЦЕНКА</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">удовлетворительно<br />неудовлетворительно</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">удовлетворительно<br />неудовлетворительно</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">удовлетворительно<br />неудовлетворительно</th>
                        </tr>
                    </tbody>
                    <template v-for="(participantItem, participantIndex) in participants">
                        <tbody :key=" participantIndex.toString() + participantIndex + Math.random()" class="info-block">
                            <template v-if="participantItem.lots.length > 0">
                                <tr>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;"
                                        :rowspan="participantItem.lots.filter((item) => !item.is_satisfactory).length + 1">
                                        {{ participantIndex + 1 }}
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;"
                                        :rowspan="participantItem.lots.filter((item) => !item.is_satisfactory).length + 1">
                                        {{participantItem.participant[0].name.ru}}
                                    </td>
                                    <template v-if="Boolean(participantItem.lots.find((item) =>item.is_satisfactory !== 0 ))">
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">
                                            <span :key="participantIndex.toString() + lotIndex + Math.random()"
                                                   v-for="(lot, lotIndex) in participantItem.lots.filter((item) => item.is_satisfactory)">
                                                   {{organizedRowsFromStore.find((item) => item.id === lot.organize_row_id) ? organizedRowsFromStore.find((item) => item.id === lot.organize_row_id).view_id : ''}}<span
                                                    v-if="lotIndex !== participantItem.lots.filter((item) => item.is_satisfactory).length - 1">,</span>
                                            </span>
                                        </td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">удовлетворительно</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">удовлетворительно</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">удовлетворительно</td>
                                    </template>
                                </tr>
                                <tr v-for="(lot, lotIndex) in participantItem.lots.filter((item) => !item.is_satisfactory)"
                                    :key="participantIndex.toString() + lotIndex">
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        <span>{{organizedRowsFromStore.find((item) => item.id === lot.organize_row_id) ? organizedRowsFromStore.find((item) => item.id === lot.organize_row_id).view_id : ''}}</span>
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        <span>{{organizedRowsFromStore.find((item) => item.id === lot.organize_row_id).view_id}}</span>
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">удовлетворительно</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;" v-if="lot.is_satisfactory !== 0">удовлетворительно</td>
                                    <td v-else style="border: 1px solid black;
                                               border-collapse: collapse;" >неудовлетворительно</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr :key="participantIndex.toString() + Math.random()"
                                    v-if="participantItem.participant[0]">
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{participantItem.participant[0].name.ru}}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">-</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;"
                                        v-if="participantItem.participant[0].is_docs_satisfactory">удовлетворительно</td>
                                    <td v-else>неудовлетворительно</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;"
                                        v-if="participantItem.participant[0].price_offer_exists">удовлетворительно</td>
                                    <td v-else>неудовлетворительно</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">неудовлетворительно</td>
                                </tr>
                                <tr :key="participantIndex.toString() + Math.random()"
                                    v-else>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">-</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">-</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">неудовлетворительно</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">неудовлетворительно</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">неудовлетворительно</td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                </table>
            </div>
            <template v-if="currentOrganized.is_negotiations">
            <div class="html2pdf__page-break" />
            <br>
            <div v-if="currentOrganized.locale_negotiations">
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.10.</b>
                    <b class="b-number color">
                        Решение (Номер 5) -
                    </b>
                    Оценочная комиссия приняла решение вести с Участниками,
                    соответствующими условиям, не основанным на цене
                    единовременные переговоры с целью снижения предложенных цен
                    - с учетом того, что на заседании присутствовали все
                    Участники (либо представители последних, имеющие
                    соответствующие полномочия).
                </div>
                <div style="line-height: 24px;font-size: 15px;">Основание и длительность переговоров – согласно нижеприведенной таблице:</div>
                <br>
                <div class="info-block">
                    <table style="word-break: break-word; 
                                  width: 100%;
                                  table-layout: fixed;
                                  border-collapse: collapse;
                                  page-break-inside: avoid;
                                  border: 1px solid black;
                                  text-align: center;" cellspacing="8" cellpadding="8">
                        <thead>
                            <tr class="full-row">
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">N п/п</th>
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">Наименование либо фамилия, имя, отчество Участника</th>
                                <th colspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">Переговоры</th>
                            </tr>
                            <tr class="full-row">
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Основание</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Длительность по части каждого лота</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(organizedRow, organizedRowIndex) in organizedLots">
                                <tr class="full-row" :key="organizedRow.toString() + organizedRowIndex + Math.random()">
                                    <template v-if="organizedRow.participantsList.length"> 
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">
                                            {{ organizedRow.view_id }}
                                        </td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">
                                            <span :key="participant.toString() + participantIndex + Math.random()"
                                                    v-for="(participant, participantIndex) in organizedRow.participantsList">
                                                    {{ participant.name.ru}}<span
                                                    v-if="participantIndex !== organizedRow.participantsList.length - 1">,</span>
                                            </span>
                                        </td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">
                                            {{ getNegotiationStatus(organizedRow) }}
                                        </td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;"></td>
                                    </template>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <div style="font-weight: 700;font-style: italic;font-size: 15px;">Решение принято: “За” - {{ totalMembers }}, “Против” - 0</div>
            <div>
                <div>
                    <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                        <b class="b-number">2.11.</b>
                        Наименования Участников и предложенные по результатам переговоров новые цены – следующие:
                    </div>
                </div>
                <br>
                <table style="word-break: break-word; 
                              width: 100%;
                              table-layout: fixed;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="8" cellpadding="8">
                    <tbody class="info-block">
                        <tr>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">Занятое место</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">Наименование Участника</th>
                            <th colspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">Начальное ценовое предложение<br />(драм)</th>
                            <th colspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">Минимальная цена, образовавшаяся по результатам переговоров<br />(драм)</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Стоимость</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">НДС</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Итого</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Стоимость</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">НДС</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Итого</th>
                        </tr>
                    </tbody>
                    <template v-for="organizedRow in organizedLots">
                        <tbody :key="organizedRow.toString() + Math.random()" class="info-block">
                            <tr :key="organizedRow.toString() + organizedIndex + Math.random()">
                                <td colspan="8" style="border: 1px solid black; border-collapse: collapse;">
                                    Лот  {{ organizedRow.view_id }}՝ 
                                    {{organizedRow.is_from_outside ? organizedRow.procurementPlan.cpv_outside.code : organizedRow.procurementPlan.cpv.code}}
                                    -
                                    {{organizedRow.is_from_outside ? organizedRow.procurementPlan.cpv_outside.name_ru : organizedRow.procurementPlan.cpv.name_ru}}
                                </td>
                            </tr>
                            <template v-for="(participant, participantIndex) in organizedRow.participantsList">
                                <tr :key="participant.toString() + participantIndex + Math.random()">
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">
                                        {{participantIndex + 1}}
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        {{ participant.name.ru }}
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participant.price }}
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participant.vat }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{participant.cost}}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{participant.new_price !== 0 ? participant.new_price + '' : 0 }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        {{participant.new_price !== 0 && participant.vat !== 0 ? roundTwoDigits(participant.new_price * (20 / 100)) + '' : 0}}
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        {{participant.vat !== 0 && participant.new_price !== 0 ? roundTwoDigits(participant.new_price + participant.new_price * (20 / 100)) + '' : 0}}
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                </table>
            </div>
            <br>
            <div>
                <div style="line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.11.</b>
                    В ходе переговоров новых ценовых предложений Участниками представлено не было.
                </div>
            </div>
            <div v-if="!currentOrganized.locale_negotiations">
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.10.</b>
                    <b class="b-number color"> Решение (Номер 5) -</b>
                    Оценочная комиссия решила провести с Участниками, соответствующими условиям, не основанным на цене, единовременные переговоры с целью снижения предложенных цен. Учитывая то обстоятельство,что на заседании присутствовали не все Участники (либо представители последних, имеющие соответствующие полномочия), Оценочная комиссия решила приостановить заседание по вскрытию и оценке заявок с целью проведения единовременных переговоров,и уведомить об этом Участников.
                </div>
                <br>
                <div>
                    <table style="word-break: break-word; 
                                  width: 100%;
                                  table-layout: fixed;
                                  border-collapse: collapse;
                                  page-break-inside: avoid;
                                  border: 1px solid black;
                                  text-align: center;" cellspacing="8" cellpadding="8">
                        <thead>
                            <tr class="full-row">
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;" rowspan="2">Н/л</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;" rowspan="2">Наименование либо фамилия, имя, отчество Участника</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;" colspan="2">Переговоры</th>
                            </tr>
                            <tr>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Основание
                                </th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Длительность по части каждого лота</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(organizedRow, organizedRowIndex) in organizedLots">
                                <tr :key="organizedRow.toString() + organizedRowIndex + Math.random()">
                                    <template v-if="organizedRow.participantsList.length">
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ organizedRow.view_id }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">
                                            <span :key="participant.toString() + participantIndex + Math.random()"
                                                v-for="(participant, participantIndex) in organizedRow.participantsList">
                                                {{ participant.name.ru}}
                                                <span v-if="participantIndex !== organizedRow.participants.length -1">,</span>
                                            </span>
                                        </td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ getNegotiationStatus(organizedRow) }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;"></td>
                                    </template>    
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <div>
                <div style="font-weight: 700;font-style: italic;font-size: 15px;">
                    Решение принято: “За” - {{ totalMembers }}, “Против” - 0
                </div>
            </div>
            <div>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.12.</b>
                    <b class="b-number color"> Решение (Номер 6) -</b>
                    С целью проведения единовременных переговоров с Участниками, признанными удовлетворяющими условиям, не основанным на цене, Оценочная комиссия решила продолжить заседание по вскрытию и оценке заявок ______.___.____г в ____ часов, по адресу:________.
                </div>
            </div>
            <div>
                <div style="font-weight: 700;font-style: italic;font-size: 15px;">
                    Решение принято: “За” - {{ totalMembers }}, “Против” - 0
                </div>
            </div>
            <div>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.13.</b> Заседание по вскрытию о оценке Заявок продолжилось_____.____.______г. в ________часов по адресу: ____________, с участием следующих лиц:
                </div>
            </div>
            <br>
            <div>
                <table style="border: 0 !important; width: 100%;">
                    <tr>
                      <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Участвовали:</td>
                      <td style="border: 0 !important;"></td>
                    </tr>
                    <tr>
                      <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Председатель комиссии:</td>
                      <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_president.name.ru}}` {{currentOrganized.translations.evaluator_president.position.ru}}
                      </td>
                    </tr>
                    <tr>
                      <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Секретарь комиссии:</td>
                      <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_secretary_name.ru}}` {{currentOrganized.translations.evaluator_secretary_position.ru}}
                      </td>
                    </tr>
                    <tr>
                      <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Члены комиссии:
                        <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
                      </td>
                      <td style="border: 0 !important; text-align: left !important;">
                        <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.ru }}` {{ member.position.ru }}</div>
                      </td>
                    </tr>
                </table> 
            </div>
            <br>
            <div>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.14.</b>
                    Наименования участников (либо представителей последних,
                    имеющих соответствующие полномочия), явившихся на переговоры
                    в установленные сроки, а также новые цены, предложенные по
                    результатам переговоров, следующие:
                </div>
                <br>
                <div class="info-block">
                    <table style="word-break: break-word; 
                                  width: 100%;
                                  table-layout: fixed;
                                  border-collapse: collapse;
                                  page-break-inside: avoid;
                                  border: 1px solid black;
                                  text-align: center;" cellspacing="8" cellpadding="8">
                        <thead class="info-block">
                            <tr class="full-row">
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;" rowspan="2">Номер лота</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;" rowspan="2">Наименование Участника</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;" colspan="3">Начальное ценовое предложение<br />(драм)</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;" colspan="3">Минимальная цена, образовавшаяся порезультатам переговоров<br />(драм)</th>
                            </tr>
                            <tr>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Стоимость</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">НДС</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Итого</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Стоимость</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">НДС</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Итого</th>
                            </tr>
                        </thead>
                        <template v-for="(organizedRow, organizedIndex) in organizedLots">
                            <tbody :key="organizedRow.toString() + organizedIndex + Math.random()" class="info-block">
                                <template v-for="(participant, participantIndex) in organizedRow.participantsList">
                                    <tr class="full-row" :key="participant.toString() +participantIndex +Math.random()">
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;" v-if="participantIndex === 0" :rowspan="organizedRow.participantsList.length">
                                            {{ organizedRow.view_id }}
                                        </td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ participant.name.ru }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ participant.price }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ participant.vat }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{ participant.cost }}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">{{participant.new_price !== 0 ? participant.new_price + '' : 0}}</td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">
                                            {{participant.new_price !== 0 && participant.vat !== 0 ? roundTwoDigits(participant.new_price * (20 / 100)) + '': 0}}
                                        </td>
                                        <td style="border: 1px solid black;
                                                   border-collapse: collapse;">
                                            {{participant.vat !== 0 && participant.new_price !== 0 ? roundTwoDigits(participant.new_price + participant.new_price * (20 / 100)) + '' : 0}}
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </template>
                    </table>
                </div>
            </div>
            <br>
            <div class="info-block">
                <div style="line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.14.</b>
                    В ходе переговоров новых ценовых предложений Участниками
                    представлено не было.
                </div>
            </div>
            </template>
            <div>
                <div>
                    <p style="text-align: justify; line-height: 24px;font-size: 15px;">
                        <b class="b-number">2.15.</b>
                        <b class="b-number color"> Решение (Номер 7) -</b>
                        С учетом ценовых предложений, представленных
                        Участниками, оцененными удовлетворяющими условиям, не
                        основанным на цене, Оценочная комиссия решила признать
                        участников, занявших в процедуре первое и последующие
                        места, в следующем порядке:
                    </p>
                </div>
                <br>
                <div>
                    <table style="word-break: break-word; 
                                  width: 100%;
                                  table-layout: fixed;
                                  border-collapse: collapse;
                                  page-break-inside: avoid;
                                  border: 1px solid black;
                                  text-align: center;" cellspacing="8" cellpadding="8">
                        <tr>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">N п/п</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Участник</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Лот</th>
                        </tr>
                        <template v-if="participantsSequence.length">
                            {{ handleLoaded() }}
                        </template>
                        <template v-for="(participantSequence, participantSequenceIndex) in participantsSequence">
                            <tr class="full-row" :key="participantSequenceIndex.toString() + participantSequenceIndex + Math.random()">
                                <td colspan="3"
                                    style="border: 1px solid black;
                                           border-collapse: collapse;">Занявшийе {{ participantSequence.order }}-ое место:</td>
                            </tr>
                            <template v-for="(participant, participantIndex) in participantSequence.participants">
                                <tr class="full-row" :key="participant.toString() + participantIndex + Math.random()">
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participant.name.ru }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        <span :key="organizedRow.toString() + organizedRowIndex + Math.random()" v-for="(organizedRow, organizedRowIndex) in participant.organizedRows">{{organizedRow}}<span v-if="organizedRowIndex !== participant.organizedRows.length - 1">,</span>&nbsp;</span>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </table>
                </div>
            </div>
            <br>
            <div class="info-block">
                <div style="line-height: 24px; text-align: justify;font-size: 15px;">
                    <b class="b-number">Примечание:</b>
                    Участник признается отобранным из числа Участников, подавших
                    удовлетворительно оцененные Заявки, по принципу
                    предоставления преференций Участнику, представившему
                    минимальное ценовое предложение.
                </div>
                <div style="font-weight: 700;font-style: italic;font-size: 15px;">Решение принято: “За” - {{ totalMembers }}, “Против” - 0</div>
            </div>
            <div>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number">2.16.</b>
                    <b class="b-number color"> Решение (Номер 8) -</b>
                    Оценочная комиссия приняла решение объявить процедуру
                    закупки несостоявшейся, в следующем порядке:
                </div>
                <br>
                <table style="word-break: break-word; 
                              width: 100%;
                              table-layout: fixed;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="8" cellpadding="8">
                    <thead>
                        <tr class="full-row">
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Номер лота</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">Обоснование</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="organizedRowsFromStore.filter(row => row.winners.length !== 1).length">
                            <tr class="full-row" :key="row.toString() + rowIndex" v-for="(row, rowIndex) in organizedRowsFromStore.filter(row => row.winners.length !== 1)">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{ row.view_id }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                        1) ни одна из заявок не соответствует условиям
                                        приглашения
                                        <br />
                                        Основание: пункт 1 части 1 ст. 37 Закона РА “ О
                                        Закупках”
                                        <br />
                                        2) прекращается потребность в закупке
                                        <br />
                                        Основание: пункт 2 части 1 ст. 37 Закона РА “ О
                                        Закупках”
                                        <br />
                                        3) не подано ни одной заявки
                                        <br />
                                        Основание: пункт 3 части 1 ст. 37 Закона РА “ О
                                        Закупках”
                                        <br />
                                        4) договор не заключается
                                        <br />
                                        Основание: пункт 4 части 1 ст. 37 Закона РА “ О
                                        Закупках”
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr class="full-row">
                                <td colspan="3"
                                    style="border: 1px solid black;
                                           border-collapse: collapse;">Չկան</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <br>
            <div style="font-weight: 700;font-style: italic;font-size: 15px;">Решение принято: “За” - {{ totalMembers }}, “Против” - 0</div>
            <div style="text-align: justify;
                        line-height: 24px;font-size: 15px;"> 
                <b class="b-number">2.17.</b>        
                <b class="b-number color"> Решение (Номер  8.1) -</b>
                Оценочная комиссия приняла решение отклонить следующих участников в рамках указанных лот, так как представленные ценовые предложения превышают размер предусмотренных финансовых средств.
            </div>
            <br>
            <table style="word-break: break-word;
                          width: 100%;
                          table-layout: fixed;
                          border-collapse: collapse;
                          page-break-inside: avoid;
                          border: 1px solid black;
                          text-align: center;" cellspacing="8" cellpadding="8">
                <thead>
                    <tr class="full-row">
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">N п/п</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Наименование Участник</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Отклоненные лоты</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="notEnoughParticipants.length">
                        <tr class="full-row" :key="participant.toString() + participantIndex" v-for="(participant, participantIndex) in notEnoughParticipants">
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">
                                {{ participantIndex + 1 }}
                            </td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">
                                {{ participant.name.ru }}
                            </td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">
                                <span :key="offerIndex" v-for="(offer, offerIndex) in participant.offers">
                                    {{offer}}<span v-if="offerIndex !== participant.offers.length-1">,</span>
                                </span>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr class="full-row">
                            <td colspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">Չկան</td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <br>
            <div style="font-weight: 700;font-style: italic;font-size: 15px;">Решение принято: “За” - {{ totalMembers }}, “Против” - 0</div>
            <br>
            <div class="info-block">
                <div style="text-align: center;">3. О решении по заключению Договора</div>
                <div style="text-align: center;">({{ currentOrganized.translations.evaluator_president.name.ru }})</div>
                <br>
                <div style="text-align: justify; line-height: 24px;font-size: 15px;">
                    <b class="b-number">3.1.</b>
                    <b class="b-number color"> Решение (Номер 9) -</b>
                    Оценочная комиссия решила утвердить текст извещения о Решении по заключению Договора.
                </div>
            </div>
            <div style="font-weight: 700;
                        font-style: italic;font-size: 15px;">Решение принято: “За” - {{ totalMembers }}, “Против” - 0</div>
            <br>
            <table style="border: 0 !important; width: 100%;">
                <tr>
                  <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Участвовали:</td>
                  <td style="border: 0 !important;"></td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Председатель комиссии:</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                    {{currentOrganized.translations.evaluator_president.name.ru}}` {{currentOrganized.translations.evaluator_president.position.ru}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Секретарь комиссии:</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                    {{currentOrganized.translations.evaluator_secretary_name.ru}}` {{currentOrganized.translations.evaluator_secretary_position.ru}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Члены комиссии:
                    <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
                  </td>
                  <td style="border: 0 !important; text-align: left !important;">
                    <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.ru }}` {{ member.position.ru }}</div>
                  </td>
                </tr>
            </table> 
        </div>
    </div>
</template>
    
<script>
export default {
    name: 'evaluation_session_ru',
    components: {},
    props: ['handleLoaded'],
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
    data() {
        return this.getModalInitialState()
    },
    watch: {
        currentOrganized: {
            immediate: true,
            async handler() {
                this.totalMembers =
                    this.currentOrganized.evaluator_member.length +
                    (this.currentOrganized.translations.evaluator_president
                        .ru !== ''
                        ? 1
                        : 0)
                await this.organizedRowsFromStore.forEach(async (lot) => {
                    if(lot.participantsList.length){
                        const currentLot = {...lot};
                        this.organizedLots.push(currentLot)
                    }
                });
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
                this.getParticipantsSequence()
            },
        },
    },
    methods: {
        consoleLog(data) {
            console.log(data)
        },
        getIndex(index) {
            return index + 1
        },
        generatePdf() {
            this.$refs.html2Pdf.generatePdf()
        },
        getParticipantsSequence() {
            const participantsSequence = []
            var maxCountParticipants = 1
            this.organizedRowsFromStore.forEach((organizedRow) => {
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
                const participants = []
                this.organizedLots.map((row) => {
                    if (row.participantsList[i] && row.winners.length) {
                        participants.push(row.participantsList[i])
                    }
                })
                participantsSequence.push({
                    order: i + 1,
                    participants: participants,
                })
            }
            participantsSequence.forEach((participantSequence) => {
                const currentParticipants = participantSequence.participants
                currentParticipants.forEach((participant) => {
                    participant.organizedRows = []
                    currentParticipants
                        .filter(
                            (value) => value.id === participant.id
                        )
                        .forEach((value) => {
                            const row = this.organizedRowsFromStore.find((item) =>item.id === value.organize_row_id)
                            if(row && row.winners.length === 1){
                                participant.organizedRows.push(row.view_id);
                            }
                        })
                })
            })
            participantsSequence.forEach((participantSequence) => {
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
        },
        getModalInitialState() {
            return {
                organizedLots: [],
                participants: [],
                incorrectParticipants: [],
                notEnoughParticipants: [],
                participantsSequence: [],
                organizedRows: [],
                totalMembers: 0,
            }
        },
        async beforeDownload({ html2pdf, options, pdfContent }) {
            this.$client
                .put(`organize/${this.currentOrganized.id}`, {
                    get_evaluation_session: true,
                })
                .then(({ status, data }) => {
                    // eslint-disable-next-line eqeqeq
                    if (status == 200) {
                        this.$store.commit(
                            'organize/setCurrentOrganized',
                            data.data
                        )
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        },
        roundTwoDigits(number) {
            return Math.round(number * 100) / 100
        },
        getNegotiationStatus(lot) {
            // alert(this.currentOrganized.is_with_condition)
            if(this.currentOrganized.is_with_condition && !this.currentOrganized.done_negotiations){
                return 'Обязательные переговоры (на основании части 6-й Статьи 15 Закона РА “О Закупках)'
            }
            if(lot.winners.length > 1 || !lot.winners.length) {
                if(!this.currentOrganized.done_negotiations){
                    return 'Обязательные переговоры'
                } else {
                    return 'Несостоявшийся';
                }
            }
            if((lot.winners.length === 1 && lot.participants.length === 1)  && !this.currentOrganized.done_negotiations) {
                return 'Переговоры (по желанию)'
            }
            return `Состоявшийся ${this.currentOrganized.is_with_condition ? '(на основании части 6-й Статьи 15 Закона РА “О Закупках)' : ''}`
        },
        resetComponent() {
            Object.assign(this.$data, this.getModalInitialState())
        },
        async handleBeforeDownload() {
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
        font-size: 14px !important;
    }
</style>
