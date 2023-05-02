import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import client from './services/httpClient'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/styles/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faUserTie,
  faFileUpload,
  faDownload,
  faFileAlt,
  faEye,
  faSearch,
  faCopy,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faClock,
  faSave,
  faSort,
  faSortUp,
  faSortDown,
  faSortAmountDown,
  faSortAmountUpAlt,
  faAngleRight,
  faEdit,
  faArrowUp,
  faAngleLeft,
  faTrashAlt,
  faHistory,
  faAngleDown,
  faGrinWink,
  faEnvelope,
  faLock,
  faCalendar,
  faTimes,
  faShoppingCart,
  faPlus,
  faMinus,
  faSlidersH,
  faCoffee
} from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import Vuelidate from 'vuelidate'
import i18n from './i18n'
import vWow from 'v-wow'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import VueFloatLabel from 'vue-float-label'
import VModal from 'vue-js-modal'
import { ServerTable, ClientTable } from 'vue-tables-2';
import ICountUp from 'vue-countup-v2'
import VueWaypoint from 'vue-waypoint'
import axios from 'axios'
import positiveOnly from './directives/positive-only.js'
import inputLng from './directives/input-lng.js'
import VTree from 'vue-tree-halower'
import { VTooltip } from 'v-tooltip'
import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree
import VueTheMask from 'vue-the-mask'
import VueTelInput from 'vue-tel-input'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import Multiselect from 'vue-multiselect'

import MyPagination from './components/tenders/table/MyPagination'
import VtGenericFilter from './components/tenders/table/VtGenericFilter'
import VtPerPageSelector from './components/tenders/table/VtPerPageSelector'
import MySortControl from './components/tenders/table/MySortControl'
import MyDataTable from './components/tenders/table/MyDataTable'
import MyTable from './components/tenders/table/MyTable'
import MyTableBody from './components/tenders/table/MyTableBody'
import MyColumnsDropdown from './components/tenders/table/MyColumnsDropdown'
import MyTableHeading from './components/tenders/table/MyTableHeading'
import MyTableRow from './components/tenders/table/MyTableRow'
import MyTableHead from './components/tenders/table/MyTableHead'

import Notifications from 'vue-notification'
import 'vue-tel-input/dist/vue-tel-input.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import VueSimpleAlert from "vue-simple-alert";
import Swal from "sweetalert2";
import VueMoment from 'vue-moment'
import vueScrollto from 'vue-scrollto'
// import momentjs from 'moment-timezone'


import './assets/styles/tooltip.scss'
import './assets/styles/new_styles.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
/* import the fontawesome core */
import Meta from 'vue-meta';
import VueJsonLD from 'vue-jsonld'
// import Echo from 'laravel-echo';
// import Echo from "laravel-echo"
import VueResizeText from 'vue-resize-text';
import numeral from 'numeral'
// load a locale
Vue.filter("PriceFormat", function (value) {
  if(Number.isInteger(value)){
    const result = numeral(value).format("0,0");
    return result.replaceAll(',', ' ')
  } else {
    const result = numeral(value).format("0,0.00");
    return result.replaceAll(',', ' ')
  }
});
Vue.use(VueResizeText)
// window.Pusher = require('pusher-js')

