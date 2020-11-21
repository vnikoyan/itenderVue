<template>
    <div >
        <v-style>
            .lodeTrue{
              display: none;
            }
            #preloader {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #fff;
                z-index: 99999;
            }
            #status {
                 width:200px;
                 height:200px;
                 position:absolute;
                 left:50%; /* centers the loading animation horizontally one the screen */
                 top:50%; /* centers the loading animation vertically one the screen */
                 background-image:url(assets/landing/images/loader-4.gif); /* path to your loading animation */
                 background-repeat:no-repeat;
                 background-position:center;
                 margin:-100px 0 0 -100px; /* is width and height divided by two */
            }
        </v-style>
        <div id="preloader" :class="`${lode}`" >
            <div id="status">&nbsp;</div>
        </div>
        <v-style>
          @import '/assets/landing/css/theme-color/default-theme.css';
          @import '/style/style.css';
          @import '/style.css';
       </v-style>
        <Header></Header>
        <Nav></Nav>
        <slot></slot>
        <footer id="footer">
          <div class="container">
              <div class="footer_center">
                  <div class="fmenu">
                    <ul>
                      <li>
                        <router-link to="/" >
                          {{ $t('menu.home') }}
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/tender">
                          {{ $t('menu.tenders') }}
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/info" >
                          {{ $t('menu.information') }}
                        </router-link>

                      </li>
                      <li>
                        <router-link to="/help" >
                          {{ $t('menu.help') }}
                        </router-link>

                      </li>
                      <li>
                        <router-link to="/contact" >
                          {{ $t('menu.contact') }}
                        </router-link>

                      </li>

                      <li>
                        <router-link to="/regulation" >
                          {{ $t('menu.regulation') }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                  <div class="flinks mob-link">
                      <p class="flink_t">Հղումներ</p>
                      <ul>
                          <li><a href="https://protender.am/" target="_blank">protender.am</a></li>
                          <li><a href="https://egprocurement.am/" target="_blank">egprocurement.am</a></li>
                      </ul>
                  </div>
                  <div class="flinks flinks-02">
                      <a class="flink_t" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Կոնտակտներ <i class="fa fa-plus"></i></a>
                      <ul class="pk-contact">
                          <li><a href="tel:+37410244974">+374 10 24 49 74</a></li>
                          <li><a href="tel:+37499244974">+374 99 24 49 74</a></li>
                          <li><a href="tel:+37441244974">+374 41 24 49 74</a></li>
                          <li><a href="mailto:info@itender.am">info@itender.am</a></li>
                      </ul>
                      <div class="row mob-contact">
                          <div class="col">
                              <div class="collapse multi-collapse" id="multiCollapseExample1">
                                  <div class="card01">
                                      <li><a href="tel:+37410244974">+374 10 24 49 74</a></li>
                                      <li><a href="tel:+37499244974">+374 99 24 49 74</a></li>
                                      <li><a href="tel:+37441244974">+374 41 24 49 74</a></li>
                                      <li><a href="mailto:info@itender.am">info@itender.am</a></li>

                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <div class="footer_bottom">
                      <div class="logo">
                          <a href="#">
                              <img src="assets/landing/images/logo-footer.png" height="396" width="1569"/>
                          </a>
                      </div>
                      <div class="row">
                          <div class="col-md-12 col-sm-12">
                              <div class="footer-right">
                                  <a href="https://web.facebook.com/ProTender/"><i class="fa fa-facebook"></i></a>
                                  <a href="#"><i class="fa fa-twitter"></i></a>
                                  <a href="#"><i class="fa fa-google-plus"></i></a>
                                  <a href="https://www.linkedin.com/company/11787444/admin/updates/"><i
                                          class="fa fa-linkedin"></i></a>
                                  <a href="https://www.youtube.com/channel/UCD3gwb1H1NE9qujwPzCd3pg?view_as=subscriber"><i
                                          class="fa fa-youtube"></i></a>
                              </div>
                          </div>
                      </div>
                      <ul class="mob-link-02">
                          <li><a href="https://protender.am/" target="_blank">protender.am</a></li>
                          <li><a href="https://egprocurement.am/" target="_blank">egprocurement.am</a></li>
                      </ul>
                  </div>
              </div>

          </div>

          <div class="footer1">
              <div class="footer1_center container">
                  <div class="footer1_left">
                      <a href="#" target="_blanck"></a>
                  </div>
                  <div class="footer1_right">
                      &#169; 2020 Բոլոր հեղինակային իրավունքները պաշտպանված են
                  </div>
              </div>
          </div>


        </footer>
    </div>
</template>

<script>
import Header from '../../components/landing/Header'
import Nav from '../../components/landing/Nav'

export default {
  components: {Header,Nav},
  data () {
    return {
      lode: setTimeout(() => { this.lode = "lodeTrue"; },1000)
    }
  }
}
</script>
