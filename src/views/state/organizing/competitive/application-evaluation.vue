<template>
  <div class="card">
    <div class="card-body vm--modal p-0 shadow-none">
      <div id="modal-body">
        <div class="d-flex pb-3 justify-content-end">
          <button class="btn btn-primary br-8" @click="$modal.show('participants-modal')">
            <span class="mr-2">Մասնակիցներ</span>
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div v-if="organizedLots.length" class="responsive-table">
          <table class="participants-table table table-borderless VueTables__table table table-border-radius" style="border-collapse: collapse; border-spacing: 0; width: 100% !important;">
            <thead>
              <tr>
                <th rowspan="2" style="width: 20px; border-right: 1px solid #dfdfdf; border-left: 3px solid #dfdfdf;">Չ/Հ</th>
                <th rowspan="2" style="border-right: 1px solid #dfdfdf;">CPV կոդ</th>
                <th rowspan="2" style="border-right: 1px solid #dfdfdf;">Գնման առարկայի անվանում</th>
                <th rowspan="2" style="border-right: 1px solid #dfdfdf;">Նախահաշվային ընդհանուր գին</th>
                <th colspan="3" style="border-right: 1px solid #dfdfdf;border-bottom: 1px solid #dfdfdf;">Նվազագույն գնային առաջարկ (ՀՀ դրամ)</th>
                <th rowspan="2" style="border-right: 1px solid #dfdfdf;">Մասնակիցների քանակ</th>
                <th rowspan="2" style="border-right: 1px solid #dfdfdf;">Մասնակցի անվանում</th>
                <!-- <th rowspan="2">Մասնակցի կարգավիճակ</th> -->
                <th rowspan="2" style="border-right: 1px solid #dfdfdf;">Ստացված արդյունքներ</th>
                <th rowspan="2" style="border-right: 1px solid #dfdfdf;">Կարգավիճակ</th>
              </tr>
              <tr>
                <th style="border-right: 1px solid #dfdfdf;">Արժեք</th>
                <th style="border-right: 1px solid #dfdfdf;">ԱԱՀ</th>
                <th style="border-right: 1px solid #dfdfdf;">Ընդհանուր</th>
              </tr>
            </thead>
            <tbody id="comparison-table" style="min-height: 5vh; max-height: 40vh !important; overflow: scroll">
              <tr v-for="lot in organizedLots" :key="lot.id" :class="{
                  'table-danger': getNegotiationStatus(lot) === 'Չկայացած',
                  'table-success': lot.winners.length === 1,
                  'bg-light-grey': lot.winners.length > 1,
                  'table': !lot.winners.length
                }">
                <td style="border-right: 1px solid #dfdfdf; border-left: 3px solid #dfdfdf;">{{ lot.view_id }}</td>
                <td style="border-right: 1px solid #dfdfdf;">{{ lot.cpv_code }}{{ lot.cpv_drop && '/' }}{{ lot.cpv_drop }}</td>
                <td style="border-right: 1px solid #dfdfdf;">{{ lot.cpv_name }}</td>
                <td style="border-right: 1px solid #dfdfdf;">{{ lot.count * lot.unit_amount }}դր.</td>
                <template v-if="lot.participantsList.length">
                  <td style="border-right: 1px solid #dfdfdf;">{{ getMinPrice(lot) }}</td>
                  <td style="border-right: 1px solid #dfdfdf;">{{ getMinVat(lot) }}</td>
                  <td style="border-right: 1px solid #dfdfdf;"><b>{{ getMinPriceVat(lot) }}</b></td>
                </template>
                <template v-else>
                  <td style="border-right: 1px solid #dfdfdf;">-</td>
                  <td style="border-right: 1px solid #dfdfdf;">-</td>
                  <td style="border-right: 1px solid #dfdfdf;">-</td>
                </template>
                <td style="border-right: 1px solid #dfdfdf;">{{ lot.participantsList.length }}</td>
                <td style="border-right: 1px solid #dfdfdf;">
                  <template v-if="lot.winners.length">
                    <span v-for="(winner, index) in lot.winners" :key="index">
                      {{ winner.name[locale] }}
                    </span>
                  </template>
                  <template v-else-if="lot.participantsList.length">
                    <span>
                      {{ lot.participantsList[0].name[locale] }}
                    </span>
                  </template>
                  <template v-else>
                    <span>Չկա մասնակից</span>
                  </template>
                  <div>
                    <div class="dropdown" style="position: inherit; left: 0; right: 0;" v-if="lot.participantsList.length">
                      <span id="participant-list"
                            style="cursor: pointer"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        <i class="fas fa-angle-down"></i>
                      </span>
                      <div class="dropdown-menu" style="z-index: 9999" aria-labelledby="participant-list">
                        <p v-for="(participant, index) in lot.participantsList" :key="index" class="dropdown-item m-0">
                          {{ participant.name[locale] }} - {{ getCurrPrice(participant) }}դր.
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                <!-- <td>{{ getParticipantStatus(lot) }}</td> -->
                <td style="border-right: 1px solid #dfdfdf;">{{ getComparedStatus(lot) }}</td>
                <td style="border-right: 1px solid #dfdfdf;">
                  {{ getNegotiationStatus(lot) }}
                  <button @click="() => setCompleted(lot)" v-if="getNegotiationStatus(lot) === 'Չկայացած' && getComparedStatus(lot) === 'Նախահաշվային գնի գերազանցում' && lot.participantsList.length > 1" type="button" class="btn mt-2 btn-primary">
                    <span>Համարել կայացած</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="h-100 d-flex align-items-center justify-content-center">
            <div class="text-center p-3">
              <h5 class="font-size-24 m-3">Դուք դեռևս չունեք ներմուծված մասնակիցներ</h5>
              <button @click="cancelOrganize" class="btn btn-primary btn">
                <span>Ընթացակարգը համարել չկայացած </span>
              </button>
            </div>
          </div>
        </div>
        <infinite-loading slot="append"
                          class="w-100"
                          ref="comparisonInfiniteLoading"
                          @infinite="infiniteHandler"
                          force-use-infinite-wrapper="#comparison-table">
          <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
          <div slot="no-results"></div>
          <div slot="no-more"></div>
        </infinite-loading>
        <participants-modal @updateComparisonData="resetData"/>
        <negotiations-modal @updateComparisonData="resetData"/>
        <editor-modal />
        <new-editor-modal />
      </div>
      <div id="modal-footer">
        <button :disabled="isLoading" v-if="organizedLots.length" @click="cancelOrganize" class="btn btn-primary mr-3">
          <span v-if="isLoading" class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span>Ընթացակարգը համարել չկայացած</span>
        </button>
        <button :disabled="mandatoryNegotiations || isLoading" @click="createContract" type="button" class="btn btn-primary">
          <span v-if="isLoading" class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="mr-2">Պայմանագրի պատրաստում</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import ParticipantsModal from './modals/ParticipantsModal'
  import NegotiationsModal from './modals/NegotiationsModal'
  import EditorModal from '@/views/fileManagment/EditorModal'
  import NewEditorModal from '@/views/fileManagment/competitive/NewEditorModal'

  export default {
    name: "ApplicationEvaluation",
    components: {
      InfiniteLoading,
      ParticipantsModal,
      NegotiationsModal,
      NewEditorModal,
      EditorModal },
    data() {
      return {
        isLoading: false,
        participantGroups: [],
        pagination: {},
        organizedLots: [],
        tableData: [],
        notEstablished: true,
        mandatoryNegotiations: false,
      }
    },
    mounted() {
      this.$store.dispatch('organize/storeIsMandatoryNegotiations', false)
      this.$store.dispatch('procurement/getPlans')
      this.$store.dispatch('organize/getCurrent', this.$route.params.id)
    },
    computed: {
      locale() {
        return this.$store.getters["user/locale"];
      },
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      organizedRows() {
        return this.$store.getters['organize/organizedRows']
      }
    },
    methods: {
      consoleLog(msg) {
        console.log(msg)
      },
      setCompleted(lot){
        $client.put(`organize-row/${lot.id}`, {set_completed: 1}).then(response => {
          this.resetData()
        })
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
          this.$client.get(`organize/cancel/${this.currentOrganized.id}`).then(({data}) => {
            if(data.status){
              this.$router.push('/organizing/competitive')
            }
          })
        })
      },
      setWinnersForLots(){
        this.organizedLots.forEach(lot => {
          if(lot.winners.length === 1){
            $client.put(`organize-row/${lot.id}`, {winner_participant_id: lot.winners[0].participant_group_id, won_lot_id: lot.winners[0].participant_data_row_id}).then(response => {
              console.log(response)
            })
          }
        });
        // const requestArray = [];
        // this.organizedLots.forEach(lot => {
        //   if(lot.winners.length === 1){
        //     requestArray.push({
        //       id: lot.id,
        //       winner_participant_id: lot.winners[0].participant_group_id,
        //       won_lot_id: lot.winners[0].participant_data_row_id
        //     })
        //   }
        // });
        // $client.post('organize-row/setWinnersForLots', requestArray).then(response => {
        //   console.log(response)
        // })
      },
      createContract(){
        if(this.currentOrganized.get_evaluation_session){
          // this.setWinners()
          this.setWinnersForLots()
          this.isLoading = true;
          this.$client.put(`organize/${this.currentOrganized.id}`, {create_contract: 1}).then(({ status, data }) => {
            // eslint-disable-next-line eqeqeq
            if(status == 200) {
              this.$store.commit('organize/setCurrentOrganized', data.data)
              this.$router.push('/organizing/competitive')
            }
            this.isLoading = false
          }).catch(e => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
            this.isLoading = false
          })
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Դուք դեռ չեք ստացել «Բացման և գնահատման նիստի արձանագրություն» փաստաթուղթը',
            text: 'Կրկին փորձեք!'
          })
        }
      },
      roundTwoDigits(number){
        return Math.round(number * 100) / 100
      },
      getCurrPrice(participant){
        var currentPrice = participant.current_price_vat;
        return this.roundTwoDigits(currentPrice)
      },
      getMinPrice(lot){
        var winner = {}
        if(lot.winners.length){
          winner = lot.winners[0]
        } else {
          winner = lot.participantsList[0]
        }
        var currentPrice = winner.current_price;
        return this.roundTwoDigits(currentPrice)
      },
      getMinVat(lot){
        var winner = {}
        if(lot.winners.length){
          winner = lot.winners[0]
        } else {
          winner = lot.participantsList[0]
        }
        var currentVat = winner.current_vat;
        return this.roundTwoDigits(currentVat)
      },
      getMinPriceVat(lot){
        var winner = {}
        if(lot.winners.length){
          winner = lot.winners[0]
        } else {
          winner = lot.participantsList[0]
        }
        var currentPriceVat = winner.current_price_vat;
        return this.roundTwoDigits(currentPriceVat)
      },
      getComparedStatus(lot) {
        if(!lot.participants.length && !lot.winners.length) {
          return 'Գնային առաջարկ չի ներկայացվել'
        }
        if(lot.winners.length === 1) {
          if(!lot.participants.length) {
            return 'Գնային առաջարկ ներկայացվել է միայն մեկ մասնակցի կողմից'
          }
          return 'Նվազագույն գին'
        }
        if(lot.winners.length > 1) {
          return 'Գների հավասարություն'
        }
        if(!lot.winners.length) {
          return 'Նախահաշվային գնի գերազանցում'
        }
      },
      getNegotiationStatus(lot) {
        if(lot.participants.length === 0 || lot.winners.length === 0 ){
          return 'Չկայացած';
        }
        // if(this.currentOrganized.is_with_condition && !this.currentOrganized.done_negotiations){
        //   this.mandatoryNegotiations = true;
        //   this.$store.dispatch('organize/storeIsMandatoryNegotiations', true)
        //   return 'Պարտադիր բանակցություններ (15-րդ հոդվածի 6-րդ մաս)'
        // }
        if(lot.winners.length > 1) {
          if(!this.currentOrganized.done_negotiations){
            this.mandatoryNegotiations = true;
            this.$store.dispatch('organize/storeIsMandatoryNegotiations', true)
            return 'Պարտադիր Բանակցություններ'
          } else {
            return 'Չկայացած';
          }
        }
        if((lot.winners.length === 1 && lot.participants.length === 1)  && !this.currentOrganized.done_negotiations) {
          return 'Բանակցություններ (ոչ պարտադիր)'
        }
        this.notEstablished = false;
        return 'Կայացած'
        // return `Կայացած ${this.currentOrganized.is_with_condition ? '(15-րդ հոդվածի 6-րդ մաս)' : ''}`
      },
      getParticipantStatus(lot) {
        if((lot.winners.length === 1 && !lot.participants.length) || (!lot.winners.length && lot.participants.length === 1)) {
          return 'Անորոշ'
        }
        if(lot.winners.length > 1 || !lot.winners.length) {
          return 'Անորոշ'
        }
        this.notEstablished = false;
        return 'Ընտրված'
      },
       async infiniteHandler($state) {
        await this.$store.dispatch('organize/getRows', {
          organizeId: this.$route.params.id,
          page: this.pagination.page ? this.pagination.page + 1 :  1
        }).then(async({ data }) => {
          if(data.data.length) {
            this.organizedLots = data.data
            $state.complete()
            // await data.data.forEach(async (lot) => {
            //   this.organizedLots.push(lot)
            // });
            // this.organizedLots = this.organizedLots.splice(0, 20)
          } else {
            $state.complete()
          }
        })
      },
      resetData() {
        this.mandatoryNegotiations = false;
        this.$store.dispatch('organize/storeIsMandatoryNegotiations', false)
        this.pagination = {}
        this.organizedLots = []
        this.$refs.comparisonInfiniteLoading.stateChanger.reset()
      },
    },
  }
</script>
<style scoped>
#modal-body{
  height: calc(100% - 70px) !important;
}
</style>