<template>
    <section slot="pdf-content" contenteditable="true">
        <div class="col-md-12">
            <h6 class="font-weight-bold mt-5" style="text-align: center; font-weight: 500;">ԵԶՐԱԿԱՑՈՒԹՅՈՒՆ N 1</h6>
            <h6 class="text-left font-weight-bold" style="font-weight: 500;"> ՊԱՅՄԱՆԱԳՐԻ ԿԱՄ ԴՐԱ ՄԻ ՄԱՍԻ ԿԱՏԱՐՄԱՆ ԱՐԴՅՈՒՆՔՆԵՐԻ ՎԵՐԱԲԵՐՅԱԼ </h6>
            <h6 class="text-left">Պայմանագրի /այսուհետ` Պայմանագիր/ անվանումը` {{ order.contract.name }}</h6>
            <h6 class="text-left">Պայմանագրի կնքման ամսաթիվը` {{ $moment(order.contract.sign_date).format('DD.MM.YYYY')}}թ</h6>
            <h6 class="text-left">Պայմանագրի համարը` « {{ order.contract.code }} »</h6>
            <h6 class="text-left">Պատվիրատուի անվանումը « {{ me.organisation[0].translations.name.hy}} » {{ me.organisation[0].translations.company_type.hy }}</h6>
            <h6 class="text-left">Պայմանագրի կողմի անվանումը {{ order.contract.participant.name }} {{ order.contract.participant.company_type }}</h6>
            <h6 class="text-left">Վերոհիշյալ պայմանագրի շրջանակներում պայմանագրի իրականացրել է հետևյալ ապրանքների մատակարարումը`</h6>
            <table style="text-align:center;border: 1px solid black; border-collapse:collapse;" class="big-table table-1 mt-5">
                <thead>
                        <tr>
                            <th style="border: 1px solid black;" rowspan="3">N</th>
                            <th style="border: 1px solid black;" colspan="6">
                                Մատակարարված ապրանքների
                            </th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;" rowspan="2">անվանումը</th>
                            <th style="border: 1px solid black;" rowspan="2">տեխնիկական բնութագրի համառոտ շարադրանքը</th>
                            <th style="border: 1px solid black;" colspan="2">քանակական ցուցանիշը
                            </th>
                            <th style="border: 1px solid black;" colspan="2">կատարման ժամկետը</th>
                        </tr>
                        <tr>
                            <th style="border: 1px solid black;">ըստ պայմանագրով հաստատված գնման ժամանակացույցի</th>
                            <th style="border: 1px solid black;">փաստացի</th>
                            <th style="border: 1px solid black;"> ըստ
                                պայմանագրով
                                հաստատված
                                գնման
                                ժամանակացույցի</th>
                            <th style="border: 1px solid black;">փաստացի
                            </th>
                        </tr>
                </thead>
                <tbody>
                    <tr v-for="(lot, lotIndex) in order.lots" :key="lot.id">
                        <td style="border: 1px solid black;">{{ lotIndex + 1 }}</td>
                        <td style="border: 1px solid black;">{{ lot.lot_info.name }}</td>
                        <td style="border: 1px solid black;">{{ lot.lot_info.specification }}</td>
                        <td style="border: 1px solid black;">{{ lot.lot_info.available + lot.lot_info.ordered + lot.lot_info.supplied }} {{ lot.lot_info.unit }}</td>
                        <td style="border: 1px solid black;">{{ lot.ordered }} {{ lot.lot_info.unit }}</td>
                        <td style="border: 1px solid black;">
                            {{ order.completion_contract_date ? `${order.completion_contract_date}թ.` : '__-__-____թ.'  }}
                        </td>
                        <td style="border: 1px solid black;">
                            {{ order.completion_actual_date ? `${order.completion_actual_date}թ.` : '__-__-____թ.'  }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <h6 class="text-left mt-5">Նշումներ անհամապատասխանությունների մասին` անհամապատասխանությունները բացակայում են</h6>
            <h6 class="text-left">Հիմք ընդունելով վերոգրյալը, տալիս եմ _____դրական___________ եզրակացություն:</h6>
            <h6 class="text-left">Գնման հայտը նախագծած ներկայացուցիչ` _______________________________________</h6>
            <h6 class="text-left">ստորագրություն` ___________________________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; «_____»«_________» 2021թ</h6>
        </div>
    </section>
</template>

<script>

export default {
    name: 'conclusion',
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
        console.log(this.order.lots)
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
<style scoped>
</style>
