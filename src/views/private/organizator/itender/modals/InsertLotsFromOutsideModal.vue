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
      <div class="row p-0 m-0">
        <div class="col-12 row p-0 m-0 mobile-fit-content">
          <div class="col-md-6 p-0 steps-block">
            <span class="attention">Ուշադրություն!</span>
            <div class="steps">
              <span aria-expanded="false"><span class="step-number">{{!isMobile ? 'Քայլ' : ''}} 1.</span> 
                Ներբեռնեք գնման հայտի օրինակը
                <a style="margin-left: 8px" id="doc" href="/assets/dashboard/assets/files/lots_excel_example.xlsx">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 1.7002H7.0464C6.4686 1.7002 6 2.1688 6 2.7466V7.102H15V1.7002Z" fill="#169154"/>
                <path d="M6 17.9326V22.2538C6 22.8316 6.4686 23.3002 7.0458 23.3002H15V17.9326H6Z" fill="#18482A"/>
                <path d="M6 7.10156H15V12.5028H6V7.10156Z" fill="#0C8045"/>
                <path d="M6 12.5029H15V17.9329H6V12.5029Z" fill="#17472A"/>
                <path d="M22.9536 1.7002H15V7.102H24V2.7466C24 2.1688 23.5314 1.7002 22.9536 1.7002Z" fill="#29C27F"/>
                <path d="M15 17.9326V23.3002H22.9542C23.5314 23.3002 24 22.8316 24 22.2544V17.9332H15V17.9326Z" fill="#27663F"/>
                <path d="M15 7.10156H24V12.5028H15V7.10156Z" fill="#19AC65"/>
                <path d="M15 12.5029H24V17.9329H15V12.5029Z" fill="#129652"/>
                <path d="M10.9914 18.5H1.0086C0.4518 18.5 0 18.0482 0 17.4914V7.5086C0 6.9518 0.4518 6.5 1.0086 6.5H10.9914C11.5482 6.5 12 6.9518 12 7.5086V17.4914C12 18.0482 11.5482 18.5 10.9914 18.5Z" fill="#0C7238"/>
                <path d="M3.48403 9.5H4.91563L6.07723 11.7524L7.30483 9.5H8.64223L6.79963 12.5L8.68423 15.5H7.27363L6.00763 13.142L4.74703 15.5H3.31543L5.23123 12.4892L3.48403 9.5Z" fill="white"/>
                </svg>
                </a>
              </span>
              <span aria-expanded="false"><span class="step-number">{{!isMobile ? 'Քայլ' : ''}} 2.</span> 
                Ծանոթանալ CPV կոդերի ցանկին
                <a style="margin-left: 8px" id="doc" href="/assets/dashboard/assets/files/CPV_list.xlsx">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 1.7002H7.0464C6.4686 1.7002 6 2.1688 6 2.7466V7.102H15V1.7002Z" fill="#169154"/>
                <path d="M6 17.9326V22.2538C6 22.8316 6.4686 23.3002 7.0458 23.3002H15V17.9326H6Z" fill="#18482A"/>
                <path d="M6 7.10156H15V12.5028H6V7.10156Z" fill="#0C8045"/>
                <path d="M6 12.5029H15V17.9329H6V12.5029Z" fill="#17472A"/>
                <path d="M22.9536 1.7002H15V7.102H24V2.7466C24 2.1688 23.5314 1.7002 22.9536 1.7002Z" fill="#29C27F"/>
                <path d="M15 17.9326V23.3002H22.9542C23.5314 23.3002 24 22.8316 24 22.2544V17.9332H15V17.9326Z" fill="#27663F"/>
                <path d="M15 7.10156H24V12.5028H15V7.10156Z" fill="#19AC65"/>
                <path d="M15 12.5029H24V17.9329H15V12.5029Z" fill="#129652"/>
                <path d="M10.9914 18.5H1.0086C0.4518 18.5 0 18.0482 0 17.4914V7.5086C0 6.9518 0.4518 6.5 1.0086 6.5H10.9914C11.5482 6.5 12 6.9518 12 7.5086V17.4914C12 18.0482 11.5482 18.5 10.9914 18.5Z" fill="#0C7238"/>
                <path d="M3.48403 9.5H4.91563L6.07723 11.7524L7.30483 9.5H8.64223L6.79963 12.5L8.68423 15.5H7.27363L6.00763 13.142L4.74703 15.5H3.31543L5.23123 12.4892L3.48403 9.5Z" fill="white"/>
                </svg>
                </a>
              </span>
              <span><span class="step-number">{{!isMobile ? 'Քայլ' : ''}} 3.</span> Լրացրեք բոլոր դաշտերը</span>
              <span><span class="step-number">{{!isMobile ? 'Քայլ' : ''}} 4.</span> Պատճենեք Ձեր Excel ֆայլից աղյուսակը և մուտքագրեք այստեղ</span>
              <span><span class="step-number">{{!isMobile ? 'Քայլ' : ''}} 5.</span> Ընտրեք մրցույթի ձևը</span>
            </div>
          </div>
          <div class="col-md-6 contract-details-input-group-right h-100">
            <div class="m-0 h-100">
              <float-label class="h-100">
                  <textarea
                    placeholder="Պատճենեք ձեր excel ֆայլից աղյուսակը և մուտքագրեք այստեղ"
                    v-model="copiedExcelSheet"
                    rows="4"
                    id="other-requirements"
                    class="tender-input h-100 m-0 py-2 br-8"
                ></textarea>
              </float-label>
            </div>
          </div>
        </div>
        <div style="margin: 16px 0 48px 0" class="col-12 row p-0 justify-content-end">
          <div class="col-auto p-0">
            <div class="d-flex justify-content-end">
              <button @click="convertData" class="btn br-8 btn-primary btn-parse">
                <span>Արտածել</span>
              </button>
            </div>
          </div>
        </div>

        <div class="col-12 row m-0 p-0 contract-details-form">
          <div class="col-md-6 form-group contract-details-input-group-left">
            <div class="form-group" 
              v-tooltip="selectedType
              ?
                'մեկ ընթացակարգում չի կարող լինել տարբեր գնման ձևերով չափաբաժին'
              :
                ''
              "
            >
              <float-label>
                <select
                  :disabled="selectedType"
                  v-model="type"
                  name="type"
                  id="type"
                  :class="{'border-danger': type.$dirty && !type.required}"
                  class="tender-input form-control m-0 br-12">
                  <option disabled selected>Մրցույթի Ձև</option>
                  <option :disabled="key == 2" :key="key" v-for="(type, key) in purchaseTypesForItenderLongNames" :value="key">
                    {{ type }}
                  </option>
                </select>
              </float-label>
            </div>
          </div>
          <div v-if="+type === 2" class="col-md-6 form-group contract-details-input-group-right">
            <div class="form-group">
              <float-label>
                <select
                  v-model="auctionSteps"
                  name="type"
                  id="type"
                  :class="{'border-danger': type.$dirty && !type.required}"
                  class="form-control">
                  <option disabled selected>Քայլերը</option>
                  <option value="0.5">0.5%</option>
                  <option value="1">1%</option>
                  <option value="1.5">1.5%</option>
                  <option value="2">2%</option>
                  <option value="2.5">2.5%</option>
                  <option value="3">3%</option>
                  <option value="3.5">3.5%</option>
                  <option value="4">4%</option>
                  <option value="4.5">4.5%</option>
                  <option value="5 ">5%</option>
                </select>
              </float-label>
            </div>
          </div>

        </div>

        <div class="col-12 p-0" style="margin-bottom: 5px;">
          <div style=" margin-bottom: 20px;" class="d-flex justify-content-between align-items-center">
            <span class="table-title d-block">Գնման առարկա</span>
            <button @click="addRow(tableData.length - 1)" type="button" :class="!isMobile && 'd-none'" class="btn btn-primary plus-btn">
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 7.42507L13.5 5.57491H7.92503V0H6.07488V5.57491H0.5V7.42507H6.07488V13H7.92503L7.92503 7.42507H13.5Z" fill="white"/>
              </svg>
            </button>
          </div>
          <v-client-table :key="specificationChangeKey" ref="vtable" :columns="columns" v-model="tableData" :options="options">
            <div slot="index_num" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.lotNumber }}
              </template>
              <template v-else>
                <input
                  @click="(e) => e.stopPropagation()"
                  @change="(event) => {
                    changeInputsName(index - 1, 'lotNumber', event.target.value)
                  }"
                  :value="row.lotNumber"
                  v-mask="'###'"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="cpvCodeSelect" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.cpvCode }}<span v-if="row.cpvDrop">/{{ row.cpvDrop }}</span>
              </template>
              <template v-else>
                <input
                  @click="(e) => e.stopPropagation()"
                  @change="(event) => {
                    changeInputsName(index - 1, 'cpvCode', event.target.value)
                  }"
                  :value="row.cpvCode"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="cpvNameArm" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.cpvNameArm }}
              </template>
              <template v-else>
                <input
                  @click="(e) => e.stopPropagation()"
                  @change="(event) => {
                    changeInputsName(index - 1, 'cpvNameArm', event.target.value)
                  }"
                  :value="row.cpvNameArm"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="cpvNameRu" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.cpvNameRu }}
              </template>
              <template v-else>
                <input
                  @click="(e) => e.stopPropagation()"
                  @change="(event) => {
                    changeInputsName(index - 1, 'cpvNameRu', event.target.value)
                  }"
                  :value="row.cpvNameRu"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="specification" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.specification }}
              </template>
              <template v-else>
                <button 
                  v-if="row.cpvId" 
                  @click="$modal.show('specification-modal', {
                    specificationsId: row.specifications_id,
                    cpvId: row.cpvId
                  })"
                  type="button"
                  :class="{
                    'btn-primary': row.specifications_id,
                    'btn-secondary': !row.specifications_id,
                  }"
                  class="btn btn-square btn-outline-dashed waves-effect waves-light modal03"
                >
                  <i class="fa fa-check"></i>
                </button>
                <input
                  v-else
                  @click="(e) => e.stopPropagation()"
                  @change="(event) => {
                    changeInputsName(index - 1, 'specification', event.target.value)
                  }"
                  :value="row.specification"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="specificationRu" slot-scope="{row, index}">
              <template v-if="!row.cpvId">
                <template v-if="row.fromExcel">
                  {{ row.specificationRu }}
                </template>
                <template v-else>
                  <input
                    @click="(e) => e.stopPropagation()"
                    @change="(event) => {
                      changeInputsName(index - 1, 'specificationRu', event.target.value)
                    }"
                    :value="row.specificationRu"
                    type="text"
                    class="form-control"
                  >
                </template>
              </template>
            </div>
            <div slot="unit" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.unit }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index - 1, 'unit', event.target.value)
                  }"
                  :value="row.unit"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="unitRu" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.unitRu }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index - 1, 'unitRu', event.target.value);
                  }"
                  :value="row.unitRu"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="unit_amount" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.unit_amount }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index - 1, 'unit_amount', event.target.value);
                  }"
                  :value="row.unit_amount"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="count" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.count }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index - 1, 'count', event.target.value);
                  }"
                  :value="row.count"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="action" slot-scope="{index}">
              <div style="width: 40px">
                <div class="d-block">
                  <button v-if="tableData.length !== 1" @click="removeRow(index - 1)" type="button" :class="index - 1 === tableData.length - 1 && 'mb-2'" class="btn btn-light text-danger minus-btn">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  <button v-if="index - 1 === tableData.length - 1 & !isMobile"  @click="addRow(index - 1)" type="button" class="btn btn-primary plus-btn">
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 7.42507L13.5 5.57491H7.92503V0H6.07488V5.57491H0.5V7.42507H6.07488V13H7.92503L7.92503 7.42507H13.5Z" fill="white"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </v-client-table>
        </div>
      </div>
    </div>
    <div id="modal-footer">
      <button v-if="isAttached" @click="$modal.hide('insert-lots-from-outside-modal')" class="btn btn-light mr-3">
        Փակել
      </button>
      <button v-if="isConverted" @click="save" type="button" class="btn btn-primary" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
        <span>Պահպանել</span>
      </button>
    </div>
    <specification-modal @close="setSpecificationId" />
  </modal>
