<template>
    <div id="commandment-file" ref="contract"
        style="line-height: 2; width: 100%">
        <section slot="pdf-content" contenteditable="true">
            <div class="col-md-12">
                <div class="info-block">
                    <h6 style="text-align: center; font-weight: 700; margin-top: 2rem">ՊԵՏՈՒԹՅԱՆ  ԿԱՐԻՔՆԵՐԻ ՀԱՄԱՐ <editor-input type="text" inputName="work_type" ref="work_type" v-model="$v.inputs.work_type.$model" />  ԿԱՏԱՐՄԱՆ ՊԵՏԱԿԱՆ  ԳՆՄԱՆ  ՊԱՅՄԱՆԱԳԻՐ</h6>
                    <h6 style="text-align: center; font-weight: 700">N <span style="color: rgb(17, 85, 204);" class="contract-code"> «{{ currentOrganized.code }}»</span></h6>
                    <table style="width: 100%; border: none !important">
                        <tbody>
                            <tr>
                                <td style="border:none !important;" class="ft-11">
                                    <div style="padding: 0 !important; text-align: left">
                                        <h6> <span style="color: rgb(17, 85, 204);">{{ me.organisation[0].translations.city.hy }}</span></h6>
                                    </div>
                                </td>
                                <td  style="border:none !important;" class="ft-11">
                                    <div style="padding: 0 !important; text-align: right">
                                        <h6><span style="color: rgb(17, 85, 204);" class="sign-date">__.__.____</span>թ.</h6>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <div style="text-align: justify">
                        <span style="color: rgb(17, 85, 204);">« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</span>-ը, ի դեմս
                        {{ me.organisation[0].translations.director_position.hy }} <span style="color: rgb(17, 85, 204);">{{ me.organisation[0].translations.director_name.hy }}</span>-ի, որը գործում է 
                        <span style="color: rgb(17, 85, 204);">« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</span>
                        կանոնադրության հիման վրա (այսուհետ՝ Պատվիրատու), մի կողմից, և  
                        <span class="winner-name">_______</span>-ն, ի դեմս տնօրեն<span class="winner-director">_______</span>ի, 
                        որը գործում է <span class="winner-name">_______</span> կանոնադրության հիման վրա (այսուհետ՝ Կատարող), մյուս կողմից,
                        կնքեցին սույն պայմանագիրը հետևյալի մասին։
                    </div>
                    <br>
                </div>
                <div style="font-weight: 700; text-align: center;">1. ՊԱՅՄԱՆԱԳՐԻ ԱՌԱՐԿԱՆ</div>
                <br>
                <div class="info-block">
                    <div style="text-align: justify">
                        <span style="margin-left: 25px;"/>1.1 Պատվիրատուն հանձնարարում է, իսկ Կատարողը ստանձնում է 
                        <editor-input type="text" inputName="work_names" ref="work_names" v-model="$v.inputs.work_names.$model" />
                        աշխատանքների  կատարման պարտավորությունը (այսուհետ` աշխատանք)` համաձայն սույն պայմանագրի (այսուհետ` պայմանագիր) անբաժանելի մասը կազմող N 1 հավելվածով սահմանված Տեխնիկական բնութագիր-գնման ժամանակացույցի պահանջների։
                        <br/><span style="margin-left: 25px;"/>1.2 Աշխատանքը կատարվում է պայմանագրի N 1 հավելվածով սահմանված Տեխնիկական բնութագիր-գնման ժամանակացույցին համապատասխան և սահմանված ժամկետներով։
                    </div>
                </div>
                <br>
                <div style="font-weight: 700; text-align: center;">2. ԿՈՂՄԵՐԻ ԻՐԱՎՈՒՆՔՆԵՐԸ ԵՎ ՊԱՐՏԱԿԱՆՈՒԹՅՈՒՆՆԵՐԸ</div>
                <br>
                <div class="info-block">
                    <div style="margin: 0; text-align: justify">
                        <span style="margin-left: 25px;"/><span style="font-weight: 700">2.1 Պատվիրատուն իրավունք ունի`</span>
                        <br/><span style="margin-left: 25px;"/>2.1.1 Ցանկացած ժամանակ ստուգել Կատարողի կողմից կատարվող աշխատանքի ընթացքը և որակը` առանց միջամտելու Կատարողի գործունեությանը.
                        <br/><span style="margin-left: 25px;"/>2.1.2 Եթե կատարվել է պայմանագրի N 1 հավելվածում նշված Տեխնիկական բնութագիր-գնման ժամանակացույցին չհամապատասխանող աշխատանք.
                        <br/><span style="margin-left: 25px;"/>ա) Չընդունել աշխատանքը՝ իր հայեցողությամբ սահմանելով անպատշաճ որակի աշխատանքը  պայմանագրին համապատասխանող աշխատանքով անհատույց փոխարինման ողջամիտ ժամկետ և պահանջել Կատարողից վճարելու պայմանագրի 5.2 կետով նախատեսված տուգանքը, ինչպես նաև 5.3 կետով նախատեսված տույժը.
                        <br/><span style="margin-left: 25px;"/>բ)   Հրաժարվել պայմանագիրը կատարելուց և պահանջել վերադարձնելու աշխատանքի համար վճարված գումարը և պահանջել Կատարողից վճարելու պայմանագրի 5.2 կետով նախատեսված տուգանքը.
                        <br/><span style="margin-left: 25px;"/>2.1.3 Միակողմանի լուծել պայմանագիրը, եթե Կատարողն էականորեն խախտել է պայմանագիրը։ Կատարողի կողմից պայմանագիրը խախտելն էական է համարվում, եթե՝
                        <br/><span style="margin-left: 25px;"/>ա) կատարված աշխատանքը չի համապատասխանում պայմանագրի N 1 հավելվածով սահմանված պահանջներին,
                        <br/><span style="margin-left: 25px;"/>բ) խախտվել է աշխատանքի կատարման ժամկետը
                    </div>
                    <div style="text-align: justify">
                        <span style="margin-left: 25px;"/><span style="font-weight: 700">2.2 Պատվիրատուն պարտավոր է`</span>
                        <br/><span style="margin-left: 25px;"/>2.2.1 Քննարկել և ընդունել Տեխնիկական բնութագիր-գնման ժամանակացույցին համապատասխան կատարված աշխատանքի արդյունքը, իսկ աշխատանքի արդյունքում թերություններ հայտնաբերելու դեպքերում` այդ մասին անհապաղ գրավոր հայտնել Կատարողին։
                        <br/><span style="margin-left: 25px;"/>2.2.2 Աշխատանքի արդյունքն ընդունելու դեպքում Կատարողին վճարել վերջինիս վճարման ենթակա գումարները, իսկ ժամկետի խախտման դեպքում` նաև պայմանագրի 5.5 կետով նախատեսված տույժը։
                    </div>
                    <div style="text-align: justify">
                        <span style="margin-left: 25px;"/><span style="font-weight: 700">2.3 Կատարողն իրավունք ունի`</span>
                        <br/><span style="margin-left: 25px;"/>2.3.1 Պատվիրատուից պահանջել վճարելու իրեն վճարման ենթակա գումարները, իսկ Պատվիրատուի կողմից պայմանագրի 4.2 կետում նշված ժամկետի խախտման դեպքում նաև պայմանագրի 5.5 կետով նախատեսված տույժը։
                    </div>
                    <div style="text-align: justify">
                        <span style="margin-left: 25px;"/><span style="font-weight: 700">2.4 Կատարողը պարտավոր է`</span>
                        <br/><span style="margin-left: 25px;"/>2.4.1 Պայմանագրի N 1 հավելվածով սահմանված պայմաններով ապահովել աշխատանքի կատարումը` ղեկավարվելով գործող օրենսդրությամբ։
                        <br/><span style="margin-left: 25px;"/>2.4.2 Պայմանագրով նախատեսված դեպքերում վճարել պայմանագրի 5.2 և 5.3 կետերով նախատեսված տույժը և տուգանքը։
                        <br/><span style="margin-left: 25px;"/>2.4.3 Որակավորման և պայմանագրի կատարման ապահովման գործողության ընթացքում լուծարման կամ սնանկացման գործընթաց սկսելու դեպքում դրա մասին նախապես գրավոր տեղեկացնել Պատվիրատուին։	
                    </div>
                </div>
                <br>
                <div style="font-weight: 700; text-align: center;">3. ԱՇԽԱՏԱՆՔԻ ՀԱՆՁՆՄԱՆ ԵՎ ԸՆԴՈՒՆՄԱՆ ԿԱՐԳԸ</div>
                <br>
                <div class="info-block">
                    <div style="text-align: justify">
                        <template>
                            <div style="text-align: justify;">
                                <span style="margin-left: 25px;"/><span style="margin-bottom: 0; font-family: GHEA grapalat;">3.1 Կատարված աշխատանքը ընդունվում է Պատվիրատուի և Կատարողի միջև հանձնման-ընդունման արձանագրության ստորագրմամբ: Աշխատանքը Պատվիրատուին հանձնելու փաստը ֆիքսվում է Պատվիրատուի և Կատարողի միջև երկկողմ հաստատված փաստաթղթով՝ նշելով փաստաթղթի կազմման ամսաթիվը: Մինչև պայմանագրով աշխատանքի կատարման համար նախատեսված օրը ներառյալ Կատարողը Պատվիրատուին է տրամադրում իր կողմից ստորագրվածաշխատանքը Պատվիրատուին հանձնելու փաստը ֆիքսող փաստաթուղթը (հավելված N 3.1) և հանձնման-ընդունման արձանագրության 
                                <input type="text"
                                    v-model="$v.inputs.copyCount.$model"
                                    ref="copyCount"
                                    inputName="copyCount"
                                    class="editor-input"
                                    style="width: 30px;border-top: 0 !important; border-left: 0 !important; border-right: 0 !important;font-family: GHEA grapalat;  
                                    font-size: 13px;
                                    color: #303e67;
                                    border-bottom: 1px solid black" />
                                օրինակ (հավելված N 3): </span>
                                <br/><span style="margin-left: 25px;"/><span style="margin-bottom: 0;font-family: GHEA grapalat;">3.2 Հանձնման-ընդունման արձանագրությունն ստորագրվում է, եթե կատարված աշխատանքը համապատասխանում է պայմանագրի պայմաններին։ Հակառակ դեպքում պայմանագրի կամ դրա մի մասի կատարման արդյունքները չեն ընդունվում, հանձնման-ընդունման արձանագրություն չի ստորագրվում և Պատվիրատուն</span>
                                <br/><span style="margin-left: 25px;"/><span style="margin-bottom: 0; margin-left: 15px;font-family: GHEA grapalat;">ա) հարցի կարգավորման համար ձեռնարկում է նման իրավիճակի համար պայմանագրով նախատեսված միջոցները.</span>
                                <br/><span style="margin-left: 25px;"/><span style="margin-bottom: 0; margin-left: 15px;font-family: GHEA grapalat;">բ) Կատարողի նկատմամբ կիրառում է պայմանագրով նախատեսված պատասխանատվության միջոցներ։</span>
                                <br/><span style="margin-left: 25px;"/><span style="margin-bottom: 0;font-family: GHEA grapalat;">3.3 Պատվիրատուն հանձնման-ընդունման արձանագրությունը ստանալու օրվան հաջորդող աշխատանքային օրվանից հաշված 
                                <input type="text"
                                    class="editor-input"
                                    v-model="$v.inputs.daysCount.$model"
                                    ref="daysCount"
                                    inputName="daysCount"
                                    style="width: 40px;border-top: 0 !important; border-left: 0 !important; border-right: 0 !important; text-align: right;   
                                    font-size: 13px;
                                    color: #303e67;
                                    border-bottom: 1px solid black"
                                />
                                աշխատանքային օրվա ընթացքում Կատարողին է ներկայացնում իր կողմից ստորագրված հանձնման-ընդունման արձանագրության մեկ օրինակը կամ աշխատանքը չընդունելու պատճառաբանված մերժումը։</span>
                                <br/><span style="margin-left: 25px;"/><span style="margin-bottom: 0;font-family: GHEA grapalat;">3.4 Եթե պայմանագրի 3.3 կետով սահմանված ժամկետում Պատվիրատուն չի ընդունում կատարված աշխատանքը կամ չի մերժում դրա ընդունումը, ապա կատարված աշխատանքը համարվում է ընդունված և պայմանագրի 3.3 կետով սահմանված վերջնաժամկետին հաջորդող աշխատանքային օրը Պատվիրատուն Կատարողին է տրամադրում իր կողմից հաստատված հանձնման-ընդունման արձանագրությունը:</span>
                            </div>
                        </template>
                    </div>
                </div>
                <br>
                <div style="font-weight: 700; text-align: center;">4. ՊԱՅՄԱՆԱԳՐԻ ԳԻՆԸ</div>
                <br>
                <div class="info-block">
                    <div style="text-align: justify">
                        <span style="margin-left: 25px;"/>4.1.Պայմանագրով Կատարողի կատարման ենթակա աշխատանքի գինը կազմում է <span class="contract-price">_______</span> (<span class="contract-price-word">______________</span>) ՀՀ դրամ <span class="contract-det"></span>
                        <br/><span style="margin-left: 25px;"/>Գինը ներառում է Կատարողի կողմից իրականացվող բոլոր ծախսերը` այդ թվում հարկերը, տուրքերը և ՀՀ օրենդրությամբ սահմանված այլ վճարները
                        <span class="if-phys-person">, ընդ որում` հարկային պարտավորությունները (հարկեր և պարտադիր այլ վճարներ) վճարվում են հարկային գործակալի` Գնորդի կողմից</span>:
                        Աշխատանքի կատարման գինը կայուն է և Կատարողն իրավունք չունի պահանջել ավելացնելու, իսկ Պատվիրատուն նվազեցնելու այդ գինը։
                        <br/><span style="margin-left: 25px;"/>Ծառայության մատուցման գինը կայուն է և Կատարողն իրավունք չունի պահանջել ավելացնելու, իսկ Պատվիրատուն նվազեցնելու այդ գինը։
                        <template v-if="+currentOrganized.prepayment">
                            <span style="margin-left: 25px;"/> 4.1.1 Պայմանագրի գնից` մինչև {{ currentOrganized.prepayment_max }} ({{ currentOrganized.prepayment_max_text }}) ՀՀ դրամը, Պատվիրատուն փոխանցում է Կատարողի բանկային հաշվին` որպես կանխավճար։ Կանխավճարի մարումն իրականացվում է  հանձնման-ընդունման արձանագրությունների հիման վրա կատարվող վճարումներից նվազեցումներ (պահումներ) կատարելու ձևով։ Ընդ որում մինչև կանխավճարի ամբողջական մարումը, Կատարողին վճարումներ չեն կատարվում:
                        </template>
                        <br/><span style="margin-left: 25px;"/>4.2 Պատվիրատուն կատարված աշխատանքի դիմաց վճարում է ՀՀ դրամով անկանխիկ` դրամական միջոցները Կատարողի հաշվարկային հաշվին փոխանցելու միջոցով։ Դրամական միջոցների փոխանցումը կատարվում է հանձման-ընդունման արձանագրության հիման վրա` պայմանագրի վճարման  ժամանակացույցով (հավելված N 2) նախատեսված չափերով և ամիներին: Եթե արձանագրությունը կազմվում է տվյալ ամսվա 20-ից հետո և այդ ամսում վճարման ժամանակացույցով նախատեսված են ֆինանսական միջոցներ, ապա վճարումն իրականացվում է մինչև 30 աշխատանքային օրվա ընթացքում, բայց ոչ ուշ, քան մինչև տվյալ տարվա դեկտեմբերի 30-ը:
                        <br/><span style="margin-left: 25px;"/>Ընդ որում վճարում կատարելու նպատակով հանձնման-ընդունման արձանագրությունն ստորագրվելու օրվանից հետո 3 աշխատանքային օրվա ընթացքում Պատվիրատուն վճարման հանձնարարագիրը և հանձնման-ընդունման արձանագրության պատճենը մուտքագրում է լիազորված մարմնի գանձապետական համակարգ, իսկ սահմանված կարգի համաձայն ներկայացված փաստաթղթերի հիման վրա լիազորված մարմինը տվյալ վճարումը կատարում է հանձնման-ընդունման արձանագրությունը գանձապետական համակարգ մուտքագրված լինելու դեպքում՝ սույն պայմանագրի վճարման ժամանակացույցով սահմանված ժամկետներում, հինգ աշխատանքային օրվա ընթացքում: 
                        <br/><span style="margin-left: 25px;"/>Ընդ որում գնման դիմաց վճարումն իրականացվում է սույն պայմանագրի վճարման ժամանակացույցով սահմանված ժամկետում, հինգ աշխատանքային օրվա ընթացքում: 
                    </div>
                </div>
                <br>
                <div style="font-weight: 700; text-align: center">5. ԿՈՂՄԵՐԻ ՊԱՏԱՍԽԱՆԱՏՎՈՒԹՅՈՒՆԸ</div>
                <br>
                <div class="info-block">
                    <div style="text-align: justify">
                        <span style="margin-left: 25px;"/> 5.1 Կատարողը պատասխանատվություն է կրում աշխատանքի կատարման` սույն պայմանագրի պահանջների պահպանման համար։
                        <template v-if="currentOrganized.is_with_condition">
                            <br/><span style="margin-left: 25px;"/>5.2 Պայմանագրի N 1 հավելվածում նշված տեխնիկական բնութագրին չհամապատասխանող աշխատանք կատարելու յուրաքանչյուր դեպքում Կատարողից գանձվում է տուգանք` պայմանագրի 4.1 կետում նախատեսված գումարի 0,5 (զրո ամբողջ հինգ տասնորդական) տոկոսի չափով: Ընդ որում տուգանքը հաշվարկվում է նաև աշխատանքը սույն պայմանագրով սահմանված ժամկետում կատարելու, սակայն պատվիրատուի կողմից այդ չընդունվելու դեպքում: 
                        </template>
                        <br/><span style="margin-left: 25px;"/>5.3 Պայմանագրով նախատեսված աշխատանքի կատարման ժամկետը խախտելու դեպքում Կատարողից յուրաքանչյուր ուշացված աշխատանքային օրվա համար գանձվում է տույժ` կատարման ենթակա, սակայն չկատարված աշխատանքի  գնի  0,05 (զրո ամբողջ հինգ հարյուրերրորդական) տոկոսի չափով։
                        <br/><span style="margin-left: 25px;"/>5.4 Պայմանագրի 5.2 և 5.3 կետերով նախատեսված տուգանքը և տույժը հաշվարկվում և հաշվանցվում են աշխատանքը կատարելու արդյունքում Կատարողին վճարման ենթակա գումարների հետ։
                        <br/><span style="margin-left: 25px;"/>5.5 Պատվիրատուի կողմից պայմանագրի 4.2 կետով նախատեսված ժամկետի խախտման դեպքում Պատվիրատուի նկատմամբ յուրաքանչյուր ուշացված աշխատանքային օրվա համար հաշվարկվում է տույժ` վճարման ենթակա, սակայն չվճարված գումարի 0,05 (զրո ամբողջ հինգ հարյուրերրորդական) տոկոսի չափով։
                        <br/><span style="margin-left: 25px;"/>5.6 Պայմանագրով չնախատեսված դեպքերում կողմերն իրենց պարտավորությունները չկատարելու կամ ոչ պատշաճ կատարելու համար պատասխանատվության են ենթարկվում ՀՀ օրենսդրությամբ սահմանված կարգով։
                        <br/><span style="margin-left: 25px;"/>5.7 Տույժերի և (կամ) տուգանքի վճարումը Կողմերին չի ազատում իրենց պայմանագրային պարտավորությունները լրիվ կատարելուց։
                    </div>
                </div>
                <br>
                <div style="font-weight: 700; text-align: center;">6. ԱՆՀԱՂԹԱՀԱՐԵԼԻ ՈՒԺԻ ԱԶԴԵՑՈՒԹՅՈՒՆ (ՖՈՐՍ-ՄԱԺՈՐ)</div>
                <br>
                <div class="info-block">
                    <div style="text-align: justify">
                        <span style="margin-left: 25px;"/>Սույն պայմանագրով և սույն պայմանագրի հիման վրա կնքված Համաձայնագրերով պարտավորություններն ամբողջությամբ կամ մասնակիորեն չկատարելու համար կողմերն ազատվում են պատասխանատվությունից, եթե դա եղել է անհաղթահարելի ուժի ազդեցության հետևանքով, որը ծագել է սույն պայմանագիրը կնքելուց հետո, և որը կողմերը չէին կարող կանխատեսել կամ կանխարգելել։ Այդպիսի իրավիճակներ են երկրաշարժը, ջրհեղեղը, հրդեհը, պատերազմը, ռազմական և արտակարգ դրություն հայտարարելը, քաղաքական հուզումները, գործադուլները, հաղորդակցության միջոցների աշխատանքի դադարեցումը, պետական մարմինների ակտերը և այլն, որոնք անհնարին են դարձնում սույն պայմանագրով պարտավորությունների կատարումը։ Եթե արտակարգ ուժի ազդեցությունը շարունակվում է 3 (երեք) ամսից ավելի, ապա կողմերից յուրաքանչյուրն իրավունք ունի լուծել պայմանագիրը՝ այդ մասին նախապես տեղյակ պահելով մյուս կողմին։
                    </div>
                </div>
                <br>
                <div style="font-weight: 700; text-align: center;">7. ԱՅԼ ՊԱՅՄԱՆՆԵՐ</div>
                <br>
                <div class="info-block">
                    <div style="text-align: justify">
                        <span style="margin-left: 25px;"/>7.1 Սույն պայմանագիրն ուժի մեջ է մտնում կողմերի ստորագրման պահից և գործում է մինչև կողմերի սույն պայմանագրով ստանձնած պարտավորությունների ողջ ծավալով կատարումը։
                        <template v-if="currentOrganized.rights_responsibilities_fulfillment">
                            <br/><span style="margin-left: 25px;"/>Պայմանագրով նախատեսված կողմերի իրավունքների և պարտականությունների կատարման պայման է հանդիսանում պայմանագիրը ՀՀ ֆինանսների նախարարության կողմից հաշվառված լինելու հանգամանքը:
                        </template>
                        <br/><span style="margin-left: 25px;"/>7.2 Պայմանագրից ծագած` կողմի վճարային պարտավորությունը չի կարող դադարել այլ պայմանագրից ծագած՝ հակընդդեմ պարտավորության հաշվանցով, առանց կողմերի գրավոր և կնիքով հաստատված համաձայնության։ Պայմանագրից ծագած պահանջի իրավունքը չի կարող փոխանցվել այլ անձի, առանց պարտապան կողմի գրավոր համաձայնության։
                        <br/><span style="margin-left: 25px;"/>7.3 Այն դեպքում, երբ օրենքով նախատեսված կարգով օրենքի պահանջների կատարման նկատմամբ հսկողության կամ վերահսկողության կամ բողոքների քննության արդյունքում արձանագրվում է, որ գնման գործընթացում, մինչև պայմանագրի կնքումը, Կատարողը ներկայացրել է կեղծ փաստաթղթեր (տեղեկություններ և տվյալներ), կամ վերջինիս ընտրված մասնակից ճանաչելու մասին որոշումը չի համապատասխանում Հայաստանի Հանրապետության օրենսդրությանը, ապա այդ հիմքերն ի հայտ գալուց հետո Պատվիրատուն միակողմանիորեն լուծում է պայմանագիրը, եթե արձանագրված խախտումները մինչև պայմանագրի կնքումը հայտնի լինելու դեպքում գնումների մասին Հայաստանի Հանրապետության օրենսդրության համաձայն հիմք կհանդիսանային պայմանագիրը չկնքելու համար։ Ընդ որում, Պատվիրատուն չի կրում պայմանագրի միակողմանի լուծման հետևանքով Կատարողի համար առաջացող վնասների կամ բաց թողնված օգուտի ռիսկը, իսկ վերջինս պարտավոր է Հայաստանի Հանրապետության օրենքով սահմանված կարգով փոխհատուցել իր մեղքով Պատվիրատուի կրած վնասներն այն ծավալով, որի մասով պայմանագիրը լուծվել է։
                        <br/><span style="margin-left: 25px;"/>7.4 Պայմանագրի հետ կապված վեճերը ենթակա են քննության Հայաստանի Հանրապետության դատարաններում։
                        <br/><span style="margin-left: 25px;"/>7.5 Պայմանագրում փոփոխություններ և լրացումներ կարող են կատարվել միայն Կողմերի փոխադարձ համաձայնությամբ՝ համաձայնագիր կնքելու միջոցով, որը կհանդիսանա պայմանագրի անբաժանելի մասը։
                        <br/><span style="margin-left: 25px;"/>Արգելվում է պայմանագրում, իսկ եթե պայմանագրի գինը գործոնային է, ապա նաև այդ պայմանագրին կից հաջորդող յուրաքանչյուր տարիներին կնքված համաձայնագրում կատարել այնպիսի փոփոխություններ, որոնք հանգեցնում են գնվող աշխատանքի ծավալների կամ ձեռք բերվող աշխատանքի միավորի գնի  կամ պայմանագրի գնի արհեստական փոփոխման։
                        <br/><span style="margin-left: 25px;"/>Պայմանագրի կողմերից անկախ գործոնների ազդեցությամբ պայմանագրի փոփոխման յուրաքանչյուր դեպք սահմանում է Հայաստանի Հանրապետության կառավարությունը։
                        <div class="is-agency-agreement" style="text-align: justify;">
                            <span style="color: rgb(17, 85, 204);">
                                <span style="margin-left: 25px;"/>7.6 Եթե պայմանագիրն  իրականացվում է ենթակապալի պայմանագիր կնքելու միջոցով.
                            </span>
                            <p style="color: rgb(17, 85, 204);margin-bottom: 0;margin-left: 15px;">
                                <span style="margin-left: 25px;"/>1) Կատարողը պատասխանատվություն է կրում ենթակապալառուի պարտավորությունների չկատարման կամ ոչ պատշաճ կատարման համար.
                            </p>
                            <p style="color: rgb(17, 85, 204);margin-bottom: 0;margin-left: 15px;">
                                <span style="margin-left: 25px;"/>2) պայմանագրի կատարման ընթացքում ենթակապալառուի փոփոխման դեպքում Կատարողը գրավոր տեղեկացնում է Պատվիրատուին՝ տրամադրելով ենթակապալի պայմանագրի պատճենը և դրա կողմ հանդիսացող անձի տվյալները՝ փոփոխությունը կատարվելու օրվանից հինգ աշխատանքային օրվա ընթացքում:
                            </p>
                            <p style="color: rgb(17, 85, 204);margin-bottom: 0;">
                                <span style="margin-left: 25px;"/>7.7 Եթե պայմանագիրն  իրականացվում է համատեղ գործունեության (կոնսորցիումի) պայմանագիր կնքելու միջոցով, ապա այդ պայմանագրի մասնակիցները կրում են համատեղ և համապարտ պատասխանատվություն: Ընդ որում, կոնսորցիումի անդամի կոնսորցիումից դուրս գալու դեպքում պայմանագիրը միակողմանիորեն լուծվում է և կոնսորցիումի անդամների նկատմամբ կիրառվում են պայմանագրով նախատեսված պատասխանատվության միջոցները:
                            </p>
                        </div>
                        <span style="margin-left: 25px;"/>7.8 Աշխատանքի կատարման ժամկետը կարող է երկարաձգվել մինչև պայմանագրով այդ ժամկետը լրանալը` Կատարողի առաջարկության առկայության դեպքում` պայմանով, որ Պատվիրատուի մոտ չի վերացել աշխատանքի օգտագործման պահանջը, իսկ Կատարողի առաջարկությունը ներկայացվել է ոչ ուշ, քան պայմանագրով ի սկզբանե աշխատանքների կատարման համար սահմանված ժամկետը լրանալուց առնվազն 5 օրացուցային օր առաջ: Ընդ որում սույն կետով սահմանված դեպքում աշխատանքի կատարման ժամկետը կարող է երկարաձգվել մեկ անգամ մինչև 30 օրացուցային օրով, բայց ոչ ավել քան պայմանագրով սահմանված ժամկետն է:
                        <br/><span style="margin-left: 25px;"/>7.9 Պայմանագրի պատշաճ կատարման պայմաններում կողմերի (Կատարող կամ Պատվիրատու) օգուտները (խնայողություններ) կամ կրած վնասները տվյալ կողմի օգուտը կամ կրած վնասն են։
                        <br/><span style="margin-left: 25px;"/>Պայմանագրի կողմերի` երրորդ անձանց նկատմամբ պարտավորությունները՝ ներառյալ պայմանագրի կատարման շրջանակում Կատարողի կնքած այլ գործարքները և դրանցից բխող պարտավորությունները, դուրս են պայմանագրի կարգավորման դաշտից և չեն կարող ազդել պայմանագրի կատարման արդյունքն ընդունելու վրա։ Այդ գործարքների և դրանցից բխող պարտավորությունների կատարման հետ կապված հարաբերությունները կարգավորվում են այդ գործարքների հետ կապված հարաբերությունները կարգավորող նորմերով, և դրանց համար պատասխանատու է Կատարողը։
                        <br/><span style="margin-left: 25px;"/>7.10 Պայմանագիրը չի կարող փոփոխվել կողմերի պարտա­վորու­թյունների մասնակի չկատարման հետևանքով կամ ամբողջությամբ լուծվել կողմերի փոխադարձ համաձայնությամբ՝ բացառությամբ` Հայաստանի Հանրապետության օրենսդրությամբ սահմանված կարգով աշխատանքի կատարման համար անհրաժեշտ ֆինանսական հատկացումների նվազեցման դեպքերի: Ընդ որում, պայմանագրի կողմերի` պարտավորությունների մասնակի չկատարման կամ ամբողջությամբ լուծման կողմերի փոխադարձ համաձայնությունն անհրաժեշտ է ձեռք բերել նախքան Հայաստանի Հանրապետության օրենսդրությամբ սահմանված կարգով աշխատանքի կատարման համար անհրաժեշտ ֆինանսական հատկացումների նվազեցումը:
                        <br/><span style="margin-left: 25px;"/>7.11 Կատարողի կողմից ստանձնած պարտավորությունները չկատա­րելու կամ ոչ պատշաճ կատարելու հիմքով պայմանագիրն ամբողջությամբ կամ մասնակի միակողմանի լուծելու մասին ծանուցումը Պատվիրատուն հրապարակում է www.procurement.am հասցեով գործող ինտերնետային կայքի «Պայմանագրերը միակողմանի լուծելու մասին ծանուցումներ» բաժնում` նշելով հրապարակման ամսաթիվը: Կատարողը, պայմանագիրը միակողմանի լուծելու վերաբերյալ, համարվում է պատշաճ ծանուցված` ծանուցումը, սույն կետով սահմանված հրապարակվելուն հաջորդող օրվանից: Պայմանագիրն ամբողջությամբ կամ մասնակի միակողմանի լուծելու մասին ծանուցումը տեղեկագրում հրապարակվելու օրը Պատվիրատուն այն ուղարկվում է նաև Կատարողի էլեկտրոնային փոստին:7.12 Պայմանագրի կապակցությամբ ծագած վեճերը լուծվում են բանակցությունների միջոցով։ Համաձայնություն ձեռք չբերելու դեպքում վեճերը լուծվում են ՀՀ դատարաններում։
                        <br/><span style="margin-left: 25px;"/>
                        7.13 Պայմանագիրը կազմված է <span class="pages-count">__</span> էջից, կնքվում է երկու օրինակից, որոնք ունեն հավասարազոր իրավաբանական ուժ։ Սույն պայմանագրի N 1, N 2, N 3 և N 3.1 հավելվածները հանդիսանում են պայմանագրի անբաժանելի մասը, յուրաքանչյուր կողմին տրվում է պայմանագրի մեկ օրինակ։
                        <br/><span style="margin-left: 25px;"/>7.14 Սույն պայմանագրի նկատմամբ կիրառվում է Հայաստանի Հանրապետության իրավունքը։
                        <template v-if="currentOrganized.is_with_condition && currentOrganized.rows_total_price < 25000000" style="text-align: left">
                            <span style="color: rgb(17, 85, 204);">
                                <br/><span style="margin-left: 25px;"/>7.15 Պայմանագրով նախատեսված ծառայությունների մատուցումն իրականացվում է այդ նպատակով ֆինանսական միջոցների առկայության և դրա հիման վրա կողմերի միջև համապատասխան համաձայնագրի կնքման միջոցով: Պայմանագիրը լուծվում է, եթե այն կնքելու օրվան հաջորդող վեց ամսվա ընթացքում այդ նպատակով պայմանագրի կատարման համար ֆինանսական միջոցներ չեն նախատեսվում: Ընդ որում, Կատարողը համաձայնագիրը կնքում և Պատվիրատուին ներկայացնում է համաձայնագիր կնքելու ծանուցումը ստանալու օրվանից տասնհինգ աշխատանքային օրվա ընթացքում։ Հակառակ դեպքում պայմանագիրը Պատվիրատուի կողմից միակողմանիորեն լուծվում է:
                            </span>
                        </template>
                        <template v-else-if="currentOrganized.is_with_condition" style="text-align: left">
                            <span style="color: rgb(17, 85, 204);">
                                <br/><span style="margin-left: 25px;"/>7.15 Պայմանագրով նախատեսված աշխատանքների կատարումն իրականացվում է այդ նպատակով ֆինանսական միջոցների առկայության և դրա հիման վրա կողմերի միջև համապատասխան համաձայնագրի կնքման միջոցով: Պայմանագիրը լուծվում է, եթե այն կնքելու օրվան հաջորդող վեց ամսվա ընթացքում այդ նպատակով պայմանագրի կատարման համար ֆինանսական միջոցներ չեն նախատեսվում: Եթե պայմանագրի կատարման համար հատկացված ֆինանսական միջոցների չափը գերազանցում է գնումների բազային միավորի քսանհինգապատիկը, ապա Պատվիրատուի կողմից համաձայնագիր կկնքվի, եթե Կատարողի կողմից տուժանքի ձևով ներկայացված որակավորման և պայմանագրի ապահովումները` նախատեսված ֆինանսական միջոցների չափով, փոխարինվում են  երաշխիքով կամ կանխիկ փողով` հաշվի առնելով ՀՀ կառավարության 2017 թվականի մայիսի 4-ի N 526-Ն որոշման N 1 հավելվածի 32-րդ կետի 17-րդ ենթակետի «բ» պարբերության պահանջները: Ընդ որում, Կատարողը համաձայնագիրը կնքում, իսկ տուժանքի ձևով ներկայացված որակավորման և պայմանագրի ապահովումների փոխարինման դեպքում նաև նոր ապահովումները Պատվիրատուին ներկայացնում է համաձայնագիր կնքելու ծանուցումը ստանալու օրվանից տասնհինգ աշխատանքային օրվա ընթացքում։ Հակառակ դեպքում պայմանագիրը Պատվիրատուի կողմից միակողմանիորեն լուծվում է:
                            </span>
                        </template>
                    </div>
                </div>
		        <div class="html2pdf__page-break"/>
                <div class="info-block">
                    <div style="margin-top: 3rem; text-align: center; font-weight: 700">
                        8. ԿՈՂՄԵՐԻ ՀԱՍՑԵՆԵՐԸ, ԲԱՆԿԱՅԻՆ ՎԱՎԵՐԱՊԱՅՄԱՆՆԵՐԸ ԵՎ ՍՏՈՐԱԳՐՈՒԹՅՈՒՆՆԵՐԸ
                    </div>
                    <table style="border: 0 !important; width: 100%;">
                        <tbody>
                            <tr style="display: flex;">
                                <td style="border: 0 !important; width: 50%; display: flex; justify-content: center;">
                                    <div>
                                        <h6 class="ft-11" style="font-weight: 700">ՊԱՏՎԻՐԱՏՈՒ</h6>
                                        <p class="ft-11">« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</p>
                                        <p class="ft-11" v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                                        <p class="ft-11" v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                                        <p class="ft-11">Բանկ՝ {{ me.organisation[0].translations.bank_name.hy }}</p>
                                        <p class="ft-11">Հ/Հ {{ me.organisation[0].bank_account }} </p>
                                        <p class="ft-11">ՀՎՀՀ {{ me.organisation[0].tin }} </p>
                                        <p class="ft-11">{{ me.organisation[0].translations.director_position.hy }}՝ {{ me.organisation[0].translations.director_name.hy }}</p>
                                        <p class="ft-11">______________________</p>
                                        <p>ստորագրություն</p>
                                    </div>
                                </td>
                                <td style="border: 0 !important; width: 50%; display: flex; justify-content: center;">
                                    <div>
                                        <h6 class="ft-11" style="font-weight: 700">ԿԱՏԱՐՈՂ</h6>
                                        <p class="ft-11"><span class="winner-name">______________</span></p>
                                        <p class="ft-11"><span class="winner-address">_____________________</span></p>
                                        <p class="ft-11">Բանկ՝<span class="winner-bank">___________</span></p>
                                        <p class="ft-11">Հ/Հ <span class="winner-bank_account">_____________________</span></p>
                                        <p class="ft-11">ՀՎՀՀ <span class="winner-tin">______________</span></p>
                                        <p class="ft-11">Տնօրեն՝ <span class="winner-director">_____________________</span></p>
                                        <p class="ft-11">______________________</p>
                                        <p>ստորագրություն</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h6 style="text-align: center">
                        Անհրաժեշտության դեպքում պայմանագրի նախագծում կարող են ներառվել ՀՀ օրենսդրությանը չհակասող դրույթներ։
                    </h6>
                </div>
		        <div class="html2pdf__page-break"/>
                <pagebreak/> 
                <br class="page-break"/>
                <div class="info-block">
                    <div style="text-align: right; font-weight: 700">Հավելված N1 </div>
                    <div style="text-align: right; font-weight: 700"><span class="sign-date">__.__.____</span>թ կնքված</div>
                    <div style="text-align: right; font-weight: 700"><span class="contract-code" style="color: rgb(17, 85, 204);"></span> ծածկագրով գնման պայմանագրի</div>
                    <h6 style="text-align: center">ՏԵԽՆԻԿԱԿԱՆ ԲՆՈՒԹԱԳԻՐ - ԳՆՄԱՆ ԺԱՄԱՆԱԿԱՑՈՒՅՑ*</h6>
                    <p style="text-align: right">ՀՀ դրամ <span style="margin-left: 25px;"/></p> 
                    <table style="font-size: 10px;
                                width: 100%;
                                table-layout: fixed;
                                border-collapse: collapse;
                                page-break-inside: avoid;
                                border: 1px solid black;
                                text-align: center;" class="ft-5">
                        <tbody>
                            <tr>
                                <th colspan="9" style="border: 1px solid black;
                                                       border-collapse: collapse;">Աշխատանքի</th>
                            </tr>
                            <tr>
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">Չ/հ</th>
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">CPV կոդ</th>
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">տեխնիկական բնութագիրը </th>
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">չափման միավորը</th>
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">միավոր գինը/ՀՀ դրամ</th>
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">ընդհանուր գինը/ՀՀ դրամ</th>
                                <th rowspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">ընդհանուր քանակը</th>
                                <th colspan="2" style="border: 1px solid black;
                                                       border-collapse: collapse;">կատարման</th>	
                            </tr>
                            <tr>	
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">հասցեն</th>
                                <th style="border: 1px solid black;
                                           border-collapse: collapse;">Ժամկետը</th>
                            </tr>
                        </tbody>
                        <tbody id="works-table-body" class="purchase-schedule">
                            <tr v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="rowIndex">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ row.view_id }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ row.procurement_plan.cpv.code }}{{ row.procurement_plan.cpv_drop && '/' }}{{ row.procurement_plan.cpv_drop }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{row.procurement_plan.specifications.description.hy}}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ row.procurement_plan.unit }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;"></td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;"></td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ row.count }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;"
                                    v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">
                                
                                    {{ me.organisation[0].translations.city.hy }}
                                    {{ me.organisation[0].translations.address.hy }}
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;" v-else>
                                    {{ me.organisation[0].translations.region.hy }}

                                    

                                    {{ me.organisation[0].translations.city.hy }}
                                    {{ me.organisation[0].translations.address.hy }}
                                </td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;"></td>
                            </tr>
                        </tbody>
                    </table>
                    <h6 style="text-align: left; margin-top: 3rem">
                        * աշխատանքի կատարման վերջնաժամկետը չի կարող ավել լինել, քան տվյալ տարվա դեկտեմբերի 25-ը
                    </h6>
                    <table style="border: 0 !important; width: 100%;">
                        <tbody>
                            <tr style="display: flex;">
                                <td style="border: 0 !important; width: 50%; display: flex; justify-content: center;">
                                    <div>
                                        <h6 class="ft-11" style="font-weight: 700">ՊԱՏՎԻՐԱՏՈՒ</h6>
                                        <p class="ft-11">« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</p>
                                        <p class="ft-11" v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                                        <p class="ft-11" v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                                        <p class="ft-11">Բանկ՝ {{ me.organisation[0].translations.bank_name.hy }}</p>
                                        <p class="ft-11">Հ/Հ {{ me.organisation[0].bank_account }} </p>
                                        <p class="ft-11">ՀՎՀՀ {{ me.organisation[0].tin }} </p>
                                        <p class="ft-11">{{ me.organisation[0].translations.director_position.hy }}՝ {{ me.organisation[0].translations.director_name.hy }}</p>
                                        <p class="ft-11">______________________</p>
                                        <p>ստորագրություն</p>
                                    </div>
                                </td>
                                <td style="border: 0 !important; width: 50%; display: flex; justify-content: center;">
                                    <div>
                                        <h6 class="ft-11" style="font-weight: 700">ԿԱՏԱՐՈՂ</h6>
                                        <p class="ft-11"><span class="winner-name">______________</span></p>
                                        <p class="ft-11"><span class="winner-address">_____________________</span></p>
                                        <p class="ft-11">Բանկ՝<span class="winner-bank">___________</span></p>
                                        <p class="ft-11">Հ/Հ <span class="winner-bank_account">_____________________</span></p>
                                        <p class="ft-11">ՀՎՀՀ <span class="winner-tin">______________</span></p>
                                        <p class="ft-11">Տնօրեն՝ <span class="winner-director">_____________________</span></p>
                                        <p class="ft-11">______________________</p>
                                        <p>ստորագրություն</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
		        <div class="html2pdf__page-break"/>
                <pagebreak/> 
                <br class="page-break"/>
                <div class="info-block">
                    <div style="text-align: right; font-weight: 700">Հավելված N2</div>
                    <div style="text-align: right; font-weight: 700"><span class="sign-date">__.__.____</span>թ կնքված</div>
                    <div style="text-align: right; font-weight: 700"><span class="contract-code" style="color: rgb(17, 85, 204);"></span> ծածկագրով գնման պայմանագրի</div>
                    <br class="page-break"/>
                    <h6 style="margin-top: 3rem; text-align: center; font-weight: 700">
                        ՎՃԱՐՄԱՆ ԺԱՄԱՆԱԿԱՑՈՒՅՑ*
                    </h6>
                    <p style="text-align: right">ՀՀ դրամ <span style="margin-left: 25px;"/></p>
                    <table style="font-size: 10px; 
                                width: 100%;
                                table-layout: fixed;
                                border-collapse: collapse;
                                page-break-inside: avoid;
                                border: 1px solid black;
                                text-align: center;" class="ft-5"> 
                        <tbody><tr>
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
                                       border-collapse: collapse;
                                       writing-mode: vertical-lr;
                                       text-align: center;"><span style="color: rgb(17, 85, 204);">հունիս</span></td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;
                                       writing-mode: vertical-lr;
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
                                       text-align: center;">{{ row.view_id }}</td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;
                                       text-align: center;">{{ row.procurement_plan.cpv.code }}{{ row.procurement_plan.cpv_drop && '/' }}{{ row.procurement_plan.cpv_drop }}</td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;
                                       text-align: center;">{{ row.procurement_plan.cpv.name }}</td>
                            <template v-if="row.organize_row_percent">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_1) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_2) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_3) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_4) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_5) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_6) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_7) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_8) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_9) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_10) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_11) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ calculateMonthPrice(row.procurement_plan.details[0].unit_amount * row.count, row.organize_row_percent.month_12) || '-' }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ row.procurement_plan.details[0].unit_amount * row.count }}</td>
                            </template>
                            <template v-else>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">-</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ row.procurement_plan.details[0].unit_amount * row.count }}</td>
                            </template>
                        </tr>
                    </tbody>
                </table>        
                <h6 style="text-align: left;">
                    * Վճարման ենթակա գումարները ներկայացվում են աճողական կարգով: 
                </h6>
                <table style="border: 0 !important; width: 100%;">
                    <tbody>
                        <tr style="display: flex;">
                            <td style="border: 0 !important; width: 50%; display: flex; justify-content: center;">
                                <div>
                                    <h6 class="ft-11" style="font-weight: 700">ՊԱՏՎԻՐԱՏՈՒ</h6>
                                    <p class="ft-11">« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</p>
                                    <p class="ft-11" v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                                    <p class="ft-11" v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                                    <p class="ft-11">Բանկ՝ {{ me.organisation[0].translations.bank_name.hy }}</p>
                                    <p class="ft-11">Հ/Հ {{ me.organisation[0].bank_account }} </p>
                                    <p class="ft-11">ՀՎՀՀ {{ me.organisation[0].tin }} </p>
                                    <p class="ft-11">{{ me.organisation[0].translations.director_position.hy }}՝ {{ me.organisation[0].translations.director_name.hy }}</p>
                                    <p class="ft-11">______________________</p>
                                    <p>ստորագրություն</p>
                                </div>
                            </td>
                            <td style="border: 0 !important; width: 50%; display: flex; justify-content: center;">
                                <div>
                                    <h6 class="ft-11" style="font-weight: 700">ԿԱՏԱՐՈՂ</h6>
                                    <p class="ft-11"><span class="winner-name">______________</span></p>
                                    <p class="ft-11"><span class="winner-address">_____________________</span></p>
                                    <p class="ft-11">Բանկ՝<span class="winner-bank">___________</span></p>
                                    <p class="ft-11">Հ/Հ <span class="winner-bank_account">_____________________</span></p>
                                    <p class="ft-11">ՀՎՀՀ <span class="winner-tin">______________</span></p>
                                    <p class="ft-11">Տնօրեն՝ <span class="winner-director">_____________________</span></p>
                                    <p class="ft-11">______________________</p>
                                    <p>ստորագրություն</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
		        <div class="html2pdf__page-break"/>
                <pagebreak/> 
                <br class="page-break"/>
                <div class="info-block">
                    <div style="text-align: right; font-weight: 700">Հավելված N3</div>
                    <div style="text-align: right; font-weight: 700"><span class="sign-date">__.__.____</span>թ կնքված</div>
                    <div style="text-align: right; font-weight: 700"><span class="contract-code" style="color: rgb(17, 85, 204);"></span> ծածկագրով գնման պայմանագրի</div>
                    <br>
                    <table style="width: 100%; border: none !important">
                        <tbody>
                            <tr style="display: flex;">
                                <td style="border:none !important;width: 50%; display:flex; justify-content: center;">
                                    <div>
                                        <p class="ft-11" style="font-weight: 700">Պայմանագրի կողմ </p>
                                        <p class="ft-11">____________________ </p>
                                        <p class="ft-11">____________________ </p>
                                        <p class="ft-11">գտնվելու վայրը__________</p>
                                        <p class="ft-11">հհ __________</p>
                                        <p class="ft-11">____________________ </p>
                                        <p class="ft-11">հվհհ _______________________ </p>
                                    </div>
                                </td>
                                <td style="border:none !important;width: 50%; display:flex; justify-content: center;">
                                    <div>
                                        <p class="ft-11" style="font-weight: 700">Պատվիրատու</p>
                                        <p class="ft-11">____________________ </p>
                                        <p class="ft-11">____________________ </p>
                                        <p class="ft-11">գտնվելու վայրը__________</p>
                                        <p class="ft-11">հհ __________</p>
                                        <p class="ft-11">____________________ </p>
                                        <p class="ft-11">հվհհ _______________________ </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
		        <div class="html2pdf__page-break"/>
                <div class="info-block">
                    <h6 style="text-align: center; margin-top: 3rem">
                        ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ N
                    </h6>
                    <h6 style="text-align: center">
                        ՊԱՅՄԱՆԱԳՐԻ ԿԱՄ ԴՐԱ ՄԻ ՄԱՍԻ ԿԱՏԱՐՄԱՆ ԱՐԴՅՈՒՆՔՆԵՐԻ ՀԱՆՁՆՄԱՆ-ԸՆԴՈՒՆՄԱՆ
                    </h6>
                    <p style="text-align: left;">« &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     » «  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        	»  20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	թ.</p>
                    <h6 style="text-align: center">
                        Պայմանագրի &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/այսուհետ`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Պայմանագիր/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; անվանումը`
                    </h6>
                    <h6 style="text-align: center">_____________________________________________________________________________________</h6>
                    <h6 style="text-align: left;">
                        Պայմանագրի կնքման ամսաթիվը` «____» «__________________» 20 թ.
                    </h6>
                    <h6 style="text-align: justify;">
                        Պատվիրատուն  և  Պայմանագրի կողմը՝  հիմք  ընդունելով  պայմանագրի  կատարման  վերաբերյալ      « &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      »      «  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	                »  20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     թ. դուրս գրված N ___   հաշիվ ապրանքագիրը, կազմեցին սույն արձանագրությունը հետևյալի մասին.
                    </h6>
                    <h6 style="text-align: left;">
                        Պայմանագրի շրջանակներում Պայմանագրի կողմը  կատարել է հետևյալ աշխատանքները՝
                    </h6>
                    <table style="font-size: 10px; 
                                width: 100%;
                                table-layout: fixed;
                                border-collapse: collapse;
                                page-break-inside: avoid;
                                border: 1px solid black;
                                text-align: center;">
                                <tbody><tr>
                                    <th rowspan="3" style="border: 1px solid black;
                                                           border-collapse: collapse;">N</th>
                                    <th colspan="8" style="border: 1px solid black;
                                                           border-collapse: collapse;">Կատարված աշխատանքների</th>
                                </tr>
                                <tr>
                                    <th rowspan="2" style="border: 1px solid black;
                                                           border-collapse: collapse;">անվանումը</th>
                                    <th rowspan="2" style="border: 1px solid black;
                                                           border-collapse: collapse;">տեխնիկական բնութագրի համառոտ շարադրանքը</th>
                                    <th colspan="2" style="border: 1px solid black;
                                                           border-collapse: collapse;">քանակական ցուցանիշը
                                    </th>
                                    <th colspan="2" style="border: 1px solid black;
                                                           border-collapse: collapse;">կատարման ժամկետը</th>
                                    <th rowspan="2" style="border: 1px solid black;
                                                           border-collapse: collapse;">Վճարման ենթակա գումարը /հազար դրամ/</th>
                                    <th rowspan="2" style="border: 1px solid black;
                                                           border-collapse: collapse;">Վճարման ժամկետը /ըստ վճարման ժամանակացույցի/</th>
                                </tr>
                                <tr>
                                    <th style="border: 1px solid black;
                                               border-collapse: collapse;">պայմանագրով հաստատված գնման ժամանակացույցի</th>
                                    <th style="border: 1px solid black;
                                               border-collapse: collapse;">փաստացի</th>
                                    <th style="border: 1px solid black;
                                               border-collapse: collapse;">ըստ պայմանագրով հաստատված գնման ժամանակացույցի</th>
                                    <th style="border: 1px solid black;
                                               border-collapse: collapse;">փաստացի</th>
                                </tr>
                                <tr>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                </tr>
                                <tr>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                    <td style = "padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;
                                                text-align: center;"></td>
                                </tr>
                            </tbody>
                        </table>
                    <h6 style="text-align: justify; margin-top: 3rem">
                        Սույն արձանագրության երկկողմ հաստատման համար հիմք հանդիսացած հաշիվ ապրանքագիրը և դրական եզրակացությունը հանդիսանում են սույն արձանագրության բաղկացուցիչ մասը և կցվում են:
                    </h6>
                    <div class="col-md-12 d-flex" style="margin-top: 3rem">
                        <table style="width: 100%; border: none !important">
                            <tbody>
                                <tr>
                                    <td style="border:none !important; width: 50%; text-align: center; padding-right: 10px;">
                                        <h6 class="ft-11">Աշխատանքը հանձնեց</h6>
                                        <h6>__________________________________</h6>
                                        <h6>ստորագրություն</h6>
                                        <h6>__________________________________</h6>
                                        <h6>ազգանուն, անուն</h6>
                                    </td>
                                    <td style="border:none !important; width: 50%; text-align: center; padding-left: 10px;">
                                        <h6 class="ft-11">Աշխատանքը ընդունեց</h6>
                                        <h6>__________________________________</h6>
                                        <h6>ստորագրություն</h6>
                                        <h6>__________________________________</h6>
                                        <h6>ազգանուն, անուն</h6>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
		        <div class="html2pdf__page-break"/>
                <pagebreak/> 
                <br class="page-break"/>
                <div class="info-block">
                    <div style="text-align: right">
                        Հավելված 3.1	
                    </div>
                    <div style="text-align: right">
                        «	»           20  թ.
                    </div>
                    <div style="text-align: right">
                       <span class="contract-code" style="color: rgb(17, 85, 204);"></span> ծածկագրով պայմանագրի
                    </div>
                    <br/>
                    <div style="margin-top: 20px; text-align: center; font-weight: 700">ԱԿՏ N</div>
                    <div style="text-align: center">պայմանագրի արդյունքը Պատվիրատուին հանձնելու փաստը ֆիքսելու վերաբերյալ</div>
                    <br>
                    <p>                
                        <table style="border: 0 !important">
                            <tr style="border: 0 !important">
                                <td style="border: 0 !important">Սույնով արձանագրվում է, որ</td>
                                <td style="border: 0 !important">_____________________________</td>
                                <td style="border: 0 !important">-ի (այսուհետ` Պատվիրատու) և</td>
                                <td style="border: 0 !important">_______________________________________</td>
                                <td style="border: 0 !important">-ի</td>
                            </tr>
                            <tr style="border: 0 !important">
                                <td style="border: 0 !important"></td>
                                <td style="text-align: center; font-size: 8px;border: 0 !important">Պատվիրատուի անունը</td>
                                <td style="border: 0 !important"></td>
                                <td style="text-align: center; font-size: 8px;border: 0 !important">Կատարողի անունը</td>
                                <td style="border: 0 !important"></td>
                            </tr>
                        </table>
                    </p>
                    <p>                
                        <table style="border: 0 !important">
                            <tr style="border: 0 !important">
                                <td style="border: 0 !important">(այսուհետ` Կատարող) միջև 20__թ.</td>
                                <td style="border: 0 !important">_________________________</td>
                                <td style="border: 0 !important">-ին կնքված N</td>
                                <td style="border: 0 !important">_________________________________________________</td>
                            </tr>
                            <tr style="border: 0 !important">
                                <td style="border: 0 !important"></td>
                                <td style="border: 0 !important;text-align: center; font-size: 8px;">պայմանագրի կնքման ամսաթիվը</td>
                                <td style="border: 0 !important"></td>
                                <td style="border: 0 !important;text-align: center; font-size: 8px;">պայմանագրի համարը</td>
                            </tr>
                        </table>
                    </p>	
                    <p>գնման պայմանագրի շրջանակներում Կատարողը  20__թ. ______________________________ -ին հանձնման-ընդունման նպատակով</p>
                    <p>Պատվիրատուին հանձնեց ստորև նշված աշխատանքները.</p>
                    <table style=" 
                                width: 100%;
                                table-layout: fixed;
                                border-collapse: collapse;
                                page-break-inside: avoid;
                                border: 1px solid black;
                                text-align: center;">
                        <tr>
                            <th colspan="3" style="border: 1px solid black;
                                                   border-collapse: collapse;">Աշխատանքի</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">անվանումը</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">չափման միավորը</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">քանակը (փաստացի)</th>
                        </tr>
                        <tr>
                            <td style = "padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style = "padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style = "padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                        </tr>
                        <tr>
                            <td style = "padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style = "padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                            <td style = "padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                        </tr>
                    </table>
                    <h6 style="text-align: left; margin-top: 3rem">Սույն ակտը կազմված է 2 օրինակից, յուրաքանչյուր կողմին տրամադրվում է մեկական օրինակ:</h6>
                    <div class="col-md-12 d-flex" style="margin-top: 3rem">
                            <table style="width: 100%;border: none !important"> 
                                <tbody>
                                    <tr>
                                        <td style="border: 0 !important; text-align: center; width: 50%;;">
                                            <h6 class="ft-11" style="font-weight: 700; margin-top: 25px;">Հանձնեց</h6>
                                            <h6>__________________________________</h6>
                                            <h6>ազգանուն, անուն</h6>
                                            <h6>__________________________________</h6>
                                            <h6>ստորագրություն</h6>
                                        </td>
                                        <td style="border: 0 !important; text-align: center; width: 50%;">
                                            <h6 class="ft-11" style="font-weight: 700"><span/>Ընդունեց <br> հայտը նախագծած ներկայացուցիչ`</h6>
                                            <h6>__________________________________</h6>
                                            <h6>ազգանուն, անուն</h6>
                                            <h6>__________________________________</h6>
                                            <h6>ստորագրություն</h6>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import EditorInput from '@/components/helpers/EditorInput';
import purchaseTypesLongNamesCased from '@/mixins/purchaseTypes'
import $ from 'jquery';

export default {
    name: 'contract_draft_work',
    components: { EditorInput },
    mixins: [purchaseTypesLongNamesCased],
    props: ['handleLoaded'],
    data() {
        return {
            inputs: {
                work_type: null,
                work_names: null,
                daysCount: null,
                copyCount: null,
            },
            participants: [],
            getOrgnizeTypeByPlan: '',
            participantsSequence: [],
            totalMembers: 0,
        }
    },
    validations() {
        const rules = {
            inputs: {
                work_names: { required },
                daysCount: { required },
                copyCount: { required },
                work_type: { required },
            }
        }
        return rules;
    },
    mounted() {
        const locale = 'hy'
        this.getOrgnizeTypeByPlan = this.purchaseTypesLongNamesCased[locale][this.purchaseType || 2]
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organizeOnePerson/currentOrganized']
        },
        organizedRows() {
            return this.currentOrganized.organize_rows
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
        async save() {    
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
                this.$store.dispatch('organizeOnePerson/update', {id: this.$route.params.id, data: { contract_html_hy: $('#commandment-file').html() }}).then(async(response) => {
                    if(response) {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            text: 'Հաջողությամբ պահպանված է'
                        })
                        await this.$modal.hide('new-editor-modal')
                    }
                    this.isSaving = false
                }).catch(e => {
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