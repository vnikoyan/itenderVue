<template>
  <div name="add-category-modal"
         style="z-index: 1001;">
    <div id="modal-body" class="py-2" style="height: 90%">
      <div v-show="!tableView" class="row">
        <div class="col-12">
          <label for="categories-selector">Ընտրել կատեգորիա</label>
          <categories-selector id="categories-selector" :selectedCategories.sync="this.$attrs.selectedCategories" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoriesSelector from './categories/CategoriesSelector'
  import purchaseTypes from '@/mixins/purchaseTypes'

  export default {
    name: 'Category',
    mixins: [purchaseTypes],
    components: { CategoriesSelector },
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
      this.selectedCategories = this.$attrs.selectedCategories
    },
    watch: {
      selectedCategories: function(updatedCategories) {
        this.$emit('update:selectedCategories', updatedCategories)
      }
    },
    methods: {
      getComponentInitialData() {
        return {
          selectedCategories: [],
          tableView: false,
        }
      },
      consoleLog(msg) {
        console.log(typeof msg, 'sdlkjflsk')
      },
    },
  }
</script>
