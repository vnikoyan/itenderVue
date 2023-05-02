<template>
  <div class="row m-0 p-0 h-100">
    <div class="col-lg-12 p-0 h-100">
      <div class="card opened h-100">
        <div class="card-header">
          <button class="border-0">
            <h4 class="mb-0">Ընտրել հետաքրքող տենդերների կատեգորիաները</h4>
          </button>
        </div>
        <div class="card-body">
          <div  v-if="loaded" class="tab-content">
            <div class="tab-panel h-100" :class="{'active': organizeType === 0}" id="settings-1" role="tabpanel">
              <StateCategory :selectedCpvs.sync="selectedCpvs" />
            </div>
          </div>
          <div class="text-center" v-else>
            <div class="m-3 spinner-border spinner-border-xl text-primary" role="status"></div>
          </div>
          <div id="modal-footer" class="bg-white w-100 mt-2 pr-0 text-right" style="bottom: 0">
            <button @click="$router.push(`/participant/tenders`);" type="button" class="button_H36_type2 mr-3">
              <span>Դիտել</span>
            </button>
            <button @click="handleClick" type="button" class="button_H36">
              <span>Պահպանել</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StateCategory from "./categoryForm/StateCategory";

  export default {
    components: { StateCategory },
    name: 'selectCategory',
    data() {
      return {
        organizeType: 0,
        selectedCpvs: [],
        selectedCategories: [],
        update: false,
        loaded: false,
      }
    },
    async mounted() {
      await this.$client.get('user-cpvs').then(({data}) => {
        if(data.data.length){
          this.selectedCpvs = [...data.data]
          this.update = true;
        } else if(this.$route.path !== '/settings') {
          this.$fire({
            title: "Զգուշացում",
            text: "Խնդրում ենք ընտրել կատեգորիա շարունակելու համար",
            type: "warning",
            confirmButtonText: 'Լավ'
          })
        }
      })
      // this.loaded = true;
      setTimeout(() => {
        this.loaded = true;
      }, 1000);
      this.$store.dispatch('procurement/getPlans')
    },
    computed: {
      me() {
        return this.$store.getters['user/me']
      },
    },
    methods: {
      handleClick() {
        if (!this.selectedCpvs.length && !this.selectedCategories.length) {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Ընտրեք գոնե մեկ կատեգորիա շարունակելու համար'
          })
        } else {
          this.$client.post(`user-cpvs/${this.me.id}`, this.selectedCpvs).then(({data}) => {
            if(data.status){
              this.$client.post(`user-categories/${this.me.id}`, this.selectedCategories).then(({data}) => {
                console.log(data)
                if(data.status){
                  this.$notify({
                    group: 'foo',
                    type: 'success',
                    text: 'Հաջողությամբ պահպանված է'
                  })
                  this.$client.put(`user`, { first_login: 0 }).then(({data}) => {
                    if(data){
                      this.$store.dispatch('firstLogin', 0).then(() => {
                        this.$router.push({ path: '/participant/tenders' })
                      })
                    }
                  }).catch(e => {
                    this.$notify({
                      group: 'foo',
                      type: 'error',
                      title: 'Ինչ որ բան այն չէ',
                      text: 'Կրկին փորձեք!'
                    })
                  })
                }
              }).catch(e => {
                this.$notify({
                  group: 'foo',
                  type: 'error',
                  title: 'Ինչ որ բան այն չէ',
                  text: 'Կրկին փորձեք!'
                })
              })
            }
          }).catch(e => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          })
        }
      },
    },
  }
</script>
<style scoped>
.tab-content{
  height: calc(100% - 40px)
}
</style>