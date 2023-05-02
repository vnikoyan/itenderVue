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
		<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">Հավելված  N 1</h6>
		<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> »  ծածկագրով</h6>
		<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> հրավերի</h6>
		<h5  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700; font-family: GHEA grapalat ;">ԴԻՄՈՒՄ ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</h5>
		<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700; font-family: GHEA grapalat ;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> մասնակցելու</h6>
		<h6  style=" font-size: 14px; font-family: GHEA grapalat ; margin-bottom: 1rem; text-align: justify;">« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> հայտնում է, որ ցանկություն ունի մասնակցել <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ organizator }}</span>-ի կողմից « <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> » ծածկագրով հայտարարված <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> <span  v-for="(row, index) in rows" :key="index"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.viewId }}</span><span  v-if="index !== rows.length-1">,</span></span> չափաբաժնին  (չափաբաժիններին) և հրավերի պահանջներին համապատասխան  ներկայացնում  է հայտ:</h6>
		<h6  style=" font-size: 14px; font-family: GHEA grapalat ; margin-bottom: 1rem">« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ն հայտնում և հավաստում է, որ հանդիսանում է ՀՀ ռեզիդենտ:</h6>
		<h6 >« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ի՝</h6>
		<h6 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; հարկ վճարողի հաշվառման համարն է` <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantMainInfo.tin }}</span></h6>
		<h6 v-if="+this.tenderData.procedure.id === 7" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; բանկային հաշվեհամարն է` <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantMainInfo.bank_account }}</span></h6>
		<h6 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; էլեկտրոնային փոստի հասցեն է` <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ me.email }}</span></h6>
		<h6 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; գործունեության հասցեն է՝ <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.region.hy }}</span> <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.city.hy }}</span> <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.address.hy }}</span></h6>
		<h6 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; հեռախոսահամարն է՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ me.phone }}</span></h6>
		<h6 v-if="+this.tenderData.procedure.id === 7" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ռուսերեն լեզվով անվանումն է՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">« <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.ru }}</span> » <span :style="newProps ? 'font-size: 11pt' : ''" style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.ru }}</span></span></h6> 
		<h6 style="margin-top: 12px;">Սույնով « <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ն հայտարարում և հավաստում է, որ՝ </h6>
		<h6  style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) բավարարում է « <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> »  ծածկագրով  <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> հրավերով սահմանված մասնակցության իրավունքի պահանջներին  և պարտավորվում ընտրված մասնակից ճանաչվելու դեպքում, հրավերով սահմանված կարգով և ժամկետում, ներկայացնել  որակավորման ապահովում. </h6>
		<h6 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) « <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> » ծածկագրով <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> մասնակցելու շրջանակում`</h6>
		<h6 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;թույլ չի տվել և (կամ) թույլ չի տալու անբարեխիղճ մրցակցություն, գերիշխող դիրքի չարաշահում և հակամրցակցային համաձայնություն,</h6>
		<h6  style="text-align: justify;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;բացակայում է հրավերով սահմանված` « <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ին փոխկապակցված անձանց և (կամ) « <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ի
		կողմից հիմնադրված կամ ավելի քան հիսուն տոկոս « <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ին պատկանող բաժնեմաս (փայաբաժին) ունեցող կազմակերպությունների միաժամանակյա մասնակցության դեպք:</h6>

		<div v-if="is_new_beneficiari === false">
			<h6 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ստորև ներկայացնում է հայտը ներկայացնելու օրվա դրությամբ այն ֆիզիկական անձի (անձանց) տվյալները, ով ուղղակի կամ անուղղակի ունի մասնակցի կանոնադրական կապիտալում քվեարկող բաժնետոմսերի (բաժնեմասերի, փայերի) ավել քան տաս տոկոսը, ներառյալ ըստ ներկայացնողի բաժնետոմսերը, կամ այն անձի (անձանց) տվյալները, ով իրավունք ունի նշանակելու կամ ազատելու մասնակցի գործադիր մարմնի անդամներին, կամ ստանում է մասնակցի կողմից իրականացվող ձեռնարկատիրական կամ այլ գործունեության արդյունքում ստացված շահույթի տասնհինգ տոկոսից ավելին (իրական շահառուներ) և հավաստում, որ իրական շահառուների մասին ներկայացված տեղեկատվությունը իրական է և չի պարունակում ոչ հավսատի տեղեկություններ: 
			</h6>
		</div>

		<div v-if="is_new_beneficiari">
			<h6  style="margin: 30px 0;">Ստորև ներկայացնում է <span  style="font-family: GHEA grapalat ;" class="color">«{{ participantInfo.name.hy }}» {{ participantInfo.company_type.hy }}</span>-ի իրական շահառուների վերաբերյալ</h6>
			<h6 v-if="beneficiaries.inputOptions === 1">տեղեկություններ պարունակող կայքէջի հղումը՝ <a  :href="beneficiaries.linkInfoPage"> {{beneficiaries.linkInfoPage}} </a>**</h6>
			<h6 v-else-if="beneficiaries.inputOptions === 2" style="margin-top: 30px">հայտարարագիր՝ համաձայն  հավելված 1.2</h6>
		</div>

		<div v-if="is_new_beneficiari === false">
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
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
														border-collapse: collapse;
														font-size: 12px;
														padding: 8px 18px;
							">Անունը Ազգանունը Հայրանունը</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
														border-collapse: collapse;
														font-size: 12px;
														padding: 8px 18px;
							">ՀՀ քաղաքացիների համար` նույնականացման քարտի կամ անձնագրի կամ ՀՀ օրենսդրությամբ նախատեսված անձը հաստատող փաստաթղթի տեսակը և համարը</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
														border-collapse: collapse;
														font-size: 12px;
														padding: 8px 18px;
							">Օտարերկրյա քաղաքացիների համար համապատասխան երկրի օրենսդրությամբ նախատեսված անձը հաստատող փաստաթղթի տեսակը և համարը </th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(beneficiary, index) in beneficiaries" :key="index">
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
										border-collapse: collapse;
										text-align: center;
										padding: 7px 7px;
										font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ beneficiary.name_surname }}</span></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
										border-collapse: collapse;
										text-align: center;
										padding: 7px 7px;
										font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ beneficiary.armenian_card_number }}</span></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
										border-collapse: collapse;
										text-align: center;
										padding: 7px 7px;
										font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ beneficiary.international_card_number }}</span></td>
					</tr>
				</tbody>
			</table>			
		</div>

		<h6 style=" font-size: 14px; font-family: GHEA grapalat ; margin-top: 1.5rem; text-align: justify;">Կից ներկայացվում է « <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> կողմից առաջարկվող ապրանքի ամբողջական նկարագիրը՝ համաձայն հավելված 1.1-ի:</h6>
		<div style="margin-top: 20px;">
			<table style="text-align: center; border: 0; width: 100%">
				<tr>
					<td style="border: 0;width: 50%;">
						<p class="ft-11"  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center">« <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ի տնօրեն՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.director_name.hy }}</span></p>
					</td>
					<td style="border: 0; width: 50%;">
						<p style="text-align: center;font-family: GHEA grapalat ;" >_________________</p>
					</td>
				</tr>
				<tr>
					<td style="border: 0; width: 50%;">
						<p style="text-align: center;font-family: GHEA grapalat ;"  class="min-t ft-6"> Մասնակցի անվանումը  (ղեկավարի պաշտոնը, անուն ազգանունը)    </p>
					</td>
					<td style="border: 0; width: 50%;">
						<p  class="min-t ft-6" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center"> ստորագրությունը</p>
					</td>
				</tr>
			</table>
		</div>
		<pagebreak/>
		<div class="info-block">
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">Հավելված 1.1</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> »  ծածկագրով</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> հրավերի</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; margin-top: 1.5rem; text-align: center; font-weight: 700; font-family: GHEA grapalat ;">ՆԿԱՐԱԳԻՐ</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700; font-family: GHEA grapalat ;">առաջարկվող ապրանքի ամբողջական</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; margin-bottom: 1rem; text-align: justify;">« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ն « <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> » ծածկագրով <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> շրջանակում ըստ չափաբաժինների ստորև ներկայացնում է իր կողմից առաջարկվող ապրանքի ամբողջական նկարագիրը</h6>
			<table style=" font-size: 14px; font-family: GHEA grapalat ; 		
								width: 100%;
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
						<th  colspan="6" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">
							Առաջարկվող ապրանքի
						</th>
					</tr>
					<tr>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">
							Չափաբաժնի համար
						</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">
							ֆիրմային անվանումը
						</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">
							ապրանքային նշանը
						</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">
							{{is_with_model ? 'մոդելը' : 'մակնիշը'}}
						</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">
							արտադրողի անվանումը
						</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">
							տեխնիկական բնութագրերը
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, index) in rows" :key="index">
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.viewId }}</span></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.firm_name }}</span></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.trademark }}</span></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.brand }}</span></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.manufacturer }}</span></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.specification }}</span></td>
					</tr>
				</tbody>
			</table>
			<div style="margin-top: 20px;">
				<table style="text-align: center;border: 0; width: 100%">
					<tr>
						<td style="border: 0;width: 50%;">
							<p class="ft-11"  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center">« <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ի տնօրեն՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.director_name.hy }}</span></p>
						</td>
						<td style="border: 0; width: 50%;">
							<p style="text-align: center;font-family: GHEA grapalat ;" >_________________</p>
						</td>
					</tr>
					<tr>
						<td style="border: 0; width: 50%;">
							<p style="text-align: center;font-family: GHEA grapalat ;"  class="min-t ft-6"> Մասնակցի անվանումը  (ղեկավարի պաշտոնը, անուն ազգանունը)    </p>
						</td>
						<td style="border: 0; width: 50%;">
							<p  class="min-t ft-6" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center"> ստորագրությունը</p>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<pagebreak v-if="isWithArmenianResources"/>
		<div v-if="isWithArmenianResources" class="info-block">
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">Հավելված 1.2</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> »  ծածկագրով</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> հրավերի</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700; font-family: GHEA grapalat ;">ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center">հայաստանյան ծագում ունեցող աշխատանքային և (կամ) արտադրական ռեսուրսների օգտագործման մասին</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; margin-top: 3rem">
				« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span> հայտնում է, որ պարտավորվում է <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ organizator }}</span>-ի կողմից 
				« <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ password }}</span> » ծածկագրով հայտարարված <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> <span  v-for="(row, index) in rows" :key="index"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.viewId }}</span><span  v-if="index !== rows.length-1">,</span> </span> 
				չափաբաժնի  (չափաբաժինների) մասով հաղթող ճանաչվելու դեպքում</h6>
			<h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; այդ չափաբաժնի (չափաբաժինների) մասով կնքվելիք պայմանագիրը կատարելու ժամանակ գնային առաջարկով
				ներկայացվող արժեքի ավելի քան 50 տոկոսը՝ հանրագումարային ձևով, ուղղել հայաստանյան ծագում ունեցող աշխատանքային և (կամ) արտադրական ռեսուրսների օգտագործման
				միջոցով պայմանագրի կատարմանը</h6>
			<h6 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; պայմանագիրը կատարել  թվով <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ workersCount }}</span> աշխատակիցների միջոցով։</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; margin-top: 1.5rem">Ստորև ներկայացվում է սույն ընթացակարգի արդյունքում հաղթող ճանաչվելու դեպքում կնքվելիք պայմանագրով մատակարարվող հայաստանյան ծագում ունեցող ապրանքների ցանկը՝ անվանումների, գումարների և քանակների նշումով՝ </h6>
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
						<th  colspan="3" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">
							Չափաբաժնի N` <span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ row.viewId }}</span>
						</th>
					</tr>
					<tr>
						<th  colspan="3" style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">
							Օգտագործվելիք նյութերի
						</th>
					</tr>
					<tr>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">Անվանում</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">Քանակ</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
												border-collapse: collapse;
												font-size: 12px;
												padding: 8px 18px;
					">Գումար/դրամ</th>
					</tr>
					<tbody v-for="(material, materialIndex) in row.usedMaterials" :key="materialIndex">
						<tr>
							<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
								border-collapse: collapse;
								text-align: center;
								padding: 7px 7px;
								font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ material.name }}</span></td>
							<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
								border-collapse: collapse;
								text-align: center;
								padding: 7px 7px;
								font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ material.count }}</span></td>
							<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
								border-collapse: collapse;
								text-align: center;
								padding: 7px 7px;
								font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ material.value }}</span></td>
						</tr>
					</tbody>
				</thead>
			</table>
			<div style="margin-top: 20px;">
				<table style="text-align: center;border: 0; width: 100%">
					<tr>
						<td style="border: 0;width: 50%;">
							<p class="ft-11"  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center">« <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ի տնօրեն՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.director_name.hy }}</span></p>
						</td>
						<td style="border: 0; width: 50%;">
							<p style="text-align: center;font-family: GHEA grapalat ;" >_________________</p>
						</td>
					</tr>
					<tr>
						<td style="border: 0; width: 50%;">
							<p style="text-align: center;font-family: GHEA grapalat ;"  class="min-t ft-6"> Մասնակցի անվանումը  (ղեկավարի պաշտոնը, անուն ազգանունը)    </p>
						</td>
						<td style="border: 0; width: 50%;">
							<p  class="min-t ft-6" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center"> ստորագրությունը</p>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<pagebreak/>
		<div class="info-block">
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">Հավելված 2</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;">« <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ password }}</span> » ծածկագրով</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right; font-weight: 700; font-family: GHEA grapalat ;"><span  style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{getTenderTypeByPlan}}</span> հրավերի</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700; font-family: GHEA grapalat ;">ԳՆԱՅԻՆ ԱՌԱՋԱՐԿ</h6>
			<h6  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: justify; margin-top: 1.5rem">Ուսումնասիրելով « <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ password }}</span> » ծածկագրով <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{getTenderTypeByPlan}}</span> հրավերը, այդ թվում կնքվելիք  պայմանագրի նախագիծը, 
				« <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ participantInfo.name.hy }}</span> » <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ participantInfo.company_type.hy }}</span> -ն առաջարկում է պայմանագիրը կատարել ներքոհիշյալ ընդհանուր գներով.
			</h6>
			<h6  style="margin-bottom:0; font-size: 12px; font-family: GHEA grapalat ; text-align: right;">ՀՀ դրամ</h6>
			<table style=" font-size: 14px; font-family: GHEA grapalat ; 		width: 100%;
								table-layout: fixed;
								page-break-inside: avoid;
								border: 1px solid  black;
								border-collapse: collapse;
								margin: 20px auto;
								padding-bottom: 50px;
								text-align: center;
								margin-bottom: .5rem; 
								margin-top: .5rem 
				">
				<thead>
					<tr>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">Չափաբաժինների համարները</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">Ապրանքի անվանումը</th>
						<template v-if="is_old">
							<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">Ինքնարժեք</th>
							<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">Շահույթ</th>
						</template>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						" v-else>Արժեք <br/> (ինքնարժեքի և կանխատեսվող շահույթի հանրագումարը) /տառերով և թվերով/</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">ԱԱՀ <br/> /տառերով և թվերով/</th>
						<th  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
													border-collapse: collapse;
													font-size: 12px;
													padding: 8px 18px;
						">Ընդհանուր գինը <br/> /տառերով և թվերով/</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, index) in rows" :key="index">
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"
						>
						<span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ row.viewId }}</span></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ row.name }}</span></td>
						<template v-if="is_old">
							<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ row.cost }}</span> / <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ fixIncorrectWords(row.costWord) }}</span> /</td>
							<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ row.profit }}</span> / <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ fixIncorrectWords(row.profitWord) }}</span> /</td>
						</template>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;" v-else><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ row.value }}</span> / <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ fixIncorrectWords(row.valueWord) }}</span> /</td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><template v-if="row.vat"><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ row.vat }}</span> / <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ fixIncorrectWords(row.vatWord) }}</span> /</template></td>
						<td  style=" font-size: 14px; font-family: GHEA grapalat ;  border: 1px solid  black;
									border-collapse: collapse;
									text-align: center;
									padding: 7px 7px;
									font-size: 14px;"><span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ row.overall }}</span> / <span  style=" font-size: 14px; font-family: GHEA grapalat ;" class="color">{{ fixIncorrectWords(row.overallWord) }}</span> /</td>
					</tr>			
				</tbody>
			</table>
			<div style="margin-top: 20px;">
				<table style="text-align: center;border: 0; width: 100%">
					<tr>
						<td style="border: 0;width: 50%;">
							<p class="ft-11"  style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center">« <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.name.hy }}</span> » <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.company_type.hy }}</span>-ի տնօրեն՝ <span style=" font-size: 14px; font-family: GHEA grapalat ; " class="color">{{ participantInfo.director_name.hy }}</span></p>
						</td>
						<td style="border: 0; width: 50%;">
							<p style="text-align: center;font-family: GHEA grapalat ;" >_________________</p>
						</td>
					</tr>
					<tr>
						<td style="border: 0; width: 50%;">
							<p style="text-align: center;font-family: GHEA grapalat ;"  class="min-t ft-6"> Մասնակցի անվանումը  (ղեկավարի պաշտոնը, անուն ազգանունը)    </p>
						</td>
						<td style="border: 0; width: 50%;">
							<p  class="min-t ft-6" style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center"> ստորագրությունը</p>
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
		this.tenderData = this.tender.tender
		this.is_with_model = this.tenderData.is_with_model
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
	.color{
		color: rgb(17, 85, 204) !important;
	}
</style>