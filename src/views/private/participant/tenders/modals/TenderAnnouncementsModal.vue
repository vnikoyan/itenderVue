<template>
  <modal 
    class="tender-announcements-modal modal-without-footer"
    name="tender-announcements-modal"
    @before-open="handleBeforeOpen"
    @before-close="handleBeforeClose"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="25%"
    height="60%"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
        <p>«{{password}}» մրցույթին առնչվող հայտարարություններ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('tender-announcements-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
        <template v-if="loading">
          <span
            class="text-primary m-auto spinner-border spinner-border-lg position-absolute" 
            style="right: 0; top: 0; bottom: 0; left: 0;"
            role="status"
            aria-hidden="true"
          />
        </template>
        <template v-else>
          <div class="row m-0 p-0">
            <div class="col-md-12 p-0">
                <template v-if="announcements.length">
                  <div class="list-group mb-3">
                    <h6>Մրցույթ՝</h6>
                    <a href="#" @click="() => handleGoToAnnouncement(tender.id, tender.title.hy)" class="list-group-item list-group-item-action">{{tender.title.hy}}</a>
                  </div>
                  <div class="list-group">
                    <h6>Հայտարարություններ՝</h6>
                    <a href="#" :key="announcement.id" v-for="announcement in announcements" @click="() => handleGoToAnnouncement(announcement.id, announcement.title.hy)" class="list-group-item list-group-item-action">{{announcement.title.hy}}</a>
                  </div>
                </template>
                <div v-else>
                  <p class="text-center h5">Առնչվող հայտարարություններ չկան</p>
                </div>
            </div>
          </div>
        </template>
    </div>
  </modal>
</template>

<script>
  export default {
    name: 'TenderAnnouncementsModal',
    components: {  },
    data() {
      return {
        id: '',
        password: '',
        announcements: [],
        tender: {},
        loading: false,
        handleGoToAnnouncement: () => {}
      }
    },
    methods: {
      handleBeforeOpen({params}) {
        this.loading = true;
        this.password = params.password
        this.id = params.id
        this.handleGoToAnnouncement = params.handleGoToAnnouncement
        this.$client.get(`tender/getByTenderId/${this.id}`).then(({data}) => {
          this.announcements = data.announcements
          this.tender = data.tender
          this.loading = false;
        })
      },
      handleBeforeClose(){
        this.announcements = [];
      },
    }
  }
</script>

<style scoped>
  @media (max-width: 768px) {
    .tender-announcements-modal /deep/ .vm--modal #modal-body *{
      font-size: 12px !important;
    }
  }
</style>