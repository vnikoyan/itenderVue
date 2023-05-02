<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="d-flex w-100 h-100">
        <div v-if="!loaded" class="col-12 d-flex align-items-center justify-content-center" style="height: 100%; padding: 20px">
          <div style="left: 0; right: 0; top: 0; bottom: 0;" class="text-big text-primary spinner-border spinner-border-lg m-auto position-absolute"></div>
        </div>
        <div class="col-12 tenders-list p-0">
          <div v-show="loaded">
            <v-server-table :url="tableDataUrl" :columns="columns" :options="options" @filter="listenTo" @loading ="onLoading" @loaded="onLoaded" ref="table">
              <div slot="beforeLimit" class="d-flex align-content-center h-100 w-100" v-if="announcementName">
                <div class="multiselect__tag">
                  {{announcementName}}
                  <span class="multiselect__tag-icon">
                    <div class="position-relative w-100 h-100" @click="removeAnnouncement">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.45436 8.32453L8.32616 9.45273L5.00095 6.12752L1.67557 9.45291L0.547363 8.32471L3.87275 4.99932L0.547987 1.67456L1.67619 0.546356L5.00095 3.87112L8.32554 0.546533L9.45374 1.67474L6.12915 4.99932L9.45436 8.32453Z" fill="#595E6B"/>
                      </svg>
                    </div>
                  </span>
                </div>
              </div>
              <div slot="afterLimit" class="row align-content-center h-100 w-100 m-0">
                <div class="col p-0 favorite-filter">
                  <div class="text-primary">
                    <i @click="getFavoriteTenders" :class="filters.favorite ? 'fas' : 'far'" class="fa-star size"></i>
                  </div>
                </div>
                <div class="col p-0 filters-btn">
                  <div :class="!filtersT && 'text-primary'">
                    <i class="fas fa-sliders-h size" @click="showFilters"></i>
                  </div>
                </div>
              </div>
              <div slot="beforeTable">
                <div>
                  <div class="row table-filters w-100 m-0" :class="{'d-none' : filtersT}">
                    <div class="filter-select-box col-md-2">
                      <CustomMutliSelect
                        v-model="filters.competition"
                        label="name"
                        track-by="value"
                        :options="filters.competitionOptions"
                        :searchable="false"
                        :close-on-select="false"
                        :show-labels="true"
                        :allow-empty="true"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        placeholder="Տիպ"
                      />
                    </div>
                    <div class="filter-select-box col-md-3">
                      <CustomMutliSelect
                        v-model="filters.category"
                        label="name"
                        track-by="value"
                        @input="handleMyFilters"
                        :options="filters.categoryOptions"
                        :searchable="false"
                        :close-on-select="false"
                        :show-labels="true"
                        :allow-empty="true"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        placeholder="Ընտրել"
                      />
                    </div>
                    <div class="filter-select-box col-md-2">
                      <CustomMutliSelect
                        v-model="filters.status"
                        label="name"
                        track-by="value"
                        :options="filters.statusOptions"
                        :searchable="false"
                        :close-on-select="false"
                        :show-labels="true"
                        :allow-empty="true"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        placeholder="Կարգավիճակ"
                      />
                    </div>
                    <div class="filter-select-box col-md-2">
                      <CustomMutliSelect
                        v-model="filters.order"
                        label="name"
                        track-by="value"
                        :options="filters.orderOptions"
                        :searchable="false"
                        :close-on-select="false"
                        :show-labels="true"
                        :allow-empty="true"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        placeholder="Դասավորություն"
                      />
                    </div>
                    <div class="filter-select-box col-md-3 p-0">
                      <CustomMutliSelect
                        v-model="filters.type"
                        :options="filters.typeOptions"
                        label="name"
                        track-by="value"
                        :searchable="false"
                        :close-on-select="false"
                        :show-labels="true"
                        :allow-empty="true"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        placeholder="Տեսակ"
                      />
                    </div>
                    <div class="filter-select-box col-md-2">
                      <CustomMutliSelect
                        v-if="filters.type != 'ՀՀ֊ից դուրս մրցույթներ'"
                        v-model="filters.region"
                        track-by="name"
                        label="name"
                        :options="filters.regionOptions"
                        :searchable="false"
                        :close-on-select="false"
                        :show-labels="true"
                        :allow-empty="true"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        :multiple="true"
                        placeholder="Տարածաշրջան"
                      />
                    </div>
                    <div class="filter-select-box col-md-2">
                      <CustomMutliSelect
                        v-model="filters.guaranteed"
                        :options="filters.guaranteedOptions"
                        label="name"
                        track-by="value"
                        :searchable="false"
                        :close-on-select="false"
                        :show-labels="true"
                        :allow-empty="true"
                        selectLabel=""
                        deselectLabel=""
                        selectedLabel=""
                        placeholder="Երաշխիք"
                      />
                    </div>
                    <template v-if="this.filters.type && (this.filters.type.value === 'competitive' || this.filters.type.value === 'one_person')">
                      <div class="filter-select-box col-md-3">
                        <CustomMutliSelect
                          class="mySelect"
                          v-model="filters.competitiveProductCategories"
                          :options="filters.competitiveProductCategoriesOptions"
                          label="name"
                          track-by="id"
                          :searchable="true"
                          :close-on-select="false"
                          :show-labels="true"
                          :allow-empty="true"
                          selectLabel=""
                          deselectLabel=""
                          selectedLabel=""
                          :multiple="true"
                          placeholder="Ապրանք"
                        />
                      </div>
                      <div class="filter-select-box col-md-2">
                        <CustomMutliSelect
                          class="mySelect"
                          v-model="filters.competitiveServiceCategories"
                          :options="filters.competitiveServiceCategoriesOptions"
                          label="name"
                          track-by="id"
                          :searchable="true"
                          :close-on-select="false"
                          :multiple="true"
                          :show-labels="true"
                          :allow-empty="true"
                          selectLabel=""
                          deselectLabel=""
                          selectedLabel=""
                          placeholder="Ծառայություն"
                        />
                      </div>
                      <div class="filter-select-box col-md-3">
                        <CustomMutliSelect
                          class="mySelect"
                          v-model="filters.competitiveWorkCategories"
                          :options="filters.competitiveWorkCategoriesOptions"
                          label="name"
                          track-by="id"
                          :searchable="true"
                          :close-on-select="false"
                          :multiple="true"
                          :show-labels="true"
                          :allow-empty="true"
                          selectLabel=""
                          deselectLabel=""
                          selectedLabel=""
                          placeholder="Աշխատանք"
                        />
                      </div>
                    </template>
                    <template v-if="filters.type && filters.type.value === 'competitive'" >
                      <div class="filter-select-box col-md-2 p-0">
                        <CustomMutliSelect
                          class="mySelect"
                          v-model="filters.isElectronic"
                          :options="filters.isElectronicOptions"
                          label="name"
                          track-by="value"
                          :searchable="false"
                          :close-on-select="false"
                          :show-labels="true"
                          :allow-empty="true"
                          selectLabel=""
                          deselectLabel=""
                          selectedLabel=""
                          placeholder="Էլեկտրոնային / թղթային"
                        />
                      </div>
                      <div class="filter-select-box col-md-2">
                        <CustomMutliSelect
                          v-model="filters.procedure"
                          :options="filters.procedureOptions"
                          label="contact"
                          track-by="id"
                          :searchable="false"
                          :close-on-select="false"
                          :show-labels="true"
                          :allow-empty="true"
                          selectLabel=""
                          deselectLabel=""
                          selectedLabel=""
                          :multiple="true"
                          placeholder="Ընթացակարգի տեսակ"
                        />
                      </div>
                    </template>
                    <div class="filter-search-box d-none d-md-block">
                      <button @click="handleSearchFilters" type="button" class="col-12 btn btn-primary search-bottom" data-toggle="modal" data-animation="bounce">
                        <i class="fas fa-search mr-2"></i>
                        Որոնել
                      </button>
                    </div>
                    <div class="filter-search-box w-100 p-0 d-md-none">
                      <div class="row w-100 m-0 justify-content-end">
                        <button @click="handleSearchFilters" type="button" class="col-6 btn btn-primary search-bottom" data-toggle="modal" data-animation="bounce">
                          <i class="fas fa-search mr-2"></i>
                          Որոնել
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-slot:viewed="{row}">
                <div class="row">
                  <div class="col-6 row align-items-center">
                    <div v-if="!row.viewed" class="not-viewed-cicrcle"></div>
                  </div>
                </div>
              </template>
              <template v-slot:tender_type="{row}">
                {{row.type === 3 ? 'Պետական' : 'Մասնավոր'}}
              </template>
              <div slot="favorite" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100">
                <div v-if="row.is_competition">
                  <div class="star">
                    <i :class="row.is_favorite ? 'fas' : 'far'"  @click.stop="(e) => {e.stopPropagation(); toggleStar(row.id);setTenderViewed(row.id)}" class="fa-star size text-primary"></i>
                  </div>
                </div>
              </div>
              <div slot="password" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100">
                <span class="w-100">{{row.password}}</span>
              </div>
              <div slot="organizator" slot-scope="{row}" class="text-truncate-container d-flex justify-content-start align-items-center h-100">
                <span class="w-100">{{row.organizator}}</span>
              </div>
              <div slot="products" slot-scope="{row}" class="text-truncate-container d-flex justify-content-start align-items-center h-100">
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
              <div slot="end_date" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100">
                <div style="min-width:125px;">
                  {{$moment(new Date(row.opening_date.replace(/-/g, "/"))).format('DD-MM-YYYY')}} - <br/><span class="text-primary font-weight-bold">{{$moment(new Date(row.finish_date.replace(/-/g, "/"))).format('DD-MM-YYYY HH:mm')}}</span>
                </div>
              </div>
              <div slot="price" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100">
                <template v-if="me.package === 'Գոլդ'">
                  <div v-if="row.price" class="col-12 p-0">
                      {{row.price}}
                  </div>
                  <div v-if="row.price_file" class="col-12 p-0">
                      <button type="button" @click="() => setTenderViewed(row.id)" class="btn btn-light d-flex align-items-center">
                        <a download target="_blank" :href="row.price_file">
                          <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12722 6.74516V0.5H6.18491V6.74516L8.15927 4.75807L8.93491 5.53871L6.39645 8.02258L5.62081 8.80323L4.91568 8.02258L2.37722 5.53871L3.15286 4.75807L5.12722 6.74516ZM10.0632 10.3645V8.87419H11.1914V10.2226C11.1914 10.9323 10.6273 11.5 9.92218 11.5H1.46064C0.755509 11.5 0.191406 10.9323 0.191406 10.2226V8.87419H1.31961V10.3645H10.0632Z" fill="#006BE6"/>
                          </svg>
                          <span>Բեռնել</span>
                        </a>
                      </button>
                  </div>
                </template>
                <template v-else>
                  <template v-if="row.price || row.price_file">
                    <div class="text-primary" v-tooltip="'Նախահաշվային գինը հասանելի է միայն Գոլդ փաթեթ ունեցող օգտատերերին'">
                      <i style="font-size: 24px"  class="fas fa-eye-slash"></i>
                    </div>
                  </template>
                </template>
              </div>
              <div slot="application" slot-scope="{row}" class="d-flex flex-wrap justify-content-start align-items-center h-100">
                <div>
                  <template v-if="row.is_competition">
                    <template v-if="row.kind === 'competitive'">
                      <template v-if="me.package === 'Գոլդ' || me.package === 'Պրեմիում'">
                        <template v-if="!isNotNewProcedure(row)">
                          <button type="button" @click.stop="() => {$modal.show('application-modal', {...row, addToFavorite});setTenderViewed(row.id)}" class="btn btn-primary d-flex align-items-center" data-toggle="modal" data-animation="bounce">
                            <span>Պատրաստել</span>
                          </button>
                        </template>
                      </template>
                      <template v-else>
                        <div v-tooltip="'Մրցույթի հայտ պատրաստելու գործիքը հասանելի է միայն Գոլդ կամ Պրեմիում փաթեթ ունեցող օգտատերերին'">
                          <button v-tooltip="'Մրցույթի հայտ պատրաստելու գործիքը հասանելի է միայն Գոլդ կամ Պրեմիում փաթեթ ունեցող օգտատերերին'" disabled type="button" class="btn btn-primary d-flex align-items-center">
                            <span>Պատրաստել</span>
                          </button>
                        </div>
                      </template>
                    </template>
                  <div v-if="row.kind === 'one_person' && new Date(row.finish_date) > dateNow && row.is_mine === false" >
                    <button type="button" @click.stop="() => {$modal.show('suggestion-modal', {...row, resetComponent});setTenderViewed(row.id)}" class="btn btn-primary d-flex align-items-center" data-toggle="modal" data-animation="bounce">
                      <span>Գնային առաջարկ</span>
                    </button>
                  </div>
                </template>
                  <a v-if="row.is_ended_electronic_link && row.kind !== 'private' && row.kind !== 'one_person'" target="_blank" :href="row.is_ended_electronic_link" :class="isMobile && 'pl-2'" class="link-primary w-100 watch-result">Դիտել արդյունքը</a>
                  <a v-if="row.is_ended && row.kind === 'one_person' && row.is_mine === false" href="#" @click="() => {$modal.show('result-modal', {...row, resetComponent})}"  :class="isMobile && 'pl-2'" class="link-primary w-100 watch-result">Դիտել արդյունքը</a>
                </div>
              </div>
              <div slot="invitation" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100">
                <template v-if="row.kind !== 'one_person'">
                  <template v-if="me.package !== 'Անվճար' || !row.is_closed" >
                    <button type="button" @click="() => setTenderViewed(row.id)" class="btn btn-light d-flex align-items-center">
                      <a download target="_blank" :href="row.invitation_link">
                        <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12722 6.74516V0.5H6.18491V6.74516L8.15927 4.75807L8.93491 5.53871L6.39645 8.02258L5.62081 8.80323L4.91568 8.02258L2.37722 5.53871L3.15286 4.75807L5.12722 6.74516ZM10.0632 10.3645V8.87419H11.1914V10.2226C11.1914 10.9323 10.6273 11.5 9.92218 11.5H1.46064C0.755509 11.5 0.191406 10.9323 0.191406 10.2226V8.87419H1.31961V10.3645H10.0632Z" fill="#006BE6"/>
                        </svg>
                        <span>Բեռնել</span>
                      </a>
                    </button>
                  </template>
                  <template v-else>
                    <div v-tooltip="'Մրցույթի հրավերը բեռնելու համար թարմացրեք ձեր փաթեթի տեսակը'">
                      <button disabled type="button" @click="() => setTenderViewed(row.id)" class="btn btn-light d-flex align-items-center">
                        <a download target="_blank" :href="row.invitation_link">
                          <svg class="mr-2" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12722 6.74516V0.5H6.18491V6.74516L8.15927 4.75807L8.93491 5.53871L6.39645 8.02258L5.62081 8.80323L4.91568 8.02258L2.37722 5.53871L3.15286 4.75807L5.12722 6.74516ZM10.0632 10.3645V8.87419H11.1914V10.2226C11.1914 10.9323 10.6273 11.5 9.92218 11.5H1.46064C0.755509 11.5 0.191406 10.9323 0.191406 10.2226V8.87419H1.31961V10.3645H10.0632Z" fill="#006BE6"/>
                          </svg>
                          <span>Բեռնել</span>
                        </a>
                      </button>
                    </div>
                  </template>
                </template>
                <div v-if="row.kind === 'one_person' && new Date(row.finish_date) > dateNow">
                  <button v-if="row.organize.contract !== ''" type="button" @click.stop="$modal.show('contract-draft-modal', row)" class="btn btn-primary" data-toggle="modal" data-animation="bounce">
                    Տեսնել
                  </button>
                </div>
                <div class="ml-1 row align-items-center" v-if="row.guaranteed">
                  <div class="col text-primary">
                    <i style="font-size: 24px" class="fas fa-shield-alt"></i>
                  </div>
                </div>
              </div>
              <div slot="announcements" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100 align-items-center h-100">
                <div v-tooltip="'Առնչվող հայտարարություններ'">
                  <button @click="() => {$modal.show('tender-announcements-modal', {...row, handleGoToAnnouncement});setTenderViewed(row.id);}" class="btn btn-light btn-announcements">
                      <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6914 9.5V7.84694H14.2369C14.9843 7.84694 15.7011 7.54699 16.2296 7.01309C16.7581 6.47919 17.055 5.75505 17.055 5C17.055 4.24494 16.7581 3.52081 16.2296 2.98691C15.7011 2.45301 14.9843 2.15306 14.2369 2.15306H10.6914V0.5H14.2369C15.4183 0.5 16.5513 0.974106 17.3867 1.81802C18.2221 2.66193 18.6914 3.80653 18.6914 5C18.6914 6.19347 18.2221 7.33807 17.3867 8.18198C16.5513 9.02589 15.4183 9.5 14.2369 9.5H10.6914ZM5.14595 9.5C3.96453 9.5 2.8315 9.02589 1.99611 8.18198C1.16072 7.33807 0.691406 6.19347 0.691406 5C0.691406 3.80653 1.16072 2.66193 1.99611 1.81802C2.8315 0.974106 3.96453 0.5 5.14595 0.5L8.69141 0.5V2.15306H5.14595C4.39852 2.15306 3.68171 2.45301 3.1532 2.98691C2.62468 3.52081 2.32777 4.24494 2.32777 5C2.32777 5.75505 2.62468 6.47919 3.1532 7.01309C3.68171 7.54699 4.39852 7.84694 5.14595 7.84694H8.69141V9.5H5.14595ZM6.14595 5.82653V4.17347H13.2369V5.82653H6.14595Z" fill="#006BE6"/>
                      </svg>
                      <sup><span v-if="announcementsCount(row)" class="badge badge-primary">{{announcementsCount(row)}}</span></sup>
                  </button>
                </div>
              </div>
              <div slot="type" slot-scope="{row}" class="d-flex justify-content-start align-items-center h-100">
                {{row.type === "PAPER" ? 'Թղթային' : 'Էլեկտրոնային'}}
              </div>
            </v-server-table>
          </div>
        </div>
      </div>
    </div>
    <template v-if="me.package === 'Գոլդ' || me.package === 'Պրեմիում'">
      <application-modal from="tenders"/>
    </template>
    <result-modal />
    <suggestion-modal />
    <submitted-documents-modal />
    <new-editor-modal />
    <tender-rows-modal />
    <guarantee-modal/>
    <contract-draft-modal />
    <tender-announcements-modal />
    <row-specification-modal/>
  </div>
