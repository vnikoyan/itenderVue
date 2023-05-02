<template>
  <div id="commandment-file" ref="contract"
       class="w-100" style="line-height: 2">
    <p  class="text-center" style="text-align:center;">
      ՀՐԱՄԱՆ № <input type="text"
                      v-model="$v.inputs.commandmentNumber.$model"
                      ref="commandmentNumber"
                      onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
                      class="editor-input border-bottom border-dark"
                      style="width: 120px;border: none;">
    </p>
    <table style="width: 100%; border: 0;">
      <tr>
        <td style="width: 50%; border: 0; text-align: left;" class="ft-11"> 
          {{city}}
        </td>
        <td style="width: 50%; border: 0; text-align: right;" class="ft-11">
          <span class="ft-11">
            <!--        <date-pick v-model="inputs.commandmentDate"-->
                <!--                   :displayFormat="'YYYY-MM-DD'"-->
                <!--                   :inputAttributes="{readonly: true}"-->
                <!--                   :isDateDisabled="(date) => date < new Date()"-->
                <!--                   id="text-approval-date"-->
                <!--                   class="date-picker"></date-pick>-->
            <the-mask  type="text"
                      :mask="'##'"
                      v-model="$v.inputs.commandmentDateDay.$model"
                      ref="commandmentDateDay"
                      onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
                      class="editor-input text-right border-bottom border-dark"
                      style="width: 30px;border: none;" 
                      />.
            <the-mask  type="text"
                      :mask="'##'"
                      v-model="$v.inputs.commandmentDateMonth.$model"
                      ref="commandmentDateMonth"
                      onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
                      class="editor-input text-left border-bottom border-dark"
                      style="width: 30px;border: none;" />.20
            <the-mask  v-model="$v.inputs.commandmentDateYear.$model"
                      ref="commandmentDateYear"
                      :mask="'##'"
                      type="text"
                      onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
                      class="editor-input text-left border-bottom border-dark"
                      style="width: 30px;border: none;" />թ.
          </span>
        </td>
      </tr>
    </table>
    <br/>
    <div style="text-align: center;">
      «{{companyName}}» {{companyType}}-Ի ԿԱՐԻՔՆԵՐԻ ՀԱՄԱՐ
      <input v-model="$v.inputs.anonymInput1.$model"
              ref="anonymInput1"
              onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
              type="text"
              class="editor-input border-bottom border-dark"
              style="width: 200px;border: none;"> ՁԵՔԲԵՐՄԱՆ ԳՆՄԱՆ ԸՆԹԱՑԱԿԱՐԳԻ ԳՆԱՀԱՏՈՂ
      ՀԱՆՁՆԱԺՈՂՈՎ ՍՏԵՂԾԵԼՈՒ ՄԱՍԻՆ
    </div>
    <br>
    <p  dir="ltr" style="text-align: justify;">
      Ղեկավարվելով «Գնումների մասին» ՀՀ օրենքի 26 հոդվածի 1-ին և 2-րդ մասերով, ՀՀ
      կառավարության 2017 թվականի մայիսի 04-ի N 526-Ն որոշմամբ հաստատված
      «Գնումների գործընթացի կազմակերպման» կարգի 1-ին բաժնի 1-ին կետի, 3-րդ բաժնի
      5–րդ կետի 3-րդ ենթակետի, 7-րդ կետի 1-ին ենթակետի «գ»
      պարբերության,14-րդ,15-րդ կետերի դրույթներով, ինչպես նաև հիմք ընդունելով
      «{{companyName}}» {{companyType}}-ի 20
      <input type="text"
            
              v-model="$v.inputs.commandmentDateYear.$model"
              ref="commandmentDateYear"
              onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
              class="editor-input text-left border-bottom border-dark"
              style="width: 30px;border: none;">
      թվականի կարիքների համար
      <input type="text"
            
              v-model="$v.inputs.anonymInput2.$model"
              ref="anonymInput2"
              onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
              class="editor-input text-left border-bottom border-dark"
              style="width: 300px;border: none;">
      գնման պատասխանատու ստորաբաժանման կողմից ներկայացված համապատասխան գնման հայտը.
    </p>
    <br/>
    <div class="font-weight-bold text-center" style="text-align:center;">
      ՀՐԱՄԱՅՈՒՄ ԵՄ.
    </div>
    <br/>
    <div  dir="ltr" style="text-align: justify;">
      1. Ստեղծել «{{currentOrganized.translations.code[locale]}}» ծածկագրով {{ organizedProcurementType || 'գնանշման հարցման'}} միջոցով
      գնում կատարելու ընթացակարգի (այսուհետ` Գնման ընթացակարգ) գնահատող
      հանձնաժողով հետևյալ կազմով.
    </div>
    <br/>
    <table style="border: 0 !important; width: 100%;">
      <tr>
        <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Նախագահ`</td>
        <td style="border: 0 !important;text-align: left !important; font-size: 11pt;" class="ft-11">
          {{currentOrganized.translations.evaluator_president.name[locale]}}` {{currentOrganized.translations.evaluator_president.position[locale]}}
        </td>
      </tr>
      <tr>
        <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Անդամներ`
          <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
        </td>
        <td style="border: 0 !important; text-align: left !important;">
          <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="member in currentOrganized.evaluator_member" :key="member[locale]">{{member.name[locale]}}` {{member.position[locale]}}</div>
        </td>
      </tr>
    </table>  
    <br/>
    <div  dir="ltr" style="text-align: justify;">
      2. Գնման ընթացակարգի գնահատող հանձնաժողովի քարտուղար նշանակել «{{companyName}}» {{companyType}}-ի {{currentOrganized.evaluator_secretary_position}}` {{currentOrganized.evaluator_secretary_name.name}}
      {{currentOrganized.evaluator_secretary_name}}ին:
    </div>
    <div  dir="ltr" style="text-align: justify;">
      3. Գնման ընթացակարգի գնահատող հանձնաժողովի առաջին նիստը հրավիրել 20
      <the-mask type="text"
                :mask="'##'"
                v-model="$v.inputs.sessionYear.$model"
                ref="sessionYear"
                onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
                class="editor-input text-left border-bottom border-dark"
                style="width: 30px;border: none;" />
      թվականի
      <input type="text"
              v-model="$v.inputs.sessionMonth.$model"
              ref="sessionMonth"
              onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
              class="editor-input text-left border-bottom border-dark mr-2"
              style="width: 100px;border: none;">
      <the-mask type="text"
                :mask="'##'"
                v-model="$v.inputs.sessionDay.$model"
                ref="sessionDay"
                onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
                class="editor-input text-left border-bottom border-dark"
                style="width: 30px;border: none;" />-ին, ժամը
      <the-mask v-model="$v.inputs.sessionTime.$model"
                ref="sessionTime"
                :mask="['T#:K#']"
                v-tooltip="'Խնդրում ենք լրացնել ժամը 24ժամյա ֆորմատով'" 
                onkeypress="this.style.width = ((this.value.length + 1) * 10 + 2) + 'px';"
                :masked="true"
                :tokens="{
                  '#': {pattern: /\d/},
                  'T': {pattern: /[0-2]/},
                  'N': {pattern: /[0-4]/},
                  'K': {pattern: /[0-5]/},
                }"
                type="text"
                class="editor-input text-left border-bottom border-dark"
                style="width: 50px;border: none;"/>-ին, {{companyAddress}} հասցեում` «{{companyName}}» {{companyType}}-ի մասնաշենք:
    </div>
    <div dir="ltr" style="text-align: justify;">
      4. Գնման ընթացակարգի գնահատող հանձնաժողովին` հանձնաժողովի գործունեությունը
      կազմակերպել գնումների մասին ՀՀ օրենսդրությանը և այլ իրավական ակտերին
      համապատասխան:
    </div>
    <div dir="ltr">
      5. Սույն հրամանի կատարման հսկողությունը վերապահում եմ ինձ:
    </div>
    <div dir="ltr">
      6. Սույն հրամանը ուժի մեջ է մտնում ստորագրման պահից:
    </div>
    <br/>
    <div class="font-weight-bold">
      «{{companyName}}» {{companyType}}-Ի {{ me.organisation[0].translations.director_position.hy }}` {{directorName}}
    </div>
  </div>
</template>

<script>
  import { required } from "vuelidate/lib/validators";
  import $ from 'jquery'
  export default {
    name: 'evaluation_committee_commandment',
    props: ['handleLoadStart', 'handleLoadEnd'],
    data() {
      return {
        newProps: false,
        // commandment: '',
        inputs: {
          commandmentNumber: null,
          commandmentDateDay: null,
          commandmentDateMonth: null,
          commandmentDateYear: null,
          anonymInput1: '',
          anonymInput2: '',
          sessionMonth: null,
          sessionYear: null,
          sessionDay: null,
          sessionTime: null,
        },
        organizedProcurementType: '',
        city: null,
        companyName: null,
        companyType: null,
        companyAddress: null,
        directorName: null
      }
    },
    computed: {
      me() {
        return this.$store.getters['user/me']
      },
      locale() {
        return this.$store.getters['user/locale']
      },
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
    },
    async mounted() {
      const me = this.$store.getters['user/me']

      // todo: find a way to get organized procurement type
      // const procurementResponse = await this.$client.get(`procurement-plan/${(this.$store.getters['organize/organizedRows'])[0].details_id}`)
      this.companyName = me.organisation[0].translations.name[this.locale]
      this.companyType = me.organisation[0].translations.company_type[this.locale]
      this.city = me.organisation[0].translations.city[this.locale]
      this.companyAddress = me.organisation[0].translations.address[this.locale]
      this.directorName = me.organisation[0].translations.director_name[this.locale]
    },
    methods: {
      setInput(event, inputName) {
        this.$set(this.inputs, inputName, event.target.value)
      },
      async generatePdf () {
        this.$v.inputs.$touch();
        if (this.$v.inputs.$invalid) {
          // 1. Loop the keys
          for (const key in Object.keys(this.$v.inputs)) {
            // 2. Extract the input
            const input = Object.keys(this.$v.inputs)[key];
            // 3. Remove special properties
            if (input.includes("$")) return false;
            // 4. Check for errors
            if (this.$v.inputs[input].$error) {
              // 5. Focus the input with the error
              if(this.$refs[input]._isVue) {
                this.$refs[input].$el.focus()
              } else {
                this.$refs[input].focus();
              }

              // 6. Break out of the loop
              break;
            }
          }
        } else {
          // Submit the form here
          $('.editor-input').each(function() {
            const txt = $(this).val()
            $(this).after(txt)
            $(this).remove()
          });
          this.newProps = true
          this.sendToPDFGeneration(this, $('#commandment-file').html(), 'Գնահատող Հանձնաժողովի հրաման')
          await this.$fire({
            title: "Զգուշացում",
            text: "Հրամանը հաջողությամբ ներբեռված է Ձեր համակարգիչ, խնդրում ենք պահպանել այն, քանի որ պատուհանը փակելուց հետո այն համակարգում չի պահպանվելու",
            type: "info",
            confirmButtonText: 'Լավ'
          })
        }
      },
    },
    validations: {
      inputs: {
        commandmentNumber: {required},
        commandmentDateDay: {required},
        commandmentDateMonth: {required},
        commandmentDateYear: {required},
        anonymInput1: {required},
        anonymInput2: {required},
        sessionMonth: {required},
        sessionYear: {required},
        sessionDay: {required},
        sessionTime: {required},
      }
    }
  }
</script>

<style scoped>
  .editor-input{
    font-size: 13px;
    color: #303e67;
  }
</style>
