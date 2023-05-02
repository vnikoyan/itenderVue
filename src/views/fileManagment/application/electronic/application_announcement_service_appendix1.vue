<template>
	<div style=" font-size: 14px; font-family: GHEA grapalat ;         
			position: relative;
			width: 100%;
			padding-right: 12px;
			padding-left: 12px;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 100%;
			flex: 0 0 100%;
			" 
			v-if="isLoaded"
			ref="content"
		>
		<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700">Հավելված  N 1</div>
		<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span>  »  ծածկագրով</div>
		<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span>  հրավերի</div>
		<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700;">ԴԻՄՈՒՄ ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</div> 
		<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> մասնակցելու</div>
		<div :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; margin-bottom: 1rem; text-align: justify;">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span>  » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>  հայտնում է, որ ցանկություն ունի մասնակցել <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ organizator }}</span> -ի կողմից « <span :style="newProps ? 'font-size: 11pt' : ''"  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span>  » ծածկագրով հայտարարված <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span>  <span :style="newProps ? 'font-size: 11pt' : ''" v-for="(row, index) in rows" :key="index"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.viewId }}</span> <span :style="newProps ? 'font-size: 11pt' : ''" v-if="index !== rows.length-1">,</span></span> չափաբաժնին  (չափաբաժիններին) և հրավերի պահանջներին համապատասխան  ներկայացնում  է հայտ:</div> <br>
		<span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; margin-bottom: 1rem">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span>  » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> -ն հայտնում և հավաստում է, որ հանդիսանում է ՀՀ ռեզիդենտ:</span> <br>
		<span :style="newProps ? 'font-size: 11pt' : ''" style="font-family: GHEA grapalat ;">« <span :style="newProps ? 'font-size: 11pt' : ''"  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span>  » <span :style="newProps ? 'font-size: 11pt' : ''"  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> -ի՝</span> <br>
		<span :style="newProps ? 'font-size: 11pt' : ''" style="font-family: GHEA grapalat ;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; հարկ վճարողի հաշվառման համարն է` <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantMainInfo.tin }}</span> </span> <br>
		<span v-if="this.tenderData.procedure && +this.tenderData.procedure.id === 7" :style="newProps ? 'font-size: 11pt' : ''">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; բանկային հաշվեհամարն է` <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantMainInfo.bank_account }}</span></span> 
		<span :style="newProps ? 'font-size: 11pt' : ''" style="font-family: GHEA grapalat ;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; էլեկտրոնային փոստի հասցեն է` <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ me.email }}</span> </span> <br>
		<span :style="newProps ? 'font-size: 11pt' : ''" style="font-family: GHEA grapalat ;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; գործունեության հասցեն է՝ <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.region.hy }}</span>  <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.city.hy }}</span>  <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.address.hy }}</span> </span> <br>
		<span :style="newProps ? 'font-size: 11pt' : ''" style="font-family: GHEA grapalat ;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; հեռախոսահամարն է՝ <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ me.phone }}</span> </span> <br>
		<span v-if="this.tenderData.procedure && +this.tenderData.procedure.id === 7" :style="newProps ? 'font-size: 11pt' : ''">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ռուսերեն լեզվով անվանումն է՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.ru }}</span> » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.ru }}</span></span></span> 
		<span :style="newProps ? 'font-size: 11pt' : ''" style="margin-top: 12px;font-family: GHEA grapalat ;">Սույնով « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span>  » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> -ն հայտարարում և հավաստում է, որ՝ </span> <br>
		<!-- <div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-family: GHEA grapalat ;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) բավարարում է « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span>  »  ծածկագրով  <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span>  հրավերով սահմանված մասնակցության իրավունքի պահանջներին  և պարտավորվում ընտրված մասնակից ճանաչվելու դեպքում, հրավերով սահմանված կարգով և ժամկետում, ներկայացնել  որակավորման ապահովում. </div> <br> -->
		<div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ն և իրեն փոխկապակցված անձինք բավարարում են « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> »  ծածկագրով <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> հրավերով սահմանված մասնակցության իրավունքի պահանջներին և « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ն պարտավորվում է ընտրված մասնակից ճանաչվելու դեպքում, հրավերով սահմանված կարգով և ժամկետում, ներկայացնել որակավորման ապահովում</div>
		<span :style="newProps ? 'font-size: 11pt' : ''" style="font-family: GHEA grapalat ;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span>  » ծածկագրով <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> մասնակցելու շրջանակում`</span>
		<div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-family: GHEA grapalat ;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;թույլ չի տվել և (կամ) թույլ չի տալու անբարեխիղճ մրցակցություն, գերիշխող դիրքի չարաշահում և հակամրցակցային համաձայնություն,</div> 
		<div :style="newProps ? 'font-size: 11pt' : ''" style="text-align: justify;font-family: GHEA grapalat ;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;բացակայում է հրավերով սահմանված` « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span>  » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> -ին փոխկապակցված անձանց և (կամ) « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span>  » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> -ի 
		կողմից հիմնադրված կամ ավելի քան հիսուն տոկոս « <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span>  » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> -ին պատկանող բաժնեմաս (փայաբաժին) ունեցող կազմակերպությունների միաժամանակյա մասնակցության դեպք:</div> 
		<template v-if="is_new_beneficiari">
			<div>
				<p :style="newProps ? 'font-size: 11pt' : ''" style="margin: 30px 0;">Ստորև ներկայացնում է <span :style="newProps ? 'font-size: 11pt' : ''" style="font-family: GHEA grapalat ;" class="color">«{{ participantInfo.name.hy }}» {{ participantInfo.company_type.hy }}</span>-ի իրական շահառուների վերաբերյալ</p>
				<p :style="newProps ? 'font-size: 11pt' : ''" v-if="beneficiaries.inputOptions === 1">տեղեկություններ պարունակող կայքէջի հղումը՝ <a :style="newProps ? 'font-size: 11pt' : ''" :href="beneficiaries.linkInfoPage"> {{beneficiaries.linkInfoPage}} </a>**</p>
				<p :style="newProps ? 'font-size: 11pt' : ''" v-else-if="beneficiaries.inputOptions === 2" style="margin-top: 30px">հայտարարագիր՝ համաձայն  հավելված 1.2</p>
			</div>
			<h6 style=" font-size: 14px; font-family: GHEA grapalat ; margin-top: 1.5rem; text-align: justify;">Կից ներկայացվում է « <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> կողմից առաջարկվող ապրանքի ամբողջական նկարագիրը՝ համաձայն հավելված 1.1-ի:</h6>
		</template>
		<template v-else-if="is_new_beneficiari === false">
			<div style="text-align: justify">
				<span :style="newProps ? 'font-size: 11pt' : ''">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ստորև ներկայացնում է հայտը ներկայացնելու օրվա դրությամբ այն ֆիզիկական անձի (անձանց) տվյալները, ով ուղղակի կամ անուղղակի ունի մասնակցի կանոնադրական կապիտալում քվեարկող բաժնետոմսերի (բաժնեմասերի, փայերի) ավել քան տաս տոկոսը, ներառյալ ըստ ներկայացնողի բաժնետոմսերը, կամ այն անձի (անձանց) տվյալները, ով իրավունք ունի նշանակելու կամ ազատելու մասնակցի գործադիր մարմնի անդամներին, կամ ստանում է մասնակցի կողմից իրականացվող ձեռնարկատիրական կամ այլ գործունեության արդյունքում ստացված շահույթի տասնհինգ տոկոսից ավելին (իրական շահառուներ) և հավաստում, որ իրական շահառուների մասին ներկայացված տեղեկատվությունը իրական է և չի պարունակում ոչ հավսատի տեղեկություններ: 
				</span>
			</div>
			<div>
				<table style=" font-size: 14px; font-family: GHEA grapalat ; 			width: 100%;
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
							<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
															border-collapse: collapse;
															font-size: 12px;
															padding: 8px 18px;
								">Անունը Ազգանունը Հայրանունը</th>
							<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
															border-collapse: collapse;
															font-size: 12px;
															padding: 8px 18px;
								">ՀՀ քաղաքացիների համար` նույնականացման քարտի կամ անձնագրի կամ ՀՀ օրենսդրությամբ նախատեսված անձը հաստատող փաստաթղթի տեսակը և համարը</th>
							<th :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
															border-collapse: collapse;
															font-size: 12px;
															padding: 8px 18px;
								">Օտարերկրյա քաղաքացիների համար համապատասխան երկրի օրենսդրությամբ նախատեսված անձը հաստատող փաստաթղթի տեսակը և համարը </th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(beneficiary, index) in beneficiaries" :key="index">
							<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
											border-collapse: collapse;
											text-align: center;
											padding: 7px 7px;
											font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ beneficiary.name_surname }}</span></td>
							<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
											border-collapse: collapse;
											text-align: center;
											padding: 7px 7px;
											font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ beneficiary.armenian_card_number }}</span></td>
							<td :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
											border-collapse: collapse;
											text-align: center;
											padding: 7px 7px;
											font-size: 14px;"><span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ beneficiary.international_card_number }}</span></td>
						</tr>
					</tbody>
				</table>			
			</div>
			<div style="text-align: justify">
				<span :style="newProps ? 'font-size: 11pt' : ''">3) ապահովված է դիմում-հայտարարությունը ներկայացնելուց հետո էլեկտրոնային աճուրդի համակարգի կողմից տրամադրված եզակի ծածկագրի (PIN կոդը) անվտանգությունն ու գաղտնիությունը և դրա օգտագործմամբ էլեկտրոնային աճուրդի համակարգում ընթացակարգին մասնակցելուց բխող ցանկացած գործողություն կատարվում է համապատասխան լիազորություն ունեցող անձի կողմից:
				</span>
			</div>
		</template>
		<div style="margin-top: 20px;">
			<table style="text-align: center;border: 0; width: 100%">
				<tr>
					<td style="border: 0;width: 50%;">
						<p class="ft-11" :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ի տնօրեն՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.director_name.hy }}</span></p>
					</td>
					<td style="border: 0; width: 50%;">
						<p style="text-align: center;font-family: GHEA grapalat ; " :style="newProps ? 'font-size: 11pt' : ''">_________________</p>
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
</template>

<script>
import purchaseTypes from '@/mixins/purchaseTypes'

export default {
    name: 'application_announcement_service',
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
			newProps: false,
			getTenderTypeByPlan: '',
			password: '',
			organizator: '',
			is_old: '',
        }
    },
	async mounted(){
		this.getTenderTypeByPlan = await this.purchaseTypesLongNamesCased.hy[this.tenderData.procedure.id];
		this.password = this.tenderData.password
		this.organizator = this.tenderData.organizator
		this.is_old = this.tenderData.is_old
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
		if(this.tenderData.type === 'ELECTRONIC AUCTION'){
			this.is_new_beneficiari = false
		}
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