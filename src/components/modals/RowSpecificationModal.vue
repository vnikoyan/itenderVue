<template>
  <modal 
    class="row-specification-modal modal-without-footer"
    name="row-specification-modal"
    @closed="$emit('updateComparisonData')"
    @before-close="beforeClose"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
    style="z-index: 4066;"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
        <p>Տեխնիկական բնութագիր</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('row-specification-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <span>
        {{row.specifications}}
      </span>
    </div>
  </modal>
</template>
<script>

export default {
  name: 'RowSpecificationModal',
  data () {
    return {
      row: {},
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
    beforeClose(){
      this.row = {};
    },
    beforeOpen({params}){
      this.row = params
      console.log(this.row)
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

