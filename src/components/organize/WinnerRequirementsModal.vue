<template>
  <modal 
    name="winner-requirements-modal"
    @closed="handleBeforeClose"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="25%"
    height="60%"
  >
    <div id="modal-header" style="background-color:#006BE6">
      <div class="w-75 d-flex">
        <p class="text-white">Վավերապայմանների մուտքագրում</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('winner-requirements-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#FFFFFF"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="row m-0 p-0">
        <div class="col-md-12 p-0">
          <div class="form-group col-md-12">
            <div class="mb-3 mt-3 pl-1">
              <float-label>
                <input 
                  v-model="$v.winner.bank.$model"
                  placeholder="Բանկ / Գանձապետարան"
                  name="bank"
                  type="text"
                  class="tender-input"
                >
              </float-label>
            </div>
          </div>
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <float-label>
                <the-mask 
                  v-model.number="$v.winner.account_number.$model"
                  mask="################"
                  placeholder="Հաշվեհամար"
                  type="text"
                  name="account-number"
                  class="tender-input"
                  id="account-number"
                />
              </float-label>
            </div>
          </div>
          <div class="form-group col-md-12">
            <div class="mb-3 pl-1">
              <float-label>
                <input 
                  v-model="$v.winner.director.$model"
                  placeholder="Տնօրենի անուն ազգանուն"
                  name="bank"
                  type="text"
                  class="tender-input"
                >
              </float-label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button :disabled="isLoading" @click="save" class="btn btn-primary br-8">
        <span v-if="isLoading" class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    name: 'WinnerRequirementsModal',
    components: {  },
    data() {
      return {
        isLoading: false,
        participantGroup: {},
        winner: {
          bank: '',
          account_number: '',
          director: '',
        },
      }
    },
    validations() {
      const rules = {
        winner: {
          bank: {required},
          account_number: {required},
          director: {required},
        },
      }
      return rules
    },
    computed: { },
    methods: {
      handleBeforeClose(){
        this.winner = {
          bank: '',
          account_number: '',
          director: '',
        };
      },
      handleBeforeOpen({params}) {
        if(params.user_datas){
          this.winner.bank = params.user_datas.bank;
          this.winner.account_number = params.user_datas.account_number;
          this.winner.director = params.user_datas.director;
        }
        this.participantGroup = params
        console.log(this.participantGroup)
        if(this.participantGroup.participant_user){
          this.winner.bank = this.participantGroup.participant_user.organisation.bank_name.hy;
          this.winner.account_number = +this.participantGroup.participant_user.organisation.bank_account;
          this.winner.director = this.participantGroup.participant_user.organisation.director_name.hy;
        }
        if(this.participantGroup.director || this.participantGroup.bank || this.participantGroup.bank_account){
          this.winner.bank = this.participantGroup.bank;
          this.winner.account_number = +this.participantGroup.account_number;
          this.winner.director = this.participantGroup.director;
        }
      },
      save() {
        if(!this.$v.winner.$invalid) {
          this.isLoading = true;
          this.$client.post(`participant-group/addPersonalInfo/${this.participantGroup.id}`, this.winner).then((response) => {
            if(response.data.status){
              this.$emit('updateComparisonData')
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ պահպանված է'
              })
            }
            this.isLoading = false
            this.$modal.hide('winner-requirements-modal')
          }).catch(e => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
            this.isLoading = false
          })
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Լրացրեք բոլոր դաշտերը պահպանելու համար!'
          })
        }
      }
    },
  }
</script>

<style scoped>
@media only screen and (max-width: 760px) {
  #modal-footer{
    text-align: center;
  }
}
</style>