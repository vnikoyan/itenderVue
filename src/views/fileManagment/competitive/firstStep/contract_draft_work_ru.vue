<template>
    <div  id="commandment-file" ref="contract" contenteditable="true"> 
        <div>
            <div style="text-align: right; font-weight: 700;">Приложение N 6</div>
            <div style="text-align: right; font-weight: 700;">К Приглашению <span style="color: rgb(17, 85, 204);" class="getOrgnizeTypeByPlanRu">{{getOrgnizeTypeByPlan}}</span></div>
            <div style="text-align: right; font-weight: 700;">Под кодом <span class="contract-code-ru" style="color: rgb(17, 85, 204);">«{{ currentOrganized.translations.code.ru }}»</span></div>
            <br/>
            <div style="text-align: center; font-weight: 700;">ДОГОВОР ГОСУДАРСТВЕННОЙ ЗАКУПКИ</div>
            <div style="text-align: center; font-weight: 700;">НА ВЫПОЛНЕНИЕ РАБОТ ДЛЯ НУЖД ГОСУДАРСТВА</div>
            <div style="text-align: center; font-weight: 700;">№ <span class="contract-code" style="color: rgb(17, 85, 204);"> {{ currentOrganized.translations.code.ru }}</span></div>
            <br/>
            <table style="width: 100%; border: none !important">
                <tbody>
                    <tr>
                        <td style="border:none !important;">
                            <div style="padding: 0 !important; text-align: left">
                                <h6>Г. <span class="ft-11" style="color: rgb(17, 85, 204);">{{ me.organisation[0].translations.city.ru }}</span></h6>
                            </div>
                        </td>
                        <td>
                            <div style="padding: 0 !important; text-align: right">
                                <h6><span style="color: rgb(17, 85, 204);" class="sign-date">__.__.____</span>г.</h6>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <div style="text-align: justify">
                «<span style="color: rgb(17, 85, 204);">{{ me.organisation[0].translations.name.ru }}</span>», в лице
                <span style="color: rgb(17, 85, 204);">{{ me.organisation[0].translations.director_name.ru }}</span>, действующего на основании устава
                «<span style="color: rgb(17, 85, 204);">{{ me.organisation[0].translations.name.ru }}</span>» 
                (далее — "Заказчик), с одной стороны, и 
                <span class="winner-name">_______</span>, в лице директора<span class="winner-director">_______</span>, 
                действующего на основании устава <span class="winner-name">_______</span> (далее — Исполнитель), с другой стороны, заключили настоящий Договор о следующем.
            </div>
            <br/>
            <div style="text-align: center; font-weight: 700;">1. Предмет договора</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>1.1. Заказчик поручает, а Исполнитель принимает обязательство по выполнению <editor-input class="editor-input" type="text" style="border: 0; border-bottom: 1px solid #303030;" onkeypress="this.style.width = ((this.value.length + 1) * 12 + 5) + 'px';" inputName="work" ref="work" v-model="$v.inputs.work.$model" /> работ (далее — работа), согласно требованиям Технической характеристики-графика закупки, установленной Приложением № 1, составляющим неотъемлемую часть настоящего договора (далее — договор).</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>1.2. Работа выполняется в соответствии с установленной Приложением № 1 к договору Технической характеристикой-графиком закупки и в установленные сроки.</div>
            <br/>
            <div style="text-align: center; font-weight: 700;">2. ПРАВА И ОБЯЗАННОСТИ СТОРОН</div>
            <div style="font-weight: 700;">2.1. Заказчик имеет право:</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.1.1. В любое время проверять ход и качество выполняемой Исполнителем работы, без вмешательства в деятельность Исполнителя.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.1.2.  Если выполнена работа, не соответствующая Технической характеристике-графику закупки, указанной в Приложении № 1 к договору:</div>
            <div style="text-align: justify;"><span style="margin-left: 40px;"/>а) Не принимать работу, с установлением по своему усмотрению разумного срока безвозмездной замены работы ненадлежащего качества на работу соответствующего договору качества, и требовать от Исполнителя уплаты штрафа, предусмотренного пунктом 5.2 договора, а также пени, предусмотренной пунктом 5.3 договора;</div>
            <div style="text-align: justify;"><span style="margin-left: 40px;"/>б) Отказываться от исполнения договора и требовать возврата уплаченной за работу суммы, а также требовать от Исполнителя уплаты предусмотренного пунктом 5.2 договора штрафа.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.1.3.  В одностороннем порядке расторгать договор, если Исполнитель существенным образом нарушил договор. Нарушение договора Исполнителем считается существенным, если:</div>
            <div style="text-align: justify;"><span style="margin-left: 40px;"/>а) выполненная работа не соответствует требованиям, установленным Приложением № 1 к договору;</div>
            <div><span style="margin-left: 40px;"/>б) нарушен срок выполнения работы.</div>
            <div style="font-weight: 700;">2.2. Заказчик обязан:</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.2.1.  Обсуждать и принимать результат работы, выполненной в соответствии с Технической характеристикой-графиком закупки, а в случаях выявления недостатков в результате работы — незамедлительно в письменной форме уведомлять об этом Исполнителя.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.2.2. В случае приемки результата работы, уплачивать Исполнителю суммы, подлежащие уплате последнему, а в случае нарушения срока — также предусмотренную пунктом 5.5 договора пеню.</div>
            <div style="font-weight: 700;">2.3. Исполнитель имеет право:</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.3.1. Требовать от Заказчика подлежащие уплате ему суммы, а в случае нарушения Заказчиком срока, указанного в пункте 4.2 договора — также предусмотренную пунктом 5.5 договора пеню.</div>
            <div style="font-weight: 700;">2.4. Исполнитель обязан:</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.4.1. Обеспечивать выполнение работы по условиям, установленным Приложением № 1 к договору, руководствуясь действующим законодательством.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.4.2. В предусмотренных договором случаях уплачивать предусмотренные пунктами 5.2 и 5.3 договора пеню и штраф.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>2.4.3. В течение срока действия обеспечений квалификации и договора в случае начала процесса ликвидации или банкротства заранее в письменной форме уведомлять об этом Заказчика.</div>
            <br/>
            <div style="text-align: center; font-weight: 700;">3. ПОРЯДОК СДАЧИ И ПРИЕМКИ РАБОТЫ</div>
            <div v-if="currentOrganized.organize_type === '1'">
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>3.1. Выполненная работа принимается подписанием акта сдачи-приемки между Заказчиком и Исполнителем. Факт сдачи работы Заказчику фиксируется утвержденным в двустороннем порядке документом между Заказчиком и Исполнителем, с указанием даты составления документа.</div>
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>Включительно до дня, предусмотренного для выполнения работы по договору, Исполнитель предоставляет Заказчику подписанный им документ, фиксирующий факт сдачи работы Заказчику (Приложение № 3.1), а посредством системы электронных закупок armeps (пособие по осуществлению действия размещено в разделе "Электронные закупки" интернет-сайта, действующего по адресу: www.procurement.am) — также акт сдачи-приемки (Приложение № 3). При этом Исполнитель не скрепляет печатью акт сдачи-приемки, утверждает электронной подписью, заполняя только те графы, которые относятся к его данным (порядок заполнения размещен в подразделе "Приказы Министра финансов" раздела "Законодательство" интернет-сайта, действующего по адресу: www.procurement.am).</div>
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>3.2. Если выполненная работа соответствует условиям договора, Заказчик в течение <editor-input class="editor-input" type="text" style="border: 0; border-bottom: 1px solid #303030;" onkeypress="this.style.width = ((this.value.length + 1) * 12 + 5) + 'px';" inputName="days" ref="days" v-model="$v.inputs.days.$model" /> рабочих дней с рабочего дня, следующего за днем получения документов, указанных в пункте 3.1 договора, подписывает и посредством системы электронных закупок armeps предоставляет Исполнителю подписанный им акт сдачи-приемки, а также положительное заключение, послужившее основанием для его подписания.</div>
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>3.3. Если выполненная работа или ее часть не соответствует условиям договора, то Заказчик не подписывает акт сдачи-приемки и в указанный в пункте 3.2. настоящего договора срок, посредством системы электронных закупок armeps, возвращает Исполнителю акт сдачи-приемки, а также отрицательное заключение, послужившее основанием для его неподписания. В случае применения настоящего пункта Заказчик предпринимает меры, предусмотренные договором для подобной ситуации и в отношении Исполнителя применяет меры ответственности, предусмотренные договором.</div>
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>3.4. Если в срок, установленный пунктом 3.2 договора, Заказчик не принимает выполненной работы или не отказывается принимать ее, то выполненная работа считается принятой, и на следующий рабочий день после установленного пунктом 3.2 договора окончательного срока Заказчик посредством системы электронных закупок предоставляет Исполнителю подписанный им акт сдачи-приемки.</div>
            </div>
            <div v-if="currentOrganized.organize_type === '0'">
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>3.1. Выполненная работа принимается подписанием акта сдачи-приемки между Заказчиком и Исполнителем. Факт сдачи работы Заказчику фиксируется утвержденным в двустороннем порядке документом между Заказчиком и Исполнителем, с указанием даты составления документа.</div>
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>Включительно до дня, предусмотренного для выполнения работы по договору, Исполнитель предоставляет Заказчику подписанный им документ, фиксирующий факт сдачи работы Заказчику (Приложение № 3.1) и <editor-input class="editor-input" type="text" style="border: 0; border-bottom: 1px solid #303030;" onkeypress="this.style.width = ((this.value.length + 1) * 12 + 5) + 'px';" inputName="amount" ref="amount" v-model="$v.inputs.amount.$model" /> экземпляр акта сдачи-приемки (Приложение № 3).</div>
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>3.2. Акт сдачи-приемки подписывается, если выполненная работа соответствует условиям договора. В противном случае результаты исполнения договора или его части не принимаются, акт сдачи-приемки не подписывается и Заказчик:</div>
                <div style="text-align: justify;"><span style="margin-left: 40px;"/>а) для урегулирования вопроса предпринимает меры, предусмотренные договором для подобной ситуации;</div>
                <div style="text-align: justify;"><span style="margin-left: 40px;"/>б) в отношении Исполнителя применяет меры ответственности, предусмотренные договором.</div>
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>3.3. Заказчик в течение <editor-input class="editor-input" type="text" style="border: 0; border-bottom: 1px solid #303030;" onkeypress="this.style.width = ((this.value.length + 1) * 12 + 5) + 'px';" inputName="work_days" ref="work_days" v-model="$v.inputs.work_days.$model" /> рабочих дней с рабочего дня, следующего за днем получения акта сдачи-приемки представляет Исполнителю один экземпляр подписанного им акта сдачи-приемки либо мотивированное отклонение непринятия работы.</div>
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>3.4.  Если в срок, установленный пунктом 3.3 договора, Заказчик не принимает выполненной работы или не отказывается принимать ее, то выполненная работа считается принятой, и на следующий рабочий день после установленного пунктом 3.3 договора окончательного срока Заказчик предоставляет Исполнителю утвержденный им акт сдачи-приемки.</div>
            </div>
            <br/>
            <div style="text-align: center; font-weight: 700;">4. ЦЕНА ДОГОВОРА</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>4.1. Цена подлежащей выполнению Исполнителем работы по настоящему договору составляет <span class="contract-price">_______</span> (<span class="contract-price-word">__прописью____________</span>) драмов РА, включая НДС.</div>
            <div style="text-align: justify;"><span style="margin-left: 40px;"/>Цена включает все осуществляемые Исполнителем расходы, в том числе налоги, пошлины и установленные законодательством Республики Армения иные платежи.</div>
            <div style="text-align: justify;"><span style="margin-left: 40px;"/>Цена выполнения работы стабильна, и Исполнитель не вправе требовать увеличения, а Заказчик — снижения этой цены.</div>
            <div v-if="+currentOrganized.prepayment" style="text-align: justify;"><span style="margin-left: 25px;"/>4.1.1.  Заказчик перечисляет сумму в размере до {{ currentOrganized.prepayment_max }} драмов Республики Армения от цены договора на банковский счет Исполнителя в качестве предоплаты. Погашение предоплаты осуществляется в форме уменьшений (удержаний) из выплат, производимых на основании актов сдачи-приемки. При этом до полного погашения предоплаты платежи Исполнителю не производятся.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>4.2. Заказчик платит за выполненную работу в драмах Республики Армения, в безналичной форме, путем перечисления денежных средств на расчетный счет Исполнителя. Перечисление денежных средств производится на основании акта сдачи-приемки в течение месяцев, предусмотренных графиком оплаты договора (Приложение № 2), но не позднее чем до ---- ого декабря данного года.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>При этом, с целью совершения платежа, заказчик в течение 3 рабочих дней со дня подписания протокола передачи-приема вносит платежное поручение и копию протокола передачи-приема в казначейскую систему уполномоченного органа, а на основании документов, представленных согласно установленному порядку, уполномоченный орган в случае поступления в казначейскую систему протокола передачи-приема производит данный платеж в сроки, установленные графиком օплаты настоящего Договора, в течение пяти рабочих дней.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>При этом оплата за закупку осуществляется в срок, установленный графиком oплаты настоящего Договора, в течение пяти рабочих дней.</div>
            <br/>
            <div style="text-align: center; font-weight: 700;">5. ОТВЕТСТВЕННОСТЬ СТОРОН</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>5.1. Исполнитель несет ответственность за соблюдение требований настоящего Договора к выполнению работы.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>5.2. В каждом случае выполнения работы, не соответствующей указанной в Приложении № 1 к договору технической характеристике, с Исполнителя взимается штраф в размере 0,5 (ноль целых пять десятых) процента от суммы, предусмотренной в пункте 4.1 договора.</div>
            <div v-if="currentOrganized.is_with_condition" style="text-align: justify;"><span style="margin-left: 40px;"/>При заключении Договора на основании пункта 6 статьи 15 Закона Республики Армения "О закупках", штраф исчисляется по отношению к цене соглашения, в рамках которого зафиксировано обстоятельство неисполнения или ненадлежащего исполнения взятых на себя обязательств.</div>
            <div style="text-align: justify;"><span style="margin-left: 40px;"/>Если договор включает в себя больше одного лота, то штраф исчисляется в отношении общей цены, установленной договором на этот лот.</div>
            <div style="text-align: justify;"><span style="margin-left: 40px;"/>При этом, штраф рассчитывается также при выполнении работ в срок, установленный настоящим договором, но в случае их непринятия заказчиком.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>5.3. В случае нарушения предусмотренного договором срока выполнения работы с Исполнителя за каждый просроченный  рабочий день взимается пеня в размере 0,05 (ноль целых пять сотых) процента от цены подлежащей выполнению, но невыполненной работы.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>5.4. Предусмотренные пунктами 5.2 и 5.3 договора штраф и пеня исчисляются и зачитываются вместе с суммами, подлежащими уплате Исполнителю в результате выполнения работы.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>5.5. За нарушение Заказчиком предусмотренного пунктом 4.2 договора срока, в отношении Заказчика за каждый просроченный рабочий день исчисляется пеня в размере 0,05 (ноль целых пять сотых) процента от подлежащей уплате, но не уплаченной суммы.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>5.6. В непредусмотренных договором случаях за неисполнение или ненадлежащее исполнение своих обязательств стороны несут ответственность в порядке, установленном законодательством Республики Армения.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>5.7. Уплата пеней и (или) штрафов не освобождает стороны от полного исполнения своих договорных обязательств.</div>
            <br/>
            <div style="text-align: center; font-weight: 700;">6. ДЕЙСТВИЕ НЕПРЕОДОЛИМОЙ СИЛЫ (ФОРС-МАЖОР)</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>Стороны освобождаются от ответственности за полное или частичное неисполнение обязательств по настоящему договору и соглашениям, заключенным на основании настоящего договора, если это явилось следствием действия непреодолимой силы, которая возникла после заключения настоящего договора, и которую стороны не могли предусмотреть или предотвратить. Такими ситуациями являются землетрясение, наводнение, пожар, война, объявление военного и чрезвычайного положения, политические волнения, забастовки, прекращение работ средств коммуникации, акты государственных органов и т. д., которые делают невозможным исполнение обязательств по настоящему Договору. Если действие чрезвычайной силы длится более 3 (трех) месяцев, то каждая из сторон имеет право расторгнуть договор, предварительно уведомив об этом другую сторону.</div>
            <br/>
            <div style="text-align: center; font-weight: 700;">7. ИНЫЕ УСЛОВИЯ</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.1. Настоящий Договор вступает в силу с момента его подписания сторонами и действует до исполнения в полном объеме обязательств, принятых сторонами по настоящему Договору.</div>
            <div v-if="currentOrganized.rights_responsibilities_fulfillment" style="text-align: justify;"><span style="margin-left: 25px;"/>Условием исполнения сторонами прав и обязанностей, предусмотренных договором, является обстоятельство учета договора Министерством финансов Республики Армения.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.2. Возникающее из договора платежное обязательство стороны не может прекратиться зачетом встречного обязательства, возникающего из другого договора, без письменного и утвержденного печатью соглашения сторон. Право требования, вытекающее из договора , не может быть передано другому лицу без письменного согласия стороны должника.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.3. В том случае, когда в установленном законом порядке в результате контроля либо надзора или рассмотрения жалоб в отношении выполнения требований закона констатируется, что в процессе закупки Исполнитель до заключения договора представил поддельные документы (сведения и данные), или решение о признании последнего отобранным участником не соответствует законодательству Республики Армения, то после выявления данных оснований Заказчик в одностороннем порядке расторгает договор, если выявленные нарушения, в случае если бы о них стало известно до заключения договора, послужили бы основанием для незаключения договора согласно законодательству Республики Армения о закупках. При этом Заказчик не несет риска убытков или упущенной выгоды, возникающих для Исполнителя в результате одностороннего расторжения договора, а последний обязан в порядке, установленном законодательством Республики Армения, возместить понесенные по его вине убытки Заказчика в том объеме, по части которого был расторгнут договор.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.4. Споры в связи с договором подлежат рассмотрению в судах Республики Армения.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.5. Изменения и дополнения могут быть внесены в договор исключительно с взаимного согласия сторон — посредством заключения соглашения, которое будет являться неотъемлемой частью договора.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>Запрещается внесение в договор, а если цена договора факторная, то также в соглашение к данному договору, заключаемое в каждом последующем году, таких изменений, которые приводят к искусственному изменению объемов закупаемой работы или цены единицы приобретаемой работы или цены договора.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>Каждый случай изменения договора под воздействием не зависящих от сторон договора факторов устанавливает Правительство Республики Армения.</div>
            <div style="text-align: justify;color: rgb(17, 85, 204);"><span style="margin-left: 25px;"/>7.6.  Если договор осуществляется посредством заключения субподрядного договора:</div>
            <div style="text-align: justify;color: rgb(17, 85, 204);"><span style="margin-left: 40px;"/>1) 	Исполнитель несет ответственность за неисполнение или ненадлежащее исполнение обязательств субподрядчика;</div>
            <div style="text-align: justify;color: rgb(17, 85, 204);"><span style="margin-left: 40px;"/>2) 	в случае замены субподрядчика в течение исполнения договора Исполнитель в письменной форме уведомляет об этом Заказчика, предоставив копии субподрядного договора и данных являющегося его стороной лица в течение пяти рабочих дней со дня внесения изменения.</div>
            <div style="text-align: justify;color: rgb(17, 85, 204);"><span style="margin-left: 25px;"/>7.7.  Если договор осуществляется посредством заключения договора о совместной деятельности (договора консорциума), то участники этого договора несут совместную и солидарную ответственность. При этом в случае выхода члена консорциума из консорциума договор расторгается в одностороннем порядке, и в отношении членов консорциума применяются предусмотренные договором меры ответственности.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.8. При наличии предложения от Исполнителя, срок выполнения работы может быть продлен до истечения данного срока по договору, при условии, что у Заказчика не отпало требование в пользовании работой а предложение Исполнителя было представлено не позднее пяти календарных дней до истечения срока, изначально установленного договором для исполнения работ. При этом в установленном настоящим пунктом случае срок выполнения работы может быть продлен один раз на срок до 30 календарных дней, но не более чем на срок, установленный договором.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.9. В условиях надлежащего исполнения договора, выгода (сбережения) или понесенные убытки сторон (Исполнителя или Заказчика) — это выгода или убытки, понесенные данной стороной.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>Обязательства сторон договора по отношению к третьим лицам, включая иные сделки, заключенные Исполнителем в рамках исполнения договора, и вытекающие из них обязательства, находятся вне поля урегулирования договора и не могут влиять на принятие результата исполнения договора. Отношения, связанные с выполнением данных сделок и вытекающих из них обязательств, регулируются нормами, регулирующими отношения, связанные с данными сделками, и за них ответственен Исполнитель.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.10. Договор не может быть изменен вследствие частичного неисполнения обязательств сторонами или полностью расторгнут по взаимному согласию сторон, за исключением случаев уменьшения финансовых ассигнований, необходимых для выполнения работы в порядке, установленном законодательством Республики Армения. При этом взаимное согласие сторон договора по частичному неисполнению обязательств или полному расторжению договора должно быть достигнуто до уменьшения финансовых ассигнований, необходимых для выполнения работы в порядке, установленном законодательством Республики Армения.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.11. Уведомление относительно полного или частичного одностороннего расторжения договора на основании неисполнения или ненадлежащего исполнения обязательств, принятых на себя Исполнителем, Заказчик опубликовывает в разделе "Уведомления об одностороннем расторжении договоров" на интернет сайте, действующем по адресу www.procurement.am, с указанием даты опубликования. Исполнитель считается надлежащим образом уведомленным относительно одностороннего расторжения договора со следующего за опубликованием уведомления дня, установленного настоящим пунктом. В день публикации в бюллетене уведомления о полном или частичном одностороннем расторжении договора Заказчик высылает его также на электронную почту Исполнителя.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.12. Споры, возникшие в связи с договором, разрешаются путем переговоров. В случае недостижения согласия споры разрешаются в судах Республики Армения.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.13. Договор составлен на <span class="pages-count">__</span> страницах, заключается в двух экземплярах, имеющих равную юридическую силу. Приложения № 1, № 2, № 3 и № 3.1 к настоящему Договору считаются неотъемлемой частью договора, и каждой стороне предоставляется по одному экземпляру договора.</div>
            <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.14. В отношении настоящего Договора применяется право Республики Армения.</div>
            <div v-if="currentOrganized.is_with_condition">
                <div style="text-align: justify;"><span style="margin-left: 25px;"/>7.15. Выполнение предусмотренных договором работ осуществляется при наличии предусмотренных для этой цели финансовых средств и посредством заключения на данном основании соответствующего соглашения между сторонами. Договор расторгается, если в течение шести месяцев, следующих за днем его заключения, финансовые средства в целях его исполнения не предусматриваются. </div>
                <div v-if="total > 25000000" style="text-align: justify;"><span style="margin-left: 40px;"/>Если размер выделенных для исполнения договора финансовых средств превышает двадцатипятикратный размер базовой единицы закупок, то Заказчиком будет заключенo соглашение в случае, если представленные  Исполнителем в виде неустойки обеспечения квалификации и договора в размере предусмотренных финансовых средств заменяются гарантией или наличными деньгами, с учетом требований абзаца "б" подпункта 17 пункта 32 Приложения № 1 к Постановлению Правительства Республики Армения № 526-N от 4 мая 2017 года. При этом Исполнитель заключает соглашение, а при замене обеспечений квалификации и договора представленных в виде неустойки, также представляет Заказчику новые обеспечения в течение пятнадцати рабочих дней со дня получения извещения о заключении соглашения. В противном случае договор расторгается Заказчиком в одностороннем порядке.</div>
                <div v-if="total < 25000000" style="text-align: justify;"><span style="margin-left: 40px;"/>Если размер выделенных для исполнения договора финансовых средств не превышает двадцатипятикратный размер базовой единицы закупок, то Исполнитель заключает соглашение и представляет Заказчику течение пятнадцати рабочих дней со дня получения извещения о заключении соглашения. В противном случае договор расторгается Заказчиком в одностороннем порядке.</div>
            </div>
            <br/>
            <div style="text-align: center; font-weight: 700;">8. АДРЕСА, БАНКОВСКИЕ РЕКВИЗИТЫ И ПОДПИСИ СТОРОН</div>
            <br>
            <table style="width: 100%; border: none !important">
                <tbody>
                    <tr style="display: flex;">
                        <td style="width: 50%; display: flex; justify-content: center;border:none !important;">
                            <div>
                                <h6 class="ft-11" style="font-weight: 700">ЗАКАЗЧИК</h6>
                                <p class="ft-11" style="font-size: 14px;">" {{ me.organisation[0].translations.name.ru }} " {{ me.organisation[0].translations.company_type.ru }}</p>                                      
                                <p class="ft-11" style="font-size: 14px;" v-if="me.organisation[0].translations.region.ru === me.organisation[0].translations.city.ru">{{ me.organisation[0].translations.city.ru }} {{ me.organisation[0].translations.address.ru }}</p>
                                <p class="ft-11" style="font-size: 14px;" v-else>{{ me.organisation[0].translations.region.ru }} {{ me.organisation[0].translations.city.ru }} {{ me.organisation[0].translations.address.ru }}</p>
                                <p class="ft-11" style="font-size: 14px;">Банк: {{ me.organisation[0].translations.bank_name.ru }}</p>
                                <p class="ft-11" style="font-size: 14px;">Н/С {{ me.organisation[0].bank_account }} </p>
                                <p class="ft-11" style="font-size: 14px;">ИНН {{ me.organisation[0].tin }} </p>
                                <p class="ft-11" style="font-size: 14px;">{{ me.organisation[0].translations.director_position.ru }}: {{ me.organisation[0].translations.director_name.ru }}</p>                                          
                                <p class="ft-11" style="font-size: 14px;">____________________________________________</p>
                                <p style="text-align: center;font-size: 8px; margin-top: -20px; color: gray; margin-bottom: 35px;">/подпись/</p>
                                <p style="font-size: 14px; text-align: center">М. П.</p>
                            </div>
                        </td>
                        <td style="width: 50%; display: flex; justify-content: center;border:none !important;">
                            <div>
                                <h6 class="ft-11" style="font-weight: 700">ИСПОЛНИТЕЛЬ</h6>
                                <p class="ft-11" style="font-size: 14px;"> " <span class="winner-name">______________</span> " <span class="winner-type">_______</span></p>
                                <p class="ft-11" style="font-size: 14px;"><span class="winner-address">_____________________</span></p>
                                <p class="ft-11" style="font-size: 14px;">Банк:<span class="winner-bank">___________</span></p>
                                <p class="ft-11" style="font-size: 14px;">Н/С <span class="winner-bank_account">_____________________</span></p>
                                <p class="ft-11" style="font-size: 14px;">ИНН <span class="winner-tin">______________</span></p>
                                <p class="ft-11" style="font-size: 14px;">Директор: <span class="winner-director">_____________________</span></p>
                                <p class="ft-11" style="font-size: 14px;">____________________________________________</p>
                                <p style="text-align: center;font-size: 8px; margin-top: -20px; color: gray; margin-bottom: 35px;">/подпись/</p>
                                <p style="font-size: 14px; text-align: center">М. П.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <i style="text-align: justify;">В случае необходимости в проект договора могут быть включены не противоречащие законодательству Республики Армения положения.</i>
            <pagebreak/>
            <br class="page-break"/>
            <div>
                <div style="text-align: right; font-weight: 700">Приложение N 1</div>
                <div style="text-align: right; font-weight: 700">К Договору под кодом <span class="contract-code-ru" style="color: rgb(17, 85, 204);"></span></div>
                <div style="text-align: right; font-weight: 700">Заключенному <span class="sign-date">"  	 "    	20_ </span>г.</div> 
                <div style="text-align: center">ТЕХНИЧЕСКАЯ ХАРАКТЕРИСТИКА-ГРАФИК ЗАКУПКИ*</div>
                <br/>
                <table style="font-size: 9px;
                              width: 100%;
                              table-layout: fixed;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="5" cellpadding="5" class="ft-5">
                    <tbody>
                        <tr>
                            <th colspan="7" style="border: 1px solid black;
                                                   border-collapse: collapse;">Работа</th>
                        </tr>
                        <tr>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">Н/Л</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">(CPV) код</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">техническая характеристика</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">единица измерения</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">цена единицы/драмов РА</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">общая цена/драмов РА</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">общий объем</th>	
                            <th colspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">Выполнение работы</th>	
                        </tr>
                        <tr>	
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">адрес</th>
                            <th style="border: 1px solid black;
                                       border-collapse: collapse;">срок**</th>
                        </tr>
                    </tbody>
                    <tbody id="services-table-body" class="purchase-schedule">
                        <tr v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="rowIndex">
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;
                                       text-align: center;">{{ row.view_id }}</td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;
                                       text-align: center;">{{ row.procurement_plan.cpv.code }}{{ row.procurement_plan.cpv_drop && '/' }}{{ row.procurement_plan.cpv_drop }}</td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;
                                       text-align: center;">{{row.procurement_plan.specifications.description.ru}}</td>
                            <td style="border: 1px solid black;
                                       border-collapse: collapse;
                                       text-align: center;">{{ row.procurement_plan.cpv.unit_ru }}</td>
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
                                v-if="me.organisation[0].translations.region.ru === me.organisation[0].translations.city.ru">
                            Г.
                                {{ me.organisation[0].translations.city.ru }}
                                {{ me.organisation[0].translations.address.ru }}
                            </td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"
                                v-else>
                                {{ me.organisation[0].translations.region.ru }}

                                

                                {{ me.organisation[0].translations.city.ru }}
                                {{ me.organisation[0].translations.address.ru }}
                            </td>
                            <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;"></td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <div>
                   * Окончательный срок выполнения работы не может быть позднее 25 декабря данного года.
                </div>
                <div style="text-align: justify;" v-if="currentOrganized.is_with_condition">
                    <span style="color: rgb(17, 85, 204);">** Если договор заключается на основании части 6 статьи 15 Закона РА "О закупках", то в графе исчисление срока осуществляется со дня вступления в силу заключаемого между сторонами соглашения в случае предусмотрения финансовых средств.</span>
                </div>
                <table style="width: 100%; border: none !important">
                    <tbody>
                        <tr style="display: flex;">
                            <td style="width: 50%; display: flex; justify-content: center;border:none !important;">
                                <div>
                                    <h6 class="ft-11"  style="font-weight: 700">ЗАКАЗЧИК</h6>
                                    <p class="ft-11" style="font-size: 14px;">" {{ me.organisation[0].translations.name.ru }} " {{ me.organisation[0].translations.company_type.ru }}</p>
                                    <p class="ft-11" style="font-size: 14px;" v-if="me.organisation[0].translations.region.ru === me.organisation[0].translations.city.ru">{{ me.organisation[0].translations.city.ru }} {{ me.organisation[0].translations.address.ru }}</p>
                                    <p class="ft-11" style="font-size: 14px;" v-else>{{ me.organisation[0].translations.region.ru }} {{ me.organisation[0].translations.city.ru }} {{ me.organisation[0].translations.address.ru }}</p>
                                    <p class="ft-11" style="font-size: 14px;">Банк: {{ me.organisation[0].translations.bank_name.ru }}</p>
                                    <p class="ft-11" style="font-size: 14px;">Н/С {{ me.organisation[0].bank_account }} </p>
                                    <p class="ft-11" style="font-size: 14px;">ИНН {{ me.organisation[0].tin }} </p>
                                    <p class="ft-11" style="font-size: 14px;">{{ me.organisation[0].translations.director_position.ru }}: {{ me.organisation[0].translations.director_name.ru }}</p>
                                    <p class="ft-11" style="font-size: 14px;">____________________________________________</p>
                                    <p style="text-align: center;font-size: 8px; margin-top: -20px; color: gray; margin-bottom: 35px;">/подпись/</p>
                                    <p style="font-size: 14px; text-align: center">М. П.</p>
                                </div>
                            </td>
                            <td style="width: 50%; display: flex; justify-content: center;border:none !important;">
                                <div>
                                    <h6 class="ft-11" style="font-weight: 700">ИСПОЛНИТЕЛЬ</h6>
                                    <p class="ft-11" style="font-size: 14px;"> " <span class="winner-name">______________</span> " <span class="winner-type">_______</span></p>
                                    <p class="ft-11" style="font-size: 14px;"><span class="winner-address">_____________________</span></p>
                                    <p class="ft-11" style="font-size: 14px;">Банк:<span class="winner-bank">___________</span></p>
                                    <p class="ft-11" style="font-size: 14px;">Н/С <span class="winner-bank_account">_____________________</span></p>
                                    <p class="ft-11" style="font-size: 14px;">ИНН <span class="winner-tin">______________</span></p>
                                    <p class="ft-11" style="font-size: 14px;">Директор: <span class="winner-director">_____________________</span></p>
                                    <p style="font-size: 14px;">____________________________________________</p>
                                    <p style="text-align: center;font-size: 8px; margin-top: -20px; color: gray; margin-bottom: 35px;">/подпись/</p>
                                    <p style="font-size: 14px; text-align: center">М. П.</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <pagebreak/>
            <br class="page-break"/>
            <div>
                <div style="text-align: right; font-weight: 700">Приложение N 2</div>
                <div style="text-align: right; font-weight: 700">К Договору под кодом <span class="contract-code-ru" style="color: rgb(17, 85, 204);"></span></div>
                <div style="text-align: right; font-weight: 700">Заключенному <span class="sign-date">"  	 "    	20_ </span>г.</div> 
                <div style="text-align: center; font-weight: 700">ГРАФИК ОПЛАТЫ*</div>
                <br/>
                <table   style="font-size: 8px;
                                table-layout: fixed;
                                border-collapse: collapse;
                                border: 1px solid black;
                                text-align: center;
                                width: 100%;" cellspacing="2" cellpadding="2" class="ft-5"> 
                    <tbody>
                    <tr>
                            <th colspan="16" style="border: 1px solid black;
                                                    border-collapse: collapse;">Работа</th>
                        </tr>
                        <tr>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">Н/Л</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">(CPV) код</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                   border-collapse: collapse;">наименование</th>
                            <th colspan="13" style="border: 1px solid black;
                                                    border-collapse: collapse;">Оплату работы предусматривается произвести в {{new Date().getFullYear()}} г., по месяцам, в том числе**</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">январь</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">февраль</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">март</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">апрель</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">май</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">июнь</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">июль</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">август</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">сентябрь</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">октябрь</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">ноябрь</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">декабрь</th>
                            <th style="border: 1px solid black;
                                       writing-mode: tb-rl;
                                       border-collapse: collapse;">Всего</th>
                        </tr>
                    </tbody>
                    <tbody class="payment-schedule">
                            <tr v-for="(row, rowIndex) in currentOrganized.organize_rows" :key="rowIndex">
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ rowIndex + 1 }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ row.procurement_plan.cpv.code }}{{ row.procurement_plan.cpv_drop && '/' }}{{ row.procurement_plan.cpv_drop }}</td>
                                <td style="border: 1px solid black;
                                           border-collapse: collapse;
                                           text-align: center;">{{ row.procurement_plan.cpv.name_ru }}</td>
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
                                                border-collapse: collapse;">{{ row.organize_row_percent.month_6 !== null ? row.organize_row_percent.month_6 + '%'  : '-' }}</td>
                                    <td style="border: 1px solid black;
                                                border-collapse: collapse;">{{ row.organize_row_percent.month_7 !== null ? row.organize_row_percent.month_7 + '%'  : '-' }}</td>
                                    <td style="border: 1px solid black;
                                                border-collapse: collapse;">{{ row.organize_row_percent.month_8 !== null ? row.organize_row_percent.month_8 + '%'  : '-' }}</td>
                                    <td style="border: 1px solid black;
                                                border-collapse: collapse;">{{ row.organize_row_percent.month_9 !== null ? row.organize_row_percent.month_9 + '%'  : '-' }}</td>
                                    <td style="border: 1px solid black;
                                                border-collapse: collapse;">{{ row.organize_row_percent.month_10 !== null ? row.organize_row_percent.month_10 + '%'  : '-' }}</td>
                                    <td style="border: 1px solid black;
                                                border-collapse: collapse;">{{ row.organize_row_percent.month_11 !== null ? row.organize_row_percent.month_11 + '%'  : '-' }}</td>
                                    <td style="border: 1px solid black;
                                                border-collapse: collapse;">{{ row.organize_row_percent.month_12 !== null ? row.organize_row_percent.month_12 + '%'  : '-' }}</td>
                                    <td v-if="row.organize_row_percent.month_1 === null && row.organize_row_percent.month_2 === null && row.organize_row_percent.month_3 === null && row.organize_row_percent.month_4 === null && row.organize_row_percent.month_5 === null && row.organize_row_percent.month_6 === null && row.organize_row_percent.month_7 === null && row.organize_row_percent.month_8 === null && row.organize_row_percent.month_9 === null && row.organize_row_percent.month_10 === null && row.organize_row_percent.month_11 === null && row.organize_row_percent.month_12 === null" 
                                    style="border: 1px solid black;
                                            border-collapse: collapse;">-</td>
                                    <td v-else style="border: 1px solid black;
                                                      border-collapse: collapse;"> 100% </td>    
                                </template>
                                <template v-else>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse; "></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse; "></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse; "></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                    <td style="padding: 20px;
                                                border: 1px solid black;
                                                border-collapse: collapse;"></td>
                                </template>   
                            </tr>
                </tbody>
                </table>
                <br/>
                <div style="text-align: justify;"> * Подлежащие уплате суммы представляются в порядке возрастания. 
                </div>
                <div v-if="currentOrganized.is_with_condition">Если договор заключается на основании части 6 статьи 15 Закона РА "О закупках", то настоящий график заполняется и заключается одновременно с заключаемым между сторонами соглашением в случае предусмотрения финансовых средств, в качестве его неотъемлемой части.</div>
                <div style="text-align: justify;">
                    ** В приглашении суммы отмечаются в процентах, а при заключении договора вместо процента отмечается размер конкретной суммы.
                </div>
                <br/>
                <table style="width: 100%; border: none !important">
                    <tbody>
                    <tr style="display: flex;">
                        <td style="width: 50%; display: flex; justify-content: center;border:none !important;">
                            <div>
                                <h6 class="ft-11" style="font-weight: 700">ЗАКАЗЧИК</h6>
                                <p class="ft-11" style="font-size: 14px;">" {{ me.organisation[0].translations.name.ru }} " {{ me.organisation[0].translations.company_type.ru }}</p>
                                <p class="ft-11" style="font-size: 14px;" v-if="me.organisation[0].translations.region.ru === me.organisation[0].translations.city.ru">{{ me.organisation[0].translations.city.ru }} {{ me.organisation[0].translations.address.ru }}</p>
                                <p class="ft-11" style="font-size: 14px;" v-else>{{ me.organisation[0].translations.region.ru }} {{ me.organisation[0].translations.city.ru }} {{ me.organisation[0].translations.address.ru }}</p>
                                <p class="ft-11" style="font-size: 14px;">Банк: {{ me.organisation[0].translations.bank_name.ru }}</p>
                                <p class="ft-11" style="font-size: 14px;">Н/С {{ me.organisation[0].bank_account }} </p>
                                <p class="ft-11" style="font-size: 14px;">ИНН {{ me.organisation[0].tin }} </p>
                                <p class="ft-11" style="font-size: 14px;">{{ me.organisation[0].translations.director_position.ru }}: {{ me.organisation[0].translations.director_name.ru }}</p>    
                                <p class="ft-11" style="font-size: 14px;">____________________________________________</p>
                                <p style="text-align: center;font-size: 8px; margin-top: -20px; color: gray; margin-bottom: 35px;">/подпись/</p>
                                <p style="font-size: 14px; text-align: center">М. П.</p>
                            </div>
                        </td>
                        <td style="width: 50%; display: flex; justify-content: center;border:none !important;">
                            <div>
                                <h6 class="ft-11" style="font-weight: 700">ИСПОЛНИТЕЛЬ</h6>
                                <p class="ft-11" style="font-size: 14px;"> " <span class="winner-name">______________</span> " <span class="winner-type">_______</span></p>
                                <p class="ft-11" style="font-size: 14px;"><span class="winner-address">_____________________</span></p>
                                <p class="ft-11" style="font-size: 14px;">Банк:<span class="winner-bank">___________</span></p>
                                <p class="ft-11" style="font-size: 14px;">Н/С <span class="winner-bank_account">_____________________</span></p>
                                <p class="ft-11" style="font-size: 14px;">ИНН <span class="winner-tin">______________</span></p>
                                <p class="ft-11" style="font-size: 14px;">Директор: <span class="winner-director">_____________________</span></p>
                                <p class="ft-11" style="font-size: 14px;">____________________________________________</p>
                                <p style="text-align: center;font-size: 8px; margin-top: -20px; color: gray; margin-bottom: 35px;">/подпись/</p>
                                <p style="font-size: 14px; text-align: center">М. П.</p>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <pagebreak/>
            <br class="page-break"/>
            <div>
                <div style="text-align: right; font-weight: 700">Приложение N 3</div>
                <div style="text-align: right; font-weight: 700">К Договору под кодом <span class="contract-code-ru" style="color: rgb(17, 85, 204);"></span></div>
                <div style="text-align: right; font-weight: 700">Заключенному <span class="sign-date">"  	 "    	20_ </span>г.</div>
                <br /> 
                <table style="width: 100%; border: none !important">
                    <tbody>
                        <tr style="display: flex;">
                            <td style="width: 50%; display: flex; justify-content: center;border:none !important;">
                                <div>
                                    <p class="ft-11" style="font-size: 14px; font-weight: 700">Сторона договора</p>
                                    <p class="ft-11" style="font-size: 14px;">____________________ </p>
                                    <p class="ft-11" style="font-size: 14px;">____________________ </p>
                                    <p class="ft-11" style="font-size: 14px;">__________место нахождения</p>
                                    <p class="ft-11" style="font-size: 14px;">___________Р/С</p>
                                    <p class="ft-11" style="font-size: 14px;">_______________________УНН</p>
                                </div>
                            </td>
                            <td style="width: 50%; display: flex; justify-content: center;border:none !important;">
                                <div>
                                    <p class="ft-11" style="font-size: 14px; font-weight: 700">Заказчик</p>
                                    <p class="ft-11" style="font-size: 14px;">____________________ </p>
                                    <p class="ft-11" style="font-size: 14px;">____________________ </p>
                                    <p class="ft-11" style="font-size: 14px;">место нахождения__________</p>
                                    <p class="ft-11" style="font-size: 14px;">Р/С___________</p>
                                    <p class="ft-11" style="font-size: 14px;">УНН_______________________ </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <pagebreak/>
            <br class="page-break"/>
            <div>
                <h6 style="text-align: center; margin-top: 3rem">
                    АКТ N
                </h6>
                <h6 style="text-align: center">
                    СДАЧИ-ПРИЕМКИ РЕЗУЛЬТАТОВ ИСПОЛНЕНИЯ ДОГОВОРА ИЛИ ЕГО ЧАСТИ
                </h6>
                <p style="text-align: left;">" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     " "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        	"  20.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	г.</p>
                <h6>
                    Наименование договора (далее — Договор) 
                </h6>
                <h6>_______________________________________________________________</h6>
                <h6 style="text-align: left;">
                    Дата заключения Договора "____" "__________________" 20. г.
                </h6>
                <h6 style="text-align: left;">
                    Заказчик и сторона Договора, принимая за основание относящийся к исполнению договора счет-фактуру N      "   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      "      "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	                "  20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   г., составили настоящий акт о следующем:
                </h6>
                <h6 style="text-align: left;">
                    В рамках Договора сторона Договора выполнила следующие работы:
                </h6>
                <table style="font-size: 10px;
                              width: 100%;
                              table-layout: fixed;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="5" cellpadding="5">
                    <tbody>
                        <tr>
                            <th rowspan="3" style="border: 1px solid black;
                                                    border-collapse: collapse;">N</th>
                            <th colspan="8" style="border: 1px solid black;
                                                    border-collapse: collapse;">
                                Выполненные работы
                            </th>
                        </tr>
                        <tr>
                            <th rowspan="2" style="border: 1px solid black;
                                                    border-collapse: collapse;">наименование</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                    border-collapse: collapse;">краткое изложение технической характеристики</th>
                            <th colspan="2" style="border: 1px solid black;
                                                    border-collapse: collapse;">количественный показатель
                            </th>
                            <th colspan="2" style="border: 1px solid black;
                                                    border-collapse: collapse;">срок исполнения</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                    border-collapse: collapse;">сумма, подлежащая уплате (тыс. драмов)</th>
                            <th rowspan="2" style="border: 1px solid black;
                                                    border-collapse: collapse;">срок оплаты (по графику оплаты)</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;
                                        border-collapse: collapse;">по графику закупки, утвержденному Договором</th>
                            <th style="border: 1px solid black;
                                        border-collapse: collapse;">фактический</th>
                            <th style="border: 1px solid black;
                                        border-collapse: collapse;">по графику закупки, утвержденному Договором</th>
                            <th style="border: 1px solid black;
                                        border-collapse: collapse;">фактический
                            </th>
                        </tr>
                        <tr>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                        </tr>
                        <tr>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                            <td style ="padding: 20px;
                                        border: 1px solid black;
                                        border-collapse: collapse;"></td>
                        </tr>
                    </tbody>
                </table>
                <div style="text-align: justify;">
                    Счет-фактура и положительное заключение, послужившие основанием для подтверждения в двустороннем порядке настоящего Акта, являются составляющей частью настоящего Акта и прилагаются.                
                </div>
                <table style="width: 100%; border: none !important">
                    <tbody>
                        <tr style="display: flex">
                            <td style="width: 50%; display: flex; justify-content: center;">
                                <div style="text-align: center">
                                    <h6 class="ft-11">Работу сдал</h6>
                                    <h6>__________________________________</h6>
                                    <h6 style="font-size: 8px; text-align: center ; margin-top: -5px; color: gray; margin-bottom: 25px;">подпись</h6>
                                    <h6>__________________________________</h6>
                                    <h6 style="font-size: 8px; text-align: center ; margin-top: -5px; color: gray; margin-bottom: 35px;">фамилия, имя</h6>
                                    <p style="font-size: 14px; text-align: center">М. П.</p>
                                </div>
                            </td>
                            <td style="width: 50%; display: flex; justify-content: center;">
                                <div style="text-align: center;">
                                    <h6 class="ft-11">Работу принял</h6>
                                    <h6>__________________________________</h6>
                                    <h6 style="font-size: 8px; text-align: center ; margin-top: -5px; color: gray; margin-bottom: 25px;">подпись</h6>
                                    <h6>__________________________________</h6>
                                    <h6 style="font-size: 8px; text-align: center ; margin-top: -5px; color: gray; margin-bottom: 35px;">фамилия, имя</h6>
                                    <p style="font-size: 14px; text-align: center">М. П.</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <pagebreak/>
            <br class="page-break"/>
            <div>
                <div style="text-align: right; font-weight: 700">Приложение N 3.1</div>
                <div style="text-align: right; font-weight: 700">К Договору под кодом <span class="contract-code-ru" style="color: rgb(17, 85, 204);"></span></div>
                <div style="text-align: right; font-weight: 700">Заключенному <span class="sign-date">"  	 "    	20_ </span>г.</div>
                <br/> 
                <h6 style="text-align: center; margin-top: 3rem">
                    АКТ N
                </h6>
                <h6 style="text-align: center">
                    относительно фиксирования факта сдачи Заказчику результата договора
                </h6>
                <p>Настоящим фиксируется, что в рамках договора закупки №  ___________________,</p>
                <h6>
                    заключенного _________________________________________________ 20         	г.
                </h6>
                <h6>между __________ (далее — Заказчик) и _____________ (далее — Исполнитель),</h6>
                <h6 style="text-align: left;">
                    Исполнитель _____________ 20 г. с целью сдачи-приемки сдал Заказчику нижеуказанные работы:
                </h6>
                <br>
                <table style="font-size: 13px;
                              width: 100%;
                              table-layout: fixed;
                              border-collapse: collapse;
                              page-break-inside: avoid;
                              border: 1px solid black;
                              text-align: center;" cellspacing="5" cellpadding="5">
                    <tbody>
                        <tr>
                            <td style="border-collapse: collapse;border: 1px solid black;" colspan="3">Работа</td>
                        </tr>
                        <tr>
                            <td style="border-collapse: collapse;border: 1px solid black;">наименование</td>
                            <td style="border-collapse: collapse;border: 1px solid black;">единица измерения</td>
                            <td style="border-collapse: collapse;border: 1px solid black;">объем (фактический)</td>
                        </tr>
                        <tr>
                            <td style="border-collapse: collapse;border: 1px solid black;padding: 20px"></td>
                            <td style="border-collapse: collapse;border: 1px solid black;padding: 20px"></td>
                            <td style="border-collapse: collapse;border: 1px solid black;padding: 20px"></td>
                        </tr>
                        <tr>
                            <td style="border-collapse: collapse;border: 1px solid black;padding: 20px"></td>
                            <td style="border-collapse: collapse;border: 1px solid black;padding: 20px"></td>
                            <td style="border-collapse: collapse;border: 1px solid black;padding: 20px"></td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <div style="text-align: center;">Настоящий акт составлен в 2 экземплярах, каждой из сторон предоставляется по одному экземпляру.</div>
                <div style="text-align: center;">СТОРОНЫ</div>
                <table style="width: 100%; border: none !important">
                    <tbody>
                        <tr style="display: flex;">
                            <td style="width: 50%; display: flex; justify-content: center;">
                                <div style="text-align: center;">
                                    <h6 class="ft-11">Сдал</h6>
                                    <h6>__________________________________</h6>
                                    <h6 style="font-size: 8px; text-align: center ; margin-top: -5px; color: gray; margin-bottom: 25px;">фамилия, имя</h6>
                                    <h6>__________________________________</h6>
                                    <h6 style="font-size: 8px; text-align: center ; margin-top: -5px; color: gray; margin-bottom: 35px;">подпись</h6>
                                </div>
                            </td>
                            <td style="width: 50%; display: flex; justify-content: center;">
                                <div style="text-align: center;">
                                    <h6 class="ft-11">Принял<br>представитель, спроектировавший заявку:</h6>
                                    <h6>__________________________________</h6>
                                    <h6 style="font-size: 8px; text-align: center ; margin-top: -5px; color: gray; margin-bottom: 25px;">фамилия, имя</h6>
                                    <h6>__________________________________</h6>
                                    <h6 style="font-size: 8px; text-align: center ; margin-top: -5px; color: gray; margin-bottom: 35px;">подпись</h6>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <pagebreak/>
            <br class="page-break"/>
        </div>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import EditorInput from '@/components/helpers/EditorInput';
