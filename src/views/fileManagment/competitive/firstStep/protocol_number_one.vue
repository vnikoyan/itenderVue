<template>
    <div id="commandment-file" class="px-2" contenteditable="true">
      <h5  class="text-center font-weight-bold" style="text-align: center;">Արձանագրություն N 1</h5>
      <p  class="text-center font-weight-bold" style="text-align: center;">« {{ currentOrganized.translations.code.hy }} » ծածկագրով գնման ընթացակարգի գնահատող հանձնաժողովի նիստի</p>
      <table style="width: 100%; border: 0;">
        <tr>
          <td style="width: 50%; border: 0;text-align: left;">
            <div style="text-align: left;">
              <span class="ft-11">{{ me.organisation[0].translations.city.hy}} {{ me.organisation[0].translations.address.hy }}</span>
            </div>
          </td>
          <td style="width: 50%; border: 0;text-align: right;">
            <div style="text-align: right;">
              <label for="day1">
                «<the-mask type="text"
                          mask="##"
                          id="day1"
                          ref="day1"
                          v-model="$v.day1.$model"
                          :class="{'border-danger': $v.day.$dirty && !$v.day.required}"
                          style="border: none; width: 25px;"
                          class="editor-input ttext-center border-bottom border-dark" />»
              </label>
              <label for="month1">
                «<the-mask type="text"
                          ref="month1"
                          id="month1"
                          v-model="$v.month1.$model"
                          :class="{'border-danger': $v.month.$dirty && !$v.month.required}"
                          mask="##"
                          style="border: none; width: 25px;"
                          class="editor-input ttext-center border-bottom border-dark" />»
              </label>
              <label for="year1">
                <the-mask type="text"
                          id="year1"
                          ref="year1"
                          v-model="$v.year1.$model"
                          :class="{'border-danger': $v.year.$dirty && !$v.year.required}"
                          mask="####"
                          style="border: none; width: 50px;"
                          class="editor-input border-bottom border-dark" />թ.
              </label>
                <div class="mt-2" >
                <label for="time1">
                    Ժ.
                    <the-mask type="text"
                    id="time1"
                    ref="time1"
                    v-model="$v.time1.$model"
                    :class="{'border-danger': $v.time.$dirty && !$v.time.required}"
                    :mask="['T#:K#']"
                    :masked="true"
                    :tokens="{
                      '#': {pattern: /\d/},
                      'T': {pattern: /[0-2]/},
                      'N': {pattern: /[0-4]/},
                      'K': {pattern: /[0-5]/},
                    }"
                    style="border: none; width: 40px;"
                    class="editor-input text-center border-bottom border-dark" />
                </label>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <table style="border: 0 !important; width: 100%;">
        <tr>
          <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Մասնակցում էին`</td>
          <td></td>
        </tr>
        <tr>
          <td class="ft-11" style="border: 0 !important;text-align: left !important;width: 40%;font-size: 11pt;">Հանձնաժողովի նախագահ`</td>
          <td style="border: 0 !important;text-align: left !important; font-size: 11pt;" class="ft-11">
            {{ currentOrganized.translations.evaluator_president.name.hy }} 
          </td>
        </tr>
        <tr>
          <td class="ft-11" style="border: 0 !important; text-align: left !important;width: 40%;font-size: 11pt;">Հանձնաժողովի անդամներ`
            <p style="font-size: 11pt; height: 10px;" v-for="(member,index) in currentOrganized.evaluator_member.length - 1" :key="index + Math.random()"><br></p>
          </td>
          <td style="border: 0 !important; text-align: left !important;">
            <div class="ft-11" style="margin-bottom: 0;font-size: 11pt;" v-for="(member,index) in currentOrganized.evaluator_member" :key="index + Math.random()">{{ member.name.hy }} </div>
          </td>
        </tr>
        <tr>
          <td class="ft-11" style="border: 0 !important; text-align: left !important; width: 40%;font-size: 11pt;">Հանձնաժողովի քարտուղար`</td>
          <td style="border: 0 !important; text-align: left !important;font-size: 11pt;" class="ft-11">
            {{ currentOrganized.translations.evaluator_secretary_name.hy }}
          </td>
        </tr>
      </table> 
      <div class="text-center font-weight-bold mb-0" style="text-align: center; margin-top: 40px;">1. Գնման ընթացակարգի հանձնաժողովի նիստի օրակարգը հաստատելու մասին</div>
      <div  class="small text-center" style="text-align: center;">({{ currentOrganized.translations.evaluator_president.name.hy }})</div>
      <div><span  class="font-weight-bold">Որոշում (թիվ 1)՝</span> Գնահատող հանձնաժողովը որոշեց հաստատել հանձնաժողովի նիստի հետևյալ օրակարգը.</div>
      <ol>
        <li >Հանձնաժողովի նիստի օրակարգը հաստատելու մասին.</li>
        <li >Գնման ընթացակարգի հայտարարության տեքստը հաստատելու մասին</li>
        <li >Գնման ընթացակարգի հրավերի տեքստը հաստատելու մասին</li>
        <li >Հանձնաժողովի հաջորդ նիստի անցկացման օրը, ժամը և վայրը հաստատելու մասին</li>
      </ol>
      <div class="font-weight-bold">Ընդունվել է որոշում` կողմ` {{ currentOrganized.evaluator_member.length + 1 }}, դեմ` 0</div>
      <div class="text-center font-weight-bold mb-0" style="text-align: center; margin-top: 20px;">2. Գնման ընթացակարգի հայտարարության տեքստը հաստատելու մասին</div>
      <div class="small text-center" style="text-align: center;">({{ currentOrganized.translations.evaluator_president.name.hy }})</div>
      <div><span  class="text-bold">Որոշում (թիվ 2)՝</span> Գնահատող հանձնաժողովը որոշեց հաստատել « {{ currentOrganized.translations.code.hy }} » ծածկագրով գնման ընթացակարգի հայտարարության տեքստը:</div>
      <div class="font-weight-bold">Ընդունվել է որոշում` կողմ` {{ currentOrganized.evaluator_member.length + 1 }}, դեմ`0</div>
      <div class="text-center font-weight-bold mb-0" style="text-align: center; margin-top: 20px;">3. Գնման ընթացակարգի հրավերի տեքստը հաստատելու մասին</div>
      <div class="small text-center" style="text-align: center;">({{ currentOrganized.translations.evaluator_president.name.hy }})</div>
      <div><span  class="font-weight-bold">Որոշում (թիվ 3)՝</span> Գնահատող հանձնաժողովը որոշեց հաստատել « {{ currentOrganized.translations.code.hy }} » ծածկագրով գնման ընթացակարգի հայտարարության տեքստը</div>
      <div class="font-weight-bold">Ընդունվել է որոշում` կողմ` {{ currentOrganized.evaluator_member.length + 1 }}, դեմ`0</div>
      <div class="text-center font-weight-bold mb-0" style="text-align: center; margin-top: 20px;">4. Գնահատող հանձնաժողովի հաջորդ նիստի անցկացման օրը, ժամը և վայրը հաստատելու մասին</div>
      <div class="small text-center" style="text-align: center;">({{ currentOrganized.translations.evaluator_president.name.hy }})</div>
      <div style="text-align: justify;"><span >Որոշում (թիվ 4)՝</span> Հանձնաժողովը որոշեց՝ հայտերի բացման և գնահատման նպատակով հանձնաժողովի նիստ հրավիրել
        <label for="day">
          «<the-mask type="text"
                    mask="##"
                    ref="day"
                    id="day"
                    v-model="$v.day.$model"
                    :class="{'border-danger': $v.day.$dirty && !$v.day.required}"
                    style="border: none; width: 30px;"
                    class="editor-input ttext-center border-bottom border-dark" />»
        </label>
        <label for="month">
          «<the-mask type="text"
                    ref="month"
                    v-model="$v.month.$model"
                    :class="{'border-danger': $v.month.$dirty && !$v.month.required}"
                    mask="##"
                    id="month"
                    style="border: none; width: 30px;"
                    class="editor-input ttext-center border-bottom border-dark" />»
        </label>
        <label for="year">
          <the-mask type="text"
                    id="year"
                    ref="year"
                    v-model="$v.year.$model"
                    :class="{'border-danger': $v.year.$dirty && !$v.year.required}"
                    mask="####"
                    style="border: none; width: 50px;"
                    class="editor-input border-bottom border-dark" />թ. 
        </label>
        &nbsp; 
        <label for="time">
          Ժ.
          <the-mask type="text"
                    ref="time"
                    v-model="$v.time.$model"
                    :class="{'border-danger': $v.time.$dirty && !$v.time.required}"
                    :mask="['T#:K#']"
                    :masked="true"
                    id="time"
                    :tokens="{
                      '#': {pattern: /\d/},
                      'T': {pattern: /[0-2]/},
                      'N': {pattern: /[0-4]/},
                      'K': {pattern: /[0-5]/},
                    }"
                    style="border: none; width: 50px;"
                    class="editor-input text-center border-bottom border-dark" />
        </label>

        {{ me.organisation[0].translations.city.hy}} {{ me.organisation[0].translations.address.hy }}</div>
      <p   class="font-weight-bold">Ընդունվել է որոշում` կողմ` {{ currentOrganized.evaluator_member.length + 1 }}, դեմ`0</p>

      <p  style="page-break-before: always;">Նիստին ներկա հանձնաժողովի անդամների անուններ ազգանունները և ստորագրությունները</p>
      <br>
      <pagebreak/>
      <table style=" 
                                width: 100%;
                                table-layout: fixed;
                                border-collapse: collapse;
                                page-break-inside: avoid;
                                border: 1px solid black;
                                text-align: center;" cellspacing="8" cellpadding="8">
        <tbody>
        <tr>
          <td style="border: 1px solid black;
                     border-collapse: collapse;">Հանձնաժողովի նախագահ՝</td>
          <td style="border: 1px solid black;
                     border-collapse: collapse;">
            {{ currentOrganized.translations.evaluator_president.name.hy }}
          </td>
          <td style="border: 1px solid black;
                     border-collapse: collapse;">
            <editor-input type="text" class="border-bottom border-dark editor-input" style="outline: none; border: 0; border-bottom: 1px solid black;" />
          </td>
        </tr>
        <tr v-for="(member, index) in currentOrganized.evaluator_member" :key="member.hy">
          <td style="border: 1px solid black;
                     border-collapse: collapse;">{{ index == 0 ? 'Անդամներ՝' : ''}}</td>
          <td style="border: 1px solid black;
                     border-collapse: collapse;">
            {{ member.name.hy }}
          </td>
          <td style="border: 1px solid black;
                     border-collapse: collapse;">
            <editor-input type="text" class="border-bottom border-dark editor-input" style="outline: none; border: 0; border-bottom: 1px solid black;" />
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid black;
                     border-collapse: collapse;">Քարտուղար՝</td>
          <td style="border: 1px solid black;
                     border-collapse: collapse;">
            {{ currentOrganized.translations.evaluator_secretary_name.hy }}
          </td>
          <td style="border: 1px solid black;
                     border-collapse: collapse;">
            <editor-input type="text" class="border-bottom border-dark editor-input" style="outline: none; border: 0; border-bottom: 1px solid black;" />
          </td>
        </tr>
        </tbody>
      </table>

    </div>
