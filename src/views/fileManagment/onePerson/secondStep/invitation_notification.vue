<template>
  <div v-if="!isLoading" class="row m-0 p-0">
    <div v-if="+currentOrganized.send_to_all_participants !== 1" class="col-4">
      <div class="list-group" v-if="participants.length">
        <button v-for="participantGroup in participants"
                type="button"
            @click="currentParticipantGroup = participantGroup"
            :key="participantGroup.group_id"
            :class="{'active': participantGroup.id === currentParticipantGroup.id}"
            class="list-group-item list-group-item-action" >{{ participantGroup.participant[0].name.hy }}</button>
      </div>
    </div>
    <div ref="document" id="document" :class="+currentOrganized.send_to_all_participants !== 1 ? 'col-8' : 'col-12'">
        <div>
            <div style="text-align: center; font-weight: 700">Հրավեր <br/>
                {{ currentOrganized.code }}
                ծածկագրով մեկ անձից գնման ընթացակարգի
            </div>
            <div style="text-align: right; margin-top: 50px;">
                <span v-if="currentOrganized.send_to_all_participants !== 1">{{ !_.isEmpty(currentParticipantGroup) && currentParticipantGroup.participant[0].name.hy }}-ին</span>
                <span v-else>Հարգելի մասնակից</span>
            </div>
            <div style="margin-top: 50px;">
                <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Սույնով տեղեկացնում եմ, որ  պատվիրատուն՝ «{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}
                -ը, որը գտնվում է {{ me.organisation[0].translations.region.hy }}  {{ me.organisation[0].translations.city.hy }} {{ me.organisation[0].translations.address.hy }}
                հասցեում կազմակերպում է մեկ անձից գնման ընթացակարգ, որն իրականացվում է մեկ փուլով։<br/>
                <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման առարկայի տեխնիկական բնութագրերը, ինչպես նաև մասնագիրը,
                տեխնիկական տվյալները և այլ ոչ գնային պայմանների ամբողջական և 
                համարժեք նկարագրությունը կազմում են կնքվելիք պայմանագրի անբաժանելի մասը, որի նախագիծը կցվում է։<br/>
                <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման առարկայի վերաբերյալ Ձեր կազմակերպության հայտն անհրաժեշտ է ներկայացնել պատվիրատուի հասցեով
                կամ էլ եղանակով, բնօրինակից արտատպված /սկանավորված/ ձևով ուղարկելով
                {{me.email}}
                էլ փոստի հասցեին: Հայտը ներկայացնելիս անհրաժեշտ է այն հասցեագրել գնումները համակարգող
                {{me.name}} ին: <br/>
                <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Ընթացակարգի հայտը սույն հրավերի հիման վրա մասնակցի կողմից ներկայացվող առաջարկն է։ 
                Մասնակցի կողմից ներկայացվող հայտը ներառում է գնային առաջարկ, 
                որը Պատվիրատուին է ներկայացվում Մասնակցի կողմից հաստատված գրությամբ:
                Առաջարկվող գինը ծառայությունների արժեքից բացի ներառում է փոխադրման, ապահովագրման, տուրքերի, հարկերի, 
                այլ վճարումների գծով ծախսերը և չի կարող պակաս լինել դրանց ինքնարժեքից, որի հաշվարկը պետք է ներկայացվի հայտով։ <br/>
                <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Մասնակիցը գնային առաջարկը ներկայացնում է արժեք (ինքնարժեքի և կանխատեսվող շահույթի հանրագումարը) 
                և ավելացված արժեքի հարկ ընդհանրական բաղադրիչներից բաղկացած հաշվարկի ձևով: Արժեքի բաղադրիչների հաշվարկ`
                բացվածք կամ այլ մանրամասներ չեն պահանջվում և ներկայացվում: Եթե մասնակիցը տվյալ գործարքի գծով 
                Հայաստանի Հանրապետության պետական բյուջե պետք է վճարի ավելացված արժեքի հարկ, ապա գնային առաջարկում 
                առանձնացված տողով նախատեսվում է այդ հարկատեսակի գծով վճարվելիք գումարի չափը: Ընդ որում,
                մասնակիցների գնային առաջարկների գնահատումը և համեմատումն իրականացվում են առանց 
                սույն ենթակետում նշված հարկի գումարի հաշվարկման:<br/>
                <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Կից ուղարկում ենք ներկայացվող փաստաթղթերի օրինակելի ձևերը:
            </div>
            <div style="margin-top: 50px; font-weight: 700;"><span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Հարգանքով</div>
            <div style="text-align: center; margin-top:15px;">Գնումների համակարգող`
              {{me.name}}
            </div>
        </div>
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
        return this.$store.getters['organizeOnePerson/currentOrganized']
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
          });
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