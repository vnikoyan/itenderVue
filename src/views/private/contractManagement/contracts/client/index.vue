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
            <option selected value="/organizator/contract-management/contracts/provider">Պայմանագրեր</option>
            <option value="/organizator/contract-management/orders/active">Կատարված պատվերներ</option>
          </select>
        </div>
      </template>
      <template v-else>
        <div class="col-auto">
          <div class="d-inline-block">
            <ul class="nav nav-tabs align-items-end suggestions-tab" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#accepted" @click.prevent="$router.push('/organizator/contract-management/contracts')" role="tab" aria-controls="profile" aria-selected="false">
                  Պայմանագրեր
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#signature" @click.prevent="$router.push('/organizator/contract-management/orders/active')" role="tab" aria-controls="contact" aria-selected="false">
                  Կատարված պատվերներ
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
          <div class="card-body p-0 h-100">
            <div class="row w-100 m-0 h-100">
              <div v-if="!loaded" class="col-12 d-flex align-items-center justify-content-center" style="height: 100%; padding: 20px">
                <div style="left: 0; right: 0; top: 0; bottom: 0;" class="text-big text-primary spinner-border spinner-border-lg m-auto position-absolute" role="status"></div>
              </div>
              <div class="col-12 tenders-list p-0">
                <div v-show="loaded">
                  <v-server-table
                    ref="vtable"
                    :url="`${proxyUrl}contract/getByClient`"
                    :options="options"
                    :columns="columns"
                    @loading="onLoading" 
                    @loaded="({data}) => onLoaded(data)"
                    @row-click="({row}) => {row.organize.status !== 'finished' && $modal.show('suggestion-modal', {...row, resetComponent})}"
                  >
                    <div slot="index_number" class="d-flex justify-content-start align-items-center h-100" slot-scope="{index}">
                      <span style="width: 20px">{{ index }}</span>
                    </div>
                    <div slot="participant_name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                        {{ row.participant.name }}
                    </div>
                    <div slot="participant_name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                        {{ row.participant.name }}
                    </div>
                    <div slot="total_price" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                        {{ row.price }}դր.
                    </div>
                    <div slot="total_leftover" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                        {{ parseFloat(getContractLeftover(row).toFixed(2)) }}դր.
                    </div>
                    <div slot="delete" class="d-flex justify-content-start align-items-center h-100">
                      <i class="mdi mdi-delete text-danger" style="font-size: 30px; cursor: pointer;"></i>
                    </div>
                    <div slot="contract" class="d-flex flex-wrap justify-content-start align-items-center h-100" slot-scope="{row}">
                      <button
                        @click="() => { 
                          $modal.show('contract-document-modal', {contract: row, resetComponent}) 
                        }"
                        v-if="row.participant.contract_document"
                        type="button" 
                        class="btn btn-light d-flex align-items-center"
                      >
                        <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12722 6.74516V0.5H6.18491V6.74516L8.15927 4.75807L8.93491 5.53871L6.39645 8.02258L5.62081 8.80323L4.91568 8.02258L2.37722 5.53871L3.15286 4.75807L5.12722 6.74516ZM10.0632 10.3645V8.87419H11.1914V10.2226C11.1914 10.9323 10.6273 11.5 9.92218 11.5H1.46064C0.755509 11.5 0.191406 10.9323 0.191406 10.2226V8.87419H1.31961V10.3645H10.0632Z" fill="#006BE6"/>
                        </svg>
                        <span>Պայմանագիր</span>
                      </button>
                    </div>
                    <div slot="order_input" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <div
                        class="p-0"
                        v-tooltip="!row.is_sign && 'Պայմանագիրը դեռ չի հաստատվել մասնակցի կողմից'"
                      >
                        <button
                          @click="() => { 
                            $modal.show('order-modal', {contract: row, resetComponent}) 
                          }"
                          :disabled="!row.is_sign || getContractLeftover(row) <=0"
                          type="button" 
                          class="btn btn-primary"
                        >
                          <span>Կատարել պատվեր</span>
                        </button>
                      </div>
                    </div>
                  </v-server-table>
                </div>
              </div>
            </div>
            <order-modal />
            <order-details-modal />
            <specification-modal />
            <contract-document-modal />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import OrderModal from './modals/OrderModal'
  import SpecificationModal from '@/components/modals/SpecificationModal'
  import OrderDetailsModal from './modals/OrderDetailsModal'
  import ContractDocumentModal from '@/components/modals/ContractDocumentModal'
  import isMobile from '@/mixins/isMobileView'

  export default {
    name: 'contracts',
    mixins: [isMobile],
    data() {
      return {
        proxyUrl: process.env.VUE_APP_API_URL,
        loaded: false,
        columns: ['index_number', 'code', 'participant_name', 'sign_date', 'total_price', 'total_leftover', 'contract', 'order_input'],
        options: {
          sortable: [],
          requestFunction(data) {
            return this.$client.get(this.url, {params: data})
            .catch(function (e) {this.dispatch('error', e)})
          },
          columnsDropdown: false,
          pagination: { chunk: 1 },
          filterByColumn: false,
          skin: 'table',
          dateColumns: ['create_date','end_date'],
          // sortable: ['cpvs_count', 'code', 'type', 'customer', 'category', 'status', 'end_date'],
          dateFormat: "YYYY-mm-dd",
          headings: {
            index_number: 'Հ/Հ',
            contract: '',
            code: 'Պայմանագրի ծածկագիր',
            participant_name: 'Մատակարարի անվանում',
            sign_date: 'Կնքման ամսաթիվ',
            total_price: 'Ընդհանուր արժեք',
            total_leftover: 'Ընդհանուր մնացորդ ըստ պատվերների',
            final_date: 'Վերջնաժամկետ',
            order_input: '',
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
    components: {OrderModal, SpecificationModal, OrderDetailsModal, ContractDocumentModal},
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
    mounted() {
      // const contractId = this.$route.params.id
      // console.log(contractId)
      // if(contractId){
      //   console.log(this.$refs.vtable)
      // }
      // 
    },
    methods: {
      selectPage(event){
        this.$router.push(event.target.value)
      },
      consoleLog(data){
        console.log(data)
      },
      onLoading(a) {
        this.loaded = false;
      },
      onLoaded({data}){
        const contractId = this.$route.params.id
        if(contractId){
          const contract = data.find(item => item.id === +contractId)
          this.$modal.show('order-modal', {contract: contract})
        }
        this.loaded = true;
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
        this.loaded = false;
        await this.$refs.vtable.refresh()
      },
    },
  }
</script>