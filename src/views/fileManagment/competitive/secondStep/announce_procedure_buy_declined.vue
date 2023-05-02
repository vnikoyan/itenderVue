<template>
    <div ref="content">
        <div style="text-align: center;font-weight: 600">ОБЪЯВЛЕНИЕ</div>
        <div style="text-align: center; font-weight: 600;">об процедуре закупки несостоявшейся</div>
        <div style="text-align: center; font-weight: 600;">Код процедуры {{ currentOrganized.translations.code.ru }}</div>
        <br>
        <div style="text-align: justify;">
            «{{ me.organisation[0].translations.name.ru }}» {{me.organisation[0].translations.company_type.ru}} ниже представляет
            информацию об объявлении несостоявшейся процедуры закупки под кодом
            {{ currentOrganized.translations.code.ru }} организованной с целью
            приобретения приобретения
            {{ currentOrganized.translations.name.ru ? currentOrganized.translations.name.ru : currentOrganized.translations.name.hy }}
            для своих нужд:
        </div>
        <br>
        <div class="lots" >
            <table style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
                <tr>
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">
                        <span  style="font-weight: bold">Номер лота</span>
                    </th> 
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">
                        Краткое описание предмета закупки
                    </th>
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;">
                        Наименования участников процедуры закупки при наличии
                        таковых
                    </th>
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">
                        Процедура закупки объявлена несостоявшейся согласно
                        части 1 статьи 37 Закона Республики Армения "О закупках"
                        /подчеркнуть соответствующую строку/
                    </th>
                    <th  style="border: 1px solid black;
                                border-collapse: collapse;
                                font-weight: bold;">
                        Краткая информация об обосновании объявления процедуры закупки несостоявшейся
                    </th>
                </tr>
                <tr v-for="(lot) in lots" :key="lot.name">
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;">{{ lot.view_id }}</td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;">
                        {{ lot.procurementPlan.cpv_outside ? lot.procurementPlan.cpv_outside.name_ru : lot.procurementPlan.cpv.name_ru }}
                    </td>
                    <td style="border: 1px solid black;
                                border-collapse: collapse;">
                        <div v-for="(participant, p_index) in lot.participantsList"
                            :key="participant.id">
                            {{participant.name.ru ? participant.name.ru : participant.name.hy}}{{p_index === lot.participantsList.length - 1 ? '' : ','}}
                        </div>
                    </td>
                    <td  style="border: 1px solid black;
                                border-collapse: collapse;">
                        <div >
                            <p style="margin: 0">1-го Пункта</p>
                            <p style="margin: 0">2-го Пункта</p>
                            <p style="margin: 0">3-го Пункта</p>
                            <p style="margin: 0">4-го Пункта</p>
                        </div>
                    </td>
                    <td style="border: 1px solid black;
                               border-collapse: collapse;"></td>
                </tr>
            </table>
        </div>
        <div v-if="canceledLotsWithOneParticipant.length" style="text-align: justify;">
            Согласно 2-ого пункта 4-ой части статье 10 Закона РА ”О закупках": для лота N
            <span :key="lot.id" v-for="(lot, lotIndex) in canceledLotsWithOneParticipant">
                {{lot.view_id}}{{lotIndex !== canceledLotsWithOneParticipant.length - 1 ? ',' : ''}}
            </span>
            в качестве периода ожидания устанавливается период времени со дня, следующего за днем опубликования настоящего объявления, до <b>10</b>-ого календарного дня включительно.
        </div>
        <div style="text-align: justify">
            Для получения дополнительной информации, связанной с настоящим объявлением, можно обратиться
            {{currentOrganized.translations.evaluator_secretary_name.ru ? currentOrganized.translations.evaluator_secretary_name.ru : currentOrganized.translations.evaluator_secretary_name.hy}}
            к секретарю Оценочной комиссии под кодом
            {{ currentOrganized.translations.code.ru }}.
        </div>
        <div style="margin-left: 50px;">Закупок под кодом: {{ currentOrganized.translations.code.ru }}</div>
        <div style="margin-left: 50px;">Телефон: {{ currentOrganized.evaluator_secretary_phone }}</div>
        <div style="margin-left: 50px;">Электронная почта: {{ currentOrganized.evaluator_secretary_email }}</div>
        <div style="margin-left: 50px;">Заказчик` «{{ me.organisation[0].translations.name.ru }}» {{me.organisation[0].translations.company_type.ru}}</div>
    </div>
</template>

<script>
export default {
    name: 'announce_procedure_buy_declined',
    components: {},
    props: ['handleLoaded'],
    data() {
        return {
            lots: [],
            participants: [],
            newProps: false,
            canceledLotsWithOneParticipant: [],
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
                this.lots = [];
                this.canceledLotsWithOneParticipant = [];
                this.lots = this.organizedRows.filter(row => row.winners.length !== 1)
                this.organizedRows.forEach((item) => {
                    if(item.participants.length === 1 && item.winners.length === 0){
                        this.canceledLotsWithOneParticipant.push(item);
                    }
                })
                this.handleLoaded()
            },
        },
    },
    methods: {
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.content.innerHTML
        },
        download() {
            this.$refs.content.generatePdf()
            this.newProps = false
        },
    },
}
</script>
