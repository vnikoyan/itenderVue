<template>
  <modal
    class="attach-lots-modal"
    name="attach-lots-modal"
    @before-open="handleBeforeOpen"
    @before-close="handleBeforeClose"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="80%"
    style="z-index: 2011;"
  >
    <div id="modal-header">
      <div class="w-100 d-flex">
        <p>Կցել չափաբաժիններ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('attach-lots-modal')" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div id="modal-body">
      <div class="row h-100">
        <div class="col-6">
          <div v-if="availableLots.length" class="checkbox checkbox-primary pl-1 mb-3">
            <input id="select-all" @change="handleSelectAll" :checked="allSelected" type="checkbox">
            <label for="select-all" class="text-primary">Ընտրել բոլորը</label>
          </div>
          <div class="mb-1 p-3">
              <table class="text-center">
                <thead>
                  <tr>
                    <th class="px-2"></th>
                    <th class="px-2">Չ/Բ</th>
                    <th class="px-2">Կոդ</th>
                    <th class="px-2">Անվանում</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in availableLots" :key="index">
                    <td>
                      <input style="position: initial;" :id="'lot-' + index" :value="row" v-model="selectedLots" class="form-check-input" type="checkbox">
                    </td>
                    <td class="px-2"><label :for="'lot-' + index" class="">{{ row.view_id }}</label></td>
                    <td class="px-2"><label :for="'lot-' + index" class="">{{ row.cpv_code }}{{ row.cpv_drop && '/' }}{{ row.cpv_drop }}</label></td>
                    <td class="px-2"><label :for="'lot-' + index" class="">{{ row.cpv_name }}</label></td>
                  </tr>
                </tbody>
              </table>
          </div>
          <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
            <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
            <div slot="no-results"></div>
            <div slot="no-more"></div>
          </infinite-loading>
        </div>
        <div class="col-6 border-left" style="overflow-y: auto;">
          <div class="row px-3">
            <div class="border border-primary position-relative rounded m-1 px-3 py-1 text-primary col-auto"
                 v-for="(lot, index) in selectedLots" :key="index">
              <span class="mr-3">{{ lot.view_id }} - {{ lot.cpv_code }}{{ lot.cpv_drop && '/' }}{{ lot.cpv_dro}} - {{ lot.cpv_name }}</span>
              <font-awesome-icon @click="remove(lot)"
                                 icon="times"
                                 class="position-absolute"
                                 style="cursor: pointer; right: 10px; top: calc(50% - 8px);"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="$modal.hide('attach-lots-modal')" class="btn btn-light mr-3">
        <span>Չեղարկել</span>
      </button>
      <button @click="save" type="button" class="btn btn-primary">
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'AttachLotsModal',
    components: { InfiniteLoading },
    data() {
      return {
        allSelected: false,
        organizedLots: [],
        alreadyAttached: [],
        selectedLots: [],
        pagination: {}
      }
    },
    computed: {
      availableLots() {
        // eslint-disable-next-line no-undef
        return _.differenceBy(this.organizedLots, this.alreadyAttached, 'id')
      }
    },
    watch: {
      selectedLots(lots) {
        console.log(lots)
        this.allSelected = lots.length && lots.length === this.availableLots.length
      }
    },
    methods: {
      save() {
        if(this.selectedLots.length) {
          // eslint-disable-next-line no-undef
          this.$emit('lots-select', this.selectedLots)
          this.$modal.hide('attach-lots-modal')
        }
      },
      infiniteHandler($state) {
        this.$store.dispatch('organize/getRows', {
          organizeId: this.$route.params.id,
          page: this.pagination.page ? this.pagination.page + 1 :  1
        }).then(({ data }) => {
          if(data.data.length) {
            this.pagination = data.pagination
            this.organizedLots.push(...data.data)
            if(this.allSelected) {
              this.selectedLots.push(...data.data)
            }
            $state.complete()
          } else{
            $state.complete()
          }
        })
      },
      handleSelectAll() {
        const isAllSelected = !this.allSelected // next value
        // eslint-disable-next-line no-undef
        this.selectedLots = isAllSelected ? _.cloneDeep(this.availableLots) : []
        this.allSelected = isAllSelected
      },
      remove(removableLot) {
        const index = this.selectedLots.findIndex(lot => lot.id === removableLot.id)
        if(index > -1) {
          this.selectedLots.splice(index, 1)
        }
      },
      handleBeforeOpen({ params }) {
        // eslint-disable-next-line no-undef
        this.alreadyAttached = params.attachedLots
      },
      handleBeforeClose() {
        Object.assign(this.$data, {
          allSelected: false,
          organizedLots: [],
          selectedLots: [],
          pagination: {}
        })
      }
    }
  }
</script>

<style scoped>

</style>
