<template>
  <modal 
    class="contract-request-modal modal-without-footer"
    name="contract-request-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
  >
    <div id="modal-header" class="action-modal">
      <div class="w-75 d-flex">
          <p>Պայմանագրի կնքում</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('contract-request-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <template v-if="winners.length === 0">
        <div class="h-100 d-flex align-items-center justify-content-center">
          <div class="text-center p-3">
            <h5 class="font-size-24 m-3">Բոլոր հնարավոր պայմանագրերը կնքված են</h5>
          </div>
        </div>
      </template>
      <div v-else class="d-flex">
        <div class="col-md-12 p-0">
          <table class="table table-borderless VueTables__table table table-striped table-border-radius">
            <thead>
              <tr>
                <th style="width: 120px;">Հ/Հ</th>
                <th>Մասնակցի անվանում</th>
                <th>Մասնակցի հեռախոսահամար</th>
                <th>Մասնակցի Էլ. հասցե</th>
                <!-- <th>Պայմանագրի պատասխան</th> -->
                <th>Կնքում</th>
              </tr>
            </thead>
            <tbody id="negotiation-table" style="min-height: 5vh; max-height: 40vh!important; overflow: scroll">
              <template v-for="(winner, winnerIndex) in winners">
                  <tr v-if="!getIsSigned(winner)" :key="winnerIndex">
                    <td>{{ winnerIndex+1 }}</td>
                    <td>{{ winner.name }}</td>
                    <td>{{ winner.phone }}</td>
                    <td>{{ winner.email }}</td>
                    <!-- <td>
                      <select v-model="participantGroup.contractResponse" class="form-control">
                        <option :value="true">Ստացվել է</option>
                        <option :value="false">Չի ստացվել</option>
                      </select>
                    </td> -->
                    <td>
                      <div class="row m-0 p-0">
                        <div class="col-6">
                          <button
                            @click.prevent="() => {
                              $modal.show('contract-sign-modal', {winner, confirmContract})
                            }"
                            :disabled="!winner.signed_contract_hy"
                            type="button" 
                            class="btn btn-success">
                            <span>Ուղարկել պայմանագրի առաջարկ</span>
                          </button>
                          <div class="mt-2 text-danger">Բեռնեք տվյալ մասնակցի հետ Պայմանագիր փաստաթուղթը, որը հետագայում կօգտագործվի պայմանգրի կառավարում բաժնում'</div>
                        </div>
                        <div class="col-6">
                          <button
                            @click="cancelContract(winner)"
                            type="button" 
                            class="btn btn-danger">
                            <span>Չեղարկել</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
            </tbody>
          </table>
        </div>
      </div>
      <infinite-loading slot="append"
                        class="w-100"
                        ref="negotiationInfiniteLoading"
                        @infinite="infiniteHandler"
                        force-use-infinite-wrapper="#negotiation-table">
        <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
        <div slot="no-results"></div>
        <div slot="no-more"></div>
      </infinite-loading>
    </div>
    <contract-sign-modal />
  </modal>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import ContractSignModal from './ContractSignModal'

  export default {
    name: 'ContractRequestModal',
    components: { InfiniteLoading, ContractSignModal },
    data() {
      return {
        winners: [],
        pagination: {},
        participantGroups: [],
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organizeOnePerson/currentOrganized']
      },
      locale() {
        return this.$store.getters['user/locale']
      }
    },
    methods: {
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
      confirmContract(winner) {
        winner.won_lots.forEach((lot) => {
          const offer = this.currentOrganized.lots.find(item => item.organize_row_id === lot.id && (item.participant_id === winner.id || item.row_group_id === winner.id))

          this.$client.put(`participant-row/${offer.id}`, {get_response: true})
        })
        const optionIndex = this.winners.findIndex(item => item.id === winner.id)
        this.winners.splice(optionIndex, 1)
      },
      handleBeforeOpen(){
        this.winners = [...this.currentOrganized.winners]
      },
      cancelContract(winner) {
        winner.won_lots.forEach((lot) => {
          this.$client.delete(`participant-row/${lot.won_lot_id}`)
        })
        this.$client.put(`organize/oneperson/${this.$route.params.id}`, {create_contract: 0})
        const optionIndex = this.winners.findIndex(item => item.id === winner.id)
        this.winners.splice(optionIndex, 1)
      },
      async infiniteHandler($state) {
        this.participantGroups = [];
        await this.$client.get(`participant-group/getByOrganize/getWonLots/${this.$route.params.id}`).then(response => {
          const results = response.data;
          if(results) {
            results.forEach(participant => {
              if(participant.won_lots.length>0){
                participant.contractResponse = false;
                if(!this.getIsSigned(participant)){
                  this.participantGroups.push(participant)
                }
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
      consoleLog(msg) {
        console.log(msg)
      },
      getNewOverall(participant) {
        let overall = null
        if(participant.new_price) {
          overall = participant.new_price
          if(participant.vat) {
            overall += participant.new_price*0.2
          }
        }
        if(overall) {
          return Number(overall.toFixed(2))
        }

        return overall
      },
    }
  }
</script>

<style scoped>

</style>