</template>
<script>
  import isMobile from '@/mixins/isMobileView'
  import axios from 'axios'
  import ApplicationModal from './modals/ApplicationModal'
  import TenderRowsModal from './modals/TenderRowsModal'
  import ContractDraftModal from './modals/ContractDraftModal'
  import NewEditorModal from '@/views/fileManagment/application/NewEditorModal'
  import SuggestionModal from './modals/SuggestionModal'
  import GuaranteeModal from '@/components/landing/GuaranteeModal'
  import SubmittedDocumentsModal from './modals/SubmittedDocumentsModal'
  import TenderAnnouncementsModal from './modals/TenderAnnouncementsModal'
  import RowSpecificationModal from '@/components/modals/RowSpecificationModal'
  import CustomMutliSelect from '@/components/helpers/CustomMutliSelect'
  import ResultModal from '../suggestions/modals/ResultModal'

  export default {
    name: 'Tenders',
    components: { 
      CustomMutliSelect,
      RowSpecificationModal,
      ApplicationModal,
      NewEditorModal,
      TenderRowsModal,
      ContractDraftModal,
      SuggestionModal,
      GuaranteeModal,
      SubmittedDocumentsModal,
      TenderAnnouncementsModal,
      ResultModal
    },
    mixins: [isMobile],
    data() {
      return {
        dateNow: new Date(),
        filtersT: true,
        tableKey: 0,
        loaded: false,
        firstLoad: true,
        announcementName: '',
        tableDataUrl: `${process.env.VUE_APP_API_URL}tender`,
        columns: [
          'favorite',
          'password',
          'title',
          'organizator',
          'products',
          'end_date',
          'price',
          'region',
          'type',
          'application',
          'invitation',
          'announcements'
        ],
        options: {
          // sortable: ['end_date'],
          sortable: [],
          rowClassCallback: function(row) {
            if(!row.is_competition){
              return 'bg-light-grey'
            } else if(!row.viewed){
              return 'bg-light-primary'
            }
          },
          columnsDropdown: true,
          hiddenColumns: ['title', 'region', 'type'],
          requestFunction(data) {
            const dispatch = this.dispatch
            if (this.cancelSource) {
              this.cancelSource.cancel('Start new search, stop active search');
            }
            this.cancelSource = axios.CancelToken.source();
            return this.$client.get(this.url, {cancelToken: this.cancelSource.token, params: data})
            .catch(function (e) {
              dispatch('error', e)
            })
          },
          pagination: { chunk: 1 },
          customFilters: [
            'withCustomFilters',
            'index',
            'competition',
            'region',
            'status',
            'order',
            'category',
            'type',
            'isElectronic',
            'procedure',
            'guaranteed',
            // 'organizator',
            'products',
            'services',
            'works',
            'tenderId',
            'tenderGroupId',
            'favorite'
          ],
          filterByColumn: false,
          skin: 'table',
          headings: {
            viewed: '',
            password: 'Ծածկագիր',
            title: 'Անվանում',
            organizator: 'Պատվիրատու',
            products: 'Գնման առարկաներ',
            region: 'Տարածաշրջան',
            category: 'Խումբ / Կատեգորիա',
            type: 'Տիպ',
            end_date: 'Ժամկետը սկիզբ/ավարտ',
            price: 'Նախահաշվային գին',
            application: 'Տենդերի հայտ',
            invitation: 'Հրավեր',
            favorite: '',
            announcements: '',
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
          index: 1,
          favorite: false,
          competition: { name: 'Մրցույթներ', value: true },
          competitionOptions: [
            { name: 'Բոլորը', value: null },
            { name: 'Մրցույթներ', value: true },
            { name: 'Հայտարարություններ', value: false },
          ],
          category: { name: 'Միայն իմ կատեգորիաները', value: 'onlyMy' },
          categoryOptions: [
            { name: 'Բոլորը', value: 'all' },
            { name: 'Միայն իմ կատեգորիաները', value: 'onlyMy' },
            // { name: 'Իմ նախընտրածները', value: 'applied' },
          ],
          status: { name: 'Ակտիվ մրցույթներ', value: 'active' },
          statusOptions: [
            { name: 'Բոլորը', value: 'all' },
            { name: 'Ակտիվ մրցույթներ', value: 'active' },
            { name: 'Ավարտված մրցույթներ', value: 'finished' },
          ],
          order: null,
          orderOptions: [
            { name: 'Ըստ սկզբնաժամկետի', value: 'byStartDate' },
            { name: 'Ըստ վերջնաժամկետի', value: 'byEndDate' },
          ],
          type: null,
          typeOptions: [
            { name: 'Պետական մրցակցային մրցույթներ', value: 'competitive' },
            { name: 'Պետական մեկ անձի մրցույթներ', value: 'one_person' },
            { name: 'Մասնավոր մրցույթներ', value: 'private' },
            { name: 'ՀՀ֊ից դուրս մրցույթներ', value: 'international' },
          ],
          isElectronic: null,
          isElectronicOptions: [
            { name: 'Թղթային', value: false },
            { name: 'Էլեկտրոնային', value: true },
          ],
          procedure: null,
          procedureOptions: [
            { name: 'ԳՀ', value: 'GH' },
            { name: 'ԲՄ', value: 'BM' },
            { name: 'ՀԲՄ', value: 'UBA' },
            { name: 'ՀՄԱ', value: 'HMA' },
          ],
          region: [],
          regionOptions: [],
          organizator: [],
          organizatorOptions: [],
          competitiveProductCategories: [],
          competitiveProductCategoriesOptions: [],
          competitiveServiceCategories: [],
          competitiveServiceCategoriesOptions: [],
          competitiveWorkCategories: [],
          competitiveWorkCategoriesOptions: [],
          privateProductCategories: [],
          privateProductCategoriesOptions: [],
          privateServiceCategories: [],
          privateServiceCategoriesOptions: [],
          privateWorkCategories: [],
          privateWorkCategoriesOptions: [],
          guaranteed: null,
          guaranteedOptions: [
            { name: 'Երաշխիքով', value: true },
            { name: 'Առանց երաշխիքի', value: false },
          ],
        }
      }
    },
    computed: {
      me() {
        return this.$store.getters['user/me']
      },
      allTenders() {
        return this.$store.getters['organize/allOrganizes']
      }
    },
    watch: {
      async $route(newValue) {
        const tenderId = this.$route.query.id
        const tenderGroupId = this.$route.query.tenderid
        if(tenderId){
          this.tenderId = tenderId;
          await this.$refs.table.setCustomFilters({
            tenderId: tenderId,
          });
          this.tableKey = this.tableKey + 1;
        } else if(tenderGroupId){
          this.tenderGroupId = tenderGroupId;
          setTimeout(async() => {
            await this.$refs.table.setCustomFilters({
              tenderGroupId: tenderGroupId,
            });
          }, 1000);
        } else {
          await this.$client.get('tender/filterOptions').then(({data}) => {
            this.filters.procedureOptions = data.procedure_types
            this.filters.regionOptions = data.regions
            // this.filters.organizatorOptions = data.organizators
            this.filters.competitiveProductCategoriesOptions = data.competitive_product
            this.filters.competitiveServiceCategoriesOptions = data.competitive_service
            this.filters.competitiveWorkCategoriesOptions = data.competitive_work
            this.filters.privateProductCategoriesOptions = data.private_product
            this.filters.privateServiceCategoriesOptions = data.private_service
            this.filters.privateWorkCategoriesOptions = data.private_work
            if(data.columns){
              this.options.hiddenColumns = Object.entries(data.columns).filter(item => item[1] === 0).map(item => item[0])
            }
          })
          await this.handleMyFilters();
        }
        await setTimeout(() => {
          this.loaded = true;
          this.firstLoad = false;
        }, 1000);
      },
    },
    async mounted(){
      const tenderId = this.$route.query.id
      const tenderGroupId = this.$route.query.tenderid
      if(tenderId){
        this.tenderId = tenderId;
        await this.$refs.table.setCustomFilters({
          tenderId: tenderId,
        });
        this.tableKey = this.tableKey + 1;
      } else if(tenderGroupId){
        this.tenderGroupId = tenderGroupId;
        setTimeout(async() => {
          await this.$refs.table.setCustomFilters({
            tenderGroupId: tenderGroupId,
          });
        }, 1000);
      } else {
        await this.$client.get('tender/filterOptions').then(({data}) => {
          this.filters.procedureOptions = data.procedure_types
          this.filters.regionOptions = data.regions
          // this.filters.organizatorOptions = data.organizators
          this.filters.competitiveProductCategoriesOptions = data.competitive_product
          this.filters.competitiveServiceCategoriesOptions = data.competitive_service
          this.filters.competitiveWorkCategoriesOptions = data.competitive_work
          this.filters.privateProductCategoriesOptions = data.private_product
          this.filters.privateServiceCategoriesOptions = data.private_service
          this.filters.privateWorkCategoriesOptions = data.private_work
          if(data.columns){
            this.options.hiddenColumns = Object.entries(data.columns).filter(item => item[1] === 0).map(item => item[0])
          }
        })
        await this.handleMyFilters();
      }
      await setTimeout(() => {
        this.loaded = true;
        this.firstLoad = false;
      }, 1000);
    },
    methods: {
      removeAnnouncement(){
        this.announcementName = '';
        this.filters.favorite = false;
        this.$refs.table.resetCustomFilters();
      },
      getFavoriteTenders(){
        this.filters.favorite = !this.filters.favorite;
        this.search()
      },
      handleSearchFilters(){
        this.filters.withCustomFilters = true;
        // this.filters.favorite = false;
        this.search()
      },
      isNotNewProcedure(row){
        switch (row.procedure.id) {
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
            return true
          default:
            return false
        }
      },
      async cancel() {
        this.$cancelSource.cancel("Optional message");
      },
      announcementsCount(row){
        const announcementsCount = row.announcements_count
        const tenderAnnouncementsCount = row.tender_state_id !== 0 ? row.tender_announcements_count : 0;
        return announcementsCount + tenderAnnouncementsCount
      },
      consoleLog(msg) {
        console.log(msg)
      },
      listenTo(a) {
        this.loaded = false;
      },
      onLoading(a) {
        this.loaded = false;
      },
      onLoaded(a) {
        if(!this.firstLoad){
          this.loaded = true;
        }
      },
      resetComponent(){
        this.$refs.table.refresh();
      },
      async handleGoToAnnouncement(announcementId, announcementName){
        this.announcementName = announcementName
        await this.$refs.table.setCustomFilters({
          tenderId: announcementId,
        });
        await this.$modal.hide('tender-announcements-modal')
      },
      async handleMyFilters(){
        if(this.filters.category.value === "onlyMy"){
          await this.$client.get('user-filters').then(async ({data: {data}}) => {
            if(data){
              this.filters.status = data.status;
              this.filters.index = this.filters.index + 1;
              this.filters.type = data.type;
              this.filters.region = data.region;
              this.filters.procedure = data.procedure;
              // this.filters.organizator = data.organizator;
              this.filters.isElectronic = data.isElectronic;
              this.filters.guaranteed = data.guaranteed;
            }
            // await this.search()
          })
        }
      },
      setTenderViewed(tenderId){
        this.$client.post('user-tenders', {
          tender_state_id: tenderId,
          applyed: false,
          viewed: true,
        }).then(() => {
          const currTender = this.$refs.table.data.find(tender => tender.id === tenderId)
          currTender.viewed = true
          this.$store.dispatch('user/getMenuNotifications')
          // this.$refs.table.getData();
        })
      },
      async search() {
        // this.loaded = false;
        this.$router.replace({'query': null});
        this.$refs.table.customQueries.tenderId = null;
        this.$refs.table.customQueries.tenderGroupId = null;
        this.$refs.table.customQueries.favorite = this.filters.favorite;
        this.$refs.table.customQueries.withCustomFilters = this.filters.withCustomFilters;
        this.$refs.table.customQueries.index = +this.$refs.table.customQueries.index + 1;
        this.$refs.table.customQueries.order = this.filters.order;
        if(this.filters.competition){
          this.$refs.table.customQueries.competition = this.filters.competition.value;
        }
        if(this.filters.category){
          this.$refs.table.customQueries.category = this.filters.category.value;
        }
        if(this.filters.status){
          this.$refs.table.customQueries.status = this.filters.status.value;
        }
        if(this.filters.order){
          this.$refs.table.customQueries.order = this.filters.order.value;
        }
        if(this.filters.guaranteed){
          this.$refs.table.customQueries.guaranteed = this.filters.guaranteed.value ? 1 : 0;
        }
        if(this.filters.type){
          this.$refs.table.customQueries.type = this.filters.type.value;
          if(this.filters.type.value === 'competitive' || this.filters.type.value === 'one_person'){
            if(this.filters.isElectronic){
              this.$refs.table.customQueries.isElectronic = this.filters.isElectronic.value;
            }
            if(this.filters.procedure){
              this.$refs.table.customQueries.procedure = this.filters.procedure.map(item => item.id);
            }
            this.$refs.table.customQueries.products = this.filters.competitiveProductCategories.map(item => item.id);
            this.$refs.table.customQueries.services = this.filters.competitiveServiceCategories.map(item => item.id);
            this.$refs.table.customQueries.works = this.filters.competitiveWorkCategories.map(item => item.id);
          } else if(this.filters.type.value === 'private'){
            this.$refs.table.customQueries.products = this.filters.privateProductCategories.map(item => item.id);
            this.$refs.table.customQueries.services = this.filters.privateServiceCategories.map(item => item.id);
            this.$refs.table.customQueries.works = this.filters.privateWorkCategories.map(item => item.id);
          }
        } else {
          this.$refs.table.customQueries.type = null;
        }
        this.$refs.table.customQueries.region = this.filters.region.map(item => item.id);
        // this.$refs.table.customQueries.organizator = this.filters.organizator.map(item => item.id);
        await this.$refs.table.refresh();
        // await setTimeout(() => {
        //   this.loaded = true;
        // }, 1000);
      },
      addToFavorite(tenderStateId){
        const currTender = this.$refs.table.data.find(tender => tender.id === tenderStateId)
        if(!currTender.is_favorite){
          currTender.is_favorite = true;
          this.$client.post('/tender/favorite', {tender_state_id: tenderStateId})
        }
      },
      toggleStar(tenderStateId){
        this.$client.post('/tender/favorite', {tender_state_id: tenderStateId})
        const currTender = this.$refs.table.data.find(tender => tender.id === tenderStateId)
        currTender.is_favorite = !currTender.is_favorite
      },
      showFilters(){
        this.filtersT = !this.filtersT
      }
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
</style>
<style>
  .btn-announcements{
    width: 36px;
    height: 36px;
    padding: 0;
    box-shadow: 0px 4px 12px 0px #0000000D !important;
    background: #FFFFFF !important;
    border: 1px solid #F7F7F7 !important;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05) !important;
    border-radius: 12px !important;
  }
  .btn .badge {
    position: absolute;
    top: -7px;
  }
  legend{
    width: auto;
    margin: 0 10px;
    font-size: 14px;
  }
  fieldset{
    border-top: 1px solid #b3b3b3;;
    border-bottom: 1px solid #b3b3b3;;
  }
  .star{
    cursor: pointer;
  }
  .active-star{
    color: rgb(255, 165, 0);
  }
  .tenders-list th, .tenders-list td{
    max-width: 550px;
  }
</style>