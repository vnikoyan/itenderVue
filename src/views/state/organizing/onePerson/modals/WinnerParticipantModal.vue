<template>
  <modal 
    class="winner-participant-modal"
    name="winner-participant-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="handleOpen"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
  >
    <div id="modal-header" class="action-modal">
      <div class="w-75 d-flex">
        <p>Հաղթած մասնակցի տվյալները</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('winner-participant-modal')"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="row mx-0 bg-white">
        <div v-if="participants.length" class="col-lg-12 col-sm-12 py-3">
          <div class="w-100">
            <div class="tab-content">
              <template v-if="showParticipantGroupData">

                <div class="checkbox checkbox-primary my-3">
                  <input id="is-agency-agreement" v-model="currentParticipantGroup.is_agency_agreement" type="checkbox">
                  <label for="is-agency-agreement">Գործակալության կամ ենթակապալի պայմանագիր</label>
                </div>
                <div class="checkbox checkbox-primary mb-3">
                  <input id="is-cooperation" v-model="currentParticipantGroup.is_cooperation" type="checkbox">
                  <label for="is-cooperation">Համատեղ գործունեություն</label>
                </div>

                <div class="form-check form-check-inline">
                  <input v-model="isPhysicalPerson"
                         :value="false"
                         id="is-not-physical-person"
                         type="radio"
                         class="form-check-input">
                  <label for="is-not-physical-person" class="form-check-label">Իրավաբանական անձ (նաև ԱՁ)</label>
                </div>
                <div class="form-check form-check-inline mb-3">
                  <input v-model="isPhysicalPerson"
                         :value="true"
                         id="is-physical-person"
                         type="radio"
                         class="form-check-input">
                  <label for="is-physical-person" class="form-check-label">Ֆիզիկական անձ</label>
                </div>

                <div v-if="currentParticipantGroup.is_cooperation" >
                  <ul class="nav nav-pills nav-justified" style="overflow-x: scroll" role="tablist">
                    <li v-for="(participant, index) in currentParticipantGroup.participant"
                        :key="index"
                        style="min-width: 130px;"
                        class="nav-item waves-effect waves-light">
                      <a @click.prevent="setCurrentParticipant(participant)"
                         class="nav-link d-flex align-items-center justify-content-between h-100 position-relative overflow-hidden"
                         :class="{'active': currentParticipant.id === participant.id}"
                         :aria-selected="currentParticipant.id === participant.id"
                         role="tab">
                        <span class="mr-2" style="max-width: 110px">
                          {{ participant.name.hy || `Մասնակից ${index + 1}` }} {{ participant.isMain ? '(գլխավոր)' : ''}}
                        </span>
                        <div title="հեռացնել">
                          <font-awesome-icon
                            @click.stop="removeParticipantFromGroup(participant.id)"
                            v-if="index > 0"
                            class="position-absolute"
                            style="top: 5px; right: 7px;"
                            icon="times"
                          />
                        </div>
                      </a>
                    </li>
                    <li style="min-width: 120px;" class="nav-item waves-effect waves-light">
                      <a class="nav-link d-flex align-items-center justify-content-center h-100"
                         @click.prevent="addParticipantToGroup" href="">
                        <span class="mr-2">Մասնակից</span>
                        <i class="fa fa-plus"></i></a>
                    </li>
                  </ul>
                </div>
              </template>

              <template v-for="participant in $v.currentParticipantGroup.participant.$each.$iter">
                <div v-if="currentParticipant.id === participant.id.$model"
                     :key="participant.id.$model"
                     :id="'participant-' + participant.id"
                     class="tab-pane pt-3 pl-0 pr-0 active"
                     role="tabpanel">

                  <template v-if="showParticipantGroupData">

                    <template v-if="isPhysicalPerson">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label ">Սոց. քարտ</label>
                        <div class="col-sm-9">
                          <the-mask v-model="participant.id_card_number.$model"
                                    type="text" class="form-control"
                                    mask="####################"
                                    placeholder="Սոց. քարտ"
                                    id="id-card-number"
                                    name="id-card-number" required />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Անուն</label>
                        <div class="col-sm-9">
                          <div class="input-user">
                            <input v-model="participant.first_name.hy.$model"
                                   @change="$set(currentParticipant.real_beneficiaries[0], 'first_name', currentParticipant.first_name.hy)"
                                   type="text" class=" form-control my-1" name="processName" placeholder="Հայերեն">
                          </div>
                          <div class="input-user">
                            <input v-model="participant.first_name.ru.$model" type="text" class="form-control my-1" name="processNameRu" placeholder="Ռուսերեն">
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Ազգանուն</label>
                        <div class="col-sm-9">
                          <div class="input-user">
                            <input v-model="participant.last_name.hy.$model"
                                   @change="$set(currentParticipant.real_beneficiaries[0], 'last_name', currentParticipant.last_name.hy)"
                                   type="text" class=" form-control my-1" name="processName" placeholder="Հայերեն">
                          </div>
                          <div class="input-user">
                            <input v-model="participant.last_name.ru.$model" type="text" class="form-control my-1" name="processNameRu" placeholder="Ռուսերեն">
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Հայրանուն</label>
                        <div class="col-sm-9">
                          <div class="input-user">
                            <input v-model="participant.middle_name.hy.$model"
                                   @change="$set(currentParticipant.real_beneficiaries[0], 'middle_name', currentParticipant.middle_name.hy)"
                                   type="text" class=" form-control my-1" name="processName" placeholder="Հայերեն">
                          </div>
                          <div class="input-user">
                            <input v-model="participant.middle_name.ru.$model" type="text" class="form-control my-1" name="processNameRu" placeholder="Ռուսերեն">
                          </div>
                        </div>
                      </div>
                    </template>

                    <template v-else>

                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label ">ՀՎՀՀ</label>
                        <div class="col-sm-9 position-relative"
                             v-click-outside="() => {showSearchResult = false}">
                    <span v-if="participant.isInBlackList.$model" class="position-absolute text-danger small"
                          style="bottom: -17px; left: 15px; z-index: 99;">
                      Կա գրառում սև ցուցակում
                    </span>
                          <input 
                            v-model="participant.tin.$model"
                            @input="event => searchParticipants(event.target.value)"
                            autocomplete="off"
                            class="form-control"
                            id="tin"
                            type="number"
                            placeholder="Փնտրել (նվազագույնը 3 նիշ)"
                          >
                          <div v-if="isSearching"
                                class="spinner-border spinner-border-sm position-absolute"
                                style="top: 7px; left: -12px;"
                                role="status"></div>
                            <ul v-if="showSearchResult"
                              @v-click-outside="() => console.log()"
                              class="position-absolute border rounded-bottom w-75 bg-white shadow"
                              style="cursor: pointer; z-index: 99; overflow-y: auto; list-style-type: none; padding: 0!important;">
                              <template v-if="searchResults.length">
                                <li
                                    v-for="(item, index) in searchResults"
                                    :key="index"
                                    @click="() => {participants.filter(participant => item.tin === participant.tin).length===0 && selectFromSearch(item)}"
                                    class="searchItem p-3"
                                    aria-expanded="false"
                                    :class="{'border-top': index > 0, 'bg-secondary text-white': participants.filter(participant => item.tin === participant.tin).length>0}">
                                  >
                                  <font-awesome-icon icon="user-tie" class="mr-2"/>
                                  <!--                    <span class="font-weight-bold">{{ item.query }}</span>-->
                                  <span>{{ item.tin }}</span>
                                  <span class="mr-2"> ({{ item.name.hy }}) </span>
                                  <span v-if="item.isInBlackList" class="mr-2 text-danger">կա նշում սև ցուցակում</span>
                                </li>
                              </template>
                              <li v-else class="p-3">
                                <span > Որոնման արդյունքում ոչինչ չի գտնվել </span>
                              </li>
                            </ul>
                          </div>
                      </div>

                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Անվանում</label>
                        <div class="col-sm-9">
                          <div class="input-user">
                            <input v-model="participant.name.hy.$model"
                                   type="text" class=" form-control my-1" name="processName" placeholder="Հայերեն">
                          </div>
                          <div class="input-user">
                            <input v-model="participant.name.ru.$model" type="text" class="form-control my-1" name="processNameRu" placeholder="Ռուսերեն">
                          </div>
                        </div>
                      </div>
                    </template>

                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label ">Հասցե</label>
                      <div class="col-sm-9">
                        <div class="input-user">
                          <input v-model="participant.address.hy.$model"
                                 type="text" class=" form-control my-1" name="processName" placeholder="Հայերեն">
                        </div>
                        <div class="input-user">
                          <input v-model="participant.address.ru.$model"
                                 type="text" class=" form-control  my-1" name="processNameRu" placeholder="Ռուսերեն">
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label ">Էլ.
                        հասցե</label>
                      <div class="col-sm-9">
                        <input v-model="participant.email.$model" type="email" class="form-control"
                               id="exampleInputEmail1" aria-describedby="emailHelp"
                               placeholder="Էլ. փոստ" required>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label ">Հեռախոսահամար</label>
                      <div class="col-sm-9">
                        <input v-model="participant.phone.$model"
                               type="tel" class="form-control" placeholder="+374 99 99 99 99" id="phone" name="phone" required>
                      </div>
                    </div>

                  </template>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label ">Հայտի ներկայացման օր</label>
                    <div class="col-sm-9">
                      <input v-model="participant.date_of_submission.$model"
                             class="form-control" type="date" id="example-date-input01">
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <div v-if="currentParticipant.is_docs_satisfactory && currentParticipant.price_offer_exists" class="py-3">
              <div>
                <table v-if="attachedLotsForParticipant.length" class="table">
                  <thead>
                  <tr>
                    <th style="min-width: 70px;">Չ/Հ</th>
                    <th>CPV կոդ</th>
                    <th>Գնման առարկայի անվանում</th>
                    <th>Նախահաշվային գին</th>
                    <th>Արժեք </th>
                    <th>
                      <div v-tooltip="'Ընտրել բոլորը'" class="checkbox checkbox-primary">
                        <input @change="selectAllVat" :checked="isAllVat" id="is-all-vat" type="checkbox">
                        <label for="is-all-vat">ԱԱՀ</label>
                      </div>
                    </th>
                    <th>Ընդհամենը</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(lot, index) in attachedLotsForParticipant" :key="index">
                    <td class="p-0" style="font-size: 12px;">{{ lot.view_id }}</td>
                    <td class="p-0" style="font-size: 12px;">{{ lot.cpv_code }}{{ lot.cpv_drop && '/'}}{{ lot.cpv_drop }}</td>
                    <td class="p-0" style="font-size: 12px;">{{ lot.cpv_name }}</td>
                    <td class="p-0" style="font-size: 12px;">{{ lot.total_unit_amount.toFixed(2) }}դր.</td>
                    <td class="p-0">
                      <input v-model.number="lot.total_price"
                             @input="calculateByTotal(index)"
                             @keyup.enter="goToNextRow"
                             @focus="handleLotInputsFocus($event, {row: index, activeFields: '123'})"
                             v-positive-only.none-zero
                             type="number"
                             min="1"
                             :class="{'border-primary': focusedLotFields.row === index && _.includes(focusedLotFields.activeFields, '1')}"
                             class="form-control">
                    </td>
                    <td>
                      <div class="d-flex flex-row-reverse justify-content-between align-items-center">
                        <input v-model.number="lot.vat"
                               @keyup.enter="goToNextRow"
                               @input="calculateByVat(index)"
                               @focus="handleLotInputsFocus($event, {row: index, activeFields: '23'})"
                               type="number"
                               min="1"
                               :class="{'border-primary': focusedLotFields.row === index && _.includes(focusedLotFields.activeFields, '2')}"
                               class="form-control">
                        <input v-model="lot.is_with_vat"
                               :true-value="1"
                               :false-value="0"
                               :data-index="index"
                               @change="handleVatSelect(lot.is_with_vat, index)"
                               class="form-check-input mt-0"
                               type="checkbox">
                      </div>
                    </td>
                    <td>
                      <input v-model.number="lot.overall"
                             @focus="handleLotInputsFocus($event, {row: index, activeFields: '3'})"
                             @keyup.enter="goToNextRow"
                             v-positive-only.none-zero
                             type="text"
                             :class="{'border-primary': focusedLotFields.row === index && _.includes(focusedLotFields.activeFields, '3')}"
                             class="form-control">
                      <span v-if="lot.overall > lot.total_unit_amount"
                            class="text-danger mb-0" style="font-size: 0.6rem">
                            գերազանցում է նախահաշվային գինը
                      </span>
                    </td>
                    <td class="position-relative">
                      <span v-tooltip="'Հեռացնել'"
                          @click="$modal.show('delete-modal', {
                            msg: 'Հեռացնե՞լ չափաբաժինը',
                            callback: () => removeAttachedLot(lot)
                          })"
                          class="text-danger position-absolute-center px-3"
                          style="cursor:pointer">
                        <i class="fas fa-trash-alt"></i>
                      </span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <delete-modal />
      </div>
    </div>
    <div id="modal-footer">
      <button @click="save" :disabled="attachedLotsForParticipant && attachedLotsForParticipant.find(lot => lot.overall > lot.total_unit_amount)" type="submit" class="btn btn-secondary ">
        <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span>Ուղարկել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  import ClickOutside from 'vue-click-outside'
  import DeleteModal from '@/components/helpers/DeleteModal'
  import $ from 'jquery'

  export default {
    name: "WinnerParticipantModal",
    components: { DeleteModal },
    directives: { ClickOutside },
    data() {
      return {
        isLoadingXML: false,
        isSaving: false,
        isPhysicalPerson: false,
        is_agency_agreement: false,
        is_cooperation: false,
        isAllVat: true,
        isAllNotSatisfactory: false,
        organizedLots: [],
        participants: [],
        currentParticipantGroup: {
          participant: []
        },
        currentParticipant: {},
        attachedLotsForParticipant: [],
        lotsWithVatLength: 0,
        searchResults: [],
        showParticipantGroupData: true,
        showRealBeneficiaries: true,
        showSearchResult: false,
        searchTimeoutId: null,
        isSearching: false,
        focusedLotFields: {},
      }
    },
    computed: {
      currentOrganized() {
        return this.$store.getters['organizeOnePerson/currentOrganized']
      },
      locale() {
        return this.$store.getters['user/locale']
      },
      organizedRows() {
        return this.$store.getters['organizeOnePerson/organizedRows']
      },
    },
    watch: {
      lotsWithVatLength(length) {
        this.isAllVat = length === this.attachedLotsForParticipant.length
      },
      'currentParticipantGroup.participant'(value) {
        if(value.length && value[0].tin && value[0].tin !== ''){
          this.searchParticipants(value[0].tin)
        }
      }
    },
    mounted() {
      this.organizedLots.push(...this.organizedRows)
    },
    methods: {
      consoleLog(key, data){
        console.log(key, data);
      },
      save() {
        if(!this.$v.currentParticipantGroup.$invalid) {
          const requestMethod = this.currentParticipantGroup.isNew ? 'post' : 'put'
          // const requestMethod = 'post'
          this.isSaving = true
          const groupIsCooperation = this.currentParticipantGroup.is_cooperation!==undefined?this.currentParticipantGroup.is_cooperation:this.currentParticipantGroup.is_cooperation
          const groupIsAgencyAgreement = this.currentParticipantGroup.is_agency_agreement!==undefined?this.currentParticipantGroup.is_agency_agreement:this.currentParticipantGroup.is_agency_agreement
          this.currentParticipantGroup.participant.forEach(participant => {
            if(participant.id_card_number){
              participant.name = {
                hy: `${participant.first_name.hy} ${participant.middle_name.hy} ${participant.last_name.hy}`,
                ru: `${participant.first_name.ru} ${participant.middle_name.ru} ${participant.last_name.ru}`
              }
              participant.is_physical_person = true;
            } else {
              participant.is_physical_person = false;
            }
          });
          const totalPrice = this.attachedLotsForParticipant.map(l => l.overall).reduce((a, b) => a + b, 0)
          this.attachedLotsForParticipant.forEach((lot) => {
            lot.participant_id = this.currentParticipantGroup.participant[0].user_id;
            lot.total = totalPrice
            lot.get_response = 0
          });
          const participantGroupRequestData = Object.assign({
            organize_id: this.currentOrganized.id,
            id: this.currentParticipantGroup.id,
            is_cooperation: groupIsCooperation,
            is_agency_agreement: groupIsAgencyAgreement,
            user_id: this.currentParticipantGroup.participant[0].user_id,
          }, {
            participant: this.currentParticipantGroup.participant,
            lots: this.attachedLotsForParticipant.filter((lot) => lot.overall)
          })
          if(requestMethod === 'post'){
            this.$client[requestMethod]('participant-group', participantGroupRequestData).then(response => {
              this.currentParticipantGroup.id = response.data;
              this.currentParticipantGroup.isNew = false;
              this.isSaving = false
              this.publish()
              this.$notify({
                group: 'foo',
                type: 'success',
                text: 'Հաջողությամբ պահպանված է'
              })
            }).catch(e => {
              this.isSaving = false
            })
          } else {
            this.$client.put(`participant-group/${participantGroupRequestData.id}`, participantGroupRequestData).then((response) => {
              if(response.data.status){
                this.publish()
              }
              this.isSaving = false
            }).catch(e => {
              this.$notify({
                group: 'foo',
                type: 'error',
                title: 'Ինչ որ բան այն չէ',
                text: 'Կրկին փորձեք!'
              })
              this.isSaving = false
            })
          }
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            text: 'Լրացրեք բոլոր դաշտերը պահպանելու համար!'
          })
        }
      },
      async updatePrices(){
        await this.data.forEach(async(row) => {
          if(row.cpv_name !== 'Ընդամենը'){
            const requestObj = {
              participant_id: this.me.id,
              is_satisfactory: 1,
              organize_row_id: row.id,
              cost: row.overall, 
              value: row.value, 
              vat: row.vat,
              total_price: !this.organize.winner_by_lots ? this.getTotalTotalPrice() : 0 
            }
            const currUserOffer = row.offers.find(item => item.participant_id === this.me.id);
            if(currUserOffer){
              this.$client.put(`participant-row/${currUserOffer.id}`, requestObj).then((response) => {
                this.isSuccess = true;
              }).catch(e => {
                this.isSuccess = false;
              })
            } else {
              this.$client.post(`participant-row`, requestObj).then(response => {
                this.isSuccess = true;
              }).catch(e => {
                this.isSuccess = false;
              })
            }
          }
        })
      },
      addParticipantToGroup() {
        this.currentParticipantGroup.participant.push(this.getParticipantObj())
      },
      searchParticipants(query) {
        this.searchResults = []
        // const query = event.target.value
        if(query.length < 3) {
          if(this.showSearchResult) this.showSearchResult = false
          if(this.isSearching) this.isSearching = false
          if(this.searchTimeoutId) clearTimeout(this.searchTimeoutId)
          return
        }
        if(this.searchTimeoutId) {
          clearTimeout(this.searchTimeoutId)
        }
        this.searchTimeoutId = setTimeout(() => {
          this.isSearching = true
          setTimeout(() => {
            this.$client.get('user/search', {
              params: {
                q: query
              }
            }).then(({data}) => {
              data.forEach((item) => {
                const objItem = {
                  query,
                  id: item.id,
                  user_id: item.id,
                  tin: item.tin,
                  name: {
                    hy: `«${item.organisation.name.hy || ''}» ${item.organisation.company_type.hy || ''}`,
                    ru: `«${item.organisation.name.ru || ''}» ${item.organisation.company_type.ru || ''}`,
                  },
                  address: {
                    hy: `${item.organisation.region.hy || ''} ${item.organisation.city.hy || ''}  ${item.organisation.address.hy || ''}`,
                    ru: `${item.organisation.region.ru || ''} ${item.organisation.city.ru || ''}  ${item.organisation.address.ru || ''}`,
                  },
                  phone: item.phone,
                  email: item.email,
                }
                this.searchResults.push(objItem);
              })
            }).catch(e => {
              console.log('error from participant search')
            })
            this.isSearching = false
            this.showSearchResult = true
          }, 400)
        }, 500)
      },
      selectFromSearch(searchItem) {
        this.currentParticipant = Object.assign(this.currentParticipant, searchItem)
        setTimeout(() => {
          this.showSearchResult = false
        }, 150)
      },
      handleSearchKeyup(event) {
        if(['ArrowUp','ArrowDown'].includes(event.key)) {
          event.preventDefault()
        }
      },
      fillLotTable(lots) {
        this.attachedLotsForParticipant.push(..._.cloneDeep(lots).map(lot => Object.assign({
          id: lot.id,
          organize_row_id: lot.id,
          view_id: lot.view_id,
          cpv_name: lot.cpv_name,
          cpv_code: lot.cpv_code,
          cpv_drop: lot.cpv_drop,
          total_unit_amount: lot.count * lot.unit_amount,
          total_price: null,
          is_with_vat: this.isAllVat ? 1 : 0,
          vat: null,
          overall: null,
          value: null,
          is_satisfactory: 1,
        })))
      },
      handleLotInputsFocus(event, details) {
        // eslint-disable-next-line eqeqeq
        if(event.target.value == 0) {
          event.target.select()
        }
        this.focusedLotFields = details
      },
      selectAllVat() {
        const nextValue = !this.isAllVat
        this.lotsWithVatLength = nextValue ? this.attachedLotsForParticipant.length : 0
        this.attachedLotsForParticipant.forEach((lot, index) => {
            lot.is_with_vat = nextValue ? 1 : 0
            this.calculateByTotal(index)
            this.$set(this.attachedLotsForParticipant, index, lot)
        })
        this.isAllVat = nextValue
      },
      selectAllNotSatisfactory() {
        const nextValue = !this.isAllNotSatisfactory
        this.attachedLotsForParticipant.forEach((lot, index) => {
          lot.is_satisfactory = nextValue ? 0 : 1
          this.$set(this.attachedLotsForParticipant, index, lot)
        })
        this.isAllNotSatisfactory = nextValue
      },
      handleVatSelect(selected, index) {
        selected ? this.lotsWithVatLength++ : this.lotsWithVatLength--
        this.calculateByTotal(index)
      },
      setCurrentParticipant(participant) {
        if(!_.isEqual(this.currentParticipant, participant)) {
          this.currentParticipant = participant
        }
      },
      removeParticipantFromGroup(participantId) {
        const groupedParticipants = this.currentParticipantGroup.participant.filter(participant => participant.id !== participantId)
        if(participantId === this.currentParticipant.id) {
          this.currentParticipant = this.currentParticipantGroup.participant[0]
        }
        this.$set(this.currentParticipantGroup, 'participant', groupedParticipants)
      },
      getParticipantGroupObj () {
        const participantObj = this.getParticipantObj()
        participantObj.isMain = true
        return {
          isNew: true,
          organize_id: 5,
          id: new Date().getTime(),
          is_cooperation: false,
          is_agency_agreement: false,
          lots: [],
          participant: [participantObj],
        }
      },
      getParticipantObj() {
        const participant = {
          id: new Date().getTime(),
          address: {
            hy: '',
            ru: ''
          },
          id_card_number: '',
          first_name: {
            hy: '',
            ru: ''
          },
          last_name: {
            hy: '',
            ru: ''
          },
          middle_name: {
            hy: '',
            ru: ''
          },
          tin: '',
          name: {
            hy: '',
            ru: ''
          },
          email: '',
          phone: '',
          date_of_submission: '',
          is_docs_satisfactory: 1,
          price_offer_exists: 1,
          isInBlackList: false,
          real_beneficiaries: [this.getRealBeneficiaryObj()]
        }
        if(this.isPhysicalPerson) {
          Object.assign(participant, {
            id_card_number: '',
            first_name: {
              hy: '',
              ru: ''
            },
            last_name: {
              hy: '',
              ru: ''
            },
            middle_name: {
              hy: '',
              ru: ''
            }
          })
        } else {
          Object.assign(participant, {
            tin: '',
            name: {
              hy: '',
              ru: ''
            },
          })
        }
        return participant
      },
      getRealBeneficiaryObj() {
        return {
          id: new Date().getTime(),
          first_name: '',
          last_name: '',
          middle_name: '',
          identification_type: 'passport',
          passport_serial_number: '',
          passport_number: '',
          identification_number: '',
          is_resident: 1
        }
      },
      calculateByTotal(index) {
        const lot = this.attachedLotsForParticipant[index]
        lot.vat = lot.is_with_vat && lot.total_price ? Number((lot.total_price * 0.2).toFixed(2)) : 0
        lot.overall = lot.total_price ? lot.total_price + lot.vat : 0
        this.$set(this.attachedLotsForParticipant, index, lot)
      },
      calculateByVat(index) {
        const lot = this.attachedLotsForParticipant[index]
        lot.overall = lot.is_with_vat ? lot.total_price + lot.vat : lot.total_price
        this.$set(this.attachedLotsForParticipant, index, lot)
      },
      removeAttachedLot(lot) {
        const foundIndex = this.attachedLotsForParticipant.findIndex(selected => selected.id === lot.id)
        if(foundIndex > -1) {
          this.attachedLotsForParticipant.splice(foundIndex, 1)
          this.$modal.hide('delete-modal')
        }
      },
      handleOpen(event){
        this.publish = event.params
        this.attachedLotsForParticipant=[]
        this.participants=[]
        this.$client.get(`participant-group/getByOrganize/${this.$route.params.id}`).then(response => {
          const participantsData = response.data;
          if(participantsData && participantsData.length) {
            this.participants = participantsData
          } else {
            this.participants.push(this.getParticipantGroupObj())
          }
          this.currentParticipantGroup = this.participants[this.participants.length - 1]
          this.currentParticipant = this.currentParticipantGroup.participant[0]
          this.fillLotTable(this.organizedRows)
          if(this.currentParticipantGroup.lots.length){
            const lots = [];
            this.currentParticipantGroup.lots.forEach((groupLot) => {
              const organizedLot = this.organizedRows.find((lot) => lot.id===groupLot.organize_row_id)
              var lot = {
                view_id: organizedLot.view_id,
                id: organizedLot.id,
                cpv_code: organizedLot.cpv_code,
                cpv_drop: organizedLot.cpv_drop,
                cpv_name: organizedLot.cpv_name,
                is_satisfactory: groupLot.is_satisfactory,
                is_with_vat: groupLot.vat?1:0,
                total_unit_amount: +groupLot.cost,
                organize_row_id: groupLot.organize_row_id,
                overall: +groupLot.cost,
                total_price: +groupLot.value,
                vat: +groupLot.vat,
              }
              lots.push(lot)
            })
            this.attachedLotsForParticipant = lots
          }
        })
      },
      goToNextRow(event) {
        let row = $(event.target)
        while(row.prop('tagName') !== 'TR') {
          row = row.parent()
        }
        row.next().find('input:first').focus()
      },
    },
    validations() {
      const rules = {
        currentParticipantGroup: {
          participant: {
            $each: {
              id: {},
              address: {
                hy: {required},
                ru: {required}
              },
              isInBlackList: {},
              email: {required, email},
              phone: {required},
              date_of_submission: {required},
              is_docs_satisfactory: {required},
              price_offer_exists: {required},
            }
          }
        }
      }
      // if(this.currentParticipantGroup.participant[0].price_offer_exists) {
      //   Object.assign(rules.currentParticipantGroup, {
      //     lots: {
      //       required,
      //       $each: {required}
      //     }
      //   })
      // }
      if(this.isPhysicalPerson) {
        Object.assign(rules.currentParticipantGroup.participant.$each, {
          id_card_number: {required},
          first_name: {
            hy: {required},
            ru: {required}
          },
          last_name: {
            hy: {required},
            ru: {required}
          },
          middle_name: {
            hy: {required},
            ru: {required}
          }
        })
      } else {
        Object.assign(rules.currentParticipantGroup.participant.$each, {
          tin: {required},
          name: {
            hy: {required},
            ru: {required}
          },
        })
      }
      return rules
    }
  }
</script>

<style scoped>
  .searchItem:hover {
    background-color: #006BE6;
    color: #fff;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .2s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
</style>
