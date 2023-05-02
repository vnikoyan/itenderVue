<template>
  <div v-if="!isLoading" id="document">
    <div style="text-align: right;">Հավելված 8</div>
    <div style="text-align: right;"> « {{ !_.isEmpty(currentOrganized) && currentOrganized.translations.code.hy }} »  ծածկագրով գնանշման հարցման հրավերի</div>
    <br>
    <div style="display: inline-block;width: 100%;text-align: center;margin-bottom: 0; line-height: 24px;" >
      <h5 >ՀԱՐՑՈՒՄ</h5>
      <h5 >ՀՀ կառավարության 2017թ. մայիսի 4-ի N 526-Ն որոշմամբ հաստատված "Գնումների գործընթացի կազմակերպման"
        կարգի 43-րդ կետի 3-րդ մասով նախատեսված տվյալների ճշտման մասին
      </h5>
      <br>
      <p style="display: inline-block;width: 100%;text-align: justify;margin-bottom: 0;" >
        «{{ !_.isEmpty(me) && me.organisation[0].translations.name.hy }}» -ի կարիքների համար կազմակերպված {{ !_.isEmpty(currentOrganized) && currentOrganized.translations.code.hy }} ծածկագրով գնման ընթացակարգի  գնահատող հանձնաժողովի
        <b >
          <the-mask type="text"
                    mask="##"
                    ref="day"
                    inputName="day"
                    v-model="$v.inputs.day.$model"
                    :class="{'border-danger': $v.inputs.day.$dirty && !$v.inputs.day.required}"
                    style="border: none; width: 30px;"
                    class="editor-input border-bottom border-dark" />.
          <the-mask type="text"
                    ref="month"
                    inputName="month"
                    v-model="$v.inputs.month.$model"
                    :class="{'border-danger': $v.inputs.month.$dirty && !$v.inputs.month.required}"
                    mask="##"
                    style="border: none; width: 30px;"
                    class="editor-input border-bottom border-dark" />.
          <the-mask type="text"
                    ref="year"
                    inputName="year"
                    v-model="$v.inputs.year.$model"
                    :class="{'border-danger': $v.inputs.year.$dirty && !$v.inputs.year.required}"
                    mask="####"
                    style="border: none; width: 60px;"
                    class="editor-input border-bottom border-dark" />
        </b>-ի
        N <input type="text"
                  ref="anonymInput1"
                  inputName="anonymInput1"
                  v-model="$v.inputs.anonymInput1.$model"
                  style="border: none;"
                  class="editor-input border-bottom border-dark"
                  :class="{'border-danger': $v.inputs.anonymInput1.$dirty && !$v.inputs.anonymInput1.required}">
        է զբաղեցրել ներքոհիշյալ մասնակիցը /ները/`
      </p>
      <br>
      <table style=" 
                            width: 100%;
                            table-layout: fixed;
                            border-collapse: collapse;
                            page-break-inside: avoid;
                            border: 1px solid black;
                            text-align: center;" cellspacing="8" cellpadding="8">
        <tr>
          <th style="border: 1px solid black;
                     border-collapse: collapse;" colspan="4">Մասնակցի</th>
        </tr>
        <tr>
          <th style="border: 1px solid black;
                      border-collapse: collapse;">N</th>
          <th style="border: 1px solid black;
                     border-collapse: collapse;">անվանում</th>
          <th style="border: 1px solid black;
                     border-collapse: collapse;">հարկ վճարողի հաշվառման համար</th>
          <th style="border: 1px solid black;
                     border-collapse: collapse;">հայտը ներկայացվելու ամիս, ամսաթիվ, տարեթիվ</th>
        </tr>
        <tr v-for="(participantGroup, index) in participants" :key="participantGroup.group_id">
          <td  style="border: 1px solid black;
                      border-collapse: collapse;">{{ index + 1 }}</td>
          <td  style="border: 1px solid black;
                      border-collapse: collapse;">{{ participantGroup.participant[0].name.hy }}</td>
          <td  style="border: 1px solid black;
                      border-collapse: collapse;">{{ participantGroup.participant[0].tin }}</td>
          <td  style="border: 1px solid black;
                      border-collapse: collapse;">{{ participantGroup.participant[0].date_of_submission }}</td>
        </tr>
      </table>
    </div>
    <p  style="text-align: justify; line-height: 24px;">
      Խնդրում ենք ՀՀ կառավարության 2017թ. մայիսի 4-ի N 526-Ն որոշմամբ հաստատված
      "Գնումների գործընթացի կազմակերպման" կարգի 44-րդ կետով սահմանված ժամկետում տրամադրել
      տեղեկատվություն 1-ին տեղը զբաղեցրած մասնակցի` նույն կարգի 43-րդ կետի 3-րդ մասով նախատեսված տվյալների վերաբերյալ:
    </p>
    <p style="text-align: justify;" >
      {{ !_.isEmpty(currentOrganized) && currentOrganized.translations.code.hy }} ծածկագրով գնահատող հանձնաժողովի քարտուղար՝  _____________________________   {{  currentOrganized.evaluator_secretary_name }}
    </p>
    <p style="display:flex;justify-content:flex-end;margin:35px 0;padding-bottom: 20px; text-align: right;">
      «<the-mask type="text"
                  style="border: none; width: 30px; text-align: right;"
                  class="editor-input border-bottom border-dark"
                  mask="##" />»
      «<the-mask type="text"
                  style="border: none; width: 30px; text-align: right;"
                  class="editor-input border-bottom border-dark"
                  mask="##" />» {{ currentYear }}թ.</p>
  </div>
  <span v-else style="position: absolute; right: 0; top: 0; left: 0; bottom: 0" class="m-auto spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
