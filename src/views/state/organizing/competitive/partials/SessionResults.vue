<template>
  <div class="card-body">
    <div class="text-left mb-2">
      <button type="button" class="btn btn-light " data-toggle="tooltip" data-placement="right" data-trigger="hover" title="Արտահանել Excel" data-original-title="Արտահանել Excel">
        <i class="far fa-file-excel text-success font-30"></i>
      </button>
    </div>
    <table  class="table table-bordered" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
      <thead>
      <tr>
        <th style="width: 55px;" >Չ/Հ</th>
        <th >CPV կոդ</th>
        <th >Գնման առարկայի անվանում</th>
        <th >Նախահաշվային ընդհանուր գին</th>
        <th >Նվազագույն գնային առաջարկ / Արժեք</th>
        <th >Նվազագույն գնային առաջարկ / Ընդհամենը</th>
        <th >Մասնակիցների  քանակ</th>
        <th >Մասնակցի  անվանում</th>
        <th >Մասնակցի  կարգավիճակ</th>
        <th >Հիմք</th>
        <th >Չափաբաժնի կարգավիճակ</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>00000001</td>
        <td>Ապրանք 1</td>
        <td>100000</td>
        <td>10.00</td>
        <td>10.00</td>
        <td>3</td>
        <td>QQQQ</td>
        <td>Ընտրված</td>
        <td>Նվազագույն գին</td>
        <td>Կայացած
        </td>
      </tr>
      </tbody>
    </table>
    <div class="col-6 p-0">
      <div class="card">
        <div class="accordion" id="accordionExample">
          <div class="card mb-0 border shadow-none">
            <div class="card-header" id="headingTwo">
              <a href=""
                 class="collapsed text-dark alert alert-info alert-dismissible fade show"
                 data-toggle="collapse" data-target="#collapseTwo"
                 aria-expanded="false" aria-controls="collapseTwo">Արտահերթ նիստ
              </a>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                 data-parent="#accordionExample">
              <h4 class="mt-0 header-title ml-4">Ում նախաձեռնությամբ է հրավիրված նիստ</h4>
              <div class="col-lg-10 d-flex flex-column ml-4">
                <div class="radio radio-info form-check-inline">
                  <input type="radio" id="inlineRadio1" value="option1" name="radioInline" checked="">
                  <label for="inlineRadio1">Պատվիրատուի ղեկավարի</label>
                </div>
                <div class="radio form-check-inline">
                  <input type="radio" id="inlineRadio2" value="option2" name="radioInline">
                  <label for="inlineRadio2">Գնահատող հանձնաժողովի</label>
                </div>
              </div>
              <div class="card-body">
                <div class="mt-3">
                  <label class="mb-2">Նիստի բովանդակություն</label>
                  <textarea  class="form-control br-8" maxlength="225" rows="3" placeholder=""></textarea>
                </div>
                <div class="mt-3">
                  <label class="mb-2">Հաջորդ նիստի օր ու ժամ</label>
                  <input class="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="example-datetime-local-input">
                </div>

              </div>
              <div class="card-body d-flex justify-content-lg-end mb-2 mt-2">
                <button type="button" class="btn btn-secondary apply p-2">
                  Հաստատել
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
  export default {
    name: "SessionResults"
  }
</script>

<style scoped>

</style>
