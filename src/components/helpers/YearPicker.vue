<template>
  <div class="position-relative" v-click-outside="() => {isPickerOpen = false; setCurrentRangeStartYear()}">
    <div @click="togglePicker" 
        style="cursor: pointer;">{{ selectedYear || 'Ընտրել'}}</div>
    <div v-if="isPickerOpen" 
        class="w-50 bg-white position-absolute card" 
        style="z-index: 1005; top: 38px; left: 0;">
      <div class="w-100 p-3 d-flex justify-content-between border-bottom">
        <font-awesome-icon @click="currentRangeStartYear -= 10" icon="angle-left" style="cursor: pointer;"/>
        <span>{{currentRangeStartYear}} - {{currentRangeStartYear + 9}}</span>
        <font-awesome-icon @click="currentRangeStartYear += 10" icon="angle-right" style="cursor: pointer;"/>
      </div>
      <div class="years-container row mx-0">
        <div v-for="year in currentYearRange" :key="year" class="col-4 text-center px-0">
          <div v-if="isDisabled(year)" class="w-100 bg-info text-white py-2 rounded">{{ year }}</div>
          <div v-else-if="year === selectedYear" 
              style="cursor: pointer;" 
              class="w-100 bg-secondary text-white py-2 rounded">{{ year }}</div>
          <div v-else
              @click="selectYear(year)" 
              class="unchecked-year w-100 text-primary py-2 rounded" 
              style="cursor: pointer;">{{ year }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  name: 'YearPicker',
  directives: { ClickOutside },
  data() {
    return {
      isPickerOpen: false,
      selectedYear: null,
      currentRangeStartYear: new Date().getFullYear() - (new Date().getFullYear()%10)
    }
  },
  computed: {
    procurementPlans() {
      return this.$store.getters['procurement/procurementPlans']
    },
    currentYearRange() {
      return Array.from({length: 10}, (_, i) => i + this.currentRangeStartYear)
    },
  },
  methods: {
    isDisabled(year) {
      // eslint-disable-next-line no-undef
      if(_.find(this.procurementPlans, { year }) || year < new Date().getFullYear()) {
        return true
      } 
    },
    selectYear(year) {
      this.selectedYear = year
      this.$emit('update:year', year)
      setTimeout(() => {
        this.isPickerOpen = false
        this.setCurrentRangeStartYear()
      }, 150)
    },
    togglePicker() {
      this.isPickerOpen = !this.isPickerOpen
      this.setCurrentRangeStartYear()
    },
    setCurrentRangeStartYear() {
      this.currentRangeStartYear = new Date().getFullYear() - (new Date().getFullYear()%10)
    }
  }
}
</script>

<style scoped>
  .unchecked-year:hover {
    box-shadow: inset 0 0 0 1px #41cbd8 
  }
</style>