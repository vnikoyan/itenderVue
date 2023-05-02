<template>
	<div style="font-size: 14px;" v-if="isLoaded" ref="content">
		<div class="info-block">
			<div style="text-align: right; font-weight: 700">Հավելված 2</div>
			<div style="text-align: right; font-weight: 700">« <span class="color">{{ password }}</span> » ծածկագրով</div>
			<div style="text-align: right; font-weight: 700"><span class="color">{{getTenderTypeByPlan}}</span> հրավերի</div>
			<br>
			<div style="text-align: center; font-weight: 700">ԳՆԱՅԻՆ ԱՌԱՋԱՐԿ</div>
			<div style="text-align: justify;">Ուսումնասիրելով « <span class="color">{{ password }}</span> » ծածկագրով <span class="color">{{getTenderTypeByPlan}}</span> հրավերը, այդ թվում կնքվելիք  պայմանագրի նախագիծը, 
			« <span  class="color">{{ participantInfo.name.hy }}</span> » <span class="color">{{ participantInfo.company_type.hy }}</span> -ն առաջարկում է պայմանագիրը կատարել ներքոհիշյալ ընդհանուր գներով.
			</div>
			<br>
			<div style="text-align: right; margin-right: 20px;">ՀՀ դրամ</div>
			<table	style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid  black;
                            text-align: center;">
				<thead>
					<tr>
						<th  style="border: 1px solid  black;
									border-collapse: collapse;">Չափաբաժինների համարները</th>
						<th  style="border: 1px solid  black;
									border-collapse: collapse;">Աշխատանքի անվանումը</th>
						<template v-if="is_old">
							<th  style="border: 1px solid  black;
									    border-collapse: collapse;">Ինքնարժեք</th>
							<th  style="border: 1px solid  black;
										border-collapse: collapse;">Շահույթ</th>
						</template>
						<th  style="border: 1px solid  black;
									border-collapse: collapse;" v-else>Արժեք <br/> (ինքնարժեքի և կանխատեսվող շահույթի հանրագումարը) /տառերով և թվերով/</th>
						<th  style="border: 1px solid  black;
									border-collapse: collapse;">ԱԱՀ <br/> /տառերով և թվերով/</th>
						<th  style="border: 1px solid  black;
									border-collapse: collapse;">Ընդհանուր գինը <br/> /տառերով և թվերով/</th>
					</tr>
				</thead>
				<thead>
					<tr>
	                    <td style="border: 1px solid  black;
	                               background-color: rgb(91, 180, 243);
	                               border-collapse: collapse;">1</td>
	                    <td style="border: 1px solid  black;
	                               background-color: rgb(91, 180, 243);
	                               border-collapse: collapse;">2</td>
	                    <td style="border: 1px solid  black;
	                               background-color: rgb(91, 180, 243);
	                               border-collapse: collapse;">3</td>
	                    <td style="border: 1px solid  black;
	                               background-color: rgb(91, 180, 243);
	                               border-collapse: collapse;">4</td>
	                    <td style="border: 1px solid  black;
	                               background-color: rgb(91, 180, 243);
	                               border-collapse: collapse;">5=3+4</td>
	                </tr>
				</thead>
				<tbody>
					<tr v-for="(row, index) in rows" :key="index">
						<td  style="border: 1px solid  black;
									border-collapse: collapse;">
						<span class="color">{{ row.viewId }}</span></td>
						<td  style="border: 1px solid  black;
									border-collapse: collapse;"><span class="color">{{ row.name }}</span></td>
						<template v-if="is_old">
							<td  style="border: 1px solid  black;
									    border-collapse: collapse;"><span class="color">{{ row.cost }}</span> / <span class="color">{{ fixIncorrectWords(row.valueWord) }}</span> /</td>
							<td  style="border: 1px solid  black;
									border-collapse: collapse;"><span class="color">{{ row.profit }}</span> / <span class="color">{{ fixIncorrectWords(row.valueWord) }}</span> /</td>
						</template>
						<td  style="border: 1px solid  black;
									border-collapse: collapse;" v-else><span class="color">{{ row.value }}</span> / <span class="color">{{ fixIncorrectWords(row.valueWord) }}</span> /</td>
						<td  style="border: 1px solid  black;
									border-collapse: collapse;"><template v-if="row.vat"><span class="color">{{ row.vat }}</span> / <span class="color">{{ fixIncorrectWords(row.vatWord) }}</span> /</template></td>
						<td  style="border: 1px solid  black;
									border-collapse: collapse;"><span class="color">{{ row.overall }}</span> / <span class="color">{{ fixIncorrectWords(row.overallWord) }}</span> /</td>
					</tr>			
				</tbody>
			</table>
			<br>
			<table style="margin: 0 !important; border: 0 !important;" cellspacing="0" cellpadding="0">
                <tr>
                    <td style="border: 0 !important; text-align: left !important; padding: 0 !important;" class="ft-11">							
                    	<div class="ft-11" style="text-align: center">« <span class="color">{{ participantInfo.name.hy }}</span> » <span class="color">{{ participantInfo.company_type.hy }}</span>-ի տնօրեն՝ <span class="color">{{ participantInfo.director_name.hy }}</span></div></td>
                    <td style="border: 0 !important; text-align: center; padding: 0 !important; width: 300px;">___________________________________</td>
                </tr>
                <tr style="position: relative;">
                    <td style="border: 0 !important; font-size: 10px;text-align: center;">Մասնակցի անվանումը  (ղեկավարի պաշտոնը, անուն ազգանունը)</td>
                    <td style="width: 300px;border: 0 !important; text-align: center; font-size: 10px; padding: 0 !important;">ստորագրությունը</td>
                </tr>
            </table>
		</div>
	</div>
