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
        }"
        ref="html2Pdf">
        <section slot="pdf-content" contenteditable="true" style="font-size: 14px;">
            <div style="text-align: center; font-weight: 600;">ОБЪЯВЛЕНИЕ</div>
            <div style="text-align: center; font-weight: 600;">о решении заключения договора</div>
            <div  style="text-align: center; font-weight: 600;">Код процедуры {{ currentOrganized.code_ru }}</div>
            <br>
            <div style="text-align: justify;">
                «{{ me.organisation[0].translations.name.ru }}» <span  style="text-transform: capitalize;">{{ me.organisation[0].translations.company_type.ru }}</span> ниже представляет
                информацию о решении заключения договора в результате процедуры
                закупки под кодом
                {{ currentOrganized.code_ru }} организованной с
                целью приобретения приобретение кабелей для своих нужд:
            </div>
            <div style="text-align: justify;">
                Решением ответственное подразделение №
                {{ currentOrganized.code_ru }} от
                ___________________ года утверждены результаты оценки
                соответствия поданных всеми участниками процедуры заявок
                требованиям приглашения. Согласно которому:
            </div>
            <br>
            <div  class="lots" v-for="(lot, index) in lots" :key="index">
                <p>Лот {{ lot.view_id }}</p>
                <p>Предметом закупки является: {{ lot.cpv_name }}</p>
                <br>
                <table style="width: 100%;
                     
                    table-layout: fixed;
                    border-collapse: collapse;
                    page-break-inside: avoid;
                    border: 1px solid  black;
                    border-collapse: collapse;
                    text-align: center;">
                    <tr>
                        <th  style="border: 1px solid  black;
                                    border-collapse: collapse;">
                            <span >П/Н</span>
                        </th>
                        <th  style="border: 1px solid  black;
                                    border-collapse: collapse;">Наименование участника</th>
                        <th  style="border: 1px solid  black;
                                    border-collapse: collapse;">
                            Заявки, соответствующие требованиям приглашения<br /><span
                                style="font-weight: 400"
                                >/при соответствии указать "X"/</span>
                        </th>
                        <th  style="border: 1px solid  black;
                                    border-collapse: collapse;">
                            Заявки, не соответствующие требованиям
                            приглашения<span style="font-weight: 400"
                                >/при несоответствии указать "X"/</span
                            >
                        </th>
                        <th  style="border: 1px solid  black;
                                    border-collapse: collapse;">Краткое описание несоответствия</th>
                    </tr>
                    <tr
                        v-for="(participant, index) in lot.participants"
                        :key="participant.id"
                    >
                        <td  style="border: 1px solid  black;
                                    border-collapse: collapse;">{{ index + 1 }}</td>
                        <td  style="border: 1px solid  black;
                                    border-collapse: collapse;">
                            {{participant.user_info ? '«' + participant.user_info.name.ru + '»'  : participant.info.name.ru}} {{participant.user_info ? participant.user_info.organisation.company_type.ru : ''}}
                        </td>
                        <td  style="border: 1px solid  black;
                                    border-collapse: collapse;
                                    text-align: center;">
                            {{ participant.is_satisfactory === 1 ? 'x' : '' }}
                        </td>
                        <td   style=" border: 1px solid  black;
                                    border-collapse: collapse;
                                    text-align: center;">
                            {{ participant.is_satisfactory === 0 ? 'x' : '' }}
                        </td>
                        <td  style="border: 1px solid  black;
                                    border-collapse: collapse;
                                    text-align: center;"></td>
                    </tr>
                </table>
                <br>
                <table class="ft-table" style="width: 100%;
                                         
                                        table-layout: fixed;
                                        border-collapse: collapse;
                                        page-break-inside: avoid;
                                        border: 1px solid  black;
                                        border-collapse: collapse;
                                        text-align: center;">
                        <tr>
                            <th  style="border: 1px solid  black;
                                        border-collapse: collapse;">Занятые участниками места</th>
                            <th  style="border: 1px solid  black;
                                        border-collapse: collapse;">Наименование участника</th>
                            <th  style="border: 1px solid  black;
                                        border-collapse: collapse;">
                                Отобранный участник<span style="font-weight: 400" >
                                    /для отобранного участника указать "X"/
                                </span>
                            </th>
                            <th  style="border: 1px solid  black;
                                        border-collapse: collapse;">
                                Предложенная участником цена / без НДС, тыс. драмов
                                /
                            </th>
                        </tr>
                        <tr
                            v-for="(participant, index) in lot.participants.filter(item=>item.is_satisfactory)"
                            :key="'' + participant.id + participant.row_group_id"
                        >
                            <td  style="border: 1px solid  black;
                                        border-collapse: collapse;
                                        text-align: center;">{{ index + 1 }}</td>
                            <td  style="border: 1px solid  black;
                                        border-collapse: collapse;
                                        text-align: center; ">
                                {{participant.user_info ? '«' + participant.user_info.name.ru + '»'  : participant.info.name.ru}} {{participant.user_info ? participant.user_info.organisation.company_type.ru : ''}}
                            </td>
                            <td  style="border: 1px solid  black;
                                        border-collapse: collapse;
                                        text-align: center; ">{{ participant.minValue ? 'x' : '' }}</td>
                            <td  style="border: 1px solid  black;
                                        border-collapse: collapse;
                                        text-align: center;" v-if="participant.value / 1000 === 0">{{ participant.value / 1000}}</td>
                            <td  style="border: 1px solid  black;
                                        border-collapse: collapse;
                                        text-align: center;" v-else-if="Number.isInteger(participant.value / 1000)">
                                {{ participant.value / 1000 + '.0' }}
                            </td>
                            <td  style="border: 1px solid  black;
                                        border-collapse: collapse;
                                        text-align: center;" v-else>{{ participant.value / 1000}}</td>
                        </tr>
                    </table>
                    <br>
                    <div style="text-align: justify;">
                        Критерий, примененный для определения отобранного участника:
                        представивших заявки, оцененные как удовлетворительные, по
                        принципу предпочтения, отдаваемого участнику, представившему
                        минимальное ценовое предложение.
                    </div>
            </div>
            <div>
                <div>Период ожидания не применим.</div>
                <div style="text-align: justify;">
                    Для получения дополнительной информации, связанной с
                    настоящим объявлением, можете связаться с координатором по закупкам под кодом
                    {{ currentOrganized.code_ru }}.
                </div>

                <div>
                    Телефон: {{ getSubordinateUser().phone || me.phone }}
                </div>
                <div>
                    Электронная почта:
                    {{ getSubordinateUser().email || me.email}}
                </div>
                <div>
                    Заказчик: «{{ me.organisation[0].translations.name.ru }}» <span style="text-transform: capitalize;">{{ me.organisation[0].translations.company_type.ru }}</span>
                </div>
            </div>
        </section>
    </vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
    name: 'announce_conc_ru',
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
            return this.$store.getters['organizeItender/currentOrganized']
        },
        me() {
            return this.$store.getters['user/me']
        },
        userChildren() {
            return this.$store.getters['user/userChildren']
        },
    },
    watch: {
        currentOrganized: {
            immediate: true,
            async handler() {
                this.lots = this.currentOrganized.organize_rows.map((elem) => {
                    if (elem.participants.length) {
                        let participantsSordtedByValue = elem.participants.sort(
                            (a, b) => a.value - b.value
                        )
                        const minParticipantValue =
                            participantsSordtedByValue[0].value
                        participantsSordtedByValue = participantsSordtedByValue.map(
                            (participant) => {
                                return {
                                    ...participant,
                                    minValue:
                                        participant.value ===
                                        minParticipantValue,
                                }
                            }
                        )
                        return {
                            view_id : elem.view_id,
                            cpv_name: elem.is_from_outside ? elem.procurement_plan.cpv_outside.name_ru : elem.procurement_plan.cpv.name_ru,
                            participants: participantsSordtedByValue,
                        }
                    }
                }).filter(lot => !!lot)
                await this.handleLoaded();
            },
        }
    },
    methods: {
        consoleLog(a){
            console.log(a)
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
                        pdf.setFontSize(10)
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
        download() {
            this.$refs.html2Pdf.generatePdf()
            this.newProps = false
        },
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.html2Pdf.$el.innerHTML
        },
    }
}
</script>
<style scoped>
    *{
        font-family: GHEA grapalat !important;
    }
</style>

