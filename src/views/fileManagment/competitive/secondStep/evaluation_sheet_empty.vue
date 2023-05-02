<template>
  <div ref="content">
    <div v-if="currentOrganized.translations !== undefined" style="text-align: center; font-weight: bold;">« {{ currentOrganized.translations.code.hy }} » ԾԱԾԿԱԳՐՈՎ ԸՆԹԱՑԱԿԱՐԳԻ ՄԱՍՆԱԿԻՑՆԵՐԻ ՀԱՅՏԵՐԻ ԳՆԱՀԱՏՄԱՆ ԹԵՐԹԻԿ</div>
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
                       border-collapse: collapse;" colspan="3" >Մասնակցի հայտի գնահատման չափանիշները <br>Գնահատական</th>
        </tr>
        <tr>
            <th style="border: 1px solid black;
                       border-collapse: collapse;">Հայտեր պարունակող ծրարները կազմելու և ներկայացնելու համապատասխանությունը սահմանված կարգին</th>
            <th  style="border: 1px solid black;
                       border-collapse: collapse;">Բացված յուրաքանչյուր ծրարում պահանջվող (նախատեսված) փաստաթղթերի առկայությունը և դրանց կազմման համապատասխանությունը հրավերով սահմանված վավերապայմաններին</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;">ԸՆԴՀԱՆՈՒՐ ԳՆԱՀԱՏԱԿԱՆ</th>
        </tr>
        <tr >
            <th style="border: 1px solid black;
                       border-collapse: collapse;">Բավարար <br> Անբավարար</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;">Բավարար <br> Անբավարար</th>
            <th style="border: 1px solid black;
                       border-collapse: collapse;">Բավարար <br> Անբավարար</th>
        </tr>
        <template v-for="(participantItem, participantIndex) in participants">
          <template v-if="participantItem.lots.length>0">
            <tr v-for="(lot, lotIndex) in participantItem.lots" :key="participantIndex.toString() + lotIndex">
              <td style="border: 1px solid black;
                         border-collapse: collapse;" v-if="lotIndex == 0" :rowspan="participantItem.lots.length">{{participantIndex+1}}</td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;" v-if="lotIndex == 0" :rowspan="participantItem.lots.length">{{participantItem.participant[0].name.hy}}</td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;">{{lotIndex+1}}</td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;"></td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;"></td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;"></td>
            </tr>
          </template>
          <template v-else>
            <tr :key="participantIndex.toString()">
              <td style="border: 1px solid black;
                         border-collapse: collapse;">{{participantIndex+1}}</td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;">{{participantItem.participant[0].name.hy}}</td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;">-</td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;"></td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;"></td>
              <td style="border: 1px solid black;
                         border-collapse: collapse;"></td>
            </tr>
            </template>
        </template>
    </table>
    <br>
    <div>____________________________________________</div>
  </div>
</template>

