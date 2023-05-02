<template>

  <table  class="table table-bordered  nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
    <thead>
    <tr>
      <th>Հ/Հ</th>
      <th>Մասնակցի անվանում</th>
      <th>Գնահատական <br>Բավարար <input type="checkbox" data-count="2" class="all_chap_all_bavarar"></th>
    </tr>
    <tr class="chapabashin_user_count_1" data-user-count="3">
      <th colspan="2" style="text-align: left">Չափաբաժին 1</th>
      <th colspan="1" style="text-align: center">Բավարար <input type="checkbox" data-count="3" data-chapabajin="1" class="chap_all_bavarar"></th>
    </tr>
    </thead>

    <tr>
      <td>1</td>
      <td>«ԷՅՉ ԷՍ ՓԱՐԹՆԵՐՍ» ՍՊԸ</td>
      <td>
        <button type="button" class="btn btn-secondary waves-effect waves-light"
                data-toggle="modal" data-animation="bounce" data-target=".bs-example-modal-lg">Բավարար</button>
      </td>
    </tr>
    <tr>
      <td>2</td>
      <td>«ՆՈՐԱՅՐ-ՌՈՒԲԻՆԱ» ՍՊԸ</td>
      <td>
        <button type="button" class="btn btn-secondary waves-effect waves-light"
                data-toggle="modal" data-animation="bounce" data-target=".bs-example-modal-lg">Բավարար</button>
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td>Aaaaaaaaaaa</td>
      <td>
        <button type="button" class="btn btn-secondary waves-effect waves-light"
                data-toggle="modal" data-animation="bounce" data-target=".bs-example-modal-lg">Բավարար</button>
      </td>
    </tr>
    <thead>
    <tr class="chapabashin_user_count_1" data-user-count="3">
      <th colspan="2" style="text-align: left">Չափաբաժին 2</th>
      <th colspan="1" style="text-align: center">Բավարար <input type="checkbox" data-count="3" data-chapabajin="1" class="chap_all_bavarar"></th>
    </tr>
    </thead>


  </table>

  <!--modal  in button Բավարար-->

</template>

<script>
  export default {
    name: "Evaluation"
  }
</script>

<style scoped>

</style>
