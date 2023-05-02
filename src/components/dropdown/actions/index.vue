<template>
    <div class="dropdown" v-if="currentPageActions" :class="showMobileView && 'd-inline-block'">
      <button class="btn btn-light m-0 nav-user docs-btn"
        data-toggle="dropdown" href="#"
        role="button"
        aria-haspopup="false"
        aria-expanded="false"
        :class="!showMobileView ? '' : 'br-8'"
        :disabled="disabled"
      >
        <svg :class="!showMobileView && 'mr-2'" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75364 9.4145L9.73436 10.3863L8.75364 11.367L7.77292 10.3863L5.90064 8.51402L5.61534 8.22872L4.91992 7.5333L5.61534 6.8468L5.90064 6.5615L8.75364 3.7085L9.73436 4.68921L8.75364 5.66102L7.56786 6.8468H17.1522V8.22872H7.56786L8.75364 9.4145ZM19.5592 15.486L19.8445 15.7713L20.5399 16.4668L19.8445 17.1533L19.5592 17.4386L16.7062 20.2916L15.7255 19.3108L16.7062 18.339L17.892 17.1533H8.30768V15.7713H17.892L16.7062 14.5856L15.7255 13.6138L16.7062 12.633L17.6869 13.6138L19.5592 15.486Z" fill="#006BE6"/>
        </svg>
        <span v-if="!showMobileView">Գործողություններ</span>
      </button>
      <div class="dropdown-menu card">
        <a v-for="action in currentPageActions"
          :key="action.title"
          @click.prevent="action.call"
          class="dropdown-item"
          :class="action.disabled && action.disabled() ? 'disabled' : action.main_doc && 'font-weight-bold'"
          href="">
          <i :class="action.iconClass" class="mr-2 text-primary"></i>
          <template v-if="action.title !== 'correction' && action.title !== 'negotiations'">
            <span v-if="+currentOrganized.cpv_type !== 1">{{ action.title }}</span>
            <span v-else>{{ action.title.replace(' (շուտով)','') }}</span>
          </template>
          <template v-else>
              <div v-if="action.title === 'correction'" @click.prevent.stop="handleIsWithCorrection" class="checkbox checkbox-primary pl-1">
                <input id="correction" :checked="correction" type="checkbox">
                <label for="correction" class="pl-3 text-primary">Շտկում</label>
              </div>
              <div v-else @click.prevent.stop="handleIsWithNegotiations" class="checkbox checkbox-primary pl-1">
                <input id="negotiations" :checked="negotiations" type="checkbox">
                <label for="negotiations" class="pl-3 text-primary">Բանակցություններ</label>
              </div>
          </template>
        </a>
      </div>
  </div>
</template>

<script>
import isMobile from '@/mixins/isMobileView'
export default {
    name: 'ActionsButton',
    mixins: [isMobile],
    props: ['disabled', 'mobileView'],
    mounted() {
      if(this.mobileView === 'true' && this.isMobile){
        this.showMobileView = true;
      }
    },
    computed: {
      currentPageActions() {
        const action = this.$route.path.split('/')[1]
        if(action === 'organizator'){
          const organizeType = this.$route.path.split('/')[2]
          const page = this.$route.path.split('/')[3]
          if(organizeType === 'itender'){
            return this.actions[organizeType][page]
          }
        }
        if(action === 'organizing'){
          const organizeType = this.$route.path.split('/')[2]
          const page = this.$route.path.split('/')[3]
          if(organizeType === 'competitive' && page === 'application-evaluation'){
            if(!this.negotiations){
              const indexOfSameLastParticipant = this.actions[organizeType][page].indexOf(this.actions[organizeType][page].find((item) => item.title === "Անցում բանակցությունների"))
              return [
                {title: 'correction'},
                {title: 'negotiations'},
                ...this.actions[organizeType][page].filter((value, index) => index !== indexOfSameLastParticipant), 
              ]
            } else {
              return [
                {title: 'correction'},
                {title: 'negotiations'},
                ...this.actions[organizeType][page], 
              ]
            }
          } else {
            return this.actions[organizeType][page]
          }
        } else {
          return false;
        }
      },
      currentOrganized() {
        const organizeType = this.$route.path.split('/')[2]
        if(organizeType === 'competitive'){
          return this.$store.getters['organize/currentOrganized']
        } else if(organizeType === 'itender'){
          return this.$store.getters['organizeItender/currentOrganized']
        } else {
          return this.$store.getters['organizeOnePerson/currentOrganized']
        }
      },
    },
    data(){
      return {
        showMobileView: false,
        actions: {
          competitive: {
            'application-evaluation': [
              {
                title: 'Անցում բանակցությունների',
                call: () => {this.$modal.show('negotiations-modal')},
                iconClass: 'fas fa-user-friends'
              },
              {
                title: 'Վերադառնալ հրավերի պատրաստում',
                call: this.backToPrepareInvitation,
                iconClass: 'fas fa-arrow-circle-left'
              },
            ],
            'contract-preparation': [
              {
                title: 'Վերադառնալ հայտերի գնահատում',
                call: this.backToApplicationEvaluation,
                iconClass: 'fas fa-arrow-circle-left'
              },
              {
                title: 'Պայմանագրի կնքում',
                call: () => {
                  this.$modal.show('contract-request-modal')
                },
                iconClass: 'fas fa-file-signature'
              },
            ],
          },
          oneperson: {
            'contract-preparation': [
              {
                title: 'Պայմանագրի կնքում',
                call: () => {
                  this.$modal.show('contract-request-modal')
                },
                iconClass: 'fas fa-file-signature'
              },
            ],
          },
          itender: {
            'contract-preparation': [
              {
                title: 'Գնահատում',
                call: () => {
                  this.$modal.show('winner-evalution-modal')
                },
                iconClass: 'fas fa-paste'
              },
              {
                title: 'Պայմանագրի կնքում',
                call: () => {
                  this.$modal.show('contract-request-modal')
                },
                iconClass: 'fas fa-file-signature'
              },
            ],
          },
        },
      }
    },
};
</script>

<style scoped>
.btn{
  /* padding: 6px 8px; */
  height: 100%;
}
.dropdown-menu{
  padding: 8px 0;;
}
.dropdown-menu span {
  font-weight: 550;
}
.dropdown-item{
  /* height: 30px; */
  padding: 8px 20px;
}
</style>