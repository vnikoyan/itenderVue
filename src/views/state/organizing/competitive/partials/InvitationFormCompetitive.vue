<template>
  <div class="card">
    <div class="card-body">
      <p>1. Հրավերի և հայտարարության տեքստերի հաստատման</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-6">
          <label for="text-approval-date">Ամսաթիվ</label>
          <date-pick v-model="$v.invitation.text_approval_date.$model"
                      :displayFormat="'YYYY-MM-DD'"
                      :inputAttributes="{readonly: true}"
                      :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
                      :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
                      id="text-approval-date"
                      class="date-picker tender-date-picker "></date-pick>
        </div>
        <div class="form-group col-md-6">
          <label for="decision-number">Որոշման համար</label>
          <input v-model="$v.invitation.decision_number.$model"
                  type="number"
                  class="tender-input"
                  :class="{/*'border-danger': $v.invitation.decision_number.$dirty && !$v.invitation.decision_number.required*/}"
                  id="decision-number">
        </div>
      </div>
  
      <p>2. Գնման ընթացակարգի անվանում</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-6">
          <label for="procurement-name-hy">Անվանում հայերեն</label>
          <input v-model="$v.invitation.name.hy.$model"
                  type="text"
                  class="tender-input"
                  :class="{/*'border-danger': $v.invitation.name.hy.$dirty && !$v.invitation.name.hy.required*/}"
                  id="procurement-name-hy">
        </div>
        <div class="form-group col-md-6">
          <label for="procurement-name-ru">Անվանում ռուսերեն</label>
          <input v-model.number="$v.invitation.name.ru.$model"
                  type="text"
                  class="tender-input"
                  :class="{/*'border-danger': $v.invitation.name.ru.$dirty && !$v.invitation.name.ru.required*/}"
                  id="procurement-name-ru">
        </div>
      </div>
  
      <p>3. Գնման ընթացակարգի ծածկագիր</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-6">
          <label for="procurement-code-hy">Ծածկագիր հայերեն</label>
          <input v-model="$v.invitation.code.hy.$model"
                  type="text"
                  class="tender-input"
                  :class="{/*'border-danger': $v.invitation.code.hy.$dirty && !$v.invitation.code.hy.required*/}"
                  id="procurement-code-hy">
        </div>
        <div class="form-group col-md-6">
          <label for="procurement-code-ru">Ծածկագիր ռուսերեն</label>
          <input v-model="$v.invitation.code.ru.$model"
                  type="text"
                  class="tender-input"
                  :class="{/*'border-danger': $v.invitation.code.ru.$dirty && !$v.invitation.code.ru.required*/}"
                  id="procurement-code-ru">
        </div>
      </div>
  
      <p>4. Հրավերի հրապարակման ամսաթիվ</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-6">
          <date-pick v-model="$v.invitation.public_date.$model"
                     @input="setOpeningDate"
                      :displayFormat="'YYYY-MM-DD'"
                      :inputAttributes="{readonly: true}"
                      :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
                      :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
                      id="publication-date"
                      class="date-picker tender-date-picker "></date-pick>
        </div>
      </div>
  
      <p>5. Հայտերի</p>
      <div class="form-row mb-3">
        <div class="form-group col-md-6">
          <label for="application-deadline">Ներկայացման ժամկետ (օր)</label>
          <the-mask v-model="$v.invitation.submission_date.$model"
                    @input="setOpeningDate"
                    mask="###"
                  type="text"
                  min="1"
                  class="tender-input"
                  :class="{/*'border-danger': $v.invitation.submission_date.$dirty && !$v.invitation.submission_date.required*/}"
                  id="application-deadline" />
        </div>
        <div class="form-group col-md-4">
          <label for="application-opening-date">Բացման ամսաթիվ</label>
          <date-pick v-model="$v.invitation.opening_date.$model"
                     :displayFormat="'YYYY-MM-DD'"
                     :inputAttributes="{readonly: true}"
                     :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
                      :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
                    id="application-opening-date"
                    class="date-picker tender-date-picker "></date-pick>
        </div>
        <div class="form-group col-md-2">
          <label for="application-opening-time">Բացման Ժամ</label>
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
                    class="tender-input" />
        </div>
      </div>
  
      <div class="form-row mb-3">
        <div class="col-4">
          <p>6. Կանխավճարի նախատեսում</p>
          <div class="form-check form-check-inline">
            <input v-model="$v.invitation.prepayment.$model"
                    value="1"
                    id="prepayment"
                    class="form-check-input"
                    type="radio">
            <label class="form-check-label" for="prepayment">Այո</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="$v.invitation.prepayment.$model"
                    value="0"
                    id="not-prepayment"
                    class="form-check-input"
                    type="radio">
            <label class="form-check-label" for="not-prepayment">Ոչ</label>
          </div>
        </div>
      </div>
      <div v-if="invitation.prepayment == 1" class="form-row mb-4">
        <div class="form-group col-md-6 mb-0">
          <label for="prepayment-max">Առավելագույն չափ</label>
          <the-mask v-model="$v.invitation.prepayment_max.$model"
                    mask="######################"
                    type="text"
                    class="tender-input"
                    :class="{'border-danger': $v.invitation.prepayment_max.$dirty && !$v.invitation.prepayment_max.required}"
                    id="prepayment-max" />
          <span v-if="$v.invitation.prepayment_max.$dirty && !$v.invitation.prepayment_max.required"
                class="small text-danger">Դաշտը պարտադիր է</span>
        </div>
        <div class="form-group col-md-6 mb-0">
          <label for="deposit-date">Ժամկետ</label>
          <date-pick v-model="$v.invitation.prepayment_time.$model"
                     :format="'YYYY-MM'"
                     :inputAttributes="{readonly: true}"
                     :isDateDisabled="(date) => date < new Date()"
                     id="deposit-date"
                     :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
                      :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
                     :class="{'border-danger': $v.invitation.prepayment_time.$dirty && !$v.invitation.prepayment_time.required}"
                     class="date-picker tender-date-picker "></date-pick>
          <span v-if="$v.invitation.prepayment_time.$dirty && !$v.invitation.prepayment_time.required"
                class="small text-danger">Դաշտը պարտադիր է</span>
        </div>
      </div>
  
      <div class="form-row mb-3">
        <div class="col-4">
          <p>7. Թղթային ձևով հրավերի տրամադրում</p>
          <div class="form-check form-check-inline">
            <input v-model="$v.invitation.paper_fee.$model"
                    value="0"
                    id="paper-fee"
                    class="form-check-input"
                    type="radio">
            <label class="form-check-label" for="paper-fee">Անվճար</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="$v.invitation.paper_fee.$model"
                    value="1"
                    id="not-paper-fee"
                    class="form-check-input"
                    type="radio">
            <label class="form-check-label" for="not-paper-fee">Վճարովի</label>
          </div>
        </div>
      </div>
      <div v-if="invitation.paper_fee == 1" class="form-row mb-4">
        <div class="form-group col-md-6 mb-0">
          <label for="fee">Գումարի չափ</label>
          <the-mask v-model="$v.invitation.fee.$model"
                    mask="#######"
                 type="text"
                 min="1"
                 class="tender-input"
                 :class="{'border-danger': $v.invitation.fee.$dirty && !$v.invitation.fee.required}"
                 id="fee" />
          <span v-if="$v.invitation.fee.$dirty && !$v.invitation.fee.required"
                class="small text-danger">Դաշտը պարտադիր է</span>
        </div>
        <div class="form-group col-md-6 mb-0">
          <label for="account-number">Բանկ և հաշվեհամար</label>
          <the-mask v-model.number="$v.invitation.account_number.$model"
                    mask="################"
                 type="text"
                 class="tender-input"
                 :class="{'border-danger': $v.invitation.account_number.$dirty && !$v.invitation.account_number.required}"
                 id="account-number" />
          <span v-if="$v.invitation.account_number.$dirty && !$v.invitation.account_number.required"
                class="small text-danger">Դաշտը պարտադիր է</span>
        </div>
      </div>
      <template v-if="Number($route.query.cpvType) === 3" >
        <p>Օրացույցային գրաֆիկ</p>
        <div class="form-row mb-3 w-100" >
          <div class="form-group w-100" style="height: 250px; overflow: auto;">
              <editor
                class="w-100"
                ref="file_editor"
                v-model="$v.invitation.calendar_schedule.$model"
                api-key="0itmwbkqro4fsojoh3hiqjwccys6v95aj8x5k2vcgczl9vam"
                :init="init"
              />           
          </div>
        </div>
      </template>
      <div class="mb-4">
        <p>8. Գնման գործընթացի կազմակերպման եղանակ</p>
        <div class="form-check form-check-inline">
          <input v-model="$v.invitation.organize_type.$model"
                 :value="1"
                 id="organize-type-electronic"
                 class="form-check-input"
                 type="radio">
          <label class="form-check-label" for="organize-type-electronic">Էլեկտրոնային</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="$v.invitation.organize_type.$model"
                 :value="0"
                 id="organize-type-paper"
                 class="form-check-input"
                 type="radio">
          <label class="form-check-label" for="organize-type-paper">Թղթային</label>
        </div>
      </div>
      <div v-if="Number($route.query.cpvType) === 3" class="mb-4 form-check">
        <input class="form-check-input" type="checkbox"  v-model="$v.invitation.is_construction.$model" :value="$v.invitation.is_construction.$model" id="is-construction">
        <label class="form-check-label" for="is-construction">
          Շինարարական աշխատանքներ
        </label>
      </div>
  
      <div class="mb-4 form-check" v-if="Number(this.$route.query.cpvType) === 3 && this.currentOrganized.is_construction">
        <input class="form-check-input" type="checkbox"  v-model="$v.invitation.is_with_specification.$model" :value="$v.invitation.is_with_specification.$model" id="is_with_specification">
        <label class="form-check-label" for="is_with_specification">
          սարքերի և սարքավորումների տեխնիկական բնութագրերի, ապրանքային նշանների, ֆիրմային անվանումների, մակնիշների, արտադրողների և երաշխիքային ժամկետների ներկայացման պահանջի կիրառում
        </label>
      </div>
  
      <div class="mb-4 form-check">
        <input class="form-check-input" type="checkbox"  v-model="$v.invitation.rights_responsibilities_fulfillment.$model" :value="$v.invitation.rights_responsibilities_fulfillment.$model" id="rights-responsibilities-fulfillment">
        <label class="form-check-label" for="rights-responsibilities-fulfillment">
        Պայմանագրով նախատեսված կողմերի իրավունքների և պարտականությունների կատարման պայման է հանդիսանում պայմանագիրը ՀՀ ֆինանսների նախարարության կողմից հաշվառված լինելու հանգամանքը:
        </label>
      </div>
      <template>
        <div v-if="Number($route.query.cpvType) === 2" class="mb-4 form-check">
          <input class="form-check-input" type="checkbox"  v-model="$v.invitation.repair_services.$model" :value="$v.invitation.repair_services.$model" id="repair_services">
          <label class="form-check-label" for="repair_services">
            Ավտոմեքենաների, սարքերի և սարքավորումների վերանորոգման ծառայությունների մատուցում
          </label>
        </div>
      </template>  
      <div class="d-flex justify-content-end">
        <button @click="save" class="btn btn-primary mt-3 mr-3" type="button" :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Պահպանել</span>
        </button>
        <button @click="confirm" class="btn btn-primary mt-3" type="button" :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Հաստատել</span>
        </button>
        <button v-if="currentOrganized.confirm" @click="publish" class="btn btn-primary mt-3 ml-3" type="button" :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Հրապարակել</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';
  import init from '@/mixins/variables'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'Invitation',
    mixins: [init],
    components: { DatePick,editor: Editor},
    data() {
      const today = new Date()
      today.setDate(today.getDate() + 30)
      const formattedDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
      return {
        isSaving: false,
        invitation: {
          is_with_specification: false,
          repair_services: false,
          organize_type: 1,
          text_approval_date: formattedDate,
          public_date: formattedDate,
          submission_date: 1,
          opening_date: formattedDate,
          opening_time: '',
          prepayment: 1,
          prepayment_max: "",
          prepayment_time: formattedDate,
          rights_responsibilities_fulfillment: '',
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
          is_construction: 0,
          paper_fee: 1,
          fee: 1,
        },
        invitationUnchanged: {}
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      organizedRows() {
        return this.$store.getters['organize/organizedRows']
      },
      me() {
        return this.$store.getters['user/me']
      },
    },
    watch: {
      currentOrganized(newValue) {
        this.invitation = Object.assign({}, this.invitation, newValue, {
          is_with_specification: newValue.is_with_specification,
          repair_services: newValue.repair_services,
          calendar_schedule: newValue.calendar_schedule !==  '' ? newValue.calendar_schedule : this.invitation.calendar_schedule,
          name: {
            hy: newValue.translations.name.hy || '',
            ru: newValue.translations.name.ru || ''
          },
          code: {
            hy: newValue.translations.code.hy || '',
            ru: newValue.translations.code.ru || ''
          },
          evaluator_secretary_name: {
            hy: newValue.translations.evaluator_secretary_name.hy || '',
            ru: newValue.translations.evaluator_secretary_name.ru || ''
          },
          evaluator_president: {
            hy: newValue.translations.evaluator_president.hy || '',
            ru: newValue.translations.evaluator_president.ru || ''
          },
          // opening_time: newValue.opening_time.replace(/:([^:]*)$/, ''),
          opening_time: newValue.opening_time,
          is_construction: newValue.is_construction,
          rights_responsibilities_fulfillment: Number(newValue.rights_responsibilities_fulfillment)
        })
        // eslint-disable-next-line no-undef
        this.invitationUnchanged = _.cloneDeep(this.invitation)
      },
    },
    methods: {
      async organizeRowNumbering() {
        this.$client.post(`organize-row-array/numbering`, this.organizedRows).then(response => {
          this.$store.dispatch('organizeItender/getRows', {organizeId: this.$route.params.id})
        })
      },
      publish() {
        // if(this.currentOrganized.get_invitation){
        if(this.currentOrganized.contract_html_hy){
          this.$prompt(
            "Խնդրում ենք ստորև տեղադրել հրապարակման հղումը", 
            "", 
            "Սույն գործողությամբ հաստատվում է ընթացակագարգի հրապարակումը", 
            "info", 
            {
              confirmButtonText: 'Հրապարակել', 
              cancelButtonText: 'Փակել'
            }
          ).then(text => {
            const editedFields = this.getChanges()
            editedFields.publication = text
            this.organizeRowNumbering()
            this.$client.put(`organize/${this.currentOrganized.id}`, editedFields).then(({ status, data }) => {
              // eslint-disable-next-line eqeqeq
              if(status == 200) {
                this.$store.commit('organize/setCurrentOrganized', data.data)
                this.$router.push('/organizing/competitive')
                $client.put(`user`, {rights_responsibilities_fulfillment: this.invitation.rights_responsibilities_fulfillment})
              }
              this.isSaving = false
            }).catch(e => {
              this.$notify({
                group: 'foo',
                type: 'error',
                title: 'Ինչ որ բան այն չէ',
                text: 'Կրկին փորձեք!'
              })
              this.isSaving = false
            })
          });
        } else {
          this.$fire({
            title: "Զգուշացում",
            text: "Պահպանեք պայմանագիրը (հայերեն)",
            type: "error",
            confirmButtonText: 'Լավ'
          })
        }
      },
      confirm() {
        this.$client.put(`organize/${this.currentOrganized.id}`, {contract_html_ru: '',contract_html_hy: ''})
        const editedFields = this.getChanges()
        // eslint-disable-next-line no-undef
        if(!this.$v.invitation.$invalid) {
          if(this.organizedRows.length>0){
            editedFields.confirm = true
            this.isSaving = true
            this.organizeRowNumbering()
            this.$client.put(`organize/${this.currentOrganized.id}`, editedFields).then(({ status, data }) => {
              // eslint-disable-next-line eqeqeq
              if(status == 200) {
                this.$store.commit('organize/setCurrentOrganized', data.data)
                this.$fire({
                  text: "Հրավերի և մնացած փաստաթղթերի հետ հետագա աշխատանքների համար անհրաժեշտ է մուտք գործել փաստաթղթեր մենյու։",
                  type: "info",
                  confirmButtonText: 'Լավ'
                })
              }
              this.isSaving = false
            }).catch(e => {
              this.$notify({
                group: 'foo',
                type: 'error',
                title: 'Ինչ որ բան այն չէ',
                text: 'Կրկին փորձեք!'
              })
              this.isSaving = false
            })
          }else {
            this.$notify({
              group: 'foo',
              type: 'error',
              text: 'Ընտրեք գոնե մեկ գնման առարկա հաստատելու համար'
            })
          }
        } else {
            this.$notify({
              group: 'foo',
              type: 'error',
              text: 'Լրացրեք բոլոր դաշտերը հաստատելու համար!'
            })
        }
      },
      save() {
        this.$client.put(`organize/${this.currentOrganized.id}`, {contract_html_ru: '',contract_html_hy: ''})
        const editedFields = this.getChanges()
        // eslint-disable-next-line no-undef
        if(!_.isEmpty(editedFields)) {
          this.isSaving = true
          this.$client.put(`organize/${this.currentOrganized.id}`, editedFields).then(({ status, data }) => {
            // eslint-disable-next-line eqeqeq
            if(status == 200) {
            this.organizeRowNumbering()
              this.$store.commit('organize/setCurrentOrganized', data.data)
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ թարմացված է'
              })
            }
            this.isSaving = false
          }).catch(e => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
            this.isSaving = false
          })
        } else {
          this.$notify({
            group: 'foo',
            type: 'warn',
            text: 'Դուք չունեք փոփոխված դաշտ !'
          })
        }
      },
      setOpeningDate() {
        const date = new Date(this.invitation.public_date)
        date.setDate(date.getDate() + Number(this.invitation.submission_date))

        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if(day < 10) day = '0' + day
        if(month < 10) month = '0' + month

        this.$set(this.invitation, 'opening_date', `${year}-${month}-${day}`)
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

        // eslint-disable-next-line eqeqeq
        if(changesObj.paper_fee && changesObj.paper_fee == 0) {
          delete changesObj.fee
          delete changesObj.account_number
          // eslint-disable-next-line eqeqeq
        } else if(changesObj.paper_fee && changesObj.paper_fee == 1) {
          changesObj.fee = this.invitation.fee
          changesObj.account_number = this.invitation.account_number
        }
        // eslint-disable-next-line eqeqeq
        if(changesObj.prepayment && changesObj.prepayment == 0) {
          delete changesObj.prepayment_max
          delete changesObj.prepayment_time
          // eslint-disable-next-line eqeqeq
        } else if(changesObj.prepayment && changesObj.prepayment == 1) {
          changesObj.prepayment_max = this.invitation.prepayment_max
          changesObj.prepayment_time = this.invitation.prepayment_time
        }

        return changesObj
      }
    },
    validations() {
      const rules = {
        invitation: {
          repair_services: { required },
          organize_type: { required },
          text_approval_date: { required },
          decision_number: { required },
          name: {
            hy: { required },
            ru: { required }
          },
          code: {
            hy: { required },
            ru: { required }
          },
          public_date: { required },
          submission_date: { required },
          opening_date: { required },
          opening_time: { required },
          prepayment: { required },
          prepayment_max: { },
          prepayment_time: { },
          paper_fee: { required },
          fee: { },
          account_number: { },
          is_construction: { },
          rights_responsibilities_fulfillment: { required },
        },
      }
      // eslint-disable-next-line eqeqeq
      if(this.invitation.prepayment == 1) {
        Object.assign(rules.invitation, {
          prepayment_max: {required},
          prepayment_time: {required}
        })
      }
      // eslint-disable-next-line eqeqeq
      if(this.invitation.paper_fee == 1) {
        Object.assign(rules.invitation, {
          fee: {required},
          account_number: {required}
        })
      }
      if(Number(this.$route.query.cpvType) === 3) {
        Object.assign(rules.invitation, {
          calendar_schedule: {required},
        })
      }

      if(Number(this.$route.query.cpvType) === 3 && this.currentOrganized.is_construction) {
        Object.assign(rules.invitation, {
          is_with_specification: {required},
        })
      }

      return rules
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
