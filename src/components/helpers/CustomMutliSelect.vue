<template>
    <multiselect
      v-bind="$attrs"
      v-on="$listeners"
    >
        <template v-slot:tag="{ option, remove }">
            <div class="multiselect__tag">
            <span>{{ option.name }}</span>
            <span @click.prevent @mousedown.prevent.stop="remove(option, $event)" class="multiselect__tag-icon">
                <div class="position-relative w-100 h-100">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.45436 8.32453L8.32616 9.45273L5.00095 6.12752L1.67557 9.45291L0.547363 8.32471L3.87275 4.99932L0.547987 1.67456L1.67619 0.546356L5.00095 3.87112L8.32554 0.546533L9.45374 1.67474L6.12915 4.99932L9.45436 8.32453Z" fill="#595E6B"/>
                </svg>
                </div>
            </span>
            </div>
        </template>
        <template slot="option" slot-scope="props">
            <span>{{ props.option.name }}</span>
        </template>
    </multiselect>
  </template>
  
  <script>
  import Multiselect from "vue-multiselect";
  export default {
    components: {
      Multiselect,
    },
  };
  </script>
  
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>