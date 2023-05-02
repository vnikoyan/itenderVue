<template>
    <div  style="font-size: 14px; font-family: GHEA grapalat ;         
            position: relative;
            width: 100%;
            padding-right: 12px;
            padding-left: 12px;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
            " 
        v-if="isLoaded">
            <div style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700">Հավելված 4.2</div>
            <div style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700">« <span style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204)">{{ tenderData.password }}</span>  »  ծածկագրով</div>
            <div style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700"><span style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204)"> {{getTenderTypeByPlan()}}</span> հրավերի</div>
            <h5 style="font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700"> ՏՈւԺԱՆՔԻ ՄԱՍԻՆ ՀԱՄԱՁԱՅՆԱԳԻՐ </h5>
            <div style="font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700">(որակավորման ապահովում)</div>
            <table style="font-family: GHEA grapalat ; width: 100%" class="ft-11">
                <tbody>
                    <tr>
                        <td class="ft-11" style="width: 50%; text-align: left;">
                            <span class="ft-11" style="font-family: GHEA grapalat ; text-align: left">Երևան</span>
                        </td>
                        <td class="ft-11" style="width: 50%; text-align: right;">
                            <div class="ft-11" style="font-family: GHEA grapalat ; text-align: right">
                                {{organizatorDetails.date}}թ.
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h6 style="text-align: justify;font-size: 14px; font-family: GHEA grapalat ; line-height: 25px">			 							
                <span style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204)">«{{participantInfo.name.hy}}» {{participantInfo.company_type.hy}} - ն</span> 
                ի դեմս Ընկերության տնօրեն					    
                <span style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204)">{{participantInfo.director_name.hy}}ի / {{passportDoc}} /,</span>
                որը գործում է Ընկերության կանոնադրության հիման վրա` (այսուհետև` Ընկերություն), 
                սույնով միակողմանի սահմանում է հետևյալ տուժանքի վճարման համաձայնությունը.
            </h6>
            <h5 style="font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700">1. Համաձայնության առարկան</h5>
            <div style="text-align: justify;">
                1.1 Ընկերությունը մասնակցում է <span style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204)"> {{ tenderData.organizator }} </span> * (այսուհետ` Պատվիրատու) կողմից կազմակերպված`
                <span style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204)"> {{ tenderData.password }} </span>  	                                           
                ծածկագրով գնման ընթացակարգին:   
            </div>
            <div style="text-align: justify;">
                1.2 Որպես գնման ընթացակարգի արդյունքում ընտրված մասնակից, կնքվելիք պայմանագրով նախատեսված պարտավորությունների կատարման համար անհրաժեշտ որակավորման ապահովում, Ընկերությունը, Պատվիրատուին է ներկայացնում սույն տուժանքի համաձայնագիրը և կից վճարման պահանջագիրը` լրացված և հաստատված Ընկերության կողմից:  
            </div>
            <div style="text-align: justify;">
                <div style="text-align: justify;">1.3 Ընկերությունը սույն տուժանքի համաձայնագրին կից ներկայացվող վճարման պահանջագրի (այսուհետ` Պահանջագիր) ստորագրմամբ անհետկանչելիորեն  համաձայնվում է, որ՝ </div>
                <div style="font-size: 14px; font-family: GHEA grapalat ; margin-left: 3rem">
                    <div style="text-align: justify;">ա) Պահանջագրի ստորագրմամբ Ընկերությունը տալիս է իր հավաստումը Պահանջագրի «Վճարման պայմանները» դաշտում լրացված  «ակցեպտավորված վճարման» համար, որի դեպքում նշված գումարի գանձման հետ կապված Ընկերությանը սպասարկող /վճարող/ Բանկը` /այսուհետ` Վճարող Բանկ/ ստացված Պահանջագիրը չի ներկայացնում Ընկերությանը լրացուցիչ համաձայնություն ստանալու համար, քանի որ Ընկերության կողմից Պահանջագրի վրա արդեն դրվել է ստորագրությունը՝ ակցեպտավորման նպատակով: </div>
                    <div style="text-align: justify;">բ) Պահանջագիրը հիմք է հանդիսանում Վճարող Բանկի համար` Պահանջագրով նշված ամբողջ գումարը Ընկերության հաշվից  գանձելու համար՝ առանց լրացուցիչ ակցեպտավորման: </div>
                    <div style="text-align: justify;">գ) Ընկերությունը չի կարող գրավոր կամ այլ եղանակով Վճարող Բանկին կարգադրել Պահանջագրի վրա դրված իր ակցեպտը հետ կանչելու մասին:</div>
                    <div style="text-align: justify;">դ) Ընկերությունը հավաստում է, որ Պահանջագիրը ակցեպտավորել է տուժանքի ամբողջ գումարով:</div>
                    <div style="text-align: justify;">ե) Ընկերությունը սույնով համաձայնում է, որ Վճարող Բանկը որևէ պատասխանատվություն չի կրում Պատվիրատուի կողմից ներկայացված վճարման պահանջի և Պահանջագրի իրավաչափության, վավերականության, ներկայացման ժամկետների և Պահանջագրի կատարումն ապահովելու համար Վճարող Բանկի կողմից իրականացվող գործողությունների համար: </div>
                </div>
            </div>
            <div style="text-align: justify;">
                1.4 Ընկերության կողմից գնման ընթացակարգի արդյունքում կնքված պայմանագիրը չկատարելու կամ ոչ պատշաճ կատարելու դեպքում, եթե այն հանգեցնում է Պատվիրատուի կողմից պայմանագրի միակողմանի լուծման, Պատվիրատուն սույն տուժանքի համաձայնագիրը և կից Պահանջագիրը բնօրինակներով ներկայացնում է Վճարող Բանկին` այդ մասին գրավոր տեղեկացնելով Ընկերությանը: Սույն տուժանքի համաձայնագիրը և կից Պահանջագիրը էլեկտրոնային թվային ստորագրությամբ հաստատված լինելու դեպքում դրանք Վճարող Բանկին են ներկայացվում էլեկտրոնային կրիչներով, ինչպես նաև դրանցից արտատպված թղթային տարբերակներով:
            </div>
            <div style="text-align: justify;">
                1.5 Պատվիրատուն Վճարող բանկին կարող է ներկայացնել այլ լրացուցիչ փաստաթղթեր:
            </div>
            <div style="text-align: justify;">
                1.6 Վճարող Բանկի կողմից Պահանջագրում նշված գումարի վճարման հետևանքով Ընկերության առաջացած ռիսկերի (Ընկերության կրած վնասների) և բացասական հետևանքների համար Բանկը որևէ պատասխանատվություն չի կրում: Բանկը պարտավոր չէ ստուգելու Ընկերության կողմից պայմանագրի պայմանները խախտելու փաստերը:
            </div>
            <div style="text-align: justify;">
                1.7 Այն դեպքում, երբ Ընկերության հաշվի միջոցները չեն բավարարում՝ Վճարող բանկը վճարման պահանջագիրը ստանալուց հետո՝ 2 (երկու) աշխատանքային օրվա ընթացքում պետք է տեղեկացնի Պատվիրատուին՝ գրավոր ձևով:
            </div>
            <div style="text-align: justify;">
                1.8 Սույն համաձայնագիրը և կից Պահանջագիրը Բանկ ներկայացնելուց հետո, Բանկից անկախ պատճառներով, տասն աշխատանքային օրվա ընթացքում Պատվիրատուին գումարը չվճարվելու դեպքում, Պատվիրատուն չվճարման հետ կապված Ընկերության մասին տեղեկությունները փոխանցում է &lt;ԱՔՌԱ Քրեդիթ Ռեփորթինգ ՓԲԸ&gt;(Վարկային բյուրո):
            </div>
            <h5 style="font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700">2. Այլ պայմաններ</h5>
            <div style="text-align: justify;">
                2.1 Սույն համաձայնագիրը և Պահանջագիրը անհետկանչելի են, ուժի մեջ են մտնում Ընկերության կողմից վավերացման պահից և ուժի մեջ են մինչև Պատվիրատուի կողմից կնքված պայմանագրի կատարման արդյունքը ամբողջական ընդունվելու օրվան հաջորդող քսաներորդ աշխատանքային օրը ներառյալ։
            </div>
            <div style="text-align: justify;">
                2.2.Սույն համաձայնագիրը և կից Պահանջագիրը Պատվիրատուի կողմից Վճարող Բանկին ներկայացնելով` 
            </div>
            <div style="text-align: justify;">
                2.2.1. Պատվիրատուի կողմից հավաստվում է, որ Ընկերությունը թույլ է տվել պայմանագրային պարտավորությունների խախտում, իսկ
            </div>
            <div style="text-align: justify;">
                2.2.2. Ընկերության կողմից հավաստվում է, որ սույն տուժանքի համաձայնագիրը և կից Պահանջագիրը պատշաճ ստորագրված է Ընկերության իրավասու անձի կողմից:
            </div>
            <div style="text-align: justify;">2.3 Սույն Համաձայնագրի կապակցությամբ ծագած վեճերը լուծվում են բանակցությունների միջոցով։ Համաձայնություն ձեռք չբերելու դեպքում վեճերը լուծվում են դատական կարգով։</div>
            <h5 style="font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700">3. Ընկերության հասցեն, բանկային վավերապայմանները`</h5>
            <div style="margin: 20px 0 40px;"> 
                <table style="width: 100%">
                    <tr>
                        <td style="text-align: left">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ;">Ընկերության անվանումը`</p>
                        </td>
                        <td style="text-align: right">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204); font-weight: 700;">«{{participantInfo.name.hy}}» {{participantInfo.company_type.hy}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ;">Ընկերության հասցեն`</p>
                        </td>
                        <td style="text-align: right">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204); font-weight: 700;">{{participantInfo.address.hy}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ;">Ընկերությանը սպասարկող բանկի անվանումը` </p>
                        </td>
                        <td style="text-align: right">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204); font-weight: 700;">{{participantInfo.bank_name.hy}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ;">Ընկերության բանկային հաշվեհամարը` </p>
                        </td>
                        <td style="text-align: right">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204); font-weight: 700;">{{participantMainInfo.bank_account}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ;">Ընկերության հարկ վճարողի հաշվառման համարը` </p>
                        </td>
                        <td style="text-align: right">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204); font-weight: 700;">{{participantMainInfo.tin}}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ;">Ընկերության տնօրենի անունը, ազգանունը և ստորագրությունը` </p>
                        </td>
                        <td style="text-align: right">
                            <p class="ft-11" style="font-size: 14px; font-family: GHEA grapalat ; color: rgb(17, 85, 204); font-weight: 700;">{{participantInfo.director_name.hy}}</p>
                        </td>
                    </tr>
                </table>
            </div>
            <p>Կ.Տ</p>
            <p>{{organizatorDetails.date}}թ.</p>
            <i>* լրացվում է հանձնաժողովի քարտուղարի կողմից` մինչև հրավերը տեղեկագրում հրապարակելը:</i>
        <pagebreak/>
        <br class="page-break"/>
        <div style="font-size: 14px; font-family: GHEA grapalat ; margin-top: 20px"> 
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; width: 100%; border: 1px solid black;">
                    <th colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; padding: 10px; border: 1px solid black;">1. <span style="margin-left: 300px">ՎՃԱՐՄԱՆ ՊԱՀԱՆՋԱԳԻՐ*</span></th>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; width: 100%; border: 1px solid black;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; padding: 10px; border: 1px solid black;">2. Թիվ </td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; width: 100%; border: 1px solid black;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; padding: 10px; border: 1px solid black;">3. Ներկայացման ամսաթիվը`</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; width: 100%; border: 1px solid black;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;" v-if="!participantMainInfo.id_card_number">4. Վճարողի անվանումը, կամ անուն ազգանուն Ընկերություն ` «{{participantInfo.name.hy}}» {{participantInfo.company_type.hy}}</td>
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;" v-else>4. Վճարողի անվանումը, կամ անուն ազգանուն {{participantInfo.director_name.hy}}</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">5. Վճարողին սպասարկող Ֆինանսական կազմակերպություն (բանկ)` {{participantInfo.bank_name.hy}}</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">6. Վճարողի հաշվի համարը` {{participantMainInfo.bank_account}} </td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">7. Վճարողի ՀՎՀՀ` {{participantMainInfo.tin}}</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">8. Վճարողի ՀԾՀ`</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">9. Շահառուի  անվանումը, կամ անուն ազգանուն` {{tenderData.organizator}}</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">10. Շահառուի  ՀԾՀ (չի լրացվում)</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid black; padding: 10px;">11. Շահառուի ՀՎՀՀ` {{organizatorDetails.hvhh}}</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">12. Շահառուին  սպասարկող Ֆինանսական կազմակերպություն (բանկ)` {{organizatorDetails.bank}}</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">13. Շահառուի հաշվի համարը (հշ.N) {{organizatorDetails.cashNumbers}}</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">14. Գումարը (թվերով և բառերով)` {{countPercentage}} ({{countPercentageSumWord}})</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">15. Ակցեպտավորված գումարը՝  (թվերով և բառերով)  (նախատեսված է նշված գումարի մասնակի ակցեպտի համար, որը չի կիրառվում)</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">16. Արժույթը (բառերով և կոդով)` ՀՀ դրամ, AMD</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">17. Գործարքի (վճարման) նպատակը`  (որակավորման ապահովման համար)</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; padding: 10px;">18. Վճարման կատարման հիմքերը՝ (Փաստաթղթերի անվանումը, այդ թվում՝ տուժանքի մասին համաձայնագիրը, դրանց համարները, պայմանագրի  ծածկագիրը որի հիման վրա կատարվում է  գանձումը)` <span style="color: rgb(17, 85, 204);">{{tenderData.password}}</span></td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; width: 100%; border: 1px solid black;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; padding: 10px; border: 1px solid black;">19. Վճարման պայմանները՝ &lt;ակցեպտավորված վճարում&gt; </td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td colspan="2" style="font-size: 14px; font-family: GHEA grapalat ; padding: 10px; border: 1px solid black;">20. Առդիր էջերի քանակը՝ --- էջ</td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td style="font-size: 14px; font-family: GHEA grapalat ; width: 50%; border: 1px solid black; padding: 10px;"> 
                        <p>22.ա. Շահառուի ստորագրությունները</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; margin-top: 1rem">/______________________/</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; margin-top: 1rem">/______________________/</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; margin-top: 1rem">22.բ.</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; margin-top: 1rem">Կ.Տ.</p>
                    </td>
                    <td style="font-size: 14px; font-family: GHEA grapalat ; width: 50%; border: 1px solid black; padding: 10px; background-color: #c0e2ff;">
                        <p>21.ա.  Վճարողի ստորագրությունները`</p> 
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; margin-top: 1rem">/______________________/</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; margin-top: 1rem">/______________________/</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; margin-top: 1rem">21.բ.</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; margin-top: 1rem">Կ.Տ.</p>
                    </td>
                </tr>
                <tr style="border-collapse: collapse;font-size: 14px; font-family: GHEA grapalat ; border: 1px solid black; width: 100%;">
                    <td style="font-size: 14px; font-family: GHEA grapalat ; width: 50%; border: 1px solid black; padding: 10px;">
                        <p>24.ա. Շահառուին  սպասարկող ֆինանսական կազմակերպություն </p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; margin-top: 1rem">/______________________/</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right">/ստորագրություն/</p>
                        <div style="font-size: 14px; font-family: GHEA grapalat ; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify;-ms-flex-pack: justify; justify-content: space-between; margin-top: 30px">
                            <p>24.բ.</p>
                            <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right">Կ.Տ.</p>
                        </div>
                        <div style="font-size: 14px; font-family: GHEA grapalat ; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify;
                            -ms-flex-pack: justify; justify-content: space-between; margin-top: 1rem">
                            <p>24.գ.</p>
                            <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right">"___" ___ 20___ թ.</p>
                        </div>
                    </td>
                    <td style="font-size: 14px; font-family: GHEA grapalat ; width: 50%; border: 1px solid black; padding: 10px;">
                        <p>23.ա. Վճարողին  սպասարկող ֆինանսական կազմակերպություն</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right; margin-top: 1rem">/______________________/</p>
                        <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right">/ստորագրություն/</p>
                        <div style="font-size: 14px; font-family: GHEA grapalat ; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify;
                            -ms-flex-pack: justify; justify-content: space-between; margin-top: 30px">
                            <p>23.բ</p>
                            <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right">Կ.Տ.</p>
                        </div>
                        <div  style="font-size: 14px; font-family: GHEA grapalat ; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify;
                            -ms-flex-pack: justify; justify-content: space-between; margin-top: 1rem">
                            <p>23.գ.Կատարման ամսաթիվը`</p>
                            <p style="font-size: 14px; font-family: GHEA grapalat ; text-align: right">"___" ___ 20___ թ.</p>
                        </div>
                    </td>
                </tr>
            </table>
            <div style="text-align: justify; font-size: 14px; font-family: GHEA grapalat ; margin-top: 20px;">
                <i>* Վճարման պահանջագիրը լրացվում է համաձայն սույն հրավերով սահմանված «Վճարման պահանջագրի պարտադիր վավերապայմանների և լրացման կարգի»:</i>
            </div>
        </div>
	</div>
