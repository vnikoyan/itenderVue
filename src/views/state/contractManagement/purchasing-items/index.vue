<template>
  <div class="card">
    <div class="card-body">
      <div class="row m-0 p-0">
        <div class="col-12 tenders-list p-0">
            <v-server-table
              ref="vtable"
              :url="`${proxyUrl}contract-lots`"
              :options="options"
              :columns="columns"
            >
              <div slot="index_number" class="d-flex justify-content-start align-items-center h-100" slot-scope="{index}">
                <span style="width: 20px">{{ index }}</span>
              </div>
              <div slot="cpv_name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.row.cpv_name}} - {{row.row.cpv_code}}
              </div>
              <div slot="unit_price" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.price_unit}}դր.
              </div>
              <div slot="provider_name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.contract.participant.name}}
              </div>
              <div slot="count" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.available + row.ordered + row.supplied}}
              </div>
              <div slot="leftover" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.available}}
              </div>
              <div slot="contract_code" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                <button @click="$router.push({ path: `/contractmanagement/contracts/${row.contract.id}`})" type="button" class="btn btn-link shadow-none">{{row.contract.code}}</button>
              </div>
              <div slot="order_input" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                <div v-if="row.available !== 0" class="row m-0 p-0">
                  <div class="col-xl-6 py-2">
                    <input 
                      v-model.number="row.order_count"
                      @input="calculateByAvailable(row)"
                      type="text"
                      min="1"
                      class="form-control"
                    >
                    <span v-if="row.error" class="text-danger mb-0" style="font-size: 0.6rem">
                      գերազանցում է նախահաշվային գինը
                    </span>
                  </div>
                  <div class="col-xl-6 py-2">
                    <button @click="() => order(row)"  :disabled="row.error" type="button" class="btn btn-primary btn-block">
                        <span>Կատարել պատվեր</span>
                    </button>
                  </div>
                </div>
                <div v-else>
                  Սպառված է
                </div>
              </div>
            </v-server-table>
        </div>
        <contract-draft-modal />
        <!-- end col -->
      </div>
    </div>
  </div>
</template>

<script>
  import ContractDraftModal from './modals/ContractDraftModal'
  export default {
    name: 'purchasing-items',
    data() {
      return {
        order_count: '',
        proxyUrl: process.env.VUE_APP_API_URL,
        columns: ['index_number', 'cpv_name', 'unit_price', 'provider_name', 'contract_code', 'count', 'leftover'],
        options: {
          requestAdapter (data) {
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
            console.log(this.url)
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
            cpv_name: 'CPV - անվանում',
            unit_price: 'Միավորի արժեք',
            provider_name: 'Մատակարարի անվանում',
            count: 'Քանակ',
            leftover: 'Մնացորդ',
            contract_code: 'Պայմանագրի ծածկագիր',
            order_input: 'Պատվիրել',
            order_button: '',
          },
          filterable: false,
          texts: {
            noResults: "Համընկնում չի գտնվել",
            loading: 'Բեռնվում է...',
          },
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
    components: {ContractDraftModal},
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
      order(row){
        const lots = []
        const lotObj = {
          contract_lot_id: row.id,
          ordered: row.order_count
        }
        lots.push(lotObj)
        const requestData = {
          contract_id: row.contract.id,
          status: 'sended',
          lots: lots,
        }
        if(row.order_count){
          this.$client.post('contract-orders', requestData).then(({data}) => {
            if(data) {
              this.resetComponent()
            }
          }).catch(e => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          })
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Նշեք գնման առարկաների քանակը պատվեր կատարելու համար',
            text: 'Կրկին փորձեք!'
          })
        }
      },
      calculateByAvailable(row){
        const { available } = row;
        const orderCount = row.order_count;
        if(orderCount > available){
          row.error = true;
        } else {
          row.error = false;
        }
      },
      async resetComponent() {
        await this.$refs.vtable.refresh()
      },
    },
  }
</script>