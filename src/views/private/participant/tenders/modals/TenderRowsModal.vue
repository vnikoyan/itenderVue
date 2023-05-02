<template>
  <modal 
    class="tender-rows-modal modal-without-footer"
    name="tender-rows-modal"
    @closed="$emit('updateComparisonData')"
    @before-close="beforeClose"
    @before-open="beforeOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="60%"
  >
    <div id="modal-header">
        <div class="w-75 d-flex">
            <p>Գնման առարկաներ</p>
        </div>
        <button type="button"
                class="close position-absolute"
                style="right: 1.25rem; top: 25%"
                @click="$modal.hide('tender-rows-modal')"
                aria-label="Close"
        >
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
            </svg>
        </button>
    </div>
    <div id="modal-body">
      <div v-if="!loaded" class="col-12 d-flex align-items-center justify-content-center" style="height: 100%; padding: 20px">
        <div style="left: 0; right: 0; top: 0; bottom: 0;" class="text-big text-primary spinner-border spinner-border-lg m-auto position-absolute" role="status"></div>
      </div>
      <v-client-table v-else ref="vtable" :columns="columns" v-model="rows" :options="options">
        <div slot="name" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
          {{ row.name }}
        </div>
        <div slot="estimated_price_unit" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
          <span v-if="row.count && row.estimated_price">{{ (+row.estimated_price / +row.count.replace(',', '.')) | PriceFormat }}</span>
          <span v-else>սահմանված չէ</span>
        </div>
        <div slot="estimated_price" class="d-flex justify-content-start align-items-center h-100" slot-scope="{row}">
          <span v-if="row.estimated_price">{{ +row.estimated_price | PriceFormat }}</span>
          <span v-else>սահմանված չէ</span>
        </div>
      </v-client-table>
      <!-- <table class="table table-borderless VueTables__table table table-border-radius w-100 mt-5" style="overflow: hidden; height: auto;">
        <thead>
            <tr>
              <th style="width: 50px">
                  <div class="row justify-content-center">
                    <span >Չ/Հ</span>
                  </div>
                  <div class="resize-handle" style="top: 0px; right: 0px; width: 5px; position: absolute; cursor: col-resize; user-select: none; height: 92px;"></div>
              </th>
              <th>
                  <div class="row justify-content-center">
                    <span class="VueTables__heading">Անվանում</span>
                  </div>
              </th>
              <th v-if="rows.length && rows[0].code">
                  <div class="row justify-content-center">
                    <span class="VueTables__heading">CPV կոդ</span>
                  </div>
              </th>
            </tr>
        </thead>
        <tbody>
          <tr :class="row.is_mine && 'bg-light-primary'" v-for="(row, index) in rows" :key="index">
            <td>
             {{index+1}}
            </td>
            <td>
             {{row.name}}
            </td>
            <td v-if="row.code">
              {{row.code}}
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </modal>
</template>
<script>

export default {
  name: 'TenderRowsModal',
  data () {
    return {
      tender: {},
      rows: [],
      loaded: false,
      columns: [
        'viewId',
        'name',
        'code',
        'count',
        'unit'
      ],
      options: {
        rowClassCallback: function(row) {
          if(row.is_mine){
            return 'bg-light-primary'
          }
        },
        sortable: [],
        perPage: 1000,
        columnsDropdown: false,
        filterByColumn: false,
        filterable: false,
        skin: 'table table-borderless VueTables__table table table-border-radius w-100',
        dateFormat: "YYYY-mm-dd",
        headings: {
          viewId: 'Չ/Հ',
          name: 'Անվանում',
          code: 'CPV կոդ',
          unit: 'Չափման միավոր',
          count: 'Քանակ',
          estimated_price_unit: 'Նախահաշվային միավոր գին',
          estimated_price: 'Նախահաշվային ընդհանուր գին',
        },
      },
    }
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
    beforeClose(){
      this.tender = {};
      this.rows = [];
      this.loaded = false;
    },
    beforeOpen({params}){
      this.tender = params
      this.rows = this.tender.rows
      this.$client.get(`tender/getTenderRows/${this.tender.id}`).then(({data}) => {
        this.loaded = true;
        this.rows = data.data
      })
      if(this.me.package === 'Գոլդ'){
        this.columns = [
          'viewId',
          'name',
          'code',
          'count',
          'unit',
          'estimated_price_unit',
          'estimated_price',
        ]
      }
    },
  }
}
</script>
<style scoped>

  @media (max-width: 768px) {
    td, th{
      font-size: 11px;
    }

    table{
      table-layout: fixed;
      width: 100%;
    }
    .tender-rows-modal /deep/ .vm--modal #modal-body{
      height: calc(100% - 56px);
    }
    .tender-rows-modal /deep/ .vm--modal {
      width: 80% !important;
      height: 60% !important;
      top: 0 !important;
      bottom: 0 !important;
      right: 0 !important;
      left: 0 !important;
      margin: auto;
      position: absolute;
    }
  }
  .searchItem:hover {
    background-color: #006BE6;
    color: #fff;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

