<template>
    <section slot="pdf-content" contenteditable="true">
        <div class="col-md-12">
            <div style="text-align: right; font-weight: 700" class="text-right">Հավելված 3.1</div>
            <div style="text-align: right; font-weight: 700" class="text-right">{{ $moment(order.contract.sign_date).format('DD.MM.YYYY') }}թ. կնքված</div>
            <div style="text-align: right; font-weight: 700" class="text-right">« {{ order.contract.code }} » ծածկագրով գնման պայմանագրի</div>
            <br>
            <h6 style="width: 100%;text-align: center;" class="text-center font-weight-bold">ԱԿՏ N {{order.index}}</h6>
            <h6 style="width: 100%;text-align: center;" class="text-center font-weight-bold">պայմանագրի արդյունքը 
                <span style="font-weight: 700" v-if="order.contract.type === 'product'">Գնորդին</span>
                <span style="font-weight: 700" v-else-if="order.contract.type === 'service'">Պատվիրատուին</span>
                <span style="font-weight: 700" v-else>Պատվիրատուին</span>
                հանձնելու փաստը ֆիքսելու վերաբերյալ</h6>
            <h6 style="width: 100%;text-align: justify;">
                Սույնով արձանագրվում է, որ « {{ order.contract.client.name }}-ի (այսուհետ` 
                <span v-if="order.contract.type === 'product'">Գնորդ</span>
                <span v-else-if="order.contract.type === 'service'">Պատվիրատու</span>
                <span v-else>Պատվիրատու</span>) և 
                {{ order.contract.participant.name }}-ի
                (այսուհետ` 
                <span v-if="order.contract.type === 'product'">Վաճառող</span>
                <span v-else-if="order.contract.type === 'service'">Կատարող</span>
                <span v-else>Կապալառու</span>) միջև {{ $moment(order.contract.sign_date).format('DD.MM.YYYY')}}թ. -ին կնքված N {{ order.contract.code }}
                պայմանագրի շրջանակներում 
                <span v-if="order.contract.type === 'product'">Վաճառողը</span>
                <span v-else-if="order.contract.type === 'service'">Կատարողը</span>
                <span v-else>Կապալառուն</span> {{ order.completion_actual_date ? `${order.completion_actual_date}թ.` : '__-__-____թ.'  }} հանձնման-ընդունման նպատակով
                <span v-if="order.contract.type === 'product'">Գնորդին</span>
                <span v-else-if="order.contract.type === 'service'">Պատվիրատուին</span>
                <span v-else>Պատվիրատուին</span> հանձնեց ստորև նշված 
                <span v-if="order.contract.type === 'product'">ապրանքները.</span>
                <span v-else-if="order.contract.type === 'service'">ծառայությունները.</span>
                <span v-else>աշխատանքները.</span>
            </h6>
            <table style="text-align: center; width: 100%; border: 1px solid black; border-collapse:collapse;" class="table-1 mt-5">
                <thead>
                    <tr>
                        <th style="text-align: center; border: 1px solid black ;" colspan="3">
                            <span v-if="order.contract.type === 'product'">Ապրանքի</span>
                            <span v-else-if="order.contract.type === 'service'">Ծառայության</span>
                            <span v-else>Աշխատանքի</span>
                        </th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black ;">անվանումը </th>
                        <th style="border: 1px solid black ;">չափման միավորը </th>
                        <th style="border: 1px solid black ;">քանակը (փաստացի)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lot in order.lots" :key="lot.id">
                        <td style="border: 1px solid black ;">{{ lot.lot_info.name }}</td>
                        <td style="border: 1px solid black ;">{{ lot.lot_info.unit }}</td>
                        <td style="border: 1px solid black ;">{{ lot.ordered }}</td>
                    </tr>
                </tbody>
            </table>
            <h6 class="text-center mt-5">Սույն ակտը կազմված է 2 օրինակից, յուրաքանչյուր կողմին տրամադրվում է մեկական օրինակ:</h6>
            <h6 style="width: 100%;text-align: center;" class="text-center font-weight-bold mt-5">ԿՈՂՄԵՐԸ </h6>
            <br>
            <table style="width: 100%; border: none !important">
                <tbody>
                    <tr>
                        <td style="border:none !important; text-align: center; width: 50%; font-size: 11pt;">
                            <p class="ft-11" style="font-weight: 700">
                                <span style="font-weight: 700" v-if="order.contract.type === 'product'">Ապրանքը հանձնեց</span>
                                <span style="font-weight: 700" v-else-if="order.contract.type === 'service'">Ծառայությանը հանձնեց</span>
                                <span style="font-weight: 700" v-else>Աշխատանքը հանձնեց</span>
                            </p>
                            <div class="ft-11">_______________________</div>
                            <div style="font-size: 8pt;" class="ft-6">ստորագրություն</div>
                        </td>
                        <td style="border:none !important; text-align: center; width: 50%; font-size: 11pt;">
                            <p class="ft-11" style="font-weight: 700">
                                <span style="font-weight: 700" v-if="order.contract.type === 'product'">Ապրանքը ընդունեց</span>
                                <span style="font-weight: 700" v-else-if="order.contract.type === 'service'">Ծառայությանը ընդունեց</span>
                                <span style="font-weight: 700" v-else>Աշխատանքը ընդունեց</span>
                            </p>
                            <div class="ft-11">_______________________</div>
                            <div style="font-size: 8pt;" class="ft-6">ստորագրություն</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>

export default {
    name: 'act',
    components: {  },
    props: ['participantGroup', 'handleLoaded'],
    data() {
        return {
            order: this.participantGroup,
        }
    },
    computed: {
        me() {
            return this.$store.getters['user/me']
        },
    },
    mounted(){
        this.handleLoaded();
    },
    methods: {
        fixIncorrectWords(word) {
            return word.replace('միլիօն', 'միլիոն')
        },
        currentDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            return mm + '.' + dd + '.' + yyyy;;
        },
        consoleLog(e) {
            console.log(e)
        },
    },
}
</script>
<style>
    .table-1 {
        page-break-inside: avoid;
    }
</style>
