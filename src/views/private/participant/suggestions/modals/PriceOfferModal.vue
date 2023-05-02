<template>
  <modal
    class="products-details-modal"
    name="products-details-modal"
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
      <div class="w-100 d-flex">
        <p>Գնային առաջարկ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('price-offer-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body">
      <div v-if="!loaded">
        <span
            class="m-auto spinner-border spinner-border-lg position-absolute" 
            style="right: 0; top: 0; bottom: 0; left: 0;"
            role="status"
            aria-hidden="true"
        />
      </div>
      <div v-else class="col-md-12" id="price-offer-doc">
          <h6 style="margin-top: 3rem;font-weight: 700;text-align: center;">ԳՆԱՅԻՆ ԱՌԱՋԱՐԿ</h6>
          <p style="text-align: justify">Ուսումնասիրելով «{{ organize.code }}» ծածկագրով մեկ անձից գնման ընթացակարգի
                                  հրավերը, այդ թվում կնքվելիք պայմանագրի նախագիծը, {{ winner.name }}-ն առաջարկում է
                                  պայմանագիրը կատարել ներքոհիշյալ ընդհանուր գներով.
          </p>
          <br>
          <table cellspacing="3" cellpadding="3" style="border: 1px solid  black;
                                              border-collapse: collapse;
                                              page-break-inside: avoid;
                                              text-align: center;">
              <tr>
                  <th style="border: 1px solid  black;
                              border-collapse: collapse;">Չափաբաժինների համարները</th>
                  <th style="border: 1px solid  black;
                              border-collapse: collapse;" v-if="organize.cpv_type === 1">Ապրանքների անվանումները</th>
                  <th style="border: 1px solid  black;
                              border-collapse: collapse;" v-else-if="organize.cpv_type === 2 ">Ծառայության անվանումը</th>
                  <th style="border: 1px solid  black;
                              border-collapse: collapse;" v-else-if="organize.cpv_type === 3 ">Աշխատանքի անվանումը</th>
                  <th style="border: 1px solid  black;border-collapse: collapse;">Արժեքը (ինքնարժեքի և
                      կանխատեսվող
                      շահույթի
                      հանրագումարը)
                      /տառերով և թվերով/ 
                  </th>
                  <th style="border: 1px solid  black;
                              border-collapse: collapse;">ԱԱՀ** /տառերով և թվերով/</th>
                  <th style="border: 1px solid  black;border-collapse: collapse;">Ընդհանուր գինը /տառերով և թվերով/</th>
              </tr>
              <tr v-for="(row) in rows" :key="row.id">
                  <td style="border: 1px solid  black;
                              border-collapse: collapse;
                              text-align: center;">{{ row.view_id }}</td>
                  <td style="border: 1px solid  black;
                              border-collapse: collapse;
                              text-align: center;">{{ row.cpv_name }}</td>
                  <td style="border: 1px solid  black;
                              border-collapse: collapse; text-align: center;" v-if="row.value !== 0 && row.value !== undefined && row.value !== null">{{ row.value }} / {{ row.value_word }} /</td>
                  <td style="border: 1px solid  black;
                              border-collapse: collapse;
                              text-align: center;" v-else></td>
                  <td style="border: 1px solid  black;border-collapse: collapse;
                              text-align: center;
                              " v-if="row.vat !== 0 && row.vat !== undefined && row.vat !== null">{{ row.vat }} / {{ row.vat_word }} / </td>
                  <td style="border: 1px solid  black;
                              border-collapse: collapse;
                              text-align: center;" v-else></td>
                  <td style="border: 1px solid  black;
                              border-collapse: collapse; text-align: center;" v-if="row.cost !== 0 && row.cost !== undefined && row.cost !== null">{{ row.cost }}  / {{ row.cost_word }} /</td>
                  <td style="border: 1px solid  black;
                              border-collapse: collapse; text-align: center;" v-else></td>
              </tr>
          </table>
          <br>
          <table style="margin: 0 !important; border: 0 !important;" cellspacing="0" cellpadding="0">
              <tr>
                  <td style="border: 0 !important; text-align: left !important; padding: 0 !important;" class="ft-11">{{ this.winner.name }} Տնօրեն՝ {{ this.winner.director }}</td>
                  <td style="border: 0 !important; text-align: center; padding: 0 !important;" class="ml-4">___________________________________</td>
              </tr>
              <tr style="position: relative;">
                  <td style="border: 0 !important;"></td>
                  <td style="border: 0 !important; text-align: center; font-size: 10px; width: 50%; position: absolute; margin: 0 auto; padding: 0 !important;">ստորագրությունը <br> Կ. Տ.</td>
              </tr>
          </table>
          <br>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('price-offer-modal')" class="btn btn-light mr-3">
        <span>Փակել</span>
      </button>
      <button  :disabled="isLoading" @click="download" type="button" class="btn btn-primary">
        <span v-if="isLoading" class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="mr-2">Բեռնել</span>
        <font-awesome-icon :icon="['fas', 'download']"/>
      </button>
    </div>
  </modal>
</template>

<script>

export default {
  name: 'PriceOfferModal',
  components: {},
  data () {
    return {
      loaded: false,
      organize: {},
      rows: [],
      content: '',
      winner: {},
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
      this.sendToPDFGeneration(this, document.getElementById('price-offer-doc').innerHTML, 'Պայմանագիր', () => {this.isLoading = false})
    },
    consoleLog(data){
      console.log(data)
    },
    async numberToWord(number) {
			const { data } = await this.$client.post('numberToWord', {number})
			return data;
		},
    beforeOpen({params}) {
      this.organize = params.organize
      this.winner = this.organize.winners.find(winner => winner.user_id === this.me.id)
      this.winner.lots.forEach(async(lot, index) => {
        const row = this.organize.organize_rows.find(item => item.id === lot.id)
        const offer = row.offers.find(item => item.user_info.id === this.me.id)
        console.log(offer)
        var rowObj ={
            view_id: lot.view_id,
            cpv_name: lot.is_from_outside ? lot.procurement_plan.cpv_outside.name : lot.procurement_plan.cpv.name,
            value: offer.value,
            value_word: await this.numberToWord(offer.value),
            vat: offer.vat,
            vat_word: await this.numberToWord(offer.vat),
            cost: offer.cost,
            cost_word: await this.numberToWord(offer.cost),
        }
        this.rows.push(rowObj)
        this.rows.sort((a, b) => a.view_id - b.view_id)
        if(index === this.winner.lots.length-1){
          this.loaded = true;
        }
      })
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
  .searchItem:hover {
    background-color: #006BE6;
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