</template>

<script>
import purchaseTypes from '@/mixins/purchaseTypes'

export default {
    name: 'application_announcement_qualification_assurance',
    mixins: [purchaseTypes],
    components: {},
    props: ['handleLoaded', 'tender'],
    data() {
        return {
            countPercentage: 0,
            organizatorDetails: {},
            participantInfo: {},
            participantsSequence: [],
            countPercentageSumWord: 0,
            rows: [],
            beneficiaries: [],
            passportDoc: '',
            totalMembers: 0,
            isWithArmenianResources: false,
			isLoaded: false,
        }
    },
    async mounted() {
		this.participantMainInfo = this.me.organisation[0]
		this.participantInfo = this.me.organisation[0].translations
		this.isWithArmenianResources = this.tender.isWithArmenianResources
		this.rows = this.tender.selectedRows
		this.beneficiaries = this.tender.realBeneficiaries
		this.workersCount = this.tender.workersCount
        this.organizatorDetails = this.tender.fields
		this.tenderData = this.tender.tender
        this.passportDoc = this.organizatorDetails.document
        if(this.organizatorDetails.sum <= (10**7) * 8 ){
            this.countPercentage = (this.organizatorDetails.sum * 15) / 100
        }
        if(this.organizatorDetails.sum > (10**7) * 8 ){
            this.countPercentage = (this.organizatorDetails.sum * 30) / 100
        }
        this.countPercentage = this.countPercentage.toFixed(2)
        if(this.countPercentage.slice(-2,this.countPercentage.length) === '00'){
            this.countPercentage = parseInt(this.countPercentage)
        }
        this.countPercentageSumWord = await this.numberToWord(this.countPercentage)
        await this.rows.forEach(async (row, index) => {
            if(index === this.rows.length-1){
                this.isLoaded = true;
                await this.handleLoaded()
            }
        })
    },
    computed: {
        me() {
            return this.$store.getters['user/me']
        },
    },
    methods: {
        save() {
            alert()
        },
        consoleLog(msg) {
            console.log(msg)
        },
		fixIncorrectWords(word) {
			return word.replace('միլիօն', 'միլիոն').replace('ստորակել', 'ամբողջ')
		},
		async numberToWord(number) {
			const { data } = await this.$client.post('numberToWord', {number})
			return data;
		},
        getTenderTypeByPlan(){
			return this.purchaseTypesLongNamesCased.hy[this.tenderData.procedure.id];
        },
    },
}
</script>

<style>
    p{
        margin-bottom: 0;
    }
</style>
<style scoped>
    *{
        font-family: GHEA grapalat  !important;
        float: none;
    }
</style>