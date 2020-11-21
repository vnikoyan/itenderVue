import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import client from './services/httpClient'

import 'bootstrap'
import './assets/styles/tooltip.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'

// import './assets/styles/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCopy,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faClock,
  faSave,
  faSort,
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
  faMinus
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
import VtSortControl from './components/dashboard/table/SortControl'
import VtPagination from './components/dashboard/table/Pagination'
import ICountUp from 'vue-countup-v2'
import VueWaypoint from 'vue-waypoint'
import axios from 'axios'
import positiveOnly from './directives/positive-only.js'
import VTree from 'vue-tree-halower'
import { VTooltip } from 'v-tooltip'
import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree


window.axios = axios

Vue.config.productionTip = false

// global directives
Vue.directive('positive-only', positiveOnly)
Vue.directive('tooltip', VTooltip)

Vue.use(VueWaypoint)
Vue.use(ServerTable, {}, false, 'bootstrap4', { sortControl: VtSortControl, pagination: VtPagination })
Vue.use(ClientTable, {}, false, 'bootstrap4')
Vue.use(VueFloatLabel)
Vue.use(VModal, {adaptive: true, scrollable: true})
Vue.use(Vuelidate)
Vue.use(VTree)

Vue.component('tree-select', Treeselect)
Vue.component('ICountUp', ICountUp)
Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});

library.add(
  faCopy,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faClock,
  faSave,
  faSort,
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
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// making lodash available through whole app(in components, store...)
Object.defineProperty(Vue.prototype, '_', { value: _ })

// making client available in components
Vue.prototype.$client = client

// making client available in elsewhere
window.$client = client

Vue.use(Vuelidate)

new Vue({
  router,
  vWow,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

i18n.locale = store.getters["user/locale"];
