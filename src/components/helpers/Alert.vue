<template>
  <div style="z-index: 1010; bottom: 3rem; right: 2rem;"
       class="position-fixed alert mb-0 alert-dismissible fade show" :class="alertClasses" role="alert">
    <i class="mdi alert-icon" :class="alertIconClass"></i>
    <div class="alert-text">
      <slot>

      </slot>
    </div>
    <div class="alert-close">
      <button type="button" class="close" @click="closeAlert" aria-label="Close">
        <span aria-hidden="true">
          <i class="mdi mdi-close"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Alert',
      props: ['type'],
      data() {
        return {
          timout: null
        }
      },
      computed: {
        alertIconClass() {
          let iconClass = ''
          switch (this.type) {
            case 'danger': iconClass = 'mdi-alert-outline'; break
            case 'success': iconClass = 'mdi-check-all'; break
            case 'warning': iconClass = ''; break
          }
          return iconClass
        },
        alertClasses() {
          let classes = ''
          switch (this.type) {
            case 'danger': classes = 'alert-danger alert-warning-shadow'; break
            case 'success': classes = 'alert-success alert-success-shadow'; break
            case 'warning': classes = 'alert-warning alert-warning-shadow'; break
          }
          return classes
        }
      },
      mounted() {
        console.log(this.$props, 'alert props')
        this.timout = setTimeout(() => {
          this.closeAlert()
        }, 5000)
      },
      methods: {
        closeAlert() {
          if(this.timout) {
            clearTimeout(this.timout)
          }
          this.$emit('update:showCondition', false)
        }
      }
    }
</script>
