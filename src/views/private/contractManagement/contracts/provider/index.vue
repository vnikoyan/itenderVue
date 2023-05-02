<template>
  <div class="h-100">
    <div class="row m-0 p-0">
      <div :class="isMobile ? 'col-12 text-center' : 'col-auto p-0'">
        <div class="d-inline-block page-title-box-spacing">
          <div class="d-flex align-items-center topbar-right-spacing name-header" :class="isMobile && 'm-0'">
            <div>Պայմանագրերի կառավարում</div>
          </div>
        </div>
      </div>
      <template v-if="isMobile">
        <div class="col-12 text-center p-0">
          <select @change="selectPage" class="contract-managment-select">
            <option value="/participant/contract-management/requests">
              Պայմանագրի առաջարկ
              <span v-if="menuNotifications.unseen_contract_requests">
                ({{menuNotifications.unseen_contract_requests}})
              </span>
            </option>
            <option selected value="/participant/contract-management/contracts">Պայմանագրեր</option>
            <option value="/participant/contract-management/orders/active">
                Ստացված պատվերներ  
                <span v-if="menuNotifications.active_orders">
                  ({{menuNotifications.active_orders}})
                </span></option>
          </select>
        </div>
      </template>
      <template v-else>
        <div class="col-auto">
          <div class="d-inline-block">
            <ul class="nav nav-tabs align-items-end suggestions-tab" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="home-tab" data-toggle="tab" href="#all" @click.prevent="$router.push('/participant/contract-management/requests')" role="tab" aria-controls="home" aria-selected="true">
                  Պայմանագրի առաջարկ
                  <span v-if="menuNotifications.unseen_contract_requests">
                    ({{menuNotifications.unseen_contract_requests}})
                  </span>
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#accepted" @click.prevent="$router.push('/participant/contract-management/contracts')" role="tab" aria-controls="profile" aria-selected="false">
                  Պայմանագրեր
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#signature" @click.prevent="$router.push('/participant/contract-management/orders/active')" role="tab" aria-controls="contact" aria-selected="false">
                  Ստացված պատվերներ
                  <span v-if="menuNotifications.active_orders">
                    ({{menuNotifications.active_orders}})
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <div class="tab-content content-height" :class="isMobile ? 'suggestions-tab-content-mobile' : 'suggestions-tab-content'" id="myTabContent">
      <div class="tab-pane fade show active h-100" id="all" role="tabpanel" aria-labelledby="all-tab">
        <div class="card h-100">
          <div class="card-body p-0">
            <div class="row w-100 m-0">
              <div class="col-12 tenders-list p-0">
                  <v-server-table
                    ref="vtable"
                    :url="`${proxyUrl}contract/getByProvider`"
                    :options="options"
                    :columns="columns"
                    @loaded="({data}) => onLoaded(data)"
                  >
                    <div slot="index_number" class="d-flex justify-content-start align-items-center h-100" slot-scope="{index}">
                      <span style="width: 20px">{{ index }}</span>
                    </div>
                    <div slot="client_name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{ row.client.name }}</span>
                    </div>
                    <div slot="sign_date" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span style="width: 100px">{{ row.is_full ? row.sign_date : '-' }}</span>
                    </div>
                    <div slot="price" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      {{ row.is_full ? `${row.price}դր.` : '-' }}
                    </div>
                    <div slot="total_leftover" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                     {{ row.is_full ? `${parseFloat(getContractLeftover(row).toFixed(2))}դր.` : '-' }}
                    </div>
                    <div slot="details" class="d-flex justify-content-center flex-wrap flex-column" slot-scope="{row}">
                        <div :class="(row.from_application && row.is_full) ? 'col' : 'col'" class=" p-0">
                          <button
                            v-if="row.from_application && !row.is_full"
                            @click.stop="() => { 
                              $modal.show('fill-contract-details-modal', {...row, resetComponent})
                            }"
                            type="button"
                            class="btn btn-primary w-100"
                          >
                            <span>Լրացնել մանրամասները</span>
                          </button>
                          <button
                            v-if="row.is_full"
                            @click.stop="() => { 
                              $modal.show('contract-details-modal', {...row, resetComponent})
                            }"
                            type="button" 
                            class="btn btn-light w-100"
                          >
                            <span>Մանրամասներ</span>
                          </button>
                        </div>
                        <div v-if="row.from_application && row.is_full" class="col p-0 pt-2">
                          <div
                            class="p-0"
                            v-tooltip="!row.is_sign && 'Պայմանագիրը դեռ չի հաստատվել մասնակցի կողմից'"
                          >
                            <button
                              @click="() => { 
                                $modal.show('order-modal', {contract: row, resetComponent}) 
                              }"
                              :disabled="!row.is_sign"
                              type="button" 
                              class="btn btn-primary w-100"
                            >
                              <span>Գրանցել պատվեր</span>
                            </button>
                          </div>
                        </div>
                    </div>
                    <div slot="contract" class="d-flex flex-wrap justify-content-start align-items-center h-100" slot-scope="{row}">
                      <div class="row p-0 m-0 w-100">
                        <button
                          v-if="row.organize && (row.organize.type === 'itender' && row.organize.report_document)"
                          @click.stop="() => { 
                            $modal.show('report-document-modal', {contract: row}) 
                          }"
                          type="button" 
                          class="btn btn-light d-flex align-items-center justify-content-center col-12 my-1"
                        >
                          <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.791016 10.7619C0.791016 11.3571 1.26721 11.8333 1.86244 11.8333H10.1363C10.7315 11.8333 11.2077 11.3571 11.2077 10.7619V1.23805C11.2077 0.642816 10.7315 0.166626 10.1363 0.166626H1.86244C1.26721 0.166626 0.791016 0.642816 0.791016 1.23805V10.7619ZM10.2553 10.8809H1.7434V1.11901H10.2553V10.8809ZM3.35055 2.72625H8.7077V3.67863H3.35055V2.72625ZM8.7077 8.3213H3.35055V9.27368H8.7077V8.3213ZM3.35055 5.52377H8.7077V6.47615H3.35055V5.52377Z" fill="#006BE6"/>
                          </svg>
                          <span>Հաշվետվություն</span>
                        </button>
                        <button
                          v-if="!row.from_application && (row.participant && row.participant.contract_document)"
                          @click.stop="() => { 
                            $modal.show('contract-document-modal', {contract: row}) 
                          }"
                          type="button"
                          class="btn btn-light col-12 my-1"
                        >
                          <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.791016 10.7619C0.791016 11.3571 1.26721 11.8333 1.86244 11.8333H10.1363C10.7315 11.8333 11.2077 11.3571 11.2077 10.7619V1.23805C11.2077 0.642816 10.7315 0.166626 10.1363 0.166626H1.86244C1.26721 0.166626 0.791016 0.642816 0.791016 1.23805V10.7619ZM10.2553 10.8809H1.7434V1.11901H10.2553V10.8809ZM3.35055 2.72625H8.7077V3.67863H3.35055V2.72625ZM8.7077 8.3213H3.35055V9.27368H8.7077V8.3213ZM3.35055 5.52377H8.7077V6.47615H3.35055V5.52377Z" fill="#006BE6"/>
                          </svg>
                          <span>Պայմանագիր</span>
                        </button>
                      </div>
                    </div>
                    <div slot="delete" class="d-flex justify-content-start align-items-center h-100">
                      <i class="mdi mdi-delete text-danger" style="font-size: 30px; cursor: pointer;"></i>
                    </div>
                  </v-server-table>
              </div>
              <order-modal />
              <contract-details-modal />
              <fill-contract-details-modal @updateComparisonData="resetComponent"/>
              <specification-modal />
              <contract-document-modal />
              <report-document-modal />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SpecificationModal from '@/components/modals/SpecificationModal'
  import ContractDocumentModal from '@/components/modals/ContractDocumentModal'
  import ReportDocumentModal from '@/components/modals/ReportDocumentModal'
  import OrderModal from './modals/OrderModal'
  import ContractDetailsModal from './modals/ContractDetailsModal'
  import FillContractDetailsModal from './modals/FillContractDetailsModal'
  import isMobile from '@/mixins/isMobileView'

  export default {
    name: 'contracts',
    mixins: [isMobile],
    data() {
      return {
        proxyUrl: process.env.VUE_APP_API_URL,
        columns: ['index_number', 'code', 'client_name', 'sign_date', 'price', 'total_leftover', 'contract', 'details'],
        options: {
          rowClassCallback: function(row) {
            if(!row.is_full){
              return 'bg-light'
            }
          },
          sortable: [],
          requestFunction(data) {
            return this.$client.get(this.url, {params: data})
            .catch(function (e) {this.dispatch('error', e)})
          },
          columnsDropdown: false,
          pagination: { chunk: 1 },
          filterByColumn: false,
          dateColumns: ['create_date','end_date'],
          skin: 'table table-hover',
          dateFormat: "YYYY-mm-dd",
          headings: {
            index_number: 'Հ/Հ',
            code: 'Պայմանագրի ծածկագիր',
            client_name: 'Պատվիրատուի անվանում',
            sign_date: 'Կնքման ամսաթիվ',
            price: 'Ընդհանուր արժեք',
            total_leftover: 'Ընդհանուր մնացորդ ըստ պատվերների',
            contract: '',
            final_date: 'Վերջնաժամկետ',
            details: '',
          },
          filterable: true,
        },
        filters: {
          status: { name: 'Բոլորը', value: 'all' },
          statusOptions: [
            { name: 'Բոլորը', value: 'all' },
            { name: 'Ակտիվ առաջարկներ', value: 'active' },
            { name: 'Ավարտված առաջարկներ', value: 'finished' },
          ],
        }
      }
    },
    components: {SpecificationModal, ContractDetailsModal, ContractDocumentModal, FillContractDetailsModal, OrderModal, ReportDocumentModal},
    computed: {
      menuNotifications() {
        return this.$store.getters["user/menuNotifications"];
      },
      locale() {
        return this.$store.getters['user/locale']
      },
      me() {
        return this.$store.getters['user/me']
      },
    },
    methods: {
      consoleLog(e){
        console.log(e)
      },
      selectPage(event){
        this.$router.push(event.target.value)
      },
      onLoaded({data}){
        const contractId = this.$route.params.id
        if(contractId){
          const contract = data.find(item => item.id === +contractId)
          this.$modal.show('order-modal', {contract: contract})
        }
      },
      getContractLeftover(row){
        const { lots } = row
        var leftover = 0;
        lots.forEach((lot) => {
          const count = lot.available + lot.supplied + lot.ordered;
          const priceUnit = lot.price / count
          leftover += +lot.available * priceUnit
        })
        return leftover;
      },
      async resetComponent() {
        await this.$refs.vtable.refresh()
      },
    },
  }
</script>