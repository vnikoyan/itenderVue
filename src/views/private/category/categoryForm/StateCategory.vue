<template>
  <div name="add-cpv-modal"
         style="z-index: 1001;" class="h-100">
    <div id="modal-body" style="height: 100%">
      <cpv-selector id="cpv-selector" :selectedCpvs="this ? this.$attrs.selectedCpvs : []" />
    </div>
  </div>
</template>

<script>
  import CpvSelector from './cpv/CpvSelector'
  import purchaseTypes from '@/mixins/purchaseTypes'

  export default {
    name: 'StateCategory',
    mixins: [purchaseTypes],
    components: { CpvSelector },
    computed: {
      units() {
        return this.$store.getters['settings/units']
      },
      financialClassifiers() {
        return this.$store.getters['settings/financialClassifiers']
      },
      classifiers() {
        return this.$store.getters['settings/classifiers']
      },
      childUsers() {
        return this.$store.getters['user/userChildren']
      },
    },
    data() {
      return this.getComponentInitialData()
    },
    mounted(){
      this.selectedCpvs = this.$attrs.selectedCpvs
    },
    watch: {
      selectedCpvs: function(updatedCpvs) {
        this.$emit('update:selectedCpvs', updatedCpvs)
      }
    },
    methods: {
      getComponentInitialData() {
        return {
          selectedCpvs: [],
          tableView: false,
        }
      },
      consoleLog(msg) {
        console.log(typeof msg, 'sdlkjflsk')
      },
    },
  }
</script>
