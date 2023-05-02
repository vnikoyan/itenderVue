<template>
  <modal 
    class="insert-lots-from-outside-modal"
    name="insert-lots-from-outside-modal"
    @before-close="resetComponent"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="90%"
    height="90%"
  >
    <div id="modal-header" class="action-modal">
      <div class="w-75 d-flex text-white">
        <p>Չափաբաժինների մուտքագրում դրսից</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('insert-lots-from-outside-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ffffff"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="row">
        <div class="col-6 steps">
          <p>Ուշադրություն!</p>
          <ol>
            <li class="mb-2">
              <span class="mr-2">Ներբեռնեք գնման հայտի օրինակը</span>
              <a id="doc" href="/assets/dashboard/assets/files/lots_excel_example.xlsx">
                <i class="far fa-file-excel text-success font-30"></i>
              </a>
            </li>
            <li class="mb-2">Լրացրեք բոլոր դաշտերը,</li>
            <li class="mb-2">Պատճենեք ձեր excel ֆայլից աղյուսակը և մուտքագրեք այստեղ</li>
            <span>Ընտրել մուտքագրված չափաբաժինների գնման ձևը և պայմանով լինել/չլինելը</span>
          </ol>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="text-dark" for="other-requirements">Պատճենեք ձեր excel ֆայլից աղյուսակը և մուտքագրեք այստեղ</label>
            <textarea v-model="copiedExcelSheet"
                      rows="4"
                      id="other-requirements"
                      class="form-control br-8"></textarea>
          </div>
        </div>
      </div>
      <div class="row-6">
        <div class="col-3">
          <div class="form-group" 
            v-tooltip="selectedType
            ?
              'մեկ ընթացակարգում չի կարող լինել տարբեր գնման ձևերով չափաբաժին'
            :
              ''
            "
          >
            <label class="text-dark" for="type">Գնման Ձև</label>
              <select
                :disabled="selectedType"
                v-model="type"
                name="type"
                id="type"
                :class="{'border-danger': type.$dirty && !type.required}"
                class="form-control">
                <option :key="key" v-for="(type, key) in purchaseTypesForOnePerson" :value="key">{{ type }}</option>
              </select>
          </div>
        </div>
        <!-- <div class="col-6">
          <div class="form-check">
            <input :disabled="selectedIsCondition !== false && selectedIsCondition !== 1" v-model="is_condition" value="1" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
            <label v-tooltip="selectedIsCondition !== false && selectedIsCondition !== 1 ? 'մեկ ընթացակարգում չի կարող լինել պայմանով և առանց պայմանի չափաբաժին':''" class="form-check-label" for="flexRadioDefault1">
              Պայմանով
            </label>
          </div>
          <div class="form-check">
            <input :disabled="selectedIsCondition !== false && selectedIsCondition !== 0" v-model="is_condition" value="0" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
            <label v-tooltip="selectedIsCondition !== false && selectedIsCondition !== 0 ? 'մեկ ընթացակարգում չի կարող լինել պայմանով և առանց պայմանի չափաբաժին':''" class="form-check-label" for="flexRadioDefault2">
              Առանց պայման
            </label>
          </div>
        </div> -->
      </div>
      <div class="d-flex justify-content-end">
        <button @click="convertData" :disabled="isConvertLoading" class="btn btn-primary">
          <span v-if="isConvertLoading" class="mr-1 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Արտածել
        </button>
      </div>
      <table class="table mt-4 responsive-table">
        <thead>
          <tr>
            <th scope="col" style="width: 70px;">Չ/Հ</th>
            <th scope="col">Գնումների պլանով նախատեսված միջանցիկ ծածկագիրն ըստ ԳՄԱ դասակարգման (CPV)</th>
            <th scope="col">Անվանում</th>
            <th scope="col">Անվանում (ռուսերեն)</th>
            <th scope="col">Տեխնիկական բնութագիր</th>
            <th scope="col">Տեխնիկական բնութագիր (ռուսերեն)</th>
            <th scope="col">Չափման միավոր</th>
            <th scope="col">Չափման միավոր (ռուսերեն)</th>
            <th scope="col">Միավոր գին (ՀՀ դրամ)</th>
            <th scope="col">Ընդհանուր քանակ</th>
          </tr>
        </thead>
        <tbody v-if="tableData.length">
          <tr v-for="(row, index) in tableData" :key="index + Math.random()" :class="wrongRows.find(item=>item.cpvCode===row.cpvCode) && 'text-danger'">
            <td>
              <template v-if="row.fromExcel">
                {{ row.lotNumber }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'lotNumber', event.target.value)
                  }"
                  :value="row.lotNumber"
                  v-mask="'###'"
                  type="text"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.cpvCode }}<span v-if="row.cpvDrop">/{{ row.cpvDrop }}</span>
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'cpvCode', event.target.value)
                  }"
                  :value="row.cpvCode"
                  v-mask="'########/###'"
                  type="text"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.cpvNameArm }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'cpvNameArm', event.target.value)
                  }"
                  :value="row.cpvNameArm"
                  type="text"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.cpvNameRu }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'cpvNameRu', event.target.value)
                  }"
                  :value="row.cpvNameRu"
                  type="text"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.specification }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'specification', event.target.value)
                  }"
                  :value="row.specification"
                  type="text"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.specificationRu }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'specificationRu', event.target.value)
                  }"
                  :value="row.specificationRu"
                  type="text"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.unit }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'unit', event.target.value)
                  }"
                  :value="row.unit"
                  type="text"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.unitRu }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'unitRu', event.target.value)
                  }"
                  :value="row.unitRu"
                  type="text"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.unit_amount }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'unit_amount', event.target.value)
                  }"
                  :value="row.unit_amount"
                  type="number"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.count }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'count', event.target.value)
                  }"
                  :value="row.count"
                  type="number"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <div>
                <div class="row d-block">
                  <div class="col-6 mb-2">
                    <button v-if="tableData.length !== 1" @click="removeRow(index)" type="button" class="btn btn-danger">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div v-if="index === tableData.length - 1" class="col-6">
                    <button @click="addRow(index)" type="button" class="btn btn-success">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="modal-footer">
      <button v-if="isAttached" @click="$modal.hide('insert-lots-from-outside-modal')" class="btn btn-light mr-3">
        <span>Փակել</span>
      </button>
      <button v-if="isConverted" @click="save" type="button" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
        <span>Պահպանել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import purchaseTypesForOnePerson from '@/mixins/purchaseTypes'
  export default {
    name: 'InsertLotsFromOutsideModal',
    mixins: [purchaseTypesForOnePerson],
    components: {
    },
    data() {
      return {
        isLoading: false,
        isAttached: false,
        isConvertLoading: false,
        copiedExcelSheet: '',
        selectedType: false,
        selectedIsCondition: false,
        tableData: [
          {
            lotNumber: '',
            cpvCode: '',
            cpvNameArm: '',
            cpvNameRu: '',
            specification: '',
            specificationRu: '',
            unit: '',
            unitRu: '',
            unit_amount: '',
            count: '',
            fromExcel: false
          },
        ],
        wrongRows: [],
        halfDoneRows: [],
        rowsData: [],
        is_condition: 1,
        type: 1,
      }
    },
    computed: {
      isConverted() {
        return !!this.tableData.length
      }
    },
    methods: {
      resetComponent() {
        Object.assign(this.$data, this.getModalInitialState())
      },
      getModalInitialState(){
        return {
          isLoading: false,
          isConvertLoading: false,
          isAttached: false,
          copiedExcelSheet: '',
          selectedType: false,
          selectedIsCondition: false,
          rowsData: [],
          tableData: [
            {
              lotNumber: '',
              cpvCode: '',
              cpvNameArm: '',
              cpvNameRu: '',
              specification: '',
              specificationRu: '',
              unit: '',
              unitRu: '',
              unit_amount: '',
              count: '',
              fromExcel: false
            },
          ],
          wrongRows: [],
          halfDoneRows: [],
          is_condition: 1,
          type: 1,
        }
      },
      changeInputsName(index, colIndex, value) {
        this.tableData[index][colIndex] = value
      },
      beforeOpen(event) {
        if(event.params.length){
          this.selectedLots = event.params
          this.type = event.params[0].type
          this.is_condition = event.params[0].is_condition
          this.selectedType = event.params[0].type
          this.selectedIsCondition = event.params[0].is_condition
        }
      },
      removeRow(index){
        this.rowsData.splice(index, 1)
        this.tableData.splice(index, 1)
        this.halfDoneRows = [];
      },
      addRow(){
        this.rowsData.push({
          lotNumber: '',
          cpvCode: '',
          cpvNameArm: '',
          cpvNameRu: '',
          specification: '',
          specificationRu: '',
          unit: '',
          unitRu: '',
          unit_amount: '',
          count: '',
          fromExcel: false
        })
        this.tableData.push({
          lotNumber: '',
          cpvCode: '',
          cpvNameArm: '',
          cpvNameRu: '',
          specification: '',
          specificationRu: '',
          unit: '',
          unitRu: '',
          unit_amount: '',
          count: '',
          fromExcel: false
        })
      },
      convertData() {
        this.isConvertLoading = true;
        if(this.copiedExcelSheet.length) {
          this.$client.post('parseRowsFromExel', {
            string: this.copiedExcelSheet.replace(') "', ') ')
          }).then(({data}) => {
            const rows = data;
            const rowModel = {
              lotNumber: '',
              cpvCode: '',
              cpvNameArm: '',
              cpvNameRu: '',
              specification: '',
              specificationRu: '',
              unit: '',
              unitRu: '',
              unit_amount: '',
              count: '',
            }

            const rowsData = []

            let isDataInvalid = false

            for(const rowString of rows) {
              if(!rowString.length) {
                continue
              }
              const columns = rowString.split(String.fromCharCode(9))
              const rowModelKeys = Object.keys(rowModel)

              if(columns.filter((col) =>col!=="").length !== rowModelKeys.length) {
                isDataInvalid = true
                break
              }
              const row = rowModelKeys.reduce((obj, key, index) => {
                obj[key] = columns[index]
                return obj
              }, {})

              const parsedCpvCode =  row.cpvCode.toString().split('/')[0];
              const parsedCpvDrop =  row.cpvCode.toString().split('/')[1];
              row.cpvCode = parsedCpvCode;
              row.cpvDrop = parsedCpvDrop;
              row.fromExcel = true;
              rowsData.push(row);
            }

            if(isDataInvalid) {
              this.tableData = []
              this.isConvertLoading = false;
              this.$notify({
                group: 'foo',
                type: 'error',
                text: 'Մուտքագրված տվյալները սխալ են'
              })
            } else {
              rowsData.sort(function (a, b) {
                if (+a.lotNumber > +b.lotNumber) {
                  return 1;
                }
                if (+a.lotNumber < +b.lotNumber) {
                  return -1;
                }
                return 0;
              });
              this.tableData = rowsData
              this.checkData();
            }
          })
          // const rows = this.copiedExcelSheet.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+([^"]|"")*)"/mg, function (match, p1) {
          //    return p1
          //         .replace(/""/g, '"')
          //         .replace(/\r\n|\n\r|\n|\r/g, ' ')
          //     ;
          // }).split(/\r\n|\n\r|\n|\r/g);
          
        
        } else {
          this.isConvertLoading = false;
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Դուք չեք մուտքագրել տվյալները'
          })
        }
      },
      async checkData(){
        var rowsData=[];
        this.wrongRows=[];
        this.halfDoneRows=[];
        let existingCpvs = []
        const cpvCodesArray = this.tableData.map(item => item.cpvCode);
        await this.$client.post(`cpv/searchArray`, cpvCodesArray).then(async({data}) => {
          existingCpvs = [...data]
        })
        await this.tableData.forEach(async(tableRow) => {
          if(
            tableRow.lotNumber !== '' &&
            tableRow.cpvCode !== '' &&
            tableRow.cpvNameArm !== '' &&
            tableRow.cpvNameRu !== '' &&
            tableRow.specification !== '' &&
            tableRow.specificationRu !== '' &&
            tableRow.unit !== '' &&
            tableRow.unitRu !== '' &&
            tableRow.unit_amount !== '' &&
            tableRow.count !== ''
          ){
            const parsedCpvCode = tableRow.cpvCode.split('/')[0];
            const parsedCpvDrop = tableRow.cpvCode.split('/')[1] || tableRow.cpvDrop || '';
            tableRow.cpvCode = parsedCpvCode;
            tableRow.cpvDrop = parsedCpvDrop;
            const data = existingCpvs.find(cpv => +cpv.code === +parsedCpvCode)

            const obj = {
              ...tableRow, 
              cpvId: data ? data.id : 0, 
              organize_id: this.$route.params.id, 
              type: this.type, 
              is_condition: this.is_condition
            }
            await rowsData.push(obj);
            if(!data){
              this.isLoading = false;
              await this.wrongRows.push(tableRow)
            }
            this.isConvertLoading = false;
          } else {
            this.isLoading = false;
            await this.halfDoneRows.push(tableRow)
          }
        })
        this.rowsData = rowsData;
      },
      showError(){
        this.$notify({
          group: 'foo',
          type: 'error',
          title: `Կա սխալ CPV կոդ`,
          text: 'Կրկին փորձեք!'
        })
      },
      consoleLog(msg) {
        console.log(msg)
      },
      async sendSaveRequest(rowsData) {
        if(rowsData.length === this.tableData.length) {
          rowsData.sort(function (a, b) {
            if (+a.lotNumber > +b.lotNumber) {
              return 1;
            }
            if (+a.lotNumber < +b.lotNumber) {
              return -1;
            }
            return 0;
          });
          this.$client.post('organize-row-array/fromExcel', { data: rowsData }).then(({ data }) => {
              this.isLoading = false;
              if(data.status) {
                this.$store.dispatch('organizeOnePerson/getRows', {organizeId: this.$route.params.id})
                this.$store.dispatch('organize/getRows', {organizeId: this.$route.params.id})
                this.$modal.hide('insert-lots-from-outside-modal')
              }
          })
        }
      },
      async checkWrongRows() {
        if(this.wrongRows.length){
          this.$notify({
            group: 'foo',
            type: 'error',
            title: `Կա սխալ CPV կոդ`,
            text: 'Կրկին փորձեք!'
          })
        } 
      },
      async save() {
        this.isLoading = true;
        if(this.rowsData.length === 0){
          await this.checkData();
        }
        if(this.halfDoneRows.length){
          this.isLoading = false;
          this.$notify({
            group: 'foo',
            type: 'error',
            title: `Լրացրեք չափաբաժինների բոլոր տվյալները`,
            text: 'Կրկին փորձեք!'
          })
        } else {
          setTimeout(async() => {
            await this.sendSaveRequest(this.rowsData)
          }, 1000);
        };
      }
    }
  }
</script>
<style scoped>
.responsive-table *{
  font-size: 13px;
}
.steps ol {
  list-style-type: none;
  counter-reset: elementcounter;
  padding-left: 0;
}

.steps span{
  display: inline-block;
}
.steps li:before {
  content: "Քայլ " counter(elementcounter) ". ";
  counter-increment: elementcounter;
  font-weight: bold;
}
</style>