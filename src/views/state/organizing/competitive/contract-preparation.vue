<template>
  <div class="card">
    <div class="card-body">
      <div class="responsive-table">
        <table class="contract-preparation-table table table-borderless VueTables__table table table-striped table-border-radius m-0" style="border-collapse: collapse; border-spacing: 0; width: 100% !important;;">
          <thead>
            <tr>
              <th style="width: 20px;">Հ/Հ</th>
              <th>Մասնակցի անվանում</th>
              <th>Մասնակցի հեռախոսահամար</th>
              <th>Մասնակցի Էլ. հասցե</th>
              <th>Գնման առարկաներ</th>
              <th>Մասնակցի վավերապայմաներ</th>
              <th>Պայմանագրի գումար</th>
              <th>Փաստաթղթեր</th>
            </tr>
          </thead>
          <tbody id="comparison-table" style="min-height: 5vh; max-height: 40vh!important; overflow: scroll">
            <tr :key="participantIndex" v-for="(participantGroup, participantIndex) in participantGroups">
              <td>{{ participantIndex+1 }}</td>
              <td>{{ participantGroup.participant[0].name.hy }}</td>
              <td>{{ participantGroup.participant[0].phone }}</td>
              <td>{{ participantGroup.participant[0].email }}</td>
              <td>
                <span
                  :key="lot.toString() + lotIndex"
                  v-for="(lot, lotIndex) in participantGroup.won_lots">
                    {{ lot.is_from_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name }}<span v-if="lotIndex!==participantGroup.won_lots.length-1">,</span>
                </span>
                <br>
                <button
                  v-if="+currentOrganized.cpv_type === 1"
                  @click.prevent="() => {
                    $modal.show('winner-lots-edit', participantGroup)
                  }"
                  type="button"
                  class="btn mt-2"
                  :class="participantGroup.won_lots[0].winner_lot_specification ? 'btn-primary':'btn-secondary'"
                >
                    <span>Լրացնել տվյալները</span>
                </button>
              </td>
              <td>
                <button
                  @click.prevent="() => {
                    $modal.show('winner-requirements-modal', participantGroup)
                  }"
                  type="button" 
                  class="btn"
                  :class="participantGroup.director ? 'btn-primary':'btn-secondary'"
                >
                    <span>Լրացնել</span>
                </button>
              </td>
              <td v-if="Number.isInteger(getContractPrice(participantGroup))"> {{ getContractPrice(participantGroup) }}դր.</td>
              <td v-else> {{ getContractPrice(participantGroup) }}դր.</td>
              <td>
                <div class="row align-items-center justify-content-start m-0 p-0">
                  <div class='col-12 mb-2' v-if="getIsSigned(participantGroup)" >
                    Կնքված է
                  </div>
                  <div class='col-12 mb-2 text-primary'>
                    <button
                      class="btn btn-primary"
                      @click.prevent="() => {
                        $modal.show('new-editor-modal', {
                          action: 'download',
                          fileName: 'contract_offer',
                          participantGroup: participantGroup,
                          editorTitle: 'Պայմանագիր կնքելու առաջարկ'
                        })
                      }"
                      >
                      <span>Պայմանագրի առաջարկ</span>
                    </button>
                  </div>
                  <div class="col-12 text-primary">
                    <button class="btn btn-primary"
                      :disabled="participantGroup.director==='' || participantGroup.won_lots[0].winner_lot_specification===null"
                      @click.prevent="() => {
                        $modal.show('contract-modal', {index: participantIndex+1, participantGroup, winnersLength: participantGroups.length})
                      }"
                    >
                      <span>Պայմանագիր</span>
                    </button>
                  </div>  
                </div>
              </td>
            </tr>
            <infinite-loading slot="append"
                            class="w-100"
                            ref="comparisonInfiniteLoading"
                            @infinite="infiniteHandler"
                            force-use-infinite-wrapper="#comparison-table">
            <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
            <div slot="no-results"></div>
            <div slot="no-more"></div>
          </infinite-loading>
          </tbody>
        </table>
      </div>
      <winner-requirements-modal @updateComparisonData="resetData"/>
      <winner-lots-edit-modal @updateComparisonData="resetData"/>
      <contract-request-modal @updateComparisonData="resetData"/>
      <new-editor-modal />
      <contract-modal />
      <editor-modal />
    </div>
  </div>
