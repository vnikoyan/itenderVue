<template>
  <modal 
    name="negotiations-modal"
    @opened="handleOpened"
    @closed="$emit('updateComparisonData')"
    :clickToClose="false"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
          <p>Բանակցություններ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('negotiations-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body" class="p-4">
      <div class="ml-2">
        <div class="checkbox checkbox-primary mb-3">
          <input @change="handleChangeLocale" :checked="isLocale" id="is-all-not-satisfactory" type="checkbox">
          <label for="is-all-not-satisfactory">Տեղում</label>
        </div>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th> Չ/Հ </th>
            <th> Գնման առարկա </th>
            <th> Մասնակից </th>
            <th> Նախահաշվային գին </th>
            <th>
              <p class="mb-0">Հին գին</p>
              <p class="mb-0">(առանց ԱԱՀ)</p>
            </th>
            <th style="width: 250px;">
              <p class="mb-0">Նոր գին</p>
              <p class="mb-0">(առանց ԱԱՀ)</p></th>
            <th> Ընդամենը </th>
          </tr>
        </thead>
        <tbody id="negotiation-table" style="min-height: 5vh; max-height: 40vh!important; overflow: scroll">
          <template v-for="(lot, lotIndex) in lotsToBeNegotiated">
            <tr v-for="(participant, participantIndex) in lot.participants" :key="lotIndex.toString() + participantIndex">
              <td v-if="participantIndex == 0"
                  :rowspan="lot.participants.length">
                <div class="form-check form-check-inline" v-tooltip="isRequired(lot) ? 'Պարտադիր բանակցություններ' : 'Ոչ պարտադիր բանակցություններ'">
                  <input :id="'selected-for-negotiation-' + lot.view_id"
                         type="checkbox"
                         class="form-check-input"
                         checked
                         :disabled="isRequired(lot)">
                  <label :for="'selected-for-negotiation-' + lot.view_id" class="form-check-label">{{ lot.view_id }}</label>
                </div>
              </td>
              <td v-if="participantIndex == 0"
                  :rowspan="lot.participants.length">{{ lot.cpv_name }} - {{ lot.cpv_code }}</td>
              <td>{{ participant.name[locale] }}</td>
              <td v-if="participantIndex == 0"
                  :rowspan="lot.participants.length">{{ parseFloat(lot.count * lot.participants[0].plan_unit_price).toFixed(2) }}</td>
              <td>{{ participant.current_price }}</td>
              <td>
                <input v-model.number="participant.new_price"
                       :max="participant.current_price"
                       v-positive-only.none-zero
                       @input="participant.vat = participant.new_price * 0.2"
                       type="number"
                       class="form-control">
                <span v-if="participant.new_price > participant.total_price" class="text-danger" style="font-size: 0.6rem;">Չի կարող գերազանցել հին գինը</span>
              </td>
              <td>
                <p class="mb-0">{{ getNewOverall(participant) }}</p>
                <p v-if="getNewOverall(participant) > lot.count * lot.participants[0].plan_unit_price"
                      class="text-danger mb-0" style="font-size: 0.5rem">գերազանցում է նախահաշվային գինը</p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
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
    <div id="modal-footer">
      <button @click="save" class="btn btn-primary">
        <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    name: 'NegotiationsModal',
    components: { InfiniteLoading },
    data() {
      return {
        isLoading: false,
        isLocale: false,
        lotsToBeNegotiated: [],
        pagination: {},
        isValid: null,
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      locale() {
        return this.$store.getters['user/locale']
      },
      organizedRows() {
        return this.$store.getters['organize/organizedRows']
      }
    },
    methods: {
      handleChangeLocale(){
        const nextValue = !this.isLocale
        this.$client.put(`organize/${this.currentOrganized.id}`, {locale_negotiations: nextValue}).then(({ status, data }) => {
          if(status === 200) {
            this.$store.commit('organize/setCurrentOrganized', data.data)
          }
        })
        this.isLocale = nextValue
      },
      async save() {
        // todo: save negotiation results
        this.isLoading = true;
        await this.lotsToBeNegotiated.forEach(async(lot) => {
          $client.put(`organize-row/${lot.id}`, {done_negotiations: 1}).then(response => {
            console.log(response)
          })
          await lot.participants.forEach(async(participant) => {
            
            if(participant.new_price!==undefined && participant.new_price!==0){
              var editedFields = {}
              console.log(participant.new_price)
              if(participant.new_price === ''){
                editedFields = {
                  new_value: null,
                }
              }else{
                editedFields = {
                  new_value: participant.new_price,
                }
              }
              await this.$client.put(`participant-row/${participant.participant_data_row_id}`, editedFields).then((response) => {
                console.log(response)
              }).catch(e => {
                console.log(e)
              })
            }
          })
        })
        var arr = []
        this.lotsToBeNegotiated.forEach((lot) => {
          lot.participants.forEach((participant) => {
            arr.push(participant.current_price < participant.new_price)
            if(arr.some( e => e)){
              this.isValid = false
            }else{
              this.isValid = true
            }
          })
        })
        if(this.isValid === false){
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Նոր գինը(առանց ԱԱՀ) պետք է փոքր լինի հնից։'
          })
        }
        if(this.isValid){
          await this.$client.put(`organize/${this.currentOrganized.id}`, {done_negotiations: 1}).then(async({ status, data }) => {
            // eslint-disable-next-line eqeqeq
            if(status == 200) {
              this.$store.commit('organize/setCurrentOrganized', data.data)
              await this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ թարմացված է'
              })
              this.$modal.hide('negotiations-modal')
            }
          }).catch(e => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          })
        }
        this.isLoading = false
      },
      handleOpened() {
        this.isLocale = this.currentOrganized.locale_negotiations
        // this.$refs.negotiationInfiniteLoading.stateChanger.reset();
      },
      async infiniteHandler($state) {
        this.lotsToBeNegotiated = [];
        const array = []
        await this.organizedRows.forEach(async(lot) => {
          await this.$client.get(`participant-row/getWinnerByOrganizeRowId/${lot.id}`).then(async (response) => {
            const results = response.data;
            if(results.length){
              const currentLot = {...lot};
              currentLot.winners = results.filter(item=>item.winner===true);
              currentLot.participants = results;
              var isAllMoreThenPlan = results.filter((item) => item.enough === false).length === results.length ? 1 : 0;
              if(currentLot.participants.length === 1 || isAllMoreThenPlan || currentLot.winners.length > 1 || currentLot.participants[0].is_condition || currentLot.done_negotiations){
                await array.push(currentLot)
              }
              const sortedArray = array.sort((a, b) => + a.view_id - + b.view_id)
              this.lotsToBeNegotiated = sortedArray;
            }
            await $state.complete()
          }).catch(async e => {
            await $state.complete()
          })
        });
      },
      isRequired(lot){
        if(this.currentOrganized.is_with_condition){
          return true;
        }
        if(lot.winners.length > 1){
          return true;
        }
        if(lot.winners.length !== 1){
          return true;
        }
        return false;
      },
      consoleLog(msg) {
        console.log(msg)
      },
      getNewOverall(participant) {
        let overall = null
        if(participant.new_price) {
          overall = participant.new_price
          if(participant.current_vat) {
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
