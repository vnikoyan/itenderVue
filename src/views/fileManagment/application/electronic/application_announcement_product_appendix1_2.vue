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
			v-if="isLoaded" ref="content">
		<div class="info-block">
			<div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">Հավելված 1.2</div>
			<div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> »  ծածկագրով</div>
			<div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> հրավերի</div>
			<p :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700; font-family: GHEA grapalat ;">ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</p>
			<p :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-size: 14px; font-family: GHEA grapalat ; text-align: center">հայաստանյան ծագում ունեցող աշխատանքային և (կամ) արտադրական ռեսուրսների օգտագործման մասին</p>
			<div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-size: 14px; font-family: GHEA grapalat ; margin-top: 3rem">
				« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> հայտնում է, որ պարտավորվում է <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ organizator }}</span>-ի կողմից 
				« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> » ծածկագրով հայտարարված <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> <span :style="newProps ? 'font-size: 11pt' : ''" v-for="(row, index) in rows" :key="index"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.viewId }}</span><span :style="newProps ? 'font-size: 11pt' : ''" v-if="index !== rows.length-1">,</span> </span> 
				չափաբաժնի  (չափաբաժինների) մասով հաղթող ճանաչվելու դեպքում</div>
			<div style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; այդ չափաբաժնի (չափաբաժինների) մասով կնքվելիք պայմանագիրը կատարելու ժամանակ գնային առաջարկով
				ներկայացվող արժեքի ավելի քան 50 տոկոսը՝ հանրագումարային ձևով, ուղղել հայաստանյան ծագում ունեցող աշխատանքային և (կամ) արտադրական ռեսուրսների օգտագործման
				միջոցով պայմանագրի կատարմանը</div>
			<div style="text-align: justify;" :style="newProps ? 'font-size: 11pt' : ''">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; պայմանագիրը կատարել  թվով <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ workersCount }}</span> աշխատակիցների միջոցով։</div>
			<div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-size: 14px; font-family: GHEA grapalat ; margin-top: 1.5rem">Ստորև ներկայացվում է սույն ընթացակարգի արդյունքում հաղթող ճանաչվելու դեպքում կնքվելիք պայմանագրով մատակարարվող հայաստանյան ծագում ունեցող ապրանքների ցանկը՝ անվանումների, գումարների և քանակների նշումով՝ </div>
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
				<thead :key="index" v-for="(row, index) in rows">
					<tr>
						<th :style="newProps ? 'font-size: 11pt' : ''" colspan="3" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">
							Չափաբաժնի N` <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.viewId }}</span>
						</th>
					</tr>
					<tr>
						<th :style="newProps ? 'font-size: 11pt' : ''" colspan="3" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">
							Օգտագործվելիք նյութերի
						</th>
					</tr>
					<tr>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">Անվանում</th>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">Քանակ</th>
						<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">Գումար/դրամ</th>
					</tr>
					<tbody v-for="(material, materialIndex) in row.usedMaterials" :key="materialIndex">
						<tr>
							<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
								border-collapse: collapse;
								text-align: center;
								padding: 7px 7px;
								font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ material.name }}</span></td>
							<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
								border-collapse: collapse;
								text-align: center;
								padding: 7px 7px;
								font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ material.count }}</span></td>
							<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
								border-collapse: collapse;
								text-align: center;
								padding: 7px 7px;
								font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ material.value }}</span></td>
						</tr>
					</tbody>
				</thead>
			</table>
			<div style="margin-top: 20px;">
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
import purchaseTypes from '@/mixins/purchaseTypes';

export default {
    name: 'application_announcement_product',
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
		this.tenderData = this.tender.tender
		this.is_new_beneficiari = this.tenderData.is_new_beneficiari
		await this.rows.forEach(async (row, index) => {
			if(index === this.rows.length-1){
				this.isLoaded = true;
				await this.handleLoaded()
			}
		})
    },
    computed: {
        me() {
            return this.$store.getters['user/me']
        },
    },
	async mounted(){
		this.getTenderTypeByPlan = await this.purchaseTypesLongNamesCased.hy[this.tenderData.procedure.id];
		this.password = this.tenderData.password
		this.organizator = this.tenderData.organizator
		this.is_old = this.tenderData.is_old
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