</template>

<script>
  import WinnerRequirementsModal from '@/components/organize/WinnerRequirementsModal'
  import WinnerLotsEditModal from './modals/WinnerLotsEditModal'
  import ContractRequestModal from './modals/ContractRequestModal'
  import NewEditorModal from '@/views/fileManagment/competitive/NewEditorModal'
  import InfiniteLoading from 'vue-infinite-loading';
  import ContractModal from './modals/ContractModal'
  import EditorModal from '@/views/fileManagment/EditorModal'

  export default {
    name: "ContractPreparation",
    components: {
      WinnerRequirementsModal,
      WinnerLotsEditModal,
      ContractRequestModal,
      InfiniteLoading,
      NewEditorModal,
      ContractModal,
      EditorModal,
    },
    data() {
      return {
        participantGroups: [],
        notEstablished: true,
        organizedLots: [],
        pagination: {},
        tableData: [],
      }
    },
    computed: {
      locale() {
        return this.$store.getters["user/locale"];
      },
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
    },
    mounted() {
      this.$store.dispatch('procurement/getPlans')
      this.$store.dispatch('organize/getCurrent', this.$route.params.id)
      this.$store.dispatch('organize/getRows', { organizeId: this.$route.params.id })
    },
    methods: {
      consoleLog(msg) {
        console.log(msg)
      },
      createContract(){
        alert()
      },
      roundTwoDigits(number){
        return Math.round(number * 100) / 100
      },
      getContractPrice(participantGroup){
        var sumPrice = 0;
        participantGroup.won_lots.forEach((lot) => {
          const offer = participantGroup.lots.find(item => item.organize_row_id === lot.id)
          if(participantGroup.lots){
            const newPrice = offer.new_value
            const price = offer.value
            const vat = offer.vat
            if(vat){
              if(newPrice){
                sumPrice = sumPrice + (newPrice+newPrice*0.2)
              } else {
                sumPrice = sumPrice + (price+price*0.2)
              }
            } else {
              if(newPrice){
                sumPrice = sumPrice + (newPrice)
              } else {
                sumPrice = sumPrice + (price)
              }
            }
          }
        })
        sumPrice = +sumPrice;
        return sumPrice ? sumPrice.toFixed(2) : 0
      },
      getIsSigned(participantGroup){
        var isSigned = true;
        participantGroup.won_lots.forEach((lot) => {
          const offer = participantGroup.lots.find(item => item.organize_row_id === lot.id)
          if(!offer.get_response){
            isSigned = false;
          }
        })
        return isSigned
      },
      getPrice(participantGroup, lot){
        const newPrice = participantGroup.lots.find(item => item.organize_row_id === lot.id).new_value
        const price = participantGroup.lots.find(item => item.organize_row_id === lot.id).value
        if(newPrice){
          return newPrice
        } else {
          return price
        }
      },
      async infiniteHandler($state) {
        await this.$client.get(`participant-group/getByOrganize/getWonLots/${this.$route.params.id}`).then(response => {
          const results = response.data;
          if(results) {
            results.forEach(participant => {
              if(participant.won_lots.length>0){
                this.participantGroups.push(participant)
              }
            });
            $state.complete()
          } else{
            $state.complete()
          }
        }).catch(e => {
          $state.complete()
        })
      },
      resetData() {
        this.pagination = {}
        this.participantGroups = []
        this.$refs.comparisonInfiniteLoading.stateChanger.reset()
      },
    },
  }
</script>

<style scoped>
.fa-file-download{
  cursor: pointer;
}
</style>