</template>

<script>
  import EditorInput from '@/components/helpers/EditorInput';
  import { required } from "vuelidate/lib/validators";
  import $ from 'jquery'

  export default {
    name: 'protocol_number_one',
    components: { EditorInput },
    props: ['handleLoaded'],
    data() {
      return {
        day1: null,
        month1: null,
        year1: null,
        time1: null,
        day: null,
        month: null,
        year: null,
        time: null,
        newProps: false,
      }
    },
    mounted(){
      this.handleLoaded();
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
      currentDate() {
        const today = new Date()
        return `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`
      },
      me() {
        return this.$store.getters['user/me']
      },
    },
    methods: {
      async save() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // 1. Loop the keys
          for (const key in Object.keys(this.$v)) {
            // 2. Extract the input
            const input = Object.keys(this.$v)[key];
            // 3. Remove special properties
            if (input.includes("$")) return false;
            // 4. Check for errors
            if (this.$v[input].$error) {
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
          $('.editor-input').each(function() {
            const txt = $(this).val()
            $(this).after(txt)
            $(this).remove()
          });
          // Submit the form here
          this.newProps = true
          this.sendToPDFGeneration(this, $('#commandment-file').html(), 'Գնահատող Հանձնաժողովի հրաման')
          this.$modal.hide('editor-modal')
        }
      },
    },
    created(){
      this.newProps = false
    },
    validations: {
      day1: {required},
      month1: {required},
      year1: {required},
      time1: {required},
      day: {required},
      month: {required},
      year: {required},
      time: {required},
    }
  }
</script>

<style scoped>
  *{
    font-family: GHEA grapalat  !important;
  }
  input{
    text-align: center;
  }
</style>
