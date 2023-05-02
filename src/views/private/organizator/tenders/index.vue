<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="row w-100 m-0">
        <div class="col-12 tenders-list p-0">
          <v-server-table 
            :url="tableDataUrl"
            :columns="columns"
            :options="options"
            ref="table"
          >
            <div slot="afterLimit" class="row align-content-center h-100 w-100 m-0">
              <div class="col btn-group dropright show p-0">
                <button 
                  type="button"
                  @click="() => {this.$router.push('/organizator/tenders/add')}"
                  class="btn btn-primary"
                >
                  <i class="fas fa-plus mr-1"></i>
                  <span>Ավելացնել մրցույթ</span>
                </button>
              </div>
            </div>
            <div slot="password" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100">
                <span class="w-100">{{row.password}}</span>
              </div>
            <div slot="organizator" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100">
              <span class="w-100">{{row.organizator}}</span>
            </div>
            <div slot="products" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100">
              <div class="w-100">
                <p
                  class="m-0 w-100"
                  :key="lot.toString() + lotIndex"
                  v-for="(lot, lotIndex) in row.rows.slice(0, 3)">
                    {{lot.name}}<template v-if="lotIndex !== row.rows.length-1">,</template>
                </p>
                <span @click.stop="()=>{$modal.show('tender-rows-modal', {...row});setTenderViewed(row.id)}" class="text-primary" style="cursor: pointer">
                    Տեսնել բոլորը
                </span>
              </div>
            </div>
            <div slot="opening_finish_date" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100">
              <div style="min-width:125px;">
                {{$moment(new Date(row.opening_date.replace(/-/g, "/"))).format('DD-MM-YYYY')}} - <br/><span class="text-primary font-weight-bold">{{$moment(new Date(row.finish_date.replace(/-/g, "/"))).format('DD-MM-YYYY HH:mm')}}</span>
              </div>
            </div>
            <div slot="price" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100">
              <template>
                <div v-if="row.price" class="col-auto">
                    {{row.price}}
                </div>
                <div v-if="row.price_file" class="col-auto">
                    <a download target="_blank" :href="row.price_file">
                      <button type="button" @click="() => setTenderViewed(row.id)" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-animation="bounce">
                        <i class="fa fa-download" />
                      </button>
                    </a>
                </div>
              </template>
            </div>
            <div slot="type" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100">
              {{row.type === "PAPER" ? 'Թղթային' : 'Էլեկտրոնային'}}
            </div>
            <div slot="invitation" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100" >
              <div class="col p-0" style="margin-right: 8px">
                <a download target="_blank" :href="row.invitation_link">
                  <button type="button" class="btn btn-light">
                    <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12722 6.74516V0.5H6.18491V6.74516L8.15927 4.75807L8.93491 5.53871L6.39645 8.02258L5.62081 8.80323L4.91568 8.02258L2.37722 5.53871L3.15286 4.75807L5.12722 6.74516ZM10.0632 10.3645V8.87419H11.1914V10.2226C11.1914 10.9323 10.6273 11.5 9.92218 11.5H1.46064C0.755509 11.5 0.191406 10.9323 0.191406 10.2226V8.87419H1.31961V10.3645H10.0632Z" fill="#006BE6"/>
                    </svg>
                    <span>Բեռնել</span>
                  </button>
                </a>
              </div>
              <div class="col p-0">
                <button 
                  type="button" 
                  class="btn btn-primary" 
                  data-toggle="modal" data-animation="bounce"
                  @click.prevent="() => {
                    $modal.show('report-modal', row)
                  }"
                >
                  <span>Հաշվետվություն</span>
                </button>
              </div>
            </div>
            <div slot="participants_count" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100" >
              <div class="row justify-content-center">
                Ուղարկկվել է {{row.participants_count}} հնարավոր մասնակցի
              </div>
            </div>
            <div slot="edit" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100">
              <div v-tooltip="'Խմբագրել'">
                  <button @click="() => {$router.push(`/organizator/tenders/edit/${row.id}`)}" class="btn btn-light btn-announcements">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6211 10.5524L18.1694 3.99995L19.2693 5.10058L12.721 11.6531L11.6211 10.5524ZM6.82507 16.3916L16.625 16.4435L16.6665 10.2173H18.2324V16.1841C18.2324 17.1802 17.4131 18 16.4176 18H7.08433C6.07841 18 5.26953 17.1802 5.26953 16.1841V6.84482C5.26953 5.84864 6.08878 5.02886 7.08433 5.02886H12.2176V6.61653L6.87692 6.5854L6.82507 16.3916Z" fill="#006BE6"/>
                    </svg>
                  </button>
                </div>
            </div>
          </v-server-table>
        </div>
      </div>
    </div>
    <tender-rows-modal />
    <report-modal />
  </div>
