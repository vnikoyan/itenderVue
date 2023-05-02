<template>
    <section slot="pdf-content" ref="content" contenteditable="true">
        <table style="width: 100%; border: 0 !important;">
            <tr>
                <td class="text-left" style="width: 50%; border: 0; text-align: left">
                    <span class="ft-11" style="text-align: left; font-size: 11pt;">{{ currentDate() }}թ.</span>
                </td>
                <td class="text-right" style="width: 50%; border: 0; text-align: right">
                    <span class="ft-11" style="text-align: right; font-size: 11pt;">{{ !_.isEmpty(currentParticipantGroup) && currentParticipantGroup.participant[0].name.hy }}</span>
                </td>
            </tr>
        </table>
        <div style="text-align: center; font-weight: 600;margin-bottom: -25px;font-size: 14px;">ՊԱՅՄԱՆԱԳԻՐ ԿՆՔԵԼՈՒ ԱՌԱՋԱՐԿ</div>
        <br>
        <div style="text-align: justify;font-size: 14px;">
            Սույնով հայտնում եմ, որ {{ currentOrganized.code }} ծածկագրով գնման ընթացակարգի 
            <span v-for="(view, viewIndex) in currentParticipantGroup.won_lots" :key="viewIndex">{{view.view_id}}<span v-if="viewIndex+1 != currentParticipantGroup.won_lots.length">{{ currentParticipantGroup.won_lots.length > 1 ? ',' : '' }}</span>
            </span> 
            {{ currentParticipantGroup.won_lots.length > 1 ? 'չափաբաժինների' : 'չափաբաժնի' }}
            մասով ընտրված մասնակից է ճանաչվել
            {{ currentParticipantGroup.participant[0].name.hy }}-ն:
        </div>
        <div style="text-align: justify;margin-bottom: -25px;font-size: 14px;">
            Հաշվի առնելով վերոգրյալը՝ խնդրում եմ ուղեկցող գրությամբ Ձեր կողմից հաստատված պայմանագրի 2 օրինակները գնումների մասին ՀՀ օրենսդրությամբ սահմանված կարգով և ժամկետներում ներկայացնել պատվիրատուին՝  
            <span v-if="me.organisation[0].translations.city.hy === me.organisation[0].translations.region.hy">{{ me.organisation[0].translations.city.hy }}</span>
            <span v-else>{{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.region.hy }}</span>
            {{ me.organisation[0].translations.address.hy }} հասցեով:
        </div>
        <br>
        <div style="font-weight: 600; text-align: center;margin-bottom: -25px;font-size: 14px;">Ծանուցում</div>
        <br>
        <div style="text-align: justify;font-size: 14px;">
           Եթե ընտրված մասնակիցը պայմանագիր կնքելու մասին ծանուցումը և պայմանագրի նախագիծն ստանալուց հետո՝ 10 աշխատանքային օրվա ընթացքում, չի ստորագրում պայմանագիրը և ներկայացնում պատվիրատուին, ապա նա զրկվում է պայմանագիրն ստորագրելու իրավունքից, ընդ որում՝ մինչև նախատեսված ժամկետի ավարտը կողմերի համաձայնությամբ կարող են պայմանագրի նախագծում կատարվել փոփոխություններ, սակայն դրանք չեն կարող հանգեցնել գնման առարկայի բնութագրերի փոփոխմանը, ներառյալ՝ ընտրված մասնակցի առաջարկած գնի ավելացմանը:
        </div>
        <br>
        <div style="font-weight: 600;font-size: 14px;">Հարգանքով`</div>
        <div style="font-weight: 600;font-size: 14px;">
            Գնումների համակարգող` {{me.name}}
        </div>
    </section>
</template>

<script>

export default {
    name: 'contract_offer',
    components: {  },
    props: ['participantGroup', 'handleLoaded'],
    data() {
        return {
            currentParticipantGroup: this.participantGroup,
            participants: [],
        }
    },
    computed: {
        currentOrganized() {
            return this.$store.getters['organize/currentOrganized']
        },
        me() {
            return this.$store.getters['user/me']
        },
    },
    watch: {
        currentOrganized: {
            immediate: true,
            async handler() {
                    this.handleLoaded()
            },
        },
    },
    methods: {
        currentDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            return mm + '.' + dd + '.' + yyyy;;
        },
        download() {
            this.$refs.html2Pdf.generatePdf()
        },
        consoleLog(msg) {
            console.log(msg)
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
        font-family: GHEA grapalat  !important;  
    }
</style>
