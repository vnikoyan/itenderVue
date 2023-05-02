<template>
  <modal 
    class="contract-request-modal modal-without-footer"
    name="contract-request-modal"
    @closed="$emit('updateComparisonData')"
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
      <template v-if="participantGroups.length === 0">
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
              <template v-for="(participantGroup, participantIndex) in participantGroups">
                  <tr v-if="!getIsSigned(participantGroup)" :key="participantIndex">
                    <td>{{ participantIndex+1 }}</td>
                    <td>{{ participantGroup.participant[0].name.hy }}</td>
                    <td>{{ participantGroup.participant[0].phone }}</td>
                    <td>{{ participantGroup.participant[0].email }}</td>
                    <!-- <td>
                      <select v-model="participantGroup.contractResponse" class="form-control">
                        <option :value="true">Ստացվել է</option>
                        <option :value="false">Չի ստացվել</option>
                      </select>
                    </td> -->
                    <td>
                      <div class="row m-0 p-0" v-if="participantGroup.director">
                        <div class="col-6">
                          <button
                            @click.prevent="() => {
                              $modal.show('contract-sign-modal', {participantGroup, confirmContract, participantIndex})
                            }"
                            :disabled="!participantGroup.signed_contract_hy"
                            type="button" 
                            class="btn btn-success">
                              <span>Կնքել</span>
                          </button>
                          <div class="mt-2 text-danger">Բեռնեք տվյալ մասնակցի հետ Պայմանագիր փաստաթուղթը, որը հետագայում կօգտագործվի պայմանգրի կառավարում բաժնում'</div>
                        </div>
                        <div class="col-6">
                          <button
                            @click="cancelContract(participantGroup)"
                            type="button" 
                            class="btn btn-danger">
                              Չեղարկել
                          </button>
                        </div>
                      </div>
                      <div v-else>
                        Լրացրեք մասնակցի վավերապայմաները
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
        participantGroups: [],
        pagination: {},
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      locale() {
        return this.$store.getters['user/locale']
      }
    },
    methods: {
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
      confirmContract(participantGroup) {
        participantGroup.won_lots.forEach((lot) => {
          const offer = participantGroup.lots.find(item => item.organize_row_id === lot.id)
          this.$client.put(`participant-row/${offer.id}`, {get_response: true})
        })
        const optionIndex = this.participantGroups.findIndex(item => item.id === participantGroup.id)
        this.participantGroups.splice(optionIndex, 1)
      },
      cancelContract(participantGroup) {
         participantGroup.won_lots.forEach((lot) => {
          const offer = participantGroup.lots.find(item => item.organize_row_id === lot.id)
          this.$client.put(`participant-row/${offer.id}`, {canceled_contract_request: true})
          this.$client.get(`participant-row/getWinnerByOrganizeRowId/${offer.organize_row_id}`).then(response => {
            const results = response.data;
            const newWinner = results[0];
            if(newWinner !== undefined){
              $client.put(`organize-row/${lot.id}`, {winner_participant_id: newWinner.participant_group_id}).then(response => {
                console.log(response)
              })
            } else {
              $client.put(`organize-row/${lot.id}`, {winner_participant_id: 0}).then(response => {
                console.log(response)
              })
            }
          })
        })
        const optionIndex = this.participantGroups.findIndex(item => item.id === participantGroup.id)
        this.participantGroups.splice(optionIndex, 1)
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
