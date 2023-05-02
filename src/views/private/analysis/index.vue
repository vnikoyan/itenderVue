<template>
  <div class="h-100">
    <div class="row m-0 p-0">
      <div :class="isMobile ? 'col-12 text-center' : 'col-auto p-0'">
        <div class="d-inline-block page-title-box-spacing">
          <div class="d-flex align-items-center topbar-right-spacing name-header" :class="isMobile && 'm-0'">
            <div v-if="Object.keys(selectedCpv).length !== 0 && isMobile">{{selectedCpv.code}}</div>
            <div v-else>Վիճակագրություն</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-height">
      <div class="row m-0 p-0 h-100">
        <div v-if="Object.keys(selectedCpv).length === 0 || !isMobile" class="col-12 col-lg-5 p-0 h-100">
          <div class="card h-100">
            <div class="card-header">
              CPV ցանկ
            </div>
            <div class="card-body p-1" style="height: calc(100% - 56px)">
              <div class="tab-content h-100">
                <div class="tab-panel h-100" :class="{'active': organizeType === 0}" id="settings-1" role="tabpanel">
                  <StateCategory :selectedCpv.sync="selectedCpv" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <template v-if="!isMobile">
          <div class="col-12 col-lg-7 p-0 padding-l-20">
            <template v-if="!loaded">
              <div class="text-center h-100 d-flex align-items-center">
                <div class="col p-0">
                  <div class="spinner-border spinner-border-xl text-primary"></div>
                </div>
              </div>
            </template>
            <template v-else-if="specifications.length === 0">
              <div class="text-center h-100 d-flex align-items-center">
                <div class="col p-0">
                  Չկա ընտված գնման առարկա
                </div>
              </div>
            </template>
            <template v-else>
              <div id="settings">
                <div
                  class="card specification-card"
                  :class="[[opened(specification.id) ? 'opened' : ''], [index === specifications.length-1 ? 'm-0' : '']]"
                  v-for="(specification, index) in specifications"
                  :key="index"
                >
                  <div class="card-header">
                    <button @click="openSpecification(specification.id)" class="d-flex align-items-center w-100 h-100 text-left" type="button" data-toggle="collapse" :data-target="`#openCpv${index}`" aria-expanded="false" :aria-controls="`openCpv${index}`">
                      <span :data-target="`#openCpv${index}`" aria-expanded="false" :aria-controls="`openCpv${index}`" class="mb-0 w-100 text-truncate">
                        {{specification.description.hy}}
                      </span>
                      <svg width="14" height="8" viewBox="0 0 14 8">
                        <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
                      </svg>
                    </button>
                  </div>
                  <div :id="`openCpv${index}`" class="collapse" data-parent="#settings" data-bs-parent="#settings">
                    <div class="d-flex flex-column padding-20">
                      <div>
                        {{specification.description.hy}}
                        <hr/>
                      </div>
                      <div v-if="specification.description.ru">
                        {{specification.description.ru}}
                        <hr/>
                      </div>
                      <div class="d-flex">
                        <div class="col p-0">
                          <div class="vfl-has-label">
                            <label v-if="Object.values(dateRange).length !== 0" class="vfl-label" :class="dateRange && 'vfl-label-on-input vfl-label'">Ժամանակահաված *</label>
                            <date-range-picker
                              ref="picker"
                              class="w-100"
                              control-container-class="tender-input form-control m-0 br-12"
                              v-model="dateRange"
                              :date-format="(e, i) => dateFormat(e, i, specification.id)"
                              @update="(e) => handleChangeDateRange(e, specification.id)"
                              :ranges="ranges()"
                              :locale-data="{
                                format: 'dd.mm.yyyy',
                                separator: ' - ',
                                applyLabel: 'Հաստատել',
                                cancelLabel: 'Չեղարկել',
                                weekLabel: 'Շ',
                                daysOfWeek: ['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր'],
                                monthNames: ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'],
                              }"
                            >
                              <template #input="picker" style="min-width: 350px;">
                                <template v-if="picker.startDate">
                                  {{ $moment(picker.startDate).format('DD.MM.YYYY') }} - {{ $moment(picker.endDate).format('DD.MM.YYYY') }}
                                </template>
                                <template v-else>
                                  Ժամանակահաված *
                                </template>
                              </template>
                            </date-range-picker>
                          </div>
                        </div>
                        <div class="col-3 p-0 padding-l-20">
                          <float-label :dispatch="false">
                            <select v-model="unit" :disabled="!specification.units.length" class="tender-input form-control m-0 br-12">
                              <option disabled selected value="0">Չափման միավոր *</option>
                              <option :value="unit.id" v-for="unit in specification.units" :key="unit.id">
                                {{unit.title.hy}}
                              </option>
                            </select>
                          </float-label>
                        </div>
                        <div class="col-3 p-0 padding-l-20">
                          <float-label :dispatch="false">
                            <select v-model="region" :disabled="!specification.regions.length" class="tender-input form-control m-0 br-12">
                              <option disabled selected value="0">Տարածաշրջան *</option>
                              <option :value="region.id" v-for="region in specification.regions" :key="region.id">
                                {{region.name}}
                              </option>
                              <!-- <option value="1">Արագածոտնի մարզ</option>
                              <option value="2">Արարատի մարզ</option>
                              <option value="3">Արմավիրի մարզ</option>
                              <option value="4">Գեղարքունիքի մարզ</option>
                              <option value="5">Լոռու մարզ</option>
                              <option value="6">Կոտայքի մարզ</option>
                              <option value="7">Շիրակի մարզ</option>
                              <option value="8">Սյունիքի մարզ</option>
                              <option value="9">Վայոց ձորի մարզ</option>
                              <option value="10">Տավուշի մարզ</option>
                              <option value="11">Երևան</option> -->
                            </select>
                          </float-label>
                        </div>
                        <div class="col-auto p-0 padding-l-20">
                          <button @click="getStatistics(specification.id)" class="btn btn-primary br-8">
                            <span>Ստանալ</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <hr/>
                        <v-client-table class="statistics-table" :columns="columns" v-model="data" :options="options">
                          <template slot="prependHead">
                            <tr class="additional-row">
                              <template v-if="userType !== 'STATE'">
                                <th colspan="3"></th>
                                <th colspan="3">
                                  Նախահաշվարկային գին
                                </th>
                                <th colspan="3">
                                  Մասնակիցների գներ
                                </th>
                                <th colspan="5"></th>
                              </template>
                              <template v-else>
                                <th colspan="3">
                                  Նախահաշվարկային գին
                                </th>
                                <th></th>
                              </template>
                            </tr>
                          </template>
                          <div slot="count" class="table-data-block" slot-scope="{row}">
                            {{row.count}}
                          </div>
                          <div slot="established_count" class="table-data-block" slot-scope="{row}">
                            {{row.establishedCount}}
                          </div>
                          <div slot="unestablished_count" class="table-data-block" slot-scope="{row}">
                            <template v-if="row.unestablishedCount">
                                <ul class="pl-3 ml-1 pr-1">
                                  <li>հայտերից ոչ մեկը չի համապատասխանում հրավերի պայմաններին՝ {{row.notMatchConditionsCount}}</li>
                                  <li>դադարում է գոյություն ունենալ գնման պահանջը՝ {{row.notRequirementPurchaseCount}}</li>
                                  <li>ոչ մի հայտ չի ներկայացվել՝ {{row.noSubmittedApplicationCount}}</li>
                                  <li>պայմանագիր չի կնքվում՝ {{row.noContractSignedCount}}</li>
                                </ul>
                            </template>
                          </div>
                          <div slot="min_estimated_price" class="table-data-block" slot-scope="{row}">
                            {{row.minEstimatedPrice ? `${row.minEstimatedPrice}դր․` : '-'}}
                          </div>
                          <div slot="avg_estimated_price" class="table-data-block" slot-scope="{row}">
                            {{row.avgEstimatedPrice ? `${row.avgEstimatedPrice}դր․` : '-'}}
                          </div>
                          <div slot="max_estimated_price" class="table-data-block" slot-scope="{row}">
                            {{row.maxEstimatedPrice ? `${row.maxEstimatedPrice}դր․` : '-'}}
                          </div>
                          <div slot="min_presented_price" class="table-data-block" slot-scope="{row}">
                            {{row.minPresentedPrice ? `${row.minPresentedPrice}դր․ (${row.minPresentedPriceParticipant})` : '-'}}
                          </div>
                          <div slot="avg_presented_price" class="table-data-block" slot-scope="{row}">
                            {{row.avgPresentedPrice ? `${row.avgPresentedPrice}դր․` : '-'}}
                          </div>
                          <div slot="max_presented_price" class="table-data-block" slot-scope="{row}">
                            {{row.maxPresentedPrice ? `${row.maxPresentedPrice}դր․` : '-'}}
                          </div>
                          <div slot="popular_price" class="table-data-block" slot-scope="{row}">
                            {{row.popularPrice ? `${row.popularPrice}դր․` : '-'}}
                          </div>
                          <div slot="avg_participants_count" class="table-data-block" slot-scope="{row}">
                            {{row.avgParticipantsCount ? `${row.avgParticipantsCount}` : '-'}}
                          </div>
                          <div slot="plan_price_summary" class="table-data-block" slot-scope="{row}">
                            {{row.planPriceSummary ? `${row.planPriceSummary}դր․` : '-'}}
                          </div>
                          <div slot="estimated_price_summary" class="table-data-block" slot-scope="{row}">
                            {{row.estimatedPriceSummary ? `${row.estimatedPriceSummary}դր․` : '-'}}
                          </div>
                        </v-client-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-else-if="Object.keys(selectedCpv).length !== 0">
          <div class="col-12 text-center">
            <div class="row justify-content-center">
              <div class="col-auto p-0">
                <button @click="selectedCpv = {}" class="btn btn-big btn-outline-secondary">
                  <span>Դադարեցնել</span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 p-0 mt-4">
            <template v-if="!loaded">
              <div class="text-center h-100 d-flex align-items-center">
                <div class="col p-0">
                  <div class="spinner-border spinner-border-xl text-primary"></div>
                </div>
              </div>
            </template>
            <template v-else-if="specifications.length === 0">
              <div class="text-center h-100 d-flex align-items-center">
                <div class="col p-0">
                  Չկա ընտված գնման առարկա
                </div>
              </div>
            </template>
            <template v-else>
              <div id="settings">
                <div
                  class="card specification-card"
                  :class="[[opened(specification.id) ? 'opened' : ''], [index === specifications.length-1 ? 'm-0' : '']]"
                  v-for="(specification, index) in specifications"
                  :key="index"
                >
                  <div class="card-header">
                    <button @click="openSpecification(specification.id)" class="d-flex align-items-center w-100 h-100 text-left" type="button" data-toggle="collapse" :data-target="`#openCpv${index}`" aria-expanded="false" :aria-controls="`openCpv${index}`">
                      <span :data-target="`#openCpv${index}`" aria-expanded="false" :aria-controls="`openCpv${index}`" class="mb-0 w-100 text-truncate">
                        {{specification.description.hy}}
                      </span>
                      <svg width="14" height="8" viewBox="0 0 14 8">
                        <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
                      </svg>
                    </button>
                  </div>
                  <div :id="`openCpv${index}`" class="collapse" data-parent="#settings" data-bs-parent="#settings">
                    <div class="d-flex flex-column padding-20">
                      <div>
                        {{specification.description.hy}}
                        <hr/>
                      </div>
                      <div v-if="specification.description.ru">
                        {{specification.description.ru}}
                        <hr/>
                      </div>
                      <div class="row p-0 m-0">
                        <div class="col-12 p-0">
                          <div class="vfl-has-label">
                            <label v-if="Object.values(dateRange).length !== 0" class="vfl-label" :class="dateRange && 'vfl-label-on-input vfl-label'">Ժամանակահաված *</label>
                            <date-range-picker
                              ref="picker"
                              class="w-100"
                              control-container-class="tender-input form-control m-0 br-12"
                              v-model="dateRange"
                              :date-format="dateFormat"
                              @update="(e) => handleChangeDateRange(e, specification.id)"
                              :ranges="ranges()"
                              :locale-data="{
                                format: 'dd.mm.yyyy',
                                separator: ' - ',
                                applyLabel: 'Հաստատել',
                                cancelLabel: 'Չեղարկել',
                                weekLabel: 'Շ',
                                daysOfWeek: ['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր'],
                                monthNames: ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'],
                              }"
                            >
                              <template #input="picker" style="min-width: 350px;">
                                <template v-if="picker.startDate">
                                  {{ $moment(picker.startDate).format('DD.MM.YYYY') }} - {{ $moment(picker.endDate).format('DD.MM.YYYY') }}
                                </template>
                                <template v-else>
                                  Ժամանակահաված *
                                </template>
                              </template>
                            </date-range-picker>
                          </div>
                        </div>
                        <div class="col-12 p-0 padding-t-20">
                          <float-label :dispatch="false">
                            <select v-model="unit" :disabled="!specification.units.length" class="tender-input form-control m-0 br-12">
                              <option disabled selected value="0">Չափման միավոր *</option>
                              <option :value="unit.id" v-for="unit in specification.units" :key="unit.id">
                                {{unit.title.hy}}
                              </option>
                            </select>
                          </float-label>
                        </div>
                        <div class="col-12 p-0 padding-t-20">
                          <float-label :dispatch="false">
                            <select v-model="region" :disabled="!specification.regions.length"  class="tender-input form-control m-0 br-12">
                              <option disabled selected value="0">Տարածաշրջան *</option>
                              <option :value="region.id" v-for="region in specification.regions" :key="region.id">
                                {{region.name}}
                              </option>
                            </select>
                          </float-label>
                        </div>
                        <div class="col-auto p-0 padding-t-20">
                          <button @click="getStatistics(specification.id)" class="btn btn-primary br-8">
                            <span>Ստանալ</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <hr/>
                        <v-client-table class="statistics-table" :columns="columns" v-model="data" :options="options">
                          <template slot="prependHead">
                            <tr class="additional-row">
                              <template v-if="userType !== 'STATE'">
                                <th colspan="3"></th>
                                <th colspan="3">
                                  Նախահաշվարկային գին
                                </th>
                                <th colspan="3">
                                  Մասնակիցների գներ
                                </th>
                                <th colspan="5"></th>
                              </template>
                              <template v-else>
                                <th colspan="3">
                                  Նախահաշվարկային գին
                                </th>
                                <th></th>
                              </template>
                            </tr>
                          </template>
                          <div slot="count" class="table-data-block" slot-scope="{row}">
                            {{row.count}}
                          </div>
                          <div slot="established_count" class="table-data-block" slot-scope="{row}">
                            {{row.establishedCount}}
                          </div>
                          <div slot="unestablished_count" class="table-data-block" slot-scope="{row}">
                            <template v-if="row.unestablishedCount">
                                <ul class="pl-3 ml-1 pr-1">
                                  <li>հայտերից ոչ մեկը չի համապատասխանում հրավերի պայմաններին՝ {{row.notMatchConditionsCount}}</li>
                                  <li>դադարում է գոյություն ունենալ գնման պահանջը՝ {{row.notRequirementPurchaseCount}}</li>
                                  <li>ոչ մի հայտ չի ներկայացվել՝ {{row.noSubmittedApplicationCount}}</li>
                                  <li>պայմանագիր չի կնքվում՝ {{row.noContractSignedCount}}</li>
                                </ul>
                            </template>
                          </div>
                          <div slot="min_estimated_price" class="table-data-block" slot-scope="{row}">
                            {{row.minEstimatedPrice ? `${row.minEstimatedPrice}դր․` : '-'}}
                          </div>
                          <div slot="avg_estimated_price" class="table-data-block" slot-scope="{row}">
                            {{row.avgEstimatedPrice ? `${row.avgEstimatedPrice}դր․` : '-'}}
                          </div>
                          <div slot="max_estimated_price" class="table-data-block" slot-scope="{row}">
                            {{row.maxEstimatedPrice ? `${row.maxEstimatedPrice}դր․` : '-'}}
                          </div>
                          <div slot="min_presented_price" class="table-data-block" slot-scope="{row}">
                            {{row.minPresentedPrice ? `${row.minPresentedPrice}դր․ (${row.minPresentedPriceParticipant})` : '-'}}
                          </div>
                          <div slot="avg_presented_price" class="table-data-block" slot-scope="{row}">
                            {{row.avgPresentedPrice ? `${row.avgPresentedPrice}դր․` : '-'}}
                          </div>
                          <div slot="max_presented_price" class="table-data-block" slot-scope="{row}">
                            {{row.maxPresentedPrice ? `${row.maxPresentedPrice}դր․` : '-'}}
                          </div>
                          <div slot="popular_price" class="table-data-block" slot-scope="{row}">
                            {{row.popularPrice ? `${row.popularPrice}դր․` : '-'}}
                          </div>
                          <div slot="avg_participants_count" class="table-data-block" slot-scope="{row}">
                            {{row.avgParticipantsCount ? `${row.avgParticipantsCount}` : '-'}}
                          </div>
                          <div slot="plan_price_summary" class="table-data-block" slot-scope="{row}">
                            {{row.planPriceSummary ? `${row.planPriceSummary}դր․` : '-'}}
                          </div>
                          <div slot="estimated_price_summary" class="table-data-block" slot-scope="{row}">
                            {{row.estimatedPriceSummary ? `${row.estimatedPriceSummary}դր․` : '-'}}
                          </div>
                        </v-client-table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
        <statistics-modal/>
      </div>
    </div>
  </div>
