<template>
  <div class="card">
    <div class="card-body">
      <template v-if="!loaded">
        <div class="h-100 d-flex align-items-center justify-content-center">
          <div class="text-center p-3">
             <div style="left: 0; right: 0; top: 0; bottom: 0;" class="text-big text-primary spinner-border spinner-border-lg m-auto position-absolute" role="status"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <template v-if="currentOrganized.winners && currentOrganized.winners.length===0">
          <div class="h-100 d-flex align-items-center justify-content-center">
            <div class="text-center p-3">
              <h5 class="font-size-24 m-3">Դուք դեռևս չունեք ներմուծված մասնակիցներ</h5>
              <button @click="cancelOrganize" class="btn btn-primary btn">
                <span>Ընթացակարգը համարել չկայացած </span>
              </button>
            </div>
          </div>
        </template>
        <div v-else class="responsive-table">
          <table class="contract-preparation-table table table-borderless VueTables__table table table-striped table-border-radius m-0" style="border-collapse: collapse; border-spacing: 0; width: 100% !important;;">
            <thead>
              <tr>
                <th style="width: 20px;">Հ/Հ</th>
                <th>Մասնակցի անվանում</th>
                <th>Մասնակցի հեռախոսահամար</th>
                <th>Մասնակցի Էլ. հասցե</th>
                <th>Մասնակցի վավերապայմաներ</th>
                <th>Գնման առարկաներ</th>
                <th>Պայմանագրի գումար</th>
                <th>Փաստաթղթեր</th>
              </tr>
            </thead>
            <tbody id="comparison-table" class="medium-scroll" style="min-height: 5vh; max-height: 40vh !important; overflow: scroll">
              <tr :key="winnerIndex" v-for="(winner, winnerIndex) in currentOrganized.winners">
                <td>{{ winnerIndex + 1 }}</td>
                <td>{{ winner.name }}</td>
                <td>{{ winner.phone }}</td>
                <td>{{ winner.email }}</td>
                <td>
                  <button
                    @click.prevent="() => {
                      $modal.show('winner-requirements-modal', winner)
                    }"
                    type="button" 
                    class="btn"
                    :class="winner.director ? 'btn-primary':'btn-secondary'"
                  >
                      <span>Լրացնել</span>
                  </button>
                </td>
                <td>
                  <span
                    :key="lot.toString() + lotIndex"
                    v-for="(lot, lotIndex) in winner.won_lots">
                      {{lot.is_from_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name}}<span v-if="lotIndex !== winner.won_lots.length-1">,</span>
                  </span>
                </td>
                <td v-if="Number.isInteger(getContractPrice(winner))"> {{ getContractPrice(winner) }}դր.</td>
                <td v-else> {{ getContractPrice(winner) }}դր.</td>
                <td>
                  <div class="row p-0 m-0 align-items-center justify-content-center">
                    <div class="row align-items-center" v-if="getIsSigned(winner)" >
                        <div class='col-12 mb-2 justify-content-start'>
                          Կնքված է
                        </div>
                    </div>
                      <div class='col-12 pl-0 mb-2 text-primary justify-content-start'>
                        <button
                          class="btn btn-primary"
                          @click.prevent="() => {
                            $modal.show('new-editor-modal', {
                              action: 'download',
                              fileName: 'contract_offer',
                              participantGroup: winner,
                              editorTitle: 'Պայմանագիր կնքելու առաջարկ'
                            })
                          }"
                          >
                          <span>Պայմանագրի առաջարկ</span>
                        </button>
                      </div>
                      <div class="col-12 pl-0 mb-2 text-primary justify-content-start">
                          <button
                            class="btn btn-primary"
                            :disabled="winner.director===''"
                            @click.prevent="() => {
                              $modal.show('new-editor-modal', {
                                action: 'download',
                                fileName: 'price_offer',
                                participantGroup: winner,
                                editorTitle: 'Գնային առաջարկ'
                              })
                            }"
                            >
                            <span>Գնային առաջարկ</span>
                          </button>
                      </div>
                      <div class="col-12 pl-0 justify-content-start">
                        <button class="btn btn-primary"
                          :disabled="winner.director===''"
                          @click.prevent="() => {
                            $modal.show('contract-modal', {index: winnerIndex+1, winner})
                          }"
                        >
                          <span>Պայմանագիր</span>
                        </button>
                      </div>  
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
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
  import WinnerLotsEditModal from './modals/WinnerLotsEditModal'
  import ContractRequestModal from './modals/ContractRequestModal'
  import NewEditorModal from '@/views/fileManagment/onePerson/NewEditorModal'
  import ContractModal from './modals/ContractModal'
  import EditorModal from '@/views/fileManagment/EditorModal'
  import WinnerRequirementsModal from '@/components/organize/WinnerRequirementsModal'

  export default {
    name: "ContractPreparation",
    components: {
      WinnerRequirementsModal,
      WinnerLotsEditModal,
      ContractRequestModal,
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
        loaded: false,
      }
    },
    computed: {
      locale() {
        return this.$store.getters["user/locale"];
      },
      currentOrganized() {
        return this.$store.getters['organizeOnePerson/currentOrganized']
      },
    },
    mounted() {
      this.$store.dispatch('procurement/getPlans')
      this.$store.dispatch('organizeOnePerson/getCurrent', this.$route.params.id)
      this.$store.dispatch('organizeOnePerson/getRows', {organizeId: this.$route.params.id}).then((value) => {
        this.loaded = true;
      })
    },
    methods: {
      consoleLog(msg) {
        console.log(msg)
      },
      roundTwoDigits(number){
        return Math.round(number * 100) / 100
      },
      cancelOrganize(){
        this.$confirm(
          "Սույնով ընթացակարգը կհամարվի չկայացած", 
          "", 
          "info", 
          {
            confirmButtonText: 'Հաստատել', 
            cancelButtonText: 'Փակել'
          }
        ).then(text => {
          this.$client.get(`organize/oneperson/cancel/${this.currentOrganized.id}`).then(({data}) => {
            if(data.status){
              this.$router.push('/organizing/oneperson')
            }
          })
        })
      },
      getIsSigned(winner){
        var isSigned = true;
        winner.won_lots.forEach((lot) => {
          const offer = this.currentOrganized.lots.find(item => item.organize_row_id === lot.id && (item.participant_id === winner.id || item.row_group_id === winner.id))
          if(!offer.get_response){
            isSigned = false;
          }
        })
        return isSigned
      },
      getContractPrice(winner){
        var sumPrice = 0;
        if(this.currentOrganized.winner_by_lots){
          winner.won_lots.forEach((lot) => {
            const offer = this.currentOrganized.lots.find(item => item.organize_row_id === lot.id && (item.participant_id === winner.id || item.row_group_id === winner.id))

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
          })
        } else {
          sumPrice = this.currentOrganized.winner_user_price
        }
        sumPrice = +sumPrice;
        return sumPrice ? sumPrice.toFixed(2) : 0
      },
      resetData() {
        this.pagination = {}
        this.participantGroups = []
        this.$store.dispatch('organizeOnePerson/getCurrent', this.$route.params.id)
      },
    },
  }
</script>

<style scoped>
.fa-file-download{
  cursor: pointer;
}
</style>