</template>

<script>
  import { required } from "vuelidate/lib/validators";
  import $ from 'jquery'

  export default {
    name: 'state_revenue_committee_survey',
    props: ['handleLoaded'],
    data() {
      return {
        isLoading: false,
        newProps: false,
        participants: [],
        inputs: {
          day: null,
          month: null,
          year: null,
          anonymInput1: null,
        },
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      currentYear() {
        return (new Date()).getFullYear()
      },
      me() {
        return this.$store.getters['user/me']
      },
    },
    watch: {
      currentOrganized: {
        immediate: true,
        async handler() {
          await this.$client.get(`participant-group/getByOrganize/${this.$route.params.id}`).then(response => {
            response.data.forEach(element => {
              if(element.lots.length){
                this.participants.push(element)
              }
            });
          })
          this.handleLoaded(); 
        }
      },
    },
    methods: {
      save () {
        this.$v.$touch();
        const _this = this
        let hasInvalid = false;
        $('.editor-input').each(function() {
          const inputName = $(this).attr('inputname');
          const input = _this.$v.inputs[inputName];
          if (input && input.$error) {
            hasInvalid = true;
            if(_this.$refs[inputName]._isVue) {
                _this.$refs[inputName].$el.focus()
            } else {
                _this.$refs[inputName].focus();
            }
            return false;
          }
        });
        if(!hasInvalid){
          this.isLoading = true;
          $('.editor-input').each(function() {
            const txt = $(this).val()
            $(this).after(txt)
            $(this).remove()
          });
          // Submit the form here
          this.sendToPDFGeneration(this, $('#document').html(), 'Ծանուցում բանակցությունների վերաբերյալ', () => {this.isLoading = false});
          this.newProps = false
        }
      },
      async handleBeforeDownload() {
        this.newProps = true
        await this.handleLoaded()
        return this.$refs.html2Pdf.$el.innerHTML
      },
    },
    validations: {
      inputs: {
        day: {required},
        month: {required},
        year: {required},
        anonymInput1: {required},
      }
    }
  }
</script>

<style scoped>
  *{
      font-family: GHEA grapalat  !important;
  }
</style>
