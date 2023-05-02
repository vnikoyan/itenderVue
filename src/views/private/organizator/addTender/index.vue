<template>
<div class="h-100">
  <template v-if="isMobile">
    <div class="row p-0" style="margin: 0 0 20px 0">
      <div :class="isMobile ? 'col-12 text-center' : 'col-auto p-0'">
        <div class="d-inline-block page-title-box-spacing">
          <div class="d-flex align-items-center topbar-right-spacing name-header" :class="isMobile && 'm-0'">
            <div>{{editView ? 'Խմբագրել մրցույթ' : 'Ավելացնել մրցույթ'}}</div>
          </div>
        </div>
      </div>
      <div :class="isMobile ? 'col-12 text-center' : 'col-auto p-0'">
        <div class="row justify-content-center">
          <div v-if="!editView" class="col-auto p-0 padding-l-10 padding-r-10">
            <button @click="$router.push('/organizator/tenders/list')" class="btn btn-big btn-outline-secondary">
              <span>Դադարեցնել</span>
            </button>
          </div>
          <div class="col-auto p-0 padding-l-10 padding-r-10 second-button">
            <button @click="confirm" class="btn btn-big btn-primary">
              <span>{{editView ? 'Խմբագրել' : 'Հաստատել'}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="page-title-box-spacing">
      <div class="row justify-content-between align-items-center">
        <div class="col-auto">
          <div class="d-inline-block">
            <div class="d-flex align-items-center topbar-right-spacing name-header">
              <div>{{editView ? 'Խմբագրել մրցույթ' : 'Ավելացնել մրցույթ'}}</div>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="row">
            <div v-if="!editView" class="col-auto">
              <button @click="$router.push('/organizator/tenders/list')" class="btn btn-outline-secondary">
                <span>Դադարեցնել</span>
              </button>
            </div>
            <div class="col-auto pl-md-0">
              <button @click="confirm" class="btn btn-primary">
                <span>{{editView ? 'Խմբագրել' : 'Հաստատել'}}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <div class="row p-0 mx-0 content-height">
    <delete-modal confirmBtnText="Այո" declineBtnText="Ոչ"/>
    <div class="col-md-4 p-0">
      <div class="card mb-0 h-100">
        <div class="card-header">
          Ավելացնել տենդերների կատեգորիաները
        </div>
        <div class="card-body p-0">
          <lot-list
            @deleteLot="openDeleteModal"
            @addLots="addLots"
            @deleteLots="deleteLots"
            :lots="rows"
            :isFromOutside="rows[0] ? Boolean(rows[0].is_from_outside) : false"
            :insert-lot-from-outside="false"
            :selected-lot="selectedCpv"
          />
        </div>
      </div>
    </div>
    <div v-if="!editView || tenderData.title" class="col-md-8 p-0 tender-form-block">
      <tender-form
        ref="tenderForm"
        :tenderData="tenderData"
        class="bg-white"
        :rows="rows"
      />
    </div>
  </div>
  <add-cpv-modal />
</div>
</template>

<script>
  import LotList from '@/components/dashboard/lot/tenders/LotList'
  import TenderForm from './partials/TenderForm'
  import AddCpvModal from './modals/AddCpvModal'
  import isMobile from '@/mixins/isMobileView'
  
  export default {
    name: 'CreateTenderContainer',
    mixins: [isMobile],
    components: {
      LotList,
      TenderForm,
      AddCpvModal,
      DeleteModal: () => import('@/components/helpers/DeleteModal')
    },
    computed: { },
    watch: { },
    data() {
      return {
        editView: false,
        selectedCpv: {},
        tenderData: false,
        rows: [],
      }
    },
    mounted() {
      if(this.$route.params.tenderId){
        this.editView = true;
        this.$client.get(`manager/managerGetTenderById/${this.$route.params.tenderId}`).then(({data: {data}}) => {
          this.tenderData = data;
          this.rows = data.rows;
        }).catch((value) => {
          this.$router.push('/organizator/tenders/list')
        })
      }
    },
    methods: {
      confirm(){
        console.log(this.$refs.tenderForm)
        this.$refs.tenderForm.confirm()
      },
      consoleLog(e){
        console.log(e)
      },
      addLots(lots){
        const lotsData = [...lots]
        lotsData.forEach((lot) => {
          const currentLotDuplicates = this.rows.filter(row => row.code.search( lot.code) !== -1)
          const currentLotDrop = currentLotDuplicates.length + 1
          lot.code = `${lot.code}/${currentLotDrop}` 
        })
        this.rows = [...this.rows, ...lots];
      },
      deleteLots(lots){
        lots.forEach((lot) => {
          const index = this.rows.indexOf(lot);
          if (index > -1) {
            this.rows.splice(index, 1);
          }
        })
      },
      openDeleteModal({ lotId, nextLotIndex }) {
        this.$modal.show('delete-modal', {
          msg: 'Հեռացնե՞լ գնման առարկան',
          callback: async () => {
            this.rows.splice(nextLotIndex-1, 1);
            this.$modal.hide('delete-modal')
          }
        })
      },
    },
  }
</script>
<style>
.content-min-height, .content-min-height > .row, .content-min-height > .row >[class*="col-"] {
    min-height: calc(100vh - 110px);
}
</style>
<style scoped>
  .btn{
    padding-bottom: 7px;
    padding-top: 5px;
    height: 36px;
  }
  .scroll-bar-slim {
    background: rgba(162, 177, 208, 0.13);
    width: 7px;
    position: absolute;
    top: 15px;
    opacity: 1;
    display: block;
    border-radius: 7px;
    z-index: 99;
    right: 1px;
    height: 90.9091px;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  @media only screen and (max-width: 700px) {
      .mob{
          display: flex;
          flex-direction: column;
      }
      .mob_block{
        padding: 0;
        max-width: 100%;
      }
  }
</style>
