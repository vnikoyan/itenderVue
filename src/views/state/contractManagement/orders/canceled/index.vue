<template>
  <div class="card">
    <div class="card-body">

      <div class="row m-0 p-0">
        <div class="col-12 tenders-list p-0">
            <v-server-table
              ref="vtable"
              :url="`${proxyUrl}contract-orders`"
              :options="options"
              :columns="columns"
            >
              <div slot="beforeTable" class="padding-20 pb-0 text-center text-md-left">
                <div class="d-inline-block tab-block">
                  <ul class="nav nav-tabs align-items-end suggestions-tab-mobile" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" id="home-tab" data-toggle="tab" href="#active" @click.prevent="$router.push('/contractmanagement/orders/active')" role="tab" aria-controls="home" aria-selected="true">
                        Պատվիրված
                      </a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" id="profile-tab" data-toggle="tab" href="#finished" @click.prevent="$router.push('/contractmanagement/orders/finished')" role="tab" aria-controls="profile" aria-selected="false">
                        Ավարտված
                      </a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link active" id="contact-tab" data-toggle="tab" href="#canceled" @click.prevent="$router.push('/contractmanagement/orders/canceled')" role="tab" aria-controls="contact" aria-selected="false">
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
                <span @click="$modal.show('change-status-modal', {order: row, resetComponent})" style="cursor: pointer;" class="btn-link text-primary d-flex align-items-center">
                  <i class="mr-2 fas fa-edit"></i>
                  {{getStatus(row)}}
                </span>
              </div>
              <div slot="invoice_details" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                <span class="w-100 col-12">{{row.invoice_number !== '' ? ' Դուրս գրված է' : 'Դուրս գրված չէ' }}</span>
                <div v-if="row.contract.from_implement_immediately" class='col-12 p-0 mb-2 text-primary text-left'>
                  <button
                    v-if="!row.is_full"
                    class="btn btn-primary btn-block"
                    @click="$modal.show('invoice-details-modal', {order: row, resetComponent})"
                  >
                    <span>Դուրս գրել <i class="fas fa-edit ml-1"/> </span>
                  </button>
                </div>
              </div>
              <div slot="total_price" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                <span class="w-100">{{getTotalPrice(row)}}</span>
              </div>
              <div slot="delete" class="d-flex justify-content-start align-items-center h-100">
                <i class="mdi mdi-delete text-danger" style="font-size: 30px; cursor: pointer;"></i>
              </div>
              <div slot="docs" slot-scope="{row}">
                <div class="row align-items-center justify-left m-0 p-0">
                    <div class='col-xl-12 mb-2 text-primary text-left'>
                      <button
                        class="btn btn-light d-flex justify-content-start align-items-center h-100 align-items-center"
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
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12722 6.74516V0.5H6.18491V6.74516L8.15927 4.75807L8.93491 5.53871L6.39645 8.02258L5.62081 8.80323L4.91568 8.02258L2.37722 5.53871L3.15286 4.75807L5.12722 6.74516ZM10.0632 10.3645V8.87419H11.1914V10.2226C11.1914 10.9323 10.6273 11.5 9.92218 11.5H1.46064C0.755509 11.5 0.191406 10.9323 0.191406 10.2226V8.87419H1.31961V10.3645H10.0632Z" fill="#006BE6"/>
                        </svg>
                        <span>Հանձնման ընդունման արձանագրություն</span>
                      </button>
                    </div>
                    <div v-if="row.contract.organize_type !== 'itender'" class='col-xl-12 mb-2 text-primary text-left'>
                      <button
                        class="btn btn-light d-flex justify-content-start align-items-center h-100 align-items-center"
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
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12722 6.74516V0.5H6.18491V6.74516L8.15927 4.75807L8.93491 5.53871L6.39645 8.02258L5.62081 8.80323L4.91568 8.02258L2.37722 5.53871L3.15286 4.75807L5.12722 6.74516ZM10.0632 10.3645V8.87419H11.1914V10.2226C11.1914 10.9323 10.6273 11.5 9.92218 11.5H1.46064C0.755509 11.5 0.191406 10.9323 0.191406 10.2226V8.87419H1.31961V10.3645H10.0632Z" fill="#006BE6"/>
                        </svg>
                        <span>Ակտ</span>
                      </button>
                    </div>
                    <div v-if="row.contract.organize_type !== 'itender'" class='col-xl-12 mb-2 text-primary text-left'>
                      <button
                        class="btn btn-light d-flex justify-content-start align-items-center h-100 align-items-center"
                        @click.prevent="() => {
                          $modal.show('new-editor-modal', {
                            action: 'download',
                            fileName: 'conclusion',
                            participantGroup: row,
                            editorTitle: 'Եզրակացություն'
                          })
                        }"
                      >
                        <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12722 6.74516V0.5H6.18491V6.74516L8.15927 4.75807L8.93491 5.53871L6.39645 8.02258L5.62081 8.80323L4.91568 8.02258L2.37722 5.53871L3.15286 4.75807L5.12722 6.74516ZM10.0632 10.3645V8.87419H11.1914V10.2226C11.1914 10.9323 10.6273 11.5 9.92218 11.5H1.46064C0.755509 11.5 0.191406 10.9323 0.191406 10.2226V8.87419H1.31961V10.3645H10.0632Z" fill="#006BE6"/>
                        </svg>
                        <span>Եզրակացություն</span>
                      </button>
                    </div>
                  </div>
              </div>
            </v-server-table>
        </div>
        <specification-modal />
        <contract-draft-modal />
        <change-status-modal />
        <new-editor-modal />
        <!-- end col -->
      </div>
    </div>
  </div>
</template>

<script>
  import ContractDraftModal from '../modals/ContractDraftModal'
  import ChangeStatusModal from '../modals/ChangeStatusModal'
  import SpecificationModal from '@/components/modals/SpecificationModal'
  import NewEditorModal from '@/views/fileManagment/contractManagement/NewEditorModal'
  export default {
    data() {
      return {
        proxyUrl: process.env.VUE_APP_API_URL,
        columns: ['contract_code', 'provider_name', 'lots_count', 'lots', 'total_price', 'status', 'invoice_details', 'docs'],
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
            invoice_details: 'Հաշիվ ապրանքագրի կարգավիճակ',
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
    components: {SpecificationModal, ContractDraftModal, ChangeStatusModal, NewEditorModal},
    computed: {
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