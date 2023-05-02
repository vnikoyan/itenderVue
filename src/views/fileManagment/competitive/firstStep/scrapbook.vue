<template>
    <div>
      <div style="margin-left: 25px; margin-top: 30px;">    
        <div>«Հաստատված է»</div>
        <div>«<span style="color: rgb(237, 15, 15);">27</span>» 
             «<span style="color: rgb(237, 15, 15);">օգոստոսի</span>»  <span style="color: rgb(237, 15, 15);">2023</span> թվականին</div>
        <div>Ընդամենը`  2  էջ</div>
        <div>Կ.Տ. </div>     
    </div>
    <div style="margin-top: 50px;">
        <div style="text-align: center; font-weight: 700"> Գ Ր Ա Ն Ց Ա Մ Ա Տ Յ Ա Ն </div>
        <div style="text-align: center; font-weight: 700">
          {{ currentOrganized.translations.name.hy }}
          ընթացակարգի հայտերի 
        </div>
    </div>
    <div style="margin-top: 50px; margin-left: 25px;">
        <div>Պատվիրատուի անվանումը`  
            «{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}</div>
        <div>Գնման ընթացակարգի ծածկագիրը`
            {{ currentOrganized.translations.code.hy }}</div>
        <div>Գնահատող հանձնաժողովի քարտուղար`
            {{ currentOrganized.translations.evaluator_secretary_name.hy }}</div>
        <div style="text-align: right; margin-right: 20px;"> _______________________ </div>
        <div style="display: block; text-align: right; margin-right: 30px;"> (ստորագրություն) </div>
    </div>
    <div style="text-align: center; margin-top: 50px; font-weight: 700">Ներկայացված  հայտեր</div>
    <div style="margin-top: 50px;">
        <table 
          style="font-size: 10px;
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          page-break-inside: avoid;
          border: 1px solid black;
          text-align: center;" cellspacing="5" cellpadding="5"
        >
            <tr>
                <td 
                  rowspan="2" 
                  style="border: 1px solid black;
                  border-collapse: collapse;
                  text-align: center;"
                >
                  հ/հ
                </td>
                <td 
                  rowspan="2"
                  style="border: 1px solid black;
                  border-collapse: collapse;
                  text-align: center;"
                >
                  հայտ ներկայացրած մասնակցի անվանումը (անունը, ազգանունը)
                </td>
                <td 
                  rowspan="2" 
                  style="border: 1px solid black;
                  border-collapse: collapse;
                  text-align: center;"
                >
                  Մասնակցի այն գրության ելից և պատվիրատուի նույն գրության մտից համարները,որով ներկայացվել է հայտը
                  (Հայտը առձեռն ներկայացված լինելու դեպքում այն ներկայացնողի անունը, ազգանունը, անձը հաստատող փաստաթղթի անվանումը 
                  և համարը)
                </td>
                <td 
                  colspan="2"
                  style="border: 1px solid black;
                  border-collapse: collapse;
                  text-align: center;"
                >
                  Հայտերի ստացման
                </td>
                <td 
                  rowspan="2" 
                  style="border: 1px solid black;
                  border-collapse: collapse;
                  text-align: center;"
                >
                  Հայտը գրանցողի ստորագրու-թյունը
                </td>
                <td 
                  rowspan="2" 
                  style="border: 1px solid black;
                  border-collapse: collapse;
                  text-align: center;"
                >
                  Նշագրություն
                </td>
            </tr>
            <tr>
              <td
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                ամիսը, ամսաթիվը
              </td>
              <td
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                ժամը
              </td>
            </tr>
            <tr>
              <th
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                1
              </th>
              <th
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                2
              </th>
              <th
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                3
              </th>
              <th
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                4
              </th>
              <th
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                5
              </th>
              <th
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                6
              </th>
              <th
                style="border: 1px solid black;
                border-collapse: collapse;
                text-align: center;"
              >
                7
              </th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
            <tr>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
              <th style="border: 1px solid black; border-collapse: collapse; text-align: center;"></th>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Scrapbook',
    components: {  },
    props: ['handleLoaded'],
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      organizedRows() {
        return this.$store.getters['organize/organizedRows']
      },
      me() {
        return this.$store.getters['user/me']
      },
    },
    data() {
      return this.getModalInitialState()
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
        }
      },
    },
    methods: {
      consoleLog(key, data){
        console.log(key, data)
      },
      generatePdf () {
        this.$refs.html2Pdf.generatePdf()
      },
      getModalInitialState() {
        return {
          newProps: false,
          participants: [],
          isFormView: true,
          currentParticipantGroup: '',
          evaluatorCommittee: {
            evaluator_president: {
              hy: '',
              ru: ''
            },
            evaluator_secretary_name: {
              hy: '',
              ru: ''
            },
            evaluator_secretary_email: '',
            evaluator_secretary_phone: '',
            evaluator_member: [{
              hy: '',
              ru: ''
            }]
          },
        }
      },
      resetComponent() {
        Object.assign(this.$data, this.getModalInitialState())
      },
      download() {
          this.$refs.content.generatePdf()
          this.newProps = false
      },
      async handleBeforeDownload() {
        this.newProps = true
        await this.handleLoaded()
        return this.$refs.content.$el.innerHTML
      },
    },
  }
</script>
<style scoped>
    *{
        font-family: GHEA grapalat  !important;
    }
</style>


