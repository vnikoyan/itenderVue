<template>
<div class="h-100">
  <div class="page-title-box-spacing">
    <template v-if="isMobile">
      <div class="row m-0 p-0">
        <div :class="isMobile ? 'col-12 text-center' : 'col-auto p-0'">
          <div class="d-inline-block">
            <div class="d-flex align-items-center topbar-right-spacing name-header" :class="isMobile && 'm-0'">
              <div>Հայտարարությունների պատրաստում</div>
            </div>
          </div>
        </div>
        <div class="col-12 p-0 text-center">
          <div class="d-flex flex-column padding-t-20 justify-content-center tender-buttons">
            <div class="col-auto pl-md-0">
              <button
                @click="$router.push('/organizator/itender')"
                type="button"
                class="btn btn-light br-8 btn-transparent"
              >
                <span>Փակել</span>
              </button>
              <button
                @click="confirm"
                type="button"
                class="btn btn-light br-8 btn-transparent"
              >
                <span>Հաստատել</span>
              </button>
            </div>
            <div class="col-auto pl-md-0 padding-t-20">
              <Documents mobile-view="true" :disabled="!currentOrganized.confirm"/>
              <button 
                :disabled="!currentOrganized.confirm"
                @click="publish"
                type="button"
                class="btn br-8 btn-primary"
              >
                <span>Հրապարակել</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="d-flex justify-content-between align-items-center">
        <div class="col-5 p-0">
          <div class="d-inline-block">
            <div class="d-flex align-items-center topbar-right-spacing name-header">
              <div class="d-inline" v-resize-text="{ratio:1.3, maxFontSize: '23px', minFontSize: '10px'}">Հայտարարությունների պատրաստում</div>
            </div>
          </div>
        </div>
        <div class="col tenders-block-right">
          <Documents :disabled="!currentOrganized.confirm"/>
        </div>
        <div class="col-auto p-0">
          <div class="d-flex tender-buttons">
            <div class="col-auto p-0 pl-md-0">
              <button
                @click="$router.push('/organizator/itender')"
                type="button"
                class="btn btn-light btn-transparent"
              >
                <span>Փակել</span>
              </button>
              <button
                @click="confirm"
                type="button"
                class="btn btn-light btn-transparent"
              >
                <span>Հաստատել</span>
              </button>
              <button 
                :disabled="!currentOrganized.confirm"
                @click="publish"
                type="button"
                class="btn btn-primary"
              >
                <span>Հրապարակել</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div class="row p-0 mx-0 content-height">
    <div class="col-md-4 tenders-block-left h-100">
      <div v-if="!isMobile" class="w-100" style="margin-bottom: 12px;">
        <button @click="switchTo(invitationFormPage)"
                class="btn w-100 br-12 d-flex justify-content-between padding-l-20 shadow-none"
                style="padding-top: 8px; padding-bottom: 8px;"
                :class="[currentSubPage === invitationFormPage && 'btn-primary' || 'btn-light']">
          {{ invitationTitle }}
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5236 10.4194L9.93737 5L8.23047 6.65591L13.8167 12.0753L8.23047 17.3441L9.93737 19L15.5236 13.7312L17.2305 12.0753L15.5236 10.4194Z" fill="#F0F7FF"/>
          </svg>
        </button>
      </div>
      <div id="accordion" class="mb-3" v-else>
        <div class="card shadow-none">
          <div id="headingOne">
            <h5 class="mb-0">
              <button
                @click="showTenderBlock = !showTenderBlock"
                ref="openInvitationCollapse"
                class="btn w-100 d-flex justify-content-between padding-l-20 shadow-none collapse-header-button collapsed"
                data-toggle="collapse"
                data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"
                :class="showTenderBlock ? 'btn-primary' : 'btn-light'"
              >
                {{ invitationTitle }}
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3111 14.7931L19.7305 9.2069L18.0746 7.5L12.6552 13.0862L7.38638 7.5L5.73047 9.2069L10.9993 14.7931L12.6552 16.5L14.3111 14.7931Z" fill="#006BE6"/>
                </svg>
              </button>
            </h5>
          </div>

          <div id="collapseOne" class="collapse" aria-labelledby="headingOne">
            <InvitationForm 
              ref="invitation"
              class="bg-white h-100"
              :rowDetails="selectedCpv"
              :key="selectedCpv.id || 'invitation'"
            />
          </div>
        </div>
      </div>
      <div class="card mb-0 add-cpv-block">
        <div class="card-header">
          Ավելացնել չափաբաժին
        </div>
        <div class="card-body p-0">
          <lot-list
            @selectLot="selectCpv"
            @deleteLot="openDeleteModal"
            @deleteLots="deleteLots"
            :lots="organizedRows"
            :isFromOutside="organizedRows[0] ? Boolean(organizedRows[0].is_from_outside) : false"
            :insert-lot-from-outside="true"
            :selected-lot="selectedCpv"
          />
        </div>
      </div>
    </div>
    <div v-if="!isMobile" class="col-8 tenders-block-right h-100">
      <InvitationForm 
        v-show="false"
        ref="invitation"
        class="bg-white h-100"
        :rowDetails="selectedCpv"
        :key="selectedCpv.id || 'invitation'"
      />
      <keep-alive>
        <component 
          ref="component"
          v-bind:is="currentSubPage"
          class="bg-white h-100"
          :rowDetails="selectedCpv"
          :key="selectedCpv.id || 'invitation'"
        />
      </keep-alive>
    </div>
    <insert-lots-from-outside-modal />
    <delete-modal confirmBtnText="Այո" declineBtnText="Ոչ"/>
    <new-editor-modal />
    <add-cpv-modal />
    <lot-details-modal />
  </div>
