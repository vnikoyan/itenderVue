<template>
  <div>
      <div v-if="currentOrganized.translations !== undefined" style="text-align: center;font-weight: bold;">« {{ currentOrganized.translations.code.hy }} » ԾԱԾԿԱԳՐՈՎ ԸՆԹԱՑԱԿԱՐԳԻ ՄԱՍՆԱԿԻՑՆԵՐԻ ՀԱՅՏԵՐԻ ԳՆԱՀԱՏՄԱՆ ԹԵՐԹԻԿ</div>
      <div style="text-align: center; font-weight: bold;">(Հայտերի բացման նիստ)</div>
      <br>
      <table style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
        <tr>
            <th style="border: 1px solid black;
                       border-collapse: collapse;" rowspan="3">Հ/Հ</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;" rowspan="3" >Մասնակցի անվանում</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;" rowspan="3" >Չափաբաժնի համար</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;" colspan="3" >Մասնակցի հայտի գնահատման չափանիշները <br> Գնահատական
            </th>
        </tr>
        <tr>
            <th style="border: 1px solid black;
                       border-collapse: collapse;"> Հայտեր պարունակող ծրարները կազմելու և ներկայացնելու համապատասխանությունը սահմանված կարգին</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;"> Բացված յուրաքանչյուր ծրարում պահանջվող (նախատեսված) փաստաթղթերի առկայությունը և դրանց կազմման
                համապատասխանությունը հրավերով սահմանված վավերապայմաններին
            </th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;" >ԸՆԴՀԱՆՈՒՐ ԳՆԱՀԱՏԱԿԱՆ</th>
        </tr>
        <tr >
            <th style="border: 1px solid black;
                       border-collapse: collapse;" >Բավարար <br> Անբավարար</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;" >Բավարար <br> Անբավարար</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;" >Բավարար <br> Անբավարար</th>
        </tr>
        <tbody>
          <template v-for="(participantItem, participantIndex) in participants">
            <template v-if="participantItem.lots.length > 0">
              <tr :key="participantIndex.toString() + participantIndex + Math.random()">
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">{{participantIndex+1}}</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;"> {{participantItem.participant[0].name.hy}}</td>
                  <template v-if="Boolean(participantItem.lots.find(item=>item.is_satisfactory!==0))">
                    <td style="border: 1px solid black;
                              border-collapse: collapse;">
                      <span
                        :key="participantIndex.toString() + lotIndex"
                        v-for="(lot, lotIndex) in participantItem.lots.filter(item=>item.is_satisfactory)">
                          {{organizedRows.find(item=>item.id===lot.organize_row_id).view_id}}<span v-if="lotIndex!==participantItem.lots.filter(item=>item.is_satisfactory).length-1">,</span>
                        </span>
                    </td>
                    <td style="border: 1px solid black;
                              border-collapse: collapse;">Բավարար</td>
                    <td style="border: 1px solid black;
                              border-collapse: collapse;">Բավարար</td>
                    <td style="border: 1px solid black;
                              border-collapse: collapse;">Բավարար</td>
                  </template>
                  <template v-else>
                    <td style="border: 1px solid black;
                                border-collapse: collapse;">
                      <span
                        :key="participantIndex.toString() + lotIndex"
                        v-for="(lot, lotIndex) in participantItem.lots.filter(item=>!item.is_satisfactory)">
                          {{organizedRows.find(item=>item.id===lot.organize_row_id).view_id}}<span v-if="lotIndex!==participantItem.lots.filter(item=>!item.is_satisfactory).length-1">,</span>
                        </span>
                    </td>
                    <td style="border: 1px solid black;
                              border-collapse: collapse;">Բավարար</td>
                    <td style="border: 1px solid black;
                              border-collapse: collapse;">Անբավարար</td>
                    <td style="border: 1px solid black;
                              border-collapse: collapse;">Անբավարար</td>
                  </template>
              </tr>
            </template>
            <template v-else>
              <tr :key="participantIndex.toString()" v-if="participantItem.participant[0]">
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">{{participantIndex+1}}</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">{{participantItem.participant[0].name.hy}}</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">-</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;" v-if="participantItem.participant[0].is_docs_satisfactory">Բավարար</td> 
                  <td style="border: 1px solid black;
                            border-collapse: collapse;" v-else>Անբավարար</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;" v-if="participantItem.participant[0].price_offer_exists">Բավարար</td> 
                  <td style="border: 1px solid black;
                            border-collapse: collapse;" v-else>Անբավարար</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">Անբավարար</td>
              </tr>
              <tr :key="participantIndex.toString()" v-else>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">{{participantIndex+1}}</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">-</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">-</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">Անբավարար</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">Անբավարար</td>
                  <td style="border: 1px solid black;
                            border-collapse: collapse;">Անբավարար</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
      <br>
      <div>____________________________________________</div>
  </div>
</template>

<script>
  export default {
    name: 'EvaluationSheet',
    components: {  },
    props: ['handleLoaded'],
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      organizedRows() {
        return this.$store.getters['organize/organizedRows']
      }
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


