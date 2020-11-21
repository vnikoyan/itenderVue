<template>
  <div @click="handleClickOutside" class="row">
    <div class="col-6">
      <ul class="nav nav-pills nav-justified" role="tablist">
        <li @click="loadTreeByType(1)" class="nav-item waves-effect waves-light">
          <a class="nav-link active" data-toggle="tab" href="#cpv-tree" role="tab" aria-selected="true">Ապրանք</a>
        </li>
        <li @click="loadTreeByType(2)" class="nav-item waves-effect waves-light">
          <a class="nav-link" data-toggle="tab" href="#cpv-tree" role="tab" aria-selected="false">Ծառայություն</a>
        </li>
        <li @click="loadTreeByType(3)" class="nav-item waves-effect waves-light">
          <a class="nav-link" data-toggle="tab" href="#cpv-tree" role="tab" aria-selected="false">Աշխատանք</a>
        </li>
      </ul>
      <div id="cpv-tree-containere" class="tab-content py-3">
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
            v-for="cpv in selectedOptions" :key="cpv.id">
          <span class="mr-3">{{ cpv.code }} - {{ cpv.name }}</span>
          <font-awesome-icon @click="removeFromOptions(cpv)" 
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
    name: 'create',
    components: { VueTree },
    computed: {
      options() {
        return this.searchMode ? this.searchResult : this.cpvTypedObj[this.currentCpvType]
      }
    },
    data() {
      return {
        currentCpvType: 1,
        selectedCpvs: null,
        selectedOptions: [],
        // normalizer(node) {
        //   return {
        //     id: node.id,
        //     label: node.code + '-' +node.name,
        //     children: node.children,
        //   }
        // },
        cpvTypedObj: {},
        searchResult: [],
        searchMode: false,
        searchQuery: '',
        searchTimeout: null,
        searching: false,
      }
    },
    watch: {
      selectedOptions: function(updatedOptions) {
        this.$emit('update:selectedCpvs', updatedOptions)
      }
    },
    mounted() {
      this.loadTreeByType(1)
    },
    methods: {
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
        this.searching = true
        if(!this.searchMode) {
          this.searchMode = true
        }        
        if(value.length >= 3) {
          if(this.searchTimeout) clearTimeout(this.searchTimeout)
          this.searchTimeout = setTimeout(() => {
            this.$store.dispatch('cpv/search', value).then(({ data: { data } }) => {
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
        const cpvTreeContainer = document.getElementById('cpv-tree-containere')
        if(!cpvTreeContainer.contains(event.target)) {
          this.clearSearch()
        }
      },
      clearSearch() {
        if(this.searchQuery) this.searchQuery = ''
        if(this.searchResult) this.searchResult = []
        if(this.searchMode) this.searchMode = false
      },
      removeFromOptions(cpv) {
        const index = this.selectedOptions.findIndex(option => option.id === cpv.id)
        if(index > -1) {
          this.selectedOptions.splice(index, 1)
        }
      },
      loadOptions(node) {
        return this.$store.dispatch('cpv/getById', {id: node.id}).then(cpv => {
          return this.$set(node, 'children', cpv.children)
        })
      },
      loadTreeByType(type) {
        if(!this.cpvTypedObj[type]) {
          this.currentCpvType = type
          this.$client.get(`cpv/${this.currentCpvType}`).then(response => {
            // eslint-disable-next-line no-undef
            const cpvTypedObj = _.cloneDeep(this.cpvTypedObj)
            cpvTypedObj[this.currentCpvType] = response.data.data
            this.cpvTypedObj = cpvTypedObj
          })
        } else {
          this.currentCpvType = type
        }
      }
    }
  }
</script>
