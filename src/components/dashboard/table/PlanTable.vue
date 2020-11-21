<template>
  <v-server-table 
    :name="tableName" 
    :ref="tableName" 
    :columns="columns" 
    :options="options">
    <template v-slot:cpv.code="{row}">
      {{row.cpv.code}}/{{row.cpv_drop}}
    </template>

    <template v-slot:unit="{row, setEditing, isEditing, revertValue}">
      <template v-if="(row.status === 3) || (currentPlan.status === 1 && !isRoot)">
        <span>{{ row.unit }}</span>
      </template>
      <template v-else>
        <span class="d-inline-block w-100" @click="setEditing(true)" v-if="!isEditing()">
          {{ row.unit }}
        </span>
        <span v-else>
          <select v-model="row.unit" name="unit" id="unit" class="form-control">
            <option :key="unit.id" v-for="unit in units" :value="unit.title">{{ unit.title }}</option>
          </select>
          <div class="d-flex justify-content-around">
            <font-awesome-icon @click="updateRow(row, 'unit'); setEditing(false)"
                                class="h4 text-primary"
                                icon="save"/>
            <font-awesome-icon @click="revertValue(); setEditing(false)"
                                class="h4 text-danger"
                                icon="times"/>
          </div>
        </span>
      </template>
    </template>

    <template v-slot:unit_amount="{row, setEditing, isEditing, revertValue}">
      <template v-if="(row.status === 3) || (currentPlan.status === 1 && !isRoot)">
        <span>{{ row.unit_amount }}</span>
      </template>
      <template v-else>
        <span @click="setEditing(true);" v-if="!isEditing()" class="d-inline-block w-100">
          {{ row.unit_amount }}
        </span>
        <span v-else>
          <input @keyup.esc="revertValue(); setEditing(false)"
                  v-model="row.unit_amount"
                  v-positive-only.none_zero
                  :class="{'border-danger': !row.unit_amount}"
                  name="unit_amount"
                  id="unit_amount"
                  type="text"
                  class="form-control"
                  style="width: 100px!important;">
          <div class="d-flex justify-content-around">
            <font-awesome-icon @click="if(row.unit_amount) {updateRow(row, 'unit_amount'); setEditing(false)}"
                                class="h4 text-primary"
                                icon="save"/>
            <font-awesome-icon @click="revertValue(); setEditing(false)"
                                class="h4 text-danger"
                                icon="times"/>
          </div>
        </span>
      </template>
    </template>

    <template v-slot:count="{row, setEditing, isEditing, revertValue}">
      <template v-if="(row.status === 3) || (currentPlan.status === 1 && !isRoot)">
        <span>{{ row.count }}</span>
      </template>
      <template v-else>
        <span @click="setEditing(true);" v-if="!isEditing()" class="d-inline-block w-100">
          {{ row.count }}
        </span>
        <span v-else>
          <input @keyup.esc="revertValue(); setEditing(false)"
                  v-model="row.count"
                  v-positive-only.none_zero.integer
                  :class="{'border-danger': !row.count}"
                  name="count"
                  id="count"
                  type="text"
                  class="form-control"
                  style="width: 100px!important;">
          <div class="d-flex justify-content-around">
            <font-awesome-icon @click="if(row.count) {updateRow(row, 'count'); setEditing(false)}"
                                class="h4 text-primary"
                                icon="save"/>
            <font-awesome-icon @click="revertValue(); setEditing(false)"
                                class="h4 text-danger"
                                icon="times"/>
          </div>
        </span>
      </template>
    </template>

    <template v-slot:overall_price="{row}">
      {{Math.round(row.unit_amount * row.count)}}
    </template>

    <template v-slot:type="{row, setEditing, isEditing, revertValue}" class="d-inline-block w-100">
      <template v-if="(row.status === 3) || (currentPlan.status === 1 && !isRoot)">
        <span>{{ purchaseTypes[row.type] }}</span>
      </template>
      <template v-else>
        <span @click="setEditing(true)" v-if="!isEditing()">
          {{ purchaseTypes[row.type] }}
        </span>
        <div v-else>
          <select v-model="row.type" name="type" id="type" class="custom-select">
            <option :key="key" v-for="(type, key) in purchaseTypes" :value="key">{{ type }}</option>
          </select>
          <div class="d-flex justify-content-around">
            <font-awesome-icon @click="updateRow(row, 'type'); setEditing(false)"
                                class="h4 text-primary"
                                icon="save"/>
            <font-awesome-icon @click="revertValue(); setEditing(false)"
                                class="h4 text-danger"
                                icon="times"/>
          </div>
        </div>
      </template>
      <!--            {{getPurchaseType(row.type)}}-->
    </template>


    <template v-slot:cpv.classifier="{row}">
      <span class="d-block" :key="item.classifier.id" v-for="item in row.cpv.classifier">
        {{item.classifier.title}} - {{item.classifier.code}}
      </span>
    </template>

    <template v-slot:user_id="{row, setEditing, isEditing, revertValue}">
      <template v-if="(row.status === 3) || (currentPlan.status === 1 && !isRoot)">
        {{ userChildren.find(child => child.id === row.user_id) ? userChildren.find(child => child.id === row.user_id).email : 'Ընտրել' }}
      </template>
      <template v-else>
        <span style="cursor: pointer;" @click="setEditing(true)" v-if="!isEditing()">
          {{ userChildren.find(child => child.id === row.user_id) ? userChildren.find(child => child.id === row.user_id).email : 'Ընտրել' }}
        </span>
        <div v-else>
          <select v-model="row.user_id" name="userId" id="user-id" class="custom-select">
            <option :value="null">Ընտրել</option>
            <option :key="child.id" v-for="child in userChildren" :value="child.id">{{ child.email }}</option>
          </select>
          <div class="d-flex justify-content-around">
            <font-awesome-icon @click="updateRow(row, 'user_id'); setEditing(false)"
                                class="h4 text-primary"
                                icon="save"/>
            <font-awesome-icon @click="revertValue(); setEditing(false)"
                                class="h4 text-danger"
                                icon="times"/>
          </div>
        </div>
      </template>
    </template>

    <template v-slot:date="{row, setEditing, isEditing, revertValue}">
      <template v-if="(row.status === 3) || (currentPlan.status === 1 && !isRoot)">
        <span>{{ row.date }}</span>
      </template>
      <template v-else>
        <template v-if="row.status === 0">
          <font-awesome-icon v-if="division.id === 4" class="text-primary" icon="check-double" 
              @click="approveDate(row.id)" 
              style="cursor: pointer;" />
          <span v-if="!isEditing()" @click="setEditing(true);" class="d-inline-block w-100">
            {{ row.date }}
          </span>
          <div v-else>
            <input @keyup.esc="revertValue(); setEditing(false)"
                    v-model="row.date"
                    name="date"
                    id="date"
                    type="date"
                    class="form-control">
            <div class="d-flex justify-content-around">
              <font-awesome-icon @click="updateRow(row, 'date'); setEditing(false)"
                                  class="h4 text-primary"
                                  icon="save"/>
              <font-awesome-icon @click="revertValue(); setEditing(false)"
                                  class="h4 text-danger"
                                  icon="times"/>
            </div>
          </div>
        </template>
        <template v-else-if="row.status === 1 || row.status === 2">
          <font-awesome-icon icon="check-circle" 
              class="text-success"></font-awesome-icon>
          <span>{{ row.date }}</span>
        </template>
      </template>
    </template>

    <template v-slot:actions="{row}">
      <div class="btn-group mb-4 mb-md-0">
        <button v-if="row.status === 3 && (currentPlan.status === 0 || (currentPlan.status === 1 && isRoot))" @click="restoreRow(row)" 
                class="btn btn-outline-light">
          <font-awesome-icon icon="history" class="text-success"/>
        </button>
        <button v-else-if="row.status !== 3" @click="$modal.show('edit-modal', {row})" 
                type="button" 
                title="խմբագրել"
                class="btn btn-outline-light">
          <font-awesome-icon icon="edit"/>
        </button>
        <button v-else @click="$modal.show('history-modal', {row})" 
                title="խմբագրման պատմություն" 
                class="dropdown-item  border-0 btn btn-outline-light">
          <font-awesome-icon icon="clock"/>
        </button>
        <button type="button" class="btn btn-outline-light dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span> <i class="mdi mdi-chevron-down"></i>
        </button>
        <div class="dropdown-menu" style="min-width: unset !important; opacity: unset !imortant">
            <button v-if="row.status !== 3" @click="$modal.show('history-modal', {row})" 
                    title="խմբագրման պատմություն" 
                    class="dropdown-item  border-0 btn btn-outline-light">
              <font-awesome-icon icon="clock"/>
            </button>
            <button v-if="isRoot" @click="addSame(row)" 
                    title="ավելացնել նույնից" 
                    class="dropdown-item border-0 btn btn-outline-light">
              <font-awesome-icon icon="plus"/>
            </button>
            <div v-if="row.status !== 3" class="dropdown-divider"></div>
            <button v-if="row.status !== 3" @click="deleteRow(row)" 
                    title="հեռացնել" 
                    class="dropdown-item border-0 text-danger btn btn-outline-light">
              <font-awesome-icon icon="trash-alt"/>
            </button>
        </div>
      </div>
      <!-- <div v-if="row.status" class="d-flex">
        
      </div>
      <div v-else>
        <button @click="$modal.show('history-modal', {row})" title="խմբագրման պատմություն" class="border-0 btn btn-outline-light">
          <font-awesome-icon icon="clock"/>
        </button>
        <button @click="addSame(row)" title="ավելացնել նույնից" class="border-0 btn btn-outline-light">
          <font-awesome-icon icon="plus"/>
        </button>
        <button @click="restoreRow(row)" class="border-0 btn btn-outline-light">
          <font-awesome-icon icon="history" class="text-success"/>
        </button>
      </div> -->
    </template>
  </v-server-table>
