<template>
  <div class="card coming-soon">
      <div class="card-body p-5">
          <div class="text-center p-3">
              <h3 class="font-size-24 m-5">Հասանելի կլինի շուտով</h3>
              <i class="far fa-smile"></i>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'ComingSoon',
  }
</script>

<style scoped>
.coming-soon{
  padding: 100px;
}
.fa-smile{
  font-size: 84px;
}
@media only screen and (max-width: 850px) {
  .coming-soon{
    padding: 0;
  }
}
</style>
