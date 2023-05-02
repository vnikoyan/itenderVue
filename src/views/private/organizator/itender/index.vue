<template>
<div class="h-100">
  <div class="page-title-box-spacing">
    <template v-if="isMobile">
      <div class="row p-0">
        <div :class="isMobile ? 'col-12 text-center' : 'col-auto p-0'">
          <div class="d-inline-block">
            <div class="d-flex align-items-center topbar-right-spacing name-header" :class="isMobile && 'm-0'">
              <div>iTender մրցույթ</div>
            </div>
          </div>
        </div>
        <div :class="isMobile ? 'col-12 text-center' : 'col-auto p-0'">
          <div class="row justify-content-center">
            <div class="col-auto pr-md-0">
              <button 
                type="button"
                class="btn btn-primary mt-3"
                data-toggle="dropdown"
              >
                <svg class="mr-2" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2305 12.9251L19.2305 11.0749H13.6555V5.50003H11.8053V11.0749H6.23047V12.9251H11.8053V18.5H13.6555L13.6555 12.9251H19.2305Z" fill="#F0F7FF"/>
                </svg>
                <span>Ավելացնել iTender մրցույթներ</span>
              </button>
              <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 39px, 0px);">
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(1)" href="">Ապրանք</a>
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(2)" href="">Ծառայություններ</a>
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(3)" href="">Աշխատանք</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row justify-content-between align-items-center m-0 p-0">
        <div class="col-auto p-0">
          <div class="d-inline-block">
            <div class="d-flex align-items-center topbar-right-spacing name-header">
              <div>iTender մրցույթ</div>
            </div>
          </div>
        </div>
        <div class="col-auto p-0">
          <div class="row m-0 p-0">
            <div class="col-auto pr-md-0">
              <button 
                type="button"
                class="btn btn-primary"
                data-toggle="dropdown"
              >
                <svg class="mr-2" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2305 12.9251L19.2305 11.0749H13.6555V5.50003H11.8053V11.0749H6.23047V12.9251H11.8053V18.5H13.6555L13.6555 12.9251H19.2305Z" fill="#F0F7FF"/>
                </svg>
                <span>Ավելացնել iTender մրցույթներ</span>
              </button>
              <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 39px, 0px);">
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(1)" href="">Ապրանք</a>
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(2)" href="">Ծառայություններ</a>
                <a class="dropdown-item" @click.prevent="organizeNewProcurement(3)" href="">Աշխատանք</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <template v-if="isMobile">
    <div class="col-12 p-0 text-center">
      <div class="d-inline-block px-3">
        <ul class="nav nav-tabs align-items-end suggestions-tab-mobile organize-tab-mobile" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active" id="prepare-invitation" data-toggle="tab" href="#prepare-invitation-block" role="tab" aria-controls="prepare-invitation" aria-selected="true">
              Հայտարարությունների պատրաստում
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" id="contract-preparation" data-toggle="tab" href="#contract-preparation-block" role="tab" aria-controls="contract-preparation" aria-selected="false">
              Պայմանագրի պատրաստում
            </a>
          </li>
        </ul>
      </div>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="prepare-invitation-block" role="tabpanel" aria-labelledby="prepare-invitation">
          <div class="card">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li 
                  v-for="procurement in procurementsInInvitationStage"
                  :key="procurement.id"
                  class="list-group-item px-0"
                >
                  <div class="row m-0 p-0 align-items-center justify-content-between">
                    <div class="col-12 p-0 d-flex flex-column mb-2">
                      <p class="procurement-name text-left">{{ procurement.name }} - {{ procurement.code }}</p>
                    </div>
                    <div class="col-12 p-0 d-flex align-items-center justify-content-between">
                      <div class="col-auto p-0">
                        <p class="text-muted m-0 float-right procurement-date-block">
                          {{ getCpvTypeName(procurement) }}
                        </p>
                      </div>
                      <div class="col-auto p-0 d-flex">
                        <button
                          @click="$router.push(`itender/prepare-invitation/${procurement.id}?cpvType=${procurement.cpv_type}&mode=edit`)"
                          style="margin-right: 20px;"
                          class="btn btn-light d-flex justify-content-start align-items-center align-items-center procurement-button"
                        >
                          <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.95199 7.61638L13.5648 2L14.5076 2.9434L8.89479 8.55978L7.95199 7.61638ZM3.84113 12.6213L12.241 12.6658L12.2766 7.3291H13.6188V12.4434C13.6188 13.2973 12.9165 13.9999 12.0632 13.9999H4.06335C3.20114 13.9999 2.50781 13.2973 2.50781 12.4434V4.4384C2.50781 3.58453 3.21002 2.88187 4.06335 2.88187H8.46328V4.24272L3.88557 4.21604L3.84113 12.6213Z" fill="#006BE6"/>
                          </svg>
                          <span>Խմբագրել</span>
                        </button>
                        <span v-tooltip="'Հեռացնել'" @click.prevent="openDeleteModal(procurement.id)">
                          <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.11768 0H11.3877V1.5H5.11768V0ZM0.507812 3.29004H16.0078V4.79004H14.5078V15.59C14.5052 16.0534 14.32 16.497 13.9923 16.8246C13.6647 17.1522 13.2211 17.3374 12.7578 17.34H3.75781C3.29368 17.34 2.84856 17.1557 2.52038 16.8275C2.19219 16.4993 2.00781 16.0542 2.00781 15.59V4.79004H0.507812V3.29004ZM3.50781 15.79L12.9578 15.84L12.9978 4.79004H3.50781V15.79Z" fill="#E02232"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                <li 
                  v-for="procurement in procurementsInEvaluationStage"
                  :key="procurement.id"
                  class="list-group-item px-0"
                >
                  <div class="row m-0 p-0 align-items-center justify-content-between">
                    <div class="col-12 p-0 d-flex flex-column mb-2">
                      <p class="procurement-name text-left">{{ procurement.name }} - {{ procurement.code }}</p>
                    </div>
                    <div class="col-12 p-0 d-flex align-items-center justify-content-between">
                      <div class="col-auto p-0">
                        <p class="text-muted m-0 float-right procurement-date-block">
                          {{ getCpvTypeName(procurement) }}<br/>
                          <span class="text-muted">Կբացվի՝ {{ toOpeningTime(procurement.opening_date_time) }}<br/></span>
                          <span v-if="procurement.suggestions_count" class="text-muted">Մասնակիցներ՝ {{ procurement.suggestions_responded_count }} / {{ procurement.suggestions_count }} <br/></span>
                        </p>
                      </div>
                      <div class="col-auto p-0 d-flex">
                        <button
                          @click="$router.push(`itender/prepare-invitation/${procurement.id}?cpvType=${procurement.cpv_type}&mode=view`)"
                          style="margin-right: 20px;"
                          class="btn btn-light d-flex justify-content-start align-items-center align-items-center procurement-button"
                        >
                          <svg class="mr-2"  width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.27734 8.00001C3.07929 5.35668 5.69617 3.45001 8.77734 3.45001C11.8585 3.45001 14.4332 5.35668 15.2773 8.00001C14.4332 10.6433 11.8585 12.55 8.77734 12.55C5.69617 12.55 3.07929 10.6 2.27734 8.00001ZM3.62799 8.00001C4.42994 9.95001 6.49812 11.25 8.77734 11.25C11.0566 11.25 13.0825 9.90668 13.9267 8.00001C13.1247 6.05001 11.0566 4.75001 8.77734 4.75001C6.45591 4.75001 4.42994 6.05001 3.62799 8.00001ZM6.82734 7.99987C6.82734 6.93624 7.71371 6.04987 8.77734 6.04987C9.84098 6.04987 10.7273 6.89192 10.7273 7.99987C10.7273 9.10783 9.84098 9.94987 8.77734 9.94987C7.66939 9.94987 6.82734 9.06351 6.82734 7.99987Z" fill="#006BE6"/>
                          </svg>
                          <span>Դիտել</span>
                        </button>
                        <span  v-if="canDeleteOrganize(procurement)" v-tooltip="'Չեղարկել'"  @click.prevent="openDeleteModal(procurement.id)">
                          <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.11768 0H11.3877V1.5H5.11768V0ZM0.507812 3.29004H16.0078V4.79004H14.5078V15.59C14.5052 16.0534 14.32 16.497 13.9923 16.8246C13.6647 17.1522 13.2211 17.3374 12.7578 17.34H3.75781C3.29368 17.34 2.84856 17.1557 2.52038 16.8275C2.19219 16.4993 2.00781 16.0542 2.00781 15.59V4.79004H0.507812V3.29004ZM3.50781 15.79L12.9578 15.84L12.9978 4.79004H3.50781V15.79Z" fill="#E02232"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <infinite-loading ref="evaluationColumnInfiniteLoading" @infinite="evaluationColumnInfiniteHandler">
                <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
                <div slot="no-results"></div>
                <div slot="no-more"></div>
              </infinite-loading>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="contract-preparation-block" role="tabpanel" aria-labelledby="contract-preparation">
          <div class="card">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li 
                  v-for="procurement in procurementsInContractStage"
                  :key="procurement.id + Math.random()"
                  class="list-group-item px-0"
                >
                  <div class="row m-0 p-0 align-items-center justify-content-between">
                    <div class="col-12 p-0 d-flex flex-column mb-2">
                      <p class="procurement-name text-left">{{ procurement.name }} - {{ procurement.code }}</p>
                    </div>
                    <div class="col-12 p-0 d-flex align-items-center justify-content-between">
                      <div class="col-auto p-0">
                        <p class="text-muted m-0 float-right procurement-date-block">
                          {{ getCpvTypeName(procurement) }}
                        </p>
                      </div>
                      <div class="col-auto p-0 d-flex">
                        <button
                          @click="$router.push(`itender/contract-preparation/${procurement.id}`)"
                          style="margin-right: 20px;"
                          class="btn btn-light d-flex justify-content-start align-items-center align-items-center procurement-button"
                        >
                          <svg class="mr-2"  width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.27734 8.00001C3.07929 5.35668 5.69617 3.45001 8.77734 3.45001C11.8585 3.45001 14.4332 5.35668 15.2773 8.00001C14.4332 10.6433 11.8585 12.55 8.77734 12.55C5.69617 12.55 3.07929 10.6 2.27734 8.00001ZM3.62799 8.00001C4.42994 9.95001 6.49812 11.25 8.77734 11.25C11.0566 11.25 13.0825 9.90668 13.9267 8.00001C13.1247 6.05001 11.0566 4.75001 8.77734 4.75001C6.45591 4.75001 4.42994 6.05001 3.62799 8.00001ZM6.82734 7.99987C6.82734 6.93624 7.71371 6.04987 8.77734 6.04987C9.84098 6.04987 10.7273 6.89192 10.7273 7.99987C10.7273 9.10783 9.84098 9.94987 8.77734 9.94987C7.66939 9.94987 6.82734 9.06351 6.82734 7.99987Z" fill="#006BE6"/>
                          </svg>
                          <span>Դիտել</span>
                        </button>
                        <span v-if="canDeleteOrganize(procurement)" v-tooltip="'Հեռացնել'" @click.prevent="openDeleteModal(procurement.id)">
                          <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.11768 0H11.3877V1.5H5.11768V0ZM0.507812 3.29004H16.0078V4.79004H14.5078V15.59C14.5052 16.0534 14.32 16.497 13.9923 16.8246C13.6647 17.1522 13.2211 17.3374 12.7578 17.34H3.75781C3.29368 17.34 2.84856 17.1557 2.52038 16.8275C2.19219 16.4993 2.00781 16.0542 2.00781 15.59V4.79004H0.507812V3.29004ZM3.50781 15.79L12.9578 15.84L12.9978 4.79004H3.50781V15.79Z" fill="#E02232"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="d-flex mx-0 content-height">
      <div class="col-6 tenders-block-left h-100">
        <div class="card h-100">
          <div class="card-header">
            Հայտարարությունների պատրաստում
          </div>
          <div class="card-body tender-block-body p-0">
            <div id="project-list-left" class="h-100 little-scroll mr-2">
              <ul class="list-group list-group-flush">
                <li 
                  v-for="procurement in procurementsInInvitationStage"
                  :key="procurement.id"
                  class="list-group-item padding-20 mr-1"
                >
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex flex-column">
                      <p class="procurement-name">{{ procurement.name }} - {{ procurement.code }}</p>
                      <p class="text-muted m-0 float-right procurement-date-block">
                        {{ getCpvTypeName(procurement) }}
                      </p>
                    </div>
                    <div class="d-flex align-items-center">
                      <button
                        @click="$router.push(`itender/prepare-invitation/${procurement.id}?cpvType=${procurement.cpv_type}&mode=edit`)"
                        style="margin-right: 20px;"
                        class="btn btn-light d-flex justify-content-start align-items-center align-items-center procurement-button"
                      >
                        <svg class="mr-2" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.95199 7.61638L13.5648 2L14.5076 2.9434L8.89479 8.55978L7.95199 7.61638ZM3.84113 12.6213L12.241 12.6658L12.2766 7.3291H13.6188V12.4434C13.6188 13.2973 12.9165 13.9999 12.0632 13.9999H4.06335C3.20114 13.9999 2.50781 13.2973 2.50781 12.4434V4.4384C2.50781 3.58453 3.21002 2.88187 4.06335 2.88187H8.46328V4.24272L3.88557 4.21604L3.84113 12.6213Z" fill="#006BE6"/>
                        </svg>
                        <span>Խմբագրել</span>
                      </button>
                      <span v-tooltip="'Հեռացնել'" @click.prevent="openDeleteModal(procurement.id)">
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.11768 0H11.3877V1.5H5.11768V0ZM0.507812 3.29004H16.0078V4.79004H14.5078V15.59C14.5052 16.0534 14.32 16.497 13.9923 16.8246C13.6647 17.1522 13.2211 17.3374 12.7578 17.34H3.75781C3.29368 17.34 2.84856 17.1557 2.52038 16.8275C2.19219 16.4993 2.00781 16.0542 2.00781 15.59V4.79004H0.507812V3.29004ZM3.50781 15.79L12.9578 15.84L12.9978 4.79004H3.50781V15.79Z" fill="#E02232"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </li>
                <li 
                  v-for="procurement in procurementsInEvaluationStage"
                  :key="procurement.id"
                  class="list-group-item padding-20 mr-1"
                >
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex flex-column">
                      <p class="procurement-name">{{ procurement.name }} - {{ procurement.code }}</p>
                      <p class="text-muted m-0 float-right procurement-date-block">
                        {{ getCpvTypeName(procurement) }}<br/>
                        <span class="text-muted">Կբացվի՝ {{ toOpeningTime(procurement.opening_date_time) }}<br/></span>
                        <span v-if="procurement.suggestions_count" class="text-muted">Մասնակիցներ՝ {{ procurement.suggestions_responded_count }} / {{ procurement.suggestions_count }} <br/></span>
                      </p>
                    </div>
                    <div class="d-flex align-items-center">
                      <button
                        @click="$router.push(`itender/prepare-invitation/${procurement.id}?cpvType=${procurement.cpv_type}&mode=view`)"
                        style="margin-right: 20px;"
                        class="btn btn-light d-flex justify-content-start align-items-center align-items-center procurement-button"
                      >
                        <svg class="mr-2"  width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.27734 8.00001C3.07929 5.35668 5.69617 3.45001 8.77734 3.45001C11.8585 3.45001 14.4332 5.35668 15.2773 8.00001C14.4332 10.6433 11.8585 12.55 8.77734 12.55C5.69617 12.55 3.07929 10.6 2.27734 8.00001ZM3.62799 8.00001C4.42994 9.95001 6.49812 11.25 8.77734 11.25C11.0566 11.25 13.0825 9.90668 13.9267 8.00001C13.1247 6.05001 11.0566 4.75001 8.77734 4.75001C6.45591 4.75001 4.42994 6.05001 3.62799 8.00001ZM6.82734 7.99987C6.82734 6.93624 7.71371 6.04987 8.77734 6.04987C9.84098 6.04987 10.7273 6.89192 10.7273 7.99987C10.7273 9.10783 9.84098 9.94987 8.77734 9.94987C7.66939 9.94987 6.82734 9.06351 6.82734 7.99987Z" fill="#006BE6"/>
                        </svg>
                        <span>Դիտել</span>
                      </button>
                      <span v-tooltip="'Հեռացնել'" @click.prevent="openDeleteModal(procurement.id)">
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.11768 0H11.3877V1.5H5.11768V0ZM0.507812 3.29004H16.0078V4.79004H14.5078V15.59C14.5052 16.0534 14.32 16.497 13.9923 16.8246C13.6647 17.1522 13.2211 17.3374 12.7578 17.34H3.75781C3.29368 17.34 2.84856 17.1557 2.52038 16.8275C2.19219 16.4993 2.00781 16.0542 2.00781 15.59V4.79004H0.507812V3.29004ZM3.50781 15.79L12.9578 15.84L12.9978 4.79004H3.50781V15.79Z" fill="#E02232"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <infinite-loading ref="evaluationColumnInfiniteLoading" @infinite="evaluationColumnInfiniteHandler">
                <div slot="spinner" class="text-big text-primary spinner-border spinner-border-lg m-2" role="status"></div>
                <div slot="no-results"></div>
                <div slot="no-more"></div>
              </infinite-loading>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 tenders-block-right h-100">
        <div class="card h-100">
          <div class="card-header">
            Պայմանագրի պատրաստում
          </div>
          <div class="card-body tender-block-body p-0">
            <div id="project-list-right" class="h-100 little-scroll mr-2">
              <ul class="list-group list-group-flush">
                <li 
                  v-for="procurement in procurementsInContractStage"
                  :key="procurement.id + Math.random()"
                  class="list-group-item padding-20 mr-1"
                >
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex flex-column">
                      <p class="procurement-name">{{ procurement.name }} - {{ procurement.code }}</p>
                      <p class="text-muted m-0 float-right procurement-date-block">
                        {{ getCpvTypeName(procurement) }}
                      </p>
                    </div>
                    <div class="d-flex align-items-center">
                      <button
                        @click="$router.push(`itender/contract-preparation/${procurement.id}`)"
                        style="margin-right: 20px;"
                        class="btn btn-light d-flex justify-content-start align-items-center align-items-center procurement-button"
                      >
                        <svg class="mr-2"  width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.27734 8.00001C3.07929 5.35668 5.69617 3.45001 8.77734 3.45001C11.8585 3.45001 14.4332 5.35668 15.2773 8.00001C14.4332 10.6433 11.8585 12.55 8.77734 12.55C5.69617 12.55 3.07929 10.6 2.27734 8.00001ZM3.62799 8.00001C4.42994 9.95001 6.49812 11.25 8.77734 11.25C11.0566 11.25 13.0825 9.90668 13.9267 8.00001C13.1247 6.05001 11.0566 4.75001 8.77734 4.75001C6.45591 4.75001 4.42994 6.05001 3.62799 8.00001ZM6.82734 7.99987C6.82734 6.93624 7.71371 6.04987 8.77734 6.04987C9.84098 6.04987 10.7273 6.89192 10.7273 7.99987C10.7273 9.10783 9.84098 9.94987 8.77734 9.94987C7.66939 9.94987 6.82734 9.06351 6.82734 7.99987Z" fill="#006BE6"/>
                        </svg>
                        <span>Դիտել</span>
                      </button>
                      <span v-tooltip="'Հեռացնել'" @click.prevent="openDeleteModal(procurement.id)">
                        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.11768 0H11.3877V1.5H5.11768V0ZM0.507812 3.29004H16.0078V4.79004H14.5078V15.59C14.5052 16.0534 14.32 16.497 13.9923 16.8246C13.6647 17.1522 13.2211 17.3374 12.7578 17.34H3.75781C3.29368 17.34 2.84856 17.1557 2.52038 16.8275C2.19219 16.4993 2.00781 16.0542 2.00781 15.59V4.79004H0.507812V3.29004ZM3.50781 15.79L12.9578 15.84L12.9978 4.79004H3.50781V15.79Z" fill="#E02232"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <delete-modal />
  <cancel-modal />
