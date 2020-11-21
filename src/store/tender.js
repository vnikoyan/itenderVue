import Vue from 'vue'

const state = {
    tender: [],
}

const getters = {
    tender: state => state.tender,
}

const actions = {
  get({ commit }) {
    // eslint-disable-next-line no-undef
    return $client.get('tender').then(response => {
      commit('setTender', response.data.data) 
    })
  }
}

const mutations = {
  setTender(state, tender) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'tender', _.clone(tender))
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