<script>
  export default {
    name: 'EvaluationSheetEmpty',
    components: { },
    props: ['handleLoaded'],
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
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
      generatePdf () {
        this.$refs.html2Pdf.generatePdf()
      },
      getModalInitialState() {
        return {
          newProps: false,
          participants: [{"organize_id":62,"group_id":1613649542697,"isCooperation":false,"isAgencyAgreement":false,"participant":[{"id":1613649542696,"address":{"hy":"4jkbbez8ld","ru":"4v1yzeyqd4"},"id_card_number":"","firstName":{"hy":"","ru":""},"lastName":{"hy":"","ru":""},"middleName":{"hy":"","ru":""},"tin":"1233649555750","name":{"hy":"ikq54q8iy4","ru":"igpvhmaxgm"},"email":"t6ugetp@0sxdg.com","phone":23213246545,"date_of_submission":"2021-03-05","is_docs_satisfactory":1,"price_offer_exists":1,"isInBlackList":false,"real_beneficiaries":[{"firstName":"7pfi4j3jol","lastName":"2br31ug7pz","middleName":"2f2bia7pjj","identification_type":"passport","passport_serial_number":"hbdcalebvk","passport_number":23213246545,"identification_number":23213246545,"is_resident":0}],"isMain":true,"query":"123"}],"lots":[{"id":164,"count":20,"supply":null,"supply_date":null,"shipping_address":"","is_main_tool":null,"is_collateral_requirement":null,"is_product_info":null,"procurementPlan":null,"organizeRowPercent":null,"details_id":80,"plan_row_id":302,"cpv_id":224,"cpv_name":"կարտոֆիլ","cpv_code":15311100,"total_price":31231,"is_with_vat":1,"vat":6246.2,"overall":37477.2,"is_satisfactory":1},{"id":165,"count":1,"supply":null,"supply_date":null,"shipping_address":"","is_main_tool":null,"is_collateral_requirement":null,"is_product_info":null,"procurementPlan":null,"organizeRowPercent":null,"details_id":96,"plan_row_id":318,"cpv_id":512,"cpv_name":"գութաններ","cpv_code":16111100,"total_price":3131,"is_with_vat":1,"vat":626.2,"overall":3757.2,"is_satisfactory":1}]},{"organize_id":62,"group_id":1613649603432,"isCooperation":false,"isAgencyAgreement":false,"participant":[{"id":1613649603432,"address":{"hy":"ordoqp99rk","ru":"gnhd7yyxpn"},"id_card_number":"","firstName":{"hy":"","ru":""},"lastName":{"hy":"","ru":""},"middleName":{"hy":"","ru":""},"tin":"3213649606266","name":{"hy":"66uaanh9u9","ru":"g1gba6zm6u"},"email":"s6zc8l2@u8blb.com","phone":23213246545,"date_of_submission":"2021-02-17","is_docs_satisfactory":1,"price_offer_exists":1,"isInBlackList":false,"real_beneficiaries":[{"firstName":"qjtka0068m","lastName":"stpdkmokqu","middleName":"6cgwmspgo7","identification_type":"passport","passport_serial_number":"crf63fz6t3","passport_number":23213246545,"identification_number":23213246545,"is_resident":1}],"isMain":true,"query":"3213"}],"lots":[{"id":165,"count":1,"supply":null,"supply_date":null,"shipping_address":"","is_main_tool":null,"is_collateral_requirement":null,"is_product_info":null,"procurementPlan":null,"organizeRowPercent":null,"details_id":96,"plan_row_id":318,"cpv_id":512,"cpv_name":"գութաններ","cpv_code":16111100,"total_price":1113,"is_with_vat":1,"vat":222.6,"overall":1335.6,"is_satisfactory":1},{"id":166,"count":1,"supply":null,"supply_date":null,"shipping_address":"","is_main_tool":null,"is_collateral_requirement":null,"is_product_info":null,"procurementPlan":null,"organizeRowPercent":null,"details_id":85,"plan_row_id":307,"cpv_id":802,"cpv_name":"թավշակաշի","cpv_code":19111100,"total_price":13131,"is_with_vat":1,"vat":2626.2,"overall":15757.2,"is_satisfactory":1}]},{"organize_id":62,"group_id":1613649643432,"isCooperation":false,"isAgencyAgreement":false,"participant":[{"id":1613649643432,"address":{"hy":"rgot44muq7","ru":"lf5dkwrx6k"},"id_card_number":"","firstName":{"hy":"","ru":""},"lastName":{"hy":"","ru":""},"middleName":{"hy":"","ru":""},"tin":"1413649648233","name":{"hy":"udysk0pds6","ru":"ic57mmu7ue"},"email":"pkugevu@qtwzt.com","phone":23213246545,"date_of_submission":"2021-02-19","is_docs_satisfactory":1,"price_offer_exists":1,"isInBlackList":false,"real_beneficiaries":[{"firstName":"zk1mveoyrp","lastName":"z7u3z5nwuu","middleName":"id6s6ir0xo","identification_type":"passport","passport_serial_number":"la0joypnjw","passport_number":23213246545,"identification_number":23213246545,"is_resident":0}],"isMain":true,"query":"141"}],"lots":[{"id":166,"count":1,"supply":null,"supply_date":null,"shipping_address":"","is_main_tool":null,"is_collateral_requirement":null,"is_product_info":null,"procurementPlan":null,"organizeRowPercent":null,"details_id":85,"plan_row_id":307,"cpv_id":802,"cpv_name":"թավշակաշի","cpv_code":19111100,"total_price":1000,"is_with_vat":1,"vat":200,"overall":1200,"is_satisfactory":1},{"id":165,"count":1,"supply":null,"supply_date":null,"shipping_address":"","is_main_tool":null,"is_collateral_requirement":null,"is_product_info":null,"procurementPlan":null,"organizeRowPercent":null,"details_id":96,"plan_row_id":318,"cpv_id":512,"cpv_name":"գութաններ","cpv_code":16111100,"total_price":23421,"is_with_vat":1,"vat":4684.2,"overall":28105.2,"is_satisfactory":1}]}],
          isFormView: true,
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
