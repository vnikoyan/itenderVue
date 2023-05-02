<template>
  <input 
    :value="value"
    @input="$emit('input', $event.target.value)"
    type="text"
    class="editor-input border-bottom border-dark"
    onkeypress="this.style.width = ((this.value.length + 1) * 12) + 'px';"
    style="border: none;"
  >
</template>

<script>
    export default {
      name: 'EditorInput',
      props: {
        value: String,
      },
      data() {
        return {
          timout: null
        }
      },
      computed: {
      },
      mounted() {
      },
      methods: {
      }
    }
</script>
