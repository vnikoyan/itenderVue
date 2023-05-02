<template>
  <modal 
    class="change-status-modal"
    name="change-status-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="30%"
    height="40%"
  >
    <div id="modal-header" style="background-color:#006BE6">
      <div class="w-75 d-flex text-white">
        <p style="font-weight: 400;">Փոխել կարգավիճակը</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('change-status-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ffffff"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="form-group">
        <select v-model="status" class="form-control" id="exampleFormControlSelect1">
          <option value="sended">Պատվիրված</option>
          <option value="failed">Առաջացել է խնդիր</option>
          <option value="canceled">Չկատարված</option>
          <option value="completed">Մատակարարված</option>
        </select>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="save" type="button" class="btn btn-primary">
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'SuggestionModal',
  data () {
    return {
      order: {},
      status: '',
    }
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    consoleLog(data){
      console.log(data)
    },
    async save(){
      await this.$client.put(`contract-orders/${this.order.id}`, {status: this.status}).then(({data}) => {
        if(data) {
          this.resetComponent()
          this.$modal.hide('change-status-modal')
        }
      }).catch(e => {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Ինչ որ բան այն չէ',
          text: 'Կրկին փորձեք!'
        })
      })
    },
    beforeOpen({params}) {
      this.resetComponent = params.resetComponent
      this.order = params.order
      this.status = this.order.status
    },
  }
}
</script>
<style scoped>
</style>

