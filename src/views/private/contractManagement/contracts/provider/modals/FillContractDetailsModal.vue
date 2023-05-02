<template>
  <modal 
    class="fill-contract-details-modal"
    name="fill-contract-details-modal"
    @closed="$emit('updateComparisonData')"
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
        <p style="font-weight: 400;">Լրացնել պայմանագրի մանրամասներ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('fill-contract-details-modal')" aria-label="Close">
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
            <span class="d-block" style="margin-bottom: 18px">Կնքված պայմանագրի տվյալների մուտքագրում կցելով Excel ֆայլ </span>
            <div class="steps">
              <span aria-expanded="false"><span class="step-number">1.</span> 
                Ներբեռնեք օրինակը
                <a style="margin-left: 8px" id="doc" href="/assets/dashboard/assets/files/Ակտեր.xlsx">
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
              <span><span class="step-number">2.</span> Լրացրեք բոլոր դաշտերը</span>
              <span><span class="step-number">3.</span> Պատճենեք Ձեր Excel ֆայլից աղյուսակը և մուտքագրեք այստեղ</span>
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
            <float-label>
              <input
                v-model="$v.contract.client_address.$model"
                placeholder="Պատվիրատուի հասցեն"
                type="text"
                class="tender-input m-0"
              />
            </float-label>
          </div>
          <div class="col-md-6 form-group contract-details-input-group-right">
            <float-label>
              <input
                v-model="$v.contract.name.$model"
                placeholder="Պայմանագրի անվանումը"
                type="text"
                class="tender-input m-0"
              />
            </float-label>
          </div>
          <div class="col-md-6 form-group contract-details-input-group-left">
            <div class="vfl-has-label">
              <label class="vfl-label" :class="$v.contract.sign_date.$model && 'vfl-label-on-input vfl-label'">Կնքման ամսաթիվ</label>
              <date-pick 
                v-model="$v.contract.sign_date.$model"
                :format="'YYYY-MM-DD'"
                :inputAttributes="{readonly: true, placeholder: 'Կնքման ամսաթիվ'}"
                id="end-date"
                class="tender-date-picker date-picker m-0"
                :weekdays="['Երկ', 'Երք', 'Չոր', 'Հին', 'Ուր', 'Շբթ', 'Կիր']"
                :months="['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր']"
              />
            </div>
          </div>
          <div class="col-md-6 form-group contract-details-input-group-right">
            <float-label>
              <input
                v-model="$v.contract.code.$model"
                placeholder="Ծածկագիր"
                type="text"
                class="tender-input m-0"
              />
            </float-label>
          </div>
        </div>

        <div class="col-12 p-0">
          <hr style="background-color:#EDEFF2 !important; height:1px; margin-top: 12px; margin-bottom: 20px;" class="w-100"/>
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
          <v-client-table ref="vtable" :columns="columns" v-model="tableData" :options="options">
            <div slot="index_num" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.number }}
              </template>
              <template v-else>
                <input
                  @click="(e) => e.stopPropagation()"
                  @change="(event) => {
                    changeInputsName(index - 1, 'number', event.target.value)
                  }"
                  :value="row.number"
                  v-mask="'###'"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="name" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.name }}
              </template>
              <template v-else>
                <input
                  @click="(e) => e.stopPropagation()"
                  @change="(event) => {
                    changeInputsName(index - 1, 'name', event.target.value)
                  }"
                  :value="row.name"
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
                <input
                  @change="(event) => {
                    changeInputsName(index - 1, 'specification', event.target.value)
                  }"
                  :value="row.specification"
                  type="text"
                  class="form-control"
                >
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
            <div slot="unit_price" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.unit_price }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index - 1, 'unit_price', event.target.value);
                  }"
                  :value="row.unit_price"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="total_price" slot-scope="{row}">
              <template>
                {{ getTotalPrice(row) }}
                {{ row.total_price }}
              </template>
            </div>
            <div slot="delivery_date" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.delivery_date }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index - 1, 'delivery_date', event.target.value)
                  }"
                  :value="row.delivery_date"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="payment_date" slot-scope="{row, index}">
              <template v-if="row.fromExcel">
                {{ row.payment_date }}
              </template>
              <template v-else>
                <input
                  @change="(event) => {
                    changeInputsName(index - 1, 'payment_date', event.target.value)
                  }"
                  :value="row.payment_date"
                  type="text"
                  class="form-control"
                >
              </template>
            </div>
            <div slot="action" slot-scope="{index}">
              <div>
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
      <div class="col-12 p-0">
        <div class="d-flex justify-content-end">
          <button @click="confirm" class="btn btn-primary">
            <span>Հաստատել</span>
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import 'vue-date-pick/dist/vueDatePick.css';
import DatePick from 'vue-date-pick';
import isMobile from '@/mixins/isMobileView'