</template>

<script>
  import StateCategory from "./categoryForm/StateCategory";
  import DateRangePicker from 'vue2-daterange-picker'
  import StatisticsModal from './modals/StatisticsModal';
  import isMobile from '@/mixins/isMobileView'
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

  export default {
    components: { StateCategory, DateRangePicker, StatisticsModal },
    name: 'selectCategory',
    mixins: [isMobile],
    data() {
      return {
        selectedCpvs: [],
        specifications: [],
        data: [],
        columns: [
          'count',
          'established_count',
          'unestablished_count',
          'min_estimated_price',
          'avg_estimated_price',
          'max_estimated_price',
          'min_presented_price',
          'avg_presented_price',
          'max_presented_price',
          'popular_price',
          'avg_participants_count',
          'plan_price_summary',
          'estimated_price_summary',
        ],
        options: {
          sortable: [],
          perPage: 1000,
          perPageValues: [],
          columnsDropdown: false,
          filterByColumn: false,
          skin: 'table table-striped table-border-radius bordered-responsive',
          dateFormat: "YYYY-mm-dd",
          headings: {
            count: 'Կազմակերպված /վերլուծված/ տենդերների քանակը',
            established_count: 'Կայացած գնման ընթացակարգերի քանակը',
            unestablished_count: 'Չկայացած գնման ընթացակարգերի քանակը՝ ըստ հիմքերի',
            min_estimated_price: 'Նվազագույն',
            avg_estimated_price: 'Միջին',
            max_estimated_price: 'Առավելագույն',
            min_presented_price: 'Նվազագույն',
            avg_presented_price: 'Միջին',
            max_presented_price: 'Առավելագույն',
            popular_price: 'Ամենաշատ ներկայացված գները',
            avg_participants_count: 'Մասնակցության միջին քանակը /մրցակցությունը/',
            plan_price_summary: 'Շուկայի պոտենցիալը՝ համաձայն հրապարակված տարեկան գնումների պլանների',
            estimated_price_summary: 'Կայացած գնման գործընթացների ծավալը'
          },
          filterable: false,
        },
        organizeType: 0,
        selectedCpv: {},
        dateRange: {},
        unit: 0,
        region: 0,
        update: false,
        loaded: true,
        openedArray: [],
        open: false,
      }
    },
    async mounted() {
      this.$store.dispatch('settings/getUnits')
      if(this.userType === 'STATE'){
        this.columns = [
          'min_estimated_price',
          'avg_estimated_price',
          'max_estimated_price',
          'popular_price',
        ]
      }

    },
    watch: {
      selectedCpv: function(updatedCpv) {
        if(updatedCpv){
          this.loaded = false;
          this.$client.get(`statistics/getSpecifications/${updatedCpv.id}`).then(({data}) => {
            this.specifications = data;
            this.loaded = true;
          })
        }
      }
    },
    computed: {
      units() {
        return this.$store.getters['settings/units']
      },
      me() {
        return this.$store.getters['user/me']
      },
      userType() {
        return this.$store.getters.userType
      },
    },
    methods: {
      dateFormat (classes, date, specificationId) {
        const currentSpecification = this.specifications.find((value) => value.id === specificationId);
        currentSpecification.winner_get_dates.forEach((currentDate) => {
          if(currentDate === this.$moment(date).format('YYYY-MM-DD')){
            classes.hasStatistics = true;
          }
        })
        return classes
      },
      handleChangeDateRange(item, specificationId){
        const requestQuery = {
          startDate: this.$moment(item.startDate).format('YYYY-MM-DD'),
          endDate: this.$moment(item.endDate).format('YYYY-MM-DD'),
        };
        this.$client.post(`statistics/getFilterDatas/${specificationId}`, requestQuery).then(({data}) => {
          const currentSpecification = this.specifications.find((value) => value.id === specificationId);
          currentSpecification.units = data.units;
          currentSpecification.regions = data.regions;
        })
      },
      getStatistics(specificationId){
        this.data = [];
        const requestQuery = {
          startDate: this.$moment(this.dateRange.startDate).format('YYYY-MM-DD'),
          endDate: this.$moment(this.dateRange.endDate).format('YYYY-MM-DD'),
          unit: this.unit,
          region: this.region
        };
        this.$client.post(`statistics/getCpvStatistics/${specificationId}`, requestQuery).then(({data}) => {
          if(data.length){
            let potential = 0;
            const days = this.$moment(this.dateRange.endDate).diff(this.$moment(this.dateRange.startDate), 'days')
            if(days <= 366 && days >= 364){
              const year = this.$moment(this.dateRange.endDate).format('YYYY')
              potential = this.selectedCpv.potential_electronic[year]
            }
            if(potential){
              potential = potential + this.selectedCpv.potential_paper;
            }
            this.showStatistics({data, potential})
          } else {
            this.$notify({
              group: 'foo',
              type: 'info',
              text: 'Համընկնող վիճակագրություն չկա'
            })
          }
        })
      },
      showStatistics(params){
        this.data = [];
        const {data, potential} = params
        console.log('potential', potential)
        let minEstimatedPrice = 0;
        let maxEstimatedPrice = 0;
        let avgEstimatedPrice = 0;
        let minPresentedPrice = 0;
        let minPresentedPriceParticipant = 0;
        let maxPresentedPrice = 0;
        let avgPresentedPrice = 0;
        let popularPrice = 0;
        let avgParticipantsCount = 0;
        let planPriceSummary = 0;
        let estimatedPriceSummary = 0;

        const count = data.length;
        const establishedCount = data.filter(item => item.established).length;
        const unestablishedCount = data.filter(item => !item.established).length;
        const notMatchConditionsCount = data.filter(item => !item.established && item.failed_substantiation === 'not_match_conditions').length;
        const notRequirementPurchaseCount = data.filter(item => !item.established && item.failed_substantiation === 'not_requirement_purchase').length;
        const noSubmittedApplicationCount = data.filter(item => !item.established && item.failed_substantiation === 'no_submitted_application').length;
        const noContractSignedCount = data.filter(item => !item.established && item.failed_substantiation === 'no_contract_signed').length;
        planPriceSummary = 0;
        if(establishedCount){
            estimatedPriceSummary = data.filter(item => item.established).map(item => item.estimated_price).reduce((a, b) => a + b, 0);
        }
        minEstimatedPrice = Math.min(...data.filter(item => item.estimated_price).map(item => item.estimated_price_unit));
        maxEstimatedPrice = Math.max(...data.filter(item => item.estimated_price).map(item => item.estimated_price_unit));
        avgParticipantsCount = Math.round(data.filter(item => item.estimated_price).map(item => item.participants.length).reduce((a, b) => a + b, 0) / data.filter(item => item.estimated_price).length, 2);
        avgEstimatedPrice = data.filter(item => item.estimated_price).map(item => item.estimated_price_unit).reduce((a, b) => a + b, 0) / data.filter(item => item.estimated_price).length;
        const participants = data.map(item => item.participants).reduce((a, b) => a ? [...a, ...b] : [...b], 0)
        if(participants.length){
            minPresentedPrice = Math.min(...participants.map(item => item.total_unit));
            minPresentedPriceParticipant = participants.find((item) => item.total_unit === minPresentedPrice).name;
            maxPresentedPrice = Math.max(...participants.map(item => item.total_unit));
            avgPresentedPrice = Math.round(participants.map(item => item.total_unit).reduce((a, b) => a + b, 0) / participants.length, 2);
            popularPrice = participants.map(item => item.total_unit).reduce((a,b,i,arr) => (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), 0);
        }
        const rowData = {
          count,
          establishedCount,
          unestablishedCount,
          notMatchConditionsCount,
          notRequirementPurchaseCount,
          noSubmittedApplicationCount,
          noContractSignedCount,
          minEstimatedPrice,
          maxEstimatedPrice,
          avgEstimatedPrice,
          minPresentedPrice,
          minPresentedPriceParticipant,
          maxPresentedPrice,
          avgPresentedPrice, 
          popularPrice,
          avgParticipantsCount,
          planPriceSummary,
          estimatedPriceSummary,
        }
        this.data.push(rowData);
      },
      openSpecification(id){
        this.data = [];
        this.dateRange = {};
        this.unit = 0;
        this.region = 0;
        const foundIndex = this.openedArray.findIndex(item => item === id)
        if(foundIndex >= 0){
          this.openedArray.splice(foundIndex, 1)
        } else {
          this.openedArray[0] = id
        }
      },
      ranges(){
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)
        yesterday.setHours(0, 0, 0, 0);
        return {
            // 'Այսօր': [today, today],
            'Այս ամիս': [new Date(today.getFullYear(), today.getMonth(), 1), new Date(today.getFullYear(), today.getMonth() + 1, 0)],
            'Նախորդ ամիս': [new Date(today.getFullYear(), today.getMonth() - 1, 1), new Date(today.getFullYear(), today.getMonth(), 0)],
            '2022 թվական': [new Date(2022, 0, 1), new Date(2022, 11, 31)],
            '2023 թվական': [new Date(2023, 0, 1), new Date(2023, 11, 31)],
        };
      },
      opened(id){
        const foundIndex = this.openedArray.findIndex(item => item === id)
        return foundIndex >= 0 
      }
    },
  }
</script>
<style>
  .statistics-table table thead tr th:first-child{
    white-space: normal;
  }
  .statistics-table thead tr:not(.additional-row) th:nth-child(4),
  .statistics-table thead tr:not(.additional-row) th:nth-child(7),
  .statistics-table thead tr:not(.additional-row) th:nth-child(10),
  .statistics-table table tbody .VueTables__row td:nth-child(4),
  .statistics-table table tbody .VueTables__row td:nth-child(7),
  .statistics-table table tbody .VueTables__row td:nth-child(10)
  {
    border-left: 2px solid #DADDE6 !important;
  }
</style>
<style scoped>
  .additional-row th{
    text-align: center !important;
    color: #595E6B;
    border-left: 2px solid #DADDE6;
    border-right: 2px solid #DADDE6;
  }

  .additional-row{
    background: #EDEFF2;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
  }
  .specification-card{
    margin-bottom: 12px;
  }
  .specification-card .card-header{
    border-radius: 12px;
    padding: 16px 20px !important;
    height: 56px;
  }
  .specification-card .card-header {
    font-size: 16px;
    line-height: 24px;
    color: #40444D;
  }
</style>
