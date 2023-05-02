<template>
  <div @click="handleClickOutside" class="row">
    <div class="col-6">
      <ul class="nav nav-pills nav-justified" role="tablist">
        <li @click="loadTreeByType(6)" class="nav-item waves-effect waves-light">
          <a class="nav-link active" data-toggle="tab" href="#category-tree" role="tab" aria-selected="true">Ապրանք</a>
        </li>
        <li @click="loadTreeByType(3)" class="nav-item waves-effect waves-light">
          <a class="nav-link" data-toggle="tab" href="#category-tree-tree" role="tab" aria-selected="false">Ծառայություն</a>
        </li>
        <li @click="loadTreeByType(38)" class="nav-item waves-effect waves-light">
          <a class="nav-link" data-toggle="tab" href="#category-tree-tree" role="tab" aria-selected="false">Աշխատանք</a>
        </li>
      </ul>
      <div id="category-tree-containere" class="tab-content pt-3">
        <div class="w-100 mb-2">
          <input @input="handleSearch"
                  :value="searchQuery" 
                  class="form-control" 
                  placeholder="Փնտրել" 
                  type="text">
        </div>
        <div class="w-100" style="height: 50vh; overflow: auto">
          <vue-tree :selectedOptions="selectedOptions"
                    @select="handleSelect" 
                    @categorySelect="handleSelectCategory" 
                    :loadOptions="loadOptions"
                    :searching="searching" 
                    :loadRootOptions="true" 
                    :node="{children: options}"/>
        </div>
      </div>
    </div>

    <div class="col-6">
      <div class="row">
        <div class="border border-primary position-relative rounded m-1 px-3 py-1 text-primary col-auto" 
            v-for="category in selectedOptions" :key="category.id">
          <span class="mr-3">{{ category.name }}</span>
          <font-awesome-icon @click="removeFromOptions(category)" 
              icon="times" 
              class="position-absolute"
              style="cursor: pointer; right: 10px; top: calc(50% - 8px);"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueTree from './VueTree'
  export default {
    name: 'CategoriesSelector',
    components: { VueTree },
    computed: {
      options() {
        return this.searchMode ? this.searchResult : this.categoryTypedObj[this.currentCategoryType]
      }
    },
    data() {
      return {
        currentCategoryType: 6,
        selectedCategories: null,
        selectedOptions: [],
        categoryTypedObj: {},
        searchResult: [],
        searchMode: false,
        searchQuery: '',
        searchTimeout: null,
        searching: false,
      }
    },
    watch: {
      selectedOptions: function(updatedOptions) {
        this.$emit('update:selectedCategories', updatedOptions)
      }
    },
    mounted() {
      this.selectedOptions = this.$attrs.selectedCategories;
      console.log(this.selectedOptions)
      this.loadTreeByType(6)
    },
    methods: {
      loadOptionsRec(node){
        this.selectedOptions.push(node)
        if(node.children != null){
          node.children.forEach(nodeItem => {
            this.loadOptionsRec(nodeItem)
          });
        }else if(node.children_count){
          this.$store.dispatch('categories/getById', {id: node.id}).then(categoryItem => {
            if(node.children_count){
              this.$set(node, 'children', categoryItem.children)
              node.children.forEach(nodeItem => {
                this.loadOptionsRec(nodeItem)
              });
            }
          })
        }
      },
      delOptionsRec(node){
        const optionIndex = this.selectedOptions.findIndex(option => option.id === node.id)
        this.selectedOptions.splice(optionIndex, 1)
        if(node.children){
          node.children.forEach(nodeItem => {
            this.delOptionsRec(nodeItem)
          });
        }
      },
      handleSelectCategory(data) {
        const node = data[0]
        const optionIndex = this.selectedOptions.findIndex(option => option.id === node.id)
        if(optionIndex > -1) {
          this.delOptionsRec(node)
        } else {
          this.loadOptionsRec(node)
        }
      },
      handleSelect(node) {
        const optionIndex = this.selectedOptions.findIndex(option => option.id === node.id)
        if(optionIndex > -1) {
          this.selectedOptions.splice(optionIndex, 1)
        } else {
          // eslint-disable-next-line no-undef
          this.selectedOptions.push(_.cloneDeep(node))
        }
      },
      handleSearch({target: {value}}) {
        this.searchQuery = value
        this.searchResult = []
        if(!this.searchMode) {
          this.searchMode = true
        }        
        if(value.length >= 3) {
          this.searching = true
          if(this.searchTimeout) clearTimeout(this.searchTimeout)
          this.searchTimeout = setTimeout(() => {
            this.$store.dispatch('categories/search', value).then(({ data: { data } }) => {
              if(data.length) {
                this.searchResult = data
              } else {
                this.searchResult = [{name: 'Արդյունք չի գտնվել!'}]
              }
              this.searching = false
            })
          }, 700)
        } else if(!value.length) {
          this.searchMode = false
          this.searching = false
        }
      },
      handleClickOutside(event) {
        const categoryTreeContainer = document.getElementById('category-tree-containere')
        if(!categoryTreeContainer.contains(event.target)) {
          this.clearSearch()
        }
      },
      clearSearch() {
        if(this.searchQuery) this.searchQuery = ''
        if(this.searchResult) this.searchResult = []
        if(this.searchMode) this.searchMode = false
      },
      removeFromOptions(category) {
        const index = this.selectedOptions.findIndex(option => option.id === category.id)
        if(index > -1) {
          this.selectedOptions.splice(index, 1)
        }
      },
      loadOptions(node) {
        return this.$store.dispatch('categories/getById', {id: node.id}).then(category => {
          return this.$set(node, 'children', category.children)
        })
      },
      loadTreeByType(type) {
        if(!this.categoryTypedObj[type]) {
          this.currentCategoryType = type
          this.$client.get(`categories/${type}`).then(response => {
            // eslint-disable-next-line no-undef
            const categoryTypedObj = _.cloneDeep(this.categoryTypedObj)
            categoryTypedObj[this.currentCategoryType] = response.data.data
            this.categoryTypedObj = categoryTypedObj
          })
        } else {
          this.currentCategoryType = type
        }
      }
    }
  }
</script>
