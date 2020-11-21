<template>
  <div id="app">
      <component :is="this.$route.meta.layout || 'div'">
        <transition name="component-fade" mode="out-in">
          <router-view/>
        </transition>
      </component>
  </div>
</template>

<style scoped>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
