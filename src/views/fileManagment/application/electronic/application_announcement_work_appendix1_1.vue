<template>
	<div style=" font-size: 14px; font-family: GHEA grapalat ;         
            position: relative;
            width: 100%;
            padding-right: 12px;
            padding-left: 12px;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
            " 
			v-if="isLoaded"
			ref="content"
	>
		<div>
			<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700">Հավելված 1.1</div>
			<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> »  ծածկագրով</div>
			<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> հրավերի</div>
			<p :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700; margin-top: 2rem">ՆԿԱՐԱԳԻՐ</p>
			<p :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700">սարքերի և սարքավորումների</p>
			<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; margin-bottom: 1rem; text-align: justify;">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ն « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> » ծածկագրով <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> շրջանակում ըստ չափաբաժինների ստորև ներկայացնում է իր կողմից առաջարկվող ապրանքի ամբողջական նկարագիրը</div>
			<table style=" font-size: 14px; font-family: GHEA grapalat ; 		width: 100%;
								table-layout: fixed;
								border-collapse: collapse;
								page-break-inside: avoid;
								border: 1px solid  black;
								margin: 20px auto;
								padding-bottom: 50px;
								text-align: center;
								margin-bottom: .5rem; 
								margin-top: .5rem 
				">
				<thead>
					<tr>
						<th :style="newProps ? 'font-size: 11pt' : ''" colspan="7" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid  black;
									border-collapse: collapse;
									font-size: 12px;
									padding: 8px 18px;">
							Առաջարկվող սարքերի և սարքավորումների
						</th>
					</tr>
					<tr>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid  black;
									border-collapse: collapse;
									font-size: 12px;
									padding: 8px 18px;">
							Չափաբաժնի համար
						</th>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid  black;
									border-collapse: collapse;
									font-size: 12px;
									padding: 8px 18px;">
							ֆիրմային անվանումը
						</th>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid  black;
									border-collapse: collapse;
									font-size: 12px;
									padding: 8px 18px;">
							ապրանքային նշանը
						</th>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid  black;
									border-collapse: collapse;
									font-size: 12px;
									padding: 8px 18px;">
							{{is_with_model ? 'մոդելը' : 'մակնիշը'}}
						</th>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid  black;
									border-collapse: collapse;
									font-size: 12px;
									padding: 8px 18px;">
							արտադրողի անվանումը
						</th>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid  black;
									border-collapse: collapse;
									font-size: 12px;
									padding: 8px 18px;">
							տեխնիկական բնութագրերը
						</th>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; border: 1px solid  black;
									border-collapse: collapse;
									font-size: 12px;
									padding: 8px 18px;">
							երաշխիքային ժամկետները
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, index) in rows" :key="index">
						<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.viewId }}</span></td>
						<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.firm_name }}</span></td>
						<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.trademark }}</span></td>
						<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.brand }}</span></td>
						<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.manufacturer }}</span></td>
						<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.specification }}</span></td>
						<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.guarantee_time }}</span></td>
					</tr>
				</tbody>
			</table>
			<div style="margin-top: 20px">
				<table style="text-align: center;border: 0; width: 100%">
					<tr>
						<td style="border: 0;width: 50%;">
							<p class="ft-11" :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center">« <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ի տնօրեն՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.director_name.hy }}</span></p>
						</td>
						<td style="border: 0; width: 50%;">
							<p style="text-align: center;font-family: GHEA grapalat ;" :style="newProps ? 'font-size: 11pt' : ''">_________________</p>
						</td>
					</tr>
					<tr>
						<td style="border: 0; width: 50%;">
							<p style="text-align: center;font-family: GHEA grapalat ;" :style="newProps ? 'font-size: 11pt' : ''" class="min-t ft-6"> Մասնակցի անվանումը  (ղեկավարի պաշտոնը, անուն ազգանունը)    </p>
						</td>
						<td style="border: 0; width: 50%;">
							<p :style="newProps ? 'font-size: 11pt' : ''" class="min-t ft-6" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center"> ստորագրությունը</p>
						</td>
					</tr>
				</table>
			</div>
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
            tenderData: {},
            totalMembers: 0,
            isWithArmenianResources: false,
			isLoaded: false,
			is_new_beneficiari: false,
			is_with_model: true,
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
		this.is_with_model = this.tenderData.is_with_model
		this.is_new_beneficiari = this.tenderData.is_new_beneficiari
		await this.rows.forEach(async (row, index) => {
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
		async handleBeforeDownload() {
			this.newProps = true
			await this.handleLoaded()
			return this.$refs.content.innerHTML
		},
    },
}
</script>
<style scoped>
	.color{
		color: rgb(17, 85, 204) !important;
	}
</style>