export default {
  name: 'FillContractDetailsModal',
  mixins: [isMobile],
  components: {
    DatePick,
  },
  data () {
    return {
      copiedExcelSheet: '',
      columns: ['index_num', 'name', 'specification', 'unit', 'count', 'unit_price', 'total_price', 'delivery_date', 'payment_date', 'action'],
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
          name: 'Անվանում',
          specification: 'Համառոտ բնութագիր',
          unit: 'Չափման միավոր',
          count: 'Քանակ',
          unit_price: 'Միավորի գին (դր.)',
          total_price: 'Ընդհանուր գումար (դր.)',
          delivery_date: 'Մատակարարման ժամկետը ըստ գնման ժամանակացույցի',
          payment_date: 'Վճարման ժամկետը ըստ վճարման ժամանակացույցի',
          action: '',
        },
        filterable: false
      },
      wrongRows: [],
      contract: {
        id: null,
        client_address: '',
        name: '',
        sign_date: '',
        code: '',
      },
      tableData: [
        {
          number: 1,
          name: '',
          specification: '',
          unit: '',
          count: '',
          unit_price: '',
          total_price: '',
          delivery_date: '',
          payment_date: '',
          fromExcel: false
        },
      ],
     }
  },
  validations: {
    contract: {
      id: { required },
      client_address: { required },
      name: { required },
      sign_date: { required },
      code: { required },
    },
  },
  computed: {
    me() {
      return this.$store.getters['user/me']
    },
  },
  methods: {
    consoleLog(data){
      console.log(data)
    },
    getContractSum(){
      let sum = 0;
      this.tableData.forEach((row) => {
        sum += row.total_price
      })
      return sum;
    },
    confirm(){
      console.log(this.tableData)
      if(!this.$v.contract.$invalid) {
        if(!this.tableData.find(row => row.total_price === 0)){
          const contractRequest = { ...this.contract};
          console.log(this.tableData)
          contractRequest.rows = this.tableData;
          contractRequest.price = this.getContractSum();
          this.$client.post(`contract/fromApplication/complete`, contractRequest).then((response) => {
            if(response){
              this.$modal.hide('fill-contract-details-modal')
            }
          }).catch(e => {
            console.log(e)
          })
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Լրացրեք գնման առարկայի տվյալների հաստատելու համար'
          })
        }
      } else {
        this.$notify({
          group: 'foo',
          type: 'error',
          text: 'Լրացրեք բոլոր դաշտերը հաստատելու համար'
        })
      }
    },
    convertData(){
      if(this.copiedExcelSheet.length) {
        const rows = this.copiedExcelSheet.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+([^"]|"")*)"/mg, function (match, p1) {
            return p1
                .replace(/""/g, '"')
                .replace(/\r\n|\n\r|\n|\r/g, ' ')
            ;
        }).split(/\r\n|\n\r|\n|\r/g);

        const rowModel = {
          number: '',
          name: '',
          specification: '',
          unit: '',
          count: '',
          unit_price: '',
          delivery_date: '',
          payment_date: ''
        }

        const data = []

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

          row.fromExcel = true;

          data.push(row);
        }

        data.forEach((row) => {
          row.total_price = row.count * row.unit_price;
        })

        if(isDataInvalid) {
          this.tableData = []
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Մուտքագրված տվյալները սխալ են'
          })
        } else {
          data.sort(function (a, b) {
            if (+a.lotNumber > +b.lotNumber) {
              return 1;
            }
            if (+a.lotNumber < +b.lotNumber) {
              return -1;
            }
            return 0;
          });
          this.tableData = data
        }
      } else {
        this.$notify({
          group: 'foo',
          type: 'error',
          text: 'Դուք չեք մուտքագրել տվյալները'
        })
      }
    },
    getTotalPrice(row){
      row.total_price = row.count * row.unit_price;
    },
    changeInputsName(index, colIndex, value) {
      console.log(index, colIndex, value)
      console.log(this.tableData)
      this.tableData[index][colIndex] = value
      this.tableData[index].total_price = this.tableData[index].count * this.tableData[index].unit_price
    },
    removeRow(index){
      this.tableData.splice(index, 1)
    },
    addRow(){
      console.log(this.tableData)
      this.tableData.push({
        number: '',
        name: '',
        specification: '',
        unit: '',
        count: '',
        unit_price: '',
        total_price: '',
        delivery_date: '',
        payment_date: '',
        fromExcel: false
      })
      console.log(this.tableData)
    },
    beforeOpen({params}) {
      this.resetComponent = params.resetComponent
      this.contract.code = params.code
      this.contract.id = params.id
    },
    beforeClose({params}) {
      this.resetComponent();
      this.copiedExcelSheet = '';
      this.wrongRows = [];
      this.contract = {
        id: null,
        client_address: '',
        name: '',
        sign_date: '',
        code: '',
      };
      this.tableData = [
        {
          number: '',
          name: '',
          specification: '',
          unit: '',
          count: '',
          unit_price: '',
          total_price: '',
          delivery_date: '',
          payment_date: '',
          fromExcel: false
        },
      ]
    },
  }
}
</script>
<style scoped>

.form-group{
  margin-bottom: 28px;
}
  .date-picker {
    display: block;
    width: 100%;
    border: 1px solid #e8ebf3;
    border-radius: .25rem;
    border-bottom: 1px solid #e8ebf3;
  }
  .fill-contract-details-modal #modal-body{
    padding: 28px 20px 20px 30px;
  }
  .btn-parse{
    background: #006BE6;
    box-shadow: 0px 4px 8px rgba(0, 107, 230, 0.15);
    border-radius: 8px;
  }
  @media (max-width: 768px) {
    .contract-details-form .form-group{
      padding: 0;
    }
    .mobile-fit-content{
      height: fit-content;
    }
    .mobile-fit-content .contract-details-input-group-right{
      margin-top: 42px;
      padding: 0;
    }
  }
</style>
