<template>
  <modal 
    class="invitation-notification-modal"
    name="invitation-notification-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="80%"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
          <p>Հրավեր (ծանուցում)</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('invitation-notification-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <section v-if="organize" ref="content" class="px-2">
        <div style="text-align: center; font-weight: 700">Հրավեր <br/>
            {{ organize.code }}
            ծածկագրով մեկ անձից գնման ընթացակարգի
        </div>
        <div style="text-align: right; margin-top: 50px;">
            <span>«{{ me.organisation[0].translations.name.hy }}» {{ me.organisation[0].translations.company_type.hy }}-ին</span>
        </div>
        <div style="margin-top: 50px;">
            <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>
            Սույնով տեղեկացնում եմ, որ  պատվիրատուն՝ {{organize.client.name}}-ը, որը գտնվում է {{organize.client.address}}
            հասցեում կազմակերպում է մեկ անձից գնման ընթացակարգ, որն իրականացվում է մեկ փուլով։<br/>
            <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման առարկայի տեխնիկական բնութագրերը, ինչպես նաև մասնագիրը,
            տեխնիկական տվյալները և այլ ոչ գնային պայմանների ամբողջական և 
            համարժեք նկարագրությունը կազմում են կնքվելիք պայմանագրի անբաժանելի մասը, որի նախագիծը կցվում է։<br/>
            <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Գնման առարկայի վերաբերյալ Ձեր կազմակերպության հայտն անհրաժեշտ է ներկայացնել պատվիրատուի հասցեով
            կամ էլ եղանակով, բնօրինակից արտատպված /սկանավորված/ ձևով ուղարկելով
            {{organize.client.email}}  
            էլ փոստի հասցեին: Հայտը ներկայացնելիս անհրաժեշտ է այն հասցեագրել գնումները համակարգող
            {{organize.client.user_name}} ին: <br/>
            <span>{{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}}</span>Ընթացակարգի հայտը սույն հրավերի հիման վրա մասնակցի կողմից ներկայացվող առաջարկն է։ 
            Մասնակցի կողմից ներկայացվող հայտը ներառում է գնային առաջարկ, 
            որը Պատվիրատուին է ներկայացվում Մասնակցի կողմից հաստատված գրությամբ:
            Առաջարկվող գինը ծառայությունների արժեքից բացի ներառում է փոխադրման, ապահովագրման, տուրքերի, հարկերի, 
            այլ վճարումների գծով ծախսերը և չի կարող պակաս լինել դրանց ինքնարժեքից, որի հաշվարկը պետք է ներկայացվի հայտով։ <br/>
            Մասնակիցը գնային առաջարկը ներկայացնում է արժեք (ինքնարժեքի և կանխատեսվող շահույթի հանրագումարը) 
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
          {{organize.client.user_name}}
        </div>
      </section>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('invitation-notification-modal')" class="btn btn-light mr-3">
        <span>Փակել</span>
      </button>
      <button :disabled="isLoading" @click="download" type="button" class="btn btn-primary" aria-expanded="false" >
        <span v-if="isLoading" class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="mr-2">Բեռնել</span>
        <font-awesome-icon :icon="['fas', 'download']"/>
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'InvitationNotificationModal',
  components: { },
  data () {
    return {
      organize: false,
      isLoading: false,
    }
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    download() {
      this.sendToPDFGeneration(this, this.$refs.content.innerHTML, 'Հրավեր (ծանուցում)', () => {this.isLoading = false})
    },
    consoleLog(data){
      console.log(data)
    },
    beforeOpen({params}) {
      this.organize = params.organize;
      console.log(this.organize)
    },
    handleLotInputsFocus(event, details) {
      // eslint-disable-next-line eqeqeq
      if(event.target.value == 0) {
        event.target.select()
      }
      this.focusedLotFields = details
    },
  }
}
</script>

<style scoped>
    @media (max-width: 768px) {
      .invitation-notification-modal /deep/ .vm--modal {
        height: 90% !important;
        margin: auto 20px;
        width: auto !important;
        top: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        left: 0 !important;
        position: absolute;
      }
      .invitation-notification-modal /deep/ .vm--modal #modal-body{
        padding: 16px 8px 8px;
      }
    } 
    .searchItem:hover {
      background-color: #1e7bb7;
      color: #fff;
    }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
<style>
.table-1 {
    page-break-inside: avoid;
}
.table-1 {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    page-break-inside: avoid;
}
.table-1{
    border: 1px solid  black;
    border-collapse: collapse;
    margin: 20px auto;
    padding-bottom: 50px;
    text-align: center;
}
.table-1 tr th{
    border: 1px solid  black;
    border-collapse: collapse;
    font-size: 12px;
    padding: 8px 18px;
}
.table-1 tr td{
    border: 1px solid  black;
    border-collapse: collapse;
    text-align: center;
    padding: 7px 7px;
    font-size: 14px;
}
.big-table td{
    font-size: 8px !important;
    padding: 5px !important;
}
.big-table th{
    font-size: 10px !important;
    padding: 5px !important;
}
</style>