</template>

<script>
import purchaseTypes from '@/mixins/purchaseTypes'

export default {
    name: 'application_announcement_work',
    mixins: [purchaseTypes],
    components: {},
    props: ['handleLoaded', 'tender'],
    data() {
        return {
            participantInfo: {},
            participantsSequence: [],
            rows: [],
            beneficiaries: {},
            totalMembers: 0,
            isWithArmenianResources: false,
			isLoaded: false,
			is_new_beneficiari: false,
			newProps: false,
			getTenderTypeByPlan: '',
			password: '',
			organizator: '',
			is_old: '',
        }
    },
    async created() {
		this.participantMainInfo = this.me.organisation[0]
		this.participantInfo = this.me.organisation[0].translations
		this.isWithArmenianResources = this.tender.isWithArmenianResources
		this.rows = this.tender.selectedRows
		this.beneficiaries = this.tender.realBeneficiaries
		this.workersCount = this.tender.workersCount
		this.isWithProductsDetails = this.tender.isWithProductsDetails
		this.tenderData = this.tender.tender
		this.is_new_beneficiari = this.tenderData.is_new_beneficiari

		const numbers = [];
		this.rows.forEach(row => {
			numbers.push(...[row.value, row.cost, row.profit, row.vat, row.overall])
		});

		const numberWords = await this.numberToWordArray(numbers);

		let indexNumber = 0

		await this.rows.forEach(async (row, index) => {
			row.valueWord = numberWords[indexNumber];
			row.costWord = numberWords[indexNumber+1];
			row.profitWord = numberWords[indexNumber+2];
			row.vatWord = numberWords[indexNumber+3];
			row.overallWord = numberWords[indexNumber+4];
			indexNumber=indexNumber+5
			if(index === this.rows.length-1){
				this.isLoaded = true;
				await this.handleLoaded()
			}
		})
    },
	async mounted(){
		this.getTenderTypeByPlan = await this.purchaseTypesLongNamesCased.hy[this.tenderData.procedure.id];
		this.password = this.tenderData.password
		this.organizator = this.tenderData.organizator
		this.is_old = this.tenderData.is_old
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
		async numberToWordArray(number) {
			const { data } = await this.$client.post('numberToWordArray', {number})
			return data;
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
	.color{
		color: rgb(17, 85, 204) !important;
	}
</style>