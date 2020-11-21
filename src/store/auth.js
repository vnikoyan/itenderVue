import Vue from 'vue'
import router from '../router'

const state = {
  accessToken: localStorage.getItem('accessToken') || '',
  rememberMe: JSON.parse(localStorage.getItem('rememberMe')) || false,
  authErrors: {}
}

const getters = {
  isAuthenticated: state => !!state.accessToken,
  accessToken: state => state.accessToken,
  rememberMe: state => state.rememberMe
}

const actions = {
  auth ({ dispatch, commit }, payload) {
    // eslint-disable-next-line no-undef
    return $client.post(`auth/${payload.url}`, payload.fields)
      .then(({ status, data: { data } }) => {
        if (status) {
          dispatch('rememberMe', payload.rememberMe)
          
          dispatch('setToken', data.token)
          return data
        }
      }).catch(error => {
        commit('setAuthErrors', error.data.error)
        dispatch('removeToken')
        return error.data
      })
  },
  logout ({ dispatch }) {
    return new Promise((resolve) => {
      dispatch('removeToken')
      dispatch('rememberMe', false)
      localStorage.removeItem('me')
      // eslint-disable-next-line no-undef
      delete $client.defaults.headers.common.Authorization
      router.push('/')
      resolve()
    })
  },
  rememberMe ({ commit }, shouldRememberMe) {
    commit('setRememberMe', shouldRememberMe)
    localStorage.setItem('rememberMe', shouldRememberMe)
  },
  setToken ({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
    localStorage.setItem('accessToken', accessToken)
  },
  removeToken ({ commit }) {
    commit('setAccessToken', '')
    localStorage.removeItem('accessToken')
  }
}

const mutations = {
  setAccessToken (state, accessToken) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'accessToken', _.clone(accessToken))
  },
  setRememberMe (state, shouldRememberMe) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'rememberMe', _.clone(shouldRememberMe))
  },
  setAuthErrors (state, errors) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'authErrors', _.clone(errors))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