</div>
</template>

<script>
  import LotList from '@/components/dashboard/lot/itender/LotList'
  import NewEditorModal from '@/views/fileManagment/itender/NewEditorModal'
  import AddCpvModal from '../addTender/modals/AddCpvModal'
  import isMobile from '@/mixins/isMobileView'
  import Documents from '@/components/dropdown/documents'
  export default {
    name: 'prepare-invitation',
    mixins: [isMobile],
    components: {
    LotList,
    NewEditorModal,
    AddCpvModal,
    LotDetailsForm: () => import("./partials/LotDetailsFormItender"),
    InvitationForm: () => import("./partials/InvitationFormItender"),
    InsertLotsFromOutsideModal: () => import("./modals/InsertLotsFromOutsideModal"),
    DeleteModal: () => import("@/components/helpers/DeleteModal"),
    LotDetailsModal: () => import("@/components/modals/LotDetailsModal"),
    Documents
},
    computed: {
      invitationTitle() {
        let title = ''
        if(!_.isEmpty(this.currentOrganized)) {
          title += (this.currentOrganized.name || '')
          title += ' ' + (this.currentOrganized.code || '')
          title = title.trim()
          if(!title.length) {
            title = 'Նոր հրավեր'
          }
        }
        return title
      },
      currentOrganized() {
        return this.$store.getters['organizeItender/currentOrganized']
      },
      organizedRows() {
        return this.$store.getters['organizeItender/organizedRows']
      },
    },
    updated() {
      if(window.Tawk_API.hideWidget){
        window.Tawk_API.hideWidget();
      }
    },
    beforeDestroy() {
      window.Tawk_API.showWidget();
    },
    watch: {
      currentOrganized(newValue) {
        // currentOrganized.confirm
        // eslint-disable-next-line no-undef
        if(_.isEmpty(newValue)) {
          this.$router.push('/organizing')
        }
      }
    },
    data() {
      return {
        showTenderBlock: false,
        invitationFormPage: '',
        lotDetailsPage: '',
        currentSubPage: '',
        selectedCpv: {},
      }
    },
    mounted() {
      this.$store.dispatch('organizeItender/getCurrent', this.$route.params.id)
      this.$store.dispatch('organizeItender/getRows', {organizeId: this.$route.params.id})

      // eslint-disable-next-line eqeqeq
      this.invitationFormPage = 'InvitationForm'
      this.lotDetailsPage = 'LotDetailsForm'
      this.currentSubPage = this.invitationFormPage
    },
    methods: {
      async confirm(){
        if(this.isMobile){
          if(!this.showTenderBlock){
            this.$refs.openInvitationCollapse.click();
          }
          this.$refs.invitation.confirm()
        } else {
          this.$refs.component.confirm()
        }
      },
      async publish(){
        if(this.isMobile){
          if(!this.showTenderBlock){
            this.$refs.openInvitationCollapse.click();
          }
          this.$refs.invitation.openSendInvitationModal()
        } else {
          this.$refs.component.openSendInvitationModal()
        }
      },
      openDeleteModal({ lotId, nextLotIndex }) {
        this.$modal.show('delete-modal', {
          msg: 'Հեռացնե՞լ գնման առարկան',
          callback: async () => {
            const deleteResponse = await this.$client.delete(`organize-row/${lotId}`)
            if(deleteResponse.data.status) {
              if(this.currentSubPage !== this.invitationFormPage) {
                this.currentSubPage = this.invitationFormPage
              }
              this.$store.dispatch('organizeItender/getRows', {organizeId: this.currentOrganized.id}).then(response => {
                this.$modal.hide('delete-modal')
              })
            }
          }
        })
      },
      deleteLots(lots){
        lots.forEach((lot) => {
          const index = this.rows.indexOf(lot);
          if (index > -1) {
            this.rows.splice(index, 1);
          }
        })
      },
      selectCpv(cpv) {
        if(this.isMobile){
          this.$modal.show('lot-details-modal', cpv)
        } else {
          if(_.isEqual(this.selectedCpv, cpv)) {
            return
          }
          this.selectedCpv = cpv
          this.switchTo(this.lotDetailsPage)
        }
      },
      switchTo(view) {
        if (this.currentSubPage !== view) {
          this.currentSubPage = view
          if(view === this.invitationFormPage) this.selectedCpv = {}
        }
      },
    },
  }
</script>

<style scoped>
  .add-cpv-block{
    height: calc(100% - 42px - 12px);
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
  @media only screen and (max-width: 500px) {
    .add-cpv-block{
      height: fit-content;
    }
  }

</style>
