<template>
  <div class="card w-100 h-100">
    <div class="card-header">
      Ընդհանուր նկարագիր
    </div>
    <div class="tender-card-body">
      <div class="row w-100 p-0 m-0">
        <div class="form-group col-md-6 tender-input-group tender-input-group-left">
          <float-label :dispatch="false">
            <input
              v-model="$v.tender.title.$model"
              placeholder="Մրցույթի անվանում"
              type="text"
              name="name"
              class="tender-input pr-3"
            />
          </float-label>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-right">
          <float-label :dispatch="false">
            <input
              v-model="$v.tender.passwordTender.$model"
              placeholder="Մրցույթի ծածկագիր"
              type="text"
              name="name"
              class="tender-input pr-3"
            />
          </float-label>
        </div>
        <div class="form-group col-6 col-md-3 tender-input-group tender-input-group-left mobile-tender-input-group-left">
          <div class="vfl-has-label">
            <label class="vfl-label" :class="$v.tender.start_date.$model && 'vfl-label-on-input vfl-label'">Սկիզբ</label>
            <date-pick
              v-model="$v.tender.start_date.$model"
              :isDateDisabled="previousDate"
              :format="'YYYY-MM-DD HH:mm'"
              :displayFormat="'YYYY-MM-DD HH:mm'"
              :inputAttributes="{readonly: true, placeholder: 'Սկիզբ'}"
              :class="{'border-danger': $v.tender.start_date.$dirty && !$v.tender.start_date.required}"
              setTimeCaption='Ժամը՝'
              :pickTime="true"
              id="start-date"
              class="tender-date-picker date-picker"
              :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
              :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
            />
          </div>
        </div>
        <div class="form-group col-6 col-md-3 tender-input-group tender-input-group-center mobile-tender-input-group-right">
          <div class="vfl-has-label">
            <label class="vfl-label" :class="$v.tender.end_date.$model && 'vfl-label-on-input vfl-label'">Ավարտ</label>
            <date-pick 
              v-model="$v.tender.end_date.$model"
              :isDateDisabled="previousEndDate"
              :format="'YYYY-MM-DD HH:mm'"
              :displayFormat="'YYYY-MM-DD HH:mm'"
              :inputAttributes="{readonly: true, placeholder: 'Ավարտ'}"
              :class="{'border-danger': $v.tender.end_date.$dirty && !$v.tender.end_date.required}"
              setTimeCaption='Ժամը՝'
              :pickTime="true"
              id="end-date"
              class="tender-date-picker date-picker"
              :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
              :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
            />
          </div>
        </div>
        <div class="form-group col-6 col-md-3 tender-input-group tender-input-group-center mobile-tender-input-group-left">
          <float-label :dispatch="false">
            <select v-model="$v.tender.regions.$model" class="tender-input form-control" id="exampleFormControlSelect1">
              <option disabled selected value="0">Մարզ</option>
              <option v-for="region in regions" :value="region.id" :key="region.id">{{region.name}}</option>
            </select>
          </float-label>
        </div>
        <div class="form-group col-6 col-md-3 tender-input-group tender-input-group-right mobile-tender-input-group-right">
          <float-label :dispatch="false">
            <select v-model="$v.tender.type.$model" class="tender-input form-control" id="type">
              <option disabled selected value="0">Տեսակ</option>
              <option value="PAPER">Թղթային</option>
              <option value="ELECTRONIC">Էլեկտրոնային</option>
            </select>
          </float-label>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-left">
          <float-label :dispatch="false">
            <input 
              v-model.number="$v.tender.estimated.$model"
              v-positive-only.none-zero
              placeholder="Նախահաշվային գին"
              type="number"
              class="tender-input"
              id="procurement-name-ru"
            >
          </float-label>
        </div>
        <div class="form-group col-md-6 tender-input-group tender-input-group-right margin-bottom-28">
          <label class="m-0 btn" :class="(estimated_file_name  !== '' || estimated_file_link !== '') ? 'btn-primary' : 'btn-light'">
            <svg class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.231 13.0161V4.5H12.6733V13.0161L15.3656 10.3065L16.4233 11.371L12.9617 14.7581L11.904 15.8226L10.9425 14.7581L7.48096 11.371L8.53865 10.3065L11.231 13.0161ZM17.9615 17.9516V15.9193H19.5V17.758C19.5 18.7258 18.7308 19.5 17.7692 19.5H6.23077C5.26923 19.5 4.5 18.7258 4.5 17.758V15.9193H6.03846V17.9516H17.9615Z" fill="#006BE6"/>
            </svg>
            <span>Վերբեռնել Նախահաշվարկային գին</span> <input @change="previewEstimatedFile" type="file" hidden>
          </label>
          <div class="helper-text">Առավելագույնը 10ՄԲ</div>
        </div>
        <div class="form-group col-md-auto tender-input-group tender-input-group-left">
          <div class="row">
            <div class="col-auto">
              <label class="m-0 btn" :class="(invitation_file_name !== '' || invitation_file_link !== '') ? 'btn-primary' : 'btn-light'">
                <svg class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.231 13.0161V4.5H12.6733V13.0161L15.3656 10.3065L16.4233 11.371L12.9617 14.7581L11.904 15.8226L10.9425 14.7581L7.48096 11.371L8.53865 10.3065L11.231 13.0161ZM17.9615 17.9516V15.9193H19.5V17.758C19.5 18.7258 18.7308 19.5 17.7692 19.5H6.23077C5.26923 19.5 4.5 18.7258 4.5 17.758V15.9193H6.03846V17.9516H17.9615Z" fill="#006BE6"/>
                </svg>
                <span>Վերբեռնել Հրավեր</span> <input @change="previewInvitationFile" type="file" hidden>
              </label>
            </div>
            <div class="col-auto p-0">
              <div class="h-100 row align-items-center justify-content-start" style="padding-left: 23px">
                <div class="form-check form-check-inline">
                  <input 
                    v-model="$v.tender.guaranteed.$model"
                    id="guaranteed"
                    class="form-check-input"
                    type="checkbox"
                  >
                  <label class="form-check-label" for="guaranteed">Երաշխիքով</label>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="helper-text">Առավելագույնը 10ՄԲ</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <confirm-modal confirmBtnText="Հաստատել" declineBtnText="Չեղարկել"/>

  </div>
