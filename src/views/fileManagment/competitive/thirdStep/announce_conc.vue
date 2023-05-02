<template>
    <vue-html2pdf
        :show-layout="true"
        :float-layout="false"
        :enable-download="false"
        pdf-content-width="auto"
        @beforeDownload="beforeDownload($event)"
        :pdf-format="'a4'"
        :paginate-elements-by-height="1400"
        :manual-pagination="true"
        :html-to-pdf-options="{
            margin: [12, 12, 20, 12],
            filename: 'Обьявление о решении заключения договора.pdf',
            html2canvas: {
                scrollX: 0,
                scrollY: 0,
            },
        }" ref="html2Pdf">
        <section slot="pdf-content" contenteditable="true" style="font-size: 14px;">
            <div style="text-align: center;font-weight: 600">ОБЪЯВЛЕНИЕ</div>
            <div style="text-align: center; font-weight: 600;">о решении заключения договора</div>
            <div style="text-align: center; font-weight: 600;">Код процедуры {{ currentOrganized.translations.code.ru }}</div>
            <br>
            <div style="text-align: justify;">
                «{{ me.organisation[0].translations.name.ru }}»
                <span >{{me.organisation[0].translations.company_type.ru}}</span>
                ниже представляет информацию о решении заключения договора в
                результате процедуры закупки под кодом
                {{ currentOrganized.translations.code.ru }} организованной с
                целью приобретения приобретение кабелей для своих нужд:
            </div>
            <div style="text-align: justify;">
                Решением Оценочной комиссии №
                {{ currentOrganized.translations.code.ru }} от
                ___________________ года утверждены результаты оценки
                соответствия поданных всеми участниками процедуры заявок
                требованиям приглашения. Согласно которому:
            </div>
            <div class="lots" v-for="(lot, index) in lots" :key="index">
                <br>
                <div>Лот {{ lot.view_id }}</div>
                <br>
                <div>Предметом закупки является: {{ lot.is_from_outside ? lot.procurementPlan.cpv_outside.name_ru : lot.procurementPlan.cpv.name_ru }}</div>
                <br>
                <table class="ft-table"
                    style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                    <tr>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            <span>П/Н</span>
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Наименование участника
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Заявки, соответствующие требованиям приглашения<br /><span
                            style="font-weight: 400">/при соответствии указать "X"/</span>
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Заявки, не соответствующие требованиям
                            приглашения<span style="font-weight: 400">/при несоответствии указать "X"/</span>
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Краткое описание несоответствия
                        </th>
                    </tr>
                    <tr v-for="(participant, index) in lot.participants" :key="participant.id">
                        <td style="border: 1px solid black;
                                   border-collapse: collapse;
                                   text-align: center;">
                            {{ index + 1 }}
                        </td>
                        <td style="border: 1px solid black;
                                  border-collapse: collapse;
                                  text-align: center;">
                            {{participant.info ? participant.info.name.ru : ''}}
                        </td>
                        <td style="border: 1px solid black;
                                   border-collapse: collapse;
                                   text-align: center;">{{ isSatisfactory(lot.participants, index) ? 'x' : '' }}</td>
                        <td style="border: 1px solid black;
                                   border-collapse: collapse;
                                   text-align: center;">
                            {{ isSatisfactory(lot.participants, index) ? '' : 'x' }}
                        </td>
                        <td style="border: 1px solid black;
                                   border-collapse: collapse;
                                   text-align: center;"></td>
                    </tr>
                </table>
                <br>
                <table class="ft-table"
                    style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                    <tr>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Занятые участниками места
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Наименование участника
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Отобранный участник<span style="font-weight: 400">
                                /для отобранного участника указать "X"/
                            </span>
                        </th>
                        <th style="border: 1px solid black;
                                   border-collapse: collapse;">
                            Предложенная участником цена / без НДС, тыс. драмов
                            /
                        </th>
                    </tr>
                    <template v-if="Boolean(lot.winner)">
                        <template v-for="(participant, index) in lot.participants.filter((item) => item.is_satisfactory)">
                            <tr v-if="isSatisfactory(lot.participants, index)"
                                :key="'' + participant.id + participant.row_group_id">
                                <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                    {{ index + 1 }}
                                </td>
                                <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                    {{participant.info ? participant.info.name.ru : ''}}
                                </td>
                                <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                    {{ index === 0 ? 'x' : '' }}
                                </td>
                                <td style="border: 1px solid black;
                                        border-collapse: collapse;
                                        text-align: center;">
                                    {{ Math.round((currentValue(participant) / 1000) * 100) / 100 }}
                                </td>
                            </tr>
                        </template>
                    </template>
                </table>
                <br>
                <p style="text-align: justify;">
                    Критерий, примененный для определения отобранного участника:
                    представивших заявки, оцененные как удовлетворительные, по
                    принципу предпочтения, отдаваемого участнику, представившему
                    минимальное ценовое предложение.
                </p>
            </div>
            <div>
                <div style="text-align: justify;">
                    Согласно статье 10 Закона Республики Армения "О закупках" в
                    качестве периода ожидания устанавливается период времени со
                    дня, следующего за днем опубликования настоящего объявления,
                    до 10-го календарного дня включительно.
                </div>
                <div class="mt-2 mb-2" v-if="lots.find(lot => lot.participants.length === 1)">
                    Согласно статье 10 Закона РА «О закупках»: (
                    <span v-for="(lot, index) in lots.filter(lot => lot.participants.length === 1)" :key="index"> 
                        {{ lot.view_id }} {{index !== lots.filter(lot => lot.participants.length === 1).length - 1 ? ',' : ''}}
                    </span>
                    номера лотов) период простоя не установлен.
                </div>
                <div style="text-align: justify;">
                    Для получения дополнительной информации, связанной с
                    настоящим объявлением, можно обратиться
                    {{currentOrganized.translations.evaluator_secretary_name.ru ? currentOrganized.translations.evaluator_secretary_name.ru : currentOrganized.translations.evaluator_secretary_name.hy}}
                    к секретарю Оценочной комиссии под кодом
                    {{ currentOrganized.translations.code.ru }}.
                </div>
                <br>

                <div>Телефон: {{ currentOrganized.evaluator_secretary_phone }}</div>
                <div>Электронная почта:{{ currentOrganized.evaluator_secretary_email }}</div>
                <div>Заказчик` «{{ me.organisation[0].translations.name.ru }}» {{ me.organisation[0].translations.company_type.ru }}</div>
            </div>
        </section>
    </vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
    name: 'announce_conc',
    components: { VueHtml2pdf },
    props: ['handleLoaded'],
    data() {
        return {
            lots: [],
            participants: [],
            newProps: false,
        }
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organize/currentOrganized']
        },
        organizedRows() {
            return this.$store.getters['organize/organizedRows']
        },
        me() {
            return this.$store.getters['user/me']
        },
    },
    watch: {
        currentOrganized: {
            immediate: true,
            async handler() {
                this.lots = this.organizedRows
                this.handleLoaded()
            },
        },
    },
    methods: {
        consoleLog(data){
            console.log(data)
        },
        isSatisfactory(participants, index){
            const lot = participants[index];
            const currentLot = this.organizedRows.find(row => row.id === lot.organize_row_id)
            const priceOffer = currentLot.participantsList.find(participant => participant.participant_group_id === lot.row_group_id)
            if(!currentLot.winner){
                return false;
            }
            if(priceOffer && !priceOffer.enough){
                return false;
            }
            if(!participants[index].is_satisfactory){
                return false;
            } else if((participants[index + 1] && participants[index].value === participants[index + 1].value && participants[index].new_value === 0 && participants[index + 1].new_value === 0
                || (participants[index - 1] && participants[index].value === participants[index - 1].value && participants[index].new_value === 0 && participants[index - 1].new_value === 0) 
            )){
                return false;
            } else{
                return true;
            }
        },
        currentValue(participant){
            const currentLot = this.organizedRows.find(row => row.id === participant.organize_row_id)
            const priceOffer = currentLot.participantsList.find(participantItem => participantItem.participant_group_id === participant.row_group_id)

            return priceOffer.current_price
        },
        async beforeDownload({ html2pdf, options, pdfContent }) {
            await html2pdf()
                .set(options)
                .from(pdfContent)
                .toPdf()
                .get('pdf')
                .then((pdf) => {
                    const totalPages = pdf.internal.getNumberOfPages()
                    for (let i = 1; i <= totalPages; i++) {
                        pdf.setPage(i)
                        pdf.setFontSize(11)
                        pdf.setFont('ghea')
                        pdf.setTextColor('#0000ff')
                        pdf.text(
                            'iTender©\nwww.iTender.am',
                            pdf.internal.pageSize.getWidth() * 0.06,
                            pdf.internal.pageSize.getHeight() * 0.95
                        )
                    }
                })
                .save()
        },
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.html2Pdf.$el.innerHTML
        },
        download() {
            this.$refs.html2Pdf.generatePdf()
            this.newProps = false
        },
    },
}
</script>
