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
            <option selected value="/participant/contract-management/requests">
                Պայմանագրի առաջարկ
                <span v-if="menuNotifications.unseen_contract_requests">
                  ({{menuNotifications.unseen_contract_requests}})
                </span>
            </option>
            <option value="/participant/contract-management/contracts">Պայմանագրեր</option>
            <option value="/participant/contract-management/orders/active">
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
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#all" @click.prevent="$router.push('/participant/contract-management/requests')" role="tab" aria-controls="home" aria-selected="true">
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
      <div class="tab-pane fade show active h-100" role="tabpanel" aria-labelledby="all-tab">
        <div class="card h-100">
          <div class="card-body p-0">
            <div class="row w-100 m-0">
              <div class="col-12 tenders-list p-0">
                  <v-server-table
                    ref="vtable"
                    :url="`${proxyUrl}contract/getRequestsByProvider`"
                    :options="options"
                    :columns="columns"
                    @loaded="({data}) => onLoaded(data)"
                    @row-click="({row}) => {row.organize.status !== 'finished' && $modal.show('suggestion-modal', {...row, resetComponent})}"
                  >
                    <div slot="index_number" class="d-flex justify-content-start align-items-center h-100" slot-scope="{index}">
                      <span class="font-weight-bold" style="width: 20px">{{ index }}</span>
                    </div>
                    <div slot="code" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100 font-weight-bold">{{ row.code }}</span>
                    </div>
                    <div slot="price" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{ row.price }} դր</span>
                    </div>
                    <div slot="total_leftover" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{ parseFloat(getContractLeftover(row).toFixed(2)) }}դր.</span>
                    </div>
                    <div slot="delete" class="d-flex justify-content-start align-items-center h-100">
                      <i class="mdi mdi-delete text-danger" style="font-size: 30px; cursor: pointer;"></i>
                    </div>
                    <div slot="actions" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <div class="row">
                        <div class="col-6">
                          <button
                            @click="cancelContract(row)"
                            type="button" 
                            class="btn btn-light text-danger">
                              <span>Չեղարկել</span>
                          </button>
                        </div>
                        <div class="col-6">
                          <button
                            @click="signContract(row)"
                            type="button" 
                            class="btn btn-primary">
                              <span>Կնքել</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </v-server-table>
              </div>
              <specification-modal />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SpecificationModal from '@/components/modals/SpecificationModal'
  import isMobile from '@/mixins/isMobileView'

  export default {
    name: 'contracts',
    mixins: [isMobile],
    data() {
      return {
        proxyUrl: process.env.VUE_APP_API_URL,
        columns: ['index_number', 'code', 'client.name', 'price', 'actions'],
        options: {
          requestAdapter(data) {
            return {
              limit: data.limit ? data.limit : 5,
              page: data.page,
              query: data.query,
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
          // sortable: ['cpvs_count', 'code', 'type', 'customer', 'category', 'status', 'end_date'],
          columnsDropdown: false,
          pagination: { chunk: 1 },
          filterByColumn: false,
          skin: 'table',
          dateColumns:['create_date','end_date'],
          dateFormat: "YYYY-mm-dd",
          headings: {
            index_number: 'Հ/Հ',
            code: 'Պայմանագրի ծածկագիր',
            'client.name': 'Պատվիրատուի անվանում',
            sign_date: 'Կնքման ամսաթիվ',
            price: 'Ընդհանուր արժեք',
            total_leftover: 'Ընդհանուր մնացորդ ըստ պատվերների',
            actions: '',
          },
          filterable: false,
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
    components: { SpecificationModal},
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
    mounted() {},
    methods: {
      consoleLog(e){
        console.log(e)
      },
      selectPage(event){
        this.$router.push(event.target.value)
      },
      signContract(contract) {
        const contractId = contract.id
        this.$client.put(`contract/${contractId}`, {is_sign: 1})
        const contractIndex = this.$refs.vtable.data.findIndex(contract => contract.id === contractId)
        this.$refs.vtable.data.splice(contractIndex, 1)
      },
      cancelContract(contract) {
        const contractId = contract.id
        const contractIndex = this.$refs.vtable.data.findIndex(contract => contract.id === contractId)
        this.$refs.vtable.data.splice(contractIndex, 1)
        contract.lots.forEach((lot) => {
          if(lot.row.offers.length){
            this.$client.delete(`participant-row/${lot.row.offers[0].id}`)
          }
          this.$client.delete(`contract-lots/${lot.id}`)
          this.$client.put(`organize-row/${lot.row.id}`, {won_lot_id: null, winner_user_id: null})
        })
        this.$client.delete(`contract/${contract.id}`)
        this.$client.put(`organize/oneperson/${contract.organize.id}`, {create_contract: 0, winner_user_id: null, winner_user_price: null})
      },
      onLoaded({data}){
        const contractId = this.$route.params.id
        if(contractId){
          const contract = data.find(item => item.id === +contractId)
          this.$modal.show('order-modal', {contract: contract})
        }
      },
      getContractLeftover(row){
        const { price, lots } = row
        var leftover = 0;
        lots.forEach((lot) => {
          leftover += lot.supplied * lot.price_unit
        })
        return price - leftover;
      },
      async resetComponent() {
        await this.$refs.vtable.refresh()
      },
    },
  }
</script>