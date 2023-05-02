<template>
    <section slot="pdf-content" contenteditable="true">
       	<div class="col-md-12">
            <div style="text-align: right; font-weight: 700" class="text-right">Հավելված 3</div>
            <div style="text-align: right; font-weight: 700" class="text-right">{{ $moment(order.contract.sign_date).format('DD.MM.YYYY') }}թ. կնքված</div>
            <div style="text-align: right; font-weight: 700" class="text-right">« {{ order.contract.code }} » ծածկագրով {{order.contract.organize_type !== 'itender' ? 'գնման' : ''}} պայմանագրի</div>
            <br>
            <table style="width: 100%; border: none !important; text-align: center; font-size: 11pt;" class="mt-5">
                <tbody>
                    <tr>
                        <td style="border:none !important; text-align: center; width: 50%;font-size: 11pt;">
                            <div class="ft-11" style="font-weight: 700">Պայմանագրի կողմ </div>
                            <div class="ft-11">{{ order.contract.participant.name }}</div>
                            <div class="ft-11">{{ removeDuplicateString(order.contract.participant.address) }}</div>
                            <div class="ft-11">Բանկ՝ {{ order.contract.participant.bank }}</div>
                            <div class="ft-11">Հ/Հ {{ order.contract.participant.account_number }}</div>
                            <div class="ft-11">ՀՎՀՀ {{ order.contract.participant.tin }}</div>
                        </td>
                        <td style="border:none !important; text-align: center; width: 50%;font-size: 11pt;">
                            <div class="ft-11" style="font-weight: 700">Պատվիրատու</div>
                            <div class="ft-11">{{ order.contract.client.name }}</div>
                            <div class="ft-11">{{ removeDuplicateString(order.contract.client.address) }}</div>
                            <div class="ft-11">Բանկ՝ {{ order.contract.client.bank }}</div>
                            <div class="ft-11">Հ/Հ {{ order.contract.client.account_number }}</div>
                            <div class="ft-11">ՀՎՀՀ {{ order.contract.client.tin }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h6 style="width: 100%;text-align: center;" class="text-center mt-5 font-weight-bold">ԱՐՁԱՆԱԳՐՈՒԹՅՈՒՆ N {{order.index}}</h6>
            <h6 style="width: 100%;text-align: center;" class="text-center font-weight-bold">ՊԱՅՄԱՆԱԳՐԻ ԿԱՄ ԴՐԱ ՄԻ ՄԱՍԻ ԿԱՏԱՐՄԱՆ ԱՐԴՅՈՒՆՔՆԵՐԻ ՀԱՆՁՆՄԱՆ-ԸՆԴՈՒՆՄԱՆ</h6>
            <h6 class="text-left">«______» «_________» 2023թ.</h6>
            <h6 class="text-left">Պայմանագրի /այսուհետ` Պայմանագիր/ անվանումը` {{ order.contract.name }}</h6>
            <h6 class="text-left">Պայմանագրի կնքման ամսաթիվը` {{ $moment(order.contract.sign_date).format('DD.MM.YYYY') }}թ.</h6>
            <h6 class="text-left">Պայմանագրի համարը` « {{ order.contract.code }} »</h6>
            <h6 class="text-left">
                Պատվիրատուն և Պայմանագրի կողմը՝ հիմք ընդունելով պայմանագրի կատարման վերաբերյալ {{ order.discharge_date ? `${order.discharge_date}թ.` : '__-__-____թ.'  }} դուրս գրված N 
                {{ order.invoice_number !== '' ? order.invoice_number :'__________'  }} հաշիվ ապրանքագիրը, կազմեցին սույն
                արձանագրությունը հետևյալի մասին
            </h6>
            <h6 class="text-left">Պայմանագրի շրջանակներում
                <span v-if="order.contract.type === 'product'">
                    Պայմանագրի կողմը մատակարարել է հետևյալ ապրանքները՝
                </span>
                <span v-else-if="order.contract.type === 'service'">
                    Պայմանագրի կողմը մատուցել է հետևյալ ծառայությունները՝
                </span>
                <span v-else>
                    Պայմանագրի կողմը կատարել է հետևյալ աշխատանքները՝
                </span>
            </h6>
            <table style="text-align:center;border: 1px solid black; border-collapse:collapse;" class="table-1 mt-5">
                <thead>
                    <tr>
                        <th style="border: 1px solid black ;" rowspan="3">N</th>
                        <th style="border: 1px solid black ;" colspan="8">
                            <span v-if="order.contract.type === 'product'">
                                Մատակարարված ապրանքների
                            </span>
                            <span v-else-if="order.contract.type === 'service'">
                                Մատուցված ծառայություններ
                            </span>
                            <span v-else>
                                Կատարված աշխատանքներ
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black ;" rowspan="2">անվանումը</th>
                        <th style="border: 1px solid black ;" rowspan="2">տեխնիկական բնութագրի համառոտ շարադրանքը</th>
                        <th style="border: 1px solid black ;" colspan="2">քանակական ցուցանիշը
                        </th>
                        <th style="border: 1px solid black ;" colspan="2">մակատարման ժամկետը</th>
                        <th style="border: 1px solid black ;" rowspan="2">Վճարման ենթակա գումարը /ՀՀ հազար դրամ</th>
                        <th style="border: 1px solid black ;" rowspan="2">Վճարման ժամկետը /ըստ վճարման ժամանակացույցի</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid black ;">ըստ պայմանագրով հաստատված գնման ժամանակացույցի</th>
                        <th style="border: 1px solid black ;">փաստացի</th>
                        <th style="border: 1px solid black ;"> ըստ
                            պայմանագրով
                            հաստատված
                            գնման
                            ժամանակացույցի</th>
                        <th style="border: 1px solid black ;">փաստացի
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(lot, lotIndex) in order.lots" :key="lot.id">
                        <td style="border: 1px solid black ;">{{ lotIndex + 1 }}</td>
                        <td style="border: 1px solid black ;">{{ lot.lot_info.name }}</td>
                        <td style="border: 1px solid black ;">{{ lot.lot_info.specification }}</td>
                        <td style="border: 1px solid black ;">{{ lot.lot_info.available + lot.lot_info.ordered + lot.lot_info.supplied }} {{ lot.lot_info.unit }}</td>
                        <td style="border: 1px solid black ;">{{ lot.ordered }} {{ lot.lot_info.unit }}</td>
                        <td style="padding:0 !important;border: 1px solid black ;">
                            {{ lot.lot_info.delivery_date }}{{validDateFormat(lot.lot_info.delivery_date) ? 'թ.' : ''}}
                        </td>
                        <td style="padding:0 !important;border: 1px solid black ;">
                            {{ order.completion_actual_date }}{{validDateFormat(order.completion_actual_date) ? 'թ.' : ''}}
                        </td>
                        <td style="border: 1px solid black ;">
                            {{ ((lot.ordered * lot.lot_info.price_unit) / 1000).toFixed(2) }}
                        </td>
                        <td style="padding:0 !important;border: 1px solid black ;">
                            {{ lot.lot_info.payment_date }}{{validDateFormat(lot.lot_info.payment_date) ? 'թ.' : ''}}
                        </td>
                    </tr>
                    <tr v-if="order.lots.length > 1">
                        <td style="border: 1px solid black ; border-collapse: collapse;" colspan="7">Ընդամենը</td>
                        <td style="border: 1px solid black ; border-collapse: collapse;">{{total}}</td>
                        <td style="border: 1px solid black ; border-collapse: collapse;"></td>
                    </tr>
                </tbody>
            </table>
  			<h6 class="text-justify mt-5"> Սույն արձանագրության երկկողմ հաստատման համար հիմք հանդիսացած հաշիվ ապրանքագիրը և դրական եզրակացությունը հանդիսանում են սույն արձանագրության բաղկացուցիչ մասը և կցվում են:</h6>
            <table class="mt-5" style="width: 100%; border: none !important; text-align: center; font-size: 11pt;">
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
    components: {},
    props: ['participantGroup', 'handleLoaded'],
    data() {
        return {
            order: this.participantGroup,
            total: 0,
        }
    },
    computed: {
        me() {
            return this.$store.getters['user/me']
        },
    },
    async mounted(){
        this.handleLoaded();
        if(this.order.lots.length > 1){
            await this.order.lots.forEach((lot) => {
                this.total += (lot.ordered * lot.lot_info.price_unit) / 1000
            })   
        }
        this.total = this.total.toFixed(2)
    },
    methods: {
        removeDuplicateString(string){
            var uniqueList=string.split(' ').filter(function(item,i,allItems){
                return i === allItems.indexOf(item);
            }).join(' ');
            return uniqueList
        },
        validDateFormat(date){
            if(date){
                return date.split('.').length === 3
            } else {
                return false;
            }
        },
        fixIncorrectWords(word) {
            return word.replace('միլիօն', 'միլիոն')
        },
        getTotalPrice({lots}){
            var totalPrice = 0;
            lots.forEach((lot) => {
                totalPrice += lot.ordered * lot.lot_info.price_unit
            })
            return totalPrice;
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

