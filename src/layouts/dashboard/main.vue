<template>
<div>
  <sidebar></sidebar>
  <topbar></topbar>
  <page-wrapper>
    <slot></slot>
  </page-wrapper>
</div>
</template>
<script>
import Sidebar from '../../components/dashboard/TheSidebar'
import Topbar from '../../components/dashboard/TheTopbar'
import PageWrapper from '../../components/dashboard/ThePageWrapper'
export default {
  components: { Sidebar, Topbar, PageWrapper },
  created() {
    this.$store.dispatch('user/me')
    this.$store.dispatch('user/getChild')
    this.$store.dispatch('user/getRoot')
    this.$store.dispatch('user/getGroup')
  }
}
</script>
