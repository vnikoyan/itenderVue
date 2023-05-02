<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <h3 class="text-primary">{{title}}</h3>
          <hr/>
          <div class="content" v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {  },
    name: 'guide',
    data() {
      return {
        content: '',
        title: '',
      }
    },
    mounted() {
      this.$client.get(`guide/${this.$route.params.guideId}`).then(({data}) => {
        this.title = data.title.hy
        this.content = data.description.hy
      })
    },
    computed: {
      me() {
        return this.$store.getters['user/me']
      },
    },
    methods: {},
  }
</script>
<style>
.content img{
  max-width: 100%;
}
@media only screen and (max-width: 760px) {
  .content iframe{
    max-width: 100%;
    height: auto;
  }
}
</style>