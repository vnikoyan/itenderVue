<template>
  <div class="card padding-20">
    <div class="d-flex">
      <div v-if="viewMode" class="col-lg-12 p-0">
        <lot-details-header
          :cpv-code="`${cpv.code} ${planDetails.cpv_drop ? `/ ${planDetails.cpv_drop}` : ''}`"
          :cpv-name="cpv.name"
          :unit="cpv.unit"
          :unit-amount="planDetailsData.unit_amount"
          :unit-ru="cpv.unit_ru"
          :header-title-ru="cpv.name_ru"
          :planned-count="planDetailsData.count"
          :cpv-specification="cpvSpecification"
        />
      </div>
      <div v-else class="col-lg-12 p-0">
        <lot-details-form 
          :cpv-code="`${cpv.code} ${planDetails.cpv_drop ? `/ ${planDetails.cpv_drop}` : ''}`"
          :cpv-name="cpv.name"
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
    </div>
    <div class="text-right">
      <button v-if="viewMode && mode === 'edit'" @click="edit" class="btn btn-primary mt-3" type="button">
        <svg class="mr-2" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.082 10.5525L18.6303 4L19.7302 5.10064L13.182 11.6531L12.082 10.5525ZM7.28601 16.3917L17.0859 16.4435L17.1274 10.2174H18.6933V16.1841C18.6933 17.1803 17.8741 18.0001 16.8785 18.0001H7.54527C6.53935 18.0001 5.73047 17.1803 5.73047 16.1841V6.84488C5.73047 5.84869 6.54972 5.02891 7.54527 5.02891H12.6786V6.61658L7.33786 6.58545L7.28601 16.3917Z" fill="#F0F7FF"/>
        </svg>
        <span>Խմբագրել</span>
      </button>
    </div>
    <!-- <button @click="save" class="btn btn-primary mt-3" type="button" :disabled="isSaving">
      <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
      Պահպանել
    </button> -->
  </div>
</template>

<script>
  import LotDetailsHeader from '@/components/dashboard/lot/itender/LotDetailsHeader'
  import LotDetailsForm from '@/components/dashboard/lot/itender/LotDetailsForm'

  export default {
    name: 'LotDetailsFormItender',
    components: { LotDetailsHeader, LotDetailsForm },
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
          return this.$store.getters['organizeItender/organizedRows']
      },
      lotPercents() {
        return this.$store.getters['organizeItender/lotPercents']
      },
    },
    async mounted() {
      this.cpvType = this.$route.query.cpvType
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
      edit(){
        this.viewMode = false;
      },
      consoleLog(msg, data) {
        console.log(msg, data)
      },
      save() {
        this.isSaving = true;
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
          console.log('this.organizedRow', this.organizedRow)
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
        console.log(this.cpvSpecification, 'cpvSpecification')
        // Object.assign(this.organizedRow.percent, {name: 'name', ...this.$refs.percents.percents})

        // const isFirst = this.organizedRow.id === this.organizedRows[0].id;
        // if(isFirst){
        //   this.$client.post('organize-row/autoInsertPercents', this.organizedRow)
        // }

        // this.$client.put(`organize-row/${this.organizedRow.id}`, this.organizedRow).then(response => {
        //   this.isSaving = false
        // }).catch(e => {
        //   this.isSaving = false
        // })
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
