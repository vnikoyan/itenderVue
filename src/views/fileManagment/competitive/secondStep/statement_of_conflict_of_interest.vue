<template>
  <vue-html2pdf
    :show-layout="false"
    :float-layout="false"
    :enable-download="true"
    pdf-content-width="auto"
    :paginate-elements-by-height="1400"
    :html-to-pdf-options="{
      margin: 12,
      filename: 'Հայտարարություն_շահերի_բախման_մասին.pdf',
      html2canvas: {
        scrollX: 0,
        scrollY: 0
      }
    }"
    ref="html2Pdf">
    <section slot="pdf-content" contenteditable="true" style="font-size: 14px;">
      <div style="text-align: center; font-weight: 700;" >ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ</div>
      <div style="font-weight: 700; text-align: justify;" >« Գնումների մասին » ՀՀ օրենքի 33-րդ հոդվածի 6-րդ մասով նախատեսված շահերի բախման բացակայության մասին</div>
      <br>
      <table style=" width: 100%; border: 0 !important;" >
        <tr>
          <td style="border: 0 !important;text-align:left;" class="text-left"><p style="font-size: 11pt;text-align:left;" class="ft-11">{{ me.organisation[0].translations.address.hy }}</p></td>
          <td style="border: 0 !important;text-align:right;" class="text-right"><p style="font-size: 11pt;text-align:right;" class="ft-11">{{ currentOrganized.opening_date }}թ.</p></td>
        </tr>
      </table>
      <br>
      <div style=" text-align: justify;" >
        «{{me.organisation[0].translations.name.hy}}» 
        <span  style="" v-if="me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' ||
        me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' ||
        me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ՍՊԸ' ||
        me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' ||  me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{me.organisation[0].translations.company_type.hy}}-ի</span> 
       <span  style="" v-else>{{me.organisation[0].translations.company_type.hy}}ի</span> կարիքների համար {{ !_.isEmpty(currentOrganized) && currentOrganized.translations.name.hy }} ձեռքբերման գնման գնահատող 
        հանձնաժողովի նախագահ` {{ currentOrganized.translations.evaluator_president.name.hy }}, 
        անդամներ ` <span  style="" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.hy }}, </span> 
        քարտուղար՝ {{ currentOrganized.evaluator_secretary_name }} հայտարարում ենք, 
        որ « Գնումների մասին » ՀՀ օրենքի 33-րդ հոդվածի 6-րդ մասով սահմանված` մեր կողմից հիմնադրված կամ բաժնեմաս (փայաբաժին) ունեցող կազմակերպությունը, 
        կամ մեզ մերձավոր ազգակցությամբ կամ խնամիությամբ կապված անձը (ծնող, ամուսին, երեխա, եղբայր, քույր, ինչպես նաև ամուսնու ծնող, երեխա, եղբայր կամ քույր) 
        կամ այդ անձի կողմից հիմնադրված կամ բաժնեմաս (փայաբաժին) ունեցող կազմակերպությունը չի հանդիսանում {{ currentOrganized.translations.code.hy }} ծածկագրով ընթացակարգի 
        գնման գործընթացի մասնակից:
      </div>
      <br>
      <table style="border: 0 !important; width: 100%;">
        <tr>
          <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Հանձնաժողովի նախագահ`</td>
          <td style="border: 0 !important;text-align: left !important; font-size: 11pt;" class="ft-11">
            {{ currentOrganized.translations.evaluator_president.name.hy }}` {{ currentOrganized.translations.evaluator_president.position.hy }}
          </td>
        </tr>
        <tr>
          <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Հանձնաժողովի անդամներ`
            <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
          </td>
          <td style="border: 0 !important; text-align: left !important;">
            <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.hy }}` {{ member.position.hy }}</div>
          </td>
        </tr>
        <tr>
          <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի քարտուղար`</td>
          <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
            {{ currentOrganized.evaluator_secretary_name  }}` {{ currentOrganized.translations.evaluator_secretary_position.hy }}
          </td>
        </tr>
      </table> 
    </section>
  </vue-html2pdf>
</template>

<script>
  import VueHtml2pdf from 'vue-html2pdf'

  export default {
    name: 'statement_of_conflict_of_interest',
    components: { VueHtml2pdf },
    props: ['handleLoaded'],
    data() {
      return {
        participants: [],
        day: null,
        month: null,
        year: null,
        anonymInput1: null,
        newProps: false,
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      currentDate() {
        const today = new Date()
        return `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`
      },
      me() {
        return this.$store.getters['user/me']
      },
    },
    watch: {
      currentOrganized: {
        immediate: true,
        async handler() {
          await this.$client.get(`participant-group/getByOrganize/${this.$route.params.id}`).then(response => {
            const participantsData = response.data;
            this.participants = participantsData
          })
          this.handleLoaded();
        },
      },
    },
    methods: {
      consoleLog(data){
        console.log(data)
      },
      download() {
          this.$refs.html2Pdf.generatePdf()
          this.newProps = false
      },
      async handleBeforeDownload() {
        this.newProps = true
        await this.handleLoaded()
        return this.$refs.html2Pdf.$el.innerHTML
      },
    }
  }
</script>
