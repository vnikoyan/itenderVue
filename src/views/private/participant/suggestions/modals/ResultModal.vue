<template>
  <modal 
    class="result-modal modal-without-footer"
    name="result-modal"
    @closed="$emit('updateComparisonData')"
    @before-close="beforeClose"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="90%"
  >
    <div id="modal-header" class="action-modal">
      <div class="w-75 d-flex">
          <p>Ընթացակարգի արդյունքներ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('result-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <div v-if="organizedLots.length" class="h-100">
        <template v-if="organize.winner_by_lots">
          <v-client-table ref="vtable" :columns="columns" v-model="organizedLots" :options="options">
            <div slot="index_number" slot-scope="{row}">
              {{ row.view_id }}
            </div>
            <div slot="cpv" slot-scope="{row}">
              {{ row.cpv_code }}{{ row.cpv_drop && '/' }}{{ row.cpv_drop }}
            </div>
            <div slot="name" slot-scope="{row}">
              {{ row.cpv_name }}
            </div>
            <div slot="price" slot-scope="{row}">
              {{ row.count * row.unit_amount }}դր.
            </div>
            <div slot="min_price" slot-scope="{row}">
              {{ getMinPriceVat(row) }}
            </div>
            <div slot="participants_count" slot-scope="{row}">
              {{ row.participants_list.length }}
            </div>
            <div slot="winner" slot-scope="{row}">
              <template v-if="row.winners.length">
                <span :class="isMine(winner, row) && 'font-weight-bold'" v-for="(winner, index) in row.winners" :key="index">
                  {{ winner.name.hy }}
                </span>
              </template>
              <template v-else-if="row.participants.length">
                <span :class="lot.participants[0].email === me.email && 'font-weight-bold'">
                  {{ lot.participants[0].name.hy }}
                </span>
              </template>
              <template v-else>
                <span>Չկա մասնակից</span>
              </template>
              <div>
                <div class="dropdown" style="position: inherit; left: 0; right: 0;" v-if="row.participants.length">
                  <span id="participant-list"
                        class="text-primary"
                        style="cursor: pointer"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <u class="font-weight-bold">
                          Բոլոր Մասնակիցները
                        </u>
                        <i class="fas fa-angle-down"></i>
                  </span>
                  <div class="dropdown-menu card" style="z-index: 9999" aria-labelledby="participant-list">
                    <p v-for="(participant, index) in row.participants_list" :key="index" :class="participant.email === me.email && 'font-weight-bold'" class="dropdown-item m-0">
                      {{ participant.info.name.hy }} - {{ getCurrPrice(participant) }}դր.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </v-client-table>
          <!-- <table class="participants-table table table-bordered m-0" style="border-collapse: collapse; border-spacing: 0; width: 100% !important;">
            <thead>
              <tr>
                <th rowspan="2" style="width: 120px; border-right: 3px solid #dfdfdf; border-left: 3px solid #dfdfdf;">Չ/Հ</th>
                <th rowspan="2" style="border-right: 3px solid #dfdfdf;">CPV կոդ</th>
                <th rowspan="2" style="border-right: 3px solid #dfdfdf;">Գնման առարկայի անվանում</th>
                <th rowspan="2" style="border-right: 3px solid #dfdfdf;">Նախահաշվային ընդհանուր գին</th>
                <th colspan="3" style="border-right: 3px solid #dfdfdf;">Նվազագույն գնային առաջարկ (ՀՀ դրամ)</th>
                <th rowspan="2" style="border-right: 3px solid #dfdfdf;">Մասնակիցների քանակ</th>
                <th rowspan="2" style="border-right: 3px solid #dfdfdf;">Հաղթող Մասնակից</th>
              </tr>
              <tr>
                <th style="border-right: 1px solid #dfdfdf;">Արժեք</th>
                <th style="border-right: 1px solid #dfdfdf;">ԱԱՀ</th>
                <th style="border-right: 3px solid #dfdfdf;">Ընդհանուր</th>
              </tr>
            </thead>
            <tbody id="comparison-table" style="min-height: 5vh; max-height: 40vh !important; overflow: scroll">
              <tr v-for="lot in organizedLots" :key="lot.id">
                <td style="border-right: 3px solid #dfdfdf; border-left: 3px solid #dfdfdf;">{{ lot.view_id }}</td>
                <td style="border-right: 3px solid #dfdfdf;">{{ lot.cpv_code }}{{ lot.cpv_drop && '/' }}{{ lot.cpv_drop }}</td>
                <td style="border-right: 3px solid #dfdfdf;">{{ lot.cpv_name }}</td>
                <td style="border-right: 3px solid #dfdfdf;">{{ lot.count * lot.unit_amount }}դր.</td>
                <template v-if="lot.participants.length">
                  <td style="border-right: 1px solid #dfdfdf;">{{ getMinPrice(lot) }}</td>
                  <td style="border-right: 1px solid #dfdfdf;">{{ getMinVat(lot) }}</td>
                  <td style="border-right: 3px solid #dfdfdf;"><b>{{ getMinPriceVat(lot) }}</b></td>
                </template>
                <template v-else>
                  <td style="border-right: 3px solid #dfdfdf;">-</td>
                  <td style="border-right: 3px solid #dfdfdf;">-</td>
                  <td style="border-right: 3px solid #dfdfdf;">-</td>
                </template>
                <td style="border-right: 3px solid #dfdfdf;">{{ lot.participants_list.length }}</td>
                <td style="border-right: 3px solid #dfdfdf;">
                  <template v-if="lot.winners.length">
                    <span :class="isMine(winner, lot) && 'font-weight-bold'" v-for="(winner, index) in lot.winners" :key="index">
                      {{ winner.name.hy }}
                    </span>
                  </template>
                  <template v-else-if="lot.participants.length">
                    <span :class="lot.participants[0].email === me.email && 'font-weight-bold'">
                      {{ lot.participants[0].name.hy }}
                    </span>
                  </template>
                  <template v-else>
                    <span>Չկա մասնակից</span>
                  </template>
                  <div>
                    <div class="dropdown" style="position: inherit; left: 0; right: 0;" v-if="lot.participants.length">
                      <span id="participant-list"
                            class="text-primary"
                            style="cursor: pointer"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Բոլոր Մասնակիցները
                        <i class="fas fa-angle-down"></i>
                      </span>
                      <div class="dropdown-menu" style="z-index: 9999" aria-labelledby="participant-list">
                        <p v-for="(participant, index) in lot.participants_list" :key="index" :class="participant.email === me.email && 'font-weight-bold'" class="dropdown-item m-0">
                          {{ participant.info.name.hy }} - {{ getCurrPrice(participant) }}դր.
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table> -->
        </template>
        <template v-else>

          <table class="participants-table table table-bordered table-hover m-0" style="border-collapse: collapse; border-spacing: 0; width: 100% !important;">
            <thead>
              <tr>
                <th style="border-right: 3px solid #dfdfdf;">Անուն</th>
                <th style="border-right: 3px solid #dfdfdf;">Ներկայացված ընդհանուր գին</th>
              </tr>
              <tr>
                <th colspan="2" style="border-right: 3px solid #dfdfdf;">Հաղթող</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {{winner.name}}
                </td>
                <td>
                  {{winner.won_lots[0].offer.total_price}}դր.
                </td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colspan="2" style="border-right: 3px solid #dfdfdf;">Բոլոր Մասնակիցներ</th>
              </tr>
            </thead>
            <tbody id="comparison-table" style="min-height: 5vh; max-height: 40vh !important; overflow: scroll">
              <tr v-for="participant in participants" :key="participant.id">
                <td>
                  {{participant.info.name.hy}}
                </td>
                <td>
                  {{participant.total_price}}դր.
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
      <div v-else>
        <div class="h-100 d-flex align-items-center justify-content-center">
          <div class="text-center p-3">
            <h5 class="font-size-24 m-3">Մասնակիցներ չլինելու պատճառով տվյալ գնման ընթացակարգը չի կայացել</h5>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ResultModal',
  data () {
    return {
      isSetEqual: false,
      isSuccess: true,
      isResponded: false,
      isNewParticipant: true,
      lotsWithError: [],
      participants: [],
      winners: [],
      winner: {},
      client: {},
      organize: {},
      data: [],
      organizedLots: [],
      attachedLotsForParticipant: [],
      focusedLotFields: {},
      lotsWithVatLength: 0,
      sugesstion: {},
      columns: [
        'index_number',
        'cpv',
        'name',
        'price',
        'min_price',
        'participants_count',
        'winner'
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
          index_number: 'Չ/Հ',
          cpv: 'CPV կոդ',
          name: 'Գնման առարկայի անվանում',
          price: 'Նախահաշվային ընդհանուր գին',
          min_price: 'Նվազագույն գնային առաջարկ (ՀՀ դրամ)',
          participants_count: 'Մասնակիցների քանակ',
          winner: 'Հաղթող մասնակից (ներ)',
        },
        filterable: false
      },
    }
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    consoleLog(data){
      console.log(data)
    },
    isMine(winner, lot){
      const winnerInfo = lot.participants_list.find(item => item.row_group_id === winner.participant_group_id);
      if(winnerInfo){
        const currentWinnerInfo = winnerInfo.user_info;
        return currentWinnerInfo.id === this.me.id
      } else {
        return false;
      }
    },
    beforeClose(){
      if(!this.organize.winner_by_lots){
        this.data.pop()
      }
    },
    beforeOpen({params}) {
      this.client = params.client
      this.resetComponent = params.resetComponent
      this.currSuggestionId = params.id
      this.organize = params.organize
      this.organizedLots = []
      if(this.organize.organize_rows.length){
        this.participants = this.organize.organize_rows[0].participants_list;
      }
      this.winner = this.organize.winners[0];
      console.log(this.winner)
      params.organize.organize_rows.forEach((element) => {
        const rowItem = {...element}
        rowItem.participants = element.participants.sort((a, b) => a.current_price_vat - b.current_price_vat).sort((a, b) => b.winner - a.winner);
        rowItem.winners = element.participants.filter(item => item.winner);
        rowItem.participants = element.participants.sort((a, b) => b.winner - a.winner);
        rowItem.satisfactory_participants = element.participants.filter((item) => item.is_satisfactory);
        this.organizedLots.push(rowItem);
      })
      this.$client.get(`suggestions/getByOrganizeId/${this.organize.id}`).then(({data}) => {
        if(data.participant){
          this.participant = data.participant
          this.isNewParticipant = false;
        }
        this.isResponded = Boolean(data.responded);
      })
      this.cleanData = this.organize.organize_rows
      this.data = this.organize.organize_rows
      if(!this.organize.winner_by_lots){
        if(this.data[this.data.length-1].is_total !== true){
          this.data.push({
            cpv_name: 'Ընդամենը',
            is_total: true
          })
        }
      }
      this.data.forEach((lot) => {
        if(lot.offers){
          const currUserOffer = lot.offers.find(item => item.participant_id ===  this.me.id);
          if(currUserOffer){
            lot.value = currUserOffer.value
            lot.overall = currUserOffer.cost
            lot.vat = currUserOffer.vat
            lot.is_with_vat = currUserOffer.vat ? 1 : 0
          }
        }
      })
      this.winners = [this.winner]
    },
    roundTwoDigits(number){
      return Math.round(number * 100) / 100
    },
    getCurrPrice(participant){
      var currentPrice = participant.cost;
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
  }
}
</script>
<style scoped>
  @media (max-width: 768px) {
    .result-modal /deep/ .vm--modal {
      height: 90% !important;
      margin: auto 20px;
      width: auto !important;
      top: 0 !important;
      bottom: 0 !important;
      right: 0 !important;
      left: 0 !important;
      position: absolute;
    }

  }
  .searchItem:hover {
    background-color: #006BE6;
    color: #fff;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

