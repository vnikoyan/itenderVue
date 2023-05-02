<template>
<div class="h-100">
  <div class="page-title-box-spacing">
    <template v-if="isMobile">
      <div class="row m-0 p-0">
        <div class="col-12 text-center">
          <div class="d-inline-block">
            <div class="d-flex align-items-center topbar-right-spacing name-header" :class="isMobile && 'm-0'">
              <div>Պայմանագրերի պատրաստում</div>
            </div>
          </div>
        </div>
        <div class="col-12 p-0 text-center">
          <div class="d-flex flex-column padding-t-20 justify-content-center tender-buttons">
            <div class="col-auto pl-md-0">
              <Actions />
            </div>
            <div class="col-auto pl-md-0 padding-t-20">
              <Documents mobile-view="false"/>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="d-flex justify-content-between align-items-center">
        <div class="col-5 p-0">
          <div class="d-inline-block">
            <div class="d-flex align-items-center topbar-right-spacing name-header">
              <div>Պայմանագրերի պատրաստում</div>
            </div>
          </div>
        </div>
        <div class="col-auto p-0">
          <div class="d-flex tender-buttons">
            <div class="col-auto p-0 pl-md-0">
              <Actions />
            </div>
            <div class="col-auto p-0 pl-md-0">
              <Documents />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div class="row p-0 mx-0 content-height">
    <div class="card col-12 p-0">
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
                <h5 class="font-size-24 m-3">Մասնակիցներ չլինելու պատճառով տվյալ գնման ընթացակարգը չի կայացել</h5>
                <button @click="cancelOrganize" class="btn btn-primary">
                  <span>Ընթացակարգը համարել չկայացած</span>
                </button>
            </div>
          </div>
        </template>
        <template v-else-if="currentOrganized.winners">
          <v-client-table ref="vtable" :columns="columns" v-model="currentOrganized.winners" :options="options">
            <div slot="index_number" class="d-flex justify-content-start align-items-center h-100" slot-scope="{index}">
              <span>{{ index }}</span>
            </div>
            <div slot="requirements" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
              <button
                @click.prevent="() => {
                  $modal.show('winner-requirements-modal', row)
                }"
                type="button" 
                class="btn"
                :class="row.director ? 'btn-primary' : 'btn-secondary'"
              >
                  <span>Լրացնել</span>
              </button>
            </div>
            <div slot="lots" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
              <span
                :key="lot.toString() + lotIndex"
                v-for="(lot, lotIndex) in row.won_lots">
                  {{lot.is_from_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name}}<span v-if="lotIndex !== row.won_lots.length-1">,</span>
              </span>
            </div>
            <div slot="contract_price" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
              <span v-if="Number.isInteger(getContractPrice(row))"> {{ getContractPrice(row) }}դր.</span>
              <span v-else> {{ getContractPrice(row) }}դր.</span>
            </div>
            <div slot="docs" class="d-flex flex-wrap justify-content-start align-items-center h-100" slot-scope="{row, index}">
              <div class="col-auto p-0 pr-3 justify-content-start align-items-center" v-if="getIsSigned(row)" >
                Կնքված է
              </div>
              <div v-if="row.suggestion.additional_file" class="col-auto p-0 justify-content-start my-2">
                <a 
                  :href="row.suggestion.additional_file"
                  target="_blank"
                  download
                  class="btn btn-light "
                >
                  <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52148 12.7617C3.52148 13.357 3.99767 13.8332 4.59291 13.8332H12.8667C13.462 13.8332 13.9381 13.357 13.9381 12.7617V3.23793C13.9381 2.64269 13.462 2.1665 12.8667 2.1665H4.59291C3.99767 2.1665 3.52148 2.64269 3.52148 3.23793V12.7617ZM12.9858 12.8808H4.47387V3.11888H12.9858V12.8808ZM6.08102 4.72613H11.4382V5.67851H6.08102V4.72613ZM11.4382 10.3212H6.08102V11.2736H11.4382V10.3212ZM6.08102 7.52365H11.4382V8.47603H6.08102V7.52365Z" fill="#006BE6"/>
                  </svg>
                  <span>Կցված փաստաթղթեր</span>
                </a>
              </div>
              <div v-if="currentOrganized.contract_html_hy !== ''" class="col-auto p-0 justify-content-start my-2">
                <button class="btn btn-light"
                  :disabled="row.director===''"
                  @click.prevent="() => {
                    $modal.show('contract-modal', {index, winner: row})
                  }"
                >
                  <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52148 12.7617C3.52148 13.357 3.99767 13.8332 4.59291 13.8332H12.8667C13.462 13.8332 13.9381 13.357 13.9381 12.7617V3.23793C13.9381 2.64269 13.462 2.1665 12.8667 2.1665H4.59291C3.99767 2.1665 3.52148 2.64269 3.52148 3.23793V12.7617ZM12.9858 12.8808H4.47387V3.11888H12.9858V12.8808ZM6.08102 4.72613H11.4382V5.67851H6.08102V4.72613ZM11.4382 10.3212H6.08102V11.2736H11.4382V10.3212ZM6.08102 7.52365H11.4382V8.47603H6.08102V7.52365Z" fill="#006BE6"/>
                  </svg>
                  <span>Պայմանագիր</span>
                </button>
              </div>
            </div>
          </v-client-table>
        </template>
      </template>
      <winner-requirements-modal @updateComparisonData="resetData"/>
      <winner-lots-edit-modal @updateComparisonData="resetData"/>
      <contract-request-modal @updateComparisonData="resetData"/>
      <winner-evalution-modal @updateComparisonData="resetData"/>
      <new-editor-modal />
      <contract-modal />
      <editor-modal />
    </div>
  </div>
