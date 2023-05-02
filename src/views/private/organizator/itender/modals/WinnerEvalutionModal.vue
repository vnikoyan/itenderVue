<template>
  <modal 
    class="winner-evalution-modal"
    name="winner-evalution-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
  >
    <div id="modal-header" style="background-color:#006BE6">
      <div class="w-75 d-flex text-white">
        <p>Մասնակիցներրի գնահատում</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('winner-evalution-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ffffff"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <template v-if="participants.length === 0">
        <div class="h-100 d-flex align-items-center justify-content-center">
          <div class="text-center p-3">
            <h5 class="font-size-24 m-3">Գնահատման ենթակա մասնակիցներ չկան</h5>
          </div>
        </div>
      </template>
      <div v-else class="d-flex">
        <div class="col-md-12 p-0">
          <template v-if="isMobile">
            <table class="table table-borderless VueTables__table table table-striped table-border-radius">
              <tbody>
                <div id="accordion">
                  <div class="row-mobile" v-for="(participant, participantIndex) in participants" :key="participant.id">
                    <div class="mobile-card m-0">
                        <div class="mobile-table-header" :id="`heading-${participantIndex}`">
                            <div data-toggle="collapse" class="collapsed" :data-target="`#collapse-${participantIndex}`" aria-expanded="false" :aria-controls="`#collapse-${participantIndex}`">
                                <div class="row m-0 p-0 justify-content-between">
                                    <div class="col-10 p-0">
                                        <div class="row m-0 p-0 card-header-text">
                                            <div class="col-auto little-col">
                                                {{ participantIndex + 1 }}
                                            </div>
                                            <div class="col p-0 d-flex align-items-center">
                                                {{ participant.name }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2 p-0 d-flex align-items-center justify-content-end">
                                        <svg width="14" height="8" viewBox="0 0 14 8">
                                            <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :id="`collapse-${participantIndex}`" class="collapse" :aria-labelledby="`heading-${participantIndex}`">
                          <div class="card-body mobile-table-row-body">
                            <div class="mobile-table-row">
                              <label class="cell-name mr-1">Կցված փաստաթղթեր`</label>
                              <div class="cell-name" v-if="participant.additional_file">
                                <a 
                                  :href="participant.additional_file"
                                  target="_blank"
                                  download
                                  class="btn btn-light "
                                >
                                  <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52148 12.7617C3.52148 13.357 3.99767 13.8332 4.59291 13.8332H12.8667C13.462 13.8332 13.9381 13.357 13.9381 12.7617V3.23793C13.9381 2.64269 13.462 2.1665 12.8667 2.1665H4.59291C3.99767 2.1665 3.52148 2.64269 3.52148 3.23793V12.7617ZM12.9858 12.8808H4.47387V3.11888H12.9858V12.8808ZM6.08102 4.72613H11.4382V5.67851H6.08102V4.72613ZM11.4382 10.3212H6.08102V11.2736H11.4382V10.3212ZM6.08102 7.52365H11.4382V8.47603H6.08102V7.52365Z" fill="#006BE6"/>
                                  </svg>
                                  <span>Բեռնել</span>
                                </a>
                              </div>
                              <div :key="`${participantIndex} + ${lot.id}`" v-for="(lot, lotIndex) in participant.lots">
                                <label class="cell-name">Չ/Հ</label>`
                                <span class="ml-2">{{lot.row.view_id}}</span>
                                <label class="cell-name d-block">Գնման առարկա`</label>
                                <p>{{lot.cpv.name}}</p>
                                <label class="cell-name">Ներկայացված գին`</label>
                                <p>{{lot.cost}}</p>
                                <label class="cell-name">Ներկայացված տեխնիկական բնութագիր`</label>
                                <p>{{lot.specification}}</p>
                                
                                <div>
                                  <template v-if="winnerByLots">
                                    <div :style="lotIndex === 0 ? 'border: none' : ''">
                                      <template v-if="organizeType !== 3">
                                        <div class="form-check d-inline-block">
                                          <label>
                                          <input 
                                            v-model="lot.is_satisfactory"
                                            :value="1"
                                            class="form-check-input"
                                            type="radio"
                                            :name="`is_satisfactory-${lot.id}-${participant.id}`"
                                            :id="`is_satisfactory-${lot.id}-${participant.id}`"
                                          >
                                          <label class="form-check-label" :for="`is_satisfactory-${lot.id}-${participant.id}`">
                                            Բավարար
                                          </label>
                                          </label>
                                        </div>
                                        <div class="form-check d-inline-block ml-2">
                                          <label>
                                          <input
                                            v-model="lot.is_satisfactory"
                                            :value="0"
                                            class="form-check-input"
                                            type="radio"
                                            :name="`is_satisfactory-false-${lot.id}-${participant.id}`"
                                            :id="`is_satisfactory-false-${lot.id}-${participant.id}`"
                                          >
                                          <label class="form-check-label" :for="`is_satisfactory-false-${lot.id}-${participant.id}`">
                                            Անբավարար
                                          </label>
                                          </label>
                                        </div>
                                        <div v-if="!lot.is_satisfactory" class="form-group text-left my-2">
                                          <label :for="`reason-${lot.id}-${participant.id}`">Հիմնավորում</label>
                                          <textarea v-model="lot.rejection_reason" class="form-control br-8" :id="`reason-${lot.id}-${participant.id}`" rows="3"></textarea>
                                        </div>
                                      </template>
                                      <template v-else>
                                        <label class="cell-name mr-2">Հաղթող՝</label>
                                        <input
                                          v-model="winnerRows[lot.organize_row_id]"
                                          :name="`winner-${lot.organize_row_id}`"
                                          :id="`winner-${lot.organize_row_id}`"
                                          :value="participant.id"
                                          type="radio" 
                                        >
                                      </template>
                                    </div>
                                  </template>
                                  <template v-else>
                                    <div v-if="lotIndex === 0" :rowspan="participant.lots.length + 1">
                                      <template v-if="organizeType !== 3">
                                        <div class="form-check d-inline-block">
                                          <input 
                                            v-model="lot.is_satisfactory"
                                            :value="1"
                                            class="form-check-input"
                                            type="radio"
                                            :name="`is_satisfactory-${lot.id}-${participant.id}`"
                                            :id="`is_satisfactory-${lot.id}-${participant.id}`"
                                          >
                                          <label class="form-check-label" :for="`is_satisfactory-${lot.id}-${participant.id}`">
                                            Բավարար
                                          </label>
                                        </div>
                                        <div class="form-check d-inline-block ml-2">
                                          <input
                                            v-model="lot.is_satisfactory"
                                            :value="0"
                                            class="form-check-input"
                                            type="radio"
                                            :name="`is_satisfactory-false-${lot.id}-${participant.id}`"
                                            :id="`is_satisfactory-false-${lot.id}-${participant.id}`"
                                          >
                                          <label class="form-check-label" :for="`is_satisfactory-false-${lot.id}-${participant.id}`">
                                            Անբավարար
                                          </label>
                                        </div>
                                        <div v-if="!lot.is_satisfactory" class="form-group text-left my-2">
                                          <label :for="`reason-${lot.id}-${participant.id}`">Հիմնավորում</label>
                                          <textarea v-model="lot.rejection_reason" class="form-control br-8" :id="`reason-${lot.id}-${participant.id}`" rows="3"></textarea>
                                        </div>
                                      </template>
                                      <template v-else>
                                        <label class="cell-name mr-2">Հաղթող՝</label>
                                        <input v-model="winnerId" type="radio" id="winner" name="winner" :value="participant.id">
                                      </template>
                                    </div>
                                  </template>
                                </div>
                                <hr v-if="winnerByLots && lotIndex !== participant.lots.length-1"/>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </tbody>
            </table>
          </template>
          <template v-else>
            <table class="evalution-table table table-borderless table table-striped table-border-radius" style="border-collapse: collapse; border-spacing: 0; width: 100% !important;;">
              <thead>
                <tr>
                  <th style="width: 120px;">Հ/Հ</th>
                  <th>Անվանում</th>
                  <th>Գնման առարկա</th>
                  <th>Ներկայացված գին</th>
                  <th>Ներկայացված տեխնիկական բնութագիր</th>
                  <th>Կցված փաստաթղթեր</th>
                  <th>
                    <template v-if="organizeType !== 3">
                      Գնահատում
                    </template>
                    <template v-else>
                      Հաղթող
                    </template>
                  </th>
                </tr>
              </thead>
              <tbody v-if="participants.length" id="comparison-table">
                <template v-for="(participant, participantIndex) in participants">
                  <tr :key="participant.id">
                    <td :rowspan="participant.lots.length + 1">{{ participantIndex + 1 }}</td>
                    <td :rowspan="participant.lots.length + 1">{{ participant.name }}</td>
                  </tr>
                  <template>
                    <tr
                      :key="`${participantIndex} + ${lot.id}`"
                      v-for="(lot, lotIndex) in participant.lots"
                      :style="lotIndex === participant.lots.length - 1 && participantIndex !== participants.length -1 ? 'border-bottom: 1px solid #edeff2;' : ''"
                    >
                      <td :style="lotIndex === 0 ? 'border: none' : ''">{{lot.cpv.name}}</td>
                      <td :style="lotIndex === 0 ? 'border: none' : ''">{{lot.cost}}</td>
                      <td :style="lotIndex === 0 ? 'border: none' : ''">{{lot.specification}}</td>
                      <template v-if="winnerByLots">
                        <td :style="lotIndex === 0 ? 'border: none' : ''">
                          <div v-if="participant.additional_file" class="col-auto p-0 justify-content-start my-2">
                            <a 
                              :href="participant.additional_file"
                              target="_blank"
                              download
                              class="btn btn-light "
                            >
                              <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52148 12.7617C3.52148 13.357 3.99767 13.8332 4.59291 13.8332H12.8667C13.462 13.8332 13.9381 13.357 13.9381 12.7617V3.23793C13.9381 2.64269 13.462 2.1665 12.8667 2.1665H4.59291C3.99767 2.1665 3.52148 2.64269 3.52148 3.23793V12.7617ZM12.9858 12.8808H4.47387V3.11888H12.9858V12.8808ZM6.08102 4.72613H11.4382V5.67851H6.08102V4.72613ZM11.4382 10.3212H6.08102V11.2736H11.4382V10.3212ZM6.08102 7.52365H11.4382V8.47603H6.08102V7.52365Z" fill="#006BE6"/>
                              </svg>
                              <span>Բեռնել</span>
                            </a>
                          </div>
                        </td>
                      </template>
                      <template v-else>
                        <td v-if="lotIndex === 0" :rowspan="participant.lots.length + 1">
                          <div v-if="participant.additional_file" class="col-auto p-0 justify-content-start my-2">
                            <a 
                              :href="participant.additional_file"
                              target="_blank"
                              download
                              class="btn btn-light "
                            >
                              <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52148 12.7617C3.52148 13.357 3.99767 13.8332 4.59291 13.8332H12.8667C13.462 13.8332 13.9381 13.357 13.9381 12.7617V3.23793C13.9381 2.64269 13.462 2.1665 12.8667 2.1665H4.59291C3.99767 2.1665 3.52148 2.64269 3.52148 3.23793V12.7617ZM12.9858 12.8808H4.47387V3.11888H12.9858V12.8808ZM6.08102 4.72613H11.4382V5.67851H6.08102V4.72613ZM11.4382 10.3212H6.08102V11.2736H11.4382V10.3212ZM6.08102 7.52365H11.4382V8.47603H6.08102V7.52365Z" fill="#006BE6"/>
                              </svg>
                              <span>Բեռնել</span>
                            </a>
                          </div>
                        </td>
                      </template>
                      <template v-if="winnerByLots">
                        <td :style="lotIndex === 0 ? 'border: none' : ''">
                          <template v-if="organizeType !== 3">
                            <div class="form-check mb-2">
                              <label>
                              <input 
                                v-model="lot.is_satisfactory"
                                :value="1"
                                class="form-check-input"
                                type="radio"
                                :name="`is_satisfactory-${lot.id}-${participant.id}`"
                                :id="`is_satisfactory-${lot.id}-${participant.id}`"
                              >
                              <label class="form-check-label" :for="`is_satisfactory-${lot.id}-${participant.id}`">
                                Բավարար
                              </label>
                              </label>
                            </div>
                            <div class="form-check">
                              <label>
                              <input
                                v-model="lot.is_satisfactory"
                                :value="0"
                                class="form-check-input"
                                type="radio"
                                :name="`is_satisfactory-false-${lot.id}-${participant.id}`"
                                :id="`is_satisfactory-false-${lot.id}-${participant.id}`"
                              >
                              <label class="form-check-label" :for="`is_satisfactory-false-${lot.id}-${participant.id}`">
                                Անբավարար
                              </label>
                              </label>
                            </div>
                            <div v-if="!lot.is_satisfactory" class="form-group text-left my-2">
                              <label :for="`reason-${lot.id}-${participant.id}`">Հիմնավորում</label>
                              <textarea v-model="lot.rejection_reason" class="form-control br-8" :id="`reason-${lot.id}-${participant.id}`" rows="3"></textarea>
                            </div>
                          </template>
                          <template v-else>
                            <input
                              v-model="winnerRows[lot.organize_row_id]"
                              :name="`winner-${lot.organize_row_id}`"
                              :id="`winner-${lot.organize_row_id}`"
                              :value="participant.id"
                              type="radio" 
                            >
                          </template>
                        </td>
                      </template>
                      <template v-else>
                        <td v-if="lotIndex === 0" :rowspan="participant.lots.length + 1">
                          <template v-if="organizeType !== 3">
                            <div class="form-check mb-2">
                              <input 
                                v-model="lot.is_satisfactory"
                                :value="1"
                                class="form-check-input"
                                type="radio"
                                :name="`is_satisfactory-${lot.id}-${participant.id}`"
                                :id="`is_satisfactory-${lot.id}-${participant.id}`"
                              >
                              <label class="form-check-label" :for="`is_satisfactory-${lot.id}-${participant.id}`">
                                Բավարար
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                v-model="lot.is_satisfactory"
                                :value="0"
                                class="form-check-input"
                                type="radio"
                                :name="`is_satisfactory-false-${lot.id}-${participant.id}`"
                                :id="`is_satisfactory-false-${lot.id}-${participant.id}`"
                              >
                              <label class="form-check-label" :for="`is_satisfactory-false-${lot.id}-${participant.id}`">
                                Անբավարար
                              </label>
                            </div>
                            <div v-if="!lot.is_satisfactory" class="form-group text-left my-2">
                              <label :for="`reason-${lot.id}-${participant.id}`">Հիմնավորում</label>
                              <textarea v-model="lot.rejection_reason" class="form-control br-8" :id="`reason-${lot.id}-${participant.id}`" rows="3"></textarea>
                            </div>
                          </template>
                          <template v-else>
                            <input v-model="winnerId" type="radio" id="winner" name="winner" :value="participant.id">
                          </template>
                        </td>
                      </template>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </template>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button :disabled="isLoading || participants.length === 0" @click="save" class="btn btn-primary br-8">
        <span v-if="isLoading" class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
import isMobile from '@/mixins/isMobileView'
  import RowTemplate from '@/components/tenders/row'
  export default {
    name: 'WinnerEvalutionModal',
    mixins: [isMobile],
    components: {  },
    templates: {
			RowTemplate
		},
    data() {
      return {
        columns: [
          'index_number',
          'name',
          'lots',
          'cost',
          'specification',
          'action',
        ],
        options: {
          childRow: RowTemplate,
          sortable: [],
          perPage: 1000,
          perPageValues: [],
          columnsDropdown: false,
          filterByColumn: false,
          skin: 'table table-striped table-border-radius',
          dateFormat: "YYYY-mm-dd",
          headings: {
            index_number: 'Հ/Հ',
            name: 'Անվանում',
            lots: 'Գնման առարկա',
            cost: 'Ներկայացված գին',
            specification: 'Ներկայացված տեխնիկական բնութագիր',
            action: this.organizeType !== 3 ? 'Գնահատում' : 'Հաղթող',
          },
          filterable: false
        },
        isLoading: false,
        participantGroup: {},
        winnerByLots: false,
        is_satisfactory: 1,
        participants: [],
        organizeType: 1,
        winnerId: 0,
        winnerRows: {},
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organizeItender/currentOrganized']
      },
      organizedRowsList() {
        return this.$store.getters['organizeItender/organizedRows']
      },
    },
    methods: {
      consoleLog(msg) {
        console.log(msg)
      },
      handleBeforeOpen({params}) {
        this.organizeType = this.organizedRowsList[0].type
        this.organizedRowsList.forEach((row) => {
          const rowId = row.id;
          this.winnerRows[rowId] = row.winner.id;
        })
        if(this.currentOrganized.winners.length){
          this.winnerId = this.currentOrganized.winners[0].id;
        }
        console.log(this.currentOrganized.participants)
        this.participants = Object.assign(this.currentOrganized.participants)
        this.participants.forEach((participant) => {
          participant.lots.forEach((lot) => {
            lot.cpv = lot.row.procurement_plan.is_from_outside ? 
                      lot.row.procurement_plan.cpv_outside : lot.row.procurement_plan.cpv
          })
        })
        console.log(this.participants)
        this.winnerByLots = this.currentOrganized.winner_by_lots
      },
      save() {
        if(this.organizeType === 1){
          this.$client.post(`organize/itender/evalution/${this.currentOrganized.id}`, this.participants).then(({data: {data}}) => {
            if(data) {
              this.$store.commit('organizeItender/setCurrentOrganized', data)
              this.$modal.hide('winner-evalution-modal')
            }
          })
        } else if(this.organizeType === 3){
          let requestData = {winner: this.winnerId}
          if(this.currentOrganized.winner_by_lots){
            requestData = {winnerRows: this.winnerRows}
          }
          this.$client.post(`organize/itender/setWinner/${this.currentOrganized.id}`, requestData).then(({data: {data}}) => {
            if(data) {
              this.$store.commit('organizeItender/setCurrentOrganized', data)
              this.$modal.hide('winner-evalution-modal')
            }
          })
        }
      }
    },
  }
</script>

<style scoped>
  input[type=radio] {
    width: 20px;
    transform: scale(1.5);
  }
  tr{
    background: transparent !important;
  }
</style>