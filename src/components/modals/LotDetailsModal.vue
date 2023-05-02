<template>
<modal 
  class="lot-details-modal"
  name="lot-details-modal"
  @before-open="beforeOpen" 
  @before-close="handleBeforeClose" 
  transition="fade"
  :adaptive="true"
  :scrollable="true"
  :reset="true"
  width="70%"
  height="80%"
>
  <div id="modal-header" style="background-color:#006BE6">
    <div class="w-75 d-flex text-white">
      <p>{{cpvCode}}</p>
    </div>
    <button type="button"
            class="close position-absolute"
            style="right: 1.25rem; top: 25%"
            @click="$modal.hide('lot-details-modal')" aria-label="Close">
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
      </svg>
    </button>
  </div>
  <div id="modal-body">
    <div class="cpv-detail-block">
      <p>{{fields.cpvName}}</p>
      <div v-if="!editView" class="padding-t-20">
        <div class="w-100 d-flex flex-column justify-content-start pb-1">
          <span>Նախահաշվային ընդհանուր գին</span>
          <span class="detail-value">{{ (fields.unitAmount *  fields.plannedCount).toFixed(2)}}դր.</span>
        </div>
        <div class="w-100 d-flex flex-column justify-content-start pt-3 pb-1">
          <span>Միավորի գին</span>
          <span class="detail-value">{{ fields.unitAmount }}դր.</span>
        </div>
        <div class="w-100 d-flex flex-column justify-content-start pt-3 pb-1">
          <span>Չափման միավոր</span>
          <span class="detail-value">{{ fields.unit }} </span>
        </div>
        <div class="w-100 d-flex flex-column justify-content-start pt-3 pb-1">
          <span>Չափման միավոր (ռուսերեն)</span>
          <span class="detail-value">{{ fields.unitRu }} </span>
        </div>
        <div class="w-100 d-flex flex-column justify-content-start pt-3 pb-1">
          <span>Քանակ</span>
          <span class="detail-value">{{ fields.plannedCount }}</span>
        </div>
        <div class="w-100 d-flex flex-column justify-content-start pt-3 pb-1">
          <span>Բնութագիր</span>
          <div v-if="cpvSpecification" class="dropdown">
            <button class="btn btn-light dropdown-toggle br-8"
                    type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ cpvSpecification.description ? _.truncate(cpvSpecification.description.hy, {'length': 30, 'separator': ' '}) : '' }}
            </button>
            <div class="dropdown-menu p-3 dropdown-menu-right card"
                aria-labelledby="dropdownMenuButton"
                style="max-height: 20rem; overflow-y: auto; min-width: 22rem;">
              {{ cpvSpecification.description ? cpvSpecification.description.hy : '' }}
              <p class="mt-1">
                {{ cpvSpecification.description ? cpvSpecification.description.ru : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="padding-t-20">
        <div class="w-100 d-flex justify-content-between align-items-center pt-3 pb-1">
          <span>Անվանում</span>
          <span>
            <input
              type="text"
              v-model="$v.fields.cpvName.$model"
              class="form-control"
            />
          </span>
        </div>
        <div class="w-100 d-flex justify-content-between align-items-center pt-3 pb-1">
          <span>Անվանում ռուսերեն</span>
          <span>
            <input
              type="text"
              v-model="$v.fields.cpvNameRu.$model"
              class="form-control"
            />
          </span>
        </div>
        <div class="w-100 d-flex justify-content-between align-items-center pt-3 pb-1">
          <span>Միավորի գին</span>
          <span>
            <input
              type="number"
              v-model="$v.fields.unitAmount.$model"
              class="form-control"
            />
          </span>
        </div>
        <div class="w-100 d-flex justify-content-between align-items-center pt-3 pb-1">
          <span>Չափման միավոր</span>
          <span>
            <input
              type="text"
              v-model="$v.fields.unit.$model"
              class="form-control"
            />
          </span>
        </div>
        <div class="w-100 d-flex justify-content-between align-items-center pt-3 pb-1">
          <span>Չափման միավոր (ռուսերեն)</span>
          <span>
            <input
              type="text"
              v-model="$v.fields.unitRu.$model"
              class="form-control"
            />
          </span>
        </div>
        <div class="w-100 d-flex justify-content-between align-items-center pt-3 pb-1">
          <span>Քանակ</span>
          <span>
            <input
              type="number"
              v-model="$v.fields.plannedCount.$model"
              class="form-control"
            />
          </span>
        </div>
        <div class="w-100 d-flex justify-content-between align-items-center pt-3 pb-1">
          <span>Բնութագիր</span>
          <div class="btn-group">
            <div v-if="cpvSpecification" class="dropdown">
              <button 
                class="btn btn-light dropdown-toggle br-8 mr-3"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ cpvSpecification.description ? _.truncate(cpvSpecification.description.hy, {'length': 30, 'separator': ' '}) : '' }}
              </button>
              <div
                class="dropdown-menu p-3 dropdown-menu-right card"
                aria-labelledby="dropdownMenuButton"
                style="max-height: 20rem; overflow-y: auto;  min-width: 22rem;"
              >
                {{ cpvSpecification.description ? cpvSpecification.description.hy : '' }}
                <hr/>
                <p class="mt-1">
                  {{ cpvSpecification.description ? cpvSpecification.description.ru : '' }}
                </p>
              </div>
            </div>
            <div v-if="cpvSpecification" class="dropdown">
              <button
                type="button"
                class="btn btn-secondary text-white br-8"
                id="dropdownMenuButtonEdit"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-edit text-white"></i>
              </button>
              <div
                class="dropdown-menu p-3 dropdown-menu-right card"
                aria-labelledby="dropdownMenuButtonEdit"
                style="max-height: 20rem; overflow-y: auto;  min-width: 22rem;"
              >
                <textarea
                  class="form-control br-8"
                  v-model="$v.fields.cpvSpecification.description.hy.$model"
                />
                <hr/>
                <div class="d-flex">
                  <div class="col p-0">
                    <textarea
                      class="form-control br-8"
                      v-model="$v.fields.cpvSpecification.description.ru.$model"
                    />
                  </div>
                  <div class="col-auto pr-0">
                    <button @click="saveSpecification" class="btn btn-primary my-2 br-8">
                      <i class="fas fa-save text-white"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal-footer">
    <button
      v-if="!editView" 
      aria-expanded="false"
      @click="edit"
      type="button"
      class="btn btn-primary"
    >
      <svg class="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3516 10.5525L17.8998 4L18.9998 5.10064L12.4515 11.6531L11.3516 10.5525ZM6.55554 16.3917L16.3555 16.4435L16.3969 10.2174H17.9628V16.1841C17.9628 17.1803 17.1436 18.0001 16.148 18.0001H6.8148C5.80888 18.0001 5 17.1803 5 16.1841V6.84488C5 5.84869 5.81925 5.02891 6.8148 5.02891H11.9481V6.61658L6.60739 6.58545L6.55554 16.3917Z" fill="#F0F7FF"/>
      </svg>
      <span>Խմբագրել</span>
    </button>
    <button
      v-else
      aria-expanded="false"
      @click="save"
      type="button"
      class="btn btn-primary"
    >
      <i class="fas fa-save mr-2 text-white"></i>
      <span>Պահպանել</span>
    </button>
  </div>
</modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'LotDetailsModal',
  data() {
    return {
      rowDetails: {},
      editView: false,
      cpvCode: '',
      cpvSpecification: {},
      fields: {
        unit: '',
        unitRu: '',
        cpvName: '',
        cpvNameRu: '',
        unitAmount: '',
        plannedCount: '',
        cpvSpecification: {
          description: {
            hy: '',
            ru: ''
          }
        },
      },
    }
  },
  computed: {},
  methods: {
    beforeOpen({params}) {
      const planDetails = params.procurementPlan
      const planDetailsData = params.procurementPlan.details[0]
      const cpv = params.procurementPlan.is_from_outside ? params.procurementPlan.cpv_outside : params.procurementPlan.cpv;
      const cpvSpecification = params.procurementPlan.specifications
      this.rowDetails = params
      this.cpvCode = `${cpv.code} ${planDetails.cpv_drop ? `/ ${planDetails.cpv_drop}` : ''}`;
      this.cpvSpecification = params.procurementPlan.specifications;
      this.fields = {
        unit: planDetails.unit,
        unitRu: cpv.unit_ru,
        cpvName: cpv.name,
        cpvNameRu: cpv.name_ru,
        unitAmount: planDetailsData.unit_amount,
        plannedCount: planDetailsData.count,
        cpvSpecification: cpvSpecification,
      }
    },
    edit(){
      this.editView = !this.editView;
    },
    save() {
      this.$client.post(`organize-row/updateInfo/${this.rowDetails.id}`, this.fields).then(response => {
        this.$emit('save')
        this.editView = !this.editView;
      })
    },
    saveSpecification(){
      this.$client.put(`cpv/specifications/${this.cpvSpecification.id}`, this.fields.cpvSpecification).then(response => {
        console.log(response)
      })
    },
    handleBeforeClose() {
      
    }
  },
  validations() {
    return {
      fields: {
        unit: { required },
        unitRu: { required },
        cpvName: { required },
        cpvNameRu: { required },
        unitAmount: { required },
        plannedCount: { required },
        cpvSpecification: {
          description: {
            hy: { required },
            ru: { required }
          }
        },
      },
    }
  },
}
</script>

<style scoped>
.dropdown-menu{
  width: fit-content !important;
  min-width: 200px !important;
}
#modal-body{
  padding: 20px;
}
.cpv-detail-block div span{
  display: block;
}
.lot-details-modal{
  z-index: 2001;
}
</style>
