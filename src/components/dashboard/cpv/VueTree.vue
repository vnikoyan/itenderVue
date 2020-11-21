<template>
  <div>
    <div v-if="(loadRootOptions && isRootLoading) || searching" :style="`margin-left: ${(depth+1) * 26}px;`" class="text-blue">
      <div class="text-small spinner-border spinner-border-sm mr-2" role="status"></div>
      բեռնվում է․․․
    </div>
    <div v-if="node.name" @click="handleClick"
      class="mt-2" 
      :style="`margin-left: ${depth * 25}px;`">
      <div style="cursor: pointer;" v-if="node.children_count || loadRootOptions">
        <font-awesome-icon :icon="isOpen ? 'angle-down' : 'angle-right'"
                        class="mr-2" />
        <span>{{ node.code }} - {{ node.name }}</span>
      </div>
      
      <div v-else-if="!node.children_count" class="form-check">
        <input @change="$emit('select', node)" 
            :id="node.id"
            :checked="isChecked(node.id)"
            style="top: -2px"             
            type="checkbox" 
            class="form-check-input">
        <!-- <font-awesome-icon v-if="node.children_count || loadRootOptions" 
                          :icon="isOpen ? 'angle-down' : 'angle-right'"
                          class="mr-2" /> -->
        <label style="cursor: pointer;" class="form-check-label" :for="node.id">{{ node.code }} - {{ node.name }}</label>
      </div>
    </div>
    <div v-if="isLoading" :style="`margin-left: ${(depth+1) * 26}px;`" class="text-blue">
      <div class="text-small spinner-border spinner-border-sm mr-2" role="status"></div>
      բեռնվում է․․․
    </div>
    <transition name="dropdown" tag="div">
      <div v-show="(isOpen || loadRootOptions) && (node.children && node.children.length)">
        <VueTree v-for="child in node.children"
                class="my-1"
                :selectedOptions="selectedOptions"
                @select="$emit('select', $event)"
                @open="isOpen = true; if($listeners.open) $emit('open', true)"
                :loadOptions="loadOptions"
                :node="child"
                :depth="depth + 1"
                :key="child.id" />
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'VueTree',
    props: {
      node: Object,
      depth: {
        type: Number,
        default: 0
      },
      selectedOptions: Array,
      loadRootOptions: Boolean,
      label: {
        type: Function,
        default: () => {
          return this.node.code + ' - ' + this.node.name
        }
      },
      loadOptions: Function,
      searching: Boolean
    },
    watch: {
      'node.children': function(children) {
        if(!children) {
          this.isRootLoading = true
        } else if(this.loadRootOptions && children.length) {
          this.isRootLoading = false
        }
      }
    },
    data() {
      return {
        isOpen: false,
        isLoading: false,
        isRootLoading: true,
      }
    },
    mounted() {
      if(this.node.children && this.node.children[0] && this.node.children[0].children_count < 1) {
        this.isAnyChecked()
      }
    },
    methods: {
      async handleClick() {
        if(this.isOpen) {
          this.isOpen = false
        } else {
          if(this.node.children) {
            this.isOpen = true
          } else {
            if(this.node.children_count) {
              this.isLoading = true
              await this.loadOptions(this.node)
              this.isLoading = false
              this.isOpen = true
            }
          }
        }
      },
      isAnyChecked() {
        // eslint-disable-next-line no-undef
        if(_.intersectionBy(this.node.children, this.selectedOptions, 'id').length) {
          this.isOpen = true
          this.$emit('open')
        }
      },
      isChecked(id) {
        return this.selectedOptions.findIndex(option => option.id === id) > -1
      },
    }
  }
</script>
<style scoped>
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(1);
}

.dropdown-enter-to,
.dropdown-leave {
  transform: scaleY(1);
  opacity: 1;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  transform-origin: top;
}
</style>