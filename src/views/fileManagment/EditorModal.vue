<template>
    <modal
        class="editor-modal"
        name="editor-modal"
        @before-open="handleBeforeOpen"
        transition="fade"
        :adaptive="true"
        :scrollable="true"
        :reset="true"
        width="60%"
        height="80%"
        style="z-index: 2011;"
    >
    <div id="modal-header">
      <div class="w-100 d-flex">
        <p>{{ editorTitle }}</p>
      </div>
      <button type="button"
              class="close position-absolute"
              style="right: 1.25rem; top: 30%"
              @click="$modal.hide('editor-modal')" aria-label="Close">
        <span aria-hidden="true" class="text-white">&times;</span>
      </button>
    </div>
    <div id="modal-body">
      <component 
        ref="file"
        @closeAfterSave="$modal.hide('editor-modal')"
        :is-editable="isEditable"
        :is="currentFile"
        :loadingEnd="loadingEnd"
        :loadingStart="loadingStart"
        :lng="lng"
      />
    </div>
    <div id="modal-footer" aria-expanded="false">
      <template v-if="action === 'save'">
        <button @click="$modal.hide('editor-modal')" class="btn btn-light mr-3">
          Չեղարկել
        </button>
        <button @click="save" type="button" class="btn btn-primary">
          <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          Պահպանել
        </button>
      </template>
      <template v-if="action === 'download'">
        <button @click="download" type="button" class="btn btn-primary" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
          <span class="mr-2">Բեռնել</span>
          <font-awesome-icon :icon="['fas', 'download']"/>
        </button>
      </template>
    </div>
  </modal>
</template>

<script>
  export default {
    name: 'EditorModal',
    components: {
      contract: () => import('./competitive/firstStep/contract'),
      invitation: () => import('./competitive/firstStep/invitation'),
      protocol_number_one: () => import('./competitive/firstStep/protocol_number_one'),
      contract_offer: () => import('./competitive/firstStep/contract_offer'),
    },
    data() {
      return {
        isLoading: false,
        action: '',
        currentFile: '',
        lng: '',
        editorTitle: '',
        isEditable: false,
      }
    },
    methods: {
      handleLoadStart(){
        this.isLoading = true;
      },
      handleLoadEnd(){
        this.isLoading = false;
      },
      async loadingStart(){
        this.isLoading = true
      },
      handleBeforeOpen({params: {action = 'save', fileName, isEditable, lng = 'hy', editorTitle}}) {
        this.action = action
        this.currentFile = fileName
        this.isEditable = Boolean(isEditable)
        this.lng = lng
        this.editorTitle = editorTitle
      },
      save() {
        this.$refs.file.save()
      },
      loadingEnd(){
        this.isLoading = false
      },
      async download() {
        await this.loadingStart()
        await this.$refs.file.download()
      }
    }
  }
</script>

<style scoped>
  /deep/  .vm--modal {
    top: 1rem !important;
    left: unset !important;
    width: 960px !important;
    height: 95% !important;
    margin: auto;
    -webkit-border-radius: .3rem !important;
    -moz-border-radius: .3rem !important;
    border-radius: .3rem !important;
  }
</style>
