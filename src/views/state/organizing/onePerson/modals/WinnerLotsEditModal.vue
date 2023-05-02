<template>
  <modal 
    name="winner-lots-edit"
    @closed="$emit('updateComparisonData')"
    @before-open="handleBeforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
        <p>Չափաբաժինների տվյալների մուտքագրում</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('winner-lots-edit')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body" class="p-4" style="overflow-x: auto; height: 85%">
      <div class="row">
        <div class="col-md-12">
          <table class="table m-0" style="border-collapse: collapse; border-spacing: 0; width: 100% !important;;">
            <thead>
              <tr>
                <th style="width: 120px;">Չ/Հ</th>
                <th>CPV կոդ</th>
                <th>Անվանում</th>
                <th>Ապրանքային նշանը</th>
                <th>Մակնիշը</th>
                <th>Արտադրողի անվանումը</th>
                <th>Տեխնիկական բնութագիր հայերեն</th>
                <th>Տեխնիկական բնութագիր ռուսերեն</th>
              </tr>
            </thead>
            <tbody id="comparison-table" style="min-height: 5vh; max-height: 40vh!important; overflow: scroll">
              <template v-for="(lot, lotIndex) in participantGroup.won_lots">
                <tr :key="lotIndex">
                  <td>{{ lot.view_id }}</td>
                  <td>{{ lot.procurement_plan.cpv.code }}</td>
                  <td>{{ lot.procurement_plan.cpv.name }}</td>
                  <td>
                    <input
                      v-if="lot.procurement_plan.cpv.type !== '2'"
                      v-model="lot.winner_lot_trademark"
                      name="name"
                      type="text"
                      class="form-control"
                    >
                  </td>
                  <td>
                    <input
                      v-if="lot.procurement_plan.cpv.type !== '2'"
                      v-model="lot.winner_lot_brand"
                      name="name"
                      type="text"
                      class="form-control"
                    >
                  </td>
                  <td>
                    <input
                      v-if="lot.procurement_plan.cpv.type !== '2'"
                      v-model="lot.winner_lot_manufacturer"
                      name="name"
                      type="text"
                      class="form-control"
                    >
                  </td>
                  <td>
                    <input
                      v-model="lot.winner_lot_specification.hy"
                      name="name"
                      type="text"
                      class="form-control"
                    >
                  </td>
                  <td>
                    <input
                      v-model="lot.winner_lot_specification.ru"
                      name="name"
                      type="text"
                      class="form-control"
                    >
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button :disabled="isLoading" @click="save" class="btn btn-primary">
        <span v-if="isLoading" class="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  import 'vue-date-pick/dist/vueDatePick.css';

  export default {
    name: 'WinnerLotsEditModal',
    components: {  },
    data() {
      return {
        isLoading: false,
        participantGroup: {},
      }
    },
    validations() {
      const rules = {
        participantGroup: {
          won_lots: {
            $each: {
              winner_lot_specification: {
                hy: {required},
                ru: {required}
              },
            }
          },
        },
      }
      return rules
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organize/currentOrganized']
      },
    },
    methods: {
      consoleLog(msg) {
        console.log(msg)
      },
      handleBeforeOpen({params}) {
        this.participantGroup = params
        this.participantGroup.won_lots.forEach((lot) => {
          if(lot.winner_lot_specification === null || lot.winner_lot_specification === ''){
            lot.winner_lot_specification = {
              hy: lot.procurement_plan.specifications.description.hy,
              ru: lot.procurement_plan.specifications.description.ru,
            }
          } else {
            lot.winner_lot_specification = JSON.parse(lot.winner_lot_specification)
          }
        })
      },
      save() {
        if(!this.$v.participantGroup.$invalid) {
          this.isLoading = true;
          this.success = true;
          this.participantGroup.won_lots.forEach((lot) => {
            const updateData = {
              winner_lot_trademark: lot.winner_lot_trademark,
              winner_lot_brand: lot.winner_lot_brand,
              winner_lot_manufacturer: lot.winner_lot_manufacturer,
              winner_lot_specification: JSON.stringify(lot.winner_lot_specification),
            }
            $client.put(`organize-row/${lot.id}`,updateData).then(response => {
              this.isLoading = false
            }).catch(e => {
              this.$notify({
                group: 'foo',
                type: 'error',
                title: 'Ինչ որ բան այն չէ',
                text: 'Կրկին փորձեք!'
              })
              this.success = false
              this.isLoading = false
            })
          })
          if(this.success){
            this.$notify({
              group: 'foo',
              type: 'success',
              text: 'Հաջողությամբ պահպանված է'
            })
            // this.$modal.hide('winner-lots-edit')
          }
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Լրացրեք տեխնիկական բնութագիրները պահպանելու համար!'
          })
        }
      }
    },
  }
</script>

<style scoped>

</style>