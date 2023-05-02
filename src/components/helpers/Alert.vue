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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20 5.64097L18.359 3.99995L12 10.359L5.64102 4L4 5.64102L10.3589 12L4.00003 18.3589L5.64105 19.9999L12 13.641L18.3589 20L20 18.3589L13.641 12L20 5.64097Z" fill="#ABAEB8"/>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Alert',
      props: {
        type: String,
        timeOut: {
          default: 5000,
          type: Number
        }
      },
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
        }, this.timeOut)
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
