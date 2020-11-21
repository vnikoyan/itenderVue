<template>
  <div class="row mx-0" style="min-height: 70vh;">
    <alert v-if="usedEmail" 
          type="danger"
          :showCondition.sync="usedEmail">
      <strong>Էլ․ հասցեն զբաղված է</strong>
    </alert>
    <div class="col-4 p-3 border-right shadow">
      <div class="w-100 border-bottom pb-3 d-flex justify-content-between">
        <h5>Ստորաբաժանում</h5>
        <button @click="isCreatePage = true, selectedDivision = {}"
                class="btn btn-sm btn-outline-primary px-3" title="Ստեղծել">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a v-for="user in responsibleUnits"
           :key="user.id"
           @click="selectDivision(user)"
           class="nav-link waves-effect waves-light"
           :class="{'active': user.id === selectedDivision.id}">{{ user.name || 'Ստորաբաժանում ' + user.id }}</a>
      </div>
    </div>

    <div class="col-8 px-4 py-3">
      <transition name="component-fade" mode="out-in">
        <div v-if="isCreatePage" class="w-100" key="create-page">
          <h4>Ստեղծել Ստորաբաժանում</h4>
          <form class="position-relative py-3">
            <!--          <span v-if="errorMsgFromApi" class="text-danger position-absolute"-->
            <!--            style="top: -15px"> {{ $t('login.label_1') }}</span>-->
            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="division-email">Էլ․ հասցե</label>
                <input
                  v-model="$v.newDivision.email.$model"
                  @input="usedEmail = false"
                  type="email"
                  class="form-control"
                  :class="{'border-danger': emailRequired}"
                  id="division-email"
                  placeholder="Էլ․ հասցե"
                />
                <span class="small text-danger" v-if="emailRequired">Էլ․ հասցեն պարտադիր է</span>
              </div>
            </div>
            <h4>Ղեկավար</h4>
            <div v-for="{ code, label } in languages" :key="code" class="form-row">
              <div class="form-group col-sm-3">
                <label for="division-name">Անուն {{ label }}</label>
                <input v-model="$v.newDivision.firstName[code].$model"
                       type="text"
                       class="form-control"
                       :class="{'border-danger': $v.newDivision.firstName[code].$dirty && !$v.newDivision.firstName[code].required}"
                       id="division-name"
                       placeholder="Անուն"/>
                <!-- <span class="small text-danger" v-if="nameRequired">Գաղտնաբառը պարտադր է</span> -->
              </div>
              <div class="form-group col-sm-3">
                <label for="division-name">Ազգանուն {{ label }}</label>
                <input v-model="$v.newDivision.lastName[code].$model"
                       type="text"
                       class="form-control"
                       :class="{'border-danger': $v.newDivision.lastName[code].$dirty && !$v.newDivision.lastName[code].required}"
                       id="division-name"
                       placeholder="Ազգանուն"/>
                <!-- <span class="small text-danger" v-if="nameRequired">Գաղտնաբառը պարտադր է</span> -->
              </div>
            </div>
            <h4>Անդամներ</h4>
            <div class="w-100" style="height: 40vh; overflow: auto;">
              <transition-group name="list" tag="div">
                  <div class="position-relative mb-4 border rounded shadow px-3 py-2" v-for="(member,index) in $v.members.$each.$iter"
                    :key="member.index.$model">
                    <div class="form-row py-2" v-for="{code, label} in languages" :key="code">
                      <div class="col-sm-3">
                        <label class="control-label">Անուն {{ label }}</label>
                        <input v-model="member.firstName[code].$model"
                              :id="`firstName${index}`"
                              placeholder="Անուն"
                              type="text"
                              :class="{'border-danger': member.firstName[code].$dirty && !member.firstName[code].required}"
                              class="form-control">
                      </div><!--end col-->

                      <div class="col-sm-3">
                        <label class="control-label">Ազգանուն {{ label }}</label>
                        <input v-model="member.lastName[code].$model"
                              :id="`lastName${index}`"
                              placeholder="Ազգանուն"
                              type="text"
                              :class="{'border-danger': member.lastName[code].$dirty && !member.lastName[code].required}"
                              class="form-control">
                      </div><!--end col-->

                      <div class="col-sm-3">
                        <label for="position0" class="control-label">Պաշտոն {{ label }}</label>
                        <input v-model="member.position[code].$model"
                              :id="`position${index}`"
                              placeholder="Պաշտոն"
                              type="text"
                              :class="{'border-danger': member.position[code].$dirty && !member.position[code].required}"
                              class="form-control">
                      </div><!--end col-->
                    </div>
                    <!-- remove row button -->
                    <button type="button" v-if="members.length > 1" 
                        @click="removeFormRow(index)"
                        style="top: 0.4rem; right: 1rem;"
                        class="btn btn-outline-light border-0 position-absolute text-info h4">
                      <font-awesome-icon icon="times"/>
                    </button>
                  </div>
              </transition-group>
            </div>

            <div class="form-group mb-0 row py-3">
              <div class="col-sm-12">
                <button @click="addFormRow" type="button" class="btn btn-gradient-secondary mr-3">
                  <span class="fas fa-plus"></span> Նոր անդամ
                </button>
                <button @click="createNewDivision" type="button" class="btn btn-gradient-primary">
                  Հաստատել
                  <span v-if="isAddNewMemberPending" 
                      class="mr-3 spinner-border spinner-border-sm position-absolute" 
                      style="right: 0; top: 10px;"
                      role="status"
                      aria-hidden="true"></span>
                </button>
              </div>
            </div>

          </form>
        </div>
        <div v-else class="w-100" key="division-page">
          <h4 class="border-bottom pb-2">{{ selectedDivision.name || 'Ստորաբաժանում ' + selectedDivision.id}}</h4>
          <div class="w-100 py-3">
            <div class="row mb-3">
              <div class="col-auto">
                <h5>Անդամներ</h5>
              </div>
              <div v-click-outside="hideAddMemberModal" class="col-auto position-relative">
                <button @click="showAddMemberModal = !showAddMemberModal" 
                        class="btn btn-outline-light">
                  <font-awesome-icon icon="plus"/>
                </button>
                <div v-if="showAddMemberModal" class="border-left border-top bg-blue position-absolute" 
                          style="top: 44px; left: 22px; z-index: 1; width: 20px; height: 20px; transform: rotate(45deg)"></div>
                <div v-if="showAddMemberModal" 
                    style="top: 55px; width: 36vw; z-index: 2;"
                    class="position-absolute py-2 px-3 bg-white shadow-lg border border rounded">
                  <div class="form-row py-2" v-for="{code, label} in languages" :key="code">

                    <div class="col-lg-7">
                      <label class="control-label">Անուն Ազգանուն {{ label }}</label>
                      <input v-model="$v.newMember.name[code].$model"
                            :id="`firstName${code}`"
                            placeholder="Անուն Ազգանուն"
                            type="text"
                            :class="{'border-danger': $v.newMember.name[code].$dirty && !$v.newMember.name[code].required}"
                            class="form-control">
                    </div>

                    <div class="col-lg-5">
                      <label for="position0" class="control-label">Պաշտոն {{ label }}</label>
                      <input v-model="$v.newMember.position[code].$model"
                            :id="`position${code}`"
                            placeholder="Պաշտոն"
                            type="text"
                            :class="{'border-danger': $v.newMember.position[code].$dirty && !$v.newMember.position[code].required}"
                            class="form-control">
                    </div>

                  </div>
                  <button @click="addNewMember" class="float-right my-2 btn-sm btn btn-outline-blue">
                    Հաստատել
                    <!-- <font-awesome-icon icon="check-double"/> -->
                  </button>
                </div>
              </div>
            </div>
            <table class="table table-hover">
              <thead>
                 <tr>
                  <th scope="col" class="text-left">#</th>
                  <th scope="col">Անուն Ազգանուն</th>
                  <th scope="col">Անուն Ազգանուն Ռուսերեն</th>
                  <th scope="col">Պաշտոն</th>
                  <th scope="col">Պաշտոն Ռուսերեն</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody v-click-outside="() => !_.isEmpty(editableMember) ? editableMember = {} : void(0)">
                 <tr v-for="(member, index) in selectedDivision.members" 
                      :key="member.id">
                  <th scope="row" class="text-center">{{ index + 1 }}</th>
                  <td>
                    <input v-model="$v.editableMember.name.hy.$model"
                        v-if="editableMember.id === member.id"
                        type="text" 
                        :class="{'border-danger': $v.editableMember.name.hy.$dirty && !$v.editableMember.name.hy.required}"
                        class="form-control">
                    <span v-else>{{ member.name.hy }}</span>
                  </td>
                  <td>
                    <input v-model="$v.editableMember.name.ru.$model"
                        v-if="editableMember.id === member.id"
                        type="text" 
                        :class="{'border-danger': $v.editableMember.name.ru.$dirty && !$v.editableMember.name.ru.required}"
                        class="form-control">
                    <span v-else>{{ member.name.ru }}</span>
                  </td>
                  <td>
                    <input v-model="$v.editableMember.position.hy.$model"
                        v-if="editableMember.id === member.id"
                        type="text" 
                        :class="{'border-danger': $v.editableMember.position.hy.$dirty && !$v.editableMember.position.hy.required}"
                        class="form-control">
                    <span v-else>{{ member.position.hy }}</span>
                  </td>
                  <td>
                    <input v-model="$v.editableMember.position.ru.$model"
                        v-if="editableMember.id === member.id"
                        type="text" 
                        :class="{'border-danger': $v.editableMember.position.ru.$dirty && !$v.editableMember.position.ru.required}"
                        class="form-control">
                    <span v-else>{{ member.position.ru }}</span>
                  </td>
                  <td style="vertical-align: middle;" class="h5">
                    <div class="d-flex" v-if="editableMember.id === member.id">
                      <font-awesome-icon @click="editMember" 
                          style="cursor: pointer;" 
                          icon="check" 
                          class="text-success mr-3"/>
                      <font-awesome-icon @click="editableMember = {}" 
                          style="cursor: pointer;" 
                          icon="times" 
                          class="text-info"/>
                    </div>
                    <div class="d-flex" v-else>
                      <font-awesome-icon @click="editableMember = _.cloneDeep(member)" 
                          style="cursor: pointer;" 
                          icon="edit" 
                          class="mr-3"/>
                      <font-awesome-icon @click="deleteMember(member.id)" 
                          icon="trash-alt" 
                          style="cursor: pointer;" 
                          class="text-danger"/>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div v-for="member in selectedDivision.members" 
                  :key="member.id" 
                  class="row">
              <div class="col-auto">
                <span>{{ member.name.hy }}</span>
              </div>
              <div class="col-auto">
                <span>{{ member.position.hy }}</span>
              </div>
            </div> -->
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { email, required } from 'vuelidate/lib/validators'
  import Alert from '@/components/helpers/Alert'
  import ClickOutside from 'vue-click-outside'

  const getIndex =(() => {
    let index = 0
    return () => {
      return index++
    }
  })()
  const getMemberObj = () => ({ 
    index: getIndex(), 
    firstName: {
      hy: '',
      ru: ''
    }, 
    lastName: {
      hy: '',
      ru: ''
    }, 
    position: {
      hy: '',
      ru: ''
    }
  })
  const getNewMemberObj = () => ({
    name: {
      hy: '',
      ru: ''
    },
    position: {
      hy: '',
      ru: ''
    }
  })
  export default {
    name: 'ResponsibleUnit',
    components: { Alert },
    directives: { ClickOutside },
    data() {
      return {
        newDivision: {
          email: '',
          firstName: {
            hy: '',
            ru: '',
          },
          lastName: {
            hy: '',
            ru: ''
          }
        },
        newMember: getNewMemberObj(),
        showAddMemberModal: false,
        members: [getMemberObj()],
        editableMember: {},
        isCreatePage: false,
        selectedDivision: {},
        languages: [
          {code: 'hy', label: 'հայերեն'}, 
          {code: 'ru', label: 'ռուսերեն'}
        ],
        usedEmail: false,
        isAddNewMemberPending: false
      }
    },
    computed: {
      userChildren() {
        return this.$store.getters['user/userChildren']
      },
      responsibleUnits() {
        return this.$store.getters['user/responsibleUnits']
      },
      emailRequired () {
        return this.$v.newDivision.email.$dirty && !this.$v.newDivision.email.required
      },
    },
    watch: {
      responsibleUnits(newUnits, oldUnits) {
        // eslint-disable-next-line no-undef
        if(oldUnits.length && !_.isEqual(newUnits, oldUnits)) {
          this.selectedDivision = newUnits.find(unit => unit.id === this.selectedDivision.id)
        }
      }
    },
    mounted() {
      this.$store.dispatch('user/getResponsibleUnits').then(response => {
        this.selectedDivision = response.data.data[0]
      })
    },
    methods: {
      addFormRow() {
        this.members.push(getMemberObj())
      },
      removeFormRow(index) {
        this.members.splice(index, 1)
      },
      selectDivision(division) {
        this.isCreatePage = false
        this.selectedDivision = division
      },
      createNewDivision() {
        if(!this.$v.members.$invalid && !this.$v.newDivision.$invalid) {
          this.$store.dispatch('user/createResponsibleUnit', {
            newDivision: this.newDivision,
            members: this.members
          }).then(response => {
            if(response.data.status) {
              this.isCreatePage = false
            } else {
              this.usedEmail = true
            }
          })
        } else {
          this.$v.members.$touch()
          this.$v.newDivision.$touch()
        }
      },
      hideAddMemberModal() {
        this.showAddMemberModal = false
      },
      addNewMember() {
        if(!this.$v.newMember.$invalid) {
          this.isAddNewMemberPending = true
          this.$store.dispatch('user/addNewMember', {
            unitId: this.selectedDivision.id,
            newMember: this.newMember
          }).then(response => {
            this.isAddNewMemberPending = false
            this.newMember = getNewMemberObj()
            this.showAddMemberModal = false
          })
        } else {
          this.$v.newMember.$touch()
        }
      },
      deleteMember(memberId) {
        this.$store.dispatch('user/deleteMember', memberId)
      },
      editMember() {
        if(!this.$v.editableMember.$invalid) {
          this.$store.dispatch('user/editMember', this.editableMember).then(response => {
            this.editableMember = {}
          })
        } else {
          this.$v.editableMember.$touch()
        }
      }
    },
    validations: {
      newDivision: {
        email: {email, required},
        firstName: {
            hy: {required},
            ru: {required},
          },
          lastName: {
            hy: {required},
            ru: {required}
          }
      },
      members: {
        $each: {
          index: {},
          firstName: {
            hy: {required},
            ru: {required}
          },
          lastName: {
            hy: {required},
            ru: {required}
          },
          position: {
            hy: {required},
            ru: {required}
          }
        }
      },
      newMember: {
        name: {
          hy: {required},
          ru: {required}
        },
        position: {
          hy: {required},
          ru: {required}
        }
      },
      editableMember: {
        name: {
          hy: {required},
          ru: {required}
        },
        position: {
          hy: {required},
          ru: {required}
        }
      },
    }
  }
</script>

<style scoped>
  .list-enter-active, .list-leave-active {
    transition: all 0.4s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
