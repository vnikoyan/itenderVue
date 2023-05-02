import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import news from './news'
import cpv from './cpv'
import tender from './tender'
import procurement from './procurement'
import pricing from './pricing'
import info from './info'
import settings from './settings'
import organize from './organize'
import organizeOnePerson from './organizeOnePerson'
import organizeItender from './organizeItender'
import suggestions from './suggestions'
import categories from './categories'
import faq from './faq'
import protest from './protest'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    user,
    procurement,
    news,
    pricing,
    cpv,
    tender,
    info,
    settings,
    organize,
    organizeOnePerson,
    organizeItender,
    suggestions,
    categories,
    faq,
    protest
  },
  strict: debug
})
