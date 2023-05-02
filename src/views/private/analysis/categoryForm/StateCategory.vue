<template>
  <cpv-selector id="cpv-selector" class="h-100" @selectCpv="selectCpv" :selectedCpv="this ? this.$attrs.selectedCpv : {}" />
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
      this.selectedCpv = this.$attrs.selectedCpv
    },
    watch: {
      selectedCpv: function(updatedCpv) {
        this.$emit('update:selectedCpv', updatedCpv)
      }
    },
    methods: {
      selectCpv(cpv){
        this.selectedCpv = cpv
      },
      getComponentInitialData() {
        return {
          selectedCpv: {},
          tableView: false,
        }
      },
    },
  }
</script>
