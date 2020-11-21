import Vue from 'vue'

const state = {
  locale: localStorage.getItem('locale') || 'hy',
  me: {},
  rootUser: {},
  userChildren: [],
  userGroup: {},
  responsibleUnits: []
}

const getters = {
  locale: state => state.locale,
  me: state => state.me,
  rootUser: state => state.rootUser,
  userChildren: state => state.userChildren,
  isRoot: state => state.me.id === state.rootUser.id,
  division: state => {
    const division = {id: state.me.divisions}
    switch(state.me.divisions) {
      case "4": division.name = 'Վարչություն'; division.childName = 'Բաժին'; break
      case "3": division.name = 'Բաժին'; division.childName = 'Համակարգող'; break
      case "2": division.name = 'Համակարգող'; division.childName = 'Պատասխաանատու ստորաբաժանում'; break
      case "1": division.name = 'Պատասխաանատու ստորաբաժանում'; break
    }
    return division
  },
  responsibleUnits: state => state.responsibleUnits
}

const actions = {
  setLocale({ commit }, locale) {
    localStorage.setItem('locale', locale)
    commit('setLocale', locale)
  },
  async me({ commit }) {
    let me = JSON.parse(localStorage.getItem('me'))
    // eslint-disable-next-line no-undef
    if(_.isEmpty(me)) {
      // eslint-disable-next-line no-undef
      me = (await $client.get('me')).data.data
    }
    commit('setMe', me)
    localStorage.setItem('me', JSON.stringify(me))

    return new Promise((resolve) => {
      resolve(me)
    })
  },
  getRoot({ commit }) {
    // eslint-disable-next-line no-undef
    return $client.get('user/root-user').then(response => {
      commit('setRootUser', response.data.data)
    })
  },
  getChild({ commit }) {
    // eslint-disable-next-line no-undef
    return $client.get('user/user-child').then(response => {
      commit('setUserChildren', response.data.data)
    })
  },
  getGroup({ commit }) {
    // eslint-disable-next-line no-undef
    return $client.get('user/user-group').then(response => {
      commit('setUserGroup', response.data.data)
    })
  },
  userEdit ({ dispatch, commit }, payload) {
    // eslint-disable-next-line no-undef
    return $client.put('user', payload.fields)
      .then(({ status, data: { data } }) => {
        console.log(data);

        if (status) {
          localStorage.removeItem("me");
          commit('setMe', data)
          return data
        }
      }).catch(error => {
        return error.data
      })
  },
  createResponsibleUnit({ dispatch }, { newDivision, members }) {
    const data = {
      name: {
        hy: newDivision.firstName.hy + ' ' + newDivision.lastName.hy,
        ru: newDivision.firstName.ru + ' ' + newDivision.lastName.ru
      },
      email: newDivision.email,
      members: members.map(member => {
        return {
          name: {
            hy: member.firstName.hy + ' ' + member.lastName.hy,
            ru: member.firstName.ru + ' ' + member.lastName.ru
          },
          position: member.position
        } 
      })
    }
    // eslint-disable-next-line no-undef
    return $client.post('/user/responsible', data).then(response => {
      console.log(response, 'create resp. unit')
      if(response.data.status) {
        dispatch('getResponsibleUnits')
      }
      return response
    })
  },
  getResponsibleUnits({ commit }) {
    // eslint-disable-next-line no-undef
    return $client.get('/user/user-child-members').then(response => {
      if(response.status === 200) {
        commit('setResponsibleUnits', response.data.data)
        return response
      }
    })
  },
  addNewMember({ dispatch }, payload) {
    // eslint-disable-next-line no-undef
    return $client.post(`/user/user-child-members/${payload.unitId}`, payload.newMember).then(response => {
      if(response.data.status) {
        // commit('setNewMeber', payload)
        dispatch('getResponsibleUnits')
      }
      return response
    })
  },
  deleteMember({ dispatch }, memberId) {
    // eslint-disable-next-line no-undef
    return $client.delete(`/user/members/${memberId}`).then(response => {
      if(response.data.status) {
        dispatch('getResponsibleUnits')
      }
      return response
    })
  },
  editMember({ dispatch }, member) {
    // eslint-disable-next-line no-undef
    return $client.put(`/user/members/${member.id}`, {
      name: member.name, 
      position: member.position
    }).then(response => {
      if(response.data.status) {
        dispatch('getResponsibleUnits')
      }
      return response
    })
  }
}

const mutations = {
  setLocale(state, locale) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'locale', _.clone(locale))
  },
  setMe(state, me) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'me', _.clone(me))
  },
  setRootUser(state, rootUser) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'rootUser', _.clone(rootUser))
  },
  setUserChildren(state, userChild) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'userChildren', _.clone(userChild))
  },
  setUserGroup(state, userGroup) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'userGroup', _.clone(userGroup))
  },
  setResponsibleUnits(state, responsibleUnits) {
    // eslint-disable-next-line no-undef
    Vue.set(state, 'responsibleUnits', _.cloneDeep(responsibleUnits))
  },
  setNewMeber(state, payload) {
    const found = state.responsibleUnits.find(unit => unit.id === payload.unitId)
    if(found) {
      found.members.push(payload.newMember)
      // eslint-disable-next-line no-undef
      Vue.set(found, 'members', _.clone(found.members))
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
