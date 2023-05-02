<template>
    <section slot="pdf-content" contenteditable="true" ref="contract">
        <div class="col-md-12" style="font-size: 14px;">
            <h6 style="margin-top: 3rem;font-weight: 700;text-align: center;">ԳՆԱՅԻՆ ԱՌԱՋԱՐԿ</h6>
            <p style="text-align: justify">Ուսումնասիրելով «{{ currentOrganized.code }}» ծածկագրով մեկ անձից գնման ընթացակարգի
                                    հրավերը, այդ թվում կնքվելիք պայմանագրի նախագիծը, {{ currentWinner.name }}-ն առաջարկում է
                                    պայմանագիրը կատարել ներքոհիշյալ ընդհանուր գներով.
            </p>
            <br>
            <div style="text-align: right; margin-right: 20px; font-size: 13px;">ՀՀ դրամ</div>
            <table cellspacing="3" cellpadding="3" style="border: 1px solid  black;
                                               border-collapse: collapse;
                                               page-break-inside: avoid;
                                                
                                               text-align: center;">
                <tr>
                    <th style="border: 1px solid  black;
                               border-collapse: collapse;">Չափաբաժինների համարները</th>
                    <th style="border: 1px solid  black;
                               border-collapse: collapse;" v-if="currentOrganized.cpv_type === '1'">Ապրանքների անվանումները</th>
                    <th style="border: 1px solid  black;
                               border-collapse: collapse;" v-else-if="currentOrganized.cpv_type === '2' ">Ծառայության անվանումը</th>
                    <th style="border: 1px solid  black;
                               border-collapse: collapse;" v-else-if="currentOrganized.cpv_type === '3' ">Աշխատանքի անվանումը</th>
                    <th style="border: 1px solid  black;border-collapse: collapse;">Արժեքը (ինքնարժեքի և
                        կանխատեսվող
                        շահույթի
                        հանրագումարը)
                        /տառերով և թվերով/ 
                    </th>
                    <th style="border: 1px solid  black;
                               border-collapse: collapse;">ԱԱՀ** /տառերով և թվերով/</th>
                    <th style="border: 1px solid  black;border-collapse: collapse;">Ընդհանուր գինը /տառերով և թվերով/</th>
                </tr>
                <tr>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;">1</td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;">2</td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;">3</td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;">4</td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;">5=3+4</td>
                </tr>
                <tr v-for="(row) in rows" :key="row.id">
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;
                               text-align: center;">{{ row.view_id }}</td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;
                               text-align: center;">{{ row.cpv_name }}</td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse; text-align: center;" v-if="row.value !== 0 && row.value !== undefined && row.value !== null">{{ row.value }} / {{ row.value_word }} /</td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;
                               text-align: center;" v-else></td>
                    <td style="border: 1px solid  black;border-collapse: collapse;
                               text-align: center;
                               " v-if="row.vat !== 0 && row.vat !== undefined && row.vat !== null">{{ row.vat }} / {{ row.vat_word }} / </td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse;
                               text-align: center;" v-else></td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse; text-align: center;" v-if="row.cost !== 0 && row.cost !== undefined && row.cost !== null">{{ row.cost }}  / {{ row.cost_word }} /</td>
                    <td style="border: 1px solid  black;
                               border-collapse: collapse; text-align: center;" v-else></td>
                </tr>
            </table>
            <br>
            <table style="margin: 0 !important; border: 0 !important;" cellspacing="0" cellpadding="0">
                <tr>
                    <td style="border: 0 !important; text-align: left !important; padding: 0 !important;" class="ft-11">{{ currentWinner.name }} տնօրեն՝ {{ currentWinner.director }}</td>
                    <td style="border: 0 !important; text-align: center; padding: 0 !important; width: 300px;">___________________________________</td>
                </tr>
                <tr style="position: relative;">
                    <td style="border: 0 !important;"></td>
                    <td style="width: 300px;border: 0 !important; text-align: center; font-size: 10px; padding: 0 !important;">ստորագրությունը <br> Կ. Տ.</td>
                </tr>
            </table>
            <br>
        </div>
    </section>
</template>

<script>

export default {
    name: 'price_offer',
    props: ['participantGroup', 'handleLoaded'],
    data() {
        return {
            currentWinner: this.participantGroup,
            rows: [],
            participants: [],
            valueWord: '',
            vatWord: '',
            costWord: '',
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
    },
    watch: {
        currentOrganized: {
            immediate: true,
            async handler() {
                await this.currentWinner.lots.forEach(async(lot) => {
                    const offer = this.currentOrganized.lots.find(item => item.organize_row_id === lot.id && (item.participant_id === this.currentWinner.id || item.row_group_id === this.currentWinner.id))
                    var rowObj ={
                        view_id: lot.view_id,
                        cpv_name: lot.is_from_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name,
                        value: offer.value,
                        value_word: await this.numberToWord(offer.value),
                        vat: offer.vat,
                        vat_word: await this.numberToWord(offer.vat),
                        cost: offer.cost,
                        cost_word: await this.numberToWord(offer.cost),
                    }
                    this.rows.push(rowObj)
                    this.rows.sort((a, b) => a.view_id - b.view_id)
                    if(this.rows.length === this.currentWinner.lots.length){
                        await this.handleLoaded()
                    }
                })
            },
        },
    },
    methods: {
		async numberToWord(number) {
			const { data } = await this.$client.post('numberToWord', {number})
			return data;
		},
        currentDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            return mm + '.' + dd + '.' + yyyy;
        },
        consoleLog(e) {
            console.log(e)
        },
        download() {
            this.$refs.contract.generatePdf()
            this.newProps = false
        },
        async handleBeforeDownload() {
            this.newProps = true
            await this.handleLoaded()
            return this.$refs.contract.innerHTML
        },
    },
}
</script>
<style scoped>
    *{
        font-family: GHEA grapalat !important;
    }
</style>
