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
        v-if="isLoaded">
    <div>
           <table style="text-align: center; font-size: 14px; font-family: GHEA grapalat ; width: 100% ">
                <tbody>
                    <tr>
                        <td style="width: 40%; text-align: left;">
                            <p style=" font-size: 14px; font-family: GHEA grapalat ; text-align: left" class="ft-11">N-------------</p>
                        </td>    
                        <td style="width: 60%; text-align: right;">
                            <p style=" font-size: 14px; font-family: GHEA grapalat ; text-align: right" class="ft-11">{{ tenderData.organizator }}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h6 style=" font-size: 14px; font-family: GHEA grapalat ; text-align: center; font-weight: 700; margin-top: 40px; margin-bottom: 15px">ԳՐՈՒԹՅՈՒՆ</h6>
            <p style=" font-size: 14px; font-family: GHEA grapalat; text-align: justify;">
                Ձեզ եմ ներկայացնում « {{ tenderData.password }} » ծածկագրով գնման ընթացակարգի արդյունքում կնքվելիք պայմանագրի՝ տուժանքների ձևով ներկայացվող որակավորման և պայմանագրի ապահովումները և մեր կողմից հաստատված պայմանագրերի օրինակները։
            </p>
            <p style=" font-size: 14px; font-family: GHEA grapalat ; margin-bottom: 10px; margin-top: 30px;">Առդիր՝ էջ։</p>
            <p style=" font-size: 14px; font-family: GHEA grapalat ">Հարգանքով՝</p>
            <div style="text-align: center; font-size: 14px; font-family: GHEA grapalat ; margin-top: 30px;">
                <p class="ft-11" style="text-align: center; font-size: 14px; font-family: GHEA grapalat ; margin-bottom: 10px">« {{participantInfo.name.hy}} » {{participantInfo.company_type.hy}} -ի տնօրեն՝ {{participantInfo.director_name.hy}}	_______________</p>
                <p class="ft-6" style="text-align: center; font-size: 12px; font-family: GHEA grapalat ">Մասնակցի անվանումը (ղեկավարի պաշտոնը, անուն ազգանունը)	ստորագրություն</p>
            </div>
    </div>  
    </div>      
</template>

<script>
import purchaseTypes from '@/mixins/purchaseTypes'

export default {
    name: 'application_announcement_writing',
    mixins: [purchaseTypes],
    components: {},
    props: ['handleLoaded', 'tender'],
    data() {
        return {
            participantInfo: {},
            participantsSequence: [],
            rows: [],
            beneficiaries: [],
            totalMembers: 0,
            isWithArmenianResources: false,
			isLoaded: false,
        }
    },
    async mounted() {
		this.participantMainInfo = this.me.organisation[0]
		this.participantInfo = this.me.organisation[0].translations
		this.isWithArmenianResources = this.tender.isWithArmenianResources
		this.rows = this.tender.selectedRows
		this.beneficiaries = this.tender.realBeneficiaries
		this.workersCount = this.tender.workersCount
		this.tenderData = this.tender.tender
        
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
        getTenderTypeByPlan(){
			return this.purchaseTypesLongNamesCased.hy[this.tenderData.procedure.id];
        },
    },
}
</script>
<style>
    p{
        margin-bottom: 0;
    }
</style>
<style scoped>
    *{
        font-family: GHEA grapalat  !important;
    }
</style>
