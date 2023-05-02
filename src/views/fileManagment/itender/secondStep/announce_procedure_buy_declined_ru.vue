<template>
    <section slot="pdf-content" contenteditable="true" ref="content" style="font-size: 14px;">
        <div style="text-align: center; font-weight: 600">ОБЪЯВЛЕНИЕ</div>
        <div style="text-align: center; font-weight: 600;">об процедуре закупки несостоявшейся</div>
        <div style="text-align: center; font-weight: 600;">Код процедуры {{ currentOrganized.code_ru }}</div>
        <br>
        <div style="text-align: justify;">
            «{{ me.organisation[0].translations.name.ru }}» 
            <span style="text-align: justify;"  v-if="me.organisation[0].translations.company_type.ru === 'фонд'"> {{ me.organisation[0].translations.company_type.ru.charAt(0).toUpperCase() + me.organisation[0].translations.company_type.ru.slice(1) }}</span>
            <span style="text-align: justify;"  v-else>{{me.organisation[0].translations.company_type.ru}}</span>
            ниже представляет
            информацию об объявлении несостоявшейся процедуры закупки под кодом
            {{ currentOrganized.code_ru }} организованной с целью
            приобретения приобретения
            {{
                currentOrganized.name_ru
                    ? currentOrganized.name_ru
                    : currentOrganized.name
            }}
            для своих нужд:
        </div>
        <br>
        <div class="lots">
            <table style="width: 100%;
                     
                    table-layout: fixed;
                    border-collapse: collapse;
                    page-break-inside: avoid;
                    border: 1px solid  black;
                    border-collapse: collapse;
                    text-align: center;">
                <tr>
                    <th  style="border: 1px solid  black;
                                border-collapse: collapse;
                                font-weight: bold;">
                        <span style="font-weight: bold">Номер лота</span>
                    </th>
                    <th  style="border: 1px solid  black;
                                border-collapse: collapse;
                                font-weight: bold;">
                        Краткое описание предмета закупки
                    </th>
                    <th  style="border: 1px solid  black;
                                border-collapse: collapse;
                                font-weight: bold;">Наименования участников процедуры закупки при наличии таковых</th>
                    <th  style="border: 1px solid  black;
                                border-collapse: collapse;
                                font-weight: bold;">Процедура закупки объявлена несостоявшейся согласно части 1 статьи 37 Закона Республики Армения "О закупках"/подчеркнуть соответствующую строку/
                    </th>
                    <th  style="border: 1px solid  black;
                                border-collapse: collapse;
                                font-weight: bold;">Краткая информация об обосновании объявления процедуры закупки несостоявшейся
                    </th>
                </tr>
                <tr v-for="(lot) in lots" :key="lot.name">
                    <td  style="border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;">{{ lot.view_id }}</td>
                    <td  style="border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;">
                        {{ lot.cpv.name ? lot.cpv.name_ru : '' }}
                    </td>
                    <td  style="border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;">
                        <div v-for="(participant, p_index) in lot.participants"
                            :key="participant.id">
                            {{
                                participant.user_info.name.ru
                                    ? participant.user_info.name.ru
                                    : participant.user_info ? participant.user_info.name.hy :  participant.info.name.hy
                            }}{{
                                p_index === lot.participants.length - 1
                                    ? ''
                                    : ','
                            }}
                        </div>
                    </td>
                    <td  style="border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;">
                        <div >
                            <p>1-го Пункта</p>
                            <p>2-го Пункта</p>
                            <p>3-го Пункта</p>
                            <p>4-го Пункта</p>
                        </div>
                    </td>
                    <td  style="border: 1px solid  black;
                                border-collapse: collapse;
                                text-align: center;"></td>
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
        <br>
        <div>
            <div style="text-align: justify">
                Для получения дополнительной информации, связанной с настоящим
                объявлением, можно обратиться координатора закупок под кодом
                {{ currentOrganized.code_ru }}.
            </div>
            <div>Закупок под кодом: {{ currentOrganized.code_ru }}</div>
            <div>
                Телефон: {{ me.organisation[0].phone }}
            </div>
            <div>
                Электронная почта:
                {{ me.email }}
            </div>
            <div style="text-align: justify">
                Заказчик: «{{ me.organisation[0].translations.name.ru }}»  
                <span v-if="me.organisation[0].translations.company_type.ru === 'фонд'"> {{ me.organisation[0].translations.company_type.ru.charAt(0).toUpperCase() + me.organisation[0].translations.company_type.ru.slice(1) }}</span>
                <span v-else>{{me.organisation[0].translations.company_type.ru}}</span>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'announce_procedure_buy_declined_ru',
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
                this.lots = [];
                this.canceledLotsWithOneParticipant = [];
                this.currentOrganized.organize_rows.forEach(row => {
                    if(row.winner_user_id === 0){
                        this.lots.push(row)
                    }
                });
                this.currentOrganized.organize_rows.forEach((item) => {
                    if(item.participants.length === 1 && item.winner_user_id === 0){
                        this.canceledLotsWithOneParticipant.push(item);
                    }
                })
                this.handleLoaded()
            },
        },
    },
    methods: {
        consoleLog(e){
            console.log(e)
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
        download() {
            this.$refs.content.generatePdf()
            this.newProps = false
        },
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.content.innerHTML
        },
    },
}
</script>
<style scoped>
    *{
        font-family: GHEA grapalat !important;
    }
</style>
