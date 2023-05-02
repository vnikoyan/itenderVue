<template>
  <div class="card p-md-3 px-lg-4">  
    <div class="row">
      <div :class="!selectedIsCondition ? 'col-lg-9 pr-lg-4 pr-3' : 'col-12'">
        <div v-if="viewMode" class="col-lg-12 pr-lg-4 pr-3">
          <lot-details-header
            :header-title="`${cpv.code} ${planDetails.cpv_drop ? `/ ${planDetails.cpv_drop}` : ''} - ${cpv.name}`"
            :unit="cpv.unit"
            :unit-amount="planDetailsData.unit_amount"
            :unit-ru="cpv.unit_ru"
            :header-title-ru="cpv.name_ru"
            :planned-count="planDetailsData.count"
            :cpv-specification="cpvSpecification"
          />
        </div>
        <div v-else class="col-lg-12 pr-lg-4 pr-3">
          <lot-details-form 
            :header-title="`${cpv.code} ${planDetails.cpv_drop ? `/ ${planDetails.cpv_drop}` : ''} - ${cpv.name}`"
            :isMainTool="organizedRow.is_main_tool"
            :isProductInfo="organizedRow.is_product_info"
            :cpvName="cpv.name"
            :cpvNameRu="cpv.name_ru"
            :unit="planDetails.unit"
            :unit-amount="planDetailsData.unit_amount"
            :unit-ru="cpv.unit_ru"
            :header-title-ru="cpv.name_ru"
            :planned-count="planDetailsData.count"
            :rowDetails="rowDetails"
            :cpv-specification="cpvSpecification"
            @save="save"
          />
        </div>
        <button v-if="viewMode" @click="edit" class="btn btn-primary mt-3 ml-2" type="button">
          Խմբագրել
          <i class="ml-1 fas fa-edit"></i>
        </button>
      </div>
        
      <div v-if="!selectedIsCondition" class="col-lg-3 pr-lg-4">
        <lot-details-percents
          :organizedPercents="this.organizedRow.percent"
          ref="percents"
          @updateOrganizedPercents="(percents) => $set(organizedRow, 'percent', percents)"
        />
        <button @click="savePercents" class="btn btn-primary mt-3 ml-2" type="button" :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          Պահպանել
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import LotDetailsPercents from '@/components/dashboard/lot/competitive/LotDetailsPercents'
  import LotDetailsHeader from '@/components/dashboard/lot/competitive/LotDetailsHeader'
  import LotDetailsForm from '@/components/dashboard/lot/competitive/LotDetailsForm'

  export default {
    name: 'LotDetailsFormCompetition',
    components: { LotDetailsHeader, LotDetailsPercents, LotDetailsForm },
    props: {
      rowDetails: Object,
    },
    data() {
      return {
        cpv: {},
        mode: '',
        viewMode: true,
        organizedRow: {
          percent: {},
          count: '',
          supply: '',
          supply_date: '',
          // is_phased_version: null,
          is_main_tool: '',
          is_collateral_requirement: '',
          is_product_info: '',
          shipping_address: '',
        },
        selectedIsCondition: false,
        planDetails: {},
        planDetailsData: {},
        planRowDetails: {},
        cpvSpecification: {},
        isSaving: false,
      }
    },
    computed: {
      typeLabel() {
        if(_.isEmpty(this.planDetails)) {
          return ''
        }
        const labelsObj = {
          1: 'Մատակարարման',
          2: 'Ծառայության մատուցման',
          3: 'Աշխատանքի կատարման ',
        }
        return labelsObj[this.planDetails.cpv_type]
      },
      organizedRows() {
          return this.$store.getters['organize/organizedRows']
      },
      lotPercents() {
        return this.$store.getters['organize/lotPercents']
      },
      agreeWithTerms() {
        return this.$store.getters['organize/agreeWithTerms']
      },
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      }
    },
    async mounted() {
      await this.setPercentsForFirstLot()
      this.mode = this.$route.query.mode
      this.selectedIsCondition = this.rowDetails.is_condition
      await this.$client.get(`organize-row/${this.rowDetails.id}`).then(async({ data: { data } }) => {
        this.organizedRow = Object.assign(this.organizedRow, {
          id: data.id,
          count: data.count,
          supply: data.supply,
          supply_date: data.supply_date,
          is_main_tool: data.is_main_tool,
          is_collateral_requirement: data.is_collateral_requirement,
          is_product_info: data.is_product_info,
          shipping_address: {
            hy: data.shipping_address.hy || '',
            ru: data.shipping_address.ru || '',
          },
        })

        this.organizedRow = Object.assign(this.organizedRow, {
          is_main_tool: this.agreeWithTerms.is_main_tool,
          is_product_info: this.agreeWithTerms.is_product_info
        })
        
        if (data.organizeRowPercent) {
          this.organizedRow = Object.assign(this.organizedRow, {
            percent: _.pick(data.organizeRowPercent, [...Array.from({ length: 12 }, (_, i) => `month_${i + 1}`), 'name', 'organize_row_id']),
          })
          this.planRowDetails = data.procurementPlan.details[0]
        } else {
          if(this.lotPercents){
            this.organizedRow = Object.assign(this.organizedRow, { 
            percent: {
              id: data.id,
              month_1: this.lotPercents.month_1,
              month_2: this.lotPercents.month_2,
              month_3: this.lotPercents.month_3,
              month_4: this.lotPercents.month_4,
              month_5: this.lotPercents.month_5,
              month_6: this.lotPercents.month_6,
              month_7: this.lotPercents.month_7,
              month_8: this.lotPercents.month_8,
              month_9: this.lotPercents.month_9,
              month_10: this.lotPercents.month_10,
              month_11: this.lotPercents.month_11,
              month_12: this.lotPercents.month_12
            }})
          }else{
            this.organizedRow = Object.assign(this.organizedRow, {id: data.id})
          }
        }
        this.planDetails = data.procurementPlan
        this.planDetailsData = data.procurementPlan.details[0]

        // getting specification for cpv
        this.cpv = data.procurementPlan.is_from_outside ? data.procurementPlan.cpv_outside : data.procurementPlan.cpv
        this.cpvSpecification = data.procurementPlan.specifications
      })
    },
    methods: {
      consoleLog(msg, data) {
        console.log(msg, data)
      },
      edit(){
        this.viewMode = false;
      },
      async setPercentsForFirstLot() {
        await this.$client.get(`organize-row/${this.organizedRows[0].id}`).then(({ data: { data } }) => {
          const percents = data.organizeRowPercent
          this.$store.dispatch('organize/storeLotPercents', percents)
           const terms = {
            is_main_tool: data.is_main_tool,
            is_product_info: data.is_product_info
          }
          this.$store.dispatch('organize/storeTerms', terms)
        })
      },
      savePercents() {
        this.isSaving = true
        Object.assign(this.organizedRow.percent, {name: 'name', ...this.$refs.percents.percents})

        const isFirst = this.organizedRow.id === this.organizedRows[0].id;
        if(isFirst){
          this.$client.post('organize-row/autoInsertPercents', this.organizedRow)
        }

        this.$client.put(`organize-row/${this.organizedRow.id}`, this.organizedRow).then(response => {
          this.isSaving = false
        }).catch(e => {
          this.isSaving = false
        })
        this.$store.dispatch('organize/getCurrent', this.$route.params.id)
      },
      save() {
        this.$client.get(`organize-row/${this.rowDetails.id}`).then(async({ data: { data } }) => {
          this.organizedRow = Object.assign(this.organizedRow, {
            id: data.id,
            count: data.count,
            supply: data.supply,
            supply_date: data.supply_date,
            is_main_tool: data.is_main_tool,
            is_collateral_requirement: data.is_collateral_requirement,
            is_product_info: data.is_product_info,
            shipping_address: {
              hy: data.shipping_address.hy || '',
              ru: data.shipping_address.ru || '',
            },
          })
          if (data.organizeRowPercent) {
            this.organizedRow = Object.assign(this.organizedRow, {
              percent: _.pick(data.organizeRowPercent, [...Array.from({ length: 12 }, (_, i) => `month_${i + 1}`), 'name', 'organize_row_id']),
            })
            this.planRowDetails = data.procurementPlan.details[0]
          } else {
            if(this.lotPercents){
              this.organizedRow = Object.assign(this.organizedRow, {
              percent: {
                id: data.id,
                month_1: this.lotPercents.month_1,
                month_2: this.lotPercents.month_2,
                month_3: this.lotPercents.month_3,
                month_4: this.lotPercents.month_4,
                month_5: this.lotPercents.month_5,
                month_6: this.lotPercents.month_6,
                month_7: this.lotPercents.month_7,
                month_8: this.lotPercents.month_8,
                month_9: this.lotPercents.month_9,
                month_10: this.lotPercents.month_10,
                month_11: this.lotPercents.month_11,
                month_12: this.lotPercents.month_12
              }})
            }else{
              this.organizedRow = Object.assign(this.organizedRow, {id: data.id})
            }
          }
          this.planDetails = data.procurementPlan
          this.planDetailsData = data.procurementPlan.details[0]
          this.cpv = data.procurementPlan.is_from_outside ? data.procurementPlan.cpv_outside : data.procurementPlan.cpv
          this.cpvSpecification = data.procurementPlan.specifications;
          this.viewMode = true
        })
      },
    },
    validations() {
      return {
        organizedRow: {
          count: { required },
          supply: { required },
          // is_phased_version: { required },
          supply_date: { required },
          is_main_tool: { required },
          is_collateral_requirement: { required },
          is_product_info: { required },
          shipping_address: {
            hy: { required },
            ru: { required },
          },
        }
      }
    },
  }
</script>

<style>
  .months {
    min-width: 115px;
    text-align: center;
    display: inline-block;
  }
  .percents {
    width: 18px; 
    padding: 0; 
    align-items: center; 
    justify-content: center;
  }
  .percent-input-arrows {
    cursor:pointer;
    left: -12px;
    font-size: large
  }
</style>
