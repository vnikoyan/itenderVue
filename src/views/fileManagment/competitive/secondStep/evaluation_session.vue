<template>
    <div id="commandment-file" ref="contract" style="width: 100%; font-size: 15px;">
        <div v-if="Boolean(Object.keys(currentOrganized).length)">
            <div style="text-align: center;">ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ N____</div>
            <div style="text-align: center">«{{currentOrganized.translations.code.hy}}» գնանշման հարցման ընթացակարգի գնահատող հանձնաժողովի հայտերի բացման և գնահատման նիստի</div>
            <br>
            <table style="border: 0 !important; width: 100%;">
                <tr>
                    <td class="text-left ft-11" style="text-align: left;border: 0 !important;font-size: 11pt;">
                        <span v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">{{me.organisation[0].translations.city.hy}}</span> <span v-else>{{me.organisation[0].translations.city.hy}} {{me.organisation[0].translations.region.hy}}</span>  {{ me.organisation[0].translations.address.hy }}
                    </td>
                    <td class="text-right ft-11" style="text-align: right;border: 0 !important;font-size: 11pt;">
                       «____»«____» 2021թ 
                    </td>
                </tr>
                <tr>
                    <td style="border: 0 !important;"></td>
                    <td class="text-right ft-11" style="text-align: right;border: 0 !important;font-size: 11pt;">
                        ժամը՝ ____
                    </td>
                </tr>
            </table>
            <br>
            <table style="border: 0 !important; width: 100%;">
                <tr>
                  <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Մասնակցում էին`</td>
                  <td style="border: 0 !important;"></td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի նախագահ`</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_president.name.hy}}` {{currentOrganized.translations.evaluator_president.position.hy}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի քարտուղար`</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_secretary_name.hy}}` {{currentOrganized.translations.evaluator_secretary_position.hy}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Հանձնաժողովի անդամներ`
                    <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
                  </td>
                  <td style="border: 0 !important; text-align: left !important;">
                    <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.hy }}` {{ member.position.hy }}</div>
                  </td>
                </tr>
            </table>
            <br>
            <br> 
            <div style="text-align: center; margin-bottom: 0;">1.Հայտերի բացման մասին</div>
            <div style="text-align: center;">({{currentOrganized.translations.evaluator_president.name.hy}})</div>
            <br>
            <div v-if="participants.length > 1" style="text-align: justify;">1.1. Հրավերով սահմանված ժամկետներում մասնակցության հայտ է ներկայացվել հետևյալ մասնակիցների կողմից</div>
            <div v-else style="text-align: justify;">1.1. Հրավերով սահմանված ժամկետներում մասնակցության հայտ է ներկայացվել հետևյալ մասնակցի կողմից</div>
            <br>
            <table style="word-break: break-word; 
                          width: 100%;
                          table-layout: fixed;
                          border-collapse: collapse;
                          page-break-inside: avoid;
                          border: 1px solid black;
                          text-align: center;" cellspacing="8" cellpadding="8">
                <thead>
                    <tr>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            Հ/Հ
                        </th>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            Մասնակցի անվանում
                        </th>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            ՀՎՀՀ
                        </th>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            Հասցե
                        </th>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            Հեռախոս
                        </th>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            Էլ. փոստի հասցե
                        </th>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            Հայտի ներկայացման օր
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="( participantItem,participantIndex) in participants">
                        <tr class="full-row" :key="participantIndex.toString() + participantIndex + Math.random()">
                            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                                {{ participantIndex + 1 }}
                            </td>
                            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                                {{ participantItem.participant[0].name.hy }}
                            </td>
                            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                                {{ participantItem.participant[0].tin }}
                            </td>
                            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                                {{ participantItem.participant[0].address.hy }}
                            </td>
                            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                                {{ participantItem.participant[0].phone}}
                            </td>
                            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                                {{ participantItem.participant[0].email}}
                            </td>
                            <td style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                                {{ participantItem.participant[0].date_of_submission }}
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <br>
            <div v-if="participants.length > 1" style="font-size: 15px;">
                1.2. Մասնակիցների կողմից ներկայացված գնային առաջարկները հետևյալն են
            </div>
            <div v-else style="font-size: 15px;">
                1.2. Մասնակցի կողմից ներկայացված գնային առաջարկը հետևյալն է
            </div>
            <br>
            <table style="width: 100%;
                          table-layout: fixed;
                          word-break: break-word;
                          border-collapse: collapse;
                          page-break-inside: avoid;
                          border: 1px solid black;
                          text-align: center;" cellspacing="8" cellpadding="8">
                <thead>
                    <tr>
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse;">
                            Հ/Հ
                        </th> 
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse;">
                            Մասնակցի անվանում
                        </th>
                        <th colspan="3" style="border: 1px solid black; border-collapse: collapse;">
                            Մասնակցի գնային առաջարկ
                        </th>
                        <th rowspan="2" style="border: 1px solid black; border-collapse: collapse;">
                            Նախահաշվային գին
                        </th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            Արժեք
                        </th>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            ԱԱՀ
                        </th>
                        <th style="border: 1px solid black; border-collapse: collapse;">
                            Ընդամենը
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(organizedRow, organizedIndex) in organizedRowsFromStore">
                        <tr :key="organizedRow.toString() + organizedIndex + Math.random()">
                            <td colspan="6" style="border: 1px solid black; border-collapse: collapse;">
                                Չափաբաժին {{ organizedRow.view_id }}՝ {{ organizedRow.cpv_code}}
                                -
                                {{ organizedRow.cpv_name }}
                            </td>
                        </tr>
                        <template v-if="organizedRow.participantsList.length">
                            <template
                                v-for="(participant, participantIndex) in organizedRow.participantsList">
                                <tr class="full-row" :key="participant.toString() + participantIndex + Math.random()">
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participant.name.hy }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participant.current_price }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participant.current_vat }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participant.current_price_vat }}</td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">{{ participant.estimated_price }}</td>
                                </tr>
                            </template>
                        </template>
                        <template v-else>
                            <tr :key="organizedRow.toString() + organizedIndex + Math.random()" class="full-row">
                                <td colspan="6" style="border: 1px solid black; border-collapse: collapse;">
                                    Գնային առաջարկ չի ներկայացվել
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
            <br>
            <div style="text-align: justify; line-height: 24px;font-size: 15px;">
                1.3. Մինչև հրավերում փոփոխությունների կատարման համար
                սահմանված վերջնաժամկետը լրանալը, էլեկտրոնային
                փոստի միջոցով գնահատող հանձնաժողովի քարտուղարին
                հիմնավորումներ չեն ներկայացվել հրավերով
                սահմանված գնման առարկայի բնութագրերի՝ օրենքով
                նախատեսված մրցակցության ապահովման և
                խտրականության բացառման պահանջների տեսակետից:
            </div>
            <div style="text-align: justify;line-height: 24px;font-size: 15px;" class="color">
                1.3. Մինչև հրավերում փոփոխությունների կատարման համար
                սահմանված վերջնաժամկետը լրանալը, էլեկտրոնային
                փոստի միջոցով գնահատող հանձնաժողովի քարտուղարին
                ներկայացվել է հիմնավորումներ հրավերով սահմանված
                գնման առարկայի բնութագրերի՝ օրենքով նախատեսված
                մրցակցության ապահովման և խտրականության բացառման
                պահանջների տեսակետից, որը ներկայացված է
                <b>կից ամփոփոթերթում:</b>
            </div>
            <div style="font-size: 15px;">1.4. Հրավերի վերաբերյալ հարցեր և պարզաբանումներ չեն եղել</div>
            <div class="color" style="font-size: 15px;">1.4. Հրավերի վերաբերյալ եղել են հետևյալ հարցերը և պարզաբանումները
                <p style="word-break: break-all;">____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________</p> 
            </div>
            <br>
            <br>
            <div style="text-align: center;">2.Հայտերի գնահատման մասին</div>
            <div style="text-align: center;">({{currentOrganized.translations.evaluator_president.name.hy}})</div>
            <br>
            <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                2.1. Պատվիրատի և (կամ) գնահատող հանձնաժողովի կողմից
                ՀՀ պետական եկամուտների կոմիտեի միջոցով
                մասնակցի/իցների՝ օրենքի 6-րդ հոդվածի 1-ին մասի
                2-րդ կետին բավարարելու մասին հայտով ներկայացված
                հավաստման իսկությունը ստուգելու վերաբերյալ
                որոշում չի կայացվել.
            </div>
            <div style="line-height: 24px;font-size: 15px;" class="color">
                <b class="b-number color">2.1.Որոշում (թիվ 1) - </b>
                Հաշվի առնելով,
                <p class="color" style="word-wrap: word-break; text-align: justify; word-break: break-all;">__________________________________________________________________________________________________________________________________________________________________________________________________________</p>
                կարգի 67-րդ կետի հիման վրա ՀՀ պետական
                եկամուտների կոմիտեի միջոցով ___________ՍՊԸ-ի՝
                օրենքի 6-րդ հոդվածի 1-ին մասի 2-րդ կետին
                բավարարելու մասին հայտով ներկայացված հավաստման
                իսկությունը ստուգելու նպատակով գնահատող
                հանձնաժողովը որոշեց հայտերի բացման և գնահատման
                նիստը կասեցնել:
            </div>
            <div style="font-weight: 700; font-style: italic;font-size: 15px;">Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0 </div>
            <div style="text-align: justify; line-height: 24px;font-size: 15px;">  
                <b class="b-number color">2.2. Որոշում (թիվ 2) -</b>
                Հաշվի առնելով այն հանգամանքը, որ աշխատանքի
                ծավալով պայմանավորված հնարավոր չէ հայտերի
                գնահատումը ավարտել սույն աշխատանքային օրվա
                ընթացքում ուստի, հայտերի գնահատման նպատակով
                գնահատող հանձնաժողովը որոշեց հայտերի բացման և
                գնահատման նիստը կասեցնել:
            </div>
            <div style="text-align: justify;line-height: 24px;font-size: 15px;" class="color">  
                <b class="b-number color">2.2. Որոշում (թիվ 2) -</b>
                Հաշվի առնելով այն հանգամանքը, որ սպառվել է
                աշխատանքային օրը ուստի, հայտերի գնահատման
                նպատակով գնահատող հանձնաժողովը որոշեց հայտերի
                բացման և գնահատման նիստը կասեցնել:
            </div>
            <div style="font-weight: 700;font-style: italic;font-size: 15px;">Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0</div>
            <div v-if="currentOrganized.is_correction">
                <div style="line-height: 24px;font-size: 15px;">2.3.Հայտերի գնահատման ընթացքում ի հայտ են եկել հետևյալ անհամապատասխանությունները.</div>
                <br>
                <table style="width: 100%;
                              word-break: break-word;
                              table-layout: fixed;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="8" cellpadding="8">
                    <thead>
                        <tr class="full-row">
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">Հ/Հ</th>
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">Մասնակցի անվանում</th>
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">Անհամապատասխանության մանրամասն նկարագրությունը</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="incorrectParticipants.length">
                            <template v-for="(participantItem,participantIndex) in incorrectParticipants">
                                <tr class="full-row" :key="participantIndex.toString() + participantIndex + Math.random()">
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">{{ participantIndex + 1 }}</td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;"> {{participantItem.participant[0].name.hy}} </td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;"
                                        v-if="participantItem.lots.filter((item) => !item.is_satisfactory).length > 0">
                                        <span :key="participantIndex.toString() + lotIndex" v-for="(lot, lotIndex) in participantItem.lots.filter((item) => !item.is_satisfactory)">
                                            {{organizedRowsFromStore.find(item => item.id === lot.organize_row_id).view_id}}<span v-if="lotIndex !== participantItem.lots.filter((item) =>!item.is_satisfactory).length-1">,</span>
                                        </span>
                                        - Գնային առաջարկի անհամապատասխանություն
                                    </td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;" v-else><span>Գնային առաջարկ չի ներկայացվել</span></td>
                                </tr>
                            </template>
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
                <div style="text-align: justify; line-height: 24px;font-size: 15px;"> 
                    <b class="b-number color">2.4. Որոշում (թիվ 3) -</b>
                    Մասնակցին հայտաբերված անհամապատասխանությունների
                    շտկման հնարավորություն տալու նպատակով գնահատող
                    հանձնաժողովը որոշեց հայտերի բացման և գնահատման
                    նիստը կասեցնել 1 (մեկ) աշխատանքային օրով և այդ
                    մասին ծանուցել մասնակցին նույն աշխատանքային օրվա
                    ընթացքում:
                </div>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;"> Հանձնաժողովը որոշեց մերժել գնային առաջարկի անհամապատասխանությամբ ներկայացված չափաբաժինները</div>
                <div style="font-weight: 700;font-style: italic;font-size: 15px;">Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0</div>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                    <b class="b-number color">2.5. Որոշում (թիվ 4) -</b>
                    Գնահատող հանձնաժողովը որոշեց հայտերի բացման և
                    գնահատման նիստը շարունակել _____.____.______թ-ին
                    ժամը ________-ին ____________ հասցեում:
                </div>
                <div style="font-weight: 700; font-style: italic;font-size: 15px;">Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0</div>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                2.6. Հայտերի բացման և գնահատման նիստը շարունակվեց
                    _____.____.______թ-ին ժամը ________-ին
                    ____________ հասցեում, որին մասնակցում էին՝
                </div>
                <br>
                <table style="border: 0 !important; width: 100%;">
                    <tr>
                    <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Մասնակցում էին`</td>
                    <td style="border: 0 !important;"></td>
                    </tr>
                    <tr>
                    <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի նախագահ`</td>
                    <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                            {{currentOrganized.translations.evaluator_president.name.hy}}` {{currentOrganized.translations.evaluator_president.position.hy}}
                    </td>
                    </tr>
                    <tr>
                    <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի քարտուղար`</td>
                    <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                            {{currentOrganized.translations.evaluator_secretary_name.hy}}` {{currentOrganized.translations.evaluator_secretary_position.hy}}
                    </td>
                    </tr>
                    <tr>
                    <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Հանձնաժողովի անդամներ`
                        <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
                    </td>
                    <td style="border: 0 !important; text-align: left !important;">
                        <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.hy }}` {{ member.position.hy }}</div>
                    </td>
                    </tr>
                </table>
                <br>
                <div style="line-height: 24px;font-size: 15px;">
                    2.7. Սահմանված ժամկետներում համապատասխան շտկումները
                    ներկայացվել կամ չեն ներկայացվել հետևյալ
                    մասնակիցների կողմից.
                </div>
                <br>
                <table style="width: 100%;
                              table-layout: fixed;
                              word-break: break-word;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="8" cellpadding="8">
                    <thead>
                        <tr class="full-row">
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;"> Հ/Հ </th>
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">Մասնակցի անվանում</th>
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">Շտկումը</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="incorrectParticipants.length">
                            <template v-for="(participantItem, participantIndex) in incorrectParticipants">
                                <tr class="full-row" :key="participantIndex.toString() + participantIndex + Math.random()">
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">{{participantIndex + 1}}</td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">{{participantItem.participant[0].name.hy}}</td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;"></td>
                                </tr>
                            </template>
                        </template>
                        <template v-else>
                            <tr class="full-row">
                                <td colspan="3" style="border: 1px solid black;
                                                    border-collapse: collapse;">Չկան</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <br>
            <div style="line-height: 24px;font-size: 15px;">2.8. Մասնակիցների կողմից ներկայացված փաստաթղթերը տրամադրվեցին գնահատող հանձնաժողովի անդամներին.</div>
            <div style="line-height: 24px;font-size: 15px;">2.9. Մասնակցի/ների կողմից ներկայացված հայտի/երի գնահատման արդյունքների ամփոփումը ներկայացված է ստորև</div>
            <br>
            <table style="width: 100%;
                          word-break: break-word;
                          table-layout: fixed;
                          border-collapse: collapse;
                          page-break-inside: avoid;
                          border: 1px solid black;
                          text-align: center;" cellspacing="8" cellpadding="8">
                <tbody>
                    <tr>
                        <th rowspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">Հ/Հ</th>
                        <th rowspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">Մասնակցի անվանում</th>
                        <th rowspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">Չափաբաժնի համար</th>
                        <th colspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">
                            Մասնակցի հայտի գնահատման չափանիշները
                            <br /> 
                            Գնահատական
                        </th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;"> Հայտեր պարունակող ծրարները կազմելու և ներկայացնելու համապատասխանությունը սահմանված կարգին</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Բացված յուրաքանչյուր ծրարում պահանջվող (նախատեսված) փաստաթղթերի առկայությունը և դրանց կազմման համապատասխանությունը հրավերով սահմանված վավերապայմաններին</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">ԸՆԴՀԱՆՈՒՐ ԳՆԱՀԱՏԱԿԱՆ</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Բավարար
                            <br  />
                            Անբավարար
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Բավարար
                            <br  />
                            Անբավարար
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Բավարար
                            <br  />
                            Անբավարար
                        </th>
                    </tr>
                </tbody>
                <template v-for="(participantItem, participantIndex) in participants">
                    <tbody :key="participantIndex.toString() + participantIndex + Math.random()">
                        <template v-if="participantItem.lots.length > 0">
                            <tr>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;" :rowspan="participantItem.lots.filter((item) =>!item.is_satisfactory).length + 1">{{ participantIndex + 1 }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;" :rowspan="participantItem.lots.filter((item) => !item.is_satisfactory).length + 1">{{participantItem.participant[0].name.hy }}</td>
                                <template v-if="Boolean(participantItem.lots.find((item) =>item.is_satisfactory !==0))">
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        <span :key="participantIndex.toString() + lotIndex" v-for="(lot, lotIndex) in participantItem.lots.filter((item) => item.is_satisfactory)" >
                                            {{organizedRowsFromStore.find((item) => item.id === lot.organize_row_id) ? organizedRowsFromStore.find((item) =>item.id === lot.organize_row_id).view_id : ''}}
                                            <span v-if="lotIndex !== participantItem.lots.filter((item) => item.is_satisfactory).length - 1">,</span>
                                        </span>
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        Բավարար
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        Բավարար
                                    </td>
                                    <td style="border: 1px solid black;
                                               border-collapse: collapse;">
                                        Բավարար
                                    </td>
                                </template>
                            </tr>
                            <tr v-for="(lot, lotIndex) in participantItem.lots.filter((item) => !item.is_satisfactory)" :key="participantIndex.toString() + lotIndex">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    <span>{{organizedRowsFromStore.find((item) => item.id === lot.organize_row_id) ? organizedRowsFromStore.find((item) => item.id === lot.organize_row_id ).view_id : ''}}</span>
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    Բավարար
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;" v-if="lot.is_satisfactory !== 0">
                                    Բավարար
                                </td>
                                <td v-else style="border: 1px solid black;
                                                  border-collapse: collapse;">
                                    Անբավարար
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    Անբավարար
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr class="full-row" :key="participantIndex.toString()" v-if="participantItem.participant[0]">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    {{ participantIndex + 1 }}
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{participantItem.participant[0].name.hy}} </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;" v-if="participantItem.participant[0].is_docs_satisfactory">
                                    Բավարար
                                </td>
                                <td v-else style="border: 1px solid black;
                                                  border-collapse: collapse;">
                                    Անբավարար
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;" v-if="participantItem.participant[0] .price_offer_exists">
                                    Բավարար
                                </td>
                                <td v-else style="border: 1px solid black;
                                                  border-collapse: collapse;">
                                    Անբավարար
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    Անբավարար
                                </td>
                            </tr>
                            <tr class="full-row" :key="participantIndex.toString()" v-else>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    {{ participantIndex + 1 }}
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    -
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    -
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    Անբավարար
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    Անբավարար
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    Անբավարար
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </template>
            </table>
            <template v-if="currentOrganized.is_negotiations">
            <br>
            <div v-if="currentOrganized.locale_negotiations">
                <div style="text-align: justify;line-height: 24px;font-size: 15px;"> 
                    <b class="b-number color">
                    2.10. Որոշում (թիվ 5) -
                    </b>
                    Գնահատող հանձնաժողովը որոշեց առաջարկված գների
                    նվազեցման նպատակով ոչ գնային պայմանները
                    բավարարող գնահատված մասնակիցների հետ վարել
                    միաժամանակյա բանակցություններ, Հաշվի առնելով այն
                    հանգամանքը, որ նիստին ներկա էին գտնվում բոլոր
                    մասնակիցները (համապատասխան լիազորություն ունեցող
                    ներկայացուցիչները): Բանակցությունների հիմքը և
                    տևողությունը համաձայն հետևյալ աղյուսակի.
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
                                                border-collapse: collapse;">Չ/Հ</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">Մասնակցի անվանումը կամ անունը ազգանունը հայրանունը</th>
                            <th colspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">Բանակցությունների</th>
                        </tr>
                        <tr class="full-row">
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">հիմքը</th>
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">Տևողությունը յուրաքանչյուր չափաբաժնի համար</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(organizedRow, organizedRowIndex) in organizedLots">
                            <tr class="full-row" :key="organizedRow.toString() + organizedRowIndex + Math.random()"> 
                                <template v-if="organizedRow.participantsList.length">
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">{{ organizedRow.view_id }}</td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">
                                        <span :key="participant.toString() + participantIndex" v-for="(participant, participantIndex) in organizedRow.participantsList">
                                            {{ participant.name.hy}}
                                            <span v-if="participantIndex !== organizedRow.participantsList.length - 1">,</span>
                                        </span>
                                    </td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">{{getNegotiationStatus(organizedRow)}}
                                    </td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;"></td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <div style="text-align: justify;line-height: 24px;font-size: 15px;"> 
                    <b class="b-number color">
                    2.10. Որոշում (թիվ 5) -
                    </b>
                    Գնահատող հանձնաժողովը որոշեց առաջարկված
                    գների նվազեցման նպատակով ոչ գնային
                    պայմանները բավարարող գնահատված մասնակիցների
                    հետ վարել միաժամանակյա բանակցություններ,
                    Հաշվի առնելով այն հանգամանքը, որ նիստին
                    ներկա չէին գտնվում բոլոր մասնակիցները
                    (համապատասխան լիազորություն ունեցող
                    ներկայացուցիչները), ուստի գնահատող
                    հանձնաժողովը որոշեց միաժամանակյա
                    բանակցությունների վարման նպատակով կասեցնել
                    հայտերի բացման և գնահատման նիստը և այդ մասին
                    ծանուցել մասնակիցներին:
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
                                                border-collapse: collapse;">Չ/Հ</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">Մասնակցի անվանումը կամ անունը ազգանունը հայրանունը</th>
                            <th colspan="2" style="border: 1px solid black;
                                                border-collapse: collapse;">Բանակցությունների</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">հիմքը</th>
                            <th style="border: 1px solid black;
                                    border-collapse: collapse;">Տևողությունը յուրաքանչյուր չափաբաժնի համար</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(organizedRow, organizedRowIndex) in organizedLots">
                            <tr class="full-row" :key="organizedRow.toString() + organizedRowIndex + Math.random()">
                                <template v-if="organizedRow.participantsList.length">
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">{{ organizedRow.view_id }}</td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">
                                        <span :key="participant.toString() + participantIndex" v-for="(participant,participantIndex) in organizedRow.participantsList">
                                            {{participant.name.hy}}
                                            <span v-if="participantIndex !== organizedRow.participantsList.length - 1">,</span>
                                        </span>
                                    </td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;">{{getNegotiationStatus(organizedRow)}}</td>
                                    <td style="border: 1px solid black;
                                            border-collapse: collapse;"></td>
                                </template>    
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <br>
            <div style="font-weight: 700;font-style: italic;font-size: 15px;">Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0</div>
            <div style="line-height: 24px;font-size: 15px;"> 2.11. Մասնակիցների անվանումները և բանակցությունների արդյունքում առաջարկված նոր գները հետևյալն են.</div>
            <br>
            <table style="word-break: break-word;
                          width: 100%;
                          table-layout: fixed;
                          border-collapse: collapse;
                          page-break-inside: avoid;
                          border: 1px solid black;
                          text-align: center;" cellspacing="8" cellpadding="8">
                <tbody>
                    <tr>
                        <th rowspan="2" style="border: 1px solid black;
                                               border-collapse: collapse;">Չ/Հ</th>
                        <th rowspan="2" style="border: 1px solid black;
                                               border-collapse: collapse;">Մասնակցի անվանումը</th>
                        <th colspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">Սկզբնական գնային առաջարկ<br />(ՀՀ դրամ)
                        </th>
                        <th colspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">Բանակցությունների արդյունքում առաջարկված նվազագույն գին<br />(ՀՀ դրամ)</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Արժեք</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">ԱԱՀ</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Ընդամենը</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Արժեք</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">ԱԱՀ</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Ընդամենը</th>
                    </tr>
                </tbody>
                <template v-for="organizedRow in organizedLots">
                    <tbody :key="organizedRow.toString() + Math.random()">
                        <template v-for="(participant,participantIndex) in organizedRow.participantsList">
                            <tr :key="participant.toString() + participantIndex + Math.random()">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;" v-if="participantIndex === 0"
                                    :rowspan="organizedRow.participantsList.length">
                                    {{organizedRow.view_id}}
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{participant.name.hy}}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{ participant.price }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{ participant.vat }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{participant.cost}}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{participant.new_price !==0 ? participant.new_price + '' : 0}}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{participant.new_price !==0 && participant.vat !==0 ? roundTwoDigits(participant.new_price *(20 / 100)) + '' : 0}}
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{participant.vat !== 0 && participant.new_price !== 0 ? roundTwoDigits(participant.new_price + participant.new_price * (20 / 100)) + '' : 0}}
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </template>
            </table>
            <br>
            <div style="line-height: 24px;font-size: 15px;">
                2.11. Բանակցությունների ընթացքում մասնակիցների
                կողմից նոր գնային առաջարկներ չեն ներկայացվել
            </div>
            <div style="font-weight: 700;font-style: italic;font-size: 15px;">Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0</div>
            <div style="text-align: justify;line-height: 24px;font-size: 15px;"> 
                <b class="b-number color">
                   2.11. Որոշում (թիվ 6) -
                </b>
                Գնահատող հանձնաժողովը որոշեց ոչ գնային
                պայմանները բավարարող գնահատված մասնակիցների հետ
                միաժամանակյա բանակցությունների վարման նպատակով
                հայտերի բացման և գնահատման նիստը շարունակել _____.____.______ թ-ին ժամը ________-ին
                ____________ հասցեում:
            </div>
            <div style="font-weight: 700; font-style: italic;font-size: 15px;">
                Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0
            </div>
            <div style="text-align: justify; line-height: 24px;font-size: 15px;">
                Հայտերի բացման և գնահատման նիստը շարունակվեց
                _____.____.______թ-ին ժամը ________-ին
                ____________ հասցեում, որին մասնակցում էին՝
            </div>
            <br>
            <table style="border: 0 !important; width: 100%;">
                <tr>
                  <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Մասնակցում էին`</td>
                  <td style="border: 0 !important;"></td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի նախագահ`</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_president.name.hy}}` {{currentOrganized.translations.evaluator_president.position.hy}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի քարտուղար`</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_secretary_name.hy}}` {{currentOrganized.translations.evaluator_secretary_position.hy}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Հանձնաժողովի անդամներ`
                    <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
                  </td>
                  <td style="border: 0 !important; text-align: left !important;">
                    <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.hy }}` {{ member.position.hy }}</div>
                  </td>
                </tr>
            </table>
            <br>
            <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                2.13. Սահմանված ժամկետներում բանակցություններին
                ներկայացած (համապատասխան լիազորություն ունեցող
                ներկայացուցիչները) մասնակիցների անվանումները և
                բանակցությունների արդյունքում առաջարկված նոր
                գները հետևյալն են.
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
                                               border-collapse: collapse;">Զբաղեցրած տեղ</th>
                        <th rowspan="2" style="border: 1px solid black;
                                               border-collapse: collapse;">Մասնակցի անվանումը</th>
                        <th colspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">
                            Սկզբնական գնային առաջարկ<br />(ՀՀ
                            դրամ)
                        </th>
                        <th colspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">Բանակցությունների արդյունքում առաջարկված նվազագույն գին<br />(ՀՀ դրամ)</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black;
                                    border-collapse: collapse;">Արժեք
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">ԱԱՀ</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Ընդամենը</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Արժեք</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">ԱԱՀ</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Ընդամենը</th>
                    </tr>
                </thead>
                <template v-for="(organizedRow, organizedIndex) in organizedLots">
                    <tbody :key="organizedRow.toString() + organizedIndex + Math.random()">
                        <tr :key="organizedRow.toString() + organizedIndex + Math.random()">
                            <td colspan="8" style="border: 1px solid black; border-collapse: collapse;">
                                Չափաբաժին {{ organizedRow.view_id }}՝ 
                                {{ organizedRow.cpv_code}}
                                -
                                {{ organizedRow.cpv_name }}
                            </td>
                        </tr>
                        <template v-for="(participant, participantIndex) in organizedRow.participantsList">
                            <tr class="full-row"
                                :key=" participant.toString() + participantIndex + Math.random()">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">
                                    {{participantIndex + 1}}
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;"> {{participant.name.hy }} </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;"> {{ participant.price }} </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;"> {{ participant.vat }} </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;"> {{ participant.cost }} </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{participant.new_price !== 0 ? participant.new_price + '' : 0}}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;"> {{participant.new_price !== 0 && participant.vat !== 0 ? roundTwoDigits(participant.new_price * (20 / 100)) + '' : 0}} </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;">{{ participant.vat !== 0 && participant.new_price !== 0 ? roundTwoDigits(participant.new_price + participant.new_price * (20 / 100)) + '' : 0 }}</td>
                            </tr>
                        </template>
                    </tbody>
                </template>
            </table>
            <br>
            <div style="line-height: 24px;font-size: 15px;">2.14. Բանակցությունների ընթացքում մասնակիցների կողմից նոր գնային առաջարկներ չեն ներկայացվել</div>
            </template>
            <div style="text-align: justify;
                      line-height: 24px;font-size: 15px;"> 	
                <b class="b-number color">
                   2.15. Որոշում (թիվ 7) -
                </b>
                Հաշվի առնելով ոչ գնային պայմանները բավարարող
                գնահատված մասնակիցների կողմից ներկայացված գնային
                առաջարկները գնահատող հանձնաժողովը որոշեց ճանաչել
                ընթացակարգի ընտրված և հաջորդաբար տեղեր զբաղեցնող
                մասնակիցներին հետևյալ կարգով.
            </div>
            <br>
            <table style="width: 100%;
                          word-break: break-word;
                          table-layout: fixed;
                          border-collapse: collapse;
                          page-break-inside: avoid;
                          border: 1px solid black;
                          text-align: center;" cellspacing="8" cellpadding="8">
                <tr class="full-row">
                    <th style="border: 1px solid black;
                               border-collapse: collapse;">Հ/Հ</th>
                    <th style="border: 1px solid black;
                               border-collapse: collapse;">Մասնակիցը</th>
                    <th style="border: 1px solid black;
                               border-collapse: collapse;">Չափաբաժինը</th>
                </tr>
                <template v-if="participantsSequence.length">
                    {{ handleLoaded() }}
                </template>
                <template v-for="(participantSequence,participantSequenceIndex) in participantsSequence">
                    <tr v-if="participantSequence.participants.length" class="full-row"
                        :key="participantSequenceIndex.toString() + participantSequenceIndex + Math.random()" >
                        <td colspan="3" style="border: 1px solid black;
                                               border-collapse: collapse;">
                            {{participantSequence.order === 1 ? 'Ընտրված`' : participantSequence.order + ' ' + 'տեղ զբաղեցրած մասնակից`'}}
                        </td>
                    </tr>
                    <template v-for="(participant, participantIndex) in participantSequence.participants">
                        <tr class="full-row" :key="participant.toString() + participantIndex + Math.random()">
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;"> {{ participantIndex + 1 }} </td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">{{participant.name.hy}} </td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">
                                <span  v-for="(organizedRow,organizedRowIndex ) in participant.organizedRows" :key="organizedRow.toString() + organizedRowIndex + Math.random() ">
                                    {{ organizedRow }}<span v-if="organizedRowIndex !== participant.organizedRows.length - 1">,</span>
                                </span>
                            </td>
                        </tr>
                    </template>
                </template>
            </table>
            <br>
            <div style="text-align: justify;line-height: 24px;font-size: 15px;">
                <b class="b-number">Ծանոթություն.</b>
                Ընտրված մասնակիցը ճանաչվել է բավարար
                գնահատված հայտեր ներկայացրած մասնակիցների
                թվից՝ նվազագույն գնային առաջարկ ներկայացրած
                մասնակցին նախապատվություն տալու սկզբունքով:
            </div>
            <div style="font-weight: 700;font-style: italic;font-size: 15px;">
                Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0
            </div>
            <div style="text-align: justify;line-height: 24px;font-size: 15px;"> 
                <b class="b-number color">
                   2.16. Որոշում (թիվ 8) -
                </b>
                Գնահատող հանձնաժողովը որոշեց գնման ընթացակարգը
                հայտարարել չկայացած հետևյալ կարգով՝
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
                                   border-collapse: collapse;">Չափաբաժնի համարը</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">հիմնավորումը</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="organizedRowsFromStore.filter(row => row.winners.length !== 1).length">
                        <tr class="full-row" :key="row.toString() + rowIndex" v-for="(row, rowIndex) in organizedRowsFromStore.filter(row => row.winners.length !== 1)">
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">
                                <span>{{ row.view_id }}</span>
                            </td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">
                                <p style="text-align: left !important; margin: 0 10%;">
                                    1) հայտերից ոչ մեկը չի համապատասխանում հրավերի պայմաններին.
                                    <br />
                                    Հիմք՝ «Գնումների մասին» ՀՀ օրենքի
                                    37-րդ հոդվածի 1-ին մասի 1-ին կետ
                                    <br />
                                    2) դադարում է գոյություն ունենալ գնման պահանջը.
                                    <br />
                                    Հիմք՝ «Գնումների մասին» ՀՀ օրենքի
                                    37-րդ հոդվածի 1-ին մասի 2-րդ կետ
                                    <br />
                                    3) ոչ մի հայտ չի ներկայացվել.
                                    <br />
                                    Հիմք՝ «Գնումների մասին» ՀՀ օրենքի
                                    37-րդ հոդվածի 1-ին մասի 3-րդ կետ
                                    <br />
                                    4) պայմանագիր չի կնքվում:
                                    <br />
                                    Հիմք՝ «Գնումների մասին» ՀՀ օրենքի
                                    37-րդ հոդվածի 1-ին մասի 4-րդ կետ
                                </p>
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
            <div style="font-weight: 700; font-style: italic;font-size: 15px;">
                Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0
            </div>
            <div style="text-align: justify;line-height: 24px;font-size: 15px;"> 
                <b class="b-number color">
                   2.17. Որոշում (թիվ 8.1) -
                </b>
                Գնահատող հանձնաժողովը որոշեց մերժել հետևյալ մասնակիցներին նշված չափաբաժինների մասով, քանի որ ներկայացված գնային առաջարկները գերազանցում են նախատեսված ֆինանսական միջոցների չափը։
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
                                   border-collapse: collapse;">Հ/Հ</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Մասնակցի անվանում</th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">Մերժված չափաբաժիններ</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="notEnoughParticipants.length">
                        <tr class="full-row" :key="participant.toString() + participantIndex" v-for="(participant, participantIndex) in notEnoughParticipants">
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">
                                <span>
                                    {{ participantIndex + 1 }}
                                </span>
                            </td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;">
                                    {{ participant.name.hy }}
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
            <div style="font-weight: 700;font-style: italic; font-size: 15px;">Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0</div>
            <br>
            <div style="text-align: center;">Պայմանագիր կնքելու որոշման մասին</div>
            <div style="text-align: center;">({{currentOrganized.translations.evaluator_president.name.hy}})</div>
            <br>
            <div style="text-align: justify;
                      line-height: 24px;font-size: 15px;"> 
                <b class="b-number color">
                  3.1.  Որոշում (թիվ 9) -
                </b>
                Գնահատող հանձնաժողովը որոշեց հաստատել պայմանագիր
                կնքելու որոշման մասին հայտարարության տեքստը:
            </div>
            <div style="font-weight: 700; font-style: italic;font-size: 15px;">
                Ընդունվել է որոշում` կողմ` {{ totalMembers }}, դեմ`0
            </div>
            <br>
            <table style="border: 0 !important; width: 100%;">
                <tr>
                  <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Մասնակցում էին`</td>
                  <td style="border: 0 !important;"></td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի նախագահ`</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_president.name.hy}}` {{currentOrganized.translations.evaluator_president.position.hy}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի քարտուղար`</td>
                  <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
                        {{currentOrganized.translations.evaluator_secretary_name.hy}}` {{currentOrganized.translations.evaluator_secretary_position.hy}}
                  </td>
                </tr>
                <tr>
                  <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Հանձնաժողովի անդամներ`
                    <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
                  </td>
                  <td style="border: 0 !important; text-align: left !important;">
                    <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.hy }}` {{ member.position.hy }}</div>
                  </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'evaluation_session',
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
                        .hy !== ''
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
                notEnoughParticipants: [],
                incorrectParticipants: [],
                participantsSequence: [],
                organizedRows: [],
                totalMembers: 0,
            }
        },
        beforeDownload({ html2pdf, options, pdfContent }) {
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
                return 'Պարտադիր բանակցություններ (15-րդ հոդվածի 6-րդ մաս)'
            }
            if(lot.winners.length > 1 || !lot.winners.length) {
                if(!this.currentOrganized.done_negotiations){
                    return 'Պարտադիր Բանակցություններ'
                } else {
                    return 'Չկայացած';
                }
            }
            if((lot.winners.length === 1 && lot.participants.length === 1)  && !this.currentOrganized.done_negotiations) {
                return 'Բանակցություններ (ոչ պարտադիր)'
            }
            return `Կայացած ${this.currentOrganized.is_with_condition ? '(15-րդ հոդվածի 6-րդ մաս)' : ''}`
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
    font-family: GHEA grapalat;
}
</style>