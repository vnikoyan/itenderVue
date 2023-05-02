<template>
  <div v-if="!isLoading" class="row p-0 m-0">
    <div class="col-4">
      <div class="list-group" v-if="participants.length">
        <button v-for="participantGroup in participants"
                type="button"
            @click="currentParticipantGroup = participantGroup"
            :key="participantGroup.group_id"
            :class="{'active': participantGroup.id === currentParticipantGroup.id}"
            class="list-group-item list-group-item-action" >{{ participantGroup.participant[0].name.hy }}</button>
      </div>
    </div>
    <div ref="document" id="document" class="col-8" >
      <table style="width: 100%;">
        <tr>
          <td style="width: 50%; text-align: left;"><span class="ft-11">{{ currentOrganized.opening_date }}թ.</span></td>
          <td style="width: 50%; text-align: right;"><span class="ft-11">{{ !_.isEmpty(currentParticipantGroup) && currentParticipantGroup.participant[0].name.hy }}</span></td>
        </tr>
      </table>
      <br>
      <div style=" text-align: justify;" >«{{me.organisation[0].translations.name.hy}}» 
        <span  style=" text-align: justify;" v-if="me.organisation[0].translations.company_type.hy === 'ՍՊԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Ձ' || me.organisation[0].translations.company_type.hy === 'ԲԲԸ' || me.organisation[0].translations.company_type.hy === 'Ա/Կ' || me.organisation[0].translations.company_type.hy === 'ՓԲԸ' || me.organisation[0].translations.company_type.hy === 'Հ/Կ' || me.organisation[0].translations.company_type.hy === 'ՀՈԱԿ' || me.organisation[0].translations.company_type.hy === 'ՊՈԱԿ'">{{ me.organisation[0].translations.company_type.hy }}-ի</span>
        <span  style=" text-align: justify;" v-else>{{ me.organisation[0].translations.company_type.hy }}ի</span>
        կարիքների համար {{ currentOrganized.translations.name.hy }} ձեռք բերելու նպատակով կազմակերպված {{currentOrganized.translations.code.hy}} ծածկագրով գնանշման հարցման ընթացակարգի հայտերի բացման նիստը կասեցվել է համաձայն ՀՀ կառավարություն 04.05.2017թ. թիվ 526-ն որոշման 40-րդ կետի 5-րդ մասի և «Գնումների մասին» ՀՀ օրենքի 38-րդ հոդվածի 1-ին մասի 1-ին կետի.</div>
      <div style=" text-align: justify;" >Գնման գործընթացը կազմակերպվել է «Գնումների մասին» ՀՀ օրենքի 15-րդ հոդվածի 6-րդ մասի համաձայն:</div>
      <div style=" text-align: justify;" >Ուստի խնդրում եմ
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
        -ին, ժամը
        <the-mask type="text"
                  ref="time"
                  inputName="time"
                  v-model="$v.inputs.time.$model"
                  :class="{'border-danger': $v.inputs.time.$dirty && !$v.inputs.time.required}"
                  :mask="['T#:K#']"
                  :masked="true"
                  :tokens="{
                    '#': {pattern: /\d/},
                    'T': {pattern: /[0-2]/},
                    'N': {pattern: /[0-4]/},
                    'K': {pattern: /[0-5]/},
                  }"
                  style="border: none; width: 70px;"
                  class="editor-input border-bottom border-dark" />
        -ին, գների նվազեցման շուրջ միաժամանակյա բանակցություններ վարելու նպատակով ապահովել կազմակերպության լիազոր ներկայացուցչի ներկայությունը բանակցություններին՝ համապատասխան լիազորագրով կամ // էլեկտրոնային հասցեին, մինչև բանակցությունների համար նախատեսված ժամը, ուղարկեք գնահատող հանձնաժողովի քարտուղարին հասցեագրված նոր նվազեցված գնային առաջարկ /հաստատված և բնօրինակից սկանավորված/:</div>
      <div style="text-align: justify;" >Նիստը տեղի է ունենալու Երևան {{ me.organisation[0].translations.address.hy }} հասցեում։</div>
      <div style="text-align: justify;" >Բանակցությունների տևողությունը սահմանված է 15 րոպե:</div>
      <br>
      <div>Հարգանքով `</div>
      <div>Գնահատող հանձնաժողովի քարտուղար ` {{ currentOrganized.translations.evaluator_secretary_name.hy }}</div>
    </div>
  </div>
  <span v-else style="position: absolute; right: 0; top: 0; left: 0; bottom: 0" class="m-auto spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
</template>

<script>
  import { required } from "vuelidate/lib/validators";
  import $ from 'jquery';

  export default {
    name: 'notice_of_negotiations',
    props: ['handleLoaded'],
    data() {
      return {
        isLoading: false,
        participants: [],
        inputs: {
          day: null,
          month: null,
          year: null,
          time: null,
        },
        currentParticipantGroup: {},
        newProps: false,
      }
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
    watch: {
      currentOrganized: {
        immediate: true,
        async handler() {
          await this.$client.get(`participant-group/getByOrganize/${this.$route.params.id}`).then(response => {
            const participantsData = response.data;
            this.currentParticipantGroup = participantsData[0]
            this.participants = participantsData
          })
          this.handleLoaded();
        }
      },
    },
    methods: {
      save() {
        this.$v.$touch();
        const _this = this
        let hasInvalid = false;
        $('.editor-input').each(function() {
          const inputName = $(this).attr('inputname');
          const input = _this.$v.inputs[inputName];
          if (input.$error) {
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
          this.handleBeforeDownload();
          this.sendToPDFGeneration(this, $('#document').html(), 'Ծանուցում բանակցությունների վերաբերյալ', () => {this.isLoading = false});
          this.newProps = false;
        }
      },
      async handleBeforeDownload() {
        this.newProps = true
        await this.handleLoaded()
        return this.$refs.document.innerHTML
      },
    },
    validations: {
      inputs: {
        day: {required},
        month: {required},
        year: {required},
        time: {required},
      }
    }
  }
</script>
<style scoped>
  *{
    font-family: GHEA grapalat !important;
  }
</style>