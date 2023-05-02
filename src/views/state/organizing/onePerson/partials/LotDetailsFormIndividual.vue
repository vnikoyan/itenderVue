<template>
  <div class="card p-md-3 px-lg-4">
    <div class="row">
      <div class="col-lg-9 pr-lg-4 pr-3">
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
        <button v-if="viewMode && mode === 'edit'" @click="edit" class="btn btn-primary mt-3" type="button">
          Խմբագրել
          <i class="ml-1 fas fa-edit"></i>
        </button>
      </div>
        
      <div class="col-lg-3 pr-lg-4">
        <lot-details-percents
          :organizedPercents="this.organizedRow.percent"
          ref="percents"
          @updateOrganizedPercents="(percents) => $set(organizedRow, 'percent', percents)"
        />
        <button v-if="mode === 'edit'" @click="savePercents" class="btn btn-primary mt-3" type="button" :disabled="isSaving">
          <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          Պահպանել
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import LotDetailsPercents from '@/components/dashboard/lot/onePerson/LotDetailsPercents'
  import LotDetailsHeader from '@/components/dashboard/lot/onePerson/LotDetailsHeader'
  import LotDetailsForm from '@/components/dashboard/lot/onePerson/LotDetailsForm'

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
          return this.$store.getters['organizeOnePerson/organizedRows']
      },
      lotPercents() {
        return this.$store.getters['organizeOnePerson/lotPercents']
      },
    },
    async mounted() {
      this.cpvType = this.$route.query.cpvType
      this.mode = this.$route.query.mode
      await this.setPercentsForFirstLot()
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
      async setPercentsForFirstLot() {
        await this.$client.get(`organize-row/${this.organizedRows[0].id}`).then(({ data: { data } }) => {
          const percents = data.organizeRowPercent
          this.$store.dispatch('organizeOnePerson/storeLotPercents', percents)
        })
      },
      consoleLog(msg, data) {
        console.log(msg, data)
      },
      edit(){
        this.viewMode = false;
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
          this.viewMode = true;
        })
      },
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
