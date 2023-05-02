<template>
  <div class="card">
    <div class="tender-card-body overflow-auto">
      <p class="tender-label">Գործընթացի տեսակը</p>
      <div class="form-row p-0 m-0">
        <div class="form-group col-md-12 p-0">
          <select v-model="$v.invitation.itender_type.$model" class="tender-input form-control m-0">
            <option value="tender">Տենդեր</option>
            <option value="survey">Հարցում (շուկայի ուսումնասիրություն)</option>
          </select>
        </div>
      </div>
      <p class="tender-label">Գնման ընթացակարգի տվյալներ</p>
      <div class="form-row p-0 m-0">
        <div class="form-group col-md-6 tender-input-group tender-input-group-left">
          <float-label :dispatch="false">
            <input 
              v-model="$v.invitation.name.$model"
              placeholder="Անվանում"
              type="text"
              class="tender-input"
              id="procurement-name"
            >
          </float-label>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-right">
          <float-label :dispatch="false">
            <input 
              v-model="$v.invitation.code.$model"
              placeholder="Ծածկագիր"
              :class="{'border-danger': $v.invitation.code.$dirty && !$v.invitation.code.required}"
              type="text"
              id="code"
              class="tender-input"
            >
          </float-label>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-left">
          <float-label :dispatch="false">
            <input 
              v-model="$v.invitation.name_ru.$model"
              placeholder="Անվանում (ռուսերեն)"
              type="text"
              class="tender-input"
              id="procurement-name"
            >
          </float-label>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-right">
          <float-label :dispatch="false">
            <input 
              v-model="$v.invitation.code_ru.$model"
              placeholder="Ծածկագիր (ռուսերեն)"
              :class="{'border-danger': $v.invitation.code.$dirty && !$v.invitation.code.required}"
              type="text"
              id="code"
              class="tender-input"
            >
          </float-label>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-left">
          <float-label :dispatch="false">
            <input 
              v-model="$v.invitation.shipping_address.$model"
              :placeholder="`${ typeLabel } հասցե`"
              :class="{'border-danger': $v.invitation.shipping_address.$dirty && !$v.invitation.shipping_address.required}"
              type="text"
              id="code"
              class="tender-input"
            >
          </float-label>
        </div>
        <div class="form-group col-6 col-md-3 tender-input-group tender-input-group-center mobile-tender-input-group-left long-placeholder">
          <div class="vfl-has-label">
            <label class="vfl-label" :class="$v.invitation.opening_date_time.$model && 'vfl-label-on-input vfl-label'">
              Հայտերի բացման ամսաթիվ
            </label>
            <date-pick
              v-model="$v.invitation.opening_date_time.$model"
              class="tender-date-picker date-picker"
              setTimeCaption='Ժամը՝'
              :format="'YYYY-MM-DD HH:mm'"
              :time-picker-options="customPickerOption"
              :pickTime="true"
              :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
              :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
              :inputAttributes="{readonly: true, placeholder: 'Հայտերի բացման ամսաթիվ'}"
              :isDateDisabled="previousDate"
              id="application-opening-date"
            />
          </div>
        </div>
        <div class="form-group col-6 col-md-3 tender-input-group tender-input-group-right mobile-tender-input-group-right  long-placeholder">
          <div class="vfl-has-label">
            <label class="vfl-label" :class="$v.invitation.implementation_deadline.$model && 'vfl-label-on-input vfl-label'">
              Կատարման վերջնաժամկետ
            </label>
            <date-pick 
              v-model="$v.invitation.implementation_deadline.$model"
              class="tender-date-picker date-picker"
              :format="'YYYY-MM-DD'"
              :time-picker-options="customPickerOption"
              :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
              :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
              :inputAttributes="{readonly: true, placeholder: 'Կատարման վերջնաժամկետ'}"
              :isDateDisabled="previousEndDate"
              id="application-opening-date"
            />
          </div>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-left" :key="0-radioIndex">
          <p class="tender-label">Հաղթողին որոշելու կարգը</p>
          <div class="form-check">
            <label>
              <input 
                v-model="$v.invitation.winner_by_lots.$model"
                :checked="invitation.winner_by_lots == 1"
                :value="1"
                class="form-check-input"
                type="radio"
                id="winner-by-lots-true"
                name="winner_by_lots"
              >
              <span class="form-check-label">Ըստ չափաբաժինների</span>
            </label>
          </div>
          <div class="form-check">
            <label>
              <input 
                v-model="$v.invitation.winner_by_lots.$model"
                :checked="invitation.winner_by_lots == 0"
                :value="0"
                class="form-check-input"
                type="radio"
                id="winner-by-lots-false"
                name="winner_by_lots"
              >
              <span class="form-check-label">Ըստ ընդհանուր գնի</span>
            </label>
          </div>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-right" :key="radioIndex">
          <p class="tender-label">Հրավերն ուղարկել</p>
          <div class="form-check">
            <label>
              <input 
                v-model="$v.invitation.send_to_all_participants.$model"
                :checked="invitation.send_to_all_participants == 1"
                :value="1"
                class="form-check-input"
                type="radio"
                id="send-to-all-participants-true"
                name="send_to_all_participants"
              >
              <span class="form-check-label">Բոլոր համընկնող մասնակիցներին</span>
            </label>
          </div>
          <div class="form-check">
            <label>
              <input 
                v-model="$v.invitation.send_to_all_participants.$model"
                :checked="invitation.send_to_all_participants == 0"
                :value="0"


                class="form-check-input"
                type="radio"
                id="send-to-all-participants-false"
                name="send_to_all_participants"
              >
              <span class="form-check-label">Նախընտրած մասնակիցներին</span>
            </label>
          </div>
        </div>
        <div class="form-group col-md-12 p-0">
          <p class="tender-label">Գնման ժամանակացույց</p>
          <label class="purchase-schedule" for="purchase-schedule">
            Պատվերը ստանալուց՝
            <input 
              v-model="$v.invitation.purchase_schedule.$model"
              :class="{'border-danger': $v.invitation.purchase_schedule.$dirty && !$v.invitation.purchase_schedule.required}"
              type="text"
              v-positive-only.none_zero.integer
              id="purchase-schedule"
              style="width: 70px; border: none;"
              class="text-center d-inline-block border-info border-bottom"
            >
            աշխատանքային օրվա ընթացքում
          </label>
          <!-- <div class="form-check form-check-inline">
            <input 
              v-model="$v.invitation.one_time_transactions.$model"
              :value="1"
              class="form-check-input"
              type="radio"
              id="one-time-transactions-true"
              name="one_time_transactions"
            >
            <label class="form-check-label" for="one-time-transactions-true">
              Մեկանգամյա գործարքների դեպքում՝
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input 
              v-model="$v.invitation.one_time_transactions.$model"
              :value="0"
              class="form-check-input"
              type="radio"
              id="one-time-transactions-false"
              name="one_time_transactions"
            >
            <label class="form-check-label" for="one-time-transactions-false">
              Երկարաժամկետ և պարբերական բնույթ ունեցող գործարքների դեպքում՝
            </label>
          </div> -->
        </div>
        <div class="form-group col-md-12 p-0">
          <p class="tender-label">Վճարման ժամանակացույց</p>
            <!-- <textarea
              class="form-control d-inline-block border-info border-bottom w-100"
              rows="4" cols="50"
              id="payment-schedule"
              v-model="$v.invitation.payment_schedule_text.$model"
              :class="{'border-danger': $v.invitation.payment_schedule_text.$dirty && !$v.invitation.payment_schedule_text.required}"
            >
            </textarea> -->
            <div
              class="border br-12 p-2"
              v-html="$v.invitation.payment_schedule_text.$model" 
              contenteditable
              ref="payment_schedule"
              @input="onInput"
            />
        </div>
        <div class="form-group col-md-12 p-0">
          <p class="tender-label">Մատակարարումը</p>
          <select v-model="$v.invitation.delivery_type.$model" class="tender-input form-control m-0">
            <option value="without_delivery">Առանց առաքման</option>
            <option value="by_participant_resources_participant">Առաքումով՝ մասնակցի կողմից, մասնակցի միջոցներով</option>
            <option value="by_participant_resources_organizer">Առաքումով՝ մասնակցի կողմից, կազմակերպիչի միջոցներով</option>
            <option value="by_organizer_resources_participant">Առաքումով՝ կազմակերպիչի կողմից, մասնակցի միջոցներով</option>
          </select>
        </div>
        <div class="form-group col-md-12 p-0 m-0">
          <p class="tender-label">Այլ պահանջներ</p>
          <textarea v-model="$v.invitation.other_requirements.$model"
                    placeholder="Օրինակ: Լիցենզիա, Սերտիֆիկատ և այլ նմանատիպ փաստաթղթեր"
                    rows="4"
                    id="other-requirements"
                    class="form-control br-8"></textarea>
          <div class="mt-3 d-flex" :class="uploadedFileName ? 'align-items-top' : 'align-items-center'">
           <div class="d-flex flex-column" style="width: 187px;">
              <label
                class="btn btn-light m-0" 
                :class="uploadFileLoading && 'disabled'"
              >
                <svg class="mr-2" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.91797 19.1429C4.91797 20.0357 5.63225 20.75 6.52511 20.75H18.9358C19.8287 20.75 20.543 20.0357 20.543 19.1429V4.85714C20.543 3.96429 19.8287 3.25 18.9358 3.25H6.52511C5.63225 3.25 4.91797 3.96429 4.91797 4.85714V19.1429ZM19.1144 19.3214H6.34654V4.67857H19.1144V19.3214ZM8.75728 7.08943H16.793V8.518H8.75728V7.08943ZM16.793 15.482H8.75728V16.9106H16.793V15.482ZM8.75728 11.2857H16.793V12.7143H8.75728V11.2857Z" fill="#006BE6"/>
                </svg>
                <span>Կցել փաստաթղթեր</span>
                <input @change="handleUploadFile" type="file" hidden>
                <span v-if="uploadFileLoading" class="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </label>
              <a :href="uploadedFileLink" v-if="uploadedFileName" download target="blank" class="text-small my-2 text-primary">
                <small>{{uploadedFileName}}</small>
              </a>
           </div>
            <div v-if="cpvType == 3" class="form-check p-0 mx-2">
              <input class="" type="checkbox" v-model="$v.invitation.is_construction.$model" :value="$v.invitation.is_construction.$model" id="is-construction">
              <label class="form-check-label ml-4" for="is-construction">
                Շինարարական աշխատանքներ
              </label>
            </div>
            <div :style="$v.invitation.send_to_all_participants.$model === 'implement-immediately' ? 'opacity: 0' : '' " class="form-check p-0 mx-2">
              <label class="m-0">
                <input type="checkbox"  v-model="$v.invitation.publicize.$model" :value="$v.invitation.publicize.$model" id="rights-responsibilities-fulfillment">
                <span class="ml-2">Հրապարակել</span>
              </label>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="tender-card-footer">
      <div v-if="mode === 'edit'" class="d-flex justify-content-end">
        <button @click="clear" class="btn btn-light mr-3" type="button">
          <span>Չեղարկել</span>
        </button>
        <button @click="save" class="btn btn-primary" type="button"  :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Պահպանել</span>
        </button>
        <!-- <button @click="confirm" class="btn btn-gradient-success" type="button"  :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Հաստատել</span>
        </button>
        <button v-if="currentOrganized.confirm" @click="openSendInvitationModal"  :disabled="isSaving" class="btn btn-gradient-success ml-3" type="button">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Ուղարկել հրավերը</span>
        </button> -->
      </div>
    </div>
    <send-invitation-modal />
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import SendInvitationModal from '../modals/SendInvitationModal'
  import isMobile from '@/mixins/isMobileView'
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    name: 'InvitationFormItender',
    mixins: [isMobile],
    components: { SendInvitationModal, DatePick },
    data() {
      return {
        isSaving: false,
        radioIndex: 1,
        cpvType: 1,
        mode: '',
        invitationUnchanged: {},
        payment_schedule_text_copy: '',
        uploadFileLoading: false,
        uploadedFileName: '',
        uploadedFileLink: '',
        additionalFile: '',
        invitation: {
          code_ru: null,
          name_ru: null,
          code: null,
          name: null,
          winner_by_lots: 1,
          send_to_all_participants: 1,
          one_time_transactions: 1,
          purchase_count: '',
          purchase_periodicity: 'custom',
          itender_type: 'itender',
          delivery_type: 'without_delivery',
          other_requirements: '',
          purchase_schedule: '',
          payment_schedule_text: 'Վճարումներն իրականացվելու են կայացած գործարքի շրջանակներում, գործարքի արդյունքը մասնակի կամ ամբողջությամբ ընդունվելուց հետո <span style="text-decoration:underline;">5</span> աշխատանքային օրվա ընթացքում, փաստացի իրականացվածի 100%-ի չափով` գործարքի կողմերի կողմից հաստատված հաշիվ-ապրանքագրերի, իսկ գործընթացը պայմանագրով իրականացնելու դեպքում, նաև հաստատված ընդունման-հանձնման արձանագրությունների հիման վրա:',
          opening_date_time: '',
          implementation_deadline: '',
          shipping_address: null,
          work_type: 0,
          publicize: true,
          is_construction: false,
        },
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organizeItender/currentOrganized']
      },
      organizeLoading() {
        return this.$store.getters['organizeItender/loading']
      },
      typeLabel() {
        const labelsObj = {
          1: 'Մատակարարման',
          2: 'Ծառայության մատուցման',
          3: 'Աշխատանքի կատարման ',
        }
        return labelsObj[this.cpvType]
      },
      locale() {
        return this.$store.getters['user/locale']
      },
      organizedRows() {
        return this.$store.getters['organizeItender/organizedRows']
      },
    },
    watch: {
      currentOrganized(newValue) {
        this.invitation = Object.assign({}, this.invitation, newValue, {
          code_ru: newValue.code_ru,
          name_ru: newValue.name_ru,
          name: newValue.name,
          code: newValue.code,
          winner_by_lots: newValue.winner_by_lots ? 1 : 0,
          send_to_all_participants: newValue.send_to_all_participants,
          one_time_transactions: newValue.one_time_transactions,
          purchase_count: newValue.purchase_count,
          purchase_periodicity: newValue.purchase_periodicity,
          itender_type: newValue.itender_type,
          delivery_type: newValue.delivery_type,
          other_requirements: newValue.other_requirements,
          purchase_schedule: newValue.purchase_schedule,
          payment_schedule_text: newValue.payment_schedule_text !== '' ? newValue.payment_schedule_text : this.invitation.payment_schedule_text,
          opening_date_time: newValue.opening_date_time !== "0000-00-00 00:00:00" ? newValue.opening_date_time : this.invitation.opening_date_time,
          implementation_deadline: newValue.implementation_deadline !== "0000-00-00" ? newValue.implementation_deadline : this.invitation.implementation_deadline,
          shipping_address: newValue.shipping_address,
          work_type: newValue.work_type,
          publicize: newValue.publicize,
          is_construction: newValue.is_construction,
        })
        if(newValue.additional_file !== ''){
          this.uploadedFileName = newValue.additional_file.split('/')[newValue.additional_file.split('/').length-1];
          this.uploadedFileLink = newValue.additional_file;
        }
        this.invitationUnchanged = _.cloneDeep(this.invitation);
      },
    },
    mounted() {
      this.cpvType = this.$route.query.cpvType
      this.mode = this.$route.query.mode
    },
    methods: {
      handleUploadFile(event){
        const file = event.target.files[0]
        if(file.size < 100000000){
          this.uploadFileLoading = true;
          const uploadedFile = file;
          const formData = new FormData();
          formData.append('file', uploadedFile);
          this.$client.post(`organize/itender/uploadAdditionalFile/${this.currentOrganized.id}`, formData).then(({data}) => {
            this.additionalFile = data.additional_file
            this.uploadFileLoading = false;
            if(data){
              this.uploadedFileLink = data.additional_file
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ ավելացված է'
              })
            }
          })
          this.uploadedFileName = file.name;
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Ընտրված ֆայլի առավելագույն ծավալը պետք է լինի 10ՄԲ'
          })
        }
      },
      onInput(e) {
        this.payment_schedule_text_copy = e.target.innerText;
      },
      customPickerOption () {
        const results = [
          {
            label: '21:15',
            value: {
              hours: 21,
              minutes: 15
            }
          },
          {
            label: '22:15',
            value: {
              hours: 22,
              minutes: 15
            }
          }
        ]
        return results
      },
      getChanges() {
        const changesObj = {}
        Object.keys(this.invitationUnchanged).forEach(key => {
          // eslint-disable-next-line no-undef
          if(_.isObject(this.invitationUnchanged[key])) {
            // eslint-disable-next-line no-undef
            if(!_.isEqual(this.invitationUnchanged[key], this.invitation[key])) {
              changesObj[key] = this.invitation[key]
            }
          } else if(this.invitationUnchanged[key] !== this.invitation[key]) {
            changesObj[key] = this.invitation[key]
          }
        })

        changesObj.opening_date_time = this.invitation.opening_date_time
        changesObj.implementation_deadline = this.invitation.implementation_deadline
        changesObj.payment_schedule_text = this.payment_schedule_text_copy || this.$refs.payment_schedule.innerText
        return changesObj
      },
      previousDate(date){
        var d = new Date();
        var x = 1;
        return date < d.setDate(d.getDate() - x)
      },
      previousEndDate(date){
        var d = new Date();
        if(this.invitation.opening_date_time){
          d = new Date(this.invitation.opening_date_time);
        }
        var x = 0;
        return date < d.setDate(d.getDate() - x)
      },
      currentDateTime(){
        var today = new Date();
        var nextDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
        var date = nextDay.getFullYear()+'-'+(nextDay.getMonth()+1)+'-'+nextDay.getDate();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date+' '+time;
        return dateTime
      },
      publish(){
        const editedFields = this.getChanges()
        this.isSaving = true
        this.organizeRowNumbering()
        this.$store.dispatch('organizeItender/update', {id: this.currentOrganized.id, data: {...editedFields, publication: 'senden' }}).then((response) => {
          this.isSaving = false
          this.radioIndex = this.radioIndex + 1;
          if(response) {
            this.$router.push('/organizator/itender')
          }
        }).catch(e => {
          this.isSaving = false
          this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Ինչ որ բան այն չէ',
            text: 'Կրկին փորձեք!'
          })
        })
      },
      save() {
        const editedFields = this.getChanges()
        this.isSaving = true
        if(!_.isEmpty(editedFields)) {
          this.organizeRowNumbering()
          this.$store.dispatch('organizeItender/update', {id: this.currentOrganized.id, data: editedFields}).then((response) => {
            this.isSaving = false
            this.radioIndex = this.radioIndex + 1;
            if(response) {
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ թարմացված է'
              })
            }
          }).catch(e => {
            this.isSaving = false
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          })
        } else {
          this.$notify({
            group: 'foo',
            type: 'warn',
            text: 'Դուք չունեք փոփոխված դաշտ !'
          })
          this.isSaving = false
        }
      },
      confirm() {
        const editedFields = this.getChanges()
        if(!this.$v.invitation.$invalid) {
          if(!this.$v.invitation.opening_date_time.$invalid){
            if(this.organizedRows.length > 0){
              this.isSaving = true
              editedFields.confirm = true
              this.organizeRowNumbering()
              this.$store.dispatch('organizeItender/update', {id: this.currentOrganized.id, data: editedFields}).then((response) => {
                this.isSaving = false
                this.radioIndex = this.radioIndex + 1;
                if(response) {
                  this.$notify({
                    group: 'foo',
                    type: 'success',
                    text: 'Հաջողությամբ հաստատված է'
                  })
                }
              }).catch(e => {
                this.isSaving = false
                this.$notify({
                  group: 'foo',
                  type: 'error',
                  title: 'Ինչ որ բան այն չէ',
                  text: 'Կրկին փորձեք!'
                })
              })
            } else {
              this.$notify({
                group: 'foo',
                type: 'error',
                text: 'Ընտրեք գոնե մեկ գնման առարկա հաստատելու համար'
              })
              this.isSaving = false
            }
          } else {
            this.$notify({
              group: 'foo',
              type: 'error',
              text: 'Սխալ բացման ամսաթիվ'
            })
            this.isSaving = false
          }
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Լրացրեք բոլոր դաշտերը հաստատելու համար!'
          })
          this.isSaving = false
        }
      },
      openSendInvitationModal() {
        if(+this.invitation.send_to_all_participants === 1){
          this.publish()
        } else {
          this.$modal.show('send-invitation-modal', this.publish)
        }
      },
      async organizeRowNumbering() {
        if(this.organizedRows.length){
          this.$client.post(`organize-row-array/numbering`, this.organizedRows).then(response => {
            this.$store.dispatch('organizeItender/getRows', {organizeId: this.$route.params.id})
          })
        }
      },
      clear(){
        this.invitation = {
          code_ru: null,
          name_ru: null,
          code: null,
          name: null,
          winner_by_lots: 1,
          send_to_all_participants: 1,
          one_time_transactions: 1,
          purchase_count: '',
          purchase_periodicity: 'custom',
          itender_type: 'itender',
          delivery_type: 'without_delivery',
          other_requirements: '',
          purchase_schedule: '',
          payment_schedule_text: 'Վճարումներն իրականացվելու են կայացած գործարքի շրջանակներում, գործարքի արդյունքը մասնակի կամ ամբողջությամբ ընդունվելուց հետո <span style="text-decoration:underline;">5</span> աշխատանքային օրվա ընթացքում, փաստացի իրականացվածի 100%-ի չափով` գործարքի կողմերի կողմից հաստատված հաշիվ-ապրանքագրերի, իսկ գործընթացը պայմանագրով իրականացնելու դեպքում, նաև հաստատված ընդունման-հանձնման արձանագրությունների հիման վրա:',
          opening_date_time: '',
          implementation_deadline: '',
          shipping_address: null,
          work_type: 0,
          publicize: true,
          is_construction: false,
        };
        this.$v.invitation.$reset();
      },
    },
    validations() {
      const rules = {
        code_ru: {},
        name_ru: {},
        name: {required},
        code: {required},
        other_requirements: {},
        opening_date_time: {required},
        implementation_deadline: {required},
        purchase_schedule: {required},
        payment_schedule_text: {required},
        send_to_all_participants: {required},
        one_time_transactions: {required},
        purchase_count: {required},
        purchase_periodicity: {required},
        itender_type: {required},
        delivery_type: {required},
        winner_by_lots: {required},
        shipping_address: {required},
        publicize: {required},
        is_construction: {},
      }
      return { invitation: rules }
    }
  }
</script>

<style scoped>
  .tender-card-body .tender-input{
    margin-bottom: 0 !important;
  }
  .form-group{
    margin-bottom: 24px;
  }
  textarea, .border {
    font-size: 14px;
  }
 .date-picker {
    display: block;
    width: 100%;
    border: 1px solid #e8ebf3;
    border-radius: .25rem;
    border-bottom: 1px solid #e8ebf3;
  }
</style>