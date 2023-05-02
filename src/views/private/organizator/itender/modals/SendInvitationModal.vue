<template>
  <modal 
    class="send-invitation-modal"
    name="send-invitation-modal"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
  >
    <div id="modal-header" class="action-modal">
      <div class="w-75 d-flex">
          <p>Ընտրել նախընտրած մասնակիցներին</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('send-invitation-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="row m-0 p-0">
        <div class="col-md-12 p-0">
          <div class="form-group col-md-6 p-0 mt-3">
            <div class="pl-1" ref="searchBlock">
              <float-label>
                <input
                  placeholder="ՀՎՀՀ կամ մասնակցի անվանումը"
                  v-model="invitation.specificUserName"
                  @input="searchParticipants"
                  type="text"
                  class="tender-input m-0"
                  id="procurement-code-hy"
                >
              </float-label>
              <div v-if="isSearching"
                    class="spinner-border spinner-border-sm position-absolute text-primary"
                    style="top: 0px; right: 12px; bottom: 0; margin: auto;"
                    role="status"></div>
              <ul v-if="showSearchResult"
                  @v-click-outside="() => alert()"
                  aria-expanded="false"
                  class="position-absolute border w-100 card py-2"
                  style="cursor: pointer; z-index: 99; overflow-y: auto; list-style-type: none; padding: 0!important;">
                <template v-if="searchResults.length">
                  <li v-for="(item, index) in searchResults"
                    :key="index"
                    @click="() => {selectedParticipants.filter(participant => item.id === participant.id).length === 0 && selectFromSearch(item)}"
                    class="searchItem p-3"
                    :class="{'border-top': index > 0, 'bg-secondary text-white': selectedParticipants.filter(participant => item.id === participant.id).length > 0}"
                  >
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4142 7.72369C17.4142 10.2806 15.3654 12.4442 12.7313 12.4442C10.0971 12.4442 8.04834 10.2806 8.04834 7.62535C8.04834 5.06843 10.0971 2.90488 12.7313 3.00323C15.2678 3.00323 17.4142 5.06843 17.4142 7.72369ZM15.9508 7.62535C15.9508 5.85518 14.4874 4.38003 12.7313 4.38003C10.9752 4.38003 9.51175 5.85518 9.51175 7.62535C9.51175 9.39553 10.9752 10.8707 12.7313 10.8707C14.4874 10.8707 15.9508 9.39553 15.9508 7.62535ZM9.90119 13.9193H15.5597C18.389 13.9193 20.7304 16.2795 20.7304 19.1315V21H4.73047V19.1315C4.73047 16.2795 7.07193 13.9193 9.90119 13.9193ZM6.19388 19.6232H19.1695V19.2298C19.1695 17.1646 17.5109 15.4928 15.4622 15.4928H9.90119C7.85242 15.4928 6.19388 17.1646 6.19388 19.2298V19.6232Z" fill="#006BE6"/>
                    </svg>
                    <span>{{ item.tin }}</span>
                    <span class="mr-2"> ({{ item.name.hy }}) </span>
                  </li>
                </template>
                <li v-else class="p-3">
                  <span > Որոնման արդյունքում ոչինչ չի գտնվել </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-12 p-0">
            <div class="mb-3 pl-1">
              <v-client-table ref="vtable" :columns="columns" v-model="selectedParticipants" :options="options">
                <div slot="index_number" class="d-flex justify-content-start align-items-center h-100" slot-scope="{index}">
                  <span>{{ index }}</span>
                </div>
                <div slot="name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                  <span>{{ row.name.hy }}</span>
                </div>
                <div slot="action" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
                  <a aria-expanded="false" v-tooltip="'Հեռացնել'" @click.prevent="deleteParticipant(row.id)" class="" href="">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.11768 3H15.3877V4.5H9.11768V3ZM4.50781 6.29004H20.0078V7.79004H18.5078V18.59C18.5052 19.0534 18.32 19.497 17.9923 19.8246C17.6647 20.1522 17.2211 20.3374 16.7578 20.34H7.75781C7.29368 20.34 6.84856 20.1557 6.52038 19.8275C6.19219 19.4993 6.00781 19.0542 6.00781 18.59V7.79004H4.50781V6.29004ZM7.50781 18.79L16.9578 18.84L16.9978 7.79004H7.50781V18.79Z" fill="#E02232"/>
                    </svg>
                  </a>
                </div>
              </v-client-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button :disabled="loading || selectedParticipants.length === 0" @click="save" class="btn btn-primary br-8">
        <span v-if="loading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
        <span>Ուղարկել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'SendInvitationModal',
    components: {  },
    data() {
      const currentDate = new Date()
      const today = this.addWorkDays(currentDate, 2);
      const formattedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
      return {
        columns: [
          'index_number',
          'tin',
          'name',
          'phone',
          'email',
          'address',
          'action'
        ],
        options: {
          sortable: [],
          perPage: 1000,
          perPageValues: [],
          columnsDropdown: false,
          filterByColumn: false,
          skin: 'table table-striped table-border-radius',
          dateFormat: "YYYY-mm-dd",
          headings: {
            index_number: 'Հ/Հ',
            name: 'Անվանումը',
            tin: 'ՀՎՀՀ',
            phone: 'Հեռախոսահամար',
            email: 'Մասնակցի Էլ. հասցե',
            requirements: 'Էլ. Հասցե',
            address: 'Հասցե',
            action: '',
          },
          filterable: false
        },
        loading: false,
        showSearchResult: false,
        searchTimeoutId: null,
        searchResults: [],
        selectedParticipants: [],
        isSearching: true,
        invitation: {
          publish: true,
          invitationAddressee: 'all-matching-users',
          winnerDeterminingType: 'byLot',
          opening_time: '',
          opening_date: formattedDate,
          specificUserName: '',
        },
      }
    },
    validations() {
      const rules = {
        invitation: {
          publish: {required},
          invitationAddressee: {required},
          winnerDeterminingType: {required},
          opening_date: {},
          opening_time: {},
        },
      }
      return rules
    },
    mounted() {
      document.addEventListener("click", this.onClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener("click", this.onClickOutside);
    },
    computed: {
      me() {
        return this.$store.getters['user/me']
      },
      currentOrganized() {
        return this.$store.getters['organizeItender/currentOrganized']
      },
    },
    methods: {
      onClickOutside(event) {
        const { searchBlock } = this.$refs;
        if (!searchBlock || searchBlock.contains(event.target)) return;
        this.showSearchResult = false;
      },
      handleBeforeOpen(event) {
        this.publish = event.params
      },
      deleteParticipant(participantId){
        const optionIndex = this.selectedParticipants.findIndex(participant => participant.id === participantId)
        this.selectedParticipants.splice(optionIndex, 1)
      },
      selectFromSearch(searchItem) {
        this.invitation.specificUserName = '';
        this.selectedParticipants.push(searchItem)
        setTimeout(() => {
          this.showSearchResult = false
        }, 150)
      },
      searchParticipants(event) {
        this.searchResults = []
        const query = event.target.value
        if(query.length < 3) {
          if(this.showSearchResult) this.showSearchResult = false
          if(this.isSearching) this.isSearching = false
          if(this.searchTimeoutId) clearTimeout(this.searchTimeoutId)
          return
        }

        if(this.searchTimeoutId) {
          clearTimeout(this.searchTimeoutId)
        }
        this.searchTimeoutId = setTimeout(() => {
          this.isSearching = true
          setTimeout(() => {
            this.$client.get('user/search', {
              params: {
                q: query
              }
            }).then(({data}) => {
              data.forEach((item) => {
                const objItem = {
                  query,
                  id: item.id,
                  tin: item.tin,
                  name: item.name,
                  address: item.organisation.region.hy ? `${item.organisation.region.hy} ${item.organisation.city.hy}  ${item.organisation.address.hy}` : '',
                  phone: item.phone,
                  email: item.email,
                }
                this.searchResults.push(objItem);
              })
            }).catch(e => {
              console.log('error from participant search')
            })
            this.isSearching = false
            this.showSearchResult = true
          }, 400)
        }, 500)
      },
      isFutureDate(date) {
          const currentDate = new Date();
          const today = this.addWorkDays(currentDate, 2);
          return date < today;
      },
      addWorkDays(startDate, days) {
        if(isNaN(days)) {
            console.log("Value provided for \"days\" was not a number");
            return
        }
        if(!(startDate instanceof Date)) {
            console.log("Value provided for \"startDate\" was not a Date object");
            return
        }
        var dow = startDate.getDay();
        var daysToAdd = parseInt(days);
        if (dow === 0)
            daysToAdd++;
        if (dow + daysToAdd >= 6) {
            var remainingWorkDays = daysToAdd - (5 - dow);
            daysToAdd += 2;
            if (remainingWorkDays > 5) {
                daysToAdd += 2 * Math.floor(remainingWorkDays / 5);
                if (remainingWorkDays % 5 === 0)
                    daysToAdd -= 2;
            }
        }
        startDate.setDate(startDate.getDate() + daysToAdd);
        return startDate;
      },
      save() {
        this.loading = true;
        const requestData = [];
        this.selectedParticipants.forEach((participant) => {
          const itemObj = {
            organize_id: this.$route.params.id,
            client_id: this.me.id,
            provider_id: participant.id,
            is_itender: true,
          }
          requestData.push(itemObj)
        })
        this.$store.dispatch('suggestions/create', requestData).then(({data}) => {
          if(data.status){
            this.publish()
          } else {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          }
        }).catch(e => {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Ինչ որ բան այն չէ',
            text: 'Կրկին փորձեք!'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>