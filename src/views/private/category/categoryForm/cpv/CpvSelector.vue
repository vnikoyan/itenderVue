<template>
  <div @click="handleClickOutside" class="row mob-view h-100 m-0 p-0">
    <div class="col-lg-8 col-md-8 cpvs-list little-scroll p-0" style="height: 605px; overflow: auto">
      <ul class="nav nav-justified justify-content-center cpv_selector-nav" role="tablist">
        <li @click="loadTreeByType(1)" class="col p-0">
          <a class="nav-link active" data-toggle="tab" href="#cpv-tree" role="tab" aria-selected="true">Ապրանք</a>
        </li>
        <li @click="loadTreeByType(2)" class="col p-0">
          <a class="nav-link" data-toggle="tab" href="#cpv-tree" role="tab" aria-selected="false">Ծառայություն</a>
        </li>
        <li @click="loadTreeByType(3)" class="col p-0">
          <a class="nav-link" data-toggle="tab" href="#cpv-tree" role="tab" aria-selected="false">Աշխատանք</a>
        </li>
      </ul>
      <div id="cpv-tree-containere" class="tab-content pt-3">
        <div class="d-flex justify-content-center">
          <div class="mb-2 position-relative cpv-search-block" style="width: fit-content;">
            <input 
              @input="handleSearch"
              id="search"
              :value="searchQuery" 
              class="cpv-search d-block" 
              placeholder="Փնտրել" 
              type="text"
            >
            <label for="search" class="search">
              <img src="/assets/landing/images/Search.svg" alt="search">  
            </label> 
          </div>       
        </div>
        <div class="text-center text-primary">
          <span v-if="isMobile" @click.stop="showSelectedCpvs = !showSelectedCpvs" class="text-center show-more" style="cursor: pointer">
            {{ showSelectedCpvs ? 'Ընտրել կատեգորիա' : 'Դիտել ընտրվածները'}}
          </span>
        </div>
        <div v-show="!isMobile || !showSelectedCpvs" class="w-100 little-scroll px-0">
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
    <div v-show="!isMobile || showSelectedCpvs" class="col-lg-4 col-md-4">
      <h1 class="cpv-selector-header">Ընտրված կատեգորիաները</h1>
      <div class="mob overflow little-scroll" style="height: 555px;">
        <div class="cpv-selector-block d-flex align-items-start" v-for="cpv in selectedOptionsList" :key="cpv.id">
          <img src="/assets/landing/images/Close.svg" alt="close" class="mr-2" @click="removeFromOptions(cpv)">
          <span class="d-block" style="white-space: break-spaces;"><span class="cpv-code">{{ cpv.code }}</span> - <span class="cpv-name">{{ cpv.name }}</span> <br/><small v-if="cpv.used_count" class="font-weight-bold text-dark">(Կազմակերպվել է {{ cpv.used_count }} անգամ)</small></span>
        </div>
        <infinite-loading @infinite="infiniteHandler">
          <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
          <div slot="no-results"></div>
          <div slot="no-more"></div>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
  import VueTree from './VueTree'
  import isMobile from '@/mixins/isMobileView'
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: 'CpvSelector',
    mixins: [isMobile],
    components: { VueTree, InfiniteLoading },
    computed: {
      options() {
        return this.searchMode ? this.searchResult : this.cpvTypedObj[this.currentCpvType]
      }
    },
    data() {
      return {
        showSelectedCpvs: true,
        currentCpvType: 1,
        selectedCpvs: null,
        selectedOptions: [],
        selectedOptionsList: [],
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
      this.selectedOptions = this.$attrs.selectedCpvs;
      this.selectedOptionsList = this.selectedOptions.slice(0, 10);
      this.loadTreeByType(1)
    },
    methods: {
      infiniteHandler($state) {
        if(this.selectedOptions.length > 10){
          setTimeout(() => {
            const startIndex = this.selectedOptionsList.length + 1;
            const endIndex = this.selectedOptionsList.length + 11;
            const newList = this.selectedOptions.slice(startIndex, endIndex)
            this.selectedOptionsList = [...this.selectedOptionsList, ...newList];
            $state.loaded();
          }, 1000);
        } else {
          $state.complete();
        }
      },
      loadOptionsRec(node){
        const optionIndex = this.selectedOptions.findIndex(option => option.id === node.id)
        if(optionIndex === -1){
          this.selectedOptions.push(node)
        }
        this.$client.post(`cpv/getCpvChildIds/${node.id}`).then(({data : {data}}) => {
          data.forEach((value) => {
            const optionIndex = this.selectedOptions.findIndex(option => option.id === value.id)
            if(optionIndex === -1){
              this.selectedOptions.push(value)
            }
          })
        })
        // if(node.parent){
        //   const isDuplicate = Boolean(this.selectedOptions.find(item => item.id === node.parent.id))
        //   if(!isDuplicate){
        //     this.loadOptionsRec(node.parent)
        //   }
        // }
        // if(node.children != null){
        //   node.children.forEach(nodeItem => {
        //     this.loadOptionsRec(nodeItem)
        //   });
        // } else if(node.children_count){
        //   this.$client.post(`cpv/getCpvChildIds/${node.id}`).then(({data : {data}}) => {
        //     // console.log(data)
        //     // this.$set(node, 'children', data)
        //     data.forEach((value) => {
        //       this.selectedOptions.push(node)
        //     })
        //     console.log(this.selectedOptions)
        //   })

          // this.$store.dispatch('cpv/getById', {id: node.id}).then(cpvItem => {
          //   if(node.children_count){
          //     console.log(cpvItem.children)
          //     // this.$set(node, 'children', cpvItem.children)
          //     // node.children.forEach(nodeItem => {
          //     //   this.loadOptionsRec(nodeItem)
          //     // });
          //   }
          // })
        // }
      },
      delOptionsRec(node){
        const optionIndex = this.selectedOptions.findIndex(option => option.id === node.id)
        if(optionIndex > -1){
          this.selectedOptions.splice(optionIndex, 1)
          this.$client.post(`cpv/getCpvChildIds/${node.id}`).then(({data : {data}}) => {
            data.forEach((value) => {
              const optionIndex = this.selectedOptions.findIndex(option => option.id === value.id)
              if(optionIndex > -1){
                this.selectedOptions.splice(optionIndex, 1)
              }
            })
          })
          // if(node.children){
          //   node.children.forEach(nodeItem => {
          //     this.delOptionsRec(nodeItem)
          //   });
          // }
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
<style scoped>
  .overflow{
    overflow: auto;
  }
  @media only screen and (max-width: 770px) {
    .mob-view{
      flex-direction: column !important;
    }
    .mob{
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .mob-width{
      width: calc(100% - 8px);
    }
  }
  @media only screen and (max-width: 550px) {
    .cpv-selector-header{
      margin-bottom: 15px;
    }
    .cpvs-list{
      height: fit-content !important;
    }
    .mob-width{
      width: calc(100% - 20px);
    }
  }
</style>
<style>
  .cpv_selector-nav {
    border: 1px solid #DADDE6;
    box-sizing: border-box;
    border-radius: 8px;
    width: 360px;
    margin: 0 auto;
  }
  .cpv_selector-nav .nav-link.active{
    background: #006BE6 !important;
    box-shadow: 0px 4px 8px rgba(0, 107, 230, 0.15);
    border-radius: 8px;
    color: #FFFFFF;
  }
  .cpv_selector-nav .nav-link{
    color: #2D3036;
    text-align: center;
  }
  .cpv-search{
    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid #EDEFF2;
    border-radius: 12px;
    background: #F7F7F7;
    padding: 8px 15px;
    width: 100%;
    width: 360px;
  }
  .search{
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
  }
  .cpv-selector-block{
    background: #F7F7F7;
    border-radius: 12px;
    padding: 10px;
    margin-bottom: 8px;
  }
  .cpv-selector-block:last-child{
    margin-bottom: 0;
  }
  .cpv-selector-block:hover{
    background: #EDEFF2;
  }
  .cpv-code{
    color: #2D3036;
  }
  .cpv-name{
    color: #595e6b;
  }
  .cpv-selector-header{
    font-size: 16px;
    line-height: 24px;
    color: #2D3036;
    margin-bottom: 30px;
  }
  .cpv-selector-block img{
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .cpv-search, .cpv_selector-nav, .cpv-search-block {
      width: 100% !important;
    }
  }
</style>