</template>

<script>
  import purchaseTypesForItenderLongNames from '@/mixins/purchaseTypes'
  import SpecificationModal from './SpecificationModal'
  import isMobile from '@/mixins/isMobileView'
  export default {
    name: 'InsertLotsFromOutsideModal',
    mixins: [purchaseTypesForItenderLongNames, isMobile],
    components: {SpecificationModal},
    data() {
      return {
        specificationChangeKey: 0,
        isLoading: false,
        isAttached: false,
        isConvertLoading: false,
        copiedExcelSheet: '',
        selectedType: false,
        selectedIsCondition: false,
        auctionSteps: "0.5",
        columns: [
            'index_num',
            'cpvCodeSelect',
            'cpvNameArm',
            'cpvNameRu',
            'specification',
            'specificationRu',
            'unit',
            'unitRu',
            'unit_amount',
            'count',
            'action'
          ],
          options: {
            sortable: [],
            perPage: 1000,
            perPageValues: [],
            columnsDropdown: false,
            filterByColumn: false,
            skin: 'table table-striped table-border-radius',
            dateFormat: "YYYY-mm-dd",
            headings: {
              index_num: 'Հ/Հ',
              cpvCodeSelect: 'Չափաբաժնի ծածկագիր *',
              cpvNameArm: 'Անվանում *',
              cpvNameRu: 'Անվանում (ռուսերեն)',
              specification: 'Տեխնիկական բնութագիր *',
              specificationRu: 'Տեխնիկական բնութագիր (ռուսերեն)',
              unit: 'Չափման միավոր*',
              unitRu: 'Չափման միավոր (ռուսերեն)',
              unit_amount: 'Միավոր գին* (ՀՀ դրամ)',
              count: 'Ընդհանուր քանակ*',
              action: '',
            },
            filterable: false
          },
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
      },
      currentOrganized() {
        return this.$store.getters['organizeItender/currentOrganized']
      },
    },
    methods: {
      setSpecificationId(params) {
        console.log(params)
        const index = this.tableData.findIndex(cpv => cpv.cpvId === params.cpvId)
        this.changeInputsName(index , 'specifications_id',  params.specificationId)
        this.specificationChangeKey = this.specificationChangeKey + 1;
      },
      resetComponent() {
        Object.assign(this.$data, this.getModalInitialState())
      },
      handleAddRows(rows){
        const isEmpty = this.tableData.length === 1 && Boolean(Object.values(this.tableData[0]).filter((item, index) => index > 0 && item !== "" && item !== false).length === 0)
        if(isEmpty){
          this.tableData = [];
        }
        rows.forEach((row) => {
          const lotIndex = this.tableData[this.tableData.length - 1] ? +this.tableData[this.tableData.length - 1].lotNumber + 1 : 1;
          const rowObj = {
            cpvId: row.id,
            lotNumber: lotIndex,
            cpvCode: row.code,
            cpvNameArm: row.name,
            cpvNameRu: row.name_ru || '',
            specification: '',
            specificationRu: '',
            unit: row.unit || '',
            unitRu: row.unit_ru || '',
            unit_amount: '',
            count: '',
            fromExcel: false
          };
          this.tableData.push(rowObj)
        })
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
          this.auctionSteps = this.currentOrganized.auction_step
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
        
        this.$modal.show('add-cpv-modal', this.handleAddRows)
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
            (tableRow.specification !== '' || tableRow.specifications_id) &&
            tableRow.unit !== '' &&
            tableRow.unit_amount !== '' &&
            tableRow.count !== ''
          ){
            const parsedCpvCode = tableRow.cpvCode.split('/')[0];
            const parsedCpvDrop = tableRow.cpvCode.split('/')[1] || tableRow.cpvDrop || '';
            tableRow.cpvCode = parsedCpvCode;
            tableRow.cpvDrop = parsedCpvDrop;
            tableRow.cpvNameRu = tableRow.cpvNameRu || ' ';
            tableRow.specificationRu = tableRow.specificationRu || ' ';
            tableRow.unitRu = tableRow.unitRu || ' ';
            
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
                // this.$store.dispatch('organizeItender/update', {id: this.currentOrganized.id, data: {auction_step: this.auctionSteps}}).then((response) => {
                //   console.log(response)
                // })
                this.$store.dispatch('organizeItender/getRows', {organizeId: this.$route.params.id})
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
          if(this.rowsData.length === 0){
            await this.checkData();
          }
          setTimeout(async() => {
            await this.sendSaveRequest(this.rowsData)
          }, 1000);
        };
      }
    }
  }
</script>

<style>

</style>

<style scoped>
#modal-body{
  padding: 28px 20px 20px 30px;
}
.steps ol {
  list-style-type: none;
  counter-reset: elementcounter;
  padding-left: 0;
}

.steps li:before {
  content: "Քայլ " counter(elementcounter) ". ";
  counter-increment: elementcounter;
  font-weight: bold;
}
@media only screen and (max-width: 500px) {
  #modal-body{
    padding: 24px 20px;
  }
}
</style>