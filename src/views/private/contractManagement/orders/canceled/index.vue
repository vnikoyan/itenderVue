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
            <option value="/participant/contract-management/contracts">Պայմանագրեր</option>
            <option selected value="/participant/contract-management/orders/active">
              Ստացված պատվերներ  
              <span v-if="menuNotifications.active_orders">
                ({{menuNotifications.active_orders}})
              </span>
            </option>
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
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#accepted" @click.prevent="$router.push('/participant/contract-management/contracts')" role="tab" aria-controls="profile" aria-selected="false">
                  Պայմանագրեր
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="contact-tab" data-toggle="tab" href="#signature" @click.prevent="$router.push('/participant/contract-management/orders/active')" role="tab" aria-controls="contact" aria-selected="false">
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
            <div class="row m-0 p-0">
              <div class="col-12 tenders-list p-0">
                  <v-server-table
                    ref="vtable"
                    :url="`${proxyUrl}contract-orders/getByProvider`"
                    :options="options"
                    :columns="columns"
                  >
                    <div slot="beforeTable" class="padding-20 pb-0 text-center text-md-left">
                      <div class="d-inline-block tab-block">
                        <ul class="nav nav-tabs align-items-end suggestions-tab-mobile" id="myTab" role="tablist">
                          <li class="nav-item" role="presentation">
                            <a class="nav-link" id="home-tab" data-toggle="tab" href="#active" @click.prevent="$router.push('/participant/contract-management/orders/active')" role="tab" aria-controls="home" aria-selected="true">
                              Ընթացիկ
                            </a>
                          </li>
                          <li class="nav-item" role="presentation">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#finished" @click.prevent="$router.push('/participant/contract-management/orders/finished')" role="tab" aria-controls="profile" aria-selected="false">
                              Ավարտված
                            </a>
                          </li>
                          <li class="nav-item" role="presentation">
                            <a class="nav-link active" id="contact-tab" data-toggle="tab" href="#canceled" @click.prevent="$router.push('/participant/contract-management/orders/canceled')" role="tab" aria-controls="contact" aria-selected="false">
                              Չկատարված
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div slot="contract_code" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.contract.code}}</span>
                    </div>
                    <div slot="provider_name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.contract.participant.name}}</span>
                    </div>
                    <div slot="lots_count" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.lots.length}}</span>
                    </div>
                    <div slot="lots" slot-scope="{row}">
                      <span v-for="(lot, lotIndex) in row.lots" :key="lot.id">{{lot.lot_info.name}}<span v-if="lotIndex !== row.lots.length-1">, </span></span>
                    </div>
                    <div slot="date" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.organize.code}}</span>
                    </div>
                    <div slot="status" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span v-if="row.contract.from_application" @click="$modal.show('change-status-modal', {order: row, resetComponent})" style="cursor: pointer;" class="btn-link text-primary d-flex align-items-center">
                        <i class="mr-2 fas fa-edit"></i>
                        {{getStatus(row)}}
                      </span>
                      <span v-else class="w-100">{{getStatus(row)}}</span>
                      <!-- <span @click="$modal.show('change-status-modal', {order: row, resetComponent})" style="cursor: pointer;" class="ml-2 btn-link text-primary"><i class="fas fa-edit"></i></span> -->
                    </div>
                    <div slot="total_price" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{getTotalPrice(row)}}</span>
                    </div>
                    <div slot="delete" class="d-flex justify-content-start align-items-center h-100">
                      <i class="mdi mdi-delete text-danger" style="font-size: 30px; cursor: pointer;"></i>
                    </div>
                    <div slot="docs" slot-scope="{row}">
                      <div class="row p-0 m-0 align-items-center justify-left m-0 p-0">
                        <div class='col-12 p-0 mb-2 text-primary text-left'>
                          <button
                            class="btn btn-light d-flex justify-content-start align-items-center h-100 align-items-center"
                            :disabled="!row.is_full"
                            @click.prevent="() => {
                              $modal.show('new-editor-modal', {
                                action: 'download',
                                fileName: 'transfer_protocol',
                                participantGroup: row,
                                editorTitle: 'Հանձնման ընդունման արձանագրություն'
                              })
                            }"
                          >
                            <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.791016 10.7619C0.791016 11.3571 1.26721 11.8333 1.86244 11.8333H10.1363C10.7315 11.8333 11.2077 11.3571 11.2077 10.7619V1.23805C11.2077 0.642816 10.7315 0.166626 10.1363 0.166626H1.86244C1.26721 0.166626 0.791016 0.642816 0.791016 1.23805V10.7619ZM10.2553 10.8809H1.7434V1.11901H10.2553V10.8809ZM3.35055 2.72625H8.7077V3.67863H3.35055V2.72625ZM8.7077 8.3213H3.35055V9.27368H8.7077V8.3213ZM3.35055 5.52377H8.7077V6.47615H3.35055V5.52377Z" fill="#006BE6"/>
                            </svg>
                            <span>Հանձնման ընդունման արձանագրություն</span>
                          </button>
                        </div>
                        <div v-if="row.contract.organize_type !== 'itender'" class='col-12 p-0 text-primary text-left'>
                          <button
                            class="btn btn-light d-flex justify-content-start align-items-center h-100 align-items-center"
                            :disabled="!row.is_full"
                            @click.prevent="() => {
                              $modal.show('new-editor-modal', {
                                action: 'download',
                                fileName: 'act',
                                participantGroup: row,
                                editorTitle: 'Ակտ'
                              })
                            }"
                          >
                            <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.791016 10.7619C0.791016 11.3571 1.26721 11.8333 1.86244 11.8333H10.1363C10.7315 11.8333 11.2077 11.3571 11.2077 10.7619V1.23805C11.2077 0.642816 10.7315 0.166626 10.1363 0.166626H1.86244C1.26721 0.166626 0.791016 0.642816 0.791016 1.23805V10.7619ZM10.2553 10.8809H1.7434V1.11901H10.2553V10.8809ZM3.35055 2.72625H8.7077V3.67863H3.35055V2.72625ZM8.7077 8.3213H3.35055V9.27368H8.7077V8.3213ZM3.35055 5.52377H8.7077V6.47615H3.35055V5.52377Z" fill="#006BE6"/>
                            </svg>
                            <span>Ակտ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </v-server-table>
              </div>
              <invoice-details-modal />
              <new-editor-modal />
              <change-status-modal />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InvoiceDetailsModal from '../modals/InvoiceDetailsModal';
  import NewEditorModal from '@/views/fileManagment/contractManagement/NewEditorModal';
  import isMobile from '@/mixins/isMobileView'
  import ChangeStatusModal from '../../myOrders/modals/ChangeStatusModal'

  export default {
    data() {
      return {
        proxyUrl: process.env.VUE_APP_API_URL,
        columns: ['contract_code', 'provider_name', 'lots_count', 'lots', 'total_price', 'status', 'docs'],
        options: {
          requestAdapter (data) {
            return {
              limit: data.limit ? data.limit : 5,
              page: data.page,
              status: 'canceled',
            }
          },
          responseAdapter({data}) {
            return { 
              data: data.data, 
              count: data.count
            }
          },
          requestFunction(data) {
            return this.$client.get(this.url, {params: data})
            .catch(function (e) {this.dispatch('error', e)})
          },
          params:{ 
            component: this
          },
          sortable: [],
          columnsDropdown: false,
          pagination: { chunk: 1 },
          filterByColumn: false,
          skin: 'table',
          dateColumns:['create_date','end_date'],
          dateFormat: "YYYY-mm-dd",
          headings: {
            contract_code: 'Պայմանագրի ծածկագիր',
            provider_name: 'Մատակարարի անվանում',
            completion_actual_date: 'Ամսաթիվ',
            lots_count: 'Գնման առարկաների քանակ',
            lots: 'Գնման առարկաներ',
            total_price: 'Ընդհանուր գումար',
            status: 'Կարգավիճակ',
            docs: 'Փաստաթղթեր',
          },
          filterable: false
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
    components: {InvoiceDetailsModal, NewEditorModal, ChangeStatusModal},
    mixins: [isMobile],
    computed: {
      menuNotifications() {
        return this.$store.getters["user/menuNotifications"];
      },
      currentPlan() {
        return this.$store.getters['procurement/currentPlan']
      },
      locale() {
        return this.$store.getters['user/locale']
      },
      me() {
        return this.$store.getters['user/me']
      },
    },
    mounted() {
      // 
    },
    methods: {
      selectPage(event){
        this.$router.push(event.target.value)
      },
      getTotalPrice({lots}){
        var totalPrice = 0;
        lots.forEach((lot) => {
          totalPrice += lot.ordered * lot.lot_info.price_unit
        })
        return totalPrice;
      },
      getStatus({status}){
        switch (status) {
          case 'sended':
            return 'Պատվիրված'
          case 'completed':
            return 'Մատակարարված'
          case 'failed':
            return 'Առաջացել է խնդիր'
          case 'canceled':
            return 'Չկատարված'
          default:
            break;
        }
      },
      async resetComponent() {
        await this.$refs.vtable.refresh()
      },
    },
  }
</script>