import purchaseTypesLongNamesCased from '@/mixins/purchaseTypes'
import $ from 'jquery';

export default {
    name: 'contract_draft_work_ru',
    mixins: [purchaseTypesLongNamesCased],
    components: { EditorInput },
    props: ['handleLoaded', 'handleLoadingStart', 'handleLoadingEnd'],
    data() {
        return {
            total: 0,
            inputs: {
                work: null,
                days: null,
                amount: null,
                work_days: null,
            },
            purchaseType: 1,
            getOrgnizeTypeByPlan: '',
            participants: [],
            participantsSequence: [],
            totalMembers: 0,
        }
    },
    validations() {
        const rules = {
            inputs: {
                work: { required },
                days: { required },
                amount: { required },
                work_days: { required },
            }
        }
        return rules;
    },
    mounted() { 
        this.$store.dispatch('organize/getCurrent', this.$route.params.id)
        const locale = 'ru'
        this.purchaseType = this.organizedRows[0].type
        this.getOrgnizeTypeByPlan = this.purchaseTypesLongNamesCased[locale][this.purchaseType || 2]
        this.organizedRows.forEach(item => {
            if(item.is_condition){
                this.total += item.count * item.procurementPlan.details[0].unit_amount
            }
        })
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
            if (!hasInvalid) {
                this.handleLoadingStart()
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
                 this.$client.put(`organize/${this.currentOrganized.id}`, {contract_html_ru: $('#commandment-file').html()}).then(({ status, data }) => {
                    // eslint-disable-next-line eqeqeq
                    if(status == 200) {
                    this.$store.commit('organize/setCurrentOrganized', data.data)
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            text: 'Հաջողությամբ թարմացված է'
                        })
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
    },
}
</script>
<style scoped>
    *{
        color: #303030;
    }
</style>