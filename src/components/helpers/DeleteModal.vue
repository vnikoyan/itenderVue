<template>
  <modal 
    name="delete-modal"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="20%"
    height="35%"
    style="z-index: 2001;"
  >
    <div id="modal-header" class="bg-danger">
      <div class="w-75 d-flex">
          <p></p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('delete-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#FFFFFF"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="d-flex justify-content-center align-items-center p-0 h-100">
        <p class="h4 text-center">{{ alertMsg }}</p>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('delete-modal')" class="btn btn-light mr-3">
        <span>{{ declineBtnText }}</span>
      </button>
      <button @click="confirm" type="button" class="btn btn-danger">
        <span>{{ confirmBtnText }}</span>
      </button>
    </div>
  </modal>
</template>

<script>
  export default {
    name: 'DeleteModal',
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
      }
    },
    methods: {
      handleBeforeOpen({ params }) {
        this.alertMsg = params.msg
        this.callback = params.callback
      },
      confirm() {
        this.callback()
      }
    }
  }
</script>

<style scoped>
</style>
