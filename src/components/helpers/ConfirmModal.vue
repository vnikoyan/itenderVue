<template>
  <modal 
    name="confirm-modal"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="40%"
    height="65%"
    style="z-index: 2001;"
  >
    <div id="modal-header" class="w-100 px-4 py-3 position-relative bg-primary">
      <div class="w-100 d-flex">
        <p></p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('confirm-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#FFFFFF"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <p class="h6" style="text-align: justify">
        Հարգելի գործընկեր
        <br/>
        <br/><span class="tab"/>iTender համակարգի տվյալ բաժինը ստեղծված է, որպեսզի գնորդ հանդիսացող այն կազմակերպությունները, որոնք իրենց գնումներն իրականացնում են տենդերների /մրցույթների/ միջոցով, կարողանան հրապարակեն իրենց տենդերները  iTender համակարգում։ 
        <br/><span class="tab"/>Այս գործիքը հնարավորություն է տալիս կազմակերպված տենդերների շրջանակներում ապահովելու ավելի շատ մասնակիցների, որպեսզի տենդերները լինեն ավելի մրցակցային և արդյունավետ։
        <br/><span class="tab"/>Հրապարակվող տենդերների հայտարարությունները պետք է հիմնված լինեն տենդերներները կանոնակարգող համապատասխան իրավական ակտի վրա, որտեղ հստակ սահմանված են կողմերի իրավունքներն ու պարտականությունները, հաղթողներին որոշելու կարգն ու ժամկետները և չկրեն ուղղակի հայտարարության բնույթ։ 
        <br/><span class="tab"/>Արգելվում է նաև կցել վիրուսակիր ֆայլեր, հրապարակել գովազդային, մարքեթինգային, քաղաքական, լրատվական, աշխատանքային և այլ հայտարարություններ և նյութեր, որոնք չեն համարվում տենդեր։ Նշված պայմաններին չհամապատասխանող հրապարակումները համակարգի ադմինիստրացիայի կողմից ենթակա են հեռացման։
        <br/><span class="tab"/>Բացի ձեր կազմակերպության տենդերների կանոնակարգերի հիման վրա տեդներներ կազմակերպելուց, կարող եք նաև տենդերներ կազմակերպել <span @click="() => this.$router.push('/organizator/itender')" style="cursor: pointer" class="btn-link">iTender համակարգի միջոցով</span>, որտեղ գնային առաջարկների ներկայացումը, հաղթողներին որոշելը իրականացվում են iTender համակարգի միջոցով։
      </p>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('confirm-modal')" class="btn btn-light mr-3">
        <span>{{ declineBtnText }}</span>
      </button>
      <button @click="confirm" :disabled="loading" type="button" class="btn btn-primary">
        <span v-if="loading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
        <span>{{ confirmBtnText }}</span>
      </button>
    </div>
  </modal>
</template>

<script>
  export default {
    name: 'ConfirmModal',
    props: {
      confirmBtnText: {
        default: 'Հաստատել',
        type:  String
      },
      declineBtnText: {
        default: 'Չեղարկել',
        type: String
      }
    },
    data() {
      return {
        alertMsg: '',
        callback: null,
        loading: false
      }
    },
    methods: {
      handleBeforeOpen({ params }) {
        this.alertMsg = params.msg
        this.callback = params.callback
      },
      confirm() {
        this.loading = true;
        this.callback()
      }
    }
  }
</script>
<style>
    .tab {
        margin-left: 25px;
    }
</style>
<style scoped>

</style>
