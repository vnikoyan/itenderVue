<template>
  <div class="row p-0 m-0 h-100">
      <div class="col-12 p-0 m-0 h-100">
        <div class="row p-0 m-0 h-100">
          <div class="col-md-7 p-0 padding-b-20 col-left col-banner">
            <VtbBanner />
          </div>
          <div class="col-md-5 p-0 padding-b-20 col-banner d-md-block d-none">
            <VtbBanner />
          </div>
          <div class="col-md-7 p-0 col-left fixed-height-550">
            <div class="card padding-20 h-100" style="padding-right: 16px">
              <div class="row p-0 m-0">
                <div class="col-12 p-0">
                  <span class="announcements">Հայտարարություններ</span>
                </div>
                <div class="col-12 p-0" style="margin-bottom: 40px">
                  <span class="grey-3">Տեղեկացեք համակարգի հնարավորությունների և համագործակցությունների մասին</span>
                </div>
              </div>
              <div class="row m-0 overflow-auto little-scroll">
                <div class="col-12 p-0 row m-0">
                  <div class="col-md-4 p-0">
                    <img src="/assets/landing/images/announcements/tenders.png" class="w-100 h-100">
                  </div>
                  <div class="col-md-8 p-0">
                    <p class="announcements-title">Տենդերներ</p>
                    <p class="announcements-content">Վաճառեք տենդերների միջոցով՝ առանց գովազդային և մարքեթինգային ծախսերի</p>
                    <button @click="$router.push('/participant/tenders')" class="btn btn-primary announcements-btn">
                      <span>Հետաքրքրվող տենդերներ</span>
                    </button>
                  </div>
                </div>
                <div class="col-12 p-0">
                  <hr class="announcements-line"/>
                </div>
                <div class="col-12 p-0 row m-0">
                  <div class="col-md-4 p-0">
                    <img src="/assets/landing/images/announcements/guarantee.png" class="w-100 h-100">
                  </div>
                  <div class="col-md-8 p-0">
                    <p class="announcements-title">Երաշխիք</p>
                    <p class="announcements-content">Ստացեք արտոնյալ պայմաններով բանկային երաշխիքներ Այ Տենդեր ՍՊԸ-ի և ՎՏԲ-Հայաստան բանկի համագործակցության շրջանակներում</p>
                    <button @click="$modal.show('guarantee-modal')" class="btn btn-primary announcements-btn">
                      <span>Դիմել երաշխիքի համար</span>
                    </button>
                  </div>
                </div>
                <div class="col-12 p-0">
                  <hr class="announcements-line"/>
                </div>
                <div class="col-12 p-0 row m-0">
                  <div class="col-md-4 p-0">
                    <img src="/assets/landing/images/announcements/tender_2.png" class="w-100 h-100">
                  </div>
                  <div class="col-md-8 p-0">
                    <p class="announcements-title">Կատարեք գնումներ տենդերների միջոցով</p>
                    <p class="announcements-content">Կատարեք գնումներ iTender համակարգի միջոցով և մրցակցության շնորհիվ ձևավորեք խնայողություններ</p>
                    <button @click="$router.push('/organizator/itender')" class="btn btn-primary announcements-btn">
                      <span>Կազմակերպել</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div  class="col-md-5 p-0 fixed-height-550">
            <div class="card padding-20 h-100" style="padding-right: 16px">
              <div class="row p-0 m-0">
                <div class="col-12 p-0">
                  <span class="announcements">Ուղեցույց մրցույթների մասնակցության</span>
                </div>
                <div class="col-12 p-0" style="margin-bottom: 40px">
                  <span class="grey-3">Տենդերներին մասնակցելու համար անհրաժեշտ է առաջին քայլով iTender համակարգի միջոցով պատրաստել մրցույթի հայտ և հաջորդ քայլով ներկայացնել այն պատվիրատուին։</span>
                </div>
              </div>
              <div class="row m-0 overflow-auto little-scroll">
                <div v-for="guide in guides" :key="guide.id"  class="guide-item"  @click="() => $router.push(`/guide/${guide.id}`)">
                  <span>{{ guide.title.hy }}</span>
                  <div class="col-auto p-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4828 10.595L9.51724 5.77777L8 7.24969L12.9655 12.0669L8 16.7503L9.51724 18.2222L14.4828 13.5388L16 12.0669L14.4828 10.595Z" fill="#006BE6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-8 padding-20 pt-0 px-0">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">Տենդերներ</h5>
                    <p>Դիտել ընտրված կատեգորիաներին համապատասխանող տենդերների ցուցակը</p>
                    <a @click="$router.push(`/participant/tenders`);" href="#" class="btn btn-primary w-100">Հետաքրքրող տենդերներ</a>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">Երաշխիք</h5>
                    <p>Ստացեք արտոնյալ պայմաններով տենդերների վերաբեվող բանկային երաշխիքներ</p>
                    <a @click="$modal.show('guarantee-modal')" href="#" class="btn btn-primary w-100">Դիմել երաշխիքի համար</a>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="col-4 padding-20 pt-0 pr-0">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title font-weight-bold">Ուղեցույց</h4>
                <h5 class="card-title font-weight-bold">մրցույթների մասնակցության</h5>
                <p>iTender համակարգում /այսուհետ՝ Համակարգ/ տեղադրված մրցույթներին մասնակցելու համար /բացառությամբ Համակարգի միջոցով կազմակերպված տենդերների և «Անժամկետ տենդերներ» հարթակի տենդերների, որոնց մասնակցությունը տեղի է ունենում Համակարգի միջոցով/ անհրաժեշտ է առաջին քայլով պատրաստել մրցույթի հայտ և հաջորդ քայլով ներկայացնել այն պատվիրատուին։</p>
                <div class="row">
                  <div v-for="guide in guides" :key="guide.id"  class="col-12 my-2">
                    <button @click="() => $router.push(`/guide/${guide.id}`)" href="#" class="w-100 btn btn-primary">{{ guide.title.hy }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    <guarantee-modal/>
  </div>
</template>

<script>
import GuaranteeModal from '@/components/landing/GuaranteeModal'
import VtbBanner from '@/components/dashboard/banner'

export default {
  components: { GuaranteeModal, VtbBanner },
  data() {
    return { 
      guides: []
    }
  },
  mounted(){
    this.$client.get('guide').then(({data}) => {
      this.guides = data
    })
  },
}
</script>

<style scope>
/* .banner{
  width: 400px;
  height: 300px;
  background-color: #fff;
} */
.banner iframe{
  border-radius: .25rem;
}
.fixed-height-550{
  height: 550px;
}
.little-scroll{
  /* padding-right: 20px; */
}
.announcements-line{
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.announcements-title, .announcements-content, .announcements-btn{
  margin-left: 20px;
}
@media only screen and (max-width: 1450px) {
  .response-card-block{
    flex-direction: column;
  }
}
@media only screen and (max-width: 900px) {
  .flex_column{
    flex-direction: column;
  }
}
@media only screen and (max-width: 540px) {
  .announcements-line{
    margin-right: 0;
  }
  .announcements-title, .announcements-content, .announcements-btn{
    margin-left: 0px;
  }
  .mob-banner{
    width: 100% !important;
  }
  .announcements-title{
    margin-top: 20px;
  }
  .fixed-height-550{
    height: auto;
  }
  .little-scroll{
    padding: 0;
  }
  .mob{
    padding-right: 0;
  }
  .w-100{
    width: 100%;
  }
}
</style>