</template>

<script>
  import 'vue-date-pick/dist/vueDatePick.css';
  import { required } from 'vuelidate/lib/validators'
  import DatePick from 'vue-date-pick';

  export default {
    name: 'CreateTenderForm',
    props: ['rows', 'tenderData'],
    components: {
      ConfirmModal: () => import('@/components/helpers/ConfirmModal'),
      DatePick,
    },
    data() {
      return {
        isSaving: false,
        procedureTypes: [],
        regions: [],
        estimated_file_name: '',
        invitation_file_name: '',
        estimated_file_link: '',
        invitation_file_link: '',
        tender: {
          title: '',
          passwordTender: '',
          start_date: '',
          end_date: '',
          regions: 0,
          type: 0,
          estimated: '', // 
          estimated_file: { },
          invitation_file: { },
          guaranteed: false, // 
          cpv: [], // 
        },
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
    mounted() {
      this.$client.get('manager/getTenderFormSelectValues').then(({data}) => {
        this.procedureTypes = data.procedure
        this.regions = data.regions
        if(this.tenderData){
          console.log(this.tenderData)
          const regionId = this.regions.find(region => region.name === this.tenderData.region).id
          this.tender.id = this.tenderData.id;
          this.tender.title = this.tenderData.title;
          this.tender.passwordTender = this.tenderData.password;
          this.tender.start_date = this.tenderData.opening_date;
          this.tender.end_date = this.tenderData.finish_date;
          this.tender.type = this.tenderData.type;
          this.tender.regions = regionId;
          this.tender.guaranteed = Boolean(this.tenderData.guaranteed);
          this.estimated_file_link = this.tenderData.price_file
          this.invitation_file_link = this.tenderData.invitation_link
          this.tender.invitation_file = this.tenderData.invitation_link
        }
      })
    },
    methods: {
      previousDate(date){
        var d = new Date();
        var x = 1;
        return date < d.setDate(d.getDate() - x)
      },
      previousEndDate(date){
        var d = new Date(this.tender.start_date);
        var x = 0;
        return date < d.setDate(d.getDate() - x)
      },
      previewEstimatedFile(event){
        const file = event.target.files[0]
        if(file.size < 100000000){
          this.tender.estimated_file = file;
          // this.tender.estimated = file.name
          this.estimated_file_name = file.name
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Ընտրված ֆայլի առավելագույն ծավալը պետք է լինի 10ՄԲ'
          })
        }
      },
      previewInvitationFile(event){
        const file = event.target.files[0]
        if(file.size < 100000000){
          this.tender.invitation_file = file;
          this.invitation_file_name = file.name
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Ընտրված ֆայլի առավելագույն ծավալը պետք է լինի 10ՄԲ'
          })
        }
      },
      confirm() {
        if(!this.$v.tender.$invalid) {
          if(this.rows.length){
            if(this.tenderData){
              this.isSaving = true;
              const formData = new FormData();
              Object.keys(this.tender).forEach((key) => {
                formData.append(key, this.tender[key]);
              });
              const cpvArray = this.rows.map(row => row.cpv_id ? row.cpv_id : row.id);
              formData.append('cpv', JSON.stringify(cpvArray));
              this.$client.post('manager/edit/tender', formData).then(({data}) => {
                if(data){
                  this.$notify({
                    group: 'foo',
                    type: 'success',
                    text: 'Հաջողությամբ խմբագրված է'
                  })
                  this.isSaving = false;
                  this.$router.push('/organizator/tenders/list')
                }
              })
            } else {
              this.$modal.show('confirm-modal', {
                msg: '',
                callback: async () => {
                  this.isSaving = true;
                  const formData = new FormData();
                  Object.keys(this.tender).forEach((key) => {
                    formData.append(key, this.tender[key]);
                  });
                  const cpvArray = this.rows.map(row => row.id);
                  formData.append('cpv', JSON.stringify(cpvArray));
                  this.$client.post('manager/add/tender', formData).then(({data}) => {
                    if(data){
                      this.$notify({
                        group: 'foo',
                        type: 'success',
                        text: 'Հաջողությամբ հաստատված է'
                      })
                      this.isSaving = false;
                      this.$router.push('/organizator/tenders/list')
                    }
                  })
                }
              })
            }
          } else {
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
    },
    validations() {
      const rules = {
        tender: {
          passwordTender: { },
          title: { required },
          regions: { required },
          start_date: { required },
          end_date: { required },
          type: { required },
          estimated: { },
          estimated_file: { },
          invitation_file: { required },
          guaranteed: { required },
        },
      }
      return rules
    }
  }
</script>

<style scoped>

</style>