</div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import CancelModal from './modals/CancelModal'
  import DeleteModal from '@/components/helpers/DeleteModal'
  import isMobile from '@/mixins/isMobileView'

  export default {
    name: 'ItenderProcurements',
    mixins: [isMobile],
    components: { InfiniteLoading, CancelModal, DeleteModal },
    data() {
      return {
        procurementsInInvitationStage: [],
        procurementsInEvaluationStage: [],
        procurementsInContractStage: [],
        invitationColumnPagination: {},
        evaluationColumnPagination: {},
        competitionType: 'itender',
        column_title_1: 'Հայտարարությունների պատրաստում',
        column_title_2: 'Պայմանագրի պատրաստում',
        cipher_1: 'Ծածկագիր անվանում 1',
        cipher_2: 'Ծածկագիր անվանում 2',
        cipher_3: 'Ծածկագիր անվանում 3',
        hour: '01:33',
        month: ' June 18',
        specifications: ' There are many variations of passages alteration in some form.',
      }
    },
    computed: {
      currentPlan() {
        return this.$store.getters['procurement/currentPlan']
      },
      locale() {
        return this.$store.getters['user/locale']
      }
    },
    mounted() {
    },
    methods: {
      consoleLog(data){
        console.log(data)
      },
      canDeleteOrganize(organize){
        const openingDate = new Date(organize.opening_date_time);
        const now = new Date();
        const hours = Math.abs(openingDate - now) / 36e5;
        return hours > 2;
      },
      getCpvTypeName(organize){
        const type = +organize.cpv_type;
        switch (type) {
          case 1:
            return 'Ապրանք';
          case 2:
            return 'Ծառայություն';
          case 3:
            return organize.is_construction? 'Շինարարական աշխատանք' : 'Աշխատանք';
          default:
            break;
        }
      },
      toOpeningTime(openingDateTime){
        this.$moment(openingDateTime, 'YYYY-MM-DD hh:mm:ss').startOf('hour').fromNow()
        this.$moment.locale('hy-am');
        let openingText = this.$moment(openingDateTime, 'YYYY-MM-DD hh:mm:ss').startOf('minute').fromNow()
        if(openingText  === 'օր հետո'){
          openingText = '1 օր հետո';
        }
        return openingText;
      },
      organizeNewProcurement(cpvType) {
        this.$store.dispatch('organizeItender/create', cpvType).then(response => {
          if(response.data.status) {
            const route = `itender/prepare-invitation/${response.data.data.id}`
            this.$router.push({
              path: route,
              query: {
                cpvType,
                mode: 'edit'
              }
            })
          }
          return response
        })
      },
      evaluationColumnInfiniteHandler($state) {
        this.getProcurementsRequest((this.evaluationColumnPagination.page + 1) || 1)
          .then(({data: {data, pagination}}) => {
            if (data.length) {
              this.evaluationColumnPagination = pagination;
              const invitations = data.filter(item=>item.publication === '' || !item.publication)
              this.procurementsInInvitationStage.push(...invitations);
              const doneEvaluations = data.filter(item=>item.create_contract)
              this.procurementsInContractStage.push(...doneEvaluations);
              const evaluations = data.filter(item=>!item.create_contract).filter(item=>item.publication !== '' && item.publication)
              this.procurementsInEvaluationStage.push(...evaluations);
              $state.complete();
            } else {
              $state.complete();
            }
          })
      },
      isSoonFinishing(organize){
        const openingDate = new Date(organize.opening_date_time);
        const now = new Date();
        const hours = Math.abs(openingDate - now) / 36e5;
        return hours < 5;
      },
      openDeleteModal(procurementId) {
        this.$modal.show('delete-modal', {
          msg: 'Դուք իրո՞ք ցանկանում եք հեռացնել ընթացակարգը',
          callback: async () => {
            const response = await this.$client.delete(`organize/itender/${procurementId}`)
            if(response.data.status) {
              this.procurementsInInvitationStage = []
              this.procurementsInEvaluationStage = []
              this.procurementsInContractStage = [];
              this.invitationColumnPagination = {}
              this.evaluationColumnPagination = {}
              this.$refs.evaluationColumnInfiniteLoading.stateChanger.reset()
              this.$modal.hide('delete-modal')
            }
          }
        })
      },
      openCancelModal(procurementId) {
        this.$modal.show('cancel-modal', {
          organizeId: procurementId,
          callback: async () => {
            this.procurementsInInvitationStage = []
            this.procurementsInEvaluationStage = []
            this.procurementsInContractStage = [];
            this.invitationColumnPagination = {}
            this.evaluationColumnPagination = {}
            this.$refs.evaluationColumnInfiniteLoading.stateChanger.reset()
            this.$modal.hide('cancel-modal')
          }
        })
      },
      getProcurementsRequest() {
        return this.$client.get('organize/itender/getByUser')
      }
    },
  }
</script>

<style scoped>
  .tender-block-body{
    height: calc(100% - 56px);
  }
  .list-group-item{
    border-bottom: 1px solid #EDEFF2;
    transition: .3s;
  }
  .btn-primary{
    padding-left: 6px;
  }
  .list-group-item:hover{
    background: #F7F7F7;
  }
  .list-group-item:hover .procurement-name{
    color: #006BE6;
    transition: .3s;
  }
  @media only screen and (max-width: 400px) {
    .mob-style{
      padding: 0 !important;
      background-color: transparent !important;
    }
  }

</style>
