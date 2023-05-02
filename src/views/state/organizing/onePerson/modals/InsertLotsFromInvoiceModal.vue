<template>
  <modal 
    class="insert-lots-from-invoice-modal"
    name="insert-lots-from-invoice-modal"
    @before-close="resetComponent"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="90%"
    height="90%"
  >
    <div id="modal-header" style="background-color:#006BE6">
      <div class="w-75 d-flex text-white">
        <p>Չափաբաժինների մուտքագրում հաշիվ ապրանքագրերից</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('insert-lots-from-invoice-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ffffff"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="row">
        <div class="col-6 steps">
          <span class="h5">Ուշադրություն!</span>
          <ol>
            <li class="mb-2">
              <span class="mr-2">Վերբեռնեք XML ֆայլը</span>
              <label class="mb-0" :class="uploadXMLFileLoading && 'disabled'" style="cursor: pointer;">
                <i v-if="uploadXMLFileLoaded" class="fas fa-clipboard-check text-success font-30"></i>
                <i v-else class="fa fa-file-upload text-secondary font-30"></i>
                <input ref="XMLFileInput" @click="resetXMLFileInput" @change="handleXMLUploadFile" type="file" accept=".xml" hidden>
                <span v-if="uploadXMLFileLoading" class="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </label>
              <span v-if="uploadedXMLFileName" class="ml-2 h6">
                <small>{{uploadedXMLFileName}}</small>
              </span>
                <!-- <i class="fas fa-check-square text-success font-30"></i> -->
            </li>
            <li class="mb-2">
              <span class="mr-2">Ներբեռնեք գնման հայտի օրինակը</span>
              <a id="doc" :href="uploadXMLFileLoaded ? `${backendUrl}rows-example/export?rows=${JSON.stringify(tableData)}` : '/assets/dashboard/assets/files/lots_excel_example.xlsx'">
                <i class="far fa-file-excel text-success font-30"></i>
              </a>
            </li>
            <li class="mb-2">
              <span class="mr-2">Լրացրեք աղյուսակի բոլոր դաշտերը և վերբեռնեք</span>
              <label class="mb-0" :class="uploadXLSXFileLoading && 'disabled'" style="cursor: pointer;">
                <i v-if="uploadXLSXFileLoaded" class="fas fa-clipboard-check text-success font-30"></i>
                <i v-else class="fa fa-file-upload text-secondary font-30"></i>
                <input ref="XLSXFileInput" @click="resetXLSXFileInput" @change="handleXLSXUploadFile" type="file" accept=".xlsx" hidden>
                <span v-if="uploadXLSXFileLoading" class="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </label>
              <span v-if="uploadedXLSXFileName" class="ml-2 h6">
                <small>{{uploadedXLSXFileName}}</small>
              </span>
            </li>
            <span class="mb-2">Ընտրել մուտքագրված չափաբաժինների գնման ձևը</span>
          </ol>
        </div>
        <div class="col-6">
          <p class="h5 mb-2">Պայմնագրի կողմի՝</p>
          <ul>
            <li class="mb-2">ՀՎՀՀ՝ <b>{{participantData.tin}}</b></li>
            <li class="mb-2">Անվանումը՝ <b>{{participantData.name}}</b></li>
            <li class="mb-2">Հասցե՝ <b>{{participantData.address}}</b></li>
            <li class="mb-2">Բանկ / Գանձապետարան՝ <b>{{participantData.bank}}</b></li>
            <li class="mb-2">Հաշվեհամար՝ <b>{{participantData.account_number}}</b></li>
          </ul>
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
      </div>
      <table class="table mt-4">
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
            <th scope="col">Ընդհանուր քանակ</th>
            <th scope="col">Միավոր գին (ՀՀ դրամ)</th>
            <th scope="col">Արժեք (ՀՀ դրամ)</th>
            <th scope="col">ԱԱՀ (ՀՀ դրամ)</th>
            <th scope="col">Ընդհանուր գին (ՀՀ դրամ)</th>
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
                {{ row.amount }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'amount', event.target.value)
                  }"
                  :value="row.amount"
                  type="number"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.vat }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'vat', event.target.value)
                  }"
                  :value="row.vat"
                  type="number"
                  class="form-control"
                >
              </template>
            </td>
            <td>
              <template v-if="row.fromExcel">
                {{ row.total }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index, 'total', event.target.value)
                  }"
                  :value="row.total"
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
      <button v-if="isAttached" @click="$modal.hide('insert-lots-from-invoice-modal')" class="btn btn-light mr-3">
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
    name: 'InsertLotsFromInvoiceModal',
    mixins: [purchaseTypesForOnePerson],
    components: {
    },
    data() {
      return this.getModalInitialState();
    },
    computed: {
      isConverted() {
        return !!this.tableData.length
      },
      currentOrganized() {
        return this.$store.getters['organizeOnePerson/currentOrganized']
      },
      organizedRows() {
        return this.$store.getters['organize/organizedRows']
      }
    },
    methods: {
      resetXMLFileInput() {
        this.$refs.XMLFileInput.value = '';
        this.uploadedXMLFileName = false;
        this.uploadXMLFileLoaded = false;
      },
      resetXLSXFileInput() {
        this.$refs.XLSXFileInput.value = '';
        this.uploadedXLSXFileName = false;
        this.uploadXLSXFileLoaded = false;
      },
      handleXMLUploadFile(event){
        this.tableKey = this.tableKey + 1;
        const file = event.target.files[0]
        if(file.size < 100000000){
          this.uploadXMLFileLoading = true;
          const uploadedFile = file;
          const formData = new FormData();
          formData.append('file', uploadedFile);
          this.$client.post(`organize-oneperson/uploadInvoiceFile/${this.currentOrganized.id}`, formData).then((response) => {
            const { data, status } = response.data;
            this.additionalFile = data.additional_file;
            if(status){
              this.participantData = data.participant;
              const isEmpty = this.tableData.length === 1 && Boolean(Object.values(this.tableData[0]).filter((item, index) => index > 0 && item !== "" && item !== false).length === 0)
              if(isEmpty){
                this.tableData = [];
              }
              data.rows.forEach((row) => {
                this.tableData.push({
                  lotNumber: row.lotNumber,
                  cpvCode: '',
                  cpvNameArm: row.cpvNameArm,
                  cpvNameRu: '',
                  specification: '',
                  specificationRu: '',
                  unit: row.unit,
                  unitRu: '',
                  unit_amount: row.total / row.count,
                  count: row.count,
                  total: row.total,
                  vat: row.vat,
                  amount: row.amount,
                  fromExcel: false
                })
              })
              this.uploadXMLFileLoading = false;
              this.uploadXMLFileLoaded = true;
              this.$store.dispatch('organizeOnePerson/getCurrent', this.$route.params.id)
              this.$store.dispatch('organizeOnePerson/getRows', {organizeId: this.$route.params.id})
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ ավելացված է'
              })
            }
          }).catch((value) => {
            this.uploadXMLFileLoading = false;
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          })
          this.uploadedXMLFileName = file.name;
        } else {
          this.uploadXMLFileLoading = false;
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Ընտրված ֆայլի առավելագույն ծավալը պետք է լինի 10ՄԲ'
          })
        }
      },
      handleXLSXUploadFile(event){
        this.tableKey = this.tableKey + 1;
        const file = event.target.files[0]
        if(file.size < 100000000){
          this.uploadXLSXFileLoading = true;
          const uploadedFile = file;
          const formData = new FormData();
          formData.append('file', uploadedFile);
          this.$client.post(`organize-oneperson/uploadRowsFile/${this.currentOrganized.id}`, formData).then((response) => {
            const { data, status } = response.data;
            if(status){
              const rows = data[0].slice(2, data[0].length);
              this.uploadXLSXFileLoading = false;
              this.uploadXLSXFileLoaded = true;
              this.convertData(rows);
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ ավելացված է'
              })
            }
          }).catch((value) => {
            this.uploadXLSXFileLoading = false;
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          })
          this.uploadedXLSXFileName = file.name;
        } else {
          this.uploadXLSXFileLoading = false;
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Ընտրված ֆայլի առավելագույն ծավալը պետք է լինի 10ՄԲ'
          })
        }
      },
      resetComponent() {
        Object.assign(this.$data, this.getModalInitialState())
      },
      getModalInitialState(){
        return {
          backendUrl: process.env.VUE_APP_URL,
          isLoading: false,
          isAttached: false,
          uploadedXMLFileName: false,
          uploadXMLFileLoading: false,
          uploadXMLFileLoaded: false,
          uploadedXLSXFileName: false,
          uploadXLSXFileLoading: false,
          uploadXLSXFileLoaded: false,
          isConvertLoading: false,
          copiedExcelSheet: '',
          selectedType: false,
          selectedIsCondition: false,
          participantData: {
            tin: '',
            name: '',
            address: '',
            account_number: '',
            bank: '',
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
          total: '',
          vat: '',
          amount: '',
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
          total: '',
          vat: '',
          amount: '',
          count: '',
          fromExcel: false
        })
      },
      convertData(rows) {
        this.isConvertLoading = true;
        const rowModel = {
          lotNumber: '',
          cpvCode: '',
          cpvNameArm: '',
          cpvNameRu: '',
          specification: '',
          specificationRu: '',
          unit: '',
          unitRu: '',
          count: '',
          unit_amount: '',
          amount: '',
          vat: '',
          total: '',
        }

        const rowsData = []

        let isDataInvalid = false

        for(const columns of rows) {
          const rowModelKeys = Object.keys(rowModel)

          if(columns.filter((col) =>col!=="").length !== rowModelKeys.length) {
            isDataInvalid = true
            break
          }
          const row = rowModelKeys.reduce((obj, key, index) => {
            obj[key] = columns[index]
            return obj
          }, {})

          const parsedCpvCode = row.cpvCode.toString().split('/')[0];
          const parsedCpvDrop = row.cpvCode.toString().split('/')[1];
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
            tableRow.total !== '' &&
            tableRow.vat !== '' &&
            tableRow.amount !== '' &&
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
          this.$client.post(`organize-row/deleteArray`, this.organizedRows.map(item => item.id))
          this.$client.post('organize-row-array/fromExcel', { data: rowsData }).then(({ data }) => {
            this.isLoading = false;
            if(data.status) {
              this.createWinnerParticipantGroup(data.data)
              this.$store.dispatch('organizeOnePerson/getRows', {organizeId: this.$route.params.id})
              this.$store.dispatch('organize/getRows', {organizeId: this.$route.params.id})
              this.$modal.hide('insert-lots-from-invoice-modal')
            }
          })
        }
      },
      createWinnerParticipantGroup(rows){
        const lots = [];
        this.tableData.forEach((row, index) => {
          const organizeRow = rows[index]
          lots.push({
            view_id: organizeRow.view_id,
            cpv_code: row.cpvCode,
            cpv_drop: 0,
            cpv_name: row.cpvNameArm,
            is_satisfactory: 1,
            is_with_vat: row.vat ? 1 : 0,
            organize_row_id: organizeRow.id,
            overall: +row.total,
            value: row.amount,
            vat: row.vat ? row.vat : 0,
          })
        })
        const participantGroupRequestData = Object.assign({
          organize_id: this.currentOrganized.id,
          account_number: this.participantData.account_number,
          bank: this.participantData.bank,
          id: 0,
          is_cooperation: 0,
          is_agency_agreement: 0,
          user_id: 0,
        }, {
          participant: [{
            tin: this.participantData.tin,
            name: {
              hy: this.participantData.name,
              ru: ''
            },
            address: {
              hy: this.participantData.address,
              ru: ''
            },
            email: '',
            phone: '',
            date_of_submission: '',
          }],
          lots: lots
        })
        this.$client.post('participant-group/createInvoiceParticipantGroup', participantGroupRequestData).then(response => {
          this.$notify({
            group: 'foo',
            type: 'success',
            text: 'Հաջողությամբ պահպանված է'
          })
        }).catch(e => {
          this.isSaving = false
        })
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