</div>
</template>

<script>
  import WinnerLotsEditModal from './modals/WinnerLotsEditModal'
  import WinnerEvalutionModal from './modals/WinnerEvalutionModal'
  import ContractRequestModal from './modals/ContractRequestModal'
  import NewEditorModal from '@/views/fileManagment/itender/NewEditorModal'
  import ContractModal from './modals/ContractModal'
  import EditorModal from '@/views/fileManagment/EditorModal'
  import Documents from '@/components/dropdown/documents'
  import Actions from '@/components/dropdown/actions'
  import isMobile from '@/mixins/isMobileView'
  import WinnerRequirementsModal from '@/components/organize/WinnerRequirementsModal'

  export default {
    name: "ContractPreparation",
    mixins: [isMobile],
    components: {
      Actions,
      Documents,
      WinnerRequirementsModal,
      WinnerEvalutionModal,
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
        columns: [
          'index_number',
          'name',
          'phone',
          'email',
          'requirements',
          'lots',
          'contract_price',
          'docs',
        ],
        options: {
          sortable: [],
          perPage: 10,
          perPageValues: [],
          columnsDropdown: false,
          filterByColumn: false,
          skin: 'table',
          dateFormat: "YYYY-mm-dd",
          headings: {
            index_number: 'Հ/Հ',
            name: 'Մասնակցի անվանում',
            phone: 'Մասնակցի հեռախոսահամար',
            email: 'Մասնակցի Էլ. հասցե',
            requirements: 'Մասնակցի վավերապայմաներ',
            lots: 'Գնման առարկաներ',
            contract_price: 'Պայմանագրի գումար',
            docs: 'Փաստաթղթեր',
          },
          filterable: false
        },
      }
    },
    computed: {
      locale() {
        return this.$store.getters["user/locale"];
      },
      currentOrganized() {
        return this.$store.getters['organizeItender/currentOrganized']
      },
    },
    mounted() {
      this.$store.dispatch('organizeItender/getCurrent', this.$route.params.id)
      this.$store.dispatch('organizeItender/getRows', {organizeId: this.$route.params.id}).then((value) => {
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
          this.$client.get(`organize/itender/cancel/${this.currentOrganized.id}`).then(({data}) => {
            if(data.status){
              this.$router.push('/organizing/itender')
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
        this.$store.dispatch('organizeItender/getCurrent', this.$route.params.id)
        this.$store.dispatch('organizeItender/getRows', {organizeId: this.$route.params.id})
      },
    },
  }
</script>

<style scoped>
.fa-file-download{
  cursor: pointer;
}
</style>
