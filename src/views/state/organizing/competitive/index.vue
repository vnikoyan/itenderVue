<template>
  <div class="row">
    <delete-modal />
    <div class="col-lg-12">
      <div class="card h-100">
        <div class="card-body">
            <div class="btn-group dropright show mb-3">
              <button tyle="hover: none;" type="button" class="btn btn-primary rounded-pill uitooltip" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <a href="" @click.prevent class="text-white"
                    style="box-shadow: none;">
                  <i class="fas fa-plus mr-2"></i>
                 <span>Ավելացնել ընթացակարգ</span>
                </a>
              </button>
              <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 39px, 0px);">
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(1)" href="">Ապրանք</a>
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(2)" href="">Ծառայություններ</a>
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(3)" href="">Աշխատանք</a>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div class="bg-light p-4 mob-style h-100">
                  <h4 class="header-title mb-3 mt-0"> {{ column_title_1 }}</h4>
                  <div id="project-list-left" class="little-scroll pr-3" style="height: 580px; overflow-y: auto;">
                    <div v-for="procurement in procurementsInInvitationStage"
                          :key="procurement.id" class="card mb-4">
                      <div class="card-body">
                        <div class="card-header mb-2 bg-white p-0 container-fluid">
                          <div class="row">
                              <div class="col-10">
                                <h6 class="mt-0">{{ procurement.translations.name[locale] }} - {{ procurement.translations.code[locale] }}</h6>
                              </div>
                              <div class="col-2 px-1">
                                <button type="button text-danger" class="close" aria-label="Close">
                                  <a v-tooltip="'Հեռացնել'" @click.prevent="openDeleteModal(procurement.id)" class="" href="">
                                    <i class="mdi mdi-trash-can-outline text-danger font-18"></i>
                                  </a>
                                </button>
                              </div>
                          </div>
                        </div>
                        <div class="row justify-content-end align-items-end">
                          <div class="col-9">
                            <button @click="$router.push({ path: `competitive/prepare-invitation/${procurement.id}?cpvType=${procurement.cpv_type}`})" class="btn btn-primary">
                              <i class="fa fa-eye mr-1"></i> <span>Դիտել</span>
                            </button>
                          </div>
                          <div class="col-3 p-0 justify-content-end">
                            <div class="justify-content-end text-right w-100 font-12">
                              <p class="text-muted m-0 float-right date-bloc text-right">
                                <span v-if="procurement.opening_time" class="text-muted">{{ procurement.opening_time }} <i class="far fa-fw fa-clock"></i></span>
                                <br>
                                <span>{{ procurement.opening_date }}</span>
                                <br>
                                <span>{{ getCpvTypeName(procurement) }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="bg-light p-4 mob-style">
                  <h4 class="header-title mb-3 mt-0"> {{ column_title_2 }}</h4>
                  <div id="project-list-middle" class="little-scroll pr-3" style="height: 580px; overflow-y: auto;">
                    <div v-for="procurement in procurementsInEvaluationStage"
                          :key="procurement.id" class="card mb-4">
                      <div class="card-body">
                        <div class="card-header mb-2 bg-white p-0 container-fluid">
                          <div class="row">
                              <div class="col-10">
                                <h6 class="mt-0">{{ procurement.translations.name[locale] }} - {{ procurement.translations.code[locale] }}</h6>
                              </div>
                              <div class="col-2 px-1">
                                <button type="button text-danger" class="close" aria-label="Close">
                                  <a v-tooltip="'Հեռացնել'" @click.prevent="openDeleteModal(procurement.id)" class="" href="">
                                    <i class="mdi mdi-trash-can-outline text-danger font-18"></i>
                                  </a>
                                </button>
                              </div>
                          </div>
                        </div>
                        <div class="row justify-content-end align-items-end">
                          <div class="col-9">
                            <button @click="$router.push(`competitive/application-evaluation/${procurement.id}`)" class="btn btn-primary">
                              <i class="fa fa-eye mr-1"></i> <span>Դիտել</span>
                            </button>
                          </div>
                          <div class="col-3 p-0 justify-content-end">
                            <div class="justify-content-end text-align-right w-100 font-12">
                              <p class="text-muted m-0 float-right date-bloc text-right">
                                <span v-if="procurement.opening_time" class="text-muted">{{ procurement.opening_time }} <i class="far fa-fw fa-clock"></i></span>
                                <br>
                                <span>{{ procurement.opening_date }}</span>
                                <br>
                                <span>{{ getCpvTypeName(procurement) }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <!--end task-box-->
                      </div>
                      <!--end card-body-->
                    </div>
                    <infinite-loading ref="evaluationColumnInfiniteLoading" @infinite="evaluationColumnInfiniteHandler">
                      <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
                      <div slot="no-results"></div>
                      <div slot="no-more"></div>
                    </infinite-loading>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="bg-light p-4 mob-style">
                  <h4 class="header-title mb-3 mt-0"> {{ column_title_3 }}</h4>
                  <div id="project-list-right" class="little-scroll pr-3"  style="height: 580px; overflow-y: auto;">
                    <div v-for="procurement in procurementsInContractStage"
                          :key="procurement.id" class="card mb-4">
                      <div class="card-body">
                        <div class="card-header mb-2 bg-white p-0 container-fluid">
                          <div class="row">
                              <div class="col-10">
                                <h6 class="mt-0">{{ procurement.translations.name[locale] }} - {{ procurement.translations.code[locale] }}</h6>
                              </div>
                              <div class="col-2 px-1">
                                <button type="button text-danger" class="close" aria-label="Close">
                                  <a v-tooltip="'Հեռացնել'" @click.prevent="openDeleteModal(procurement.id)" class="" href="">
                                    <i class="mdi mdi-trash-can-outline text-danger font-18"></i>
                                  </a>
                                </button>
                              </div>
                          </div>
                        </div>
                        <div class="row justify-content-end align-items-end">
                          <div class="col-9">
                            <button @click="$router.push(`competitive/contract-preparation/${procurement.id}`)" class="btn btn-primary">
                              <i class="fa fa-eye mr-1"></i> <span>Դիտել</span>
                            </button>
                          </div>
                          <div class="col-3 p-0 justify-content-end">
                            <div class="justify-content-end text-align-right w-100 font-12">
                              <p class="text-muted m-0 float-right date-bloc text-right">
                                <span v-if="procurement.opening_time" class="text-muted">{{ procurement.opening_time }} <i class="far fa-fw fa-clock"></i></span>
                                <br>
                                <span>{{ procurement.opening_date }}</span>
                                <br>
                                <span>{{ getCpvTypeName(procurement) }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import DeleteModal from '@/components/helpers/DeleteModal'

  export default {
    components: { InfiniteLoading, DeleteModal },
    data() {
      return {
        procurementsInInvitationStage: [],
        procurementsInEvaluationStage: [],
        procurementsInContractStage: [],
        invitationColumnPagination: {},
        evaluationColumnPagination: {},
        competitionType: 'Competitive',
        column_title_1: 'Հրավերի պատրաստում',
        column_title_2: 'Հայտերի գնահատում',
        column_title_3: 'Պայմանագրի պատրաստում',
        cipher_1: 'Ծածկագիր անվանում 1',
        cipher_2: 'Ծածկագիր անվանում 2',
        cipher_3: 'Ծածկագիր անվանում 3',
        hour: '01:33',
        month: ' June 18',
        specifications: ' There are many variations of passages alteration in some form.',
      }
    },
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
      this.$store.dispatch('user/me')
      this.$store.dispatch('procurement/getPlans')
    },
    methods: {
      getCpvTypeName(organize){
        const type = +organize.cpv_type;
        switch (type) {
          case 1:
            return 'Ապրանք';
          case 2:
            return 'Ծառայություն';
          case 3:
            return organize.is_construction? 'Շինարարական աշխատանք' : 'Աշխատանք';
          default:
            break;
        }
      },
      organizeNewProcurement(cpvType) {
        this.$store.dispatch('organize/create', {type: cpvType, rights: this.me.rights_responsibilities_fulfillment}).then(response => {
          if(response.data.status) {
            const route = `competitive/prepare-invitation/${response.data.data.id}`
            this.$router.push({
              path: route,
              query: {
                cpvType
              }
            })
          }
          return response
        })
      },
      evaluationColumnInfiniteHandler($state) {
        this.getProcurementsRequest((this.evaluationColumnPagination.page + 1) || 1)
          .then(({data: {data, pagination}}) => {
            if (data.length) {
              this.evaluationColumnPagination = pagination;
              const invitations = data.filter(item=>item.publication === '' || !item.publication)
              this.procurementsInInvitationStage.push(...invitations);
              const doneEvaluations = data.filter(item=>item.create_contract)
              this.procurementsInContractStage.push(...doneEvaluations);
              const evaluations = data.filter(item=>!item.create_contract).filter(item=>item.publication !== '' && item.publication)
              this.procurementsInEvaluationStage.push(...evaluations);
              $state.loaded();
            } else {
              $state.complete();
            }
          })
      },
      openDeleteModal(procurementId) {
        this.$modal.show('delete-modal', {
          msg: 'Դուք իրո՞ք ցանկանում եք հեռացնել ընթացակարգը',
          callback: async () => {
            const response = await this.$client.delete(`organize/${procurementId}`)
            if(response.data.status) {
              this.procurementsInInvitationStage = []
              this.procurementsInEvaluationStage = []
              this.procurementsInContractStage = [];
              this.invitationColumnPagination = {}
              this.evaluationColumnPagination = {}
              this.$refs.evaluationColumnInfiniteLoading.stateChanger.reset()
              this.$modal.hide('delete-modal')
            }
          }
        })
      },
      getProcurementsRequest(page) {
        return this.$client.get('organize/getByUser', {
          params: { page }
        })
      }
    },
  }
</script>

<style scoped>
  .date-bloc span {
    font-size: 12px;
  }
  @media only screen and (max-width: 400px) {
    .mob-style{
      padding: 0 !important;
      background-color: transparent !important;
    }
    .title-text, .header-title{
      padding: 30px 0;
    }
  }
</style>