</template>

<script>
import purchaseTypes from '@/mixins/purchaseTypes'
export default {
  name: 'PlanTable',
  mixins: [purchaseTypes],
  props: {
    tableName: String,
    requestFunction: Function,
    currentPlan: Object
  },
  data() {
    return {
      columns: [
        'order_index',
        'cpv.code',
        'cpv.name',
        'unit',
        'unit_amount',
        'count',
        'overall_price',
        'type',
        'cpv.classifier',
        'user_id',
        'date',
        'actions'
      ],
      options: {
        // saveState: true,
        requestFunction: this.requestFunction,
        sendInitialRequest: false,
        rowClassCallback: (row) => {
          if(row.status === 3) {
            return 'deleted-row'
          }
        },
        resizableColumns: true,
        headings: {
          order_index: 'ՀՀ',
          'cpv.code': 'CPV կոդ(պայմանով/ առանց պայման)',
          'cpv.name': 'Անվանումը',
          unit: 'Չափման միավոր',
          unit_amount: 'Միավորի գին',
          count: 'Քանակ',
          overall_price: 'Ընդհանուր',
          type: 'Գնման Ձև',
          'cpv.classifier': 'ֆինանսական Դասակարգիչ/ներ',
          user_id: this.$store.getters['user/division'].childName,
          date: 'Գնման ժամկետ',
          actions: 'Գործողություն'
        },
        columnsClasses: {
          // 'cpv.name': 'text-secondary'
        },
        customFilters: ['budget_type'],
        editableColumns: ['unit', 'unit_amount', 'count', 'type', 'date', 'user_id'],
        sortable: ['order_index', 'unit', 'unit_amount', 'count', 'type', 'date'],
        filterable: ['cpv.code'],
        footerHeadings: true,
        columnsDropdown: true,
        highlightMatches: true,
        texts: {
          count:
            'Ցուցադրված է {from}֊ից {to}֊ը ընդհանուր {count} տողից|{count} տող|',
          first: 'Առաջին',
          last: 'Վերջին',
          filter: '',
          filterPlaceholder: 'Փնտրել',
          limit: '',
          page: 'Page:',
          noResults: 'Համընկնում չի գտնվել',
          noRequest: 'խնդրում ենք ընտրել առնվազն մեկ ֆիլտեր տվյալները ներբեռնելու համար',
          filterBy: 'փնտրել ըստ {column}',
          loading: 'Բեռնվում է...',
          defaultOption: 'ընտրել {column}',
          columns: 'Ընտրել դաշտերը',
        },
        skin: 'table table-hover'
      },
    }
  },
  computed: {
    units() {
      return this.$store.getters['settings/units']
    },
    userChildren() {
      return this.$store.getters['user/userChildren']
    },
    isRoot() {
      return this.$store.getters['user/isRoot']
    },
    division() {
      return this.$store.getters['user/division']
    },
  },
  mounted() {
    this.$store.dispatch('settings/getUnits')
  },
  methods: {
    updateRow(row, field) {
      const updateParams = {
        rowId: row.id,
        data: Object.assign({[field]: row[field]}, {user_id: row.user_id})
      }
      this.$store.dispatch('procurement/update', updateParams).then(response => {
        if(response.data.status) {
          this.updateTable()
        }
      })
    },
    approveDate(rowId) {
      this.$store.dispatch('procurement/approveRow', rowId)
        .then(({data: {status}}) => { if(status) this.updateTable() })
    },
    restoreRow(row) {
      this.$store.dispatch('procurement/restoreRow', row.id).then(response => {
        this.updateTable()
      })
    },
    addSame(row) {
      const data = {
        cpv_id: row.cpv_id,
        cpv_drop: row.cpv_drop + 1,
        cpv_type: row.cpv.type,
        unit: row.unit,
        specifications_id: row.specifications_id,
        count: row.count,
        unit_amount: row.unit_amount,
        type: row.type,
        classifier_id: 1,
        user_id: row.user_id,
        date: row.date,
        is_condition: row.is_condition,
      }
      this.$store.dispatch('procurement/storeProcurements', {
        procurementId: this.currentPlan.id,
        cpvArr:[data]
      }).then(response => {
        if(response.data.status) {
          this.updateTable()
        }
      })
    },
    deleteRow(row) {
      this.$store.dispatch('procurement/deleteRow', row.id).then(response => {
        this.updateTable()
      })
    },
    updateTable() {
      this.$refs[this.tableName].getData()
    },
  }
}
</script>
