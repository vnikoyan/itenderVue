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
    z-index="2000"
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
      <infinite-loading slot="append"
                        class="w-100"
                        ref="negotiationInfiniteLoading"
                        @infinite="infiniteHandler"
                        force-use-infinite-wrapper="#negotiation-table">
        <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
        <div slot="no-results"></div>
        <div slot="no-more"></div>
      </infinite-loading>
      <template v-if="loaded">
        <template v-if="participantGroups.length === 0">
          <div class="h-100 d-flex align-items-center justify-content-center">
            <div class="text-center p-3">
              <h5 class="font-size-24 m-3">Բոլոր հնարավոր պայմանագրերը կնքված են</h5>
            </div>
          </div>
        </template>
        <div v-else class="d-flex">
          <div class="col-md-12 p-0">
            <v-client-table ref="vtable" :columns="columns" v-model="winners" :options="options">
              <div slot="index_number" class="d-flex justify-content-start align-items-center h-100" slot-scope="{index}">
                <span>{{ index }}</span>
              </div>
              <div slot="name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                <span>{{ row.name }}</span>
              </div>
              <div slot="action" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                <div class="col-auto text-center pl-0">
                  <button
                    @click.prevent="() => {
                      $modal.show('contract-sign-modal', {winner: row, confirmContract})
                    }"
                    type="button" 
                    class="btn btn-primary col">
                      <span>Ուղարկել պայմանագրի առաջարկ</span>
                  </button>
                </div>
                  <button
                    @click="cancelContract(row)"
                    type="button" 
                    class="btn btn-light col-auto">
                      <span class="text-danger">Չեղարկել</span>
                  </button>
              </div>
            </v-client-table>
          </div>
        </div>
      </template>
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
        columns: [
          'index_number',
          'name',
          'phone',
          'email',
          'action'
        ],
        options: {
          sortable: [],
          perPage: 1000,
          perPageValues: [],
          columnsDropdown: false,
          filterByColumn: false,
          skin: 'table table-striped table-border-radius',
          dateFormat: "YYYY-mm-dd",
          headings: {
            index_number: 'Հ/Հ',
            name: 'Մասնակցի անվանում',
            phone: 'Մասնակցի հեռախոսահամար',
            email: 'Մասնակցի Էլ. հասցե',
            action: 'Կնքում',
          },
          filterable: false
        },
        loaded: false,
        winners: [],
        pagination: {},
        participantGroups: [],
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organizeItender/currentOrganized']
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
        this.$client.put(`organize/itender/${this.$route.params.id}`, {create_contract: 0})
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
        this.loaded = true;
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