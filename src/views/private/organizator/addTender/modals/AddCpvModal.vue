<template>
  <modal 
    class="add-cpv-modal"
    name="add-cpv-modal"
    @before-close="resetComponent"
    @before-open="setProps"
    transition="fade"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="70%"
    height="80%"
  >
    <div id="modal-header">
      <div class="w-75 d-flex">
        <p>Ավելացնել գնման առարկա</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 25%"
              @click="$modal.hide('add-cpv-modal')" aria-label="Close">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 1.64102L14.859 0L8.49997 6.359L2.14102 4.62582e-05L0.5 1.64107L6.85895 8.00002L0.500034 14.3589L2.14105 16L8.49997 9.64104L14.8589 16L16.5 14.359L10.141 8.00002L16.5 1.64102Z" fill="#ABAEB8"/>
        </svg>
      </button>
    </div>
    <div id="modal-body">
      <cpv-selector class="m-0 p-0 h-100" :selectedCpvs.sync="selectedCpvs" />
    </div>
    <div id="modal-footer">
      <button @click="addRows" type="button" class="btn btn-primary"> 
        <span>Ավելացնել</span>
      </button>
    </div>
  </modal>
</template>

<script>
  import CpvSelector from '../../cpv/CpvSelector'
  import isMobile from '@/mixins/isMobileView'

  export default {
    name: 'AddCpvModal',
    mixins: [isMobile],
    components: { CpvSelector },
    computed: {
      // combinedCpvs() {
      //   // eslint-disable-next-line no-undef
      //   return _.unionWith(this.selectedCpvs, this.searchedCpvs, _.isEqual)
      // },
      units() {
        return this.$store.getters['settings/units']
      },
      classifiers() {
        return this.$store.getters['settings/classifiers']
      },
    },
    data() {
      return this.getComponentInitialData()
    },
    methods: {
      getComponentInitialData() {
        return {
          selectedCpvs: [],
          cpvSpecs: [],
          handleAddRows: undefined,
        }
      },
      resetComponent() {
        Object.assign(this.$data, this.getComponentInitialData())
      },
      setProps({ params }) {
        this.handleAddRows = params
      },
      addRows() {
        this.handleAddRows(this.selectedCpvs);
        this.$modal.hide('add-cpv-modal');
      },
      consoleLog(msg) {
        console.log(typeof msg, 'sdlkjflsk')
      },
    },
  }
</script>
<style scoped>

</style>

<style scoped>
  .add-cpv-modal{
    z-index: 1000;
  }
  .scroll-button {
    z-index: 9999;
    width: 30px;
    position: absolute;
    height: 50%;
    top: 30%;
    transform: translate(0, -15%);
  }

  @media (max-width: 768px) {
    .add-cpv-modal .vm--modal #modal-body{
      padding: 4px 10px 8px;
    }
  }

  .scroll-button.right {
    right: 0;
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
    background-image: linear-gradient(to left, #cdd1fb, #fff);
  }

  .scroll-button.left {
    left: 0;
    border-bottom-right-radius: 100px;
    border-top-right-radius: 100px;
    background-image: linear-gradient(to right, #cdd1fb, #fff)
  }

  .tableFixHead {
    overflow: auto;
    height: calc(100% - 1rem);
  }

  .tableFixHead thead th {
    position: sticky;
    top: 0;
    z-index: 99
  }

  /* Just common table stuff. Really. */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    padding: 8px 16px;
  }

  th {
    background: #fff;
  }

  select.form-control.custom-select_opt {
    width: 140px;
  }

  select.form-control.form-control-opt {
    width: 200px;
  }

  tbody::before {
    content: '';
    display: block;
    height: 15px;

  }
</style>

