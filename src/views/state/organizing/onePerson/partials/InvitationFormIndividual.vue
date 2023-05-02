<template>
    <div class="card p-3">
      <p>1. Գնման ընթացակարգի տվյալներ</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-6">
          <label for="procurement-name">Անվանում</label>
          <input v-model="$v.invitation.name.$model"
                  type="text"
                  class="tender-input"
                  :class="{/*'border-danger': $v.invitation.name.hy.$dirty && !$v.invitation.name.hy.required*/}"
                  id="procurement-name">
        </div>
        <div class="form-group col-md-6">
          <label for="code">Ծածկագիր</label>
          <input v-model="$v.invitation.code.$model"
                :class="{'border-danger': $v.invitation.code.$dirty && !$v.invitation.code.required}"
                type="text"
                id="code"
                class="tender-input">
        </div>

        <div class="form-group col-md-6">
          <label for="procurement-name">Անվանում (ռուսերեն)</label>
          <input v-model="$v.invitation.name_ru.$model"
                  type="text"
                  class="tender-input"
                  :class="{/*'border-danger': $v.invitation.name.hy.$dirty && !$v.invitation.name.hy.required*/}"
                  id="procurement-name">
        </div>
        <div class="form-group col-md-6">
          <label for="code">Ծածկագիր (ռուսերեն)</label>
          <input v-model="$v.invitation.code_ru.$model"
                :class="{'border-danger': $v.invitation.code.$dirty && !$v.invitation.code.required}"
                type="text"
                id="code"
                class="tender-input">
        </div>


        <div class="form-group col-md-6">
          <label for="decision-number">Որոշման համար</label>
          <input v-model.number="$v.invitation.decision_number.$model"
                  type="text"
                  class="tender-input"
                  id="decision-number">
        </div>
        <div class="form-group col-md-6">
          <label for="shipping-address">{{ typeLabel }} հասցե</label>
          <input v-model="$v.invitation.shipping_address.$model"
                 :class="{'border-danger': $v.invitation.shipping_address.$dirty && !$v.invitation.shipping_address.required}"
                 type="text"
                 id="shipping-address"
                 class="tender-input">
        </div>
        <div v-if="cpvType == 3" class="form-group col-md-12">
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="$v.invitation.work_type.$model" type="radio" id="inlineRadio1" :value="1" name="radioInline">
            <label class="form-check-label" for="inlineRadio1">Հիմնանորոգման աշխատանքներ</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="$v.invitation.work_type.$model" type="radio" id="inlineRadio2" :value="0" name="radioInline">
            <label class="form-check-label" for="inlineRadio2">Ընթացիկ վերանորոգման աշխատանքներ</label>
          </div>
        </div>

        <template v-if="cpvType == 2" >
          <div class="form-group col-md-6">
            <label for="protocols-copy-number">Հանձնման-ընդունման արձանագրությունների օրինակների քանակը</label>
          </div>
          <div v-if="cpvType == 2" class="form-group col-md-6">
            <input 
              v-model="$v.invitation.protocols_copy_number.$model"
              type="text"
              v-positive-only.none_zero.integer
              :class="{'border-danger': $v.invitation.protocols_copy_number.$dirty && !$v.invitation.protocols_copy_number.required}"
              id="protocols-copy-number"
              class="tender-input"
            >
          </div>
        </template>

        <div class="form-group col-md-12">
          <p>Հաղթողին որոշելու կարգը</p>
          <div class="form-check form-check-inline">
            <input 
              v-model="$v.invitation.winner_by_lots.$model"
              :value="1"
              class="form-check-input"
              type="radio"
              id="winner-by-lots-true"
              name="winner_by_lots"
            >
            <label class="form-check-label" for="winner-by-lots-true">Ըստ չափաբաժինների</label>
          </div>
          <div class="form-check form-check-inline">
            <input 
              v-model="$v.invitation.winner_by_lots.$model"
              :value="0"
              class="form-check-input"
              type="radio"
              id="winner-by-lots-false"
              name="winner_by_lots"
            >
            <label class="form-check-label" for="winner-by-lots-false">Ըստ ընդհանուր գնի</label>
          </div>
        </div>
        <div class="form-group col-md-12">
          <p>Հրավերն ուղարկել</p>
          <div class="form-check form-check-inline">
            <input 
              v-model="$v.invitation.send_to_all_participants.$model"
              :disabled="invitation.send_to_all_participants === 'from-invoice'"
              :value="1"
              class="form-check-input"
              type="radio"
              id="send-to-all-participants-true"
              name="send_to_all_participants"
            >
            <label class="form-check-label" for="send-to-all-participants-true">Բոլոր համընկնող մասնակիցներին</label>
          </div>
          <div class="form-check form-check-inline">
            <input 
              v-model="$v.invitation.send_to_all_participants.$model"
              :disabled="invitation.send_to_all_participants === 'from-invoice'"
              :value="0"
              class="form-check-input"
              type="radio"
              id="send-to-all-participants-false"
              name="send_to_all_participants"
            >
            <label class="form-check-label" for="send-to-all-participants-false">Նախընտրած մասնակիցներին</label>
          </div>
          <div class="form-check form-check-inline">
            <input 
              v-model="$v.invitation.send_to_all_participants.$model"
              :disabled="invitation.send_to_all_participants === 'from-invoice'"
              value="implement-immediately"
              class="form-check-input"
              type="radio"
              id="implement-immediately"
              name="send_to_all_participants"
            >
            <label class="form-check-label" for="implement-immediately">Գործընթացն իրականացնել անմիջապես</label>
          </div>
          <div v-if="invitation.send_to_all_participants === 'from-invoice'" class="form-check form-check-inline">
            <input 
              v-model="$v.invitation.send_to_all_participants.$model"
              value="from-invoice"
              class="form-check-input"
              type="radio"
              id="from-invoice"
              name="send_to_all_participants"
            >
            <label class="form-check-label" for="from-invoice">Հաշիվ ապրանքագրերից</label>
          </div>
        </div>
      </div>

      <p>2. Գնման ժամանակացույց</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-12">
            <label for="purchase-schedule">
              Ընթացիկ տարում՝ պատվերը ստանալուց՝
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
        </div>
      </div>

      <p>3. Հայտերի</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-4">
          <label for="application-opening-date">Բացման ամսաթիվ</label>
          <date-pick 
            v-model="$v.invitation.opening_date_time.$model"
            setTimeCaption='Ժամը՝'
            :format="'YYYY-MM-DD HH:mm'"
            :time-picker-options="customPickerOption"
            :pickTime="true"
            :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
            :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
            :inputAttributes="{readonly: true}"
            :isDateDisabled="(date) => {
              if(invitation.send_to_all_participants !== 'implement-immediately' && this.invitation.send_to_all_participants !== 'from-invoice'){
                return date < new Date()
              }
            }"
            id="application-opening-date"
            class="date-picker tender-date-picker "/>
        </div>
      </div>

      <template v-if="cpvType == 3 || cpvType == 2">
        <p>4. Մանրամասներ</p>
        <div class="form-row mb-3">
          <div v-if="cpvType == 3" class="form-group col-md-12">
            <div class="form-group d-flex justify-content-between align-items-center">
              <label>3.4.1 Աշխատանքների առնվազն
                <input v-model="$v.invitation.least_work_percent.$model"
                      :class="{'border-danger': $v.invitation.least_work_percent.$dirty && !$v.invitation.least_work_percent.required}"
                      type="text"
                      v-positive-only.none_zero.integer
                      style="border: none; width: 70px;"
                      class="text-center border-bottom border-info d-inline-block">
                տոկոսը կատարել անձամբ, պայմանագրով նախատեսված կարգով և ժամկետներում, իր ուժերով, գործիքներով, մեխանիզմներով, ինչպես նաև անհրաժեշտ նյութերով ու պատշաճ որակով` նախագծին և ծավալաթերթին համապատասխան։
              </label>
            </div>
            <div class="form-group justify-content-between">
              <label >
                Մինչև պայմանագրով աշխատանքի կատարման համար նախատեսված օրը ներառյալ Կապալառուն Պատվիրատուին է տրամադրում իր կողմից ստորագրված` աշխատանքը Պատվիրատուին հանձնելու փաստը ֆիքսող փաստաթուղթը (հավելված N 4.1) և հանձնման-ընդունման արձանագրության
                <input v-model="$v.invitation.protocols_copy_number.$model"
                      :class="{'border-danger': $v.invitation.protocols_copy_number.$dirty && !$v.invitation.protocols_copy_number.required}"
                      type="text"
                      v-positive-only.none_zero.integer
                      style="border: none; width: 70px;"
                      class="text-center border-bottom border-info d-inline-block">
                օրինակ (հավելված N 4):
              </label>
            </div>
          </div>
          <div v-if="cpvType != 1" class="form-group col-md-12">
            <div class="form-group d-flex justify-content-between align-items-center">
                <label> {{cpvType == 2 ? '3.3' : '4.4'}} Պատվիրատուն հանձնման-ընդունման արձանագրությունը ստանալու օրվան հաջորդող աշխատանքային օրվանից հաշված
                <input v-model="$v.invitation.protocol_presentation_deadline.$model"
                      :class="{'border-danger': $v.invitation.protocol_presentation_deadline.$dirty && !$v.invitation.protocol_presentation_deadline.required}"
                      type="text"
                      v-positive-only.none_zero.integer
                      style="border: none; width: 70px;"
                      class="text-center border-bottom border-info d-inline-block">
                աշխատանքային օրվա ընթացքում Կատարողին է ներկայացնում իր կողմից ստորագրված հանձնման-ընդունման արձանագրության մեկ օրինակը կամ ծառայությունը չընդունելու պատճառաբանված մերժումը։
              </label>
            </div>
          </div>
        </div>
      </template>

      <template v-if="cpvType == 3" >
        <p>5. Օրացույցային գրաֆիկ</p>
        <div class="form-row mb-3 w-100" >
          <div class="form-group w-100" style="height: 210px; overflow: auto;">
              <editor
                class="w-100"
                ref="file_editor"
                v-model="$v.invitation.calendar_schedule.$model"
                api-key="0itmwbkqro4fsojoh3hiqjwccys6v95aj8x5k2vcgczl9vam"
                :init="init"
              />           
          </div>
            <!-- <div class="form-group d-flex justify-content-between align-items-center">
              <label>
                * Կապալառուն աշխատանքները կատարում է
                <input v-model="$v.invitation.shipping_address.$model"
                      :class="{'border-danger': $v.invitation.shipping_address.$dirty && !$v.invitation.shipping_address.required}"
                      style="border: none;"
                      type="text"
                      class="border-bottom border-info d-inline-block">
                հասցեում:
              </label>
            </div> -->
        </div>
      </template>

      <p>Այլ պահանջներ</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-12">
          <textarea v-model="$v.invitation.other_requirements.$model"
                    placeholder="Օրինակ: Լիցենզիա, Սերտիֆիկատ և այլ նմանատիպ փաստաթղթեր"
                    rows="4"
                    id="other-requirements"
                    class="tender-input br-8"></textarea>
        </div>
      </div>
      
      <div v-if="cpvType == 3" class="mb-4 form-check">
        <input class="form-check-input" type="checkbox"  v-model="$v.invitation.is_construction.$model" :value="$v.invitation.is_construction.$model" id="is-construction">
        <label class="form-check-label" for="is-construction">
          Շինարարական աշխատանքներ
        </label>
      </div>
      <div :style="$v.invitation.send_to_all_participants.$model === 'implement-immediately' || this.invitation.send_to_all_participants === 'from-invoice' ? 'opacity: 0' : '' " class="mb-4 form-check" >
        <input class="form-check-input" type="checkbox"  v-model="$v.invitation.publicize.$model" :value="$v.invitation.publicize.$model" id="rights-responsibilities-fulfillment">
        <label class="form-check-label" for="rights-responsibilities-fulfillment">
          Հրապարակել
        </label>
      </div>
      
      <div v-if="mode === 'edit'" class="d-flex justify-content-end">
        <button @click="save" class="btn btn-primary mt-3 mr-3" type="button"  :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Պահպանել</span>
        </button>
        <button @click="confirm" class="btn btn-primary mt-3" type="button"  :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Հաստատել</span>
        </button>
        <button v-if="currentOrganized.confirm" @click="openSendInvitationModal"  :disabled="isSaving" class="btn btn-primary mt-3 ml-3" type="button">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Ուղարկել հրավերը</span>
        </button>
      </div>
    <send-invitation-modal />
    <winner-participant-modal />
  </div>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import { required } from 'vuelidate/lib/validators'
  import SendInvitationModal from '../modals/SendInvitationModal'
  import WinnerParticipantModal from '../modals/WinnerParticipantModal'
  import init from '@/mixins/variables'
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    name: 'InvitationFormOnePerson',
    mixins: [init],
    components: { SendInvitationModal, DatePick , WinnerParticipantModal,editor: Editor},
    data() {
      return {
        isSaving: false,
        cpvType: 1,
        mode: '',
        invitationUnchanged: {},
        invitation: {
          code_ru: null,
          name_ru: null,
          code: null,
          name: null,
          decision_number: null,
          winner_by_lots: 1,
          send_to_all_participants: 1,
          other_requirements: '',
          purchase_schedule: '',
          opening_date_time: this.currentDateTime(),
          shipping_address: null,
          work_type: 0,
          publicize: true,
          is_construction: false,
          calendar_schedule: `<table  contenteditable="true" style=" 
                                    width: 100%;
                                    table-layout: fixed;
                                    border-collapse: collapse;
                                    page-break-inside: avoid;
                                    border: 1px solid black;
                                    border-collapse: collapse;
                                    text-align: center;">
                    <tr>
                        <td rowspan="2" style="    
                                border: 1px solid black;
                                border-collapse: collapse;">N ը/կ</td>
                        <td rowspan="2" style="    
                                border: 1px solid black;
                                border-collapse: collapse;">Կապալառուի կողմից կատարվելիք աշխատանքների առանձին տեսակների անվանումներ</td>
                        <td colspan="2" style="    
                                border: 1px solid black;
                                border-collapse: collapse;">Աշխատանքների  կատարման ժամկետը**</td>
                    </tr>
                    <tr>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;">Սկիզբը</td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;">Ավարտը</td>
                    </tr>
                    <tr>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;">1</td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                    </tr>
                    <tr>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;">2</td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                    </tr>
                    <tr>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;">3</td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                    </tr>
                    <tr>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;">4</td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                    </tr>
                    <tr>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;">5</td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                    </tr>
                    <tr>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;">...</td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                    </tr>
                    <tr>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;" colspan="2">ԸՆԴԱՄԵՆԸ</td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                        <td style="    
                                border: 1px solid black;
                                border-collapse: collapse;"></td>
                    </tr>
                </table>  `,
          least_work_percent: '',
          protocols_copy_number: '',
          protocol_presentation_deadline: '',
        },
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organizeOnePerson/currentOrganized']
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
        return this.$store.getters['organizeOnePerson/organizedRows']
      },
    },
    watch: {
      currentOrganized(newValue) {
        this.invitation = Object.assign({}, this.invitation, newValue, {
          code_ru: newValue.code_ru,
          name_ru: newValue.name_ru,
          name: newValue.name,
          code: newValue.code,
          decision_number: newValue.decision_number,
          winner_by_lots: newValue.winner_by_lots ? 1 : 0,
          send_to_all_participants: newValue.send_to_all_participants,
          other_requirements: newValue.other_requirements,
          purchase_schedule: newValue.purchase_schedule,
          opening_date_time: newValue.opening_date_time !== "0000-00-00 00:00:00" ? newValue.opening_date_time : this.invitation.opening_date_time,
          shipping_address: newValue.shipping_address,
          work_type: newValue.work_type,
          publicize: newValue.publicize,
          is_construction: newValue.is_construction,
          calendar_schedule: newValue.calendar_schedule !==  '' ? newValue.calendar_schedule : this.invitation.calendar_schedule,
          least_work_percent: newValue.least_work_percent,
          protocols_copy_number: newValue.protocols_copy_number,
          protocol_presentation_deadline: newValue.protocol_presentation_deadline,
        })
        this.invitationUnchanged = _.cloneDeep(this.invitation)
      },
    },
    mounted() {
      this.cpvType = this.$route.query.cpvType
      this.mode = this.$route.query.mode
    },
    methods: {
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
        return changesObj
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
        this.$store.dispatch('organizeOnePerson/update', {id: this.currentOrganized.id, data: {...editedFields, publication: 'senden' }}).then((response) => {
          this.isSaving = false
          if(response) {
            this.$router.push('/organizing/oneperson')
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
        console.log(0)
        const editedFields = this.getChanges()
        this.isSaving = true
        if(!_.isEmpty(editedFields)) {
          this.organizeRowNumbering()
          this.$store.dispatch('organizeOnePerson/update', {id: this.currentOrganized.id, data: editedFields}).then((response) => {
            this.isSaving = false
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
        if(!this.$v.invitation.opening_date_time.$invalid){
          if(!this.$v.invitation.$invalid) {
            if(this.organizedRows.length > 0){
              this.isSaving = true
              editedFields.confirm = true
              this.organizeRowNumbering()
              this.$store.dispatch('organizeOnePerson/update', {id: this.currentOrganized.id, data: editedFields}).then((response) => {
                this.isSaving = false
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
              text: 'Լրացրեք բոլոր դաշտերը հաստատելու համար!'
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
      },
      openSendInvitationModal() {
        if(this.currentOrganized.contract_html_hy !==''){
          if(+this.invitation.send_to_all_participants === 1){
            this.publish()
          } else if(this.invitation.send_to_all_participants === 'implement-immediately' || this.invitation.send_to_all_participants === 'from-invoice'){
            this.$modal.show('winner-participant-modal', this.publish)
          } else {
            this.$modal.show('send-invitation-modal', this.publish)
          }
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Պահպանեք պայմանագրի նախագիծ փաստաթուղթը հրավերը ուղարկելու համար'
          })
        }
      },
      async organizeRowNumbering() {
        this.$client.post(`organize-row-array/numbering`, this.organizedRows).then(response => {
          this.$store.dispatch('organizeItender/getRows', {organizeId: this.$route.params.id})
        })
      }
    },
    validations() {
      const rules = {
        code_ru: {required},
        name_ru: {required},
        name: {required},
        code: {required},
        decision_number: {required},
        other_requirements: {},
        opening_date_time: {},
        purchase_schedule: {required},
        send_to_all_participants: {required},
        winner_by_lots: {required},
        shipping_address: {required},
        publicize: {required},
        is_construction: {},
      }
      if(this.invitation.send_to_all_participants !== 'implement-immediately' || this.invitation.send_to_all_participants === 'from-invoice'){
        Object.assign(rules, {
          opening_date_time: {
            required,    
            minValue: value => value > new Date().toISOString(),
          },
        })
      }
      switch(Number(this.cpvType)) {
        case 2:
          Object.assign(rules, {
            protocols_copy_number: {required},
            protocol_presentation_deadline: {required},
          })
          break
        case 3:
          Object.assign(rules, {
            work_type: {required},
            calendar_schedule: {required},
            least_work_percent: {required},
            protocols_copy_number: {required},
            protocol_presentation_deadline: {required},
          })
      }
      return { invitation: rules }
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