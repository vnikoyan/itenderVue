<template>
<div class="card" :class="open ? 'opened' : ''">
  <div class="card-header">
    <button @click="() => open = !open" class="d-flex w-100 justify-content-between align-items-center" type="button" data-toggle="collapse" data-target="#userFiltersCollapseCollapse" aria-expanded="false" aria-controls="userFiltersCollapseCollapse">
      <h4 data-target="#userFiltersCollapseCollapse" aria-expanded="false" aria-controls="userFiltersCollapseCollapse" class="mb-0">Իմ ֆիլտրները</h4>
      <svg width="14" height="8" viewBox="0 0 14 8">
        <path d="M8.40545 6.48276L13.2227 1.51724L11.7507 -6.43398e-08L6.93353 4.96552L2.25014 -4.79624e-07L0.778211 1.51724L5.4616 6.48276L6.93353 8L8.40545 6.48276Z" fill="#006BE6"/>
      </svg>
    </button>
  </div>
  <div id="userFiltersCollapseCollapse" class="collapse multi-collapse">
    <div class="card-body d-flex flex-column padding-20">
      <div class="row">
        <div class="col-lg-6 mb-3">
          <CustomMutliSelect
            v-model="filters.type"
            :options="filters.typeOptions"
            label="name"
            track-by="value"
            :searchable="false"
            :close-on-select="false"
            :show-labels="true"
            selectLabel=""
            deselectLabel=""
            selectedLabel=""
            :multiple="false"
            placeholder="Տեսակ"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <CustomMutliSelect
            v-model="filters.status"
            :options="filters.statusOptions"
            label="name"
            track-by="value"
            :searchable="false"
            :close-on-select="false"
            :allow-empty="true"
            :show-labels="true"
            selectLabel=""
            deselectLabel=""
            selectedLabel=""
            placeholder="Կարգավիճակ"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <CustomMutliSelect
            v-if="filters.type != 'ՀՀ֊ից դուրս մրցույթներ'"
            v-model="filters.region"
            track-by="name"
            label="name"
            :options="filters.regionOptions"
            :searchable="false"
            :close-on-select="false"
            :show-labels="true"
            selectLabel=""
            deselectLabel=""
            selectedLabel=""
            :multiple="true"
            placeholder="Տարածաշրջան"
          />
        </div>
        <div class="col-lg-6 mb-3">
          <CustomMutliSelect
            v-model="filters.organizator"
            track-by="name"
            label="name"
            :options="filters.organizatorOptions"
            :searchable="true"
            :close-on-select="false"
            :show-labels="true"
            selectLabel=""
            deselectLabel=""
            selectedLabel=""
            :multiple="true"
            placeholder="Պատվիրատու"
          />
        </div>
        <div class="col-lg-6 mb-3">
            <CustomMutliSelect
              v-model="filters.guaranteed"
              :options="filters.guaranteedOptions"
              label="name"
              track-by="value"
              :searchable="false"
              :close-on-select="false"
              :show-labels="true"
              selectLabel=""
              deselectLabel=""
              selectedLabel=""
              placeholder="Երաշխիք"
            />
          </div>
        <template v-if="filters.type && filters.type.value === 'competitive'" >
          <div class="col-lg-6 mb-3">
            <CustomMutliSelect
              class="mySelect"
              v-model="filters.isElectronic"
              :options="filters.isElectronicOptions"
              label="name"
              track-by="value"
              :searchable="false"
              :close-on-select="false"
              :show-labels="true"
              selectLabel=""
              deselectLabel=""
              selectedLabel=""
              :allow-empty="true"
              placeholder="Էլեկտրոնային / թղթային"
            />
          </div>
          <div class="col-lg-6 mb-3">
            <CustomMutliSelect
              v-model="filters.procedure"
              :options="filters.procedureOptions"
              label="contact"
              track-by="id"
              :searchable="false"
              :close-on-select="false"
              :show-labels="true"
              selectLabel=""
              deselectLabel=""
              selectedLabel=""
              :multiple="true"
              placeholder="Ընթացակարգի տեսակ"
            />
          </div>
        </template>
      </div>  
      <div class="d-flex justify-content-end">
        <button @click="save" type="button" class="button_H36" data-toggle="modal" data-animation="bounce">
          <span>Պահպանել</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CustomMutliSelect from '@/components/helpers/CustomMutliSelect'

export default {
  name: 'userFilters',
  components: { CustomMutliSelect },
  data () {
    return {
      isInvalidPhone: false,
      type: 'legalEntity',
      open: false,
      filters: {
        status: null,
        statusOptions: [
          { name: 'Բոլորը', value: 'all' },
          { name: 'Ակտիվ մրցույթներ', value: 'active' },
          { name: 'Ավարտված մրցույթներ', value: 'finished' },
        ],
        type: null,
        typeOptions: [
          { name: 'Պետական մրցակցային մրցույթներ', value: 'competitive' },
          { name: 'Պետական մեկ անձի մրցույթներ', value: 'one_person' },
          { name: 'Մասնավոր մրցույթներ', value: 'private' },
          { name: 'ՀՀ֊ից դուրս մրցույթներ', value: 'international' },
        ],
        isElectronic: null,
        isElectronicOptions: [
          { name: 'Թղթային', value: false },
          { name: 'Էլեկտրոնային', value: true },
        ],
        procedure: [],
        procedureOptions: [
          { name: 'ԳՀ', value: 'GH' },
          { name: 'ԲՄ', value: 'BM' },
          { name: 'ՀԲՄ', value: 'UBA' },
          { name: 'ՀՄԱ', value: 'HMA' },
        ],
        region: [],
        regionOptions: [],
        organizator: [],
        organizatorOptions: [],
        guaranteed: null,
        guaranteedOptions: [
          { name: 'Երաշխիքով', value: true },
          { name: 'Առանց երաշխիքի', value: false },
        ],
      },
      userType: this.$route.params.type,
      isPrivate: this.$route.params.type === 'private'
    }
  },
  mounted(){
    this.$client.get('tender/filterOptions').then(({data}) => {
      this.filters.procedureOptions = data.procedure_types
      this.filters.regionOptions = data.regions
      this.filters.organizatorOptions = data.organizators
    })
    this.$client.get('user-filters').then(({data: {data}}) => {
      if(data){
        this.filters.status = data.status;
        this.filters.type = data.type;
        this.filters.region = data.region;
        this.filters.procedure = data.procedure;
        this.filters.organizator = data.organizator;
        this.filters.isElectronic = data.isElectronic;
        this.filters.guaranteed = data.guaranteed;
      }
    })
  },
  computed: {
    isCoordinator(){
       return +this.me.divisions === 2
    },
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    consoleLog(e){
      console.log(e)
    },
    save() {
      const requestData = {
        status: this.filters.status,
        type: this.filters.type,
        isElectronic: this.filters.isElectronic,
        guaranteed: this.filters.guaranteed,
        procedure: this.filters.procedure,
        region: this.filters.region,
        organizator: this.filters.organizator,
      }
      this.$client.post(`user-filters`, requestData).then(({data}) => {
        console.log(data)
        if(data){
          this.$notify({
            group: 'foo',
            type: 'success',
            text: 'Հաջողությամբ պահպանված է'
          })
        }
      }).catch(e => {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Էլ. հացեն զբաղված է',
          text: 'Կրկին փորձեք!'
        })
      })
    },
  },
}
</script>
<style scoped>
.card{
  margin-bottom: 12px;
}
</style>