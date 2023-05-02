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
          <p>Մանրամասներ</p>
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
        <div class="col-md-6 p-0">
          <div class="form-group col-md-12 p-0">
            <div class="mb-3 pl-1">
              <p class="mb-1">Հաղթողին որոշելու կարգը</p>
              <div class="radio radio-primary form-check-inline ">
                <input v-model="invitation.winnerDeterminingType" type="radio" id="by-separate-lots" value="byLot" name="radioInline">
                <label class="text-dark mr-3" for="by-separate-lots">Ըստ չափաբաժինների</label>
              </div>
              <div class="radio radio-primary form-check-inline">
                <input v-model="invitation.winnerDeterminingType" type="radio" id="overall" value="overall" name="radioInline">
                <label class="text-dark" for="overall">Ըստ ընդհանուր գնի</label>
              </div>
            </div>
          </div>
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <p class="mb-1">Հրավերն ուղարկել</p>
              <div class="radio radio-primary form-check-inline ">
                <input v-model="invitation.invitationAddressee" type="radio" id="all-matching-users" value="all-matching-users" name="invite">
                <label class="text-dark mr-3" for="all-matching-users">Բոլոր համընկնող մասնակիցներին</label>
              </div>
              <div class="radio radio-primary form-check-inline">
                <input v-model="invitation.invitationAddressee" type="radio" id="specific" value="specific" name="invite">
                <label class="text-dark" for="specific">Նախընտրած մասնակիցներին</label>
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="application-opening-date"><p class="mb-1">Բացման ամսաթիվ</p></label>
            <date-pick v-model="$v.invitation.opening_date.$model"
                      :displayFormat="'YYYY-MM-DD'"
                      :inputAttributes="{readonly: true}"
                      :isDateDisabled="isFutureDate"
                      :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
                      :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
                      id="application-opening-date"
                      class="date-picker"></date-pick>
          </div>
          <div class="form-group col-md-6">
            <label for="application-opening-time"><p class="mb-1">Բացման Ժամ</p></label>
            <the-mask v-model="$v.invitation.opening_time.$model"
                      :mask="['T#:K#']"
                      :masked="true"
                      :tokens="{
                        '#': {pattern: /\d/},
                        'T': {pattern: /[0-2]/},
                        'N': {pattern: /[0-4]/},
                        'K': {pattern: /[0-5]/},
                      }"
                      placeholder="10:00"
                      id="application-opening-time"
                      type="text"
                      class="form-control" />
          </div>
          <div class="form-group col-md-12">
            <div class="form-check form-check-inline mb-3">
              <input v-model="invitation.publish" type="checkbox" class="form-check-input" id="publish">
              <label class="form-check-label text-dark" for="publish">Հրապարակել</label>
            </div>
          </div>
        </div>
        <div v-if="invitation.invitationAddressee === 'specific'" class="col-md-6">
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <label for="procurement-code-hy"><p class="mb-1">ՀՎՀՀ կամ մասնակցի անվանումը</p></label>
              <input v-model="invitation.specificUserName"
                      type="text"
                      class="form-control"
                      id="procurement-code-hy">
            </div>
          </div>
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <table class="VueTables__table table table-striped table-bordered table-hover" style="overflow: hidden;">
                <thead>
                    <tr>
                      <th tabindex="0" title="" class="VueTables__sortable " style="position: relative;">
                          <div class="row justify-content-center">
                            <span class="VueTables__heading">ՀՎՀՀ</span>
                          </div>
                      </th>
                      <th tabindex="0" title="" class="VueTables__sortable ">
                          <div class="row justify-content-center">
                            <span class="VueTables__heading">Անվանումը</span>
                          </div>
                      </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(dateItem, index) in data" :key="index" class="VueTables__row ">
                      <td tabindex="0" class="">{{dateItem.code}}</td>
                      <td tabindex="0" class="">{{dateItem.name}}</td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="save" class="btn btn-light mr-3">
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    name: 'SendInvitationModal',
    components: { DatePick },
    data() {
      const currentDate = new Date()
      const today = this.addWorkDays(currentDate, 2);
      const formattedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
      return {
        data: [
          {code: '1102021313', name: 'Ideal hamakarg'},
          {code: '1104564313', name: 'Nor Tun'},
          {code: '1106332423', name: 'Domus'},
        ],
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
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
    },
    methods: {
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
        if(this.publish) {
        }

      }
    }
  }
</script>

<style scoped>
 .date-picker {
    display: block;
    width: 100%;
    border: 1px solid #e8ebf3;
    border-radius: .25rem;
    border-bottom: 1px solid #e8ebf3;
  }
</style>