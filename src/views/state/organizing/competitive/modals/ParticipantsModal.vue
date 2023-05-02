<template>
  <modal 
    class="participants-modal"
    name="participants-modal"
    @closed="$emit('updateComparisonData')"
    @before-open="handleOpen"
    :clickToClose="false"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="85%"
    height="85%"
    style="z-index: 2606"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
          <p>Մասնակիցներ</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="handleClose"
              aria-label="Close"
      >
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
          </svg>
      </button>
    </div>
    <div id="modal-body">
      <div class="row p-0 m-0 bg-white h-100">
        <div class="col-lg-3 col-sm-12 border-right p-3">
          <h6 id="procurement-name">
            {{ currentOrganized.translations && currentOrganized.translations.name[locale] }} -
            {{ currentOrganized.translations && currentOrganized.translations.code[locale] }}
          </h6>

          <div id="participants-section" class="py-3">
            <button @click="addParticipantGroup"
                    type="button"
                    class="btn btn-primary mb-4 br-8"><span>Մասնակից</span> <i class="ml-2 fa fa-plus"></i></button>
            <ul v-if="participants.length" class="nav nav-pills flex-column bg-white">
              <li v-for="participantGroup in participants" :key="participantGroup.id" class="nav-item mb-3 border br-8">
                <a @click.prevent="setCurrentParticipantGroup(participantGroup)"
                   href=""
                   :class="{'active': participantGroup.id === currentParticipantGroup.id}"
                   class="nav-link d-flex justify-content-between align-items-center br-8">
                  <span style="font-size: 13px;">{{ participantGroup.participant[0].name.hy || `Նոր մասնակից`}}</span>
                  <span @click.stop.prevent="$modal.show('delete-modal', {
                    msg: 'Հեռացնել մասնակցին',
                    callback: () => {removeParticipantGroup(participantGroup)}
                  })">
                    <font-awesome-icon icon="times"/>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="participants.length" class="col-lg-9 col-sm-12 py-3 pr-0">
          <div class="w-100">
            <div class="tab-content">
              <div @click="showParticipantGroupData = !showParticipantGroupData"
                   style="cursor: pointer;"
                   class="d-flex">
                <font-awesome-icon :icon="showParticipantGroupData ? 'angle-down' : 'angle-right'"
                                   class="h4 mr-2"/>
                <p class="h6 mr-4">
                  Մասնակ{{currentParticipantGroup.participant.length > 1 ? 'իցների' : 'ցի'}} տվյալներ
                </p>
              </div>

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
                     :id="`participant-${participant.id.$model}`"
                     class="tab-pane pt-3 pl-0 pr-0 active"
                     role="tabpanel">

                  <!-- todo: make for this separate autocomplete component (participantSearch.vue) -->
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
                            @input="searchParticipants"
                            autocomplete="off"
                            class="form-control"
                            id="tin"
                            type="number"
                            placeholder="Փնտրել (նվազագույնը 3 նիշ)"
                          >
                          <span v-if="isCurrentInBlackList" class="mr-2 text-danger">կա նշում սև ցուցակում</span>
                          <div v-if="isSearching"
                                class="spinner-border spinner-border-sm position-absolute"
                                style="top: 7px; left: -12px;"
                                role="status"></div>
                            <ul v-if="showSearchResult"
                              @v-click-outside="() => console.log()"
                              class="position-absolute border rounded-bottom w-75 bg-white "
                              style="cursor: pointer; z-index: 99; overflow-y: auto; list-style-type: none; padding: 0!important;">
                              <template v-if="searchResults.length">
                                <li
                                    v-for="(item, index) in searchResults"
                                    :key="index"
                                    @click="() => {participants.filter(participant => item.tin === participant.tin).length===0 && selectFromSearch(item)}"
                                    class="searchItem p-3"
                                    :class="{'border-top': index > 0, 'bg-secondary text-white': participants.filter(participant => item.tin === participant.tin).length>0}">
                                  >
                                  <font-awesome-icon icon="user-tie" class="mr-2"/>
                                  <!--                    <span class="font-weight-bold">{{ item.query }}</span>-->
                                  <span>{{ item.tin }}</span>
                                  <span v-if="item.name.hy" class="mr-2"> ({{ item.name.hy }}) </span>
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

                    <!-- Real beneficiaries-->
                    <!-- <div class="py-3">
                      <div class="d-flex mb-3">
                        <div style="cursor: pointer;"
                             class="d-flex mr-4">
                          <p class="h5">
                            Իրական շահառու{{participant.real_beneficiaries.$model.length > 1 ? 'ներ' : ''}}
                          </p>
                        </div>
                        <font-awesome-icon @click="addRealBeneficiary"
                                           v-if="!isPhysicalPerson"
                                           v-tooltip="'Ավելացնել շահառու'"
                                           class="h4 text-secondary"
                                           style="cursor: pointer" icon="plus" />
                      </div>
                      <div v-for="(real_beneficiary, index) in participant.real_beneficiaries.$each.$iter"
                           class="border border-rounded px-3 py-4  mb-3 position-relative"
                           :key="index">
                        <font-awesome-icon icon="times"
                                           v-if="currentParticipant.real_beneficiaries.length > 1"
                                           @click="removeRealBeneficiary(real_beneficiary.id.$model)"
                                           v-tooltip="'Հեռացնել'"
                                           class="position-absolute"
                                           style="cursor: pointer; top: 5px; right: 5px;"/>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label" for="name">Անուն</label>
                          <div class="col-sm-9">
                            <input v-model="real_beneficiary.first_name.$model" type="text" class="form-control"
                                   id="name" required>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label" for="surname">Ազգանուն</label>
                          <div class="col-sm-9">
                            <input v-model="real_beneficiary.last_name.$model" type="text" class="form-control"
                                   id="surname" required>
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label" for="patronymic">Հայրանուն</label>
                          <div class="col-sm-9">
                            <input v-model="real_beneficiary.middle_name.$model" type="text" class="form-control"
                                   id="patronymic" required>
                          </div>
                        </div>
                        <div class="form-check form-check-inline">
                          <input v-model="real_beneficiary.is_resident.$model"
                                 :value="1"
                                 :id="'is-resident-' + index"
                                 type="radio"
                                 class="form-check-input">
                          <label :for="'is-resident-' + index" class="form-check-label">ՀՀ ռեզիդենտ</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input v-model="real_beneficiary.is_resident.$model"
                                 :value="0"
                                 :id="'not-is-resident-' + index"
                                 type="radio"
                                 class="form-check-input">
                          <label :for="'not-is-resident-' + index" class="form-check-label">ՀՀ ոչ ռեզիդենտ</label>
                        </div>
                        <div class="form-group row ml-0">
                          <select v-model="real_beneficiary.identification_type.$model" class="form-control col-sm-3">
                            <option value="passport">
                              Անձնագիր
                            </option>
                            <option value="identification_card">
                              Նույնականացման քարտ
                            </option>
                          </select>
                          <div class="col-sm-9">
                            <template v-if="real_beneficiary.identification_type.$model === 'passport'">
                              <div class="form-group row">
                                <div v-if="real_beneficiary.is_resident.$model" class="col-4 pr-0">
                                  <input
                                    v-model="real_beneficiary.passport_serial_number.$model"
                                    type="text"
                                    class="form-control"
                                    id="passport-seria"
                                    placeholder="Սերիա" required>
                                </div>
                                <div class="col">
                                  <input
                                    v-model="real_beneficiary.passport_number.$model"
                                    type="number"
                                    class="form-control"
                                    id="passport-number"
                                    placeholder="Համար" required>
                                </div>
                              </div>
                            </template>
                            <template v-else>
                              <input
                                v-model="real_beneficiary.identification_number.$model"
                                type="number"
                                class="form-control mb-2"
                                id="identification-number"
                                placeholder="Համար" required>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div> -->
                  </template>

                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label ">Հայտի ներկայացման օր</label>
                    <div class="col-sm-9">
                      <input v-model="participant.date_of_submission.$model"
                             class="form-control" type="date" id="example-date-input01">
                    </div>
                  </div>
                  <div class="mb-3" :class="{'d-none' : Number(currentOrganized.organize_type) === 1}">
                    <p class="mb-1">Հայտեր պարունակող ծրարներ կազմելու և ներկայացնելու համապատասխանությունը սահմանված կարգին</p>
                    <div class="form-check form-check-inline">
                      <input v-model="participant.is_docs_satisfactory.$model" :value="1" id="satisfactory-1" type="radio" class="form-check-input">
                      <label for="satisfactory-1" class="form-check-label">Բավարար</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input v-model="participant.is_docs_satisfactory.$model" :value="0" id="not-satisfactory-1" type="radio" class="form-check-input">
                      <label for="not-satisfactory-1" class="form-check-label">Անբավարար</label>
                    </div>
                  </div>
                  <!-- <div v-if="participant.is_docs_satisfactory.$model"> -->
                  <div>
                    <p class="mb-1">Գնային առաջարկը</p>
                    <div class="form-check form-check-inline">
                      <input v-model="participant.price_offer_exists.$model" :value="1" id="satisfactory-2" type="radio" class="form-check-input">
                      <label for="satisfactory-2" class="form-check-label">առկա է</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input v-model="participant.price_offer_exists.$model" :value="0" id="not-satisfactory-2" type="radio" class="form-check-input">
                      <label for="not-satisfactory-2" class="form-check-label">առկա չէ</label>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <div v-if="currentParticipant.is_docs_satisfactory && currentParticipant.price_offer_exists">
              <div class="my-3">
                <button
                  @click="$modal.show('attach-lots-modal', {attachedLots: attachedLotsForParticipant})"
                  class="btn btn-secondary mr-4"
                >
                  <font-awesome-icon icon="plus" class="mr-2"/>
                  <span>Կցել չափաբաժիններ</span>
                </button>
                <label class="btn btn-secondary m-0" :class="{ 'd-none' : Number(currentOrganized.organize_type) === 0}">
                  <font-awesome-icon icon="file-upload" class="mr-2"/>
                  <span>Վերբեռնեք մասնակցի հայտը</span>
                  <input @change="handleXMLChange" type="file" hidden>
                </label>
              </div>
              <div v-if="isLoadingXML" class="row justify-content-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div v-else>
                <table v-if="attachedLotsForParticipant.length" class="table">
                  <thead>
                  <tr>
                    <th style="min-width: 70px;">Չ/Հ</th>
                    <th>CPV կոդ</th>
                    <th>Գնման առարկայի անվանում</th>
                    <th>Արժեք </th>
                    <th>
                      <div v-tooltip="'Ընտրել բոլորը'" class="checkbox checkbox-primary mb-3">
                        <input @change="selectAllVat" :checked="isAllVat" id="is-all-vat" type="checkbox">
                        <label for="is-all-vat">ԱԱՀ</label>
                      </div>
                    </th>
                    <th>Ընդհամենը</th>
                    <th>
                      <div v-tooltip="'Ընտրել բոլորը'" class="checkbox checkbox-primary mb-3">
                        <input @change="selectAllNotSatisfactory" :checked="isAllNotSatisfactory" id="is-all-not-satisfactory" type="checkbox">
                        <label for="is-all-not-satisfactory">Ոչ բավարար</label>
                      </div>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(lot, index) in attachedLotsForParticipant" :key="index">
                    <td class="p-0" style="font-size: 12px;">{{ lot.view_id }}</td>
                    <td class="p-0" style="font-size: 12px;">{{ lot.cpv_code }}{{ lot.cpv_drop && '/'}}{{ lot.cpv_drop }}</td>
                    <td class="p-0" style="font-size: 12px;">{{ lot.cpv_name }}</td>
                    <td class="p-0">
                      <input v-model.number="lot.total_price"
                             @input="calculateByTotal(index)"
                             @keyup.enter="goToNextRow"
                             @focus="handleLotInputsFocus($event, {row: index, activeFields: '123'})"
                             v-positive-only.none-zero
                             type="text"
                             :class="{'border-primary': focusedLotFields.row === index && _.includes(focusedLotFields.activeFields, '1')}"
                             class="form-control">
                    </td>
                    <td class="p-1">
                      <div class="d-flex flex-row-reverse justify-content-between align-items-center position-relative">
                        <input v-model.number="lot.vat"
                                @keyup.enter="goToNextRow"
                                @input="calculateByVat(index)"
                                @focus="handleLotInputsFocus($event, {row: index, activeFields: '23'})"
                                v-positive-only.none-zero
                                type="text"
                                :class="{'border-primary': focusedLotFields.row === index && _.includes(focusedLotFields.activeFields, '2')}"
                                class="form-control"
                        >
                        <input v-model="lot.is_with_vat"
                               :true-value="1"
                               :false-value="0"
                               :data-index="index"
                               @change="handleVatSelect(lot.is_with_vat, index)"
                               class="form-check-input mr-2 mb-1"
                               type="checkbox">
                      </div>
                    </td>
                    <td class="p-1">
                      <input v-model.number="lot.overall"
                             @focus="handleLotInputsFocus($event, {row: index, activeFields: '3'})"
                             @keyup.enter="goToNextRow"
                             v-positive-only.none-zero
                             type="text"
                             :class="{'border-primary': focusedLotFields.row === index && _.includes(focusedLotFields.activeFields, '3')}"
                             class="form-control">
                    </td>
                    <td class="p-1" style="text-align: left !important;">
                      <div class="form-check form-check-inline">
                        <input v-model="lot.is_satisfactory"
                               :value="1"
                               :id="'is-satisfactory-' + index"
                               type="radio"
                               class="form-check-input">
                        <label :for="'is-satisfactory-' + index" class="form-check-label">Բավարար</label>
                      </div>
                      <div class="form-check form-check-inline position-relative">
                        <input v-model="lot.is_satisfactory"
                               :value="0"
                               :id="'is-not-satisfactory-' + index"
                               type="radio"
                               class="form-check-input">
                        <label :for="'is-not-satisfactory-' + index" class="form-check-label">Ոչ բավարար</label>
                      </div>
                    </td>
                    <td class="p-1 position-relative">
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
        <attach-lots-modal @lots-select="fillLotTable"/>
      </div>
    </div>
    <div id="modal-footer">
      <button @click="save" type="submit" class="btn btn-primary mr-3">
        <span v-if="isSaving" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
        <span>Պահպանել</span>
      </button>
      <button @click="$modal.hide('participants-modal')" class="btn btn-light">
        <span>Փակել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  // import { required, email } from 'vuelidate/lib/validators'
  import { required } from 'vuelidate/lib/validators'
  import ClickOutside from 'vue-click-outside'
  import DeleteModal from '@/components/helpers/DeleteModal'
  import AttachLotsModal from './AttachLotsModal'

  import $ from 'jquery'
  // this.value = this.value.replace(/[^0-9+.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');
  export default {
    name: "Participants",
    components: { DeleteModal, AttachLotsModal },
    directives: { ClickOutside },
    data() {
      return {
        // viewid: [],
        isLoadingXML: false,
        isSaving: false,
        isPhysicalPerson: false,
        is_agency_agreement: false,
        is_cooperation: false,
        isAllVat: true,
        isAllNotSatisfactory: false,
        isCurrentInBlackList: false,
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
        return this.$store.getters['organize/currentOrganized']
      },
      locale() {
        return this.$store.getters['user/locale']
      }
    },
    watch: {
      lotsWithVatLength(length) {
        this.isAllVat = length === this.attachedLotsForParticipant.length
      },
      // isPhysicalPerson(newValue) {
      //   if(newValue) {
      //     const currentParticipant = this.currentParticipant
      //   }
      //
      //   this.currentParticipantGroup.participant.find(participant => this.current)
      // }

      async currentOrganized(newValue) {
      }
    },
    mounted() {
      this.$store.dispatch('organize/getCurrent', this.$route.params.id)
      this.$store.dispatch('organize/getRows', {
        organizeId: this.$route.params.id
      }).then(({ data }) => {
        if(data.data.length) {
          this.organizedLots.push(...data.data)
        }
      })

      this.$client.get(`participant-group/getByOrganize/${this.$route.params.id}`).then(response => {
          // const participantsData = {...response.data.data}
          const participantsData = response.data;
          if(participantsData && participantsData.length) {
            this.participants = participantsData
          } else {
            this.participants.push(this.getParticipantGroupObj())
          }
          this.currentParticipantGroup = this.participants[0]
          this.currentParticipant = this.currentParticipantGroup.participant[0]
          this.currentParticipantGroup.lots.forEach((groupLot) => {
            const organizedLot = this.organizedLots.find((lot) => lot.id===groupLot.organize_row_id)
            if(organizedLot){
              var lot = {
                id: organizedLot.id,
                view_id: organizedLot.view_id,
                cpv_code: organizedLot.cpv_code,
                cpv_drop: organizedLot.cpv_drop,
                cpv_name: organizedLot.cpv_name,
                is_satisfactory: groupLot.is_satisfactory,
                is_with_vat: groupLot.vat ? 1 : 0,
                organize_row_id: groupLot.organize_row_id,
                overall: +groupLot.value+groupLot.vat,
                total_price: groupLot.value,
                vat: groupLot.vat,
              }
              this.attachedLotsForParticipant.push(lot)
            }
          })
        })

      // todo: make actual request instead of faking it
      this.$client.get(`participant-group/getByOrganize/${this.$route.params.id}`).then(response => {
          // const participantsData = {...response.data.data}
        const participantsData = response.data;
        if(participantsData && participantsData.length) {
          this.participants = participantsData
        }
        this.currentParticipantGroup = this.participants[0]
        this.currentParticipant = this.currentParticipantGroup.participant[0]
        // this.attachedLotsForParticipant = this.currentParticipantGroup.lots || []
      })
    },
    methods: {
      handleXMLChange(event) {
        this.isLoadingXML = true;
        const path = event.target.value;
        if(path){
          var formData = new FormData();
          const file = event.target.files[0];
          formData.append("file", file);
          this.$client.post(`participant-group/processXML`, formData).then(({ data }) => {
            if(data.status){
              this.attachedLotsForParticipant = [];
              data.data.forEach((item) => {
                if(item.value){
                  const organizedLot = this.organizedLots.find((lot) => lot.view_id===+item.view_id)
                  const parsedValue = item.value.split(',').join('');
                  if(organizedLot){
                    var lot = {
                      view_id: item.view_id,
                      id: organizedLot.id,
                      cpv_code: organizedLot.cpv_code,
                      cpv_drop: organizedLot.cpv_drop,
                      cpv_name: organizedLot.cpv_name,
                      is_satisfactory: 1,
                      is_with_vat: 0,
                      organize_row_id: organizedLot.id,
                      overall: +parsedValue,
                      total_price: +parsedValue,
                      vat: 0,
                    }
                    this.attachedLotsForParticipant.push(lot)
                  }
                }
              })
            } else {
              this.$notify({
                group: 'foo',
                type: 'error',
                title: 'Խնդրում ենք վերբեռնել XML կամ ZIP ֆայլ',
                text: 'Կրկին փորձեք!'
              })
            }
            this.isLoadingXML = false;
          }).catch((e) => {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: 'Ինչ որ բան այն չէ',
              text: 'Կրկին փորձեք!'
            })
          })
        }
      },
      callAction(action) {
        if(action.modal) {
          this.$modal.show(action.modal)
        }
      },
      consoleLog(key, data){
        console.log(key, data);
      },
      save() {
        if(!this.$v.currentParticipantGroup.$invalid) {
          const incorrectRow = this.attachedLotsForParticipant.find(lot => !lot.total_price)
          if(!incorrectRow){
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
            const participantGroupRequestData = Object.assign({
              organize_id: this.currentOrganized.id,
              id: this.currentParticipantGroup.id,
              is_cooperation: groupIsCooperation,
              is_agency_agreement: groupIsAgencyAgreement,
              user_id: this.currentParticipantGroup.participant[0].user_id,
            }, {
              participant: this.currentParticipantGroup.participant,
              lots: this.attachedLotsForParticipant
            })
            if(requestMethod === 'post'){
              this.$client[requestMethod]('participant-group', participantGroupRequestData).then(response => {
                this.currentParticipantGroup.id = response.data;
                this.currentParticipantGroup.isNew = false;
                this.isSaving = false
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
                  this.$notify({
                    group: 'foo',
                    type: 'success',
                    text: 'Հաջողությամբ պահպանված է'
                  })
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
              text: 'Լրացրեք բոլոր չափաբաժինները պահպանելու համար!'
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
      addParticipantGroup() {
        if(this.currentParticipantGroup.isNew){
          this.$fire({
            showCancelButton: true,
            title: "Զգուշացում",
            text: "Նախքան նոր մասնակից ավելացնելը պահպանեք տվյալ մասնակցի տվյալները",
            type: "warning",
            confirmButtonText: 'Շարունակել',
            cancelButtonText: 'Ետ',
          }).then(result => {
            if(result.value){
              const newParticipantGroup = this.getParticipantGroupObj()
              this.participants.push(newParticipantGroup)
              this.currentParticipantGroup = newParticipantGroup
              this.currentParticipant = newParticipantGroup.participant[0]
              this.attachedLotsForParticipant = []
            }
          }).catch((value) => {
            
          })
        } else {
          const newParticipantGroup = this.getParticipantGroupObj()
          this.participants.push(newParticipantGroup)
          this.currentParticipantGroup = newParticipantGroup
          this.currentParticipant = newParticipantGroup.participant[0]
          this.attachedLotsForParticipant = []
        }
      },
      async removeParticipantGroup(group) {
        const id = group.id
        if(group.isNew){
          this.participants.splice(this.participants.findIndex(participantGroup => participantGroup.id === id), 1)
          this.$modal.hide('delete-modal')
        } else {
          const response = await this.$client.delete(`participant-group/${id}`)
          if(response.data.status) {
            this.participants.splice(this.participants.findIndex(participantGroup => participantGroup.id === id), 1)
            this.$modal.hide('delete-modal')
          }
        }
      },
      addParticipantToGroup() {
        this.currentParticipantGroup.participant.push(this.getParticipantObj())
      },
      searchParticipants(event) {
        this.searchResults = []
        const query = event.target.value
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
          this.isCurrentInBlackList = false;
          setTimeout(() => {
            this.$client.get('search/by/tin', {
              params: {
                tin: query
              }
            }).then(({data}) => {
              if(data.status !== undefined){
                if(data.status && query.length === 8){
                  this.isCurrentInBlackList = true;
                } else {
                  this.isCurrentInBlackList = false;
                }
              } else {
                data.forEach((item) => {
                  const objItem = {
                    query,
                    id: item.id,
                    user_id: item.id,
                    tin: item.tin,
                    name: item.name,
                    address: Object.keys(item.address).length ? item.address : {hy: '', ru: ''},
                    phone: item.phone,
                    email: item.email,
                    isInBlackList: item.blackList
                  }
                  this.searchResults.push(objItem);
                })
              }
            }).catch(e => {
              console.log(e)
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
          total_price: null,
          is_with_vat: this.isAllVat ? 1 : 0,
          vat: null,
          overall: null,
          is_satisfactory: 1,
        })))

         this.attachedLotsForParticipant = this.attachedLotsForParticipant.sort((a, b) => a.view_id - b.view_id)
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
        // eslint-disable-next-line no-undef
        // this.lotsWithVat = nextValue ? _.cloneDeep(this.attachedLotsForParticipant) : []
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
        // const nextVal = !event.target.value
        selected ? this.lotsWithVatLength++ : this.lotsWithVatLength--
        this.calculateByTotal(index)
      },
      setCurrentParticipant(participant) {
        // eslint-disable-next-line no-undef
        if(!_.isEqual(this.currentParticipant, participant)) {
          this.currentParticipant = participant
        }
      },
      setCurrentParticipantGroup(participantGroup) {
        // eslint-disable-next-line no-undef
        if(this.currentParticipantGroup.id !== participantGroup.id) {
          this.currentParticipantGroup = participantGroup
          this.currentParticipant = participantGroup.participant[0]
          this.isPhysicalPerson = Boolean(this.currentParticipant.is_physical_person)
          const thisLots =[]
          participantGroup.lots.forEach((groupLot) => {
            const organizedLot = this.organizedLots.find((lot) => lot.id===groupLot.organize_row_id)
            var lot = {
              view_id: organizedLot.view_id,
              cpv_code: organizedLot.cpv_code,
              cpv_name: organizedLot.cpv_name,
              cpv_drop: organizedLot.cpv_drop,
              is_satisfactory: groupLot.is_satisfactory,
              is_with_vat: groupLot.vat?1:0,
              organize_row_id: groupLot.organize_row_id,
              overall: +groupLot.value+groupLot.vat,
              total_price: groupLot.value,
              vat: groupLot.vat,
            }
            thisLots.push(lot)
          })
          this.attachedLotsForParticipant = thisLots
        }
      },
      removeParticipantFromGroup(participantId) {
        const groupedParticipants = this.currentParticipantGroup.participant.filter(participant => participant.id !== participantId)
        // if removing current participant change current to first one
        if(participantId === this.currentParticipant.id) {
          this.currentParticipant = this.currentParticipantGroup.participant[0]
        }
        this.$set(this.currentParticipantGroup, 'participant', groupedParticipants)
      },
      addRealBeneficiary() {
        const realBeneficiaries = this.currentParticipant.real_beneficiaries
        realBeneficiaries.push(this.getRealBeneficiaryObj())

        this.$set(this.currentParticipant, 'real_beneficiaries', realBeneficiaries)
      },
      removeRealBeneficiary(id) {
        const realBeneficiaries = this.currentParticipant.real_beneficiaries.filter(beneficiary => {
          return beneficiary.id !== id
        })
        this.$set(this.currentParticipant, 'real_beneficiaries', realBeneficiaries)
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
      handleOpen(){
        this.attachedLotsForParticipant=[]
        this.participants=[]
        this.$client.get(`participant-group/getByOrganize/${this.$route.params.id}`).then(response => {
          // const participantsData = {...response.data.data}
          const participantsData = response.data;
          if(participantsData && participantsData.length) {
            this.participants = participantsData
          } else {
            this.participants.push(this.getParticipantGroupObj())
          }
          this.currentParticipantGroup = this.participants[0]
          this.currentParticipant = this.currentParticipantGroup.participant[0]
          this.currentParticipantGroup.lots.forEach((groupLot) => {
            const organizedLot = this.organizedLots.find((lot) => lot.id===groupLot.organize_row_id)
            var lot = {
              view_id: organizedLot.view_id,
              id: organizedLot.id,
              cpv_code: organizedLot.cpv_code,
              cpv_drop: organizedLot.cpv_drop,
              cpv_name: organizedLot.cpv_name,
              is_satisfactory: groupLot.is_satisfactory,
              is_with_vat: groupLot.vat?1:0,
              organize_row_id: groupLot.organize_row_id,
              overall: +groupLot.value+groupLot.vat,
              total_price: groupLot.value,
              vat: groupLot.vat,
            }
            this.attachedLotsForParticipant.push(lot)
          })
        })
      },
      handleClose(){
        if(this.currentParticipantGroup.isNew){
          this.$fire({
            showCancelButton: true,
            title: "Զգուշացում",
            text: "Փակելով պատուհանը դուք կկորցնեք չպահպանված մասնակիցների տվյալները",
            type: "warning",
            confirmButtonText: 'Շարունակել',
            cancelButtonText: 'Ետ',
          }).then(result => {
            if(result.value){
              this.$modal.hide('participants-modal')
            }
          })
        } else {
          this.$modal.hide('participants-modal')
        }
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
              // email: {required, email},
              email: {required},
              phone: {required},
              date_of_submission: {required},
              is_docs_satisfactory: {required},
              price_offer_exists: {required},
              // real_beneficiaries: {
              //   $each: {
              //     id: {},
              //     first_name: {required},
              //     last_name: {required},
              //     middle_name: {required},
              //     identification_type: {required},
              //     passport_serial_number: {required},
              //     passport_number: {required},
              //     identification_number: {required},
              //     is_resident: {required}
              //   }
              // }
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
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
