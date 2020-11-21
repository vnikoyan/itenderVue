<template>
  <div class="leftbar-tab-menu mm-active active">
    <create-plan-modal />
    <div class="main-icon-menu in mm-show">
      <a class="logo logo-metrica d-block text-center">
            <span>
               <img src="/assets/landing/images/favicon_1.ico" alt="logo-small" class="logo-sm">
            </span>
      </a>
      <nav class="nav">

        <a :class="[_.startsWith($route.path, '/dashboard') && 'active']"
           @click.prevent="goTo('/dashboard')"
           style="cursor: pointer"
           class="nav-link "
           data-toggle="tooltip-custom"
           data-placement="right"
           data-trigger="hover"
           data-original-title="Գլխավոր">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-monitor align-self-center menu-icon icon-dual">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </a>

        <a :class="[_.startsWith($route.path, '/planning') && 'active']"
           @click.prevent="goTo('/planning/list')"
           style="cursor: pointer"
           class="nav-link"
           data-toggle="tooltip-custom"
           data-placement="right"
           data-trigger="hover"
           data-original-title="Պլանավորում">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-grid align-self-center menu-icon icon-dual">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </a>

        <a :class="[_.startsWith($route.path, '/organizing') && 'active']"
           @click.prevent="goTo('/organizing')"
           style="cursor: pointer"
           class="nav-link"
           data-toggle="tooltip-custom"
           data-placement="right"
           data-trigger="hover"
           data-original-title="Կազմակերպում">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="feather feather-package align-self-center menu-icon icon-dual">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </a>

        <!-- to be added later-->
<!--        <a href="#MetricaPages" class="nav-link" data-toggle="tooltip-custom" data-placement="right"-->
<!--           data-trigger="hover" title="" data-original-title="Պայմանագրի կառավարում">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
<!--               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"-->
<!--               class="feather feather-copy align-self-center menu-icon icon-dual">-->
<!--            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>-->
<!--            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>-->
<!--          </svg>-->
<!--        </a>-->

<!--        <a href="#MetricaHelp" class="nav-link" data-toggle="tooltip-custom" data-placement="right" data-trigger="hover"-->
<!--           title="" data-original-title="Լայվ օգնություն">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
<!--               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"-->
<!--               class="feather feather-copy align-self-center menu-icon icon-dual">-->
<!--            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>-->
<!--            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>-->
<!--          </svg>-->
<!--        </a>-->

      </nav><!--end nav-->

    </div><!--end main-icon-menu-->
    <div class="main-menu-inner active"><!-- LOGO -->
      <div class="topbar-left">
        <a class="logo">
            <span>
                <img src="/assets/landing/images/logo_1.png" alt="logo-large" class="logo-lg logo-dark">
                <!-- <img src="/assets/dashboard/assets/images/logo.png" alt="logo-large" class="logo-lg logo-light"> -->
            </span>
        </a>
      </div>
      
      <!--end logo-->
      <div class="slimScrollDiv mm-active active"
           style="position: relative; overflow: hidden; width: auto; height: 937px;">
        <div class="menu-body slimscroll mm-show" style="overflow: hidden; width: auto; height: 937px;">
          <div id="main"
               class="main-icon-menu-pane"
               :class="{'mm-active active': _.startsWith($route.path, '/dashboard')}">
            <div class="title-box ">
              <h6 class="menu-title">Գլխավոր</h6>
            </div>
          </div>

          <div id="planning"
               class="main-icon-menu-pane"
               :class="{'mm-active active': _.startsWith($route.path, '/planning')}">
            <div class="title-box">
              <h6 class="menu-title">Պլանավորում</h6>
            </div>
            <ul class="mb-5 nav metismenu in mm-show">
              <li class="nav-item">
                <a class="nav-link"
                   style="cursor: pointer"
                   @click.prevent="goTo('/planning/list')"
                   :class="{'active': $route.path === '/planning/list'}">
                  <span class="w-100"> Գնումների Պլան</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"
                   style="cursor: pointer"
                   v-if="division.id === '2'"
                   @click.prevent="goTo('/planning/responsible-unit')"
                   :class="{'active': $route.path === '/planning/responsible-unit'}">
                    {{ division.childName }}
                </a>
              </li>
            </ul>
            <div v-if="_.startsWith($route.path, '/planning/list')" class="plan-actions w-100">
              <button v-if="isRoot"
                      @click="$modal.show('create-plan-modal')"
                      class="btn btn-gradient-primary waves-effect waves-light w-100">
                      Ստեղծել պլան
              </button>
            </div>
          </div>

          <div id="organizing"
               class="main-icon-menu-pane"
               :class="{'mm-active active': _.startsWith($route.path, '/organizing')}">
            <div class="title-box">
              <h6 class="menu-title">Կազմակերպում</h6>
            </div>
          </div>

          <!-- to be added later-->
<!--          <div id="MetricaPages" class="main-icon-menu-pane">-->
<!--            <div class="title-box"><h6 class="menu-title">Պայմանագրի կառավարում</h6></div>-->
<!--          </div>-->
<!--          <div id="MetricaHelp" class="main-icon-menu-pane">-->
<!--            <div class="title-box"><h6 class="menu-title">Լայվ օգնություն</h6></div>-->
<!--          </div>-->
        </div>
        <div class="slimScrollBar"
             style="background: rgba(162, 177, 208, 0.13); width: 7px; position: absolute; top: 0px; opacity: 1; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 869px;"></div>
        <div class="slimScrollRail"
             style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
      </div>
      <!--end menu-body-->
    </div>
    <!-- end main-menu-inner-->
  </div>
</template>

<script>
import CreatePlanModal from '../../views/dashboard/planning/partials/CreatePlanModal'
export default {
  components: { CreatePlanModal },
  computed: {
    isRoot() {
      return this.$store.getters['user/isRoot']
    },
    division() {
      return this.$store.getters['user/division']
    },
  },
  methods: {
    goTo(path) {
      if(this.$route.path !== path) {
        this.$router.push({ path })
      }
    }
  }
}
</script>
