<template>
  <modal name="cancel-modal"
         @before-open="handleBeforeOpen"
         style="z-index: 1001;">
    <div id="modal-header" class="w-100 px-4 py-2 position-relative bg-danger-gradient">
      <div class="w-100 d-flex">
        <p>
          Ընթացակարգը չեղարկելու պատճառը
        </p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('cancel-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body">
      <!-- <p class="h4">{{ alertMsg }}</p> -->
        <div class="row justify-content-center align-items-center">
          <div class="col-12 mt-5 px-5">
            <div class="form-row">
              <div class="form-group">
                <div class="form-check">
                  <input v-model="cancelReason" value="not_requirement_purchase" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    դադարել է գոյություն ունենալ գնման պահանջը
                  </label>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <div class="form-check">
                  <input v-model="cancelReason" value="need_change" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                  <label class="form-check-label" for="flexRadioDefault2">
                    անհրաժեշտություն է առաջացել փոփոխել կազմակերպված մրցույթի պայմանները
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('cancel-modal')" class="btn btn-light mr-3">
        {{ declineBtnText }}
      </button>
      <button @click="confirm" type="button" class="btn btn-danger">
        {{ confirmBtnText }}
      </button>
    </div>
  </modal>
</template>

<script>
  export default {
    name: 'CancelModal',
    props: {
      confirmBtnText: {
        default: 'Հաստատել',
        type:  String
      },
      declineBtnText: {
        default: 'Փակել',
        type: String
      }
    },
    data() {
      return {
        cancelReason: 'not_requirement_purchase',
        alertMsg: '',
        callback: null,
      }
    },
    methods: {
      handleBeforeOpen({ params }) {
        this.organizeId = params.organizeId
        this.callback = params.callback
      },
      confirm() {
        this.$client.post(`organize/itender/cancel/${this.organizeId}`, {cancelReason: this.cancelReason}).then(({data}) => {
          if(data.status){
            this.callback()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
