<template>
  <div class="card">
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-sm-3">
          <multiselect
            v-model="filters.status"
            label="name"
            track-by="value"
            :options="filters.statusOptions"
            :searchable="false"
            :close-on-select="false"
            :show-labels="false"
            :allow-empty="false"
            placeholder="Կարգավիճակ"
          />
        </div>
      </div>
      <!-- Tab panes -->
      <div class="row m-0 p-0">
        <div class="col-12 tenders-list p-0">
            <v-server-table
              ref="vtable"
              :url="`${proxyUrl}suggestions/get`"
              :options="options"
              :columns="columns"
            >
              <div slot="name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.organize.name}}
              </div>
              <div slot="code" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.organize.code}}
              </div>
              <div slot="cpvs_count" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.organize.organize_rows.length}}
              </div>
              <div slot="type" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.is_itender ? 'iTender մրցույթներ' : 'Պետական մեկ անձի մրցույթներ'}}
              </div>
              <div slot="winner_determining_type" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.organize.winner_by_lots ? 'Ըստ չափաբաժինների' : 'Ըստ ընդհանուր գնի'}}
              </div>
              <div slot="customer" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.client.name}}
              </div>
              <div slot="status" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.organize.status === 'finished' ? 'Ավարտված' : 'Ընթացիկ' }}
              </div>
              <div slot="end_date" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                {{row.organize.finish_date}}
              </div>
               <div slot="project" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                <button type="button" @click.stop="$modal.show('contract-draft-modal', row)" class="btn btn-primary" data-toggle="modal" data-animation="bounce">
                  Տեսնել
                </button>
              </div>
              <div slot="delete" class="d-flex justify-content-start align-items-center h-100">
                <i class="mdi mdi-delete text-danger" style="font-size: 30px; cursor: pointer;"></i>
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
    name: 'suppliers',
    data() {
      return {
        proxyUrl: process.env.VUE_APP_API_URL,
        columns: ['name', 'code', 'cpvs_count', 'type', 'winner_determining_type', 'customer', 'status', 'end_date', 'project', 'delete'],
        options: {
          requestAdapter (data) {
            return {
              limit: data.limit ? data.limit : 5,
              page: data.page,
              responded: 0,
              is_signature: 0,
              user_id: this.params.component.me.id,
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
            cpvs_count: 'Քանակ',
            name: 'Ընթացակարգի անվանում',
            code: 'Ծածկագիր',
            type: 'Ընթացակարգի տեսակ',
            winner_determining_type: 'Հաղթողին որոշելու կարգը',
            customer: 'Պատվիրատու',
            category: 'Խումբ / Կատեգորիա',
            project: 'Պայմանագրի նախագիծ',
            end_date: 'Վերջնաժամկետ',
            status: 'Կարգավիճակ',
            details: 'Մանրամասն',
            delete: '',
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
      async resetComponent() {
        await this.$refs.vtable.refresh()
      },
    },
  }
</script>