// This assumes you have already saved your bearer token in your browsers local storage
// const token = localStorage.getItem('user-token')
// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: process.env.VUE_APP_PUSHER_APP_KEY,
//   wsHost: 'localhost',
//   authEndpoint: process.env.VUE_APP_URL + 'broadcasting/auth',
//   encrypted: true,
//   forceTLS: false,
//   wsPort: 6001,
//   wssPort: 6001,
//   disableStats: true,
//   enabledTransports: ['ws', 'wss'],
//   auth: {
//     headers: {
//       authorization: 'Bearer ' + token,
//     }
//   }
// })
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'mykey',
//     cluster: 'mt1',
//     wsHost: window.location.hostname,
//     authEndpoint: process.env.VUE_APP_URL + 'broadcasting/auth',
//     wsPort: 6001,
//     forceTLS: false,
//     disableStats: true,
// });
// console.log(window.Echo)
window.axios = axios
// global directives
Vue.use(VueJsonLD)
Vue.use(Meta);
Vue.use(VueFormWizard)
Vue.use(BootstrapVue,IconsPlugin);
Vue.use(vueScrollto)
Vue.directive('positive-only', positiveOnly)
Vue.directive('input-lng', inputLng)
Vue.directive('tooltip', VTooltip)
Vue.use(VueMoment, { moment })
Vue.use(VueSimpleAlert, {
  reverseButtons: true,
  showCloseButton: true,
  buttonsStyling: false,
  customClass: {
    popup: 'card',
    cancelButton: 'btn mx-1 btn-secondary',
    confirmButton: 'btn mx-1 btn-primary',
  },
  showClass: {
    popup: 'swal2-show',
    backdrop: 'swal2-backdrop-show',
    icon: ''
  },
  hideClass: {
    popup: 'swal2-hide',
    backdrop: 'swal2-backdrop-hide',
    icon: ''
  }
});
Vue.prototype.$fire = function(options) {
  var mixedOptions = Object.assign(Object.assign({}, VueSimpleAlert.globalOptions), options);
  mixedOptions.icon = mixedOptions.type
  return Swal.fire(mixedOptions);
};
Vue.use(VueWaypoint)
Vue.use(VueFloatLabel)
Vue.use(VModal, {adaptive: true, scrollable: true})
Vue.use(Vuelidate)
Vue.use(VTree)
Vue.use(VueTheMask)
Vue.use(VueTelInput)
Vue.use(Datepicker)
Vue.use(ClientTable, {
  texts: {
    count: 'Ցուցադրված է {from}֊ից {to}֊ը ընդհանուր {count} տողից|{count} տող|',
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
}, false, 'bootstrap4', {
  tableBody: MyTableBody,
  tableRow: MyTableRow,
  table: MyTable,
  dataTable: MyDataTable,
  tableHead: MyTableHead,
  pagination: MyPagination,
  genericFilter: VtGenericFilter,
  perPageSelector: VtPerPageSelector,
  sortControl: MySortControl,
  tableHeading: MyTableHeading,
  columnsDropdown: MyColumnsDropdown
})
Vue.use(ServerTable, {
  texts: {
    count: 'Ցուցադրված է {from}֊ից {to}֊ը ընդհանուր {count} տողից|{count} տող|',
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
}, false, 'bootstrap4', {
  tableBody: MyTableBody,
  table: MyTable,
  tableRow: MyTableRow,
  dataTable: MyDataTable,
  tableHead: MyTableHead,
  pagination: MyPagination,
  genericFilter: VtGenericFilter,
  perPageSelector: VtPerPageSelector,
  sortControl: MySortControl,
  tableHeading: MyTableHeading,
  columnsDropdown: MyColumnsDropdown
})
Vue.use(Notifications)

Vue.component('v-custom-table', MyDataTable)
Vue.component('multiselect', Multiselect)
Vue.component('v-popover', VTooltip.VPopover)
Vue.component('tree-select', Treeselect)
Vue.component('ICountUp', ICountUp)
Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});
library.add(
  faSlidersH,
  faUserTie,
  faFileUpload,
  faDownload,
  faFileAlt,
  faEye,
  faSearch,
  faCopy,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faClock,
  faSave,
  faSort,
  faSortUp,
  faSortDown,
  faSortAmountDown,
  faSortAmountUpAlt,
  faAngleRight,
  faEdit,
  faArrowUp,
  faAngleLeft,
  faTrashAlt,
  faHistory,
  faAngleDown,
  faGrinWink,
  faEnvelope,
  faLock,
  faCalendar,
  faTimes,
  faShoppingCart,
  faPlus,
  faMinus,
  faCoffee
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// making lodash available through whole app(in components, store...)
Object.defineProperty(Vue.prototype, '_', { value: _ })

// making client available in components
Vue.prototype.$client = client.client
Vue.prototype.$cancelSource = client.cancelSource
Vue.prototype.moment = moment
Vue.prototype.sendToPDFGeneration = (_this, htmlContent, fileName, handleEnd, isWithFooter = false) => {
  const isWithFooterData = isWithFooter;
  _this.$client.post('convert/string/to/html', {html: htmlContent, name: fileName}).then(({data}) => {
      const file = data.name
      window.open(
          `${process.env.VUE_APP_URL}document/generation?file=${file}&&is_with_footer=${isWithFooterData}`,
          '_blank'
      );
      if(handleEnd){
        handleEnd()
      }
  })
}
// making client available in elsewhere
window.$client = client.client

Vue.directive('click-outside', {
  bind () {
      this.event = event => this.vm.$emit(this.expression, event)
      this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click', this.event)
  },   
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) { event.stopPropagation() }
})

Vue.use(Vuelidate)

new Vue({
  router,
  vWow,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

i18n.locale = store.getters["user/locale"];
