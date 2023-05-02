<template>
    <div id="commandment-file" ref="contract" style="width: 100%;font-size: 14px;" contenteditable="true">
        <div style="text-align: center; font-weight: 700">ԿԱՊԱԼԱՅԻՆ ԱՇԽԱՏԱՆՔՆԵՐԻ ԿԱՏԱՐՄԱՆ ՊԵՏԱԿԱՆ ԳՆՄԱՆ ՊԱՅՄԱՆԱԳԻՐ</div>
        <div style="text-align: center; font-weight: 700">N <span style="color: rgb(17, 85, 204);" class="contract-code">{{ currentOrganized.code }}</span></div>
        <table style="width: 100%; border: none !important">
            <tbody>
                <tr>
                    <td style="border:none !important;" class="ft-11">
                         <span style="color: rgb(17, 85, 204);">{{ me.organisation[0].translations.city.hy }}</span>
                    </td>
                    <td class="ft-11"  style="border:none !important; text-align: right; float: right">
                        <span style="color: rgb(17, 85, 204);" class="sign-date">__.__.____</span>թ.
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="margin-top: 20px; text-align: justify;">
            <span style="color: rgb(17, 85, 204);">« {{ me.organisation[0].translations.name.hy }} » </span>
            <span style="color: rgb(17, 85, 204);" v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{ me.organisation[0].translations.company_type.hy }}-ը</span>
            <span style="color: rgb(17, 85, 204);" v-else>{{ me.organisation[0].translations.company_type.hy }}ը</span>
            ի դեմս տնօրեն
            <span style="color: rgb(17, 85, 204);">{{ me.organisation[0].translations.director_name.hy }}</span>ի, 
            որը գործում է 
            <span style="color: rgb(17, 85, 204);" v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{ me.organisation[0].translations.company_type.hy }}-ի</span>
            <span style="color: rgb(17, 85, 204);" v-else>{{ me.organisation[0].translations.company_type.hy }}ի</span>
            կանոնադրության հիման վրա (այսուհետ՝ Պատվիրատու), մի կողմից, և  
            <span class="winner-name">_______</span>-ն, ի դեմս տնօրեն<span class="winner-director">_______</span>ի, 
            որը գործում է 
            <span class="winner-name">_______</span>
            կանոնադրության հիման վրա (այսուհետ՝ Կատարող), մյուս կողմից, կնքեցին սույն պայմանագիրը հետևյալի մասին։
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">1. ՊԱՅՄԱՆԱԳՐԻ ԱՌԱՐԿԱՆ</div>
        <br>
        <div style="text-align: justify;">
                <span style="margin-left: 25px;"/><span>1.1 Կապալառուն պարտավորվում է սույն պայմանագրով սահմանված կարգով, նախատեսված ծավալներով, ձևով և ժամկետներում կատարել սույն պայմանագրի (այսուհետ` պայմանագիր) N 1 Հավելվածով սահմանված ծավալաթերթ-նախահաշվով նախատեսված 
                <input type="text"
                    class="editor-input"
                    v-model="$v.inputs.work_names.$model"
                    ref="work_names"
                    inputName="work_names"
                    style="width: 30px;border-top: 0 !important; border-left: 0 !important; border-right: 0 !important; text-align: right;   
                    font-size: 13px;
                    color: #303e67;
                    border-bottom: 1px solid black" 
                /> 
            աշխատանքները (այսուհետ` աշխատանք), իսկ Պատվիրատուն պարտավորվում է ընդունել կատարված աշխատանքը և վարձատրել դրա համար։</span>
            <br/><span style="margin-left: 25px;"/><span>1.2 Պայմանագրով նախատեսված աշխատանքները կատարվում են ՀՀ օրենսդրությամբ սահմանված ստանդարտներին, շինարարարական նորմերին և կանոններին, աշխատանքի նախագծին, ինչպես նաև պայմանագրի անբաժանելի մասը կազմող աշխատանքի ծավալաթերթ-նախահաշվին  համապատասխան։</span>
            <br/><span style="margin-left: 25px;"/><span>1.3 Պայմանագրով նախատեսված աշխատանքները սկսվում են պայմանագիրն   ուժի մեջ մտնելուց հետո և  կատարման ժամկետը սահմանվում է` 
                <input type="text"
                    class="editor-input"
                    v-model="$v.inputs.work_date.$model"
                    ref="work_date"
                    inputName="work_date"
                    style="width: 30px;border-top: 0 !important; border-left: 0 !important; border-right: 0 !important; text-align: right;   
                    font-size: 13px;
                    color: #303e67;
                    border-bottom: 1px solid black" 
                /> 
            :</span>
            <br/><span style="margin-left: 25px;"/><span>Պայմանագրով նախատեսված առանձին տեսակի աշխատանքների, փուլերի և ծավալների կատարման ժամկետները որոշվում են կողմերի կողմից համաձայնեցված օրացուցային գրաֆիկով (Հավելված N 2)։</span>
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">2. ԿԱՊԱԼԱՌՈՒԻ ՄԻՋՈՑՆԵՐՈՎ ԱՇԽԱՏԱՆՔՆԵՐԸ ԿԱՏԱՐԵԼԸ</div>
        <br>
        <div style="text-align: justify;">
            <span style="margin-left: 25px;"/><span>2.1 Աշխատանքը կատարվում է Կապալառուի ուժերով, նյութերով և միջոցներով։</span>
            <br/><span style="margin-left: 25px;"/><span>2.2 Կապալառուն պատասխանատվություն է կրում իր տրամադրած նյութերի և սարքավորումների որակի համար։</span>
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">3. ԿՈՂՄԵՐԻ ԻՐԱՎՈՒՆՔՆԵՐԸ ԵՎ ՊԱՐՏԱԿԱՆՈՒԹՅՈՒՆՆԵՐԸ</div>
        <br>
        <div style="text-align: justify;">
            <span style="margin-left: 25px;"/><span style="font-weight: 700">3.1. Պատվիրատուն իրավունք ունի`</span>
            <br/><span style="margin-left: 25px;"/><span>3.1.1 Ցանկացած ժամանակ ստուգել Կապալառուի իրականացրած աշխատանքի ընթացքը և որակը` առանց միջամտելու վերջինիս գործունեությանը.</span>
            <br/><span style="margin-left: 25px;"/><span>3.1.2 Կապալառուի կողմից պայմանագրի 1.3 կետում նշված ժամկետի (ներառյալ օրացուցային գրաֆիկի) խախտման դեպքում իր հայեցողությամբ սահմանել աշխատանքի կատարման նոր ժամկետ և պահանջել Կապալառուից վճարելու պայմանագրի 6.2 կետով նախատեսված տույժը։</span>
            <br/><span style="margin-left: 25px;"/><span>3.1.3 Չընդունել աշխատանքի արդյունքը` ՀՀ օրենսդրությամբ սահմանված դրույթներին, պայմանագրի 1.2 կետով նախատեսված փաստաթղթերի պահանջներին չհամապատասխանելու դեպքում` իր հայեցողությամբ սահմանելով թերությունների անհատույց վերացման ողջամիտ ժամկետ և պահանջել Կապալառուից վճարելու  պայմանագրի 6.2 կետով նախատեսված տույժը, ինչպես նաև 6.3 կետով նախատեսված տուգանքը։</span>
            <br/><span style="margin-left: 25px;"/><span>3.1.4 Միակողմանի լուծել պայմանագիրը և պահանջել հատուցելու իրեն պատճառված վնասները, եթե.</span>
            <br/><span style="margin-left: 25px;"/><span>ա) Կապալառուն ժամանակին չի սկսում աշխատանքի կատարումը կամ աշխատանքը կատարում է այնքան դանդաղ, որ դրա ժամանակին ավարտը  դառնում է ակնհայտ անհնար,</span>
            <br/><span style="margin-left: 25px;"/><span>բ) Կապալառուն խախտել է պայմանագրի 1.3 կետում նախատեսված ժամկետը (ներառյալ օրացուցային գրաֆիկը),</span>
            <br/><span style="margin-left: 25px;"/><span>գ) Կապալառուի կողմից կատարված աշխատանքը չի համապատասխանում նախագծանախահաշվային փաստաթղթերով սահմանված պահանջներին,</span>
            <br/><span style="margin-left: 25px;"/><span>դ) Կապալառուի կողմից խախտվել են պայմանագրի 3.1.3 կետով նախատեսված հիմքերով աշխատանքի թերությունների անհատույց վերացման ողջամիտ ժամկետները.</span>
            <br/><span style="margin-left: 25px;"/><span>3.1.5 Աշխատանքի արդյունքի թերությունների հետ կապված պահանջներ ներկայացնել երաշխիքային ժամկետում։</span>
            <br/><span style="margin-left: 25px;"/><span>3.1.6 Լիազորել այլ անձի` աշխատանքի իրականացման նկատմամբ տեխնիկական հսկողություն իրականացնելու նպատակով.</span>
            <br/><span style="margin-left: 25px;"/><span>3.1.7 Մինչև Պատվիրատուի կողմից Կապալառուի կատարած աշխատանքի արդյունքն ընդունելը, պահանջել իրեն հանձնելու անավարտ աշխատանքի արդյունքը`  պայմանագիրն օրենքով կամ պայմանագրով նախատեսված հիմքերով դադարեցնելու դեպքում։</span>
        </div>
        <div style="text-align: justify;">
            <br/><span style="margin-left: 25px;"/><span style="font-weight: 700">3.2. Պատվիրատուն պարտավոր է`</span>
            <br/><span style="margin-left: 25px;"/><span>3.2.1 Աշխատանքը կատարելիս` աջակցել Կապալառուին պայմանագրով նախատեսված դեպքերում, ծավալով և կարգով.</span>
            <br/><span style="margin-left: 25px;"/><span>3.2.2 Պայմանագրով նախատեսված ժամկետում և կարգով Կապալառուի մասնակցությամբ զննել և ընդունել կատարված աշխատանքը (դրա արդյունքը), իսկ պայմանագրից աշխատանքի արդյունքը վատթարացնող շեղումներ կամ աշխատանքում այլ թերություններ հայտնաբերելու դեպքերում` այդ մասին անհապաղ հայտնել Կապալառուին.</span>
            <br/><span style="margin-left: 25px;"/><span>3.2.3 Պայմանագրի ուժի մեջ մտնելու պահից 5 աշխատանքային օրվա ընթացքում Կապալառուին տրամադրել աշխատանքի իրականացման համար համապատասխան տարածք.</span>
            <br/><span style="margin-left: 25px;"/><span>3.2.4 Պայմանագրի 1.3 կետով նախատեսված ժամկետում աշխատանքի արդյունքն ընդունելու դեպքում Կապալառուին վճարել վերջինիս վճարման ենթակա գումարները։</span>
        </div>
        <div style="text-align: justify;">
            <br/><span style="margin-left: 25px;"/><span style="font-weight: 700">3.3. Կապալառուն իրավունք ունի`</span>
            <br/><span style="margin-left: 25px;"/><span>3.3.1  Պայմանագրի 1.3 կետով նախատեսված ժամկետում աշխատանքի արդյունքը հանձնելու դեպքում Պատվիրատուից պահանջել վճարելու պայմանագրի 5.1 կետով նախատեսված` վճարման ենթակա գումարը։</span>
            <br/><span style="margin-left: 25px;"/><span>3.3.2  Պատվիրատուի կողմից պայմանագրի 5.4 կետում նշված ժամկետների խախտման դեպքում Պատվիրատուից պահանջել վճարելու իրեն վճարման ենթակա գումարները և պայմանագրի 6.5 կետով նախատեսված տույժը։</span>
        </div>
        <div style="text-align: justify;">
            <br/><span style="margin-left: 25px;"/><span style="font-weight: 700">3.4. Կապալառուն պարտավոր է`</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.1  Աշխատանքների առնվազն
                {{currentOrganized.least_work_percent}}
                տոկոսը կատարել անձամբ, պայմանագրով նախատեսված կարգով և ժամկետներում, իր ուժերով, գործիքներով, մեխանիզմներով, ինչպես նաև անհրաժեշտ նյութերով ու պատշաճ որակով` նախագծին և ծավալաթերթին համապատասխան։</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.2 	Կատարել աշխատանքի վերաբերյալ Պատվիրատուի տված ցուցումները, եթե դրանք չեն հակասում պայմանագրի պայմաններին։</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.3  Ապահովել շինմոնտաժային աշխատանքների կատարումը շինարարական նորմերին, կանոններին ու տեխնիկական պայմաններին համապատասխան, կատարել իր կողմից մոնտաժված սարքավորման (էլեկտրական, ջեռուցման, ջրամատակարարման, կոյուղու, օդափոխիչ և այլն) անհատական փորձարկում, մասնակցել սարքավորման համալիր փորձարկմանը։</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.4  Աշխատանքի արդյունքը Պատվիրատուին հանձնելիս նրան հայտնել այն պահանջների և կանոնների մասին, որոնց պահպանումն անհրաժեշտ է աշխատանքի արդյունքի արդյունավետ և անվտանգ օգտագործման համար, ինչպես նաև տեղեկություններ հաղորդել այդ պահանջները և կանոնները չպահպանելու հնարավոր հետևանքների մասին։</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.5  Պայմանագրի 1.3 կետում նշված ժամկետը (ներառյալ օրացուցային գրաֆիկը) խախտելու և Պատվիրատուի կողմից աշխատանքի կատարման նոր ժամկետ սահմանվելու դեպքում, ապահովել աշխատանքի կատարումը սահմանված ժամկետում և յուրաքանչյուր ուշացված օրվա համար վճարել պայմանագրի  6.2 կետով նախատեսված տույժը։</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.6  Պայմանագրի 3.1.4 կետով նախատեսված հիմքերով պայմանագրի լուծման դեպքում հատուցել Պատվիրատուին պատճառված վնասները և վճարել 6.3 կետով նախատեսված տուգանքը։</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.7  Շինարարության օբյեկտի կոնսերվացման անհրաժեշտության ծագման դեպքում` իր միջոցներով կատարել աշխատանքը դադարեցնելու և շինարարությունը կոնսերվացնելու անհրաժեշտությունից բխող ողջամիտ ծախսերը։</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.8  Եթե շինարարական ծրագրերի կատարման արդյունքի կամ դրա առանձին բաղադրիչի համար սահմանված երաշխիքային ժամկետի ընթացքում ի հայտ են եկել կատարված աշխատանքի թերություններ, ապա Կապալառուն պարտավոր է իր հաշվին, Պատվիրատուի կողմից սահմանված ողջամիտ ժամկետում վերացնել թերությունները։</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.9  Պայմանագրով երաշխիքային ժամկետ է սահմանվում Պատվիրատուի կողմից ողջ ծավալով Աշխատանքն ընդունվելու օրվան հաջորդող օրվանից հաշված
                <input type="text"
                    class="editor-input"
                    v-model="$v.inputs.daysCount.$model"
                    ref="daysCount"
                    inputName="daysCount"
                    style="width: 30px;border-top: 0 !important; border-left: 0 !important; border-right: 0 !important; text-align: right;   
                    font-size: 13px;
                    color: #303e67;
                    border-bottom: 1px solid black" 
                /> 
                օր։ Եթե երաշխիքային ժամկետի ընթացքում ի հայտ են եկել կատարված Աշխատանքի թերություններ, ապա Կապալառուն պարտավոր է իր հաշվին, Պատվիրատուի կողմից սահմանված ողջամիտ ժամկետում վերացնել թերությունները:</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">3.4.10 Կապալի օբյեկտի, դրա առանձին մասերի (կոնստրուկցիաներ և այլն) և օգտագործվելիք  նյութերի և (կամ) սարքերի ու սարքավորումների երաշխիքային ժամկետներին ներկայացվող նվազագույն պահանջները ներկայացված են պայմանագրի N – Հավելվածում:</span>
            <br/><span style="margin-left: 25px;"/><span>3.4.11 Որակավորման և պայմանագրի կատարման ապահովման գործողության ընթացքում լուծարման կամ սնանկացման գործընթաց սկսելու դեպքում դրա մասին նախապես գրավոր տեղեկացնել Պատվիրատուին։</span>
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">4. ԱՇԽԱՏԱՆՔԻ ՀԱՆՁՆՄԱՆ ԵՎ ԸՆԴՈՒՆՄԱՆ ԿԱՐԳԸ</div>
        <br>
        <div style="text-align: justify;">
            <span style="margin-left: 25px;"/><span>4.1 Կատարված աշխատանքը ընդունվում է Պատվիրատուի և Կապալառուի միջև հանձնման-ընդունման արձանագրության ստորագրմամբ: Աշխատանքը Պատվիրատուին հանձնելու փաստը ֆիքսվում է Պատվիրատուի և Կապալառուի միջև երկկողմ հաստատված փաստաթղթով՝ նշելով փաստաթղթի կազմման ամսաթիվը:</span>
            <br/><span style="margin-left: 25px;"/><span>Մինչև պայմանագրով աշխատանքի կատարման համար նախատեսված օրը ներառյալ Կապալառուն Պատվիրատուին է տրամադրում իր կողմից ստորագրված` աշխատանքը Պատվիրատուին հանձնելու փաստը ֆիքսող փաստաթուղթը (հավելված N 3.1) և հանձնման-ընդունման արձանագրության
                {{currentOrganized.protocols_copy_number}}
                օրինակ (հավելված N 3):</span>
            <br/><span style="margin-left: 25px;"/><span>4.2 Հանձնման-ընդունման արձանագրությունն ստորագրվում է, եթե կատարված աշխատանքը համապատասխանում է պայմանագրի պայմաններին։ Հակառակ դեպքում պայմանագրի կամ դրա մի մասի կատարման արդյունքները չեն ընդունվում, հանձնման-ընդունման արձանագրություն չի ստորագրվում և Պատվիրատուն`</span>
            <br/><span style="margin-left: 25px;"/><span>ա) հարցի կարգավորման համար ձեռնարկում է նման իրավիճակի համար պայմանագրով նախատեսված միջոցները.</span>
            <br/><span style="margin-left: 25px;"/><span>բ) Կապալառուի նկատմամբ կիրառում է պայմանագրով նախատեսված պատասխանատվության միջոցներ։</span>
            <br/><span style="margin-left: 25px;"/><span>4.3 Պատվիրատուն հանձնման-ընդունման արձանագրությունը ստանալու օրվան հաջորդող աշխատանքային օրվանից հաշված {{currentOrganized.protocol_presentation_deadline}} աշխատանքային օրվա ընթացքում Կապալառուին է ներկայացնում իր կողմից ստորագրված հանձնման-ընդունման արձանագրության մեկ օրինակը կամ աշխատանքը չընդունելու պատճառաբանված մերժումը։</span>
            <br/><span style="margin-left: 25px;"/><span>4.4 Եթե պայմանագրի 4.3 կետով սահմանված ժամկետում Պատվիրատուն չի ընդունում կատարված աշխատանքը կամ չի մերժում դրա ընդունումը, ապա կատարված աշխատանքը համարվում է ընդունված և պայմանագրի 4.3 կետով սահման­ված վերջնաժամկետին հաջորդող աշխատանքային օրը Պատվիրատուն   Կապալառուին տրամադրում իր կողմից հաստատված հանձնման-ընդունման արձանա­գրությունը:</span>
            <br/><span style="margin-left: 25px;"/><span>4.5 Աշխատանքի կամ պայմանագրի օրացուցային գրաֆիկով նախատեսված առանձին տեսակի աշխատանքների, փուլերի և ծավալների արդյունքները նախագծանախահաշվային փաստաթղթերին չհամապատասխանելու դեպքում կողմերը կազմում են երկկողմ ակտ` թվարկելով թերությունների վերացման համար պահանջվող` կատարման ենթակա լրացուցիչ աշխատանքները և ժամկետները։ Կապալառուն պարտավոր է պայմանագրային գնի սահմաններում, առանց լրացուցիչ վճարի, կատարել անհրաժեշտ աշխատանքներ։</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">4.6 Աշխատանքն ընդունելիս կիրառվում են նաև հետևյալ պայմանները`</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">1) Կապալառուի կողմից շինարարության ավարտի մասին տեղեկություն ստանալուց հետո Պատվիրատուի ղեկավարը ձեռնարկում է միջոցներ Հայաստանի Հանրապետության կառավարության 2015 թվականի մարտի 19-ի N 596-Ն որոշմամբ սահմանված հանձնաժողով ձևավորելու և կատարված աշխատանքներն ընդունելու համար.</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">2) պայմանագրի կատարման արդյունքը համարվում է ամբողջությամբ ընդունված պետական կառավարման մարմնի ղեկավարի` Հայաստանի Հանրապետության կառավարության 2015 թվականի մարտի 19-ի N 596-Ն որոշմամբ սահմանված կարգով ձևավորված հանձնաժողովի (այսուհետ` ընդունող հանձնաժողով) կողմից կատարված աշխատանքներն ընդունվելու դեպքում.</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">3) մինչև ավարտված շինարարական օբյեկտի ընդունումը` Հայաստանի Հանրապետության կառավարության 2015 թվականի մարտի 9-ի N 596-Ն որոշման համապատասխան ստեղծված հանձնաժողովը Հայաստանի Հանրապետության օրենսդրությամբ սահմանված կարգով փաստագրում է ավարտված շինարարության օբյեկտը և կազմում օբյեկտը շահագործման ընդունող հանձնաժողովի ակտ.</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">4) սույն կետի 3-րդ ենթակետում նշված ակտը սահմանված կարգով ստանալուց հետո պատասխանատու ստորաբաժանումն ստուգում է ավարտված շինարարական օբյեկտի (կատարված աշխատանքների) համապատասխանությունը պայմանագրի պահանջներին և, եթե կատարված աշխատանքը`</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">ա. համապատասխանում է պայմանագրի պայմաններին, ապա ստորագրվում է պայմանագրի կատարման արդյունքն ընդունելու մասին հանձնման-ընդունման ավարտական արձանագրություն,</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">բ. չի համապատասխանում պայմանագրի պայմաններին, ապա արձանագրություն չի ստորագրվում.</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">5) մինչև սույն կետով նախատեսված պայմանագրի կատարման արդյունքն ընդունելու մասին հանձնման-ընդունման ավարտական արձանագրությունն ստորագրելը՝ Պատվիրատուն չի վճարում կապիտալ շինարարության համար կատարված աշխատանքների ընդհանուր գումարի հինգ տոկոսը, իսկ տարաժամկետ վճարելու դեպքում` վերջին վճարման գումարը, որը չի կարող պակաս լինել կապիտալ շինարարության համար կատարված աշխատանքների ընդհանուր գումարի հինգ տոկոսից:</span>
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">5. ԱՇԽԱՏԱՆՔԻ ԳԻՆԸ ԵՎ ՎԱՐՁԱՏՐՈՒԹՅՈՒՆԸ</div>
        <br>
        <div style="text-align: justify;">
            <span style="margin-left: 25px;"/><span>5.1 Սույն պայմանագրի ընդհանուր գինը կազմում է <span class="contract-price">_______</span> (<span class="contract-price-word">______________</span>) ՀՀ դրամը <span class="contract-det"></span> Գինը ներառում է Կապալառուի կողմից իրականացվող բոլոր ծախսերը, ընդ որում`</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">1-ին չափաբաժին  .............. (.....................)  ՀՀ դրամ` որից ---------- (-----------------------------) ՀՀ դրամը` ԱԱՀ-ն։
                ------------------------------------------------------------------------------------------------------------------
                n-րդ չափաբաժին  .............. (.....................)  ՀՀ դրամ` որից ---------- (----------------------------) ՀՀ դրամը` ԱԱՀ-ն:
            </span>
            <br/><span style="margin-left: 25px;"/><span>5.1.1 Պայմանագրի գնից` մինչև {{ currentOrganized.prepayment_max }} ({{ currentOrganized.prepayment_max_text }}) ՀՀ դրամը, Պատվիրատուն փոխանցում է Կապալառուի բանկային հաշվին` որպես կանխավճար։</span>
            <br/><span style="margin-left: 25px;"/><span>Կանխավճարի մարումն իրականացվում է հանձնման-ընդունման արձանագրությունների հիման վրա կատարվող վճարումներից նվազեցումներ (պահումներ) կատարելու ձևով։ Ընդ որում մինչև կանխավճարի ամբողջական մարումը, Կապալառուին վճարումներ չեն կատարվում:</span>
            <br/><span style="margin-left: 25px;"/><span>5.2 Աշխատանքի գինը կայուն է և Կապալառուն իրավունք չունի պահանջել ավելացնելու, իսկ Պատվիրատուն նվազեցնելու այդ գինը։</span>
            <br/><span style="margin-left: 25px;"/><span>5.3 Պատվիրատուն վճարում է աշխատանքի կամ պայմանագրի օրացուցային գրաֆիկով նախատեսված` առանձին տեսակի աշխատանքների, փուլերի և ծավալների`  պայմանագրի 4-րդ բաժնով նախատեսված կարգով ընդունելու դեպքում Հայաստանի Հանրապետության դրամով անկանխիկ` դրամական միջոցները Կապալառուի հաշվարկային հաշվին փոխանցելու միջոցով։ Դրամական միջոցների փոխանցումը կատարվում է հանձման-ընդունման արձանագրության հիման վրա` պայմանագրի վճարման  ժամանակացույցով (հավելված N 2) նախատեսված չափերով և ամիներին: Եթե արձանագրությունը կազմվում է տվյալ ամսվա 20-ից հետո և այդ ամսում վճարման ժամանակացույցով նախատեսված են ֆինանսական միջոցներ, ապա վճարումն իրականացվում է մինչև 30 աշխատանքային օրվա ընթացքում, բայց ոչ ուշ, քան մինչև տվյալ տարվա դեկտեմբերի 30-ը։</span>
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">6. ԿՈՂՄԵՐԻ ՊԱՏԱՍԽԱՆԱՏՎՈՒԹՅՈՒՆԸ</div>
        <br>
        <div style="text-align: justify;">
            <span style="margin-left: 25px;"/><span>6.1 Կապալառուն պատասխանատվություն է կրում Աշխատանքի որակի և սույն պայմանագրի 1.3 կետով (ներառյալ օրացուցային գրաֆիկը) նախատեսված ժամկետի պահպանման համար։</span>
            <br/><span style="margin-left: 25px;"/><span>6.2 Սույն պայմանագրով նախատեսված Աշխատանքի կատարման ժամկետը խախտելու դեպքում Կապալառուից յուրաքանչյուր ուշացված աշխատանքային օրվա համար գանձվում է տույժ` կատարման ենթակա, սակայն չկատարված Աշխատանքի գնի 0,05 (զրո ամբողջ հինգ հարյուրերրորդական) տոկոսի չափով։</span>
            <br/><span style="margin-left: 25px;"/><span>6.3 Պայմանագրի 3.1.3 կետով նախատեսված հիմքերով Պատվիրատուի կողմից աշխատանքը չընդունվելու, ինչպես նաև 3.1.4 կետով նախատեսված կարգով պայմանագիրը լուծելու դեպքում Կապալառուից գանձվում է տուգանք` պայմանագրի 5.1 կետում նախատեսված գումարի 0,5 (զրո ամբողջ հինգ տասնորդական) տոկոսի չափով: Ընդ որում տուգանքը հաշվարկվում է նաև աշխատանքի արդյունքը սույն պայմանագրով սահմանված ժամկետում կատարելու, սակայն պատվիրատուի կողմից այդ չընդունվելու դեպքում:</span>
            <br/><span style="margin-left: 25px;"/><span>6.4 Պայմանագրի 6.2 և 6.3 կետերով նախատեսված տույժը և տուգանքը հաշվարկվում և հաշվանցվում են  Կապալառուին վճարվող գումարների հետ։</span>
            <br/><span style="margin-left: 25px;"/><span>6.5 Պատվիրատուի կողմից պայմանագրի 5.3 կետով նախատեսված ժամկետների խախտման համար Պատվիրատուի նկատմամբ յուրաքանչյուր ուշացված աշխատանքային օրվա համար հաշվարկվում է տույժ` վճարման ենթակա, սակայն չվճարված  գումարի 0,05 (զրո ամբողջ հինգ հարյուրերրորդական) տոկոսի չափով։</span>
            <br/><span style="margin-left: 25px;"/><span>6.6 Պայամանագրով չնախատեսված դեպքերում կողմերն իրենց պարտավորությունները չկատարելու կամ ոչ պատշաճ կատարելու համար պատասխանատվություն են կրում ՀՀ օրենսդրությամբ սահմանված կարգով։</span>
            <br/><span style="margin-left: 25px;"/><span>6.7 Տույժերի և (կամ) տուգանքների վճարումը կողմերին չի ազատում իրենց պայմանագրային պարտավորությունները կատարելուց։</span>
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">7. ԱՆՀԱՂԹԱՀԱՐԵԼԻ ՈՒԺԻ ԱԶԴԵՑՈՒԹՅՈՒՆԸ (ՖՈՐՍ-ՄԱԺՈՐ)</div>
        <br>
        <div style="text-align: justify;">
            <span style="margin-left: 25px;"/><span>Սույն պայմանագրով պարտավորություններն ամբողջությամբ կամ մասնակիորեն չկատարելու համար կողմերն ազատվում են պատասխանատվությունից, եթե դա եղել է անհաղթահարելի ուժի ազդեցության հետևանքով, որը ծագել է սույն պայմանագիրը կնքելուց հետո, և որը կողմերը  չէին կարող կանխատեսել կամ կանխարգելել։ Այդպիսի իրավիճակներ են երկրաշարժը, ջրհեղեղը, հրդեհը, պատերազմը, ռազմական և արտակարգ դրություն հայտարարելը, քաղաքական հուզումները, գործադուլները, հաղորդակցության միջոցների աշխատանքի դադարեցումը, պետական մարմինների ակտերը և այլն, որոնք անհնարին են դարձնում սույն պայմանագրով պարտավորությունների կատարումը։ Եթե արտակարգ ուժի ազդեցությունը շարունակվում է 3 (երեք) ամսից ավելի, ապա կողմերից յուրաքանչյուրն իրավունք ունի լուծել պայմանագիրը` այդ մասին նախապես տեղյակ պահելով մյուս կողմին։</span>
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">8. ԱՅԼ ՊԱՅՄԱՆՆԵՐ</div>
        <br>
        <div style="text-align: justify;">
            <span style="margin-left: 25px;"/><span>8.1 Պայմանագիրն ուժի մեջ է մտնում Կողմերի ստորագրման պահից և գործում է մինչև կողմերի պայմանագրով ստանձնած պարտավորությունների ողջ ծավալով կատարումը։</span>
            <br/><span style="margin-left: 25px;"/><span>8.2 Պայմանագրից ծագած` կողմի վճարային պարտավորությունը չի կարող դադարել այլ պայմանագրից ծագած` հակընդդեմ պարտավորության հաշվանցով, առանց կողմերի գրավոր և կնիքով հաստատված համաձայնության։ Պայմանագրից ծագած պահանջի իրավունքը չի կարող փոխանցվել այլ անձի, առանց պարտապան կողմի գրավոր համաձայնության։</span>
            <br/><span style="margin-left: 25px;"/><span>8.3 Պայմանագրի հետ կապված վեճերը ենթակա են քննության Հայաստանի Հանրապետության դատարաններում։</span>
            <br/><span style="margin-left: 25px;"/><span>8.4 Պայմանագրում փոփոխություններ և լրացումներ կարող են կատարվել միայն Կողմերի փոխադարձ համաձայնությամբ:</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">8.5 Եթե պայմանագիրն իրականացվում է ենթակապալի պայմանագիր կնքելու միջոցով.</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">1) Կապալառուն պատասխանատվություն է կրում ենթակապալառուի պարտավորությունների չկատարման կամ ոչ պատշաճ կատարման համար.</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">2) պայմանագրի կատարման ընթացքում ենթակապալառուի փոփոխման դեպքում Կապալառուն գրավոր տեղեկացնում է Պատվիրատուին՝ տրամադրելով ենթակապալի պայմանագրի պատճենը և դրա կողմ հանդիսացող անձի տվյալները՝ փոփոխությունը կատարվելու օրվանից հինգ աշխատանքային օրվա ընթացքում:</span>
            <br/><span style="margin-left: 25px;"/><span style="color: rgb(17, 85, 204);">8.6 Եթե պայմանագիրն իրականացվում է համատեղ գործունեության (կոնսորցիումի) պայմանագիր կնքելու միջոցով, ապա այդ պայմանագրի մասնակիցները կրում են համատեղ և համապարտ պատասխանատվություն: Ընդ որում, կոնսորցիումի անդամի կոնսորցիումից դուրս գալու դեպքում պայմանագիրը միակողմանիորեն լուծվում է և կոնսորցիումի անդամների նկատմամբ կիրառվում են պայմանագրով նախատեսված պատասխանատվության միջոցները:</span>
            <br/><span style="margin-left: 25px;"/><span>Պայմանագրի կողմերի` երրորդ անձանց նկատմամբ պարտավորությունները՝ ներառյալ պայմանագրի կատարման շրջանակում Կապալառուի կնքած այլ գործարքները և դրանցից բխող պարտավորությունները, դուրս են պայմանագրի կարգավորման դաշտից և չեն կարող ազդել պայմանագրի կատարման արդյունքն ընդունելու վրա։ Այդ գործարքների և դրանցից բխող պարտավորությունների կատարման հետ կապված հարաբերությունները կարգավորվում են այդ գործարքների հետ կապված հարաբերությունները կարգավորող նորմերով, և դրանց համար պատասխանատու է Կապալառուն։</span>
            <br/><span style="margin-left: 25px;"/><span>8.7 Սույն պայմանագրի կապակցությամբ ծագած վեճերը լուծվում են բանակցությունների միջոցով։ Համաձայնություն ձեռք չբերելու դեպքում վեճերը լուծվում են դատական կարգով։</span>
            <br/><span style="margin-left: 25px;"/><span>8.8 Սույն պայմանագիրը կազմված է <span class="pages-count">____</span> էջից, կնքվում է երկու օրինակից, որոնք ունեն հավասարազոր իրավաբանական ուժ, յուրաքանչյուր կողմին տրվում է մեկական օրինակ։ Սույն պայմանագրի N 1, N 2, N 3, N 4 և N 4.1 հավելվածները, համարվում են պայմանագրի անբաժանելի մասը։</span>
            <br/><span style="margin-left: 25px;"/><span>8.9 Սույն պայմանագրի հետ կապված  հարաբերությունների նկատմամբ կիրառվում է Հայաստանի Հանրապետության իրավունքը։</span>
        </div>
        <br>
        <div style="font-weight: 700; text-align: center;">9. ԿՈՂՄԵՐԻ ՀԱՍՑԵՆԵՐԸ, ԲԱՆԿԱՅԻՆ ՎԱՎԵՐԱՊԱՅՄԱՆՆԵՐԸ ԵՎ ՍՏՈՐԱԳՐՈՒԹՅՈՒՆՆԵՐԸ</div> 
        <br>       
        <table style="width: 100%; border: none !important">
            <tbody>
                <tr>
                    <td style="border:none !important; width: 50%; text-align: center; padding-right: 10px;">
                        <h6 style="font-weight: 700">ՊԱՏՎԻՐԱՏՈՒ</h6>
                        <p>« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</p>
                        <p v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                        <p v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                        <p>Բանկ՝ {{ me.organisation[0].translations.bank_name.hy }}</p>
                        <p>Հ/Հ {{ me.organisation[0].bank_account }} </p>
                        <p>ՀՎՀՀ {{ me.organisation[0].tin }} </p>
                        <p>______________________</p>
                        <p>ստորագրություն</p>
                    </td>
                    <td style="border:none !important;padding-left: 10px; text-align: center; width: 50%;">
                        <h6 style="font-weight: 700">ԿԱՊԱԼԱՌՈՒ</h6>
                        <p><span class="winner-name">______________</span></p>
                        <p><span class="winner-address">_____________________</span></p>
                        <p>Բանկ՝<span class="winner-bank">___________</span></p>
                        <p>Հ/Հ <span class="winner-bank_account">_____________________</span></p>
                        <p>ՀՎՀՀ <span class="winner-tin">______________</span></p>
                        <p>______________________</p>
                        <p>ստորագրություն</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="text-align: justify; margin-bottom: 3rem">
            <span style="margin-left: 25px;"/><i>Անհրաժեշտության դեպքում պայմանագրի նախագծում կարող են ներառվել ՀՀ օրենսդրությանը չհակասող դրույթներ։</i>
        </div>
        <pagebreak/> 
        <br class="page-break"/>
        <div>
            <div style="text-align: right; margin-top: 3rem">Հավելված  N 1</div>
            <div style="text-align: right; font-weight: 700; "><span class="sign-date">__.__.____</span>թ կնքված</div>
            <div style="text-align: right"><span style="color: rgb(17, 85, 204);"><span class="getContractType"></span></span> ծածկագրով պայմանագրի</div>
            <div style="text-align: center; font-weight: 700; margin-top: 40px;">Ծավալաթերթ-նախահաշիվը</div>
            <div style="text-align: center; font-weight: 700;"> ԱՇԽԱՏԱՆՔՆԵՐԻ ԿԱՏԱՐՄԱՆ</div>
            <div style="font-weight: 700; margin-top: 40px;">* Կապալառուն աշխատանքները կատարում է 
                <span style="" v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</span>
                <span style="" v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</span>
            հասցեում:</div>
        </div>
        <table style="width: 100%; border: none !important">
            <tbody>
                <tr>
                    <td style="border:none !important; width: 50%; text-align: center; padding-right: 10px;">
                        <h6 style="font-weight: 700">ՊԱՏՎԻՐԱՏՈՒ</h6>
                        <p>« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</p>
                        <p v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                        <p v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                        <p>Բանկ՝ {{ me.organisation[0].translations.bank_name.hy }}</p>
                        <p>Հ/Հ {{ me.organisation[0].bank_account }} </p>
                        <p>ՀՎՀՀ {{ me.organisation[0].tin }} </p>
                        <p>______________________</p>
                        <p>ստորագրություն</p>
                    </td>
                    <td style="border:none !important;padding-left: 10px; text-align: center; width: 50%;">
                        <h6 style="font-weight: 700">ԿԱՊԱԼԱՌՈՒ</h6>
                        <p><span class="winner-name">______________</span></p>
                        <p><span class="winner-address">_____________________</span></p>
                        <p>Բանկ՝<span class="winner-bank">___________</span></p>
                        <p>Հ/Հ <span class="winner-bank_account">_____________________</span></p>
                        <p>ՀՎՀՀ <span class="winner-tin">______________</span></p>
                        <p>______________________</p>
                        <p>ստորագրություն</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagebreak/> 
        <br class="page-break"/>
        <div>
            <div style="text-align: right; font-weight: 700;">Հավելված N2</div>
            <div style="text-align: right; font-weight: 700;"><span class="sign-date">__.__.____</span>թ կնքված</div>
            <div style="text-align: right; font-weight: 700;"><span class="contract-code" style="color: rgb(17, 85, 204);"></span> ծածկագրով պայմանագրի</div>

            <div style="text-align: center; font-weight: 700;">ՕՐԱՑՈՒՑԱՅԻՆ ԳՐԱՖԻԿ</div>
            <div style="text-align: center; font-weight: 700;"> ԱՇԽԱՏԱՆՔՆԵՐԻ ԿԱՏԱՐՄԱՆ</div>
            <div v-if="currentOrganized.calendar_schedule && currentOrganized.calendar_schedule !== null && currentOrganized.calendar_schedule !== undefined" v-html="currentOrganized.calendar_schedule">
            </div>
            <div v-else>
                <table style=" 
                                width: 100%;
                                table-layout: fixed;
                                border-collapse: collapse;
                                page-break-inside: avoid;
                                border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;">
                <tr>
                    <td rowspan="2" style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">N ը/կ</td>
                    <td rowspan="2" style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">Կապալառուի կողմից կատարվելիք աշխատանքների առանձին տեսակների անվանումներ</td>
                    <td colspan="2" style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">Աշխատանքների  կատարման ժամկետը**</td>
                </tr>
                <tr>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">Սկիզբը</td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">Ավարտը</td>
                </tr>
                <tr>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">1</td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                </tr>
                <tr>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">2</td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                </tr>
                <tr>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">3</td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                </tr>
                <tr>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">4</td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                </tr>
                <tr>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">5</td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                </tr>
                <tr>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;">...</td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                </tr>
                <tr>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;" colspan="2">ԸՆԴԱՄԵՆԸ</td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                    <td style="    
                            border: 1px solid  black;
                            border-collapse: collapse;"></td>
                </tr>
                </table>
            </div>
            <table style="width: 100%; border: none !important">
                <tbody>
                    <tr>
                        <td style="border:none !important; width: 50%; text-align: center; padding-right: 10px;">
                            <h6 style="font-weight: 700">ՊԱՏՎԻՐԱՏՈՒ</h6>
                            <p>« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</p>
                            <p v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                            <p v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                            <p>Բանկ՝ {{ me.organisation[0].translations.bank_name.hy }}</p>
                            <p>Հ/Հ {{ me.organisation[0].bank_account }} </p>
                            <p>ՀՎՀՀ {{ me.organisation[0].tin }} </p>
                            <p>______________________</p>
                            <p>ստորագրություն</p>
                        </td>
                        <td style="border:none !important;padding-left: 10px; text-align: center; width: 50%;">
                            <h6 style="font-weight: 700">ԿԱՊԱԼԱՌՈՒ</h6>
                            <p><span class="winner-name">______________</span></p>
                            <p><span class="winner-address">_____________________</span></p>
                            <p>Բանկ՝<span class="winner-bank">___________</span></p>
                            <p>Հ/Հ <span class="winner-bank_account">_____________________</span></p>
                            <p>ՀՎՀՀ <span class="winner-tin">______________</span></p>
                            <p>______________________</p>
                            <p>ստորագրություն</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagebreak/> 
        <br class="page-break"/>
        <div>
            <div style="text-align: right; font-weight: 700;">Հավելված N 3</div>
            <div style="text-align: right; font-weight: 700;"><span class="sign-date">__.__.____</span>թ կնքված</div>
            <div style="text-align: right; font-weight: 700;"><span class="contract-code" style="color: rgb(17, 85, 204);"></span>ծածկագրով պայմանագրի</div>
            <br class="page-break"/>
            <div style="text-align: center; font-weight: 700;">ՎՃԱՐՄԱՆ ԺԱՄԱՆԱԿԱՑՈՒՅՑ*</div>
            <div style="text-align: right; ">ՀՀ դրամ <span style="margin-left: 20px;"/></div>
            <table style=" 
                        width: 100%;
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid  black;
                        text-align: center;"> 
                <thead>
                    <tr>
                        <th class="ft-11" style="border: 1px solid  black;
                                                        border-collapse: collapse;">Գնման առարկայի անվանումը</th>
                        <th class="ft-11" style="border: 1px solid  black;
                                                        border-collapse: collapse;">Վճարման ժամկետը</th>
                    </tr>
                </thead>
                <tbody class="payment-schedule">
                    <tr>
                        <td class="ft-11" style="
                                        border: 1px solid  black;
                                        border-collapse: collapse;
                                        padding: 20px;
                                        text-align: center;
                                ">{{ currentOrganized.name }}</td>
                        <td class="ft-11" style="
                                        border: 1px solid  black;
                                        border-collapse: collapse;
                                        padding: 20px;
                                        text-align: justify;
                                ">{{currentOrganized.payment_schedule_text}}</td>
                    </tr>
                </tbody>
            </table>
            <table style="width: 100%; border: none !important">
                <tbody>
                    <tr>
                        <td style="border:none !important; width: 50%; text-align: center; padding-right: 10px;">
                            <h6 style="font-weight: 700">ՊԱՏՎԻՐԱՏՈՒ</h6>
                            <p>« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</p>
                            <p v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                            <p v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                            <p>Բանկ՝ {{ me.organisation[0].translations.bank_name.hy }}</p>
                            <p>Հ/Հ {{ me.organisation[0].bank_account }} </p>
                            <p>ՀՎՀՀ {{ me.organisation[0].tin }} </p>
                            <p>______________________</p>
                            <p>ստորագրություն</p>
                        </td>
                        <td style="border:none !important;padding-left: 10px; text-align: center; width: 50%;">
                            <h6 style="font-weight: 700">ԿԱՊԱԼԱՌՈՒ</h6>
                            <p><span class="winner-name">______________</span></p>
                            <p><span class="winner-address">_____________________</span></p>
                            <p>Բանկ՝<span class="winner-bank">___________</span></p>
                            <p>Հ/Հ <span class="winner-bank_account">_____________________</span></p>
                            <p>ՀՎՀՀ <span class="winner-tin">______________</span></p>
                            <p>______________________</p>
                            <p>ստորագրություն</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagebreak/> 
        <br class="page-break"/>
        <div>
            <div style="text-align: right; font-weight: 700;">Հավելված N4</div>
            <div style="text-align: right; font-weight: 700;"><span class="sign-date">__.__.____</span>թ կնքված</div>
            <div style="text-align: right; font-weight: 700;"><span class="contract-code" style="color: rgb(17, 85, 204);"></span> ծածկագրով պայմանագրի</div>
            <table style="width: 100%; border: none !important">
                <tbody>
                    <tr>
                        <td style="border:none !important; width: 50%; text-align: center; padding-right: 10px;">
                            <h6 style="font-weight: 700">ՊԱՏՎԻՐԱՏՈՒ</h6>
                            <p>« {{ me.organisation[0].translations.name.hy }} » {{ me.organisation[0].translations.company_type.hy }}</p>
                            <p v-if="me.organisation[0].translations.region.hy === me.organisation[0].translations.city.hy">  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                            <p v-else>{{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}</p>
                            <p>Բանկ՝ {{ me.organisation[0].translations.bank_name.hy }}</p>
                            <p>Հ/Հ {{ me.organisation[0].bank_account }} </p>
                            <p>ՀՎՀՀ {{ me.organisation[0].tin }} </p>
                            <p>______________________</p>
                            <p>ստորագրություն</p>
                        </td>
                        <td style="border:none !important;padding-left: 10px; text-align: center; width: 50%;">
                            <h6 style="font-weight: 700">ԿԱՊԱԼԱՌՈՒ</h6>
                            <p><span class="winner-name">______________</span></p>
                            <p><span class="winner-address">_____________________</span></p>
                            <p>Բանկ՝<span class="winner-bank">___________</span></p>
                            <p>Հ/Հ <span class="winner-bank_account">_____________________</span></p>
                            <p>ՀՎՀՀ <span class="winner-tin">______________</span></p>
                            <p>______________________</p>
                            <p>ստորագրություն</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h6 style="text-align: center; margin-top: 3rem;">
                ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ N
            </h6>
            <h6 style="text-align: center; ">
                ՊԱՅՄԱՆԱԳՐԻ ԿԱՄ ԴՐԱ ՄԻ ՄԱՍԻ ԿԱՏԱՐՄԱՆ ԱՐԴՅՈՒՆՔՆԵՐԻ ՀԱՆՁՆՄԱՆ-ԸՆԴՈՒՆՄԱՆ
            </h6>
            <p style="text-align: left; ">« &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     » «  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        	»  20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	թ.</p>
            <h6 style="text-align: center; ">
                Պայմանագրի &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/այսուհետ`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Պայմանագիր/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; անվանումը`
            </h6>
            <h6 style="text-align: center; ">_____________________________________________________________________________________</h6>
            <h6 style="text-align: left; ">
                Պայմանագրի կնքման ամսաթիվը` «____» «__________________» 20 թ.
            </h6>
            <h6 style="text-align: left; ">
                Պատվիրատուն  և  Պայմանագրի կողմը՝  հիմք  ընդունելով  պայմանագրի  կատարման  վերաբերյալ      « &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      »      «  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	                »  20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     թ. դուրս գրված N ___   հաշիվ ապրանքագիրը, կազմեցին սույն արձանագրությունը հետևյալի մասին.
            </h6>
            <h6 style="text-align: left; ">
                Պայմանագրի շրջանակներում Պայմանագրի կողմը  կատարել է հետևյալ աշխատանքները՝
            </h6>
            <table style="
                         
                        font-size: 10px;
                        width: 100%;
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid  black;
                        text-align: center;
                    ">
                        <tbody><tr>
                            <th rowspan="3" style="border: 1px solid  black;
                                            border-collapse: collapse;">N</th>
                            <th colspan="8" style="border: 1px solid  black;
                                            border-collapse: collapse;">
                                Կատարված աշխատանքների
                            </th>
                        </tr>
                        <tr>
                            <th rowspan="2" style="border: 1px solid  black;
                                            border-collapse: collapse;">անվանումը</th>
                            <th rowspan="2" style="border: 1px solid  black;
                                            border-collapse: collapse;">տեխնիկական բնութագրի համառոտ շարադրանքը</th>
                            <th colspan="2" style="border: 1px solid  black;
                                            border-collapse: collapse">քանակական ցուցանիշը
                            </th>
                            <th colspan="2" style="border: 1px solid  black;
                                            border-collapse: collapse;">կատարման ժամկետը</th>
                            <th rowspan="2" style="border: 1px solid  black;
                                            border-collapse: collapse;">Վճարման ենթակա գումարը /հազար դրամ/</th>
                            <th rowspan="2" style="border: 1px solid  black;
                                            border-collapse: collapse;">Վճարման ժամկետը /ըստ վճարման ժամանակացույցի/</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid  black;
                                        border-collapse: collapse;">պայմանագրով հաստատված գնման ժամանակացույցի</th>
                            <th style="border: 1px solid  black;
                                        border-collapse: collapse;">փաստացի</th>
                            <th style="border: 1px solid  black;
                                        border-collapse: collapse;">ըստ պայմանագրով հաստատված գնման ժամանակացույցի</th>
                            <th style="border: 1px solid  black;
                                        border-collapse: collapse;">փաստացի
                            </th>
                        </tr>
                        <tr>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                            <td style="border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                        </tr>
                    </tbody>
            </table>
            <h6 style="text-align: center; margin-top: 3rem; ">
                Սույն արձանագրության երկկողմ հաստատման համար հիմք հանդիսացած հաշիվ ապրանքագիրը և դրական եզրակացությունը հանդիսանում են սույն արձանագրության բաղկացուցիչ մասը և կցվում են:
            </h6>
            <table style="width: 100%; border: none !important;">
                <tbody>
                    <tr>
                        <td style="text-align: center; width: 50%; border: none !important">
                            <h6 class="ft-11">Աշխատանքը հանձնեց</h6>
                            <h6>__________________________________</h6>
                            <h6>ստորագրություն</h6>
                            <h6>__________________________________</h6>
                            <h6>ազգանուն, անուն</h6>
                        </td>
                        <td>
                            <div style="text-align: center; width: 50%; border: none !important">
                                <h6 class="ft-11">Աշխատանքը ընդունեց</h6>
                                <h6>________________________________</h6>
                                <h6>ստորագրություն</h6>
                                <h6>________________________________</h6>
                                <h6>ազգանուն, անուն</h6>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pagebreak/> 
        <br class="page-break"/>
        <div>
            <h6 style="text-align: right; font-weight: 700;">Հավելված N 4.1</h6>
            <h6 style="text-align: right; font-weight: 700;"><span class="sign-date">__.__.____</span>թ կնքված</h6>
            <h6 style="text-align: right; font-weight: 700;"><span class="contract-code" style="color: rgb(17, 85, 204);"></span>ծածկագրով պայմանագրի</h6>
            <h6 style="margin-top: 3rem; text-align: center; font-weight: 700;">
                ԱԿՏ  N
            </h6>
            <h6 style="text-align: left;">
                պայմանագրի արդյունքը Պատվիրատուին հանձնելու փաստը ֆիքսելու վերաբերյալ
            </h6>
            <h6 style="text-align: left;">Սույնով արձանագրվում է, որ   -ի (այսուհետ` Պատվիրատու)   և   	        -ի</h6>	
            <p style="font-size: 14px; text-align: left;">Պատվիրատուի անունը    Կատարողի անունը</p>
            <h6 style="text-align: left;">
                (այսուհետ` Կատարող) միջև 20թ. -ին կնքված N 
            </h6>
            <p style="font-size: 14px; text-align: left;">	պայմանագրի կնքման ամսաթիվը   պայմանագրի համարը
            </p>
            <h6 style="text-align: left;">
                գնման պայմանագրի շրջանակներում Կատարողը  20 թ. -ին հանձնման-ընդունման նպատակով			
            </h6>
            <h6 style="text-align: left;">Պատվիրատուին հանձնեց ստորև նշված աշխատանքները.</h6>
            <table style="
                         
                        text-align: center;
                        width: 100%;
                        table-layout: fixed;
                        border-collapse: collapse;
                        page-break-inside: avoid;
                        border: 1px solid  black;
                    ">
                <tr>
                    <th colspan="3" style="border: 1px solid  black;
                                            border-collapse: collapse;">Աշխատանքի</th>
                </tr>
                <tr>
                    <th style="border: 1px solid  black;
                               border-collapse: collapse;">անվանումը</th>
                    <th style="border: 1px solid  black;
                                border-collapse: collapse;">չափման միավորը</th>
                    <th style="border: 1px solid  black;
                                border-collapse: collapse;">քանակը (փաստացի)</th>
                </tr>
                <tr>
                    <td style = "padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                    <td style = "padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                    <td style = "padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                </tr>
                <tr>
                    <td style = "padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                    <td style = "padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;"></td>
                    <td style = "padding: 20px;
                                        border: 1px solid  black;
                                        border-collapse: collapse;;"></td>
                </tr>
            </table>
            <h6 style="margin-top: 3rem; text-align: justify;">Սույն ակտը կազմված է 2 օրինակից, յուրաքանչյուր կողմին տրամադրվում է մեկական օրինակ:</h6>
            <table style="width: 100%; border: none !important; text-align: center;"> 
                <tbody>
                    <tr>
                        <td style="text-align: center; width: 50%; border: none !important;">
                            <h6 class="ft-11" style="font-weight: 700;">Հանձնեց</h6>
                            <h6 style="margin-top: 30px;">__________________________________</h6>
                            <h6>ազգանուն, անուն</h6>
                            <h6>__________________________________</h6>
                            <h6>ստորագրություն</h6>
                        </td>
                        <td style="text-align: center; width: 50%; border: none !important;">
                            <h6 class="ft-11" style="font-weight: 700;"><span style="margin-left: 25px;"/>Ընդունեց <br> հայտը նախագծած ներկայացուցիչ`</h6>
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
</template>
<script>
import { required } from "vuelidate/lib/validators";
import purchaseTypesLongNamesCased from '@/mixins/purchaseTypes'
import $ from 'jquery';

export default {
    name: 'contract_draft_work_construction',
    mixins: [purchaseTypesLongNamesCased],
    props: ['handleLoaded'],
    data() {
        return {
            inputs: {
                work_names: null,
                work_date: null,
                percent: null,
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
                work_date: {},
                percent: { required },
                daysCount: { required },  
                copyCount: { required },  
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
            return this.$store.getters['organizeItender/currentOrganized']
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
                this.$store.dispatch('organizeItender/update', {id: this.$route.params.id, data: { contract_html_hy: $('#commandment-file').html() }}).then(async(response) => {
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
<style scoped>
    *{
        font-family: GHEA grapalat  !important;
    }
</style>