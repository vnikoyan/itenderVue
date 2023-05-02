<template>
  <div class="row mx-0">
    <delete-modal confirmBtnText="Այո" declineBtnText="Ոչ"/>
    <div class="col-4 p-0">
      <div class="card">
        <div class="card-body">
          <div class="w-100 mb-3">
            <button @click="switchTo(invitationFormPage)"
                    class="btn w-100"
                    :class="[currentSubPage === invitationFormPage && 'btn-primary' || 'btn-light']">
              {{ invitationTitle }}
            </button>
          </div>
          <lot-list @selectLot="selectCpv"
                    @deleteLot="openDeleteModal"
                    :lots="organizedRows"
                    :isFromOutside="organizedRows[0] ? Boolean(organizedRows[0].is_from_outside) : false"
                    :insert-lot-from-outside="false"
                    :selected-lot="selectedCpv"/>
        </div>
      </div>
    </div>
    <div class="col-8">
      <transition name="component-fade" mode="out-in">
        <keep-alive>
          <component v-bind:is="currentSubPage"
                     class="bg-white"
                     :rowDetails="selectedCpv"
                     :key="selectedCpv.id || 'invitation'"></component>
        </keep-alive>
      </transition>
    </div>
    <add-cpvs-to-tender-modal />
    <insert-lots-from-outside-modal />
    <evaluator-committee-modal />
    <new-editor-modal />
    <editor-modal />
  </div>
</template>

<script>
  import LotList from '@/components/dashboard/lot/competitive/LotList'
  import NewEditorModal from '@/views/fileManagment/competitive/NewEditorModal'

  export default {
    name: 'prepare-invitation',
    components: {
      LotList,
      NewEditorModal,
      LotDetailsForm: () => import('./partials/LotDetailsFormCompetitive'),
      InvitationForm: () => import('./partials/InvitationFormCompetitive'),
      AddCpvsToTenderModal: () => import('./modals/AddCpvsToTenderModal'),
      EvaluatorCommitteeModal: () => import('./modals/EvaluatorCommitteeModal'),
      EditorModal: () => import('@/views/fileManagment/EditorModal'),
      InsertLotsFromOutsideModal: () => import('./modals/InsertLotsFromOutsideModal'),
      DeleteModal: () => import('@/components/helpers/DeleteModal')
    },
    computed: {
      invitationTitle() {
        let title = ''
        // eslint-disable-next-line no-undef
        if(!_.isEmpty(this.currentOrganized)) {
          title += (this.currentOrganized.translations.name.hy || '')
          title += ' ' + (this.currentOrganized.translations.code.hy || '')
          title = title.trim()
          if(!title.length) {
            title = 'Նոր հրավեր'
          }
        }
        return title
      },
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      organizedRows() {
        return this.$store.getters['organize/organizedRows']
      }
    },
    watch: {
      currentOrganized(newValue) {
        // eslint-disable-next-line no-undef
        if(_.isEmpty(newValue)) {
          this.$router.push('/organizing')
        }
      }
    },
    data() {
      return {
        invitationFormPage: '',
        lotDetailsPage: '',
        currentSubPage: '',
        selectedCpv: {},
        competitionType: null,
      }
    },
    mounted() {
      this.$store.dispatch('procurement/getPlans')
      this.$store.dispatch('organize/getCurrent', this.$route.params.id)
      this.$store.dispatch('organize/getRows', {organizeId: this.$route.params.id})

      // eslint-disable-next-line eqeqeq
      this.invitationFormPage = 'InvitationForm'
      this.lotDetailsPage = 'LotDetailsForm'
      this.currentSubPage = this.invitationFormPage
    },
    updated() {
      if(window.Tawk_API.hideWidget){
        window.Tawk_API.hideWidget();
      }
    },
    beforeDestroy() {
      window.Tawk_API.showWidget();
    },
    methods: {
      consoleLog(e){
        console.log(e)
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
              this.$store.dispatch('organize/getRows', {organizeId: this.currentOrganized.id}).then(response => {
                this.$client.put(`organize/${this.currentOrganized.id}`, {contract_html_ru: '',contract_html_hy: ''}).then(({ status, data }) => {
                  this.$modal.hide('delete-modal')
                })
              })
            }
          }
        })
      },
      selectCpv(cpv) {
        if(_.isEqual(this.selectedCpv, cpv)) {
          return
        }
        this.selectedCpv = cpv
        this.switchTo(this.lotDetailsPage)
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
</style>
