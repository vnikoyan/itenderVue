<template>
  <div class="h-100">
    <div class="row m-0 p-0">
      <div :class="isMobile ? 'col-12 text-center' : 'col-auto p-0'">
        <div class="d-inline-block page-title-box-spacing">
          <div class="d-flex align-items-center topbar-right-spacing name-header" :class="isMobile && 'm-0'">
            <div>Առաջարկներ</div>
          </div>
        </div>
      </div>
      <div :class=" isMobile ? 'col-12 text-center' : 'col-auto p-0'">
        <div class="d-inline-block">
          <ul class="nav nav-tabs align-items-end" :class=" isMobile ? 'suggestions-tab-mobile' : 'suggestions-tab '" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="home-tab" data-toggle="tab" href="#all" @click.prevent="$router.push('/participant/suggestions/all')" role="tab" aria-controls="home" aria-selected="true">Ստացված</a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#accepted" @click.prevent="$router.push('/participant/suggestions/accepted')" role="tab" aria-controls="profile" aria-selected="false">Ներկայացված</a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link active" id="contact-tab" data-toggle="tab" href="#signature" @click.prevent="$router.push('/participant/suggestions/signature')" role="tab" aria-controls="contact" aria-selected="false">Սևագրեր</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tab-content content-height" :class="isMobile ? 'suggestions-tab-content-mobile' : 'suggestions-tab-content'" id="myTabContent">
      <div class="tab-pane fade show active h-100" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <div class="card h-100">
          <div class="card-body p-0">
            <div class="row w-100 m-0">
              <div class="col-12 tenders-list p-0">
                  <v-server-table
                    ref="vtable"
                    :url="`${proxyUrl}suggestions/get`"
                    :options="options"
                    :columns="columns"
                  >
                    <div slot="name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.organize.name}}</span>
                    </div>
                    <div slot="code" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.organize.code}}</span>
                    </div>
                    <div slot="cpvs_count" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.organize.organize_rows.length}}</span>
                    </div>
                    <div slot="type" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.is_itender ? 'iTender մրցույթներ' : 'Պետական մեկ անձի մրցույթներ'}}</span>
                    </div>
                    <div slot="winner_determining_type" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.organize.winner_by_lots ? 'Ըստ չափաբաժինների' : 'Ըստ ընդհանուր գնի'}}</span>
                    </div>
                    <div slot="customer" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.client.name}}</span>
                    </div>
                    <div slot="status" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.organize.status === 'finished' ? 'Ավարտված' : 'Ընթացիկ' }}</span>
                    </div>
                    <div slot="end_date" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <span class="w-100">{{row.organize.finish_date}}</span>
                    </div>
                    <div slot="project" class="d-flex flex-wrap justify-content-start align-items-center h-100" slot-scope="{row}">
                      <template v-if="!row.organize.is_canceled">
                        <div v-if="row.organize.status !== 'finished'" class="col-auto">
                          <button type="button" @click="() => {$modal.show('suggestion-modal', {...row, resetComponent});}" data-toggle="modal" data-animation="bounce" class="btn btn-primary mr-2 d-flex justify-content-start align-items-center h-100 align-items-center">
                            <span>Ներկայացնել առաջարկ</span>
                          </button>
                        </div>
                        <div v-if="row.organize.contract !== ''" class="col-auto mt-2">
                          <button type="button" @click.stop="() => {$modal.show('contract-draft-modal', row);}" class="btn btn-light d-flex justify-content-start align-items-center h-100 align-items-center" data-toggle="modal" data-animation="bounce">
                            <svg class="mr-2" width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.220703 10.7619C0.220703 11.3571 0.696894 11.8333 1.29213 11.8333H9.56594C10.1612 11.8333 10.6374 11.3571 10.6374 10.7619V1.23805C10.6374 0.642816 10.1612 0.166626 9.56594 0.166626H1.29213C0.696894 0.166626 0.220703 0.642816 0.220703 1.23805V10.7619ZM9.68499 10.8809H1.17308V1.11901H9.68499V10.8809ZM2.78024 2.72625H8.13739V3.67863H2.78024V2.72625ZM8.13739 8.3213H2.78024V9.27368H8.13739V8.3213ZM2.78024 5.52377H8.13739V6.47615H2.78024V5.52377Z" fill="#006BE6"/>
                            </svg>
                            <span>Պայմանագրի նախագիծ</span>
                          </button>
                        </div>
                      </template>
                      <template v-else>
                        Ընթացակարգը չեղարկվել է, քանի որ <b>{{row.organize.cancel_reason}}</b>
                      </template>
                    </div>
                    <div slot="delete" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                      <div class="w-100 հ-100" @click.stop="deleteSuggestion(row.id)">
                        <svg v-tooltip="'Ջնջել'" style="cursor: pointer;" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.03955 0H11.3096V1.5H5.03955V0ZM0.429688 3.29004H15.9297V4.79004H14.4297V15.59C14.4271 16.0534 14.2418 16.497 13.9142 16.8246C13.5866 17.1522 13.143 17.3374 12.6797 17.34H3.67969C3.21556 17.34 2.77044 17.1557 2.44225 16.8275C2.11406 16.4993 1.92969 16.0542 1.92969 15.59V4.79004H0.429688V3.29004ZM3.42969 15.79L12.8797 15.84L12.9197 4.79004H3.42969V15.79Z" fill="#E02232"/>
                        </svg>
                      </div>
                    </div>
                  </v-server-table>
              </div>
              <suggestion-modal />
              <specification-modal />
              <contract-draft-modal />
              <row-specification-modal/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SuggestionModal from '../modals/SuggestionModal'
  import ContractDraftModal from '../modals/ContractDraftModal'
  import SpecificationModal from '@/components/modals/SpecificationModal'
  import RowSpecificationModal from '@/components/modals/RowSpecificationModal'
  import isMobile from '@/mixins/isMobileView'

  export default {
    mixins: [isMobile],
    data() {
      return {
        name: 'SignatureSuggestions',
        proxyUrl: process.env.VUE_APP_API_URL,
        columns: ['name', 'code', 'cpvs_count', 'type', 'winner_determining_type', 'customer', 'status', 'end_date', 'project', 'delete'],
        options: {
          requestAdapter (data) {
            return {
              ...data,
              limit: data.limit ? data.limit : 5,
              page: data.page,
              responded: 0,
              is_signature: 1,
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
          sortable: [],
          columnsDropdown: false,
          filterByColumn: false,
          skin: 'table',
          headings: {
            cpvs_count: 'Քանակ',
            name: 'Ընթացակարգի անվանում',
            code: 'Ծածկագիր',
            type: 'Ընթացակարգի տեսակ',
            winner_determining_type: 'Հաղթողին որոշելու կարգը',
            customer: 'Պատվիրատու',
            category: 'Խումբ / Կատեգորիա',
            project: '',
            end_date: 'Վերջնաժամկետ',
            status: 'Կարգավիճակ',
            details: 'Մանրամասն',
            delete: '',
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
          status: { name: 'Բոլորը', value: 'all' },
          statusOptions: [
            { name: 'Բոլորը', value: 'all' },
            { name: 'Ակտիվ առաջարկներ', value: 'active' },
            { name: 'Ավարտված առաջարկներ', value: 'finished' },
          ],
        }
      }
    },
    components: {SuggestionModal, SpecificationModal, ContractDraftModal, RowSpecificationModal},
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
    },
    methods: {
      async resetComponent() {
        await this.$refs.vtable.refresh()
      },
      setSuggestionSeen(suggestionId) {
        this.$store.dispatch('suggestions/update', {id: suggestionId, data: { seen: true }}).then(async (response) => {
          this.$store.dispatch('user/me')
        })
      },
      deleteSuggestion(suggestionId) {
        this.$confirm(
          "Ջնջելուց հետո դուք այլևս չեք կարողանա վերականգնել առաջարկը", 
          "", 
          "warning", 
          {
            confirmButtonText: 'Շարունակել', 
            cancelButtonText: 'Փակել'
          }
        ).then(text => {
          this.$client.delete(`suggestions/${suggestionId}`).then(({data}) => {
            if(data.status){
              this.resetComponent();
            }
          })
        })
      }
    },
  }
</script>