</template>
<script>
  import ReportModal from './modals/ReportModal'
  import TenderRowsModal from '../../participant/tenders/modals/TenderRowsModal'

  export default {
    components: { ReportModal, TenderRowsModal },
    data() {
      return {
        tableDataUrl: `${process.env.VUE_APP_API_URL}manager/get/tenders`,
        columns: [
          'password',
          'title',
          'products',
          'opening_finish_date',
          'price',
          'region',
          'type',
          'invitation',
          'edit',
          'participants_count'
        ],
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
          headings: {
            password: 'Ծածկագիր',
            title: 'Անվանում',
            organizator: 'Պատվիրատու',
            products: 'Գնման առարկաներ',
            region: 'Տարածաշրջան',
            category: 'Խումբ / Կատեգորիա',
            type: 'Տիպ',
            opening_finish_date: 'Ժամկետը սկիզբ/ավարտ',
            price: 'Նախահաշվային գին',
            application: 'Տենդերի հայտ',
            invitation: 'Մրցույթի հրավեր',
            favorite: 'Նախընտրել',
            participants_count: '',
            edit: 'Խմբագրել',
          },
          texts: {
            count:
            'Ցուցադրված է {from}֊ից {to}֊ը ընդհանուր {count} տողից|{count} տող|',
            first: 'Առաջին',
            last: 'Վերջին',
            filter: '',
            filterPlaceholder: 'Փնտրել',
            limit: '',
            page: 'Page:',
            noResults: 'Համընկնում չի գտնվել',
            noRequest: 'խնդրում ենք ընտրել առնվազն մեկ ֆիլտեր տվյալները ներբեռնելու համար',
            filterBy: 'փնտրել ըստ {column}',
            loading: 'Բեռնվում է...',
            defaultOption: 'ընտրել {column}',
            columns: 'Ընտրել դաշտերը',
          },
        },
        filters: {
          category: { name: 'Բոլորը', value: 'all' },
          categoryOptions: [
            { name: 'Բոլորը', value: 'all' },
            { name: 'Միայն իմ կատեգորիաները', value: 'onlyMy' },
            { name: 'Իմ դիմածները', value: 'applied' },
          ],
          status: { name: 'Բոլորը', value: 'all' },
          statusOptions: [
            { name: 'Բոլորը', value: 'all' },
            { name: 'Ակտիվ մրցույթներ', value: 'active' },
            { name: 'Ավարտված մրցույթներ', value: 'finished' },
            { name: 'Ամփոփված մրցույթներ', value: 'summary' },
          ],
          type: null,
          typeOptions: ['Պետական մրցակցային մրցույթներ', 'Պետական մեկ անձի մրցույթներ', 'ՀՀ֊ից դուրս մրցույթներ', 'Ոչ պետական մրցույթներ', 'iTender մրցույթներ' ],
          type2: null,
          type2Options: ['Բոլորը','Թղթային', 'Էլեկտրոնային'],
          procedure: null,
          procedureOptions: ['ԳՀ', 'ԲՄ', 'ՀԲՄ', 'ՀՄԱ', 'ԷԱՃ'],
          region: null,
          regionOptions: [
            'Երևան',
            'Արագածոտն',
            'Արարատ',
            'Արմավիր',
            'Գեղարքունիք',
            'Լոռի',
            'Կոտայք',
            'Շիրակ',
            'Սյունիք',
            'Վայոց ձոր',
            'Տավուշ',
          ],
          price: null,
          priceOptions: ['Բոլորը', '10մլն.-ից ցածր', '10մլն.-ից բարձր'],
        }
      }
    },
    computed: {
      currentPlan() {
        return this.$store.getters['procurement/currentPlan']
      },
      locale() {
        return this.$store.getters['user/locale']
      }
    },
    mounted() {
      
    },
    methods: {
    },
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
  .date-bloc span {
    font-size: 12px;
  }
  .mySelect .multiselect__tags{
    color: #006BE6;
    background-color: #006BE6;
  }
  .btn-announcements{
    width: 36px;
    height: 36px;
    box-shadow: 0px 4px 12px 0px #0000000D !important;
    background: #FFFFFF !important;
    border: 1px solid #F7F7F7 !important;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05) !important;
    border-radius: 12px !important;
  }
</style>