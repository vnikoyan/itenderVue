<template>
    <div>
        <section id="single-page-header">
            <div class="overlay">
                <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="single-page-header-left">
                        <h2> {{ $t('menu.help') }}</h2>
                        <p>{{ $t('help.single_text') }}</p>
                    </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="single-page-header-right">
                        <ol class="breadcrumb float-right">
                        <li class="breadcrumb-item">
                            <router-link to="/" class="open_review">
                                {{ $t('menu.home') }}
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active">{{ $t('menu.help') }}</li>
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <div class="container ">
            <div class="row help-box">
                <div class="col-md-6">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                    <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Տենդերներ
                        </button>
                        </h2>
                    </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                        Այս բաժնում հրապարակվում են iTender համակարգի միջոցով կազմակերպված և հրապարակման ենթակա տենդերներն ու
                        հարցումները, անժամկետ տենդերները,
                        ՀՀ –ում և ԼՂՀ-ում պետական և մասնավոր կազմակերպությունների կողմից կազմակերպված բոլոր տենդերները՝
                        ըստ գնման առարկայի անվանման, ծածկագրի, տենդերի ժամկետների /սկիզբ, ավարտ/:
                        <p>
                            <router-link to="/tender" class="open_review"  data-id="3">
                                Ավելին <i class="fa fa-long-arrow-right"></i>
                            </router-link>
                        </p>
                        </div>
                    </div>
                    </div>
                    <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            iTender կանոնակարգ
                        </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                        Այս բաժնում հրապարակված է iTender կանոնակարգը, որտեղ հստակ սահմանված են համակարգից օգտվող բոլոր կողմերի
                        իրավունքներն ու պարտականությունները:
                        Այն ժամանակ առ ժամանակ փոփոխում է՝ կատարելագործվելու նկատառումներից ելնելով,
                        այդ իսկ պատճառով անհրաժեշտ է հաճախակի այցելել և տեղեկացված լինել վերջին փոփոխությունների մասին:
                        <p>
                            <!-- <router-link to="/regulation" class="open_review"  data-id="3">
                                Ավելին <i class="fa fa-long-arrow-right"></i>
                            </router-link> -->
                        </p>
                        </div>
                    </div>
                    </div>

                </div>
                </div>
                <div class="col-md-6">
                <div class="accordion" id="accordionExample01">
                    <div class="card">
                    <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left " type="button" data-toggle="collapse"
                                data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Տեղեկատվություն
                        </button>
                        </h2>
                    </div>
                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                        Այս բաժնում պարբերաբար թարմացվում և հրապարակվում է iTender համակարգի վերաբերյալ օգտակար տեղեկություններ,
                        համակարգի վերաբերյալ տեղի ունեցած փոփոխություններ, հայտարարություններ,
                        ինչպես նաև տեղեկատվություն դասընթացների, սեմինարների, ելույթների վերաբերյալ և այլ անհրաժեշտ
                        տեղեկություններ:
                        <p>
                            <router-link to="/info" class="open_review"  data-id="3">
                                Ավելին <i class="fa fa-long-arrow-right"></i>
                            </router-link>
                        </p>
                        </div>
                    </div>
                    </div>
                    <div class="card">
                    <div class="card-header" id="headingOne1">
                        <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse"
                                data-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne">
                            Մուտք/Գրանցում
                        </button>
                        </h2>
                    </div>

                    <div id="collapseOne1" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                        Այս բաժնում տեղի է ունենում կազմակերպիչների և մասնակիցների գրանցումը և մուտքը համակարգի անձնական էջ: <br>
                        Համակարգից իրավունք ունեն օգտվելու բացառապես գրանված անձինք: Համակարգում գրանցումն անվճար է: <br>
                        Գրանցվելիս անհրաժեշտ է մանրամասն ուսումնասիրել գրանցման պայմանները, ծանոթանալ iTender կանոնակարգի հետ,
                        խստագույնս հետևել առկա հուշումներին, ներկայացված ձևաչափերին, զերծ մնալ կեղծ տեղեկատվություն ներմուծելուց,
                        քանի որ մուտքագրված տվյալները նախապես ստուգվելու է համակարգի օպերատորի համապատասխան բաժնի կողմից և
                        միայն դրանից հետո համապատասխանող տվյալներով անձանց գրանցումն է հաստատվելու համակարգում: <br>
                        Գրանցվելուց հետո մուտքագրված էլեկտրոնային փոստի հասցեին ստացվում է նամակ, որտեղ հետևելով հղմանը տեղի է
                        ունենում գրանցման հաստատում: <br>
                        Այնուհետև համակարգի օպերատորի կողմից տեղի ունենում գրանցված անձանց տվյալների ստուգում: <br>
                        Գրանցված անձանց հաշիվները ակտիվացվում են, եթե մուտքագրված տվյալները համապատասխանում են իրականությանը,
                        հակառակ դեպքում չեն ակտիվացվում և տվյալ անձը ստիպված պետք է ճշգրտի տվյալները: <br>
                        Երկու դեպքում էլ էլեկտրոնային փոստի միջոցով գրանցված անձինք տեղեկացվում են ակտիվացման մասին: <br>
                        Որպես մասնակից գրանցված և հաջողությամբ ակտիվացված անձինք իրենց էլեկտրոնային փոստի հասցեին ստանում են
                        նամակ, որում նշված է վեցանիշ PIN կոդ,
                        որը խիստ գաղտնի է: Այդ կոդը անհրաժեշտ է յուրաքանչյուր անգամ առաջարկ ներկայացնելիս: <br>
                        Արգելվում է կոդը տրամադրել կամ հասանելի դարձնել այլ անձանց, քանի որ դրանից բխող բոլոր հետևանքների համար
                        պատասխանատու է
                        բացառապես գրանցված մասնակիցը: Համակարգում և որպես կազմակերպիչ և որպես մասնակից գրանցվելու համար, անհրաժեշտ
                        է գրանցվել երկու տարբեր էլեկտրոնային հասցեներով: <br>
                        Գրանցվելուց հետո թե կազմակերպիչները և թե մասնակիցները ունենում են իրենց համապատասխան անձնական էջերը:
                        Հետագայում գրանցված անձինք հնարավորություն ունեն փոփոխել իրենց որոշ տվյալները:
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div class="container help-text">
            <div class="contact-area-left">
                <h4>{{ $t('help.help-info.title_1') }}</h4>
                <h3>{{ $t('help.help-info.subtitle_1') }}</h3>
            </div>
            <p><strong><em>{{ $t('help.help-info.subtitle_1') }}</em></strong></p>

            <p>{{ $t('help.help-info.paragraph_1') }}</p>

            <div class="contact-area-left">
                <h4>{{ $t('help.help-info.title_2') }}</h4>
            </div>
            <p><em><strong>{{ $t('help.help-info.subtitle_2') }}</strong></em></p>

            <p>{{ $t('help.help-info.paragraph_2') }}</p>

            <p><strong><em>{{ $t('help.help-info.subtitle_2.0') }}</em></strong></p>

            <p><strong><em>{{ $t('help.help-info.subtitle_2.1') }}</em></strong></p>

            <p>{{ $t('help.help-info.paragraph_2.0') }}</p>

            <div class="contact-area-left">
                <h4>{{ $t('help.help-info.title_3') }}</h4>
            </div>

            <p>{{ $t('help.help-info.paragraph_3.0') }}</p>

            <p><em><strong>{{ $t('help.help-info.subtitle_3') }} </strong></em></p>

            <p>{{ $t('help.help-info.paragraph_3') }}
              <a href="https://www.itender.am/packages">{{ $t('help.help-info.link') }}</a>&nbsp;
            </p>

            <p>{{ $t('help.help-info.paragraph_3.1') }}</p>

            </div>

            <div class="container">
            <div class="row">
                <div class="">
                <div class="card-help">
                    <div class="card-body"><h4 class="mt-0 header-title">{{ $t('help.form.title') }}</h4>
                    <p class="text-muted"> {{ $t('help.form.description') }}</p>
                    <div class="row">
                        <div class="col-md-4">
                        <img src="/assets/landing/images/faq.svg" alt="" class="img-fluid"></div><!--end col-->
                        <div class="col-lg-8 col-sm-12">
                        <form>
                            <div class="form-group row">
                            <div class="col-lg-6 mo-b-15">
                                <input class="form-control" type="text" id="name" :placeholder="$t('help.form.form_name')"></div>
                            <div class="col-lg-6">
                                <input class="form-control" type="email" id="example-email-input3" :placeholder="$t('home.subscribe-area.placeholder')">
                            </div>
                            </div>
                            <div class="form-group row">
                            <div class="col-md-12">
                                <input class="form-control" type="text" id="subject2" :placeholder="$t('help.form.form_subject')"></div>
                            </div>
                            <div class="form-group">
                            <textarea class="form-control text " id="exampleFormControlTextarea1" rows="4"
                                        :placeholder=" $t('help.form.form_text')"></textarea></div>
                            <button type="submit" class="btn btn-gradient-primary btn-block blog-more-btn"> {{ $t('home.btn_send') }}
                            </button>
                        </form>
                        </div>
                        <!--end col-->
                    </div>
                    <!--end row-->
                    </div>
                    <!--end card-body-->
                </div>
                <!--end card-->
                </div>
                <!--end col-->
            </div>
            </div>



    </div>
</template>

<script>

export default {
    data() {
      return {
      }
    },
    name: 'HelpComponent',
    components: {}
  }
</script>
<style  scoped>
  @import '/assets/landing/css/slick.css';
  @import '/assets/landing/css/animate.css';
</style>
<style scoped>
    .accordion>.card>.card-header{
        background: #f1f5fa;
    }
</style>
